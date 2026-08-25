import { siteConfig } from "../../data/siteConfig";

// lucide-react ships no brand glyphs (see SiteFooter's own note on this) —
// a hand-rolled outline, same treatment as the footer's social icons.
function WhatsAppIcon({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.28 4.94L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.11c-.24.68-1.4 1.33-1.93 1.4-.49.07-1.11.1-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35h.55c.18 0 .42-.02.64.5.24.57.82 1.98.89 2.13.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.22 1.38.28.14.44.12.61-.07.16-.19.68-.79.87-1.06.19-.27.37-.22.62-.13.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

/**
 * Sticky WhatsApp contact button. Sits at the same bottom-right offset
 * BackToTop already reserves room above for (its 6rem bottom offset assumes
 * something else occupies the ~2rem slot beneath it — this is that
 * something). Two separate cues: a persistent "unread message" badge on the
 * collapsed bubble (an attention affordance, always on), and a label that
 * slides out on hover/focus (an explanatory affordance, interaction-only).
 */
function WhatsAppButton() {
  const phone = siteConfig?.contact?.whatsapp || siteConfig?.contact?.phone || "";
  const digits = phone.replace(/\D/g, "");
  const whatsappPhone = digits.startsWith("40") ? digits : `4${digits}`;

  return (
    <a
      href={`https://wa.me/${whatsappPhone}`}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Contactează-ne pe WhatsApp"
      className="group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-[95] flex h-14 items-center rounded-full bg-[#25D366] pr-0 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-[padding] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:pr-5 focus-visible:pr-5 sm:bottom-8 sm:right-8"
    >
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        <WhatsAppIcon size={28} />

        <span className="absolute right-1.5 top-1.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 ring-2 ring-[#25D366]" />
        </span>
      </span>

      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-w-[14rem] group-focus-visible:max-w-[14rem]">
        Contactează-ne pe WhatsApp
      </span>
    </a>
  );
}

export default WhatsAppButton;
