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
This audit compares the currently implemented shared families with the legacy/local UI implementations that are still present on the branch. The rule is to preserve existing working behavior; a legacy component with no legitimate shared counterpart is not silently rewritten or forced into an unrelated primitive.

| Existing family / local implementation | Shared target | Capability result | Action |
|---|---|---|---|
| Image `statCard` | `sharedUI/StatCard` | Covered: label, value, icon; shared also has optional hint/variant/title/truncation | Ready for migration |
| Image `emptyState` | `sharedUI/EmptyState` | Covered as generic empty state; heading level is optional | Ready for consumer mapping |
| Image `sectionHeader` | `sharedUI/SectionHeader` | Covered conceptually; existing title/subtitle/icon behavior must be mapped without changing presentation | Consumer verification required |
| Image `successBanner` | `sharedUI/SuccessMessage` | Not a proven one-to-one equivalent: legacy banner has title/subtitle/icon and specific visual structure | Do not migrate until exact behavior comparison |
| Image `metadataCard` | `sharedUI/FileMetadata` | Different contracts: legacy consumes `ImageMetadata` + `File` and renders dimensions/size/type; shared file metadata contract must be compared before migration | Capability gap must be proven from consumer usage before changing shared code |
| Image `metadataGrid` | no direct shared equivalent verified | Tiny layout wrapper; no behavior to merge without consumer evidence | Leave unchanged until consumer mapping |
| Image `previewCard` | `sharedUI/ImagePreview` | Same broad responsibility, but legacy uses async Next Image and `src: string | null`; exact rendering/props must be compared | Do not rewrite logic |
| Image `downloadCard` | no direct shared equivalent verified | Composite behavior: image + arbitrary children + download callback/button | Keep as feature-specific composite unless multiple consumers prove reusable capability |
| Image `toolButton` | `sharedUI/ToolActionBar` is not a one-to-one button replacement | Legacy button has five variants, icon, click, disabled, full-width styling | No forced migration; preserve existing button behavior |
| Image `toolLayout` | `sharedUI/ToolPageShell` | Potential shell overlap, but exact children/header/result layout must be compared first | Consumer verification required |
| Calculator `Field` | `sharedUI/calculator/Field` | Covered with broader native input attributes plus optional hint/error/suffix/description | Ready |
| Calculator `NumberInput` | `sharedUI/calculator/NumberInput` | Covered: numeric value/change/min/max/step and presentation props | Ready |
| Calculator `CurrencyInput` | `sharedUI/calculator/CurrencyInput` | Covered; currency remains optional | Ready |
| Calculator `DurationInput` | `sharedUI/calculator/DurationInput` | Covered; typed unit + optional formatter | Ready |
| Calculator `PercentageInput` | `sharedUI/calculator/PercentageInput` | Covered; configurable suffix/default `%` | Ready |
| Calculator result/stat cards | `sharedUI/ResultSummary` / `StatCard` | Must select based on actual existing consumer semantics; no automatic substitution | Consumer mapping required |
| File drop/list/item | shared file family | Existing API corrections are already represented | Ready after consumer verification |
| Image controls | shared image family | `useId`/client-boundary fixes are present; existing control behavior preserved | Ready |
| PDF list/page/preview | shared PDF family | Existing documented behavior is represented by the current contracts; consumer verification remains required | Ready after mapping |
| Feedback/loading | shared feedback family | Existing shared contracts cover the documented behavior | Ready after mapping |
| Tool shell/header/action/result/state | shared tool family | Shared primitives cover the common structural/state operations; feature-specific behavior must remain optional in consumers | Ready after mapping |

### Matrix conclusion
- The shared foundation is **not declared universally feature-complete merely because every family has a component**.
- Confirmed direct coverage exists for the calculator primitives, image controls, file primitives, feedback primitives, and the simple image `StatCard`/empty-state cases.
- Several legacy image composites (`DownloadCard`, `MetadataGrid`, `ToolButton`) do not have proven one-to-one shared targets. They are **not defects by themselves** and must not be rewritten or collapsed into unrelated primitives without consumer evidence.
- `MetadataCard`, `PreviewCard`, `SuccessBanner`, `SectionHeader`, and `ToolLayout` require exact consumer-level mapping before migration because their existing behavior may be more specific than the generic shared primitive.
- No new business logic or replacement implementation was introduced during this matrix audit.

## Final source-level audit
- Shared image controls have unique generated IDs and explicit client boundaries where hooks are used.
- Calculator primitives have the required client boundary and typed contracts.
- Tool primitives remain server-safe or explicitly client-safe according to their actual APIs.
- File/PDF primitives retain the documented API and accessibility corrections.
- Existing consumer behavior is the source of truth for reusable APIs; shared components must not drop existing working features during migration.

## Validation
- CI workflow was intentionally changed to skip the known repository-wide ESLint baseline and expose TypeScript/build failures.
- User-reported latest CI result: **TypeScript/typecheck and production build succeeded** with lint skipped.
- No build failure is currently blocking Phase 1.
- ESLint remains explicitly deferred and is not treated as a Phase 1 migration blocker.

## Consumer migration protocol
For every consumer:
1. Inspect the complete existing local/consumer implementation.
2. Map every currently used prop and behavior to the shared component.
3. If an existing behavior is missing, add it to the shared component as an optional capability using the existing working logic.
4. Do not invent or redesign behavior.
5. Migrate one consumer only.
6. Verify the exact diff is limited to the intended migration/change.
7. Run CI/typecheck/build.
8. Sync this MD immediately, including when there is no code change.
9. Proceed to the next consumer only after validation is clean.

## Consumer migration log

### Completed
- `ImageCompressorClient.tsx` migrated from the legacy image `StatCard` import to `@/sharedUI/statCard`.
- Commit: `bbe435d3af9428158fc7d69229b25f5610078945`.
- Exact diff verified: **one file, one import-line change**; no compressor logic or unrelated code changed.
- Commit has no PR-triggered workflow run reported by GitHub at the time of this sync; CI must still be checked from the user's branch/Actions view as appropriate.
- `fixedDepositCalculator.tsx` migrated from `./core/statCard` to `@/sharedUI/statCard`.
- Commit: `e23c2a5bf26cff70d3ffd2183f5a58ade8fb7594`.
- Exact diff verified: **one file, one import-line change**; no calculation/UI logic changed.
- `recurringDepositCalculator.tsx` migrated from `./core/statCard` to `@/sharedUI/statCard`.
- Commit: `02e9ea415239d63b4a92d8cea0c7e978d0f64bef`.
- Exact diff verified: **one file, one import-line change**; no calculation/UI logic changed.
- `compoundInterestCalculator.tsx` migrated from `./core/statCard` to `@/sharedUI/statCard`.
- Commit: `0a51c8d6d2a3ed07df551c59c8a61b37474da860`.
- Exact diff verified: **one file, one import-line change**; no calculation/UI logic changed.

### Deferred / revisit later
- EMI calculator: do not migrate until existing `accent`/`tone` behavior is represented by the shared API using the original working implementation.
- Legacy image composites (`SuccessBanner`, `MetadataCard`, `MetadataGrid`, `PreviewCard`, `DownloadCard`, `ToolButton`, `ToolLayout`) remain pending exact consumer mapping.
- `ImageToPDFClient` currently does not import the legacy image `StatCard`; do not force a StatCard migration.

## Current result
**Four confirmed `StatCard` consumer migrations are complete: `ImageCompressorClient`, `fixedDepositCalculator`, `recurringDepositCalculator`, and `compoundInterestCalculator`. Each consumer commit was verified as one file/one import-line change. No speculative shared-component changes were made. The master MD is synchronized after this migration checkpoint.**

## Current next consumer
`simpleInterestCalculator.tsx` — inspect its existing `StatCard` usage and migrate only that consumer to `@/sharedUI/statCard` if the exact existing finance behavior remains represented. Preserve all calculation/UI logic. One consumer/file commit, exact diff verification, CI, then MD sync.
