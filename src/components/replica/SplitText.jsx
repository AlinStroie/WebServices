import { motion, useReducedMotion } from "framer-motion";

/**
 * Staggered headline reveal with serif-italic accent words.
 *
 * Two things going on:
 *
 * 1. SPLIT — the reference splits its H1 into 41 individual character
 *    divs. We split per WORD: visually near-identical at display sizes,
 *    far cheaper, and it avoids the real accessibility cost of
 *    per-character splitting (screen readers spelling the headline out).
 *    The full string stays on aria-label; the animated pieces are
 *    aria-hidden, so assistive tech reads one clean sentence.
 *
 * 2. ACCENT — the reference sets Times New Roman *italic* against Inter
 *    Bold at the same size for the key phrase ("win clients"). Wrap words
 *    in asterisks to get the same treatment: "rapide și *bine gândite*".
 *
 * Each word rides up from behind a clip, which is why every word sits in
 * its own `overflow-hidden` span.
 */
function parse(line) {
  // Split on *…* groups, keeping the delimiters so we can flag them.
  return line
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .flatMap((chunk) => {
      const accent = chunk.startsWith("*") && chunk.endsWith("*");
      const text = accent ? chunk.slice(1, -1) : chunk;

      return text
        .split(" ")
        .filter((word) => word.length > 0)
        .map((word) => ({ word, accent }));
    });
}

function SplitText({ text, className = "", stagger = 0.06, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const plain = String(text).replace(/\*/g, "");
  const lines = String(text).split("\n");

  if (reduceMotion) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {parse(line).map((piece, j) => (
              <span key={j} className={piece.accent ? "accent-serif" : ""}>
                {piece.word}{" "}
              </span>
            ))}
          </span>
        ))}
      </span>
    );
  }

  let wordIndex = 0;

  return (
    <span className={className} aria-label={plain.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {parse(line).map((piece) => {
            const i = wordIndex++;

            return (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className={`inline-block ${
                    piece.accent ? "accent-serif" : ""
                  }`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: delay + i * stagger,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  {piece.word}
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
