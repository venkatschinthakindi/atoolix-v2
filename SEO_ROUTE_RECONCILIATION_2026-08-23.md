# SEO Route & Sitemap Reconciliation — 2026-08-23

## Scope

Completed the planned site-wide SEO integrity pass and continued reconciliation of the route/registry/canonical/sitemap/indexability model against the latest `main` state.

## Latest source of truth

- Current source branch: `main`.
- Latest synchronized SEO state includes JPG/JPEG-to-PDF consolidation.
- Active tool registry: `src/data/tools.ts`.
- Tool canonical URLs are defined through `alternates.canonical`.
- Tool metadata/indexability is generated through `src/utility/metadata.ts`.
- XML sitemap generation is in `src/app/sitemap.ts`.
- Legacy redirects are defined in `next.config.ts`.

## Repository findings

- `src/app/sitemap.ts` consumes registry canonical URLs directly.
- Sitemap generation includes only current, indexable tools: `!tool.comingSoon && !tool.archived`.
- Archived tools remain reachable only where intentional compatibility behavior requires them, but are excluded from the XML sitemap and are explicitly `noindex` through the shared metadata path unless a stronger redirect handles the legacy URL.
- Coming-soon tools remain excluded from the XML sitemap and are not indexable.
- Sitemap generation validates that tool canonical URLs are valid absolute URLs on the configured site origin.
- Duplicate tool canonical URLs fail sitemap generation instead of silently producing ambiguous sitemap signals.
- Static sitemap routes are explicitly defined and deduplicated with registry URLs.
- The active SIP route remains `/tools/calculator/sip-calculator` and the active Retirement route remains `/tools/calculator/retirement-calculator`.
- The retired ROI URL remains a migration/compatibility reference and is not treated as a current standalone product destination.
- Legacy JPG/JPEG-to-PDF URLs now redirect permanently to the active `/tools/image/image-to-pdf` destination.

## Important synchronization correction

The earlier version of this document incorrectly stated that archived tools remained eligible for the XML sitemap. That statement is corrected.

Current policy is:

**archived = noindex + excluded from sitemap**

For legacy URLs with an established active replacement, a permanent redirect is preferred over maintaining a separate duplicate/near-duplicate landing page.

This is implemented consistently in:

- `src/utility/metadata.ts`: `robots.index = !tool.comingSoon && !tool.archived`
- `src/app/sitemap.ts`: `.filter((tool) => !tool.comingSoon && !tool.archived)`
- `next.config.ts`: legacy JPG/JPEG-to-PDF URLs permanently redirect to `/tools/image/image-to-pdf`

Code fix commit:

`ff5824301dae38a09376e8ba595545eb7753320e` — `fix: align archived tool robots with sitemap policy`

JPG/JPEG consolidation commit:

`680f9f4275010884d1333f07eaab916e26097706` — `seo: consolidate legacy JPG-to-PDF URLs to active image-to-PDF`

## Google guidance applied

Google Search Central's current canonicalization guidance says Google considers redirects, sitemap presence, and `rel="canonical"` together, and that canonical declarations are hints rather than rules. Google also recommends making clustered pages sufficiently different and checking Google's selected canonical with URL Inspection when validating production changes.

The JPG-to-PDF route was audited and found to share the same underlying image-to-PDF capability and substantially overlapping primary content with the active Image-to-PDF page. It therefore does not meet the evidence threshold for a separate indexed keyword-variant page.

Official current guidance checked on 2026-08-23:

- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

## JPG → PDF decision

**Do not recover `/tools/image/jpg-to-pdf` as an indexed page.**

The active `/tools/image/image-to-pdf` page already supports JPG and JPEG input and is the stronger representative destination. The legacy route now redirects permanently to it.

Dedicated audit:

`SEO_JPG_TO_PDF_AUDIT_2026-08-23.md`

## Internal-link note

The active Image-to-PDF related-tools configuration still contains hardcoded references to archived JPG/PNG/WEBP variants. Those links should be removed or replaced with useful active destinations in the next internal-link reconciliation pass so active pages point directly at preferred destinations rather than redirect-only/archived URLs.

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
- [x] JPG/JPEG legacy URLs consolidated to the active Image-to-PDF destination.
- [ ] Active Image-to-PDF related-tool links cleaned of archived/redirect-only variants.
- [ ] Production HTML validation after deployment.
- [ ] Production redirect validation after deployment.
- [ ] Google URL Inspection / selected-canonical validation after deployment.
- [ ] Search Console re-crawl/indexation measurement after sufficient processing time.

## Next work

Continue the remaining repository-level SEO checks before deployment. First clean active Image-to-PDF internal links, then continue the broader Search Console + site-wide technical reconciliation. Do not reopen completed page audits unless new evidence identifies a defect. After deployment, validate representative active and archived/redirected URLs in production and then resume Search Console measurement after Google has had time to recrawl and reevaluate.
