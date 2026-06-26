# NexaFlow AI - Deploy to Vercel or Netlify (2 Minutes)

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "NexaFlow AI landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nexaflow-ai.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste your GitHub URL
4. Click "Import"
5. Framework: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click "Deploy"

**Done!** Your site is live at `https://your-project.vercel.app`

---

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy on Netlify
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub
4. Choose your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy site"

**Done!** Your site is live at `https://your-site.netlify.app`

---

## Option 3: Deploy Locally with Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your site will be live in seconds.

---

## What's Included

✅ Premium dark AI SaaS landing page
✅ Dynamic pricing (INR/USD/EUR)
✅ Monthly/Annual toggle with 20% discount
✅ Bento Grid features (desktop)
✅ Accordion features (mobile)
✅ Social proof testimonials
✅ Fully responsive design
✅ SEO optimized
✅ Production-ready code

---

## Build Locally First (Optional)

```bash
npm install
npm run dev        # Test locally
npm run build      # Build for production
```

---

## File Structure

```
nexaflow-ai/
├── client/
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── data.ts
│       └── styles.css
├── package.json
├── vite.config.ts
├── vercel.json
├── netlify.toml
└── dist/           (auto-generated on build)
```

---

## Troubleshooting

**Build fails?**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Port already in use?**
```bash
npm run dev -- --port 3001
```

**Need custom domain?**
- Vercel: Settings → Domains
- Netlify: Site settings → Domain management

---

## Support

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev

---

**Status**: Ready to deploy ✅
**Last Updated**: 2026-06-26
