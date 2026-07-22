import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/tatracannabees/",
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: false,
        autoSubfolderIndex: true,
        routes: [
          "/",
          "/about",
          "/blog",
          "/blog/cbd-co-o-nom-vieme",
          "/blog/thc-neutralne-info",
          "/blog/whx-dubai-2026",
          "/contact",
          "/cookies",
          "/privacy",
          "/products",
          "/terms",
        ],
      },
    }),
    react(),
  ],
});
