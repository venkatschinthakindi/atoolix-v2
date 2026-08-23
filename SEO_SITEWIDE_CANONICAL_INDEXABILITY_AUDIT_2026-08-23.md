# Atoolix Site-Wide Canonical / Indexability Audit — 2026-08-23

## Scope
Continued from the latest `main` and the existing SEO execution roadmap. Current Google Search Central guidance is the governing standard.

## Concrete defect found
The XML sitemap intentionally excludes archived tools:

- `src/app/sitemap.ts` filters with `!tool.comingSoon && !tool.archived` before adding tool canonical URLs.
- Archived tools therefore are not submitted in the XML sitemap.

However, `src/utility/metadata.ts` previously calculated indexability as:

`!tool.comingSoon`

This meant an archived tool with `comingSoon: false` could still emit `robots: index`, creating an inconsistent state: the page could remain indexable while the sitemap deliberately excluded it.

## Fix implemented
Changed the metadata indexability rule to:

`!tool.comingSoon && !tool.archived`

and documented the reason in source code.

This makes archived-tool robots/indexability behavior consistent with the established sitemap policy.

## Google guidance applied
Google's current canonicalization guidance says canonicalization is a collection of signals and that Google can select a different canonical based on technical signals and content usefulness. Consistent canonical, sitemap, redirects and internal-link signals are therefore important.

Google's current canonicalization troubleshooting guidance also recommends resolving technical canonicalization issues and ensuring that pages in duplicate clusters are sufficiently differentiated.

This fix is not intended to improve rankings through a single signal. It removes a concrete contradiction between indexability and sitemap policy and reduces the chance that archived URLs remain eligible for indexing.

## Files inspected
- `src/app/sitemap.ts`
- `src/utility/metadata.ts`
- `src/config/shared.ts`
- `src/config/server.ts`
- `src/app/robots.ts`
- `src/utility/getTool.ts`
- `src/data/tools.ts`
- `SEO_EXECUTION_STATUS_2026-08-23.md`

## Validation state
- [x] Latest `main` inspected before change.
- [x] Sitemap archived-tool exclusion verified.
- [x] Metadata indexability mismatch identified.
- [x] Fix committed to `main`.
- [ ] Production deployment validation pending.
- [ ] Live HTML/robots meta validation pending.
- [ ] Sitemap production validation pending.
- [ ] Google URL Inspection/indexation validation pending.

## Commit
`ff5824301dae38a09376e8ba595545eb7753320e`

## Decision
Keep the fix. Do not create new URLs or alter canonical routes as part of this finding. Continue the site-wide reconciliation using the same evidence-first process.
