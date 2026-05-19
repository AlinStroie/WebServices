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

  if (!loader) return;

  requestAnimationFrame(() => {
    loader.classList.add("loader-hidden");

    setTimeout(() => {
      loader.remove();
    }, 650);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hideInitialLoader, { once: true });
} else {
  hideInitialLoader();
}

window.setTimeout(hideInitialLoader, 900);
