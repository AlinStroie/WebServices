import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Phone, MapPin, X, ChevronRight } from "lucide-react";

import { pricing } from "../data/pricing";
import { siteConfig } from "../data/siteConfig";

function ContactDrawer({
    open,
    onClose,
    selectedPlan,
    setSelectedPlan,
    onOpenPolicy,
}) {
    const [sent, setSent] = useState(false);

    const currentPlan =
        pricing.find((plan) => plan.name === selectedPlan) || pricing[1];

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // Honeypot anti-spam
        if (formData.get("website")) {
            return;
        }

        setSent(true);
        e.currentTarget.reset();
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[220]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div
                        onClick={onClose}
                        className="absolute inset-0 bg-black/75 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute right-0 top-0 h-full w-full sm:max-w-xl"
                    >
                        {/* Buton rotund în afara drawerului */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute left-0 top-1/2 z-30 hidden h-12 w-12 -translate-x-[calc(100%+14px)] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white text-black shadow-2xl transition hover:scale-110 hover:bg-white/90 md:flex"
                            aria-label="Închide panoul de contact"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <aside className="h-full w-full overflow-y-auto border-l border-white/10 bg-[#070707] p-5 shadow-2xl md:p-8">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-white/35">
                                        Start project
                                    </p>

                                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                                        Începe proiectul tău
                                    </h2>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="group rounded-full border border-white/10 bg-white/[0.04] p-3 text-white/60 transition hover:bg-white hover:text-black"
                                    aria-label="Închide"
                                >
                                    <X size={20} className="transition group-hover:rotate-90" />
                                </button>
                            </div>

                            <div className="mb-6 rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5">
                                <p className="mb-4 text-sm text-white/45">Pachet selectat</p>

                                <div className="grid gap-3">
                                    {pricing.map((plan) => (
                                        <button
                                            key={plan.name}
                                            type="button"
                                            onClick={() => setSelectedPlan(plan.name)}
                                            className={`rounded-2xl border px-5 py-4 text-left transition ${selectedPlan === plan.name
                                                    ? "border-white bg-white text-black"
                                                    : "border-white/10 bg-black/30 text-white/65 hover:bg-white/[0.06] hover:text-white"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="font-semibold">{plan.name}</span>
                                                <span className="text-sm opacity-70">
                                                    {plan.price}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
                                    <p className="text-sm uppercase tracking-[0.25em] text-white/30">
                                        Include
                                    </p>

                                    <ul className="mt-4 space-y-3">
                                        {currentPlan.features.slice(0, 4).map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex gap-3 text-sm text-white/60"
                                            >
                                                <Check
                                                    size={16}
                                                    className="mt-0.5 shrink-0 text-white"
                                                />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5"
                            >
                                <input
                                    type="text"
                                    name="website"
                                    tabIndex="-1"
                                    autoComplete="off"
                                    className="hidden"
                                />

                                <input type="hidden" name="selectedPlan" value={selectedPlan} />

                                <div className="grid gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm text-white/45">
                                            Nume
                                        </label>

                                        <input
                                            required
                                            minLength={2}
                                            maxLength={60}
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Numele tău"
                                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm text-white/45">
                                            Email
                                        </label>

                                        <input
                                            required
                                            maxLength={120}
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="email@exemplu.ro"
                                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                                            title="Introdu o adresă de email validă, de exemplu nume@domeniu.ro"
                                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm text-white/45">
                                            Telefon
                                        </label>

                                        <input
                                            required
                                            minLength={10}
                                            maxLength={15}
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="+40 700 000 000"
                                            pattern="^\+?[0-9\s]{10,15}$"
                                            title="Introdu un număr de telefon valid, de minimum 10 cifre."
                                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm text-white/45">
                                            Tip proiect
                                        </label>

                                        <select
                                            name="projectType"
                                            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-white/30"
                                            defaultValue="Site de prezentare"
                                        >
                                            <option>Site de prezentare</option>
                                            <option>Landing page</option>
                                            <option>Portofoliu</option>
                                            <option>Magazin online simplu</option>
                                            <option>Redesign site vechi</option>
                                            <option>Mentenanță</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm text-white/45">
                                            Mesaj
                                        </label>

                                        <textarea
                                            required
                                            minLength={10}
                                            maxLength={1000}
                                            name="message"
                                            rows="5"
                                            placeholder={`Vreau să discut despre pachetul ${selectedPlan}...`}
                                            className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-white/25 focus:border-white/30"
                                        />
                                    </div>
                                </div>

                                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/55">
                                    <input
                                        required
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 accent-white"
                                    />

                                    <span>
                                        Sunt de acord ca datele introduse să fie prelucrate pentru a
                                        primi un răspuns la solicitarea mea. Am citit{" "}
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
                                    className="mt-6 w-full rounded-full bg-white px-7 py-4 font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
                                >
                                    Trimite cererea pentru {selectedPlan}
                                </button>

                                {sent && (
                                    <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/70">
                                        Cererea a fost pregătită local. Pentru trimitere reală, se
                                        poate conecta ulterior EmailJS, Formspree sau un backend.
                                    </p>
                                )}
                            </form>

                            <div className="mt-6 grid gap-3 rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5 text-sm text-white/55">
                                <a
                                    href={`mailto:${siteConfig.contact.email}?subject=Cerere ofertă site web`}
                                    className="flex gap-3 transition hover:text-white"
                                >
                                    <Mail size={17} className="text-white/40" />
                                    <span>{siteConfig.contact.email}</span>
                                </a>

                                <a
                                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                                    className="flex gap-3 transition hover:text-white"
                                >
                                    <Phone size={17} className="text-white/40" />
                                    <span>{siteConfig.contact.phone}</span>
                                </a>

                                <a
                                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex gap-3 transition hover:text-white"
                                >
                                    <Phone size={17} className="text-white/40" />
                                    <span>WhatsApp</span>
                                </a>

                                <div className="flex gap-3">
                                    <MapPin size={17} className="text-white/40" />
                                    <span>{siteConfig.contact.location}</span>
                                </div>
                            </div>
                        </aside>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ContactDrawer;