# Atoolix SEO Roadmap — Google Guidance Refresh (2026-08-23)

> This addendum is part of the central SEO tracking system. `SEO_ROADMAP.md` remains the primary roadmap and decision source. This file records Google Search Central guidance changes/rechecks that must be incorporated into every future SEO decision so no current Google recommendation is missed.

## Operating rule

Before every meaningful SEO implementation, re-check current Google Search Central documentation. Google updates its documentation and Search systems over time; do not treat an old checklist, third-party SEO score, or historical recommendation as authoritative.

## Newly confirmed / strengthened Google requirements to track

### 1. Canonicalization is a hint, not a command

- [ ] Treat `rel="canonical"` as a preference signal, not a guarantee.
- [ ] For priority pages, compare the preferred canonical with Google's selected canonical in Search Console when available.
- [ ] If Google selects a different canonical, investigate content similarity and all canonical signals rather than simply adding another canonical tag.
- [ ] Keep redirects, sitemap URLs, internal links, HTTPS, and canonical declarations aligned.
- [ ] When pages are clustered as duplicates, make genuinely distinct pages materially different when they have distinct user intent rather than forcing canonicalization.
- [ ] Allow time for Google to re-evaluate canonical changes; do not judge immediately after deployment.

Google's current canonicalization documentation states that canonicalization selects the representative URL and that canonical declarations are hints; Google can choose another URL based on its collected signals. citeturn0search0turn0search1

### 2. JavaScript canonical consistency

- [ ] Ensure canonical signals in the original HTML and rendered page do not conflict.
- [ ] Avoid relying on client-side JavaScript to correct a contradictory initial canonical where possible.
- [ ] Check canonical behavior after rendering for Next.js pages.

Google's documentation updates specifically clarified canonicalization behavior around JavaScript in January 2026. citeturn0search2

### 3. People-first content remains the priority

- [ ] Do not create content solely because a keyword tool says a phrase exists.
- [ ] Do not expand pages simply to hit a word-count target.
- [ ] Prioritize first-hand usefulness, accurate tool explanations, real functionality, limitations, examples, and task completion.
- [ ] When Search Console exposes many similar query variants, solve the underlying intent rather than creating one page per variation.
- [ ] Treat AI-assisted writing as an implementation method only; quality, originality, accuracy, and user value remain the standard.

### 4. Google guidance on third-party SEO tools

- [ ] Third-party SEO tools can help discover opportunities but cannot override Google Search Central guidance.
- [ ] Never implement a recommendation merely because an SEO tool reports a score or missing field.
- [ ] Verify the underlying recommendation against official Google documentation and the actual Atoolix user experience.

Google added explicit guidance in 2026 on evaluating third-party SEO tools, services, and advice. citeturn0search4turn0search3

### 5. Structured data must be eligibility-driven

- [ ] Use structured data only when it accurately describes visible page content and the page qualifies for the relevant Google feature.
- [ ] Validate markup after template changes.
- [ ] Monitor Search Console rich-result reports after structured-data deployments.
- [ ] Do not add deprecated rich-result types simply because schema.org still supports them.
- [ ] Never fabricate reviews, ratings, authors, or other entities.

Google recommends monitoring structured-data reports after first deployment and after template changes, and does not guarantee that valid markup will produce a rich result. citeturn0search5turn0search6

### 6. FAQ rich-result planning must reflect 2026 reality

- [ ] Do not assume FAQ structured data will produce FAQ rich results.
- [ ] FAQ content may still be useful to users when genuinely relevant, but do not add FAQ sections solely for a deprecated search appearance.

Google deprecated FAQ rich results in May 2026. citeturn0search2

### 7. AI Overviews / AI Mode

- [ ] Continue applying normal Google SEO fundamentals rather than creating a separate keyword-stuffed "AI SEO" layer.
- [ ] Prioritize original/non-commodity value, clear answers, useful tools, strong site architecture, and trustworthy information.
- [ ] Monitor Search Console performance because AI Overviews are included in Search Console performance reporting.

Google's 2026 documentation updates explicitly state that normal SEO best practices remain relevant for AI search features. citeturn0search2

### 8. Preferred sources / brand discovery

- [ ] Consider whether Atoolix has opportunities to become a preferred source as brand recognition grows.
- [ ] Do not manipulate this feature or create content solely for it.
- [ ] Continue building useful, distinctive resources that users would naturally prefer.

Google expanded preferred sources to AI Mode and AI Overviews in 2026. citeturn0search2

## Minor SEO opportunities that must never be skipped

The following are explicitly tracked because small improvements can compound over time:

- [ ] Descriptive internal anchor text.
- [ ] Direct links to canonical URLs.
- [ ] No orphaned priority pages.
- [ ] Correct alt text where images contribute meaning.
- [ ] Accessible names for tool controls.
- [ ] Accurate titles and H1s.
- [ ] Accurate meta descriptions where they can improve qualified clicks.
- [ ] Consistent canonical/sitemap/internal-link URL spelling.
- [ ] No accidental duplicate URL variants.
- [ ] Accurate privacy/security statements.
- [ ] Accurate financial-calculator assumptions and limitations.
- [ ] No unsupported guarantees.
- [ ] No stale SEO copy after a tool feature changes.
- [ ] No unnecessary JavaScript blocking primary content/task completion.
- [ ] No unnecessary third-party scripts.
- [ ] No performance regression caused by SEO/content work.
- [ ] Mobile task flow remains clear.
- [ ] Search Console changes are recorded against a baseline.

## Mandatory future workflow update

For every future SEO task:

1. Read `SEO_ROADMAP.md`.
2. Read this Google guidance addendum.
3. Check the latest Git commit.
4. Check prior completed work before proposing a duplicate change.
5. Check current Search Console evidence.
6. Re-check the applicable Google Search Central documentation if the decision involves a current/changed feature.
7. Audit technical integrity, intent, content, internal links, canonical, sitemap, structured data, accessibility, performance, and UX as applicable.
8. Address every genuine issue found, including small issues, while avoiding speculative changes.
9. Validate the implementation.
10. Commit only justified code changes.
11. Update the roadmap/tracking record after the work.
12. Continue with the highest-value remaining opportunity.

## Current Google-source checkpoints

- Canonicalization and troubleshooting: Google Search Central canonicalization documentation.
- Current Search documentation changes: Google Search Central documentation updates.
- Structured data monitoring: Google Search Central structured-data documentation.
- SEO/third-party recommendation evaluation: Google Search Central SEO guidance.

These sources must be rechecked when a future task depends on a feature whose Google guidance may have changed.
