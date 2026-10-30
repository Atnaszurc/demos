# Vault secrets journey — working spec

Living spec for this demo. Read it before changing anything; update it after.

## 1. Goal

- Audience: developers and platform teams who still have database passwords in config.
- The one thing to remember: **a dynamic credential is worthless 30 seconds after it leaks; a static one is not, even in Vault.**
- Story order: no Vault → KV v2 → dynamic → Kubernetes → operator (both optional) → compare → leak test → policy → Sentinel → run it.

## 2. Stack

| Service | Image | Role |
|---|---|---|
| vault | hashicorp/vault, or vault-enterprise via `.env` (dev mode, root token `root`) | KV v2, database engine, policies, file audit device, Sentinel (Enterprise) |
| postgres | postgres:16-alpine, no data volume | `orders` table, static `app` login for stages 1–2; logs connections + role DDL to `pg-logs` for the live activity |
| seed | hashicorp/vault, one-shot | `seed/seed.sh`: audit, KV secret, database engine + role, policies, tokens |
| app-static / app-kv / app-dynamic | ./app (same image) | orders API, `SECRET_SOURCE` = env / kv / dynamic |
| runner | ./runner | serves `page/`, runs `scenarios.yaml`, streams the audit log, reads the k3s API for `kind: k8s` steps |
| image-loader *(k8s)* | docker:cli, one-shot | `docker save` of `vsj/orders-api:dev` into k3s's image import dir (demo shortcut: Docker socket) |
| k3s *(k8s)* | rancher/k3s v1.34.1, privileged | applies `k8s/demo.yaml` at boot: namespace `orders`, pods `orders-api` + `reporting`, NodePorts 30081/30082 |
| seed-k8s *(k8s)* | hashicorp/vault, one-shot, root | `seed/seed-k8s.sh`: Kubernetes auth method, roles `orders-api` and `orders-vso` |
| vso-setup *(k8s)* | rancher/k3s (for kubectl), one-shot | waits for the operator's CRDs (Helm install by k3s), applies `k8s/vso.yaml`, waits for the Secret |

The three app instances run at the same time, so switching stages never restarts anything.

Profile `k8s` adds stage 4 (`docker compose --profile k8s up --build -d`, or `COMPOSE_PROFILES=k8s` in `.env`).
Vault and Postgres stay in Compose with fixed IPs (172.31.250.10/.11) because pods cannot resolve Docker's
internal DNS; `k8s/demo.yaml` points Services at them through EndpointSlices. Vault reviews logins with the
client's own JWT (no reviewer token), so each client service account has `system:auth-delegator`.
k3s installs the Vault Secrets Operator (chart 1.6.0, `HelmChart` in `k8s/demo.yaml`); its resources and the
stage 5 app are in `k8s/vso.yaml`. Cold start with cached images: about 35 s until the stage 5 app answers.
Observed rotation: the operator renews at 67 % of the 30 s lease and replaces the credentials (new Secret,
rollout restart) when the 60 s maximum is near, so a new pod and database user roughly every 40 s, with no
failed requests. The `LeaseRenewal` condition flips to `SecretLeaseRenewalError` for a moment at that boundary;
the page shows the lease and renewal time instead of that condition.

App endpoints: `GET /orders` (data + `meta` describing where the credential came from),
`GET /debug/creds` and `POST /probe` (demo-only, for the leak test).

## 3. Chapters

| id | Point it makes | Scenarios |
|---|---|---|
| `no-vault` | the password is shared, permanent, unaudited | `request` (static), `what-leaks` (static) |
| `kv` | central, policy-controlled, audited, but still the same long-lived password | `request` (kv), `kv-metadata` |
| `dynamic` | a new user per request with a 30 s lease | `request` (dynamic), `dynamic-lease` |
| `kubernetes` | profile k8s: no Vault token in config; the pod's service account is its identity; a different SA is refused | `k8s-request`, `k8s-pod-spec`, `k8s-identity`, `k8s-wrong-sa` |
| `vso` | profile k8s: the stage 1 app (env vars, no Vault code, no SA token) gets rotating dynamic credentials from the operator | `vso-request`, `vso-objects`, `vso-rotation` |
| `compare-chapter` | every stage side by side (custom widget in `page/demo.js`) | `request` ×3, `k8s-request`, `vso-request` |
| `leak` | stolen credential reused after 35 s: works for stages 1–2, fails for 3 | `leak-test` |
| `policy` | default deny, one policy per app, denials in the audit log | `policy-read`, `policy-check` |
| `sentinel` | Enterprise: an EGP adds *when* on top of the ACL's *what*; hard vs soft-mandatory, audited override | `sentinel-check` |
| `run` | commands to run it locally | – |

## 4. Content rules

1. Every value on the page comes from a real run (live) or a recording of one (mock).
2. Stage 2 must not be oversold: KV gives storage, access control and audit, *not* short lifetimes.
3. Demo-only shortcuts are labelled on the page: dev mode, root token, fixed token ids, superuser DB connection, debug endpoints.
4. Per-request credential reads are a demo choice (every call visible in the audit log); a real app reads once and renews.
5. Sentinel windows are UTC (Sentinel's `time` import has no time zones). Never claim which window allows; it depends on when the demo runs.
6. `sentinel-check` removes its EGP in a `cleanup:` step, which the runner finishes even if the page closes mid-run, so other chapters are never left blocked.
7. Stage 4 copy must not claim the default service account token is short-lived: k3s issues it with a one-year `exp`. The page says production should use a projected token with a `vault` audience.
8. Stage 5 must not claim the restart is needed in general: it exists because the app reads environment variables once. A mounted Secret file avoids it (after the kubelet sync delay).
9. The operator's own tokens keep the API server audience: Vault reviews logins with the client JWT, and the API server only accepts its own audiences.
10. Diagram animations show only real events. TokenReview is the one derived event (Vault does not audit it) and is marked `inferred`. Postgres DDL lines contain generated passwords; `events.py` forwards only the verb and role name.
11. Stage 3's Postgres edge only takes `ROLE v-token-…` and stage 4's only `CREATE ROLE v-kubernet-…`: the operator renews and rotates stage 5 users in the background, and those must not look like the viewer's own request.
12. The static password `Sup3rS3cret!2019` appears in `compose.yml`, `postgres/init.sql` and `seed/seed.sh`; change all three together.

## 5. Rejected ideas

- Restarting one app container with a different mode per stage: needs the Docker socket in the runner and makes switching slow.
- Vault inside the cluster (Helm) for stage 4: would split the demo into two Vaults; one Vault outside the cluster serves every stage.
- A local registry for the stage 4 image: needs a push step from the host; the one-shot image-loader keeps it to one `up`.
- Operator resources in `k8s/demo.yaml`: their CRDs don't exist until Helm has run, so `vso-setup` applies them afterwards.
- A dedicated `vault` audience for the operator's tokens: breaks TokenReview with the client JWT (see rule 9); needs a reviewer token instead.

## 6. Next ideas

- Projected service account token with audience `vault` and a short expiry.
- Rotate-root on the database connection so Vault's own Postgres password is unknown to humans.

## 7. Verification

```bash
docker compose up --build -d
docker compose logs seed                 # must end with "seed: done"
docker compose --profile k8s up --build -d && docker compose logs seed-k8s   # "seed-k8s: done"; health shows features.k8s=true
# open http://localhost:8080: badge "Live"; click every scenario; leak test for all three stages
python tools/record-mocks.py             # refresh recordings (takes ~2 min because of the 35 s waits)
docker compose down -v
# open page/index.html from disk: badge "Recorded data", scenarios replay
```
