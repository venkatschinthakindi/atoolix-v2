# Atoolix SEO Audit — Legacy ROI Search Console Opportunity — 2026-08-23

## Scope
Audit the historical Search Console visibility attributed to `/tools/calculator/roi-calculator` and determine whether the legacy URL should be restored, redirected, or used to strengthen the active investment-calculator architecture.

## Evidence
- The latest SEO roadmap records approximately 58 impressions for `/tools/calculator/roi-calculator` in the 2026-07-15 to 2026-08-23 Search Console export.
- The repository's established architecture treats `/tools/calculator/roi-calculator` as a legacy migration URL, not as the active public ROI product.
- The active investment route is `/tools/calculator/sip-calculator`.
- The SEO status explicitly records that the observed ROI impressions belong to a legacy redirect and must not trigger recreation of a standalone ROI page.
- Repository search confirms the legacy ROI path is intentionally represented in URL-alias/redirect/structured-data compatibility logic rather than as a new standalone SEO destination.

## Google guidance applied
Google's current canonicalization documentation (updated August 2026) explains that canonicalization is a process of selecting the representative URL from a duplicate/variant set and that canonical signals are hints rather than absolute directives. Consistent redirects, canonical URLs, sitemap entries and internal links are important signals.

Google's current site-migration guidance also recommends updating internal links to the preferred destination while retaining redirects for migrated URLs long enough for signals to transfer.

Sources checked on 2026-08-23:
- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

## Decision
**Do not recreate `/tools/calculator/roi-calculator` as an indexable standalone ROI page.**

The historical impressions are evidence that Google has associated ROI-related searches with the legacy URL, but they are not sufficient evidence that a second ROI page should exist. Creating a keyword-variant page would weaken the established canonical architecture and could create unnecessary overlap with the active investment-calculator cluster.

No source-code change is justified in this execution.

## Required preservation
- Preserve the existing legacy redirect behavior.
- Keep the active SIP URL as `/tools/calculator/sip-calculator`.
- Do not add `/tools/calculator/roi-calculator` to the sitemap as an indexable destination.
- Do not add new internal links pointing to the legacy ROI URL.
- Preserve the structured-data compatibility normalization that maps the historical ROI URL to the active SIP URL where applicable.
- Revisit only if a fresh Search Console export shows a distinct, valuable ROI intent that is not satisfied by an existing active calculator and there is a genuine product/page purpose for it.

## Validation
- [x] No new URL created.
- [x] No canonical change.
- [x] No sitemap change.
- [x] No redirect change.
- [x] No keyword-variant/doorway page created.
- [x] Active SIP destination remains the established investment route.
- [x] Decision recorded so this historical Search Console opportunity is not repeatedly reopened.
- [ ] Live redirect verification remains part of the normal production validation workstream.
- [ ] Fresh Search Console query-level data remains pending before any future ROI-specific decision.

## Outcome
**Audited and closed as a non-actionable legacy opportunity.**

Next work should continue with a genuinely active page/query opportunity or a concrete site-wide SEO defect, not restoration of the legacy ROI URL.
