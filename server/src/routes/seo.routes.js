import express from "express";

import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { env } from "../config/env.js";

const router = express.Router();

function escapeXml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatDate(date) {
  if (!date) return new Date().toISOString().slice(0, 10);

  return new Date(date).toISOString().slice(0, 10);
}

function normalizeSiteUrl(url) {
  return String(url || "")
    .replace(/\/+$/, "");
}

// GET /sitemap.xml
router.get(
  "/sitemap.xml",
  asyncHandler(async (req, res) => {
    const siteUrl = normalizeSiteUrl(env.CLIENT_URL);

    const caseStudies = await prisma.caseStudy.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
    });

    const staticPages = [
      {
        loc: `${siteUrl}/`,
        changefreq: "monthly",
        priority: "1.0",
        lastmod: formatDate(new Date()),
      },
      {
        loc: `${siteUrl}/studii-de-caz`,
        changefreq: "weekly",
        priority: "0.8",
        lastmod: formatDate(new Date()),
      },
      {
        loc: `${siteUrl}/politica-de-confidentialitate`,
        changefreq: "yearly",
        priority: "0.3",
        lastmod: formatDate(new Date()),
      },
      {
        loc: `${siteUrl}/politica-cookies`,
        changefreq: "yearly",
        priority: "0.3",
        lastmod: formatDate(new Date()),
      },
    ];

    const caseStudyPages = caseStudies.map((post) => ({
      loc: `${siteUrl}/studii-de-caz/${post.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: formatDate(post.updatedAt || post.publishedAt),
    }));

    const urls = [...staticPages, ...caseStudyPages];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  })
);

// GET /robots.txt
router.get("/robots.txt", (req, res) => {
  const siteUrl = normalizeSiteUrl(env.CLIENT_URL);

  const robots = `User-agent: *
Allow: /

Disallow: /admin
Disallow: /admin/
Disallow: /api/admin

Sitemap: ${siteUrl}/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(robots);
});

export default router;