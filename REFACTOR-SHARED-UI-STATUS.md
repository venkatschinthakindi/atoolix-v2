# Shared UI Refactor — Master Status

## Scope
- Branch: `refactor/shared-ui-foundation`
- Base: `main` at `77453723cefda4768084541ba246629bb1daab1c`
- `main` must remain untouched until the user manually merges the completed branch.
- Phase 1 is foundation-only: create reusable components; **do not migrate or modify consumers yet**.

## Requirements
- Basic + optional advanced capabilities.
- Shared reusable Tailwind styling; avoid consumer-specific style duplication.
- Responsive mobile/tablet/desktop behavior.
- Accessible, semantic HTML.
- High performance; minimize client JS and unnecessary dependencies.
- SEO-friendly semantic rendering.
- Business/domain logic stays outside sharedUI.
- Components remain independently importable.
- Sync this status after every step, including no-change audits.

## Completed
- Isolated branch created from `main`.
- Initial reuse audit completed.
- SharedUI inventory identified existing primitives and duplication clusters.
- `sharedUI/StatCard` upgraded with controlled variants and optional hint/icon/truncation capabilities.
- `sharedUI/SectionHeader` upgraded with optional icon, subtitle, actions, children, className, and heading-level support.
- Tool foundation family created: `ToolPageShell`, `ToolHeader`, `ToolActionBar`, `ToolResult`, `ProcessingState`, and `EmptyState`.
- File foundation family created: `FileDropzone`, `FileList`, `FileItem`, `FileMetadata`, and `FilePreview`.
- Calculator foundation family created: `Field`, `NumberInput`, `PercentageInput`, `CurrencyInput`, `DurationInput`, and `ResultSummary`.
- Image foundation family created: `ImagePreview`, `ImageSettings`, `QualityControl`, `DimensionsControl`, and `FormatSelector`.
- PDF foundation family created: `PdfFileList`, `PdfPageSelector`, and `PdfPreview`.
- Feedback foundation family created: `ErrorMessage`, `SuccessMessage`, `PrivacyNotice`, and `LoadingState`.

## Phase 1 — Foundation only
Status: VALIDATION/AUDIT COMPLETE; REMEDIATION PENDING

### Consumer migration constraint
No existing tool/component consumer is being migrated or modified during Phase 1 foundation validation/remediation.

### Foundation families
- `tool`: page shell/header/action bar/result/processing/empty states — IMPLEMENTED; audit findings below
- `file`: dropzone/list/item/metadata/preview — IMPLEMENTED; audit findings below
- `calculator`: StatCard/Field/number/percentage/currency/duration inputs/result summary — IMPLEMENTED; audit findings below
- `image`: preview/settings/quality/dimensions/format controls — IMPLEMENTED; audit findings below
- `pdf`: file list/page selector/preview — IMPLEMENTED; audit findings below
- `feedback`: error/success/privacy/loading states — IMPLEMENTED; audit findings below

## Validation / audit findings

### BLOCKER — build/client boundary
1. `src/sharedUI/explainerPanel.tsx` uses `useState` but has no `"use client"` directive. It also uses `explainers:any`. This is an obvious Next.js client-boundary/type-safety defect. fileciteturn157file0L1-L3
2. `src/sharedUI/filterToolHubPage.tsx` calls `filterKey.toPascalCase()` without importing/providing the helper in the component. This requires an ambient extension to exist and should not be assumed in a shared component. It also declares `showCategoryBar` but does not use it. fileciteturn158file0L1-L2

### HIGH — API/accessibility correctness
3. `FileDropzoneProps` exposes `files?: File[]`, but the implementation does not consume it. This is a misleading controlled-state API and should be removed or implemented deliberately. It also creates `inputRef` but never uses the ref for behavior. fileciteturn175file0L1-L2
4. `FileItemProps` exposes `index` and `reorderable`, but the component does not destructure/use either capability. The API therefore advertises advanced behavior that is not implemented. fileciteturn196file0L1-L2
5. `Field` derives an ID from the label when no ID is supplied. Multiple fields with the same label can therefore generate duplicate DOM IDs. This is an accessibility defect. fileciteturn181file0L1-L2
6. `QualityControl` hard-codes `image-quality-control`; multiple instances produce duplicate IDs. fileciteturn198file0L1-L2
7. `DimensionsControl` hard-codes `image-dimensions-width/height`; multiple instances produce duplicate IDs. fileciteturn183file0L1-L2
8. `PdfFileList` nests reorder/remove buttons beside a selectable button and lacks a disabled API; the advanced interaction contract needs a keyboard/focus audit before reuse. fileciteturn197file0L1-L2

### HIGH — semantic/SEO correctness
9. `ToolHeader` always renders `h1`. Reusing it more than once on a page can create multiple primary headings; heading level must be configurable like `SectionHeader`. fileciteturn186file0L1-L2
10. `EmptyState` always renders `h2`; reusable placement needs configurable heading semantics. fileciteturn151file0L1-L2
11. `ImageSettings` always renders `h2`, which can create incorrect heading hierarchy when nested in another section. fileciteturn155file0L1-L2
12. `ResultSummary` uses item labels as React keys. Duplicate labels can produce unstable/duplicate keys. fileciteturn143file0L1-L2

### MEDIUM — styling/performance/API consistency
13. The same visual tokens (`rounded-2xl`, `border-white/10`, `bg-white/5`, white text/opacity values) are repeated across shared components instead of being centralized into shared style constants/utilities. Examples are visible in `StatCard`, `ImageSettings`, `ToolResult`, and `ProcessingState`. fileciteturn194file0L1-L2 fileciteturn200file0L1-L2 fileciteturn152file0L1-L2 fileciteturn153file0L1-L2
14. `LoadingState` and `ProcessingState` use `bg-current` for the progress fill without establishing a reliable text/currentColor token on the fill context. The visual result is therefore dependent on inherited color rather than an explicit shared progress token. fileciteturn156file0L1-L2 fileciteturn149file0L1-L2
15. `ImagePreview` defaults to `loading="lazy"`; this is appropriate for ordinary previews but should remain opt-in/consumer-controlled for above-the-fold/LCP imagery. The API already allows eager loading. fileciteturn135file0L1-L2
16. `FilePreview` hard-codes lazy loading and does not expose loading control, so the shared preview cannot be used safely for an above-the-fold image without a variant/API adjustment. fileciteturn146file0L1-L2
17. `CurrencyInput` defaults to `₹`, making a generic shared calculator primitive region-specific. Currency should be an explicit consumer/default-context decision. fileciteturn188file0L1-L2

### Type/API quality
18. `ExplainerPanel` uses `explainers:any` and untyped mapped `line:any`; this weakens the sharedUI contract and should be typed. fileciteturn157file0L1-L3
19. `IconResolver` uses `React.ComponentType<any>` and exposes an untyped icon registry. This is functional but below the intended sharedUI type-safety standard. fileciteturn166file0L1-L2
20. `FileList` generates keys from mutable file metadata plus array index. The index masks duplicate-file identity and can cause unnecessary remounts after reorder; a stable file identity API should be preferred. fileciteturn144file0L1-L2
21. Calculator wrappers are intentionally thin, but `PercentageInput`/`DurationInput` currently narrow functionality to fixed suffix behavior rather than a generalized unit/formatter contract. This should be resolved before consumer migration so the API is stable. fileciteturn178file0L1-L2 fileciteturn179file0L1-L2

### Dependency review
22. The newly created foundation components do not import heavy feature libraries. Existing `sharedUI` does import `lucide-react` in `ExplainerPanel`/`IconResolver`; `package.json` also contains many feature dependencies, but this audit did not find evidence that the new lightweight primitives pull those libraries in. Dependency removal must therefore be handled only after consumer/import graph validation. fileciteturn157file0L1-L2 fileciteturn166file0L1-L2 fileciteturn230file0L1-L2

## Validation limitations
- This audit was source-level through GitHub; the available GitHub operations here do not execute the repository's `npm run lint`, TypeScript compiler, or production `npm run build` locally.
- Therefore no claim of a passing build/lint has been made.
- The source review found concrete likely build/type/accessibility defects above.
- No consumer migration or unrelated application-code modification was performed.

## Audit result
**NOT READY FOR CONSUMER MIGRATION.** Remediation is required before Phase 1 can be considered validated.

## Next action
Remediate only the confirmed **BLOCKER/HIGH** findings first, in small controlled batches, with the master MD synchronized after each batch. After those pass source review, run the strongest available TypeScript/lint/build validation path. Consumer migration remains prohibited until validation is green.