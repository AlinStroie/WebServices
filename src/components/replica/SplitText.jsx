import { motion, useReducedMotion } from "framer-motion";

/**
 * Staggered headline reveal.
 *
 * The reference splits its H1 into 41 individual character divs. We split
 * per WORD instead: visually near-identical at these sizes, far cheaper,
 * and it avoids the real accessibility cost of per-character splitting
 * (screen readers spelling the headline out letter by letter).
 *
 * The full string is kept on aria-label and the animated pieces are
 * aria-hidden, so assistive tech reads one clean sentence either way.
 */
function SplitText({ text, className = "", stagger = 0.06, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const lines = String(text).split("\n");

  if (reduceMotion) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </span>
    );
  }

  let wordIndex = 0;

  return (
    <span className={className} aria-label={String(text).replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(" ").map((word) => {
            const i = wordIndex++;
            return (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: delay + i * stagger,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  {word}
                  <span className="inline-block">&nbsp;</span>
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

export default SplitText;
