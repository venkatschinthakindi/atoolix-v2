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

## Phase 1 — Foundation only
Status: IN PROGRESS

### Consumer migration constraint
No existing tool/component consumer is being migrated or modified during Phase 1.

### Foundation families
- `tool`: page shell/header/action bar/result/processing/empty states — IMPLEMENTED
- `file`: dropzone/list/item/metadata/preview — IMPLEMENTED
- `calculator`: StatCard/Field/number/percentage/currency/duration inputs/result summary — PARTIAL
- `image`: preview/settings/quality/dimensions/format controls — PENDING
- `pdf`: file list/page selector/preview — PENDING
- `feedback`: error/success/privacy/loading states — PENDING

## Current design contract
Shared components expose a small stable base API plus optional advanced capability groups/slots. Common Tailwind classes are centralized in the component layer. Variants are controlled and intentional. Components should not accumulate one-off business rules. Heavy functionality must not be pulled into lightweight components.

## Current implementation batch
### StatCard
Status: IMPLEMENTED
Commit: `fa4aeb1d79d799171b7bb43a0fc1ab98b76493fa`

### SectionHeader
Status: IMPLEMENTED
Commit: `8b78b1d1c92fce30f0de89d8539d0f1b2b6581f9`

### Tool family
Status: IMPLEMENTED
Commits:
- `4df2cc2754387a5fa80ab248ca9d8cdc40f89ae6` — ToolPageShell
- `c617e3629458090cd5b4934bccdb688066ea822e` — ToolHeader
- `079ab96e3199ebe873a1eeda9920e9d453611f10` — ToolActionBar
- `4c494ad56470bad68a88cb3f608023cc2bad97ef` — ToolResult
- `df198af6b355a741d25a5cc86b4ec7b3cce4049b` — ProcessingState
- `583e24eebbd8d40e9c0ac82839378564427623a2` — EmptyState

### File family
Status: IMPLEMENTED
Commits:
- `259cdf3efd12b9a1a9fa180a525d9132857c30a3` — FileMetadata
- `ea2675c37c19d6aabd1e1ddfc531953e691ea3d5` — FilePreview initial implementation
- `a77a6503fc05c36537e33eb33074426ae974bcdb` — FilePreview render-safety correction
- `1b0b648449bccac79d710ffaff383562384f0de1` — FileItem
- `4083f7a999f6b7893c56c7619d99c771ed533716` — FileList
- `7cb426f6f4cf4b06b8f212bed246bf765a134bfd` — FileDropzone

## Validation note
The file-family source files were created independently of consumers. `FilePreview` was corrected to avoid creating object URLs during render. Full TypeScript/lint/build validation still needs to be performed through a local/CI-capable execution path before Phase 1 is declared validated.

## Next action
Implement the `calculator` foundation family only: `Field`, `NumberInput`, `PercentageInput`, `CurrencyInput`, `DurationInput`, and `ResultSummary`. `StatCard` is already implemented. Do not modify consumers. Sync this status file after the batch before continuing to the next family.