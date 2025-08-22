provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = "${var.service_name}-repo"
  description   = "Docker repository for ${var.service_name}"
  format        = "DOCKER"
}

# Get the project number
data "google_project" "project" {}

# --- Secrets Manager ---
data "google_secret_manager_secret_version" "github_pat" {
  project = var.project_id
  secret  = var.github_pat_secret_name
}

data "google_secret_manager_secret_version" "gemini_api_key" {
  project = var.project_id
  secret  = var.gemini_api_key_secret_name
}

# --- IAM for Cloud Build Service Account ---
resource "google_project_iam_member" "cloudbuild_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

resource "google_project_iam_member" "cloudbuild_service_account_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

# --- IAM for Cloud Run Service Account to access secrets ---
resource "google_secret_manager_secret_iam_member" "github_pat_accessor" {
  project   = var.project_id
  secret_id = data.google_secret_manager_secret_version.github_pat.secret
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}

resource "google_secret_manager_secret_iam_member" "gemini_api_key_accessor" {
  project   = var.project_id
  secret_id = data.google_secret_manager_secret_version.gemini_api_key.secret
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}


resource "google_cloud_run_v2_service" "default" {
  name     = var.service_name
  location = var.region

  template {
    containers {
      image = var.image_name
      ports {
        container_port = 3000
      }
      env {
        name  = "NEXT_PUBLIC_GITHUB_REPO_URL"
        value = var.github_repo_url
      }
      env {
        name = "GITHUB_PAT"
        value_source {
          secret_key_ref {
            secret  = var.github_pat_secret_name
            version = "latest"
          }
        }
      }
      env {
        name = "GEMINI_API_KEY"
        value_source {
          secret_key_ref {
            secret  = var.gemini_api_key_secret_name
            version = "latest"
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    type            = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}

resource "google_cloud_run_service_iam_member" "noauth" {
  location = google_cloud_run_v2_service.default.location
  service  = google_cloud_run_v2_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
