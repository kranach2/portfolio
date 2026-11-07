import { defineConfig, devices } from "@playwright/test";

// Tests drive the production build (run `npm test`, which builds first)
// served by Astro's preview server.
const port = 4321;
const beaconPort = 4322;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      // --ignore-lock keeps the server in the foreground (Astro backgrounds it
      // when it detects an agent), so Playwright owns its lifecycle.
      command: `astro preview --port ${port} --ignore-lock`,
      url: `http://localhost:${port}`,
      reuseExistingServer: !process.env.CI,
    },
    {
      // The same site built with a test analytics token (`npm run
      // build:beacon-fixture`), for the analytics tests only.
      command: `astro preview --outDir dist-beacon --port ${beaconPort} --ignore-lock`,
      url: `http://localhost:${beaconPort}`,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
