// Robots file: crawl everything, and find pages through the sitemap.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site).href}\n`, {
    headers: { "Content-Type": "text/plain" },
  });
