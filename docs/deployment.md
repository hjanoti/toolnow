# ToolNow — Deployment Guide

## Prerequisites (owner-provided)

| Item | Needed for | Where to set |
|---|---|---|
| GitHub PAT (repo scope) | pushing this repo to github.com/hjanoti | one-time push |
| Vercel account (free) | hosting | vercel.com — import the GitHub repo |
| Custom domain (optional but recommended for AdSense) | branding/SEO | Vercel → Domains |
| GA4 Measurement ID | analytics | Vercel env `NEXT_PUBLIC_GA_ID` |
| Google Search Console | indexing | HTML-tag verification |
| Web3Forms access key (free) | contact form | Vercel env `NEXT_PUBLIC_WEB3FORMS_KEY` |
| AdSense publisher ID (after approval) | ads | Vercel env `NEXT_PUBLIC_ADSENSE_CLIENT` |

## Deploy to Vercel (free tier)

1. Push this repo to GitHub (see below).
2. vercel.com → Add New Project → import `toolnow` → framework
   auto-detects Next.js. Build command `next build` (default).
3. Set env vars (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = your production URL (no trailing slash)
   - others per table above, as they become available
4. Deploy. Every push to `main` auto-deploys (that IS the CI/CD;
   PRs get preview URLs).

## Push to GitHub

```bash
cd toolnow
git remote add origin https://github.com/hjanoti/toolnow.git
git push -u origin main
# with PAT: git push https://<PAT>@github.com/hjanoti/toolnow.git main
```

## CI (GitHub Actions)

`.github/workflows/ci.yml` runs lint, typecheck, unit tests and build on
every push/PR. Vercel handles deploys independently.

## Post-deploy checklist

- [ ] Verify site in Google Search Console → submit `/sitemap.xml`
- [ ] Create GA4 property → set `NEXT_PUBLIC_GA_ID` → redeploy
- [ ] UptimeRobot: add HTTPS monitor on the production URL
- [ ] Check https://your-domain/robots.txt and /sitemap.xml resolve
- [ ] Run Lighthouse on / and /tools/gst-calculator (target ≥95)
- [ ] Before enabling ads: add cookie-consent banner (EEA requirement)
