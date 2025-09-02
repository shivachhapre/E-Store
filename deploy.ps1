# Deployment Script for Micro-Frontend Modules (PowerShell)
# This script builds and deploys all modules individually

param(
    [string]$Environment = "production"
)

Write-Host "🚀 Starting Micro-Frontend Deployment..." -ForegroundColor Green

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Status "Node.js version: $nodeVersion"
} catch {
    Write-Error "Node.js is not installed. Please install Node.js first."
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Status "npm version: $npmVersion"
} catch {
    Write-Error "npm is not installed. Please install npm first."
    exit 1
}

Write-Status "Installing dependencies..."
npm run install:all

Write-Status "Building all modules for production..."

# Build each module
Write-Status "Building Shell module..."
Set-Location apps/shell
npm run build
Set-Location ../..

Write-Status "Building Home module..."
Set-Location apps/home
npm run build
Set-Location ../..

Write-Status "Building Products module..."
Set-Location apps/products
npm run build
Set-Location ../..

Write-Status "Building Profile module..."
Set-Location apps/profile
npm run build
Set-Location ../..

Write-Status "✅ All modules built successfully!"

Write-Host ""
Write-Status "📁 Build outputs are available in:"
Write-Host "  - Shell: apps/shell/dist/"
Write-Host "  - Home: apps/home/dist/"
Write-Host "  - Products: apps/products/dist/"
Write-Host "  - Profile: apps/profile/dist/"
Write-Host ""

Write-Status "🎯 Next steps:"
Write-Host "  1. Deploy each dist/ folder to your hosting platform"
Write-Host "  2. Update remote URLs in shell's webpack config"
Write-Host "  3. Configure CORS and security headers"
Write-Host ""

Write-Status "Deployment completed successfully! 🎉"

