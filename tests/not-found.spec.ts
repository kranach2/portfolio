import { expect, test } from "@playwright/test";

test("an unknown route shows the not-found page with a working link back", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  await page.getByRole("link", { name: "Back to the Work page" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("region", { name: "Selected work" })).toBeVisible();
});
