import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { siteConfig } from "../../data/siteConfig";

const links = [
  { label: "Servicii", href: "#servicii" },
  { label: "Lucrări", href: "#lucrari" },
  { label: "Proces", href: "#proces" },
  { label: "Prețuri", href: "#preturi" },
  { label: "Întrebări", href: "#faq" },
];

function Nav({ onBook }) {
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

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(href) {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        scrolled
          ? "bg-[color:var(--color-surface)]/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[88px] w-full max-w-[1366px] items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--color-ink)] text-sm font-bold text-white">
            {siteConfig.brand.logoLetter}
          </span>
          <span className="text-[15px] font-semibold leading-tight text-[color:var(--color-ink)]">
            A Squared
            <br />
            Studio
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => go(link.href)}
              className="text-[15px] text-[color:var(--color-ink)]/75 transition-colors duration-300 hover:text-[color:var(--color-ink)]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBook}
            className="hidden rounded-full bg-[color:var(--color-brand)] px-6 py-3 text-[15px] font-medium text-white transition-transform duration-200 hover:scale-[1.03] sm:inline-flex"
          >
            Programează o discuție
          </button>

          <button
            type="button"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-divider)] text-[color:var(--color-ink)] lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-[88px] z-[99] bg-[color:var(--color-surface)] px-6 py-8 lg:hidden">
          <nav className="grid gap-2">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => go(link.href)}
                className="border-b border-[color:var(--color-divider)] py-5 text-left text-2xl font-semibold text-[color:var(--color-ink)]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onBook?.();
            }}
            className="mt-8 w-full rounded-full bg-[color:var(--color-brand)] px-6 py-4 text-base font-medium text-white"
          >
            Programează o discuție
          </button>
        </div>
      )}
    </header>
  );
}

export default Nav;
