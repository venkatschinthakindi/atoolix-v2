# SEO Status — GSC-Driven Investigation (2026-09-27)

## Why this file exists
Prior SEO work in this repo produced many separate `SEO_*.md` files, mostly
repeated audit/documentation churn rather than product changes. This file is
the single running status for GSC-driven SEO work and is updated in place.

## Current data source
Google Search Console "Performance on Search" export supplied in this
investigation, covering **2026-05-08 through 2026-09-23**.

## Current diagnosis
The supplied GSC data shows that Atoolix is indexed and receiving Search
impressions, but most useful queries are ranking too low to generate clicks.
The current export shows approximately **7,197 impressions and 2 clicks** in
the daily chart, with September through Sep 23 producing about 3,930
impressions and 0 clicks.

Highest-impression opportunities in the supplied page report include:
- `/tools/calculator` — **1,584 impressions, position 11.70**
- `/tools/datetime/timezone-converter` — **1,353 impressions, position 64.34**
- `/tools/calculator/fd-calculator` — **1,271 impressions, position 73.72**
- `/tools/calculator/personal-loan-emi-calculator` — **359 impressions, position 87.36**
- `/datetime` — **317 impressions, position 75.76**
- `/tools/image/compress-image-to-100kb` — **294 impressions, position 72.22**
- `/tools/image/resize-signature-for-upload` — **271 impressions, position 66.69**
- `/tools/image/compress-image-to-50kb` — **267 impressions, position 72.93**
- `/tools/qrcode/qr-code-generator` — **184 impressions, position 61.33**

Important query evidence:
- `time zone converter` — 126 impressions, position 63.71
- `fd calculator` — 114 impressions, position 72.35
- `fixed deposit calculator` — 73 impressions, position 71.95
- `how to calculate personal loan emi` — 63 impressions, position 88.68
- `calculate personal loan emi` — 55 impressions, position 86.65
- `date and time simulation` — 84 impressions, position 66.32
- `date and time simulation testing` — 53 impressions, position 84.09

The query distribution is heavily concentrated in positions 50–100. This is
a ranking/authority/relevance problem rather than an indexing failure.

## What has already been addressed on `main`
The latest `main` baseline is commit `92353041fe412c5a1ad343b856a7889f2490d7b5`
(`pushed some phase 1 changes seo`). The SEO work must use that baseline rather
than the earlier chat-generated patch or unrelated feature branches.

The earlier chat-generated `atoolix-seo-phase1.patch` is **not** the source of
truth and must not be blindly applied over current Git state.

## GSC-driven priorities
1. **Calculator hub** — strongest near-page-1 opportunity at position 11.70.
2. **Time Zone Converter** — largest combination of impressions and weak
   ranking; existing product functionality supports the demonstrated intent.
3. **FD Calculator** — high impressions but weak ranking; existing page is
   already substantial, so improvements should be differentiation and intent,
   not generic word-count expansion.
4. **Personal Loan EMI** — strong explanatory-query evidence but position
   86–89; improve intent satisfaction without creating duplicate finance pages.
5. **QR/PDF** — several queries already show page-one evidence; prioritize CTR,
   internal authority and preservation of the strongest existing intent.
6. **Image-size cluster** — 20/50/100 KB queries should remain tightly related
   to the actual target-size workflow rather than become a large set of
   near-duplicate doorway pages.

## Current implementation in this SEO branch
Branch: `seo/gsc-driven-sep2026`

Base: `main` at `92353041fe412c5a1ad343b856a7889f2490d7b5`.

### 2026-09-27 — Date/Time hub intent correction
Commit: `da40a65e65dbd3aa819d44fe5e9887b2e4fbc932`

Changed only `src/app/datetime/page.tsx`.

Reason: `/datetime` has 317 impressions at position 75.76, while the GSC export
also shows unrelated `date and time simulation` queries. The hub's previous
metadata used the broad phrase `Date, Time & Time Zone Tools`, which did not
clearly prioritize the two actual products in the category.

The hub is now explicitly centered on:
- Time Zone Converter
- Time Zone Difference / comparison intent
- Meeting Time Finder
- international scheduling
- date/time utilities as supporting functionality

No new URLs, breadcrumbs, schema, or doorway pages were introduced.
Existing tool pages and canonical URLs remain unchanged.

## SEO principles for the remaining work
- Use GSC query/page evidence to decide what changes.
- Improve existing pages before creating new pages.
- Do not keyword-stuff or manufacture near-duplicate pages.
- Do not add duplicate breadcrumbs or duplicate schema already present.
- Do not treat word count as a ranking target.
- Preserve useful existing content when it already satisfies intent.
- Separate CTR/snippet problems from ranking/authority problems.
- Treat backlinks and genuine external references as an authority workstream;
  code changes cannot manufacture that signal.
- Do not promise or imply guaranteed top-five rankings.

## Validation gate
Each code change should be followed by:
1. exact diff verification,
2. TypeScript/lint/build validation where available,
3. CI validation,
4. update of this file with the actual commit/result,
5. deployment and later GSC measurement before judging ranking impact.

## Historical status log
| Date | Commit | What | Status |
|---|---|---|---|
| 2026-08-29 | `e87bc38` | GSC investigation + verification of priority pages | Done |
| 2026-08-29 | `c2e29e1` | Sitemap `lastModified` change | Done |
| 2026-08-29 | `886f2e6` | SEO status/commit cadence synchronization | Done |
| 2026-08-29 | `8dfedac` | Home-loan EMI thin-content correction | Done |
| 2026-08-30 | `5241d91` | PageSpeed/AdSense performance work + `llms.txt` | Done |
| 2026-09-24 | `9235304` | Latest `main` SEO phase baseline | Done |
| 2026-09-27 | `da40a65` | GSC-driven Date/Time hub intent correction on `seo/gsc-driven-sep2026` | Done |

## 2026-09-27 — Phase 5 execution: Image compression target-size cluster

GSC evidence for the cluster shows **294 impressions / position 72.22** for the 100 KB page, **267 / 72.93** for the 50 KB page, and **271 / 66.69** for the signature-upload page. The existing target-size pages already had dedicated 20/50/100 KB workflows, so this phase did not create more target-size URLs or add generic compression copy.

Implementation branch: `seo/gsc-driven-sep2026-phase5`, based directly on latest `main` commit `b4b2e28e7a602d0a3407e56d5491bd784f99e920`.

Commits: `df13a82` + `df380dd`

Changes:
- Added a server-rendered **Choose the Right Signature File-Size Target** section to the signature-upload page, linking the existing 20 KB, 50 KB, and 100 KB workflows.
- Explicitly distinguished the general target-size compressor pages from the signature page's additional exact-dimension, cropping, and aspect-ratio requirements.
- Expanded the signature registry's `relatedTools` links to include the existing 50 KB and 100 KB target pages, strengthening internal topical connections without creating new URLs.

Exact diff verification against latest `main`: **2 files only** — `src/components/tools/image/signatureResizer/signatureResizerSeoContent.tsx` (44 additions) and `src/data/tools.ts` (1 addition / 1 deletion). No other files changed in the implementation phase.

Validation/deployment gate remains unchanged: run TypeScript/lint/build on the branch, manually deploy, then measure the affected GSC query/page cluster before judging impact.

## Next action
Continue from the latest GSC evidence on this branch. The next page-level
change should be selected from the high-impression/low-position opportunities,
with the exact query cluster documented before changing code. After the next
change, validate and synchronize this file again.
