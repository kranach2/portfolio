import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/info");
});

test("shows the intro, then Experience, Education, Certifications and Skills", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "Experience",
    "Education",
    "Certifications",
    "Skills",
  ]);
  const intro = page.getByText("Software Engineer with 5+ years of experience", { exact: false });
  await expect(intro).toBeVisible();
  const introBox = await intro.boundingBox();
  const experienceBox = await page.getByRole("heading", { level: 2, name: "Experience" }).boundingBox();
  expect(introBox!.y).toBeLessThan(experienceBox!.y);
});

test("the nav marks Info as the current page", async ({ page }) => {
  await expect(page.getByRole("link", { name: "Info" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("link", { name: "Work" })).not.toHaveAttribute("aria-current");
});

test("shows both software Roles with title, employer and dates", async ({ page }) => {
  const roles = [
    ["Technical Consultant", "Diversus", "Mar 2023 – Present"],
    ["Software Engineer", "Insig Technologies", "Oct 2021 – Feb 2023"],
  ];
  const experience = page.getByRole("region", { name: "Experience" });
  await expect(experience.getByRole("heading", { level: 3 })).toHaveText(roles.map(([title]) => title));
  for (const [title, employer, dates] of roles) {
    const role = experience.getByRole("article", { name: title });
    await expect(role.getByText(employer, { exact: false })).toBeVisible();
    await expect(role.getByText(dates)).toBeVisible();
    await expect(role.getByRole("list", { name: "What I did" }).getByRole("listitem").first()).toBeVisible();
  }
});

test("condenses the Earlier roles into a single line", async ({ page }) => {
  const experience = page.getByRole("region", { name: "Experience" });
  const line = experience.getByRole("paragraph").filter({ hasText: "Earlier roles" });
  await expect(line).toHaveCount(1);
  for (const part of [
    "IT support and operations",
    "VenuesWest (2017)",
    "a private employer (Oct 2020 – Mar 2021)",
    "Insig Technologies (Apr 2021 – Oct 2021)",
  ]) {
    await expect(line).toContainText(part);
  }
  await expect(experience.getByRole("listitem").filter({ hasText: "VenuesWest" })).toHaveCount(0);
});

test("lists Education with institution and years", async ({ page }) => {
  const education = page.getByRole("region", { name: "Education" }).getByRole("listitem");
  const expected = [
    ["Bachelor of Information Technology", "Edith Cowan University", "2013–2016"],
    ["Professional Year Program", "National Institute of Technology", "2016–2017"],
  ];
  await expect(education).toHaveCount(expected.length);
  for (const [i, parts] of expected.entries()) {
    for (const part of parts) await expect(education.nth(i)).toContainText(part);
  }
});

test("groups Certifications by issuer, Featured certifications first and labelled", async ({ page }) => {
  const certifications = page.getByRole("region", { name: "Certifications" });
  await expect(certifications.getByRole("heading", { level: 3 })).toHaveText(["Microsoft", "AWS", "CompTIA"]);

  const microsoft = certifications.getByRole("list", { name: "Microsoft" }).getByRole("listitem");
  const featured = [
    "Dynamics 365 + Power Platform Solution Architect Expert",
    "Azure Developer Associate",
    "Azure Administrator Associate",
    "Azure AI Engineer Associate",
  ];
  const count = await microsoft.count();
  expect(count).toBeGreaterThan(featured.length);
  const firstFour = await Promise.all(featured.map((_, i) => microsoft.nth(i).innerText()));
  for (const name of featured) expect(firstFour.some((text) => text.includes(name))).toBe(true);
  for (let i = 0; i < count; i++) {
    const label = microsoft.nth(i).getByText("Featured", { exact: true });
    await expect(label).toHaveCount(i < featured.length ? 1 : 0);
  }

  const aws = certifications.getByRole("list", { name: "AWS" }).getByRole("listitem");
  await expect(aws).toHaveText([/AWS Certified Cloud Practitioner.*2024/]);
  const comptia = certifications.getByRole("list", { name: "CompTIA" }).getByRole("listitem");
  await expect(comptia.filter({ hasText: "Security+" })).toHaveCount(1);
  for (const item of await comptia.all()) await expect(item).toContainText("Valid to Jan 2027");
});

test("a Certification without a verify URL is plain text, not a link", async ({ page }) => {
  // No Certification has a verify URL yet.
  await expect(page.getByRole("region", { name: "Certifications" }).getByRole("link")).toHaveCount(0);
});

test("groups Skills into the résumé's categories as plain lists", async ({ page }) => {
  const skills = page.getByRole("region", { name: "Skills" });
  const categories = [
    "Languages",
    "Frameworks & Libraries",
    "Cloud",
    "DevOps",
    "Data",
    "Microsoft Business Apps",
    "Identity & Security",
    "Practices",
  ];
  await expect(skills.getByRole("heading", { level: 3 })).toHaveText(categories);
  for (const category of categories) {
    await expect(skills.getByRole("list", { name: category }).getByRole("listitem").first()).toBeVisible();
  }
  // The staff profile's items that the spec adds, and items that contain commas.
  for (const [category, item] of [
    ["Frameworks & Libraries", "Angular"],
    ["Frameworks & Libraries", "Material UI"],
    ["Frameworks & Libraries", "Bootstrap"],
    ["Frameworks & Libraries", "jQuery"],
    ["Practices", "GraphQL"],
    ["Data", "Kontent.ai"],
    ["Data", "Contentful"],
    ["Cloud", "AWS (Amplify, Cognito)"],
    ["Microsoft Business Apps", "Power Platform (Power Pages, Power Apps, Power Automate)"],
    ["DevOps", "Bitbucket"],
    ["Practices", "Jira"],
  ]) {
    await expect(skills.getByRole("list", { name: category }).getByRole("listitem").filter({ hasText: item })).toHaveCount(1);
  }
  await expect(skills.getByRole("progressbar")).toHaveCount(0);
  await expect(skills.getByRole("meter")).toHaveCount(0);
});

test("has its own title and description", async ({ page }) => {
  await expect(page).toHaveTitle("Info · Kishor Rana Chhetri");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Kishor Rana Chhetri's experience, education, certifications and skills: Software Engineer in Perth, WA.",
  );
});
