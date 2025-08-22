terraform {
  backend "gcs" {
    bucket = "terraform-config-projects"
    prefix = "ideas-app/terraform.tfstate"
  }
}
