import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Gem,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { NavButton, navTarget, scrollToSection } from "./shared.jsx";

const serviceIcons = [Scissors, Wand2, Sparkles];
const packageIcons = [Gem, Sparkles, CalendarDays];

function targetForNav(item) {
  if (item.includes("Galer")) return "gallery";
  if (item.includes("Program")) return "booking";
  return navTarget(item);
}

function LunaLogo({ compact = false }) {
  return (
    <img
      src="/images/minisite/luna-beauty-logo.png"
      alt="Luna Beauty Studio"
      className={
        compact
          ? "h-10 w-auto max-w-[4.8rem] object-contain"
          : "h-14 w-auto max-w-[6.5rem] object-contain"
      }
      draggable={false}
    />
  );
}

function SalonVisual({ mini, mobile = false }) {
  return (
    <div
      className={
        mobile
          ? "relative min-h-[24rem] overflow-hidden bg-[#2b1717]"
          : "relative min-h-[38rem] overflow-hidden bg-[#2b1717]"
      }
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(246,216,186,.30),transparent_30%),radial-gradient(circle_at_76%_74%,rgba(142,79,83,.50),transparent_36%),linear-gradient(135deg,#2c1817_0%,#7f4a48_50%,#f7e5d5_100%)]" />

      <div
        className={
          mobile
            ? "absolute right-5 top-9 h-[64%] w-[46%] border border-[#f6d8ba]/38 bg-[#f9efe3]/16 backdrop-blur-sm"
            : "absolute right-8 top-10 h-[72%] w-[44%] border border-[#f6d8ba]/38 bg-[#f9efe3]/16 backdrop-blur-sm"
        }
      />

      <div
        className={
          mobile
            ? "absolute right-10 top-16 h-[42%] w-[34%] bg-[#f7e5d5]"
            : "absolute right-16 top-20 h-[46%] w-[34%] bg-[#f7e5d5]"
        }
      />

      <div
        className={
          mobile
            ? "absolute right-14 top-24 h-28 w-28 rounded-full bg-[#8e4f53]"
            : "absolute right-24 top-28 h-36 w-36 rounded-full bg-[#8e4f53]"
        }
      />

      <div
        className={
          mobile
            ? "absolute right-[4.85rem] top-[7.35rem] h-16 w-16 rounded-full bg-[#f1c7a7]"
            : "absolute right-[8.5rem] top-[10.25rem] h-20 w-20 rounded-full bg-[#f1c7a7]"
        }
      />

      <div
        className={
          mobile
            ? "absolute bottom-10 left-7 h-20 w-20 border-[13px] border-[#d6a064]/85"
            : "absolute bottom-12 left-10 h-28 w-28 border-[18px] border-[#d6a064]/85"
        }
      />

      <div
        className={
          mobile
            ? "absolute left-5 top-5 inline-flex max-w-[13rem] items-center gap-2 border border-[#f6d8ba]/25 bg-[#1b1010]/58 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.06em] text-[#f7e5d5] backdrop-blur-md"
            : "absolute left-8 top-8 inline-flex items-center gap-2 border border-[#f6d8ba]/25 bg-[#1b1010]/58 px-4 py-3 text-xs font-black uppercase tracking-[0.06em] text-[#f7e5d5] backdrop-blur-md"
        }
      >
        <Sparkles size={15} className="shrink-0 text-[#d6a064]" />
        <span className="truncate">{mini.subtitle}</span>
      </div>

      <div
        className={
          mobile
            ? "absolute bottom-6 right-5 w-[12rem] border border-[#f6d8ba]/25 bg-[#1b1010]/82 p-4 text-[#f7e5d5] shadow-[0_24px_60px_rgba(0,0,0,.20)] backdrop-blur-md"
            : "absolute bottom-8 right-8 w-[13.5rem] border border-[#f6d8ba]/25 bg-[#1b1010]/82 p-4 text-[#f7e5d5] shadow-[0_24px_60px_rgba(0,0,0,.20)] backdrop-blur-md"
        }
      >
        <p className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-[#d6a064]">
          Next glow slot
        </p>

        <div className="mt-3 flex items-end justify-between gap-4">
          <p className="font-serif text-3xl font-semibold leading-none">
            18:30
          </p>

          <CalendarDays size={20} className="shrink-0 text-[#f6d8ba]" />
        </div>

        <p className="mt-3 text-xs leading-5 text-white/58">
          Confirmare rapidă pentru ritualurile principale.
        </p>
      </div>
    </div>
  );
}

function ServiceLine({ item, index, mobile }) {
  const Icon = serviceIcons[index % serviceIcons.length];

  return (
    <article className="border-b border-[#e8cbb5] py-6 last:border-b-0">
      <div
        className={mobile ? "grid gap-4" : "grid gap-5"}
        style={{
          gridTemplateColumns: mobile
            ? "1fr"
            : "3.25rem minmax(0, 1fr) auto",
        }}
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#241515] text-[#f6d8ba]">
          <Icon size={19} />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-3">
            <h4 className="font-serif text-2xl font-semibold leading-tight text-[#241515]">
              {item.title}
            </h4>

            <span className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#b66d5f]">
              Signature
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#7c6259]">
            {item.text}
          </p>
        </div>

        <span className="text-xs font-black text-[#b66d5f]">0{index + 1}</span>
      </div>
    </article>
  );
}

function HighlightCard({ item, index }) {
  return (
    <article
      className={
        index === 0
          ? "border border-[#e8cbb5] bg-[#f9efe3] p-5"
          : "border border-[#e8cbb5] bg-[#241515] p-5 text-[#f7e5d5]"
      }
    >
      <p
        className={
          index === 0
            ? "text-xs font-black uppercase tracking-[0.08em] text-[#b66d5f]"
            : "text-xs font-black uppercase tracking-[0.08em] text-[#d6a064]"
        }
      >
        Moment 0{index + 1}
      </p>

      <h4 className="mt-4 font-serif text-2xl font-semibold leading-tight">
        {item.title}
      </h4>

      <p
        className={
          index === 0
            ? "mt-3 text-sm leading-6 text-[#7c6259]"
            : "mt-3 text-sm leading-6 text-white/62"
        }
      >
        {item.text}
      </p>
    </article>
  );
}

function PackageCard({ item, index }) {
  const Icon = packageIcons[index % packageIcons.length];

  const styles = [
    "bg-[#f7e5d5]",
    "bg-[#fff8ef]",
    "bg-[#d6a064]/88",
  ];

  return (
    <article
      className={`min-w-0 border border-[#241515]/15 p-6 ${
        styles[index % styles.length]
      }`}
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#241515] text-[#f6d8ba]">
          <Icon size={18} />
        </span>

        <span className="text-xs font-black uppercase tracking-[0.06em] text-[#8e4f53]">
          Ritual 0{index + 1}
        </span>
      </div>

      <h4 className="font-serif text-3xl font-semibold leading-tight text-[#241515]">
        {item.title}
      </h4>

      <p className="mt-4 text-sm leading-7 text-[#6f4f48]">{item.text}</p>
    </article>
  );
}

function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4 border border-[#e8cbb5] bg-white p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f7e5d5] text-[#8e4f53]">
        <Icon size={17} />
      </span>

      <div className="min-w-0">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#b66d5f]">
          {label}
        </p>

        <p className="mt-1 break-words text-sm leading-6 text-[#241515]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function BeautySiteMockup({
  mini,
  projectId = "beauty",
  contentRef,
  isMobile,
}) {
  const mobile = Boolean(isMobile);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = mini.items || [];
  const packages = mini.packages || services;
  const highlights = mini.highlights || services.slice(0, 2);
  const stats = mini.stats || [];

  function handleNavClick(item) {
    scrollToSection(contentRef, targetForNav(item));
    setMobileMenuOpen(false);
  }

  return (
    <div
      ref={contentRef}
      className="h-full overflow-y-auto overflow-x-hidden bg-[#f9efe3] text-[#241515]"
    >
      <header className="sticky top-0 z-40 border-b border-[#e8cbb5] bg-[#f9efe3]/95 px-5 py-3 backdrop-blur-xl">
        {mobile ? (
          <div>
            <div className="flex items-center justify-between gap-3">
              <LunaLogo compact />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSection(contentRef, "booking")}
                  className="shrink-0 bg-[#241515] px-3 py-3 text-[0.62rem] font-black uppercase tracking-[0.04em] text-[#f7e5d5]"
                >
                  Programare
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((value) => !value)}
                  className="grid h-10 w-10 shrink-0 place-items-center border border-[#e8cbb5] bg-white text-[#241515]"
                  aria-label={
                    mobileMenuOpen ? "Închide meniul" : "Deschide meniul"
                  }
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>

            {mobileMenuOpen ? (
              <nav className="mt-4 grid gap-2 border-t border-[#e8cbb5] pt-4">
                {mini.nav?.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="w-full border border-[#e8cbb5] bg-white px-4 py-3 text-left text-xs font-black uppercase tracking-[0.04em] text-[#8e4f53]"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            ) : null}
          </div>
        ) : (
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
            <LunaLogo />

            <nav className="flex items-center gap-5">
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

            <button
              type="button"
              onClick={() => scrollToSection(contentRef, "booking")}
              className="shrink-0 bg-[#241515] px-5 py-3 text-xs font-black uppercase tracking-[0.04em] text-[#f7e5d5]"
            >
              {mini.primaryCta}
            </button>
          </div>
        )}
      </header>

      <main>
        <section
          data-mini-section="home"
          className="bg-[#f9efe3]"
          style={{ containerType: "inline-size" }}
        >
          {mobile ? (
            <div>
              <div className="px-6 py-10">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#b66d5f]">
                  {mini.eyebrow}
                </p>

                <h1
                  className="mt-6 max-w-full font-serif font-semibold leading-[0.98] tracking-[-0.035em] text-[#241515]"
                  style={{
                    fontSize: "clamp(2.8rem, 13cqw, 3.75rem)",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                  }}
                >
                  {mini.headline}
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#7c6259]">
                  {mini.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "booking")}
                    className="inline-flex items-center gap-2 bg-[#8e4f53] px-5 py-3 text-xs font-black uppercase text-white"
                  >
                    {mini.primaryCta}
                    <CalendarDays size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "services")}
                    className="border border-[#8e4f53]/30 bg-white px-5 py-3 text-xs font-black uppercase text-[#8e4f53]"
                  >
                    {mini.secondaryCta}
                  </button>
                </div>
              </div>

              <SalonVisual mini={mini} mobile />
            </div>
          ) : (
            <div
              className="grid min-h-[38rem]"
              style={{
                gridTemplateColumns: "minmax(0, 1.05fr) minmax(18rem, 0.9fr)",
              }}
            >
              <div className="flex min-w-0 flex-col justify-center border-r border-[#e8cbb5] px-10 py-12">
                <div className="mb-7 flex items-center gap-4">
                  <LunaLogo />

                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#b66d5f]">
                      {mini.eyebrow}
                    </p>

                    <p className="mt-1 text-[0.72rem] leading-5 text-[#7c6259]">
                      Premium Beauty & Self Care
                    </p>
                  </div>
                </div>

                <h1
                  className="max-w-[31rem] font-serif font-semibold leading-[0.96] tracking-[-0.04em] text-[#241515]"
                  style={{
                    fontSize: "clamp(2.9rem, 6cqw, 5.1rem)",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                  }}
                >
                  {mini.headline}
                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-[#7c6259]">
                  {mini.description}
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "booking")}
                    className="inline-flex items-center gap-2 bg-[#8e4f53] px-6 py-4 text-xs font-black uppercase text-white"
                  >
                    {mini.primaryCta}
                    <CalendarDays size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection(contentRef, "services")}
                    className="border border-[#8e4f53]/30 bg-white px-6 py-4 text-xs font-black uppercase text-[#8e4f53]"
                  >
                    {mini.secondaryCta}
                  </button>
                </div>
              </div>

              <SalonVisual mini={mini} />
            </div>
          )}
        </section>

        <section
          data-mini-section="services"
          className="border-y border-[#e8cbb5] bg-[#fff8ef]"
          style={{ containerType: "inline-size" }}
        >
          <div className="px-6 py-12">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#b66d5f]">
                {mini.subtitle}
              </p>

              <h2
                className="mt-4 max-w-4xl font-serif font-semibold leading-tight tracking-[-0.03em] text-[#241515]"
                style={{
                  fontSize: mobile
                    ? "clamp(2.5rem, 11cqw, 3.3rem)"
                    : "clamp(2.9rem, 5cqw, 4.3rem)",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                {mini.accent}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#7c6259]">
                {mini.featureText || mini.description}
              </p>
            </div>
          </div>

          <div className="border-t border-[#e8cbb5] bg-[#fff8ef] px-6 py-2">
            <div className="mx-auto max-w-7xl">
              {services.slice(0, 3).map((item, index) => (
                <ServiceLine
                  key={`${projectId}-service-${item.title}`}
                  item={item}
                  index={index}
                  mobile={mobile}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          data-mini-section="gallery"
          className="bg-[#f9efe3] px-6 py-12"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#b66d5f]">
                  Galerie & atmosferă
                </p>

                <h2
                  className="mt-4 max-w-4xl font-serif font-semibold leading-tight tracking-[-0.035em] text-[#241515]"
                  style={{
                    fontSize: mobile
                      ? "clamp(2.6rem, 12cqw, 3.45rem)"
                      : "clamp(3rem, 5cqw, 4.4rem)",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    hyphens: "none",
                  }}
                >
                  Un spațiu cald, premium și ușor de transformat în programări.
                </h2>
              </div>

              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: mobile
                    ? "1fr"
                    : "repeat(auto-fit, minmax(13rem, 1fr))",
                }}
              >
                {highlights.slice(0, 2).map((item, index) => (
                  <HighlightCard
                    key={`${projectId}-highlight-${item.title}`}
                    item={item}
                    index={index}
                  />
                ))}

                {packages.slice(0, 3).map((item, index) => (
                  <PackageCard
                    key={`${projectId}-package-${item.title}`}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-y border-[#e8cbb5] bg-[#241515] text-[#f7e5d5]"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl px-6 py-12">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#d6a064]">
              Experience
            </p>

            <h2
              className="mt-4 max-w-4xl font-serif font-semibold leading-tight tracking-[-0.03em]"
              style={{
                fontSize: mobile
                  ? "clamp(2.6rem, 12cqw, 3.45rem)"
                  : "clamp(3rem, 5cqw, 4.4rem)",
                wordBreak: "normal",
                overflowWrap: "normal",
                hyphens: "none",
              }}
            >
              {mini.bottomTitle || "Beauty experience, simple booking."}
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">
              {mini.bottomText ||
                "Clear packages, warm visuals and conversion-focused booking actions."}
            </p>

            <div
              className="mt-10 grid border border-white/10"
              style={{
                gridTemplateColumns: mobile
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(auto-fit, minmax(8rem, 1fr))",
              }}
            >
              {stats.slice(0, 4).map((stat) => (
                <div
                  key={stat.label}
                  className="border-b border-r border-white/10 p-5 last:border-r-0"
                >
                  <p className="font-serif text-3xl font-semibold text-[#d6a064]">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.06em] text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          data-mini-section="booking"
          className="bg-[#fff8ef] px-6 py-12"
          style={{ containerType: "inline-size" }}
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#b66d5f]">
              Programări
            </p>

            <h2
              className="mt-4 max-w-4xl font-serif font-semibold leading-tight tracking-[-0.035em] text-[#241515]"
              style={{
                fontSize: mobile
                  ? "clamp(2.6rem, 12cqw, 3.45rem)"
                  : "clamp(3rem, 5cqw, 4.4rem)",
                wordBreak: "normal",
                overflowWrap: "normal",
                hyphens: "none",
              }}
            >
              Alege ritualul potrivit și rezervă simplu.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#7c6259]">
              Designul păstrează atmosfera elegantă, dar face pașii de
              programare ușor de urmărit și de accesat.
            </p>

            <div
              className="mt-8 grid gap-5"
              style={{
                gridTemplateColumns: mobile
                  ? "1fr"
                  : "minmax(0, 0.95fr) minmax(18rem, 0.75fr)",
              }}
            >
              <div className="border border-[#e8cbb5] bg-[#f9efe3] p-5">
                <div className="grid gap-3">
                  <ContactRow
                    icon={Phone}
                    label="Telefon"
                    value={mini.contact?.phone}
                  />

                  <ContactRow
                    icon={MapPin}
                    label="Adresă"
                    value={mini.contact?.address}
                  />

                  <ContactRow
                    icon={Mail}
                    label="Email"
                    value={mini.contact?.email || "hello@lunabeauty.ro"}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection(contentRef, "contact")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-3 bg-[#241515] px-5 py-4 text-xs font-black uppercase tracking-[0.04em] text-[#f7e5d5]"
                >
                  Contactează salonul
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="border border-[#e8cbb5] bg-white p-5">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#b66d5f]">
                  Proces simplu
                </p>

                <div className="mt-5 grid gap-4">
                  {[
                    "Alegi serviciul",
                    "Trimiți cererea",
                    "Primești confirmarea",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-4 border-b border-[#e8cbb5] pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f7e5d5] text-xs font-black text-[#8e4f53]">
                        0{index + 1}
                      </span>

                      <p className="text-sm font-bold text-[#241515]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          data-mini-section="contact"
          className="border-t border-[#e8cbb5] bg-[#f9efe3] px-6 py-6"
        >
          <div
            className={
              mobile
                ? "mx-auto flex max-w-7xl flex-col gap-3 text-xs text-[#7c6259]"
                : "mx-auto flex max-w-7xl items-center justify-between gap-6 text-xs text-[#7c6259]"
            }
          >
            <p>© 2024 {mini.brand}. Toate drepturile rezervate.</p>

            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2">
                <Clock3 size={14} />
                Confirmare în 24h
              </span>

              <span className="inline-flex items-center gap-2">
                <Sparkles size={14} />
                Beauty & self care
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}