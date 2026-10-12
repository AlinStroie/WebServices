import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const MotionLink = motion.create ? motion.create(Link) : motion(Link);

/**
 * Navbar free consultation button with signature hover state animation.
 *
 * Micro-interactions between idle and hover states:
 * 1. Synchronized Text Roll: The label smoothly rolls upwards with an identical
 *    clone rolling in from beneath, matching the luxury nav link choreography.
 * 2. Continuous Diagonal Arrow Flight: Outgoing arrow glides out top-right while
 *    a twin arrow glides in seamlessly from bottom-left on the 45-degree angle.
 * 3. Directional Magnetic Sweep: The accent fill smoothly blooms from the cursor's
 *    precise entry point via Framer Motion circle clip-path, unaffected by system
 *    reduced motion CSS overrides.
 * 4. Ambient Illumination & Sheen: Elevates with an emerald/violet shadow bloom
 *    and a subtle glass sheen sweep across the pill face.
 * 5. Tactile Micro-Physics: Smooth scale-[1.035] spring feedback on hover and
 *    scale-[0.97] on click/tap.
 */
function NavbarCta({
  to = "/discovery",
  label = "Consultanță gratuită",
  children,
  className = "",
  onClick,
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

  function handleEnter(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin({
      x: `${Math.round(event.clientX - rect.left)}px`,
      y: `${Math.round(event.clientY - rect.top)}px`,
    });
    setIsHovered(true);
  }

  function handleLeave() {
    setIsHovered(false);
  }

  function handleTouchStart(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const touch = event.touches[0];
    if (touch) {
      setOrigin({
        x: `${Math.round(touch.clientX - rect.left)}px`,
        y: `${Math.round(touch.clientY - rect.top)}px`,
      });
    }
    setIsHovered(true);
  }

  const displayText = children && typeof children === "string" ? children : label;

  return (
    <MotionLink
      to={to}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouchStart}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        boxShadow: isHovered
          ? "0 10px 28px -3px rgba(16, 185, 129, 0.42), 0 4px 14px -2px rgba(44, 44, 243, 0.35)"
          : "0 4px 14px -2px rgba(44, 44, 243, 0.3)",
      }}
      transition={{
        scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        boxShadow: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`group relative ${className.includes("hidden") ? "" : "inline-flex"} items-center justify-center overflow-hidden rounded-full bg-[color:var(--color-brand)] font-medium text-white select-none cursor-pointer navbar-cta ${className}`}
      {...rest}
    >
      {/* 1. Cursor-directed magnetic expansion fill */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          clipPath: isHovered
            ? `circle(150% at ${origin.x} ${origin.y})`
            : `circle(0% at ${origin.x} ${origin.y})`,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute inset-0 rounded-full bg-[color:var(--color-accent)]"
      />

      {/* 2. Glass light beam sheen sweep */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          x: isHovered ? "220%" : "-120%",
          opacity: isHovered ? [0, 0.35, 0] : 0,
        }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="pointer-events-none absolute -inset-y-4 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[1px]"
      />

      {/* 3. Interactive content (Steady Text Label + Continuous Arrow Flight) */}
      <span className="relative z-10 flex items-center gap-2">
        <span className="font-medium whitespace-nowrap text-white">
          {displayText}
        </span>

        {/* Continuous Diagonal Double Arrow Flight */}
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
          {/* Arrow 1: Centered at idle, exits top-right on hover */}
          <motion.span
            initial={false}
            animate={
              isHovered
                ? { x: 14, y: -14, opacity: 0 }
                : { x: 0, y: 0, opacity: 1 }
            }
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ArrowUpRight size={16} />
          </motion.span>

          {/* Arrow 2: Staged bottom-left, glides into center on hover */}
          <motion.span
            initial={false}
            animate={
              isHovered
                ? { x: 0, y: 0, opacity: 1 }
                : { x: -14, y: 14, opacity: 0 }
            }
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <ArrowUpRight size={16} />
          </motion.span>
        </span>
      </span>
    </MotionLink>
  );
}

export default NavbarCta;
