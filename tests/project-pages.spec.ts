import { expect, test } from "@playwright/test";

// Every published Project, with its kind and full stack, from src/content/projects.
const projects = [
  {
    path: "/work/fisheries-industry-body-platform",
    title: "Fisheries industry body platform",
    kind: "Client work",
    stack: [
      "Power Pages", "Dataverse", "Azure Functions", "Logic Apps", "Dynamics 365", "Power Automate",
      "Azure AD B2C", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "C#", "JavaScript", "jQuery",
      "Bootstrap", "Moodle",
    ],
  },
  {
    path: "/work/corporate-website",
    title: "Corporate website",
    kind: "Client work",
    stack: ["Angular", "Kontent.ai", ".NET", "JavaScript", "CSS"],
  },
  {
    path: "/work/mine-execution-control-system",
    title: "Mine execution control system",
    kind: "Client work",
    stack: ["C#", "ASP.NET Core", "Vue.js", "xUnit", "Microservices"],
  },
  {
    path: "/work/council-website",
    title: "Council website",
    kind: "Client work",
    stack: ["Next.js", "Material UI", "Contentful", "AWS Cognito", "AWS Amplify"],
  },
];

for (const { path, title, kind, stack } of projects) {
  test(`${title} page shows its title, kind and full stack`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.getByText(kind, { exact: true })).toBeVisible();
    await expect(page.getByRole("list", { name: "Stack" }).getByRole("listitem")).toHaveText(stack);
  });

  // None of the Projects has a diagram yet.
  test(`${title} page has no diagram section`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: "Architecture" })).toHaveCount(0);
    await expect(page.getByRole("img")).toHaveCount(0);
  });

  test(`${title} page links back to the Work page`, async ({ page }) => {
    await page.goto(path);
    await page.getByRole("link", { name: "Back to all work" }).click();
    await expect(page).toHaveURL("/");
  });
}

test("a Project page's title and description come from the Project", async ({ page }) => {
  await page.goto("/work/corporate-website");
  await expect(page).toHaveTitle(/^Corporate website · /);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "The corporate website for a WA state tourism agency, with an Angular front end and a Kontent.ai headless CMS with .NET behind it.",
  );
});

test("the flagship page shows its phases and main deliverables as sections", async ({ page }) => {
  await page.goto("/work/fisheries-industry-body-platform");
  await expect(page.getByRole("heading", { level: 2, name: "Phases" })).toBeVisible();
  for (const phase of ["Initial MVP", "Phase 1:", "Phase 2:"]) {
    await expect(page.getByRole("listitem").filter({ hasText: phase })).toBeVisible();
  }
  await expect(page.getByRole("heading", { level: 2, name: "What I built" })).toBeVisible();
  for (const deliverable of [
    "Supplies ordering app",
    "Xero → Dataverse financial sync",
    "Moodle LMS on Azure",
    "Power Pages member portal",
  ]) {
    await expect(page.getByRole("heading", { level: 3, name: deliverable })).toBeVisible();
  }
});
