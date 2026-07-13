# ToolNow — Product Requirements Document

Date: 2026-07-14 · Status: MVP in build

## Vision

The fastest, most private collection of free everyday tools on the web.
Every tool loads instantly, works on any phone, and processes data
entirely in the user's browser.

## Goals

1. Rank organically for long-tail utility queries (India-first finance,
   global general utilities) and grow to 100+ tools.
2. Qualify for and monetize with Google AdSense + affiliate links.
3. Zero running cost: static hosting (Vercel free), no backend, no database.

## Non-goals (MVP)

- User accounts, login, subscriptions, paid tiers
- Server-side processing of user data
- Native mobile apps
- Dark mode (roadmap)

## Users

- **Money-decision makers (primary, IN):** salaried professionals and
  small businesses computing GST, EMI, in-hand salary, PF, hikes.
- **Everyday doers (global):** students/office workers counting words,
  converting cases, compressing images, merging PDFs, making QR codes,
  invoices and resumes.
- **Developers (secondary):** JSON/regex/SQL/Base64/timestamp utilities.

## Product principles

1. **No friction:** no signup, no upload, no watermark, no paywall.
2. **Private by architecture:** tool inputs never leave the device.
3. **Every page teaches:** each tool ships with original explainer
   content, formulas with worked examples, and FAQs (SEO + AdSense quality).
4. **Fast:** static generation, per-tool code splitting, system-quality
   Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).

## MVP scope — 25 tools

- **Finance (7):** GST, EMI, Salary (CTC→in-hand), Hike, PF, Percentage, Age
- **Developer (8):** JSON Formatter, JSON Validator, Base64, URL Encoder,
  Timestamp Converter, UUID Generator, Regex Tester, SQL Formatter
- **Text (3):** Word Counter, Case Converter, Text Diff
- **Image & PDF (3):** Image Compressor, JPG→PDF, PDF Merger
- **Generators (4):** QR Code, Password, Invoice, Resume Builder

Plus: home, all-tools directory, 5 category pages, 5 long-form guides,
about, contact, privacy, terms, disclaimer, cookie policy, custom 404,
sitemap.xml, robots.txt.

## Success metrics

- Indexed pages in GSC within 4 weeks of launch
- 1,000 organic sessions/month by month 3; 10,000 by month 6
- AdSense approval on first or second application
- CWV: all green in field data

## Requirements traceability

| Requirement | Implementation |
|---|---|
| No backend | Fully static Next.js output; all tools client-side |
| Privacy | No cookies by default; localStorage only for invoice/resume drafts |
| SEO | Per-tool metadata, canonical, OG/Twitter, FAQ + Breadcrumb + WebApplication JSON-LD, sitemap, internal linking |
| AdSense readiness | Original 600+ word content per tool page, legal pages, ad slots gated behind env var |
| Scalability | Central typed tool registry; adding a tool = 1 registry entry + 1 component |
