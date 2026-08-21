import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

function hideInitialLoader() {
  const loader = document.getElementById("initial-loader");

  if (!loader || loader.dataset.hiding) return;
  loader.dataset.hiding = "true";

  requestAnimationFrame(() => {
    loader.classList.add("loader-hidden");

    setTimeout(() => {
      loader.remove();
    }, 650);
  });
}

// The hero video is preloaded (index.html <link rel=preload> + the <video>
// itself), but without gating on it here the loader could hide before it
// has enough buffered to play smoothly — the fade-in would then start over
// a video that's still stuttering to catch up. readyState >= 3
// (HAVE_FUTURE_DATA) is "enough to play forward without an immediate
// stall," same bar the browser itself uses to fire 'canplay'. Not every
// route has this element (only "/"), so a missing video resolves
// immediately rather than blocking those pages.
const heroVideoReady = new Promise((resolve) => {
  const video = document.querySelector("[data-hero-video]");
  if (!video) {
    resolve();
  } else if (video.readyState >= 3) {
    resolve();
  } else {
    video.addEventListener("canplay", resolve, { once: true });
  }
});

// DOMContentLoaded fires as soon as React has done its initial render, but
// self-hosted Inter is still an in-flight network request at that point —
// hiding the loader that early exposed the Hero mid-swap (fallback font,
// then a visible reflow onto Inter once it lands), which read as the page
// "loading slowly" even though it had already painted. Waiting on
// document.fonts.ready closes that gap; the window "load" event backs it
// up in case fonts.ready never settles, and a hard timeout guarantees the
// loader can never get stuck up regardless of network conditions.
const ready = Promise.race([
  Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    heroVideoReady,
    new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    }),
  ]),
  new Promise((resolve) => window.setTimeout(resolve, 2500)),
]);

ready.then(hideInitialLoader);
