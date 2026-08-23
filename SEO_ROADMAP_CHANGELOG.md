# Atoolix SEO Roadmap — Execution Changelog

This file records incremental execution updates that must be reconciled into `SEO_ROADMAP.md` when the central roadmap is next edited. `SEO_ROADMAP.md` remains the primary strategy/source of truth; this changelog prevents execution history from being lost between chats while preserving the full roadmap unchanged.

## 2026-08-23 — Date/time hub contextual links for Search Console opportunity cluster

### Evidence reviewed
- Supplied Search Console data shows `/tools/datetime/timezone-converter` as a leading current opportunity page with 97 impressions, 0 clicks, 0.00% CTR, and average position 71.77.
- `/tools/datetime/meeting-time-finder` also has meaningful visibility with 54 impressions, 1 click, 1.85% CTR, and average position 53.65.
- The dedicated Time Zone Converter page already has page-specific metadata, substantial intent-matching content, and a canonical `/tools/datetime/timezone-converter`.
- The dedicated Meeting Time Finder page already has its established canonical/content implementation.
- The `/datetime` hub described these use cases but did not provide explicit contextual links to either priority tool in the explanatory sections. The generic tool-hub component still exists separately; this change adds useful contextual links in the hub copy rather than relying only on generic navigation.

### Change implemented
Commit: `98f15fcf34785446398745c6341f82b8c1cf5972`

File: `src/app/datetime/page.tsx`

Added direct, descriptive contextual links from the Date/Time hub to:
- `/tools/datetime/timezone-converter`
- `/tools/datetime/meeting-time-finder`

The links are placed in the explanatory text and tool-selection section so users can move directly from the relevant use case to the appropriate tool.

### Google guidance applied
Google's current Search Central guidance recommends crawlable links with descriptive anchor text and using internal links to help Google discover important pages and understand site structure. The canonical URL guidance also recommends that internal links point to the preferred URL rather than alternate/duplicate destinations.

Official Google guidance checked on 2026-08-23:
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

### Validation
- [x] Both links use the established canonical production paths.
- [x] Anchor text describes the destination/use case naturally.
- [x] No new URL created.
- [x] No canonical change.
- [x] No sitemap change.
- [x] No redirect change.
- [x] No keyword-variant page created.
- [x] Change is limited to the Date/Time hub.
- [ ] Production deployment verification pending through the normal deployment pipeline.
- [ ] Search Console post-recrawl measurement pending.

## 2026-08-23 — Legacy ROI visible-identity cleanup completed

### Evidence reviewed
- The active registered product at `/tools/calculator/sip-calculator` is the SIP Calculator.
- `/tools/calculator/roi-calculator` remains a legacy migration URL and is intentionally preserved as a permanent redirect to the SIP Calculator.
- Documentation and Disclaimer still contained active visible labels identifying the SIP URL as `ROI Calculator`.
- The repository-wide sweep distinguished active product references from intentional historical/migration references.

### Change implemented
Commits:
- `c68f55000d2cd5485c666514bab05fb58c664e50`
- `26d8e63e3d0d3034f9e88dc99fc8262024e02484`

Files:
- `src/app/documentation/page.tsx`
- `src/app/disclaimer/page.tsx`

Changed active visible identity from `ROI Calculator` to `SIP Calculator` while retaining the canonical `/tools/calculator/sip-calculator` destination.

Documentation now consistently presents the SIP Calculator as SIP, including the quick-link label and Finance Calculator entry. Disclaimer now presents the same active destination as SIP Calculator.

No legacy redirect was removed. No new ROI page was created.

### Google guidance applied
Google's current canonicalization guidance says canonicalization uses multiple signals including redirects, sitemap inclusion, and `rel="canonical"`, and that canonical preference is a hint rather than a rule. Google's current site-move guidance recommends updating internal links to the preferred destination while retaining appropriate permanent redirects.

Official Google guidance checked on 2026-08-23:
- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/updates

### Validation
- [x] Documentation active SIP URL now has SIP identity.
- [x] Disclaimer active SIP URL now has SIP identity.
- [x] Legacy `/tools/calculator/roi-calculator` redirect remains preserved.
- [x] No active ROI page created.
- [x] No sitemap change.
- [x] No canonical change.
- [x] No redirect change.
- [x] Repository comparison from the pre-change state shows only the two intended page files changed: Documentation `+4/-4`, Disclaimer `+2/-2`.
- [x] Temporary validation workflow removed; no temporary workflow remains in `.github/workflows/`.
- [ ] Production deployment verification pending through the normal deployment pipeline.
- [ ] Search Console post-recrawl measurement pending.

## 2026-08-23 — Finance hub legacy ROI identity cleanup

### Evidence reviewed
- The current Atoolix finance architecture treats `/tools/calculator/sip-calculator` as the active SIP Calculator URL.
- `/tools/calculator/roi-calculator` is a legacy URL retained for migration compatibility and permanently redirected to the SIP Calculator.
- `SEO_URL_ALIASES.md` explicitly prohibits using the legacy ROI URL as an active canonical, sitemap URL, or current internal destination.
- `FinanceHubSeoContent.tsx` still listed `ROI Calculator` with the legacy `/tools/calculator/roi-calculator` destination and separately described ROI as an active calculator. This contradicted the current product architecture and the permanent alias policy.

### Change implemented
Commit: `6c31858c7c137bed4b36e87d4c59a4b054aade10`

File: `src/app/finance/FinanceHubSeoContent.tsx`

Removed the retired ROI calculator from the finance hub's active calculator list and removed the standalone ROI entry from the investment-calculator guidance. The remaining active investment calculators are SIP, XIRR, CAGR, and Lumpsum, while Retirement and Fixed Deposit remain in their own active sections.

This is a semantic/internal-link cleanup, not a URL migration. The legacy ROI redirect remains unchanged.

### Google guidance applied
Google recommends updating internal links during URL migrations so they point to the new URLs and maintaining redirects from old URLs. Google also treats canonicalization as a combination of signals, including redirects, sitemap inclusion, and canonical annotations. Therefore active Atoolix finance-hub links should describe and point to active tools, while the old ROI URL remains only as a redirect alias.

Official Google guidance checked on 2026-08-23:
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting

### Validation
- [x] Finance hub no longer links to legacy `/tools/calculator/roi-calculator`.
- [x] Finance hub no longer labels the legacy URL as an active ROI Calculator.
- [x] Active SIP Calculator link remains `/tools/calculator/sip-calculator`.
- [x] Legacy ROI redirect remains preserved.
- [x] No new ROI page created.
- [x] No sitemap change.
- [x] No canonical change.
- [x] No redirect change.
- [x] Documentation page legacy ROI label/link still requires the same semantic cleanup.
- [x] Disclaimer page legacy ROI label/link still requires the same semantic cleanup.

## 2026-08-23 — Calculator hub SIP internal-link audit correction

### Evidence reviewed
- The production repository's actual `src/data/tools.ts` registry defines `calculator/sip-calculator` as the **SIP Calculator** tool and sets its canonical to `/tools/calculator/sip-calculator`.
- The repository also contains a separate Retirement Calculator route at `/tools/calculator/retirement-calculator`, with retirement-specific implementation/content.
- `src/components/tools/calculator/calculatorSeoContent.tsx` had previously been changed to link the visible **SIP Calculator** anchor to `/tools/calculator/retirement-calculator`.
- That previous change was therefore incorrect. The visible anchor text was not the problem; the destination URL was.
- The Finance hub already correctly links `SIP Calculator` to `/tools/calculator/sip-calculator` and separately links `Retirement Calculator` to `/tools/calculator/retirement-calculator`.
- The SIP SEO content itself also declares `TOOL_PATH = "/tools/calculator/sip-calculator"`, confirming the route at the implementation level.

### Google guidance applied
Google's current canonicalization guidance says canonical selection is based on multiple signals including redirects, sitemap URLs, and `rel="canonical"`; canonical preference is a hint rather than a rule. Google's site-move guidance also recommends updating internal links so they point directly to the intended/preferred URLs. The correct application here is therefore to make internal links agree with the repository's actual registered canonical, not to infer a canonical from the anchor label.

Official Google guidance checked on 2026-08-23:
- What is URL canonicalization: https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Fix canonicalization issues: https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
- Site moves / update internal links: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- Latest Search documentation updates: https://developers.google.com/search/updates

### Production correction
Commit: `b038e00cef64051afaa33aeb60c5fae95e34eb49`

File: `src/components/tools/calculator/calculatorSeoContent.tsx`

Restored:
`href="/tools/calculator/sip-calculator"`

The visible anchor remains `SIP Calculator`.

This is the correct pairing because the registered SIP Calculator destination is `/tools/calculator/sip-calculator`. The separate Retirement Calculator remains `/tools/calculator/retirement-calculator`.

### Documentation correction
Commit: `016463a22e3552a1991e8d87462da8ed96dae38a`

Updated `SEO_ROADMAP.md` so its established URL table no longer incorrectly conflates SIP and Retirement. The historical Search Console metric previously labeled "Retirement/SIP" is now marked ambiguous pending a fresh Search Console export.

### Validation / non-changes
- [x] SIP internal link now points to the actual registered SIP canonical.
- [x] Retirement Calculator remains a separate route.
- [x] Finance hub SIP/Retirement links were inspected and are correctly separated.
- [x] SIP SEO content declares `/tools/calculator/sip-calculator`.
- [x] No URL migration performed.
- [x] No sitemap change.
- [x] No redirect change.
- [x] No canonical tag change.
- [x] No new page created.
- [x] No keyword stuffing.
- [x] Central roadmap corrected to prevent future model/chat confusion.
- [ ] Production deployment verification pending.
- [ ] Search Console post-recrawl measurement pending.

## 2026-08-23 — QR generator Search Console intent/metadata alignment

### Evidence reviewed
- Supplied Search Console baseline showed `/tools/qrcode/qr-code-generator` receiving 42 impressions, 0 clicks, 0.00% CTR, average position 78.50.
- The query `qr code generator scanner online` generated an impression at average position 94, with additional scanner/generator intent queries appearing in the supplied query export.
- The QR tool already has substantial people-first SEO content covering URL, text, email, phone, SMS, WhatsApp, WiFi, vCard, location, event, customization, error correction, exports, camera/image scanning, mobile use, privacy behavior, and scanning safety.
- The dedicated `/qrcode` hub already has its own canonical URL and useful generator/scanner context, so creating another QR keyword page was not justified.
- The tool route's shared metadata path did not have an explicit page-specific title/description override for the high-opportunity QR generator/scanner intent.

### Change implemented
Commit: `28888b6910b9e67ad5b0f291760cb008938121c6`

File: `src/app/tools/[...toolId]/page.tsx`

Added explicit metadata for `/tools/qrcode/qr-code-generator`:
- Title: `QR Code Generator & Scanner – Create, Scan & Download | Atoolix`
- Description: `Create QR codes for URLs, text, WiFi, contacts, email, phone, SMS, WhatsApp, locations, and events. Scan QR codes with a camera or image and export PNG, SVG, or PDF in your browser.`

The same page-specific values are applied to Open Graph and Twitter metadata. No URL, canonical, sitemap, redirect, structured-data, or content-architecture change was made.

## 2026-08-23 — Personal Loan EMI metadata intent alignment

### Evidence reviewed
- Historical Search Console data showed the Personal Loan EMI Calculator receiving impressions for `personal loan emi calculator`, `how to calculate emi for personal loan`, and related variants, while ranking around positions 92–95 for several queries.
- The page already had substantial people-first calculator content, methodology, examples, limitations, and financial-context explanations.
- The existing H1 is `Personal Loan EMI Calculator`, but the generic metadata path was not explicitly controlled for this high-opportunity page.

### Change implemented
Commit: `9232d6793e41ddcada5e885d617cd7a9a1a7fcbf`

File: `src/app/tools/[...toolId]/page.tsx`

Title: `Personal Loan EMI Calculator – EMI, Interest & Prepayment | Atoolix`

Description: `Calculate personal loan EMI from loan amount, interest rate, and tenure. Compare total interest and model one-time or recurring prepayments in your browser.`

No URL, canonical, sitemap, H1, content structure, or keyword-variant page was changed.

## 2026-08-23 — Finance hub FD search-intent/internal-context improvement

### Evidence reviewed
- Supplied Search Console baseline included the FD cluster, including `fd formula` and related fixed-deposit calculator intent, while the FD Calculator page had demonstrated impressions around position 67.
- The FD Calculator already contained substantial specific content covering maturity value, interest, compounding, formula, examples, limitations, Indian FD context, tax caveat, and privacy behavior.
- The Finance hub already linked directly to `/tools/calculator/fd-calculator`, but its explanatory content did not explicitly explain when a user should choose an FD calculator.

### Change implemented
Commit: `2a056d7427425113b08e08899ddeb2c6526c10bc`

File: `src/app/finance/FinanceHubSeoContent.tsx`

Added concise FD/savings-calculator intent context and a `Which Savings Calculator Should You Use?` section while retaining the existing direct FD link. No new URL, canonical, sitemap, structured-data, or keyword-variant page was created.

## 2026-08-23 — Finance hub ROI internal-link/context improvement

### Evidence reviewed
- Supplied Search Console baseline: `/tools/calculator/roi-calculator` had 54 impressions, 0 clicks, 0.00% CTR, average position 71.46.
- The Finance hub linked to SIP, XIRR, CAGR and Lumpsum but did not link directly to ROI.
- The ROI page already contained substantial intent-matching content, so a large content expansion was not justified.

### Change implemented
Commit: `15816869a185104b1eed7e298358e585418f2c62`

File: `src/app/finance/FinanceHubSeoContent.tsx`

Added a direct crawlable ROI link and concise ROI context so users can distinguish total ROI from annualized/time-sensitive measures. No URL, canonical, sitemap, redirect, or duplicate-page change was made.

## Next action
Continue from the latest Git state after correcting the SIP/Retirement URL distinction. Run the site-wide route → registry → sitemap → canonical → internal-link reconciliation first, because the audit just demonstrated that an incorrect URL assumption can create a real SEO regression. Then use the fresh Search Console opportunity queue to select the next highest-value page/cluster. For each candidate, apply the full standard: technical indexability, canonical, sitemap, intent, content usefulness, internal links, accessibility, structured data, performance, duplicate/parameter URL risk, and current Google Search Central guidance.

Make a production change only when a genuine gap exists, including legitimate small improvements. Do not infer Search Console metrics for SIP versus Retirement from the previously combined "Retirement/SIP" baseline; obtain fresh page-level Search Console evidence before prioritizing one over the other.
