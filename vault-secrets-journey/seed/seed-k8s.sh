#!/bin/sh
# Stage 4 (profile k8s): Vault's Kubernetes auth method for the k3s cluster.
# Must be safe to run twice: every `docker compose up` re-runs it.
set -eu

echo "seed-k8s: kubernetes auth method"
vault auth list -format=json | grep -q '"kubernetes/"' || vault auth enable kubernetes

# No token_reviewer_jwt: Vault runs outside the cluster, so it reviews each login with the
# client's own JWT (the service accounts have system:auth-delegator, see k8s/demo.yaml).
vault write auth/kubernetes/config \
  kubernetes_host=https://k3s:6443 \
  kubernetes_ca_cert=@/k3s/server/tls/server-ca.crt \
  disable_local_ca_jwt=true

echo "seed-k8s: role orders-api -> policy app-dynamic, only for orders/orders-api"
vault write auth/kubernetes/role/orders-api \
  bound_service_account_names=orders-api \
  bound_service_account_namespaces=orders \
  audience=https://kubernetes.default.svc.cluster.local \
  policies=app-dynamic \
  ttl=10m

echo "seed-k8s: stage 5, role orders-vso for the Vault Secrets Operator (orders/orders-vso)"
vault policy write orders-vso - <<'EOF'
# The operator fetches database credentials on behalf of the orders namespace.
# Renewing them is covered by the default policy (sys/leases/renew).
path "database/creds/app" {
  capabilities = ["read"]
}
EOF
vault write auth/kubernetes/role/orders-vso \
  bound_service_account_names=orders-vso \
  bound_service_account_namespaces=orders \
  audience=https://kubernetes.default.svc.cluster.local \
  policies=orders-vso \
  ttl=10m

echo "seed-k8s: done"
