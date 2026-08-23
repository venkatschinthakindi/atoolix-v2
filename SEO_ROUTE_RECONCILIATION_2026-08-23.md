# SEO Route & Sitemap Reconciliation — 2026-08-23

## Scope

Completed the next planned site-wide SEO integrity pass after the legacy ROI identity cleanup.

## Repository findings

- `src/data/tools.ts` remains the active tool registry and defines each tool's canonical URL through `alternates.canonical`.
- `src/app/sitemap.ts` now consumes the registry's canonical URLs directly instead of resolving them through `getTool()`.
- Sitemap generation continues to exclude only `comingSoon` tools; archived tools remain eligible because they are still potentially valid, reactivatable routes.
- Sitemap generation now fails the build if a tool canonical is invalid, uses a different origin from the configured site URL, or is duplicated.
- Static sitemap routes remain explicitly defined and deduplicated with registry URLs.
- Repository-wide searches confirmed the retired ROI URL is not used as a current internal destination; its remaining references are intentional migration/compatibility references.
- The active SIP route remains `/tools/calculator/sip-calculator` and the active Retirement route remains `/tools/calculator/retirement-calculator`.

## Google guidance applied

Google Search Central recommends:

- Include preferred canonical URLs in the sitemap.
- Link internally to canonical URLs rather than duplicate/alternate URLs.
- Keep canonical signals consistent across sitemap, redirects, and `rel="canonical"`.
- Use permanent redirects when deprecating duplicate/moved URLs.
- Use absolute URLs in XML sitemaps.

Official guidance checked on 2026-08-23:

- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable

## Validation

- [x] Registry remains the canonical source for tool URLs.
- [x] Sitemap uses registry canonical values directly.
- [x] Sitemap canonical URLs are validated as absolute URLs on the configured site origin.
- [x] Duplicate tool canonical URLs fail sitemap generation instead of silently producing ambiguous sitemap signals.
- [x] `comingSoon` tools remain excluded.
- [x] Legacy redirects are not converted into sitemap URLs.
- [x] No new keyword page created.
- [x] No URL migration performed.
- [x] No canonical tag changed.
- [x] No legacy redirect removed.

## Commit

`e517f34793d744192e3d55a7e5b0c1f1b5b26f9d` — `seo: harden sitemap canonical integrity`
