import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

function Contact({ onOpenPolicy }) {
  const [sent, setSent] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Honeypot anti-spam: dacă acest câmp este completat, probabil e bot.
    if (formData.get("website")) {
      return;
    }

    if (!gdprAccepted) {
      return;
    }

    setSent(true);
    e.currentTarget.reset();
    setGdprAccepted(false);
  }

  return (
    <AnimatedSection id="contact" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contact"
          title="Spune-ne ce vrei sa construim."
          text="Completează formularul și revenim cu o propunere clară pentru site-ul tău."
        />

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass rounded-[2rem] p-8">
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">
              Date contact
            </h3>

            <p className="mt-4 leading-7 text-white/50">
              Datele introduse în formular sunt folosite doar pentru a răspunde
              solicitarii tale. Nu le folosim pentru newsletter sau marketing
              fara acord separat.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <Mail className="text-white/50" />
                <span className="text-white/65">{siteConfig.contact.email}</span>
              </div>

              <div className="flex gap-4">
                <Phone className="text-white/50" />
                <span className="text-white/65">{siteConfig.contact.phone}</span>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-white/50" />
                <span className="text-white/65">{siteConfig.contact.location}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-8">
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/45">
                  Nume
                </label>
                <input
                  required
                  minLength={2}
                  maxLength={60}
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Numele tau"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-white/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/45">
                  Email
                </label>
                <input
                  required
                  maxLength={120}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="email@exemplu.ro"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-white/30"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-white/45">
                Mesaj
              </label>
              <textarea
                required
                minLength={10}
                maxLength={1000}
                name="message"
                rows="6"
                placeholder="Scrie câteva detalii despre proiect..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-white/30"
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/55">
              <input
                required
                type="checkbox"
                checked={gdprAccepted}
                onChange={(e) => setGdprAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 accent-white"
              />

              <span>
                Sunt de acord ca datele introduse în formular să fie prelucrate
                pentru a primi un raspuns la solicitarea mea. Am citit{" "}
                <button
                  type="button"
                  onClick={() => onOpenPolicy("privacy")}
                  className="text-white underline underline-offset-4"
                >
                  Politica de confidențialitate
                </button>{" "}
                și{" "}
                <button
                  type="button"
                  onClick={() => onOpenPolicy("cookies")}
                  className="text-white underline underline-offset-4"
                >
                  Politica de cookies
                </button>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={!gdprAccepted}
              className="mt-6 rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-black/50"
            >
              Trimite mesajul
            </button>

            {sent && (
              <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/70">
                Mesaj trimis local. Pentru trimitere reala, se poate conecta
                ulterior EmailJS, Formspree sau un backend securizat.
              </p>
            )}
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Contact;
