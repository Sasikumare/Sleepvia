#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/setup-github-oidc.sh PROJECT_ID GITHUB_ORG GITHUB_REPO
#
# Example:
#   ./scripts/setup-github-oidc.sh project-8dc10e91-6100-4532-bb6 my-org Sleepvia

PROJECT_ID=${1:?PROJECT_ID is required}
GITHUB_ORG=${2:?GITHUB_ORG is required}
GITHUB_REPO=${3:?GITHUB_REPO is required}

WORKLOAD_POOL_NAME=github-actions-pool
PROVIDER_NAME=github-actions-provider
SERVICE_ACCOUNT_NAME=github-actions-sa
SERVICE_ACCOUNT_EMAIL=${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
PROJECT_NUMBER=$(gcloud projects describe ${PROJECT_ID} --format='get(projectNumber)')

cat <<EOF
This will configure Workload Identity for GitHub Actions in project ${PROJECT_ID}.
It will create:
  - Workload identity pool: ${WORKLOAD_POOL_NAME}
  - OIDC provider: ${PROVIDER_NAME}
  - Service account: ${SERVICE_ACCOUNT_EMAIL}

After running, set these GitHub secrets:
  - GCP_WORKLOAD_IDENTITY_PROVIDER
  - GCP_SA_EMAIL
EOF

yes_or_no() {
  read -rp "$1 [y/N]: " answer
  case "${answer}" in
    [Yy]*) return 0 ;; 
    *) return 1 ;;
  esac
}

if ! yes_or_no "Continue?"; then
  echo "Aborted by user."
  exit 1
fi

if gcloud iam workload-identity-pools describe ${WORKLOAD_POOL_NAME} \
  --project=${PROJECT_ID} --location="global" >/dev/null 2>&1; then
  echo "Workload identity pool ${WORKLOAD_POOL_NAME} already exists."
else
  echo "Creating workload identity pool..."
  gcloud iam workload-identity-pools create ${WORKLOAD_POOL_NAME} \
    --project=${PROJECT_ID} \
    --location="global" \
    --display-name="GitHub Actions pool"
fi

echo "Checking OIDC provider..."
if gcloud iam workload-identity-pools providers describe ${PROVIDER_NAME} \
  --project=${PROJECT_ID} --location="global" --workload-identity-pool=${WORKLOAD_POOL_NAME} >/dev/null 2>&1; then
  echo "OIDC provider ${PROVIDER_NAME} already exists."
else
  echo "Creating OIDC provider..."
  gcloud iam workload-identity-pools providers create-oidc ${PROVIDER_NAME} \
    --project=${PROJECT_ID} \
    --location="global" \
    --workload-identity-pool=${WORKLOAD_POOL_NAME} \
    --display-name="GitHub Actions OIDC provider" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --allowed-audiences="repo:${GITHUB_ORG}/${GITHUB_REPO}" \
    --attribute-mapping="google.subject=assertion.sub" \
    --attribute-condition='assertion.iss == "https://token.actions.githubusercontent.com"'
fi

echo "Checking service account..."
if gcloud iam service-accounts describe ${SERVICE_ACCOUNT_EMAIL} \
  --project=${PROJECT_ID} >/dev/null 2>&1; then
  echo "Service account ${SERVICE_ACCOUNT_EMAIL} already exists."
else
  echo "Creating service account..."
  gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} \
    --project=${PROJECT_ID} \
    --display-name="GitHub Actions service account"
fi

echo "Granting Artifact Registry writer role..."
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/artifactregistry.writer"

echo "Granting GKE developer role..."
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/container.developer"

echo "Binding Workload Identity user role for the provider..."
gcloud iam service-accounts add-iam-policy-binding ${SERVICE_ACCOUNT_EMAIL} \
  --project=${PROJECT_ID} \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WORKLOAD_POOL_NAME}/attribute.repository/${GITHUB_ORG}/${GITHUB_REPO}"

echo "Binding Service Account Token Creator role for GitHub Actions..."
gcloud iam service-accounts add-iam-policy-binding ${SERVICE_ACCOUNT_EMAIL} \
  --project=${PROJECT_ID} \
  --role="roles/iam.serviceAccountTokenCreator" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WORKLOAD_POOL_NAME}/attribute.repository/${GITHUB_ORG}/${GITHUB_REPO}"

echo "Done."

echo "Set the following GitHub secrets in your repo:"
echo "  GCP_WORKLOAD_IDENTITY_PROVIDER=projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WORKLOAD_POOL_NAME}/providers/${PROVIDER_NAME}"
echo "  GCP_SA_EMAIL=${SERVICE_ACCOUNT_EMAIL}"
