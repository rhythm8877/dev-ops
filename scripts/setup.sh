#!/bin/bash
# setup.sh - Idempotent setup script
# Can be run multiple times without side effects
# Usage: bash scripts/setup.sh

set -e

echo "=== Running Idempotent Setup Script ==="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing via nvm..."
    # Install nvm if not present (idempotent)
    if [ ! -d "$HOME/.nvm" ]; then
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    fi
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 18
    nvm use 18
else
    echo "Node.js is already installed: $(node --version)"
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not available"
    exit 1
fi

# Create application directory if it doesn't exist (idempotent - mkdir -p)
mkdir -p /home/ubuntu/app
mkdir -p /home/ubuntu/app/logs

# Install dependencies (idempotent - npm ci cleans and reinstalls)
echo "Installing dependencies..."
npm ci

# Create .env file if it doesn't exist (idempotent)
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
NODE_ENV=production
PORT=3000
VITE_API_URL=https://jsonplaceholder.typicode.com
EOF
    echo ".env file created"
else
    echo ".env file already exists, skipping..."
fi

echo "=== Setup Complete ==="
