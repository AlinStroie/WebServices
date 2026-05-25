import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Calendar,
  ClipboardPlus,
  Dumbbell,
  HeartPulse,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  TimerReset,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import { NavButton, navTarget, scrollToSection } from "./shared.jsx";

const departmentIcons = [ClipboardPlus, Dumbbell, HeartPulse];
const serviceIcons = [Activity, ShieldCheck, TimerReset];
const statIcons = [User, Users, Star, Trophy];

function targetForNav(item) {
  if (item.includes("Despre")) return "about";

  if (item.includes("Pret") || item.includes("Preț") || item.includes("Pre")) {
    return "programs";
  }

  return navTarget(item);
}

function MoveaLogo({ compact = false }) {
  return (
    <img
      src="/images/minisite/movea-logo.png"
      alt="Movea Clinic"
      className={`w-auto object-contain ${compact ? "h-10" : "h-12 lg:h-14"}`}
      draggable={false}
    />
  );
}

function HeroBackground({ mobile = false }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#eaf7f2]">
      <img
        src="/images/minisite/kineto-hero.png"
        alt="Movea Clinic fiziokinetoterapie"
        className={
          mobile
            ? "h-full w-full object-cover object-[68%_36%]"
            : "h-full w-full object-cover object-[68%_35%]"
        }
        draggable={false}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#052d2a]/96 via-[#075f57]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#fbfaf4]/18 via-transparent to-[#fbfaf4]/8" />
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
    <div className="w-full border border-[#d7e7e0] bg-white p-5 shadow-[0_24px_60px_rgba(15,118,110,0.16)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.06em] text-[#f97316]">
            Intake rapid
          </p>

          <h4 className="mt-1 text-xl font-black leading-tight text-[#10211f]">
            Plan de recuperare
          </h4>
        </div>

        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eaf7f2] text-[#0f766e]">
          <Calendar size={20} />
        </div>
      </div>

      <div className="grid gap-2.5">
        {fields.map((field) => (
          <button
            type="button"
            key={field.label}
            className="grid min-w-0 grid-cols-[0.82fr_1.18fr] border border-[#d7e7e0] bg-[#fbfaf4] text-left transition hover:border-[#0f766e]/40"
          >
            <span className="min-w-0 border-r border-[#d7e7e0] px-4 py-3 text-xs font-bold text-[#64748b]">
              {field.label}
            </span>

            <span className="flex min-w-0 items-center justify-between gap-2 px-4 py-3 text-xs font-black text-[#0f766e]">
              <span className="min-w-0 truncate">{field.value}</span>
              <span className="shrink-0 text-[#0f766e]">⌄</span>
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToSection(contentRef, "contact")}
        className="mt-4 inline-flex w-full items-center justify-center gap-3 bg-[#075f57] px-5 py-4 text-xs font-black uppercase tracking-[0.03em] text-white transition hover:bg-[#064e48]"
      >
        {appointment.button || mini.primaryCta}
        <ArrowRight size={17} />
      </button>
    </div>
  );
}

function MobilityCard() {
  return (
    <div className="w-full border border-[#d7e7e0] bg-white/94 p-5 shadow-[0_20px_55px_rgba(15,118,110,0.14)] backdrop-blur-md">
      <p className="text-xs font-bold text-[#64748b]">Mobility score</p>

      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-black text-[#075f57] lg:text-4xl">
          92
        </span>

        <span className="pb-1 text-xs font-black text-[#f97316] lg:pb-2 lg:text-sm">
          +18%
        </span>
      </div>

      <div className="mt-3 h-8 w-28">
        <svg viewBox="0 0 120 36" fill="none" className="h-full w-full">
          <path
            d="M2 30 L18 22 L31 25 L45 15 L59 19 L73 10 L90 13 L106 6 L118 3"
            stroke="#0f766e"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

function DepartmentCard({ item, index }) {
  const Icon = departmentIcons[index % departmentIcons.length];

  return (
    <article className="min-w-0 border border-[#d7e7e0] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,118,110,0.10)]">
      <div className="mb-7 flex items-start justify-between gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#dff5ee] text-[#0f766e]">
          <Icon size={23} />
        </span>

        <span className="shrink-0 text-sm font-black text-[#f97316]">
          0{index + 1}
        </span>
      </div>

      <h4 className="text-lg font-black leading-tight text-[#10211f]">
        {item.title}
      </h4>

      <p className="mt-3 text-sm leading-6 text-[#64748b]">{item.text}</p>
    </article>
  );
}

function ServiceRow({ item, index, mobile }) {
  const Icon = serviceIcons[index % serviceIcons.length];

  return (
    <article
      className={
        mobile
          ? "grid min-w-0 gap-4 border-b border-[#d7e7e0] py-5 last:border-b-0"
          : "grid min-w-0 gap-4 border-b border-[#d7e7e0] py-5 last:border-b-0 xl:grid-cols-[auto_1fr_auto] xl:items-center"
      }
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center bg-[#075f57] text-white shadow-[0_14px_30px_rgba(15,118,110,0.18)]">
        <Icon size={22} />
      </span>

      <div className="min-w-0">
        <h4 className="text-base font-black leading-tight text-[#10211f]">
          {item.title}
        </h4>

        <p className="mt-1 max-w-xl text-sm leading-6 text-[#64748b]">
          {item.text}
        </p>
      </div>

      <button
        type="button"
        className="inline-flex w-fit shrink-0 items-center gap-2 text-xs font-black text-[#0f766e]"
      >
        Detalii <ArrowRight size={15} />
      </button>
    </article>
  );
}

export default function MedicalSiteMockup({ mini, contentRef, isMobile }) {
  const mobile = Boolean(isMobile);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const departments = mini.departments?.length
    ? mini.departments
    : mini.items || [];

  const featuredServices = mini.featuredServices?.length
    ? mini.featuredServices
    : mini.items || [];

  function handleNavClick(item) {
    scrollToSection(contentRef, targetForNav(item));
    setMobileMenuOpen(false);
  }

  return (
    <div
      ref={contentRef}
      className="h-full overflow-y-auto overflow-x-hidden bg-[#fbfaf4] text-[#10211f]"
    >
      <header
        className={
          mobile
            ? "sticky top-0 z-40 border-b border-[#d7e7e0] bg-[#fbfaf4]/94 px-5 py-3 backdrop-blur-xl"
            : "sticky top-0 z-40 border-b border-[#d7e7e0] bg-[#fbfaf4]/94 px-5 py-3 backdrop-blur-xl lg:px-8"
        }
      >
        {mobile ? (
          <div>
            <div className="flex items-center justify-between gap-3">
              <MoveaLogo compact />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection(contentRef, "contact")}
                  className="shrink-0 bg-[#075f57] px-3 py-3 text-[0.62rem] font-black uppercase tracking-[0.04em] text-white transition hover:bg-[#064e48]"
                >
                  Programare
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((value) => !value)}
                  className="grid h-10 w-10 shrink-0 place-items-center border border-[#d7e7e0] bg-white text-[#075f57]"
                  aria-label={
                    mobileMenuOpen ? "Închide meniul" : "Deschide meniul"
                  }
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>

            {mobileMenuOpen ? (
              <nav className="mt-4 grid gap-2 border-t border-[#d7e7e0] pt-4">
                {mini.nav.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="w-full border border-[#d7e7e0] bg-white px-4 py-3 text-left text-xs font-black uppercase tracking-[0.03em] text-[#075f57]"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            ) : null}
          </div>
        ) : (
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
            <MoveaLogo />

            <nav className="hidden items-center gap-8 md:flex">
              {mini.nav.map((item) => (
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

            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "contact")}
              className="shrink-0 bg-[#075f57] px-5 py-3 text-xs font-black uppercase tracking-[0.04em] text-white transition hover:bg-[#064e48]"
            >
              {mini.primaryCta}
            </button>
          </div>
        )}
      </header>

      <main>
        <section
          data-mini-section="home"
          className="relative overflow-hidden border-b border-[#d7e7e0] bg-[#fbfaf4]"
        >
          {mobile ? (
            <>
              <div
                className="relative overflow-hidden px-6 py-10"
                style={{ containerType: "inline-size" }}
              >
                <HeroBackground mobile />

                <div className="relative z-20 min-w-0">
                  <p className="text-xs font-black uppercase leading-5 tracking-[0.04em] text-[#9fe7da]">
                    {mini.eyebrow}
                  </p>

                  <p className="mt-2 text-sm font-medium leading-6 text-white/78">
                    {mini.subtitle}
                  </p>

                  <h1
                    className="mt-7 max-w-full font-black leading-[0.95] tracking-[-0.05em] text-white"
                    style={{
                      fontSize: "clamp(2.05rem, 10cqw, 2.75rem)",
                      wordBreak: "normal",
                      overflowWrap: "normal",
                      hyphens: "none",
                    }}
                  >
                    {mini.headline}
                  </h1>

                  <p className="mt-5 max-w-md text-sm leading-7 text-white/78">
                    {mini.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => scrollToSection(contentRef, "contact")}
                      className="inline-flex items-center gap-3 bg-white px-5 py-3 text-xs font-black uppercase text-[#075f57] transition hover:bg-[#eaf7f2]"
                    >
                      {mini.primaryCta}
                      <ArrowRight size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection(contentRef, "services")}
                      className="border border-white/45 bg-white/10 px-5 py-3 text-xs font-black uppercase text-white backdrop-blur transition hover:bg-white/20"
                    >
                      {mini.secondaryCta}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 bg-[#fbfaf4] px-6 py-6">
                <MobilityCard />
                <IntakePanel mini={mini} contentRef={contentRef} />
              </div>
            </>
          ) : (
            <div
              className="relative min-h-[42rem] overflow-hidden"
              style={{ containerType: "inline-size" }}
            >
              <HeroBackground />

              <div className="relative z-20 grid min-h-[42rem] min-w-0 gap-8 px-8 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.65fr)] lg:px-16">
                <div className="flex min-w-0 flex-col justify-center">
                  <p className="text-xs font-black uppercase leading-5 tracking-[0.04em] text-[#9fe7da]">
                    {mini.eyebrow}
                  </p>

                  <p className="mt-2 text-sm font-medium leading-6 text-white/76">
                    {mini.subtitle}
                  </p>

                  <h1
                    className="mt-8 max-w-[35rem] font-black leading-[0.95] tracking-[-0.055em] text-white"
                    style={{
                      fontSize: "clamp(2.75rem, 5.4cqw, 4.65rem)",
                      wordBreak: "normal",
                      overflowWrap: "normal",
                      hyphens: "none",
                    }}
                  >
                    {mini.headline}
                  </h1>

                  <p className="mt-6 max-w-md text-sm leading-7 text-white/76">
                    {mini.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToSection(contentRef, "contact")}
                      className="inline-flex items-center gap-3 bg-white px-6 py-4 text-xs font-black uppercase text-[#075f57] transition hover:bg-[#eaf7f2]"
                    >
                      {mini.primaryCta}
                      <ArrowRight size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection(contentRef, "services")}
                      className="border border-white/45 bg-white/10 px-6 py-4 text-xs font-black uppercase text-white backdrop-blur transition hover:bg-white/20"
                    >
                      {mini.secondaryCta}
                    </button>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col justify-center gap-6 lg:items-end">
                  <div className="w-full max-w-[14rem]">
                    <MobilityCard />
                  </div>

                  <div className="w-full max-w-[24rem]">
                    <IntakePanel mini={mini} contentRef={contentRef} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section
          data-mini-section="about"
          className="border-b border-[#d7e7e0] bg-white"
        >
          <div className={mobile ? "grid grid-cols-1" : "grid grid-cols-4"}>
            {mini.stats.slice(0, 4).map((stat, index) => {
              const Icon = statIcons[index % statIcons.length];

              return (
                <div
                  key={stat.label}
                  className={
                    mobile
                      ? "flex items-center gap-4 border-b border-[#d7e7e0] px-6 py-6 last:border-b-0"
                      : "flex min-w-0 items-center justify-center gap-3 border-r border-[#d7e7e0] px-4 py-7 last:border-r-0"
                  }
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#dff5ee] text-[#0f766e]">
                    <Icon size={20} />
                  </span>

                  <div className={mobile ? "min-w-0" : "min-w-0 text-left"}>
                    <p className="whitespace-nowrap text-3xl font-black leading-none text-[#075f57]">
                      {stat.value}
                    </p>

                    <p className="mt-2 whitespace-nowrap text-[0.62rem] font-black uppercase leading-4 text-[#64748b]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section
          data-mini-section="services"
          className={mobile ? "bg-[#fbfaf4] px-6 py-14" : "bg-[#fbfaf4] px-6 py-14 lg:px-16"}
        >
          <div
            className="mx-auto max-w-7xl"
            style={{ containerType: "inline-size" }}
          >
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.04em] text-[#f97316]">
                Departamente
              </p>

              <h2
                className="mt-4 font-black leading-tight tracking-[-0.04em] text-[#10211f]"
                style={{
                  fontSize: mobile
                    ? "clamp(2rem, 9cqw, 2.6rem)"
                    : "clamp(2.35rem, 4.2cqw, 3.35rem)",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                Evaluare, exerciții și terapie manuală într-un traseu clar.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#64748b]">
                Abordare integrată pentru o recuperare eficientă și durabilă.
              </p>

              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "programs")}
                className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase text-[#0f766e]"
              >
                Vezi toate departamentele
                <ArrowRight size={15} />
              </button>
            </div>

            <div
              className="mt-10 grid gap-5"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(14rem, 1fr))",
              }}
            >
              {departments.slice(0, 3).map((item, index) => (
                <DepartmentCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section
          data-mini-section="programs"
          className={
            mobile
              ? "bg-white px-0 py-10"
              : "bg-white px-6 py-10 lg:px-16"
          }
        >
          <div
            className={
              mobile
                ? "mx-auto w-full max-w-7xl border-y border-[#d7e7e0]"
                : "mx-auto w-full max-w-7xl border border-[#d7e7e0]"
            }
            style={{ containerType: "inline-size" }}
          >
            <div
              className={
                mobile
                  ? "w-full bg-[#075f57] px-6 py-10 text-white"
                  : "w-full bg-[#075f57] p-10 text-white"
              }
            >
              <p className="text-xs font-black uppercase leading-5 text-[#f97316]">
                Programe recomandate
              </p>

              <h2
                className="mt-5 max-w-full font-black leading-tight tracking-[-0.04em]"
                style={{
                  fontSize: mobile
                    ? "clamp(2rem, 11cqw, 2.75rem)"
                    : "clamp(2.35rem, 4.2cqw, 3.35rem)",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                Mișcare naturală, măsurată și explicată pas cu pas.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/78">
                Fiecare program este adaptat obiectivelor tale, pentru rezultate
                reale și durabile.
              </p>

              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "contact")}
                className="mt-8 inline-flex items-center gap-3 text-xs font-black uppercase text-white"
              >
                Vezi toate serviciile
                <ArrowRight size={16} />
              </button>
            </div>

            <div className={mobile ? "bg-white px-6 py-4" : "bg-white px-6 py-4 lg:px-10"}>
              {featuredServices.slice(0, 3).map((item, index) => (
                <ServiceRow
                  key={item.title}
                  item={item}
                  index={index}
                  mobile={mobile}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          data-mini-section="contact"
          className={
            mobile
              ? "border-t border-[#d7e7e0] bg-[#fbfaf4] px-6 py-14"
              : "border-t border-[#d7e7e0] bg-[#fbfaf4] px-6 py-14 lg:px-16"
          }
        >
          <div
            className="mx-auto max-w-7xl"
            style={{ containerType: "inline-size" }}
          >
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-[#0f766e]">
                Vorbim despre sănătate
              </p>

              <h2
                className="mt-4 max-w-4xl font-black leading-tight tracking-[-0.04em] text-[#10211f]"
                style={{
                  fontSize: mobile
                    ? "clamp(2rem, 9cqw, 2.6rem)"
                    : "clamp(2.35rem, 4.2cqw, 3.35rem)",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                Hai să găsim împreună cea mai bună soluție pentru tine.
              </h2>

              <button
                type="button"
                onClick={() => scrollToSection(contentRef, "contact")}
                className="mt-7 inline-flex items-center gap-3 bg-[#075f57] px-6 py-4 text-xs font-black uppercase text-white transition hover:bg-[#064e48]"
              >
                Programează-te acum
                <ArrowRight size={16} />
              </button>
            </div>

            <div
              className={
                mobile
                  ? "mt-10 grid gap-5"
                  : "mt-10 grid gap-6 md:grid-cols-3"
              }
            >
              <div className="min-w-0 border-t border-[#d7e7e0] pt-6">
                <MapPin size={22} className="mb-4 text-[#0f766e]" />

                <p className="text-xs font-black uppercase text-[#64748b]">
                  Locație
                </p>

                <p className="mt-3 text-sm leading-6 text-[#10211f]">
                  {mini.contact.address}
                </p>
              </div>

              <div className="min-w-0 border-t border-[#d7e7e0] pt-6">
                <Phone size={22} className="mb-4 text-[#0f766e]" />

                <p className="text-xs font-black uppercase text-[#64748b]">
                  Telefon
                </p>

                <p className="mt-3 text-sm leading-6 text-[#10211f]">
                  {mini.contact.phone}
                  {mini.contact.secondaryPhone ? (
                    <>
                      <br />
                      {mini.contact.secondaryPhone}
                    </>
                  ) : null}
                </p>
              </div>

              <div className="min-w-0 border-t border-[#d7e7e0] pt-6">
                <Calendar size={22} className="mb-4 text-[#0f766e]" />

                <p className="text-xs font-black uppercase text-[#64748b]">
                  Program
                </p>

                <p className="mt-3 text-sm leading-6 text-[#10211f]">
                  {mini.contact.schedule}
                  {mini.contact.weekendSchedule ? (
                    <>
                      <br />
                      {mini.contact.weekendSchedule}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={
          mobile
            ? "border-t border-[#075f57]/20 bg-[#075f57] px-6 py-5 text-white"
            : "border-t border-[#075f57]/20 bg-[#075f57] px-6 py-5 text-white lg:px-16"
        }
      >
        <div
          className={
            mobile
              ? "mx-auto flex max-w-7xl flex-col gap-3 text-xs text-white/80"
              : "mx-auto flex max-w-7xl flex-col gap-3 text-xs text-white/80 md:flex-row md:items-center md:justify-between"
          }
        >
          <p>© 2024 Movea Clinic. Toate drepturile rezervate.</p>

          <div className="flex flex-col gap-2 md:flex-row md:gap-6">
            <span>Politica de confidențialitate</span>
            <span>Termeni și condiții</span>
          </div>
        </div>
      </footer>
    </div>
  );
}