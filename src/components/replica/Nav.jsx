import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { siteConfig } from "../../data/siteConfig";

const NAV_LINKS = [
  { label: "Servicii", href: "#servicii" },
  { label: "Lucrări", href: "#lucrari" },
  { label: "Proces", href: "#proces" },
  { label: "Prețuri", href: "#preturi" },
  { label: "Întrebări", href: "#faq" },
];

/**
 * Text-clip roll, the reference's nav hover.
 *
 * The label is rendered twice inside a 1.25rem-tall clip. Hovering
 * translates the wrapper up by exactly one line height, so the duplicate
 * arrives from below as the original leaves. The second copy is
 * aria-hidden so screen readers hear the label once.
 */
function RollLink({ label, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-roll text-[14px] font-medium transition-colors duration-300 ${className}`}
    >
      <span className="text-clip">
        <span className="text-wrapper">
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </span>
    </button>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function go(href) {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Header treatment matches the reference: transparent at the top with a
          faint white hairline underneath; on scroll it turns into a whiteish
          glass bar (white/70 + 12px blur) with a stronger white line, over a
          300ms cubic-bezier(0.4,0,0.2,1) transition. */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled
            ? "border-white/60 bg-white/70 backdrop-blur-[12px]"
            : "border-white/25 bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[88px] w-full max-w-[1366px] items-center justify-between px-6 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--color-ink)] text-sm font-bold text-white">
              {siteConfig.brand.logoLetter}
            </span>
            <span className="text-[15px] font-semibold leading-tight text-[color:var(--color-ink)]">
              A Squared
              <br />
              Studio
            </span>
          </Link>

          {/* Links + CTA sit together on the right, mirroring the reference. */}
          <div className="flex items-center gap-9">
            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => (
                <RollLink
                  key={link.href}
                  label={link.label}
                  onClick={() => go(link.href)}
                  className="text-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
                />
              ))}
            </nav>

            <Link
              to="/discovery"
              className="group hidden items-center gap-2 rounded-full bg-[color:var(--color-brand)] px-6 py-3 text-[14px] font-medium text-white transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Consultanță gratuită
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <button
              type="button"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-divider)] text-[color:var(--color-ink)] transition-colors duration-300 hover:bg-[color:var(--color-ink)] hover:text-white lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Slideout menu — overlay fades in over 300ms, panel slides in from
          the LEFT over 500ms on cubic-bezier(0.4, 0, 0.2, 1). */}
      {open && (
        <div className="fixed inset-0 z-[150] lg:hidden">
          <button
            type="button"
            aria-label="Închide meniul"
            onClick={() => setOpen(false)}
            className="slideout-overlay absolute inset-0 bg-black/50"
          />

          <div className="slideout-menu absolute inset-y-0 left-0 w-[min(88vw,380px)] bg-[color:var(--color-surface)] px-6 py-7">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--color-ink)] text-sm font-bold text-white">
                {siteConfig.brand.logoLetter}
              </span>

              <button
                type="button"
                aria-label="Închide meniul"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-divider)] text-[color:var(--color-ink)]"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-10 grid flex-1 gap-1 overflow-y-auto">
              {NAV_LINKS.map((link, index) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => go(link.href)}
                  style={{ animationDelay: `${120 + index * 55}ms` }}
                  className="animate-hero-in border-b border-[color:var(--color-divider)] py-5 text-left text-2xl font-semibold text-[color:var(--color-ink)]"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <Link
              to="/discovery"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand)] px-6 py-4 text-base font-medium text-white"
            >
              Consultanță gratuită
              <ArrowUpRight size={17} />
            </Link>

            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-4 text-center text-sm text-[color:var(--color-copy-muted)]"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
