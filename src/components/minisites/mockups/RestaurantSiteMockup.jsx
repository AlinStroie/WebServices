import { ArrowRight, ChevronDown, Leaf, Mail, Star, Utensils } from "lucide-react";
import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

function FoodBowl({ size = "large", variant = "green", className = "" }) {
  const sizes = {
    large: "h-48 w-48 md:h-72 md:w-72",
    medium: "h-32 w-32 md:h-40 md:w-40",
    small: "h-24 w-24 md:h-28 md:w-28",
  };

  const accents = {
    green: "from-lime-200 via-emerald-100 to-white border-lime-200",
    red: "from-red-200 via-orange-100 to-white border-red-200",
    purple: "from-indigo-200 via-violet-100 to-white border-indigo-200",
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${accents[variant]} opacity-80`} />
      <div className="absolute inset-[12%] rounded-full bg-white shadow-[0_22px_55px_rgba(15,23,42,.20)]">
        <div className="absolute inset-[9%] rounded-full bg-gradient-to-br from-white via-lime-50 to-orange-50">
          <span className="absolute left-[18%] top-[22%] h-8 w-16 rotate-[-24deg] rounded-full bg-emerald-500/85" />
          <span className="absolute right-[18%] top-[24%] h-9 w-9 rounded-full bg-orange-400" />
          <span className="absolute bottom-[20%] left-[20%] h-10 w-10 rounded-full bg-red-400" />
          <span className="absolute bottom-[24%] right-[18%] h-8 w-14 rotate-[22deg] rounded-full bg-lime-500/80" />
          <span className="absolute left-[42%] top-[40%] h-12 w-12 rounded-full bg-yellow-100" />
          <span className="absolute left-[34%] top-[24%] h-2 w-2 rounded-full bg-black/40" />
          <span className="absolute left-[52%] top-[30%] h-2 w-2 rounded-full bg-black/40" />
          <span className="absolute left-[47%] top-[56%] h-2 w-2 rounded-full bg-black/40" />
        </div>
      </div>
    </div>
  );
}

function MenuCard({ item, index }) {
  const variants = ["red", "green", "purple"];

  return (
    <article className="relative text-center text-white">
      <FoodBowl size="medium" variant={variants[index % variants.length]} className="mx-auto" />
      <p className="mt-3 text-[0.62rem] uppercase tracking-[0.18em] text-white/65">{item.tag}</p>
      <h4 className="mt-1 text-sm font-black">{item.title}</h4>
      <p className="mt-1 font-serif text-lg italic text-white/80">de la {item.price}</p>
      <button type="button" className="mt-1 text-[0.65rem] font-bold underline decoration-white/30 underline-offset-4">
        Comandă acum
      </button>
    </article>
  );
}

export default function RestaurantSiteMockup({ mini, contentRef, isMobile }) {
  const menu = mini.menu?.length ? mini.menu : mini.items;
  const highlights = mini.highlights?.length ? mini.highlights : mini.items;

  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#f8fbff] text-[#1c2430]">
      <section data-mini-section="home" className="relative overflow-hidden bg-[#eaf8ff] px-6 pb-16 pt-5 md:px-10">
        <Leaf className="absolute right-10 top-14 rotate-12 text-lime-500/50" size={34} />
        <Leaf className="absolute bottom-14 left-8 -rotate-45 text-emerald-500/40" size={42} />
        <span className="absolute right-[12%] top-[34%] h-4 w-4 rounded-full bg-red-500/80" />
        <span className="absolute bottom-[18%] right-[38%] h-5 w-5 rounded-full bg-emerald-400/70" />

        <header className="relative z-20 flex items-center justify-between">
          <MiniLogo mini={mini} />
          <nav className="hidden items-center gap-5 md:flex">
            {mini.nav.map((item) => (
              <NavButton key={item} onClick={() => scrollToSection(contentRef, navTarget(item))}>
                {item}
              </NavButton>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => scrollToSection(contentRef, "services")}
            className="rounded-full bg-red-600 px-4 py-2 text-[0.68rem] font-black text-white shadow-lg shadow-red-600/20"
          >
            {mini.secondaryCta}
          </button>
        </header>

        <div className="relative z-10 mt-10 grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.26em] text-indigo-500">{mini.eyebrow}</p>
            <h3 className="mt-4 max-w-sm font-serif text-6xl italic leading-[0.85] text-indigo-500 md:text-7xl">
              {mini.accent}
            </h3>
            <h4 className="mt-2 text-xl font-black uppercase tracking-tight text-[#263244]">{mini.headline}</h4>
            <p className="mt-4 max-w-md text-xs leading-5 text-slate-600">{mini.description}</p>
            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "services")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-[0.7rem] font-black uppercase text-white shadow-xl shadow-red-600/20"
            >
              {mini.primaryCta} <ArrowRight size={14} />
            </button>
          </div>

          <div className="relative flex min-h-[18rem] items-center justify-center">
            <span className="absolute h-56 w-56 rounded-full border-[42px] border-indigo-500/80 md:h-72 md:w-72" />
            <FoodBowl size="large" variant="green" />
            <span className="absolute right-[12%] top-[8%] h-28 w-1 rotate-[-12deg] rounded-full bg-[#161616]" />
            <span className="absolute right-[18%] top-[13%] h-28 w-1 rotate-[4deg] rounded-full bg-[#161616]" />
          </div>
        </div>
      </section>

      <section className="relative -mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => scrollToSection(contentRef, "about")}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-[0.7rem] font-black uppercase text-white shadow-xl shadow-indigo-500/25"
        >
          <Utensils size={14} /> {mini.filterLabel || "Ce aleg astăzi?"} <ChevronDown size={14} />
        </button>
      </section>

      <section data-mini-section="about" className="grid items-center gap-8 bg-white px-6 py-12 md:grid-cols-2 md:px-10">
        <div className="relative flex justify-center">
          <span className="absolute top-8 h-56 w-56 rounded-full border-[34px] border-yellow-300/70 md:h-72 md:w-72" />
          <FoodBowl size="large" variant="purple" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#263244]">About</p>
          <h3 className="mt-2 font-serif text-5xl italic leading-none text-indigo-500">{mini.brand}</h3>
          <p className="mt-5 max-w-md text-xs leading-6 text-slate-600">{mini.aboutText}</p>
          <button
            type="button"
            onClick={() => scrollToSection(contentRef, "services")}
            className="mt-6 rounded-full bg-red-600 px-5 py-3 text-[0.7rem] font-black uppercase text-white"
          >
            {mini.secondaryCta}
          </button>
        </div>
      </section>

      <section data-mini-section="services" className="bg-indigo-500 px-6 py-12 md:px-10">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h3 className="text-3xl font-black uppercase tracking-tight">Meniul nostru</h3>
          <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-white/70">{mini.menuText}</p>
        </div>
        <div className={`mt-9 grid gap-7 ${isMobile ? "grid-cols-1" : "md:grid-cols-3"}`}>
          {menu.slice(0, 3).map((item, index) => (
            <MenuCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="grid items-center gap-7 bg-white px-6 py-12 md:grid-cols-2 md:px-10">
        <div className="rounded-[3rem] bg-[#f5f7fb] p-8 text-center shadow-inner">
          <Star className="mx-auto text-yellow-400" size={22} />
          <p className="mt-4 text-xs leading-6 text-slate-600">“{mini.testimonial?.text}”</p>
          <p className="mt-5 text-sm font-black text-indigo-500">{mini.testimonial?.name}</p>
        </div>
        <div>
          <h3 className="text-4xl font-light text-[#263244]">{mini.customersTitle}</h3>
          <p className="mt-4 max-w-sm text-xs leading-5 text-slate-500">{mini.customersText}</p>
          <div className="mt-6 flex gap-2">
            {highlights.slice(0, 3).map((item) => (
              <span key={item.title} className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-2 text-[0.65rem] font-bold text-indigo-500">
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section data-mini-section="contact" className="relative overflow-hidden bg-indigo-600 px-6 py-10 text-white md:px-10">
        <FoodBowl size="small" variant="green" className="absolute -right-4 top-4 opacity-90" />
        <div className="relative z-10 grid items-center gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h3 className="text-3xl font-light">{mini.contactTitle}</h3>
            <p className="mt-2 text-xs text-white/70">{mini.contactText}</p>
          </div>
          <div className="flex rounded-xl bg-white p-2 shadow-2xl shadow-indigo-950/20">
            <input readOnly value={mini.contact.email} className="min-w-0 flex-1 bg-transparent px-3 text-xs text-slate-500 outline-none" />
            <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-[0.65rem] font-black uppercase text-white">
              Trimite <Mail size={13} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
