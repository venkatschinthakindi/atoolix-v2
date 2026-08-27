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

## Phase 1 — Foundation only
Status: IN PROGRESS

### Consumer migration constraint
No existing tool/component consumer is being migrated or modified during Phase 1.

### Foundation families
- `tool`: page shell/header/action bar/result/processing/empty states — IMPLEMENTED
- `file`: dropzone/list/item/metadata/preview — IMPLEMENTED
- `calculator`: StatCard/Field/number/percentage/currency/duration inputs/result summary — IMPLEMENTED
- `image`: preview/settings/quality/dimensions/format controls — IMPLEMENTED
- `pdf`: file list/page selector/preview — IMPLEMENTED
- `feedback`: error/success/privacy/loading states — PENDING

## Current design contract
Shared components expose a small stable base API plus optional advanced capability groups/slots. Common Tailwind classes are centralized in the component layer. Variants are controlled and intentional. Components should not accumulate one-off business rules. Heavy functionality must not be pulled into lightweight components.

## Current implementation batch
### PDF family
Status: IMPLEMENTED
Commits:
- `8c6252762387c8ebf64faaf5bef2fffd486b995d` — PdfFileList
- `344bb37331d1b833a338c2eaa5b8312c62e67016` — PdfPageSelector
- `cc441b987d24bd34e00e1be588bb29bc483b8548` — PdfPreview

## Validation note
The PDF-family source files were created independently of consumers. Full TypeScript/lint/build validation still needs to be performed through a local/CI-capable execution path before Phase 1 is declared validated.

## Next action
Implement the `feedback` foundation family only: `ErrorMessage`, `SuccessMessage`, `PrivacyNotice`, and `LoadingState`. Do not modify consumers. Sync this status file after the batch before completing Phase 1 validation.