
output "instance_public_ip" {
  description= "La dirección IP pública de la instancia EC2."
  value= aws_instance.app_server.public_ip
}

output "instance_public_dns" {
  description = "El nombre DNS público de la instancia EC2."
  value       = aws_instance.app_server.public_dns
}

output "backend_ecr_url" {
  description = "La URL del repositorio ECR Público para el backend."
  value       = aws_ecrpublic_repository.backend_repo.repository_uri
}

output "frontend_ecr_url" {
  description = "La URL del repositorio ECR Público para el frontend."
  value       = aws_ecrpublic_repository.frontend_repo.repository_uri
}