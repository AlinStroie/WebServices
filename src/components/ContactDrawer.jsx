import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
  X,
} from "lucide-react";

import OverlayBackdrop from "./OverlayBackdrop";
import { siteConfig } from "../data/siteConfig";

const plans = ["Basic", "Standard", "Premium"];

function ContactDrawer({
  open,
  onClose,
  selectedPlan,
  setSelectedPlan,
  onOpenPolicy,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    gdpr: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setSuccess(false);
      setErrors({});
    }
  }, [open]);

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  }

  function validateForm() {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!formData.name.trim()) {
      nextErrors.name = "Introdu numele.";
    }

    if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Introdu o adresă de email validă.";
    }

    if (phoneDigits.length < 10) {
      nextErrors.phone = "Numărul trebuie să aibă minimum 10 cifre.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Scrie câteva detalii despre proiect.";
    }

    if (!formData.gdpr) {
      nextErrors.gdpr = "Trebuie să accepți prelucrarea datelor.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      gdpr: false,
    });
  }

  const email =
    siteConfig?.contact?.email ||
    siteConfig?.company?.email ||
    "contact@example.com";

  const phone =
    siteConfig?.contact?.phone || siteConfig?.company?.phone || "0700000000";

  const whatsappPhone = phone.replace(/\D/g, "");

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
            blur={7}
            opacity={0.58}
            duration={0.8}
          />

          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Închide formularul"
            className="absolute right-[min(92vw,40.5rem)] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-white text-black shadow-[0_18px_60px_rgba(0,0,0,0.45)] transition hover:scale-105 lg:flex"
            initial={{
              opacity: 0,
              x: 34,
              y: "-50%",
            }}
            animate={{
              opacity: 1,
              x: "50%",
              y: "-50%",
            }}
            exit={{
              opacity: 0,
              x: 34,
              y: "-50%",
            }}
            transition={{
              duration: 0.38,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ChevronRight size={24} />
          </motion.button>

          <motion.aside
            initial={{
              x: "100%",
              opacity: 0.92,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: "100%",
              opacity: 0.92,
            }}
            transition={{
              duration: 0.52,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-0 top-0 z-10 flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-[#080808]/95 shadow-[0_0_90px_rgba(0,0,0,0.75)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                  Contact
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  Cere o ofertă
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/60 transition hover:bg-white hover:text-black lg:hidden"
                aria-label="Închide"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mb-6 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm text-white/45">Pachet selectat</p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {plans.map((plan) => (
                    <button
                      key={plan}
                      type="button"
                      onClick={() => setSelectedPlan?.(plan)}
                      className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                        selectedPlan === plan
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.08]"
                      }`}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>

              {success && (
                <div className="mb-6 flex items-start gap-3 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-100">
                  <CheckCircle2 className="mt-0.5" size={20} />
                  <div>
                    <p className="font-semibold">Mesaj pregătit cu succes.</p>
                    <p className="mt-1 text-sm text-emerald-100/70">
                      Momentan formularul afișează doar confirmare locală, fără
                      backend.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-white/55">
                    <User size={16} />
                    Nume
                  </span>

                  <input
                    value={formData.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.06]"
                    placeholder="Numele tău"
                  />

                  {errors.name && (
                    <p className="mt-2 text-sm text-red-300">{errors.name}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-white/55">
                    <Mail size={16} />
                    Email
                  </span>

                  <input
                    value={formData.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.06]"
                    placeholder="exemplu@email.com"
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-300">{errors.email}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-white/55">
                    <Phone size={16} />
                    Telefon
                  </span>

                  <input
                    value={formData.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.06]"
                    placeholder="07xx xxx xxx"
                  />

                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-300">{errors.phone}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-white/55">
                    <MessageSquare size={16} />
                    Mesaj
                  </span>

                  <textarea
                    value={formData.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.06]"
                    placeholder="Spune-mi ce tip de site ai nevoie..."
                  />

                  {errors.message && (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.message}
                    </p>
                  )}
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
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
                      className="text-white underline underline-offset-4"
                    >
                      Politicii de confidențialitate
                    </button>
                    .
                  </span>
                </label>

                {errors.gdpr && (
                  <p className="-mt-2 text-sm text-red-300">{errors.gdpr}</p>
                )}

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
                >
                  Trimite cererea
                  <Send
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </form>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${email}`}
                  className="group rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 transition hover:bg-white/[0.07]"
                >
                  <Mail size={18} className="text-white/60" />
                  <p className="mt-3 text-sm text-white/40">Email</p>
                  <p className="mt-1 text-sm font-medium text-white">{email}</p>
                </a>

                <a
                  href={`https://wa.me/4${whatsappPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 transition hover:bg-white/[0.07]"
                >
                  <Phone size={18} className="text-white/60" />
                  <p className="mt-3 text-sm text-white/40">WhatsApp</p>
                  <p className="mt-1 text-sm font-medium text-white">{phone}</p>
                </a>
              </div>
            </div>

            <div className="border-t border-white/10 px-6 py-4">
              <button
                type="button"
                onClick={() => onOpenPolicy?.("cookies")}
                className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
              >
                Politica de cookies
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactDrawer;