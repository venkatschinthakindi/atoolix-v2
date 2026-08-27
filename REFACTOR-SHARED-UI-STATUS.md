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

## Phase 1 — Foundation only
Status: IN PROGRESS

### Consumer migration constraint
No existing tool/component consumer is being migrated or modified during Phase 1.

### Foundation families
- `tool`: page shell/header/action bar/result/processing/empty states — IMPLEMENTED
- `file`: dropzone/list/item/metadata/preview — IMPLEMENTED
- `calculator`: StatCard/Field/number/percentage/currency/duration inputs/result summary — IMPLEMENTED
- `image`: preview/settings/quality/dimensions/format controls — IMPLEMENTED
- `pdf`: file list/page selector/preview — PENDING
- `feedback`: error/success/privacy/loading states — PENDING

## Current design contract
Shared components expose a small stable base API plus optional advanced capability groups/slots. Common Tailwind classes are centralized in the component layer. Variants are controlled and intentional. Components should not accumulate one-off business rules. Heavy functionality must not be pulled into lightweight components.

## Current implementation batch
### Image family
Status: IMPLEMENTED
Commits:
- `94d88b94c9219ce9c74b7773d37e75a92bac8c4d` — ImagePreview
- `89d9efb6c9f00552c6d70ee7b2452c5eefa0f2f1` — QualityControl
- `c520535e39c9cefcb7829532b2fa4d173e281ec6` — DimensionsControl
- `2d1e20d650cbe733154ac7183ad7e2edcfd2cf6f` — FormatSelector
- `9eb0e7b4419634431b5245a0eda6d5ecd2891f92` — ImageSettings

## Validation note
The image-family source files were created independently of consumers. Full TypeScript/lint/build validation still needs to be performed through a local/CI-capable execution path before Phase 1 is declared validated.

## Next action
Implement the `pdf` foundation family only: `PdfFileList`, `PdfPageSelector`, and `PdfPreview`. Do not modify consumers. Sync this status file after the batch before continuing to the feedback family.