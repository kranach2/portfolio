# Astro for the site, not Next.js

The site is static content with no application logic, so we build it with Astro, TypeScript and Tailwind CSS: it ships plain HTML with near-zero JavaScript and validates content files against a schema at build time. Next.js was the obvious alternative, since Kishor uses it professionally and it would double as a skills showcase, but it adds a client runtime and framework weight that a content site doesn't need. Swapping frameworks later means rebuilding every page.
