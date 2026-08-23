# JPG to PDF SEO Audit — 2026-08-23

## Scope

Evaluate the legacy `/tools/image/jpg-to-pdf` route as a possible recovery/indexing candidate using the latest `main`, with Google Search Central guidance as the governing standard.

## Latest source inspected

- Repository: `venkatschinthakindi/atoolix-v2`
- Branch: `main`
- Baseline commit inspected: `9c28407ce26c10ccb942b89e4b7fa8ea0bb6c594`
- Current JPG registry state: `archived: true`
- Current JPG canonical in registry: `https://atoolix.com/tools/image/jpg-to-pdf`
- Active general image-to-PDF route: `/tools/image/image-to-pdf`

## Findings

### 1. The JPG route does not represent a distinct conversion engine

`image/jpg-to-pdf` uses the same image-to-PDF converter registry/helper and the same shared `ImageToPDFClient` implementation as the active image-to-PDF page.

The active image-to-PDF tool already accepts `jpg`, `jpeg`, `png`, and `webp`. The JPG route only narrows the accepted input formats to `jpg` and `jpeg`.

This means the legacy route does not provide a materially different product capability that would justify a separate indexed landing page by itself.

### 2. The SEO content is substantially overlapping

`JpgToPdfSeoContent.tsx` contains useful JPG/JPEG-specific wording, FAQs, workflow guidance, privacy information, page-setting explanations, mobile guidance and use cases. However, the active `ImageToPDFSeoContent.tsx` already contains the same major information architecture:

- image-to-PDF introduction
- supported formats
- multiple-image conversion
- image ordering
- page size/orientation/margins
- browser-based processing
- mobile usage
- use cases
- audiences
- FAQ guidance
- preview/download workflow
- related tools

The JPG page therefore adds keyword/form-factor specificity but not enough independent primary content or functionality to safely treat it as a distinct indexed page.

## Google guidance applied

Google's current canonicalization guidance says that when pages have substantially similar primary content, Google clusters them and chooses the most representative and useful canonical. Google also specifically recommends ensuring clustered pages are sufficiently different, and notes that canonical declarations are hints rather than rules.

For this route, creating an indexed JPG keyword-variant page would risk keeping two pages competing for the same underlying image-to-PDF intent rather than creating a genuinely differentiated resource.

Official guidance checked on 2026-08-23:

- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting

## AdSense / publisher-value consideration

The page already contains substantial visible content, so this is not being classified as an empty page. The concern is duplication and publisher value: maintaining near-identical tool pages merely to capture format-specific keyword variants does not provide enough additional user value to justify indexing the duplicate route.

Google Publisher Policies prohibit Google-served ads on screens with low-value publisher content and on screens with replicated content that does not add value. The safer monetization architecture is to keep the strongest, most complete image-to-PDF page as the primary destination and avoid multiplying near-duplicate pages.

Official policy checked on 2026-08-23:

- https://support.google.com/publisherpolicies/answer/11112688
- https://support.google.com/publisherpolicies/answer/11190248

## Decision

**JPG → PDF recovery: CLOSED as an indexing candidate.**

Do **not** change `image/jpg-to-pdf` to `archived: false`.

The correct SEO action is consolidation into the active `/tools/image/image-to-pdf` page rather than creating another indexed keyword-variant page.

## Implementation completed

The legacy routes now permanently redirect to the active image-to-PDF destination:

- `/tools/image/jpg-to-pdf` → `/tools/image/image-to-pdf`
- `/tools/image/jpeg-to-pdf` → `/tools/image/image-to-pdf`

The redirect is a stronger consolidation signal than leaving the legacy JPG route as an independently crawlable `noindex` page, while preserving old URLs for users and external references.

Commit:

`680f9f4275010884d1333f07eaab916e26097706` — `seo: consolidate legacy JPG-to-PDF URLs to active image-to-PDF`

## Sitemap / canonical / indexability policy

- The active canonical remains `/tools/image/image-to-pdf`.
- The active image-to-PDF page remains the indexable destination.
- The legacy JPG route is not an indexed destination.
- Archived-tool policy remains `noindex + excluded from sitemap` for any archived route that is not redirected.
- No new keyword-variant page is being created.

## Remaining follow-up

The active image-to-PDF related-tools configuration should be reviewed separately so active pages do not unnecessarily link to archived JPG/PNG/WEBP conversion routes. That is an internal-link cleanup task and should be handled as part of the broader route/internal-link reconciliation rather than by reopening the JPG page as an indexing candidate.

## Validation required after deployment

- [ ] Verify `/tools/image/jpg-to-pdf` returns a permanent redirect to `/tools/image/image-to-pdf` in production.
- [ ] Verify `/tools/image/jpeg-to-pdf` returns a permanent redirect to `/tools/image/image-to-pdf` in production.
- [ ] Verify the active image-to-PDF page has the expected canonical, title, H1 and indexability.
- [ ] Verify the active image-to-PDF URL is present in the XML sitemap.
- [ ] Verify the legacy JPG/JPEG URLs are not present in the XML sitemap.
- [ ] Use Google URL Inspection after deployment to confirm Google's selected canonical and eventual recrawl behavior.

## Final assessment

**Status: Consolidated / preserved / not indexed as a separate page.**

This decision favors one stronger image-to-PDF destination over multiple substantially overlapping format variants and is consistent with Google's current canonicalization guidance and publisher-value requirements.
