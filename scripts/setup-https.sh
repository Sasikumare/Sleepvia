#!/usr/bin/env bash
set -euo pipefail

echo "Setting up HTTPS with cert-manager (Production)..."

# Configuration
PROJECT_ID=${PROJECT_ID:-$(gcloud config get-value project)}
CLUSTER_NAME=${CLUSTER_NAME:-sleepvia-cluster}
CLUSTER_ZONE=${CLUSTER_ZONE:-us-central1-a}

echo "Cluster: $CLUSTER_NAME"
echo "Zone: $CLUSTER_ZONE"

# Get cluster credentials
echo "Fetching GKE credentials..."
gcloud container clusters get-credentials "$CLUSTER_NAME" --zone "$CLUSTER_ZONE" --project "$PROJECT_ID"

# Install cert-manager using Helm
echo "Installing cert-manager..."
helm repo add jetstack https://charts.jetstack.io 2>/dev/null || true
helm repo update

# Create namespace for cert-manager
kubectl create namespace cert-manager --dry-run=client -o yaml | kubectl apply -f -

# Install cert-manager CRDs
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.crds.yaml

# Install cert-manager Helm chart
helm upgrade --install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v1.13.0 \
  --wait

echo "Waiting for cert-manager to be ready..."
kubectl rollout status deployment/cert-manager -n cert-manager --timeout=300s
kubectl rollout status deployment/cert-manager-webhook -n cert-manager --timeout=300s

echo "Creating Let's Encrypt issuer (edesasikumar@gmail.com)"
kubectl apply -f k8s/cert-issuer.yaml

echo "Applying updated ingress with HTTPS..."
kubectl apply -f k8s/ingress.yaml

echo ""
echo "✓ HTTPS setup complete!"
echo ""
echo "Next steps:"
echo "1. Wait a few minutes for the certificate to be issued (~5-10 min)"
echo "2. Check certificate status:"
echo "   kubectl get certificate sleepvia-tls-cert -w"
echo "3. Check ingress status:"
echo "   kubectl get ingress sleepvia-ingress -o wide"
echo "4. Test HTTPS access:"
echo "   curl -I https://sleepvia.duckdns.org/home"
