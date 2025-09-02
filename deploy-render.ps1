# Render Deployment Script for Micro-Frontend Modules (PowerShell)
# This script prepares and deploys all modules to Render

param(
    [string]$Environment = "production"
)

Write-Host "🚀 Starting Render Deployment for Micro-Frontend Modules..." -ForegroundColor Green

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

function Write-Step {
    param([string]$Message)
    Write-Host "[STEP] $Message" -ForegroundColor Blue
}

# Check prerequisites
Write-Step "Checking prerequisites..."

try {
    $nodeVersion = node --version
    Write-Status "Node.js version: $nodeVersion"
} catch {
    Write-Error "Node.js is not installed. Please install Node.js first."
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Status "npm version: $npmVersion"
} catch {
    Write-Error "npm is not installed. Please install npm first."
    exit 1
}

try {
    $gitVersion = git --version
    Write-Status "Git version: $gitVersion"
} catch {
    Write-Error "Git is not installed. Please install Git first."
    exit 1
}

Write-Status "✅ All prerequisites met"

# Build process
Write-Step "Building all modules for Render deployment..."

Write-Status "Installing dependencies..."
npm run install:all

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

# Render deployment instructions
Write-Step "Render Deployment Instructions"

Write-Host ""
Write-Status "📋 Next steps to deploy on Render:"
Write-Host ""
Write-Host "1. 📝 Create Render Account:"
Write-Host "   - Go to https://render.com"
Write-Host "   - Sign up for a free account"
Write-Host ""
Write-Host "2. 🔗 Connect Your Repository:"
Write-Host "   - Click 'New +' → 'Static Site'"
Write-Host "   - Connect your GitHub repository"
Write-Host "   - Render will automatically detect render.yaml"
Write-Host ""
Write-Host "3. ⚙️ Configure Services:"
Write-Host "   - Shell App: Main container application"
Write-Host "   - Home Module: Remote module"
Write-Host "   - Products Module: Remote module"
Write-Host "   - Profile Module: Remote module"
Write-Host ""
Write-Host "4. 🔑 Set Environment Variables:"
Write-Host "   - NODE_ENV=production"
Write-Host "   - PUBLIC_PATH=https://your-app-name.onrender.com/"
Write-Host ""
Write-Host "5. 🚀 Deploy:"
Write-Host "   - Render will automatically build and deploy"
Write-Host "   - Each module gets its own URL"
Write-Host ""

Write-Status "🎯 Render URLs will be:"
Write-Host "  - Shell: https://your-shell-app.onrender.com"
Write-Host "  - Home: https://your-home-module.onrender.com"
Write-Host "  - Products: https://your-products-module.onrender.com"
Write-Host "  - Profile: https://your-profile-module.onrender.com"
Write-Host ""

Write-Warning "⚠️ Important Notes:"
Write-Host "  - Update remote URLs in shell config after deployment"
Write-Host "  - Render provides automatic HTTPS"
Write-Host "  - Free tier includes 750 hours/month"
Write-Host "  - Custom domains available on paid plans"
Write-Host ""

Write-Status "🎉 Render deployment preparation completed!"
Write-Status "Push your code to GitHub and connect to Render to deploy!"

