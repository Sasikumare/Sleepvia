#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID=${PROJECT_ID:-$(gcloud config get-value project)}
CLUSTER_NAME=${CLUSTER_NAME:-sleepvia-cluster}
CLUSTER_ZONE=${CLUSTER_ZONE:-us-central1-a}
IMAGE_TAG=${1:-"local-$(date +%Y%m%d%H%M%S)"}

if [[ -z "$PROJECT_ID" ]]; then
  echo "ERROR: GCP project ID is required. Set PROJECT_ID or run 'gcloud config set project PROJECT_ID'."
  exit 1
fi

echo "Using project: $PROJECT_ID"
echo "Cluster: $CLUSTER_NAME"
echo "Zone: $CLUSTER_ZONE"
echo "Image tag: $IMAGE_TAG"

echo "Building backend image..."
docker build -t us-west1-docker.pkg.dev/$PROJECT_ID/sleepvia-repo/sleepvia-backend:$IMAGE_TAG ./backend

echo "Pushing backend image..."
docker push us-west1-docker.pkg.dev/$PROJECT_ID/sleepvia-repo/sleepvia-backend:$IMAGE_TAG

echo "Building frontend image..."
docker build -t us-west1-docker.pkg.dev/$PROJECT_ID/sleepvia-repo/sleepvia-frontend:$IMAGE_TAG ./frontend

echo "Pushing frontend image..."
docker push us-west1-docker.pkg.dev/$PROJECT_ID/sleepvia-repo/sleepvia-frontend:$IMAGE_TAG

echo "Fetching GKE credentials..."
gcloud container clusters get-credentials "$CLUSTER_NAME" --zone "$CLUSTER_ZONE" --project "$PROJECT_ID"

echo "Deploying Kubernetes manifests..."
cp k8s/backend-deployment.yaml /tmp/sleepvia-backend-deployment.yaml
cp k8s/frontend-deployment.yaml /tmp/sleepvia-frontend-deployment.yaml
sed -i.bak "s|us-west1-docker.pkg.dev/$PROJECT_ID/sleepvia-repo/sleepvia-backend:.*|us-west1-docker.pkg.dev/$PROJECT_ID/sleepvia-repo/sleepvia-backend:$IMAGE_TAG|g" /tmp/sleepvia-backend-deployment.yaml
sed -i.bak "s|us-west1-docker.pkg.dev/$PROJECT_ID/sleepvia-repo/sleepvia-frontend:.*|us-west1-docker.pkg.dev/$PROJECT_ID/sleepvia-repo/sleepvia-frontend:$IMAGE_TAG|g" /tmp/sleepvia-frontend-deployment.yaml
kubectl apply -f /tmp/sleepvia-backend-deployment.yaml
kubectl apply -f /tmp/sleepvia-frontend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml

echo "Deployment complete. Use 'kubectl get ingress' to find the external IP."