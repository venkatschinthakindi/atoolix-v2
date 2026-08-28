# Shared UI Refactor — Master Status

## Scope
- Branch: `refactor/shared-ui-foundation`
- Base: `main` at `77453723cefda4768084541ba246629bb1daab1c`.
- `main` remains untouched until manual merge by the user.
- Phase 1 foundation work is complete; consumer migration now proceeds one consumer at a time.

## Requirements
- Basic + optional advanced capabilities.
- Preserve all previously working consumer behavior; no invented/reworked business logic.
- Shared reusable Tailwind styling; avoid consumer-specific duplication.
- Responsive mobile/tablet/desktop behavior.
- Accessible, semantic HTML.
- High performance; minimize client JS and unnecessary dependencies.
- SEO-friendly semantic rendering.
- Business/domain logic stays outside sharedUI.
- Components remain independently importable.
- Before migration, compare the complete existing consumer/local implementation against the shared component and expose existing feature-specific behavior as optional shared capabilities.
- Sync this status after every step, including no-change audits.

## Foundation families implemented
- `tool`: `ToolPageShell`, `ToolHeader`, `ToolActionBar`, `ToolResult`, `ProcessingState`, `EmptyState`.
- `file`: `FileDropzone`, `FileList`, `FileItem`, `FileMetadata`, `FilePreview`.
- `calculator`: `StatCard`, `Field`, `NumberInput`, `PercentageInput`, `CurrencyInput`, `DurationInput`, `ResultSummary`.
- `image`: `ImagePreview`, `ImageSettings`, `QualityControl`, `DimensionsControl`, `FormatSelector`.
- `pdf`: `PdfFileList`, `PdfPageSelector`, `PdfPreview`.
- `feedback`: `ErrorMessage`, `SuccessMessage`, `PrivacyNotice`, `LoadingState`.

## Resolved findings

### BLOCKER — build/client boundary
1. `ExplainerPanel`: added explicit `"use client"` boundary and replaced `any` explainer data with typed content.
2. `FilterToolHubPage`: replaced ambient `String.prototype.toPascalCase()` usage with a local typed helper and removed unused handling.
3. `Field`: added explicit `"use client"` boundary because the shared primitive uses React `useId()`.
4. `QualityControl`: added explicit `"use client"` boundary because the shared primitive uses React `useId()`.
5. `DimensionsControl`: added explicit `"use client"` boundary because the shared primitive uses React `useId()`.

### HIGH — API/accessibility correctness
6. `FileDropzone`: removed unused `files` prop and unused input ref.
7. `FileItem`: removed unused `index`/`reorderable` API and inert selection button behavior.
8. `Field`: replaced label-derived IDs with React `useId()`, while preserving explicit ID override and description/error relationships.
9. `QualityControl`: replaced hard-coded ID with `useId()` and optional explicit ID.
10. `DimensionsControl`: replaced hard-coded width/height IDs with `useId()` and optional explicit base ID.
11. `PdfFileList`: corrected disabled/focus/selection semantics and propagated disabled state to controls.
12. `ToolHeader`: configurable `headingLevel`, default `1`.
13. `EmptyState`: configurable `headingLevel`, default `2`.
14. `ImageSettings`: configurable `headingLevel`, default `2`.
15. `ResultSummary`: requires stable item `id` and uses it as React key.

### MEDIUM — visual/performance/API
16. Repeated shared visual Tailwind tokens centralized in `src/sharedUI/sharedStyles.ts` and adopted by shared primitives.
17. `LoadingState` progress fill no longer relies on inherited `currentColor`; uses explicit `bg-white`.
18. `ImagePreview` exposes consumer-controlled `loading` and `decoding`, retaining `lazy`/`async` defaults.
19. `FilePreview` exposes consumer-controlled `loading` and `decoding`, retaining `lazy`/`async` defaults.
20. `CurrencyInput` no longer imposes a region-specific default; explicit `currency` remains supported.

### TYPE/API quality
21. `IconResolver`: replaced `React.ComponentType<any>` and untyped registry with `LucideIcon` typing and explicit props.
22. `FileList`: removed index from React key generation and added optional `getFileKey` for caller-provided stable identity; deterministic file metadata is the fallback.
23. `PercentageInput`: added configurable `suffix`, default `%`, so the primitive can support alternate presentation without consumer duplication.
24. `DurationInput`: added `formatUnit` for localized/custom unit presentation while retaining typed `DurationUnit`.

## Consumer-to-shared capability matrix audit
The matrix compares implemented shared families with legacy/local UI implementations. Existing working behavior is the source of truth; a local component without a proven shared counterpart is not forced into an unrelated primitive.

| Existing family / local implementation | Shared target | Capability result | Action |
|---|---|---|---|
| Image `statCard` | `sharedUI/StatCard` | Covered: label, value, icon; shared also has optional hint/variant/title/truncation | Ready / migrations underway |
| Image `emptyState` | `sharedUI/EmptyState` | Covered as generic empty state; heading level optional | Ready for consumer mapping |
| Image `sectionHeader` | `sharedUI/SectionHeader` | Covered conceptually; title/subtitle/icon mapping requires presentation verification | Consumer verification required |
| Image `successBanner` | `sharedUI/SuccessMessage` | Not proven one-to-one; legacy title/subtitle/icon/visual structure must be preserved | Deferred |
| Image `metadataCard` | `sharedUI/FileMetadata` | Contracts differ; exact consumer usage must be compared | Deferred |
| Image `metadataGrid` | no direct shared equivalent verified | Layout wrapper without proven shared behavior | Leave unchanged |
| Image `previewCard` | `sharedUI/ImagePreview` | Broad overlap, but exact async/null-src/rendering behavior requires comparison | Deferred |
| Image `downloadCard` | no direct shared equivalent verified | Composite behavior; retain as feature-specific until reuse is proven | Leave unchanged |
| Image `toolButton` | no one-to-one `ToolActionBar` replacement | Existing five variants/icon/click/disabled/full-width behavior must remain | Leave unchanged |
| Image `toolLayout` | `sharedUI/ToolPageShell` | Potential shell overlap; exact layout must be compared | Deferred |
| Calculator `Field` | `sharedUI/calculator/Field` | Covered with broader native attributes and optional hint/error/suffix/description | Ready |
| Calculator `NumberInput` | `sharedUI/calculator/NumberInput` | Covered | Ready |
| Calculator `CurrencyInput` | `sharedUI/calculator/CurrencyInput` | Covered; currency optional | Ready |
| Calculator `DurationInput` | `sharedUI/calculator/DurationInput` | Covered; typed unit + optional formatter | Ready |
| Calculator `PercentageInput` | `sharedUI/calculator/PercentageInput` | Covered; configurable suffix/default `%` | Ready |
| Calculator result/stat cards | `sharedUI/ResultSummary` / `StatCard` | Selection depends on actual existing semantics | Consumer mapping required |
| File drop/list/item | shared file family | Existing API corrections represented | Ready after consumer verification |
| Image controls | shared image family | `useId`/client-boundary fixes present | Ready |
| PDF list/page/preview | shared PDF family | Documented behavior represented; consumer verification remains | Ready after mapping |
| Feedback/loading | shared feedback family | Existing shared contracts cover documented behavior | Ready after mapping |
| Tool shell/header/action/result/state | shared tool family | Common structural/state operations covered; feature-specific behavior remains optional | Ready after mapping |

## Final source-level audit
- Shared image controls have unique generated IDs and explicit client boundaries where hooks are used.
- Calculator primitives have the required client boundary and typed contracts.
- Tool primitives remain server-safe or explicitly client-safe according to their APIs.
- File/PDF primitives retain documented API and accessibility corrections.
- Existing consumer behavior remains the source of truth for reusable APIs.

## Validation
- CI workflow intentionally skips the known repository-wide ESLint baseline so TypeScript/build failures remain visible.
- Latest user-reported CI result: TypeScript/typecheck and production build succeeded with lint skipped.
- ESLint remains deferred and is not a Phase 1 migration blocker.

## Consumer migration protocol
For every consumer:
1. Inspect the complete existing local/consumer implementation.
2. Map every used prop and behavior to the shared component.
3. If an existing behavior is missing, add it to the shared component as an optional capability using the original working logic.
4. Do not invent or redesign behavior.
5. Migrate one consumer only.
6. Verify the exact diff is limited to the intended migration/change.
7. Run CI/typecheck/build.
8. Sync this MD immediately, including when there is no code change.
9. Proceed only after validation is clean.

## Consumer migration log

### Completed
- `ImageCompressorClient.tsx` migrated from the legacy image `StatCard` import to `@/sharedUI/statCard`.
- Commit: `bbe435d3af9428158fc7d69229b25f5610078945`.
- Exact diff: one file, one import-line change.
- `fixedDepositCalculator.tsx` migrated from `./core/statCard` to `@/sharedUI/statCard`.
- Commit: `e23c2a5bf26cff70d3ffd2183f5a58ade8fb7594`.
- Exact diff: one file, one import-line change.
- `recurringDepositCalculator.tsx` migrated from `./core/statCard` to `@/sharedUI/statCard`.
- Commit: `02e9ea415239d63b4a92d8cea0c7e978d0f64bef`.
- Exact diff: one file, one import-line change.
- `compoundInterestCalculator.tsx` migrated from `./core/statCard` to `@/sharedUI/statCard`.
- Commit: `0a51c8d6d2a3ed07df551c59c8a61b37474da860`.
- Exact diff: one file, one import-line change.
- `simpleInterestDepositsSuite.tsx` migrated from `./core/statCard` to `@/sharedUI/statCard`.
- Commit: `1ed8ea97993513b1c2a4ad1f1676f707277ffeeb`.
- Exact diff: one file, one import-line change.
- `ImageConverterClient.tsx` migrated from the legacy image `StatCard` import to `@/sharedUI/statCard`.
- Commit: `7eca3667941b26babc0798e3cf5ed9758eb2006d`.
- Exact diff: one file, one import-line change.

### Deferred / revisit later
- EMI calculator: local `StatCard` has `accent`/`tone` behavior; compare its complete implementation against shared API before migration and preserve that behavior as optional if needed.
- Legacy image composites (`SuccessBanner`, `MetadataCard`, `MetadataGrid`, `PreviewCard`, `DownloadCard`, `ToolButton`, `ToolLayout`) remain pending exact consumer mapping.
- `ImageToPDFClient` is not a confirmed legacy `StatCard` consumer and must not be forced into this migration.

## Current result
**Six confirmed `StatCard` consumer migrations are complete: `ImageCompressorClient`, `fixedDepositCalculator`, `recurringDepositCalculator`, `compoundInterestCalculator`, `simpleInterestDepositsSuite`, and `ImageConverterClient`. Each consumer commit was verified as one file/one import-line change. No speculative shared-component changes were made.**

## Current next phase
Continue the full consumer-to-shared capability matrix across all reusable families. Do not assume a local component is a consumer merely because it has a similar name. For each confirmed consumer, provide the exact file and replacement to the user, verify their one-file commit, then synchronize this MD before moving on. Revisit deferred feature-specific components only after the straightforward confirmed consumers are complete.
