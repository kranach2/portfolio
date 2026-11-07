import { publishedProjects } from "./published-projects";

// The deployed origin, as configured by `site` in astro.config.mjs.
export const site = "https://calm-tree-04325ad00.1.azurestaticapps.net";

// The site built with a test analytics token, as served by playwright.config.ts.
export const beaconSite = "http://localhost:4322";

// The published pages: the Work page, the Info page and every Project page.
export const publishedPages = ["/", "/info", ...publishedProjects.map((p) => p.path)];

// Every page a Visitor can reach, including the not-found page.
export const everyPage = [...publishedPages, "/no-such-page"];
