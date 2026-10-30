# Demo template

Starting point for a new demo. Copy it with `../new-demo.sh <name>`.

```bash
docker compose up --build -d      # Vault dev + seed + runner
# open http://localhost:8080
docker compose down -v            # everything is gone
```

| Path | What it is |
|---|---|
| `compose.yml` | the stack; add services here |
| `seed/seed.sh` | one-shot Vault setup (dev mode starts empty every time) |
| `scenarios.yaml` | everything the page can run; the runner refuses anything else |
| `page/index.html` | chapters, diagrams, scenario blocks, `DEMO_NODES` |
| `page/shell.css`, `page/shell.js` | shared page frame and runner client (keep in sync with `template/`) |
| `page/mocks.js` | recorded runs, replayed when the stack is not running |
| `runner/` | generic FastAPI runner + `events.py` live activity stream (keep in sync with `template/`) |
| `tools/record-mocks.py` | records every scenario into `page/mocks.js` |
| `SPEC.md` | the demo's living spec |

See `../docs/interactive-architecture-demo-playbook.md` for page patterns and content rules.

## Live activity

The runner merges what happens in the stack into one event stream (`/api/events`): Vault's audit log,
a Postgres log if the demo has one (`PG_LOG`), Kubernetes objects listed under `watches:`, and its own
calls to services. Diagrams animate those events along edges tagged `data-flow="from>to"`, boxes tagged
`data-actor` pulse, and a ticker under each diagram names the last three events. `actors:` and
`identities:` in `scenarios.yaml` decide the names. Recordings include the activity, so offline replay
animates too.
