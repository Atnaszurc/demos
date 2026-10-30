/* Demo shell: page frame + runner client. Shared by every demo (copied from template/).
 *
 * Live mode:  the page is served by the runner, scenarios run against the real stack.
 * Mock mode:  runner unreachable (or file://), scenarios replay window.DEMO_MOCKS,
 *             recorded with tools/record-mocks.py.
 *
 * Declarative scenario blocks (no JS needed per widget):
 *   <div class="scenario" data-scenario="id" data-params='{"k":"v"}' data-diagram="#svg-id">
 *     <select data-param="k">…</select> <button class="btn" data-run>Run</button>
 *     <div class="scenario-output"></div>
 *   </div>
 * Every runner event is also dispatched on the block as a `demo:event` CustomEvent.
 * data-requires="enterprise" (or "k8s", …) disables a block when the live stack lacks that feature.
 */
(() => {
  const SERVED = location.protocol.startsWith('http');
  const MIN_RUN_MS = 600;
  const MOCK_WAIT_CAP_S = 3;
  const MOCK_GAP_CAP_MS = 1200;
  const REDUCE_MOTION = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const Demo = (window.Demo = { live: false, vault: null });

  /* ---------- helpers ---------------------------------------------------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function colorJson(value) {
    const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    return esc(text)
      .replace(/(&quot;[^&\n]*?&quot;)(\s*:)/g, '<span class="jk">$1</span>$2')
      .replace(/: (&quot;.*?&quot;)(,?)$/gm, ': <span class="js">$1</span>$2')
      .replace(/: (-?\d+(?:\.\d+)?)(,?)$/gm, ': <span class="jn">$1</span>$2')
      .replace(/: (true|false|null)(,?)$/gm, ': <span class="jb">$1</span>$2');
  }
  Demo.colorJson = colorJson;
  Demo.esc = esc;

  function mockKey(id, params) {
    const keys = Object.keys(params || {}).sort();
    return keys.length ? `${id}?${keys.map((k) => `${k}=${params[k]}`).join('&')}` : id;
  }

  /* ---------- live / mock detection -------------------------------------- */
  const badge = document.querySelector('[data-live-badge]');
  async function checkHealth() {
    if (!SERVED) return setLive(false);
    try {
      const res = await fetch('/api/health', { cache: 'no-store' });
      const body = await res.json();
      setLive(res.ok && body.live, body.vault, body.features);
    } catch {
      setLive(false);
    }
  }
  function setLive(live, vault, features) {
    Demo.live = !!live;
    Demo.vault = vault || null;
    Demo.features = features || {};
    // data-requires="<feature>": usable in recorded mode (recordings include every feature) or when the
    // live stack reports the feature (/api/health → features: enterprise, k8s, …).
    document.querySelectorAll('[data-requires]').forEach((block) => {
      const missing = Demo.live && !Demo.features[block.dataset.requires];
      if (block.classList.contains('is-unavailable') === missing) return; // unchanged: don't touch a running block
      block.classList.toggle('is-unavailable', missing);
      block.querySelectorAll('[data-run]').forEach((btn) => { btn.disabled = missing; });
    });
    if (!badge) return;
    badge.classList.toggle('is-live', Demo.live);
    badge.textContent = Demo.live
      ? `Live${vault && vault.version ? ` · Vault ${vault.version}` : ''}`
      : 'Recorded data';
    badge.title = Demo.live ? 'Scenarios run against the local Docker stack' : 'Runner not reachable: replaying recorded runs';
  }

  /* ---------- running scenarios ------------------------------------------ */
  Demo.run = async function run(id, params, onEvent) {
    if (Demo.live) {
      try {
        return await runLive(id, params, onEvent);
      } catch (err) {
        onEvent({ event: 'error', message: `Runner error: ${err.message}` });
        return;
      }
    }
    return replayMock(id, params, onEvent);
  };

  async function runLive(id, params, onEvent) {
    const res = await fetch(`/api/scenario/${encodeURIComponent(id)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ params }),
    });
    if (!res.ok) {
      onEvent({ event: 'error', message: `${res.status}: ${await res.text()}` });
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      let nl;
      while ((nl = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, nl).trim();
        buf = buf.slice(nl + 1);
        if (line) onEvent(JSON.parse(line));
      }
    }
  }

  async function replayMock(id, params, onEvent) {
    const events = (window.DEMO_MOCKS || {})[mockKey(id, params)];
    if (!events) {
      onEvent({ event: 'error', message: 'No recording for this scenario. Start the stack (docker compose up --build -d) and open the page from the runner, or record with tools/record-mocks.py.' });
      return;
    }
    // Recordings carry `dt` (ms since the run started) and the live activity (`event: "bus"`) seen during
    // the run. Gaps are capped, so waits replay faster but the order is the recorded one.
    let prev = 0;
    for (const ev of events) {
      if (typeof ev.dt === 'number') {
        await sleep(Math.max(0, Math.min(ev.dt - prev, MOCK_GAP_CAP_MS)));
        prev = ev.dt;
      } else {  // older recordings without timing
        if (ev.event === 'step-start') await sleep(ev.kind === 'wait' ? Math.min(ev.seconds || 0, MOCK_WAIT_CAP_S) * 1000 : 0);
        if (ev.event === 'step') await sleep(250);
      }
      if (ev.event === 'bus') Demo.activity({ ...ev, mock: true });
      else onEvent({ ...ev, mock: true });
    }
  }

  /* ---------- rendering runner events ------------------------------------ */
  function renderEvent(out, ev, state) {
    if (ev.event === 'step-start') {
      const card = document.createElement('div');
      card.className = 'step is-pending';
      card.innerHTML = `<div class="step-head"><span class="step-title">${esc(ev.title || 'Step')}</span><span class="step-meta"></span></div>`;
      out.appendChild(card);
      state.cards[ev.index] = card;
      if (ev.kind === 'wait' && ev.seconds) startCountdown(card, ev.seconds, ev.mock);
      return;
    }
    if (ev.event === 'step') {
      const card = state.cards[ev.index] || out.appendChild(document.createElement('div'));
      clearInterval(card._timer);
      card.className = 'step';
      if (ev.kind === 'wait') {
        card.innerHTML = `<div class="step-head"><span class="pill wait">wait</span><span class="step-title">${esc(ev.title || 'Wait')}</span><span class="step-meta">${ev.seconds}s${ev.mock ? ' (replayed faster)' : ''}</span></div>`;
        return;
      }
      const pillClass = ev.ok ? 'ok' : 'fail';
      const target = ev.request ? `${ev.request.method} ${ev.request.target}${ev.request.path}` : '';
      // A finished step is a <details>: click its header to fold the command and response away.
      const done = document.createElement('details');
      done.className = 'step';
      done.open = true;
      done.innerHTML = `
        <summary class="step-head" title="Click to show or hide this step's details">
          <span class="pill ${pillClass}">${ev.status}</span>
          <span class="step-title">${esc(ev.title || target)}</span>
          <span class="step-meta">${esc(target)} · ${ev.ms} ms</span>
        </summary>
        ${ev.command ? `<div class="step-cmd">${esc(ev.command)}</div>` : ''}
        ${ev.response === '' || ev.response == null ? '<div class="step-empty">(no content)</div>' : `<pre>${colorJson(ev.response)}</pre>`}
        ${multilineFields(ev.response).map(([path, text]) => `<div class="step-text-label">${esc(path)}</div><pre class="step-text">${esc(text)}</pre>`).join('')}`;
      card.replaceWith(done);
      state.cards[ev.index] = done;
      return;
    }
    if (ev.event === 'error') {
      const card = document.createElement('div');
      card.className = 'step is-error';
      card.textContent = ev.message;
      out.appendChild(card);
    }
  }

  // Multi-line strings inside a response (policies, certificates) are unreadable as escaped JSON: show them as text.
  function multilineFields(value, path = '', out = []) {
    if (typeof value === 'string' && value.includes('\n') && path) out.push([path, value]);
    else if (value && typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => multilineFields(v, path ? `${path}.${k}` : k, out));
    }
    return out;
  }

  function startCountdown(card, seconds, mock) {
    const meta = card.querySelector('.step-meta');
    const end = Date.now() + (mock ? Math.min(seconds, MOCK_WAIT_CAP_S) : seconds) * 1000;
    const tick = () => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      meta.textContent = mock ? `${seconds}s (replayed faster)` : `${left}s left`;
    };
    tick();
    card._timer = setInterval(tick, 250);
  }

  function wireScenario(block) {
    const button = block.querySelector('[data-run]');
    const out = block.querySelector('.scenario-output') || block.appendChild(Object.assign(document.createElement('div'), { className: 'scenario-output' }));
    if (!button) return;
    // Hide / show the whole result; appears once the block has run.
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'btn ghost scenario-toggle';
    toggle.hidden = true;
    button.before(toggle);
    const setHidden = (hidden) => {
      out.hidden = hidden;
      toggle.textContent = hidden ? 'Show result' : 'Hide result';
      toggle.setAttribute('aria-expanded', String(!hidden));
    };
    toggle.addEventListener('click', () => setHidden(!out.hidden));

    button.addEventListener('click', async () => {
      const params = { ...JSON.parse(block.dataset.params || '{}') };
      block.querySelectorAll('[data-param]').forEach((el) => { params[el.dataset.param] = el.value; });
      const diagram = block.dataset.diagram && document.querySelector(block.dataset.diagram);
      const state = { cards: [] };
      out.innerHTML = '';
      toggle.hidden = false;
      setHidden(false);
      button.disabled = true;
      diagram && diagram.classList.add('is-running');
      const started = Date.now();
      await Demo.run(block.dataset.scenario, params, (ev) => {
        renderEvent(out, ev, state);
        block.dispatchEvent(new CustomEvent('demo:event', { detail: ev }));
      });
      await sleep(Math.max(0, MIN_RUN_MS - (Date.now() - started)));
      diagram && diagram.classList.remove('is-running');
      button.disabled = false;
    });
  }

  /* ---------- live flow: real events travel along diagram edges ----------- */
  // Markup:
  //   <path class="flow" data-flow="app-kv>vault, app-dynamic>vault"   from>to pairs (either direction)
  //         data-flow-label="ROLE"      optional regex the event label must match
  //         data-flow-delay="650"       optional ms after the first edge (chains through several edges)
  //         data-flow-only="ok">        optional: only for this status (e.g. stop a denied request early)
  //   <rect data-actor="vault postgres">  pulses when an event arrives at (or leaves, without an edge) an actor
  // Only diagrams on screen animate. Events are queued per diagram so bursts play one after another.
  const Flow = (() => {
    const visible = new Set();
    const nextLaunch = new WeakMap();
    const SPACING = 280;
    const TRAVEL = 750;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target);
    }), { threshold: 0.15 });
    document.querySelectorAll('svg.diagram').forEach((svg) => io.observe(svg));

    const pairs = (el) => el.dataset.flow.split(',').map((p) => p.split('>').map((s) => s.trim()));
    const later = (ms, fn) => setTimeout(fn, Math.max(0, ms));

    // Actors a diagram knows about: its [data-actor] nodes, its [data-flow] ends, and the presenter.
    const knownCache = new WeakMap();
    function known(svg) {
      if (!knownCache.has(svg)) {
        const names = new Set(['you']);
        svg.querySelectorAll('[data-actor]').forEach((n) => n.dataset.actor.split(/\s+/).forEach((a) => names.add(a)));
        svg.querySelectorAll('[data-flow]').forEach((p) => pairs(p).flat().forEach((a) => names.add(a)));
        knownCache.set(svg, names);
      }
      return knownCache.get(svg);
    }

    function play(ev) {
      visible.forEach((svg) => {
        const names = known(svg);
        if (!names.has(ev.from) || !names.has(ev.to)) return;  // e.g. the operator's calls on the stage 2 diagram
        const now = performance.now();
        const launch = Math.max(now, nextLaunch.get(svg) || 0);
        let used = false;
        let filtered = false;
        svg.querySelectorAll('[data-flow]').forEach((path) => {
          for (const [a, b] of pairs(path)) {
            const forward = a === ev.from && b === ev.to;
            if (!forward && !(a === ev.to && b === ev.from)) continue;
            if ((path.dataset.flowOnly && path.dataset.flowOnly !== ev.status)
              || (path.dataset.flowLabel && !new RegExp(path.dataset.flowLabel).test(ev.label || ''))) {
              filtered = true;
              break;
            }
            const at = launch + Number(path.dataset.flowDelay || 0);
            later(at - now, () => travel(svg, path, ev, !forward));
            used = true;
            break;
          }
        });
        if (filtered && !used) return;  // the diagram's own edge rejected it: no pulse, no ticker either
        let touched = used;
        svg.querySelectorAll('[data-actor]').forEach((node) => {
          const actors = node.dataset.actor.split(/\s+/);
          if (actors.includes(ev.to)) {
            later(launch - now + (used ? TRAVEL : 0), () => pulse(node, ev.status));
            touched = true;
          } else if (!used && actors.includes(ev.from)) {
            later(launch - now, () => pulse(node, ev.status));
            touched = true;
          }
        });
        if (touched) later(launch - now, () => ticker(svg, ev));
        if (used) nextLaunch.set(svg, launch + SPACING);
      });
    }

    // Text for the events this diagram shows, newest first, under the diagram (edges are too short for labels).
    function ticker(svg, ev) {
      let box = svg.nextElementSibling;
      if (!box || !box.classList.contains('flow-ticker')) {
        box = document.createElement('div');
        box.className = 'flow-ticker';
        box.setAttribute('aria-live', 'off');
        svg.after(box);
      }
      const row = document.createElement('div');
      row.className = `flow-row ${ev.source || 'http'} ${ev.status || 'ok'}${ev.inferred ? ' inferred' : ''}`;
      row.innerHTML = `<span class="dot"></span><span class="who">${esc(ev.from)} → ${esc(ev.to)}</span>`
        + `<span class="what">${ev.status === 'denied' ? '✕ ' : ''}${esc(ev.label || '')}${ev.inferred ? ' (inferred)' : ''}</span>`;
      box.prepend(row);
      while (box.children.length > 3) box.lastChild.remove();
    }

    function layer(svg) {
      let g = svg.querySelector(':scope > g.flow-layer');
      if (!g) {
        g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('class', 'flow-layer');
        svg.appendChild(g);
      }
      return g;
    }

    function travel(svg, path, ev, reverse) {
      const cls = `${ev.source || 'http'} ${ev.status || 'ok'}${ev.inferred ? ' inferred' : ''}`;
      if (REDUCE_MOTION) {
        path.classList.add('is-lit');
        later(800, () => path.classList.remove('is-lit'));
        return;
      }
      const len = path.getTotalLength();
      const dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('r', '6');
      dot.setAttribute('class', `packet ${cls}`);
      layer(svg).appendChild(dot);
      const start = performance.now();
      const frame = (now) => {
        const p = Math.min(1, (now - start) / TRAVEL);
        const eased = p < 0.5 ? 2 * p * p : 1 - ((-2 * p + 2) ** 2) / 2;
        const pt = path.getPointAtLength(len * (reverse ? 1 - eased : eased));
        dot.setAttribute('cx', pt.x);
        dot.setAttribute('cy', pt.y);
        if (p < 1) requestAnimationFrame(frame);
        else {
          dot.classList.add('is-done');
          later(350, () => dot.remove());
        }
      };
      requestAnimationFrame(frame);
    }

    function pulse(node, status) {
      const cls = status === 'denied' ? 'is-hit-denied' : 'is-hit';
      node.classList.remove('is-hit', 'is-hit-denied');
      void node.getBBox();  // restart the CSS animation
      node.classList.add(cls);
      later(900, () => node.classList.remove(cls));
    }

    return { play };
  })();

  /* ---------- activity dock: every live event, newest first ---------------- */
  const dock = document.querySelector('[data-audit-dock]');
  const dockList = dock && dock.querySelector('.audit-list');
  const dockEmpty = dock && dock.querySelector('.audit-empty');
  const dockCount = dock && dock.querySelector('.count');
  let dockN = 0;

  function addDockRow(ev) {
    if (!dock || ev.response) return;  // responses animate, but would double the list
    dockEmpty.hidden = true;
    const li = document.createElement('li');
    li.className = `${ev.backlog ? '' : 'is-new'}${ev.status === 'denied' ? ' is-denied' : ''}`;
    const time = ev.t ? new Date(ev.t).toLocaleTimeString([], { hour12: false }) : '';
    li.innerHTML = `<span>${esc(time)}</span><span class="src src-${esc(ev.source)}">${esc(ev.source)}</span>`
      + `<span class="path"><span class="who" title="${esc((ev.policies || []).join(', '))}">${esc(ev.from)} → ${esc(ev.to)}</span> ${esc(ev.label)}`
      + `${ev.override ? ' <span class="override">override</span>' : ''}${ev.inferred ? ' <span class="inferred-tag">inferred</span>' : ''}`
      + `${ev.detail && !ev.inferred ? ` · ${esc(ev.detail)}` : ''}</span>`;
    dockList.prepend(li);
    while (dockList.children.length > 80) dockList.lastChild.remove();
    dockCount.textContent = `${++dockN} events`;
  }

  // One entry point for live events (server-sent) and recorded ones (mock replay).
  Demo.activity = (ev) => {
    addDockRow(ev);
    if (!ev.backlog) Flow.play(ev);
  };

  function startActivity() {
    if (!dock) return;
    if (matchMedia('(max-width: 760px)').matches) dock.open = false; // phones: start collapsed
    if (!SERVED || !window.EventSource) {
      dockEmpty.textContent = 'Recorded runs replay their activity here.';
      return;
    }
    const source = new EventSource('/api/events');
    source.onopen = () => { dockEmpty.textContent = 'Waiting for activity…'; };
    source.onerror = () => { dockEmpty.textContent = 'Activity stream disconnected, retrying…'; };
    source.onmessage = (msg) => Demo.activity(JSON.parse(msg.data));
  }

  /* ---------- page frame: progress, active chapter, reveal, drawer ------- */
  function startFrame() {
    const progress = document.querySelector('.progress');
    const links = [...document.querySelectorAll('.chapters-nav a[href^="#"]')];
    const chapters = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress && progress.style.setProperty('--progress', `${Math.min(100, (scrollY / Math.max(1, max)) * 100)}%`);
      let idx = 0;
      chapters.forEach((c, i) => { if (c.getBoundingClientRect().top - innerHeight / 3 <= 0) idx = i; });
      links.forEach((a, i) => a.classList.toggle('active', i === idx));
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();

    const reveal = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')), { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.subsection').forEach((el) => reveal.observe(el));

    const drawer = document.querySelector('[data-drawer]');
    const nodes = window.DEMO_NODES || {};
    if (!drawer) return;
    const open = (key) => {
      const n = nodes[key];
      if (!n) return;
      drawer.querySelector('[data-drawer-kind]').textContent = n.kind || '';
      drawer.querySelector('[data-drawer-name]').textContent = n.name;
      drawer.querySelector('[data-drawer-body]').textContent = n.body;
      const dl = drawer.querySelector('dl');
      dl.innerHTML = Object.entries(n.meta || {}).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('');
      drawer.classList.add('open');
    };
    const close = () => drawer.classList.remove('open');
    document.querySelectorAll('.node[data-node]').forEach((el) => {
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el.dataset.node); } });
    });
    document.addEventListener('click', (e) => {
      const node = e.target.closest('.node[data-node]');
      if (node) return open(node.dataset.node);
      if (!e.target.closest('[data-drawer]')) close();
    });
    drawer.querySelector('.drawer-close').addEventListener('click', close);
    addEventListener('keydown', (e) => e.key === 'Escape' && close());
  }

  /* ---------- theme: System (browser setting) → Light → Dark -------------- */
  // The head of index.html applies a saved choice before first paint; this wires the toggle.
  function startThemeToggle() {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;
    const ORDER = ['system', 'light', 'dark'];
    const LABEL = { system: '◐ System', light: '○ Light', dark: '● Dark' };
    let theme = document.documentElement.dataset.theme || 'system';
    const apply = () => {
      if (theme === 'system') delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = theme;
      button.textContent = LABEL[theme];
      button.title = `Theme: ${theme}${theme === 'system' ? ' (follows the browser)' : ''}. Click to change.`;
      try { localStorage.setItem('demo-theme', theme); } catch { /* storage blocked: choice lasts this page view */ }
    };
    button.addEventListener('click', () => { theme = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]; apply(); });
    apply();
  }

  /* ---------- boot ------------------------------------------------------- */
  startThemeToggle();
  startFrame();
  document.querySelectorAll('[data-scenario]').forEach(wireScenario);
  checkHealth().then(startActivity);
  setInterval(checkHealth, 10000);
})();
