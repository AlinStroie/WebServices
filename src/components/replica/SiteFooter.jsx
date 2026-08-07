import { Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "../../data/siteConfig";

/**
 * Closing footer.
 *
 * Uses the same vertical rhythm as a full page section (160px padding,
 * 160px between blocks) rather than compressing at the end, and is
 * centred throughout while the rest of the page is left-aligned. That
 * combination is what makes it read as a deliberate full stop rather
 * than the page trailing off.
 */
function SiteFooter({ onBook, onOpenPolicy }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full space-y-40 bg-[color:var(--color-ink)] px-6 py-40 sm:px-8">
      <div className="mx-auto grid w-full max-w-[1366px] place-items-center items-center gap-8 text-center">
        <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
          Următorul pas
        </p>

        <h2 className="display max-w-[16ch] text-[clamp(2.5rem,7vw,5rem)] text-white">
          Hai să vorbim despre proiectul tău
        </h2>

        <p className="max-w-[46ch] text-[color:var(--color-copy-on-dark)]">
          30 de minute, fără obligații. Ne spui ce vrei să obții și îți spunem
          concret ce se poate face și în cât timp.
        </p>

        <div className="mx-auto mt-20 grid w-fit justify-items-center gap-4">
          <button
            type="button"
            onClick={onBook}
            className="rounded-full bg-[color:var(--color-brand)] px-10 py-5 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.03]"
          >
            Programează o discuție
          </button>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-sm text-[color:var(--color-copy-subtle-on-dark)] underline-offset-4 hover:underline"
          >
            sau scrie-ne direct
          </a>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1366px] gap-12">
        <div className="grid gap-8 border-t border-[color:var(--color-divider-on-dark)] pt-12 sm:grid-cols-3">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center justify-center gap-3 text-[15px] text-[color:var(--color-copy-on-dark)] transition-colors hover:text-white"
          >
            <Mail size={17} className="text-[color:var(--color-accent)]" />
            {siteConfig.contact.email}
          </a>

          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="flex items-center justify-center gap-3 text-[15px] text-[color:var(--color-copy-on-dark)] transition-colors hover:text-white"
          >
            <Phone size={17} className="text-[color:var(--color-accent)]" />
            {siteConfig.contact.phone}
          </a>

          <p className="flex items-center justify-center gap-3 text-[15px] text-[color:var(--color-copy-on-dark)]">
            <MapPin size={17} className="text-[color:var(--color-accent)]" />
            {siteConfig.contact.location}
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-[color:var(--color-divider-on-dark)] pt-12 sm:flex-row">
          <p className="text-sm text-[color:var(--color-copy-subtle-on-dark)]">
            © {year} {siteConfig.brand.name}
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="/blog"
              className="text-[color:var(--color-copy-subtle-on-dark)] transition-colors hover:text-white"
            >
              Blog
            </a>

            <a
              href="/privacy"
              className="text-[color:var(--color-copy-subtle-on-dark)] transition-colors hover:text-white"
            >
              Confidențialitate
            </a>

            <a
              href="/cookies"
              className="text-[color:var(--color-copy-subtle-on-dark)] transition-colors hover:text-white"
            >
              Cookies
            </a>

            <button
              type="button"
              onClick={() => onOpenPolicy?.("terms")}
              className="text-[color:var(--color-copy-subtle-on-dark)] transition-colors hover:text-white"
            >
              Termeni
            </button>
          </nav>

          <div className="flex items-center gap-5 text-sm">
            {Object.entries(siteConfig.social)
              .filter(([, href]) => Boolean(href))
              .map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="capitalize text-[color:var(--color-copy-subtle-on-dark)] transition-colors hover:text-white"
                >
                  {name}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
