# 05: Info page

**What to build:** The Info page, linked from the nav, shows in order: the intro paragraph (from the Profile), Experience (the two software Roles in full, then Earlier roles on one line), Education, Certifications grouped by issuer with the four Featured certifications first and visually distinguished, and Skills as grouped plain lists in the résumé's categories. Each section comes from its own schema-validated data file. See the spec's Content model and Content rules.

**Blocked by:** 01 (Work page from validated content, with the test harness)

**Status:** done

- [x] Experience, Education, Certifications and Skills data files with schemas; invalid data fails the build
- [x] Roles: Technical Consultant, Diversus (Mar 2023 – present) and Software Engineer, Insig Technologies (Oct 2021 – Feb 2023); Earlier roles line: IT support and operations, VenuesWest (2017), a private employer (Oct 2020 – Mar 2021) and Insig Technologies (Apr 2021 – Oct 2021); Client unnamed (ADR 0002)
- [x] Education: Bachelor of Information Technology, Edith Cowan University (2013–2016); Professional Year Program, National Institute of Technology (2016–2017)
- [x] Certifications grouped Microsoft, AWS, CompTIA with years (CompTIA with its validity note); a Certification without a verify URL renders as plain text, never a dead link
- [x] Skills with no bars, ratings or levels, using the résumé categories plus the staff profile items listed in the spec
- [x] Nav marks Info as the current page
- [x] Tests: sections appear in order; both Roles render with title, employer and dates; Earlier roles is a single line; Featured certifications appear first and are distinguishable

## Comments

**2026-11-04:** Deployed with 508d95d. On the live site `/info` serves the Info page with and without a trailing slash (200) and the nav marks Info as current. Open, for Kishor: verify URLs are absent, so the link branch of a Certification is untested until one is added; Featured certifications show newest first (Azure AI Engineer first, Solution Architect Expert last), not the spec's listed order; the Earlier roles sentence wraps to two lines at desktop width; GLOSSARY.md's Certification says "a year", but CompTIA entries carry a validity date instead.
