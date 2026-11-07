# 09: Cloudflare Web Analytics

**What to build:** Production builds include the cookie-free Cloudflare Web Analytics beacon on every page, so Kishor can see visits and which Projects are opened. The beacon token is a config value Kishor supplies; with no token, or in development, the beacon is omitted. See the spec's SEO, sharing and analytics.

**Blocked by:** 03 (Build, test and deploy on push to main)

**Status:** ready-for-human

- [ ] Beacon included on every page only in production builds with a token configured
- [ ] No cookies set and no cookie banner
- [ ] Kishor adds the site in Cloudflare Web Analytics and supplies the token (human step, noted in a comment on this ticket)
- [ ] Tests: the built site without a token contains no beacon; with a token configured, every page includes it

## Comments

**2026-11-07:** Built and tested; the beacon ships once Kishor supplies the token. Human step for Kishor:

1. In the Cloudflare dashboard, open Analytics & Logs → Web Analytics → Add a site, enter `calm-tree-04325ad00.1.azurestaticapps.net`, and choose the JavaScript snippet (the site isn't proxied through Cloudflare, so there's no automatic setup).
2. Copy the `token` value from the snippet's `data-cf-beacon` attribute.
3. In the GitHub repo, open Settings → Secrets and variables → Actions → Variables, and add a repository variable `CLOUDFLARE_ANALYTICS_TOKEN` with that value. It's a variable, not a secret: the token is public in every page.
4. Push to main (or re-run the latest workflow). The deploy step rebuilds with the token after the tests pass.

Until the variable is set, production builds have no beacon, as intended.
