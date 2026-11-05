// Sitemap: the Work page, the Info page and every published Project page.
// Drafts never appear, because only published Projects are listed.
import type { APIRoute } from "astro";
import { getPublishedProjects, projectPath } from "../lib/content";

export const GET: APIRoute = async ({ site }) => {
  const projects = await getPublishedProjects();
  const paths = ["/", "/info", ...projects.map(projectPath)];
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
