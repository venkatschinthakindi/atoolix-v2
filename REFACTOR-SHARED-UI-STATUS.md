# Shared UI Refactor — Master Status

## Current status
- Shared UI foundation remediation is complete through the confirmed BLOCKER/HIGH findings and validated build fixes.
- `SectionHeader` preserves rendered React-node icons and component-type icons, including object-valued Lucide/forwardRef components.
- `SectionHeader` has optional `variant="card"` capability derived from existing calculator presentation.
- The `card` variant preserves the original calculator layout: icon + vertically stacked title/subtitle + optional right-side actions.
- `StatCard` preserves the EMI local `accent` and `tone` behaviors as optional shared capabilities.
- Consumer migration continues only after exact capability comparison against the original working implementation.
- CI/build is the validation gate; repository-wide ESLint baseline remains intentionally deferred.

## Latest completed work
### Basic percentage calculator SectionHeader
- Consumer commit: `39dbadbf17ff4dfa775457ac41881d3a7c384645`.
- File: `src/components/tools/calculator/percentage/basicPercentage.tsx`.
- Removed the local `SectionHeader` implementation and imported `@/sharedUI/sectionHeader`.
- Added `variant="card"` to the existing SectionHeader usage.
- No calculation/business logic changed.

### Percentage calculator SectionHeader
- Consumer commit: `bcad81f7e341ca6230b1615248057d182e8fcb57`.
- File: `src/components/tools/calculator/percentage/percentageOf.tsx`.
- Removed the local `SectionHeader` implementation and imported `@/sharedUI/sectionHeader`.
- Added `variant="card"` to both existing SectionHeader usages.

### StatCard / EMI
- Shared capability commit: `0a0a04f0282458760060bbdbd75cbd03c48ec1c7`.
- Added optional `accent?: boolean` and `tone?: "positive" | "neutral"` using existing EMI behavior.
- CI passed.
- EMI consumer commit: `5d077253beb53c1d86d9a961217b5556438ab3b0`.
- File: `src/components/tools/emiCalculator/core/EmiCalculatorHubPage.tsx`.
- Local StatCard removed; existing usages preserved.

### SectionHeader compatibility/build fixes
- `7fb3bb043237623f05a3911a11e37b8207a1cd4b` — object-valued Lucide/forwardRef icon compatibility after prerender failure.
- `3aa904c12745fb6f1489e049ed08afdc9fb728ea` — restored calculator card layout and optional right-side actions.

## Completed StatCard consumers
1. `ImageCompressorClient.tsx` — `bbe435d3af9428158fc7d69229b25f5610078945`
2. `fixedDepositCalculator.tsx` — `e23c2a5bf26cff70d3ffd2183f5a58ade8fb7594`
3. `recurringDepositCalculator.tsx` — `02e9ea415239d63b4a92d8cea0c7e978d0f64bef`
4. `compoundInterestCalculator.tsx` — `0a51c8d6d2a3ed07df551c59c8a61b37474da860`
5. `simpleInterestDepositsSuite.tsx` — `1ed8ea97993513b1c2a4ad1f1676f707277ffeeb`
6. `ImageConverterClient.tsx` — `7eca3667941b26babc0798e3cf5ed9758eb2006d`
7. `EmiCalculatorHubPage.tsx` — `5d077253beb53c1d86d9a961217b5556438ab3b0`
8. `retirementWealthSuite.tsx` — `e3bfbd08dc3adf00749e9489283af25ce0a4491f`

### Retirement StatCard consumer
- Consumer commit: `e3bfbd08dc3adf00749e9489283af25ce0a4491f`.
- File: `src/components/tools/financeSuite/retirement/retirementWealthSuite.tsx`.
- Removed the local `StatCard` implementation and imported `@/sharedUI/statCard`.
- Existing `StatCard` call sites were preserved; no calculation/business logic changed.
- Capability check: the former local implementation exposed `accent`, `tone`, and `hint`; the shared `StatCard` already supports these as optional props, so no additional consumer tagging or shared capability change was required.
- No extra `accent`/`tone` props were invented where the existing consumer did not explicitly use them.

## Completed SectionHeader consumers
- `compoundInterestCalculator.tsx`
- `fixedDepositCalculator.tsx`
- `recurringDepositCalculator.tsx`
- `simpleInterestDepositsSuite.tsx`
- `ImageToPDFClient.tsx`
- `percentageOf.tsx` — `bcad81f7e341ca6230b1615248057d182e8fcb57`
- `basicPercentage.tsx` — `39dbadbf17ff4dfa775457ac41881d3a7c384645`

### SectionHeader capability verification
- The shared component accepts `icon?: ElementType | ReactNode`, so component-type and already-rendered icon values are both supported.
- `variant="card"` is available where a consumer's original local header used the calculator card presentation.
- `actions?: ReactNode` is the shared API for right-side action content; the legacy SmartCalculator local API uses singular `action` and therefore requires `action` → `actions` during migration.
- Do not add `variant`, `actions`, or other props to consumers unless the original consumer actually needs that behavior.
- Do not add decorative props merely for visual consistency.

## Audit corrections
- `UnitConverter.tsx` local `StatCard` was not an active consumer; no migration is claimed.
- `EquationSolver.tsx` local `StatCard` was not an active consumer; no migration is claimed.
- `basicPercentage.tsx` local `ResultBox` remains feature-specific and was not migrated.

## Remaining consumer audit
- `src/components/tools/calculator/SmartCalculator.tsx` — **DEFERRED** because the current GitHub connector returns a truncated source representation, while the safe write operation requires the complete current file. Required migration remains: local `SectionHeader` → shared `SectionHeader`, preserving the existing right-side action (`action` → shared `actions`) and card layout (`variant="card"`). Do not overwrite until the current complete blob is available.
- Legacy image composites (`SuccessBanner`, `MetadataCard`, `MetadataGrid`, `PreviewCard`, `DownloadCard`, `ToolButton`, `ToolLayout`) remain deferred until exact shared capability equivalence is proven.
- Continue the broader `src/sharedUI/` consumer matrix audit one shared component at a time; do not infer consumers from stale code-search results.

## Rules
- Preserve original working behavior; do not invent or redesign business logic.
- Shared components may gain optional capabilities when an existing consumer genuinely requires them.
- Consumer migrations should normally be one consumer file per commit.
- Inspect exact source and diff before each patch.
- Sync this MD after every repository step, including no-change/status-only steps.
- No consumer migration may silently remove an existing capability.
- A Git retrieval/write limitation on one consumer must not block progress on other verified consumers.
- Preserve consumer-specific semantic props such as `accent`, `tone`, `hint`, `variant`, and `actions` whenever they are actually used; do not add decorative props without an evidence-based need.

## Next
`StatCard` retirement migration is complete at `e3bfbd08dc3adf00749e9489283af25ce0a4491f`. `SectionHeader` audit is now recorded: seven consumers completed, with `SmartCalculator.tsx` explicitly deferred pending safe complete-source access. Continue with the next sharedUI component in the one-component-at-a-time matrix, carrying forward the rule to add optional props only when an existing consumer demonstrates a real requirement.