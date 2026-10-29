# 08: Accessibility pass

**What to build:** Every page meets WCAG AA in both themes. Keyboard users get a skip link to the main content and a visible focus indicator on every link and button; headings, landmarks and control labels are correct; the hover preview stays hidden from assistive technology; layouts reflow at narrow widths and 200% zoom without horizontal scrolling. Fix whatever the scans find. See the spec's Accessibility stories and Testing Decisions.

**Blocked by:** 04 (Project pages and the not-found page), 05 (Info page), 06 (Theme and motion)

**Status:** ready-for-agent

- [ ] Skip link on every page that moves focus to the main content
- [ ] Visible focus indicator on all interactive elements in both themes
- [ ] Contrast meets AA in both themes, including muted text
- [ ] Tests: an axe scan of the Work page, Info page, every Project page and the not-found page in both themes reports no WCAG A or AA violations; the skip link moves focus to the main content
