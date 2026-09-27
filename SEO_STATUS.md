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

## 2026-09-27 — Priority-page audit pass

Audited the remaining GSC priority pages against the current branch implementation:

- **Calculator hub** — 1,584 impressions / position 11.70. Existing title, description, canonical, percentage/scientific/equation intent, dedicated finance-tool links, and substantial server-rendered SEO content are aligned with the observed broad calculator intent. **No additional code change justified from the supplied GSC data.**
- **FD Calculator** — 1,271 impressions / position 73.72; queries include `fd calculator` (114 / 72.35) and `fixed deposit calculator` (73 / 71.95). Existing metadata and page content explicitly cover FD maturity, interest, compounding, Indian FD use, formula, examples, and related savings tools. **No generic word-count expansion justified.**
- **Personal Loan EMI** — 359 impressions / position 87.36; `how to calculate personal loan emi` (63 / 88.68) and `calculate personal loan emi` (55 / 86.65). Existing SEO content already directly answers calculation, prepayment, amortization, and related loan intent. **No duplicate page or generic expansion justified.**
- **QR Code Generator** — 184 impressions / position 61.33. Existing registry intent covers both generation and scanning, with dedicated QR SEO content. **No GSC-supported defect identified in this pass.**
- **Image 100 KB / 50 KB / Signature** — 294 / 267 / 271 impressions respectively, with positions 72.22 / 72.93 / 66.69. Existing pages explicitly target fixed-size compression and signature-upload requirements. **Keep the cluster tightly differentiated; no doorway-page expansion.**

### Time Zone Converter metadata alignment
Commit: `a855344c7b42c6790e3b1597986a3309656d39d5`

The route-level title and registry page title were aligned around the observed `time zone converter` + time-difference comparison intent. Exact diff: **2 files only**, one line changed in each:
- `src/app/tools/[...toolId]/page.tsx`
- `src/data/tools.ts`

This is the only additional code change justified by the current supplied GSC evidence after the Date/Time hub correction.

## Current Google guidance check
Google's current Search Central documentation continues to emphasize descriptive title links/snippets and valid structured data, while the May/June 2026 documentation updates confirm that **FAQ rich results are no longer shown in Google Search**. Existing FAQ content may remain useful to users, but FAQ schema should not be treated as a ranking or rich-result lever. Google also recommends validating structured data and using URL Inspection after deployment. citeturn0search4turn0search0

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
3. update of this file with the actual commit/result,
4. manual deployment by the repo owner,
5. later GSC measurement before judging ranking impact.

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
| 2026-09-27 | `a855344` | Time Zone Converter metadata alignment from GSC query evidence | Done |
| 2026-09-27 | — | Full remaining priority-page audit: calculator, FD, personal EMI, QR, image-size cluster; no further code defect justified by supplied GSC evidence | Done |

## 2026-09-27 — Phase 1 execution: Calculator hub

The original execution plan requires addressing the GSC opportunity rather than stopping at an audit. The calculator hub has **1,584 impressions at average position 11.70 with 0 clicks**, making it the strongest near-page-1 opportunity in the supplied dataset. The existing page already covered percentage, scientific math, and equation intent, so the change focused on making those intents more explicit and easier for both users and search engines to understand without creating new keyword pages.

Commit: `cff284d` + `9e9c12f`

Changes:
- Expanded the calculator meta description to explicitly cover percentage calculations, increase/decrease, discount, scientific math, and supported equation solving.
- Added a dedicated server-rendered **Calculator Types: Percentage, Scientific Math & Equation Solving** section explaining the three primary calculation intents.
- Preserved the existing percentage guide, calculator workflow, financial-tool links, FAQ content, canonical, and route structure.
- No duplicate calculator URLs or keyword-stuffed content were introduced.

Exact phase diff from `cacd43d`:
- `src/app/tools/[...toolId]/page.tsx`: 1 addition / 1 deletion.
- `src/components/tools/calculator/calculatorSeoContent.tsx`: 31 additions.
- No other files changed in the phase implementation.

## 2026-09-27 — Phase 3 execution: FD Calculator

The FD page has **1,271 impressions at average position 73.72**. The strongest observed queries are **`fd calculator` (114 impressions / position 72.35)** and **`fixed deposit calculator` (73 / 71.95)**. The existing page already had substantial formula, example, compounding, Indian FD, comparison, and FAQ content, so this phase focused on making the core FD search intent more explicit rather than adding generic copy.

Commits: `fd618a7` + `4160228`

Changes:
- Strengthened the registry description to explicitly cover **FD calculator India**, maturity value, interest earned, returns, deposit amount, rate, tenure, and compounding frequency.
- Added a server-rendered **FD Calculator India: Estimate Maturity Value and Interest** section focused on the actual user tasks represented by the query cluster: comparing FD rates, checking maturity, and comparing tenure.
- Preserved the existing formula, worked example, FD-vs-RD comparison, FAQs, disclaimer, canonical, and calculator workflow.
- Did not create another fixed-deposit URL or expand keywords into unrelated savings queries.

Exact implementation diff from the previous Phase 1 head:
- `src/data/tools.ts`: 1 addition / 1 deletion.
- `src/components/tools/financeSuite/savings/fixedDepositCalculatorSeoContent.tsx`: 23 additions.
- No other implementation files changed.

## 2026-09-27 — Phase 4 execution: QR + PDF

The QR Code Generator has **184 impressions at average position 61.33** in the supplied GSC export. The existing QR page already has substantial generation, scanning, customization, export, privacy, and use-case content, so this phase focused on the metadata mismatch: the registry description was too generic compared with the actual supported search intent. The PDF pages already have substantial intent-specific SEO content, so their registry descriptions were strengthened to expose the existing merge, split, and compression workflows without creating new URLs or duplicating content.

Commit: `559e77f5119031e49839238d6b0c41ad5d0e6cd6`

Changes in `src/data/tools.ts`:
- QR Code Generator metadata now explicitly describes generation + scanning, common QR types, camera/image scanning, customization, and PNG/SVG/PDF export.
- Merge PDF metadata now exposes page selection/ranges and supported text/PDF overlay workflows already present on the page.
- Split PDF metadata now exposes individual pages, ranges, first/last, odd/even, and supported exclusion patterns already present on the page.
- Compress PDF metadata now states the core file-size reduction use cases and browser workflow without promising lossless results.

Exact phase implementation diff from Phase 3 head `f14da47b82311f888018df8d9043c99863ad442f`:
- `src/data/tools.ts`: 6 additions / 6 deletions.
- No other implementation files changed.

The existing PDF SEO components already cover the deeper feature details, including page-range selection, odd/even and first/last selection for split/merge, merge overlays, compression guidance, privacy notes, FAQs, and related-tool links. No duplicate PDF pages, artificial FAQ markup, or generic content expansion was added.

## Next action

**Phase 5 — Image compression target-size cluster.** Use the supplied GSC evidence for 50 KB and 100 KB pages (and the signature-upload page) to make a concrete, differentiated improvement while keeping the target-size pages tightly related and avoiding doorway-page expansion. Manual deployment remains with the repo owner.
