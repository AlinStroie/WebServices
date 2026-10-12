import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TARGET_TEXT = "a squared studio.";
const CHARACTERS = Array.from(TARGET_TEXT);
const TOTAL_LETTERS = CHARACTERS.length; // 17 litere
const INITIAL_BAR_PAUSE_MS = 750; // Exact 750ms doar bara înainte de a-l scrie pe "a"
const FRAME_INTERVAL_MS = 55; // 55ms între fiecare literă (identic cu viteza de rewind)
const FINAL_PAUSE_MS = 500; // 500ms între ultimul caracter și dispariția barei (cadrul 19)
const REWIND_INTERVAL_MS = 55; // 55ms per literă la rewind/ștergere inversă fluidă
const REWIND_BAR_PAUSE_MS = 250; // 250ms pauză pe bară la final de rewind înainte de dispariție

export default function TypewriterLogo() {
  const { pathname } = useLocation();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const frameRef = useRef(0);
  const isStartedRef = useRef(false);
  const isRewindingRef = useRef(false);
  const timeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    function clearTimer() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    if (pathname !== "/") {
      frameRef.current = 19;
      setCurrentFrame(19);
      setIsTyping(false);
      setIsExiting(false);
      return;
    }

    function advanceFrame() {
      if (isRewindingRef.current) return;

      if (frameRef.current < 19) {
        frameRef.current += 1;
        setCurrentFrame(frameRef.current);

        if (frameRef.current === 18) {
          // Textul complet "a squared studio." este scris -> pauză de 500ms înainte de fade-out
          timeoutRef.current = setTimeout(advanceFrame, FINAL_PAUSE_MS);
        } else if (frameRef.current < 18) {
          // Între fiecare literă -> 125ms
          timeoutRef.current = setTimeout(advanceFrame, FRAME_INTERVAL_MS);
        } else {
          // Cadrul 19: linia de scriere face fade-out lin cu blur
          setIsTyping(false);
        }
      }
    }

    function startForward() {
      clearTimer();
      isStartedRef.current = true;
      isRewindingRef.current = false;
      setIsExiting(false);
      setIsTyping(true);

      if (frameRef.current === 0) {
        // Cadrul 1: doar linia de scriere apare fluid pentru 750ms înainte de a scrie primul caracter
        frameRef.current = 1;
        setCurrentFrame(1);
        timeoutRef.current = setTimeout(advanceFrame, INITIAL_BAR_PAUSE_MS);
        return;
      }

      // Reluare scriere de unde a rămas
      advanceFrame();
    }

    function stepRewind() {
      if (!isRewindingRef.current) return;

      if (frameRef.current > 1) {
        // Ștergem litera curentă înapoi
        frameRef.current -= 1;
        setCurrentFrame(frameRef.current);
        timeoutRef.current = setTimeout(stepRewind, REWIND_INTERVAL_MS);
        return;
      }

      // Cadrul 1 atins: a rămas doar bara
      if (frameRef.current === 1) {
        timeoutRef.current = setTimeout(() => {
          if (!isRewindingRef.current) return;
          setIsExiting(true);

          timeoutRef.current = setTimeout(() => {
            frameRef.current = 0;
            setCurrentFrame(0);
            isStartedRef.current = false;
            isRewindingRef.current = false;
            setIsTyping(false);
            setIsExiting(false);
          }, 250);
        }, REWIND_BAR_PAUSE_MS);
      }
    }

    function startRewind() {
      if (isRewindingRef.current || frameRef.current === 0) return;

      clearTimer();
      isRewindingRef.current = true;
      setIsExiting(false);
      setIsTyping(true); // readucem cursorul activ pentru efectul de backspace

      // Dacă eram la cadrul 19 (cursor ascuns), îl readucem vizibil
      if (frameRef.current >= 19) {
        frameRef.current = 18;
        setCurrentFrame(18);
      }

      timeoutRef.current = setTimeout(stepRewind, REWIND_INTERVAL_MS);
    }

    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const scrollY = window.scrollY;
        const scrollingUp = scrollY < lastScrollYRef.current;
        lastScrollYRef.current = scrollY;

        // Când derulăm înapoi către punctul de unde începe animația (de jos în sus spre vârful paginii)
        const isApproachingStart = (scrollingUp && scrollY <= 50) || scrollY <= 15;

        if (isApproachingStart) {
          if (isStartedRef.current && !isRewindingRef.current && frameRef.current > 0) {
            startRewind();
          }
          return;
        }

        // La derularea în Hero în jos: declanșăm sau reluăm scrierea
        if (scrollY > 20) {
          if (isRewindingRef.current) {
            startForward();
          } else if (!isStartedRef.current) {
            startForward();
          }
        }
      });
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimer();
    };
  }, [pathname]);

  const isFrameZero = currentFrame === 0;
  // În cadrul 1 este doar bara (0 litere scrise)
  // În cadrele 2-18 sunt literele 1-17
  // În cadrul 19 sunt toate cele 17 litere, iar cursorul face fade-out
  const typedCount = Math.max(0, Math.min(TOTAL_LETTERS, currentFrame - 1));
  const isCursorFaded = currentFrame >= 19;

  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 select-none sm:gap-3"
      aria-label="A Squared Studio — Acasă"
    >
      {/* Varianta neagră a logo-ului fără niciun background în jur */}
      <img
        src="/logo_black.svg"
        alt="A Squared Studio"
        className="h-8 w-8 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9"
        loading="eager"
      />

      {/* Frame cu frame: scriere înainte și rewind fluid înapoi */}
      {!isFrameZero && (
        <span
          key={isExiting ? "typewriter-exit" : "typewriter-entrance"}
          className={`${
            isExiting ? "animate-typewriter-exit" : "animate-typewriter-entrance"
          } flex items-center overflow-hidden whitespace-nowrap py-0.5`}
        >
          <span className="font-zt-nature text-[17px] font-bold italic tracking-[-0.02em] text-[#17171c] sm:text-[20px] inline-flex items-center">
            {CHARACTERS.slice(0, typedCount).map((char, index) => {
              const isLatest = index === typedCount - 1;
              return (
                <span
                  key={index}
                  className={`inline ${isLatest && !isRewindingRef.current ? "animate-letter-smooth" : ""}`}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
            {/* Linia de scriere: vizibilă în cadrele 1-18, fade-out fluid cu blur la cadrul 19 */}
            <span
              className={`typewriter-cursor ${
                isCursorFaded
                  ? "typewriter-cursor-faded"
                  : isTyping
                  ? "typewriter-cursor-active"
                  : "animate-caret-pulse"
              }`}
              aria-hidden="true"
            />
          </span>
        </span>
      )}
    </Link>
  );
}

