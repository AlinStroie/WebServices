import { CalendarDays, Gem, MapPin, Phone, Scissors, Sparkles, Wand2 } from "lucide-react";
import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

const serviceIcons = [Scissors, Wand2, Sparkles];

function targetForNav(item) {
  if (item.includes("Galer")) return "gallery";
  return navTarget(item);
}

function SalonVisual() {
  return (
    <div className="relative min-h-[22rem] overflow-hidden bg-[#241515]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,236,214,.18),transparent_42%),linear-gradient(90deg,rgba(36,21,21,.15),rgba(36,21,21,.86))]" />
      <div className="absolute right-8 top-8 h-56 w-44 border border-[#f2d6bd]/35 bg-[#c98979]" />
      <div className="absolute right-14 top-14 h-44 w-32 bg-[#f7e5d5]" />
      <div className="absolute right-20 top-20 h-24 w-20 rounded-full bg-[#8e4f53]" />
      <div className="absolute right-24 top-28 h-16 w-12 rounded-full bg-[#f0c5a5]" />
      <div className="absolute bottom-10 left-10 h-28 w-28 border-[20px] border-[#d6a064]" />
      <div className="absolute bottom-8 right-8 border border-[#f2d6bd]/25 bg-[#1b1010]/80 p-4 text-[#f7e5d5]">
        <p className="text-[0.65rem] font-bold">Next slot</p>
        <p className="mt-1 text-2xl font-black">18:30</p>
      </div>
    </div>
  );
}

function ServiceTile({ item, index }) {
  const Icon = serviceIcons[index % serviceIcons.length];

  return (
    <article className="grid gap-4 border-b border-[#e8cbb5] py-5 last:border-b-0 md:grid-cols-[auto_1fr_auto] md:items-center">
      <span className="grid h-11 w-11 place-items-center bg-[#241515] text-[#f6d8ba]">
        <Icon size={19} />
      </span>
      <div>
        <h4 className="font-serif text-xl font-semibold text-[#241515]">{item.title}</h4>
        <p className="mt-1 text-xs leading-5 text-[#7c6259]">{item.text}</p>
      </div>
      <span className="text-xs font-black text-[#b66d5f]">0{index + 1}</span>
    </article>
  );
}

function PackageCard({ item, index }) {
  const colors = ["bg-[#f7e5d5]", "bg-[#e9c5bb]", "bg-[#d6a064]"];

  return (
    <article className={`border border-[#241515]/15 p-5 ${colors[index % colors.length]}`}>
      <div className="mb-5 flex items-center justify-between">
        <Gem size={18} className="text-[#241515]" />
        <span className="text-xs font-black text-[#8e4f53]">Ritual 0{index + 1}</span>
      </div>
      <h4 className="font-serif text-2xl font-semibold leading-tight text-[#241515]">{item.title}</h4>
      <p className="mt-3 text-xs leading-5 text-[#6f4f48]">{item.text}</p>
    </article>
  );
}

export default function BeautySiteMockup({ mini, projectId, contentRef }) {
  const services = mini.items || [];
  const packages = mini.packages || services;
  const highlights = mini.highlights || services.slice(0, 2);

  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#f9efe3] text-[#241515]">
      <header className="sticky top-0 z-30 border-b border-[#e8cbb5] bg-[#f9efe3]/95 px-5 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <MiniLogo mini={mini} />
          <nav className="hidden items-center gap-5 md:flex">
            {mini.nav?.map((item) => (
              <NavButton key={item} onClick={() => scrollToSection(contentRef, targetForNav(item))}>
                {item}
              </NavButton>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => scrollToSection(contentRef, "contact")}
            className="bg-[#241515] px-4 py-2 text-xs font-black text-[#f7e5d5]"
          >
            {mini.primaryCta}
          </button>
        </div>
      </header>

      <main>
        <section data-mini-section="home" className="grid bg-[#f9efe3] md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between border-b border-[#e8cbb5] p-6 md:border-b-0 md:border-r md:p-10">
            <div>
              <p className="text-xs font-black uppercase text-[#b66d5f]">{mini.eyebrow}</p>
              <h1 className="mt-5 max-w-xl font-serif text-5xl font-semibold leading-none text-[#241515] md:text-7xl">
                {mini.headline}
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#7c6259]">{mini.description}</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "contact")}
                className="inline-flex items-center justify-center gap-2 bg-[#8e4f53] px-5 py-3 text-xs font-black text-white"
              >
                {mini.primaryCta}
                <CalendarDays size={15} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "services")}
                className="border border-[#8e4f53]/30 bg-white px-5 py-3 text-xs font-black text-[#8e4f53]"
              >
                {mini.secondaryCta}
              </button>
            </div>
          </div>
          <SalonVisual />
        </section>

        <section data-mini-section="services" className="grid border-y border-[#e8cbb5] bg-[#fff8ef] md:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-[#e8cbb5] p-6 md:border-b-0 md:border-r md:p-10">
            <p className="text-xs font-black uppercase text-[#b66d5f]">{mini.subtitle}</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight">{mini.accent}</h2>
            <p className="mt-4 text-sm leading-6 text-[#7c6259]">{mini.featureText || mini.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {highlights.slice(0, 2).map((item) => (
                <div key={`${projectId}-highlight-${item.title}`} className="border border-[#e8cbb5] bg-[#f9efe3] p-4">
                  <p className="font-serif text-lg font-semibold">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#7c6259]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-5 md:px-8">
            {services.slice(0, 3).map((item, index) => (
              <ServiceTile key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section data-mini-section="gallery" className="px-6 py-10 md:px-10">
          <div className="mb-6 flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase text-[#b66d5f]">Pachete</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold">Ritualuri usor de ales</h2>
            </div>
            <Sparkles size={26} className="hidden text-[#d6a064] md:block" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {packages.slice(0, 3).map((item, index) => (
              <PackageCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section className="grid border-y border-[#e8cbb5] bg-[#241515] text-[#f7e5d5] md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 md:p-10">
            <p className="text-xs font-black uppercase text-[#d6a064]">Experience</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-tight">
              {mini.bottomTitle || "Beauty experience, simple booking."}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
              {mini.bottomText || "Clear packages, warm visuals and conversion-focused booking actions."}
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-white/10 md:border-l md:border-t-0">
            {mini.stats?.slice(0, 4).map((stat) => (
              <div key={stat.label} className="border-b border-r border-white/10 p-5">
                <p className="font-serif text-2xl font-semibold text-[#d6a064]">{stat.value}</p>
                <p className="mt-1 text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section data-mini-section="contact" className="grid bg-[#fff8ef] md:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 md:p-10">
            <p className="text-xs font-black uppercase text-[#b66d5f]">Programari</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">{mini.primaryCta}</h2>
          </div>
          <div className="grid gap-3 border-t border-[#e8cbb5] p-6 md:border-l md:border-t-0 md:p-10">
            <p className="flex items-center gap-3 border border-[#e8cbb5] bg-white p-4 text-sm text-[#7c6259]">
              <Phone size={16} className="text-[#8e4f53]" /> {mini.contact?.phone}
            </p>
            <p className="flex items-center gap-3 border border-[#e8cbb5] bg-white p-4 text-sm text-[#7c6259]">
              <MapPin size={16} className="text-[#8e4f53]" /> {mini.contact?.address}
            </p>
            <button type="button" className="bg-[#241515] px-5 py-3 text-xs font-black text-[#f7e5d5]">
              Contacteaza salonul
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
