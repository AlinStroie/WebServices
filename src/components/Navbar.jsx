import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

function Navbar({ onOpenContact }) {
  const [open, setOpen] = useState(false);

  const links = siteConfig.navigation;

  function handleNavClick(link) {
    const label = link.label.toLowerCase();

    if (label === "contact" || link.href === "#contact") {
      onOpenContact?.();
      setOpen(false);
      return;
    }

    setOpen(false);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
       <a href="#home" className="flex items-center">
        <img  src="/banner site.svg" alt={siteConfig.brand.name} className="h-16 w-auto" />
      </a>

        <div className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/60 md:flex">
          {links.map((link) => {
            const isContact =
              link.label.toLowerCase() === "contact" || link.href === "#contact";

            if (isContact) {
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  className="transition hover:text-white"
                >
                  {link.label}
                </button>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onOpenContact}
          className="hidden rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90 md:inline-flex"
        >
          Cere ofertă
        </button>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
          aria-label="Deschide meniul"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => {
              const isContact =
                link.label.toLowerCase() === "contact" ||
                link.href === "#contact";

              if (isContact) {
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className="text-left text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link)}
                  className="text-white/70 transition hover:text-white"
                >
                  {link.label}
                </a>
              );
            })}

            <button
              type="button"
              onClick={() => {
                onOpenContact?.();
                setOpen(false);
              }}
              className="mt-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Cere ofertă
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;