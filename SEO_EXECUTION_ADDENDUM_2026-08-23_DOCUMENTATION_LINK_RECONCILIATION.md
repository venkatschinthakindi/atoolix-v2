# SEO Execution Addendum — Documentation Link Reconciliation — 2026-08-23

## Objective
Continue the Google-first SEO plan without reopening completed work or creating artificial keyword pages. The strategic target is top-5 visibility through useful, differentiated pages, strong technical signals, and legitimate authority.

## Google guidance applied
Google's current canonicalization guidance says substantially similar URLs are clustered and Google selects the URL it considers most complete and useful. Redirects, canonical annotations, sitemap inclusion, and internal links are signals used in that process.

Google's current site-move guidance explicitly recommends updating internal links from old URLs to the final URLs and avoiding redirect chains. Permanent redirects should point directly to the final destination.

Sources checked on 2026-08-23:
- Google Search Central — URL Canonicalization: https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Google Search Central — Site Moves and Migrations: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- Google Search Central — Fix Canonicalization Issues: https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting

## Confirmed repository finding
The public documentation source contains a PDF-tools section that still treats the legacy format-specific PDF routes as standalone related destinations:
- `/tools/image/jpg-to-pdf`
- `/tools/image/png-to-pdf`
- `/tools/image/webp-to-pdf`

The same documentation section also links the active Image-to-PDF page to those legacy routes.

This is inconsistent with the already-approved consolidation decision:
- `/tools/image/jpg-to-pdf` → `/tools/image/image-to-pdf`
- `/tools/image/png-to-pdf` → `/tools/image/image-to-pdf`
- `/tools/image/webp-to-pdf` → `/tools/image/image-to-pdf`

The legacy routes are retained only for migration/compatibility and must not be promoted as separate active SEO destinations.

## Decision
The documentation should be reconciled to the active Image-to-PDF destination. The legacy entries should not be resurrected, indexed, or treated as separate products.

Preferred public documentation architecture:
- Keep one active `Image to PDF` documentation entry.
- Describe supported JPG/JPEG/PNG/WebP inputs within that active entry where useful.
- Link directly to `/tools/image/image-to-pdf`.
- Do not create separate documentation landing sections solely for JPG-to-PDF, PNG-to-PDF, or WebP-to-PDF keyword variants.

## Source-change status
No source-code rewrite was committed in this execution because the available GitHub write interface requires replacing a complete file and the current documentation file is large. A partial or reconstructed replacement would risk deleting unrelated documentation and would violate the no-speculation/no-regression rule.

This is an intentional hold, not a completed source fix.

## Required next source action
Use a safe full-file update mechanism to:
1. remove the three legacy PDF-format documentation items;
2. remove their legacy URLs from `Image to PDF` related links;
3. retain accurate supported-format information under the active Image-to-PDF entry;
4. search the repository again for active internal links to the three legacy routes;
5. preserve migration redirects;
6. run the production build/typecheck;
7. validate the final rendered documentation links and redirects;
8. update the central SEO execution MD with the exact source commit.

## Do not do
- Do not delete the legacy redirect routes.
- Do not change the active Image-to-PDF canonical.
- Do not create JPG/PNG/WebP keyword-variant pages.
- Do not mass-rewrite unrelated documentation.
- Do not claim the source cleanup is complete until the source commit and build validation exist.

## Current SEO state
The previously completed JPG-to-PDF consolidation remains valid. This addendum only records the remaining documentation/internal-link reconciliation needed to make the consolidation consistent across public navigation.

## Next planned phase after this reconciliation
Once the source cleanup is safely committed and the build remains green, proceed to measured production performance/Core Web Vitals and rendered-HTML validation. Do not make speculative performance changes.
