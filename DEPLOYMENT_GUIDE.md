# Micro-Frontend Deployment Guide

This guide provides step-by-step instructions for deploying all micro-frontend modules individually.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository access
- Deployment platform accounts (Netlify, Vercel, AWS, etc.)

## 🏗️ Project Structure

```
micro-frontend-ecommerce/
├── apps/
│   ├── shell/          # Main container application (Port 3000)
│   ├── home/           # Home module (Port 3001)
│   ├── products/       # Products module (Port 3002)
│   └── profile/        # Profile module (Port 3003)
├── docker-compose.yml  # Docker orchestration
├── deploy.sh           # Linux/Mac deployment script
├── deploy.ps1          # Windows deployment script
└── .github/workflows/  # CI/CD workflows
```

## 🚀 Quick Start Deployment

### Option 1: Automated Script (Recommended)

**For Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**For Windows:**
```powershell
.\deploy.ps1
```

### Option 2: Manual Build

```bash
# Install dependencies
npm run install:all

# Build all modules
npm run build:shell
npm run build:home
npm run build:products
npm run build:profile
```

## 🌐 Deployment Platforms

### 1. Netlify/Vercel (Static Hosting)

**Step 1:** Create separate sites for each module
- Shell: `your-app-shell.netlify.app`
- Home: `your-app-home.netlify.app`
- Products: `your-app-products.netlify.app`
- Profile: `your-app-profile.netlify.app`

**Step 2:** Deploy build outputs
```bash
# Upload each dist/ folder to respective sites
apps/shell/dist/ → Shell site
apps/home/dist/ → Home site
apps/products/dist/ → Products site
apps/profile/dist/ → Profile site
```

**Step 3:** Update remote URLs in shell config
```javascript
// apps/shell/webpack.config.prod.js
remotes: {
  home: 'home@https://your-app-home.netlify.app/remoteEntry.js',
  products: 'products@https://your-app-products.netlify.app/remoteEntry.js',
  profile: 'profile@https://your-app-profile.netlify.app/remoteEntry.js',
}
```

### 2. AWS S3 + CloudFront

**Step 1:** Create S3 buckets
```bash
aws s3 mb s3://your-app-shell
aws s3 mb s3://your-app-home
aws s3 mb s3://your-app-products
aws s3 mb s3://your-app-profile
```

**Step 2:** Upload files
```bash
aws s3 sync apps/shell/dist s3://your-app-shell --delete
aws s3 sync apps/home/dist s3://your-app-home --delete
aws s3 sync apps/products/dist s3://your-app-products --delete
aws s3 sync apps/profile/dist s3://your-app-profile --delete
```

**Step 3:** Configure CloudFront distributions
- Enable CORS headers
- Set up custom domain names
- Configure SSL certificates

### 3. Docker Deployment

**Step 1:** Build Docker images
```bash
docker build -t shell-app ./apps/shell
docker build -t home-app ./apps/home
docker build -t products-app ./apps/products
docker build -t profile-app ./apps/profile
```

**Step 2:** Run containers
```bash
docker run -p 3000:80 shell-app
docker run -p 3001:80 home-app
docker run -p 3002:80 products-app
docker run -p 3003:80 profile-app
```

**Or use Docker Compose:**
```bash
docker-compose up -d
```

## 🔧 Configuration

### Environment Variables

Set these for each deployment:

```bash
NODE_ENV=production
PUBLIC_PATH=https://your-domain.com/
```

### CORS Configuration

Ensure your hosting platform allows cross-origin requests:

```javascript
// Example nginx CORS configuration
add_header Access-Control-Allow-Origin "*";
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range";
```

### Security Headers

Configure security headers for each module:

```javascript
// Example security headers
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Content-Security-Policy "default-src 'self'";
```

## 🔄 CI/CD Pipeline

### GitHub Actions

The repository includes automated deployment workflows:

1. **Build and Test:** On every push/PR
2. **Deploy to Staging:** On push to develop branch
3. **Deploy to Production:** On push to main branch

**Required Secrets:**
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SHELL_SITE_ID`
- `NETLIFY_HOME_SITE_ID`
- `NETLIFY_PRODUCTS_SITE_ID`
- `NETLIFY_PROFILE_SITE_ID`

## 🧪 Testing Deployment

### Local Testing

```bash
# Test with Docker Compose
docker-compose up -d
# Access at http://localhost:3000 (shell)
```

### Production Testing

1. Verify all modules load correctly
2. Check console for CORS errors
3. Test module federation connections
4. Validate performance metrics

## 📊 Monitoring

### Recommended Tools

- **Performance:** Lighthouse, WebPageTest
- **Errors:** Sentry, LogRocket
- **Analytics:** Google Analytics, Mixpanel
- **Uptime:** UptimeRobot, Pingdom

### Health Checks

Create health check endpoints for each module:

```javascript
// Example health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', module: 'shell', timestamp: new Date() });
});
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure all domains are whitelisted
   - Check hosting platform CORS settings

2. **Module Federation Failures**
   - Verify remoteEntry.js files are accessible
   - Check network connectivity between modules

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check for dependency conflicts

4. **Performance Issues**
   - Enable gzip compression
   - Optimize bundle sizes
   - Use CDN for static assets

## 📚 Additional Resources

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Micro-Frontends Architecture](https://micro-frontends.org/)
- [Netlify Deployment Guide](https://docs.netlify.com/)
- [AWS S3 Deployment](https://docs.aws.amazon.com/s3/)

## 🤝 Support

For deployment issues:
1. Check the troubleshooting section
2. Review deployment logs
3. Verify configuration settings
4. Test with local Docker setup

