# ToolNow Compliance Checklist

Last reviewed: 2026-07-14. Status reflects this codebase honestly — "done" means implemented and verifiable in the repo; "todo" means required before or shortly after the corresponding launch step (AdSense application, GA enablement, EU traffic, etc.).

## Google AdSense Program Policies

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Original, valuable content (not scraped/spun) | Done | All tool copy, FAQ answers and 5 long-form guides are original, written for this site. |
| 2 | Sufficient content before applying | Done | 25 tool pages with intro/how-to/FAQ sections, 5 guides (900+ words each), about/legal pages. Add more guides over time for safety margin. |
| 3 | No prohibited content (adult, violent, illegal, copyrighted) | Done | Utility tools and educational finance/tech content only. Generators' acceptable-use terms prohibit unlawful content (see /terms). |
| 4 | Privacy policy disclosing third-party ad cookies | Done | /privacy-policy and /cookie-policy disclose AdSense cookies, Google Ads Settings and aboutads.info opt-outs. |
| 5 | Easy navigation, no deceptive layout, ads distinguishable | Done | Standard header/footer nav, breadcrumbs; no dark patterns. Verify ad slot styling is clearly distinct from content once ads render. |
| 6 | No ads on screens without publisher content (error pages, thank-you screens) | Todo | When enabling AdSense, exclude 404 and any low-content routes from ad slots. |
| 7 | Do not click own ads / no incentivized clicks | Done | No "click the ads" language anywhere. Operational discipline item — keep it that way. |
| 8 | Site behind a real domain with HTTPS | Todo | Currently on a vercel.app subdomain (see SITE.url). AdSense approval generally requires a root domain you own — buy/attach a custom domain before applying. |
| 9 | ads.txt after approval | Todo | Add /ads.txt with the assigned pub- ID once the AdSense account is approved. |
| 10 | Consent for personalized ads in EEA/UK (Google EU User Consent Policy) | Todo | REQUIRED: a Google-certified CMP / consent banner must run before ad requests for EEA/UK/CH visitors. Do not enable AdSense for those regions without it. See "Cookie consent" below. |

## GDPR (EU/UK visitors)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Lawful basis / data minimisation | Done | Tools process everything client-side; no accounts, no database, no server-side collection. Only contact-form data (name/email/message) is processed, on the basis of the user's deliberate request. |
| 2 | Privacy policy: what is collected, why, by whom | Done | /privacy-policy covers tool inputs (never transmitted), localStorage drafts, GA4, AdSense, Web3Forms. |
| 3 | User rights (access, erasure, rectification, objection) with a contact route | Done | Rights listed in /privacy-policy; requests routed via /contact; 30-day response commitment stated. |
| 4 | Consent BEFORE non-essential cookies/scripts (GA4, AdSense) for EEA visitors | Todo | REQUIRED before enabling GA4 or AdSense for EU traffic: add a consent banner (Google Consent Mode v2 + certified CMP) that blocks those scripts until opt-in. Currently moot because neither service is enabled by default. |
| 5 | Data processing agreements with processors | Todo | When GA4 is enabled, accept Google Ads Data Processing Terms in the GA admin. Review Web3Forms DPA/terms for contact-form relay. |
| 6 | No transfer of tool data outside user's device | Done | Architectural guarantee: static site, client-side tools, no uploads. |

## CCPA / CPRA (California visitors)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Disclose categories of personal information collected | Done | /privacy-policy: contact-form submissions only; nothing else collected by us. |
| 2 | "Do not sell/share" position stated | Done | Policy states we do not sell personal information and collect nothing sellable. |
| 3 | Method to submit know/delete requests | Done | /contact form designated for privacy requests. |
| 4 | Opt-out of cross-context behavioral advertising once AdSense is live | Todo | When AdSense runs personalized ads, add an opt-out control (restrict data processing / non-personalized ads for California) and honor GPC signals via the CMP. |

## Cookie consent

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Cookie policy page | Done | /cookie-policy: we set no first-party tracking cookies; localStorage explained; GA/AdSense cookies described with control instructions. |
| 2 | Consent banner (EEA/UK) before GA4/AdSense scripts load | Todo | REQUIRED before enabling AdSense or GA for EEA visitors — flagged as a launch blocker for those integrations. Use a Google-certified CMP with Consent Mode v2; default all non-essential storage to "denied" until opt-in. |
| 3 | Scripts actually gated on env flags today | Done | GA loads only if NEXT_PUBLIC_GA_ID is set; AdSense only with NEXT_PUBLIC_ADSENSE_CLIENT after approval. With both unset the site sets zero cookies. |

## DMCA / content complaints

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Route for copyright/infringement complaints | Done | /contact form reaches the site operator. |
| 2 | Formal DMCA/designated-agent statement | Todo | Low risk (no user-generated content is hosted — nothing users make is stored on our servers), but consider adding a short IP-complaints section to /terms or a dedicated page if the site grows. |

## Accessibility (WCAG 2.1 AA basics)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Semantic landmarks and heading order | Done | Pages use nav/main/article/section with single h1 and ordered h2/h3. |
| 2 | Labels on all form controls | Done | Contact form uses explicit Label htmlFor + ids; errors linked via aria-describedby and aria-invalid. |
| 3 | Status/error messaging announced | Done | Contact form uses role="status" and role="alert" for async states. |
| 4 | Keyboard focus visibility | Done | Buttons/inputs define focus-visible outlines (see ui/button.tsx, ui/input.tsx). |
| 5 | Color contrast audit (ink/brand palette at AA 4.5:1) | Todo | Spot-check lighter tokens (ink-400/ink-500 on white, brand-600 text) with a contrast checker; darken where below 4.5:1. |
| 6 | Full audit of interactive tools (25 widgets) with keyboard + screen reader | Todo | Run axe/Lighthouse per tool page; verify sliders, file pickers and copy buttons are operable without a mouse. |
| 7 | Images/icons have alt text or aria-hidden | Done | Decorative icons marked aria-hidden (e.g., breadcrumbs chevron); verify any future content images get alt text. |

## Google Search Essentials / helpful content / spam policies

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | People-first, original content demonstrating experience | Done | Guides include worked numeric examples and India-specific detail; tool pages explain formulas rather than thin boilerplate. |
| 2 | No scaled/spun content, doorway pages or keyword stuffing | Done | Each tool page has distinct copy; keywords used naturally in titles/descriptions. |
| 3 | Accurate titles/descriptions, canonical URLs | Done | Every page exports metadata with alternates.canonical via absoluteUrl(). |
| 4 | Sitemap and robots | Done | src/app/sitemap.ts and robots.ts exist; sitemap includes all static pages (about, contact, legal), categories, tools and guides (verified 2026-07-14). |
| 5 | No deceptive behavior (hidden text, sneaky redirects, fake buttons) | Done | None present; keep ad slots clearly labeled when enabled. |
| 6 | E-E-A-T signals: about page, contact route, dated content | Done | /about, /contact, guides carry publishedAt dates; legal pages carry last-updated dates. |

## Structured data guidelines

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | JSON-LD matches visible page content | Done | Breadcrumb, WebSite/Organization, WebApplication, FAQPage and Article builders mirror on-page content (src/lib/seo.ts). |
| 2 | XSS-safe embedding | Done | JsonLd component escapes the less-than character as a unicode escape (u003c) in embedded JSON-LD. |
| 3 | No self-serving review/rating markup, no markup for invisible content | Done | None used. |
| 4 | Validate with Rich Results Test after deploy | Todo | Run Google's Rich Results Test on a tool page, a guide, and the home page after each structural change. |

## Pre-AdSense application launch checklist (summary)

1. Attach a custom domain and update NEXT_PUBLIC_SITE_URL. (todo)
2. Add consent banner / certified CMP with Consent Mode v2. (todo — blocker for EEA ads and GA)
3. Confirm sitemap includes all new legal/guide/about/contact routes. (todo — verify)
4. Set NEXT_PUBLIC_WEB3FORMS_KEY so the contact route is live. (todo)
5. Run Lighthouse (performance, accessibility, SEO) on representative pages. (todo)
6. Apply to AdSense; after approval add ads.txt and set NEXT_PUBLIC_ADSENSE_CLIENT. (todo)
