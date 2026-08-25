import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { siteConfig } from "../../data/siteConfig";
import LogoMark from "./LogoMark";
import MagneticCta from "./MagneticCta";

// Pricing lives on its own route now, everything else is a same-page
// section anchor — `to` vs `href` is what tells the renderers below which
// kind of link to build.
const NAV_LINKS = [
  { label: "De ce noi", href: "#de-ce-noi" },
  { label: "Servicii", to: "/servicii" },
  { label: "Lucrări", href: "#lucrari" },
  { label: "Proces", href: "#proces" },
  { label: "Prețuri", to: "/preturi" },
  { label: "Întrebări", href: "#faq" },
];

/**
 * Text-clip roll, the reference's nav hover.
 *
 * The label is rendered twice inside a 1.25rem-tall clip. Hovering
 * translates the wrapper up by exactly one line height, so the duplicate
 * arrives from below as the original leaves. The second copy is
 * aria-hidden so screen readers hear the label once.
 *
 * Shared by both link kinds below — a same-page anchor (button + smooth
 * scroll) and Prețuri's real route (react-router Link) — so the hover
 * animation is identical regardless of which one a given nav entry is.
 */
function RollLabel({ label }) {
  return (
    <span className="text-clip">
      <span className="text-wrapper">
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
    </span>
  );
}

function RollLink({ label, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-roll text-[14px] font-medium transition-colors duration-300 ${className}`}
    >
      <RollLabel label={label} />
    </button>
  );
}

function RollRouteLink({ label, to, className = "" }) {
  return (
    <Link
      to={to}
      className={`text-roll text-[14px] font-medium transition-colors duration-300 ${className}`}
    >
      <RollLabel label={label} />
    </Link>
  );
}

function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduceMotion = useReducedMotion();

  // Mobile only (the `max-lg:` classes below no-op above that breakpoint,
  // same cutoff the hamburger itself already uses): scrolling down past
  // the bar's own height slides the whole header away except the
  // hamburger, which floats fixed in its place; scrolling up — or being
  // near the top — brings the full bar back.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;

        if (y < 96) setHidden(false);
        else if (delta > 8) setHidden(true);
        else if (delta < -8) setHidden(false);

        lastY = y;
        ticking = false;
      });
    }

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

  // Pricing moving to its own route means these anchors can now be
  // clicked from a page that isn't "/". On "/" itself, scroll directly —
  // re-clicking the same anchor still works, which navigate() alone
  // wouldn't guarantee (an identical hash is not a new history entry).
  // From anywhere else, route home with the hash and let ScrollToTop's
  // own hash handling scroll once the page has mounted.
  function go(href) {
    setOpen(false);

    if (pathname === "/") {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/${href}`);
  }

  return (
    <>
      {/* Always the whiteish glass bar (white/70 + 12px blur), not just on
          scroll — the hero behind it is a dark video now, so the nav's
          dark-ink text needs that bg from frame one to stay readable
          (previously started transparent, which only worked over the old
          light hero). */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b border-white/60 bg-white/70 backdrop-blur-[12px] transition-transform duration-300 ${
          hidden ? "max-lg:-translate-y-full" : "max-lg:translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1366px] items-center justify-between px-6 sm:h-[88px] sm:px-8">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-ink)] text-white sm:h-10 sm:w-10">
              <LogoMark className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span className="text-[13px] font-semibold leading-tight text-[color:var(--color-ink)] sm:text-[15px]">
              A Squared
              <br />
              Studio
            </span>
          </Link>

          {/* Links + CTA sit together on the right, mirroring the reference. */}
          <div className="flex items-center gap-9">
            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) =>
                link.to ? (
                  <RollRouteLink
                    key={link.label}
                    label={link.label}
                    to={link.to}
                    className="text-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
                  />
                ) : (
                  <RollLink
                    key={link.label}
                    label={link.label}
                    onClick={() => go(link.href)}
                    className="text-[color:var(--color-ink)] hover:text-[color:var(--color-ink)]"
                  />
                )
              )}
            </nav>

            <MagneticCta
              to="/discovery"
              className="hidden px-6 py-3 text-[14px] font-medium text-white sm:inline-flex"
            >
              Consultanță gratuită
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </MagneticCta>

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

      {/* Stands in for the hamburger while the header above is slid away —
          same button, fixed in place instead of scrolling off with the
          bar, faded in only once `hidden` is true so there's never two
          visible at once. */}
      <button
        type="button"
        aria-label="Deschide meniul"
        onClick={() => setOpen(true)}
        tabIndex={hidden ? 0 : -1}
        className={`fixed right-6 top-[18px] z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-divider)] bg-white/70 text-[color:var(--color-ink)] backdrop-blur-[12px] transition-opacity duration-300 lg:hidden ${
          hidden ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Menu size={20} />
      </button>

      {/* Slideout menu — overlay fades in over 300ms, panel slides in from
          the LEFT over 500ms on cubic-bezier(0.4, 0, 0.2, 1). AnimatePresence
          (not the plain CSS animations this used to run) is what lets the
          reverse of both play on close instead of the panel just vanishing
          the instant `open` flips false. */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] bg-black/50 lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="slideout-menu absolute inset-y-0 left-0 w-[min(88vw,380px)] bg-[color:var(--color-surface)] px-6 py-7"
              initial={reduceMotion ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: "-100%" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--color-ink)] text-white">
                <LogoMark className="h-6 w-6" />
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
              {NAV_LINKS.map((link, index) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    style={{ animationDelay: `${120 + index * 55}ms` }}
                    className="animate-hero-in border-b border-[color:var(--color-divider)] py-5 text-left text-2xl font-semibold text-[color:var(--color-ink)]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => go(link.href)}
                    style={{ animationDelay: `${120 + index * 55}ms` }}
                    className="animate-hero-in border-b border-[color:var(--color-divider)] py-5 text-left text-2xl font-semibold text-[color:var(--color-ink)]"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>

            <MagneticCta
              to="/discovery"
              onClick={() => setOpen(false)}
              className="mt-6 flex w-full justify-center px-6 py-3 text-sm font-medium text-white"
            >
              Consultanță gratuită
              <ArrowUpRight size={17} />
            </MagneticCta>

            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-4 text-center text-sm text-[color:var(--color-copy-muted)]"
            >
              {siteConfig.contact.email}
            </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Nav;
