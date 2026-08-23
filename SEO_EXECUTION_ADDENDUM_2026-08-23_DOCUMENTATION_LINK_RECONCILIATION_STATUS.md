# SEO Execution Addendum — Documentation Link Reconciliation Status — 2026-08-23

## Google-first decision
Google Search Central's current site-move guidance recommends updating internal links to the final URLs and avoiding redirect chains. Google's canonicalization guidance also says substantially similar URLs should be consolidated around the most complete and useful canonical destination.

## Confirmed production/source issue
The Documentation page still exposes these legacy internal destinations:
- `/tools/image/jpg-to-pdf`
- `/tools/image/png-to-pdf`
- `/tools/image/webp-to-pdf`

Those routes have already been consolidated to `/tools/image/image-to-pdf`.

The current source confirms the Documentation page contains the active Image to PDF entry plus separate legacy JPG/PNG/WebP PDF entries and related links to those legacy routes.

## Correct target
Keep one active documentation entry:
- Image to PDF → `/tools/image/image-to-pdf`

Remove the standalone legacy documentation entries and replace their relationships with relevant active destinations. Preserve the 301 redirects for old URLs so external users and historical links continue to resolve.

## Safe-execution status
The exact current `page.tsx` blob was retrieved successfully, but the available repository write path requires replacing the complete file. A patch-only operation is not available through the current connector. No large file was reconstructed from truncated output and no unsafe source overwrite was performed.

GitHub issue #7 records the exact source change and validation requirements:
`SEO: replace legacy JPG/PNG/WebP-to-PDF internal links in Documentation`

## Validation required after source change
1. Repository-wide search for all active internal links to the three legacy routes.
2. Production build/typecheck.
3. Verify legacy URLs remain direct permanent redirects to `/tools/image/image-to-pdf`.
4. Verify active Image-to-PDF canonical remains self-referencing.
5. Verify legacy URLs are absent from active sitemap/internal navigation.
6. Validate production rendered HTML after deployment.

## SEO objective
Consolidate duplicate/near-duplicate intent into the strongest useful page rather than increasing indexed-page count. The strategic goal remains top-5 visibility through useful differentiated pages, strong technical signals, and legitimate authority—not artificial keyword variants.

## Next phase
After this safe source change is applied, continue to production HTML and Core Web Vitals/performance measurement. Do not claim production performance results without measurements.
