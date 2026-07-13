# ToolNow — SEO Strategy

## Positioning

Win **long-tail, high-intent utility queries** where big brands publish
thin or ad-cluttered pages. Every tool page is simultaneously a working
tool (satisfies the search task instantly) and a genuine explainer
(satisfies helpful-content systems and answer engines).

## Keyword clusters (initial 25 tools)

| Cluster | Head term | Long-tail targets (examples) | Intent |
|---|---|---|---|
| GST | gst calculator | remove gst from price, reverse gst calculator 18%, cgst sgst split calculator | transactional |
| EMI | emi calculator | emi for 25 lakh home loan 20 years, emi formula with example | transactional |
| Salary | in hand salary calculator | ctc to in hand calculator india, 12 lpa in hand salary | transactional |
| Hike | hike calculator | 30 percent hike on current salary, hike percentage between two salaries | transactional |
| PF | pf calculator | epf corpus at retirement calculator, employer pf contribution split | transactional |
| Percentage | percentage calculator | what is x percent of y, percentage increase between two numbers | transactional |
| Age | age calculator | age in years months days, days until next birthday | transactional |
| JSON | json formatter | json formatter without upload, json beautifier private | transactional |
| …and equivalents for each remaining tool | | | |

Guides target **informational** siblings ("ctc vs in hand salary
explained", "how emi is calculated") that funnel internal links into the
tool pages.

## On-page system (implemented in code)

- Unique `<title>` ≤60 chars + meta description 140–160 chars per page
- Canonical URLs on every route; OpenGraph + Twitter cards
- One `<h1>` per page; semantic heading hierarchy; breadcrumbs
- 600+ words of original content per tool page: intro, how-to steps,
  formula sections with worked examples, 4–6 FAQs
- Structured data per tool page: `WebApplication` + `FAQPage` +
  `BreadcrumbList`; `Article` on guides; `WebSite`+`Organization` sitewide
- `sitemap.xml` and `robots.txt` generated from the registry
- Internal linking: every tool links 3–4 related tools; guides link
  tools; categories/footer/home create a dense, crawlable graph

## Answer-engine / AI-search optimization

- FAQ answers are self-contained, numeric-example-first — quotable by
  featured snippets and LLM answer engines
- Formulas written in plain text ("EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1)")
  for snippet extraction
- Stable, descriptive URLs (`/tools/gst-calculator`)

## Scaling plan to 100+ tools

1. **Depth before breadth:** finance variants first (home-loan EMI,
   car-loan EMI, SIP, FD, RD, income-tax, gratuity, NPS) — same
   components, new registry entries, highest RPM.
2. Then conversion clusters (units, dates, currencies), then more file
   tools (PNG→WebP, PDF split/compress).
3. One guide per 3 tools minimum; refresh dates annually (GST slabs,
   PF interest rate).
4. Measure via GSC; promote winners with more internal links from home.

## Launch checklist (manual)

- [ ] Verify domain in Google Search Console (HTML tag method)
- [ ] Submit sitemap.xml
- [ ] Set NEXT_PUBLIC_SITE_URL to final domain and rebuild
- [ ] Create GA4 property → set NEXT_PUBLIC_GA_ID
- [ ] Bing Webmaster Tools (free Yandex/DuckDuckGo coverage)
