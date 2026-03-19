#!/bin/bash
# deploy.sh - Idempotent deploy script
# Can be run multiple times without side effects
# Usage: bash scripts/deploy.sh

set -e

echo "=== Running Idempotent Deploy Script ==="

APP_DIR="/home/ubuntu/app"
SERVICE_NAME="devops-task-manager"
PORT=3000

# Ensure app directory exists (idempotent - mkdir -p)
mkdir -p "$APP_DIR"
mkdir -p "$APP_DIR/dist"
mkdir -p "$APP_DIR/logs"

# Build the application
echo "Building application..."
npm run build

# Stop the existing process if running (idempotent - won't fail if not running)
echo "Stopping existing application..."
if command -v pm2 &> /dev/null; then
    pm2 stop "$SERVICE_NAME" 2>/dev/null || true
    pm2 delete "$SERVICE_NAME" 2>/dev/null || true
fi

# Install pm2 globally if not present (idempotent)
if ! command -v pm2 &> /dev/null; then
    echo "Installing pm2..."
    npm install -g pm2
else
    echo "pm2 is already installed"
fi

# Create a simple server script if it doesn't exist (idempotent)
if [ ! -f "$APP_DIR/server.js" ]; then
    cat > "$APP_DIR/server.js" << 'EOF'
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIST = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // SPA fallback - serve index.html for all unknown routes
      fs.readFile(path.join(DIST, 'index.html'), (err2, fallback) => {
        if (err2) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fallback);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOF
    echo "Server script created"
else
    echo "Server script already exists"
fi

# Start the application with pm2 (idempotent - pm2 manages process)
echo "Starting application with pm2..."
pm2 start "$APP_DIR/server.js" --name "$SERVICE_NAME" --update-env

# Save pm2 process list (idempotent)
pm2 save

# Setup pm2 startup script (idempotent - won't duplicate)
pm2 startup 2>/dev/null || true

echo "=== Deployment Complete ==="
echo "Application is running on port $PORT"
echo "Check status: pm2 status $SERVICE_NAME"
echo "View logs: pm2 logs $SERVICE_NAME"
