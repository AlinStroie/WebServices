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

  loader.classList.add("loader-hidden");

  setTimeout(() => {
    loader.remove();
  }, 350);
}

// The loader is a generic skeleton now (no real text/logo/video to flash
// mid-swap), so it no longer needs to wait on fonts or the hero video —
// that gating used to hold it open for up to 2.5s and was the main driver
// of mobile LCP. Two rAF ticks is enough to guarantee React's first paint
// has been committed before it's removed.
requestAnimationFrame(() => {
  requestAnimationFrame(hideInitialLoader);
});
