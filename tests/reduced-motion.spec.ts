import { expect, test } from "@playwright/test";
import { everyPage } from "./pages";

test.use({ reducedMotion: "reduce" });

for (const path of everyPage) {
  test(`with reduced motion, no element animates on ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  });
}
