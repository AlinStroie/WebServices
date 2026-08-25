# Security posture audit — A Squared Studio

Read-only investigation, 2026-08-25, covering the whole application (Vite/React frontend, Express/Prisma backend, Clerk-authenticated client portal) — not a diff review. No live, exploitable hole was found in auth, admin gating, or input handling.

Legend: 🔴 real gap · 🟠 worth fixing · 🟢 verified fine, no action needed

---

## Worth fixing

### 1. 🟠 No CSP on the site the browser actually renders
`helmet()` in `server/src/app.js` ships a default Content-Security-Policy — but that header lands on the Express API's JSON responses, not on the HTML the browser parses and runs scripts in (the frontend is a separate static Vercel deploy; `vercel.json` had only `rewrites`, no `headers` block). No exploitable XSS sink was found to pair with this (no `dangerouslySetInnerHTML` anywhere in `src/`, all admin-authored case-study text renders through plain JSX, which auto-escapes) — this is defense-in-depth, not a live hole.

**Fix applied:** added a `headers` rule to the root `vercel.json` with a real CSP scoped to what the site actually loads (self, `googletagmanager.com` for GA4's script, `*.google-analytics.com`/`*.analytics.google.com` for GA4's collect beacons, `api.asquaredstudio.ro` for the backend). `portal/vercel.json` was deliberately left alone — Clerk's auth flow needs its own specific allowlisted domains (its frontend API host, `*.clerk.accounts.dev`, etc.), and guessing at those risked breaking client login. Add a Clerk-correct CSP there separately if wanted.

### 2. 🟠 Outdated deps with available non-breaking patches
`npm audit` (root): `react-router` inside a range with an open-redirect advisory (backslash handling in `Link`/`useNavigate`) — no code path here feeds user-controlled input into a navigation target, so not currently exploitable. `npm audit` (server): `express-rate-limit` pulls a vulnerable `ip-address` used internally for rate-limiter IP keying, not by any custom trust-boundary logic — low practical risk.

**Fix applied:** `npm audit fix` (no `--force`) in both root and `server/` — resolved react-router and `ip-address`/`express-rate-limit`. One advisory remains in `server/` after that: `deepmerge-ts` (via `@prisma/config` → `prisma`), fixable only by force-downgrading `prisma` to 6.12.0. Left as-is — the vulnerable path is Prisma's own CLI config loader merging deeply recursive objects, not reachable through any route this app exposes, and downgrading the ORM is a bigger risk than the advisory itself.

### 3. 🟠 Two unused dependencies carrying phantom vulnerabilities
`nanoid` and `nodemailer` were declared in `server/package.json` but never imported anywhere in `server/src` (verified via grep — the only match was inside Prisma's own bundled runtime string, unrelated). Email actually goes out via a raw `fetch()` to Brevo's HTTP API (`server/src/lib/mailer.js`), not nodemailer. Their flagged CVEs require the app to call into that code, which it never does — not a live risk, but dead weight that shows up in every future audit scan.

**Fix applied:** removed both from `server/package.json`.

### 4. 🟠 Analytics endpoint accepts a client-supplied `sessionId` with no format check
`POST /api/analytics/event` upserts `AnalyticsSession` keyed on a client-supplied `sessionId`, previously validated only as `string().min(8).max(120)` — any string in range. Since sessions are otherwise pseudonymous and the endpoint is deliberately unauthenticated by design (anonymous visitor analytics), this isn't a privacy breach, but it did mean the field wasn't actually pinned to the shape the frontend generates (`crypto.randomUUID()`), letting arbitrary strings loosely masquerade as session IDs.

**Fix applied:** tightened `sessionId` validation to the actual UUID v4 shape the frontend emits, rejecting anything else at the validation layer instead of accepting any 8–120 char string.

---

## Fine — verified, no action needed

- **Admin auth** — bcrypt password check, `adminLoginLimiter` (5 attempts/15min), JWT in an `httpOnly`/`secure` (prod)/`SameSite=None` (prod) cookie, 8h expiry, `active` flag re-checked on every request in `requireAdmin`. The permissive `SameSite=None` is covered by the `cors()` origin allowlist rejecting any non-listed origin before a real cross-site request would even be sent — no CSRF bypass found.
- **Admin sub-routes** — every admin route file has `router.use(requireAdmin)` at the top; nothing admin-only is reachable unauthenticated. The `DELETE /:id` and `PATCH /:id/contract-signed` contact-submission routes added earlier this session both sit under that same gate and are both audit-logged.
- **Portal (Clerk) auth** — identity is always derived from `getAuth(req)` (server-verified Clerk session), never from a client-supplied `clerkUserId`. Every portal query is scoped to the authenticated client's own ID — no cross-client data access found.
- **Input validation** — every mutating route (public and admin) runs through a Zod schema via a shared `validate()` middleware before touching Prisma. No raw SQL anywhere; all queries go through Prisma's parameterized query builder.
- **File uploads** — the `PortalProjectFile`/R2 model exists in the schema, but no route currently creates or accepts an upload. Nothing to assess yet — the surface doesn't exist.
- **Email injection** — every contact-form field is HTML-escaped before being interpolated into the notification email body.
- **Secrets hygiene** — grepped the whole app for hardcoded keys/secrets/passwords: none found. `.gitignore` covers every `.env` variant.
- **Rate limiting** — global limiter everywhere, plus dedicated stricter limiters on `/api/contact`, `/api/analytics/event`, and admin login — the three endpoints that actually need it.
- **Transport** — Vercel and Railway both terminate TLS and force HTTPS by platform default; confirmed live.

---

## Punch list (all four applied this session)

1. `npm audit fix` in root and `server/`.
2. Removed unused `nanoid` + `nodemailer` from `server/package.json`.
3. Added a real CSP to the main site via `vercel.json` (portal intentionally left for a separate, Clerk-aware pass).
4. Tightened `sessionId` validation to UUID v4 shape in `server/src/validators/analytics.schema.js`.
