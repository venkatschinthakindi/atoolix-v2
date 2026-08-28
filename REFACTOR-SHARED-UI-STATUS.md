# Shared UI Refactor — Master Status

## Current status
- Shared UI foundation remediation is complete through the confirmed BLOCKER/HIGH findings and validated build fixes.
- `SectionHeader` preserves both rendered React-node icons and component-type icons, including object-valued Lucide/forwardRef components.
- `StatCard` preserves the EMI local `accent` and `tone` behaviors as optional shared capabilities.
- EMI `StatCard` consumer migration is complete in `src/components/tools/emiCalculator/core/EmiCalculatorHubPage.tsx`.
- Consumer migration continues only after exact capability comparison against the original working implementation.
- CI/build is the validation gate; repository-wide ESLint baseline remains intentionally deferred.

## Latest completed work
### SectionHeader
- Shared compatibility fix: `7fb3bb043237623f05a3911a11e37b8207a1cd4b`.
- Exact changed file: `src/sharedUI/sectionHeader.tsx`.
- Production prerender failure was caused by attempting to render object-valued component types as React children; fixed with `createElement` handling.

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
- An attempted migration commit `29e16b6d21410e8b6f0f5e68b879b512ff1d6ede` was therefore corrected rather than counted as a consumer migration.
- The local unused `StatCard` and its unused shared import were removed in the follow-up commit `f9a22305798f3e668e52b9bb8a208bf2ba645bb4`.
- The temporary unproven converter-specific shared capability was reverted in `e490623a51ff4493c4f4acc951b7133b801f3d0b`.
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
- `src/components/tools/calculator/EquationSolver.tsx` — local result/stat presentation requires exact comparison.
- `src/components/tools/calculator/percentage/basicPercentage.tsx` — local calculator result presentation requires exact comparison.
- `src/components/tools/calculator/percentage/percentageOf.tsx` — local calculator result presentation requires exact comparison.
- `src/components/tools/calculator/SmartCalculator.tsx` — local calculator result presentation requires exact comparison.
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
Proceed with the next confirmed local `StatCard` consumer only after comparing its exact API/behavior with `src/sharedUI/statCard.tsx`. If a capability is missing, patch the shared component first, validate CI/build, sync this MD, then migrate the consumer.