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


## 2026-09-27 — Phase 7 execution: SIP / CAGR / XIRR investment-return intent

The supplied GSC evidence for the investment-return cluster includes **`sip roi calculator` (2 impressions / position 65)**, **`how to calculate sip cagr` (2 / 89)**, **`xirr calculator for sip` (1 / 56)**, **`calculate xirr for lumpsum` (1 / 63)**, **`cagr calculator sip` (1 / 73)**, and **`sip cagr return calculator` (1 / 78)**. These are small-volume signals, but they consistently connect SIP with CAGR/XIRR calculation intent.

The existing SIP page already has substantial SIP education, formula, step-up, returns, maturity, limitations, and SIP-vs-lumpsum content. The justified improvement was therefore contextual rather than a new keyword page: make the distinction between SIP future-value estimation, CAGR annualized growth, and XIRR date-based cash-flow returns explicit, with direct links to the existing CAGR and XIRR calculators.

Implementation branch: `seo/gsc-driven-sep2026-phase7-investment-calculator-cluster`, based directly on latest `main` commit `970c12bf243dd31ac04a48e6d2b9bca3d7ed69b4`.

Commit: `8cba6f2`

Changes:
- Added a server-rendered **SIP, CAGR, and XIRR: Which Return Calculation Fits?** section to the existing SIP SEO content.
- Explicitly distinguishes recurring-contribution SIP projections, CAGR between beginning/ending values, and XIRR for multiple or irregular dated cash flows.
- Added direct internal links to the existing CAGR and XIRR calculator routes.
- Preserved the existing SIP canonical, URL, calculator behavior, and existing related-tool architecture.
- No new finance URLs, ROI migration, duplicate pages, or keyword-stuffed content were introduced.

Exact diff verification against latest `main`: **1 implementation file only** — `src/components/tools/financeSuite/investment/sipReturnCalculatorSeoContent.tsx` (**60 additions / 0 deletions**).

The change follows Google's current people-first guidance: it adds a useful distinction for users who arrive through overlapping investment-return queries rather than creating near-duplicate pages or search-engine-only content. citeturn0search0turn0search5
## 2026-09-27 — Phase 6 execution: Personal Loan EMI calculation intent

GSC evidence for the Personal Loan EMI page is **359 impressions / average position 87.36**. The identified query cluster includes **“how to calculate personal loan emi”** and **“calculate EMI for personal loan”**. The page already had the correct canonical URL, dedicated H1, formula/methodology, worked example, FAQ, amortization, and prepayment functionality, so this phase targets the specific calculation-intent wording rather than adding a new URL or broad keyword copy.

Implementation branch: `seo/gsc-driven-sep2026-phase6-personal-loan-emi`, based directly on latest `main` commit `970c12bf243dd31ac04a48e6d2b9bca3d7ed69b4`.

Commit: `5de9ed5`

Changes:
- Added a concise server-rendered **How to Calculate Personal Loan EMI** section near the top of the existing SEO content.
- Directly explains the three inputs, monthly-rate conversion, tenure conversion, formula, and a worked ₹5,00,000 / 14% / 4-year example.
- Reuses the existing calculator and methodology rather than introducing duplicate content, new URLs, or a competing canonical.

Exact diff verification against latest `main`: **1 product file only** — `src/components/tools/emiCalculator/personalLoanEmiCalculatorSeoContent.tsx` (+29 lines). No registry, route, metadata, canonical, or URL changes were made.

Validation/deployment gate: run TypeScript/lint/build on the branch, manually deploy, then monitor the Personal Loan EMI query/page cluster in GSC before making another change.


## 2026-09-27 — Phase 8 execution: Time Zone Converter

GSC evidence for `/tools/datetime/timezone-converter`: **1,353 impressions / average position 64.34**. The query `time zone converter` generated **126 impressions / position 63.71**. The existing page already had substantial people-first content covering multi-zone conversion, date-aware offsets, daylight saving time, time differences, IST conversion examples, popular conversions, FAQ content, sharing, and the Meeting Time Finder relationship.

The remaining justified gap was not another large content section. The page's metadata description did not explicitly use the core **time zone converter** intent phrase, and the FAQ did not directly answer the closely related **time zone difference calculator** intent even though the page already provides that functionality.

Implementation branch: `seo/gsc-driven-sep2026-phase8-timezone-converter`, based on latest `main` commit `ba5c524c073a5bad08ac5ce217ead2a15c1ddd71`.

Changes:
- Updated the Time Zone Converter metadata description to explicitly describe it as a **free online time zone converter** while retaining the existing date/city/country, UTC-offset, day-change, and DST coverage.
- Added one focused FAQ explaining that the tool can also be used as a **time zone difference calculator**, with date-aware DST handling.
- Preserved the existing title, canonical URL, page structure, calculator behavior, schema, popular conversion content, and Meeting Time Finder linking.
- No new URL, duplicate page, route migration, or keyword-stuffed section was introduced.

Exact product changes: **2 existing SEO files only**:
- `src/utility/metadata.ts`
- `src/components/tools/dateTime/timezone-converter/timezoneConverterSeoContent.tsx`

No application logic was changed.


## 2026-09-27 — Phase 9 execution: Meeting Time Finder intent clarification

The earlier supplied Search Console data for `/tools/datetime/meeting-time-finder` showed **54 impressions, 1 click, and average position 53.65**. Related query evidence included **`meeting time` (position 70)** and **`time for meeting` (position 78)**. The page already has strong meeting-scheduling functionality and substantial people-first content, so the justified change was a single focused intent clarification rather than a larger rewrite.

Implementation branch: `seo/gsc-driven-sep2026-phase9-meeting-time-finder`, based directly on latest `main` commit `ea8279828e7c6f77b143bc7eafb82f87fe703428`.

Commit: `9ff6fa9bc68002d955fc35565024aea2547d8b5c`

Changes:
- Added one server-rendered FAQ answering **how to find a good time for a meeting across time zones**.
- The answer explains the actual workflow: participant locations, local working hours, meeting duration, upcoming dates, overlapping availability, and date-specific daylight-saving changes.
- Preserved the existing title, description, canonical URL, detailed scheduling content, existing FAQ set, breadcrumb schema, related-tool link, and calculator behavior.
- No new meeting-time URLs, doorway pages, keyword stuffing, or duplicate content were introduced.

Exact implementation diff: **1 existing SEO file only** — `src/components/tools/dateTime/meeting-time-finder/meetingTimeFinderSeoContent.tsx` (**1 addition / 0 deletions**).

Validation/deployment gate remains unchanged: run TypeScript/lint/build on the branch, manually deploy, then monitor the Meeting Time Finder query/page cluster in GSC before judging ranking impact.

## 2026-09-27 — Phase 10 execution: Calculator CTR/snippet alignment

The calculator hub remains the strongest near-page-1 opportunity in the supplied GSC export: **1,584 impressions, average position 11.70, and 0 clicks**. Phase 1 already improved the description and server-rendered intent coverage. Because the page is already averaging around page-one/page-two boundary visibility while receiving no clicks, the next justified change is a **single title/snippet alignment test**, not another content expansion.

Implementation branch: `seo/gsc-driven-sep2026-phase10-calculator-ctr`, based directly on latest `main` commit `c6485d81693353fb754e7a99f59f0e3a99d9c12b`.

Commit: `613f014af2e665d92a3b5a2963312382956b8bd8`

Change:
- Updated the calculator hub title from **“Online Calculator – Percentage, Scientific & Equation Solver | Atoolix”** to **“Free Online Calculator – Percentage, Scientific & Equation Solver | Atoolix”**.
- The existing description already begins with “Use a free online calculator”, so this change keeps title and description aligned around the same demonstrated calculator intent.
- Preserved the route, canonical behavior, calculator functionality, existing SEO section, FAQ content, schema, and internal-link structure.
- No new URL, duplicate page, keyword-stuffed content, or ranking claim was introduced.

Exact implementation diff: **1 existing file only** — `src/app/tools/[...toolId]/page.tsx` (**1 addition / 1 deletion**).

This should be evaluated primarily as a **CTR/snippet experiment** after deployment. Position and CTR should be compared against the same calculator page/query cluster in GSC over a meaningful observation window; it should not be treated as evidence that a title change guarantees a ranking increase.

## 2026-09-27 — Phase 11 execution: Time Zone Calculator intent clarification

The supplied GSC export contains another direct query signal for the existing Time Zone Converter: **`time zone calculator` — 80 impressions, average position 62.06**. Phase 8 already addressed the broader converter and time-difference intent, and the current page already has a substantial **Time Zone Difference Calculator** section. The remaining narrow wording gap was that the page did not directly answer the closely related **time zone calculator** query.

Implementation branch: `seo/gsc-driven-sep2026-phase11-timezone-calculator-intent`, based directly on latest `main` commit `1b0e58143d45953867ff6ffd186116f439768843`.

Commit: `7252f211067eab7592ed97f62073fd469bdd6bbd`

Change:
- Added one server-rendered FAQ answering **“Can I use this as a time zone calculator?”**
- The answer describes the existing workflow: enter date/time, select source zone, add locations, and calculate local times/UTC offsets with DST and day differences.
- Preserved the existing converter functionality, title, description, canonical URL, existing time-zone-difference section, popular conversions, and Meeting Time Finder link.
- No new time-zone URL, city-pair doorway page, duplicate calculator page, or keyword-stuffed content was introduced.

Exact implementation diff: **1 existing SEO file only** — `src/components/tools/dateTime/timezone-converter/timezoneConverterSeoContent.tsx` (**4 additions / 0 deletions**).

This is the final small intent-alignment change currently justified by the supplied GSC query evidence for the Time Zone Converter. Further changes to this page should be driven by post-deployment GSC measurements or new query evidence rather than additional FAQ expansion.

## 2026-09-27 — Phase 12 execution: GSC-driven internal-link strengthening

The supplied GSC data identifies the Personal Loan EMI page as a meaningful remaining opportunity: **359 impressions / average position 87.36**, with calculation-intent queries including **“how to calculate personal loan emi” (63 / 88.68)** and **“calculate personal loan emi” (55 / 86.65)**. The calculator hub is the strongest near-page-1 page in the same export at **1,584 impressions / position 11.70** and already contains a contextual section for specialized financial calculators.

Rather than adding more keyword copy to the Personal Loan EMI page, this phase strengthens the internal path from the high-impression calculator hub to that existing destination. The hub now includes a descriptive **Personal Loan EMI Calculator** link alongside the existing dedicated finance calculators.

Implementation branch: `seo/gsc-driven-sep2026-phase12-internal-linking`, based directly on latest `main` commit `abe14aa84cab3a9d84edd92d1193e69632aa5453`.

Commit: `dcdc65cd9990ffd57909d7c7d493812361aea1aa`

Changes:
- Added one contextual internal link from the calculator hub's **Choose the Right Calculator for Your Task** section to `/tools/calculator/personal-loan-emi-calculator`.
- Used the descriptive anchor **Personal Loan EMI Calculator** and a concise description matching the existing page's calculation, interest, amortization, and repayment intent.
- Did not create a new URL, alter the Personal Loan EMI canonical, add duplicate keyword sections, or change calculator behavior.

Exact implementation diff: **1 existing SEO content file only** — `src/components/tools/calculator/calculatorSeoContent.tsx` (**1 addition / 0 deletions**).

This phase treats internal linking as an authority/discovery signal supported by the observed page-level GSC relationship, while avoiding further generic content expansion on the already-audited pages.

## Next action

**Phase 12 — move from content changes to measurement/authority/internal-link analysis unless the supplied GSC data identifies a new concrete page/query mismatch.**
