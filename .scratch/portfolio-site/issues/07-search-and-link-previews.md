# 07: Search and link previews

**What to build:** Every page has its own title and description and link-preview tags, so a shared link shows Kishor's name and "Software Engineer" on a site-wide preview image generated at build time in the site's look. A sitemap lists the Work page, Info page and every published Project page (never Drafts), a robots file points to it, and pages carry canonical URLs, all from the one site-URL config value. See the spec's SEO, sharing and analytics.

**Blocked by:** 04 (Project pages and the not-found page), 05 (Info page)

**Status:** ready-for-agent

- [ ] Unique title and meta description per page
- [ ] Open Graph and Twitter card tags on every page, pointing at the generated preview image
- [ ] Preview image generated during the build, not a hand-made asset
- [ ] Sitemap and robots file; canonical URL per page
- [ ] Tests: titles are unique and descriptions present on every page; preview tags present and the image is served; the sitemap lists exactly the published pages and not the Draft fixture
