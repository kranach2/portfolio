# 01: Work page from validated content, with the test harness

**What to build:** The Work page reads everything it shows from schema-validated content instead of the interim inline module: a Projects content collection (one Markdown file per Project) and a Profile data file. A Visitor sees the same Work page design as today, now listing Kishor's four real Projects with the flagship first, with no invented dates and Drafts never shown. This ticket also stands up the Playwright suite against the built site, which every later ticket extends. See the spec's Content model, Content rules and Testing Decisions.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] Projects collection with the frontmatter schema from the spec (title, kind, summary, order, draft, optional period, stack, optional previewFlow, optional diagram with required alt, optional links); invalid frontmatter fails the build
- [x] Profile data file (name, headline, pitch, location, email, LinkedIn, GitHub, Info page intro) with a schema; invalid data fails the build
- [x] The four Projects from the spec as Markdown files, in its order (fisheries industry body platform, corporate website, mine execution control system, council website), written only from the résumé and staff profile as the spec describes; no `period` where the sources give none; every Client referred to by its neutral description, never named (ADR 0002)
- [x] One committed Draft Project fixture whose title reads as an obvious test fixture
- [x] A single content-access module returns published Projects (Drafts removed, sorted by `order`); the Work page uses it
- [x] The interim inline content module is deleted
- [x] The Work page shows a Project's dates only when `period` is set
- [x] Playwright runs against the production build served by the preview server, via one package script
- [x] Tests: name, headline, pitch, email link, LinkedIn and GitHub links visible; copy-email puts the address on the clipboard and shows confirmation; Projects appear in `order` sequence and each links to its Project page path; the Draft fixture's title appears nowhere on the Work page; no page markup matches an Australian mobile phone number pattern
