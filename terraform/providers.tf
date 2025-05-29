terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "jenkins-tf-state-857360183512" 
    key            = "xclone/terraform.tfstate"      
    region         = "us-east-2"                     
    encrypt        = true                            
    dynamodb_table = "terraform-state-lock"         
  }
}

# Proveedor por defecto (Ohio)
provider "aws" {
  region = "us-east-2"
}

# Proveedor alternativo (N. Virginia) para ECR Público
provider "aws" {
  alias  = "us_east_1" 
  region = "us-east-1"
}