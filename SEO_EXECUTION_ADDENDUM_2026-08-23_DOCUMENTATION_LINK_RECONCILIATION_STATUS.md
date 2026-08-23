# SEO Execution Addendum — Documentation Link Reconciliation Status — 2026-08-23

## Google-first decision
Google Search Central's current canonicalization guidance (updated 2026-08-20) says substantially similar pages can be clustered and Google selects the most representative, complete, and useful canonical. Google also recommends updating internal links to the final URL after consolidation and keeping appropriate permanent redirects for legacy URLs.

Google's current site-move guidance (updated 2026-08-20) specifically recommends updating internal links, using direct server-side permanent redirects where possible, avoiding redirect chains, and keeping redirects in place for at least one year. These recommendations govern this reconciliation.

## Current confirmed state
The Documentation source on `seo/documentation-link-reconciliation` still contains these legacy internal destinations:
- `/tools/image/jpg-to-pdf`
- `/tools/image/png-to-pdf`
- `/tools/image/webp-to-pdf`

The preferred consolidated destination is:
- `/tools/image/image-to-pdf`

The three legacy strings are present in `src/app/documentation/page.tsx`. Repository search also finds historical references in SEO audit/reconciliation Markdown files; those documentation references are not active navigation and must not be removed merely because they contain the historical URLs.

## Required source change
Keep the single active Documentation entry:
- Image to PDF → `/tools/image/image-to-pdf`

Remove the standalone JPG to PDF, PNG to PDF, and WebP to PDF Documentation entries.

Replace the Image to PDF related links with relevant active PDF destinations, consistent with the already-established active cluster:
- `/tools/pdf/merge-pdf`
- `/tools/pdf/split-pdf`
- `/tools/pdf/compress-pdf`

Do not remove the legacy route redirects. They are required compatibility/migration signals and should continue pointing directly to `/tools/image/image-to-pdf`.

## Execution status
The dedicated working branch remains `seo/documentation-link-reconciliation` and is intentionally retained until this task is actually completed and validated.

A temporary GitHub Actions reconciliation mechanism was tested previously and removed without changing the source file. No false completion commit was retained.

The GitHub connector can retrieve the source file and its current blob SHA (`1b986831b1eaf0067a0df0ebb43eb0fb837538f2`), but the direct file-update operation requires the complete replacement text. The current retrieval response is truncated for this large 1,320-line source file. No partial or reconstructed source has been blindly overwritten.

## Validation required after source change
1. Repository-wide search for all active internal links to the three legacy routes.
2. Distinguish legitimate redirect/configuration references and historical MD references from active navigation.
3. Production build/typecheck/lint as applicable.
4. Verify legacy URLs remain direct permanent redirects to `/tools/image/image-to-pdf`.
5. Verify the Image-to-PDF page has the intended self-referencing canonical.
6. Verify legacy URLs are absent from active sitemap and active internal navigation.
7. Validate production rendered HTML after deployment.
8. Measure Core Web Vitals/performance; do not claim performance results without measurements.

## SEO objective
Consolidate duplicate/near-duplicate intent into the strongest useful page rather than increasing indexed-page count. The strategic goal remains top-5 visibility through genuinely useful, differentiated pages, strong technical signals, people-first content, and legitimate authority—not artificial keyword variants or ranking guarantees.

## Current Google canonicalization checkpoint
Google's canonicalization troubleshooting guidance (updated 2026-08-21) says clustered pages should be sufficiently different and that after fixing content/technical issues Google may take time to re-evaluate a cluster. Once the source change is live, the most important preferred URL should be monitored in Search Console and re-indexing requested only where appropriate.

## 2026-08-23 execution checkpoint
- Revalidated Google's canonicalization guidance: canonicalization is a selection process and redirects, sitemap inclusion, and `rel="canonical"` are signals rather than absolute rules.
- Revalidated Google's site-move guidance: internal links should be updated to the final URL, redirects should point directly to the final destination, and old redirects should be retained for an appropriate migration period.
- Re-read the current Documentation source on the dedicated branch and confirmed the three legacy entries are still present; no source completion claim has been made.
- Re-synchronized this MD rather than creating a false source-completion commit.
- The working branch is intentionally retained until the source change and validation gates pass.
- Do not delete the working branch yet.

## Next phase
Complete the actual Documentation source reconciliation first. After successful build and production validation, continue to measured production HTML and Core Web Vitals/performance work, followed by Search Console measurement.
