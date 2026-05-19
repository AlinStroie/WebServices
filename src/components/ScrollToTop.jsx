import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ block: "start", behavior: "smooth" });
      });

      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [hash, pathname]);

  return null;
}

export default ScrollToTop;
