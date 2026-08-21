import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Shared hover fill for every primary CTA pill site-wide: green sweeps in
 * from wherever the cursor first lands on the button, in a circular
 * motion, and on mouse-leave recedes using that SAME point rather than
 * wherever the cursor happens to exit — the origin is captured once on
 * entry and left alone until the next entry, so the collapse always
 * circles back to where it grew from. A green, rounded-full overlay is
 * clipped to a circle centred on that point; growing the circle's radius
 * from 0 to past the button's own diagonal both reveals it (on enter)
 * and, run in reverse via the same CSS transition, retracts it (on
 * leave) — one property to animate, so forward and backward are
 * automatically the same motion undone.
 *
 * Originally lived only in SiteFooter; extracted so every other CTA pill
 * (Nav, Hero, ProblemStatement, ServiceCards, Timeline, and the
 * placeholder pages) gets the identical animation instead of the plain
 * `hover:scale-[1.03]` they used before.
 */
function MagneticCta({ to, children, className = "", ...rest }) {
  const [hovered, setHovered] = useState(false);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

  function handleEnter(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin({
      x: `${event.clientX - rect.left}px`,
      y: `${event.clientY - rect.top}px`,
    });
    setHovered(true);
  }

  // Touch has no hover, so the fill would otherwise never play — a tap
  // grows it from the touch point, same as a mouse entry, so the button
  // never reads as permanently "unfilled" pre-tap on mobile.
  function handleTouchStart(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const touch = event.touches[0];
    setOrigin({
      x: `${touch.clientX - rect.left}px`,
      y: `${touch.clientY - rect.top}px`,
    });
    setHovered(true);
  }

  return (
    <Link
      to={to}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={handleTouchStart}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-full bg-[color:var(--color-brand)] transition-transform duration-300 hover:scale-[1.03] ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="footer-cta-fill absolute inset-0 rounded-full bg-[color:var(--color-accent)]"
        style={{
          clipPath: `circle(${hovered ? "150%" : "0%"} at ${origin.x} ${origin.y})`,
        }}
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </Link>
  );
}

export default MagneticCta;
