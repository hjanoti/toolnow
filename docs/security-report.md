# ToolNow — Security Report

Date: 2026-07-14 · Reviewed against OWASP Top 10 (2021)

## Threat model summary

The site is fully static with **no backend, no database, no
authentication and no server-side processing of user data**. The entire
OWASP server-side surface (injection, broken auth, SSRF, insecure
deserialization…) is architecturally absent. Remaining surface:
client-side code, third-party scripts (GA/AdSense, env-gated), the
Web3Forms contact endpoint, and the supply chain.

## Controls implemented

| Area | Control |
|---|---|
| Security headers | CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo/payment denied), HSTS 2y + preload — `next.config.ts` |
| CSP | `default-src 'self'`; scripts limited to self + Google tag/ads domains; `object-src 'none'`; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action` limited to self + Web3Forms; `upgrade-insecure-requests` |
| XSS | React auto-escaping throughout; the only `dangerouslySetInnerHTML` is JSON-LD, serialized with `<` → `<` escaping; no user input is ever rendered as HTML |
| Input validation | All calculator inputs parsed + range-checked with invalid-state UI; invoice form validated with Zod (incl. GSTIN regex); file tools check MIME/type and enforce 25 MB caps; regex tester wraps construction in try/catch |
| Randomness | Passwords/UUIDs use `crypto.getRandomValues` / `crypto.randomUUID` with rejection sampling (no modulo bias); `Math.random` is not used for anything security-relevant |
| Privacy | No cookies set by us; tool inputs never transmitted; localStorage drafts stay on-device; GA anonymize_ip on |
| Clickjacking | `frame-ancestors 'none'` + `X-Frame-Options: DENY` |
| Contact form | Honeypot field; posts only name/email/message to Web3Forms over HTTPS; key is publishable by design |
| Supply chain | Minimal dependency set (qrcode, pdf-lib, sql-formatter, diff, zustand, RHF, zod — all MIT/BSD, widely audited); `npm audit --omit=dev --audit-level=high` in CI |
| Secrets | No secrets in the repo; all config via `NEXT_PUBLIC_*` env vars that are public-by-design identifiers; `.env.local` gitignored |

## Known accepted risks

1. **CSP `'unsafe-inline'` for script-src.** Required by Next.js
   hydration inline scripts + GA/AdSense snippets on a static deployment
   without middleware nonces. Mitigated by the tight `script-src` host
   allowlist and React's output escaping. Revisit with nonce-based CSP
   via `proxy.ts` if middleware is ever added.
2. **`npm audit`: 2 moderate advisories** in Next.js's *bundled* postcss
   (GHSA-qx2v-qp2m-jg93, XSS in stringify output). Build-time only — the
   vulnerable code path never runs in production output. The suggested
   "fix" downgrades Next 16 → 9 and is rejected. Track and clear on the
   next Next.js patch release. Production dependencies audit clean.
3. **Client-side regex evaluation** (regex tester) can hang the user's
   own tab on catastrophic backtracking — self-inflicted only, no server
   impact. Acceptable for MVP; a Web-Worker timeout is a roadmap item.
4. **Rate limiting: N/A** — no APIs or form handlers of our own;
   Web3Forms enforces its own rate limits; static pages are CDN-served.

## Verification performed

- `npm audit` reviewed (see above) — no high/critical anywhere,
  production tree clean
- TypeScript strict, ESLint (incl. React Compiler rules) clean
- 148 unit tests passing, including crypto sampling and validation edges
- Manual review of every `dangerouslySetInnerHTML` usage (1: JSON-LD, escaped)
