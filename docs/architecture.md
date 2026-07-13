# ToolNow — Architecture

## Stack

- **Next.js 16** (App Router, Turbopack, fully static output — every route
  pre-rendered at build time via `generateStaticParams`)
- **TypeScript** strict, **Tailwind CSS v4** (`@theme` design tokens)
- **Original component library** in the shadcn style (cva + tailwind-merge)
  with zero Radix runtime — native elements only, for minimal JS
- **Zustand** (localStorage-persisted drafts for invoice/resume)
- **React Hook Form + Zod** (invoice generator)
- Client-side libs: `qrcode`, `pdf-lib`, `sql-formatter`, `diff`, `lucide-react`
- **Vitest** (+ Testing Library) for unit tests
- **Vercel free tier** for hosting; no database, no API routes

## System diagram

```
                    ┌────────────────────────────────────────┐
                    │              Vercel Edge CDN           │
                    │   (static HTML/CSS/JS, immutable)      │
                    └───────────────▲────────────────────────┘
                                    │ build-time SSG
┌───────────────┐   ┌───────────────┴───────────────┐
│ Tool Registry │──▶│ Next.js App Router            │
│ src/lib/tools │   │  /                 home       │
│ (typed data:  │   │  /tools            directory  │
│  copy, FAQs,  │   │  /tools/[slug]     25 pages   │
│  keywords,    │   │  /category/[slug]  5 pages    │
│  relations)   │   │  /guides/[slug]    5 articles │
└───────────────┘   │  legal pages, 404, sitemap,   │
                    │  robots, icon                 │
                    └───────────────┬───────────────┘
                                    │ per-slug dynamic import
                    ┌───────────────▼───────────────┐
                    │ Client tool components         │
                    │ (each in its own JS chunk;     │
                    │  ALL data processing local)    │
                    └───────────────────────────────┘
Browser-only integrations (env-gated, off by default):
  GA4 · AdSense · Web3Forms (contact form POST)
```

## Key design decisions

1. **Content as typed data, not CMS.** Every tool page's SEO copy, FAQs,
   keywords and interlinks live in `src/lib/tools/<category>.ts` as a
   `ToolDefinition`. One source of truth drives the page, metadata,
   JSON-LD, sitemap, cards and related-tool links. Adding tool #26 is a
   registry entry + one client component + one registry-map line.
2. **Per-tool code splitting.** `src/components/tools/registry.tsx` maps
   slug → `next/dynamic` import, so the GST page never ships pdf-lib etc.
3. **SEO engine** (`src/lib/seo.ts`): metadata builders (canonical, OG,
   Twitter) + JSON-LD builders (WebSite, Organization, WebApplication,
   FAQPage, BreadcrumbList, Article) consumed by the shared
   `ToolPageShell`.
4. **Ad slots are architectural placeholders** (`AdSlot`): render nothing
   until `NEXT_PUBLIC_ADSENSE_CLIENT` is set; then reserve min-height to
   protect CLS.
5. **Security:** strict headers + CSP in `next.config.ts` (see
   security-report.md), no server attack surface at all.

## Folder structure

```
toolnow/
├── docs/                      # business & engineering docs
├── src/
│   ├── app/                   # routes (all statically generated)
│   ├── components/
│   │   ├── ui/                # original primitives (button, card, input…)
│   │   ├── layout/            # header, footer, logo, mobile menu
│   │   ├── tools/             # 25 client tool components + registry map
│   │   └── *.tsx              # shell, cards, breadcrumbs, JSON-LD, ads
│   └── lib/
│       ├── tools/             # THE registry: types + 5 category files
│       ├── calc/              # pure finance math + tests
│       ├── text/              # pure text/encoding utils + tests
│       ├── generate/          # password/number-to-words utils + tests
│       ├── guides.ts          # long-form article content
│       ├── seo.ts             # metadata + JSON-LD builders
│       └── utils.ts           # cn, INR formatting
└── next.config.ts             # security headers / CSP
```

## Scaling to 100+ tools

- Registry pattern is O(1) per tool; sitemap/directory/categories update
  automatically.
- Categories can be added in `categories.ts` (type union in `types.ts`).
- Programmatic SEO expansion (e.g. `/tools/emi-calculator` variants per
  loan type) can reuse `ToolDefinition` with generated entries.
- If bundle-map file grows large, split registry map by category —
  no route changes needed.
