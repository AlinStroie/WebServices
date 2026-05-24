import {
  Activity,
  ArrowRight,
  Calendar,
  ClipboardPlus,
  Dumbbell,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  TimerReset,
} from "lucide-react";
import { MiniLogo, NavButton, navTarget, scrollToSection } from "./shared.jsx";

const departmentIcons = [ClipboardPlus, Dumbbell, HeartPulse];
const serviceIcons = [Activity, ShieldCheck, TimerReset];

function targetForNav(item) {
  if (item.includes("Despre")) return "about";
  if (item.includes("Pret") || item.includes("Pre")) return "programs";
  return navTarget(item);
}

function MotionVisual() {
  return (
    <div className="relative min-h-[18rem] overflow-hidden bg-[#eaf7f2]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,78,74,.08)_1px,transparent_1px),linear-gradient(rgba(19,78,74,.08)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-8 top-8 h-24 w-24 rounded-full border-[18px] border-[#9be7d0]" />
      <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full border-[18px] border-[#ffd9a8]" />
      <div className="absolute left-[23%] top-[32%] h-28 w-28 rounded-full bg-white shadow-[0_22px_60px_rgba(15,118,110,0.16)]" />
      <div className="absolute left-[31%] top-[40%] h-8 w-8 rounded-full bg-[#134e4a]" />
      <div className="absolute left-[41%] top-[48%] h-3 w-28 rotate-12 rounded-full bg-[#134e4a]" />
      <div className="absolute left-[47%] top-[39%] h-3 w-24 -rotate-[28deg] rounded-full bg-[#134e4a]" />
      <div className="absolute left-[45%] top-[56%] h-3 w-24 rotate-[38deg] rounded-full bg-[#134e4a]" />
      <div className="absolute bottom-8 left-8 border border-[#134e4a]/15 bg-white p-4 shadow-sm">
        <p className="text-[0.65rem] font-bold text-[#64748b]">Mobility score</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-black text-[#134e4a]">92</span>
          <span className="pb-1 text-xs font-bold text-[#f97316]">+18%</span>
        </div>
      </div>
    </div>
  );
}

function IntakePanel({ mini, contentRef }) {
  const appointment = mini.appointment || {};
  const fields = [
    { label: "Program", value: appointment.department || "Kinetoterapie" },
    { label: "Specialist", value: appointment.doctor || "Terapeut" },
    { label: "Data", value: appointment.date || "Alege data" },
  ];

  return (
    <div className="border border-[#134e4a]/15 bg-white p-4 shadow-[0_18px_45px_rgba(15,118,110,0.10)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase text-[#f97316]">Intake rapid</p>
          <h4 className="mt-1 text-lg font-black text-[#10211f]">Plan de recuperare</h4>
        </div>
        <Calendar size={20} className="text-[#0f766e]" />
      </div>
      <div className="grid gap-2">
        {fields.map((field) => (
          <button
            type="button"
            key={field.label}
            className="flex items-center justify-between border border-[#d7e7e0] bg-[#f8fbf8] px-3 py-2 text-left"
          >
            <span className="text-[0.65rem] font-bold text-[#64748b]">{field.label}</span>
            <span className="text-xs font-black text-[#10211f]">{field.value}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scrollToSection(contentRef, "contact")}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-[#134e4a] px-4 py-3 text-xs font-black text-white"
      >
        {appointment.button || mini.primaryCta}
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

function DepartmentCard({ item, index }) {
  const Icon = departmentIcons[index % departmentIcons.length];

  return (
    <article className="border border-[#d7e7e0] bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center bg-[#eaf7f2] text-[#0f766e]">
          <Icon size={19} />
        </span>
        <span className="text-xs font-black text-[#f97316]">0{index + 1}</span>
      </div>
      <h4 className="text-base font-black text-[#10211f]">{item.title}</h4>
      <p className="mt-2 text-xs leading-5 text-[#64748b]">{item.text}</p>
    </article>
  );
}

function ServiceRow({ item, index }) {
  const Icon = serviceIcons[index % serviceIcons.length];

  return (
    <article className="grid gap-4 border-b border-[#d7e7e0] py-5 last:border-b-0 md:grid-cols-[auto_1fr_auto] md:items-center">
      <span className="grid h-12 w-12 place-items-center bg-[#134e4a] text-white">
        <Icon size={20} />
      </span>
      <div>
        <h4 className="font-black text-[#10211f]">{item.title}</h4>
        <p className="mt-1 max-w-xl text-xs leading-5 text-[#64748b]">{item.text}</p>
      </div>
      <button type="button" className="inline-flex w-fit items-center gap-2 text-xs font-black text-[#0f766e]">
        Detalii <ArrowRight size={14} />
      </button>
    </article>
  );
}

export default function MedicalSiteMockup({ mini, contentRef, isMobile }) {
  const departments = mini.departments?.length ? mini.departments : mini.items;
  const featuredServices = mini.featuredServices?.length ? mini.featuredServices : mini.items;

  return (
    <div ref={contentRef} className="h-full overflow-y-auto bg-[#f6f3ea] text-[#10211f]">
      <header className="sticky top-0 z-30 border-b border-[#d7e7e0] bg-[#fbfaf4]/95 px-5 py-3 backdrop-blur md:px-8">
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
            onClick={() => scrollToSection(contentRef, "contact")}
            className="bg-[#10211f] px-4 py-2 text-xs font-black text-white"
          >
            {mini.primaryCta}
          </button>
        </div>
      </header>

      <main>
        <section data-mini-section="home" className="grid border-b border-[#d7e7e0] bg-[#fbfaf4] md:grid-cols-[1.05fr_0.95fr]">
          <div className="px-6 py-12 md:px-10 md:py-16">
            <p className="mb-4 text-xs font-black uppercase text-[#0f766e]">{mini.eyebrow}</p>
            <h1 className="max-w-2xl text-4xl font-black leading-tight text-[#10211f] md:text-6xl">
              {mini.headline}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#64748b]">{mini.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "contact")}
                className="inline-flex items-center gap-2 bg-[#134e4a] px-5 py-3 text-xs font-black text-white"
              >
                {mini.primaryCta}
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "services")}
                className="border border-[#134e4a]/25 bg-white px-5 py-3 text-xs font-black text-[#134e4a]"
              >
                {mini.secondaryCta}
              </button>
            </div>
          </div>
          <div className="relative border-t border-[#d7e7e0] md:border-l md:border-t-0">
            <MotionVisual />
            <div className="p-5 md:absolute md:bottom-6 md:left-6 md:right-6 md:p-0">
              <IntakePanel mini={mini} contentRef={contentRef} />
            </div>
          </div>
        </section>

        <section data-mini-section="about" className="grid border-b border-[#d7e7e0] bg-white md:grid-cols-4">
          {mini.stats.slice(0, 4).map((stat) => (
            <div key={stat.label} className="border-b border-[#d7e7e0] px-6 py-5 md:border-b-0 md:border-r">
              <p className="text-2xl font-black text-[#0f766e]">{stat.value}</p>
              <p className="mt-1 text-xs font-bold text-[#64748b]">{stat.label}</p>
            </div>
          ))}
        </section>

        <section data-mini-section="services" className="bg-[#f6f3ea] px-6 py-10 md:px-10">
          <div className="mb-6 grid gap-4 md:grid-cols-[0.75fr_1.25fr] md:items-end">
            <p className="text-xs font-black uppercase text-[#f97316]">Departamente</p>
            <h2 className="text-3xl font-black leading-tight text-[#10211f]">
              Evaluare, exercitii si terapie manuala intr-un traseu clar.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {departments.slice(0, 3).map((item, index) => (
              <DepartmentCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section data-mini-section="programs" className="grid bg-white md:grid-cols-[0.75fr_1.25fr]">
          <div className="border-b border-[#d7e7e0] bg-[#10211f] p-6 text-white md:border-b-0 md:border-r md:p-10">
            <p className="text-xs font-black uppercase text-[#9be7d0]">Programe recomandate</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              Miscare naturala, masurata si explicata pas cu pas.
            </h2>
            {!isMobile ? (
              <p className="mt-4 text-sm leading-6 text-white/65">
                Sectiunea arata rapid ce poate alege pacientul si cum ajunge la o programare.
              </p>
            ) : null}
          </div>
          <div className="px-6 py-5 md:px-8">
            {featuredServices.slice(0, 3).map((item, index) => (
              <ServiceRow key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section data-mini-section="contact" className="grid border-t border-[#d7e7e0] bg-[#fbfaf4] md:grid-cols-[1fr_1fr]">
          <div className="p-6 md:p-10">
            <p className="text-xs font-black uppercase text-[#0f766e]">Contact</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">Programeaza o evaluare initiala.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#64748b]">
              Primul pas este o discutie scurta despre obiectiv, nivelul de mobilitate si program.
            </p>
          </div>
          <div className="grid gap-3 border-t border-[#d7e7e0] p-6 md:border-l md:border-t-0 md:p-10">
            <p className="flex items-center gap-3 border border-[#d7e7e0] bg-white p-4 text-sm text-[#64748b]">
              <Phone size={16} className="text-[#0f766e]" /> {mini.contact.phone}
            </p>
            <p className="flex items-center gap-3 border border-[#d7e7e0] bg-white p-4 text-sm text-[#64748b]">
              <MapPin size={16} className="text-[#0f766e]" /> {mini.contact.address}
            </p>
            <button type="button" className="bg-[#f97316] px-5 py-3 text-xs font-black text-white">
              {mini.primaryCta}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
