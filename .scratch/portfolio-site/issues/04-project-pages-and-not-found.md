# 04: Project pages and the not-found page

**What to build:** Each published Project has its own page under `work/<slug>`, reached from the Work page. It shows the title, Client work or Personal work, the Problem, What I built, the architecture diagram (only when the Project has one), the full stack, the Outcome, code and demo links for Personal work where present, and a way back plus the contact links. Unknown routes, including a Draft's, show a not-found page that links back to the Work page. See the spec's Routes, Content model and Layout and look.

**Blocked by:** 01 (Work page from validated content, with the test harness)

**Status:** done

- [x] A page is generated per published Project only; Drafts get no page
- [x] Body sections render from the Project's Markdown headings; missing sections are omitted, not shown empty
- [x] The diagram renders with its required text alternative; a Project with no diagram omits the diagram section entirely
- [x] Page title and description come from the Project title and summary
- [x] Not-found page in the site's look with a link back to the Work page
- [x] Tests: every published Project page shows its title, kind and stack; a Project without a diagram has no diagram section; the fisheries industry body platform page shows its MVP, Phase 1 and Phase 2 and its main deliverables as sections; the Draft fixture's route shows the not-found page; an unknown route shows the not-found page with a working link back

## Comments

**2026-11-01:** Deployed with 548b238. On the live site `/work/<slug>` serves the Project page with and without a trailing slash (200, no redirect); `/work/draft-fixture` and unknown routes return 404 with the not-found page. Open, waiting on Kishor's content: the diagram path (with its text alternative) is untested until a Project has a diagram, and when one exists it renders after the whole body (after Outcome too) rather than between What I built and Outcome.
