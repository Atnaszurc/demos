/* Demo-specific widgets. Generic scenario blocks are wired by shell.js. */

/* Compare: the same request against all three stages, one table row each. */
(() => {
  const root = document.getElementById('compare');
  if (!root) return;
  const button = root.querySelector('[data-compare]');
  const rows = root.querySelectorAll('tbody tr[data-stage]');

  function lifetime(meta) {
    if (meta.source === 'env') return 'Until someone changes it';
    if (meta.source === 'vault-kv') return `Version ${meta.version}, created ${new Date(meta.created_time).toLocaleString()}; until rotated by hand`;
    if (meta.source === 'vault-dynamic') return `${meta.lease_duration} s lease, then Vault drops the user`;
    return '–';
  }

  function fill(row, cells) {
    row.querySelectorAll('td').forEach((td, i) => { if (i > 0) td.textContent = cells[i - 1]; });
  }

  button.addEventListener('click', async () => {
    button.disabled = true;
    for (const row of rows) {
      const feature = row.dataset.requiresFeature;
      if (feature && Demo.live && !(Demo.features || {})[feature]) {
        fill(row, ['not running', '–', 'start the stack with --profile k8s']);
        continue;
      }
      row.classList.add('is-loading');
      fill(row, ['…', '…', '…']);
      let meta = null;
      let error = null;
      // Stages 1-3 share one scenario with a stage param; other rows name their own scenario.
      const [scenario, params] = row.dataset.scenario ? [row.dataset.scenario, {}] : ['request', { stage: row.dataset.stage }];
      await Demo.run(scenario, params, (ev) => {
        if (ev.event === 'step' && ev.ok) meta = ev.response.meta;
        if (ev.event === 'step' && !ev.ok) error = `HTTP ${ev.status}`;
        if (ev.event === 'error') error = ev.message;
      });
      row.classList.remove('is-loading');
      // Stage 5's app reports "env" like stage 1: the difference is who fills the environment.
      const viaOperator = row.dataset.stage === 'vso';
      const from = viaOperator ? 'env ← Secret orders-db (operator)'
        : meta && meta.vault_auth ? `${meta.source} (${meta.vault_auth})` : meta && meta.source;
      const life = viaOperator ? '30 s lease, renewed and rotated by the operator' : meta && lifetime(meta);
      fill(row, meta ? [from, meta.db_user, life] : [error || 'no response', '–', '–']);
    }
    button.disabled = false;
  });
})();
