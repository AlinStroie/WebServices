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
  ShipWheel,
  Truck,
} from "lucide-react";
import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

const iconMap = {
  road: Truck,
  fleet: ShieldCheck,
  quote: ClipboardList,
  route: Route,
};

function TransportIcon({ type = "road", className = "" }) {
  const Icon = iconMap[type] || Truck;
  return <Icon className={className} size={20} />;
}

function SoftTruckVisual() {
  return (
    <div className="relative h-[15rem] overflow-hidden rounded-bl-[5rem] rounded-br-[1.5rem] rounded-tl-[1.5rem] rounded-tr-[5rem] bg-gradient-to-br from-[#f58220] via-[#ffb45c] to-[#f6f7f8] shadow-2xl shadow-orange-950/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_30%,rgba(255,255,255,.75),transparent_24%),linear-gradient(135deg,rgba(7,22,38,.1),rgba(7,22,38,.55))]" />
      <div className="absolute bottom-10 left-8 h-20 w-56 rounded-2xl bg-[#e9eef2] shadow-xl">
        <div className="absolute -right-14 top-6 h-14 w-20 rounded-r-2xl bg-[#0b253f]" />
        <div className="absolute -right-6 top-1 h-9 w-10 rounded-lg bg-cyan-100/80" />
        <div className="absolute left-5 top-5 h-3 w-28 rounded-full bg-slate-300" />
        <div className="absolute bottom-[-1.1rem] left-7 h-9 w-9 rounded-full border-[7px] border-[#0b253f] bg-white" />
        <div className="absolute bottom-[-1.1rem] right-[-2.6rem] h-9 w-9 rounded-full border-[7px] border-[#0b253f] bg-white" />
      </div>
      <div className="absolute right-7 top-6 rounded-full bg-white/85 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#0b253f] shadow-lg">
        EU routes
      </div>
      <div className="absolute bottom-6 right-7 flex items-center gap-2 rounded-2xl bg-[#071626]/90 px-4 py-3 text-white shadow-xl">
        <PackageCheck size={18} className="text-[#f58220]" />
        <span className="text-xs font-black">Live dispatch</span>
      </div>
    </div>
  );
}

function QuoteBox({ mini, contentRef }) {
  return (
    <div className="rounded-[1.6rem] border border-white/20 bg-white/95 p-4 text-[#071626] shadow-2xl shadow-slate-950/25 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f58220]">Quick quote</p>
          <h4 className="text-sm font-black">Planifică transportul</h4>
        </div>
        <CalendarClock size={19} className="text-[#f58220]" />
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {mini.quoteFields?.map((field) => (
          <div key={field} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-[10px] font-bold text-slate-400">{field}</p>
            <p className="mt-1 text-xs font-black text-slate-700">Selectează</p>
          </div>
        ))}
        <button
          type="button"
          onClick={() => scrollToSection(contentRef, "contact")}
          className="rounded-xl bg-[#f58220] px-4 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25"
        >
          {mini.primaryCta}
        </button>
      </div>
    </div>
  );
}

export default function TransportSiteMockup({ mini, projectId, contentRef, isMobile }) {
  const services = mini.services || mini.items || [];

  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#f4f6f8] text-[#071626]">
      <section data-mini-section="home" className="relative min-h-[32rem] overflow-hidden bg-[#071626] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_28%,rgba(245,130,32,.5),transparent_28%),linear-gradient(120deg,rgba(7,22,38,.96),rgba(7,22,38,.72)),linear-gradient(135deg,#0b253f,#071626)]" />
        <div className="absolute -right-20 bottom-0 h-52 w-[60%] rounded-tl-[7rem] bg-white" />
        <div className="absolute left-0 top-0 h-full w-full opacity-[0.08] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] [background-size:36px_36px]" />

        <header className="relative z-10 flex items-center justify-between px-6 py-5">
          <MiniLogo mini={mini} dark />
          <nav className="hidden items-center gap-6 md:flex">
            {mini.nav.map((item) => (
              <NavButton dark key={item} onClick={() => scrollToSection(contentRef, navTarget(item))}>
                {item}
              </NavButton>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Search" className="hidden rounded-full bg-white/10 p-2 text-white md:grid md:place-items-center">
              <Search size={15} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "contact")}
              className="rounded-lg bg-[#f58220] px-4 py-2 text-xs font-black text-white shadow-lg shadow-orange-950/20"
            >
              {mini.primaryCta} <ArrowRight className="ml-1 inline" size={13} />
            </button>
          </div>
        </header>

        <div className="relative z-10 grid gap-8 px-6 pb-8 pt-9 md:grid-cols-[0.95fr_1.05fr] md:items-center md:pb-16 md:pt-14">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
              {mini.eyebrow}
            </span>
            <h3 className="mt-5 max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
              {mini.headline}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/68">{mini.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "contact")}
                className="rounded-lg bg-[#f58220] px-5 py-3 text-xs font-black text-white shadow-xl shadow-orange-950/25"
              >
                {mini.primaryCta} <ArrowRight className="ml-2 inline" size={14} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "fleet")}
                className="rounded-lg border border-white/25 bg-white/5 px-5 py-3 text-xs font-black text-white"
              >
                {mini.secondaryCta}
              </button>
            </div>
          </div>

          <div className="relative">
            <SoftTruckVisual />
            <div className="absolute -bottom-8 left-2 right-2 md:-left-12 md:right-6">
              <QuoteBox mini={mini} contentRef={contentRef} />
            </div>
          </div>
        </div>
      </section>

      <section data-mini-section="services" className="grid gap-6 px-6 py-10 md:grid-cols-[0.85fr_1.15fr] md:px-10 md:py-12">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#f58220]">Capacitate operațională</p>
          <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em]">{mini.sectionTitle}</h3>
        </div>
        <div className="space-y-4">
          <p className="text-sm leading-6 text-slate-500">{mini.sectionText}</p>
          <div className="flex flex-wrap gap-2">
            {mini.badges?.map((badge) => (
              <span key={badge} className="rounded-full bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 shadow-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
          {services.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-28 items-end justify-between rounded-[1rem] bg-gradient-to-br from-[#0b253f] via-[#183b5b] to-[#f58220] p-4 text-white">
                <TransportIcon type={item.icon} className="text-[#f8b66b]" />
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black">{item.tag || "Service"}</span>
              </div>
              <h4 className="mt-4 text-base font-black tracking-[-0.03em]">{item.title}</h4>
              <p className="mt-2 text-xs leading-5 text-slate-500">{item.text}</p>
              <button type="button" className="mt-4 text-[11px] font-black text-[#f58220]">
                Read more <ArrowRight className="inline" size={12} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section data-mini-section="fleet" className="relative overflow-hidden bg-[#071626] px-6 py-10 text-white md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(245,130,32,.28),transparent_25%),linear-gradient(120deg,rgba(7,22,38,.96),rgba(7,22,38,.78))]" />
        <div className="relative grid gap-7 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#f8b66b]">Fleet & tracking</p>
            <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">{mini.fleetTitle}</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/62">{mini.fleetText}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {mini.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="text-xl font-black text-[#f8b66b]">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.6rem] bg-white p-4 text-[#071626] shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-base font-black">Track shipment</h4>
              <ShipWheel size={18} className="text-[#f58220]" />
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-400">Enter your shipment code</div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-400">Choose service</div>
              <button type="button" className="w-full rounded-xl bg-[#f58220] px-4 py-3 text-xs font-black text-white">
                Track now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section data-mini-section="routes" className="px-6 py-10 md:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {mini.process?.map((step, index) => (
            <div key={step.title} className="rounded-[1.4rem] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f58220] text-xs font-black text-white">0{index + 1}</span>
                <CheckCircle2 size={18} className="text-[#f58220]" />
              </div>
              <h4 className="font-black">{step.title}</h4>
              <p className="mt-2 text-xs leading-5 text-slate-500">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-mini-section="contact" className="px-6 pb-10 md:px-10">
        <div className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-sm md:grid-cols-[1fr_0.85fr] md:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#f58220]">Contact rapid</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">{mini.contactTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{mini.contactText}</p>
          </div>
          <div className="space-y-3 rounded-[1.4rem] bg-slate-50 p-4 text-sm text-slate-600">
            <p className="flex items-center gap-2"><MapPin size={15} className="text-[#f58220]" /> {mini.contact.address}</p>
            <p className="flex items-center gap-2"><Truck size={15} className="text-[#f58220]" /> {mini.contact.phone}</p>
            <p className="flex items-center gap-2"><Container size={15} className="text-[#f58220]" /> {mini.contact.email}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
