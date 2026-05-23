import {
  Activity,
  Bone,
  Calendar,
  ChevronDown,
  ClipboardPlus,
  Clock,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

const departmentIcons = [ClipboardPlus, Bone, HeartPulse];
const serviceIcons = [Activity, Stethoscope, ShieldCheck];

function AppointmentField({ label, value, icon: Icon }) {
  return (
    <div className="min-w-0 flex-1">
      <p className="mb-1.5 text-[0.62rem] font-black uppercase tracking-[0.16em] text-slate-700">
        {label}
      </p>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 rounded-2xl border border-white/80 bg-white/90 px-3 py-2.5 text-left text-[0.72rem] font-bold text-slate-700 shadow-sm"
      >
        <span className="flex min-w-0 items-center gap-2 truncate">
          {Icon ? <Icon size={14} className="shrink-0 text-cyan-600" /> : null}
          <span className="truncate">{value}</span>
        </span>
        <ChevronDown size={13} className="shrink-0 text-slate-400" />
      </button>
    </div>
  );
}

function DepartmentCard({ item, index }) {
  const Icon = departmentIcons[index % departmentIcons.length];

  return (
    <article className="rounded-[1.7rem] border border-white/80 bg-white/75 p-5 text-center shadow-[0_18px_45px_rgba(15,118,110,0.12)] backdrop-blur">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
        <Icon size={28} strokeWidth={1.8} />
      </div>
      <h4 className="mt-4 text-sm font-black tracking-[-0.03em] text-slate-950">
        {item.title}
      </h4>
      {item.text ? (
        <p className="mt-2 line-clamp-2 text-[0.68rem] leading-5 text-slate-500">
          {item.text}
        </p>
      ) : null}
    </article>
  );
}

function FeaturedServiceCard({ item, index }) {
  const Icon = serviceIcons[index % serviceIcons.length];

  return (
    <article className="min-w-[14rem] rounded-[1.75rem] border border-white/80 bg-white/80 p-3 shadow-[0_18px_45px_rgba(15,118,110,0.14)] backdrop-blur md:min-w-0">
      <div className="flex h-28 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-cyan-100 via-white to-emerald-100 text-cyan-700">
        <Icon size={46} strokeWidth={1.5} />
      </div>
      <div className="px-2 py-4">
        <h4 className="text-sm font-black tracking-[-0.03em] text-slate-950">
          {item.title}
        </h4>
        <p className="mt-2 text-[0.72rem] leading-5 text-slate-500">{item.text}</p>
      </div>
    </article>
  );
}

export default function MedicalSiteMockup({ mini, contentRef, isMobile }) {
  const departments = mini.departments?.length ? mini.departments : mini.items;
  const featuredServices = mini.featuredServices?.length ? mini.featuredServices : mini.items;

  return (
    <div
      ref={contentRef}
      className="h-full overflow-y-auto bg-gradient-to-b from-cyan-50 via-[#eefafa] to-white text-slate-950"
    >
      <div className="mx-auto max-w-5xl p-3 md:p-5">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/45 shadow-[0_28px_80px_rgba(15,118,110,0.16)] backdrop-blur-xl md:rounded-[2.5rem]">
          <header className="sticky top-0 z-30 px-4 pt-4">
            <div className="flex items-center justify-between gap-4 rounded-full border border-white/80 bg-white/80 px-4 py-3 shadow-[0_14px_35px_rgba(15,118,110,0.12)] backdrop-blur-xl">
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
                onClick={() => scrollToSection(contentRef, "contact")}
                className="rounded-full bg-cyan-500 px-4 py-2.5 text-[0.68rem] font-black text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600"
              >
                {mini.primaryCta}
              </button>
            </div>
          </header>

          <section data-mini-section="home" className="px-4 pb-8 pt-4 md:px-7 md:pb-12">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-cyan-100 shadow-inner md:min-h-[29rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(255,255,255,0.76),transparent_26%),linear-gradient(90deg,rgba(236,253,245,0.98)_0%,rgba(236,253,245,0.88)_36%,rgba(8,145,178,0.10)_100%)]" />
              <div className="absolute inset-y-0 right-0 hidden w-[55%] bg-[radial-gradient(circle_at_52%_45%,rgba(8,145,178,0.28),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.16),rgba(14,116,144,0.18))] md:block" />
              <div className="absolute right-8 top-16 hidden h-72 w-64 rounded-[3rem] border border-white/60 bg-white/35 shadow-2xl backdrop-blur md:block">
                <div className="absolute left-10 top-8 h-24 w-24 rounded-full bg-cyan-200/70" />
                <div className="absolute bottom-8 right-10 h-40 w-28 rounded-t-full bg-white/80" />
                <div className="absolute bottom-8 left-14 h-44 w-28 rounded-t-full bg-cyan-300/50" />
              </div>

              <div className="relative flex min-h-[26rem] flex-col justify-center p-7 md:w-[52%] md:p-10">
                <p className="mb-4 inline-flex w-fit rounded-full bg-white/75 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.2em] text-cyan-700 shadow-sm">
                  {mini.eyebrow}
                </p>

                <h3 className="max-w-md text-4xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 md:text-6xl">
                  {mini.headline}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-700">
                  {mini.description}
                </p>
              </div>

              <div className="relative mx-5 -mt-1 rounded-[1.6rem] border border-white/80 bg-white/60 p-4 shadow-[0_18px_50px_rgba(15,118,110,0.22)] backdrop-blur-xl md:absolute md:bottom-9 md:left-10 md:right-10 md:mx-0 md:mt-0">
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
                  <AppointmentField label="Serviciu" value={mini.appointment?.department || "Kinetoterapie"} icon={Stethoscope} />
                  <AppointmentField label="Specialist" value={mini.appointment?.doctor || "Terapeut"} icon={ClipboardPlus} />
                  <AppointmentField label="Dată" value={mini.appointment?.date || "Alege data"} icon={Calendar} />
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "contact")}
                    className="rounded-2xl bg-cyan-500 px-6 py-3 text-xs font-black text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600"
                  >
                    {mini.appointment?.button || "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section data-mini-section="services" className="px-4 py-8 md:px-10 md:py-12">
            <div className="text-center">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-cyan-700">
                Servicii medicale
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] md:text-3xl">
                Departamente principale
              </h3>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {departments.slice(0, 3).map((item, index) => (
                <DepartmentCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </section>

          <section data-mini-section="about" className="bg-cyan-50/70 px-4 py-8 md:px-10 md:py-12">
            <div className="grid gap-4 md:grid-cols-4">
              {mini.stats.map((stat) => (
                <div key={stat.label} className="rounded-[1.35rem] bg-white/75 p-4 text-center shadow-sm">
                  <p className="text-2xl font-black tracking-[-0.05em] text-cyan-700">{stat.value}</p>
                  <p className="mt-1 text-[0.68rem] font-bold text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section data-mini-section="prices" className="px-4 py-8 md:px-10 md:py-12">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-cyan-700">
                  Featured services
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] md:text-3xl">
                  Programe de recuperare
                </h3>
              </div>
              {!isMobile ? (
                <button
                  type="button"
                  onClick={() => scrollToSection(contentRef, "contact")}
                  className="rounded-full border border-cyan-200 bg-white px-4 py-2 text-xs font-black text-cyan-700"
                >
                  Vezi toate
                </button>
              ) : null}
            </div>

            <div className="flex gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:overflow-visible">
              {featuredServices.slice(0, 3).map((item, index) => (
                <FeaturedServiceCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </section>

          <section data-mini-section="contact" className="px-4 pb-8 md:px-10 md:pb-12">
            <div className="grid gap-4 rounded-[2rem] bg-slate-950 p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.22em] text-cyan-300">
                  <Sparkles size={14} /> Programare rapidă
                </p>
                <h3 className="text-2xl font-black tracking-[-0.04em]">Programează o evaluare</h3>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/65">
                  <span className="inline-flex items-center gap-2"><Phone size={14} /> {mini.contact.phone}</span>
                  <span className="inline-flex items-center gap-2"><MapPin size={14} /> {mini.contact.address}</span>
                  <span className="inline-flex items-center gap-2"><Clock size={14} /> 48h răspuns</span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-full bg-white px-6 py-3 text-xs font-black text-slate-950"
              >
                {mini.primaryCta}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
