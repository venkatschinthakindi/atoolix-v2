# Related Tools Registry Reconciliation — 2026-08-23

## Scope

Continue the Google-first internal-link audit after the generic `RelatedTools` fallback was changed to active-only defaults.

## New evidence

The latest `main` registry still contains explicit `relatedTools` references to archived PDF-format routes:

- `image/jpg-to-pdf`
- `image/png-to-pdf`
- `image/webp-to-pdf`

Confirmed in `src/data/tools.ts` for active entries including the PDF/Image-to-PDF cluster. The archived registry entries themselves remain `archived: true`.

## Production evidence

The previously recorded production evidence identified legacy PDF-format links in the public documentation surface. The cleanup target remains limited to confirmed legacy destinations; no archived pages will be restored.

## Google guidance applied

Google's current guidance says to update internal links when URLs change so users and crawlers reach the preferred destination directly, and to avoid unnecessary redirects. Google also says substantially similar pages can be clustered and that the canonical page should represent the most complete/useful version.

Current official guidance checked 2026-08-24:

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

The cleanup remains targeted to the confirmed active relationships and public documentation surface.

## Branch reconciliation status — 2026-08-24

The dedicated branch `seo/related-tools-registry-cleanup` has now been safely reconciled with the current `main` history without force-resetting or creating a duplicate branch.

Reconciliation merge commit:

`b1e3d1613d2d87ce6ba28e0f1c8fb8c1c0d9ae7b`

The branch is now based on the current `main` and is no longer behind it.

## Current validation

- [x] Generic RelatedTools fallback is active-only by default.
- [x] Active Image-to-PDF curated cluster is clean.
- [x] Archived JPG/PNG/WebP PDF registry entries identified.
- [x] Active registry relationships pointing to those archived IDs identified.
- [x] Branch reconciled with current `main` without force reset.
- [ ] Remove the 8 confirmed stale active registry relationship references.
- [ ] Confirm/update public documentation legacy links based on the current source state.
- [ ] Build/type/lint validation after source cleanup.
- [ ] Production crawlable-link validation after deployment.
- [ ] Production redirect validation.
- [ ] Google URL Inspection / selected-canonical validation.

## CI status

The branch now has a push-trigger-capable one-time reconciliation workflow, but the available GitHub Actions connector has not exposed an actual workflow run for the current branch head. Therefore CI is **not** marked passed or failed.

No source cleanup is being represented as complete until the controlled source change is actually present and validated.

## Next step

Obtain/execute the actual one-time reconciliation workflow on `seo/related-tools-registry-cleanup`, then inspect the resulting source/MD diff. Only the confirmed 8 stale active registry references may be removed; public documentation may be changed only where the current source contains confirmed legacy URLs.

After a real green validation:

**CI → inspect exact source/MD diff → merge only if green → production rendered-link validation → verify the three legacy URLs redirect directly to `/tools/image/image-to-pdf` → final MD synchronization → next highest-value SEO opportunity.**

No new keyword-variant pages, no restoration of archived pages, and no unrelated SEO changes.


## Archive-preservation correction — 2026-08-24

The reconciliation branch was corrected after review found that the prior generated source commit also modified the three archived JPG/PNG/WebP-to-PDF registry relationship arrays. Those archived entries are restored to their prior relationships. The intended cleanup remains limited to exactly 8 stale references in the three active tools: 3 in `pdf/merge-pdf`, 2 in `pdf/split-pdf`, and 3 in `image/image-to-pdf`. No archived page is restored.
