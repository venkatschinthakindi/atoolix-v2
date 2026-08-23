# SEO Execution Addendum — Registry Reconciliation — 2026-08-23

## Current state

The user confirmed the Next.js production build now succeeds after the CommandPalette TypeScript union-narrowing fix.

The next Google-first SEO task is the explicit related-tools registry/documentation reconciliation.

## New confirmed defect

`src/data/tools.ts` still contains explicit `relatedTools` references to archived PDF-format routes:

- `image/jpg-to-pdf`
- `image/png-to-pdf`
- `image/webp-to-pdf`

The archived entries are intentionally retained for compatibility/migration behavior. They must not be promoted as active standalone products.

The live `/documentation` page was also checked and currently exposes those legacy PDF-format destinations as crawlable internal links. This is a confirmed internal-link consistency issue because the site's current SEO decision is to consolidate those intents into the active Image-to-PDF page.

## Google-first rationale

Google's current site-move guidance recommends updating internal links to the new/preferred URLs after URL changes and avoiding unnecessary redirects. Google's canonicalization guidance also explains that substantially similar URLs can be clustered and that the canonical page should be the most representative/useful version.

Therefore:

- Keep archived routes for compatibility where needed.
- Do not index them as separate products.
- Do not link to them from active/public documentation when a direct preferred destination exists.
- Use the active `/tools/image/image-to-pdf` page for consolidated JPG/JPEG/PNG/WebP-to-PDF intent.

## Existing correct implementation to preserve

The curated Image-to-PDF related-tools cluster already links directly to:

- Merge PDF
- Split PDF
- Compress PDF
- File Privacy & Security Checker

The generic RelatedTools fallback is also active-only by default.

## Next source change

Perform a targeted cleanup of:

1. Active `relatedTools` relationships that reference archived PDF-format routes.
2. Public documentation entries that expose archived PDF-format pages as standalone active tools.
3. Any remaining active internal-link surfaces that point to the legacy PDF-format URLs.

Do not mass-delete archived registry entries or change their compatibility redirects.

## Validation required

- [ ] TypeScript/build
- [ ] Lint
- [ ] Crawlable-link search across repository
- [ ] Production documentation links
- [ ] Production legacy redirects
- [ ] Canonical validation
- [ ] Sitemap/robots validation
- [ ] Google URL Inspection after deployment

## Strategic target

The strategic target remains top-5 visibility through technically correct, useful, differentiated pages and legitimate authority growth. Ranking position is not guaranteed by any individual technical change.

## Source

Dedicated audit:
`SEO_RELATED_TOOLS_REGISTRY_RECONCILIATION_2026-08-23.md`

Documentation commit:
`810f2f0e09cc2335e882d1ef4124fef8f94a57ae`
