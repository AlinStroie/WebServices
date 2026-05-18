import { useEffect } from "react";

function SEO({ title, description, type = "website", structuredData }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | Web Services`
      : "Web Services | Site-uri moderne de prezentare";

    document.title = fullTitle;

    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description || "");

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", fullTitle);

    let ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute("content", description || "");

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      document.head.appendChild(ogType);
    }
    ogType.setAttribute("content", type);

    const oldSchema = document.getElementById("structured-data");
    if (oldSchema) oldSchema.remove();

    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "structured-data";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, type, structuredData]);

  return null;
}

export default SEO;