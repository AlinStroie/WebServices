/**
 * Testimonials grid (rendered by components/replica/Testimonials.jsx).
 *
 * PLACEHOLDER STATE: no real client has been quoted yet, so every entry
 * below is a generic placeholder rather than an invented specific person —
 * fabricating a fake name, company or photo passed off as a real client
 * is not acceptable. `avatar` follows the same gradient-initials pattern
 * already used for Hero's placeholder proof row (`avatars` in Hero.jsx):
 * a coloured disc with initials, with an empty `src` ready to take a real
 * photo later.
 *
 * TO ADD A REAL TESTIMONIAL: replace `quote`, `name`, `role`, `company`,
 * and set `avatar.src` to a real photo (300x300 min) — `avatar.initials`
 * and the two gradient stops stay as a fallback if `src` is ever cleared.
 */
export const testimonials = [
  {
    quote:
      "„Aici va apărea o recenzie reală, de la un client impresionat de rezultatele livrate de echipa noastră.”",
    name: "Nume client",
    role: "Funcție",
    company: "Companie",
    avatar: { initials: "NC", from: "#2c2cf3", to: "#7a5cff", src: "" },
  },
  {
    quote:
      "„Testimoniale autentice vor fi adăugate imediat ce proiectele finalizate primesc feedback-ul entuziast al clienților.”",
    name: "Nume client",
    role: "Funcție",
    company: "Companie",
    avatar: { initials: "NC", from: "#10b981", to: "#3bc8a6", src: "" },
  },
  {
    quote:
      "„Fiecare proiect e construit cu obsesie pentru detalii, iar rezultatele vorbesc de la sine — recenziile urmează.”",
    name: "Nume client",
    role: "Funcție",
    company: "Companie",
    avatar: { initials: "NC", from: "#e896cd", to: "#b4aaff", src: "" },
  },
  {
    quote:
      "„Spațiu rezervat pentru cuvintele clienților noștri, în curând completat cu povești reale de succes.”",
    name: "Nume client",
    role: "Funcție",
    company: "Companie",
    avatar: { initials: "NC", from: "#f59e0b", to: "#f7c56b", src: "" },
  },
];
