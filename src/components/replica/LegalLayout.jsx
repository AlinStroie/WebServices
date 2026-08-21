import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Nav from "./Nav";
import SiteFooter from "./SiteFooter";
import BackToTop from "./BackToTop";
import ConsentBanner from "./ConsentBanner";

/**
 * Shared shell for the legal pages (Privacy / Cookies / Terms), styled
 * after the reference site's own legal pages: no hero, a plain breadcrumb
 * row cross-linking the sibling documents, a big plain (non-gradient)
 * display heading, a "last updated" line, then flowing numbered sections
 * separated by hairline dividers instead of the old boxed cards. Wrapped
 * in the same Nav/SiteFooter/BackToTop/ConsentBanner shell as every other
 * standalone route (see Pricing.jsx) so the footer CTA is present here too.
 */
const LEGAL_LINKS = [
  { to: "/privacy", label: "Confidențialitate" },
  { to: "/cookies", label: "Cookie-uri" },
  { to: "/terms", label: "Termeni și condiții" },
];

export function LegalSection({ number, title, children }) {
  return (
    <section className="border-t border-[color:var(--color-divider)] py-8 first:border-t-0 first:pt-0 sm:py-10">
      <h2 className="flex items-baseline gap-4 text-xl font-semibold text-[color:var(--color-ink)] sm:text-2xl">
        <span className="text-sm font-medium text-[color:var(--color-copy-muted)] sm:text-base">
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-[color:var(--color-copy-muted)]">
        {children}
      </div>
    </section>
  );
}

function LegalLayout({ eyebrow = "Legal", title, updated, intro, currentPath, children }) {
  return (
    <div className="replica relative min-h-screen">
      <Nav />

      <main id="top" className="grad-white pt-[88px]">
        <section className="mx-auto w-full max-w-[896px] px-6 py-24 sm:px-8 lg:py-32">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[color:var(--color-copy-muted)]">
            <Link
              to="/"
              className="flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--color-ink)]"
            >
              <ArrowLeft size={14} />
              Înapoi la site
            </Link>

            {LEGAL_LINKS.filter((link) => link.to !== currentPath).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors duration-300 hover:text-[color:var(--color-ink)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="eyebrow mt-10 text-[color:var(--color-copy-muted)]">{eyebrow}</p>

          <h1 className="display mt-4 text-[clamp(2.25rem,6vw,4rem)] text-[color:var(--color-ink)]">
            {title}
          </h1>

          {updated && (
            <p className="mt-4 text-sm text-[color:var(--color-copy-muted)]">
              Ultima actualizare: {updated}
            </p>
          )}

          {intro && (
            <p className="measure mt-8 text-lg leading-relaxed text-[color:var(--color-copy-muted)]">
              {intro}
            </p>
          )}

          <div className="mt-12">{children}</div>
        </section>
      </main>

      <SiteFooter />
      <BackToTop />
      <ConsentBanner />
    </div>
  );
}

export default LegalLayout;
