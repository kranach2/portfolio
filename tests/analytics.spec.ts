import { expect, test, type Page } from "@playwright/test";
import { beaconSite, everyPage } from "./pages";

const beaconSrc = "https://static.cloudflareinsights.com/beacon.min.js";
const beacon = (page: Page) => page.locator(`script[src="${beaconSrc}"]`);

for (const path of everyPage) {
  test(`with a token configured, ${path} includes the analytics beacon`, async ({ page }) => {
    // Never report test visits to Cloudflare.
    await page.route(`${beaconSrc}*`, (route) => route.abort());
    await page.goto(`${beaconSite}${path}`);
    const config = await beacon(page).getAttribute("data-cf-beacon");
    expect(JSON.parse(config!)).toEqual({ token: "test-beacon-token" });
  });
}

for (const path of everyPage) {
  test(`without a token, ${path} has no analytics beacon`, async ({ page }) => {
    await page.goto(path);
    await expect(beacon(page)).toHaveCount(0);
  });
}

test("the beacon sets no cookies", async ({ page, context }) => {
  // Let the beacon script run, but never report test visits to Cloudflare.
  await page.route("https://cloudflareinsights.com/**", (route) => route.abort());
  const loaded = page.waitForResponse(beaconSrc);
  await page.goto(`${beaconSite}/`);
  expect((await loaded).ok()).toBe(true);
  await page.getByRole("navigation").getByRole("link", { name: "Info" }).click();
  await expect(page).toHaveURL(`${beaconSite}/info`);
  expect(await context.cookies()).toEqual([]);
});
