"""Demo runner.

Serves the demo page and runs the scenarios declared in scenarios.yaml. The page
can only trigger a scenario by id, with parameter values taken from that
scenario's allowlist, so it can never send arbitrary requests to Vault or to the
demo services.
"""

import asyncio
import base64
import json
import os
import re
import ssl
import time
from contextlib import asynccontextmanager
from pathlib import Path

import anyio
import httpx
import yaml
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles

from events import BUS, on_audit_line, on_pg_line, refresh_config, tail, watch_k8s

DEMO_DIR = Path(os.environ.get("DEMO_DIR", "/demo"))
VAULT_ADDR = os.environ.get("VAULT_ADDR", "http://vault:8200").rstrip("/")
VAULT_TOKEN = os.environ.get("VAULT_TOKEN", "root")
AUDIT_LOG = Path(os.environ.get("AUDIT_LOG", "/vault/logs/audit.log"))
PG_LOG = Path(os.environ.get("PG_LOG", "/pglog/postgresql.log"))   # absent in demos without Postgres: ignored
PUBLIC_PORT = os.environ.get("RUNNER_PUBLIC_PORT", "8080")
ALLOWED_HOSTS = {f"localhost:{PUBLIC_PORT}", f"127.0.0.1:{PUBLIC_PORT}"}
# Optional Kubernetes API (k3s): read-only use from `kind: k8s` steps, with the cluster's admin client cert.
K8S_API = os.environ.get("K8S_API", "").rstrip("/")
K8S_TLS_DIR = Path(os.environ.get("K8S_TLS_DIR", "/k3s/server/tls"))

VAR = re.compile(r"\{\{\s*([\w.-]+)\s*\}\}")


@asynccontextmanager
async def lifespan(_app):
    """Background readers that feed the live event stream (see events.py)."""
    tasks = [
        asyncio.create_task(BUS.run()),
        asyncio.create_task(refresh_config(load_demo)),
        asyncio.create_task(tail(AUDIT_LOG, on_audit_line)),
        asyncio.create_task(tail(PG_LOG, on_pg_line)),
    ]
    if K8S_API:
        tasks.append(asyncio.create_task(watch_k8s(k8s_client, K8S_API)))
    yield
    for task in tasks:
        task.cancel()


app = FastAPI(title="demo runner", lifespan=lifespan)


@app.middleware("http")
async def same_origin_only(request: Request, call_next):
    """Only the demo page itself may use the API: blocks other sites (CSRF) and DNS rebinding."""
    if request.url.path.startswith("/api/"):
        host = request.headers.get("host", "")
        origin = request.headers.get("origin")
        site = request.headers.get("sec-fetch-site")
        if host not in ALLOWED_HOSTS or origin not in (None, f"http://{host}") or site not in (None, "same-origin", "none"):
            return JSONResponse({"error": "API is only available to the local demo page"}, status_code=403)
    return await call_next(request)


class ScenarioError(Exception):
    pass


def load_demo() -> dict:
    """Re-read on every call so edits to scenarios.yaml apply without a restart."""
    with (DEMO_DIR / "scenarios.yaml").open(encoding="utf-8") as f:
        demo = yaml.safe_load(f) or {}
    demo["services"] = demo.get("services") or {}
    demo["scenarios"] = {s["id"]: s for s in demo.get("scenarios") or []}
    return demo


def lookup(obj, dotted: str):
    if dotted in ("", "."):
        return obj
    for part in dotted.split("."):
        if isinstance(obj, dict) and part in obj:
            obj = obj[part]
        elif isinstance(obj, list) and part.isdigit() and int(part) < len(obj):
            obj = obj[int(part)]
        else:
            raise ScenarioError(f"'{dotted}' not found")
    return obj


def render(value, ctx: dict):
    """Fill {{name}} / {{name.field}} placeholders from params and saved values."""
    if isinstance(value, str):
        whole = VAR.fullmatch(value.strip())
        if whole:  # a lone placeholder keeps the value's type (dicts, numbers)
            return lookup(ctx, whole.group(1))
        return VAR.sub(lambda m: str(lookup(ctx, m.group(1))), value)
    if isinstance(value, dict):
        return {k: render(v, ctx) for k, v in value.items()}
    if isinstance(value, list):
        return [render(v, ctx) for v in value]
    return value


def resolve_params(scenario: dict, given: dict) -> dict:
    params = {}
    for name, allowed in (scenario.get("params") or {}).items():
        allowed = [str(a) for a in allowed]
        value = str(given.get(name, allowed[0]))
        if value not in allowed:
            raise HTTPException(400, f"{name}={value!r} is not allowed for this scenario")
        params[name] = value
    return params


async def run_step(step: dict, ctx: dict, demo: dict, client: httpx.AsyncClient) -> dict:
    kind = step.get("kind", "http")
    title = render(step.get("title", ""), ctx)

    if kind == "wait":
        seconds = float(step["seconds"])
        await asyncio.sleep(seconds)
        return {"kind": kind, "title": title, "seconds": seconds, "ok": True, "as_expected": True}

    method = step.get("method", "GET").upper()
    path = render(step["path"], ctx)
    body = render(step.get("body"), ctx)
    headers = {k: str(v) for k, v in render(step.get("headers") or {}, ctx).items()}
    if kind == "vault":
        target = "vault"
        url = VAULT_ADDR + path
        headers["X-Vault-Token"] = str(render(step.get("token", VAULT_TOKEN), ctx))
    elif kind == "http":
        target = render(step["service"], ctx)
        if target not in demo["services"]:
            raise ScenarioError(f"unknown service '{target}'")
        url = demo["services"][target].rstrip("/") + path
    elif kind == "k8s":
        if method != "GET":
            raise ScenarioError("k8s steps are read-only (GET)")
        target = "k8s"
        url = K8S_API + path
        try:
            client = k8s_client()
        except (OSError, ssl.SSLError) as exc:
            raise ScenarioError("Kubernetes is not running (start the stack with --profile k8s)") from exc
    else:
        raise ScenarioError(f"unknown step kind '{kind}'")

    # Vault calls reach the live stream through the audit log; publish the others here.
    actor = "k8s-api" if kind == "k8s" else target
    label = f"{method} {path.split('?')[0]}"
    if kind != "vault":
        BUS.publish({"source": "http", "from": "you", "to": actor, "label": label, "status": "pending"})
    started = time.perf_counter()
    try:
        resp = await client.request(method, url, json=body, headers=headers)
    except httpx.HTTPError as exc:
        raise ScenarioError(f"{method} {target}{path}: {exc!r}") from exc
    finally:
        if kind == "k8s":
            await client.aclose()
    ms = round((time.perf_counter() - started) * 1000)
    if kind != "vault":
        BUS.publish({"source": "http", "from": actor, "to": "you", "label": f"{resp.status_code} {label}",
                     "status": "ok" if resp.status_code < 400 else "denied", "response": True})
    try:
        data = resp.json()
    except ValueError:
        data = resp.text

    ok = resp.status_code < 400
    expect = step.get("expect", "ok")
    if ok:
        for name, dotted in (step.get("save") or {}).items():
            ctx[name] = lookup(data, dotted)
    return {
        "kind": kind,
        "title": title,
        "command": render(step.get("command", ""), ctx),
        "request": {"method": method, "target": target, "path": path, "body": body,
                    "headers": {k: v for k, v in headers.items() if k != "X-Vault-Token"}},
        "status": resp.status_code,
        "ms": ms,
        "ok": ok,
        "as_expected": expect == "any" or ok == (expect == "ok"),
        "response": pick(data, step["show"]) if ok and step.get("show") else data,
    }


def pick(data, show: dict) -> dict:
    """`show: {label: dotted.path}` trims a large response (e.g. a pod list) to the fields that matter.
    A `|base64` suffix decodes the value (Kubernetes Secret data)."""
    out = {}
    for label, dotted in show.items():
        path, _, transform = dotted.partition("|")
        try:
            value = lookup(data, path)
            if transform == "base64" and isinstance(value, str):
                value = base64.b64decode(value).decode("utf-8", "replace")
            out[label] = value
        except (ScenarioError, ValueError):
            out[label] = None
    return out


def k8s_client() -> httpx.AsyncClient:
    tls = ssl.create_default_context(cafile=str(K8S_TLS_DIR / "server-ca.crt"))
    tls.load_cert_chain(K8S_TLS_DIR / "client-admin.crt", K8S_TLS_DIR / "client-admin.key")
    return httpx.AsyncClient(verify=tls, timeout=10)


def ndjson(obj: dict) -> str:
    return json.dumps(obj, default=str) + "\n"


@app.get("/api/health")
async def health():
    try:
        async with httpx.AsyncClient(timeout=3) as client:
            v = (await client.get(VAULT_ADDR + "/v1/sys/health")).json()
        vault = {"version": v.get("version"), "sealed": v.get("sealed"), "enterprise": v.get("enterprise", False)}
    except (httpx.HTTPError, ValueError):
        vault = None
    k8s = False
    if K8S_API and (K8S_TLS_DIR / "client-admin.crt").exists():
        try:
            async with k8s_client() as client:
                k8s = (await client.get(K8S_API + "/readyz", timeout=2)).status_code == 200
        except (httpx.HTTPError, ssl.SSLError, OSError):
            k8s = False
    # `features` drives data-requires="…" on the page.
    features = {"enterprise": bool(vault and vault["enterprise"]), "k8s": k8s}
    return {"live": True, "vault": vault, "features": features}


@app.get("/api/scenarios")
async def list_scenarios():
    return [
        {"id": s["id"], "title": s.get("title", s["id"]), "params": s.get("params") or {}}
        for s in load_demo()["scenarios"].values()
    ]


@app.post("/api/scenario/{scenario_id}")
async def run_scenario(scenario_id: str, request: Request):
    demo = load_demo()
    scenario = demo["scenarios"].get(scenario_id)
    if not scenario:
        raise HTTPException(404, f"unknown scenario '{scenario_id}'")
    given = (await request.json()).get("params", {}) if await request.body() else {}
    params = resolve_params(scenario, given)

    async def events():
        ctx = dict(params)
        steps = scenario.get("steps") or []
        cleanup = scenario.get("cleanup") or []  # always runs, even after an error or a closed page
        yield ndjson({"event": "start", "id": scenario_id, "title": scenario.get("title", scenario_id),
                      "params": params, "steps": len(steps) + len(cleanup)})
        all_ok = True
        cleaned = not cleanup
        async with httpx.AsyncClient(timeout=15) as client:
            try:
                failed = False
                for i, step in enumerate(steps + cleanup):
                    if failed and i < len(steps):
                        continue
                    try:
                        yield ndjson({"event": "step-start", "index": i, "kind": step.get("kind", "http"),
                                      "title": render(step.get("title", ""), ctx), "seconds": step.get("seconds")})
                        result = await run_step(step, ctx, demo, client)
                    except ScenarioError as exc:
                        yield ndjson({"event": "error", "index": i, "message": str(exc)})
                        failed = True
                        continue
                    all_ok = all_ok and result["as_expected"]
                    yield ndjson({"event": "step", "index": i, **result})
                cleaned = True
                yield ndjson({"event": "end", "ok": all_ok and not failed})
            finally:
                if not cleaned:  # the page went away mid-run: finish the cleanup without reporting it
                    with anyio.CancelScope(shield=True):
                        for step in cleanup:
                            try:
                                await run_step(step, ctx, demo, client)
                            except ScenarioError:
                                pass

    return StreamingResponse(events(), media_type="application/x-ndjson")


@app.get("/api/events")
async def event_stream(request: Request):
    """Server-sent events: recent history (flagged `backlog`, not animated by the page), then live events."""
    queue = BUS.subscribe()

    async def gen():
        try:
            for event in list(BUS.recent):
                yield f"data: {json.dumps({**event, 'backlog': True})}\n\n"
            while not await request.is_disconnected():
                try:
                    event = await asyncio.wait_for(queue.get(), timeout=15)
                except asyncio.TimeoutError:
                    yield ": keepalive\n\n"
                    continue
                yield f"data: {json.dumps(event)}\n\n"
        finally:
            BUS.unsubscribe(queue)

    return StreamingResponse(gen(), media_type="text/event-stream", headers={"Cache-Control": "no-cache"})


app.mount("/", StaticFiles(directory=DEMO_DIR / "page", html=True), name="page")
