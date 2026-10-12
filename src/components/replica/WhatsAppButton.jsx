import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
 * Sticky WhatsApp contact button.
 *
 * Smooth two-phase morphing animation:
 * - Phase 1: Sleek collapsed circle with the WhatsApp icon and a pulsing unread notification badge.
 * - Phase 2: Expanded pill revealing the clear "Contactează-ne pe WhatsApp" action label.
 *
 * Choreography:
 * 1. Entrance on page load: pops up with an organic spring into Phase 1.
 * 2. Auto-reveal: after ~1.2s, smoothly unfolds into Phase 2 so the visitor discovers the CTA.
 * 3. Auto-collapse: holds for 3.2s, then glides seamlessly back to Phase 1.
 * 4. User interaction: hovering or focusing smoothly expands Phase 2 anytime, with immediate fluid response.
 */
function WhatsAppButton() {
  const phone = siteConfig?.contact?.whatsapp || siteConfig?.contact?.phone || "";
  const digits = phone.replace(/\D/g, "");
  const whatsappPhone = digits.startsWith("40") ? digits : `4${digits}`;

  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isHovered;

  return (
    <motion.a
      href={`https://wa.me/${whatsappPhone}`}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Contactează-ne pe WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        boxShadow: isExpanded
          ? "0 16px 42px -4px rgba(37, 211, 102, 0.45), 0 10px 24px -6px rgba(0, 0, 0, 0.35)"
          : "0 10px 30px rgba(0, 0, 0, 0.38)",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{
        scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
        y: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
        opacity: { duration: 0.45, delay: 0.4 },
        boxShadow: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-[95] flex h-14 items-center rounded-full bg-[#25D366] text-white select-none overflow-hidden sm:bottom-8 sm:right-8"
    >
      {/* Faza 1: Iconiță WhatsApp fixă 56x56 + badge de notificare pulsantă */}
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        <WhatsAppIcon size={28} />

        <span className="absolute right-1.5 top-1.5 flex h-3 w-3">
          {isHovered && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          )}
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 ring-2 ring-[#25D366]" />
        </span>
      </span>

      {/* Faza 2: Container cu expansiune fluidă și text fără clipping */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{
          width: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          },
          opacity: {
            duration: isExpanded ? 0.55 : 0.25,
            delay: isExpanded ? 0.22 : 0,
            ease: isExpanded ? "easeOut" : "easeIn",
          },
        }}
        className="overflow-hidden whitespace-nowrap shrink-0"
      >
        <motion.div
          animate={{
            x: isExpanded ? 0 : -12,
          }}
          transition={{
            duration: isExpanded ? 0.75 : 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pr-6 pl-0.5 text-[14.5px] font-semibold tracking-[-0.01em] text-white select-none whitespace-nowrap shrink-0"
        >
          Contactează-ne pe WhatsApp
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

export default WhatsAppButton;
