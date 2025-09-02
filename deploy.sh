#!/bin/bash

# Deployment Script for Micro-Frontend Modules
# This script builds and deploys all modules individually

set -e

echo "🚀 Starting Micro-Frontend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Installing dependencies..."
npm run install:all

print_status "Building all modules for production..."

# Build each module
print_status "Building Shell module..."
cd apps/shell && npm run build && cd ../..

print_status "Building Home module..."
cd apps/home && npm run build && cd ../..

print_status "Building Products module..."
cd apps/products && npm run build && cd ../..

print_status "Building Profile module..."
cd apps/profile && npm run build && cd ../..

print_status "✅ All modules built successfully!"

echo ""
print_status "📁 Build outputs are available in:"
echo "  - Shell: apps/shell/dist/"
echo "  - Home: apps/home/dist/"
echo "  - Products: apps/products/dist/"
echo "  - Profile: apps/profile/dist/"
echo ""

print_status "🎯 Next steps:"
echo "  1. Deploy each dist/ folder to your hosting platform"
echo "  2. Update remote URLs in shell's webpack config"
echo "  3. Configure CORS and security headers"
echo ""

print_status "Deployment completed successfully! 🎉"

