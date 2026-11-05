# 08: Accessibility pass

**What to build:** Every page meets WCAG AA in both themes. Keyboard users get a skip link to the main content and a visible focus indicator on every link and button; headings, landmarks and control labels are correct; the hover preview stays hidden from assistive technology; layouts reflow at narrow widths and 200% zoom without horizontal scrolling. Fix whatever the scans find. See the spec's Accessibility stories and Testing Decisions.

**Blocked by:** 04 (Project pages and the not-found page), 05 (Info page), 06 (Theme and motion)

**Status:** done

- [x] Skip link on every page that moves focus to the main content
- [x] Visible focus indicator on all interactive elements in both themes
- [x] Contrast meets AA in both themes, including muted text
- [x] Tests: an axe scan of the Work page, Info page, every Project page and the not-found page in both themes reports no WCAG A or AA violations; the skip link moves focus to the main content

## Comments

**2026-11-05:** Deployed with 1a7469c. `tests/accessibility.spec.ts`, run against the live site, passes all 42 checks: axe scans of the Work page, Info page, every Project page and the not-found page in both themes report no WCAG A or AA violations; the skip link moves focus to `<main>`; every link and button shows a 2px focus ring in both themes; every page reflows at 320px with no horizontal scroll. The scans' only finding was light-theme contrast (`stone-500` muted text at 4.32:1, the Work page's decorative row numbers at 2.33:1), fixed by moving to `stone-600`. Pages had no `<main>` landmark; the base layout now adds it, and the site nav sits in a `<header>` labelled "Main". Two Work page tests that found the intro as the "banner" landmark now look in the main content. Open: axe scans run with reduced motion, so mid-fade states are not scanned (colours are the same once the fade ends); the focus test checks that a ring is present, not its colour, which was checked by eye in screenshots; the muted label class string is still repeated across pages; no screen reader was used.
