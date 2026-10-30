# Interactive architecture demo playbook

How to build a single-page, animated, interactive "architecture guide": a
scroll-driven page that explains a solution chapter by chapter, with diagrams
and widgets the reader can poke at. The page works on mocked data in the
browser; the live-backed demos in this repo add a small runner so the same
page can also drive a real, ephemeral stack.

---

## 1. What the deliverable is

- **One HTML page, no build step.** SVG written straight into the markup,
  vanilla JS, no framework. The only external request is the web font from
  Google Fonts.
- **It opens directly from disk or via `python3 -m http.server`**, even when it
  grows to several thousand lines.
- **Scroll-driven chapters in the order a request flows**, not the order of
  the components: problem first, then each hop the request takes, then
  observability, an end-to-end replay, a reference and getting started.
- **Built for three readers at once** (developer, platform engineer,
  security). Every chapter has a short lede for skimmers and depth below.

## 2. How the repo is set up to produce it

The page is only one part. The setup around it is what lets an AI agent keep
improving it across many sessions without breaking it.

```
repo/
├── docs/
│   ├── index.html        # the demo (the only file edited for demo work)
│   ├── SPEC.md           # living spec: intent, chapter shapes, content rules
│   └── README.md         # how to serve + "everything is inline" note
├── <service dirs>/       # real source: read for accuracy, never edited for the demo
├── deploy/               # real manifests + dashboard JSON the demo mirrors
├── .claude/skills/       # design + tooling knowledge the agent loads on demand
│   ├── <design-system>/  # tokens, fonts, icons
│   └── <frontend>/       # motion/typography/perf principles
└── CLAUDE.md             # behaviour rules: simplicity, surgical edits, verify
```

The important pieces:

1. **`SPEC.md` is the memory.** It records the intent, the current shape of
   each chapter down to SVG viewBoxes and coordinates, the content rules, the
   animation rules, and *rejected* designs ("a stepper version was rejected",
   "do not re-add the sandbox"). Any new session reads it first and updates it
   after each change. Without it, every session would re-derive and
   re-litigate the same decisions.
2. **Real source next to the demo, read-only.** Copy, metric names, log event
   names, queries and endpoint paths are taken from the actual services and
   dashboards. That's why the demo reads as credible.
3. **Skills carry the design system.** The agent doesn't invent colours or
   motion. It loads the tokens and the motion and performance rules.
4. **Iterative build.** The first iteration ships only the page frame and two
   or three deep chapters; the rest are placeholders.
5. **Review loop:** chapter by chapter. Recommendations are split into
   **Tier A** (correctness/clarity defects) and **Tier B** (polish), and the
   human picks which tiers to apply. Validate one piece end to end before
   doing the rest. Don't commit without review.

## 3. Page anatomy

### Page frame (shared by every chapter)

| Element | Mechanism |
|---|---|
| Top progress bar | `scroll` listener sets a `--progress` CSS variable; `::before` width reads it |
| Sticky header with chapter links | `.chapters-nav a[data-chapter]`; active one = last chapter whose top passed 1/3 of the viewport |
| Search overlay (`/` key) | Filters the `NODES` registry; arrow keys + Enter open the detail drawer |
| Detail drawer | Any `.node[data-node="key"]` anywhere in the text opens `NODES[key]` |
| JWT hover popover | `.node` whose registry entry has a `jwt` object shows a decoded mock header/payload |
| Bottom pager | Prev/Next + dots generated from the chapter list |
| Reveal on scroll | `IntersectionObserver` adds `.revealed` to `.subsection` |
| Deep links | Each chapter has an `id`; the hash is honoured on load |

### Chapter template

```html
<section id="delegation" class="chapter">
  <div class="page">
    <span class="chapter-num">Chapter 04 · <span class="chip chip-risk">delegation</span></span>
    <h2>Acting on the user's behalf, not <em>as</em> the user</h2>
    <p class="lede">One-paragraph answer for the skimmer.</p>
    <p class="helper">Optional pointer back to a prerequisite.</p>

    <div class="subsection">
      <h3>…</h3>
      <!-- diagram, widget, code, callout -->
      <div class="callout risk">The one thing to remember.</div>
    </div>

    <p class="helper"><strong>Next.</strong> <a href="#authorization">…</a></p>
  </div>
</section>
```

Reuse a fixed vocabulary: `.chapter`, `.subsection`, `.lede`, `.helper`,
`.caption`, `.callout` / `.callout.risk`, `.chip`, `.node`. Every chapter ends
with a "Next." link to the following chapter.

## 4. The data layer: one registry drives everything

```js
const NODES = {
  'token-exchange': {
    kind: 'component',                     // component | token | standard | signal | policy
    name: 'token-exchange (Identity broker)',
    body: 'One-paragraph explanation…',
    meta: { 'Path': 'token-exchange/', 'Port': '8080' },
    // optional: jwt: { header: {...}, payload: {...} }  → hover popover
  },
};
```

That one object feeds the search overlay, the detail drawer, the JWT
popovers and the faceted reference catalog. In the text, any mention becomes
interactive with `<span class="node" data-node="token-exchange">token-exchange</span>`.

Other shared data (rule lists, regexes a widget evaluates) sits at the top of
the script and is reused by several widgets.

**Keep every derived lookup in the registry itself.** A separate map such as
`LAYER` (key → layer) drifts: it ends up naming keys that don't exist and
missing real entries, which then vanish when you filter by layer. Put `layer`
on each `NODES` entry instead.

## 5. Widget patterns

Each widget is a self-contained IIFE that returns early if its root element
is missing, so a section can be deleted without breaking the rest:

```js
(() => {
  const root = document.getElementById('gate-runner');
  if (!root) return;
  // state → render() → event handlers → initial render()
})();
```

| Pattern | What it looks like | Teaches |
|---|---|---|
| **State stepper** | Replay: a `STATES` array of `{title, story, callout, edges, activeNodes, signals}`; play/pause, prev/next, clickable ticks, arrow keys | One request end to end, with headers/logs/metrics at each hop |
| **Break it toggle** | Turn a security layer off and see what breaks; flip an allow rule to deny and the line turns red "refused" | Why each layer exists |
| **Sandbox with real logic** | Type any input, real rules block or mask it while a packet animates through the checks; pick groups + scopes and get a live 200/403 | Lets the presenter take audience input live |
| **Inspector** | Click a card, matching rows highlight in a mock table | Mapping between two concepts |
| **Step-through** | Three pipeline rows lit one at a time | Deterministic pipelines |
| **Hover highlighter** | Hover a claim to see which input-token claims survive into the output token | Data lineage |
| **Fake live dashboard** | Stat tiles that tick up, sparklines, click a stat for logs, click a request id to see a cross-service trace | Observability without a backend |
| **Continuous SMIL loop** | One 6 s loop: tokens stream in, a back-channel ping, a new token streams out | Flows that should play without clicks |
| **Faceted catalog** | Reference chapter: text search + kind/layer chips over `NODES` | Glossary/reference |

Data-driven widgets (state arrays) are what make the demo easy to maintain:
changing the story means editing data, not markup.

## 6. Animation toolkit and rules

**Tools:**

- CSS keyframes for ambient motion: soft pulses, `stroke-dashoffset` line
  drawing, stamps dropping onto a box, sparklines growing.
- SVG SMIL `<animateMotion>` for particles along paths. Use phase windows with
  `keyTimes`/`keyPoints` so several particles share one loop:

  ```html
  <circle r="5" class="flow-particle">
    <animateMotion dur="6s" repeatCount="indefinite"
      path="M 252 80 C 300 80, 320 150, 340 155"
      keyTimes="0; 0.04; 0.42; 1" keyPoints="0; 0; 1; 1"/>
    <animate attributeName="opacity" dur="6s" repeatCount="indefinite"
      values="0; 0; 1; 1; 0; 0" keyTimes="0; 0.04; 0.08; 0.40; 0.45; 1"/>
  </circle>
  ```

- JS toggles classes (`active`, `dim`, `is-blocked`, `is-masked`) and CSS
  transitions do the movement. Arrow markers are swapped
  (`marker-end="url(#arrow-on)"`) to highlight edges.

**Rules:**

1. **Prefer continuous loops over Play/Step** for sequence pictures. Use a
   stepper only when the viewer must read text at each step (the Replay).
2. **Animate only `transform` and `opacity`.** Never `letter-spacing`, width
   or top.
3. **Respect `prefers-reduced-motion`.** Particles get a shared class
   (`flow-particle`) so one CSS rule hides them; JS checks
   `matchMedia('(prefers-reduced-motion: reduce)')` and skips timers/delays.
4. **The viewBox must contain all geometry.** Deny curves and "403" labels
   below the main row are the usual thing that gets clipped.
5. **Arrows end inside their target shape.** Compute the endpoint from the
   target's edge midpoint.
6. **Don't rename SVG ids that JS binds to.** List them in the spec.
7. Colour carries meaning. One accent per layer (identity, transport, policy,
   observability, risk), defined once as CSS variables and reused in SVG fills.

### Live-backed animation (demos/ repo)

In the live-backed demos the diagrams animate what actually happens, about half a second late:
the runner tails Vault's audit log, the database log and selected Kubernetes objects, merges them in
time order, and the page moves a dot along each diagram edge tagged with that `from>to` pair, with a
three-line ticker under the diagram. Rules that came out of building it:

- Only animate events that happened. A derived event (Vault's TokenReview call) is labelled `inferred`.
- A diagram reacts only to events between actors it contains; scope shared edges by label (e.g. user
  name prefix) so background work from another chapter does not look like the viewer's request.
- Put event text in a ticker under the diagram, not on edges: short edges between boxes have no room.
- Release events in occurrence order with a short hold (0.6 s); separate log readers otherwise reorder them.

## 7. Content rules (adapt per demo)

Write these into each demo's `SPEC.md`:

1. **Tell the architecture, not the plumbing.** No library names, deployment
   topology, `.env`, YAML manifests or annotations in the text. Name the
   *products* that are part of the solution story (Vault, Consul, Envoy, OPA,
   the IdP).
2. **Leave out test crutches.** If something was only there to test
   connectivity (static DB credentials), it isn't in the story.
3. **Pin down the invariants** the demo must never contradict, and write them
   in the spec (e.g. "the app never sees a long-lived password"). These are the
   mistakes an agent will repeat otherwise.
4. **Use one consistent fake world:** one persona (Alex), one org, one
   request id, the same token claims across chapters. Label mock data as mock
   ("Illustrative claims only — not a signed or real token").
5. **Use real names for observable things:** metric names, log event names and
   queries copied from the real dashboards. That's what makes the
   observability chapter believable.
6. Use sentence case, no emoji, no exclamation marks.

## 8. Design system

- Tokens as CSS custom properties on `:root`: background/layer/border, text
  levels, a primary colour, support colours, layer accents and their `-wash`
  tints, a spacing scale, motion easings and durations (110/240/400 ms).
- IBM Plex Sans for UI, IBM Plex Mono for code, eyebrows and data.
- Sharp corners, borders instead of shadows.
- Light and dark token sets; the theme follows the browser unless a toggle
  picked one.
- **Don't add new colour tokens** when editing; reuse the existing ones.

## 9. Step-by-step: building a new one

1. **Set up the folder:** `docs/index.html`, `docs/SPEC.md`, `docs/README.md`,
   next to (or with read access to) the real source of the thing being
   demoed. Add a design skill (tokens + fonts) and a `CLAUDE.md` with the
   simplicity/surgical-edit rules.
2. **Write the spec first:** goal, audiences, chapter list in request-flow
   order, content rules and invariants, styling rules, and the verification
   steps.
3. **Iteration 1 is the page frame plus 2–3 deep chapters.** Build the frame
   (tokens, header/nav, progress, search, drawer, pager, `NODES`), the hero,
   and the chapters with the most important story. Other chapters get a
   heading plus lede only.
4. **Review one chapter fully** before building the rest (pilot first).
5. **Add one widget per chapter**, choosing from the pattern table in §5.
   Put its data at the top of its IIFE or in shared constants.
6. **Add the end-to-end Replay** once the chapters exist. It reuses the
   vocabulary the reader has learned.
7. **Add a reference catalog and getting started** at the end.
8. After every change, **update SPEC.md** (current shape plus anything
   rejected and why).
9. Review loop: ask for Tier A / Tier B recommendations per chapter and apply
   the chosen tier.

Useful prompt shape for an agent session:

> Read `docs/SPEC.md` fully, then `docs/index.html`. Only edit
> `docs/index.html` and `docs/SPEC.md`. Source dirs are read-only references.
> Task: <chapter N change>. Follow §7 content rules and §6 animation rules.
> When done, run the verification in §10 and update the spec.

## 10. Verification

```bash
# serve (fetch/file:// issues avoided; also needed for any JSON loading)
python3 -m http.server --directory docs 8765

# JS parses
node -e "const h=require('fs').readFileSync('docs/index.html','utf8');new Function(h.match(/<script>([\s\S]*?)<\/script>/)[1]);console.log('ok')"

# structure balance
grep -c '<section ' docs/index.html; grep -c '</section>' docs/index.html
```

Then click through top to bottom in a browser, with reduced motion both on and
off. Also check:

- Every `data-node="x"` in the markup exists in `NODES`.
- Every key in any derived map (like `LAYER`) exists in `NODES`, and vice versa.
- Copy and code agree: if the text says something is not a metric label, no
  widget logs it as one.
- Phone width: no horizontal scroll, SVGs scale.
