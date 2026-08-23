# Case Study CMS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retire the DB-backed Blog CMS (models, routes, admin UI, frontend pages) and replace it with a DB-backed Case Study CMS of equal maturity — public index + detail pages fetching from the database, full admin CRUD with a structured editor, on the production Railway Postgres instance.

**Architecture:** One-for-one repurpose of the existing Blog CMS architecture (Prisma model → Express public routes → Express admin routes with audit logging → React admin CRUD pages → React public pages), applied to a new `CaseStudy` model whose shape matches the site's existing (currently static) case-study content. Blog's `BlogCategory`/`BlogTag` taxonomy is dropped (YAGNI — not needed for a handful of case studies). The visual portfolio/mockup system (`src/data/portfolio.js`) is untouched; `CaseStudy.slug` links to it the same way the static `caseStudyDetails.js` did.

**Tech Stack:** Express 5, Prisma 6 (`@prisma/client`, PostgreSQL on Railway), Zod validators, React 19 + React Router, Vite, Tailwind. No test framework exists in this codebase (confirmed: no jest/vitest/mocha/supertest dependency, no `*.test.js` files, no `test` script) — this plan does not introduce one; verification is manual (curl for the API, browser clicks for the UI), matching existing project convention.

**Spec:** `docs/superpowers/specs/2026-08-22-casestudy-cms-migration-design.md`

## Global Constraints

- Blog content in production is confirmed placeholder-only — the migration drops `BlogPost`/`BlogCategory`/`BlogTag`/`BlogPostTag` without export/backup.
- No category/tag taxonomy for `CaseStudy` (YAGNI, per spec).
- `src/data/portfolio.js` / `src/data/showcaseGrid.js` (visual mockup/theme data) stay untouched — not CMS content.
- Admin dashboard visual redesign is out of scope (separate spec B) — only rename/relabel the two spots (`AdminDashboard.jsx`, `AdminAnalytics.jsx`) that reference Blog-specific counts, no restyling.
- Soft-delete pattern: admin "delete" sets `status: ARCHIVED`, never a real row delete (matches Blog's pattern, matches audit-log expectations).
- Every admin mutation calls `createAuditLog(...)` (matches Blog's pattern).

---

### Task 1: Database — schema, migration, seed

**Files:**
- Modify: `server/prisma/schema.prisma` (lines 13-18 `BlogStatus` enum → `CaseStudyStatus`; lines 87-151 four Blog models → one `CaseStudy` model; line 31 `AnalyticsEventType.BLOG_VIEW` → `CASE_STUDY_VIEW`)
- Create: `server/prisma/seedCaseStudies.js`
- Delete: `server/prisma/importBlogPosts.js`

**Interfaces:**
- Produces: Prisma model `CaseStudy` with fields `id, slug, status, featured, publishedAt, kicker, title, description, role, timeline, overview, challengeIntro, challengePoints (Json), approach (Json), solution, results, gallery (Json), stats (Json), metaTitle, metaDescription, createdAt, updatedAt`; enum `CaseStudyStatus { DRAFT PUBLISHED ARCHIVED }`; enum value `AnalyticsEventType.CASE_STUDY_VIEW` (replaces `BLOG_VIEW`). Task 2 imports `prisma.caseStudy` and these enum values.

- [ ] **Step 1: Replace the Blog enum and models in the schema**

Edit `server/prisma/schema.prisma`. Replace lines 13-18:

```prisma
// Statusurile posibile pentru studiile de caz.
enum CaseStudyStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

Replace line 31 (`  BLOG_VIEW`) with:

```prisma
  CASE_STUDY_VIEW
```

Replace the entire block from the `// Articolele de blog.` comment (line 84) through the end of `model BlogPostTag { ... }` (line 151) with:

```prisma
// Studiile de caz.
// Conținut editorial pentru fiecare proiect real, livrat — nu date vizuale
// (acelea rămân în src/data/portfolio.js), doar textul paginii de caz.
model CaseStudy {
  id          String          @id @default(cuid())
  slug        String          @unique // trebuie să existe un proiect cu acest id în src/data/portfolio.js
  status      CaseStudyStatus @default(DRAFT)
  featured    Boolean         @default(false)
  publishedAt DateTime?

  kicker      String // eyebrow text pentru cardul din index
  title       String
  description String // textul cardului din index/spotlight

  role     String
  timeline String
  overview String

  challengeIntro  String
  challengePoints Json // string[]

  approach Json // [{ title: string, text: string }]

  solution String
  results  String

  gallery Json // [{ src: string, caption: string }]
  stats   Json // [{ value: string, label: string }]

  metaTitle       String?
  metaDescription String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status, publishedAt])
  @@index([featured])
}
```

- [ ] **Step 2: Generate and apply the migration**

Run: `cd server && npx prisma migrate dev --name blog_to_case_study`

Expected: Prisma prints a migration plan that drops `BlogPost`, `BlogCategory`, `BlogTag`, `BlogPostTag`, the `BlogStatus` enum, renames the `AnalyticsEventType` enum value, and creates `CaseStudy` + `CaseStudyStatus`. Confirm the prompt (this is a destructive migration on purpose — confirmed safe per spec). It completes with `Your database is now in sync with your schema.`

- [ ] **Step 3: Regenerate the Prisma client**

Run: `cd server && npx prisma generate`

Expected: `✔ Generated Prisma Client` with no errors, output written to `server/src/generated/prisma`.

- [ ] **Step 4: Write the seed script for the real ProLinen case study**

Create `server/prisma/seedCaseStudies.js`. Note: this project's Prisma client requires a driver adapter (`server/src/lib/prisma.js` constructs it with `@prisma/adapter-pg` + `DATABASE_URL` from `server/src/config/env.js`) — a bare `new PrismaClient()` will not connect. Reuse the existing singleton instead of constructing a new client (the deleted `importBlogPosts.js` used a bare `new PrismaClient()` from the default `@prisma/client` package, which predates the adapter setup — don't copy that pattern):

```javascript
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const existing = await prisma.caseStudy.findUnique({
    where: { slug: "prolinen" },
  });

  if (existing) {
    console.log("ProLinen case study already exists, skipping seed.");
    return;
  }

  await prisma.caseStudy.create({
    data: {
      slug: "prolinen",
      status: "PUBLISHED",
      featured: true,
      publishedAt: new Date(),

      kicker:
        "STUDIU DE CAZ · WEBSITE B2B PENTRU SPĂLĂTORIE INDUSTRIALĂ HORECA",
      title: "Un site care vinde, pentru o afacere B2B foarte specifică",
      description:
        "Echipa noastră a construit site-ul ProLinen HORECA de la zero: o prezentare directă a serviciului de spălătorie industrială pentru hoteluri și restaurante, cu procesul de colectare–spălare–livrare explicat pas cu pas și un singur obiectiv clar pentru vizitator — cererea de ofertă.",

      role: "Web design & dezvoltare",
      timeline: "De la brief la site live, într-un singur sprint",
      overview:
        "ProLinen HORECA spală și livrează lenjerie pentru hoteluri și restaurante din Brașov și Întorsura Buzăului. E un serviciu B2B foarte specific — clientul lor nu caută inspirație, caută răspunsuri clare: ce spălați, cum funcționează programul de livrare și cum cer o ofertă. Site-ul trebuia să răspundă la exact atât, fără decor în plus.",

      challengeIntro:
        "Un site B2B pentru un serviciu operațional are un singur job: să elimine orice ezitare înainte de „Cere o ofertă”. Trei lucruri stăteau în cale:",
      challengePoints: [
        "Serviciul e greu de explicat rapid — colectare, spălare, control calitate, livrare — fără să pară o listă seacă de proceduri.",
        "Zona deservită (Brașov & Întorsura Buzăului) trebuie să fie evidentă din prima secundă, ca un hotelier din altă zonă să nu piardă timp citind.",
        "Cele 5 categorii de textile (lenjerie de pat, prosoape, fețe de masă, uniforme, covorașe) trebuiau să fie ușor de scanat, nu înghesuite într-un singur paragraf.",
      ],

      approach: [
        {
          title: "Claritate înainte de estetică",
          text: "Titlul, subtitlul și butonul de ofertă rezolvă totul din primele 3 secunde — restul paginii doar susține decizia deja luată.",
        },
        {
          title: "Procesul, ca argument de vânzare",
          text: "Colectare → spălare → control → livrare devine o secțiune vizuală proprie, nu o listă ascunsă în footer.",
        },
        {
          title: "O acțiune, repetată consecvent",
          text: "„Cere o ofertă” apare la fiecare punct de decizie relevant, mereu cu același stil, ca vizitatorul să nu-l caute de două ori.",
        },
        {
          title: "Conținut ușor de întreținut",
          text: "Categoriile de textile și pașii procesului sunt structurate ca blocuri repetabile, ușor de editat sau extins fără să umbli prin cod.",
        },
      ],

      solution:
        "Echipa noastră a construit o pagină unică, de lungime medie, organizată strict pe intenția vizitatorului: cine sunt (hero + zonă deservită), ce spală (cele 5 categorii, fiecare cu iconiță și descriere scurtă), cum funcționează (proces în 4 pași, cu imagini reale din operațiune) și cum cer o ofertă (CTA repetat + formular de contact). Fără galerie decorativă, fără testimoniale inventate — doar informația de care are nevoie un hotelier ca să ia decizia.",
      results:
        "Rezultatul e un site pe care un hotelier îl poate parcurge în sub un minut și tot ce mai trebuie să facă e să apese „Cere o ofertă”. Pentru un serviciu B2B de nișă, asta contează mai mult decât orice animație — claritatea e ceea ce transformă un hotelier ezitant într-un client care sună azi.",

      gallery: [
        {
          src: "/case-studies/prolinen/hero.jpg",
          caption:
            "Hero — poziționare clară + zonă deservită, vizibile fără scroll",
        },
      ],

      stats: [
        { value: "5", label: "categorii de textile, prezentate impecabil" },
        {
          value: "4",
          label: "pași expl. în procesul de colectare–livrare",
        },
        {
          value: "2",
          label: "zone deservite: Brașov & Întorsura Buzăului",
        },
        { value: "100%", label: "site responsive, gata pentru orice ecran" },
      ],
    },
  });

  console.log("Seeded ProLinen case study.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 5: Run the seed script**

Run: `cd server && node prisma/seedCaseStudies.js`

Expected: `Seeded ProLinen case study.` Verify with `cd server && npx prisma studio`, opening the `CaseStudy` table — one row, `slug: prolinen`, `status: PUBLISHED`.

- [ ] **Step 6: Delete the now-obsolete Blog import script**

Delete `server/prisma/importBlogPosts.js`.

- [ ] **Step 7: Commit**

```bash
git add server/prisma/schema.prisma server/prisma/seedCaseStudies.js
git rm server/prisma/importBlogPosts.js
git commit -m "Replace Blog Prisma models with CaseStudy model, seed ProLinen"
```

---

### Task 2: Backend — public + admin routes, validators, wiring

**Files:**
- Create: `server/src/validators/casestudy.schema.js`
- Create: `server/src/validators/admin/casestudy.schema.js`
- Create: `server/src/routes/casestudy.routes.js`
- Create: `server/src/routes/admin/casestudy.routes.js`
- Modify: `server/src/app.js` (line 10 import, line 100 mount)
- Modify: `server/src/routes/admin/index.js` (import + mount)
- Modify: `server/src/routes/admin/dashboard.routes.js` (replace `blogPost` counts with `caseStudy` counts)
- Modify: `server/src/routes/analytics.routes.js` (line 14 `BLOG_VIEW` → `CASE_STUDY_VIEW` in the allow-list)
- Modify: `server/src/routes/admin/analytics.routes.js` (6 references: lines 24, 66, 143, 245, 297, 341, 358 — `blogViews`/`BLOG_VIEW` → `caseStudyViews`/`CASE_STUDY_VIEW`)
- Delete: `server/src/routes/blog.routes.js`, `server/src/routes/admin/blog.routes.js`, `server/src/validators/blog.schema.js`, `server/src/validators/admin/blog.schema.js`

**Interfaces:**
- Consumes: `prisma.caseStudy` (Task 1), `createAuditLog` from `server/src/lib/auditLog.js`, `validate` from `server/src/middleware/validate.js`, `requireAdmin` from `server/src/middleware/requireAdmin.js`, `asyncHandler` from `server/src/middleware/asyncHandler.js` (all pre-existing, unchanged).
- Produces: `GET /api/case-studies`, `GET /api/case-studies/:slug` (public); `GET/POST/PATCH/DELETE /api/admin/case-studies[...]` (admin). Task 3/4 (frontend) call these exact paths.

- [ ] **Step 1: Write the public validator (none needed — public routes are read-only)**

Skip — public routes take no body. Create `server/src/validators/casestudy.schema.js` only if a future public write is added; not needed here. (No file created this step.)

- [ ] **Step 2: Write the admin validator**

Create `server/src/validators/admin/casestudy.schema.js`:

```javascript
import { z } from "zod";

const caseStudyStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

const statPointSchema = z.object({
  value: z.string().trim().min(1).max(20),
  label: z.string().trim().min(1).max(160),
});

const approachItemSchema = z.object({
  title: z.string().trim().min(1).max(120),
  text: z.string().trim().min(1).max(600),
});

const galleryItemSchema = z.object({
  src: z.string().trim().min(1).max(500),
  caption: z.string().trim().min(1).max(300),
});

export const createCaseStudySchema = z.object({
  slug: z.string().trim().min(2).max(220),

  kicker: z.string().trim().min(3).max(220),
  title: z.string().trim().min(3).max(180),
  description: z.string().trim().min(10).max(600),

  role: z.string().trim().min(2).max(120),
  timeline: z.string().trim().min(2).max(160),
  overview: z.string().trim().min(10).max(2000),

  challengeIntro: z.string().trim().min(10).max(600),
  challengePoints: z.array(z.string().trim().min(1).max(400)).min(1).max(10),

  approach: z.array(approachItemSchema).min(1).max(10),

  solution: z.string().trim().min(10).max(2000),
  results: z.string().trim().min(10).max(2000),

  gallery: z.array(galleryItemSchema).min(0).max(20),
  stats: z.array(statPointSchema).min(0).max(8),

  status: caseStudyStatusSchema.default("DRAFT"),
  featured: z.boolean().optional().default(false),

  metaTitle: z.string().trim().max(180).optional().nullable(),
  metaDescription: z.string().trim().max(300).optional().nullable(),

  publishedAt: z.string().datetime().optional().nullable(),
});

export const updateCaseStudySchema = createCaseStudySchema.partial();

export const updateCaseStudyStatusSchema = z.object({
  status: caseStudyStatusSchema,
});
```

- [ ] **Step 3: Write the public routes**

Create `server/src/routes/casestudy.routes.js`:

```javascript
import express from "express";

import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

const listSelect = {
  id: true,
  slug: true,
  kicker: true,
  title: true,
  description: true,
  featured: true,
  publishedAt: true,
};

// GET /api/case-studies
// Lista studiilor de caz publicate, fără conținutul complet.
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await prisma.caseStudy.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      select: listSelect,
    });

    res.json({
      success: true,
      data: items,
    });
  })
);

// GET /api/case-studies/:slug
// Studiul de caz complet.
router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const item = await prisma.caseStudy.findUnique({
      where: {
        slug: req.params.slug,
      },
    });

    if (!item || item.status !== "PUBLISHED") {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  })
);

export default router;
```

- [ ] **Step 4: Write the admin routes**

Create `server/src/routes/admin/casestudy.routes.js`:

```javascript
import express from "express";

import { prisma } from "../../lib/prisma.js";
import { createAuditLog } from "../../lib/auditLog.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import {
  createCaseStudySchema,
  updateCaseStudySchema,
  updateCaseStudyStatusSchema,
} from "../../validators/admin/casestudy.schema.js";

const router = express.Router();

router.use(requireAdmin);

function normalizePublishedAt(status, value) {
  if (value) {
    return new Date(value);
  }

  if (status === "PUBLISHED") {
    return new Date();
  }

  return null;
}

// GET /api/admin/case-studies
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const status = req.query.status;
    const search = req.query.search;
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const skip = (page - 1) * limit;

    const where = {
      ...(status && status !== "ALL" ? { status } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { slug: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.caseStudy.findMany({
        where,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          status: true,
          featured: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.caseStudy.count({ where }),
    ]);

    return res.json({
      success: true,
      data: {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  })
);

// GET /api/admin/case-studies/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const item = await prisma.caseStudy.findUnique({
      where: { id: req.params.id },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    return res.json({
      success: true,
      data: item,
    });
  })
);

// POST /api/admin/case-studies
router.post(
  "/",
  validate(createCaseStudySchema),
  asyncHandler(async (req, res) => {
    const data = req.validatedBody;

    const created = await prisma.caseStudy.create({
      data: {
        slug: data.slug,
        kicker: data.kicker,
        title: data.title,
        description: data.description,
        role: data.role,
        timeline: data.timeline,
        overview: data.overview,
        challengeIntro: data.challengeIntro,
        challengePoints: data.challengePoints,
        approach: data.approach,
        solution: data.solution,
        results: data.results,
        gallery: data.gallery,
        stats: data.stats,
        status: data.status,
        featured: Boolean(data.featured),
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.description,
        publishedAt: normalizePublishedAt(data.status, data.publishedAt),
      },
    });

    await createAuditLog({
      req,
      action: "CASE_STUDY_CREATED",
      entity: "CaseStudy",
      entityId: created.id,
      metadata: { title: created.title, status: created.status },
    });

    return res.status(201).json({
      success: true,
      data: created,
    });
  })
);

// PATCH /api/admin/case-studies/:id
router.patch(
  "/:id",
  validate(updateCaseStudySchema),
  asyncHandler(async (req, res) => {
    const existing = await prisma.caseStudy.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    const data = req.validatedBody;

    const updated = await prisma.caseStudy.update({
      where: { id: existing.id },
      data: {
        ...(data.slug !== undefined ? { slug: data.slug } : {}),
        ...(data.kicker !== undefined ? { kicker: data.kicker } : {}),
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.description !== undefined
          ? { description: data.description }
          : {}),
        ...(data.role !== undefined ? { role: data.role } : {}),
        ...(data.timeline !== undefined ? { timeline: data.timeline } : {}),
        ...(data.overview !== undefined ? { overview: data.overview } : {}),
        ...(data.challengeIntro !== undefined
          ? { challengeIntro: data.challengeIntro }
          : {}),
        ...(data.challengePoints !== undefined
          ? { challengePoints: data.challengePoints }
          : {}),
        ...(data.approach !== undefined ? { approach: data.approach } : {}),
        ...(data.solution !== undefined ? { solution: data.solution } : {}),
        ...(data.results !== undefined ? { results: data.results } : {}),
        ...(data.gallery !== undefined ? { gallery: data.gallery } : {}),
        ...(data.stats !== undefined ? { stats: data.stats } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.featured !== undefined
          ? { featured: Boolean(data.featured) }
          : {}),
        ...(data.metaTitle !== undefined
          ? { metaTitle: data.metaTitle || null }
          : {}),
        ...(data.metaDescription !== undefined
          ? { metaDescription: data.metaDescription || null }
          : {}),
        ...(data.publishedAt !== undefined
          ? {
              publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
            }
          : {}),
      },
    });

    await createAuditLog({
      req,
      action: "CASE_STUDY_UPDATED",
      entity: "CaseStudy",
      entityId: updated.id,
      metadata: { title: updated.title, status: updated.status },
    });

    return res.json({
      success: true,
      data: updated,
    });
  })
);

// PATCH /api/admin/case-studies/:id/status
router.patch(
  "/:id/status",
  validate(updateCaseStudyStatusSchema),
  asyncHandler(async (req, res) => {
    const { status } = req.validatedBody;

    const existing = await prisma.caseStudy.findUnique({
      where: { id: req.params.id },
      select: { id: true, title: true, status: true },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    const updated = await prisma.caseStudy.update({
      where: { id: existing.id },
      data: {
        status,
        ...(status === "PUBLISHED" ? { publishedAt: new Date() } : {}),
      },
    });

    await createAuditLog({
      req,
      action: "CASE_STUDY_STATUS_UPDATED",
      entity: "CaseStudy",
      entityId: updated.id,
      metadata: { from: existing.status, to: updated.status },
    });

    return res.json({
      success: true,
      data: updated,
    });
  })
);

// DELETE /api/admin/case-studies/:id
// Nu ștergem direct — îl arhivăm, mai sigur pentru producție.
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const existing = await prisma.caseStudy.findUnique({
      where: { id: req.params.id },
      select: { id: true, title: true, status: true },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    const updated = await prisma.caseStudy.update({
      where: { id: existing.id },
      data: { status: "ARCHIVED" },
    });

    await createAuditLog({
      req,
      action: "CASE_STUDY_ARCHIVED",
      entity: "CaseStudy",
      entityId: updated.id,
      metadata: { title: updated.title },
    });

    return res.json({
      success: true,
      message: "Studiul de caz a fost arhivat.",
      data: updated,
    });
  })
);

export default router;
```

- [ ] **Step 5: Mount the public route in `app.js`**

In `server/src/app.js`, replace line 10:

```javascript
import blogRoutes from "./routes/blog.routes.js";
```

with:

```javascript
import caseStudyRoutes from "./routes/casestudy.routes.js";
```

Replace line 100:

```javascript
app.use("/api/blog", blogRoutes);
```

with:

```javascript
app.use("/api/case-studies", caseStudyRoutes);
```

- [ ] **Step 6: Mount the admin route in `server/src/routes/admin/index.js`**

Replace:

```javascript
import blogRoutes from "./blog.routes.js";
```

with:

```javascript
import caseStudyRoutes from "./casestudy.routes.js";
```

Replace:

```javascript
router.use("/blog", blogRoutes);
```

with:

```javascript
router.use("/case-studies", caseStudyRoutes);
```

- [ ] **Step 7: Update the admin dashboard aggregation**

In `server/src/routes/admin/dashboard.routes.js`, replace the entire `router.get("/", ...)` handler body (lines 12-114) with:

```javascript
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [
      totalContacts,
      newContacts,
      repliedContacts,
      totalCaseStudies,
      publishedCaseStudies,
      draftCaseStudies,
      totalSessions,
      convertedSessions,
      totalEvents,
    ] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({
        where: {
          status: "NEW",
        },
      }),
      prisma.contactSubmission.count({
        where: {
          status: "REPLIED",
        },
      }),
      prisma.caseStudy.count(),
      prisma.caseStudy.count({
        where: {
          status: "PUBLISHED",
        },
      }),
      prisma.caseStudy.count({
        where: {
          status: "DRAFT",
        },
      }),
      prisma.analyticsSession.count(),
      prisma.analyticsSession.count({
        where: {
          convertedAt: {
            not: null,
          },
        },
      }),
      prisma.analyticsEvent.count(),
    ]);

    const conversionRate =
      totalSessions > 0
        ? Number(((convertedSessions / totalSessions) * 100).toFixed(2))
        : 0;

    const latestContacts = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        selectedPlan: true,
        status: true,
        createdAt: true,
      },
    });

    const latestCaseStudies = await prisma.caseStudy.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    return res.json({
      success: true,
      data: {
        stats: {
          totalContacts,
          newContacts,
          repliedContacts,
          totalCaseStudies,
          publishedCaseStudies,
          draftCaseStudies,
          totalSessions,
          convertedSessions,
          totalEvents,
          conversionRate,
        },
        latestContacts,
        latestCaseStudies,
      },
    });
  })
);
```

- [ ] **Step 8: Rename `BLOG_VIEW` in the public analytics allow-list**

In `server/src/routes/analytics.routes.js`, line 14, replace `"BLOG_VIEW"` with `"CASE_STUDY_VIEW"`.

- [ ] **Step 9: Rename `BLOG_VIEW`/`blogViews`/`topBlogPosts` in admin analytics aggregation**

In `server/src/routes/admin/analytics.routes.js`, in the `/overview` handler's destructured `Promise.all` results (line 24), replace:

```javascript
      blogViews,
      ctaClicks,
      pricingClicks,
      contactOpens,
      contactSuccess,
      outboundClicks,
      topPages,
      topBlogPosts,
```

with:

```javascript
      caseStudyViews,
      ctaClicks,
      pricingClicks,
      contactOpens,
      contactSuccess,
      outboundClicks,
      topPages,
      topCaseStudies,
```

Replace the `BLOG_VIEW` count query (lines 64-71):

```javascript
      prisma.analyticsEvent.count({
        where: {
          type: "BLOG_VIEW",
          createdAt: {
            gte: fromDate,
          },
        },
      }),
```

with:

```javascript
      prisma.analyticsEvent.count({
        where: {
          type: "CASE_STUDY_VIEW",
          createdAt: {
            gte: fromDate,
          },
        },
      }),
```

Replace the `topBlogPosts` groupBy (lines 140-160):

```javascript
      prisma.analyticsEvent.groupBy({
        by: ["label"],
        where: {
          type: "BLOG_VIEW",
          label: {
            not: null,
          },
          createdAt: {
            gte: fromDate,
          },
        },
        _count: {
          label: true,
        },
        orderBy: {
          _count: {
            label: "desc",
          },
        },
        take: 10,
      }),
```

with:

```javascript
      prisma.analyticsEvent.groupBy({
        by: ["label"],
        where: {
          type: "CASE_STUDY_VIEW",
          label: {
            not: null,
          },
          createdAt: {
            gte: fromDate,
          },
        },
        _count: {
          label: true,
        },
        orderBy: {
          _count: {
            label: "desc",
          },
        },
        take: 10,
      }),
```

Replace the response's `totals` object (line 245) and `topBlogPosts` mapping (lines 256-259):

```javascript
        totals: {
          sessions,
          convertedSessions,
          conversionRate,
          pageViews,
          blogViews,
          ctaClicks,
          pricingClicks,
          contactOpens,
          contactSuccess,
          outboundClicks,
        },
        topPages: topPages.map((item) => ({
          path: item.path,
          count: item._count.path,
        })),
        topBlogPosts: topBlogPosts.map((item) => ({
          slug: item.label,
          count: item._count.label,
        })),
```

with:

```javascript
        totals: {
          sessions,
          convertedSessions,
          conversionRate,
          pageViews,
          caseStudyViews,
          ctaClicks,
          pricingClicks,
          contactOpens,
          contactSuccess,
          outboundClicks,
        },
        topPages: topPages.map((item) => ({
          path: item.path,
          count: item._count.path,
        })),
        topCaseStudies: topCaseStudies.map((item) => ({
          slug: item.label,
          count: item._count.label,
        })),
```

In the `/timeseries` handler, replace the `type: { in: [...] }` filter (lines 294-304):

```javascript
          type: {
            in: [
              "PAGE_VIEW",
              "BLOG_VIEW",
              "CTA_CLICK",
              "PRICING_CLICK",
              "CONTACT_OPEN",
              "CONTACT_SUCCESS",
              "OUTBOUND_CLICK",
            ],
          },
```

with:

```javascript
          type: {
            in: [
              "PAGE_VIEW",
              "CASE_STUDY_VIEW",
              "CTA_CLICK",
              "PRICING_CLICK",
              "CONTACT_OPEN",
              "CONTACT_SUCCESS",
              "OUTBOUND_CLICK",
            ],
          },
```

Replace the per-day accumulator initialization (lines 338-348):

```javascript
      dayMap.set(key, {
        date: key,
        pageViews: 0,
        blogViews: 0,
        ctaClicks: 0,
        pricingClicks: 0,
        contactOpens: 0,
        contactSuccess: 0,
        outboundClicks: 0,
        contacts: 0,
      });
```

with:

```javascript
      dayMap.set(key, {
        date: key,
        pageViews: 0,
        caseStudyViews: 0,
        ctaClicks: 0,
        pricingClicks: 0,
        contactOpens: 0,
        contactSuccess: 0,
        outboundClicks: 0,
        contacts: 0,
      });
```

Replace line 358:

```javascript
      if (event.type === "BLOG_VIEW") row.blogViews += 1;
```

with:

```javascript
      if (event.type === "CASE_STUDY_VIEW") row.caseStudyViews += 1;
```

- [ ] **Step 10: Delete the old Blog backend files**

```bash
git rm server/src/routes/blog.routes.js
git rm server/src/routes/admin/blog.routes.js
git rm server/src/validators/blog.schema.js
git rm server/src/validators/admin/blog.schema.js
```

- [ ] **Step 11: Manual verification**

Start the server: `cd server && npm run dev`

Run (adjust host/port to match `server/.env`'s `PORT`):

```bash
curl http://localhost:5000/api/case-studies
curl http://localhost:5000/api/case-studies/prolinen
curl http://localhost:5000/api/blog
```

Expected: first two return `{"success":true,"data":...}` with the seeded ProLinen record; the third returns a 404 (route no longer exists — Express's default `notFound` handler, or a routing 404, confirms the old path is gone).

For the admin routes, log in first (`POST /api/admin/auth/login` with the admin credentials from `server/.env`), keep the cookie, then:

```bash
curl -b cookies.txt http://localhost:5000/api/admin/case-studies
curl -b cookies.txt http://localhost:5000/api/admin/dashboard
```

Expected: `case-studies` lists the seeded row; `dashboard` response has `totalCaseStudies`/`publishedCaseStudies`/`draftCaseStudies` keys (not `totalPosts`/etc) and a `latestCaseStudies` array (not `latestPosts`).

- [ ] **Step 12: Commit**

```bash
git add server/src/validators/admin/casestudy.schema.js server/src/routes/casestudy.routes.js server/src/routes/admin/casestudy.routes.js server/src/app.js server/src/routes/admin/index.js server/src/routes/admin/dashboard.routes.js server/src/routes/analytics.routes.js server/src/routes/admin/analytics.routes.js
git commit -m "Replace Blog backend routes with Case Study CRUD, rename BLOG_VIEW analytics"
```

---

### Task 3: Frontend public pages — index, detail, analytics rename

**Files:**
- Modify: `src/pages/CaseStudies.jsx` (replace placeholder with real fetch-and-list index)
- Modify: `src/pages/CaseStudyDetail.jsx` (swap static lookup for API fetch, per-study stats)
- Modify: `src/lib/analytics.js` (line 127 `trackBlogView` → `trackCaseStudyView`, event type string)

**Interfaces:**
- Consumes: `GET /api/case-studies`, `GET /api/case-studies/:slug` (Task 2); `apiFetch` from `src/lib/api.js` (unchanged); `portfolio` from `src/data/portfolio.js` (unchanged).
- Produces: `trackCaseStudyView(slug)` exported from `src/lib/analytics.js` — no other task currently calls it (Blog's call site is deleted in Task 5), but it's the analytics entry point a future case-study page view hook would use.

- [ ] **Step 1: Rename the analytics helper**

In `src/lib/analytics.js`, find:

```javascript
export function trackBlogView(slug) {
  trackEvent("BLOG_VIEW", {
```

Replace with:

```javascript
export function trackCaseStudyView(slug) {
  trackEvent("CASE_STUDY_VIEW", {
```

(Leave the rest of the function body — the `path`/`label` construction — unchanged; only the function name and event-type string change.)

- [ ] **Step 2: Rewrite `CaseStudies.jsx` as a real fetch-backed index**

Replace the full contents of `src/pages/CaseStudies.jsx`:

```jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";

import SEO from "../components/SEO";
import Nav from "../components/replica/Nav";
import SiteFooter from "../components/replica/SiteFooter";
import BackToTop from "../components/replica/BackToTop";
import ConsentBanner from "../components/replica/ConsentBanner";
import Reveal from "../components/replica/Reveal";
import { apiFetch } from "../lib/api";

function CaseStudies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCaseStudies() {
      try {
        setLoading(true);
        setError("");

        const response = await apiFetch("/case-studies");

        if (!active) return;

        setItems(response.data || []);
      } catch (err) {
        if (!active) return;

        setError("Studiile de caz nu au putut fi încărcate momentan.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCaseStudies();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="replica relative min-h-screen">
      <SEO
        title="Studii de caz"
        description="Studiile de caz A Squared Studio — obiectiv, proces și rezultate concrete pentru fiecare proiect livrat."
      />

      <Nav />

      <main id="top" className="grad-dark pt-[88px]">
        <section className="mx-auto w-full max-w-[72rem] px-6 py-20 sm:px-8 lg:py-28">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-[color:var(--color-accent)]">
            <Sparkles size={24} />
          </span>

          <h1 className="display title-gradient mt-6 text-[clamp(2.25rem,6vw,4rem)]">
            Studiile noastre de caz
          </h1>

          <p className="measure mt-5 text-[15px] leading-relaxed text-[color:var(--color-copy-on-dark)]">
            Obiectiv, proces și rezultate concrete, pentru fiecare proiect
            real, livrat.
          </p>

          {loading && (
            <p className="mt-16 text-sm text-[color:var(--color-copy-subtle-on-dark)]">
              Se încarcă studiile de caz...
            </p>
          )}

          {!loading && error && (
            <p className="mt-16 text-sm text-red-300">{error}</p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="mt-16 text-sm text-[color:var(--color-copy-subtle-on-dark)]">
              Nu există încă studii de caz publicate.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {items.map((item) => (
                <Reveal key={item.slug}>
                  <Link
                    to={`/studii-de-caz/${item.slug}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div>
                      <p className="eyebrow text-[color:var(--color-accent)]">
                        {item.kicker}
                      </p>

                      <h2 className="mt-4 text-xl font-semibold text-white">
                        {item.title}
                      </h2>

                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-copy-on-dark)]">
                        {item.description}
                      </p>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                      Vezi studiul de caz
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
      <BackToTop />
      <ConsentBanner />
    </div>
  );
}

export default CaseStudies;
```

- [ ] **Step 3: Swap `CaseStudyDetail.jsx` to fetch from the API**

In `src/pages/CaseStudyDetail.jsx`, replace the imports at the top:

```jsx
import { portfolio } from "../data/portfolio";
import { caseStudyDetails } from "../data/caseStudyDetails";
import { caseStudy as spotlight } from "../data/caseStudy";
```

with:

```jsx
import { useEffect, useState } from "react";
import { portfolio } from "../data/portfolio";
import { apiFetch } from "../lib/api";
```

Replace the component body's data-loading section (currently synchronous):

```jsx
function CaseStudyDetail() {
  const { slug } = useParams();
  const project = portfolio.find((item) => item.id === slug);
  const detail = caseStudyDetails[slug];

  if (!project || !detail) {
    return <Navigate to="/studii-de-caz" replace />;
  }
```

with:

```jsx
function CaseStudyDetail() {
  const { slug } = useParams();
  const project = portfolio.find((item) => item.id === slug);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      try {
        const response = await apiFetch(`/case-studies/${slug}`);
        if (!active) return;
        setDetail(response.data);
      } catch {
        if (!active) return;
        setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDetail();

    return () => {
      active = false;
    };
  }, [slug]);

  if (!project || notFound) {
    return <Navigate to="/studii-de-caz" replace />;
  }

  if (loading || !detail) {
    return (
      <div className="replica flex min-h-screen items-center justify-center">
        <p className="text-sm text-[color:var(--color-copy-muted)]">
          Se încarcă studiul de caz...
        </p>
      </div>
    );
  }
```

Everywhere below that referenced `detail.challenge.intro` and `detail.challenge.points`, replace with `detail.challengeIntro` and `detail.challengePoints` (the flat field names from the API — matches the Prisma model, not the old nested static-file shape):

```jsx
            <p className="measure mt-5 text-[15px] leading-relaxed text-[color:var(--color-copy-muted)]">
              {detail.challengeIntro}
            </p>
            <ul className="mt-6 grid gap-3">
              {detail.challengePoints.map((point) => (
```

Replace the stats section's `spotlight.stats.map(...)` with `detail.stats.map(...)`:

```jsx
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {detail.stats.map((stat) => (
                <div key={stat.label} className="grid gap-1">
```

- [ ] **Step 4: Manual verification**

With the backend running (Task 2) and frontend dev server running (`npm run dev`), visit `/studii-de-caz` — confirm the ProLinen card renders with the kicker/title/description from the seed. Click into `/studii-de-caz/prolinen` — confirm it renders identically to the old static page (overview, "Provocarea" with 3 points, "Abordarea" with 4 items, "Soluția", gallery image, "Rezultatul" with 4 stats).

- [ ] **Step 5: Commit**

```bash
git add src/pages/CaseStudies.jsx src/pages/CaseStudyDetail.jsx src/lib/analytics.js
git commit -m "Wire CaseStudies index and CaseStudyDetail to the Case Study API"
```

---

### Task 4: Admin frontend — data layer, list, editor

**Files:**
- Modify: `src/lib/adminApi.js` (replace 6 `*AdminBlogPost*` functions with `*AdminCaseStudy*` equivalents)
- Create: `src/pages/admin/AdminCaseStudies.jsx`
- Create: `src/pages/admin/AdminCaseStudyEditor.jsx`
- Delete: `src/pages/admin/AdminBlog.jsx`, `src/pages/admin/AdminBlogEditor.jsx`

**Interfaces:**
- Consumes: `adminApiFetch` from `src/lib/adminApi.js` (unchanged); `GET/POST/PATCH/DELETE /api/admin/case-studies[...]` (Task 2).
- Produces: `getAdminCaseStudies(params)`, `getAdminCaseStudy(id)`, `createAdminCaseStudy(payload)`, `updateAdminCaseStudy(id, payload)`, `updateAdminCaseStudyStatus(id, status)`, `archiveAdminCaseStudy(id)` exported from `src/lib/adminApi.js`. Task 5 wires these into `App.jsx` routes.

- [ ] **Step 1: Replace the Blog admin API functions**

In `src/lib/adminApi.js`, replace the six functions from `getAdminBlogPosts` through `archiveAdminBlogPost` (lines 96-137) with:

```javascript
export function getAdminCaseStudies(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  const query = searchParams.toString();

  return adminApiFetch(`/admin/case-studies${query ? `?${query}` : ""}`);
}

export function getAdminCaseStudy(id) {
  return adminApiFetch(`/admin/case-studies/${id}`);
}

export function createAdminCaseStudy(payload) {
  return adminApiFetch("/admin/case-studies", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAdminCaseStudy(id, payload) {
  return adminApiFetch(`/admin/case-studies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function updateAdminCaseStudyStatus(id, status) {
  return adminApiFetch(`/admin/case-studies/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function archiveAdminCaseStudy(id) {
  return adminApiFetch(`/admin/case-studies/${id}`, {
    method: "DELETE",
  });
}
```

- [ ] **Step 2: Write `AdminCaseStudies.jsx` (list page)**

Create `src/pages/admin/AdminCaseStudies.jsx` — same structure as the deleted `AdminBlog.jsx`, adapted field names (`description` instead of `excerpt`, no `category` column, `/studii-de-caz/{slug}` path preview instead of `/blog/{slug}`):

```jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit3, Plus, Trash2 } from "lucide-react";

import {
  archiveAdminCaseStudy,
  getAdminCaseStudies,
  updateAdminCaseStudyStatus,
} from "../../lib/adminApi";

const statuses = ["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"];

function AdminCaseStudies() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCaseStudies() {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminCaseStudies({
        status,
        search,
        page: 1,
        limit: 30,
      });

      setItems(response.data.items);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message || "Nu s-au putut încărca studiile de caz.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCaseStudies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function handleStatusChange(id, nextStatus) {
    try {
      setError("");
      await updateAdminCaseStudyStatus(id, nextStatus);
      await loadCaseStudies();
    } catch (err) {
      setError(err.message || "Statusul nu a putut fi modificat.");
    }
  }

  async function handleArchive(id) {
    const confirmed = window.confirm(
      "Sigur vrei să arhivezi acest studiu de caz?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await archiveAdminCaseStudy(id);
      await loadCaseStudies();
    } catch (err) {
      setError(err.message || "Studiul de caz nu a putut fi arhivat.");
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <PageHeader
          title="Studii de caz"
          text="Administrează studiile de caz publicate pe website."
        />

        <Link
          to="/admin/case-studies/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          <Plus size={17} />
          Studiu nou
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3 md:flex-row">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") loadCaseStudies();
          }}
          className="min-h-11 flex-1 rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
          placeholder="Caută după titlu, slug sau descriere..."
        />

        <button
          type="button"
          onClick={loadCaseStudies}
          className="rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90"
        >
          Caută
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto">
        {statuses.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStatus(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              status === item
                ? "bg-white text-black"
                : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/[0.05] text-white/50">
              <tr>
                <th className="p-4">Studiu de caz</th>
                <th className="p-4">Status</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Publicat</th>
                <th className="p-4">Status rapid</th>
                <th className="p-4">Acțiuni</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td className="p-4 text-white/40" colSpan={6}>
                    Se încarcă studiile de caz...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td className="p-4 text-white/40" colSpan={6}>
                    Nu există studii de caz pentru filtrul selectat.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="text-white/70">
                    <td className="p-4">
                      <p className="max-w-sm font-medium text-white">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-white/35">
                        /studii-de-caz/{item.slug}
                      </p>

                      <p className="mt-2 line-clamp-2 max-w-md text-xs leading-5 text-white/35">
                        {item.description}
                      </p>
                    </td>

                    <td className="p-4">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="p-4">{item.featured ? "Da" : "Nu"}</td>

                    <td className="p-4">
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString(
                            "ro-RO"
                          )
                        : "-"}
                    </td>

                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(event) =>
                          handleStatusChange(item.id, event.target.value)
                        }
                        className="rounded-xl border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-white/30"
                      >
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="DRAFT">DRAFT</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/case-studies/${item.id}/edit`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08] text-white/70 transition hover:bg-white hover:text-black"
                          aria-label="Editează studiul de caz"
                        >
                          <Edit3 size={16} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleArchive(item.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                          aria-label="Arhivează studiul de caz"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && (
        <p className="mt-4 text-sm text-white/35">
          Total: {pagination.total} studii de caz
        </p>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const classes = {
    PUBLISHED: "bg-emerald-500/15 text-emerald-200",
    DRAFT: "bg-yellow-500/15 text-yellow-100",
    ARCHIVED: "bg-white/[0.08] text-white/40",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        classes[status] || "bg-white/[0.08] text-white/50"
      }`}
    >
      {status}
    </span>
  );
}

function PageHeader({ title, text }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.28em] text-white/35">
        Admin
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>

      <p className="mt-3 max-w-2xl text-white/45">{text}</p>
    </div>
  );
}

export default AdminCaseStudies;
```

- [ ] **Step 3: Write `AdminCaseStudyEditor.jsx` with structured array inputs**

Create `src/pages/admin/AdminCaseStudyEditor.jsx`. This replaces Blog's raw-JSON textarea with repeatable field groups for `challengePoints` (string list), `approach` (title+text pairs), `gallery` (src+caption pairs), and `stats` (value+label pairs):

```jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";

import {
  createAdminCaseStudy,
  getAdminCaseStudy,
  updateAdminCaseStudy,
} from "../../lib/adminApi";

const initialForm = {
  slug: "",
  kicker: "",
  title: "",
  description: "",
  role: "",
  timeline: "",
  overview: "",
  challengeIntro: "",
  challengePoints: [""],
  approach: [{ title: "", text: "" }],
  solution: "",
  results: "",
  gallery: [],
  stats: [],
  status: "DRAFT",
  featured: false,
  metaTitle: "",
  metaDescription: "",
  publishedAt: "",
};

function AdminCaseStudyEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const title = isEdit ? "Editare studiu de caz" : "Studiu de caz nou";

  useEffect(() => {
    if (!isEdit) return;

    async function loadCaseStudy() {
      try {
        setLoading(true);

        const response = await getAdminCaseStudy(id);
        const item = response.data;

        setForm({
          slug: item.slug || "",
          kicker: item.kicker || "",
          title: item.title || "",
          description: item.description || "",
          role: item.role || "",
          timeline: item.timeline || "",
          overview: item.overview || "",
          challengeIntro: item.challengeIntro || "",
          challengePoints:
            item.challengePoints?.length > 0 ? item.challengePoints : [""],
          approach:
            item.approach?.length > 0
              ? item.approach
              : [{ title: "", text: "" }],
          solution: item.solution || "",
          results: item.results || "",
          gallery: item.gallery || [],
          stats: item.stats || [],
          status: item.status || "DRAFT",
          featured: Boolean(item.featured),
          metaTitle: item.metaTitle || "",
          metaDescription: item.metaDescription || "",
          publishedAt: item.publishedAt
            ? new Date(item.publishedAt).toISOString().slice(0, 16)
            : "",
        });
      } catch (err) {
        setError(err.message || "Nu s-a putut încărca studiul de caz.");
      } finally {
        setLoading(false);
      }
    }

    loadCaseStudy();
  }, [id, isEdit]);

  const previewSlug = useMemo(() => {
    return form.slug || slugify(form.title);
  }, [form.slug, form.title]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateListItem(field, index, value) {
    setForm((prev) => {
      const next = [...prev[field]];
      next[index] = value;
      return { ...prev, [field]: next };
    });
  }

  function addListItem(field, empty) {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], empty] }));
  }

  function removeListItem(field, index) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }

  function updateObjectListItem(field, index, key, value) {
    setForm((prev) => {
      const next = [...prev[field]];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, [field]: next };
    });
  }

  function buildPayload() {
    return {
      slug: form.slug,
      kicker: form.kicker,
      title: form.title,
      description: form.description,
      role: form.role,
      timeline: form.timeline,
      overview: form.overview,
      challengeIntro: form.challengeIntro,
      challengePoints: form.challengePoints.filter((p) => p.trim()),
      approach: form.approach.filter((a) => a.title.trim() && a.text.trim()),
      solution: form.solution,
      results: form.results,
      gallery: form.gallery.filter((g) => g.src.trim()),
      stats: form.stats.filter((s) => s.value.trim() && s.label.trim()),
      status: form.status,
      featured: form.featured,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
      publishedAt: form.publishedAt
        ? new Date(form.publishedAt).toISOString()
        : null,
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = buildPayload();

      if (isEdit) {
        await updateAdminCaseStudy(id, payload);
      } else {
        await createAdminCaseStudy(payload);
      }

      navigate("/admin/case-studies", { replace: true });
    } catch (err) {
      setError(err.message || "Nu s-a putut salva studiul de caz.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-white/50">Se încarcă studiul de caz...</p>;
  }

  return (
    <div>
      <Link
        to="/admin/case-studies"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
      >
        <ArrowLeft size={16} />
        Înapoi la studii de caz
      </Link>

      <div className="mt-8">
        <p className="text-sm uppercase tracking-[0.28em] text-white/35">
          Admin Studii de caz
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-white/45">
          Completează conținutul, procesul și rezultatele studiului de caz.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]"
      >
        <div className="space-y-5">
          <Panel title="Identitate">
            <Field label="Slug (trebuie să existe în portofoliu)">
              <input
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                className="admin-input"
                placeholder="ex: prolinen"
                required
              />
              <p className="mt-2 text-xs text-white/35">
                Preview: /studii-de-caz/{previewSlug || "slug-proiect"}
              </p>
            </Field>

            <Field label="Kicker (eyebrow)">
              <input
                value={form.kicker}
                onChange={(event) =>
                  updateField("kicker", event.target.value)
                }
                className="admin-input"
                placeholder="STUDIU DE CAZ · ..."
                required
              />
            </Field>

            <Field label="Titlu">
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                className="admin-input"
                required
              />
            </Field>

            <Field label="Descriere (card index)">
              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                className="admin-textarea min-h-28"
                required
              />
            </Field>
          </Panel>

          <Panel title="Context proiect">
            <Field label="Rol">
              <input
                value={form.role}
                onChange={(event) => updateField("role", event.target.value)}
                className="admin-input"
                required
              />
            </Field>

            <Field label="Livrare (timeline)">
              <input
                value={form.timeline}
                onChange={(event) =>
                  updateField("timeline", event.target.value)
                }
                className="admin-input"
                required
              />
            </Field>

            <Field label="Overview">
              <textarea
                value={form.overview}
                onChange={(event) =>
                  updateField("overview", event.target.value)
                }
                className="admin-textarea min-h-32"
                required
              />
            </Field>
          </Panel>

          <Panel title="Provocarea">
            <Field label="Intro">
              <textarea
                value={form.challengeIntro}
                onChange={(event) =>
                  updateField("challengeIntro", event.target.value)
                }
                className="admin-textarea min-h-24"
                required
              />
            </Field>

            {form.challengePoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={point}
                  onChange={(event) =>
                    updateListItem("challengePoints", index, event.target.value)
                  }
                  className="admin-input flex-1"
                  placeholder={`Punct ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeListItem("challengePoints", index)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                  aria-label="Șterge punct"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addListItem("challengePoints", "")}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
            >
              <Plus size={15} />
              Adaugă punct
            </button>
          </Panel>

          <Panel title="Abordarea">
            {form.approach.map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/35">
                    Punct {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeListItem("approach", index)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                    aria-label="Șterge punct abordare"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <input
                  value={item.title}
                  onChange={(event) =>
                    updateObjectListItem(
                      "approach",
                      index,
                      "title",
                      event.target.value
                    )
                  }
                  className="admin-input"
                  placeholder="Titlu"
                />

                <textarea
                  value={item.text}
                  onChange={(event) =>
                    updateObjectListItem(
                      "approach",
                      index,
                      "text",
                      event.target.value
                    )
                  }
                  className="admin-textarea min-h-20"
                  placeholder="Text"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                addListItem("approach", { title: "", text: "" })
              }
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
            >
              <Plus size={15} />
              Adaugă punct abordare
            </button>
          </Panel>

          <Panel title="Soluția și rezultatul">
            <Field label="Soluție">
              <textarea
                value={form.solution}
                onChange={(event) =>
                  updateField("solution", event.target.value)
                }
                className="admin-textarea min-h-32"
                required
              />
            </Field>

            <Field label="Rezultat">
              <textarea
                value={form.results}
                onChange={(event) =>
                  updateField("results", event.target.value)
                }
                className="admin-textarea min-h-32"
                required
              />
            </Field>
          </Panel>

          <Panel title="Statistici (afișate la Rezultat)">
            {form.stats.map((stat, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={stat.value}
                  onChange={(event) =>
                    updateObjectListItem(
                      "stats",
                      index,
                      "value",
                      event.target.value
                    )
                  }
                  className="admin-input w-24"
                  placeholder="5"
                />
                <input
                  value={stat.label}
                  onChange={(event) =>
                    updateObjectListItem(
                      "stats",
                      index,
                      "label",
                      event.target.value
                    )
                  }
                  className="admin-input flex-1"
                  placeholder="descriere statistică"
                />
                <button
                  type="button"
                  onClick={() => removeListItem("stats", index)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                  aria-label="Șterge statistică"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addListItem("stats", { value: "", label: "" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
            >
              <Plus size={15} />
              Adaugă statistică
            </button>
          </Panel>

          <Panel title="Galerie">
            {form.gallery.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={item.src}
                  onChange={(event) =>
                    updateObjectListItem(
                      "gallery",
                      index,
                      "src",
                      event.target.value
                    )
                  }
                  className="admin-input flex-1"
                  placeholder="/case-studies/slug/imagine.jpg"
                />
                <input
                  value={item.caption}
                  onChange={(event) =>
                    updateObjectListItem(
                      "gallery",
                      index,
                      "caption",
                      event.target.value
                    )
                  }
                  className="admin-input flex-1"
                  placeholder="Descriere imagine"
                />
                <button
                  type="button"
                  onClick={() => removeListItem("gallery", index)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-200 transition hover:bg-red-500 hover:text-white"
                  aria-label="Șterge imagine"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addListItem("gallery", { src: "", caption: "" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
            >
              <Plus size={15} />
              Adaugă imagine
            </button>
          </Panel>

          <Panel title="SEO">
            <Field label="Meta title">
              <input
                value={form.metaTitle}
                onChange={(event) =>
                  updateField("metaTitle", event.target.value)
                }
                className="admin-input"
              />
            </Field>

            <Field label="Meta description">
              <textarea
                value={form.metaDescription}
                onChange={(event) =>
                  updateField("metaDescription", event.target.value)
                }
                className="admin-textarea min-h-24"
              />
            </Field>
          </Panel>
        </div>

        <aside className="space-y-5">
          <Panel title="Publicare">
            <Field label="Status">
              <select
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
                className="admin-input"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </Field>

            <Field label="Published at">
              <input
                type="datetime-local"
                value={form.publishedAt}
                onChange={(event) =>
                  updateField("publishedAt", event.target.value)
                }
                className="admin-input"
              />
            </Field>

            <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
              <span>
                <span className="block text-sm font-medium text-white">
                  Featured
                </span>
                <span className="mt-1 block text-xs text-white/35">
                  Apare primul în index.
                </span>
              </span>

              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField("featured", event.target.checked)
                }
                className="h-5 w-5 accent-white"
              />
            </label>
          </Panel>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />
            {saving ? "Se salvează..." : "Salvează studiul de caz"}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/45">{label}</span>
      {children}
    </label>
  );
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ş/g, "s")
    .replace(/ț/g, "t")
    .replace(/ţ/g, "t")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

export default AdminCaseStudyEditor;
```

- [ ] **Step 4: Delete the old Blog admin pages**

```bash
git rm src/pages/admin/AdminBlog.jsx
git rm src/pages/admin/AdminBlogEditor.jsx
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/adminApi.js src/pages/admin/AdminCaseStudies.jsx src/pages/admin/AdminCaseStudyEditor.jsx
git commit -m "Add admin Case Study list and structured editor, remove Blog admin pages"
```

(Manual verification happens in Task 5 once routes are wired — the editor can't be reached until `App.jsx` has the new routes.)

---

### Task 5: Wiring, remaining renames, and dead-file cleanup

**Files:**
- Modify: `src/App.jsx` (remove `/blog`, `/blog/:slug` routes and imports; replace `/admin/blog*` routes with `/admin/case-studies*`)
- Modify: `src/pages/admin/AdminLayout.jsx` (lines 62-63, 110 — nav label + path)
- Modify: `src/components/replica/SiteFooter.jsx` (line 62 — nav entry)
- Modify: `src/pages/admin/AdminDashboard.jsx` (rename `totalPosts`/`publishedPosts`/`latestPosts` references to match Task 2's `dashboard.routes.js` response shape)
- Modify: `src/pages/admin/AdminAnalytics.jsx` (rename `blogViews` references to `caseStudyViews`)
- Delete: `src/pages/Blog.jsx`, `src/pages/BlogPost.jsx`, `src/components/BlogCard.jsx`, `src/components/BlogCarousel.jsx`, `src/components/BlogPreview.jsx`, `src/data/blogPosts.js`, `src/pages/Home.jsx`, `src/components/Footer.jsx`, `src/data/caseStudy.js`, `src/data/caseStudyDetails.js`

**Interfaces:**
- Consumes: all functions/components from Tasks 2-4.
- Produces: nothing further downstream — this is the final wiring task.

- [ ] **Step 1: Update `App.jsx` routes**

Remove the two lazy imports (lines 16-17):

```javascript
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
```

Replace the admin blog imports (lines 38-39):

```javascript
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
```

with:

```javascript
const AdminCaseStudies = lazy(() =>
  import("./pages/admin/AdminCaseStudies")
);
const AdminCaseStudyEditor = lazy(() =>
  import("./pages/admin/AdminCaseStudyEditor")
);
```

Remove the two public blog routes (lines 54-55):

```jsx
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
```

Replace the three admin blog routes:

```jsx
            <Route path="blog" element={<AdminBlog />} />
            <Route path="blog/new" element={<AdminBlogEditor />} />
            <Route path="blog/:id/edit" element={<AdminBlogEditor />} />
```

with:

```jsx
            <Route path="case-studies" element={<AdminCaseStudies />} />
            <Route
              path="case-studies/new"
              element={<AdminCaseStudyEditor />}
            />
            <Route
              path="case-studies/:id/edit"
              element={<AdminCaseStudyEditor />}
            />
```

- [ ] **Step 2: Update `AdminLayout.jsx` nav**

Replace line 62-64:

```jsx
          <AdminNavLink to="/admin/blog" icon={<FileText size={18} />}>
            Blog
          </AdminNavLink>
```

with:

```jsx
          <AdminNavLink to="/admin/case-studies" icon={<FileText size={18} />}>
            Studii de caz
          </AdminNavLink>
```

Replace line 110:

```jsx
          <MobileNavLink to="/admin/blog">Blog</MobileNavLink>
```

with:

```jsx
          <MobileNavLink to="/admin/case-studies">
            Studii de caz
          </MobileNavLink>
```

- [ ] **Step 3: Update `SiteFooter.jsx` nav entry**

Replace line 62:

```javascript
  { label: "Blog", to: "/blog" },
```

with:

```javascript
  { label: "Studii de caz", to: "/studii-de-caz" },
```

- [ ] **Step 4: Rename `AdminDashboard.jsx` field references**

Replace the `StatCard` for blog (lines 35-40):

```jsx
        <StatCard
          icon={<FileText />}
          label="Articole blog"
          value={stats.totalPosts}
          helper={`${stats.publishedPosts} publicate`}
        />
```

with:

```jsx
        <StatCard
          icon={<FileText />}
          label="Studii de caz"
          value={stats.totalCaseStudies}
          helper={`${stats.publishedCaseStudies} publicate`}
        />
```

Replace the `"Ultimele articole"` panel (lines 84-100), renaming `data.latestPosts` to `data.latestCaseStudies` and the link path:

```jsx
        <Panel title="Ultimele studii de caz">
          <div className="space-y-3">
            {data.latestCaseStudies.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
              >
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-white/40">
                  /studii-de-caz/{item.slug}
                </p>

                <span className="mt-3 inline-flex rounded-full bg-white/[0.08] px-3 py-1 text-xs text-white/55">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>
```

Also update the header text at line 24 (`"Privire rapidă asupra cererilor, blogului și conversiilor."` → `"Privire rapidă asupra cererilor, studiilor de caz și conversiilor."`).

- [ ] **Step 5: Rename `AdminAnalytics.jsx` `blogViews`/`topBlogPosts` references**

Replace the header text at line 82:

```jsx
          text="Statistici despre trafic, CTA-uri, blog și conversii."
```

with:

```jsx
          text="Statistici despre trafic, CTA-uri, studii de caz și conversii."
```

Replace the `StatCard` at lines 104-109:

```jsx
        <StatCard
          icon={<BarChart3 size={20} />}
          label="Blog views"
          value={totals.blogViews || 0}
          helper="Vizualizări articole"
        />
```

with:

```jsx
        <StatCard
          icon={<BarChart3 size={20} />}
          label="Case study views"
          value={totals.caseStudyViews || 0}
          helper="Vizualizări studii de caz"
        />
```

Replace the `ChartPanel` at lines 234-261:

```jsx
        <ChartPanel title="Blog views pe zile">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeseries}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="blogViews"
                name="Blog views"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>
```

with:

```jsx
        <ChartPanel title="Case study views pe zile">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeseries}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.35)"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="caseStudyViews"
                name="Case study views"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>
```

Replace the `ListPanel` at lines 271-275:

```jsx
        <ListPanel
          title="Top articole"
          items={data.topBlogPosts || []}
          labelKey="slug"
        />
```

with:

```jsx
        <ListPanel
          title="Top studii de caz"
          items={data.topCaseStudies || []}
          labelKey="slug"
        />
```

- [ ] **Step 6: Delete the dead frontend files**

```bash
git rm src/pages/Blog.jsx
git rm src/pages/BlogPost.jsx
git rm src/components/BlogCard.jsx
git rm src/components/BlogCarousel.jsx
git rm src/components/BlogPreview.jsx
git rm src/data/blogPosts.js
git rm src/pages/Home.jsx
git rm src/components/Footer.jsx
git rm src/data/caseStudy.js
git rm src/data/caseStudyDetails.js
```

- [ ] **Step 7: Search for orphaned references**

Run: `cd "C:\Users\ASUS\Desktop\ASQUARED\WebServices" && grep -rniE "AdminBlog|BlogCarousel|BlogPreview|BlogCard|blogPosts|caseStudyDetails|from \"\.\./data/caseStudy\"|pages/Home\"" src --include="*.jsx" --include="*.js"`

Expected: no output. If anything prints, fix that remaining import before continuing (this is the check that catches an import this task's steps missed).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Wire Case Study routes/nav end-to-end, remove all dead Blog/Home files"
```

---

### Task 6: Full verification pass

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Build the frontend**

Run: `cd "C:\Users\ASUS\Desktop\ASQUARED\WebServices" && npm run build`

Expected: build succeeds with no errors. Warnings about chunk size (pre-existing, unrelated) are fine; any error mentioning `blog`, `Blog`, or a missing module means Step 7 of Task 5 missed something — go back and fix it.

- [ ] **Step 2: Full-stack manual smoke test**

Start both servers (`cd server && npm run dev` in one terminal, `npm run dev -- --host` in the project root in another). Walk through:

1. `/studii-de-caz` — ProLinen card renders.
2. `/studii-de-caz/prolinen` — full page renders (overview, provocare, abordare, soluție, galerie, rezultat + 4 stats).
3. `/blog` — 404 (`NotFound` page renders, confirming the route is gone).
4. `/admin/login` — log in with admin credentials.
5. `/admin` (dashboard) — "Studii de caz" stat card shows `1` total, `1` publicat; "Ultimele studii de caz" panel lists ProLinen.
6. `/admin/case-studies` — lists ProLinen, status filter tabs work.
7. `/admin/case-studies/new` — fill out a throwaway test case study (all required fields, at least one challenge point, one approach item, one stat), save, confirm it appears in the list as `DRAFT`.
8. Edit that test case study, change status to `PUBLISHED`, save — confirm status badge updates.
9. Archive the test case study via the trash icon — confirm it disappears from the `ALL`/`PUBLISHED` view but reappears under the `ARCHIVED` tab.
10. `/admin/analytics` — page renders with no console errors (confirms the `caseStudyViews` rename didn't break the chart).

- [ ] **Step 3: Review the final diff**

Run: `git log --oneline research/motion-reference -8` and `git diff main...research/motion-reference --stat` to confirm the full set of changes matches this plan's file list (no accidental unrelated changes).

- [ ] **Step 4: Deploy a preview**

Run: `git push origin research/motion-reference` (already tracked from the earlier session), then `vercel` from the project root — confirm the preview deployment reaches `READY` and the smoke-test steps above pass against the preview URL, hitting the Railway backend exactly as production would.
