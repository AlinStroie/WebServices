import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

function VisualCard({ className = "", children }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.6rem] border border-white/45 bg-white/55 shadow-[0_18px_45px_rgba(58,38,24,0.14)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

function SpaVisual({ variant = "default" }) {
  const variants = {
    hero: "from-[#21170f] via-[#7b4f37] to-[#e9cfaa]",
    facial: "from-[#2a1c14] via-[#9f6c52] to-[#f1ddc0]",
    massage: "from-[#f6e5cb] via-[#ba8b63] to-[#1b120d]",
    brows: "from-[#17100c] via-[#5e3f2e] to-[#d8b283]",
    soft: "from-[#f3dfc3] via-[#c69b70] to-[#3a251a]",
  };

  return (
    <div className={`relative h-full min-h-[8rem] bg-gradient-to-br ${variants[variant] || variants.default}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.55),transparent_24%),radial-gradient(circle_at_74%_18%,rgba(255,225,170,0.34),transparent_22%),linear-gradient(135deg,rgba(0,0,0,0.2),transparent_48%,rgba(255,255,255,0.18))]" />
      <div className="absolute bottom-4 right-4 h-20 w-20 rounded-full border border-white/30 bg-white/10 blur-[1px]" />
    </div>
  );
}

function ServiceMiniCard({ item, index }) {
  const visualTypes = ["facial", "massage", "brows"];

  return (
    <VisualCard className="bg-[#f8ead3]">
      <div className="h-28">
        <SpaVisual variant={visualTypes[index % visualTypes.length]} />
      </div>
      <div className="p-4">
        <h4 className="font-serif text-lg font-semibold tracking-[-0.03em] text-[#1a130d]">
          {item.title}
        </h4>
        <p className="mt-2 line-clamp-3 text-[0.68rem] leading-5 text-[#5f4938]">
          {item.text}
        </p>
      </div>
    </VisualCard>
  );
}

function PackageCard({ item, index }) {
  const visualTypes = ["hero", "facial", "soft"];

  return (
    <div className="min-w-[10rem] flex-1">
      <div className="h-28 overflow-hidden rounded-[1.3rem] shadow-[0_18px_35px_rgba(58,38,24,0.14)]">
        <SpaVisual variant={visualTypes[index % visualTypes.length]} />
      </div>
      <h4 className="mt-3 text-center font-serif text-lg font-semibold text-[#1a130d]">
        {item.title}
      </h4>
      <p className="mx-auto mt-1 max-w-[13rem] text-center text-[0.65rem] leading-4 text-[#6c5646]">
        {item.text}
      </p>
    </div>
  );
}

export default function BeautySiteMockup({ mini, projectId, contentRef, isMobile }) {
  const services = mini.items || [];
  const packages = mini.packages || services;
  const highlights = mini.highlights || services.slice(0, 2);

  return (
    <div
      ref={contentRef}
      className="h-full overflow-y-auto bg-[#f6ead7] text-[#1a130d] [scrollbar-color:#2a1b12_#f4e2c5]"
    >
      <section
        data-mini-section="home"
        className="relative mx-auto min-h-[31rem] overflow-hidden bg-[#17100c] text-white"
      >
        <div className="absolute inset-0">
          <SpaVisual variant="hero" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,10,7,0.96)_0%,rgba(17,10,7,0.82)_38%,rgba(17,10,7,0.32)_68%,rgba(17,10,7,0.12)_100%)]" />

        <header className="relative z-10 mx-5 mt-5 flex items-center justify-between rounded-full border border-white/12 bg-black/25 px-5 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-md">
          <MiniLogo mini={mini} dark />

          <nav className="hidden items-center gap-5 md:flex">
            {mini.nav?.map((item) => (
              <NavButton dark key={item} onClick={() => scrollToSection(contentRef, navTarget(item))}>
                {item}
              </NavButton>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => scrollToSection(contentRef, "contact")}
            className="rounded-full bg-[#f1dfc4] px-4 py-2 text-[0.68rem] font-black text-[#21150e] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:scale-[1.02]"
          >
            {mini.primaryCta}
          </button>
        </header>

        <div className="relative z-10 max-w-[26rem] px-8 pb-20 pt-20 md:px-10 md:pt-24">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#d8b283]">
            {mini.eyebrow}
          </p>
          <h3 className="mt-5 font-serif text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-[#fff6e8] md:text-6xl">
            {mini.headline}
          </h3>
          <p className="mt-5 max-w-[21rem] text-xs leading-6 text-white/72">
            {mini.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "contact")}
              className="rounded-full bg-[#f1dfc4] px-5 py-3 text-[0.68rem] font-black text-[#21150e]"
            >
              {mini.primaryCta}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "services")}
              className="rounded-full border border-white/35 px-5 py-3 text-[0.68rem] font-black text-white"
            >
              {mini.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      <section data-mini-section="services" className="grid gap-6 bg-[#dfc39c] px-6 py-8 md:grid-cols-[0.95fr_1.05fr] md:px-10">
        <div className="grid grid-cols-2 gap-4">
          {highlights.map((item, index) => (
            <ServiceMiniCard key={`${projectId}-highlight-${item.title}`} item={item} index={index} />
          ))}
        </div>

        <div className="flex flex-col justify-center rounded-[2rem] bg-[#ecd5b1]/70 p-6 shadow-inner">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#7a573a]">
            {mini.subtitle}
          </p>
          <h3 className="mt-2 font-serif text-4xl font-semibold leading-none tracking-[-0.05em] text-[#1a130d]">
            {mini.accent || "Relaxare premium"}
          </h3>
          <p className="mt-4 max-w-[25rem] text-xs leading-6 text-[#5f4938]">
            {mini.featureText || mini.description}
          </p>
          <button
            type="button"
            onClick={() => scrollToSection(contentRef, "contact")}
            className="mt-6 w-max rounded-full bg-[#17100c] px-5 py-3 text-[0.68rem] font-black text-[#f6ead7]"
          >
            Book now
          </button>
        </div>
      </section>

      <section data-mini-section="gallery" className="px-6 py-10 md:px-10">
        <h3 className="text-center font-serif text-4xl font-semibold tracking-[-0.05em] text-[#1a130d]">
          Packages
        </h3>
        <div className={`mt-7 ${isMobile ? "flex gap-4 overflow-x-auto pb-2" : "grid grid-cols-3 gap-5"}`}>
          {packages.slice(0, 3).map((item, index) => (
            <PackageCard key={`${projectId}-package-${item.title}`} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="px-6 pb-10 md:px-10">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-[#17100c] text-white shadow-[0_25px_60px_rgba(58,38,24,0.22)]">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
            <SpaVisual variant="massage" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,16,12,0.98),rgba(23,16,12,0.84),rgba(23,16,12,0.18))]" />
          <div className="relative z-10 max-w-[28rem] p-7 md:p-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#d8b283]">
              Experience
            </p>
            <h3 className="mt-3 font-serif text-4xl font-semibold leading-none tracking-[-0.05em] text-[#fff6e8]">
              {mini.bottomTitle || "Un moment de grijă, construit în jurul tău."}
            </h3>
            <p className="mt-4 text-xs leading-6 text-white/70">
              {mini.bottomText || "Un layout elegant pentru servicii beauty, cu accent pe imagine, pachete clare și programare rapidă."}
            </p>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {mini.stats?.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/8 p-3 text-center backdrop-blur">
                  <p className="font-serif text-xl font-semibold text-[#f1dfc4]">{stat.value}</p>
                  <p className="mt-1 text-[0.55rem] uppercase tracking-[0.16em] text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-mini-section="contact" className="px-6 pb-10 md:px-10">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-[#d7bb91] bg-[#fff4e2] p-6 shadow-[0_18px_45px_rgba(58,38,24,0.12)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#9d7048]">
              Programări
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.04em]">
              {mini.primaryCta}
            </h3>
            <p className="mt-2 text-xs text-[#6c5646]">
              {mini.contact?.phone} · {mini.contact?.address}
            </p>
          </div>
          <button
            type="button"
            className="rounded-full bg-[#17100c] px-6 py-3 text-[0.68rem] font-black text-[#f6ead7]"
          >
            Contactează salonul
          </button>
        </div>
      </section>
    </div>
  );
}
