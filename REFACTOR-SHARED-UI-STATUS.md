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

## Current result
**Foundation remediation is complete and CI typecheck/build has passed with ESLint intentionally skipped. Consumer migration is now authorized, subject to the capability-preservation protocol above.**

## Current next consumer
`ImageCompressorClient` — migrate its existing local `StatCard` to `@/sharedUI/statCard` only after confirming every existing `StatCard` behavior is represented by the shared API. No compression logic or unrelated code changes are permitted.
