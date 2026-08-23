# Live Sitemap & Representative SEO Validation — 2026-08-24

## Scope

Reconcile the user-supplied live production sitemap against the current repository route/registry model and validate representative production SEO evidence where the public web/search layer exposes rendered content.

## Live sitemap count correction

The XML supplied from `https://atoolix.com/sitemap.xml` contains **54 `<url>` entries**, not 56.

- 16 static routes are present, matching `src/app/sitemap.ts`.
- 38 tool canonical URLs are present.
- Total: **54 URLs**.

`src/app/sitemap.ts` constructs the sitemap from the 16 static routes plus current tool registry canonical URLs, filtering out `comingSoon` and `archived` tools and rejecting invalid-origin or duplicate canonical URLs. This is the repository source of truth. 

## Live sitemap reconciliation

Confirmed from the supplied production XML:

- Correct production origin: `https://atoolix.com`.
- All expected static routes from `src/app/sitemap.ts` are present.
- Active Image-to-PDF URL is present: `/tools/image/image-to-pdf`.
- Legacy JPG/PNG/WebP-to-PDF URLs are absent from the sitemap.
- Active calculator routes, PDF routes, image routes, QR route, privacy/security route, and date/time routes shown in the supplied XML align with the current active route model.
- Target-size image compression routes (20KB/50KB/100KB) are present.

The live sitemap therefore does **not** show a sitemap-level defect or a regression in the Image-to-PDF consolidation.

## Representative metadata source validation

The current `main` metadata implementation generates:

- canonical from `tool.alternates.canonical`;
- `index,follow` for non-archived, non-coming-soon tools;
- Open Graph title/description/url/image;
- Twitter summary-large-image metadata;
- explicit special metadata for 20KB, 50KB and 100KB image compression pages.

The target-size pages have unique titles:

- Compress Image to 20 KB Online Free | JPG, PNG & WebP | Atoolix
- Compress Image to 50 KB Online Free | JPG, PNG & WebP | Atoolix
- Compress Image to 100 KB Online Free | JPG, PNG & WebP | Atoolix

## Public production evidence

Publicly crawlable/search-rendered Atoolix evidence confirms:

- File Analyzer has a descriptive primary heading and substantial people-first content covering metadata, privacy, security, quality checks, use cases, how-to guidance, best practices and FAQs.
- The Tools and Image category pages expose the active Image-to-PDF destination and the 20KB/50KB/100KB target-size tools.
- Documentation is publicly discoverable and contains the Image-to-PDF topic.

The current web retrieval layer does not expose raw origin HTML for every requested individual tool URL, so exact live `<link rel=canonical>`, `<meta name=robots>`, OG tags, and redirect status codes are **not marked as directly verified** for every representative URL.

## Important production observation

The public/search-rendered Documentation snapshot still contains legacy JPG-to-PDF, PNG-to-PDF and WebP-to-PDF sections/related labels. The current repository `src/app/documentation/page.tsx` was independently verified to contain no legacy PDF hrefs; therefore this observation is not a confirmed current-source defect and must not trigger another source edit without new origin/deployment evidence.

## Google SEO principles applied

- Keep the sitemap limited to preferred, indexable canonical URLs.
- Keep migrated/duplicate URLs out of the sitemap when a preferred replacement exists.
- Keep internal links pointing directly to preferred active URLs rather than unnecessary redirect targets.
- Avoid creating near-duplicate keyword pages solely for search traffic; the 20KB/50KB/100KB pages should remain only while their intent and content are genuinely useful and differentiated.
- Validate actual rendered production output before changing source code.

## Status

- [x] Live sitemap received and parsed.
- [x] Live sitemap count reconciled: 54, not 56.
- [x] Static sitemap routes reconciled against source generator.
- [x] Image-to-PDF preferred URL present.
- [x] Legacy PDF variants absent from sitemap.
- [x] Target-size compression URLs present.
- [x] Repository metadata rules checked for canonical/robots/OG generation.
- [x] Public representative content checked where available.
- [ ] Raw live HTML canonical/title/H1/robots/OG for every requested representative URL.
- [ ] Exact live redirect status chains for all legacy URLs.
- [ ] Google URL Inspection / selected canonical.

## Decision

**No source code change is justified by this validation pass.** The sitemap architecture is consistent with the repository model and the preferred Image-to-PDF consolidation. Continue with representative production HTML validation when a direct origin/HTML retrieval path is available.

## Next action

Validate the representative tool pages in a browser/origin-capable path for exact canonical, title, H1, robots and OG values, then check the legacy redirect chains. If a concrete mismatch is found, fix only that mismatch, run CI, and synchronize the result before proceeding.
