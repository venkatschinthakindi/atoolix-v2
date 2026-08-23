# SEO Branch Synchronization — 2026-08-23

## Branch validation

The historical `seo/gsc-opportunity-optimization` branch diverged from `main`.

- `main` advanced with the cleanup commit that removed an unintended SEO log from main.
- The SEO branch retained 11 commits from the earlier SEO workstream and was 2 commits behind current `main`.
- A full branch merge was **not** applied because its current diff also removes centralized metadata overrides and specialized EMI H1/description handling that are still required by the current application architecture.

## Safe changes carried forward

The validated SEO changes retained for `main` are:

1. Image hub contextual links for the distinct 20 KB, 50 KB, and 100 KB upload-size intents.
2. Sitemap exclusion of archived tools so sitemap entries stay aligned with the site's `noindex` behavior for archived routes.

The existing metadata implementation on `main` remains unchanged, including the specialized search-intent metadata already present for priority tools.

## Google Search guidance

- Keep sitemap and indexing signals consistent.
- Use descriptive internal links and anchor text.
- Avoid merging a branch change that would regress useful page-specific metadata or H1 handling.
- Prefer people-first, useful content over keyword-only changes.

## Production

No production deployment or hosting configuration change was performed by this synchronization work.

## Next

Continue SEO implementation from the cleaned `main` baseline. The old GSC branch should be rebased/reset to the resulting `main` state after the safe changes are merged so it does not remain a source of stale or regressive changes.
