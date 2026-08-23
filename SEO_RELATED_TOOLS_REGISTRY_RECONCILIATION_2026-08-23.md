# Related Tools Registry Reconciliation — 2026-08-23

## Scope

Continue the Google-first internal-link audit after the generic `RelatedTools` fallback was changed to active-only defaults.

## New evidence

The latest `main` registry still contains explicit `relatedTools` references to archived PDF-format routes:

- `image/jpg-to-pdf`
- `image/png-to-pdf`
- `image/webp-to-pdf`

Confirmed in `src/data/tools.ts` for active entries including the PDF/Image-to-PDF cluster. The archived registry entries themselves remain `archived: true`.

Searches for these IDs also confirm they remain present in the registry and loader/documentation-related source. This means the explicit registry graph is not yet fully reconciled even though the curated `RelatedTools` UI cluster for the active Image-to-PDF page has already been cleaned.

## Production evidence

The live Atoolix documentation page currently exposes these legacy PDF-format links in its public documentation content:

- Image to PDF → related `jpg to pdf`, `png to pdf`, `webp to pdf`
- JPG to PDF
- PNG to PDF
- WebP to PDF

This is important because the public documentation is a crawlable internal-link surface. It should not continue to promote consolidated/redirect-only URLs after those routes have been intentionally consolidated.

## Google guidance applied

Google's current guidance says to update internal links when URLs change so users and crawlers reach the preferred destination directly, and to avoid unnecessary redirects. Google also says substantially similar pages can be clustered and that the canonical page should represent the most complete/useful version.

Current official guidance checked 2026-08-23:

- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting

## Decision

**Do not restore the archived JPG/PNG/WebP PDF pages.**

The correct direction is to remove or replace explicit internal references to those routes with the active `/tools/image/image-to-pdf` destination or other directly relevant active PDF workflows.

For the active Image-to-PDF page itself, the dedicated curated cluster is already correct and must remain:

- Merge PDF
- Split PDF
- Compress PDF
- File Privacy & Security Checker

## Why no blanket registry rewrite

The registry is a large source file and the explicit relationship graph includes many legitimate contextual relationships. A blanket string replacement would risk changing valid historical compatibility references, loader mappings, or unrelated documentation semantics.

The next source edit should therefore be a targeted reconciliation of the active registry relationships and public documentation links, followed by build validation.

## Current validation

- [x] Generic RelatedTools fallback is active-only by default.
- [x] Active Image-to-PDF curated cluster is clean.
- [x] Archived JPG/PNG/WebP PDF registry entries identified.
- [x] Active registry relationships pointing to those archived IDs identified.
- [x] Live documentation page verified to expose legacy PDF-format links.
- [ ] Replace active internal links to archived PDF-format routes.
- [ ] Remove legacy PDF-format entries from public documentation where they are no longer standalone active products.
- [ ] Build/type/lint validation.
- [ ] Production crawlable-link validation after deployment.
- [ ] Production redirect validation.
- [ ] Google URL Inspection / selected-canonical validation.

## Next step

Perform the targeted registry/documentation cleanup. Keep the active Image-to-PDF page as the consolidated destination for JPG/JPEG/PNG/WebP-to-PDF intent. Do not create new keyword-variant pages.

This audit supersedes the earlier statement that the full explicit `relatedTools` graph was merely pending without a known defect: a concrete legacy-link defect is now confirmed in the public documentation surface.
