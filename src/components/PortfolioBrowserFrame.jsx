import { useMemo, useRef } from "react";
import {
  ArrowRight,
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  HeartPulse,
  Home,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  User,
  Utensils,
  Zap,
} from "lucide-react";

const iconMap = {
  kineto: [HeartPulse, ShieldCheck, Zap],
  beauty: [Scissors, Sparkles, Star],
  transport: [Truck, Clock, ShieldCheck],
  restaurant: [Utensils, Star, Calendar],
  personal: [Sparkles, Zap, User],
  shop: [Home, ShoppingBag, Package],
};

function getMiniSite(project) {
  const fallbackItems = (project.features || []).slice(0, 3).map((feature) => ({
    title: feature,
    text: "Secțiune construită pentru claritate, conversie și navigare rapidă.",
  }));

  return {
    layout: project.miniSite?.layout || project.id || "default",
    brand: project.miniSite?.brand || project.title,
    subtitle: project.miniSite?.subtitle || project.category,
    eyebrow: project.miniSite?.eyebrow || project.category,
    headline: project.miniSite?.headline || project.title,
    accent: project.miniSite?.accent || "Design responsive",
    description: project.miniSite?.description || project.text,
    primaryCta: project.miniSite?.primaryCta || "Cere ofertă",
    secondaryCta: project.miniSite?.secondaryCta || "Vezi serviciile",
    contact: project.miniSite?.contact || {
      address: "Brașov, România",
      phone: "+40 700 000 000",
      email: "contact@demo.ro",
    },
    nav: project.miniSite?.nav || ["Acasă", "Servicii", "Contact"],
    items: project.miniSite?.items?.length ? project.miniSite.items : fallbackItems,
    stats: project.miniSite?.stats?.length
      ? project.miniSite.stats
      : [
          { value: "10+", label: "proiecte" },
          { value: "98%", label: "claritate" },
          { value: "24h", label: "contact" },
          { value: "100%", label: "responsive" },
        ],
  };
}

function scrollToSection(ref, section) {
  const node = ref.current?.querySelector(`[data-mini-section="${section}"]`);
  node?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function NavButton({ children, onClick, dark = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[0.62rem] font-semibold transition hover:opacity-100 md:text-xs ${
        dark ? "text-white/70 hover:text-white" : "text-black/65 hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

function MiniLogo({ mini, dark = false }) {
  const initials = mini.brand
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-[0.7rem] font-black ${
          dark
            ? "border-white/15 bg-white/[0.08] text-white"
            : "border-black/10 bg-black text-white"
        }`}
      >
        {initials}
      </span>
      <span>
        <span
          className={`block text-xs font-black leading-none md:text-sm ${
            dark ? "text-white" : "text-black"
          }`}
        >
          {mini.brand}
        </span>
        <span
          className={`mt-1 block text-[0.55rem] uppercase tracking-[0.22em] ${
            dark ? "text-white/45" : "text-black/45"
          }`}
        >
          {mini.subtitle}
        </span>
      </span>
    </div>
  );
}

function ServiceCards({ mini, projectId, dark = false, compact = false }) {
  const icons = iconMap[projectId] || iconMap.personal;

  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-1" : "md:grid-cols-3"}`}>
      {mini.items.slice(0, 3).map((item, index) => {
        const Icon = icons[index % icons.length];

        return (
          <article
            key={item.title}
            className={`rounded-2xl border p-4 ${
              dark
                ? "border-white/10 bg-white/[0.055] text-white"
                : "border-black/5 bg-white text-black shadow-sm"
            }`}
          >
            <span
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${
                dark ? "bg-white/10 text-white" : "bg-black text-white"
              }`}
            >
              <Icon size={17} />
            </span>
            <h4 className="text-sm font-bold">{item.title}</h4>
            <p className={`mt-2 text-xs leading-5 ${dark ? "text-white/55" : "text-black/55"}`}>
              {item.text}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function StatsRow({ mini, dark = false }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 rounded-3xl border p-4 md:grid-cols-4 ${
        dark ? "border-white/10 bg-white/[0.045]" : "border-black/5 bg-white shadow-sm"
      }`}
    >
      {mini.stats.slice(0, 4).map((stat) => (
        <div key={`${stat.value}-${stat.label}`}>
          <p className={`text-xl font-black ${dark ? "text-white" : "text-black"}`}>
            {stat.value}
          </p>
          <p className={`text-[0.65rem] leading-4 ${dark ? "text-white/45" : "text-black/45"}`}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function KinetoMiniSite({ mini, projectId, contentRef, isMobile }) {
  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#f7fbfa] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-emerald-950/10 bg-white/90 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <MiniLogo mini={mini} />
          <nav className="hidden items-center gap-5 md:flex">
            {mini.nav.map((item) => (
              <NavButton key={item} onClick={() => scrollToSection(contentRef, item.includes("Servicii") ? "services" : "home")}>
                {item}
              </NavButton>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => scrollToSection(contentRef, "contact")}
            className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
          >
            {mini.primaryCta}
          </button>
        </div>
      </header>

      <section data-mini-section="home" className="grid min-h-[25rem] gap-6 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div className="flex flex-col justify-center">
          <p className="mb-3 inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-[0.65rem] font-bold text-emerald-700">
            {mini.eyebrow}
          </p>
          <h3 className="max-w-xl text-3xl font-black tracking-[-0.05em] md:text-5xl">
            {mini.headline}
            <span className="block font-serif italic text-emerald-700">{mini.accent}</span>
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">{mini.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => scrollToSection(contentRef, "contact")} className="rounded-full bg-slate-950 px-5 py-3 text-xs font-bold text-white">
              {mini.primaryCta}
            </button>
            <button type="button" onClick={() => scrollToSection(contentRef, "services")} className="rounded-full border border-slate-200 px-5 py-3 text-xs font-bold text-slate-800">
              {mini.secondaryCta}
            </button>
          </div>
        </div>

        <div className="relative min-h-[18rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-100 via-cyan-50 to-white p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,.25),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(14,165,233,.18),transparent_35%)]" />
          <div className="relative ml-auto h-full max-w-md rounded-[1.6rem] border border-white/80 bg-white/55 p-5 shadow-2xl backdrop-blur">
            <div className="h-36 rounded-[1.2rem] bg-gradient-to-br from-slate-800 via-emerald-900 to-cyan-800" />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <HeartPulse size={20} className="text-emerald-600" />
                <p className="mt-2 text-xs font-bold">Evaluare posturală</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <Calendar size={20} className="text-emerald-600" />
                <p className="mt-2 text-xs font-bold">Programări rapide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-mini-section="services" className="p-5 md:p-8">
        <StatsRow mini={mini} />
        <h3 className="mt-8 text-2xl font-black tracking-[-0.04em]">Servicii de recuperare</h3>
        <div className="mt-4">
          <ServiceCards mini={mini} projectId={projectId} compact={isMobile} />
        </div>
      </section>

      <section data-mini-section="contact" className="p-5 md:p-8">
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
          <h3 className="text-2xl font-black">Programează o evaluare</h3>
          <p className="mt-2 text-sm text-white/55">{mini.contact.phone} · {mini.contact.email}</p>
        </div>
      </section>
    </div>
  );
}

function BeautyMiniSite({ mini, projectId, contentRef, isMobile }) {
  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#f7f1eb] text-[#1a130d]">
      <section data-mini-section="home" className="relative min-h-[28rem] overflow-hidden bg-[#100c09] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(210,172,105,.35),transparent_35%),linear-gradient(90deg,rgba(0,0,0,.95),rgba(0,0,0,.6),rgba(0,0,0,.25))]" />
        <header className="relative z-10 flex items-center justify-between px-6 py-5">
          <MiniLogo mini={mini} dark />
          <nav className="hidden items-center gap-6 md:flex">
            {mini.nav.map((item) => (
              <NavButton dark key={item} onClick={() => scrollToSection(contentRef, item.includes("Servicii") ? "services" : "home")}>
                {item}
              </NavButton>
            ))}
          </nav>
          <button type="button" onClick={() => scrollToSection(contentRef, "contact")} className="rounded-full border border-[#d8b16b] px-4 py-2 text-xs font-bold text-[#f3d49a]">
            {mini.primaryCta}
          </button>
        </header>

        <div className="relative z-10 max-w-3xl px-6 py-12 md:py-20">
          <p className="font-serif text-xl italic text-[#d8b16b]">Creative styling</p>
          <h3 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">{mini.headline}</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#d8b16b]">{mini.eyebrow}</p>
          <div className="mt-7 flex gap-3">
            <button type="button" onClick={() => scrollToSection(contentRef, "contact")} className="rounded-none border border-white/60 px-5 py-3 text-xs font-bold text-white">
              {mini.primaryCta}
            </button>
            <button type="button" onClick={() => scrollToSection(contentRef, "services")} className="rounded-full bg-[#d8b16b] px-5 py-3 text-xs font-bold text-black">
              {mini.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      <section data-mini-section="services" className="grid gap-6 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-56 rounded-t-[5rem] bg-gradient-to-br from-[#ead6c0] to-[#5e3e2b]" />
          <div className="mt-12 h-56 rounded-t-[5rem] bg-gradient-to-br from-[#f3d49a] to-[#24150f]" />
        </div>
        <div className="rounded-[2rem] bg-white p-6">
          <p className="font-serif text-lg italic text-[#b58a42]">What ifs</p>
          <h3 className="text-3xl font-black uppercase tracking-[-0.04em]">We understand your style</h3>
          <p className="mt-3 text-sm leading-6 text-black/55">{mini.description}</p>
          <StatsRow mini={mini} />
        </div>
      </section>

      <section className="p-6 md:p-10">
        <h3 className="text-center font-serif text-3xl">Explore our services</h3>
        <div className="mt-6">
          <ServiceCards mini={mini} projectId={projectId} compact={isMobile} />
        </div>
      </section>

      <section data-mini-section="contact" className="px-6 pb-10">
        <div className="rounded-[2rem] bg-[#1a130d] p-6 text-white">
          <p className="text-sm text-white/60">{mini.contact.phone}</p>
          <h3 className="mt-2 text-2xl font-black">{mini.primaryCta}</h3>
        </div>
      </section>
    </div>
  );
}

function TransportMiniSite({ mini, projectId, contentRef, isMobile }) {
  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-black text-white">
      <section data-mini-section="home" className="relative min-h-[31rem] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_28%,rgba(245,176,84,.42),transparent_30%),linear-gradient(120deg,rgba(0,0,0,.95),rgba(0,0,0,.45)),linear-gradient(180deg,#1c2731,#0a0a0a)]" />
        <div className="absolute bottom-0 right-0 h-64 w-[70%] rounded-tl-[10rem] bg-gradient-to-br from-slate-600/40 via-slate-800 to-transparent" />
        <header className="relative z-10 flex items-center justify-between px-6 py-5">
          <MiniLogo mini={mini} dark />
          <nav className="hidden items-center gap-6 md:flex">
            {mini.nav.map((item) => (
              <NavButton dark key={item} onClick={() => scrollToSection(contentRef, item.includes("Servicii") ? "services" : "home")}>
                {item}
              </NavButton>
            ))}
          </nav>
          <button type="button" onClick={() => scrollToSection(contentRef, "contact")} className="rounded-lg border border-white/45 px-4 py-2 text-xs font-bold">
            {mini.primaryCta}
          </button>
        </header>

        <div className="relative z-10 px-6 py-14 md:max-w-xl md:py-20">
          <p className="text-xs uppercase tracking-[0.24em] text-white/70">{mini.eyebrow}</p>
          <h3 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">{mini.headline}</h3>
          <p className="mt-4 text-sm leading-6 text-white/65">{mini.description}</p>
          <button type="button" onClick={() => scrollToSection(contentRef, "contact")} className="mt-7 rounded-lg border border-white/55 px-5 py-3 text-xs font-bold">
            {mini.primaryCta} <ArrowRight className="ml-2 inline" size={14} />
          </button>
        </div>

        <div className="relative z-10 grid gap-3 px-6 pb-8 md:grid-cols-3">
          {mini.items.map((item) => (
            <div key={item.title} className="flex items-center gap-3 border-t border-white/15 pt-4">
              <Truck size={22} className="text-[#e8c38d]" />
              <span className="text-xs text-white/70">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section data-mini-section="services" className="grid gap-7 p-6 md:grid-cols-[0.85fr_1.15fr] md:p-10">
        <h3 className="text-3xl font-black tracking-[-0.04em]">Logistică fără pași complicați</h3>
        <p className="text-sm leading-6 text-white/55">{mini.description}</p>
        <div className="md:col-span-2">
          <ServiceCards mini={mini} projectId={projectId} dark compact={isMobile} />
        </div>
        <div className="md:col-span-2">
          <StatsRow mini={mini} dark />
        </div>
      </section>

      <section data-mini-section="contact" className="p-6 md:p-10">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-[#241f19] p-6 md:grid-cols-[1fr_0.8fr]">
          <div>
            <h3 className="text-2xl font-black">Calculează transportul</h3>
            <p className="mt-2 text-sm text-white/55">Lasă o cerere și revenim cu ofertă.</p>
          </div>
          <div className="space-y-2 text-sm text-white/70">
            <p>{mini.contact.phone}</p>
            <p>{mini.contact.email}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function RestaurantMiniSite({ mini, projectId, contentRef, isMobile }) {
  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#052b24] text-white">
      <section data-mini-section="home" className="relative min-h-[30rem] overflow-hidden p-6">
        <header className="relative z-20 flex items-center justify-between">
          <MiniLogo mini={mini} dark />
          <nav className="hidden items-center gap-6 md:flex">
            {mini.nav.map((item) => (
              <NavButton dark key={item} onClick={() => scrollToSection(contentRef, item.includes("Meniu") ? "services" : "home")}>
                {item}
              </NavButton>
            ))}
          </nav>
          <button type="button" onClick={() => scrollToSection(contentRef, "contact")} className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold">
            {mini.secondaryCta}
          </button>
        </header>

        <div className="relative z-10 mt-14 grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm text-orange-300">{mini.eyebrow}</p>
            <h3 className="mt-3 font-serif text-5xl font-black text-orange-300 md:text-6xl">{mini.headline}</h3>
            <p className="mt-4 text-sm leading-6 text-white/62">{mini.description}</p>
            <button type="button" onClick={() => scrollToSection(contentRef, "services")} className="mt-7 rounded-full bg-orange-500 px-5 py-3 text-xs font-black text-white">
              {mini.primaryCta}
            </button>
          </div>

          <div className="relative min-h-[18rem] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,.95),rgba(127,29,29,.7),transparent_65%)]">
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-[18px] border-[#14100b] bg-gradient-to-br from-orange-400 via-red-500 to-yellow-300 shadow-2xl" />
            {["✦", "●", "✺", "✹", "✦", "●"].map((item, index) => (
              <span key={`${item}-${index}`} className="absolute text-orange-200" style={{ left: `${12 + index * 14}%`, top: `${18 + (index % 3) * 19}%` }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section data-mini-section="services" className="p-6 md:p-10">
        <h3 className="text-center font-serif text-3xl">Meniu popular</h3>
        <div className="mt-6">
          <ServiceCards mini={mini} projectId={projectId} dark compact={isMobile} />
        </div>
      </section>

      <section className="p-6 md:p-10">
        <StatsRow mini={mini} dark />
      </section>

      <section data-mini-section="contact" className="p-6 md:p-10">
        <div className="rounded-[2rem] bg-[#f97316] p-6 text-white">
          <h3 className="text-2xl font-black">{mini.secondaryCta}</h3>
          <p className="mt-2 text-sm">{mini.contact.phone} · {mini.contact.email}</p>
        </div>
      </section>
    </div>
  );
}

function PersonalMiniSite({ mini, projectId, contentRef, isMobile }) {
  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#090806] text-[#d9c8a6]">
      <section data-mini-section="home" className="min-h-[30rem] border border-[#30281c] p-6">
        <header className="flex items-center justify-center gap-4">
          <div className="rounded-full border border-[#3c3224] bg-[#11100d] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em]">
            {mini.brand}
          </div>
          <nav className="hidden gap-5 md:flex">
            {mini.nav.map((item) => (
              <NavButton dark key={item} onClick={() => scrollToSection(contentRef, item.includes("Servicii") ? "services" : "home")}>
                {item}
              </NavButton>
            ))}
          </nav>
          <button type="button" onClick={() => scrollToSection(contentRef, "contact")} className="rounded bg-[#d9c8a6] px-4 py-2 text-xs font-bold text-black">
            Let’s talk
          </button>
        </header>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d9c8a6]/45">{mini.eyebrow}</p>
          <h3 className="mt-5 text-5xl font-light tracking-[-0.07em] md:text-7xl">
            Web Designer <span className="font-serif italic">& Developer</span>
          </h3>
          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#d9c8a6]/50">{mini.description}</p>
          <button type="button" onClick={() => scrollToSection(contentRef, "services")} className="mt-7 rounded-full border border-[#d9c8a6]/20 px-5 py-3 text-xs font-bold">
            My services
          </button>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-3 md:grid-cols-3">
          <ServiceCards mini={mini} projectId={projectId} dark compact={isMobile} />
        </div>
      </section>

      <section data-mini-section="services" className="p-6 md:p-10">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-3xl font-light">Selected Work</h3>
          <button type="button" className="rounded-full border border-[#d9c8a6]/20 px-3 py-1 text-xs">See all</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {["Space", "Nova", "Sonic", "Solar"].map((work) => (
            <div key={work} className="h-40 rounded-2xl border border-[#d9c8a6]/10 bg-gradient-to-br from-[#242018] to-[#090806] p-4">
              <p className="mt-24 text-sm">{work}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-mini-section="contact" className="p-6 md:p-10">
        <StatsRow mini={mini} dark />
      </section>
    </div>
  );
}

function ShopMiniSite({ mini, projectId, contentRef, isMobile }) {
  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-white text-black">
      <section data-mini-section="home" className="p-5">
        <header className="flex items-center justify-between rounded-full bg-white px-6 py-4 shadow-lg">
          <MiniLogo mini={mini} />
          <nav className="hidden items-center gap-6 md:flex">
            {mini.nav.map((item) => (
              <NavButton key={item} onClick={() => scrollToSection(contentRef, item.includes("Shop") ? "services" : "home")}>
                {item}
              </NavButton>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ShoppingBag size={17} />
            <Menu size={17} className="md:hidden" />
          </div>
        </header>

        <div className="mt-5 flex min-h-[24rem] items-center justify-center rounded-[2rem] bg-gradient-to-br from-stone-200 via-stone-100 to-[#d7c5a5] p-8 text-center">
          <h3 className="max-w-lg text-4xl font-semibold tracking-[-0.05em] md:text-5xl">{mini.headline}</h3>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 bg-black p-4 text-white md:grid-cols-4">
          {mini.stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 text-xs">
              <CheckCircle size={17} />
              <span>{stat.value} {stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section data-mini-section="services" className="p-5 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          {mini.items.map((item) => (
            <div key={item.title} className="h-56 rounded-[1.5rem] bg-stone-100 p-5">
              <div className="h-36 rounded-[1.2rem] bg-gradient-to-br from-stone-300 to-stone-50" />
              <p className="mt-4 text-sm font-bold">{item.title}</p>
              <p className="text-xs text-black/45">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 p-5 md:grid-cols-2 md:p-8">
        <div className="flex flex-col justify-center">
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-black/35">{mini.eyebrow}</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">{mini.accent}</h3>
          <p className="mt-3 text-sm leading-6 text-black/55">{mini.description}</p>
          <button type="button" onClick={() => scrollToSection(contentRef, "contact")} className="mt-5 w-fit rounded-full bg-black px-5 py-3 text-xs font-bold text-white">
            {mini.primaryCta}
          </button>
        </div>
        <div className="min-h-[17rem] rounded-[2rem] bg-gradient-to-br from-stone-300 to-stone-100" />
      </section>

      <section data-mini-section="contact" className="bg-black p-6 text-white">
        <h3 className="text-2xl font-black">Bestseller</h3>
        <p className="mt-2 text-sm text-white/55">{mini.contact.email}</p>
      </section>
    </div>
  );
}


function MiniSiteCardPreview({ project }) {
  const mini = getMiniSite(project);
  const darkLayouts = ["beauty", "transport", "restaurant", "personal"];
  const isDark = darkLayouts.includes(mini.layout);
  const isBeauty = mini.layout === "beauty";
  const isTransport = mini.layout === "transport";
  const isRestaurant = mini.layout === "restaurant";
  const isPersonal = mini.layout === "personal";
  const isShop = mini.layout === "shop";
  const isKineto = mini.layout === "kineto";

  const accentClass = isKineto
    ? "bg-emerald-100 text-emerald-700"
    : isShop
    ? "bg-emerald-100 text-emerald-700"
    : isBeauty
    ? "bg-pink-400/15 text-pink-100"
    : isTransport
    ? "bg-amber-400/15 text-amber-100"
    : isRestaurant
    ? "bg-orange-500/20 text-orange-200"
    : isPersonal
    ? "bg-[#d9c8a6]/15 text-[#d9c8a6]"
    : "bg-white/10 text-white";

  const heroBackground = isKineto
    ? "bg-[radial-gradient(circle_at_82%_38%,rgba(20,184,166,.28),transparent_24%),linear-gradient(135deg,#ffffff,#f1fbf7)]"
    : isShop
    ? "bg-[radial-gradient(circle_at_78%_34%,rgba(132,204,22,.20),transparent_25%),linear-gradient(135deg,#ffffff,#f7f7f3)]"
    : isBeauty
    ? "bg-[radial-gradient(circle_at_74%_34%,rgba(244,114,182,.28),transparent_28%),linear-gradient(135deg,#050505,#21160f)]"
    : isTransport
    ? "bg-[radial-gradient(circle_at_80%_35%,rgba(245,158,11,.24),transparent_28%),linear-gradient(135deg,#020617,#12100c)]"
    : isRestaurant
    ? "bg-[radial-gradient(circle_at_84%_40%,rgba(249,115,22,.32),transparent_26%),linear-gradient(135deg,#041b17,#052e25)]"
    : isPersonal
    ? "bg-[radial-gradient(circle_at_72%_25%,rgba(217,200,166,.18),transparent_28%),linear-gradient(135deg,#080705,#0f0d09)]"
    : "bg-black";

  const initials = mini.brand
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`relative h-full w-full overflow-hidden ${heroBackground} ${isDark ? "text-white" : "text-slate-950"}`}>
      <div className={isDark ? "absolute inset-0 bg-black/20" : "absolute inset-0 bg-white/5"} />

      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
        <header className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.62rem] font-black ${
                isDark ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-black text-white"
              }`}
            >
              {initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black leading-none">{mini.brand}</span>
              <span className={`mt-1 block max-w-[7rem] truncate text-[0.52rem] uppercase tracking-[0.22em] ${isDark ? "text-white/45" : "text-black/45"}`}>
                {mini.subtitle}
              </span>
            </span>
          </div>

          <nav className={`hidden shrink-0 items-center gap-4 pt-1 text-[0.6rem] font-semibold sm:flex ${isDark ? "text-white/65" : "text-black/60"}`}>
            {mini.nav.slice(0, 3).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
        </header>

        <main className="mt-auto max-w-[78%] pb-1">
          <p className={`mb-3 inline-flex max-w-full truncate rounded-full px-3 py-1 text-[0.5rem] font-black uppercase tracking-[0.13em] ${accentClass}`}>
            {mini.eyebrow}
          </p>
          <h3
            className={`line-clamp-3 text-[1.75rem] font-black leading-[0.92] tracking-[-0.06em] sm:text-[2rem] ${
              isBeauty || isRestaurant ? "font-serif" : ""
            } ${isPersonal ? "font-light text-[#d9c8a6]" : ""}`}
          >
            {mini.headline}
          </h3>
          <p className={`mt-3 line-clamp-2 text-xs leading-5 ${isDark ? "text-white/58" : "text-black/55"}`}>
            {mini.description}
          </p>
        </main>
      </div>
    </div>
  );
}

function MiniSiteRenderer({ project, size, device }) {
  const contentRef = useRef(null);
  const mini = useMemo(() => getMiniSite(project), [project]);
  const isMobile = device === "mobile" || size === "card";
  const commonProps = { mini, projectId: project.id, contentRef, isMobile };

  if (mini.layout === "kineto") return <KinetoMiniSite {...commonProps} />;
  if (mini.layout === "beauty") return <BeautyMiniSite {...commonProps} />;
  if (mini.layout === "transport") return <TransportMiniSite {...commonProps} />;
  if (mini.layout === "restaurant") return <RestaurantMiniSite {...commonProps} />;
  if (mini.layout === "personal") return <PersonalMiniSite {...commonProps} />;
  if (mini.layout === "shop") return <ShopMiniSite {...commonProps} />;

  return <KinetoMiniSite {...commonProps} />;
}

function PortfolioBrowserFrame({
  project,
  size = "card",
  device = "desktop",
  interactive = false,
}) {
  const isCard = size === "card";
  const frameRef = useRef(null);

  return (
    <div
      ref={frameRef}
      className={`h-full w-full overflow-hidden border border-white/10 bg-white shadow-2xl ${
        isCard ? "rounded-[1.5rem]" : "rounded-[1.7rem]"
      }`}
    >
      <div
        className={`flex items-center gap-2 border-b px-4 ${
          isCard ? "h-9" : "h-12"
        } ${project.theme?.browserBar || "bg-slate-50"} ${
          project.theme?.browserBorder || "border-slate-200"
        }`}
      >
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />

        <div
          className={`ml-3 flex-1 rounded-full ${
            isCard ? "h-4" : "h-5"
          } ${project.theme?.browserLine || "bg-slate-200"}`}
        />
      </div>

      <div
        className={`relative ${isCard ? "h-[calc(100%-2.25rem)]" : "h-[calc(100%-3rem)]"} ${
          interactive ? "" : "pointer-events-none select-none"
        }`}
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
      >
        {isCard ? (
          <MiniSiteCardPreview project={project} />
        ) : (
          <MiniSiteRenderer project={project} size={size} device={device} />
        )}
      </div>
    </div>
  );
}

export default PortfolioBrowserFrame;
