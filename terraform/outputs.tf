output "bucket_name" {
  description = "Name of the created S3 bucket"
  value       = aws_s3_bucket.main.id
}

output "bucket_arn" {
  description = "ARN of the created S3 bucket"
  value       = aws_s3_bucket.main.arn
}

output "bucket_region" {
  description = "Region the bucket was created in"
  value       = aws_s3_bucket.main.region
}

output "ecr_repository_url" {
  description = "URL of the ECR repository (used to docker push)"
  value       = aws_ecr_repository.app.repository_url
}

output "ecr_repository_arn" {
  description = "ARN of the ECR repository"
  value       = aws_ecr_repository.app.arn
}

output "alb_dns_name" {
  description = "Public DNS name of the Application Load Balancer (open this in browser)"
  value       = aws_lb.app.dns_name
}

output "alb_url" {
  description = "Full HTTP URL of the deployed app"
  value       = "http://${aws_lb.app.dns_name}"
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = aws_ecs_service.app.name
}
