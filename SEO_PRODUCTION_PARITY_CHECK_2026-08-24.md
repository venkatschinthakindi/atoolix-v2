# SEO Production Parity Check — 2026-08-24

## Purpose
- Establish whether live Atoolix production is serving the current `main` source before making further SEO code changes.

## Repository state
- Current execution branch: `main`.
- Current `main` validation-sync commit: `26e86673d682c0224c77aa90f7b0df8dd864b760`.
- The deployment workflow is configured to run on every push to `main`, then build, archive, upload and switch the VPS `current` symlink before restarting `atoolix.service`.
- The available GitHub connector does not expose the push-triggered deployment run for direct inspection, so the deployed release commit cannot yet be independently verified from GitHub Actions.

## Live production evidence
- Current indexed/crawled Documentation output still exposes the legacy `JPG to PDF`, `PNG to PDF`, and `WebP to PDF` documentation sections/related-tool labels.
- Current repository source `src/app/documentation/page.tsx` was independently verified clean and does not contain those legacy internal hrefs; it points to the consolidated Image-to-PDF destination.
- Therefore a production/source mismatch remains plausible, but the exact deployed commit/version has NOT been established. Do not claim deployment staleness as proven yet.

## Validation limitation
- Direct raw HTTP access to `atoolix.com` from the available web execution path could not retrieve `robots.txt` or `sitemap.xml` directly, and the Documentation page was served from a search-engine crawl snapshot rather than a guaranteed current origin response.
- Therefore live HTTP status/header validation for `robots.txt`, `sitemap.xml`, redirects, canonical, robots metadata and OG metadata remains pending.

## Decision
- No application SEO code change is justified at this checkpoint.
- Do not repeat the Documentation internal-link edit; repository source is already correct.
- Do not reopen the Image-to-PDF consolidation.
- Do not claim production parity or staleness until a deployed release/version can be directly identified.

## Google-aligned validation principles
- Keep canonical, sitemap, redirects and internal links consistent.
- Use the preferred canonical URL for internal links.
- Treat canonical declarations as signals rather than guarantees.
- Validate the deployed page rather than assuming repository source equals production output.

## Anti-loop
- This file records the new production-parity evidence so the same investigation is not repeated without new evidence.
