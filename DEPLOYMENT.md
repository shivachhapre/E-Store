# Deployment Scripts for Micro-Frontend Modules

## Step 1: Build All Modules
```bash
# Build all modules for production
npm run build:shell
npm run build:home  
npm run build:products
npm run build:profile
```

## Step 2: Deploy to Different Platforms

### Option A: Deploy to Netlify/Vercel (Static Hosting)
```bash
# For each module, create a separate repository or folder
# Example for Shell:
cd apps/shell/dist
# Upload contents to Netlify/Vercel

# Example for Home:
cd apps/home/dist  
# Upload contents to Netlify/Vercel

# Example for Products:
cd apps/products/dist
# Upload contents to Netlify/Vercel

# Example for Profile:
cd apps/profile/dist
# Upload contents to Netlify/Vercel
```

### Option B: Deploy to AWS S3 + CloudFront
```bash
# Create S3 buckets for each module
aws s3 mb s3://your-shell-app
aws s3 mb s3://your-home-app
aws s3 mb s3://your-products-app
aws s3 mb s3://your-profile-app

# Upload built files
aws s3 sync apps/shell/dist s3://your-shell-app --delete
aws s3 sync apps/home/dist s3://your-home-app --delete
aws s3 sync apps/products/dist s3://your-products-app --delete
aws s3 sync apps/profile/dist s3://your-profile-app --delete

# Configure CloudFront distributions for each bucket
```

### Option C: Deploy to Docker Containers
```bash
# Build and run Docker containers for each module
docker build -t shell-app ./apps/shell
docker build -t home-app ./apps/home
docker build -t products-app ./apps/products
docker build -t profile-app ./apps/profile

# Run containers
docker run -p 3000:80 shell-app
docker run -p 3001:80 home-app
docker run -p 3002:80 products-app
docker run -p 3003:80 profile-app
```

## Step 3: Update Remote URLs
After deployment, update the remote URLs in the shell's webpack config:
- home: https://your-home-domain.com/remoteEntry.js
- products: https://your-products-domain.com/remoteEntry.js
- profile: https://your-profile-domain.com/remoteEntry.js

## Step 4: Environment Variables
Set these environment variables for each deployment:
- PUBLIC_PATH: The public URL of your deployed module
- NODE_ENV: production

