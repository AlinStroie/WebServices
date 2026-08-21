import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // reference/ holds source assets dropped in ad hoc (design refs,
      // video masters) — not imported by the app, so it doesn't need
      // watching. OneDrive syncs this whole repo and locks files briefly
      // right after they land here, which was crashing the dev server's
      // fs watcher (EBUSY) every time a new file showed up.
      ignored: ["**/reference/**"],
    },
  },
});