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

## Phase 1 — Foundation only
Status: IN PROGRESS

### Consumer migration constraint
No existing tool/component consumer is being migrated or modified during Phase 1.

### Foundation families
- `tool`: page shell/header/action bar/result/processing/empty states — IMPLEMENTED
- `file`: dropzone/list/item/metadata/preview — PENDING
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

## Validation note
The tool-family source files have been created independently of consumers. Full TypeScript/lint/build validation still needs to be performed through a local/CI-capable execution path before Phase 1 is declared validated.

## Next action
Implement the `file` family only: `FileDropzone`, `FileList`, `FileItem`, `FileMetadata`, and `FilePreview`. Do not modify consumers. Sync this status file after the batch before continuing to the next family.