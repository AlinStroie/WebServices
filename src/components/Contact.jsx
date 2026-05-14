import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { Mail, MapPin, Phone } from "lucide-react";

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <AnimatedSection id="contact" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contact"
          title="Spune-ne ce vrei să construim."
          text="Completează formularul și revenim cu o propunere clară pentru site-ul tău."
        />

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass rounded-[2rem] p-8">
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">
              Date contact
            </h3>

            <p className="mt-4 leading-7 text-white/50">
              Poți modifica datele de mai jos în funcție de brandul tău.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <Mail className="text-white/50" />
                <span className="text-white/65">contact@webnova.ro</span>
              </div>

              <div className="flex gap-4">
                <Phone className="text-white/50" />
                <span className="text-white/65">+40 700 000 000</span>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-white/50" />
                <span className="text-white/65">Brașov, România</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/45">
                  Nume
                </label>
                <input
                  required
                  type="text"
                  placeholder="Numele tău"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-white/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/45">
                  Email
                </label>
                <input
                  required
                  type="email"
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
                rows="6"
                placeholder="Scrie câteva detalii despre proiect..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-white/30"
              />
            </div>

            <button
              type="submit"
              className="mt-6 rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
            >
              Trimite mesajul
            </button>

            {sent && (
              <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/70">
                Mesaj trimis local. Pentru trimitere reală, se poate conecta
                ulterior EmailJS sau un backend.
              </p>
            )}
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Contact;