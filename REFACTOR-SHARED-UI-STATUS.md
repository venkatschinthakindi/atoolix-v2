# Shared UI Refactor — Master Status

## Current status
- Shared UI foundation remediation is complete through the confirmed BLOCKER/HIGH findings and validated build fixes.
- `SectionHeader` preserves rendered React-node icons and component-type icons, including object-valued Lucide/forwardRef components.
- `SectionHeader` has an optional `variant="card"` capability derived from existing calculator presentation; default behavior remains unchanged.
- `StatCard` preserves the EMI local `accent` and `tone` behaviors as optional shared capabilities.
- Consumer migration continues only after exact capability comparison against the original working implementation.
- CI/build is the validation gate; repository-wide ESLint baseline remains intentionally deferred.

## Latest completed work
### Percentage calculator SectionHeader
- Consumer commit: `bcad81f7e341ca6230b1615248057d182e8fcb57`.
- File: `src/components/tools/calculator/percentage/percentageOf.tsx`.
- Removed the local `SectionHeader` implementation and imported `@/sharedUI/sectionHeader`.
- Added `variant="card"` to both existing SectionHeader usages so the original card presentation is preserved.
- No calculation/business logic was changed.
- Exact consumer commit changed one file.

### StatCard / EMI
- Shared capability commit: `0a0a04f0282458760060bbdbd75cbd03c48ec1c7`.
- Added optional `accent?: boolean` and `tone?: "positive" | "neutral"` using the existing EMI behavior.
- CI passed.
- EMI consumer commit: `5d077253beb53c1d86d9a961217b5556438ab3b0`.
- File: `src/components/tools/emiCalculator/core/EmiCalculatorHubPage.tsx`.
- Local StatCard removed; existing StatCard usages preserved.

### SectionHeader build fix
- Commit: `7fb3bb043237623f05a3911a11e37b8207a1cd4b`.
- File: `src/sharedUI/sectionHeader.tsx`.
- Fixed object-valued component types such as Lucide/forwardRef icons after the prerender failure.

## Completed StatCard consumers
1. `ImageCompressorClient.tsx` — `bbe435d3af9428158fc7d69229b25f5610078945`
2. `fixedDepositCalculator.tsx` — `e23c2a5bf26cff70d3ffd2183f5a58ade8fb7594`
3. `recurringDepositCalculator.tsx` — `02e9ea415239d63b4a92d8cea0c7e978d0f64bef`
4. `compoundInterestCalculator.tsx` — `0a51c8d6d2a3ed07df551c59c8a61b37474da860`
5. `simpleInterestDepositsSuite.tsx` — `1ed8ea97993513b1c2a4ad1f1676f707277ffeeb`
6. `ImageConverterClient.tsx` — `7eca3667941b26babc0798e3cf5ed9758eb2006d`
7. `EmiCalculatorHubPage.tsx` — `5d077253beb53c1d86d9a961217b5556438ab3b0`

## Completed SectionHeader consumers
- `compoundInterestCalculator.tsx`
- `fixedDepositCalculator.tsx`
- `recurringDepositCalculator.tsx`
- `simpleInterestDepositsSuite.tsx`
- `ImageToPDFClient.tsx`
- `percentageOf.tsx`
- Grouped commit for first five: `558d7d373a0466c7c0271777864b5c5c50da994a`.
- Percentage consumer commit: `bcad81f7e341ca6230b1615248057d182e8fcb57`.

## Audit corrections
- `UnitConverter.tsx` local `StatCard` was not an active consumer; no migration is claimed.
- `EquationSolver.tsx` local `StatCard` was not an active consumer; no migration is claimed.
- `basicPercentage.tsx` uses feature-specific `ResultBox`; no StatCard migration is claimed.

## Remaining consumer audit
- `src/components/tools/calculator/percentage/basicPercentage.tsx` — local SectionHeader remains; compare exact active usage against shared `SectionHeader` before migration.
- `src/components/tools/calculator/SmartCalculator.tsx` — local calculator presentation requires exact comparison.
- `src/components/tools/financeSuite/retirement/retirementWealthSuite.tsx` — local calculator presentation requires exact comparison.
- Legacy image composites (`SuccessBanner`, `MetadataCard`, `MetadataGrid`, `PreviewCard`, `DownloadCard`, `ToolButton`, `ToolLayout`) remain deferred until exact shared capability equivalence is proven.

## Rules
- Preserve original working behavior; do not invent or redesign business logic.
- Shared components may gain optional capabilities when an existing consumer genuinely requires them.
- Consumer migrations should normally be one consumer file per commit.
- Inspect exact source and diff before each patch.
- Sync this MD after every repository step, including no-change/status-only steps.
- No consumer migration may silently remove an existing capability.

## Next
Proceed with the next actual active consumer. Prefer direct patching when the complete current source is available; never overwrite a file from truncated content. Verify the consumer diff, run CI/build, and synchronize this MD before moving on.