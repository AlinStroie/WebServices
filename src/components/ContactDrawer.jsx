import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";

import OverlayBackdrop from "./OverlayBackdrop";
import { siteConfig } from "../data/siteConfig";
import { apiFetch } from "../lib/api";

import {
  getAnalyticsContext,
  trackContactError,
  trackContactStart,
  trackContactSubmit,
  trackContactSuccess,
  trackPricingClick,
} from "../lib/analytics";

const plans = ["Basic", "Standard", "Premium"];

const drawerTransition = {
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1],
};

function ContactDrawer({
  open,
  onClose,
  selectedPlan,
  setSelectedPlan,
  onOpenPolicy,
}) {
  const navigate = useNavigate();
  const formStartedRef = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    gdpr: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const email =
    siteConfig?.contact?.email ||
    siteConfig?.company?.email ||
    "contact@example.com";

  const phone =
    siteConfig?.contact?.phone ||
    siteConfig?.company?.phone ||
    "0700000000";

  const phoneDigits = phone.replace(/\D/g, "");
  const whatsappPhone = phoneDigits.startsWith("40")
    ? phoneDigits
    : `4${phoneDigits}`;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  function updateField(field, value) {
    if (!formStartedRef.current && field !== "gdpr") {
      formStartedRef.current = true;
      trackContactStart(field);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      submit: "",
    }));
  }

  function validateForm() {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigitsOnly = formData.phone.replace(/\D/g, "");

    if (!formData.name.trim()) {
      nextErrors.name = "Introdu numele.";
    }

    if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Introdu o adresă de email validă.";
    }

    if (phoneDigitsOnly.length < 10) {
      nextErrors.phone = "Numărul trebuie să aibă minimum 10 cifre.";
    }

    if (formData.message.trim().length < 10) {
      nextErrors.message = "Scrie câteva detalii despre proiect.";
    }

    if (!formData.gdpr) {
      nextErrors.gdpr = "Trebuie să accepți prelucrarea datelor.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const plan = selectedPlan || "Nespecificat";
    const analyticsContext = getAnalyticsContext();

    try {
      setSubmitting(true);
      setErrors({});

      trackContactSubmit(plan);

      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          selectedPlan: plan,
          gdprAccepted: formData.gdpr,
          sourcePage: window.location.pathname,
          website: "",

          sessionId: analyticsContext.sessionId,
          utmSource: analyticsContext.utmSource,
          utmMedium: analyticsContext.utmMedium,
          utmCampaign: analyticsContext.utmCampaign,
          utmContent: analyticsContext.utmContent,
          utmTerm: analyticsContext.utmTerm,
          consentAnalytics: analyticsContext.consentAnalytics,
        }),
      });

      trackContactSuccess(plan);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        gdpr: false,
      });

      formStartedRef.current = false;

      onClose?.();
      navigate("/succes");
    } catch (error) {
      trackContactError(error.message);

      setErrors((prev) => ({
        ...prev,
        submit:
          error.message ||
          "Cererea nu a putut fi trimisă momentan. Încearcă din nou.",
      }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[250] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <OverlayBackdrop
            onClick={onClose}
            blur={8}
            opacity={0.66}
            duration={0.65}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={drawerTransition}
            className="absolute right-0 top-0 z-20 h-full w-full max-w-2xl overflow-hidden lg:overflow-visible"
          >
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Închide formularul"
              className="absolute left-[-3.9rem] top-1/2 z-0 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white text-black shadow-[0_18px_70px_rgba(0,0,0,0.65)] transition hover:scale-105 hover:bg-white/90 lg:flex"
              initial={{ opacity: 0, x: 100, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 52, scale: 0.94 }}
              transition={{
                duration: 0.32,
                delay: 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ChevronRight size={24} />
            </motion.button>

            <aside
              className="relative z-10 flex h-full w-full flex-col border-l border-white/10 bg-[#050505]/95 shadow-[0_0_130px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-drawer-title"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-white/[0.07] blur-[130px]" />
                <div className="absolute bottom-[-8rem] left-[-8rem] h-96 w-96 rounded-full bg-white/[0.035] blur-[140px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),transparent_34%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              <div className="relative border-b border-white/10 px-6 py-5 md:px-8">
                <div className="flex items-center justify-between gap-5">
                  <div
                    id="contact-drawer-title"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-white/45"
                  >
                    <Sparkles size={14} />
                    Cerere ofertă website
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/60 transition hover:bg-white hover:text-black"
                    aria-label="Închide formularul"
                  >
                    <X size={20} className="transition group-hover:rotate-90" />
                  </button>
                </div>
              </div>

              <div className="drawer-scroll relative flex-1 overflow-y-auto px-6 py-6 md:px-8">
                <div className="mb-6 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.035]">
                  <div className="border-b border-white/10 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                          Pachet orientativ
                        </p>
                        <p className="mt-2 text-sm text-white/45">
                          Alege punctul de pornire. Îl putem ajusta ulterior.
                        </p>
                      </div>

                      <div className="hidden rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/35 sm:block">
                        {selectedPlan}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 p-3 sm:grid-cols-3">
                    {plans.map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => {
                          setSelectedPlan?.(plan);
                          trackPricingClick(plan);
                        }}
                        className={`rounded-[1.25rem] border px-4 py-4 text-left transition ${
                          selectedPlan === plan
                            ? "border-white bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.10)]"
                            : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.07] hover:text-white"
                        }`}
                      >
                        <span className="block text-sm font-semibold">
                          {plan}
                        </span>

                        <span
                          className={`mt-2 block text-xs leading-5 ${
                            selectedPlan === plan
                              ? "text-black/55"
                              : "text-white/35"
                          }`}
                        >
                          {plan === "Basic" &&
                            "Pentru un site simplu, clar și rapid."}
                          {plan === "Standard" &&
                            "Pentru un website complet, cu structură solidă."}
                          {plan === "Premium" &&
                            "Pentru proiecte personalizate și funcții extra."}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  {[
                    "Discutăm obiectivul",
                    "Stabilim structura",
                    "Pregătim oferta",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.07] text-white/70">
                        <Check size={15} />
                      </span>

                      <p className="mt-4 text-sm font-medium text-white/70">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-[1.5rem] border border-red-400/20 bg-red-400/10 p-4 text-sm leading-6 text-red-100"
                  >
                    {errors.submit}
                  </motion.div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-5"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <FieldWrapper
                      label="Nume"
                      icon={<User size={16} />}
                      error={errors.name}
                    >
                      <input
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        className="drawer-input"
                        placeholder="Numele tău"
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label="Telefon"
                      icon={<Phone size={16} />}
                      error={errors.phone}
                    >
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(event) =>
                          updateField("phone", event.target.value)
                        }
                        className="drawer-input"
                        placeholder="07xx xxx xxx"
                      />
                    </FieldWrapper>
                  </div>

                  <div className="mt-4">
                    <FieldWrapper
                      label="Email"
                      icon={<Mail size={16} />}
                      error={errors.email}
                    >
                      <input
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        className="drawer-input"
                        placeholder="exemplu@email.com"
                      />
                    </FieldWrapper>
                  </div>

                  <div className="mt-4">
                    <FieldWrapper
                      label="Detalii proiect"
                      icon={<MessageSquare size={16} />}
                      error={errors.message}
                    >
                      <textarea
                        value={formData.message}
                        onChange={(event) =>
                          updateField("message", event.target.value)
                        }
                        rows={5}
                        className="drawer-input resize-none"
                        placeholder="Spune-mi ce tip de site ai nevoie, pentru ce afacere și ce ar trebui să conțină."
                      />
                    </FieldWrapper>
                  </div>

                  <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-4 transition hover:bg-white/[0.05]">
                    <input
                      type="checkbox"
                      checked={formData.gdpr}
                      onChange={(event) =>
                        updateField("gdpr", event.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-white"
                    />

                    <span className="text-sm leading-6 text-white/55">
                      Sunt de acord cu prelucrarea datelor conform{" "}
                      <button
                        type="button"
                        onClick={() => onOpenPolicy?.("privacy")}
                        className="text-white underline underline-offset-4 transition hover:text-white/75"
                      >
                        Politicii de confidențialitate
                      </button>
                      .
                    </span>
                  </label>

                  {errors.gdpr && (
                    <p className="mt-2 text-sm text-red-300">{errors.gdpr}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`group relative mt-5 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white px-6 py-4 font-semibold text-black shadow-[0_18px_65px_rgba(255,255,255,0.12)] transition hover:scale-[1.01] hover:bg-white/90 ${
                      submitting ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />

                    <span className="relative leading-none">
                      {submitting ? "Se trimite..." : "Trimite cererea"}
                    </span>

                    <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black text-white transition duration-300 group-hover:rotate-45">
                      <Send
                        size={14}
                        strokeWidth={2.4}
                        className="translate-x-[-1px] -translate-y-[-1px]"
                      />
                    </span>
                  </button>
                </form>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <a
                    href={`mailto:${email}`}
                    className="group rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.07]"
                  >
                    <Mail size={18} className="text-white/60" />
                    <p className="mt-3 text-sm text-white/35">Email</p>
                    <p className="mt-1 truncate text-sm font-medium text-white">
                      {email}
                    </p>
                  </a>

                  <a
                    href={`https://wa.me/${whatsappPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.07]"
                  >
                    <MessageCircle size={18} className="text-white/60" />
                    <p className="mt-3 text-sm text-white/35">WhatsApp</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {phone}
                    </p>
                  </a>

                  <a
                    href={`tel:${phoneDigits}`}
                    className="group rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.07]"
                  >
                    <Phone size={18} className="text-white/60" />
                    <p className="mt-3 text-sm text-white/35">Telefon</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      Sună direct
                    </p>
                  </a>
                </div>
              </div>

              <div className="relative border-t border-white/10 px-6 py-4 md:px-8">
                <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-white/35">
                    Datele sunt folosite doar pentru contactarea ta în legătură
                    cu proiectul.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenPolicy?.("cookies")}
                      className="inline-flex items-center gap-2 text-white/45 transition hover:text-white"
                    >
                      Politica de cookies
                      <ArrowRight size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-medium text-white/55 transition hover:bg-white hover:text-black"
                    >
                      Închide
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldWrapper({ label, icon, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm text-white/50">
        {icon}
        {label}
      </span>

      {children}

      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </label>
  );
}

export default ContactDrawer;