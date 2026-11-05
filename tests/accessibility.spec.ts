import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { everyPage } from "./pages";

for (const path of everyPage) {
  test(`the skip link moves focus to the main content on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
  });
}

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`in the ${colorScheme} theme`, () => {
    test.use({ colorScheme, reducedMotion: "reduce" });

    for (const path of everyPage) {
      test(`an axe scan of ${path} reports no WCAG A or AA violations`, async ({ page }) => {
        await page.goto(path);
        const { violations } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(violations.map(({ id, help, nodes }) => ({ id, help, targets: nodes.map((n) => n.target) }))).toEqual([]);
      });

      test(`every link and button on ${path} shows a focus indicator`, async ({ page }) => {
        await page.goto(path);
        const count = (await page.getByRole("link").count()) + (await page.getByRole("button").count());
        for (let i = 0; i < count; i++) {
          await page.keyboard.press("Tab");
          const { name, outline } = await page.evaluate(() => {
            const el = document.activeElement as HTMLElement;
            const s = getComputedStyle(el);
            return {
              name: el.getAttribute("aria-label") ?? el.textContent?.trim(),
              outline: { style: s.outlineStyle, width: parseFloat(s.outlineWidth) },
            };
          });
          expect(outline.style, `${name} has an outline`).not.toBe("none");
          expect(outline.width, `${name}'s outline is at least 2px`).toBeGreaterThanOrEqual(2);
        }
      });
    }
  });
}

// 320 CSS pixels wide is a narrow phone, and a 1280-pixel window at 400% zoom.
test.describe("at 320 pixels wide", () => {
  test.use({ viewport: { width: 320, height: 640 } });

  for (const path of everyPage) {
    test(`${path} reflows without horizontal scrolling`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBe(0);
    });
  }
});
