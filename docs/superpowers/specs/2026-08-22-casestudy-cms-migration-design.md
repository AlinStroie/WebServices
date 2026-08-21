# Case Study CMS Migration — Design Spec

Date: 2026-08-22
Status: Approved by user, ready for implementation plan

## Context

The site is retiring its Blog feature (`/blog`, `/blog/:slug`, admin blog CRUD)
in favor of Case Studies. Blog content is placeholder-only in production —
confirmed safe to drop, not migrate.

Case Studies today are **not** DB-backed: `src/data/caseStudy.js` (single
homepage spotlight card) and `src/data/caseStudyDetails.js` (keyed by
portfolio project id, one entry: `prolinen`) are static files.
`src/pages/CaseStudies.jsx` (the `/studii-de-caz` index) is a literal
"coming soon" placeholder — no real index exists yet.

Goal: repurpose the Blog CMS infrastructure (Prisma models, admin CRUD,
audit logging, public API) into a Case Study CMS, fully DB-backed, admin
manageable — same maturity level Blog had.

## Non-goals

- `src/data/portfolio.js` / `src/data/showcaseGrid.js` — the visual
  portfolio/mockup-browser system (color themes, gradient classes, mini-site
  JSX components) stays untouched. It is not editorial content and doesn't
  belong in a CMS form.
- No category/tag taxonomy for case studies (YAGNI — Blog had
  `BlogCategory`/`BlogTag`/`BlogPostTag`; case studies are few in number and
  don't need it).
- Admin dashboard visual redesign is a separate spec (B), out of scope here.

## Data model

Replace `BlogPost`, `BlogCategory`, `BlogTag`, `BlogPostTag` with a single
`CaseStudy` model in `server/prisma/schema.prisma`:

```
model CaseStudy {
  id                String   @id @default(cuid())
  slug              String   @unique   // matches an id in src/data/portfolio.js
  status            CaseStudyStatus @default(DRAFT)
  featured          Boolean  @default(false)
  publishedAt       DateTime?

  kicker            String   // index/spotlight eyebrow text
  title             String
  description       String   // index/spotlight card copy

  role              String
  timeline          String
  overview          String

  challengeIntro    String
  challengePoints   Json     // string[]

  approach          Json     // [{ title: string, text: string }]

  solution          String
  results           String

  gallery           Json     // [{ src: string, caption: string }]
  stats             Json     // [{ value: string, label: string }]

  metaTitle         String?
  metaDescription   String?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([status, publishedAt])
  @@index([featured])
}

enum CaseStudyStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

This fixes an existing bug: today `CaseStudyDetail.jsx` renders the same
global `caseStudy.js` stats on every project's detail page (there's only one
project's stats to show). With `stats` on the `CaseStudy` row, each case
study gets its own.

Migration: one Prisma migration drops the four Blog tables and creates
`CaseStudy` + `CaseStudyStatus` enum. Confirmed with user: no real blog
content exists in production, safe to drop without export/backup.

## Backend

- `server/src/routes/casestudy.routes.js` (public, replaces
  `blog.routes.js`): `GET /api/case-studies` (published list), `GET
  /api/case-studies/:slug` (full record, 404 unless PUBLISHED).
- `server/src/routes/admin/casestudy.routes.js` (replaces
  `admin/blog.routes.js`): `GET /` (paginated/search/status filter), `GET
  /:id`, `POST /` (create), `PATCH /:id`, `PATCH /:id/status`, `DELETE /:id`
  (soft-delete → ARCHIVED, matching Blog's pattern). All mutating actions
  call `createAuditLog(...)`.
- `server/src/validators/casestudy.schema.js` and
  `server/src/validators/admin/casestudy.schema.js` — same
  validation-library pattern as the Blog validators, fields per the model
  above.
- Delete: `server/src/routes/blog.routes.js`,
  `server/src/routes/admin/blog.routes.js`,
  `server/src/validators/blog.schema.js`,
  `server/src/validators/admin/blog.schema.js`,
  `server/prisma/importBlogPosts.js`.

## Frontend

- `src/pages/CaseStudies.jsx`: replace the placeholder with a real index —
  fetch published case studies, render cards (kicker/title/description/cta),
  matching the site's existing dark "replica" visual language (same
  treatment `Blog.jsx` used for its index, adapted).
- `src/pages/CaseStudyDetail.jsx`: swap the static `caseStudyDetails[slug]`
  lookup for a fetch to `GET /api/case-studies/:slug`; keep merging with
  `portfolio.find(id === slug)` for visual-only fields (video, client,
  category, features, liveUrl) exactly as today. Replace
  `spotlight.stats.map(...)` with `detail.stats.map(...)`.
- `src/lib/api.js`: add `getCaseStudies()`, `getCaseStudy(slug)` alongside
  the existing blog fetch helpers (which get removed).
- Delete: `src/pages/Blog.jsx`, `src/pages/BlogPost.jsx`,
  `src/components/BlogCard.jsx`, `src/components/BlogCarousel.jsx`,
  `src/components/BlogPreview.jsx`, `src/data/blogPosts.js`,
  `src/pages/Home.jsx` (dead — not routed since `App.jsx` uses
  `HomeReplica`), the `/blog`, `/blog/:slug` routes in `App.jsx`, and the
  "Blog" links in `Footer.jsx` / `SiteFooter.jsx` (point that nav slot at
  `/studii-de-caz` instead).
- Also delete now-orphaned static data: `src/data/caseStudy.js`,
  `src/data/caseStudyDetails.js` once their content is migrated into the DB
  via seed (see below).

## Admin

- `src/pages/admin/AdminBlog.jsx` → `src/pages/admin/AdminCaseStudies.jsx`:
  same list/search/status-filter/archive pattern.
- `src/pages/admin/AdminBlogEditor.jsx` → `AdminCaseStudyEditor.jsx`: same
  create/edit shape, but replaces Blog's raw-JSON content textarea with
  structured inputs — repeatable field groups for `challengePoints`,
  `approach` (title+text pairs), `gallery` (src+caption pairs), `stats`
  (value+label pairs). This is a real UX upgrade over Blog's dev-only JSON
  box, and it's the natural place to do it since the editor is being
  rebuilt anyway.
- `src/lib/adminApi.js`: replace the six `*AdminBlogPost*` functions with
  `*AdminCaseStudy*` equivalents.
- `src/App.jsx`: `/admin/blog`, `/admin/blog/new`, `/admin/blog/:id/edit` →
  `/admin/case-studies` equivalents. `AdminLayout.jsx` nav entry: "Blog" →
  "Studii de caz".

## Data carry-over

The existing `prolinen` case study (in `caseStudy.js` +
`caseStudyDetails.js`) is real, shipped content — not placeholder. It gets
seeded into the new `CaseStudy` table as the first row (status PUBLISHED,
featured true) via a one-off seed script (`server/prisma/seedCaseStudies.js`,
replacing `importBlogPosts.js`), so nothing is lost.

## Testing

- Backend: exercise public + admin route handlers against the new schema
  (mirroring however the Blog routes were tested, if at all — check for
  existing test coverage before assuming none).
- Frontend: manual verification — `/studii-de-caz` lists the seeded
  ProLinen case study, `/studii-de-caz/prolinen` renders identically to
  today's static page, admin can create/edit/publish/archive a case study
  end-to-end, `npm run build` passes with no orphaned Blog imports.
