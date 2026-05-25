import {
  ArrowRight,
  Boxes,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Container,
  MapPin,
  PackageCheck,
  Route,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

function AtlasLogo() {
  return (
    <img
      src="/images/minisite/atlas-freight-logo.png"
      alt="Atlas Freight"
      className="h-12 w-auto object-contain md:h-14"
      draggable={false}
    />
  );
}

const iconMap = {
  road: Truck,
  fleet: ShieldCheck,
  quote: ClipboardList,
  route: Route,
};

function targetForNav(item) {
  if (item.includes("Flot")) return "fleet";
  if (item.includes("Rute")) return "routes";
  return navTarget(item);
}

function TransportIcon({ type = "road" }) {
  const Icon = iconMap[type] || Truck;
  return <Icon size={20} />;
}

function DispatchMap() {
  return (
    <div className="relative min-h-[22rem] overflow-hidden bg-[#f1f5ef]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,62,50,.10)_1px,transparent_1px),linear-gradient(rgba(44,62,50,.10)_1px,transparent_1px)] [background-size:34px_34px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 300" role="img" aria-label="Route map">
        <path
          d="M28 226 C92 124 148 164 196 92 C236 34 300 64 382 38"
          fill="none"
          stroke="#f97316"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M56 262 C114 226 156 250 218 202 C272 160 320 186 392 142"
          fill="none"
          stroke="#1f766f"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute left-[12%] top-[66%] grid h-9 w-9 place-items-center bg-[#1f766f] text-white">
        <Truck size={17} />
      </span>
      <span className="absolute right-[18%] top-[20%] grid h-9 w-9 place-items-center bg-[#f97316] text-white">
        <Container size={17} />
      </span>
      <div className="absolute bottom-6 right-6 border border-[#2c3e32]/15 bg-white p-4 shadow-[0_18px_45px_rgba(44,62,50,0.14)]">
        <p className="text-[0.65rem] font-bold text-[#64748b]">ETA update</p>
        <p className="mt-1 text-2xl font-black text-[#243226]">14:20</p>
      </div>
    </div>
  );
}

function QuotePanel({ mini, contentRef }) {
  return (
    <div className="border border-[#d9e0d5] bg-white p-4 shadow-[0_18px_45px_rgba(44,62,50,0.14)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] font-black uppercase text-[#f97316]">Quick quote</p>
          <h4 className="text-lg font-black text-[#243226]">Planifica transportul</h4>
        </div>
        <CalendarClock size={20} className="text-[#1f766f]" />
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {mini.quoteFields?.map((field) => (
          <button key={field} type="button" className="border border-[#d9e0d5] bg-[#f7faf6] px-3 py-3 text-left">
            <p className="text-[0.65rem] font-bold text-[#64748b]">{field}</p>
            <p className="mt-1 text-xs font-black text-[#243226]">Selecteaza</p>
          </button>
        ))}
        <button
          type="button"
          onClick={() => scrollToSection(contentRef, "contact")}
          className="inline-flex items-center justify-center gap-2 bg-[#f97316] px-4 py-3 text-xs font-black text-white"
        >
          {mini.primaryCta}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ item }) {
  return (
    <article className="border border-[#d9e0d5] bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center bg-[#243226] text-[#b7eadf]">
          <TransportIcon type={item.icon} />
        </span>
        <span className="bg-[#fff0df] px-2 py-1 text-[0.65rem] font-black text-[#b45309]">
          {item.tag || "Service"}
        </span>
      </div>
      <h4 className="text-lg font-black text-[#243226]">{item.title}</h4>
      <p className="mt-2 text-xs leading-5 text-[#64748b]">{item.text}</p>
      <button type="button" className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#1f766f]">
        Detalii <ArrowRight size={14} />
      </button>
    </article>
  );
}

function ProcessStep({ step, index }) {
  return (
    <article className="border-l-4 border-[#f97316] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-black text-[#f97316]">0{index + 1}</span>
        <CheckCircle2 size={18} className="text-[#1f766f]" />
      </div>
      <h4 className="font-black text-[#243226]">{step.title}</h4>
      <p className="mt-2 text-xs leading-5 text-[#64748b]">{step.text}</p>
    </article>
  );
}

export default function TransportSiteMockup({ mini, contentRef }) {
  const services = mini.services || mini.items || [];

  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#eef2ea] text-[#243226]">
      <header className="sticky top-0 z-30 border-b border-[#d9e0d5] bg-[#fbfcf8]/95 px-5 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <AtlasLogo />
          <nav className="hidden items-center gap-5 md:flex">
            {mini.nav.map((item) => (
              <NavButton key={item} onClick={() => scrollToSection(contentRef, targetForNav(item))}>
                {item}
              </NavButton>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Search" className="hidden border border-[#d9e0d5] bg-white p-2 text-[#243226] md:grid">
              <Search size={15} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "contact")}
              className="bg-[#243226] px-4 py-2 text-xs font-black text-white"
            >
              {mini.primaryCta}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section data-mini-section="home" className="grid bg-[#fbfcf8] md:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-[#d9e0d5] p-6 md:border-b-0 md:border-r md:p-10">
           
            <div className="mb-6 flex items-center gap-4">
             <AtlasLogo />

             <div>
             <p className="text-xs font-black uppercase text-slate-500">
               {mini.eyebrow}
             </p>

             <p className="text-[11px] text-slate-500">
              Transport • Logistică • Freight Solutions
             </p>
           </div>
          </div>

            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight md:text-6xl">{mini.headline}</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#64748b]">{mini.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "contact")}
                className="inline-flex items-center gap-2 bg-[#f97316] px-5 py-3 text-xs font-black text-white"
              >
                {mini.primaryCta}
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "fleet")}
                className="border border-[#243226]/20 bg-white px-5 py-3 text-xs font-black text-[#243226]"
              >
                {mini.secondaryCta}
              </button>
            </div>
          </div>
          <div className="relative">
            <DispatchMap />
            <div className="p-5 md:absolute md:bottom-6 md:left-6 md:right-6 md:p-0">
              <QuotePanel mini={mini} contentRef={contentRef} />
            </div>
          </div>
        </section>

        <section data-mini-section="services" className="px-6 py-10 md:px-10">
          <div className="mb-7 grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-black uppercase text-[#f97316]">Capacitate operationala</p>
              <h2 className="mt-3 text-3xl font-black leading-tight">{mini.sectionTitle}</h2>
            </div>
            <div>
              <p className="text-sm leading-6 text-[#64748b]">{mini.sectionText}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mini.badges?.map((badge) => (
                  <span key={badge} className="border border-[#d9e0d5] bg-white px-3 py-2 text-xs font-black text-[#64748b]">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {services.slice(0, 3).map((item) => (
              <ServiceCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section data-mini-section="fleet" className="grid bg-[#243226] text-white md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 md:p-10">
            <p className="text-xs font-black uppercase text-[#fbbf24]">Fleet & tracking</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight">{mini.fleetTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">{mini.fleetText}</p>
            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              {mini.stats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="border border-white/12 bg-white/[0.06] p-4">
                  <p className="text-2xl font-black text-[#fbbf24]">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 p-6 md:border-l md:border-t-0 md:p-10">
            <div className="bg-white p-5 text-[#243226]">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-lg font-black">Track shipment</h4>
                <PackageCheck size={20} className="text-[#f97316]" />
              </div>
              <div className="grid gap-2">
                <div className="border border-[#d9e0d5] bg-[#f7faf6] px-4 py-3 text-xs text-[#64748b]">
                  Shipment code
                </div>
                <div className="border border-[#d9e0d5] bg-[#f7faf6] px-4 py-3 text-xs text-[#64748b]">
                  Service type
                </div>
                <button type="button" className="bg-[#1f766f] px-4 py-3 text-xs font-black text-white">
                  Track now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section data-mini-section="routes" className="px-6 py-10 md:px-10">
          <div className="mb-6 flex items-center gap-3">
            <Route size={22} className="text-[#1f766f]" />
            <h2 className="text-3xl font-black">Proces de transport</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {mini.process?.slice(0, 3).map((step, index) => (
              <ProcessStep key={step.title} step={step} index={index} />
            ))}
          </div>
        </section>

        <section data-mini-section="contact" className="grid border-t border-[#d9e0d5] bg-white md:grid-cols-[1fr_0.9fr]">
          <div className="p-6 md:p-10">
            <p className="text-xs font-black uppercase text-[#f97316]">Contact rapid</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">{mini.contactTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748b]">{mini.contactText}</p>
          </div>
          <div className="grid gap-3 border-t border-[#d9e0d5] p-6 md:border-l md:border-t-0 md:p-10">
            <p className="flex items-center gap-3 border border-[#d9e0d5] bg-[#f7faf6] p-4 text-sm text-[#64748b]">
              <MapPin size={16} className="text-[#f97316]" /> {mini.contact.address}
            </p>
            <p className="flex items-center gap-3 border border-[#d9e0d5] bg-[#f7faf6] p-4 text-sm text-[#64748b]">
              <Truck size={16} className="text-[#f97316]" /> {mini.contact.phone}
            </p>
            <p className="flex items-center gap-3 border border-[#d9e0d5] bg-[#f7faf6] p-4 text-sm text-[#64748b]">
              <Boxes size={16} className="text-[#f97316]" /> {mini.contact.email}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
