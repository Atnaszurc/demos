# <demo name> — working spec

Living spec for this demo. Read it before changing anything; update it after.
Records intent, current shape and rejected ideas so later sessions don't
re-derive or re-litigate them.

## 1. Goal

- Audience: <who>
- The one thing they should remember: <sentence>
- Story order: <chapter → chapter → …> (follow the request, not the component list)

## 2. Stack

| Service | Image | Role |
|---|---|---|
| vault | hashicorp/vault (dev mode) | … |
| seed | hashicorp/vault | one-shot setup, see `seed/seed.sh` |
| runner | ./runner | serves `page/`, runs `scenarios.yaml`, streams the audit log |

## 3. Chapters

| # | id | Point it makes | Scenarios used |
|---|---|---|---|
| 01 | `example` | … | `kv-roundtrip` |

## 4. Content rules

1. Every value shown on the page comes from a real run (live) or a recording of one (mock).
2. Name the products; leave out plumbing (library names, compose details) unless that is the point.
3. Demo-only shortcuts (dev mode, root token, fixed token ids, debug endpoints) are labelled as such on the page.
4. <invariants this demo must never contradict>

## 5. Rejected ideas

- <idea> — <why>

## 6. Verification

```bash
docker compose up --build -d
# open http://localhost:8080, badge must say "Live"; click every scenario
python tools/record-mocks.py        # refresh recordings after changing scenarios
docker compose down -v
# open page/index.html from disk: badge says "Recorded data", scenarios replay
```
