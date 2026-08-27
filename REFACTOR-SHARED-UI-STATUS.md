# Shared UI Refactor — Master Status

## Scope
- Branch: `refactor/shared-ui-foundation`
- Base: `main` at `77453723cefda4768084541ba246629bb1daab1c`
- `main` must remain untouched until the user manually merges the completed branch.

## Requirements
- Build reusable sharedUI components with basic and optional advanced capabilities.
- Reuse common Tailwind classes/styles rather than duplicating consumer styling.
- Responsive mobile/tablet/desktop behavior.
- Accessibility and semantic HTML.
- High performance: minimize client JavaScript, avoid unnecessary dependencies, preserve server rendering where possible.
- SEO-friendly page structure and rendering.
- Keep business/domain logic in feature-specific code.
- Validate each migration before proceeding.
- Synchronize this status file at every step, including no-change audits.

## Completed
- Created isolated branch from `main`.
- Initial reuse audit performed.
- Confirmed duplicated/reusable patterns including StatCard, SectionHeader, file/dropzone UI, tool shell/header patterns, calculator controls, result/progress UI, and feature-specific image/PDF primitives.

## Current focus
### StatCard API audit
Status: IN PROGRESS

Known implementations/areas:
- `src/sharedUI/statCard.tsx`
- generic UI StatCard implementation
- image-tool StatCard implementation
- finance savings core StatCard implementation

Decision: inspect actual consumers and supported behavior before defining the final shared API. The shared component must support simple consumers and optional advanced variants without accumulating consumer-specific business logic.

## Next action
Complete the StatCard consumer/API audit, define the smallest shared API and styling contract, then implement the shared component on this branch only.
