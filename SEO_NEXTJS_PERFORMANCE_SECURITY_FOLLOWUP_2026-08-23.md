# Next.js Rendering / Performance / Security Follow-up — 2026-08-23

## Purpose

Follow the planned Next.js rendering/performance audit using Google Search guidance and avoid speculative performance rewrites.

## Evidence from latest `main`

- The tool route is server-rendered through the App Router.
- SEO content is dynamically imported without intentionally disabling SSR, so the audit found no evidence that the primary SEO content is hidden behind client-only rendering.
- Tool implementations are dynamically imported/code-split rather than loading every tool implementation into one client bundle.
- Shared loaders are reused for related image/PDF functionality.
- Shared metadata plus route-specific overrides remain a maintenance complexity; no blind consolidation was made because rendered-output parity must be proven first.

## Google guidance applied

Google's JavaScript SEO documentation says Google can render JavaScript, but important content should remain accessible and crawlable. Google also recommends testing the rendered result rather than assuming that source code alone represents what Google sees.

Google's page-experience documentation identifies Core Web Vitals as useful signals: LCP, INP and CLS. They should be measured on real pages rather than optimizing arbitrary code based only on bundle appearance.

Official guidance checked on 2026-08-23:

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/appearance/page-experience
- https://developers.google.com/search/docs/crawling-indexing/overview

## New security/performance observation

The repository's `package.json` declares Next.js as `^16.2.9`.

Current Next.js security guidance should be checked before changing the framework version. A framework upgrade is not being applied in this audit because the lockfile version must be verified and the application must be build-tested before changing the dependency. A partial `package.json`-only change would risk making `npm ci` inconsistent with the lockfile.

**Decision: no dependency change in this execution.**

This is intentional: security/performance work must be applied as a complete, tested dependency update rather than an unverified version bump.

## Performance change policy

No speculative removal of:

- React Compiler
- dynamic imports
- shared loaders
- UI libraries
- rendering modes
- caching behavior

was made.

The next performance decision requires measurements from a production build/rendered page, including:

1. LCP
2. INP
3. CLS
4. initial JS transferred
5. route-specific JS chunks
6. rendered HTML size
7. Lighthouse/PageSpeed results
8. real-user data where available

## SEO significance

The current rendering architecture does not show a confirmed blocker to indexing the primary tool content. Therefore the SEO priority is to preserve crawlable server-rendered content while reducing only measured performance bottlenecks.

A faster page is useful, but speed changes must not remove visible primary content, structured data, canonical signals, internal links or accessible tool functionality.

## Next action

1. Verify the exact installed Next.js version from `package-lock.json`.
2. Check the current supported/security-safe Next.js patch line.
3. If an update is required, update `package.json` and `package-lock.json` together.
4. Run the production build/type validation.
5. Measure representative high-value routes before and after.
6. Keep only changes that improve the measured result without degrading SEO/rendering.
7. Validate production HTML, canonical, robots, structured data and Core Web Vitals after deployment.

## Status

**Rendering architecture:** audited / no confirmed SEO rendering defect.

**Performance:** measurement required before source optimization.

**Dependency security:** follow-up required; no partial dependency change made.

**SEO MD synchronization:** this document records the follow-up and preserves the central execution plan without overwriting historical audit information.
