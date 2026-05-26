import { useState } from "react";
import {
  ArrowRight,
  Boxes,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Container,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Route,
  Search,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { NavButton, navTarget, scrollToSection } from "./shared.jsx";

const iconMap = {
  road: Truck,
  fleet: ShieldCheck,
  quote: ClipboardList,
  route: Route,
};

const statIcons = [CalendarClock, Truck, Route, CheckCircle2];

function targetForNav(item) {
  if (item.includes("Flot")) return "fleet";
  if (item.includes("Rute")) return "routes";
  if (item.includes("Contact")) return "contact";

  return navTarget(item);
}

function AtlasLogo({ compact = false }) {
  return (
    <img
      src="/images/minisite/atlas-freight-logo.png"
      alt="Atlas Freight"
      className={
        compact
          ? "h-9 w-auto max-w-[7.5rem] object-contain"
          : "h-12 w-auto max-w-[9.5rem] object-contain"
      }
      draggable={false}
    />
  );
}

function TransportIcon({ type = "road", size = 20 }) {
  const Icon = iconMap[type] || Truck;
  return <Icon size={size} />;
}

function DispatchVisual({ mobile = false }) {
  return (
    <div
      className={
        mobile
          ? "relative min-h-[23rem] overflow-hidden bg-[#17231d]"
          : "relative min-h-[36rem] overflow-hidden bg-[#17231d]"
      }
    >
      <img
        src="/images/minisite/atlas-truck-hero.png"
        alt="Atlas Freight truck"
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(23,35,29,.72)_0%,rgba(36,50,38,.52)_46%,rgba(238,242,234,.16)_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:34px_34px]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 520 420"
        role="img"
        aria-label="Hartă logistică"
      >
        <path
          d="M42 312 C112 196 192 232 242 132 C286 44 376 82 474 44"
          fill="none"
          stroke="#f97316"
          strokeWidth="10"
          strokeLinecap="round"
        />

        <path
          d="M66 356 C142 306 198 334 268 268 C326 214 386 228 486 164"
          fill="none"
          stroke="#1f766f"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d="M92 108 C166 136 224 98 290 140 C350 178 386 126 454 118"
          fill="none"
          stroke="rgba(255,255,255,.55)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 12"
        />
      </svg>

      <span className="absolute left-[14%] top-[67%] grid h-11 w-11 place-items-center bg-[#1f766f] text-white shadow-[0_18px_40px_rgba(0,0,0,.24)]">
        <Truck size={19} />
      </span>

      <span className="absolute right-[16%] top-[18%] grid h-11 w-11 place-items-center bg-[#f97316] text-white shadow-[0_18px_40px_rgba(0,0,0,.22)]">
        <Container size={19} />
      </span>

      <span className="absolute left-[38%] top-[30%] grid h-9 w-9 place-items-center border border-white/20 bg-white/12 text-white backdrop-blur-md">
        <Route size={16} />
      </span>

      <div
        className={
          mobile
            ? "absolute bottom-5 left-5 right-5 border border-white/14 bg-[#0f1915]/82 p-4 text-white backdrop-blur-md"
            : "absolute bottom-7 left-7 w-[17rem] border border-white/14 bg-[#0f1915]/82 p-5 text-white backdrop-blur-md"
        }
      >
        <p className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#f97316]">
          Control operațional
        </p>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div>
            <p className="text-2xl font-black leading-none">40+</p>
            <p className="mt-1 text-[0.62rem] font-bold uppercase text-white/52">
              Vehicule
            </p>
          </div>

          <div>
            <p className="text-2xl font-black leading-none">EU</p>
            <p className="mt-1 text-[0.62rem] font-bold uppercase text-white/52">
              Rute
            </p>
          </div>

          <div>
            <p className="text-2xl font-black leading-none">98%</p>
            <p className="mt-1 text-[0.62rem] font-bold uppercase text-white/52">
              Livrări
            </p>
          </div>
        </div>
      </div>

      {!mobile ? (
        <div className="absolute right-7 top-7 border border-white/14 bg-white/92 p-4 text-[#243226] shadow-[0_20px_55px_rgba(0,0,0,.20)]">
          <div className="mb-3 flex items-center justify-between gap-6">
            <p className="text-xs font-black uppercase text-[#64748b]">
              Live route
            </p>

            <PackageCheck size={19} className="text-[#f97316]" />
          </div>

          <p className="text-2xl font-black leading-none">BV → DE</p>

          <div className="mt-3 h-2 w-44 overflow-hidden bg-[#d9e0d5]">
            <div className="h-full w-[68%] bg-[#1f766f]" />
          </div>

          <p className="mt-3 text-xs font-bold text-[#64748b]">
            ETA actualizat / tracking activ
          </p>
        </div>
      ) : null}
    </div>
  );
}

function QuotePanel({ mini, contentRef, mobile = false }) {
  return (
    <div className="border border-[#d9e0d5] bg-white p-5 shadow-[0_24px_60px_rgba(36,50,38,.14)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#f97316]">
            Cerere rapidă
          </p>

          <h4 className="mt-1 text-xl font-black leading-tight text-[#243226]">
            Estimare transport
          </h4>
        </div>

        <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#eef2ea] text-[#1f766f]">
          <ClipboardList size={20} />
        </span>
      </div>

      <div className="grid gap-2.5">
        {mini.quoteFields?.map((field) => (
          <button
            key={field}
            type="button"
            className="grid min-w-0 grid-cols-[0.9fr_1.1fr] border border-[#d9e0d5] bg-[#f7faf6] text-left"
          >
            <span className="border-r border-[#d9e0d5] px-4 py-3 text-xs font-bold text-[#64748b]">
              {field}
            </span>

            <span className="flex min-w-0 items-center justify-between gap-2 px-4 py-3 text-xs font-black text-[#243226]">
              <span className="truncate">Selectează</span>
              <span className="shrink-0 text-[#1f766f]">⌄</span>
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToSection(contentRef, "contact")}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#f97316] px-5 py-4 text-xs font-black uppercase tracking-[0.04em] text-white transition hover:bg-[#ea580c]"
      >
        {mini.primaryCta}
        <ArrowRight size={16} />
      </button>

      {mobile ? null : (
        <p className="mt-3 text-center text-[0.7rem] font-bold text-[#64748b]">
          Răspuns rapid pentru rute interne și europene.
        </p>
      )}
    </div>
  );
}

function ServiceCard({ item, index }) {
  return (
    <article className="min-w-0 border border-[#d9e0d5] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(36,50,38,.10)]">
      <div className="mb-7 flex items-center justify-between gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center bg-[#243226] text-[#b7eadf]">
          <TransportIcon type={item.icon} />
        </span>

        <span className="bg-[#fff0df] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.04em] text-[#b45309]">
          {item.tag || `0${index + 1}`}
        </span>
      </div>

      <h4 className="text-lg font-black leading-tight text-[#243226]">
        {item.title}
      </h4>

      <p className="mt-3 text-sm leading-6 text-[#64748b]">{item.text}</p>

      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase text-[#1f766f]"
      >
        Detalii
        <ArrowRight size={14} />
      </button>
    </article>
  );
}

function StatCard({ stat, index, mobile }) {
  const Icon = statIcons[index % statIcons.length];

  return (
    <div
      className={
        mobile
          ? "flex items-center gap-4 border-b border-[#d9e0d5] bg-white px-6 py-5 last:border-b-0"
          : "flex min-w-0 items-center justify-center gap-4 border-r border-[#d9e0d5] bg-white px-5 py-7 last:border-r-0"
      }
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center bg-[#eef2ea] text-[#1f766f]">
        <Icon size={19} />
      </span>

      <div className="min-w-0">
        <p className="whitespace-nowrap text-3xl font-black leading-none text-[#243226]">
          {stat.value}
        </p>

        <p className="mt-2 whitespace-nowrap text-[0.65rem] font-black uppercase tracking-[0.05em] text-[#64748b]">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

function RouteMapImage() {
  return (
    <div className="min-h-[18rem] overflow-hidden border border-[#d9e0d5] bg-[#f7faf6]">
      <img
        src="/images/minisite/atlas-route-map.png"
        alt="Hartă rută București - Budapesta"
        className="h-full min-h-[18rem] w-full object-cover object-center"
        draggable={false}
      />
    </div>
  );
}

function TrackShipmentPanel() {
  return (
    <div className="border border-[#d9e0d5] bg-white p-5 text-[#243226] shadow-[0_20px_55px_rgba(36,50,38,.10)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#f97316]">
            Track shipment
          </p>

          <h4 className="mt-1 text-xl font-black leading-tight text-[#243226]">
            Status transport
          </h4>
        </div>

        <PackageCheck size={22} className="shrink-0 text-[#f97316]" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(14rem,1.05fr)_minmax(12rem,0.95fr)]">
        <RouteMapImage />

        <div className="grid gap-2">
          <div className="border border-[#d9e0d5] bg-[#f7faf6] px-4 py-3">
            <p className="text-[11px] font-bold uppercase text-[#64748b]">
              Shipment code
            </p>

            <p className="mt-1 text-sm font-black text-[#243226]">
              AF-RO-HU-2048
            </p>
          </div>

          <div className="border border-[#d9e0d5] bg-[#f7faf6] px-4 py-3">
            <p className="text-[11px] font-bold uppercase text-[#64748b]">
              Service type
            </p>

            <p className="mt-1 text-sm font-black text-[#243226]">
              Road freight
            </p>
          </div>

          <div className="border border-[#d9e0d5] bg-[#f7faf6] px-4 py-3">
            <p className="text-[11px] font-bold uppercase text-[#64748b]">
              Route
            </p>

            <p className="mt-1 text-sm font-black text-[#243226]">
              București → Budapesta
            </p>
          </div>

          <div className="border border-[#d9e0d5] bg-[#f7faf6] px-4 py-3">
            <p className="text-[11px] font-bold uppercase text-[#64748b]">
              ETA
            </p>

            <p className="mt-1 text-sm font-black text-[#243226]">6h 40m</p>
          </div>

          <button
            type="button"
            className="mt-1 bg-[#1f766f] px-4 py-3 text-xs font-black uppercase tracking-[0.04em] text-white transition hover:bg-[#185f5a]"
          >
            Track now
          </button>
        </div>
      </div>
    </div>
  );
}

function FleetPanel({ mini, mobile }) {
  return (
    <section
      data-mini-section="fleet"
      className="border-y border-[#d9e0d5] bg-[#fbfcf8]"
    >
      <div className={mobile ? "grid grid-cols-1" : "grid grid-cols-4"}>
        {mini.stats?.slice(0, 4).map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            index={index}
            mobile={mobile}
          />
        ))}
      </div>

      <div
        className={
          mobile
            ? "grid gap-6 px-6 py-12"
            : "grid gap-8 px-8 py-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(32rem,1fr)] lg:px-14"
        }
        style={{ containerType: "inline-size" }}
      >
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[#f97316]">
            Flotă & tracking
          </p>

          <h2
            className="mt-4 max-w-4xl font-black leading-tight tracking-[-0.04em] text-[#243226]"
            style={{
              fontSize: mobile
                ? "clamp(2rem, 10cqw, 2.85rem)"
                : "clamp(2.4rem, 4.6cqw, 4rem)",
              wordBreak: "normal",
              overflowWrap: "normal",
              hyphens: "none",
            }}
          >
            {mini.fleetTitle}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#64748b]">
            {mini.fleetText}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {mini.badges?.map((badge) => (
              <span
                key={badge}
                className="border border-[#d9e0d5] bg-white px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.05em] text-[#243226]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <TrackShipmentPanel />
      </div>
    </section>
  );
}

function ProcessStep({ step, index, mobile }) {
  return (
    <article className="min-w-0 border border-[#d9e0d5] bg-white p-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="text-sm font-black text-[#f97316]">
          0{index + 1}
        </span>

        <span className="grid h-11 w-11 place-items-center bg-[#eef2ea] text-[#1f766f]">
          <CheckCircle2 size={19} />
        </span>
      </div>

      <h4
        className="font-black leading-tight text-[#243226]"
        style={{
          fontSize: mobile ? "1.25rem" : "1.35rem",
        }}
      >
        {step.title}
      </h4>

      <p className="mt-3 text-sm leading-6 text-[#64748b]">{step.text}</p>
    </article>
  );
}

function ContactItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-4 border border-[#d9e0d5] bg-[#fbfcf8] p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#eef2ea] text-[#1f766f]">
        <Icon size={17} />
      </span>

      <div className="min-w-0">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.06em] text-[#64748b]">
          {label}
        </p>

        <p className="mt-1 break-words text-sm leading-6 text-[#243226]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function TransportSiteMockup({ mini, contentRef, isMobile }) {
  const mobile = Boolean(isMobile);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = mini.services || mini.items || [];

  function handleNavClick(item) {
    scrollToSection(contentRef, targetForNav(item));
    setMobileMenuOpen(false);
  }

  return (
    <div
      ref={contentRef}
      className="h-full overflow-y-auto overflow-x-hidden bg-[#eef2ea] text-[#243226]"
    >
      <header className="sticky top-0 z-40 border-b border-[#d9e0d5] bg-[#fbfcf8]/95 px-5 py-3 backdrop-blur-xl">
        {mobile ? (
          <div>
            <div className="flex items-center justify-between gap-3">
              <AtlasLogo compact />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection(contentRef, "contact")}
                  className="shrink-0 bg-[#243226] px-3 py-3 text-[0.62rem] font-black uppercase tracking-[0.04em] text-white"
                >
                  Ofertă
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((value) => !value)}
                  className="grid h-10 w-10 shrink-0 place-items-center border border-[#d9e0d5] bg-white text-[#243226]"
                  aria-label={
                    mobileMenuOpen ? "Închide meniul" : "Deschide meniul"
                  }
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>

            {mobileMenuOpen ? (
              <nav className="mt-4 grid gap-2 border-t border-[#d9e0d5] pt-4">
                {mini.nav?.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="w-full border border-[#d9e0d5] bg-white px-4 py-3 text-left text-xs font-black uppercase tracking-[0.04em] text-[#243226]"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            ) : null}
          </div>
        ) : (
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
            <AtlasLogo />

            <nav className="flex items-center gap-6">
              {mini.nav?.map((item) => (
                <NavButton
                  key={item}
                  onClick={() =>
                    scrollToSection(contentRef, targetForNav(item))
                  }
                >
                  {item}
                </NavButton>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Search"
                className="grid h-10 w-10 place-items-center border border-[#d9e0d5] bg-white text-[#243226]"
              >
                <Search size={15} />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "contact")}
                className="bg-[#243226] px-5 py-3 text-xs font-black uppercase tracking-[0.04em] text-white"
              >
                {mini.primaryCta}
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          data-mini-section="home"
          className="bg-[#fbfcf8]"
          style={{ containerType: "inline-size" }}
        >
          {mobile ? (
            <div>
              <div className="px-6 py-10">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#f97316]">
                  {mini.eyebrow}
                </p>

                <h1
                  className="mt-5 max-w-full font-black leading-tight tracking-[-0.045em] text-[#243226]"
                  style={{
                    fontSize: "clamp(2.25rem, 10.5cqw, 3rem)",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                  }}
                >
                  {mini.headline}
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[#64748b]">
                  {mini.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "contact")}
                    className="inline-flex items-center gap-2 bg-[#f97316] px-5 py-3 text-xs font-black uppercase text-white"
                  >
                    {mini.primaryCta}
                    <ArrowRight size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "fleet")}
                    className="border border-[#243226]/20 bg-white px-5 py-3 text-xs font-black uppercase text-[#243226]"
                  >
                    {mini.secondaryCta}
                  </button>
                </div>
              </div>

              <DispatchVisual mobile />

              <div className="bg-[#fbfcf8] px-6 py-6">
                <QuotePanel mini={mini} contentRef={contentRef} mobile />
              </div>
            </div>
          ) : (
            <div
              className="grid min-h-[38rem]"
              style={{
                gridTemplateColumns: "minmax(0, 0.92fr) minmax(22rem, 1.08fr)",
              }}
            >
              <div className="flex min-w-0 flex-col justify-center border-r border-[#d9e0d5] px-10 py-12">
                <div className="mb-7 flex items-center gap-4">
                  <AtlasLogo />

                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#f97316]">
                      {mini.eyebrow}
                    </p>

                    <p className="mt-1 text-[0.72rem] leading-5 text-[#64748b]">
                      Transport • Logistică • Freight Solutions
                    </p>
                  </div>
                </div>

                <h1
                  className="max-w-[36rem] font-black leading-tight tracking-[-0.05em] text-[#243226]"
                  style={{
                    fontSize: "clamp(3rem, 5.4cqw, 5.1rem)",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                  }}
                >
                  {mini.headline}
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#64748b]">
                  {mini.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "contact")}
                    className="inline-flex items-center gap-2 bg-[#f97316] px-6 py-4 text-xs font-black uppercase text-white"
                  >
                    {mini.primaryCta}
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "fleet")}
                    className="border border-[#243226]/20 bg-white px-6 py-4 text-xs font-black uppercase text-[#243226]"
                  >
                    {mini.secondaryCta}
                  </button>
                </div>
              </div>

              <div className="relative">
                <DispatchVisual />

                <div className="absolute bottom-8 right-8 w-[24rem]">
                  <QuotePanel mini={mini} contentRef={contentRef} />
                </div>
              </div>
            </div>
          )}
        </section>

        <section
          data-mini-section="services"
          className="bg-[#eef2ea] px-6 py-12"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#f97316]">
                Capacitate operațională
              </p>

              <h2
                className="mt-4 font-black leading-tight tracking-[-0.04em] text-[#243226]"
                style={{
                  fontSize: mobile
                    ? "clamp(2rem, 10cqw, 2.8rem)"
                    : "clamp(2.4rem, 4.6cqw, 4rem)",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                {mini.sectionTitle}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#64748b]">
                {mini.sectionText}
              </p>
            </div>

            <div
              className="mt-10 grid gap-5"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(14rem, 1fr))",
              }}
            >
              {services.slice(0, 3).map((item, index) => (
                <ServiceCard
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <FleetPanel mini={mini} mobile={mobile} />

        <section
          data-mini-section="routes"
          className="bg-[#eef2ea] px-6 py-12"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#f97316]">
                Proces logistic
              </p>

              <h2
                className="mt-4 font-black leading-tight tracking-[-0.04em] text-[#243226]"
                style={{
                  fontSize: mobile
                    ? "clamp(2rem, 10cqw, 2.8rem)"
                    : "clamp(2.4rem, 4.6cqw, 4rem)",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                De la cerere la livrare, totul rămâne clar.
              </h2>
            </div>

            <div
              className="mt-10 grid gap-5"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(14rem, 1fr))",
              }}
            >
              {mini.process?.slice(0, 3).map((step, index) => (
                <ProcessStep
                  key={step.title}
                  step={step}
                  index={index}
                  mobile={mobile}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          data-mini-section="contact"
          className="border-t border-[#d9e0d5] bg-white px-6 py-12"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#f97316]">
                Contact rapid
              </p>

              <h2
                className="mt-4 font-black leading-tight tracking-[-0.04em] text-[#243226]"
                style={{
                  fontSize: mobile
                    ? "clamp(2rem, 10cqw, 2.8rem)"
                    : "clamp(2.4rem, 4.6cqw, 4rem)",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                {mini.contactTitle}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#64748b]">
                {mini.contactText}
              </p>
            </div>

            <div
              className="mt-8 grid gap-5"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "minmax(0, 0.9fr) minmax(18rem, 0.75fr)",
              }}
            >
              <div className="grid gap-3">
                <ContactItem
                  icon={MapPin}
                  label="Adresă"
                  value={mini.contact?.address}
                />

                <ContactItem
                  icon={Phone}
                  label="Telefon"
                  value={mini.contact?.phone}
                />

                <ContactItem
                  icon={Mail}
                  label="Email"
                  value={mini.contact?.email}
                />
              </div>

              <div className="border border-[#d9e0d5] bg-[#243226] p-6 text-white">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#f97316]">
                  Disponibilitate
                </p>

                <h4 className="mt-4 text-2xl font-black leading-tight">
                  Soluții pentru transporturi interne și europene.
                </h4>

                <p className="mt-4 text-sm leading-7 text-white/62">
                  Trimite detaliile cursei, iar echipa Atlas Freight îți poate
                  propune o variantă clară pentru rută, timp și cost.
                </p>

                <button
                  type="button"
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#f97316] px-5 py-4 text-xs font-black uppercase tracking-[0.04em] text-white"
                >
                  {mini.primaryCta}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#d9e0d5] bg-[#fbfcf8] px-6 py-5">
          <div
            className={
              mobile
                ? "mx-auto flex max-w-7xl flex-col gap-3 text-xs text-[#64748b]"
                : "mx-auto flex max-w-7xl items-center justify-between gap-6 text-xs text-[#64748b]"
            }
          >
            <p>© 2024 {mini.brand}. Toate drepturile rezervate.</p>

            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2">
                <Boxes size={14} />
                Marfă generală
              </span>

              <span className="inline-flex items-center gap-2">
                <Route size={14} />
                Rute RO / EU
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}