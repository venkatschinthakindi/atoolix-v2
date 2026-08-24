# Atoolix Image SEO Audit — 2026-08-23

## Scope
Audit the latest `main` for image discoverability, descriptive metadata, alt text, image landing-page context, preferred-image metadata, and avoidable image-related SEO/accessibility issues.

## Google guidance used
- Use standard HTML `<img>` elements when images are intended to be discovered; Google does not index CSS background images as image content.
- Use short, descriptive filenames where possible.
- Use useful, descriptive alt text and avoid keyword stuffing.
- Place important images near relevant textual content and on relevant landing pages.
- Use responsive image techniques and optimize image quality/size.
- `og:image` and Schema.org image metadata can influence the preferred image preview for a page.
- Image SEO is supplementary to the quality and relevance of the page containing the image.
- Google's March 2026 clarification means Schema.org image markup and `og:image` are both relevant preferred-image signals.

## Repository findings
### 1. Tool-card architecture
`src/components/ui/toolCard.tsx` uses `IconResolver` for tool-card visuals rather than `<img>` elements. These are interface icons, not substantive content images, so there is no missing image alt-text defect in this component.

### 2. Tool image assets
The repository contains descriptive tool-image filenames under `public/toolimages/`, including `compress-image-to-20kb.png`, `compress-image-to-50kb.png`, `compress-image-to-100kb.png`, `meeting-time-finder.png`, `timezone-converter.png`, `qr-code-generator.png`, and related tool assets.

The audited route architecture does not establish that these assets are currently embedded as substantive `<img>` content on the indexable tool pages. Therefore they were not artificially injected merely to create image-search signals.

### 3. Preferred-image metadata architecture
The current shared metadata implementation in `src/utility/metadata.ts` generates route-specific `og:image` and Twitter image metadata for tool pages from the registry's `toolImage` value, rather than relying exclusively on the site-level `/logo.png` fallback. This supersedes the earlier site-level-only description of the architecture.

Tool registry entries require a `toolImage`, and the current registry was exhaustively audited for shared assignments. This confirms that the preferred-image system is intentionally tool-aware.

### 4. Complete `toolImage` registry audit
The current registry contains 46 tool entries using 37 image assets. Three shared-image groups were identified:

- `emi-calculator.png` → EMI Calculator, Home Loan EMI, Car Loan EMI, Personal Loan EMI.
- `roi-calculator.png` → SIP Calculator, CAGR Calculator, XIRR Calculator, Lumpsum Calculator.
- `fd-calculator.png` → Simple Interest Calculator, Compound Interest Calculator, Fixed Deposit Calculator, Recurring Deposit Calculator.

The shared EMI and investment-return groups are semantically defensible. The FD image is broader than the Simple/Compound Interest concepts, but no better existing dedicated asset was found, so changing it would require creating new assets rather than making a minimal image-reference correction.

No broken `toolImage` reference or semantically incorrect assignment was confirmed. No image-reference source change is justified.

### 5. Image-heavy tool pages
The repository contains substantial text content on image-tool landing pages, including the Image hub and dedicated compressor/converter pages. The Image hub places descriptive text and crawlable links around the actual tool destinations, which provides textual context even where the tool UI itself is icon-based.

## SEO decision
**No source-code change made.**

No confirmed image SEO defect was found that would justify adding decorative images, duplicating image markup, creating image-specific URLs, or changing the existing shared `toolImage` assignments. Doing so without a user/search need would be SEO churn and could increase page weight.

The existing descriptive asset filenames, route-specific `og:image` metadata, and site-level logo metadata are preserved.

## Validation still required after deployment
- Confirm important page images are present in rendered HTML when they are intended to be discoverable.
- Confirm meaningful images use descriptive alt text.
- Confirm responsive/fallback image URLs work in production.
- Confirm preferred `og:image` resolves successfully.
- Check representative pages with URL Inspection and PageSpeed Insights after deployment.

## Google principle
Image optimization should improve user understanding, accessibility, discoverability and page experience—not be used for keyword stuffing or artificial image-search targeting.

## Status
- Audit: complete
- Complete `toolImage` registry mapping: complete
- Shared-image semantic review: complete
- Confirmed bad image assignment: none
- Code change: none justified
- Production validation: pending
- Search Console validation: deferred to next week's batch validation
