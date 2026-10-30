#!/bin/sh
# Stage 5 (profile k8s): applies k8s/vso.yaml once the Vault Secrets Operator's CRDs exist.
# Runs in the k3s image (for kubectl). Safe to run twice: `kubectl apply` is idempotent.
set -eu
K="kubectl --kubeconfig /k3s/kubeconfig.yaml --server https://k3s:6443"

echo "vso-setup: waiting for the operator's CRDs (Helm install by k3s)"
for i in $(seq 1 150); do
  $K get crd vaultdynamicsecrets.secrets.hashicorp.com >/dev/null 2>&1 && break
  sleep 2
done
$K wait --for condition=established --timeout=120s \
  crd/vaultconnections.secrets.hashicorp.com \
  crd/vaultauths.secrets.hashicorp.com \
  crd/vaultdynamicsecrets.secrets.hashicorp.com

$K apply -f /k8s/vso.yaml

echo "vso-setup: waiting for the operator to write the orders-db Secret"
for i in $(seq 1 90); do
  $K -n orders get secret orders-db >/dev/null 2>&1 && break
  sleep 2
done
$K -n orders get secret orders-db
echo "vso-setup: done"
