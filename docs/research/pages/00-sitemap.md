# Reference sitemap — full route enumeration

Source: `https://dixieraizpacheco.com`. Captured 2026-08-07 via Playwright (`a[href]` crawl of the home page + nav/footer dropdowns).

The first research pass treated the reference as a single long home page. It is not — it is a **multi-page SvelteKit site with ~45 internal routes**. The home page (12 sections) is documented in `../components/`. This file records every other route and groups them by structural template.

## All internal routes

| Route | Bucket | Researched |
|---|---|---|
| `/` | Home | ✅ `../components/` |
| `/project/century-21-pura-vida` | Portfolio detail | ✅ template (below) |
| `/project/cirrus7-computing` | Portfolio detail | ↳ same template |
| `/project/content-dimension-cms` | Portfolio detail | ↳ |
| `/project/diamond-marketing-group` | Portfolio detail | ↳ |
| `/project/martin-architectural-group` | Portfolio detail | ✅ sampled |
| `/project/rattan-luxe` | Portfolio detail | ↳ |
| `/project/seo-degree` | Portfolio detail | ↳ |
| `/project/seo-frameworks` | Portfolio detail | ↳ |
| `/case-studies` → `/case-studies/prime-home-health` | Case-study article | ✅ sampled |
| `/discovery` | Multi-step form | ✅ sampled |
| `/awards` | Awards page | ✅ sampled |
| `/tools`, `/tools/palette-importer`, `/tools/unitshift` | Free tools | ⚠️ skipped (low relevance) |
| `/privacy-policy`, `/terms-of-service` | Legal | ⚠️ skipped (trivial) |
| ~25 SEO landing pages (see below) | SEO article | ✅ 1 sampled (`web-design-philippines-pricing`) |

### The ~25 SEO landing pages (share ONE template)
`/bespoke-web-design`, `/case-studies`, `/cebu-web-designer`, `/dental-website-design`, `/ecommerce-website-cost-philippines`, `/filipino-web-designer`, `/healthcare-website-accessibility`, `/healthcare-website-design-cost`, `/hipaa-compliant-website-design`, `/hipaa-website-requirements`, `/hire-filipino-web-designer-direct-vs-platforms`, `/med-spa-website-design`, `/medical-clinic-website-design`, `/mental-health-website-design`, `/outsource-web-development-philippines`, `/patient-booking-scheduling-integration`, `/phia-pipeda-compliant-healthcare-website`, `/physiotherapy-website-design`, `/responsive-web-design-for-seo`, `/services/healthcare-website-design`, `/telehealth-website-design`, `/therapist-website-design`, `/web-design-agency-philippines`, `/web-design-agency-vs-freelancer-philippines`, `/web-design-cost-philippines`, `/web-design-vs-web-development`, `/web-developer-philippines`, `/wordpress-alternatives`.

These are content-marketing / SEO pages. Structurally they are all the same article template (sticky hero + repeated `py-12 sm:py-16` prose blocks + tables + shared FAQ + shared footer CTA). They are **not** distinct patterns A Squared needs; documented once as `E-seo-article`.

## Structural template families (the real takeaway)

The whole site is built from **4 page templates + 1 form page**, all sharing one `<header>` and one `<footer>` CTA block:

1. **Home** — the showcase page (12 sections). `../components/`.
2. **Portfolio detail** (`/project/*`) — narrative case study of a build. `A-project-detail.md`.
3. **Case-study article** (`/case-studies/*` + the 25 SEO landers) — long-form article. `B-case-study.md` + `E-seo-article.md`.
4. **Awards** (`/awards`) — recognition/credentials page. `D-awards.md`.
5. **Discovery** (`/discovery`) — multi-step consultation form. `C-discovery.md`.

Shared across all: `header.fixed.w-full.z-50.transition-all.duration-300` (88px) and `footer.bg-dark.py-40.space-y-40` (~2396px, "Maximize your ROI…" CTA + link columns).
