import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { siteConfig } from "../data/siteConfig";

function Navbar({ onOpenContact }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const location = useLocation();
  const links = siteConfig.navigation;

  useEffect(() => {
    let ticking = false;

    function getActiveSection() {
      const validSections = links
        .map((link) => link.sectionHref || link.href)
        .filter((href) => href.startsWith("#") && href !== "#contact");

      const sections = validSections
        .map((href) => {
          const section = document.querySelector(href);

          if (!section) return null;

          const rect = section.getBoundingClientRect();

          return {
            href,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
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

  function handleContactClick() {
    setOpen(false);
    onOpenContact?.();
  }

  function handleSectionClick(href) {
    setOpen(false);

    if (href !== "#contact") {
      setActiveSection(href);
    }
  }

  function renderNavItem(link, mobile = false) {
    const isContact = link.href === "#contact";
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

    if (isContact) {
      return (
        <button
          key={link.href}
          type="button"
          onClick={handleContactClick}
          className={mobile ? mobileClass : desktopClass}
        >
          {link.label}
        </button>
      );
    }

    if (isPageLink) {
      return (
        <Link
          key={link.href}
          to={link.href}
          onClick={() => setOpen(false)}
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
          onClick={() => setOpen(false)}
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
        <Link
          to="/"
          onClick={() => {
            setOpen(false);
            setActiveSection("#home");
          }}
          className={`flex min-w-0 items-center gap-3 transition-all duration-500 ${
            scrolled ? "scale-[0.94]" : "scale-100"
          }`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)]">
            {siteConfig.brand.logoLetter}
          </span>

          <span className="hidden text-sm font-bold tracking-[-0.03em] text-white sm:block">
            {siteConfig.brand.name}
          </span>
        </Link>

        <div
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-white/10 bg-black/55 p-1 text-[13px] font-medium text-white/55 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 md:flex ${
            scrolled ? "scale-[0.96]" : "scale-100"
          }`}
        >
          {links.map((link) => renderNavItem(link))}
        </div>

        <button
          type="button"
          onClick={handleContactClick}
          className={`hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_10px_35px_rgba(255,255,255,0.08)] transition-all duration-500 hover:scale-[1.03] hover:bg-white/90 md:inline-flex ${
            scrolled ? "scale-[0.96]" : "scale-100"
          }`}
        >
          Cere ofertă
          <ArrowUpRight size={16} />
        </button>

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

            <button
              type="button"
              onClick={handleContactClick}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Cere ofertă
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;