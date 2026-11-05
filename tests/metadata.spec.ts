import { expect, test } from "@playwright/test";
import { everyPage, publishedPages, site } from "./pages";

test("every page has its own title and a description", async ({ page }) => {
  const titles = new Set<string>();
  for (const path of everyPage) {
    await page.goto(path);
    const title = await page.title();
    expect(title, path).not.toBe("");
    expect(titles, `${path} repeats "${title}"`).not.toContain(title);
    titles.add(title);
    await expect(page.locator('meta[name="description"]'), path).toHaveAttribute("content", /\S/);
  }
});

for (const path of publishedPages) {
  test(`${path} names its canonical URL`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${site}${path}`);
  });
}

test("the not-found page names no canonical URL", async ({ page }) => {
  await page.goto("/no-such-page");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test("the sitemap lists exactly the published pages, never the Draft", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  const listed = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(listed.sort()).toEqual(publishedPages.map((path) => `${site}${path}`).sort());
  expect(xml).not.toContain("draft-fixture");
});

test("the robots file allows crawling and points to the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBe(true);
  const robots = await response.text();
  expect(robots).toContain(`Sitemap: ${site}/sitemap.xml`);
  expect(robots).not.toMatch(/^Disallow: \/$/m);
});

for (const path of everyPage) {
  test(`${path} has link-preview tags pointing at the preview image`, async ({ page }) => {
    await page.goto(path);
    const meta = (key: string) => page.locator(`meta[property="${key}"], meta[name="${key}"]`);
    await expect(meta("og:title")).toHaveAttribute("content", await page.title());
    await expect(meta("og:description")).toHaveAttribute(
      "content",
      (await page.locator('meta[name="description"]').getAttribute("content"))!,
    );
    await expect(meta("og:type")).toHaveAttribute("content", "website");
    await expect(meta("og:image")).toHaveAttribute("content", `${site}/og.png`);
    await expect(meta("twitter:card")).toHaveAttribute("content", "summary_large_image");
    await expect(meta("twitter:image")).toHaveAttribute("content", `${site}/og.png`);
  });
}

test("the preview image is served as a 1200×630 PNG", async ({ request }) => {
  const response = await request.get("/og.png");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toBe("image/png");
  // A PNG's width and height sit at bytes 16–23 of its header.
  const png = await response.body();
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
});
