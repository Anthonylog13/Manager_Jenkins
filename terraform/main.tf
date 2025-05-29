
resource "aws_ecrpublic_repository" "backend_repo" {
  provider= aws.us_east_1 
  repository_name = "alfabyte-xclone-backend" 

  force_destroy = true 
}

resource "aws_ecrpublic_repository" "frontend_repo" {
  provider= aws.us_east_1 
  repository_name = "alfabyte-xclone-frontend" 
  force_destroy = true
}


resource "aws_security_group" "app_sg" {
  name        = "xclone-app-sg"
  description = "Permite SSH, HTTP y puertos de la app XClone"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "SG-XClone"
  }
}


data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}


resource "aws_instance" "app_server" {
  ami= data.aws_ami.amazon_linux_2.id
  instance_type = "t2.micro"             
  
 
  subnet_id = data.aws_subnets.default.ids[0] 
  
  vpc_security_group_ids = [aws_security_group.app_sg.id] 
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name 
  
  key_name = "xclone-key" 


user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install -y unzip # Necesario para AWS CLI

              sudo amazon-linux-extras install docker -y
              sudo service docker start
              sudo usermod -a -G docker ec2-user

              sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

              # --- AÑADIR ESTO PARA AWS CLI ---
              curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
              unzip awscliv2.zip
              sudo ./aws/install
              rm -rf awscliv2.zip aws
              # ---------------------------------

              sudo systemctl enable docker.service
              EOF

  tags = {
    Name = "Servidor-XClone-Jenkins"
  }
}



resource "aws_iam_instance_profile" "ec2_profile" {
  name = "EC2XCloneInstanceProfile" 
  role = "EC2XCloneRole"          
}