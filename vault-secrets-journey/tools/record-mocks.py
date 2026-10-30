"""Record live scenario runs into page/mocks.js so the page also works without the stack.

Usage (with the stack running):
    python tools/record-mocks.py [--url http://localhost:8080] [--only scenario-id ...]

Runs every scenario with every combination of its allowed params. Each recording
holds the scenario's own events plus the live activity seen while it ran (the
diagram animations), all stamped with `dt`, milliseconds since the run started.
Scenarios with wait steps take as long as their waits. Standard library only.
"""

import argparse
import itertools
import json
import threading
import time
import urllib.request
from pathlib import Path

MOCKS = Path(__file__).resolve().parent.parent / "page" / "mocks.js"
PREFIX = "// Recorded by tools/record-mocks.py; replayed when the runner is not reachable.\nwindow.DEMO_MOCKS = "
TRAILING_S = 1.5  # live activity lags the scenario by about half a second; keep what arrives just after


class Activity:
    """Collects /api/events in the background, stamped with local arrival time."""

    def __init__(self, base):
        self.events: list[tuple[float, dict]] = []
        self.lock = threading.Lock()
        threading.Thread(target=self._read, args=(base,), daemon=True).start()

    def _read(self, base):
        while True:
            try:
                with urllib.request.urlopen(f"{base}/api/events", timeout=60) as resp:
                    for raw in resp:
                        line = raw.decode("utf-8", "replace").strip()
                        if not line.startswith("data: "):
                            continue
                        event = json.loads(line[6:])
                        if event.get("backlog"):
                            continue
                        with self.lock:
                            self.events.append((time.time(), event))
            except Exception:
                time.sleep(1)  # reconnect

    def between(self, start, end):
        with self.lock:
            return [(at, e) for at, e in self.events if start <= at <= end]


def get_json(url):
    with urllib.request.urlopen(url, timeout=10) as resp:
        return json.load(resp)


def run(base, scenario_id, params, activity):
    req = urllib.request.Request(
        f"{base}/api/scenario/{scenario_id}",
        data=json.dumps({"params": params}).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    start = time.time()
    events = []
    with urllib.request.urlopen(req, timeout=600) as resp:
        for raw in resp:
            if raw.strip():
                events.append({**json.loads(raw), "dt": round((time.time() - start) * 1000)})
    time.sleep(TRAILING_S)
    bus = [{**e, "event": "bus", "dt": round((at - start) * 1000)}
           for at, e in activity.between(start, time.time())]
    return sorted(events + bus, key=lambda e: e["dt"])


def mock_key(scenario_id, params):
    # Must match mockKey() in page/shell.js.
    if not params:
        return scenario_id
    return scenario_id + "?" + "&".join(f"{k}={params[k]}" for k in sorted(params))


def load_existing():
    if not MOCKS.exists():
        return {}
    text = MOCKS.read_text(encoding="utf-8")
    body = text[len(PREFIX):].rstrip().rstrip(";") if text.startswith(PREFIX) else "{}"
    return json.loads(body or "{}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", default="http://127.0.0.1:8080")  # not localhost: on Windows it tries IPv6 first
    ap.add_argument("--only", nargs="*", help="scenario ids to (re)record; others are kept")
    args = ap.parse_args()

    activity = Activity(args.url)
    time.sleep(1)  # let the activity stream connect
    mocks = load_existing() if args.only else {}
    for scenario in get_json(f"{args.url}/api/scenarios"):
        if args.only and scenario["id"] not in args.only:
            continue
        names = list(scenario["params"])
        for combo in itertools.product(*(scenario["params"][n] for n in names)):
            params = {n: str(v) for n, v in zip(names, combo)}
            key = mock_key(scenario["id"], params)
            recording = run(args.url, scenario["id"], params, activity)
            mocks[key] = recording
            print(f"recorded {key}: {sum(e['event'] == 'bus' for e in recording)} activity events", flush=True)

    MOCKS.write_text(PREFIX + json.dumps(mocks, indent=1) + ";\n", encoding="utf-8", newline="\n")
    print(f"wrote {len(mocks)} recordings to {MOCKS}")


if __name__ == "__main__":
    main()
