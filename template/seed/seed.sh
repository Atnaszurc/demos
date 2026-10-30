#!/bin/sh
# Configures Vault for this demo. Dev mode starts empty, so this is the whole
# Vault setup. Must be safe to run twice: every `docker compose up` re-runs it.
set -eu

echo "seed: audit device (feeds the audit dock on the page)"
vault audit list -format=json 2>/dev/null | grep -q '"file/"' \
  || vault audit enable file file_path=/vault/logs/audit.log

# Add this demo's engines, policies and identities below.

echo "seed: done"
