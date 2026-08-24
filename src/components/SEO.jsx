import { useEffect, useMemo } from "react";

import { siteConfig } from "../data/siteConfig";

function getBaseUrl() {
  if (siteConfig.siteUrl) return siteConfig.siteUrl.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

function upsertMeta(selector, createAttributes, valueAttribute, value) {
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(createAttributes).forEach(([key, attributeValue]) => {
      element.setAttribute(key, attributeValue);
    });
    document.head.appendChild(element);
  }

  element.setAttribute(valueAttribute, value || "");
}

function upsertLink(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function SEO({
  title,
  description,
  type = "website",
  path,
  image,
  structuredData,
  noindex = false,
}) {
  const pageDescription = description || siteConfig.seo.description;

  const fullTitle = useMemo(() => {
    if (!title) return siteConfig.seo.defaultTitle;
    return siteConfig.seo.titleTemplate.replace("%s", title);
  }, [title]);

  useEffect(() => {
    const baseUrl = getBaseUrl();
    const currentPath =
      path || `${window.location.pathname}${window.location.search}`;
    const canonicalUrl = `${baseUrl}${currentPath === "/" ? "/" : currentPath}`;
    const ogImage = image || siteConfig.seo.ogImage;
    const absoluteImage = ogImage?.startsWith("http")
      ? ogImage
      : `${baseUrl}${ogImage || ""}`;

    document.title = fullTitle;

    upsertMeta(
      'meta[name="description"]',
      { name: "description" },
      "content",
      pageDescription
    );
    upsertMeta(
      'meta[name="keywords"]',
      { name: "keywords" },
      "content",
      siteConfig.seo.keywords
    );
    upsertMeta(
      'meta[name="robots"]',
      { name: "robots" },
      "content",
      noindex ? "noindex, nofollow" : "index, follow"
    );

    upsertMeta(
      'meta[property="og:title"]',
      { property: "og:title" },
      "content",
      fullTitle
    );
    upsertMeta(
      'meta[property="og:description"]',
      { property: "og:description" },
      "content",
      pageDescription
    );
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "content", type);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, "content", canonicalUrl);
    upsertMeta(
      'meta[property="og:site_name"]',
      { property: "og:site_name" },
      "content",
      siteConfig.brand.name
    );
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, "content", absoluteImage);

    upsertMeta(
      'meta[name="twitter:card"]',
      { name: "twitter:card" },
      "content",
      "summary_large_image"
    );
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, "content", fullTitle);
    upsertMeta(
      'meta[name="twitter:description"]',
      { name: "twitter:description" },
      "content",
      pageDescription
    );
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, "content", absoluteImage);

    upsertLink("canonical", canonicalUrl);

    document.querySelectorAll("script[data-seo-schema]").forEach((script) => {
      script.remove();
    });

    const schemas = Array.isArray(structuredData)
      ? structuredData
      : structuredData
        ? [structuredData]
        : [];

    schemas.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = String(index);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [fullTitle, pageDescription, path, image, structuredData, type, noindex]);

  return null;
}

export default SEO;
