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
      "„Foarte Profi\nM a ajutat în dezvoltarea afacerii mele foarte mult!!!”",
    name: "Ali Baba",
    role: "Client A Squared Studio",
    company: "acum 3 săptămâni · 5★",
    avatar: {
      initials: "AB",
      from: "#2c2cf3",
      to: "#7a5cff",
      src: "https://lh3.googleusercontent.com/a-/ALV-UjUMzfPDyhQ0vv2SZe_TZMkScrThSNAqixskE6JXDv6vO4ZOriDN=s128-c0x00000000-cc-rp-mo",
    },
  },
  {
    quote:
      "„Design curat, comunicare clară, termene respectate. A Squared Studio a transformat un site vechi și greoi într-unul modern și funcțional. Recomand cu încredere.”",
    name: "zew Stroie",
    role: "Client A Squared Studio",
    company: "acum 3 săptămâni · 5★",
    avatar: {
      initials: "ZS",
      from: "#10b981",
      to: "#3bc8a6",
      src: "https://lh3.googleusercontent.com/a-/ALV-UjU0TjF8Gbnco72k5shhI5En4OyufgiZsKz2-sEJZOCh1UovNK0=s128-c0x00000000-cc-rp-mo",
    },
  },
  {
    quote:
      "„Colaborare excelentă și servicii profesionale de 5 stele!”",
    name: "Drgj Ciorobitca",
    role: "Client A Squared Studio",
    company: "acum 3 săptămâni · 5★",
    avatar: {
      initials: "DC",
      from: "#e896cd",
      to: "#b4aaff",
      src: "https://lh3.googleusercontent.com/a-/ALV-UjXrpU-NytdO0kBjp3-MJlw1YzMm2q-yLvHkjH-B17oTVhpdYDw=s128-c0x00000000-cc-rp-mo",
    },
  },
  {
    quote:
      "„Recomand cu încredere A Squared Studio. Calitate ireproșabilă!”",
    name: "Neagoe Alex",
    role: "Client A Squared Studio",
    company: "acum 3 săptămâni · 5★",
    avatar: {
      initials: "NA",
      from: "#f59e0b",
      to: "#f7c56b",
      src: "https://lh3.googleusercontent.com/a/ACg8ocKXsGeyJiOI4Ue_KHYpgFnCGz0Uk1D9q_Fqlmjlgofg6fN2WA=s128-c0x00000000-cc-rp-mo",
    },
  },
];
