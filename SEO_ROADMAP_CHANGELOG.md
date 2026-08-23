# Atoolix SEO Roadmap — Execution Changelog

This file records incremental execution updates that must be reconciled into `SEO_ROADMAP.md` when the central roadmap is next edited. `SEO_ROADMAP.md` remains the primary strategy/source of truth; this changelog prevents execution history from being lost between chats while preserving the full roadmap unchanged.

## 2026-08-23 — Personal Loan EMI metadata intent alignment

### Evidence reviewed
- Historical Search Console data supplied during the SEO program showed the Personal Loan EMI Calculator receiving impressions for queries including `personal loan emi calculator`, `how to calculate emi for personal loan`, and related variants, while ranking around positions 92–95 for several of those queries.
- The page already had substantial people-first calculator content, methodology, examples, limitations, and financial-context explanations.
- The existing page-level H1 is `Personal Loan EMI Calculator`, but the generic metadata path was not explicitly controlled for this high-opportunity page.

### Google guidance applied
Google Search Essentials recommends using words people use to find the content in prominent locations such as the title and main heading, while avoiding search-engine-first keyword stuffing. The page therefore receives one concise, intent-aligned title and description rather than additional keyword sections.

Official references checked on 2026-08-23:
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- AI features guidance: https://developers.google.com/search/docs/appearance/ai-features

### Change implemented
Commit: `9232d6793e41ddcada5e885d617cd7a9a1a7fcbf`

File:
`src/app/tools/[...toolId]/page.tsx`

Added explicit metadata for:
`/tools/calculator/personal-loan-emi-calculator`

Title:
`Personal Loan EMI Calculator – EMI, Interest & Prepayment | Atoolix`

Description:
`Calculate personal loan EMI from loan amount, interest rate, and tenure. Compare total interest and model one-time or recurring prepayments in your browser.`

The same page-specific values are applied to Open Graph and Twitter metadata so the page's primary descriptive signals remain consistent.

### Why this was justified
This is a small but evidence-based improvement: the page has demonstrated Search Console demand for the exact primary intent, the H1 already targets that intent, and explicit metadata now makes the search-result description more directly representative of the page's actual functionality. No URL, canonical, sitemap, content structure, or keyword-variant page was created.

### Validation status
- [x] URL unchanged.
- [x] Canonical strategy unchanged.
- [x] Sitemap unchanged.
- [x] H1 unchanged.
- [x] No duplicate page created.
- [x] No keyword stuffing added.
- [x] Metadata accurately reflects visible functionality.
- [x] Git commit verified.
- [ ] Production deployment verification pending.
- [ ] Search Console post-recrawl measurement pending.

## 2026-08-23 — Finance hub FD search-intent/internal-context improvement

### Evidence reviewed
- The supplied Search Console baseline includes the FD cluster, including `fd formula` and related fixed-deposit calculator intent, while the FD Calculator page had demonstrated impressions around position 67.
- The FD Calculator page already contains substantial useful, specific content covering maturity value, interest, compounding, formula, examples, limitations, Indian FD context, tax caveat, and privacy behavior. Adding another large keyword section to that page was therefore not justified.
- The Finance hub already links directly to `/tools/calculator/fd-calculator`, but its explanatory content did not explicitly explain when a user should choose an FD calculator. This created a small but genuine semantic/internal-context gap between the hub's navigation and its explanatory copy.
- The hub also discussed SIP/XIRR/CAGR/Lumpsum as distinct investment intents but did not provide an equivalent explanation for the savings calculator family.

### Google guidance applied
The change follows Google's people-first approach: improve the page's usefulness and clarity for users, use descriptive natural language, and strengthen logical site architecture rather than adding keyword-stuffed variants. Google also states that title/content/link signals help it understand and represent pages, while canonicalization should be supported by consistent site signals rather than used as a shortcut.

Official Google guidance checked on 2026-08-23:
- Google Search documentation updates: https://developers.google.com/search/updates
- What is URL canonicalization: https://developers.google.com/search/docs/crawling-indexing/canonicalization
- SEO guidance / hiring SEO: https://developers.google.com/search/docs/fundamentals/do-i-need-seo

### Change implemented
Commit: `2a056d7427425113b08e08899ddeb2c6526c10bc`

File:
`src/app/finance/FinanceHubSeoContent.tsx`

Changes:
- Clarified the finance hub's introductory paragraph so fixed-deposit calculators are explicitly identified as a distinct savings calculation intent.
- Added a dedicated `Which Savings Calculator Should You Use?` section.
- Added concise explanations for FD, compound-interest, and RD calculators.
- Kept the existing direct crawlable FD link unchanged: `/tools/calculator/fd-calculator`.

### Why this was justified
This is a deliberately small improvement rather than a page-wide content expansion. It closes a real contextual gap on an important finance hub, makes the existing FD internal link more understandable, and helps users choose the correct calculator without creating a new URL or repeating FD keywords unnaturally.

### Validation status
- [x] Existing FD canonical URL unchanged.
- [x] Existing sitemap URL unchanged.
- [x] Existing FD internal link retained.
- [x] No new URL created.
- [x] No keyword-variant page created.
- [x] No structured-data change.
- [x] No unsupported financial claim added.
- [x] Git commit created.
- [ ] Production deployment verification pending.
- [ ] Search Console post-recrawl measurement pending.

## Next action
Continue from commit `2a056d7427425113b08e08899ddeb2c6526c10bc` and audit the next highest-opportunity Search Console page/cluster. For every page, check technical indexability, canonical, sitemap membership, search intent, content usefulness, internal links, accessibility, structured data, performance implications, and duplicate/parameter URL risk before changing anything.

Minor legitimate improvements must continue to be captured rather than ignored, but no change should be made without a concrete user, technical, relevance, crawlability, or Search Console rationale.
