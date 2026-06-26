# NexaFlow AI - Deployment Guide

## Quick Start

### Local Development
```bash
npm install
npm run dev
```
Visit http://localhost:3000

### Production Build
```bash
npm run build
npm run preview
```

## Vercel Deployment

### Option 1: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub + Vercel Web
1. Push to GitHub
2. Go to https://vercel.com/new
3. Import repository
4. Framework: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Deploy

## Environment Variables
None required for this project.

## Build Output
- **JS**: 407KB (120KB gzipped)
- **CSS**: 6.38KB (1.82KB gzipped)
- **Total**: ~122KB gzipped

## Vercel Configuration (optional)
Create `vercel.json` if needed:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## Troubleshooting

### Build fails
- Clear cache: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Check Node version: `node --version` (should be 18+)

### Port already in use
- Kill process: `lsof -ti:3000 | xargs kill -9`
- Or use different port: `vite --host --port 3001`

## Performance Tips
- Images: Use WebP format
- Fonts: Already optimized via Google Fonts
- CSS: Already minified in production build
- JS: Already tree-shaken and minified

## Monitoring
- Use Vercel Analytics for performance metrics
- Monitor Core Web Vitals

---

**Project**: NexaFlow AI
**Status**: Production Ready
**Last Updated**: 2026-06-26
