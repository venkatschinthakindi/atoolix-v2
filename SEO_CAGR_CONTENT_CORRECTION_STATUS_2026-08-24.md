# CAGR Content Correction Status — 2026-08-24

## Confirmed defect
The CAGR SEO content contains two FAQ claims that do not match the current calculator input contract:

1. The FAQ implies CAGR can be calculated for less than one year.
2. The FAQ implies the measurement period can be converted from months into years.

The shared calculator engine enforces `cagrYears: { min: 1, max: 100 }`, so the current UI does not accept a sub-one-year period or month-based/fractional-year input.

## Decision
**Content-only correction is justified.**

Do not change the CAGR calculation engine merely for SEO. Do not add unrelated keywords, FAQs or pages.

## Execution status
The repository now exposes a genuine patch-capable Git tree/blob path. The correction is executable without reconstructing or replacing unrelated repository files.

### Required minimal source change
Only these two FAQ answers should change:
- `Can CAGR be calculated for less than one year?`
- `Can CAGR be calculated using months?`

The corrected answers must accurately describe the current UI contract and must not claim unsupported sub-one-year or month-based input.

### Validation requirements
After the source patch:
1. Verify the diff contains only the intended CAGR SEO-content file.
2. Synchronize the master SEO execution MD immediately.
3. Run TypeScript/build/lint validation.
4. Inspect actual CI results; do not infer pass/fail.
5. Validate the production CAGR page after deployment.

## Current state
- [x] Defect confirmed against calculator input contract.
- [x] Minimal correction scope defined.
- [x] Patch-capable repository path available.
- [ ] Two FAQ answers corrected.
- [ ] Master SEO execution MD synchronized after source correction.
- [ ] TypeScript/build/lint validation after correction.
- [ ] Production validation after deployment.
