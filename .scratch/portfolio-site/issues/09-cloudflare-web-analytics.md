# 09: Cloudflare Web Analytics

**What to build:** Production builds include the cookie-free Cloudflare Web Analytics beacon on every page, so Kishor can see visits and which Projects are opened. The beacon token is a config value Kishor supplies; with no token, or in development, the beacon is omitted. See the spec's SEO, sharing and analytics.

**Blocked by:** 03 (Build, test and deploy on push to main)

**Status:** ready-for-agent

- [ ] Beacon included on every page only in production builds with a token configured
- [ ] No cookies set and no cookie banner
- [ ] Kishor adds the site in Cloudflare Web Analytics and supplies the token (human step, noted in a comment on this ticket)
- [ ] Tests: the built site without a token contains no beacon; with a token configured, every page includes it
