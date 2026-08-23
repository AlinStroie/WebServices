import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { siteConfig } from "../../data/siteConfig";
import LogoMark from "./LogoMark";
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

// Real destinations only — anchors that exist on the homepage (routed as
// "/#id" so they work from any page, same trick Nav.jsx's links rely on)
// plus real standalone routes. No fabricated pages.
const FOOTER_LINKS = [
  { label: "Acasă", to: "/#hero" },
  { label: "Servicii", to: "/#servicii" },
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
};

/**
 * A live "Local Time" line, matching the reference's own (it stamps a
 * real clock in its studio's timezone, not a static string that would go
 * stale the moment someone reloads the page). Recomputes the UTC offset
 * from Intl rather than hardcoding it, so it stays correct across the
 * DST switch (Romania is UTC+2 in winter, UTC+3 in summer).
 */
function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const stamp = now.toLocaleString("ro-RO", {
    timeZone: "Europe/Bucharest",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const offsetName = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Bucharest",
    timeZoneName: "shortOffset",
  })
    .formatToParts(now)
    .find((part) => part.type === "timeZoneName")?.value;

  return (
    <>
      {stamp}
      {offsetName ? ` (${offsetName.replace("GMT", "UTC")})` : ""}
    </>
  );
}

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
        {/* Logo + tagline (left) against a labelled address/time/email
            block (right) — matches the reference's own split exactly. */}
        <div className="flex flex-col gap-10 border-t border-[color:var(--color-divider-on-dark)] pt-16 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-[36ch] items-start gap-3 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[color:var(--color-ink)]">
              <LogoMark className="h-6 w-6" />
            </span>

            <div className="grid gap-2">
              <span className="text-[15px] font-semibold leading-tight text-white">
                {siteConfig.brand.shortName}
              </span>
              <p className="text-sm leading-relaxed text-[color:var(--color-copy-on-dark)]">
                {siteConfig.brand.tagline}
              </p>
            </div>
          </div>

          <dl className="grid gap-3 text-left text-sm sm:text-right">
            <div className="flex gap-2 sm:justify-end">
              <dt className="font-semibold text-white">Adresă locală:</dt>
              <dd className="text-[color:var(--color-copy-on-dark)]">
                {siteConfig.contact.location}
              </dd>
            </div>

            <div className="flex gap-2 sm:justify-end">
              <dt className="font-semibold text-white">Ora locală:</dt>
              <dd className="text-[color:var(--color-copy-on-dark)]">
                <LocalTime />
              </dd>
            </div>

            <div className="flex gap-2 sm:justify-end">
              <dt className="font-semibold text-white">Email:</dt>
              <dd>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-[color:var(--color-copy-on-dark)] transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
          </dl>
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
