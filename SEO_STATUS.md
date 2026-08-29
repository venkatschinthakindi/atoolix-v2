# SEO Status — GSC-Driven Investigation (2026-08-29)

## Why this file exists
Prior SEO work in this repo produced 52 separate `SEO_*.md` files, mostly
documentation churn (`docs: sync/close/record ... evidence`) rather than
product changes. This file replaces that pattern going forward: one file,
kept current, updated in place rather than appended-to-forever.

## Data source
Google Search Console "Performance on Search" export, 2026-07-01 to
2026-08-29 (`atoolix_com-Performance-on-Search-2026-08-29.xlsx`).

## Diagnosis
- Site is ~45–60 days old.
- Across ~600 queries and 37 pages, average position is 50–100+
  (page 5–10 of results). Total clicks in 2 months: 2.
- Top-impression pages and their average position:
  - `/tools/datetime/timezone-converter` — 417 impressions, pos 67.8
  - `/tools/calculator/fd-calculator` — 323 impressions, pos 74.0
  - `/tools/image/compress-image-to-100kb` — 151 impressions, pos 72.2
  - `/tools/image/compress-image-to-50kb` — 147 impressions, pos 76.2
  - `/tools/image/resize-signature-for-upload` — 132 impressions, pos 67.5
  - `/tools/calculator/cagr-calculator` — 117 impressions, pos 82.8
- Competitors on these terms are established, high-authority sites
  (BankBazaar, Groww, Scripbox, Kotak Life for finance calculators;
  timeanddate.com-tier sites for timezone tools).
- Closest-to-page-1 pages: `/` (pos 28.5), `/tools/datetime/meeting-time-finder`
  (pos 53.65, the only page with a genuine impression-and-click pattern),
  `/calculator` hub (pos 44.25), `/tools` (pos 35.3).

## Code/content verification performed this session
Checked the three highest-priority candidate pages against the actual
rendered content and existing audits:

| Page | Content depth | Schema | Robots/canonical | Verdict |
|---|---|---|---|---|
| meeting-time-finder | Substantial (features, how-to, templates, FAQ, use cases) | WebApplication + Breadcrumb; FAQ/HowTo schema intentionally omitted (deprecated by Google, 2023) | Clean | No defect found |
| fd-calculator | Substantial (303 lines) | WebApplication verified | Clean | No defect found (matches prior `SEO_FD_CALCULATOR_AUDIT_2026-08-24.md`, gate closed) |
| timezone-converter | Substantial (786 lines) | WebApplication | Clean | No defect found (matches prior `SEO_TIMEZONE_CONVERTER_AUDIT_2026-08-23.md`) |

`src/app/robots.ts` allows all crawlers, no accidental blocking.

## Conclusion
**No code change made in this branch.** The on-page/technical SEO for
these pages is already sound, confirmed independently rather than
assumed. Impressions rising with flat clicks is explained by domain age,
not a fixable bug — positions in the 50–90 range don't get clicks
regardless of title/meta quality.

## What actually moves the needle from here
1. **Backlinks** — directory submissions, "best free tools" roundup posts,
   Product Hunt / relevant subreddit mentions. This is the single biggest
   lever for a new domain and is outside what code changes can fix.
2. **Time** — sustained signal over months, not weeks, especially in
   competitive verticals (finance calculators, image tools).
3. **Watch the near-page-1 pages** (`meeting-time-finder`, `/`, `/calculator`
   hub) in the next GSC export — if position on these improves while
   content/code stayed the same, that confirms it's an authority/time
   effect, not a code effect.

## Next review
Re-pull GSC Performance export in ~3–4 weeks and compare position deltas
on the pages listed above before deciding on further code work.
