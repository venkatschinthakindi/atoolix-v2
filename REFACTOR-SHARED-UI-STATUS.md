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

## Phase 1 — Foundation only
Status: IN PROGRESS

### Consumer migration constraint
No existing tool/component consumer is being migrated or modified during Phase 1.

### Foundation families
- `tool`: page shell/header/action bar/result/processing/empty states — IMPLEMENTED
- `file`: dropzone/list/item/metadata/preview — IMPLEMENTED
- `calculator`: StatCard/Field/number/percentage/currency/duration inputs/result summary — IMPLEMENTED
- `image`: preview/settings/quality/dimensions/format controls — PENDING
- `pdf`: file list/page selector/preview — PENDING
- `feedback`: error/success/privacy/loading states — PENDING

## Current design contract
Shared components expose a small stable base API plus optional advanced capability groups/slots. Common Tailwind classes are centralized in the component layer. Variants are controlled and intentional. Components should not accumulate one-off business rules. Heavy functionality must not be pulled into lightweight components.

## Current implementation batch
### Calculator family
Status: IMPLEMENTED
Commits:
- `695a68bc0116ec8b0e1668c49cb04d619fb8f3a1` — Field
- `d8565e830a2f8e6aa307d0874f2d867f5f5b6d68` — NumberInput
- `79e62b22d312339b18df6f02c4f7760ec6010c10` — PercentageInput
- `0e5c5e3d773f76ce29cfaf3f63e0e9ab4ad87838` — CurrencyInput
- `a3af684864ea7b90aea5622b25a47f93670581c8` — DurationInput
- `ff3be32842464bb0ec53046362a479703240e4be` — ResultSummary

## Validation note
The calculator-family source files were created independently of consumers. Full TypeScript/lint/build validation still needs to be performed through a local/CI-capable execution path before Phase 1 is declared validated.

## Next action
Implement the `image` foundation family only: `ImagePreview`, `ImageSettings`, `QualityControl`, `DimensionsControl`, and `FormatSelector`. Do not modify consumers. Sync this status file after the batch before continuing to the next family.