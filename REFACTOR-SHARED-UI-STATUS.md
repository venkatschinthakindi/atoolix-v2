# Shared UI Refactor — Master Status

## Current status
- Shared UI foundation remediation is complete through the confirmed BLOCKER/HIGH findings and validated build fixes.
- `SectionHeader` preserves rendered React-node icons and component-type icons, including object-valued Lucide/forwardRef components.
- `SectionHeader` now also has an optional `variant="card"` capability derived from the existing calculator consumer presentation; default behavior remains unchanged.
- `StatCard` preserves the EMI local `accent` and `tone` behaviors as optional shared capabilities.
- EMI `StatCard` consumer migration is complete in `src/components/tools/emiCalculator/core/EmiCalculatorHubPage.tsx`.
- Consumer migration continues only after exact capability comparison against the original working implementation.
- CI/build is the validation gate; repository-wide ESLint baseline remains intentionally deferred.

## Latest completed work
### SectionHeader
- Shared compatibility fix: `7fb3bb043237623f05a3911a11e37b8207a1cd4b`.
- Exact changed file: `src/sharedUI/sectionHeader.tsx`.
- Production prerender failure was caused by attempting to render object-valued component types as React children; fixed with `createElement` handling.
- Card-variant capability commits: `dbc39991b8928fdb1c1ef0d14f8eb1681fc6ece0`, `2dbaa4af9f50ed53fd2a59827195878ec919cde4`, and `e27a6642f42745c6ee4875595380864076c12b4f`.
- Final `e27a664...` state restores the original default structure while adding the optional card presentation variant.
- No calculator consumer has been migrated to the new variant yet.

### StatCard capability
- Shared capability commit: `0a0a04f0282458760060bbdbd75cbd03c48ec1c7`.
- Added optional `accent?: boolean` and `tone?: "positive" | "neutral"` while retaining existing shared API.
- CI passed.

### EMI consumer
- Consumer commit: `5d077253beb53c1d86d9a961217b5556438ab3b0`.
- File: `src/components/tools/emiCalculator/core/EmiCalculatorHubPage.tsx`.
- Local `StatCard` implementation was removed and replaced with `@/sharedUI/statCard`.
- Existing `<StatCard>` usages were preserved; no new `accent`/`tone` usage was invented.
- CI passed.

### UnitConverter audit correction
- `UnitConverter.tsx` contained a local `StatCard` implementation that had no confirmed active consumer usage in the current source.
- An attempted migration was corrected rather than counted as a consumer migration.
- No UnitConverter `StatCard` consumer migration is claimed.

## Completed StatCard consumers
1. `ImageCompressorClient.tsx` — `bbe435d3af9428158fc7d69229b25f5610078945`
2. `fixedDepositCalculator.tsx` — `e23c2a5bf26cff70d3ffd2183f5a58ade8fb7594`
3. `recurringDepositCalculator.tsx` — `02e9ea415239d63b4a92d8cea0c7e978d0f64bef`
4. `compoundInterestCalculator.tsx` — `0a51c8d6d2a3ed07df551c59c8a61b37474da860`
5. `simpleInterestDepositsSuite.tsx` — `1ed8ea97993513b1c2a4ad1f1676f707277ffeeb`
6. `ImageConverterClient.tsx` — `7eca3667941b26babc0798e3cf5ed9758eb2006d`
7. `EmiCalculatorHubPage.tsx` — `5d077253beb53c1d86d9a961217b5556438ab3b0`

## SectionHeader consumers completed
- `compoundInterestCalculator.tsx`
- `fixedDepositCalculator.tsx`
- `recurringDepositCalculator.tsx`
- `simpleInterestDepositsSuite.tsx`
- `ImageToPDFClient.tsx`
- Grouped migration commit: `558d7d373a0466c7c0271777864b5c5c50da994a`.

## Remaining consumer audit
The remaining local/shared candidates must be mapped from their actual source before migration. Do not blindly replace feature-specific composites.

### Confirmed candidates requiring capability comparison
- `src/components/tools/calculator/EquationSolver.tsx` — contains local `SectionHeader` and an unused local `StatCard`; the `StatCard` is not an active consumer and must not be counted as a migration.
- `src/components/tools/calculator/percentage/basicPercentage.tsx` — contains local `SectionHeader`; its result UI is a feature-specific `ResultBox`, not a `StatCard` consumer.
- `src/components/tools/calculator/percentage/percentageOf.tsx` — contains local `SectionHeader`; result UI must be compared before any migration.
- `src/components/tools/calculator/SmartCalculator.tsx` — local calculator presentation requires exact comparison.
- `src/components/tools/financeSuite/retirement/retirementWealthSuite.tsx` — local calculator presentation requires exact comparison.
- Legacy image composites (`SuccessBanner`, `MetadataCard`, `MetadataGrid`, `PreviewCard`, `DownloadCard`, `ToolButton`, `ToolLayout`) remain deferred until exact shared capability equivalence is proven.

## Rules
- Preserve original working behavior; do not invent or redesign business logic.
- Shared components may gain optional capabilities when an existing consumer genuinely requires them.
- Consumer migrations should normally be one consumer file per commit.
- Inspect exact source and diff before each patch.
- Sync this MD after every repository step, including validation/status-only steps.
- No consumer migration may silently remove an existing capability.

## Next
Migrate the next actual active consumer of a shared family, not merely an unused local component. For calculator `SectionHeader` consumers, use the new optional `variant="card"` only where it reproduces the existing working presentation. Continue one consumer per commit, validate CI/build, then sync this MD.