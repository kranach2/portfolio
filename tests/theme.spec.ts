import { expect, test, type Page } from "@playwright/test";
import { everyPage } from "./pages";

const lightBackground = "rgb(246, 243, 238)";
const darkBackground = "rgb(22, 20, 18)";

async function expectTheme(page: Page, theme: "dark" | "light") {
  const html = page.locator("html");
  if (theme === "dark") await expect(html).toHaveClass(/\bdark\b/);
  else await expect(html).not.toHaveClass(/\bdark\b/);
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    theme === "dark" ? darkBackground : lightBackground,
  );
}

const toggle = (page: Page) => page.getByRole("button", { name: "Dark theme" });

for (const colorScheme of ["dark", "light"] as const) {
  test.describe(`first visit with a ${colorScheme} system setting`, () => {
    test.use({ colorScheme });

    test(`a first-time Visitor sees the ${colorScheme} theme`, async ({ page }) => {
      await page.goto("/");
      await expectTheme(page, colorScheme);
    });
  });
}

test.describe("toggling with a light system setting", () => {
  test.use({ colorScheme: "light" });

  test("toggling switches the theme, its pressed state and the stored choice", async ({ page }) => {
    await page.goto("/");
    await expect(toggle(page)).toHaveAttribute("aria-pressed", "false");

    await toggle(page).click();
    await expectTheme(page, "dark");
    await expect(toggle(page)).toHaveAttribute("aria-pressed", "true");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await toggle(page).click();
    await expectTheme(page, "light");
    await expect(toggle(page)).toHaveAttribute("aria-pressed", "false");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
  });
});

test.describe("a stored choice with a dark system setting", () => {
  test.use({ colorScheme: "dark" });

  test("a stored light choice wins after a reload and on another page", async ({ page }) => {
    await page.goto("/");
    await expect(toggle(page)).toHaveAttribute("aria-pressed", "true");
    await toggle(page).click();
    await expectTheme(page, "light");

    await page.reload();
    await expectTheme(page, "light");
    await expect(toggle(page)).toHaveAttribute("aria-pressed", "false");

    await page.getByRole("navigation").getByRole("link", { name: "Info" }).click();
    await expect(page).toHaveURL("/info");
    await expectTheme(page, "light");
    await expect(toggle(page)).toHaveAttribute("aria-pressed", "false");
  });
});

test.describe("blocked storage with a dark system setting", () => {
  test.use({ colorScheme: "dark" });

  test("the page renders the system theme and the toggle still works", async ({ page }) => {
    const errors: Error[] = [];
    page.on("pageerror", (e) => errors.push(e));
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new DOMException("Storage is blocked", "SecurityError");
        },
      });
    });

    await page.goto("/");
    await expectTheme(page, "dark");
    await toggle(page).click();
    await expectTheme(page, "light");
    expect(errors).toEqual([]);
  });
});

test.describe("dark stored with a light system setting", () => {
  test.use({ colorScheme: "light" });

  for (const path of everyPage) {
    test(`the stored theme is applied when the body appears on ${path}`, async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem("theme", "dark");
        // Record the theme at the moment <body> appears, before anything can paint.
        new MutationObserver((_, observer) => {
          if (!document.body) return;
          (window as any).darkAtBody = document.documentElement.classList.contains("dark");
          observer.disconnect();
        }).observe(document, { childList: true, subtree: true });
      });

      await page.goto(path);
      expect(await page.evaluate(() => (window as any).darkAtBody)).toBe(true);
    });
  }
});
