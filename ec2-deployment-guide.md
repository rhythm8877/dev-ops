# EC2 Deployment Setup Guide

This guide outlines the steps required to set up an AWS EC2 instance, configure GitHub Secrets, and prepare for a `workflow_dispatch` GitHub Actions deployment.

## 1. AWS EC2 Setup

1. **Launch an Instance**:
   - Go to the AWS Management Console and launch a new EC2 instance (Ubuntu 22.04 or 24.04 LTS is recommended).
   - Select an instance type (e.g., `t2.micro` for free tier).
2. **Create a Key Pair**:
   - Create a new key pair (RSA format, `.pem`). **Download and save this file** securely, as you will need its contents for GitHub Secrets.
3. **Configure Security Groups**:
   - Add inbound rules to allow:
     - **SSH (Port 22)** from your IP (or anywhere `0.0.0.0/0` for GitHub Actions to access it).
     - **HTTP (Port 80)** and **HTTPS (Port 443)** for web traffic.
     - **Custom TCP (e.g., Port 3000, 5173, etc.)** if your app runs on a specific port and you aren't using a reverse proxy yet.
4. **Initial Server Provisioning**:
   - SSH into your server:
     ```bash
     ssh -i /path/to/your-key.pem ubuntu@<your-ec2-public-ip>
     ```
   - Install required dependencies (Node.js, npm, git, pm2):
     ```bash
     sudo apt update
     sudo apt install -y curl git
     curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
     sudo apt install -y nodejs
     sudo npm install -g pm2
     ```
   - Prepare the application directory:
     ```bash
     mkdir -p ~/app
     ```

## 2. GitHub Secrets Configuration

To allow GitHub Actions to securely connect to your EC2 instance, you need to add the following secrets to your GitHub repository.

Go to your repository on GitHub -> **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**.

Add the following secrets:

- `EC2_HOST`: The Public IPv4 address or Public IPv4 DNS of your EC2 instance. (e.g., `54.123.45.67`)
- `EC2_USERNAME`: The default SSH user for your AMI. For Ubuntu, this is usually `ubuntu`. For Amazon Linux, it's `ec2-user`.
- `EC2_SSH_KEY`: The **entire contents** of the `.pem` file you downloaded earlier. (Include the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines).

## 3. GitHub Actions Workflow Plan

We will create a GitHub Actions workflow (`.github/workflows/deploy-ec2.yml`) triggered by `workflow_dispatch` (meaning you can trigger it manually with a button click in GitHub).

**The workflow will perform the following steps:**
1. Checkout the repository code.
2. Setup Node.js.
3. Install dependencies and build the application (optional, if building on GitHub Actions).
4. Connect to the EC2 via SSH using `appleboy/ssh-action`.
5. Pull the latest code on the server, install dependencies, build, and restart the process using PM2.

*(Alternatively, we can use `appleboy/scp-action` to copy the build artifacts directly to the server if we don't want to run build commands on the EC2 instance).*

---

### What's Next?
Once you have created the EC2 instance and added the GitHub Secrets (`EC2_HOST`, `EC2_USERNAME`, `EC2_SSH_KEY`), let me know and I will generate the `.github/workflows/deploy-ec2.yml` file for you!
