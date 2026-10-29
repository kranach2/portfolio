# 06: Theme and motion

**What to build:** On first visit the site follows the system light/dark setting. The nav toggle switches theme, exposes its state to assistive technology, and the choice is remembered across pages and visits, overriding the system setting. No page flashes the wrong theme on load, and blocked storage still renders the system theme. Fade-ins only run when the Visitor hasn't asked for reduced motion. See the spec's Theme and Motion.

**Blocked by:** 01 (Work page from validated content, with the test harness)

**Status:** ready-for-agent

- [ ] Toggle is a button with an accessible name and a pressed state that reflects dark mode
- [ ] Theme applied before first paint on every page
- [ ] Storage reads and writes cannot throw into the page
- [ ] Fade-ins are CSS-only and disabled under reduced motion
- [ ] Tests: emulated dark and light system settings each give the matching theme on first load; toggling changes the theme, the pressed state and the stored value; after reload and on another page the stored choice wins over the system setting; with reduced motion emulated no element has an active animation
