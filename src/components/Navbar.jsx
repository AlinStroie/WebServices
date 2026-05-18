import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Send,
  X,
} from "lucide-react";

import { siteConfig } from "../data/siteConfig";

function Navbar({ onOpenContact }) {
  const [open, setOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const contactMenuRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const links = siteConfig.navigation;

  const email =
    siteConfig?.contact?.email ||
    siteConfig?.company?.email ||
    "contact@example.com";

  const phone =
    siteConfig?.contact?.phone ||
    siteConfig?.company?.phone ||
    "0700000000";

  const phoneDigits = phone.replace(/\D/g, "");
  const whatsappNumber = phoneDigits.startsWith("40")
    ? phoneDigits
    : `4${phoneDigits}`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        contactMenuRef.current &&
        !contactMenuRef.current.contains(event.target)
      ) {
        setContactMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let ticking = false;

    function getActiveSection() {
      const validSections = links
        .map((link) => link.sectionHref || link.href)
        .filter((href) => href.startsWith("#"));

      const sections = validSections
        .map((href) => {
          const section = document.querySelector(href);
          if (!section) return null;

          const rect = section.getBoundingClientRect();

          return {
            href,
            top: rect.top,
            bottom: rect.bottom,
          };
        })
        .filter(Boolean);

      if (!sections.length) return "#home";

      const triggerPoint = window.innerHeight * 0.38;
      let currentSection = sections[0];

      for (const section of sections) {
        if (section.top <= triggerPoint && section.bottom >= triggerPoint) {
          currentSection = section;
          break;
        }

        if (section.top <= triggerPoint) {
          currentSection = section;
        }
      }

      return currentSection.href;
    }

    function handleScroll() {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);

        if (location.pathname === "/") {
          setActiveSection(getActiveSection());
        }

        ticking = false;
      });
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [links, location.pathname]);

  function handleLogoClick(event) {
    event.preventDefault();

    setOpen(false);
    setContactMenuOpen(false);
    setActiveSection("#home");

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 80);

      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleOfferClick() {
    setOpen(false);
    setContactMenuOpen(false);
    onOpenContact?.();
  }

  function handleSectionClick(href) {
    setOpen(false);
    setContactMenuOpen(false);
    setActiveSection(href);
  }

  function renderNavItem(link, mobile = false) {
    const isPageLink = link.href.startsWith("/");
    const isHomePage = location.pathname === "/";
    const sectionHref = link.sectionHref || link.href;

    const isActive = isPageLink
      ? location.pathname === link.href ||
        (isHomePage && activeSection === sectionHref)
      : isHomePage && activeSection === sectionHref;

    const desktopClass = `rounded-full px-4 py-2 transition-all duration-300 ${
      isActive
        ? "bg-white text-black shadow-[0_0_28px_rgba(255,255,255,0.18)]"
        : "hover:bg-white/[0.08] hover:text-white"
    }`;

    const mobileClass = `rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-white text-black"
        : "text-white/70 hover:bg-white/[0.06] hover:text-white"
    }`;

    if (isPageLink) {
      return (
        <Link
          key={link.href}
          to={link.href}
          onClick={() => {
            setOpen(false);
            setContactMenuOpen(false);
          }}
          className={mobile ? mobileClass : desktopClass}
        >
          {link.label}
        </Link>
      );
    }

    if (!isHomePage) {
      return (
        <Link
          key={link.href}
          to={`/${link.href}`}
          onClick={() => {
            setOpen(false);
            setContactMenuOpen(false);
          }}
          className={mobile ? mobileClass : desktopClass}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <a
        key={link.href}
        href={link.href}
        onClick={() => handleSectionClick(link.href)}
        className={mobile ? mobileClass : desktopClass}
      >
        {link.label}
      </a>
    );
  }

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-4 transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <a
          href="/"
          onClick={handleLogoClick}
          className={`flex min-w-0 items-center gap-3 transition-all duration-500 ${
            scrolled ? "scale-[0.94]" : "scale-100"
          }`}
          aria-label="Mergi sus pe pagină"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)]">
            {siteConfig.brand.logoLetter}
          </span>

          <span className="hidden text-sm font-bold tracking-[-0.03em] text-white sm:block">
            {siteConfig.brand.name}
          </span>
        </a>

        <div
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-white/10 bg-black/55 p-1 text-[13px] font-medium text-white/55 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 md:flex ${
            scrolled ? "scale-[0.96]" : "scale-100"
          }`}
        >
          {links.map((link) => renderNavItem(link))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div ref={contactMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setContactMenuOpen((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-semibold text-white/65 transition-all duration-500 hover:bg-white/[0.08] hover:text-white ${
                scrolled ? "scale-[0.96]" : "scale-100"
              }`}
              aria-expanded={contactMenuOpen}
              aria-haspopup="menu"
            >
              <Mail size={15} />
              Contact
            </button>

            {contactMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+0.85rem)] w-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080808]/95 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
                <div className="border-b border-white/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/30">
                    Contact rapid
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Alege metoda potrivită pentru a discuta rapid despre
                    proiect.
                  </p>
                </div>

                <div className="p-2">
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-white/[0.06]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/65 transition group-hover:bg-white group-hover:text-black">
                      <Mail size={17} />
                    </span>

                    <span>
                      <span className="block text-sm font-semibold text-white">
                        Email
                      </span>
                      <span className="block text-xs text-white/40">
                        {email}
                      </span>
                    </span>
                  </a>

                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-white/[0.06]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/65 transition group-hover:bg-white group-hover:text-black">
                      <MessageCircle size={17} />
                    </span>

                    <span>
                      <span className="block text-sm font-semibold text-white">
                        WhatsApp
                      </span>
                      <span className="block text-xs text-white/40">
                        {phone}
                      </span>
                    </span>
                  </a>

                  <a
                    href={`tel:${phoneDigits}`}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-white/[0.06]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/65 transition group-hover:bg-white group-hover:text-black">
                      <Phone size={17} />
                    </span>

                    <span>
                      <span className="block text-sm font-semibold text-white">
                        Telefon
                      </span>
                      <span className="block text-xs text-white/40">
                        Sună direct
                      </span>
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={handleOfferClick}
                    className="group mt-2 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white px-4 py-3 text-left text-black transition hover:bg-white/90"
                  >
                    <span>
                      <span className="block text-sm font-semibold">
                        Deschide formularul
                      </span>
                      <span className="block text-xs text-black/55">
                        Pentru o cerere mai detaliată
                      </span>
                    </span>

                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleOfferClick}
            className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_10px_35px_rgba(255,255,255,0.08)] transition-all duration-500 hover:scale-[1.03] hover:bg-white/90 ${
              scrolled ? "scale-[0.96]" : "scale-100"
            }`}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition duration-700 group-hover:translate-x-full" />

            <span className="relative">Cere ofertă</span>

            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition group-hover:rotate-45">
              <ArrowUpRight size={14} />
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-2xl md:hidden"
          aria-label="Deschide meniul"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/90 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => renderNavItem(link, true))}

            <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/[0.08] hover:text-white"
              >
                <Mail size={16} />
                Email
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/[0.08] hover:text-white"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              <button
                type="button"
                onClick={handleOfferClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Cere ofertă
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;