import { expect, test } from "@playwright/test";
import { publishedProjects } from "./published-projects";

// Every page of the site; later pages join this list.
const pages = ["/", ...publishedProjects.map((p) => p.path), "/no-such-page"];

// 04xx xxx xxx or +61 4xx xxx xxx, with optional spaces or dashes.
const australianMobile = /(?<!\d)(?:\+?61[\s-]?|0)4(?:[\s-]?\d){8}(?!\d)/;

for (const path of pages) {
  test(`no phone number in the markup of ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(await page.content()).not.toMatch(australianMobile);
  });
}
