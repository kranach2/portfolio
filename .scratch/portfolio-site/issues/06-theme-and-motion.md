# 06: Theme and motion

**What to build:** On first visit the site follows the system light/dark setting. The nav toggle switches theme, exposes its state to assistive technology, and the choice is remembered across pages and visits, overriding the system setting. No page flashes the wrong theme on load, and blocked storage still renders the system theme. Fade-ins only run when the Visitor hasn't asked for reduced motion. See the spec's Theme and Motion.

**Blocked by:** 01 (Work page from validated content, with the test harness)

**Status:** done

- [x] Toggle is a button with an accessible name and a pressed state that reflects dark mode
- [x] Theme applied before first paint on every page
- [x] Storage reads and writes cannot throw into the page
- [x] Fade-ins are CSS-only and disabled under reduced motion
- [x] Tests: emulated dark and light system settings each give the matching theme on first load; toggling changes the theme, the pressed state and the stored value; after reload and on another page the stored choice wins over the system setting; with reduced motion emulated no element has an active animation

## Comments

**2026-11-04:** Deployed with b8f1488. On the live site `/` returns 200 and serves the toggle as "Dark theme". In a browser against the live site, the toggle starts unpressed under a light system setting and pressed under a dark one, and each click flips the pressed state and stores the choice. `aria-pressed` is set by the page script rather than in the markup, so the button never reports a wrong state before the script runs. The before-paint test checks the theme when `<body>` appears, not at `DOMContentLoaded` as the handoff suggested: the toggle script also runs before `DOMContentLoaded`, so a later check would miss the theme script leaving the head. Open: the toggle's hover state is visible but faint in both themes (a small colour shift on the icon); the accessibility pass (08) may want something stronger.
