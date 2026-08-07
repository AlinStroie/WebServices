/**
 * Testimonials slot (rendered by components/replica/Principles.jsx).
 *
 * PLACEHOLDER STATE: we currently show our real working principles rather
 * than invented client quotes — fabricated social proof about a real
 * business is not acceptable. Each entry below is shaped so that dropping
 * in a real testimonial needs no code change.
 *
 * TO ADD A REAL TESTIMONIAL: fill `name`, `role`, `company` (and optional
 * `avatar` path). As soon as `name` is set, the card renders as a
 * testimonial with an author footer instead of a principle label.
 *
 *   {
 *     quote: "They rebuilt our site in three weeks and bookings doubled.",
 *     name: "Ana Pop",
 *     role: "Owner",
 *     company: "Clinica Zâmbet",
 *     avatar: "/testimonials/ana-pop.webp", // 300x300 min, optional
 *   }
 *
 * Leave `name` empty to keep an entry rendering as a principle.
 */
export const testimonials = [
  {
    quote:
      "Structura vine înaintea decorului. Dacă vizitatorul nu găsește informația, nu contează cât de bine arată pagina.",
    label: "Principiu de lucru",
    name: "",
    role: "",
    company: "",
    avatar: "",
  },
  {
    quote:
      "Mobile-first, nu mobile-după. Peste jumătate din trafic vine de pe telefon, deci acolo se decide dacă site-ul funcționează.",
    label: "Principiu de lucru",
    name: "",
    role: "",
    company: "",
    avatar: "",
  },
  {
    quote:
      "Fără librării încărcate degeaba. Fiecare kilobyte trimis către utilizator trebuie să își merite locul.",
    label: "Principiu de lucru",
    name: "",
    role: "",
    company: "",
    avatar: "",
  },
  {
    quote:
      "Site-ul rămâne al tău. Textele stau în fișiere simple, ușor de editat, fără să depinzi de noi pentru fiecare virgulă.",
    label: "Principiu de lucru",
    name: "",
    role: "",
    company: "",
    avatar: "",
  },
];
