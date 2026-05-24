import { ArrowRight, ChevronDown, Leaf, Mail, Star, Utensils } from "lucide-react";
import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

function targetForNav(item) {
  if (item.includes("Despre")) return "about";
  if (item.includes("Rezerv")) return "contact";
  return navTarget(item);
}

function BowlVisual({ compact = false }) {
  return (
    <div className={`relative mx-auto ${compact ? "h-32 w-32" : "h-64 w-64 md:h-80 md:w-80"}`}>
      <div className="absolute inset-0 rounded-full bg-[#f97316]" />
      <div className="absolute inset-[8%] rounded-full bg-white shadow-[0_28px_70px_rgba(15,23,42,.18)]" />
      <div className="absolute inset-[18%] rounded-full bg-[#fff7ed]">
        <span className="absolute left-[18%] top-[22%] h-[22%] w-[34%] rotate-[-20deg] rounded-full bg-[#16a34a]" />
        <span className="absolute right-[18%] top-[24%] h-[24%] w-[24%] rounded-full bg-[#fb923c]" />
        <span className="absolute bottom-[18%] left-[22%] h-[24%] w-[24%] rounded-full bg-[#ef4444]" />
        <span className="absolute bottom-[22%] right-[18%] h-[22%] w-[34%] rotate-[18deg] rounded-full bg-[#84cc16]" />
        <span className="absolute left-[42%] top-[40%] h-[22%] w-[22%] rounded-full bg-[#fde68a]" />
        <span className="absolute left-[34%] top-[28%] h-2 w-2 rounded-full bg-[#1f2937]" />
        <span className="absolute left-[54%] top-[30%] h-2 w-2 rounded-full bg-[#1f2937]" />
        <span className="absolute left-[48%] top-[57%] h-2 w-2 rounded-full bg-[#1f2937]" />
      </div>
    </div>
  );
}

function MenuCard({ item, index }) {
  const tones = ["bg-[#fff7ed]", "bg-[#ecfdf5]", "bg-[#eef2ff]"];

  return (
    <article className={`border border-[#17382e]/12 p-5 ${tones[index % tones.length]}`}>
      <BowlVisual compact />
      <p className="mt-4 text-xs font-black uppercase text-[#f97316]">{item.tag}</p>
      <h4 className="mt-1 text-lg font-black text-[#17382e]">{item.title}</h4>
      <p className="mt-1 text-xl font-black text-[#dc2626]">{item.price}</p>
      <button type="button" className="mt-4 inline-flex items-center gap-2 bg-[#17382e] px-4 py-2 text-xs font-black text-white">
        Comanda <ArrowRight size={14} />
      </button>
    </article>
  );
}

function FeaturePill({ item }) {
  return (
    <div className="border border-[#17382e]/12 bg-white p-4">
      <h4 className="font-black text-[#17382e]">{item.title}</h4>
      <p className="mt-2 text-xs leading-5 text-[#64748b]">{item.text}</p>
    </div>
  );
}

export default function RestaurantSiteMockup({ mini, contentRef, isMobile }) {
  const menu = mini.menu?.length ? mini.menu : mini.items;
  const highlights = mini.highlights?.length ? mini.highlights : mini.items;

  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#fffaf1] text-[#17382e]">
      <header className="sticky top-0 z-30 border-b border-[#17382e]/12 bg-[#fffaf1]/95 px-5 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <MiniLogo mini={mini} />
          <nav className="hidden items-center gap-5 md:flex">
            {mini.nav.map((item) => (
              <NavButton key={item} onClick={() => scrollToSection(contentRef, targetForNav(item))}>
                {item}
              </NavButton>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => scrollToSection(contentRef, "services")}
            className="bg-[#dc2626] px-4 py-2 text-xs font-black text-white"
          >
            {mini.secondaryCta}
          </button>
        </div>
      </header>

      <main>
        <section data-mini-section="home" className="relative grid overflow-hidden bg-[#fffaf1] md:grid-cols-[0.9fr_1.1fr]">
          <Leaf className="absolute left-5 top-8 text-[#16a34a]/45" size={34} />
          <div className="border-b border-[#17382e]/12 p-6 md:border-b-0 md:border-r md:p-10">
            <p className="text-xs font-black uppercase text-[#f97316]">{mini.eyebrow}</p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl font-black italic leading-none text-[#dc2626] md:text-7xl">
              {mini.accent}
            </h1>
            <h2 className="mt-3 max-w-xl text-3xl font-black uppercase leading-tight text-[#17382e]">
              {mini.headline}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#64748b]">{mini.description}</p>
            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "services")}
              className="mt-7 inline-flex items-center gap-2 bg-[#f97316] px-5 py-3 text-xs font-black text-white"
            >
              {mini.primaryCta}
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="relative grid min-h-[24rem] place-items-center overflow-hidden bg-[#e8f8e4] p-6">
            <span className="absolute h-72 w-72 rounded-full border-[34px] border-[#fde047]/70 md:h-96 md:w-96" />
            <BowlVisual />
            <span className="absolute right-[18%] top-[14%] h-32 w-1 rotate-[-12deg] bg-[#17382e]" />
            <span className="absolute right-[23%] top-[18%] h-32 w-1 rotate-[6deg] bg-[#17382e]" />
          </div>
        </section>

        <section className="relative -mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => scrollToSection(contentRef, "about")}
            className="inline-flex items-center gap-2 bg-[#17382e] px-5 py-3 text-xs font-black uppercase text-white shadow-[0_14px_35px_rgba(23,56,46,.24)]"
          >
            <Utensils size={14} />
            {mini.filterLabel || "Ce aleg astazi?"}
            <ChevronDown size={14} />
          </button>
        </section>

        <section data-mini-section="about" className="grid items-center gap-6 bg-white px-6 py-12 md:grid-cols-[0.85fr_1.15fr] md:px-10">
          <div className="border border-[#17382e]/12 bg-[#fff7ed] p-6">
            <BowlVisual compact />
            <div className="mt-5 grid gap-3">
              {highlights.slice(0, 3).map((item) => (
                <FeaturePill key={item.title} item={item} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[#16a34a]">About</p>
            <h2 className="mt-3 font-serif text-5xl font-black italic text-[#dc2626]">{mini.brand}</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#64748b]">{mini.aboutText}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {mini.stats?.slice(0, 4).map((stat) => (
                <div key={stat.label} className="border border-[#17382e]/12 bg-[#fffaf1] p-4">
                  <p className="text-xl font-black text-[#17382e]">{stat.value}</p>
                  <p className="mt-1 text-xs text-[#64748b]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-mini-section="services" className="bg-[#17382e] px-6 py-12 text-white md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase text-[#fbbf24]">Meniu</p>
            <h2 className="mt-3 text-4xl font-black">Fresh bowls, scanate rapid.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/65">{mini.menuText}</p>
          </div>
          <div className={`mt-8 grid gap-3 ${isMobile ? "grid-cols-1" : "md:grid-cols-3"}`}>
            {menu.slice(0, 3).map((item, index) => (
              <MenuCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section className="grid items-center gap-6 bg-white px-6 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-10">
          <div className="border border-[#17382e]/12 bg-[#fffaf1] p-6">
            <Star className="text-[#fbbf24]" size={22} />
            <p className="mt-4 text-sm leading-7 text-[#64748b]">"{mini.testimonial?.text}"</p>
            <p className="mt-5 font-black text-[#dc2626]">{mini.testimonial?.name}</p>
          </div>
          <div>
            <h2 className="text-4xl font-black leading-tight text-[#17382e]">{mini.customersTitle}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#64748b]">{mini.customersText}</p>
          </div>
        </section>

        <section data-mini-section="contact" className="relative overflow-hidden bg-[#f97316] px-6 py-10 text-white md:px-10">
          <BowlVisual compact />
          <div className="relative z-10 mt-6 grid items-center gap-5 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-black">{mini.contactTitle}</h2>
              <p className="mt-2 text-sm text-white/80">{mini.contactText}</p>
            </div>
            <div className="flex border border-white/35 bg-white p-2">
              <input readOnly value={mini.contact.email} className="min-w-0 flex-1 bg-transparent px-3 text-xs text-[#64748b] outline-none" />
              <button type="button" className="inline-flex items-center gap-2 bg-[#17382e] px-4 py-3 text-xs font-black uppercase text-white">
                Trimite <Mail size={13} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
