// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Absolute URLs (sitemap, canonical links, link previews) are built from
  // this: the Static Web App's default domain.
  site: "https://calm-tree-04325ad00.1.azurestaticapps.net",
  env: {
    schema: {
      // Kishor's Cloudflare Web Analytics token. Without it, no beacon.
      CLOUDFLARE_ANALYTICS_TOKEN: envField.string({ context: "server", access: "public", optional: true }),
    },
  },
  vite: { plugins: [tailwindcss()] },
});
