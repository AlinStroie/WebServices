# SEO / Security / Legal audit — A Squared Studio

Read-only investigation, 2026-08-18. No code changed as part of this audit.

Legend: 🔴 blocking/real gap · 🟠 notable, worth fixing soon · 🟢 fine / already handled

---

## 1. SEO

### Crawlability
- 🔴 `index.html:20` — `<link rel="canonical" href="https://example.com/">` is a placeholder that was never fixed. `SEO.jsx` overwrites it client-side per route, but non-JS crawlers/tools and social-share bots read the raw HTML and see `example.com` as canonical.
- 🔴 `sitemap.xml` only lists 5 URLs (home + blog + 4 posts). Missing: `/preturi`, `/studii-de-caz`, `/discovery`, `/project/:slug` pages, and all legal pages.
- 🟢 `robots.txt` is reasonable. No stray `noindex` except on `NotFound.jsx` (correct).

### Metadata
- 🟠 All title/description/OG/canonical/JSON-LD is injected via `useEffect` in `SEO.jsx:52-134` — nothing is present in the server-delivered HTML. Google renders JS so indexing still works, but **social unfurlers (Facebook, LinkedIn, Slack, WhatsApp) don't execute JS** — every shared link shows the generic homepage OG tags from `index.html`, not the actual page's.
- 🟠 `siteConfig.js` → `siteUrl: ""` (empty). Canonical/`og:url` fall back to `window.location.origin`, so a staging/preview deploy would self-canonicalize to the wrong domain.
- 🟢 `/privacy` and `/politica-confidentialitate` both route to the same `PrivacyPolicy` component with no canonical pointing one to the other — duplicate-content risk, worth a canonical tag.

### Structured data
- 🟢 `HomeReplica.jsx:47-69` has `WebSite` + `Organization` JSON-LD (email/phone/city, `sameAs` socials) — decent baseline.
- 🟠 Missing: `LocalBusiness`/`ProfessionalService` type (ranks weaker for local pack than plain `Organization`), no `geo` coordinates, no `priceRange`, no `FAQPage` schema despite a real FAQ section existing, no `Service`/`Offer` schema for the pricing tiers, no `BreadcrumbList` on deeper pages.

### Local / geo SEO
- 🟢 `<html lang="ro">` correct; no hreflang needed (single-language site).
- 🟠 NAP exists in `siteConfig.contact`, but address is just `"Brașov, România"` — no street address, no geo meta tags, no lat/long. Won't strongly support a Google Business Profile match.

### Generative-engine optimization
- 🟢 No `llms.txt` — confirmed absent, but this is an emerging/optional item, not a real gap yet.

### Performance / Core Web Vitals
- 🟠 New hero video (`public/hero/hero-video.mp4`, ~1.6MB, autoplay, full-bleed) is now the largest above-fold paint (LCP candidate) with no preload hint.
- 🟠 Only 1 of 25 `<img>` tags site-wide uses `loading="lazy"` — most below-fold images aren't deferred.
- 🟢 Fonts use `font-display: swap`. `vite.config.js` chunking is fine at this project size. `three.js`/`@react-three/fiber` sit in `package.json` but their only importer (`Home.jsx`) is dead/unrouted code — tree-shaken out of the real build, just repo clutter, not a bundle cost.

### Bugs found
- `index.html:29,38` — `og:image`/`twitter:image` point to `/banner site.svg`, a filename containing an **unencoded space** — likely fails to resolve for social-preview crawlers.

### Bottom line
Content/structure quality is solid; the canonical placeholder, thin sitemap, and JS-only social metadata are the kind of gaps that cap ranking/shareability below what the actual content quality deserves. All fixable in an afternoon — nothing structural.

---

## 2. Security

Backend: Node/Express + Prisma, admin panel, contact form, SMTP mailer.

1. **Secrets/env hygiene — 🟢 fine.** `.env`/`server/.env` properly gitignored, never committed. No hardcoded secrets in tracked source. Only `.env.example` placeholders present.
2. **Auth — 🟢 fine, well-built.** bcrypt password hashing, JWT (8h expiry) in an `httpOnly` cookie, `secure: true` in production, rate-limited login (5 attempts/15min via `adminLoginLimiter`), audit-logged logins/logouts, admin `active` flag re-validated server-side on every request (`requireAdmin.js`). No admin route reachable without `requireAdmin`.
3. **Injection surface — 🟢 fine.** No `$queryRaw`/`$executeRaw` in app code. No `dangerouslySetInnerHTML` anywhere in `src/`. Contact route validates via schema before touching `req.body`, plus a honeypot field and explicit GDPR-consent gate.
4. **CORS/headers — 🟢 fine.** `helmet()` active, CORS origin is an explicit allowlist (not `*`) with `credentials: true`, `hpp()` guards against parameter pollution.
5. **Rate limiting — 🟢 fine.** Global limiter + dedicated stricter limiters for contact, analytics, and admin login.
6. **Dependency vulnerabilities — 🟠 medium/high, fixable.**
   - Root: **react-router 6–7.x** — high severity (open redirect, XSS advisory, DoS via inefficient route matching, CSRF-bypass advisory). `npm audit fix` covers it, non-breaking.
   - Root: **vite** — high, but both advisories are Windows-local-dev-server-only (UNC path/NTLM hash leak, `fs.deny` bypass) — not a production runtime risk, still worth patching.
   - Server: **nanoid** — high (non-cryptographic RNG can loop); **nodemailer** — high (SSRF/arbitrary-file-read advisory gated behind a `raw` send option — checked `mailer.js`, that option isn't used, so not currently exploitable here, but still worth bumping, needs `--force`/breaking, test after).
7. **File/data exposure — 🟢 fine.** Nothing sensitive in `public/`/`server/`. `passwordHash` only ever used for `bcrypt.compare()`, never present in any `res.json()` response body.
8. **Cookies/CSRF — 🟠 the one real gap.** Cookie flags correct (`httpOnly`, `secure` in prod). No CSRF token / double-submit mechanism anywhere. Combined with `sameSite: "none"` in production (needed for cross-subdomain admin/API), a classic form-based CSRF against admin POST/PATCH/DELETE routes isn't fully ruled out. Add a CSRF token, or at minimum require a custom header (e.g. `X-Requested-With`) that a plain HTML form can't set, on state-changing admin routes.
9. **Transport — 🟢 fine.** No hardcoded `http://` for anything sensitive; production cookie/CORS config assumes HTTPS correctly.

### Bottom line
Genuinely well-hardened for a project this size — bcrypt, JWT with real expiry, rate limiting everywhere it matters, schema validation, audit logging, no injection surface found. Two concrete actions: run `npm audit fix` (react-router/vite, non-breaking) and evaluate the nodemailer bump separately (breaking); add a CSRF token to admin mutation routes given the `sameSite: "none"` cookie setting.

---

## 3. Legal / Privacy / ToS

1. **Cookie consent — 🟢 real, not theater.** `ConsentBanner.jsx` requires an explicit Accept/Essential-only choice (no pre-ticked boxes); `analytics.js:76` genuinely blocks all analytics transmission until consent is given. **Minor nuance**: `getSessionId()`/`captureUtmParams()` write to `sessionStorage` unconditionally on every page load — only *transmission* is gated, not local *storage*. This contradicts `CookiePolicy.jsx:82-93`'s literal claim that those keys are "used only if analytics is accepted" — storage happens either way (low real-world harm, nothing is sent unconsented, but a literal wording mismatch).
2. **Privacy Policy — 🔴 real gap, self-flagged.** Content is genuinely specific — correctly names actual data collected, actual sub-processors (Vercel, Railway/PostgreSQL, Brevo), and matches the real `ContactSubmission` Prisma model (name, email, phone, message, `gdprAccepted`, IP, user agent, source page). The policy itself admits the gap: `PrivacyPolicy.jsx:29-32` states the controller-identity section still needs the company's legal form/CUI/registered address once finalized. `siteConfig.js` confirms only `name`/`email`/`phone` exist — no legal entity data anywhere in the codebase.
3. **Terms — 🟢 adequate.** Correctly scoped to web-design services (not e-commerce/goods), no fabricated guarantees, links to Privacy/Cookie policies. No mention of ANPC/SOL-ODR dispute-resolution link.
4. **Romanian legal-identity requirement — 🔴 real gap.** No CUI, registered address, or legal form (SRL/PFA) displayed anywhere site-wide (footer, legal pages, siteConfig) — required under Romanian commercial-site rules (Legea 365/2002 / OUG 34/2014) once the business is formally registered. No ANPC SOL/ODR link found — likely required once contracting with individual consumers.
5. **Accessibility — 🟠 not deep-audited, flagged as follow-up.** Form inputs/consent checkbox use visible labels; full WCAG contrast/keyboard-nav compliance not verified. Worth a separate pass — the European Accessibility Act (enforceable since June 2025) applies to most commercial EU sites.
6. **Data-subject rights — 🟢 real mechanism exists.** `PrivacyPolicy.jsx:109-124` lists all GDPR rights with a real contact email; admin panel gives an actual manual deletion path. No automated retention/expiry job — deletion is manual-only (legal, but weaker practice for GDPR storage-limitation).
7. **Marketing consent — 🟢 fine.** `Discovery.jsx:364-377` has an explicit, unchecked GDPR checkbox separate from any marketing opt-in; `saveConsent` hardcodes `marketing: false` always, matching `CookiePolicy.jsx:55-61`'s claim that no marketing cookies are in use. No newsletter/double-opt-in flow found.

### Bottom line
Materially above-average for a small agency site — the policies were clearly written against the actual codebase, not copy-pasted. The one concrete must-fix-before-launch gap is the missing Romanian company legal identity (CUI/address/legal form), which the code already anticipates. Everything else is either compliant or a minor wording/storage-timing nuance.

---

## Priority punch list

1. **Legal (blocking for launch)** — get real CUI/registered address/legal form into `siteConfig.js` and the Privacy Policy's controller-identity section.
2. **SEO (cheap)** — fix the canonical URL placeholder, fill out `sitemap.xml` with all real routes, encode/rename `banner site.svg`.
3. **Security (cheap)** — run `npm audit fix`; add a CSRF token (or custom-header check) to admin mutation routes.
4. **Security (needs testing)** — bump `nodemailer` (breaking change, verify mailer still works after).
5. **Follow-up** — dedicated accessibility (WCAG/EAA) pass; consider `LocalBusiness`/`FAQPage`/`Service` schema for local-SEO uplift.
