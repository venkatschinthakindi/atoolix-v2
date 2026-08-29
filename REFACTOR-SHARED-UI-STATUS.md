# Shared UI Refactor — Master Status

## Branch note (2026-08-29)
- This status file was originally maintained on `refactor/shared-ui-foundation`.
- That branch's shared-component library and consumer migrations have now
  been merged into `refactor/shared-ui-components-v2` (this branch), which
  also contains an independent hero/onboarding-section extraction for the
  finance-suite savings calculators (`CalculatorHero`, `QuickStartStrip`,
  `MethodologyNote`, `EstimateDisclaimer`) plus a route-wrapper factory for
  the investment calculators (`createInvestmentReturnsPage`).
- `refactor/shared-ui-components-v2` is now the single active branch for
  this refactor effort. This file should keep being kept in sync here,
  not on the older `refactor/shared-ui-foundation` branch.
- `main` has not been touched at any point; all work lands on this branch
  only, and is pushed to `origin/refactor/shared-ui-components-v2` after
  every commit.

## Current status
- `SectionHeader` preserves rendered React-node icons and component-type
  icons, including object-valued Lucide/forwardRef components, and has an
  optional `variant="card"` capability derived from existing calculator
  presentation (icon + stacked title/subtitle + optional right-side
  actions).
- `StatCard` preserves the EMI local `accent` and `tone` behaviors, plus a
  `variant` prop (`default` / `finance` / `image`) so it can reproduce
  each consumer's original bespoke styling.
- Consumer migration only happens after exact capability comparison
  against the original working implementation — no invented props, no
  redesigned business logic.
- Validation gate on this branch: `tsc --noEmit` + targeted `eslint` runs
  after every change. A full `npm run build` currently fails in this
  sandbox due to a Google Fonts network restriction — reproduced
  identically on unmodified `main`, so it's an environment limitation,
  not a regression from this work. Run a real build before merging to
  `main`.
- `*SeoContent*` files are explicitly out of scope for this entire
  refactor effort — never modify them here.
- No test cases are added as part of this refactor effort.

## Completed work, in commit order (refactor/shared-ui-components-v2)

### 1. Hero/onboarding extraction for savings calculators — `d8db5f2`
- Files: `compoundInterestCalculator.tsx`, `fixedDepositCalculator.tsx`,
  `recurringDepositCalculator.tsx`, `simpleInterestDepositsSuite.tsx`.
- New shared components in `src/sharedUI/calculator/`:
  - `CalculatorHero` — unifies the "compact" 3-item feature strip
    (compound/FD/RD) and the "detailed" 2x2 icon-box variant (simple
    interest) behind one `variant` prop.
  - `QuickStartStrip`, `MethodologyNote`, `EstimateDisclaimer`.
  - `calculatorHelpers.ts` (`clamp`, `inputCls`).
- No calculation logic changed. Net −671 lines across the 4 consumers.

### 2. Investment calculator route-wrapper dedup — `ffee72b`
- New shared factory: `createInvestmentReturnsPage(tab)` in
  `src/sharedUI/calculator/createInvestmentReturnsPage.tsx`.
- Files: `cagrCalculator.tsx`, `investmentReturnsSuite.tsx`,
  `lumpsumCalculator.tsx`, `xirrCalculator.tsx` — each reduced to a 2-line
  factory call. Kept as 4 separate files (not consolidated into one)
  because each needs its own module path for the per-tool code-splitting
  in `src/data/clientToolLoaders.ts`.

### 3. Merge of refactor/shared-ui-foundation's component library — `1c43c11`
- Adopted the foundation branch's enhanced `sectionHeader.tsx` and
  `statCard.tsx` (additive `variant`/`accent`/`tone` props). Verified
  safe before adopting: `sectionHeader`'s only existing consumer
  (`InvestmentReturnsHubPage.tsx`) renders identically under the new
  `default` variant; the generic `statCard.tsx` had zero consumers
  before this commit.
- Copied in `calculator/{CurrencyInput,DurationInput,Field,NumberInput,
  PercentageInput,ResultSummary}.tsx` and the `feedback/`, `file/`,
  `image/`, `pdf/`, `tool/` component folders — all additive, no naming
  collisions with this branch's own calculator components.

### 4. Merge of refactor/shared-ui-foundation's consumer migrations — `4064003`
- 12 consumers this branch had not touched were taken as-is from
  `refactor/shared-ui-foundation` (verified zero prior changes here on
  this branch, `tsc` clean, lint error count unchanged vs. `main`: 23
  pre-existing errors before and after — no new errors introduced):
  - `calculator/Calculator.tsx`, `EquationSolver.tsx`, `SmartCalculator.tsx`
  - `calculator/percentage/basicPercentage.tsx`, `percentageOf.tsx`
  - `converter/UnitConverter.tsx`
  - `emiCalculator/core/EmiCalculatorHubPage.tsx`
  - `financeSuite/retirement/retirementWealthSuite.tsx`
  - `image/imageCompressor/ImageCompressorClient.tsx`
  - `image/imageConverter/ImageConverterClient.tsx`
  - `image/passpoerPhotoResizer/passportPhotoCompressorClient.tsx`
  - `pdf/image-to-pdf/ImageToPDFClient.tsx`
- 4 files both branches had modified were manually reconciled (this
  branch's hero-section changes from step 1 + the foundation branch's
  field-level changes, applied on top of each other since the two sets
  touched non-overlapping regions of the same files):
  - `financeSuite/savings/compoundInterestCalculator.tsx`
  - `financeSuite/savings/fixedDepositCalculator.tsx`
  - `financeSuite/savings/recurringDepositCalculator.tsx`
  - `financeSuite/savings/simpleInterestDepositsSuite.tsx`
  - For these 4: local `StatCard`/`SectionHeader`/`inputCls` were
    replaced with the shared imports; the 3 duplicated numeric fields in
    each (principal/rate/duration or equivalent) were replaced with
    `CurrencyInput`/`NumberInput`/`DurationInput`; any remaining dropdown
    (compounding frequency, deposit timing) stayed on the local `Field`
    component since it wraps a `CustomSelect`, not a plain numeric
    input.
  - No calculation/business logic changed — verified via diff that every
    `compute*()` function is byte-identical to `main` across all 4
    files.

## Consumer migration history (inherited from refactor/shared-ui-foundation)
These commits happened on the original `refactor/shared-ui-foundation`
branch before the merge above; kept here for traceability.

- `basicPercentage.tsx` — `39dbadbf17ff4dfa775457ac41881d3a7c384645` —
  local `SectionHeader` replaced with `@/sharedUI/sectionHeader`,
  `variant="card"` added.
- `percentageOf.tsx` — `bcad81f7e341ca6230b1615248057d182e8fcb57` — same,
  both usages.
- `Calculator.tsx` / `EquationSolver.tsx` —
  `b6a7a5ffa50271a5fc12312bb0d316f132f2ff81` — `Calculator.tsx` normalized
  to explicit `switch` category mapping; `EquationSolver.tsx` migrated to
  shared `SectionHeader` (its local `StatCard` was not migrated — not an
  active consumer).
- `EmiCalculatorHubPage.tsx` — `StatCard` capability commit
  `0a0a04f0282458760060bbdbd75cbd03c48ec1c7` added optional `accent`/
  `tone`; consumer commit `5d077253beb53c1d86d9a961217b5556438ab3b0`
  migrated EMI to the shared `StatCard`.
- SectionHeader compatibility fixes: `7fb3bb043237623f05a3911a11e37b8207a1cd4b`
  (object-valued Lucide/forwardRef icon compatibility) and
  `3aa904c12745fb6f1489e049ed08afdc9fb728ea` (restored card layout +
  optional actions).
- `UnitConverter.tsx` — `66ee51e659dc9401160eb5ffc92743ed2df9d178` —
  local `SectionHeader` replaced with the shared one.
- `ImageCompressorClient.tsx` — `823a89a7e22d0d2213c14ca0172773d628e1cecd`
  — shared `StatCard` import confirmed.
- `passportPhotoCompressorClient.tsx` —
  `adbe84b6cb6ba385a6e08a70d04d37e4243f2259` — shared `StatCard` import
  confirmed.
- `retirementWealthSuite.tsx` — `e3bfbd08dc3adf00749e9489283af25ce0a4491f`
  — local `StatCard` replaced with the shared one; `accent`/`tone`/`hint`
  were already supported by the shared component, no new capability
  needed.
- Savings calculator batch — `6c7c6fc352f5293be5b1236fd6bc80947c1c95e9` —
  original field-level migration of the 4 savings calculators to shared
  `StatCard` + `CurrencyInput`/`NumberInput`/`DurationInput` (this is the
  work reconciled into step 4 above, on top of this branch's hero
  extraction).

## Completed StatCard consumers
1. `ImageCompressorClient.tsx`
2. `fixedDepositCalculator.tsx`
3. `recurringDepositCalculator.tsx`
4. `compoundInterestCalculator.tsx`
5. `simpleInterestDepositsSuite.tsx`
6. `ImageConverterClient.tsx`
7. `EmiCalculatorHubPage.tsx`
8. `retirementWealthSuite.tsx`
9. `passportPhotoCompressorClient.tsx`

## Completed SectionHeader consumers
- `compoundInterestCalculator.tsx`
- `fixedDepositCalculator.tsx`
- `recurringDepositCalculator.tsx`
- `simpleInterestDepositsSuite.tsx`
- `ImageToPDFClient.tsx`
- `percentageOf.tsx`
- `basicPercentage.tsx`
- `SmartCalculator.tsx`
- `EquationSolver.tsx`
- `UnitConverter.tsx`
- `InvestmentReturnsHubPage.tsx` (pre-existing consumer, unaffected by
  the `sectionHeader.tsx` enhancement in step 3 above)

## Remaining consumer audit
- Legacy image composites (`SuccessBanner`, `MetadataCard`,
  `MetadataGrid`, `PreviewCard`, `DownloadCard`, `ToolButton`,
  `ToolLayout`) remain deferred until exact shared capability equivalence
  is proven.
- `ImageToPDFClient.tsx` already uses the shared `@/sharedUI/sectionHeader`;
  its remaining `ToolButton`, `SuccessBanner`, and `ToolProgress` imports
  have no confirmed `@/sharedUI` replacements yet, so it is not a valid
  migration target for those pieces yet.
- The `feedback/`, `file/`, `image/`, `pdf/`, `tool/` shared component
  folders (added in step 3 above) have zero consumers as of commit
  `1c43c11`. They're staged for future image/pdf tool-family refactor
  phases — don't assume they're wired into any consumer until a specific
  migration commit says so.
- Continue the broader `src/sharedUI/` consumer matrix audit one shared
  component at a time; do not infer consumers from stale code-search
  results — always inspect the actual current branch tree.

## Rules
- Preserve original working behavior; do not invent or redesign business
  logic.
- Shared components may gain optional capabilities when an existing
  consumer genuinely requires them — do not add decorative props without
  an evidence-based need.
- Consumer migrations should normally be one consumer file per commit
  (or one clearly-scoped batch, as documented above).
- Inspect exact source and diff before each patch.
- Sync this MD after every repository step, including no-change/
  status-only steps.
- No consumer migration may silently remove an existing capability.
- Preserve consumer-specific semantic props such as `accent`, `tone`,
  `hint`, `variant`, and `actions` whenever they are actually used.
- Complete-file replacement is the working process for consumer changes
  when files diverge structurally; targeted `str_replace`-style patches
  are used when the change is a small, well-isolated swap.
- Do not modify any `*SeoContent*` file under this refactor.
- Do not add test cases as part of this refactor.
- Keep this MD in sync after every step so other agents/models picking up
  this branch have an accurate, current picture — this is the single
  source of truth for refactor progress, superseding any status doc on
  `refactor/shared-ui-foundation`.

## Next
- Image tool family: wire the newly-merged `feedback/`, `file/`, `image/`
  `sharedUI` components into `ImageCompressorClient.tsx`,
  `ImageConverterClient.tsx`, and `passportPhotoCompressorClient.tsx`
  where they duplicate dropzone/preview/quality-control markup, following
  the same "exact source/diff inspection before each patch" process used
  throughout this file.
- Then the `pdf/` tool family using the `pdf/` sharedUI folder.
- CI/build remains the ultimate validation gate once a real build
  environment is available; `tsc --noEmit` + `eslint` remain the interim
  gate in this sandbox.
- Do not touch `*SeoContent*` files or add test cases at any point in
  this effort.
