# Work page prototype: verdict

Question: what should the Work page look like?

Prototyped three structurally different variants of the Work page on a throwaway route (`/prototype/work?variant=A|B|C`), with real content in both themes:

- **A, Editorial**: warm off-white, large serif headline, Projects as a numbered text list with dates and a hover preview (architecture sketch + summary).
- **B, Dark technical**: monospace accents, grid background, Featured certifications aside, Projects as a table with stack tags.
- **C, Bento**: rounded tiles of different sizes mixing intro, Projects, about, links and Featured certifications.

## Verdict (2026-10-22)

**A, Editorial wins.** Kishor wants to keep B and C available in case he changes his mind later.

## Where the prototype lives

Branch `prototype/work-page`. All three variants and the floating switcher are there, runnable with `npm install && npm run prototype`. Main keeps only Variant A, folded into `src/pages/index.astro`.

To revisit B or C: `git checkout prototype/work-page -- src/pages/prototype/_work-page/VariantB.astro` (or `VariantC.astro`), or check out the branch and run it.

## Notes for the spec

- Project dates in the prototype are the Diversus Role span ("2023 – now"), not real per-Project dates.
- The hover preview only shows on desktop pointers; on touch it is hidden. Its architecture sketch is a placeholder built from a `flow` list per Project.
- The headline wording ("…builds *full-stack apps* and the cloud they run on") was written for the prototype and is not confirmed copy.
