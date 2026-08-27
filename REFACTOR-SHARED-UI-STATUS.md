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
Status: BLOCKER/HIGH REMEDIATION IN PROGRESS

### Consumer migration constraint
No existing tool/component consumer is being migrated or modified during Phase 1 foundation validation/remediation.

### Foundation families
- `tool`: page shell/header/action bar/result/processing/empty states — IMPLEMENTED; remediation/audit ongoing
- `file`: dropzone/list/item/metadata/preview — IMPLEMENTED; remediation/audit ongoing
- `calculator`: StatCard/Field/number/percentage/currency/duration inputs/result summary — IMPLEMENTED; remediation/audit ongoing
- `image`: preview/settings/quality/dimensions/format controls — IMPLEMENTED; remediation/audit ongoing
- `pdf`: file list/page selector/preview — IMPLEMENTED; remediation/audit ongoing
- `feedback`: error/success/privacy/loading states — IMPLEMENTED; remediation/audit ongoing

## Validation / audit findings

### BLOCKER — build/client boundary
1. `src/sharedUI/explainerPanel.tsx` uses `useState` but had no `"use client"` directive and used `explainers:any`. Remediated in an earlier batch with an explicit client boundary and typed explainer data.
2. `src/sharedUI/filterToolHubPage.tsx` called `filterKey.toPascalCase()` without an explicit local/imported helper and declared unused `showCategoryBar`. Remediated in an earlier batch with a local typed helper and removal of unused handling.

### HIGH — API/accessibility correctness
3. `FileDropzoneProps` exposes `files?: File[]`, but the implementation does not consume it. It also creates an unused `inputRef`. Pending remediation.
4. `FileItemProps` exposes `index` and `reorderable`, but the component does not use either capability. Pending remediation.
5. `Field` generated IDs from labels could collide. **Remediated in current batch with React `useId()` and optional explicit IDs; description/error relationships now use the generated field ID.**
6. `QualityControl` hard-coded `image-quality-control`; multiple instances could produce duplicate IDs. **Remediated in current batch with React `useId()` and optional explicit ID.**
7. `DimensionsControl` hard-coded `image-dimensions-width/height`; multiple instances could produce duplicate IDs. **Remediated in current batch with React `useId()` and optional explicit base ID.**
8. `PdfFileList` has advanced interaction/focus concerns around reorder/remove controls and lacks a disabled API. Pending remediation.

### HIGH — semantic/SEO correctness
9. `ToolHeader` always renders `h1`. Pending configurable heading-level remediation.
10. `EmptyState` always renders `h2`. Pending configurable heading-level remediation.
11. `ImageSettings` always renders `h2`. Pending configurable heading-level remediation.
12. `ResultSummary` uses item labels as React keys. Pending stable-key remediation.

### MEDIUM — deferred until HIGH remediation completes
13. Repeated visual Tailwind tokens should be centralized.
14. Progress fill styling should use an explicit shared visual token rather than inherited `currentColor`.
15. `ImagePreview` loading behavior should remain consumer-controlled for LCP/above-the-fold usage.
16. `FilePreview` should expose loading control rather than hard-code lazy loading.
17. `CurrencyInput` should not impose a region-specific currency default in a generic primitive.

### Type/API quality — deferred where not already addressed
18. `ExplainerPanel` weak typing was addressed in an earlier remediation batch.
19. `IconResolver` uses `React.ComponentType<any>` and an untyped icon registry; pending later type-quality pass.
20. `FileList` should prefer stable file identity over mutable metadata plus index keys; pending API review.
21. `PercentageInput`/`DurationInput` need a stable generalized unit/formatter contract before consumer migration.

### Dependency review
22. Newly created foundation primitives do not intentionally import heavy feature libraries. Existing sharedUI imports `lucide-react` in `ExplainerPanel`/`IconResolver`; dependency removal is deferred until the import graph is validated.

## Remediation completed in current batch
- `Field`: stable unique generated IDs plus explicit `id` support and associated description/error IDs.
- `QualityControl`: stable unique generated IDs plus explicit `id` support.
- `DimensionsControl`: stable unique generated IDs plus explicit base `id` support.

## Validation limitations
- Source audit and remediation were performed through GitHub.
- The current GitHub execution path does not provide local `npm run lint`, TypeScript compiler, or production build execution.
- Therefore no green-build claim is made.

## Guardrails
- No consumer migration in Phase 1.
- No `main` changes.
- One controlled remediation batch at a time.
- Sync this status after every step, including no-change audits.

## Current result
**NOT READY FOR CONSUMER MIGRATION.** Remaining HIGH findings must be remediated and source-audited before proceeding to MEDIUM findings or consumer migration.

## Next action
Remediate the remaining confirmed HIGH API/accessibility/semantic findings, starting with `FileDropzone`, `FileItem`, and `PdfFileList`. Then synchronize this MD and verify the status-only commit before proceeding to heading/API findings.