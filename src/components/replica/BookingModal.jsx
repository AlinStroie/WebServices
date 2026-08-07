import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Calendar, Check, Clock, Loader2, X } from "lucide-react";

import { apiFetch } from "../../lib/api";
import { siteConfig } from "../../data/siteConfig";

const SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const DAY_NAMES = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"];
const MONTH_NAMES = [
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
];

/** Next 12 weekdays, starting tomorrow. */
function buildDays() {
  const days = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < 12) {
    const day = cursor.getDay();

    if (day !== 0 && day !== 6) {
      days.push(new Date(cursor));
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function formatLong(date) {
  return `${DAY_NAMES[date.getDay()]} ${date.getDate()} ${
    MONTH_NAMES[date.getMonth()]
  } ${date.getFullYear()}`;
}

/**
 * "Programează o discuție" — a real booking flow, not a decorative widget.
 *
 * Three steps (date -> time -> details), then it POSTs to the existing
 * /contact endpoint with the chosen slot folded into the message, so the
 * booking lands in the same inbox and admin dashboard as every other
 * enquiry. No new backend surface, no new dependency.
 */
function BookingModal({ onClose, plan }) {
  const days = useMemo(() => buildDays(), []);
  const dialogRef = useRef(null);

  const [step, setStep] = useState(0);
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const [gdpr, setGdpr] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Mounted only while open (see HomeReplica), so state starts fresh on
  // every launch and needs no reset effect.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (!gdpr) {
      setError("Trebuie să accepți prelucrarea datelor.");
      return;
    }

    setStatus("sending");

    const when = `${formatLong(date)}, ora ${slot}`;
    const message = [
      `Cerere de programare: ${when}.`,
      form.note ? `\nDetalii: ${form.note}` : "",
      `\nTrimis din formularul de programare.`,
    ]
      .filter(Boolean)
      .join("");

    try {
      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          selectedPlan: plan || "Consultanță gratuită",
          message,
          gdprAccepted: true,
          sourcePage: window.location.pathname,
          website,
        }),
      });

      setStatus("done");
    } catch (submitError) {
      setStatus("idle");
      setError(submitError.message || "A apărut o eroare. Încearcă din nou.");
    }
  }

  const steps = ["Data", "Ora", "Detalii"];

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Închide"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Programează o discuție"
        tabIndex={-1}
        className="relative flex max-h-[92svh] w-full max-w-[640px] flex-col overflow-hidden rounded-t-3xl bg-white text-[color:var(--color-ink)] outline-none sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-[color:var(--color-divider)] px-6 py-5">
          <div className="flex items-center gap-3">
            {step > 0 && status !== "done" && (
              <button
                type="button"
                onClick={() => setStep((value) => value - 1)}
                aria-label="Înapoi"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-divider)]"
              >
                <ArrowLeft size={16} />
              </button>
            )}

            <div>
              <p className="text-base font-semibold">Programează o discuție</p>
              <p className="text-sm text-[color:var(--color-copy-muted)]">
                30 de minute, fără obligații
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Închide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-divider)]"
          >
            <X size={16} />
          </button>
        </div>

        {status !== "done" && (
          <div className="flex gap-2 px-6 pt-5">
            {steps.map((label, index) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <span
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    index <= step
                      ? "bg-[color:var(--color-brand)]"
                      : "bg-[color:var(--color-divider)]"
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {status === "done" ? (
            <div className="grid justify-items-center gap-4 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]">
                <Check size={26} />
              </span>

              <h3 className="text-xl font-semibold">Cererea a fost trimisă</h3>

              <p className="max-w-[38ch] text-[15px] text-[color:var(--color-ink)]/70">
                Îți confirmăm programarea pentru{" "}
                <strong>
                  {formatLong(date)}, ora {slot}
                </strong>{" "}
                pe email, de obicei în câteva ore.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-2 rounded-full bg-[color:var(--color-ink)] px-6 py-3 text-[15px] font-medium text-white"
              >
                Închide
              </button>
            </div>
          ) : step === 0 ? (
            <div className="grid gap-4">
              <p className="flex items-center gap-2 text-sm font-medium text-[color:var(--color-copy-muted)]">
                <Calendar size={16} /> Alege o zi
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {days.map((day) => {
                  const selected = date && day.getTime() === date.getTime();

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => {
                        setDate(day);
                        setStep(1);
                      }}
                      className={`rounded-2xl border px-4 py-4 text-left transition-colors duration-200 ${
                        selected
                          ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand)]/5"
                          : "border-[color:var(--color-divider)] hover:border-[color:var(--color-ink)]/40"
                      }`}
                    >
                      <span className="block text-xs uppercase tracking-wide text-[color:var(--color-copy-muted)]">
                        {DAY_NAMES[day.getDay()]}
                      </span>
                      <span className="block text-lg font-semibold">
                        {day.getDate()} {MONTH_NAMES[day.getMonth()].slice(0, 3)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : step === 1 ? (
            <div className="grid gap-4">
              <p className="flex items-center gap-2 text-sm font-medium text-[color:var(--color-copy-muted)]">
                <Clock size={16} /> {formatLong(date)}
              </p>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {SLOTS.map((time) => {
                  const selected = slot === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        setSlot(time);
                        setStep(2);
                      }}
                      className={`rounded-2xl border px-3 py-3 text-center text-[15px] font-medium transition-colors duration-200 ${
                        selected
                          ? "border-[color:var(--color-brand)] bg-[color:var(--color-brand)]/5"
                          : "border-[color:var(--color-divider)] hover:border-[color:var(--color-ink)]/40"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <p className="rounded-2xl bg-[color:var(--color-surface)] px-4 py-3 text-sm">
                <strong>{formatLong(date)}</strong>, ora <strong>{slot}</strong>
              </p>

              {/* honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="hidden"
              />

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Nume *</span>
                <input
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  className="rounded-xl border border-[color:var(--color-divider)] px-4 py-3 outline-none focus:border-[color:var(--color-brand)]"
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Email *</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  className="rounded-xl border border-[color:var(--color-divider)] px-4 py-3 outline-none focus:border-[color:var(--color-brand)]"
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Telefon</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  className="rounded-xl border border-[color:var(--color-divider)] px-4 py-3 outline-none focus:border-[color:var(--color-brand)]"
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Despre ce discutăm?</span>
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={(event) => update("note", event.target.value)}
                  className="resize-y rounded-xl border border-[color:var(--color-divider)] px-4 py-3 outline-none focus:border-[color:var(--color-brand)]"
                />
              </label>

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={gdpr}
                  onChange={(event) => setGdpr(event.target.checked)}
                  className="mt-1"
                />
                <span className="text-[color:var(--color-ink)]/70">
                  Sunt de acord cu prelucrarea datelor pentru a fi contactat.{" "}
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
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand)] px-6 py-4 text-[15px] font-medium text-white disabled:opacity-60"
              >
                {status === "sending" && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                Trimite cererea
              </button>

              <p className="text-center text-xs text-[color:var(--color-copy-muted)]">
                Sau scrie-ne direct la {siteConfig.contact.email}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
