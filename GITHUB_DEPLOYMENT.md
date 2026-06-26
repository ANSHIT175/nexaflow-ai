# NexaFlow AI - GitHub & Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
cd nexaflow-ai
vercel
```

### Option 2: GitHub + Vercel Web Integration

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: NexaFlow AI landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nexaflow-ai.git
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Choose your GitHub repository
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click "Deploy"

### Option 3: Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 📋 Pre-Deployment Checklist

- [x] npm install works
- [x] npm run dev works
- [x] npm run build works
- [x] No banned libraries (only React, React DOM, Vite)
- [x] Pricing calculated from config matrix
- [x] INR/USD/EUR currency switcher works
- [x] Monthly/Annual toggle works
- [x] 20% annual discount applied correctly
- [x] Bento Grid on desktop
- [x] Accordion on mobile
- [x] Active feature index preserved
- [x] No unnecessary re-renders
- [x] Semantic HTML structure
- [x] SEO meta tags present
- [x] Accessibility alt text
- [x] No horizontal scroll
- [x] Responsive design (360px - 1440px+)
- [x] Premium dark AI SaaS aesthetic
- [x] Official colors and fonts used
- [x] Production build optimized

## 🏗️ Project Structure

```
nexaflow-ai/
├── client/
│   ├── index.html              # Entry point with SEO tags
│   └── src/
│       ├── main.tsx            # React entry
│       ├── App.tsx             # Main component (240 lines)
│       ├── data.ts             # Pricing config matrix
│       └── styles.css          # Premium dark theme
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── DEPLOYMENT.md               # Deployment guide
└── README.md                   # Project documentation
```

## 🔧 Environment Variables

**None required.** This is a static frontend-only application.

## 📊 Build Output

- **JavaScript**: 405KB (120KB gzipped)
- **CSS**: 9.66KB (2.45KB gzipped)
- **HTML**: 1.26KB (0.55KB gzipped)
- **Total**: ~123KB gzipped

## ✅ Vercel Deployment Configuration

Vercel auto-detects Vite projects. Optional `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {}
}
```

## 🎯 Post-Deployment

1. **Verify Live Site**
   - Test all currency switchers (USD, INR, EUR)
   - Test billing period toggle (Monthly/Annual)
   - Verify 20% discount calculation
   - Test responsive design on mobile/tablet
   - Check that all links work

2. **Monitor Performance**
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Check build logs for warnings

3. **Custom Domain** (Optional)
   - In Vercel dashboard: Settings → Domains
   - Add your custom domain
   - Update DNS records

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### TypeScript Errors
```bash
# Check TypeScript
npm run check
```

## 📝 GitHub Repository Setup

```bash
# Initialize git
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Create initial commit
git commit -m "feat: NexaFlow AI landing page with premium dark theme, dynamic pricing, and responsive design"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/nexaflow-ai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🚀 GitHub Actions (Optional CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📞 Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Review build logs in Vercel dashboard
- Check GitHub Actions logs

---

**Status**: Production Ready ✅  
**Last Updated**: 2026-06-26  
**Version**: 1.0.0
