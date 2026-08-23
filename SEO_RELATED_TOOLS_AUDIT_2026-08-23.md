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

The component now has an explicit active Image-to-PDF cluster:

- Merge PDF
- Split PDF
- Compress PDF
- File Privacy & Security Checker

This correctly removes the previously identified JPG/PNG/WebP PDF variant routes from active Image-to-PDF navigation.

The implementation also has dedicated clusters for image converters, target-size image compressors, and finance calculators. The clusters use descriptive names such as `PNG to JPG`, `Compress Image to 50 KB`, and `SIP Calculator` rather than generic `click here` style anchors.

## Important remaining finding

The generic fallback path in `RelatedTools` currently defaults:

- `includeArchived = true`
- `includeComingSoon = true`

When no explicit cluster is present and no explicit `items` prop is supplied, the component can therefore resolve `currentTool.relatedTools` and include archived or coming-soon registry entries.

The filtering logic itself is correct when the flags are false, but the defaults do not enforce the site's current SEO policy of keeping active internal navigation focused on active destinations.

## Why this matters

This is not a reason to create more pages or links. It is a consistency issue between the registry/indexability model and internal navigation.

The repository's current SEO policy is:

- archived tools: noindex + excluded from sitemap
- coming-soon tools: not indexable / excluded from sitemap
- legacy URLs with a valid replacement: permanent redirect to the final active destination
- active internal links: prefer the final active canonical destination directly

Google's site-move guidance specifically recommends updating internal links after URL changes and avoiding unnecessary redirect chains. Keeping active related-tool navigation pointed at archived or redirect-only destinations would work against that goal.

## Decision

**Do not mass-edit the entire `relatedTools` registry blindly.**

The dedicated clusters are intentionally contextual and should remain intact where their targets are active and useful.

The next code-level fix should change the generic `RelatedTools` defaults to:

```ts
includeArchived = false,
includeComingSoon = false,
```

This is the safer default because callers that genuinely need a non-indexable/coming-soon destination can opt in explicitly, while normal SEO navigation remains active-only by default.

Before applying that source edit, the call sites should be enumerated to verify that no intentional caller relies on the current permissive defaults. The repository search performed in this pass did not expose a reliable complete caller list because the component is used through the application's dynamic tool rendering path.

## Do not change yet

No source change is being made for the default flags in this execution because the current connector's code-search result does not provide a complete caller inventory. Changing defaults without confirming all call sites could alter intentional UI behavior unrelated to SEO.

This is deliberately conservative: the known Image-to-PDF defect is already fixed, and no speculative source change should replace a verified audit.

## Current status

### Completed

- [x] Image-to-PDF cluster points only to active destinations.
- [x] Legacy JPG/JPEG PDF routes are no longer promoted by that cluster.
- [x] Related links use descriptive anchor names.
- [x] Dedicated image-converter cluster uses active conversion destinations.
- [x] Target-size compressor cluster is intentionally contextual rather than a full cross-link matrix.
- [x] Finance cluster uses small contextual groups rather than indiscriminate all-to-all linking.

### Pending

- [ ] Enumerate all actual `RelatedTools` call sites.
- [ ] Confirm whether any caller explicitly requires archived/coming-soon related links.
- [ ] Change generic defaults to `includeArchived = false` and `includeComingSoon = false` after caller validation.
- [ ] Audit every explicit `relatedTools` registry relationship against current `archived`, `comingSoon`, canonical and redirect state.
- [ ] Run build/type/lint validation after any source change.
- [ ] Validate rendered internal links in production after deployment.

## Next planned SEO work

After the caller/default validation, continue the planned site-wide route → registry → canonical → sitemap → internal-link reconciliation. Then move to the planned Next.js rendering/performance SEO audit.

No keyword-variant pages, artificial link networks, doorway pages, or speculative content changes should be introduced.
