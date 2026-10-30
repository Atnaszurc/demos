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

To always include stages 4-5, set `COMPOSE_PROFILES=k8s` in `.env`; plain `docker compose up --build -d` then
starts everything.

Without the stack, open `page/index.html` directly: it replays recorded runs from `page/mocks.js`.

## Podman

Stages 1-3 need nothing special. The k8s profile runs k3s as a `privileged` container, which needs rootful
Podman: rootless "privileged" only covers your own user namespace, and k3s fails to manage cgroups and mounts.
No engine socket is needed (the stage 4 image is built by kaniko), so there is no `label=disable` override.

On Windows or macOS, switch the Podman machine to rootful once:

```bash
podman machine stop
podman machine set --rootful
podman machine start
# a new machine: podman machine init --rootful
```

Then run the same commands with `podman compose`:

```bash
podman compose up --build -d
podman compose --profile k8s up --build -d
podman compose --profile k8s down -v
```

On Linux without a machine, run them as root (`sudo podman compose ...`).

See `SPEC.md` for the chapter plan, content rules and verification steps.
