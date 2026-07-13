# ToolNow — Monetization Plan

## Phase 0 (now → AdSense approval)

No ads. Focus: indexation, content quality, traffic baseline.
The `AdSlot` component is already wired but renders nothing until
`NEXT_PUBLIC_ADSENSE_CLIENT` is set — the site ships AdSense-ready.

Apply to AdSense when: 25+ indexed pages, legal pages live, custom
domain active (recommended; approval on *.vercel.app is unreliable),
and a cookie-consent banner is added for EEA visitors (required by
Google's EU user consent policy — roadmap item before enabling ads).

## Phase 1 — AdSense (approval → ~50k pageviews/mo)

Placements (already reserved in layout, CLS-safe):
1. `tool-top` — below the tool, above content (highest viewability
   without pushing the tool below the fold — policy-safe)
2. `tool-bottom` — between FAQs and related tools
3. `home` — between popular tools and categories

Rules: never above the tool itself on mobile, never inside results,
max 2–3 units/page, no layout shift (min-height reserved).

Revenue model at finance-heavy mix: $10–25 RPM blended.
50k pv/mo ≈ $500–1,250/mo potential at maturity.

## Phase 2 — Affiliate (parallel, from month 2–3)

Contextual, disclosure-marked links only (FTC/ASCI compliant):
- EMI/loan pages → credit marketplaces (BankBazaar, Paisabazaar programs)
- Salary/PF pages → tax-filing tools (ClearTax et al.), term insurance
- Resume builder → job boards, skill platforms (Coursera/Udemy programs)
- Password page → password managers (NordPass/1Password affiliates)
- Image/PDF tools → VPS/storage (low fit — skip initially)

Rule: affiliate blocks live in the content sections, clearly labelled
"Sponsored", never disguised as tool output.

## Phase 3 — Optional upgrades (6+ months)

- Switch high-traffic pages to a premium ad network (Mediavine/Raptive
  thresholds: 50k sessions) — 2–5× AdSense RPM
- "Pro" features stay free — the brand is the moat; monetize attention,
  not access

## Content strategy that feeds revenue

- Every new finance tool = new high-RPM inventory
- Guides capture informational queries and interlink to tools
- Seasonal spikes: salary-hike (Mar–Apr appraisals), tax (Jan–Mar, Jul),
  festival loans (Sep–Nov) — publish/refresh ahead of them
