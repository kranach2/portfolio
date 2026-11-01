import { expect, test } from "@playwright/test";

const email = "kishor.ranac@gmail.com";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("introduces Kishor with name, headline and pitch", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Kishor Rana Chhetri");
  await expect(page.getByRole("banner").getByText("Software Engineer")).toBeVisible();
  await expect(
    page.getByText("I design, build and deploy full-stack web applications", { exact: false }),
  ).toBeVisible();
});

test("offers email, LinkedIn and GitHub links in the header", async ({ page }) => {
  const header = page.getByRole("banner");
  const links = [
    ["Email me", `mailto:${email}`],
    ["LinkedIn", "https://www.linkedin.com/in/kishor-ranachhetri"],
    ["GitHub", "https://github.com/kranach2"],
  ];
  for (const [name, href] of links) {
    const link = header.getByRole("link", { name });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", href);
  }
});

test("copy email puts the address on the clipboard and confirms", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(email);
});

test("lists Projects in order, each linking to its Project page", async ({ page }) => {
  const projects = page.getByRole("region", { name: "Selected work" }).getByRole("link");
  const expected = [
    ["Fisheries industry body platform", "/work/fisheries-industry-body-platform"],
    ["Corporate website", "/work/corporate-website"],
    ["Mine execution control system", "/work/mine-execution-control-system"],
    ["Council website", "/work/council-website"],
  ];
  await expect(projects).toHaveCount(expected.length);
  for (const [i, [title, href]] of expected.entries()) {
    await expect(projects.nth(i)).toContainText(title);
    await expect(projects.nth(i)).toHaveAttribute("href", href);
  }
});
