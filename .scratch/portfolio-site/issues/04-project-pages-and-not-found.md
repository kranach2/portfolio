# 04: Project pages and the not-found page

**What to build:** Each published Project has its own page under `work/<slug>`, reached from the Work page. It shows the title, Client work or Personal work, the Problem, What I built, the architecture diagram (only when the Project has one), the full stack, the Outcome, code and demo links for Personal work where present, and a way back plus the contact links. Unknown routes, including a Draft's, show a not-found page that links back to the Work page. See the spec's Routes, Content model and Layout and look.

**Blocked by:** 01 (Work page from validated content, with the test harness)

**Status:** ready-for-agent

- [ ] A page is generated per published Project only; Drafts get no page
- [ ] Body sections render from the Project's Markdown headings; missing sections are omitted, not shown empty
- [ ] The diagram renders with its required text alternative; a Project with no diagram omits the diagram section entirely
- [ ] Page title and description come from the Project title and summary
- [ ] Not-found page in the site's look with a link back to the Work page
- [ ] Tests: every published Project page shows its title, kind and stack; a Project without a diagram has no diagram section; the fisheries industry body platform page shows its MVP, Phase 1 and Phase 2 and its main deliverables as sections; the Draft fixture's route shows the not-found page; an unknown route shows the not-found page with a working link back
