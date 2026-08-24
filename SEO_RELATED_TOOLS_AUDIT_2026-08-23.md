# Related Tools Internal-Link SEO Audit — 2026-08-23

## Scope

Audit the active related-tools implementation after the Image-to-PDF cleanup, using current Google Search guidance as the standard for internal links, canonical consolidation and crawlable site architecture.

## Google guidance applied

Google recommends making internal links crawlable, using descriptive anchor text, and updating internal links when URLs are migrated so users and crawlers are sent directly to the preferred destination. Google also says redirects, sitemap inclusion and canonical annotations are signals used together when selecting a canonical URL. Canonical is a hint, not a guarantee.

Current guidance rechecked on 2026-08-24:

- Google Search Central canonicalization guidance: https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Google Search Central site-move guidance: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- Google Search Central latest documentation updates: https://developers.google.com/search/updates

## Latest implementation inspected

`src/app/tools/[...toolId]/Relatedtools.tsx`

The component has an explicit active Image-to-PDF cluster:

- Merge PDF
- Split PDF
- Compress PDF
- File Privacy & Security Checker

This correctly removes the previously identified JPG/PNG/WebP PDF variant routes from active Image-to-PDF navigation.

The implementation also has dedicated clusters for image converters, target-size image compressors, and finance calculators. The clusters use descriptive names such as `PNG to JPG`, `Compress Image to 50 KB`, and `SIP Calculator` rather than generic `click here` style anchors.

## Generic fallback finding and resolution

The generic fallback previously defaulted to:

- `includeArchived = true`
- `includeComingSoon = true`

The filtering logic already supported excluding those targets, but the permissive defaults meant a registry-driven fallback could surface archived or coming-soon entries unless the caller explicitly opted out.

The latest source change now defaults to:

```ts
includeArchived = false,
includeComingSoon = false,
```

This makes the normal related-navigation behavior active-only. A caller that genuinely needs an archived or coming-soon item must now explicitly opt in.

## Why this is the correct SEO behavior

This is a consistency fix between the registry/indexability model and internal navigation, not an attempt to increase page count or link count.

The repository's current SEO policy is:

- archived tools: noindex + excluded from sitemap
- coming-soon tools: not indexable / excluded from sitemap
- legacy URLs with a valid replacement: permanent redirect to the final active destination
- active internal links: prefer the final active canonical destination directly

Google's current site-move guidance recommends updating internal links after URL changes and avoiding unnecessary redirect chains. Google also uses redirects, sitemap inclusion and canonical annotations together as canonicalization signals. Keeping normal active navigation focused on current destinations therefore gives users and crawlers a cleaner path through the site.

## Caller validation

Repository searches for `RelatedTools(`, `includeArchived`, and `includeComingSoon` did not reveal separate caller-level overrides requiring the previous permissive defaults. The dynamic tool rendering path is the primary usage pattern.

The new default is therefore a safe, conservative behavior change: it does not remove curated active clusters, and it only prevents the generic registry fallback from surfacing non-active entries by default.

## Full explicit registry relationship audit — 2026-08-24

The `tools` registry was checked against its current `archived` state and the known canonical/redirect policy. The confirmed archived registry targets are:

- `image/jpg-to-pdf`
- `image/png-to-pdf`
- `image/webp-to-pdf`
- `image/compress-jpg`
- `image/compress-png`
- `image/compress-webp`

### Confirmed active-source bad relationships

One active registry relationship is confirmed to target archived tools:

- `image/compress-image` → `image/compress-jpg`
- `image/compress-image` → `image/compress-png`
- `image/compress-image` → `image/compress-webp`

These three targets are explicitly `archived: true` in the registry. The active compressor page therefore contains stale registry relationships even though the dedicated `IMAGE_COMPRESSOR_CLUSTER` in `Relatedtools.tsx` currently takes precedence for the rendered compressor cluster and already links to active target-size/compressor destinations.

### Archived-source relationships

The archived PDF-format entries reference other archived PDF-format entries, and the archived compressor-format entries reference other archived compressor-format entries. These are historical relationships inside already archived entries, not active-source navigation opportunities.

Examples confirmed in the registry:

- `image/jpg-to-pdf` references `image/png-to-pdf` and `image/webp-to-pdf`.
- `image/png-to-pdf` references `image/jpg-to-pdf` and `image/webp-to-pdf`.
- `image/webp-to-pdf` references `image/jpg-to-pdf` and `image/png-to-pdf`.
- `image/compress-jpg` references `image/compress-png` and `image/compress-webp`.
- `image/compress-png` references `image/compress-jpg` and `image/compress-webp`.
- `image/compress-webp` references `image/compress-jpg` and `image/compress-png`.

These do not justify reopening or reactivating the archived pages. They should be cleaned only as part of a deliberate registry consistency patch, not by changing archive state.

### No coming-soon relationship defect found

The current registry contains no `comingSoon: true` entries, so no active → coming-soon relationship defect was identified in this audit.

### Important implementation distinction

The three active-source stale relationships above are **confirmed registry defects**, but they are not currently rendered by the dedicated compressor cluster because the dedicated cluster takes precedence over the generic registry relationship. Therefore this is a low-risk cleanup opportunity rather than evidence of an immediately visible production internal-link defect.

## Decision

**Do not change application code yet.**

The audit has now produced the exact confirmed active-source registry defects. The SEO-preferred cleanup is to remove the three archived compressor targets from `image/compress-image` while preserving the active dedicated compressor cluster.

No archived page should be reactivated. No keyword-variant pages should be created. No artificial cross-linking should be added.

## Source change status

- [x] Generic related-tool fallback already excludes archived tools by default.
- [x] Generic related-tool fallback already excludes coming-soon tools by default.
- [x] Active Image-to-PDF cluster already avoids archived PDF variants.
- [x] Full registry audit reached the point of confirmed active-source defects.
- [x] Exact confirmed stale relationships recorded in this MD.
- [ ] Remove the three archived compressor references from `image/compress-image`.
- [ ] Run build/type/lint validation after the registry cleanup.
- [ ] Validate rendered related links in production after deployment.
- [ ] Validate representative canonical/redirect behavior in production.

## Next action in chat

**Make the minimal registry-only cleanup: remove `image/compress-jpg`, `image/compress-png`, and `image/compress-webp` from `image/compress-image.relatedTools`, without changing any archive state or unrelated relationships. Then synchronize this MD, validate CI/build, and perform production link validation.**

No keyword-variant pages, artificial link networks, doorway pages, or speculative content changes should be introduced.
