#!/bin/bash

# Render Deployment Script for Micro-Frontend Modules
# This script prepares and deploys all modules to Render

set -e

echo "🚀 Starting Render Deployment for Micro-Frontend Modules..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check prerequisites
print_step "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

print_status "✅ All prerequisites met"

# Build process
print_step "Building all modules for Render deployment..."

print_status "Installing dependencies..."
npm run install:all

print_status "Building Shell module..."
cd apps/shell && npm run build && cd ../..

print_status "Building Home module..."
cd apps/home && npm run build && cd ../..

print_status "Building Products module..."
cd apps/products && npm run build && cd ../..

print_status "Building Profile module..."
cd apps/profile && npm run build && cd ../..

print_status "✅ All modules built successfully!"

# Render deployment instructions
print_step "Render Deployment Instructions"

echo ""
print_status "📋 Next steps to deploy on Render:"
echo ""
echo "1. 📝 Create Render Account:"
echo "   - Go to https://render.com"
echo "   - Sign up for a free account"
echo ""
echo "2. 🔗 Connect Your Repository:"
echo "   - Click 'New +' → 'Static Site'"
echo "   - Connect your GitHub repository"
echo "   - Render will automatically detect render.yaml"
echo ""
echo "3. ⚙️ Configure Services:"
echo "   - Shell App: Main container application"
echo "   - Home Module: Remote module"
echo "   - Products Module: Remote module"
echo "   - Profile Module: Remote module"
echo ""
echo "4. 🔑 Set Environment Variables:"
echo "   - NODE_ENV=production"
echo "   - PUBLIC_PATH=https://your-app-name.onrender.com/"
echo ""
echo "5. 🚀 Deploy:"
echo "   - Render will automatically build and deploy"
echo "   - Each module gets its own URL"
echo ""

print_status "🎯 Render URLs will be:"
echo "  - Shell: https://your-shell-app.onrender.com"
echo "  - Home: https://your-home-module.onrender.com"
echo "  - Products: https://your-products-module.onrender.com"
echo "  - Profile: https://your-profile-module.onrender.com"
echo ""

print_warning "⚠️ Important Notes:"
echo "  - Update remote URLs in shell config after deployment"
echo "  - Render provides automatic HTTPS"
echo "  - Free tier includes 750 hours/month"
echo "  - Custom domains available on paid plans"
echo ""

print_status "🎉 Render deployment preparation completed!"
print_status "Push your code to GitHub and connect to Render to deploy!"

