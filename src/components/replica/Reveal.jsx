import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll reveal matching the reference site's measured curve:
 * translateY(100px) -> 0 and opacity 0 -> 1 over ~1000ms on an
 * ease-out-cubic curve, triggered ~150px BEFORE the element enters
 * the viewport so it is already part-way through when first seen.
 *
 * Deliberately different from the older AnimatedSection (22px / 550ms /
 * fires late) — the longer distance and earlier trigger are most of why
 * the reference reads as deliberate rather than brisk.
 */
function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 150px 0px" }}
      transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
