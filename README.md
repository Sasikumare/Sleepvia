# Sleepvia Full-Stack Sample App

A sample full-stack application using React for the frontend and Java Spring Boot for the backend. Includes Dockerfiles and Kubernetes manifests to deploy on Google Kubernetes Engine (GKE).

## Project structure

- `backend/` — Spring Boot REST API
- `frontend/` — React SPA
- `k8s/` — Kubernetes manifests for GKE

## Local development

### Backend

1. Install Java 17 and Maven.
2. Run:
   ```bash
   cd backend
   mvn clean package
   mvn spring-boot:run
   ```
3. Open `http://localhost:8080/api/hello`

### Frontend

1. Install Node.js 20+ and npm.
2. Run:
   ```bash
   cd frontend
   npm install
   npm start
   ```
3. Open `http://localhost:3000`

The frontend proxies `/api` requests to the backend during development.

## Docker build

### Backend image

```bash
cd backend
docker build -t sleepvia-backend:1.0 .
```

### Frontend image

```bash
cd frontend
docker build -t sleepvia-frontend:1.0 .
```

## GKE deployment

1. Authenticate and set your project:
   ```bash
   gcloud auth login
   gcloud config set project PROJECT_ID
   ```
2. Create a cluster:
   ```bash
   gcloud container clusters create sleepvia-cluster --zone us-central1-a
   gcloud container clusters get-credentials sleepvia-cluster --zone us-central1-a
   ```
3. Build and push images:
   ```bash
   export PROJECT_ID=$(gcloud config get-value project)
   docker build -t gcr.io/$PROJECT_ID/sleepvia-backend:1.0 ./backend
   docker push gcr.io/$PROJECT_ID/sleepvia-backend:1.0
   docker build -t gcr.io/$PROJECT_ID/sleepvia-frontend:1.0 ./frontend
   docker push gcr.io/$PROJECT_ID/sleepvia-frontend:1.0
   ```
4. Update the Kubernetes manifests in `k8s/` if you want custom image tags.
5. Apply manifests:
   ```bash
   kubectl apply -f k8s/
   ```
6. Get the ingress IP:
   ```bash
   kubectl get ingress
   ```

Open the external IP in your browser. The React frontend is served publicly, and requests to `/api` are routed to the backend.

## Automated deployment

### GitHub Actions

A workflow is provided at `.github/workflows/gke-deploy.yml`.

Required repository secrets:
- `GKE_PROJECT` — your Google Cloud project ID
- `GKE_CLUSTER` — your GKE cluster name
- `GKE_ZONE` — your cluster zone (for example `us-central1-a`)
- `GKE_SA_KEY` — JSON service account key with permissions for Container Engine and Container Registry

The workflow builds backend and frontend Docker images, pushes them to Google Container Registry, and deploys the Kubernetes manifests.

### Cloud Build

A Cloud Build config is available as `cloudbuild.yaml`.

Set the following substitutions when executing Cloud Build:
- `_CLUSTER_NAME` — your GKE cluster name
- `_CLUSTER_ZONE` — your cluster zone

Run Cloud Build with:
```bash
gcloud builds submit --config cloudbuild.yaml --substitutions=_CLUSTER_NAME="sleepvia-cluster",_CLUSTER_ZONE="us-central1-a"
```

### Local deploy script

A helper script is available at `deploy-gke.sh`.

Usage:
```bash
chmod +x deploy-gke.sh
./deploy-gke.sh [IMAGE_TAG]
```

If `IMAGE_TAG` is omitted, the script uses a timestamp-based tag. The script will:
- build backend and frontend Docker images
- push images to `gcr.io/$PROJECT_ID`
- fetch GKE credentials
- deploy the Kubernetes manifests

You can set environment variables instead of passing parameters:
- `PROJECT_ID`
- `CLUSTER_NAME`
- `CLUSTER_ZONE`

## Notes

- If you use Artifact Registry instead of GCR, replace `gcr.io/$PROJECT_ID/...` with your registry hostname.
- The frontend is configured to call `/api/hello` relative to its host.
- Kubernetes manifests use a LoadBalancer and an ingress for external access.
