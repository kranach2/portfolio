import { expect, test } from "@playwright/test";

// The committed Draft fixture in src/content/projects.
const draftTitle = "Test fixture: Draft Project that must never appear";

test("the Draft fixture appears nowhere on the Work page", async ({ page }) => {
  await page.goto("/");
  expect(await page.content()).not.toContain(draftTitle);
});
