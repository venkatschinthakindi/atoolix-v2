# Related Tools Internal-Link SEO Audit — 2026-08-23

## Scope

Audit the active related-tools implementation after the Image-to-PDF cleanup, using current Google Search guidance as the standard for internal links, canonical consolidation and crawlable site architecture.

## Google guidance applied

Google recommends making internal links crawlable, using descriptive anchor text, and updating internal links when URLs are migrated so users and crawlers are sent directly to the preferred destination. Google also says redirects, sitemap inclusion and canonical annotations are signals used together when selecting a canonical URL. Canonical is a hint, not a guarantee.

Current guidance checked on 2026-08-23:

- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/crawling-indexing/canonicalization

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

## Decision

**Generic related-tool navigation is now active-only by default.**

Do not mass-edit the entire `relatedTools` registry blindly. Dedicated clusters remain contextual and should only be changed where a target is demonstrably archived, coming-soon, redirect-only, broken, or otherwise irrelevant.

## Source change

File:

`src/app/tools/[...toolId]/Relatedtools.tsx`

Change:

```ts
includeArchived = false,
includeComingSoon = false,
```

Commit:

`93cf6c57c456fb7843efad25d431edc9e5cdf1d2` — `seo: make related-tool links active-only by default`

## Current status

### Completed

- [x] Image-to-PDF cluster points only to active destinations.
- [x] Legacy JPG/JPEG PDF routes are no longer promoted by that cluster.
- [x] Related links use descriptive anchor names.
- [x] Dedicated image-converter cluster uses active conversion destinations.
- [x] Target-size compressor cluster is intentionally contextual rather than a full cross-link matrix.
- [x] Finance cluster uses small contextual groups rather than indiscriminate all-to-all linking.
- [x] Generic related-tool fallback now excludes archived destinations by default.
- [x] Generic related-tool fallback now excludes coming-soon destinations by default.
- [x] MD audit synchronized with the source change.

### Remaining

- [ ] Audit every explicit `relatedTools` registry relationship against current `archived`, `comingSoon`, canonical and redirect state.
- [ ] Run build/type/lint validation after the source change.
- [ ] Validate rendered internal links in production after deployment.
- [ ] Validate representative canonical/redirect behavior in production.

## Next planned SEO work

Continue the planned site-wide route → registry → canonical → sitemap → internal-link reconciliation. Then move to the planned Next.js rendering/performance SEO audit.

No keyword-variant pages, artificial link networks, doorway pages, or speculative content changes should be introduced.
