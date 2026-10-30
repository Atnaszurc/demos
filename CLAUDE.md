# CLAUDE.md

## Working on a demo

- Read the demo's `SPEC.md` before changing anything, and update it afterwards (current shape + rejected ideas).
- Each demo is self-contained. `runner/`, `page/shell.css`, `page/shell.js` and `tools/` are copies of `template/`:
  change the template first, then copy the change into the demos that need it.
- Validate one chapter end to end before building the rest; wait for review.
- Don't commit without the user's review.

## Rules

- The page can only run what `scenarios.yaml` declares. Never add runner endpoints that accept arbitrary paths,
  URLs or shell commands.
- Published ports bind to `127.0.0.1` only. Dev-mode Vault has a known root token.
- `seed/seed.sh` must be safe to run twice: every `docker compose up` re-runs it (guard creates with a lookup).
- Stacks are ephemeral: no named volumes except scratch ones, everything removed by `docker compose down -v`.
- Shell scripts must keep LF line endings (`.gitattributes` enforces it); they run inside Linux containers.
- After changing scenarios, re-record mocks (`python tools/record-mocks.py`) so offline mode matches live mode.
- Label demo-only shortcuts on the page (dev mode, fixed tokens, debug endpoints).
- Colours only via the tokens in `shell.css` (light + dark sets); no hex values in page styles. Theme follows the
  browser unless the header toggle picked one. Check both themes and 390 px width (no horizontal scroll).
- Grid and flex children that hold code or JSON need `min-width: 0`, or long lines push the page wider.
- Diagrams animate real events: tag nodes `data-actor="name"` and edges `data-flow="from>to"` (optional
  `data-flow-label` regex, `data-flow-delay`, `data-flow-only`). Actor names come from `actors:` / `identities:`
  in scenarios.yaml. Never animate something that did not happen; mark derived events `inferred` (events.py).
- Code with backslash escapes (`\n`, regexes): edit with the Edit tool, not through Git Bash here-docs, which
  turn `\n` into real newlines.
- Page patterns, animation and content rules: `docs/interactive-architecture-demo-playbook.md`.

## Verify

```bash
docker compose config -q                 # compose file valid
node -e "const h=require('fs').readFileSync('page/index.html','utf8');for(const m of h.matchAll(/<script>([\s\S]*?)<\/script>/g))new Function(m[1]);console.log('inline scripts ok')"
docker compose up --build -d && docker compose logs seed   # ends with "seed: done"
# open http://localhost:8080, badge says Live, click every scenario
docker compose down -v
```
