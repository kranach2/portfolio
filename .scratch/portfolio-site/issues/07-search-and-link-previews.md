# 07: Search and link previews

**What to build:** Every page has its own title and description and link-preview tags, so a shared link shows Kishor's name and "Software Engineer" on a site-wide preview image generated at build time in the site's look. A sitemap lists the Work page, Info page and every published Project page (never Drafts), a robots file points to it, and pages carry canonical URLs, all from the one site-URL config value. See the spec's SEO, sharing and analytics.

**Blocked by:** 04 (Project pages and the not-found page), 05 (Info page)

**Status:** done

- [x] Unique title and meta description per page
- [x] Open Graph and Twitter card tags on every page, pointing at the generated preview image
- [x] Preview image generated during the build, not a hand-made asset
- [x] Sitemap and robots file; canonical URL per page
- [x] Tests: titles are unique and descriptions present on every page; preview tags present and the image is served; the sitemap lists exactly the published pages and not the Draft fixture

## Comments

**2026-11-05:** Deployed with f972abd. On the live site `/`, `/info` and a Project page return 200 with no redirect, so canonical URLs without a trailing slash point straight at the page. `/sitemap.xml` (text/xml) lists exactly the Work page, the Info page and the four published Project pages; `/robots.txt` points to it; `/og.png` is served as image/png; `/work/draft-fixture` is 404. The preview image is drawn at build time by Satori with the site's fonts (from `@fontsource`) and turned into a PNG by sharp; it also shows the location line, matching the Work page header. The not-found page carries the preview tags but deliberately names no canonical URL, since it has no address of its own. Open: `npm audit` reports 2 moderate advisories in `fflate` via `satori` (ZIP64 parsing, never used by this build); the tests check the image is served at 1200×630 but not what it shows, which was checked by eye; link previews were not checked in Slack, Teams or LinkedIn themselves.
