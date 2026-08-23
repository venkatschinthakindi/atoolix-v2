# Atoolix SEO Roadmap & Tracking Source of Truth

**Site:** https://atoolix.com  
**Repository:** `venkatschinthakindi/atoolix-v2`  
**Primary objective:** Build Atoolix into a technically sound, useful, trusted, search-friendly tool site with sustained organic growth and a long-term target of reaching **top-5 organic visibility for relevant, attainable queries**.

> **Important:** Top-5 rankings are a target, not a guarantee. Google does not provide a guaranteed ranking position. This roadmap therefore optimizes for the signals Google documents: crawlability, indexability, canonical clarity, helpful people-first content, strong information architecture, useful internal links, page experience, and satisfying search intent.

## 1. Operating principles — do not deviate

1. **Google Search Central is the primary SEO authority.** Third-party SEO recommendations are treated as hypotheses and must be checked against official Google guidance before implementation.
2. **People first.** Improve usefulness, clarity, task completion, accessibility, and trust before adding SEO copy.
3. **Search Console evidence first.** Use actual queries, impressions, CTR, position, landing pages, indexing signals, and observed intent to prioritize work.
4. **One canonical URL per intended page.** Do not create keyword variants merely to capture synonyms.
5. **Internal links must be useful and crawlable.** Prefer descriptive, natural anchor text and logical hub → tool relationships.
6. **No keyword stuffing.** Do not force every query into titles, headings, paragraphs, anchors, or FAQs.
7. **No thin doorway pages.** A page must have a distinct user purpose and enough original value to justify its URL.
8. **No speculative changes.** A change requires a concrete technical, relevance, UX, internal-link, indexing, or Search Console evidence-based rationale.
9. **Small improvements matter.** Minor legitimate improvements should be addressed when they improve discoverability, clarity, accessibility, user experience, or search understanding without creating risk.
10. **Never change a correct URL just for SEO.** Preserve established URLs unless there is a strong reason and a complete redirect/canonical/internal-link/sitemap plan.
11. **Validate after every meaningful batch.** Check source, metadata, canonical, robots/indexability, sitemap, internal links, build/type/lint where available, and Git diff.
12. **Keep Git as the implementation history and this file as the SEO decision history.** Every completed task should be recorded here so future chats/models can continue without reconstructing decisions.

## 2. Google-aligned framework

### A. Technical crawlability & indexability

- [ ] Production site consistently returns the intended HTTP status for indexable pages.
- [ ] No accidental `noindex` on pages intended for Search.
- [ ] No accidental `X-Robots-Tag: noindex` or equivalent production header.
- [ ] `robots.txt` is intentional, minimal, and does not block important pages/resources.
- [ ] Googlebot can discover important pages through crawlable links and/or sitemap.
- [ ] Important pages are not dependent on inaccessible client-only navigation.
- [ ] No accidental staging/deployment URLs are indexable.
- [ ] 404/410 behavior is correct for genuinely missing URLs.
- [ ] No soft-404 patterns on pages that should be missing.
- [ ] Redirects are intentional, minimal, and destination-relevant.
- [ ] HTTPS is canonical and HTTP does not become an alternate indexable version.
- [ ] `www` vs non-`www` policy remains consistent.
- [ ] Trailing-slash/query/hash variants do not create unwanted duplicate URLs.
- [ ] Search/filter/sort parameters do not create unnecessary indexable duplicates.
- [ ] JavaScript rendering does not change the intended canonical/indexability signals after render.
- [ ] Important content is present in rendered HTML and is not unnecessarily hidden behind client-only behavior.

### B. Canonicalization & URL integrity

- [ ] Every indexable page has the intended canonical strategy.
- [ ] Self-referencing canonicals are used where appropriate.
- [ ] Canonical URL exactly matches the intended production URL.
- [ ] Canonical, sitemap URL, internal links, redirects, and actual URL agree.
- [ ] No canonical points to an unrelated page merely to consolidate pages.
- [ ] Duplicate/near-duplicate pages are investigated rather than blindly canonicalized.
- [ ] Google-selected canonical is monitored in Search Console for important pages.
- [ ] URL changes require a complete redirect + canonical + internal-link + sitemap update.

### C. Sitemap integrity

- [ ] Sitemap contains only URLs intended for indexing.
- [ ] Sitemap URLs use the preferred HTTPS/canonical host.
- [ ] No 3xx/4xx/5xx URLs in sitemap.
- [ ] No `noindex` URLs in sitemap.
- [ ] No duplicate sitemap URLs.
- [ ] Dynamic sitemap source of truth remains aligned with the tool registry/routes.
- [ ] Tool-specific sitemap issues are checked after route changes.
- [ ] New important pages are included promptly.
- [ ] Removed/redirected pages are removed from sitemap.
- [ ] Sitemap remains valid XML and production-accessible.
- [ ] Search Console sitemap status is periodically checked.

### D. Site architecture & internal linking

- [ ] Homepage links to the major tool/category hubs.
- [ ] Category hubs link to their important tools.
- [ ] Tool pages link to genuinely related tools.
- [ ] Important pages have contextual links from relevant hubs/content where useful.
- [ ] No important page is effectively orphaned.
- [ ] Internal links use descriptive, natural anchor text.
- [ ] Links point directly to canonical URLs.
- [ ] No unnecessary chains through intermediate pages.
- [ ] Related-tool modules are relevant rather than generic link dumps.
- [ ] High-impression pages receive appropriate contextual internal links.
- [ ] Internal-link improvements are prioritized by Search Console opportunity and user intent.

### E. Titles, headings & snippets

For each important indexable page:

- [ ] Title clearly describes the page and its primary user intent.
- [ ] Title is concise and useful, not keyword-stuffed.
- [ ] H1 clearly represents the page's main topic/task.
- [ ] Heading hierarchy is logical.
- [ ] Meta description accurately summarizes the page and can encourage qualified clicks.
- [ ] Title/H1/meta description are aligned but not mechanically duplicated.
- [ ] Search-result language matches what the page actually provides.
- [ ] No deceptive claims such as unsupported guarantees.

### F. Helpful content & search intent

For every priority tool/page:

- [ ] Identify the actual Search Console queries generating impressions.
- [ ] Group queries by intent rather than treating every spelling variation as a keyword target.
- [ ] Confirm the page satisfies the dominant intent immediately.
- [ ] Explain what the tool does, who it is for, and the key use cases.
- [ ] Explain important inputs/options and expected outputs.
- [ ] Include useful limitations or accuracy/privacy considerations where relevant.
- [ ] Include concise, genuinely useful how-to guidance where it helps the user.
- [ ] Add examples only when they improve understanding.
- [ ] Avoid filler paragraphs written only to increase word count.
- [ ] Avoid repetitive synonym sections.
- [ ] Avoid templated pages that differ only by a keyword or number.
- [ ] Make each tool page materially useful even if a user never visits another page.
- [ ] Re-check content after product/feature changes so SEO copy remains accurate.

### G. Trust, transparency & sensitive topics

- [ ] Privacy claims match actual processing behavior.
- [ ] Security claims do not exceed what the tool can actually verify.
- [ ] Financial calculators clearly explain assumptions/formulas/limitations where appropriate.
- [ ] No unsupported "Google-approved", "guaranteed ranking", "100% secure", or similar claims.
- [ ] Contact/privacy/legal information is accessible.
- [ ] Important trust information is easy for users to find.
- [ ] Content demonstrates real product functionality rather than generic AI-generated prose.

### H. Images & accessibility

- [ ] Important images have useful descriptive alt text where appropriate.
- [ ] Decorative images are not given misleading SEO alt text.
- [ ] Image filenames/contexts are meaningful where relevant.
- [ ] Images do not unnecessarily block or slow the primary task.
- [ ] Interactive controls have accessible names.
- [ ] Heading/link/button text remains understandable out of context where appropriate.

### I. Structured data

- [ ] Structured data is used only where the page qualifies and the markup accurately represents visible content.
- [ ] JSON-LD is preferred for maintainability where appropriate.
- [ ] No fabricated ratings/reviews/authorities.
- [ ] Deprecated/non-eligible Google rich-result markup is not added merely for SEO.
- [ ] Structured data is validated after changes.
- [ ] Schema is not treated as a ranking shortcut.

### J. Performance & page experience

- [ ] Core Web Vitals are monitored for important templates.
- [ ] LCP, INP, and CLS opportunities are tracked.
- [ ] Heavy client JavaScript is minimized where it does not contribute to the user's task.
- [ ] Images and fonts are appropriately optimized.
- [ ] Third-party scripts are minimized and deferred where appropriate.
- [ ] Render-blocking resources are reviewed.
- [ ] Tool functionality remains fast on realistic mobile devices.
- [ ] SEO changes do not regress performance.

### K. Mobile & UX

- [ ] Important functionality works on mobile.
- [ ] Primary tool action is obvious without excessive scrolling.
- [ ] Forms and controls are usable with touch.
- [ ] Content is readable without awkward horizontal scrolling.
- [ ] Navigation remains consistent.
- [ ] Ads/monetization, if present, do not obscure primary content or functionality.

### L. Search Console feedback loop

For each priority page:

- [ ] Record impressions.
- [ ] Record clicks.
- [ ] Record CTR.
- [ ] Record average position.
- [ ] Record top queries.
- [ ] Record top pages/landing URLs.
- [ ] Compare trends before/after meaningful changes.
- [ ] Separate indexing/technical problems from ranking/content problems.
- [ ] Re-evaluate after Google has had time to recrawl/reprocess changes.
- [ ] Do not overreact to one or two days of noisy data.

## 3. Established URL / architecture decisions

These are **source-of-truth URLs already established during the SEO work**. Do not change them casually.

| Area | Canonical/known URL | Status |
|---|---|---|
| Homepage | `/` | Established |
| Tools hub | `/tools` | Established |
| Date/time hub | `/datetime` | Established |
| Calculator hub | `/calculator` | Established |
| Privacy/security hub | `/privacysecurity` | Established |
| Meeting Time Finder | `/tools/datetime/meeting-time-finder` | Priority/validated |
| Time Zone Converter | `/tools/datetime/timezone-converter` | Priority/validated |
| File Analyzer | `/tools/privacysecurity/file-analyzer` | Priority/validated |
| 100 KB Image Compressor | `/tools/image/compress-image-to-100kb` | Priority/validated |
| 50 KB Image Compressor | `/tools/image/compress-image-to-50kb` | Priority/validated |
| 20 KB Image Compressor | `/tools/image/compress-image-to-20kb` | Priority/validated |
| Passport Photo Resizer | `/tools/image/passport-photo-resizer` | Audited/validated |
| QR Code Generator | `/tools/qrcode/qr-code-generator` | Priority |
| ROI Calculator | `/tools/calculator/roi-calculator` | Priority |
| Personal Loan EMI | `/tools/calculator/personal-loan-emi-calculator` | Priority |
| SIP Calculator | `/tools/calculator/sip-calculator` | Established |
| Retirement Calculator | `/tools/calculator/retirement-calculator` | Established |
| FD Calculator | `/tools/calculator/fd-calculator` | Priority |
| EMI Calculator | `/tools/calculator/emi-calculator` | Priority |
| Home Loan EMI | `/tools/calculator/home-loan-emi-calculator` | Priority |
| Car Loan EMI | `/tools/calculator/car-loan-emi-calculator` | Priority |

**Important URL clarification:** `/tools/calculator/sip-calculator` and `/tools/calculator/retirement-calculator` are separate registered tools. The SIP Calculator canonical is `/tools/calculator/sip-calculator`; the Retirement Calculator canonical is `/tools/calculator/retirement-calculator`. Do not conflate them in future SEO work. `/tools/calculator` and `/tools/converter` are also real tool routes and must not be removed/reverted merely because they are not the same as category paths discussed elsewhere.

## 4. Search Console baseline captured during this SEO program

The supplied Search Console snapshot showed the site beginning to receive meaningful impressions but with most target queries still far outside the top 10. This is valuable because Google is already testing Atoolix for relevant intents.

### Strongest observed query clusters

1. **Image compression by target size:** 20 KB, 50 KB, 100 KB, including JPG/photo/image variants.
2. **Time zone conversion:** convert time/timezone and timezone conversion variants.
3. **Meeting time:** meeting scheduler, meeting time, time finder, international meeting queries.
4. **Passport photo resizing.**
5. **File/privacy analysis.**
6. **Personal/car/home loan EMI.**
7. **SIP/CAGR/XIRR/FD-related financial queries.**
8. **QR code generation/scanning.**

### Important baseline observations

- Homepage had an observed average position around **7.89** in the supplied period, demonstrating that the domain can already reach page-one visibility for some branded/site-level searches.
- Meeting Time Finder had **54 impressions, 1 click, 1.85% CTR, average position 53.65**.
- 100 KB compressor had **108 impressions, 0 clicks, average position 71.72**.
- Time Zone Converter had **95 impressions, 0 clicks, average position 71.99**.
- 50 KB compressor had **85 impressions, 0 clicks, average position 77.41**.
- 20 KB compressor had **81 impressions, 0 clicks, average position 73.63**.
- ROI Calculator had **54 impressions, 0 clicks, average position 71.46**.
- QR Code Generator had **42 impressions, 0 clicks, average position 78.50**.
- Passport Photo Resizer had **37 impressions, 0 clicks, average position 70.97**.
- File Analyzer had **25 impressions, 0 clicks, average position 60.76**.
- The supplied snapshot previously grouped **Retirement/SIP** together at **22 impressions, 0 clicks, average position 57.36**. This grouping is now treated as ambiguous because the repository confirms SIP and Retirement are separate routes. A fresh Search Console export should be used before assigning that metric to either URL.

These numbers are the historical baseline supplied in the SEO conversations. Future analysis should compare against newer Search Console exports rather than assuming these values remain current.

### Latest Search Console export — 2026-07-15 to 2026-08-23

- **765 impressions, 2 clicks**, with 665 impressions in the final 14 days of the export. This is early discovery evidence for the approximately 45-day-old site, not a basis for judging final ranking potential.
- The active-page opportunity order is now: 100 KB Image Compressor (109 impressions), Time Zone Converter (104), 20 KB Image Compressor (88), 50 KB Image Compressor (87), then Meeting Time Finder (54, 1 click).
- The observed 58 impressions for `/tools/calculator/roi-calculator` belong to a legacy redirect and must not trigger recreation of a standalone ROI page. Continue strengthening the active SIP destination only when current query/page evidence supports it.
- Because the majority of current impressions are in positions 50-100, use this period to improve relevance, user task completion, canonical/indexing clarity, and internal architecture. Do not draw CTR conclusions until pages are competing nearer the first two result pages.

## 5. Completed SEO work / decisions

### Technical foundations

- [x] Repository access established and Git used as implementation source of truth.
- [x] Site-wide SEO audit process established.
- [x] Sitemap issues were audited/fixed during the previous SEO work, including the known `lumpsum-calculator` sitemap type issue.
- [x] Robots.txt/managed robots behavior was reviewed and handled as part of the technical SEO work.
- [x] Canonical URL consistency has been repeatedly checked during tool audits.
- [x] Existing tool URLs are treated as stable unless a genuine migration reason exists.

### Tool/page audits completed

- [x] 100 KB image compression — Search Console intent/content/relevance audit and justified content work.
- [x] 50 KB image compression — validated using the same standard.
- [x] 20 KB image compression — validated using the same standard.
- [x] Time Zone Converter — Search Console intent + content gap + internal link + canonical audit.
- [x] File Analyzer — Search Console intent + content gap + internal link + canonical audit.
- [x] Passport Photo Resizer — Search Console intent + content gap + internal link + canonical audit.
- [x] Additional tool-level SEO reviews were performed across the ongoing audit sequence; continue checking this table and Git history before repeating work.

### Most recent justified changes

- [x] Privacy & Security hub received a contextual, crawlable internal link to `/tools/privacysecurity/file-analyzer` from an "Inspect file metadata" section.
- [x] QR Generator received page-specific metadata aligned to demonstrated generator/scanner intent.
- [x] Personal Loan EMI received page-specific metadata aligned to demonstrated Search Console intent.
- [x] Finance hub received contextual internal-link improvements for ROI and savings-calculator intent.
- [x] Calculator hub SIP internal-link audit identified and corrected a mistaken internal-link change: the visible `SIP Calculator` anchor must point to `/tools/calculator/sip-calculator`, because the repository's tool registry defines that as the SIP Calculator canonical. `/tools/calculator/retirement-calculator` is a separate Retirement Calculator.
- [x] Correction commit: `b038e00cef64051afaa33aeb60c5fae95e34eb49`.

## 6. Current work queue

### Priority 0 — Site-wide integrity

- [ ] Run a fresh full-site route inventory from the latest Git state.
- [ ] Reconcile tool registry vs actual routes vs sitemap URLs vs canonical URLs.
- [ ] Find orphaned indexable pages.
- [ ] Find indexable pages missing from sitemap.
- [ ] Find sitemap URLs that are redirected, non-canonical, `noindex`, or unavailable.
- [ ] Audit every production page for accidental `noindex`/robots/header issues.
- [ ] Audit canonical consistency across every indexable route.
- [ ] Audit duplicate/near-duplicate tool pages and decide whether they need differentiation, consolidation, or no action.
- [ ] Verify `/tools`, category hubs, and important tool pages form a coherent crawl path.
- [ ] Check for accidental query-parameter/indexation variants.

### Priority 1 — Search Console opportunity pages

Process in descending opportunity, not arbitrary order:

- [ ] Image compression target-size cluster.
- [ ] Time zone conversion cluster.
- [ ] Meeting-time cluster.
- [ ] Passport photo cluster.
- [ ] File Analyzer/privacy cluster.
- [ ] Personal/car/home loan EMI cluster.
- [ ] SIP/CAGR/XIRR/FD cluster.
- [ ] QR generator/scanner cluster.
- [ ] Remaining pages with meaningful impressions but positions >10.

For each page use the standard audit:

**Search Console intent → SERP intent/context → content gap → UX/tool capability → internal links → canonical → sitemap/indexability → title/H1/meta → structured data eligibility → performance/accessibility → implement only justified changes → validate → commit if justified → record here.**

### Priority 2 — Internal-link graph

- [ ] Build a complete hub → category → tool → related-tool linking map.
- [ ] Identify high-value pages with too few contextual internal links.
- [ ] Add links only where they help users understand or continue a task.
- [ ] Avoid repeating the same anchor excessively.
- [ ] Ensure new internal links always target canonical URLs.

### Priority 3 — Content quality

- [ ] Audit every indexable tool page for unique value.
- [ ] Identify thin or overly templated sections.
- [ ] Improve only where the content does not fully satisfy observed intent.
- [ ] Add original explanations based on actual Atoolix functionality.
- [ ] Add useful examples/use cases where they materially improve task completion.
- [ ] Remove filler/repetition when discovered.
- [ ] Keep privacy/security/financial claims precise and supportable.

### Priority 4 — Search appearance

- [ ] Audit titles/H1/meta descriptions across all important pages.
- [ ] Prioritize pages with impressions + poor CTR + positions where an improved result snippet can realistically help.
- [ ] Do not rewrite titles solely to chase exact-match keywords.
- [ ] Compare query intent against the actual visible result title/content.

### Priority 5 — Performance & UX

- [ ] Re-run Lighthouse/PageSpeed checks on priority templates.
- [ ] Track Core Web Vitals.
- [ ] Reduce unnecessary JavaScript on tool pages where practical.
- [ ] Check mobile task completion and layout stability.
- [ ] Verify SEO improvements do not make the tool slower.

## 7. Standard per-page audit template

Every future priority-page audit should answer all of these before changing code:

### 7.1 Search Console intent

- What queries generate impressions?
- Which query cluster is dominant?
- What is the average position?
- Are impressions increasing/decreasing?
- Is CTR reasonable for the current position?
- Is Google testing the page for an intent different from the intended target?

### 7.2 Search intent/content gap

- What does the user actually want?
- Does the tool solve it immediately?
- Is the explanation accurate and unique?
- What important question/use case is missing?
- Is any content redundant or filler?
- Does the page clearly communicate supported formats, constraints, privacy, calculations, or output behavior as applicable?

### 7.3 Internal links

- Which hubs link to this page?
- Which related tools should link to it?
- Are anchors descriptive?
- Are links contextual and useful?
- Is the page effectively orphaned?

### 7.4 Canonical/indexability

- Is the URL canonical?
- Does sitemap contain the same URL?
- Does internal linking use the same URL?
- Is it indexable?
- Could another URL be competing with it?
- Does Google select the expected canonical?

### 7.5 On-page SEO

- Title
- H1
- Heading hierarchy
- Meta description
- Visible introductory copy
- Tool-specific terminology
- Image/alt accessibility
- Structured data eligibility

### 7.6 Technical/UX

- HTTP status
- Rendered HTML
- robots
- noindex
- JS dependency
- mobile UX
- performance
- accessibility

### 7.7 Decision

Use one of:

- **NO CHANGE — already strong.**
- **CONTENT CHANGE — genuine relevance/usefulness gap.**
- **INTERNAL LINK CHANGE — genuine discovery/context gap.**
- **TECHNICAL CHANGE — genuine crawl/index/canonical issue.**
- **CTR CHANGE — genuine snippet/title mismatch.**
- **CONSOLIDATION/REDIRECT — genuine duplicate/URL problem.**

Never make a change merely because an SEO checklist has an empty box.

## 8. Change-validation protocol

Before commit:

1. Inspect the latest Git state.
2. Confirm no later commit already fixed the issue.
3. Confirm the target URL and architecture are still correct.
4. Make the smallest justified change.
5. Review the exact diff.
6. Check for TypeScript/React/Next.js issues introduced by the change.
7. Validate metadata/canonical/link/sitemap behavior as applicable.
8. Validate that no unrelated files changed.
9. Commit with a precise message.
10. Record the commit and result in this roadmap.

After deployment:

1. Confirm production HTML and canonical.
2. Confirm HTTP status and indexability.
3. Confirm sitemap presence when applicable.
4. Confirm important internal links resolve.
5. Use Search Console URL Inspection for priority URLs when appropriate.
6. Allow Google sufficient time to recrawl/reprocess before judging ranking impact.
7. Compare Search Console metrics against the pre-change baseline.

## 9. What we explicitly will NOT do

- [ ] Do not buy links or participate in link schemes.
- [ ] Do not mass-submit to search engines.
- [ ] Do not generate hundreds of near-identical keyword pages.
- [ ] Do not create doorway pages.
- [ ] Do not add fake reviews/ratings.
- [ ] Do not fabricate authorship, expertise, or claims.
- [ ] Do not add deprecated rich-result markup just for perceived ranking value.
- [ ] Do not stuff keywords into visible or hidden text.
- [ ] Do not hide SEO text from users.
- [ ] Do not change URLs without a migration reason.
- [ ] Do not use third-party SEO scores as the decision authority.
- [ ] Do not assume a ranking position can be guaranteed.

## 10. Long-term growth strategy

### Phase 1 — Technical integrity

Make crawling, indexing, canonicalization, sitemap, robots, redirects, status codes, and architecture reliable.

### Phase 2 — Existing-demand capture

Use Search Console data to improve pages Google is already testing. This is the highest-confidence near-term opportunity because the site already has impressions for relevant queries.

### Phase 3 — Topic authority through useful tools

Strengthen coherent clusters such as:

- Image compression/conversion/resizing
- Date/time/time-zone tools
- Privacy/file analysis
- Finance calculators
- QR tools
- PDF tools

Each cluster should have clear hubs, strong tools, contextual internal links, and genuinely differentiated content.

### Phase 4 — SERP improvement

Once pages move into positions roughly 5–20, prioritize intent alignment, titles/snippets, content completeness, internal authority, and UX rather than blindly rewriting everything.

### Phase 5 — Authority and reputation

Pursue legitimate mentions, useful partnerships, product/community exposure, and links earned because Atoolix is genuinely useful. Avoid scalable link manipulation.

### Phase 6 — Continuous optimization

Search Console → identify opportunity → inspect page → identify genuine gap → smallest useful change → validate → commit → deploy → monitor → repeat.

## 11. Tracking table

| Task | Area | Status | Evidence/Result | Commit |
|---|---|---|---|---|
| Sitemap integrity | Technical | ✅ Historical fixes completed | Known sitemap issues addressed during prior audit | Git history |
| Robots/indexability review | Technical | ✅ Reviewed | Managed robots/noindex behavior investigated | Git history |
| 100 KB compressor | Content/intent | ✅ Audited | Search Console demand identified and page reviewed | Git history |
| 50 KB compressor | Content/intent | ✅ Validated | Same standard applied | Git history |
| 20 KB compressor | Content/intent | ✅ Validated | Same standard applied | Git history |
| Time Zone Converter | Content/internal/canonical | ✅ Audited | Intent/content/internal-link/canonical review | Git history |
| File Analyzer | Content/internal/canonical | ✅ Audited | Search Console + content + internal-link + canonical review | Git history |
| Passport Photo Resizer | Content/internal/canonical | ✅ Audited | Search Console + content + internal-link + canonical review | Git history |
| Privacy hub → File Analyzer | Internal links | ✅ Completed | Added contextual crawlable link | `a2426c7f99e41d95d22526b2270b4543b9274e2a` |
| QR generator metadata | Search appearance | ✅ Completed | Intent-aligned title/description | `28888b6910b9e67ad5b0f291760cb008938121c6` |
| Personal Loan EMI metadata | Search appearance | ✅ Completed | Intent-aligned title/description | `9232d6793e41ddcada5e885d617cd7a9a1a7fcbf` |
| Finance hub ROI context | Internal links | ✅ Completed | Added contextual ROI link/explanation | `15816869a185104b1eed7e298358e585418f2c62` |
| Finance hub savings context | Content/internal | ✅ Completed | Added savings-calculator intent context | `2a056d7427425113b08e08899ddeb2c6526c10bc` |
| Calculator hub SIP link | Canonical/internal link | ✅ Corrected | Restored direct link to registered SIP canonical; retirement is separate | `b038e00cef64051afaa33aeb60c5fae95e34eb49` |
| Full route ↔ sitemap ↔ canonical reconciliation | Technical | ⏳ Next | Pending fresh latest-Git audit | — |
| Full orphan-page audit | Architecture | ⏳ Pending | — | — |
| Full title/H1/meta audit | On-page | ⏳ Pending | — | — |
| Full internal-link graph audit | Architecture | ⏳ Pending | — | — |
| Full structured-data eligibility audit | Technical | ⏳ Pending | — | — |
| Full Core Web Vitals audit | Performance | ⏳ Pending | — | — |
| Full accessibility/SEO audit | UX | ⏳ Pending | — | — |
| Remaining Search Console opportunity pages | Content | ⏳ Ongoing | Prioritize by impressions/position/intent | — |

## 12. Decision log

### 2026-08-23 — Central roadmap created

Created this document as the central SEO source of truth so future conversations/models can continue from the same plan without reconstructing decisions.

### 2026-08-23 — Privacy hub internal-link improvement

Added a contextual crawlable link from the Privacy & Security hub to the File Analyzer because the relationship is directly relevant to users inspecting file metadata. No canonical or sitemap change was justified.

### 2026-08-23 - SIP vs Retirement URL clarification

A site-wide internal-link audit exposed an incorrect assumption in the tracking documentation: the repository's actual tool registry defines `/tools/calculator/sip-calculator` as the SIP Calculator canonical and `/tools/calculator/retirement-calculator` as a separate Retirement Calculator. The production SIP link was restored to `/tools/calculator/sip-calculator`. Future Search Console analysis must not combine those routes without fresh evidence.

### 2026-08-23 - Fresh Search Console export evaluated

Evaluated the Web performance export for 2026-07-15 to 2026-08-23. The data confirms meaningful early discovery growth, prioritizes the active image target-size and time-zone pages, and confirms that the legacy ROI URL must not be treated as an active content opportunity.

## 13. Success measurement

The ultimate goal is **qualified organic traffic and users successfully completing tasks**, with top-5 rankings as a strategic target for relevant queries.

Primary metrics:

- Organic clicks
- Organic impressions
- Average position
- CTR by query/page
- Number of relevant queries in top 5
- Number of relevant queries in top 10
- Number of priority pages receiving impressions
- Index coverage/valid indexed URLs
- Google-selected canonical consistency
- Core Web Vitals
- Tool engagement/task completion

Secondary indicators:

- Internal-link coverage
- Crawl/index errors
- Search-result appearance quality
- Returning organic users
- Growth of non-branded relevant queries

## 14. How future chats/models must use this file

Before proposing or implementing SEO work:

1. Read `SEO_ROADMAP.md`.
2. Check the latest Git commit and relevant file history.
3. Check the completed-task table to avoid repeating work.
4. Use the standard per-page audit template.
5. Check current Search Console evidence supplied by the user or available through connected tools.
6. Compare against current Google Search Central guidance.
7. Make only justified changes.
8. Update this roadmap after meaningful completed work.
9. Record the commit hash and outcome.
10. Continue with the highest-value remaining item instead of inventing a new strategy.

**This file is the central SEO planning/tracking document. Git remains the source of truth for the actual implementation. Google Search Central remains the authority for SEO guidance.**

## 15. Official Google guidance used as the baseline

- Google Search Central documentation and Search Essentials.
- Google guidance on crawlability, indexing, canonicalization, sitemaps, links, helpful people-first content, page experience, structured data, and Search Console.
- Current documentation should always be rechecked before making a significant SEO decision because Google updates its documentation and search systems over time.
