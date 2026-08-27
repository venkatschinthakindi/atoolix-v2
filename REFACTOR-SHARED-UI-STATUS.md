# Shared UI Refactor — Master Status

## Scope
- Branch: `refactor/shared-ui-foundation`
- Base: `main` at `77453723cefda4768084541ba246629bb1daab1c`
- `main` must remain untouched until the user manually merges the completed branch.
- Phase 1 is foundation-only: create reusable components; **do not migrate or modify consumers yet**.

## Requirements
- Build reusable sharedUI components with basic and optional advanced capabilities.
- Reuse common Tailwind classes/styles rather than duplicating consumer styling.
- Responsive mobile/tablet/desktop behavior.
- Accessibility and semantic HTML.
- High performance: minimize client JavaScript, avoid unnecessary dependencies, preserve server rendering where possible.
- SEO-friendly semantic structure and rendering.
- Keep business/domain logic in feature-specific code.
- Components must support simple consumers without forcing advanced features.
- Advanced features must be explicit and optional; avoid uncontrolled boolean-prop/API growth.
- Validate each implementation batch before proceeding.
- Synchronize this status file at every step, including no-change audits.

## Completed
- Created isolated branch from `main`.
- Created this master status file.
- Initial reuse audit completed.
- Confirmed existing sharedUI primitives include `explainerPanel`, `filterToolHubPage`, `iconResolver`, `sectionHeader`, and `statCard`; existing primitives must be evaluated before adding duplicates.
- Confirmed duplicated/reusable patterns across StatCard, SectionHeader, file/dropzone UI, tool shell/header patterns, calculator controls, result/progress UI, and image/PDF primitives.

## Phase 1 — Shared foundation
Status: IN PROGRESS

### Explicit constraint
No existing tool/component consumer will be migrated during Phase 1. The foundation is created and validated independently first.

### Planned shared families
- `tool`: page shell/header/action bar/result/processing/empty states
- `file`: dropzone/list/item/metadata/preview
- `calculator`: StatCard/Field/number/percentage/currency/duration inputs/result summary
- `image`: preview/settings/quality/dimensions/format controls
- `pdf`: file list/page selector/preview
- `feedback`: error/success/privacy/loading states
- SEO/support utilities where appropriate, without moving tool-specific content or business logic into sharedUI

### Existing components to evolve/reuse rather than duplicate
- `src/sharedUI/statCard.tsx`
- `src/sharedUI/sectionHeader.tsx`
- `src/sharedUI/explainerPanel.tsx`
- `src/sharedUI/filterToolHubPage.tsx`
- `src/sharedUI/iconResolver.tsx`

## Current design contract
Shared components should expose a small stable base API plus optional advanced capability groups/slots. Styling should be centralized through reusable Tailwind class constants/utilities where practical, while allowing controlled visual variants. Components should remain independently importable to avoid creating a large client bundle.

## Audit result before implementation
Existing sharedUI contains five primitives already. The new foundation must extend/reuse these rather than duplicate them. Phase 1 now moves from audit into implementation. Consumer migration is explicitly deferred until the entire foundation is complete and validated.

## Next action
Implement the shared foundation components only, beginning with the existing `StatCard`/`SectionHeader` primitives and then the tool, file, calculator, image, PDF, and feedback families. After each implementation batch, sync this status file before continuing. Do not change consumers.
