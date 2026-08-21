import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Layers,
  Loader2,
  MonitorSmartphone,
  RefreshCcw,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import LogoMark from "../components/replica/LogoMark";
import SEO from "../components/SEO";
import { apiFetch } from "../lib/api";
import { siteConfig } from "../data/siteConfig";
import { trackContactOpen, trackCtaClick } from "../lib/analytics";

/**
 * /discovery — the "free consultation" flow.
 *
 * Mirrors the reference's structure: a 4-step wizard on its own page (not
 * a modal), no site nav, centred single column capped at 28rem for the
 * option lists.
 *
 * Two details lifted verbatim from the reference's CSS because they carry
 * the feel:
 *   - progress fill transitions `width 0.5s cubic-bezier(0.22, 1, 0.36, 1)`
 *   - option cards use a 1.5px border, lift `translateY(-1px)` on hover,
 *     and invert to solid ink when selected
 *
 * Choosing an option auto-advances — there is no "next" button on the
 * choice steps, which is what makes it feel quick.
 */
const PROJECT_TYPES = [
  {
    id: "site-nou",
    Icon: MonitorSmartphone,
    label: "Site nou",
    hint: "Construit de la zero pentru afacerea ta",
  },
  {
    id: "redesign",
    Icon: RefreshCcw,
    label: "Redesign",
    hint: "Modernizăm site-ul pe care îl ai deja",
  },
  {
    id: "landing",
    Icon: Layers,
    label: "Landing page",
    hint: "O singură pagină, făcută să convertească",
  },
  {
    id: "magazin",
    Icon: ShoppingBag,
    label: "Magazin online",
    hint: "Produse, comenzi și structură de e-commerce",
  },
];

const BUDGETS = [
  { id: "sub-500", label: "sub 500 €", hint: "Landing page sau site simplu" },
  { id: "500-1000", label: "500 – 1.000 €", hint: "Site de prezentare complet" },
  { id: "1000-2000", label: "1.000 – 2.000 €", hint: "Structură personalizată" },
  { id: "2000-4000", label: "2.000 – 4.000 €", hint: "Proiect complex" },
  { id: "4000-plus", label: "peste 4.000 €", hint: "Aplicație sau platformă" },
];

const TOTAL_STEPS = 4;

function OptionButton({ Icon, label, hint, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex w-full items-center gap-4 rounded-2xl border-[1.5px] px-5 py-4 text-left transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
        active
          ? "-translate-y-px border-[#111] bg-[#111] text-white"
          : "border-black/[0.07] bg-white hover:border-black/15 hover:bg-[#f5f5f5]"
      }`}
    >
      {Icon && (
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
            active ? "bg-white/15 text-white" : "bg-black/[0.04] text-[#111]"
          }`}
        >
          <Icon size={17} />
        </span>
      )}

      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-[15px] font-medium">{label}</span>
        <span
          className={`text-[13px] ${active ? "text-white/65" : "text-[#999]"}`}
        >
          {hint}
        </span>
      </span>
    </button>
  );
}

function Discovery() {
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({ type: null, budget: null });
  const [form, setForm] = useState({ name: "", email: "", detail: "" });
  const [gdpr, setGdpr] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function advance(to) {
    setDirection(to > step ? 1 : -1);
    setStep(to);
  }

  function choose(key, value, nextStep) {
    setAnswers((current) => ({ ...current, [key]: value }));
    trackCtaClick(`Discovery ${key}`, value);
    window.setTimeout(() => advance(nextStep), 180);
  }

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (!gdpr) {
      setError("Trebuie să accepți prelucrarea datelor.");
      return;
    }

    setStatus("sending");

    const type = PROJECT_TYPES.find((t) => t.id === answers.type);
    const budget = BUDGETS.find((b) => b.id === answers.budget);

    const message = [
      "Cerere de consultanță gratuită (formular /discovery).",
      `\nTip proiect: ${type ? type.label : "nespecificat"}`,
      `\nBuget estimat: ${budget ? budget.label : "nespecificat"}`,
      form.detail ? `\n\nDetalii: ${form.detail}` : "",
    ].join("");

    try {
      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          selectedPlan: budget ? budget.label : "Consultanță gratuită",
          message,
          gdprAccepted: true,
          sourcePage: "/discovery",
          website,
        }),
      });

      trackContactOpen("discovery_submit");
      advance(3);
      setStatus("done");
    } catch (submitError) {
      setStatus("idle");
      setError(submitError.message || "A apărut o eroare. Încearcă din nou.");
    }
  }

  const shownStep = Math.min(step, TOTAL_STEPS - 1);
  const fillPercent = (shownStep / (TOTAL_STEPS - 1)) * 100;

  const variants = reduceMotion
    ? { enter: {}, center: {}, exit: {} }
    : {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 28 : -28 }),
        center: { opacity: 1, x: 0 },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -28 : 28 }),
      };

  return (
    <div className="min-h-dvh bg-white text-[#111]">
      <SEO
        title="Consultanță gratuită"
        description="Discuție gratuită de 15 minute despre proiectul tău web. Durează sub 2 minute să completezi."
      />

      <div className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col px-6 py-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-[15px] font-semibold"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111] text-white">
              <LogoMark className="h-5 w-5" />
            </span>
            A Squared Studio
          </Link>

          {step > 0 && step < 3 && (
            <button
              type="button"
              onClick={() => advance(step - 1)}
              className="flex items-center gap-2 text-sm text-[#999] transition-colors hover:text-[#111]"
            >
              <ArrowLeft size={15} />
              Înapoi
            </button>
          )}
        </div>

        <h1 className="sr-only">
          Consultanță gratuită de web design — discuție de 15 minute
        </h1>

        {status !== "done" && (
          <div className="mt-10 flex items-center gap-4">
            <span className="whitespace-nowrap text-xs font-medium tracking-[0.05em] text-[#999]">
              Pas {shownStep + 1}
            </span>

            <div className="h-0.5 flex-1 rounded-sm bg-black/[0.08]">
              <div
                className="h-full rounded-sm bg-[#111]"
                style={{
                  width: `${fillPercent}%`,
                  transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>

            <span className="whitespace-nowrap text-xs font-medium text-[#999]">
              {shownStep + 1} / {TOTAL_STEPS}
            </span>
          </div>
        )}

        <div className="flex flex-1 items-center py-12">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col gap-10"
            >
              {step === 0 && (
                <>
                  <header className="text-center">
                    <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">
                      Ce cauți?
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#999]">
                      Durează sub 2 minute. Fără spam, fără obligații.
                    </p>
                  </header>

                  <div className="mx-auto flex w-full max-w-[28rem] flex-col gap-2.5">
                    {PROJECT_TYPES.map((option) => (
                      <OptionButton
                        key={option.id}
                        Icon={option.Icon}
                        label={option.label}
                        hint={option.hint}
                        active={answers.type === option.id}
                        onClick={() => choose("type", option.id, 1)}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <header className="text-center">
                    <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">
                      Ce buget ai în minte?
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#999]">
                      Nu există răspuns greșit. Ne ajută să propunem scopul
                      potrivit.
                    </p>
                  </header>

                  <div className="mx-auto flex w-full max-w-[28rem] flex-col gap-2.5">
                    {BUDGETS.map((option) => (
                      <OptionButton
                        key={option.id}
                        label={option.label}
                        hint={option.hint}
                        active={answers.budget === option.id}
                        onClick={() => choose("budget", option.id, 2)}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <header className="text-center">
                    <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">
                      Aproape gata — unde îți trimitem răspunsul?
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#999]">
                      Revenim cu o propunere concretă, de obicei în aceeași zi.
                    </p>
                  </header>

                  <form
                    onSubmit={submit}
                    className="mx-auto flex w-full max-w-[28rem] flex-col gap-3"
                  >
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      className="hidden"
                    />

                    <input
                      required
                      minLength={2}
                      placeholder="Numele tău"
                      value={form.name}
                      onChange={(event) =>
                        setForm((c) => ({ ...c, name: event.target.value }))
                      }
                      className="w-full rounded-2xl border-[1.5px] border-black/[0.07] px-5 py-4 text-[15px] outline-none transition-colors duration-200 placeholder:text-[#999] focus:border-[#111]"
                    />

                    <input
                      required
                      type="email"
                      placeholder="email@firma.ro"
                      value={form.email}
                      onChange={(event) =>
                        setForm((c) => ({ ...c, email: event.target.value }))
                      }
                      className="w-full rounded-2xl border-[1.5px] border-black/[0.07] px-5 py-4 text-[15px] outline-none transition-colors duration-200 placeholder:text-[#999] focus:border-[#111]"
                    />

                    <textarea
                      rows={3}
                      placeholder="Pe scurt, despre ce e vorba? (opțional)"
                      value={form.detail}
                      onChange={(event) =>
                        setForm((c) => ({ ...c, detail: event.target.value }))
                      }
                      className="w-full resize-y rounded-2xl border-[1.5px] border-black/[0.07] px-5 py-4 text-[15px] outline-none transition-colors duration-200 placeholder:text-[#999] focus:border-[#111]"
                    />

                    <label className="flex items-start gap-3 py-1 text-[13px] text-[#666]">
                      <input
                        type="checkbox"
                        checked={gdpr}
                        onChange={(event) => setGdpr(event.target.checked)}
                        className="mt-0.5"
                      />
                      <span>
                        Sunt de acord cu prelucrarea datelor.{" "}
                        <a href="/privacy" className="underline">
                          Politica de confidențialitate
                        </a>
                      </span>
                    </label>

                    {error && (
                      <p role="alert" className="text-sm text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#111] px-6 py-4 text-[15px] font-medium text-white transition-transform duration-200 hover:-translate-y-px disabled:opacity-60"
                    >
                      {status === "sending" && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      Trimite cererea
                    </button>
                  </form>
                </>
              )}

              {step === 3 && (
                <div className="flex flex-col items-center gap-5 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#111] text-white">
                    <Check size={28} />
                  </span>

                  <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                    Am primit cererea
                  </h2>

                  <p className="max-w-[36ch] text-[15px] leading-relaxed text-[#999]">
                    Revenim pe email cu o propunere concretă pentru proiectul
                    tău, de obicei în aceeași zi lucrătoare.
                  </p>

                  <Link
                    to="/"
                    className="mt-3 flex items-center gap-2 rounded-2xl border-[1.5px] border-black/[0.07] px-6 py-3.5 text-[15px] font-medium transition-colors duration-200 hover:bg-[#f5f5f5]"
                  >
                    <Sparkles size={16} />
                    Înapoi la site
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-[#999]">
          Preferi email direct? {siteConfig.contact.email}
        </p>
      </div>
    </div>
  );
}

export default Discovery;
