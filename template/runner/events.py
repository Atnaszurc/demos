"""Live event stream for the page's diagrams and activity dock.

Merges what actually happens in the stack into one stream of events shaped like
{source, from, to, label, status, detail}:

  vault  Vault's file audit log: who called which path, and whether it was denied
  db     Postgres's log: connections, refused logins, CREATE / ALTER / DROP ROLE
  k8s    changes to Kubernetes objects listed under `watches:` in scenarios.yaml
  http   the runner's own calls to demo services (published by app.py)

scenarios.yaml decides how callers are named:
  actors:      Compose service names; a caller's IP is resolved to one of these
  identities:  Vault display name -> actor (e.g. kubernetes-orders-orders-vso -> operator)

The sources are read at slightly different moments, so events are held for HOLD
seconds and released in the order they happened (all containers share the host
clock). The page therefore sees the real sequence, about half a second late.
"""

import asyncio
import collections
import heapq
import itertools
import json
import os
import re
import socket
import time
from datetime import datetime, timezone
from pathlib import Path

HOLD = 0.6
BACKLOG = 40
PG_ACTOR = os.environ.get("PG_ACTOR", "postgres")
AUDIT_SKIP = ("sys/health", "sys/internal/ui/")
SENTINEL_DENIAL = re.compile(r'(egp|rgp) standard policy "([^"]+)" evaluation resulted in denial')
# log_line_prefix '%m [%p] %r %u@%d ' -> "2026-10-16 14:41:08.123 UTC [77] 172.31.250.5(43210) app@orders LOG:  ..."
PG_LINE = re.compile(r"^(?P<ts>\S+ \S+) \S+ \[\d+\] (?P<host>\S+) (?P<user>\S*)@(?P<db>\S*) (?P<level>[A-Z]+):\s+(?P<msg>.*)$")
# Plain statements ("statement: CREATE ROLE ...") and prepared ones ("execute stmt_...: DROP ROLE IF EXISTS ...")
PG_ROLE_DDL = re.compile(r'(?:statement|execute [^:]+):\s+(?P<verb>CREATE|ALTER|DROP) ROLE\s+(?:IF EXISTS\s+)?"?(?P<name>[^"\s;]+)', re.I)

CONFIG: dict = {}             # actors / identities / watches from scenarios.yaml, refreshed periodically
ACTOR_IPS: dict[str, str] = {}


class Bus:
    def __init__(self):
        self.subscribers: set[asyncio.Queue] = set()
        self.recent: collections.deque = collections.deque(maxlen=BACKLOG)
        self.pending: list = []   # heap of (happened_at, seq, event)
        self.seq = itertools.count()
        self.ids = itertools.count(1)

    def publish(self, event: dict, at: float | None = None):
        heapq.heappush(self.pending, (at or time.time(), next(self.seq), event))

    def subscribe(self) -> asyncio.Queue:
        q: asyncio.Queue = asyncio.Queue()
        self.subscribers.add(q)
        return q

    def unsubscribe(self, q: asyncio.Queue):
        self.subscribers.discard(q)

    async def run(self):
        while True:
            cutoff = time.time() - HOLD
            while self.pending and self.pending[0][0] <= cutoff:
                at, _, event = heapq.heappop(self.pending)
                event = {"id": next(self.ids), "t": round(at * 1000), **event}
                self.recent.append(event)
                for q in list(self.subscribers):
                    if q.qsize() < 1000:
                        q.put_nowait(event)
            await asyncio.sleep(0.1)


BUS = Bus()


def actor_for(address: str | None) -> str:
    ip = (address or "").split("(")[0]
    return ACTOR_IPS.get(ip, ip or "?")


def parse_time(text: str | None) -> float | None:
    """Vault: 2026-10-16T14:41:08.123456789Z  Postgres: 2026-10-16 14:41:08.123"""
    if not text:
        return None
    text = re.sub(r"(\.\d{6})\d+", r"\1", text.replace("Z", "").replace(" UTC", ""))
    try:
        return datetime.fromisoformat(text).replace(tzinfo=timezone.utc).timestamp()
    except ValueError:
        return None


def dig(obj, dotted: str):
    for part in dotted.split("."):
        if isinstance(obj, dict):
            obj = obj.get(part)
        elif isinstance(obj, list) and part.isdigit() and int(part) < len(obj):
            obj = obj[int(part)]
        else:
            return None
    return obj


async def refresh_config(load_demo):
    """Re-read actors/identities/watches and re-resolve actor IPs (containers get new IPs when recreated)."""
    loop = asyncio.get_running_loop()
    while True:
        try:
            demo = load_demo()
            CONFIG.update({k: demo.get(k) or {} for k in ("identities",)})
            CONFIG.update({k: demo.get(k) or [] for k in ("actors", "watches")})
        except Exception as exc:  # a broken scenarios.yaml shows up on the page; keep the last config
            print(f"events: could not reload scenarios.yaml: {exc!r}", flush=True)
        found = {}
        for name in CONFIG.get("actors", []):
            try:
                for info in await loop.getaddrinfo(name, None, family=socket.AF_INET):
                    found[info[4][0]] = name
            except OSError:
                pass  # service not running (e.g. a profile that is off)
        ACTOR_IPS.clear()
        ACTOR_IPS.update(found)
        await asyncio.sleep(10)


async def tail(path: Path, handle, poll: float = 0.2):
    """Feed each new complete line of `path` to `handle`. Starts at the current end of the file."""
    pos = path.stat().st_size if path.exists() else 0
    while True:
        try:
            if path.exists():
                size = path.stat().st_size
                if size < pos:  # recreated or truncated
                    pos = 0
                if size > pos:
                    with path.open("rb") as f:
                        f.seek(pos)
                        chunk = f.read()
                    *lines, rest = chunk.split(b"\n")
                    pos += len(chunk) - len(rest)
                    for line in lines:
                        try:
                            handle(line)
                        except Exception as exc:  # one odd line must not stop the stream
                            print(f"events: skipped a line of {path.name}: {exc!r}", flush=True)
            else:
                pos = 0
        except OSError:
            pass
        await asyncio.sleep(poll)


# ---- Vault audit log ------------------------------------------------------

def summarize_audit(raw: bytes) -> dict | None:
    """One row per Vault response. Secret values in the audit log are HMAC'd by Vault."""
    try:
        entry = json.loads(raw)
    except ValueError:
        return None
    if entry.get("type") != "response":
        return None
    req = entry.get("request") or {}
    path = req.get("path", "")
    if path.startswith(AUDIT_SKIP):
        return None
    auth = entry.get("auth") or {}
    policies = auth.get("policies") or []
    who = "root" if "root" in policies else (auth.get("display_name") or "-").removeprefix("token-")
    error = entry.get("error") or ""
    sentinel = SENTINEL_DENIAL.search(error)
    if sentinel:  # Sentinel denials also carry "permission denied"; name the policy instead
        error = f"denied by Sentinel {sentinel.group(1).upper()} {sentinel.group(2)}"
    elif "* " in error:  # Vault wraps messages: "1 error occurred: * permission denied" -> "permission denied"
        error = error.split("* ")[-1].strip()
    return {
        "time": entry.get("time"),
        "operation": req.get("operation"),
        "path": path,
        "who": who,
        "remote": req.get("remote_address"),
        "policies": policies,
        "override": bool(req.get("policy_override")),
        "error": error,
    }


def on_audit_line(raw: bytes):
    row = summarize_audit(raw)
    if not row:
        return
    caller = CONFIG.get("identities", {}).get(row["who"]) or actor_for(row["remote"])
    at = parse_time(row["time"])
    BUS.publish({
        "source": "vault", "from": caller, "to": "vault",
        "label": f"{row['operation']} {row['path']}",
        "status": "denied" if row["error"] else "ok",
        "detail": row["error"] or ("policy override" if row["override"] else ""),
        "who": row["who"], "policies": row["policies"], "override": row["override"],
    }, at)
    if row["path"].startswith("auth/kubernetes/login") and not row["error"]:
        # Not in the audit log, but Vault calls TokenReview for every Kubernetes login it accepts.
        BUS.publish({"source": "vault", "from": "vault", "to": "k8s-api", "label": "TokenReview",
                     "status": "ok", "inferred": True, "detail": "implied by the successful login"}, at)


# ---- Postgres log -----------------------------------------------------------

def on_pg_line(raw: bytes):
    m = PG_LINE.match(raw.decode("utf-8", "replace").rstrip("\r"))
    if not m or m["host"].startswith(("127.0.0.1", "[local]")):
        return  # healthchecks and the server's own processes
    caller, msg, at = actor_for(m["host"]), m["msg"], parse_time(m["ts"])
    if msg.startswith("connection authorized:"):
        user = re.search(r"user=(\S+)", msg)
        BUS.publish({"source": "db", "from": caller, "to": PG_ACTOR, "status": "ok",
                     "label": f"connect as {user.group(1) if user else '?'}"}, at)
    elif m["level"] == "FATAL" and "password authentication failed" in msg:
        user = re.search(r'user "([^"]+)"', msg)
        BUS.publish({"source": "db", "from": caller, "to": PG_ACTOR, "status": "denied",
                     "label": f"login refused for {user.group(1) if user else '?'}",
                     "detail": "password authentication failed"}, at)
    else:
        ddl = PG_ROLE_DDL.search(msg)
        if ddl:  # only the verb and role name: the statement itself contains the password
            BUS.publish({"source": "db", "from": caller, "to": PG_ACTOR, "status": "ok",
                         "label": f"{ddl['verb'].upper()} ROLE {ddl['name']}"}, at)


# ---- Kubernetes objects -----------------------------------------------------

async def watch_k8s(make_client, api: str, poll: float = 2.0):
    """Publish an event when a watched field changes (`watches:` in scenarios.yaml)."""
    last: dict[str, str] = {}
    while True:
        for w in CONFIG.get("watches", []):
            key = f"{w.get('path')}#{w.get('field')}"
            try:
                async with make_client() as client:
                    resp = await client.get(api + w["path"], timeout=3)
            except Exception:
                last.pop(key, None)
                continue
            if resp.status_code != 200:
                last.pop(key, None)
                continue
            value = json.dumps(dig(resp.json(), w["field"]), sort_keys=True)
            if key in last and last[key] != value:
                BUS.publish({"source": "k8s", "status": "ok", **w["event"]})
            last[key] = value
        await asyncio.sleep(poll)
