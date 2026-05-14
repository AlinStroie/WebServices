import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Acasă", href: "#home" },
    { label: "Servicii", href: "#servicii" },
    { label: "Portofoliu", href: "#portofoliu" },
    { label: "Proces", href: "#proces" },
    { label: "Prețuri", href: "#preturi" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-black">
            W
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            WebNova Studio
          </span>
        </a>

        <div className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/60 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90 md:inline-flex"
        >
          Cere ofertă
        </a>

        <button
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
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-white/70 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black"
            >
              Cere ofertă
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;