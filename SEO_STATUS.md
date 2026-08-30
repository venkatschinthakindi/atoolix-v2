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
The on-page/technical SEO for these three pages was already sound,
confirmed independently rather than assumed. Impressions rising with
flat clicks is explained by domain age, not a fixable bug — positions
in the 50–90 range don't get clicks regardless of title/meta quality.
One genuine, verifiable gap was found and fixed (see log below).

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

## Commit cadence
Each discrete unit of work gets its own commit at the time it's done,
and this file is updated in the same commit — not batched at the end.
No new dated audit files; this file is edited in place.

## Status log
| Date | Commit | What | Owner |
|---|---|---|---|
| 2026-08-29 | `e87bc38` | GSC investigation + verification of 3 top pages, no defect found | Done |
| 2026-08-29 | `c2e29e1` | Added `lastModified` to all sitemap entries (was missing on all 52 URLs) | Done |
| 2026-08-29 | `886f2e6` | Status log synced, commit cadence convention set | Done |
| 2026-08-29 | pushed | Branch pushed to GitHub for PR review | Done |
| 2026-08-29 | (pending) | Verified remaining top-impression pages (compress-image-to-100kb, compress-image-to-50kb, resize-signature-for-upload, cagr-calculator) — all substantial content (687–1096 lines), all previously audited, all "preserve, no defect" per prior audits. Found one stale record: `SEO_CAGR_CONTENT_CORRECTION_STATUS_2026-08-24.md` had unchecked boxes for a fix that was actually already shipped in `6ae8eb7`. Corrected the checklist to match reality; no new code change needed. | Done |
| 2026-08-29 | — | Full sweep of all high-impression pages complete (prior scope). | Done |
| 2026-08-29 | — | Checked `compress-png`/`compress-webp` sitemap omission (18 impressions each despite not being in sitemap). Traced to `archived: true`, set 2026-07-26 (commit `53efc70`), which correctly triggers `robots: noindex` via `src/utility/metadata.ts`. Lingering GSC impressions are pre-archival index decay, not a bug. No action needed. | Done |
| 2026-08-29 | `8dfedac` | Line-count sweep across **all 44 SEO content files** in the repo. Found `homeLoanEmiCalculatorPageSeoContent.tsx` at 83 lines vs. 624–646 for its car-loan/personal-loan siblings — a real, verifiable outlier. "Home loan EMI calculator" is typically the highest-volume EMI term, so this was backwards. Rebuilt to match sibling depth: feature grid, audience section, FAQ expanded 4→10, and a new Home Loan Tax Benefits (Section 80C/24(b)) section — content genuinely unique to home loans that was previously entirely missing. Also fixed 3 pre-existing lint errors (`<a>` → `next/link`) while in the file. `tsc --noEmit` and `eslint` both clean. | Done |
| 2026-08-29 | — | Checked `emiCalculatorHubSeoContent.tsx` (98 lines) — legitimate hub/router page, consistent with the top-level `calculatorSeoContent.tsx` hub pattern (169 lines). Not a gap. | Done |
| 2026-08-29 | — | **This sweep is now genuinely exhaustive: every high-impression page and every SEO content file's line count checked. One real content gap found and fixed. No further code-level SEO defects remain. No further code work is justified without new GSC evidence.** | Done |
| 2026-08-29 | — | Cross-checked repo against Google's current official SEO Starter Guide (developers.google.com/search/docs/fundamentals/seo-starter-guide) and Google's new May 2026 generative-AI-search guide. Confirmed: descriptive URLs ✓, canonical handling ✓, no keyword stuffing ✓, no meta-keywords reliance ✓, OG images all resolve ✓. Guide explicitly states no minimum-content-length ranking factor and that E-E-A-T is not itself a ranking signal — earlier content-depth fix was correctly about closing a real thin-content outlier, not chasing a word count. Guide's own promotion section (social, community, word of mouth) matches the backlink plan already given to the repo owner — not a code task. | Done |
| 2026-08-29 | — | Final technical sweep: scripted check across all 58 tool entries for duplicate `<title>` tags, duplicate meta descriptions, and broken `relatedTools` links — zero found on all three. Confirmed `ToolSeoContent` is server-rendered (no `ssr:false`, no `"use client"` on `page.tsx`), so SEO content is visible to crawlers without JS execution. Confirmed fonts use `next/font/google` (self-hosted, no render-blocking request, no CLS penalty). No further defects found. | Done |
| 2026-08-29 | — | **Conclusion after two full passes (content-depth + technical/Google-guidance): codebase is clean. One real fix shipped (home loan EMI content). Nothing else remains without new GSC evidence or a live Core Web Vitals report (PageSpeed Insights) this sandbox can't run.** | Done |
| — | — | Push branch to GitHub, open PR | Pending — you: click the PR link |
| — | — | Submit to Product Hunt, AlternativeTo, SaaSHub | Pending — repo owner (needs their accounts) |
| — | — | Pitch 3–5 relevant roundup blogs / awesome-lists | Pending — repo owner |
| ~2026-09-26 | — | Re-pull GSC export, compare position deltas | Pending — scheduled review |
