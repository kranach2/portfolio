# Spec: portfolio site

Status: ready-for-agent

## Problem Statement

Kishor is a Software Engineer looking for his next Role. Recruiters and hiring managers (Visitors) currently only see a résumé and a LinkedIn profile, which list technologies but don't show the work: what problem a Project solved, how it was built, and what came of it. Kishor has no site of his own to point a Visitor to, and the most substantial work he has done is Client work that cannot be shown with names or screenshots.

## Solution

A small, fast, static portfolio site with two pages and a page per Project:

- The **Work page** (home) introduces Kishor in one screen (name, "Software Engineer", a one-line pitch, contact links) and lists Projects as an editorial text list. Hovering a Project on desktop shows a preview: an architecture sketch and a one-line summary.
- Each **Project** has its own page covering the problem, what Kishor built, an architecture diagram, the stack and the outcome. Client work is anonymised and shown with diagrams, never screenshots.
- The **Info page** holds an intro paragraph, Experience, Education, Certifications and Skills.
- The nav offers Work, Info, the résumé PDF and a light/dark theme toggle. Contact is always one click away: email (with a copy button), LinkedIn and GitHub, in the Work page header and every footer.

The look is Variant A (Editorial) from the Work page prototype: warm off-white or warm near-black, a large serif display face, generous whitespace and subtle fade-ins. It is already folded into the main branch as the Work page, with content inlined; this spec takes it the rest of the way.

## User Stories

### Work page

1. As a Visitor, I want to see Kishor's name, headline ("Software Engineer") and a one-line pitch as soon as the page loads, so that I know within seconds who he is and what he does.
2. As a Visitor, I want to see where Kishor is based, so that I can judge fit for on-site or hybrid Roles.
3. As a Visitor, I want a prominent "Email me" link in the Work page header, so that I can contact Kishor without hunting for it.
4. As a Visitor, I want a "Copy email" button, so that I can paste the address into my own mail client or ATS when a `mailto:` link doesn't suit me.
5. As a Visitor, I want visible confirmation when the email is copied, so that I know the copy worked.
6. As a Visitor, I want LinkedIn and GitHub links next to the email, so that I can check Kishor's profile and code.
7. As a Visitor, I want Projects listed in a deliberate order, so that I see Kishor's strongest work first.
8. As a Visitor, I want each Project in the list to show its title, whether it is Client work or Personal work, a few stack items and (when known) its dates, so that I can scan the list quickly.
9. As a Visitor on a desktop, I want hovering a Project to show a small architecture sketch and a one-line summary, so that I can preview it before clicking.
10. As a Visitor on a phone or tablet, I want the Project list to work without hover, so that I lose nothing on touch devices.
11. As a Visitor, I want to click a Project to open its own page, so that I can read the detail.
12. As Kishor, I want Projects marked as Draft to be hidden everywhere on the site, so that I can prepare a Project in the repo without publishing it.
13. As Kishor, I want to control Project order with a single field, so that I can reorder the list without touching page code.

### Project pages

14. As a Visitor, I want each Project page to explain the problem first, so that I understand why the work mattered.
15. As a Visitor, I want to read what Kishor built, so that I can see his personal contribution.
16. As a Visitor, I want an architecture diagram on each Project page, so that I can understand the system's shape at a glance.
17. As a Visitor using a screen reader, I want the architecture diagram to have a meaningful text alternative, so that I get the same information.
18. As a Visitor, I want to see the stack used, so that I can match it to the Role I'm hiring for.
19. As a Visitor, I want to read the outcome, so that I can judge the impact of the work.
20. As a Visitor, I want Client work to be clearly labelled as Client work, so that I understand why it is anonymised.
21. As a Visitor, I want Personal work to link to code and a demo where available, so that I can see it running.
22. As a Visitor, I want a way back to the Work page and links to contact Kishor from every Project page, so that I can act once I'm convinced.
23. As Kishor, I want each Project to be one Markdown file with validated frontmatter, so that adding a Project is writing a file, not editing code.
24. As Kishor, I want the build to fail if a Project file is missing a required field or has a wrong value, so that I can't publish a broken Project by accident.
25. As Kishor, I want to add tasks and tools used to a Project later without restructuring it, so that Projects can grow as I write them up.
26. As a Visitor, I want a Project that spanned several phases to show each phase and its main deliverables, so that I can see the scale of a long engagement.

### Info page

27. As a Visitor, I want a short intro paragraph at the top of the Info page, so that I get Kishor's summary in his own words.
28. As a Visitor, I want the two software Roles in full (title, employer, dates and what he did), so that I can assess his recent experience.
29. As a Visitor, I want the Earlier roles condensed to one line, so that I see the IT support and operations background without wading through it.
30. As a Visitor, I want Education listed with institution and years, so that I can check qualifications.
31. As a Visitor, I want Certifications grouped by issuer with the year earned, so that I can scan Microsoft, AWS and CompTIA credentials quickly.
32. As a Visitor, I want the four Featured certifications to stand out from the rest, so that I notice the most relevant ones first.
33. As a Visitor, I want a verify link on a Certification where one exists, so that I can confirm it is genuine.
34. As a Visitor, I want Skills grouped by category as plain lists, so that I can find a technology without decoding bars or ratings.
35. As Kishor, I want each Info page section to come from its own validated data file, so that I can update my background without touching layout code.

### Résumé, navigation and footer

36. As a Visitor, I want the nav on every page to offer Work, Info and the résumé PDF, so that I can move around the site in one click.
37. As a Visitor, I want the current page marked in the nav, so that I know where I am.
38. As a Visitor, I want to download Kishor's résumé as a PDF, so that I can attach it to an internal hiring workflow.
39. As Kishor, I want my phone number to appear nowhere on the site, so that I'm not exposed to spam calls from a public page.
40. As a Visitor, I want every page's footer to repeat the contact links, so that I can act from wherever I finish reading.
41. As a Visitor who follows a broken or old link, I want a helpful not-found page with a way back to the Work page, so that I'm not stranded.

### Theme and motion

42. As a Visitor, I want the site to follow my system light/dark setting on first visit, so that it matches the rest of my screen.
43. As a Visitor, I want a theme toggle in the nav, so that I can switch theme whenever I like.
44. As a Visitor, I want my theme choice remembered across pages and visits, so that I don't have to switch again.
45. As a Visitor, I want no flash of the wrong theme when a page loads, so that the site feels polished.
46. As a Visitor, I want subtle fade-ins as content appears, so that the site feels considered without slowing me down.
47. As a Visitor who has reduced motion turned on, I want no fade-ins or movement, so that the site respects my setting.
48. As a Visitor, I want pages to appear immediately with no loading screen, so that I don't wait.

### Accessibility

49. As a Visitor using a keyboard, I want to reach every link and button in a sensible order with a visible focus indicator, so that I can use the site without a mouse.
50. As a Visitor using a keyboard, I want a skip link to the main content, so that I don't tab through the nav on every page.
51. As a Visitor using a screen reader, I want correct headings, landmarks and labelled controls (including the theme toggle and copy button), so that I can understand and navigate each page.
52. As a Visitor with low vision, I want text and controls to meet WCAG AA contrast in both themes, so that I can read everything.
53. As a Visitor zooming to 200% or using a narrow phone, I want the layout to reflow without horizontal scrolling, so that the site stays usable.

### Sharing, search and analytics

54. As a Visitor sharing a link in Slack, Teams or LinkedIn, I want a link preview showing Kishor's name and "Software Engineer", so that the shared link looks credible.
55. As a Visitor arriving from search, I want each page to have its own title and description, so that the search result tells me what the page is.
56. As Kishor, I want a sitemap, so that search engines find every page, including Project pages.
57. As Kishor, I want cookie-free analytics, so that I can see whether Visitors arrive and which Projects they open, without a cookie banner.

### Publishing

58. As Kishor, I want every push to the main branch to build, test and deploy the site automatically, so that publishing is just pushing.
59. As Kishor, I want a deploy to be blocked when the build or tests fail, so that a broken site never goes live.
60. As Kishor, I want the site hosted for free, so that the portfolio costs nothing to run.
61. As Kishor, I want the repo public, so that the code itself is part of the portfolio.

## Implementation Decisions

### Stack and hosting

- Astro with TypeScript and Tailwind CSS (ADR 0001). The site is fully static: no server runtime, near-zero client JavaScript. The only client scripts are the theme toggle, the copy-email button and the analytics beacon.
- Hosting: Azure Static Web Apps, free tier, on the default `*.azurestaticapps.net` domain. No custom domain.
- Deploy: a GitHub Actions workflow on push to main that installs, builds (which runs content schema validation), runs the Playwright suite against the built site, and deploys only if every step passes. The deployment token is a repository secret.
- Provisioning the Static Web App resource and adding its deployment token as a secret is a human step (ready-for-human). The site's public URL is known only after provisioning; the sitemap, canonical URLs and link previews depend on it, so the site URL is a single config value set once it exists.

### Routes

- Work page at the site root.
- One Project page per non-Draft Project, under a `work/<slug>` path.
- Info page at `info`.
- A not-found page.
- The résumé PDF served as a static file, linked from the nav as "Résumé".

### Content model

All content lives in the repo, validated by schemas at build time. A schema failure fails the build.

- **Projects**: one Markdown file per Project in a content collection. The body holds the Project page sections as headings: Problem, What I built, Outcome (and later, tasks and tools used). Frontmatter shape, evolved from the prototype's type:

  ```ts
  // From the prototype's Project type, extended for Project pages.
  {
    title: string;
    kind: "Client work" | "Personal work";
    summary: string;            // one line: Work page hover preview, meta description
    order: number;              // ascending on the Work page
    draft: boolean;             // default false; Drafts are excluded everywhere
    period?: string;            // e.g. "2024"; shown on the Work page only when present
    stack: string[];            // all items on the Project page, first 3 on the Work page
    previewFlow?: string[];     // nodes of the hover-preview architecture sketch
    diagram?: { src: image; alt: string };  // architecture diagram; alt is required with it
    links?: { code?: url; demo?: url };     // Personal work only
  }
  ```

- **Profile** data file: name, headline, one-line pitch, location, email, LinkedIn URL, GitHub URL, the Info page intro paragraph.
- **Experience** data file: Roles (title, employer, location, start, end or "present", and a list of what was done) plus a single Earlier roles line.
- **Education** data file: qualification, institution, location, years.
- **Certifications** data file: per Certification its issuer (Microsoft, AWS or CompTIA), name, year (or validity note for CompTIA), optional verify URL, and a featured flag. Rendered grouped by issuer, Featured certifications first and visually distinguished.
- **Skills** data file: named categories, each a list of items, using the résumé's categories (Languages; Frameworks & Libraries; Cloud; DevOps; Data; Microsoft Business Apps; Identity & Security; Practices).
- One shared content-access module returns published Projects (Drafts removed, sorted by order) to every page and to the sitemap, so the Draft rule lives in one place.
- The interim inline content module on main is replaced by these collections and deleted.

### Content rules

- **ADR 0002**: no Client is named anywhere in the repo or site, and no Client screenshots are used. Each Client is referred to by its neutral description (below).
- **Sources.** Project write-ups use only Kishor's résumé and his employer's staff profile, both git-ignored. State what those sources say as facts about the work; drop the staff profile's praise ("key role", "exceptional", "instrumental") and do not add claims, metrics or outcomes they don't contain. Leave `period` unset where the sources give no Project dates. A section with no source material (often Outcome) is omitted until Kishor writes it.
- **The Projects**, in `order`:
  1. **Fisheries industry body platform** (Client work, Diversus, for "a WA fisheries industry body"). Kishor's longest engagement, worked on in several stints, so it is the flagship and listed first. One Project covering the phases: the initial MVP, Phase 1 (enhancing the existing website) and Phase 2 (a project management application). Its main deliverables are sections of the same Project page, not separate Projects: the Next.js supplies ordering app; the Xero → Dataverse financial sync (Logic Apps, Azure Functions, line-level transactions, payroll and super backfill, figures validated by the Client's finance team); the highly available Moodle LMS on Azure with Azure AD B2C single sign-on; and the Power Pages member portal (B2C, Content Security Policy, custom forms, Power Automate). The interface work used JavaScript, jQuery, CSS, Bootstrap and C#, with Power Pages, Dynamics 365, Dataverse, Logic Apps and Function Apps.
  2. **Corporate website** (Client work, Diversus, for "a WA state tourism agency"). Front end and back end: Angular on the front end, the Kontent.ai headless CMS with .NET on the back end; responsibility for performance, responsiveness and security.
  3. **Mine execution control system** (Client work, Insig Technologies, for "a mining contractor"). An application for mine execution planners and control room operators to plan mining activities and record progress and outcomes. REST APIs in C# and ASP.NET Core on a microservice architecture, an API gateway centralising service delivery, a Vue.js front end, and xUnit tests.
  4. **Council website** (Client work, Diversus, for "a Perth local government"). Next.js with Material UI, Contentful as the headless CMS, AWS Cognito federated sign-in and AWS Amplify CI/CD; Kishor also worked on accessibility and SEO metadata.
- None of the Projects has a diagram yet; a Project page omits the diagram section rather than showing a fake one until Kishor supplies one.
- Commit one Draft Project as a permanent fixture so the "Drafts stay hidden" test has something to hide. Its title must read as an obvious test fixture.
- Experience: the two software Roles in full: Technical Consultant, Diversus, Perth (Mar 2023 – present) and Software Engineer, Insig Technologies, Perth (Apr 2021 – Feb 2023). Earlier roles on one line: IT support and operations, VenuesWest (2017) and Insig (Oct 2020 – Mar 2021). The Insig dates come from Kishor and override the résumé and LinkedIn, which he will update to match.
- Skills: the résumé's categories, adding the staff profile's items where they fit (Angular, Material UI, Bootstrap, jQuery, GraphQL, Kontent.ai and Contentful, AWS Amplify and Cognito, Jira and Bitbucket). The staff profile's soft-skills list is not used.
- Education: Bachelor of Information Technology, Edith Cowan University (2013–2016); Professional Year Program, National Institute of Technology (2016–2017). Never mention Honours in any form.
- Featured certifications: Dynamics 365 + Power Platform Solution Architect Expert, Azure Developer Associate, Azure Administrator Associate, Azure AI Engineer Associate.
- Verify links are placeholders (absent) until Kishor supplies Credly and Microsoft Learn transcript links; a Certification without a verify URL renders without a link, never a dead one.
- No phone number anywhere: not in content, not in the résumé PDF (Kishor exports it by hand without the number), not in metadata.

### Layout and look

- Variant A (Editorial) from the Work page prototype is the visual direction: warm off-white / warm near-black palettes, Instrument Serif for display type, Inter for body, generous whitespace, numbered Project rows with a hover preview. The main branch already has it for the Work page; the Info and Project pages follow the same look.
- A shared base layout provides the document head (title, description, link-preview tags, canonical URL), the pre-paint theme script, the skip link, the nav and the footer. Pages provide their own main content.
- The hover preview is decorative and hidden from assistive technology; the Project row link itself carries the title. It only appears for devices with a hover-capable pointer at desktop widths.

### Theme

- First visit follows `prefers-color-scheme`. The toggle switches the theme and stores the choice in local storage; stored choice wins on later visits. A blocking inline script in the head applies the theme before first paint. Storage access is wrapped so a blocked storage still renders the system theme.
- The toggle is a button with an accessible name and exposes its state (pressed for dark).

### Motion

- Fade-ins are CSS-only, short and staggered, and apply only under `prefers-reduced-motion: no-preference`. No loading screen, no scroll-jacking.

### SEO, sharing and analytics

- Per-page title and meta description: the Work page uses the name and headline; Project pages use the Project title and summary; the Info page has its own.
- Link previews: Open Graph and Twitter card tags on every page, pointing to one site-wide image with Kishor's name and "Software Engineer", generated at build time in the site's look (not a hand-made asset).
- A sitemap covering the Work page, Info page and every published Project page; Drafts excluded. A robots file pointing to it.
- Cloudflare Web Analytics beacon on every page in production builds only. The beacon token is a config value Kishor supplies; with no token configured the beacon is omitted.

## Testing Decisions

- **One seam: the built site.** Playwright drives the production build served by Astro's preview server. Tests act as a Visitor would: load pages, read visible text and accessible names, click links and buttons, and inspect what the browser exposes (document title, meta tags, local storage, the computed theme). No unit tests, no tests of components or content helpers in isolation.
- **Schema validation is the content test.** The build validates every content file against its schema and fails on error. CI runs the build before Playwright, so invalid content blocks deploy without a separate test.
- A good test here names a Visitor-observable behaviour and asserts only on it. It survives a restyle or a refactor of how content is loaded. Tests select by role, accessible name and visible text, not by CSS class or DOM structure.
- What the suite covers:
  - **Work page**: name, headline, pitch, email link, copy-email button (clipboard receives the address and confirmation appears), LinkedIn and GitHub links; Projects appear in `order` sequence; each links to its Project page.
  - **Drafts stay hidden**: the Draft fixture's title appears on no page, its Project page route returns not found, and it is absent from the sitemap.
  - **Project pages**: every published Project page renders its title, kind and stack; the diagram, when present, has its text alternative; a Project without a diagram renders no diagram section; the flagship Project shows each of its phases.
  - **Info page**: sections appear in order (intro, Experience, Education, Certifications, Skills); Earlier roles render as one line; Certifications are grouped by issuer with Featured certifications first; no "Honours" text appears.
  - **Theme**: first load follows an emulated dark and light system setting; toggling changes the theme and its stored value; after a reload and on another page, the stored choice wins over the system setting.
  - **Reduced motion**: with reduced motion emulated, no element has an active animation.
  - **Accessibility**: an axe scan of every page in both themes reports no WCAG A or AA violations; the skip link moves focus to the main content.
  - **Metadata**: each page has a unique title and a description; link-preview tags are present and the preview image is served; the sitemap lists exactly the published pages.
  - **Privacy guard**: no page's text or markup matches an Australian mobile phone number pattern. (A guard for the Client's name is deliberately not written: it would put the name in the repo, against ADR 0002.)
  - **Not found**: an unknown route shows the not-found page with a link back to the Work page.
- Prior art: none yet; this suite is the first. The prototype's draft check and two-theme screenshots were done by hand, and these tests replace them.

## Out of Scope

- The personal story and photos on the Info page (on hold).
- A contact form, a phone number, or any way to contact Kishor other than email, LinkedIn and GitHub.
- A custom domain.
- A blog, CMS, or any content source outside the repo.
- Writing Project content beyond what the résumé and staff profile say: outcomes, per-Project dates, tasks and tools used. Kishor adds these.
- Producing the résumé PDF (Kishor exports it by hand). Until it is added, the nav link points at the expected file path.
- Credly and Microsoft Learn transcript links (added when Kishor supplies them).
- Prototype Variants B (Dark technical) and C (Bento). They stay on the `prototype/work-page` branch.
- Visual regression testing, performance budgets and cross-browser matrices beyond Playwright's default Chromium.
- Cookie banners (the analytics is cookie-free).

## Further Notes

- The Work page prototype verdict and how to revisit B or C are in `work-page-prototype.md` next to this spec; the prototype code is on branch `prototype/work-page`.
- Domain language follows `GLOSSARY.md`: Visitor, Client, Project, Client work, Personal work, Draft, Role, Earlier roles, Certification, Featured certification, Work page, Info page. "Diagram", "hover preview" and "flagship" are used here as plain descriptions, not glossary terms. The Placeholder project term was retired once Kishor supplied real Projects.
- Inputs owned by Kishor, none blocking: architecture diagrams, outcomes and dates per Project; Credly and Microsoft Learn transcript links; the résumé PDF export; the Cloudflare Web Analytics token; the Azure Static Web App provisioning; and on LinkedIn, removing "Honours" and correcting the Insig dates (the Oct 2020 support role is at Insig).
- Both content sources (the résumé and the staff profile) name Clients. Anyone extracting content from them must anonymise it before it enters the repo. The staff profile also carries the employer's branding and a photo; neither is used.
