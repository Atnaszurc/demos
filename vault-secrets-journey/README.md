# Vault secrets journey

The same request four ways: hardcoded password → Vault KV v2 → dynamic database
credentials → Kubernetes auth → Vault Secrets Operator (optional k3s profile), plus a leak test, ACL policies and Sentinel. Runs live against an ephemeral
local stack.

```bash
docker compose up --build -d      # Vault dev, Postgres, seed, 3 app instances, runner
# open http://localhost:8080
docker compose --profile k8s up --build -d   # optional: adds stages 4-5, a k3s cluster with Kubernetes auth and the operator
docker compose --profile k8s down -v          # everything is gone
```

Without the stack, open `page/index.html` directly: it replays recorded runs from `page/mocks.js`.

See `SPEC.md` for the chapter plan, content rules and verification steps.
