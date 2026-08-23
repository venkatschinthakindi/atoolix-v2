# SEO Execution Addendum — Documentation Link Reconciliation Status — 2026-08-23

## Google-first decision
Google Search Central's current guidance says substantially similar pages can be clustered and Google selects the most representative, complete, and useful canonical. Google also recommends updating internal links to the final URL after consolidation and keeping appropriate permanent redirects for legacy URLs.

## Current confirmed state
The Documentation source still contains these legacy internal destinations:
- `/tools/image/jpg-to-pdf`
- `/tools/image/png-to-pdf`
- `/tools/image/webp-to-pdf`

The preferred consolidated destination is:
- `/tools/image/image-to-pdf`

Repository-wide searches confirm that the legacy strings remain in `src/app/documentation/page.tsx`; they also appear in SEO audit/reconciliation documentation, which is historical documentation rather than active navigation.

## Required source change
Keep the single active Documentation entry:
- Image to PDF → `/tools/image/image-to-pdf`

Remove the standalone JPG to PDF, PNG to PDF, and WebP to PDF Documentation entries. Replace the Image to PDF related links with relevant active PDF destinations. Do not remove the legacy route redirects.

## Execution status
A temporary GitHub Actions reconciliation mechanism was tested but was removed without changing the source file. The latest `main` commit is therefore a cleanup commit, not a false completion of the SEO source task.

The current GitHub connector can retrieve the complete source blob but its direct file-update operation requires the complete replacement text. No truncated source has been blindly reconstructed or overwritten.

## Validation required after source change
1. Repository-wide search for all active internal links to the three legacy routes.
2. Production build/typecheck.
3. Verify legacy URLs remain direct permanent redirects to `/tools/image/image-to-pdf`.
4. Verify the Image-to-PDF page has the intended self-referencing canonical.
5. Verify legacy URLs are absent from active sitemap and internal navigation.
6. Validate production rendered HTML after deployment.
7. Measure Core Web Vitals/performance; do not claim performance results without measurements.

## SEO objective
Consolidate duplicate/near-duplicate intent into the strongest useful page rather than increasing indexed-page count. The strategic goal remains top-5 visibility through genuinely useful, differentiated pages, strong technical signals, people-first content, and legitimate authority—not artificial keyword variants or ranking guarantees.

## Next phase
Complete the actual Documentation source reconciliation first. After successful build and production validation, continue to measured production HTML and Core Web Vitals/performance work, followed by Search Console measurement.
