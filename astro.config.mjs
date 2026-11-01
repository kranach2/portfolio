// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Absolute URLs (sitemap, canonical links, link previews) are built from
  // this: the Static Web App's default domain.
  site: "https://calm-tree-04325ad00.1.azurestaticapps.net",
  vite: { plugins: [tailwindcss()] },
});
