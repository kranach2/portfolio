# 03: Build, test and deploy on push to main

**What to build:** Every push to main builds the site (running content schema validation), runs the Playwright suite against the build, and deploys to the Azure Static Web App only when both pass. After this, each later ticket is live on merge. The site-URL config value is set to the URL from ticket 02. See the spec's Stack and hosting.

**Blocked by:** 01 (Work page from validated content, with the test harness), 02 (Provision Azure Static Web Apps)

**Status:** done

- [x] A GitHub Actions workflow triggered on push to main: install, build, Playwright, deploy
- [x] A failing build or test stops the workflow before deploy
- [x] Deploy uses the deployment token secret; no secret values in the repo
- [x] The site-URL config value is set to the provisioned URL
- [x] A push to main results in the Work page being live at the provisioned URL

## Comments

**2026-11-01:** Workflow at `.github/workflows/deploy.yml`. The push of f5dff92 deployed the Work page to https://calm-tree-04325ad00.1.azurestaticapps.net (run https://github.com/kranach2/portfolio/actions/runs/41299014865).
