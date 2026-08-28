# Shared UI Refactor — Master Status

## Current status
- Shared UI foundation remediation is complete through the confirmed BLOCKER/HIGH findings and validated build fixes.
- `SectionHeader` preserves rendered React-node icons and component-type icons, including object-valued Lucide/forwardRef components.
- `SectionHeader` has optional `variant="card"` capability derived from existing calculator presentation.
- The `card` variant now preserves the original calculator layout: icon + vertically stacked title/subtitle + optional right-side actions.
- `StatCard` preserves the EMI local `accent` and `tone` behaviors as optional shared capabilities.
- Consumer migration continues only after exact capability comparison against the original working implementation.
- CI/build is the validation gate; repository-wide ESLint baseline remains intentionally deferred.

## Latest completed work
### SectionHeader card-layout compatibility fix
- Commit: `3aa904c12745fb6f1489e049ed08afdc9fb728ea`.
- File: `src/sharedUI/sectionHeader.tsx`.
- Corrected the `variant="card"` structure to preserve the existing local calculator SectionHeader layout and support optional right-side actions.
- This was necessary before migrating consumers such as `SmartCalculator`, whose local SectionHeader includes an action area.
- No business/calculation logic changed.
- CI/build validation is required for this shared-component change.

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
- `basicPercentage.tsx` — `39dbadbf17ff4dfa775457ac41881d3a7c384645`

## Audit corrections
- `UnitConverter.tsx` local `StatCard` was not an active consumer; no migration is claimed.
- `EquationSolver.tsx` local `StatCard` was not an active consumer; no migration is claimed.
- `basicPercentage.tsx` local `ResultBox` remains feature-specific and was not migrated.

## Remaining consumer audit
- `src/components/tools/calculator/SmartCalculator.tsx` — local SectionHeader has `action?: ReactNode`; shared `SectionHeader` now supports equivalent `actions` behavior through `variant="card"`. Ready for exact consumer migration.
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
Run CI/build for `3aa904c12745fb6f1489e049ed08afdc9fb728ea`. If clean, migrate `SmartCalculator.tsx` as the next one-file consumer. Map `action` to shared `actions` without changing behavior, then verify the one-file consumer diff and sync this MD.