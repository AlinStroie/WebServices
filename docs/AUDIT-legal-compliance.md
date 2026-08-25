# Legal / GDPR compliance audit — A Squared Studio

Read-only investigation, 2026-08-25. No code changed as part of this audit.

**Not formal legal advice.** This is a technical compliance-pattern review (code + published Romanian/EU legislation), not a licensed avocat's sign-off. For real disputes or filings, get an avocat to review before relying on this.

Supersedes/updates section 3 ("Legal / Privacy / ToS") of `docs/AUDIT-seo-security-legal.md` (2026-08-18) — that doc's claim of "an actual manual deletion path" in the admin panel is **incorrect**: no such endpoint exists (see finding #3 below).

Legend: 🔴 real gap, fine-able · 🟠 worth fixing · 🟢 verified fine, no action needed

---

## Critical

### 1. 🔴 No company legal identity anywhere on the site
`src/data/siteConfig.js` has no `company` object at all — no CUI, no nr. înregistrare Registrul Comerțului, no sediu social, no formă juridică (SRL/PFA). Footer (`SiteFooter.jsx`) only shows `© {year} A Squared Studio`. All three legal pages (`Terms.jsx`, `PrivacyPolicy.jsx`, `CookiePolicy.jsx`) read `siteConfig?.company?.name` with a fallback, and `PrivacyPolicy.jsx` even self-flags the gap in its own text ("După definitivarea datelor firmei/PFA, această secțiune trebuie completată").

**Legal basis:** Legea nr. 365/2002 privind comerțul electronic, Art. 5 — orice furnizor de servicii ale societății informaționale trebuie să afișeze, ușor accesibil: denumire, sediu, contact, nr. Reg. Com. (dacă e cazul), CUI, autoritate de reglementare (dacă e cazul). Se aplică indiferent de B2B/B2C — nu există excepție pentru agenții care lucrează doar cu firme.

### 2. 🔴 Retention period is vague, not concrete
`PrivacyPolicy.jsx` Section 7 says only "atât timp cât e necesar... nu mai mult decât e rezonabil" — no concrete period or criteria.

**Legal basis:** GDPR Art. 5(1)(e) (principiul limitării stocării). ANSPDCP has issued real fines for exactly this pattern (e.g. 19.898 lei, storage-limitation violation) — vague "as long as reasonable" language is a documented enforcement risk, not a theoretical one.

### 3. 🔴 "Right to erasure" is promised but not technically possible
`PrivacyPolicy.jsx` Section 7 states requests "can be deleted manually from the admin panel." Verified against `server/src/routes/admin/contact.routes.js`: only `GET` (list, single) and `PATCH /:id/status` exist. **No `DELETE` route for `ContactSubmission`, anywhere.** If a data subject exercises GDPR Art. 17, there is currently no way to honor it short of a direct database operation.

### 4. 🔴 No retention automation — the specific feature requested
No `node-cron` or any scheduler in `server/`. `ContactStatus` enum is only `NEW / READ / REPLIED / ARCHIVED` — nothing marks "became a paying client with a signed contract." Needed before the requested "auto-delete incomplete requests after 3 months" can be built — see **Implementation plan** below.

### 5. 🔴 Two contradictory legal-text systems in the codebase
Live pages (`/privacy`, `/cookies`, `/terms`) are one system. A second, older system (`siteConfig.legal` + `src/components/LegalInfo.jsx` + `src/components/LegalModal.jsx`) has different, vaguer wording for the same topics. Confirmed via grep: `LegalInfo`/`LegalModal` are not imported anywhere else — dead code today, but it's a second source of truth that can drift or get accidentally re-wired in. Should be deleted.

---

## Worth fixing

### 6. 🟠 OUG 34/2014 — withdrawal right not addressed
Applies whenever a client is a persoană fizică (not just SRL/PFA). `Terms.jsx` says nothing about the 14-day withdrawal right or its exception. Art. 16 lit. c) exempts goods/services "made to the consumer's specification or clearly personalized" — a custom-built website plausibly qualifies, but **the exception has to be stated explicitly in the terms to be invoked**; it isn't currently.

### 7. 🟠 Unverifiable performance claims
Copy like "scor Lighthouse 95-100" / "încărcare sub 2 secunde" in `src/data/pricing.js`. Not illegal, but under Legea 363/2007 the burden of proof for such claims sits with the trader if ANPC or a customer challenges them.

### 8. 🟠 Raw IP/user-agent in `ContactSubmission`, no retention limit
Justifiable under legitimate-interest (anti-fraud/security), but combined with gap #2/#4 it compounds — fixing retention fixes this too.

---

## Verified fine — no action needed

- **ODR platform link** — the EU ODR platform closed permanently July 20, 2025 (Reg. UE 2024/3228); the display obligation is gone. Confirmed no stale link exists on the site either.
- **DPO / ANSPDCP registration** — not required at this scale; prior-registration requirement was abolished with GDPR (2018).
- **Cookie banner** (fixed earlier this session) — equal-weight Accept/Reject buttons, no pre-ticked boxes, working withdrawal panel. Matches exactly what ANSPDCP checks first in a cookie-banner audit.
- **Analytics gating** — `hasAnalyticsConsent()` genuinely blocks all event transmission pre-consent; sessions are pseudonymized (`ipHash`, `userAgentHash`) in `AnalyticsSession`.
- **Admin security** — bcrypt, rate-limited login, `httpOnly`/`secure` JWT cookie (8h expiry), audit log. Reasonable GDPR Art. 32 coverage.
- **Marketing consent** — hardcoded `marketing: false`, matches the claim that no marketing cookies are in use.

---

## Implementation plan (pending approval)

1. Add `contractSigned: Boolean @default(false)` (or equivalent) to `ContactSubmission` — admin manually flags it once a client signs.
2. Add `DELETE /api/admin/contact-submissions/:id` (audit-logged, like the status route) — fixes #3, gives a real manual erasure path.
3. Add a daily `node-cron` job on the server: delete any `ContactSubmission` where `contractSigned = false` and `createdAt` older than 3 months.
4. Fill in real company identity in `siteConfig.js` once the legal entity data is provided — propagate to footer + all three legal pages.
5. Replace vague retention wording in `PrivacyPolicy.jsx`/`CookiePolicy.jsx` with concrete periods (3 months for unconverted leads; a defined period post-contract for clients).
6. Delete `LegalInfo.jsx` + `LegalModal.jsx` (dead code, conflicting content).
7. Add the OUG 34/2014 withdrawal-right clause + custom-service exception to `Terms.jsx`.
8. Soften or evidence the unverifiable performance claims in `pricing.js`.

Waiting on: real company legal data (CUI, sediu, formă juridică) to unblock #4, and confirmation of the business rule for #1 ("contract signed" = admin manually flags it, unless there's a better signal).
