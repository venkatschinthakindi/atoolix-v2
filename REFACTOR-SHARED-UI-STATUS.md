# Shared UI Refactor — Master Status

## Scope
- Branch: `refactor/shared-ui-foundation`
- Base: `main` at `77453723cefda4768084541ba246629bb1daab1c`.
- `main` remains untouched until manual merge by the user.
- Phase 1 foundation work is complete; consumer migration now proceeds with exact source verification.

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
25. `SectionHeader`: preserves both component-type icons and already-rendered React-node icons. Follow-up commit `7fb3bb043237623f05a3911a11e37b8207a1cd4b` corrected object-valued component handling for Lucide/forwardRef-style icons after a production prerender failure.

## Consumer-to-shared capability matrix audit
The matrix compares implemented shared families with legacy/local UI implementations. Existing working behavior is the source of truth; a local component without a proven shared counterpart is not forced into an unrelated primitive.

| Existing family / local implementation | Shared target | Capability result | Action |
|---|---|---|---|
| Image `statCard` | `sharedUI/StatCard` | Covered: label, value, icon; shared also has optional hint/variant/title/truncation | Completed for confirmed consumers |
| Image `emptyState` | `sharedUI/EmptyState` | Covered as generic empty state; heading level optional | Ready for verified consumer mapping |
| Image `sectionHeader` | `sharedUI/SectionHeader` | Shared accepts both `ElementType` and rendered `ReactNode` icons; object-valued component types are handled through `createElement` | Migrated confirmed consumers; build fix applied |
| Finance savings `sectionHeader` | `sharedUI/SectionHeader` | Component-type icon usage is compatible with shared API | Migrated confirmed consumers |
| Image `successBanner` | `sharedUI/SuccessMessage` | Not proven one-to-one; legacy title/subtitle/icon/visual structure must be preserved | Deferred |
| Image `metadataCard` | `sharedUI/FileMetadata` | Contracts differ; exact consumer usage must be compared | Deferred |
| Image `metadataGrid` | no direct shared equivalent verified | Layout wrapper without proven shared behavior | Leave unchanged |
| Image `previewCard` | `sharedUI/ImagePreview` | Broad overlap, but exact async/null-src/rendering behavior requires comparison | Deferred |
| Image `downloadCard` | no direct shared equivalent verified | Composite behavior; retain as feature-specific until reuse is proven | Leave unchanged |
| Image `toolButton` | no one-to-one `ToolActionBar` replacement | Existing variants/icon/click/disabled/full-width behavior must remain | Leave unchanged |
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
- `SectionHeader` preserves both existing icon input styles and object-valued component types.
- Tool primitives remain server-safe or explicitly client-safe according to their APIs.
- File/PDF primitives retain documented API and accessibility corrections.
- Existing consumer behavior remains the source of truth for reusable APIs.

## Validation
- CI workflow intentionally skips the known repository-wide ESLint baseline so TypeScript/build failures remain visible.
- The user reported a production-build prerender failure on `/tools/calculator/simple-interest-calculator` after the initial SectionHeader compatibility change: `Objects are not valid as a React child`.
- Commit `7fb3bb043237623f05a3911a11e37b8207a1cd4b` patched object-valued SectionHeader icon handling. The commit changes exactly one file: `src/sharedUI/sectionHeader.tsx`. fileciteturn256file0
- A fresh CI/build result after `7fb3bb...` is still required before declaring this blocker fully validated.
- ESLint remains deferred and is not a Phase 1 migration blocker.

## Consumer migration protocol
For every consumer:
1. Inspect the complete existing local/consumer implementation.
2. Map every used prop and behavior to the shared component.
3. If an existing behavior is missing, add it to the shared component as an optional capability using the original working logic.
4. Do not invent or redesign behavior.
5. Prefer one consumer per commit for migration traceability.
6. Verify the exact diff is limited to the intended migration/change.
7. Run CI/typecheck/build.
8. Sync this MD immediately, including when there is no code change.
9. Proceed only after validation is clean.

## Consumer migration log

### Completed — verified one-consumer migrations
- `ImageCompressorClient.tsx` → `@/sharedUI/statCard`.
- Commit: `bbe435d3af9428158fc7d69229b25f5610078945`.
- Exact diff: one file, one import-line change.
- `fixedDepositCalculator.tsx` → `@/sharedUI/statCard`.
- Commit: `e23c2a5bf26cff70d3ffd2183f5a58ade8fb7594`.
- Exact diff: one file, one import-line change.
- `recurringDepositCalculator.tsx` → `@/sharedUI/statCard`.
- Commit: `02e9ea415239d63b4a92d8cea0c7e978d0f64bef`.
- Exact diff: one file, one import-line change.
- `compoundInterestCalculator.tsx` → `@/sharedUI/statCard`.
- Commit: `0a51c8d6d2a3ed07df551c59c8a61b37474da860`.
- Exact diff: one file, one import-line change.
- `simpleInterestDepositsSuite.tsx` → `@/sharedUI/statCard`.
- Commit: `1ed8ea97993513b1c2a4ad1f1676f707277ffeeb`.
- Exact diff: one file, one import-line change.
- `ImageConverterClient.tsx` → `@/sharedUI/statCard`.
- Commit: `7eca3667941b26babc0798e3cf5ed9758eb2006d`.
- Exact diff: one file, one import-line change.

### Completed in grouped SectionHeader migration commit
- `compoundInterestCalculator.tsx` → `@/sharedUI/sectionHeader`.
- `fixedDepositCalculator.tsx` → `@/sharedUI/sectionHeader`.
- `recurringDepositCalculator.tsx` → `@/sharedUI/sectionHeader`.
- `simpleInterestDepositsSuite.tsx` → `@/sharedUI/sectionHeader`.
- `ImageToPDFClient.tsx` → `@/sharedUI/sectionHeader`.
- Shared `src/sharedUI/sectionHeader.tsx` updated to preserve rendered-node and component-type icons.
- Commit: `558d7d373a0466c7c0271777864b5c5c50da994a`.
- This commit contains six changed files and therefore is explicitly recorded as a grouped commit rather than one-file consumer discipline.

### Shared compatibility fix
- `src/sharedUI/sectionHeader.tsx` updated to handle object-valued component types used by Lucide/forwardRef icons.
- Commit: `7fb3bb043237623f05a3911a11e37b8207a1cd4b`.
- Exact diff: one file, shared component only. fileciteturn256file0

### Deferred / revisit later
- EMI calculator: local `StatCard` has `accent`/`tone` behavior; compare its complete implementation against shared API before migration and preserve that behavior as optional if needed.
- Legacy image composites (`SuccessBanner`, `MetadataCard`, `MetadataGrid`, `PreviewCard`, `DownloadCard`, `ToolButton`, `ToolLayout`) remain pending exact consumer mapping.
- Any local calculator `StatCard` implementation remains feature-specific until complete capability comparison proves a safe shared mapping.

## Current result
**Six confirmed `StatCard` consumer migrations were completed with one-file/one-import commits. Five SectionHeader consumers were migrated in grouped commit `558d7d...`, followed by a one-file shared compatibility fix `7fb3bb...` after the reported production prerender failure. The latest SectionHeader fix still requires fresh CI/build confirmation.**

## Current next phase
Run CI/build against `7fb3bb043237623f05a3911a11e37b8207a1cd4b`. If clean, continue the full consumer-to-shared capability matrix. For every remaining consumer, provide the exact file, exact existing code, exact replacement, and commit message. Do not force local feature-specific implementations into shared components until their complete working behavior has been mapped.
