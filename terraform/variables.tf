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
