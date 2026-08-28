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

### Calculator tab / Equation Solver SectionHeader batch
- Consumer commit: `b6a7a5ffa50271a5fc12312bb0d316f132f2ff81`.
- Files:
  - `src/components/tools/calculator/Calculator.tsx`
  - `src/components/tools/calculator/EquationSolver.tsx`
- `Calculator.tsx` was normalized to use the explicit `switch` category mapping and direct tab rendering while preserving the existing calculator, equation-solver, and percentage tabs.
- `EquationSolver.tsx` removed its local `SectionHeader` implementation and imported `@/sharedUI/sectionHeader`.
- The local `StatCard` in `EquationSolver.tsx` was not migrated because it is not an active consumer.
- No calculation/business logic was intentionally changed by the shared UI migration.

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

### UnitConverter SectionHeader migration
- Consumer commit: `66ee51e659dc9401160eb5ffc92743ed2df9d178`.
- File: `src/components/tools/converter/UnitConverter.tsx`.
- Replaced the local `SectionHeader` implementation with `@/sharedUI/sectionHeader`.
- Removed the local header implementation while preserving the existing converter behavior and presentation intent.
- The commit also contains source-formatting normalization; no converter business logic was intentionally changed.

### ImageCompressor StatCard checkpoint
- Consumer commit: `823a89a7e22d0d2213c14ca0172773d628e1cecd`.
- File: `src/components/tools/image/imageCompressor/ImageCompressorClient.tsx`.
- Added/confirmed the shared `@/sharedUI/statCard` import for the compressor's StatCard usage.
- The commit also contains substantial source-formatting normalization in the same consumer; this is recorded as repository history rather than being represented as a one-line-only migration.
- No new shared capability was introduced by this commit.

### Passport photo resizer/compressor shared StatCard checkpoint
- Consumer commit: `adbe84b6cb6ba385a6e08a70d04d37e4243f2259`.
- File: `src/components/tools/image/passpoerPhotoResizer/passportPhotoCompressorClient.tsx`.
- Added/confirmed the shared `@/sharedUI/statCard` import for the passport photo resizer/compressor consumer.
- Existing resize/compression behavior remains the source of truth.
- The commit also contains substantial source-formatting normalization; this is recorded as repository history rather than being represented as an exact one-line migration.
- No new shared capability was introduced by this commit.

## Completed StatCard consumers
1. `ImageCompressorClient.tsx` — `bbe435d3af9428158fc7d69229b25f5610078945`
2. `fixedDepositCalculator.tsx` — `e23c2a5bf26cff70d3ffd2183f5a58ade8fb7594`
3. `recurringDepositCalculator.tsx` — `02e9ea415239d63b4a92d8cea0c7e978d0f64bef`
4. `compoundInterestCalculator.tsx` — `0a51c8d6d2a3ed07df551c59c8a61b37474da860`
5. `simpleInterestDepositsSuite.tsx` — `1ed8ea97993513b1c2a4ad1f1676f707277ffeeb`
6. `ImageConverterClient.tsx` — `7eca3667941b26babc0798e3cf5ed9758eb2006d`
7. `EmiCalculatorHubPage.tsx` — `5d077253beb53c1d86d9a961217b5556438ab3b0`
8. `retirementWealthSuite.tsx` — `e3bfbd08dc3adf00749e9489283af25ce0a4491f`
9. `ImageCompressorClient.tsx` — shared import reconfirmed in `823a89a7e22d0d2213c14ca0172773d628e1cecd`
10. `passportPhotoCompressorClient.tsx` — shared import added/confirmed in `adbe84b6cb6ba385a6e08a70d04d37e4243f2259`

### Retirement StatCard consumer
- Consumer commit: `e3bfbd08dc3adf00749e9489283af25ce0a4491f`.
- File: `src/components/tools/financeSuite/retirement/retirementWealthSuite.tsx`.
- Removed the local `StatCard` implementation and imported `@/sharedUI/statCard`.
- Existing `StatCard` call sites were preserved; no calculation/business logic changed.
- Capability check: the former local implementation exposed `accent`, `tone`, and `hint`; the shared `StatCard` already supports these as optional props, so no additional consumer tagging or shared capability change was required.
- No extra `accent`/`tone` props were invented where the existing consumer did not explicitly use them.

### Savings calculator batch — latest checkpoint
- Batch commit: `6c7c6fc352f5293be5b1236fd6bc80947c1c95e9`.
- Files completed in this commit:
  - `src/components/tools/financeSuite/savings/fixedDepositCalculator.tsx`
  - `src/components/tools/financeSuite/savings/recurringDepositCalculator.tsx`
  - `src/components/tools/financeSuite/savings/simpleInterestDepositsSuite.tsx`
  - `src/components/tools/financeSuite/savings/compoundInterestCalculator.tsx`
- Existing local `StatCard` usage was preserved through `@/sharedUI/statCard`.
- Existing calculator input implementations in these consumers were also replaced with the confirmed shared `CurrencyInput`, `NumberInput`, and `DurationInput` components.
- Existing min/max/step constraints, hints, currency display, and value clamping were preserved at the consumer call sites.
- No calculation/business logic, routes, SEO, state, API, or functionality changes were introduced by this batch.
- The authoritative branch checkpoint before the calculator/EquationSolver update was `6c7c6fc352f5293be5b1236fd6bc80947c1c95e9`.

## Completed SectionHeader consumers
- `compoundInterestCalculator.tsx`
- `fixedDepositCalculator.tsx`
- `recurringDepositCalculator.tsx`
- `simpleInterestDepositsSuite.tsx`
- `ImageToPDFClient.tsx`
- `percentageOf.tsx` — `bcad81f7e341ca6230b1615248057d182e8fcb57`
- `basicPercentage.tsx` — `39dbadbf17ff4dfa775457ac41881d3a7c384645`
- `SmartCalculator.tsx` — `7edd9e476429e9744eb00fae8ecf2a21f7a90e90`
- `EquationSolver.tsx` — `b6a7a5ffa50271a5fc12312bb0d316f132f2ff81`
- `UnitConverter.tsx` — `66ee51e659dc9401160eb5ffc92743ed2df9d178`

## Remaining consumer audit
- Legacy image composites (`SuccessBanner`, `MetadataCard`, `MetadataGrid`, `PreviewCard`, `DownloadCard`, `ToolButton`, `ToolLayout`) remain deferred until exact shared capability equivalence is proven.
- `ImageToPDFClient.tsx` already uses the shared `@/sharedUI/sectionHeader`; its remaining `ToolButton`, `SuccessBanner`, and `ToolProgress` imports have no confirmed `@/sharedUI` replacements, so it is not a valid migration target yet.
- Continue the broader `src/sharedUI/` consumer matrix audit one shared component at a time; do not infer consumers from stale code-search results.
- The latest branch history confirms the passport photo resizer/compressor consumer has reached a shared `StatCard` checkpoint; further reusable-component work must start from that current source state.

## Rules
- Preserve original working behavior; do not invent or redesign business logic.
- Shared components may gain optional capabilities when an existing consumer genuinely requires them.
- Consumer migrations should normally be one consumer file per commit.
- Inspect exact source and diff before each patch.
- Sync this MD after every repository step, including no-change/status-only steps.
- No consumer migration may silently remove an existing capability.
- A Git retrieval/write limitation on one consumer must not block progress on other verified consumers.
- Complete-file replacement is the working process for consumer changes; do not provide partial patch instructions.
- Preserve consumer-specific semantic props such as `accent`, `tone`, `hint`, `variant`, and `actions` whenever they are actually used; do not add decorative props without an evidence-based need.

## Next
- CI-validated documentation checkpoint: `47ff0092df84bc8c0c01ad96ab2ddd36bdf68123`.
- `47ff0092...` is the current CI-passed MD synchronization checkpoint.
- No consumer change is being claimed for `ImageToPDFClient.tsx`; its remaining legacy components lack confirmed shared equivalents.
- Next consumer must be selected from the actual current branch tree by confirmed shared-component equivalence, not from stale search results.
