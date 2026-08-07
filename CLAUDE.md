# A Squared Studio — Web Services Portfolio

React/Vite frontend + Express/Prisma backend monorepo. Two separately-run apps in one repo: `src/` (frontend) and `server/` (backend). See `README.md` for full feature list and API overview.

## Commands

Frontend (repo root):
```bash
npm install
npm run dev       # Vite dev server, http://localhost:5174
npm run build
npm run lint
```

Backend (`server/`):
```bash
cd server
npm install
npm run dev              # nodemon, http://localhost:5000
npm run prisma:migrate   # dev migration
npm run prisma:deploy    # prod migration
npm run prisma:studio
npm run seed:admin       # create/seed admin user
npm run admin:reset      # reset admin password
```

Both must run simultaneously for local dev — frontend calls `VITE_API_BASE_URL` (root `.env`) which must point at the backend port.

## Architecture

```
src/            React frontend (Vite, Tailwind, Framer Motion, react-router-dom)
  components/   UI components, incl. admin/ and minisites/
  pages/        route-level pages
  lib/          api.js, adminApi.js, analytics.js — fetch wrappers to backend
  data/         static content (blogPosts.js, portfolio.js, pricing.js, siteConfig.js)

server/
  src/
    routes/       blog, contact, analytics, seo, admin/ (auth, dashboard, blog, contact, analytics)
    middleware/   asyncHandler, errorHandler, requireAdmin, rateLimiters, validate
    validators/   Zod schemas per route
    lib/          prisma client, mailer (Nodemailer/Brevo), adminAuth, auditLog, slugify
    config/       env.js, security.js
  prisma/         schema.prisma, seed.js, seedAdmin.js, resetAdminPassword.js, importBlogPosts.js
```

Route pattern: Express route → Zod validator middleware → `asyncHandler`-wrapped handler → Prisma. Admin routes additionally go through `requireAdmin` (separate JWT from the general one).

## Environment variables

**Two separate `.env` files — easy to edit the wrong one:**
- Root `.env` → frontend (Vite), just `VITE_API_BASE_URL`
- `server/.env` → backend: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_JWT_SECRET` (separate from `JWT_SECRET`, do not confuse), SMTP/Brevo creds, `CLIENT_URL`, rate-limit tuning

Both are git-ignored. `.env.example` files in each location document required keys — keep those in sync when adding a new var. A hook (`.claude/hooks/block-env-edit.cjs`) blocks Claude from editing live `.env*` files directly; `.env.example` stays editable.

`CLIENT_URL` (server) and `VITE_API_BASE_URL` (frontend) must point at each other's actual ports or CORS/the contact form breaks silently.

## Git workflow

`main` is protected (PR required, no force-push/deletion) and maps to production (Vercel auto-deploys `main`). Work on feature branches (`feature/...`, `fix/...`, `chore/...`, `docs/...`) off `main`, push, open a PR — pushing the branch also gets you a Vercel preview deployment for free. Merge via PR once verified on the preview URL, not just localhost.

## Gotchas

- `server/src/routes/portfolio.routes.js` is empty (0 bytes) — unclear if in-progress or dead code, don't assume it's wired up.
- `prisma.config.ts` exists alongside `schema.prisma` (Prisma 6/7 split-config) — don't expect a single legacy `schema.prisma`-only setup.
- Stray files at repo root (`test.txt`, `vite-dev.log`, `vite-dev.err.log`, `package-lock.backup.json`, an empty `WebServices/` dir) predate this file — leftover cruft, not part of the app.
- `.codegraph/` (CodeGraph index, gitignored) may exist locally — query it via the `codegraph_explore` MCP tool or `codegraph explore "<query>"` before grepping, if present.
