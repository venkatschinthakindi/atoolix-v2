# SEO Route & Sitemap Reconciliation — 2026-08-23

## Scope

Completed the planned site-wide SEO integrity pass and reconciled the route/registry/canonical/sitemap/indexability model against the latest `main` state.

## Latest source of truth

- Current `main`: `8a2f85d716ce619f7874f2f5e21d82a043792e90`.
- Active tool registry: `src/data/tools.ts`.
- Tool canonical URLs are defined through `alternates.canonical`.
- Tool metadata/indexability is generated through `src/utility/metadata.ts`.
- XML sitemap generation is in `src/app/sitemap.ts`.

## Repository findings

- `src/app/sitemap.ts` consumes registry canonical URLs directly.
- Sitemap generation includes only current, indexable tools: `!tool.comingSoon && !tool.archived`.
- Archived tools remain reachable for intentional legacy compatibility, but are excluded from the XML sitemap and are now explicitly `noindex` through the shared metadata path.
- Coming-soon tools remain excluded from the XML sitemap and are not indexable.
- Sitemap generation validates that tool canonical URLs are valid absolute URLs on the configured site origin.
- Duplicate tool canonical URLs fail sitemap generation instead of silently producing ambiguous sitemap signals.
- Static sitemap routes are explicitly defined and deduplicated with registry URLs.
- The active SIP route remains `/tools/calculator/sip-calculator` and the active Retirement route remains `/tools/calculator/retirement-calculator`.
- The retired ROI URL remains a migration/compatibility reference and is not treated as a current standalone product destination.

## Important synchronization correction

The earlier version of this document incorrectly stated that archived tools remained eligible for the XML sitemap. That statement is now corrected.

Current policy is:

**archived = noindex + excluded from sitemap**

This is implemented consistently in both:

- `src/utility/metadata.ts`: `robots.index = !tool.comingSoon && !tool.archived`
- `src/app/sitemap.ts`: `.filter((tool) => !tool.comingSoon && !tool.archived)`

Code fix commit:

`ff5824301dae38a09376e8ba595545eb7753320e` — `fix: align archived tool robots with sitemap policy`

## Google guidance applied

Google Search Central's current canonicalization guidance says Google considers redirects, sitemap presence, and `rel="canonical"` together, and that canonical declarations are hints rather than rules. Google also recommends making clustered pages sufficiently different and checking Google's selected canonical with URL Inspection when validating production changes.

Official current guidance checked on 2026-08-23:

- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

## Validation

- [x] Registry remains the canonical source for tool URLs.
- [x] Sitemap uses registry canonical values directly.
- [x] Sitemap canonical URLs are validated as absolute URLs on the configured site origin.
- [x] Duplicate tool canonical URLs fail sitemap generation.
- [x] `comingSoon` tools are excluded from the sitemap.
- [x] Archived tools are excluded from the sitemap.
- [x] Archived tools are explicitly `noindex` through metadata.
- [x] Legacy redirects are not converted into sitemap URLs.
- [x] No new keyword page created.
- [x] No URL migration performed.
- [x] No canonical tag changed during this reconciliation.
- [x] No legacy redirect removed.
- [ ] Production HTML validation after deployment.
- [ ] Google URL Inspection / selected-canonical validation after deployment.
- [ ] Search Console re-crawl/indexation measurement after sufficient processing time.

## Next work

Continue the remaining repository-level SEO checks before deployment. Do not reopen completed page audits unless new evidence identifies a defect. After deployment, validate representative active and archived URLs in production and then resume Search Console measurement after Google has had time to recrawl and reevaluate.
