import { Link } from "react-router-dom";

import { siteConfig } from "../../data/siteConfig";
import MagneticCta from "./MagneticCta";

// lucide-react (as installed here) ships no brand/social glyphs — they
// were dropped upstream over trademark concerns, which is also why the
// footer's previous version rendered social links as plain text. Small
// self-contained outline SVGs (Feather's original instagram/facebook/
// linkedin glyphs, the icon set lucide itself forked from) match the
// rest of the site's stroke-icon language without a new dependency.
const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} {...ICON_PROPS}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} {...ICON_PROPS}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} {...ICON_PROPS}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TiktokIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} {...ICON_PROPS}>
      <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917" />
    </svg>
  );
}

// Real destinations only — anchors that exist on the homepage (routed as
// "/#id" so they work from any page, same trick Nav.jsx's links rely on)
// plus real standalone routes. No fabricated pages.
const FOOTER_LINKS = [
  { label: "Acasă", to: "/#hero" },
  { label: "De ce noi", to: "/#de-ce-noi" },
  { label: "Servicii", to: "/servicii" },
  { label: "Lucrări", to: "/#lucrari" },
  { label: "Proces", to: "/#proces" },
  { label: "Avantaje", to: "/#avantaje" },
  { label: "Prețuri", to: "/preturi" },
  { label: "Întrebări frecvente", to: "/#faq" },
  { label: "Studii de caz", to: "/studii-de-caz" },
  { label: "Consultanță gratuită", to: "/discovery" },
];

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  tiktok: TiktokIcon,
};

/**
 * Closing footer.
 *
 * Uses the same vertical rhythm as a full page section (160px padding,
 * 160px between blocks) rather than compressing at the end, and is
 * centred throughout while the rest of the page is left-aligned. That
 * combination is what makes it read as a deliberate full stop rather
 * than the page trailing off.
 *
 * The opening CTA block is copied from the reference's own closing
 * section (`section10_reference`): no eyebrow above the title, a bold
 * sans headline with one `accent-serif` italic keyword (same device as
 * every other accent word on the site), a larger muted subtitle, an
 * oversized solid-fill pill CTA with no icon, and a small caption under
 * it — everything except the awards-logo row underneath the divider,
 * which the brief explicitly excludes (we have no awards to show yet).
 *
 * The lower footer proper is copied structurally from `footer_reference`:
 * logo + tagline on the left against a labelled address/local-time/email
 * block on the right, a divider, a "Helpful Links" row, then a bottom bar
 * of social icons on the left and copyright/policy links on the right.
 * Content throughout is ours — the reference's own link list is a
 * healthcare-web-design SEO sitemap that has nothing to do with this
 * business, so it's replaced with links to pages that actually exist
 * here rather than copied verbatim.
 */
function SiteFooter() {
  const year = new Date().getFullYear();
  const company = siteConfig.company;
  const socials = Object.entries(siteConfig.social).filter(([, href]) =>
    Boolean(href)
  );

  return (
    <footer className="grad-dark relative z-10 w-full space-y-20 px-6 py-20 sm:space-y-28 sm:px-8 sm:py-28 lg:space-y-40 lg:py-40">
      <div className="mx-auto grid w-full max-w-[1366px] place-items-center items-center gap-8 text-center">
        <h2 className="display max-w-[18ch] text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[1.1] text-white">
          Maximizează-ți rezultatele cu{" "}
          <span className="accent-serif font-normal">design web</span>{" "}
          de excepție
        </h2>

        <p className="max-w-[52ch] text-lg text-[color:var(--color-copy-on-dark)] sm:text-xl">
          Afacerile serioase au nevoie de site-uri la fel de serioase. Orice
          mai puțin de atât te costă clienți, încredere și autoritate în
          piața ta.
        </p>

        <div className="mx-auto mt-10 grid w-fit justify-items-center gap-5 sm:mt-14 lg:mt-20">
          <MagneticCta
            to="/discovery"
            className="px-8 py-4 text-base font-semibold text-white sm:px-12 sm:py-5 sm:text-lg"
          >
            Consultanță gratuită
          </MagneticCta>

          <p className="text-sm text-[color:var(--color-copy-subtle-on-dark)]">
            Apel de 15 minute · Fără obligații
          </p>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1366px] gap-16">
        {/* Main Info Grid: Brand (Left), Direct Contact (Center), Legal Company Details (Right) */}
        <div className="grid grid-cols-1 gap-10 border-t border-[color:var(--color-divider-on-dark)] pt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 text-left">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col items-start gap-4 lg:col-span-4">
            <Link
              to="/"
              className="group flex items-center gap-2.5 select-none sm:gap-3"
              aria-label="A Squared Studio — Acasă"
            >
              <img
                src="/logo_white.svg"
                alt="A Squared Studio"
                className="h-8 w-8 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9"
                loading="eager"
              />
              <span className="font-zt-nature text-[17px] font-bold italic tracking-[-0.02em] text-white sm:text-[20px] inline-flex items-center">
                a squared studio.
              </span>
            </Link>

            <p className="max-w-[34ch] text-sm leading-relaxed text-[color:var(--color-copy-on-dark)]">
              {siteConfig.brand.tagline}
            </p>
          </div>

          {/* Column 2: Contact direct */}
          <div className="grid content-start gap-3 lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide text-white">Contact direct</h3>

            <dl className="grid gap-3 text-sm">
              <div className="grid gap-0.5">
                <dt className="text-xs uppercase tracking-wider text-[color:var(--color-copy-subtle-on-dark)]">Email</dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[color:var(--color-copy-on-dark)] transition-colors hover:text-white"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>

              <div className="grid gap-0.5">
                <dt className="text-xs uppercase tracking-wider text-[color:var(--color-copy-subtle-on-dark)]">Telefon</dt>
                <dd>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                    className="text-[color:var(--color-copy-on-dark)] transition-colors hover:text-white"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </dd>
              </div>

              <div className="grid gap-0.5">
                <dt className="text-xs uppercase tracking-wider text-[color:var(--color-copy-subtle-on-dark)]">Asistență</dt>
                <dd className="text-[color:var(--color-copy-on-dark)]">
                  Luni – Vineri · Răspuns rapid
                </dd>
              </div>
            </dl>
          </div>

          {/* Column 3: Date companie & Identificare fiscală */}
          <div className="grid content-start gap-3 md:col-span-2 lg:col-span-5">
            <h3 className="text-sm font-semibold tracking-wide text-white">Date companie</h3>

            <dl className="grid gap-2.5 text-sm text-[color:var(--color-copy-on-dark)]">
              <div className="grid gap-0.5">
                <dt className="text-xs uppercase tracking-wider text-[color:var(--color-copy-subtle-on-dark)]">Denumire entitate</dt>
                <dd className="font-medium text-white">
                  {company.fullLegalName}
                </dd>
              </div>

              <div className="grid gap-0.5">
                <dt className="text-xs uppercase tracking-wider text-[color:var(--color-copy-subtle-on-dark)]">Sediu social</dt>
                <dd className="leading-relaxed">
                  {company.address}
                </dd>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1.5 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-[color:var(--color-copy-subtle-on-dark)]">CUI:</span>
                  <span className="font-mono font-medium text-white">{company.fiscalCode}</span>
                </div>
                <span className="text-[color:var(--color-divider-on-dark)]" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[color:var(--color-copy-subtle-on-dark)]">Nr. Reg. Com.:</span>
                  <span className="font-mono font-medium text-white">{company.tradeRegisterNo}</span>
                </div>
                <span className="text-[color:var(--color-divider-on-dark)]" aria-hidden="true">·</span>
                <span className="text-[color:var(--color-copy-subtle-on-dark)]">
                  {company.vatStatus}
                </span>
              </div>
            </dl>
          </div>
        </div>

        {/* Helpful links */}
        <div className="grid gap-6 border-t border-[color:var(--color-divider-on-dark)] pt-12 text-left">
          <h3 className="text-sm font-semibold text-white">Linkuri utile</h3>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-[color:var(--color-copy-on-dark)] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar: social icons (left) / copyright + policies (right) */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            {socials.map(([name, href]) => {
              const Icon = SOCIAL_ICONS[name];
              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-divider-on-dark)] text-[color:var(--color-copy-on-dark)] transition-colors hover:border-white/40 hover:text-white"
                >
                  {Icon ? (
                    <Icon size={16} />
                  ) : (
                    <span className="text-xs capitalize">{name[0]}</span>
                  )}
                </a>
              );
            })}
          </div>

          <p className="flex flex-wrap items-center justify-center gap-x-2 text-center text-sm text-[color:var(--color-copy-subtle-on-dark)]">
            <span>
              © {year} {siteConfig.brand.name}
            </span>
            <span aria-hidden="true">·</span>
            <Link to="/privacy" className="transition-colors hover:text-white">
              Confidențialitate
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/cookies" className="transition-colors hover:text-white">
              Cookies
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms" className="transition-colors hover:text-white">
              Termeni
            </Link>
            <span aria-hidden="true">·</span>
            <span>Toate drepturile rezervate.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
