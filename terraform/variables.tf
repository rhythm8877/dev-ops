variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Globally unique name for the S3 bucket"
  type        = string
  default     = "devops-tf-bucket-2026"
}

variable "environment" {
  description = "Deployment environment tag"
  type        = string
  default     = "dev"
}

variable "ecr_repository_name" {
  description = "Name of the ECR repository for the app container image"
  type        = string
  default     = "devops-task-manager"
}

variable "app_name" {
  description = "Application name used as prefix for ECS/ALB resources"
  type        = string
  default     = "devops-task-manager"
}

variable "container_port" {
  description = "Port the container listens on (matches EXPOSE in Dockerfile)"
  type        = number
  default     = 8080
}

variable "desired_count" {
  description = "Number of ECS task replicas"
  type        = number
  default     = 1
}
