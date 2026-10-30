# Demos

Interactive architecture demos backed by real, ephemeral stacks. Each demo is a
scroll-through page whose buttons run real requests (Vault, databases, apps,
later MCP servers and Kubernetes) through a small runner, with a live Vault audit
log alongside.

| Folder | What it is |
|---|---|
| `template/` | starting point for a new demo |
| `vault-secrets-journey/` | no Vault → KV v2 → dynamic → Kubernetes auth → Vault Secrets Operator (k3s profile), leak test, ACL, Sentinel |
| `docs/` | the playbook: how the page, widgets and content rules work |

## Running a demo

```bash
cd vault-secrets-journey
docker compose up --build -d      # open http://localhost:8080
docker compose down -v            # nothing survives
```

Requirements: Docker with Compose v2. On this machine Docker runs inside WSL (Ubuntu): run `docker compose`
from a WSL shell (`cd /mnt/c/Users/.../demos/<demo>`); WSL forwards `localhost`, so the page opens in a Windows
browser. From Git Bash, prefix `wsl` calls with `MSYS_NO_PATHCONV=1` or `/mnt/c/...` paths get rewritten.
`tools/record-mocks.py` runs fine from Windows Python (standard library only). Optional: Vault CLI on the host (`VAULT_ADDR=http://127.0.0.1:8200`, token `root`).
For Enterprise features copy `.env.example` to `.env` and set `VAULT_IMAGE` and `VAULT_LICENSE`.

## Creating a demo

```bash
./new-demo.sh my-demo
```

Then: write `my-demo/SPEC.md` first, add services to `compose.yml`, setup to
`seed/seed.sh`, steps to `scenarios.yaml`, chapters to `page/index.html`. Record
mocks with `python tools/record-mocks.py` so the page also works offline.

## How it fits together

```
browser ──/api/scenario/<id>──▶ runner ──▶ Vault (dev) / demo services
   ▲                              │
   └──── /api/audit/stream ◀──────┘  tails Vault's file audit log
```

- **Scenarios are data.** `scenarios.yaml` lists every request the page may trigger; the runner refuses anything else.
- **Every demo is a self-contained copy.** The runner and page shell are copied from `template/`, not shared, so an
  old demo keeps working when the template changes. Improve the template first, then copy the change into
  demos that need it.
- **Live or recorded.** The page shows a badge: *Live* when served by the runner, *Recorded data* when it falls back
  to `page/mocks.js`.
