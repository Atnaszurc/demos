#!/bin/sh
# Configures Vault for this demo. Dev mode starts empty, so this is the whole
# Vault setup. Must be safe to run twice: every `docker compose up` re-runs it.
set -eu

echo "seed: audit device (feeds the audit dock on the page)"
vault audit list -format=json 2>/dev/null | grep -q '"file/"' \
  || vault audit enable file file_path=/vault/logs/audit.log

echo "seed: stage 2, the existing app password moved into KV v2 (dev mode mounts secret/ as KV v2)"
vault kv get secret/app/db >/dev/null 2>&1   || vault kv put secret/app/db username=app 'password=Sup3rS3cret!2019'

echo "seed: stage 3, database secrets engine creating short-lived Postgres users"
vault secrets list -format=json | grep -q '"database/"' || vault secrets enable database
# Demo shortcut: Vault connects as the Postgres superuser.
vault write database/config/orders \
  plugin_name=postgresql-database-plugin \
  connection_url='postgresql://{{username}}:{{password}}@postgres:5432/orders?sslmode=disable' \
  allowed_roles=app \
  username=postgres password=postgres
vault write database/roles/app \
  db_name=orders \
  creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT SELECT ON orders TO \"{{name}}\";" \
  default_ttl=30s max_ttl=60s

echo "seed: policies, one per app"
vault policy write app-kv - <<'EOF'
# Read the shared static database password.
path "secret/data/app/db" {
  capabilities = ["read"]
}
EOF
vault policy write app-dynamic - <<'EOF'
# Ask the database engine for a fresh, short-lived user.
path "database/creds/app" {
  capabilities = ["read"]
}
EOF

echo "seed: app tokens (demo shortcut: fixed ids instead of an auth method)"
for app in app-kv app-dynamic; do
  vault token lookup "$app-token" >/dev/null 2>&1     || vault token create -id="$app-token" -policy="$app" -display-name="$app" -period=24h >/dev/null
done

echo "seed: done"
