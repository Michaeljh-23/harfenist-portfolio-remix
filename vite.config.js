import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";

import tailwindcss from "tailwindcss";

installGlobals();

export default defineConfig({
  plugins: [remix()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
