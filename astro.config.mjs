// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // The provisioned Static Web App's default URL (ticket 02).
  site: "https://calm-tree-04325ad00.1.azurestaticapps.net",
  vite: { plugins: [tailwindcss()] },
});
