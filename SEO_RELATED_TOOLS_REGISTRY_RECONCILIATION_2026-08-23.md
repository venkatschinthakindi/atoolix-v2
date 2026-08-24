# Related Tools Registry Reconciliation — 2026-08-23

## Scope

Continue the Google-first internal-link audit after the generic `RelatedTools` fallback was changed to active-only defaults.

## Confirmed defect and intended scope

The active registry contained 8 stale `relatedTools` references to archived PDF-format routes:

- `pdf/merge-pdf`: 3 stale references removed — `image/jpg-to-pdf`, `image/png-to-pdf`, `image/webp-to-pdf`
- `pdf/split-pdf`: 2 stale references removed — `image/jpg-to-pdf`, `image/png-to-pdf`
- `image/image-to-pdf`: 3 stale references removed — `image/jpg-to-pdf`, `image/png-to-pdf`, `image/webp-to-pdf`

**Total: exactly 8 active relationship removals.**

The archived registry entries themselves remain `archived: true` and their relationship arrays are preserved. No archived page is restored.

## Documentation

The current branch-vs-`main` PR diff contains no `src/app/documentation/page.tsx` change, confirming there is no additional documentation-source modification required on this branch. The existing Documentation SEO Validation workflow has already verified that the public documentation source contains no `jpg-to-pdf`, `png-to-pdf`, or `webp-to-pdf` legacy URLs.

## Google guidance applied

Google's current guidance says to update internal links when URLs change so users and crawlers reach the preferred destination directly, and to avoid unnecessary redirects. Google also says substantially similar pages can be clustered and that the canonical page should represent the most complete/useful version.

Current official guidance checked 2026-08-24:

- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting

## Decision

**Do not restore the archived JPG/PNG/WebP PDF pages.**

The correct direction is to remove explicit active-registry references to those archived routes and keep `/tools/image/image-to-pdf` as the consolidated active destination.

For the active Image-to-PDF page itself, the dedicated curated cluster remains:

- Merge PDF
- Split PDF
- Compress PDF
- File Privacy & Security Checker

## Why no blanket registry rewrite

The registry is a large source file and the explicit relationship graph includes many legitimate contextual relationships. A blanket string replacement would risk changing valid historical compatibility references, loader mappings, or unrelated documentation semantics.

The cleanup was therefore limited to the confirmed 8 active relationships.

## Branch reconciliation status — 2026-08-24

The dedicated branch `seo/related-tools-registry-cleanup` was safely reconciled with the current `main` history without force-resetting or creating a duplicate branch.

Reconciliation merge commit:

`b1e3d1613d2d87ce6ba28e0f1c8fb8c1c0d9ae7b`

The branch is current with `main` and is not behind it.

## Source diff verification

The final `src/data/tools.ts` diff against `main` contains only the intended active relationship cleanup:

- `pdf/merge-pdf`: 3 removals
- `pdf/split-pdf`: 2 removals
- `image/image-to-pdf`: 3 removals
- **Total: 8 removals**
- **Archived JPG/PNG/WebP-to-PDF entries: 0 changes**

No unrelated application source change is present in `tools.ts`.

## Validation

- [x] Generic RelatedTools fallback is active-only by default.
- [x] Active Image-to-PDF curated cluster is clean.
- [x] Archived JPG/PNG/WebP PDF registry entries identified.
- [x] Branch reconciled with current `main` without force reset.
- [x] Exactly 8 stale active registry relationship references removed.
- [x] Zero archived registry relationship changes in the final `tools.ts` diff.
- [x] Current documentation source requires no additional change on this branch.
- [x] Documentation SEO Validation passed, including typecheck, lint, production build, legacy redirect validation, and consolidated-page validation.
- [x] Temporary one-time reconciliation workflows removed from the branch after validation.
- [ ] Final PR CI after cleanup commits.
- [ ] Merge PR only after final CI is green.
- [ ] Production rendered-link validation after deployment.
- [ ] Production redirect validation for all three legacy routes.
- [ ] Final MD synchronization after production validation.

## CI evidence

Documentation SEO Validation run #42 for the correction commit passed all validation stages, including typecheck, lint, production build, legacy redirect validation, and consolidated-page validation.

The earlier dedicated reconciliation workflow also successfully verified the 8-reference state and build before its generated commit encountered a push race. The branch was subsequently corrected so the final source diff preserves archived entries and contains only the intended 8 active removals.

## Next step

Run/inspect the final normal CI after the cleanup and temporary-workflow removal commits. If green, review the final PR diff and merge only the intended source/MD changes.

After merge:

**production rendered-link validation → verify the three legacy URLs redirect directly to `/tools/image/image-to-pdf` → final MD synchronization → next highest-value SEO opportunity.**

No new keyword-variant pages, no restoration of archived pages, and no unrelated SEO changes.
