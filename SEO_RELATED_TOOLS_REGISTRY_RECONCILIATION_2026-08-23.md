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

The final branch diff contains no `src/app/documentation/page.tsx` change. Documentation SEO Validation verified that the public documentation source contains no `jpg-to-pdf`, `png-to-pdf`, or `webp-to-pdf` legacy URLs.

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

## Final source / merge status — 2026-08-24

PR #12 was reviewed and merged as commit `a49b9b8c0b3c1ada544601efa6b795397ef272c4`.

The final `src/data/tools.ts` diff contained only the intended active relationship cleanup:

- `pdf/merge-pdf`: 3 removals
- `pdf/split-pdf`: 2 removals
- `image/image-to-pdf`: 3 removals
- **Total: 8 removals**
- **Archived JPG/PNG/WebP-to-PDF entries: 0 changes**

No unrelated application source change was present in `tools.ts`.

## Validation

- [x] Exactly 8 stale active registry relationship references removed.
- [x] Zero archived registry relationship changes in final `tools.ts` diff.
- [x] Documentation source contains no legacy JPG/PNG/WebP-to-PDF URLs.
- [x] Temporary one-time reconciliation workflows removed.
- [x] Final Documentation SEO Validation passed.
- [x] Typecheck, lint, and production build passed.
- [x] PR #12 merged only after final intended source/MD diff review.
- [x] Production `/tools/pdf/merge-pdf` returned HTTP 200.
- [x] Production `/tools/pdf/split-pdf` returned HTTP 200.
- [x] Production `/tools/image/image-to-pdf` returned HTTP 200.
- [x] Production `/tools/image/jpg-to-pdf` directly redirects to `/tools/image/image-to-pdf`.
- [x] Production `/tools/image/png-to-pdf` directly redirects to `/tools/image/image-to-pdf`.
- [x] Production `/tools/image/webp-to-pdf` directly redirects to `/tools/image/image-to-pdf`.

## Production evidence

Production validation completed 2026-08-24. The three active consolidated pages returned HTTP 200, and all three legacy JPG/PNG/WebP PDF-format URLs redirected directly to `/tools/image/image-to-pdf` without an intermediate redirect.

## Closure

**Related Tools Registry Cleanup — CLOSED.**

The implementation, source diff, CI, merge, production active-page validation, and legacy redirect validation are complete. No archived page was restored and no keyword-variant pages were introduced.

## Next step

Inspect the existing SEO execution roadmap and select the highest-value unresolved SEO opportunity using current Google guidance and evidence. The top-5 organic ranking objective remains the optimization target, not a guaranteed ranking outcome.

Process for the next item:

**Google guidance → SERP/competitor evidence where useful → source audit → identify actual defect/opportunity → minimal justified change → CI → production validation → MD synchronization.**
