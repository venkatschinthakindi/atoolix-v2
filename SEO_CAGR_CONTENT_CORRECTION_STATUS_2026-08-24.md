# CAGR Content Correction Status — 2026-08-24

## Evidence

The current `main` CAGR SEO content contains two claims that do not match the current calculator input contract:

1. The FAQ says CAGR can be calculated for less than one year.
2. The FAQ says the measurement period can be converted from months into years.

The shared calculator engine currently enforces `cagrYears: { min: 1, max: 100 }`, so the current UI does not accept a sub-one-year period.

## Google guidance

Google's current Search guidance favors useful, accurate, people-first content and discourages generic/commodity content. The correction should therefore make the page accurately describe the existing product rather than changing calculator behavior merely for SEO.

## Decision

**Confirmed content mismatch. Content-only correction is justified.**

Do not change the CAGR calculation engine as part of this task.

Do not add keywords, FAQs, pages, or unrelated SEO changes.

## Implementation status

**Blocked from safe targeted repository write.**

The available GitHub write operation replaces the complete UTF-8 file. A genuinely targeted textual patch operation is not available in the current connector. The CAGR SEO file is large, and a whole-file replacement would violate the audit requirement to make only the intended content changes.

Therefore no application source change was made and no CI run was triggered.

## Intended minimal correction

- Rewrite the FAQ `Can CAGR be calculated for less than one year?` so it does not claim that the current calculator supports sub-one-year input.
- Rewrite the FAQ `Can CAGR be calculated using months?` so it does not imply that the current calculator accepts month-based/fractional-year input.

## Anti-loop rule

Do not repeat the same audit or attempt a whole-file workaround. Reopen implementation only when a genuinely patch-capable repository write path is available, or when the source file can be safely edited without replacing unrelated content.

## Next action

Use a patch-capable repository operation to make only the two FAQ text corrections, then commit, run CI/build/type/lint validation, validate production output when accessible, and update this MD to the resulting state.
