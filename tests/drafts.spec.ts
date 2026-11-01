import { expect, test } from "@playwright/test";

// The committed Draft fixture in src/content/projects.
const draftTitle = "Test fixture: Draft Project that must never appear";

test("the Draft fixture appears nowhere on the Work page", async ({ page }) => {
  await page.goto("/");
  expect(await page.content()).not.toContain(draftTitle);
});

test("the Draft fixture's Project page route shows the not-found page", async ({ page }) => {
  const response = await page.goto("/work/draft-fixture");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  expect(await page.content()).not.toContain(draftTitle);
});
