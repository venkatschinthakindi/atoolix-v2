# Atoolix SEO URL Aliases & Legacy Migrations

This file is an implementation-level URL alias record for SEO work. It exists to prevent future chats/models from confusing retired URLs with active canonical tools.

## Current finance calculator URL policy

| URL | Status | Current tool / action |
|---|---|---|
| `/tools/calculator/sip-calculator` | **ACTIVE / CANONICAL** | SIP Calculator |
| `/tools/calculator/retirement-calculator` | **ACTIVE / CANONICAL** | Retirement Calculator |
| `/tools/calculator/roi-calculator` | **LEGACY / REDIRECT** | Permanently redirect to SIP Calculator |

## ROI → SIP migration

`/tools/calculator/roi-calculator` is **not an active ROI Calculator page** in the current Atoolix product architecture.

It is a legacy URL retained for migration compatibility and is permanently redirected by `next.config.ts` to:

`/tools/calculator/sip-calculator`

This redirect must remain. Do not:

- create or restore a standalone ROI Calculator page at the legacy URL;
- add the legacy URL to the sitemap;
- use the legacy URL as the canonical URL of an active page;
- create internal links to the legacy URL when the destination is intended to be SIP Calculator;
- interpret `ROI Calculator` legacy references as evidence that an active ROI tool still exists.

The current SIP tool registry entry uses `/tools/calculator/sip-calculator` as its canonical URL.

## Naming policy

- Current SEO/content implementation for SIP uses `sipReturnCalculatorSeoContent.tsx`.
- The retired `roiCalculatorSeoContent.tsx` file has been removed because it represented an obsolete standalone ROI tool.
- Do not reintroduce `roiCalculatorSeoContent.tsx` unless a genuinely new, separately registered ROI product is intentionally launched.
- Existing image assets with historical filenames such as `roi-calculator.png` should not be renamed merely for aesthetics if they are still used by active tools; asset migration should only be performed when there is a concrete functional or image-SEO reason and all references can be updated safely.

## Google-aligned migration rule

Google recommends mapping old URLs to their corresponding new URLs, using permanent server-side redirects for URL moves, updating internal links to the new URLs, and keeping redirects in place for as long as possible. Google also treats canonicalization as a set of signals rather than a single rule. Therefore the legacy ROI URL remains a redirect alias, while current internal/canonical/sitemap signals should reinforce the SIP URL.

Official Google guidance:
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/crawling-indexing/canonicalization

## Change history

- `next.config.ts` already contains the permanent redirect from `/tools/calculator/roi-calculator` to `/tools/calculator/sip-calculator`.
- Removed the obsolete `calculator/roi-calculator` SEO loader from `src/app/tools/[...toolId]/ToolSeoContent.tsx`.
- Deleted `src/components/tools/financeSuite/investment/roiCalculatorSeoContent.tsx`.
- Current SIP SEO implementation remains `src/components/tools/financeSuite/investment/sipReturnCalculatorSeoContent.tsx`.
