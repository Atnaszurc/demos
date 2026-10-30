# Handover — demos repo

State as of 2026-10-16, end of the first session. Read this, then `CLAUDE.md`, then the demo's `SPEC.md`.

## What this repo is

Interactive architecture demo pages (single-page, scroll-driven guides; see `docs/interactive-architecture-demo-playbook.md`)
that are **backed by real, ephemeral stacks**: every button runs real requests through a small runner, and the
diagrams animate what actually happens in Vault, Postgres and Kubernetes, about half a second late.
Goal: build many such demos quickly across products and solutions.

| Folder | What it is |
|---|---|
| `template/` | starting point for a new demo; copy with `./new-demo.sh <name>` (demos are self-contained copies) |
| `vault-secrets-journey/` | demo 1, done through stage 5 (see below) |
| `docs/interactive-architecture-demo-playbook.md` | how these pages are designed: page anatomy, widgets, animation and content rules |
| `vault-spiffe-demo/` | **not ours**: a coworker's repo, gitignored here. Inspiration only. Fredrik's own branch is `fredrik`; never change `main` |

Commits so far (all on `main`, nothing pushed, no remote configured):

```
6b2bb14 Collapsible scenario results; fix stale "three" wording
6e6d414 Animate diagrams with live events from the stack
cf2f1ab Add stage 5: Vault Secrets Operator in the k3s profile
94afd8b Add stage 4: Kubernetes auth in a k3s profile
6fa682b record-mocks: always write LF line endings
025a9a7 Add Sentinel chapter and runner cleanup steps
a36ad94 Add demo kit: template and vault-secrets-journey
```

## Running it (this machine)

Docker runs **inside WSL (Ubuntu)**, not Docker Desktop. Run Compose from a WSL shell; WSL forwards localhost, so
the page opens in a Windows browser.

```bash
cd /mnt/c/Users/atnas/source/repos/demos/vault-secrets-journey
docker compose --profile k8s up --build -d     # everything (~40 s cold); without --profile: stages 1-3, ACL, Sentinel
# open http://localhost:8080   (Vault UI/API: http://localhost:8200, token root)
docker compose --profile k8s down -v           # removes everything; without --profile the k3s containers are left behind
python tools/record-mocks.py                   # from Windows; re-record after changing scenarios (~3-4 min)
```

- Vault Enterprise: `vault-secrets-journey/.env` (gitignored) holds `VAULT_IMAGE=hashicorp/vault-enterprise:2.2.0-ent`
  and the license string. Expires 2029-02-12; features include Sentinel, Namespaces, Control Groups, SPIFFE auth/secrets.
  New demos need their own `.env` (or have `new-demo.sh` copy it).
- **At handover the full stack was still running** (all services incl. k3s). Stop it with the `down -v` line above.

## Demo 1: vault-secrets-journey

Same orders API (FastAPI, Postgres), five ways to get its database credentials:

| Stage | How | Chapter |
|---|---|---|
| 1 | password in env | `no-vault` |
| 2 | Vault KV v2 with a fixed app token | `kv` |
| 3 | Vault database engine, 30 s leases | `dynamic` |
| 4 | pod logs in with its service account (Kubernetes auth); a pod with another SA gets 403 | `kubernetes` (profile k8s) |
| 5 | Vault Secrets Operator 1.6.0 keeps a Secret fresh for the *stage 1* app; rotates ~every 40 s | `vso` (profile k8s) |

Plus: compare table (all stages), leak test (stolen creds after 35 s: 1–2 still work, 3 fails), ACL policy checks,
Sentinel EGP (time window, hard vs soft-mandatory, override; needs Enterprise).

Everything is verified live and in headless Chrome (light/dark, 390 px width, recorded/offline mode). Details,
content rules, rejected ideas and observed timings are in `vault-secrets-journey/SPEC.md`.

## How the kit works (template, copied into each demo)

- `runner/app.py` — FastAPI. Runs **only** what `scenarios.yaml` declares (scenario id + allowlisted params).
  Step kinds: `vault`, `http`, `k8s` (read-only GET), `wait`; fields `headers`, `save`, `show` (with `|base64`),
  `expect`, plus `cleanup:` steps that run even if the page disconnects. Same-origin guard on `/api/*`.
- `runner/events.py` — live activity: tails Vault's audit log, the Postgres log (`PG_LOG`), polls `watches:`
  in Kubernetes, adds the runner's own calls; holds events 0.6 s and releases them in occurrence order at
  `/api/events` (SSE). `actors:` (IP → Compose service) and `identities:` (Vault display name → actor) in
  `scenarios.yaml` name the callers.
- `page/shell.js` / `shell.css` — page frame, declarative scenario blocks (`data-scenario`, `data-param`,
  `data-requires="enterprise|k8s"`), live/recorded badge, theme toggle (System/Light/Dark), activity dock,
  collapsible results, and the **Flow** animator: `data-actor` on boxes, `data-flow="from>to"` on edges
  (`data-flow-label` regex, `data-flow-delay`, `data-flow-only`), ticker under each diagram.
- `tools/record-mocks.py` — records every scenario × param combination plus its live activity into `page/mocks.js`.

Change shared files in `template/` first, then copy into demos (`cmp` shows drift).

## Gotchas learned the hard way

- **Escapes:** Git Bash here-docs turn `\n` into real newlines. Edit code containing backslashes with the Edit
  tool, not via heredoc-fed scripts. (Hit four times.)
- **Line endings:** `.gitattributes` forces LF. Python `write_text` on Windows writes CRLF — use `write_bytes`
  or `newline="\n"`. CRLF in `seed.sh` breaks the container.
- **From Git Bash into WSL:** prefix with `MSYS_NO_PATHCONV=1`, or `/mnt/c/...` paths get rewritten.
  Put multi-line commands in a script file; nested quoting through `wsl.exe` breaks.
- **`localhost` from Windows Python** tries IPv6 first (~2 s delay); use `127.0.0.1`.
- **Seeds re-run on every `up`**: every create must be guarded (lookup first).
- **Runner image bakes in `app.py`/`events.py`**: rebuild (`up --build -d runner`) after changes. `scenarios.yaml`
  and `page/` are mounted and apply immediately.
- **k3s:** image `rancher/k3s:v1.34.1-k3s1`; `kubectl` is a symlink (`k3s kubectl` fails in the healthcheck);
  TLS dir is root-only; app image is imported at boot from a tarball the one-shot `image-loader` builds with kaniko (no engine socket) — a new
  app image needs a k3s restart (simplest: `down -v` + `up`).
- **Kubernetes auth from outside the cluster:** Vault reviews logins with the client JWT, so client tokens must
  carry the API server audience (a `vault`-only audience breaks TokenReview). k3s default SA tokens live a year.
- **VSO:** `LeaseRenewal` condition flips to `SecretLeaseRenewalError` for a moment at each max-TTL boundary — normal.
- **Postgres DDL log lines contain generated passwords**; `events.py` forwards only verb + role name. Vault drops
  users via prepared statements (`execute stmt_…: DROP ROLE`).

## Next steps (pick up here)

1. **Presenter-paced steps** in the template: a scenario pauses between steps until "Next" (idea from the coworker's
   repo). Fits the animation work: let each step's activity play out before moving on.
2. **A step kind that runs an allowlisted command in a container** (`kubectl exec`, `vault` CLI) — needed for
   SPIFFE-style demos where the interesting call happens inside a workload.
3. **Control Groups** chapter (Enterprise): credentials only after a second identity approves.
4. **A second demo from the template**, e.g. SPIFFE/SPIRE + Vault, using the coworker's `vault-spiffe-demo` as reference.
5. Smaller items:
   - persist the ad-hoc Playwright checks (overflow, themes, live/offline, collapse) as `tools/check-page.py`;
   - `new-demo.sh`: optionally copy `.env`;
   - stage 4 diagram also ticks for the stage 5 app's DB connections (both come from the k3s IP); acceptable,
     but a per-pod source would need pod IP mapping (`actors` resolves only Compose names);
   - a short-lived projected token with a `vault` audience for stage 4 needs a reviewer token in Vault.
6. Possibly move the repo to a remote (none configured yet).
