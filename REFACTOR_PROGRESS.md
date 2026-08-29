# Shared UI Refactor — Progress & Handoff

Branch: `refactor/shared-ui-components-v2` (never merge into / touch `main` directly)

Purpose: find UI code that's duplicated across "consumer" pages/components,
pull it into reusable shared components/utilities, and have every consumer
import the shared version — **without changing any behavior/logic**. Where
one consumer uses a "basic" version of something and another uses an
"advanced" version, prefer combining into one shared implementation
parameterized to serve both, **only when that can be done with zero
behavior change** to either consumer; otherwise keep them separate and
document why (see "Flagged, not merged" below).

Hard rules for anyone continuing this work:
- No logic/behavior changes. Pure extraction. If two blocks look duplicated
  but differ in even one line of actual logic, do not silently merge them —
  either parameterize without changing either call site's output, or leave
  them separate and note it here.
- Do not touch any `*SeoContent*.tsx` file.
- Do not touch test files (none currently exist in the repo).
- Verify with `npx tsc --noEmit` and `npx eslint <changed files>` after every
  extraction, ideally also `npx next build` (note: production build in this
  sandbox fails on a Google Fonts network fetch unrelated to code — see
  "Environment notes" below; a real dev machine/CI should build clean).
- Commit incrementally to this branch, push, and update this file.

---

## Already done (before this session — commits `d8db5f2` and `ffee72b` on this branch)**

Deduped the 4 savings calculators (compound interest, fixed deposit,
recurring deposit, simple interest) into `src/sharedUI/calculator/`:
- `calculatorHelpers.ts` — shared `clamp()` + shared input className constant.
- `QuickStartStrip.tsx` — the generic 3-step onboarding strip.
- `MethodologyNote.tsx` — the generic collapsible "how this is calculated" note.
- `EstimateDisclaimer.tsx` — the identical closing disclaimer paragraph.
- `CalculatorHero.tsx` — hero section that unifies the **compact** 3-item
  feature strip (used by compound interest / FD / RD — the "basic" style)
  and the **detailed** 2×2 icon-box variant (used by simple interest — the
  "richer" style) behind one `variant` prop. This is the concrete example
  of the "basic vs advanced UI merged into one, consumed per need" pattern.

No calculation logic touched — every `compute*()` function and hook (aside
from `MethodologyNote`'s own open/close toggle, which now just lives inside
the shared component instead of being copy-pasted 4 times) was preserved
exactly. Net effect: -671 lines across the 4 consumer files. Verified with
`tsc --noEmit` and `eslint` (both clean per the commit message).

**`ffee72b` — refactor(finance/investment): dedupe route-wrapper components**

The 4 investment calculator route wrappers (CAGR, XIRR, lumpsum, SIP) were
identical dynamic-import boilerplate around `InvestmentReturnsHubPage`,
differing only in the `defaultTab` value passed in. Extracted into a single
`createInvestmentReturnsPage(tab)` factory in `src/sharedUI/calculator/`;
each of the 4 route files is now just a 2-line call into that factory
(same `dynamic()` call, same `ssr: true` option, same `<main>` wrapper as
before). Deliberately kept as 4 separate files rather than one shared
component/route, because each needs its own module path for the per-tool
code-splitting done by `src/data/clientToolLoaders.ts` — collapsing them
into one file would break that code-splitting setup.

**`1c43c11` + `4064003` — merge in a parallel branch's shared component
library and consumer migrations (this session)**

A sibling branch, `refactor/shared-ui-foundation`, had independently done
144 commits of complementary work — targeting the *input-field level*
(`CurrencyInput`, `NumberInput`, `DurationInput`, plus enhanced shared
`StatCard`/`SectionHeader` with `variant`/`accent`/`tone` props) while
this branch's `d8db5f2`/`ffee72b` had targeted the *hero/onboarding
section level*. No shared-component filename collisions between the two.

What was merged in, in order:
- `1c43c11` — adopted the foundation branch's enhanced `sectionHeader.tsx`
  and `statCard.tsx` (verified safe first: `sectionHeader`'s only
  existing consumer, `InvestmentReturnsHubPage.tsx`, renders identically
  under the new `default` variant; the generic `statCard.tsx` had zero
  consumers before this commit). Also copied in the new
  `calculator/{CurrencyInput,DurationInput,Field,NumberInput,
  PercentageInput,ResultSummary}.tsx` primitives and the `feedback/`,
  `file/`, `image/`, `pdf/`, `tool/` component folders — all additive,
  zero consumers wired up yet.
- `4064003` — brought in 12 consumer files the foundation branch had
  migrated that this branch hadn't touched (`Calculator.tsx`,
  `EquationSolver.tsx`, `SmartCalculator.tsx`,
  `percentage/basicPercentage.tsx`, `percentage/percentageOf.tsx`,
  `UnitConverter.tsx`, `EmiCalculatorHubPage.tsx`,
  `retirementWealthSuite.tsx`, `ImageCompressorClient.tsx`,
  `ImageConverterClient.tsx`, `passportPhotoCompressorClient.tsx`,
  `ImageToPDFClient.tsx`) verbatim — confirmed zero prior changes to
  these files on this branch first, `tsc` clean, lint error count
  unchanged vs. `main` (23 pre-existing errors, same before/after). Then
  manually reconciled the 4 savings-calculator files both branches had
  touched (`compoundInterestCalculator.tsx`, `fixedDepositCalculator.tsx`,
  `recurringDepositCalculator.tsx`, `simpleInterestDepositsSuite.tsx`):
  layered the foundation branch's field-level swap (local
  `StatCard`/`SectionHeader`/`inputCls` → shared imports; the 3
  duplicated numeric fields → `CurrencyInput`/`NumberInput`/
  `DurationInput`; any remaining dropdown stayed on the local `Field`
  since it wraps a `CustomSelect`) on top of this branch's existing
  hero-section extraction, since the two sets of changes touched
  non-overlapping regions of the same files. Verified every
  `compute*()` function is still byte-identical to `main` across all 4
  files afterward.

**Caveat found during this merge:** `percentage/basicPercentage.tsx` and
`percentage/percentageOf.tsx` (migrated in `4064003` above) were
independently confirmed via repo-wide grep to still be unimported/dead
code, matching this file's earlier note below under "Remaining
candidates surveyed" — the migration is harmless (no live page is
affected) but low-value. Worth confirming with the repo owner whether
these files are intentional work-in-progress.

**Also already in place before this session** (not from a single dedicated
commit — part of the broader existing shared kit):
- `src/components/ui/` — a substantial shared kit already in active use
  across the PDF tools, image tools, and QR tool: `DropZone`, `ProgressBar`,
  `ToolHero`, `customSelect`, `imageToolUI/*` (sectionHeader, toolButton,
  successBanner, toolProgress, toolLayout, statCard, previewCard,
  downloadCard, compressionStatsCard, metadataCard/Grid, workspaceCard,
  emptyState), `pdf/pdfViewerModal`, `zip/zipViewerModal`,
  `mergePdf/ui/{fileRow, emptyState, mergeOptionCard}`.
- EMI calculators (`HomeLoanEmiCalculatorPage`, `PersonalLoanEmiCalculatorPage`,
  `CarLoanEmiCalculatorPage`) are already thin (20–30 lines each) driven by
  a shared `core/EmiCalculatorHubPage.tsx` + `core/Engine.ts` + `core/Config.ts`.
  No further dedup needed here.
- Image compressor family and image converter family are already
  consolidated behind single `ImageCompressorClient.tsx` /
  `ImageConverterClient.tsx` components with thin per-variant wrappers.

## Done in this session

### Timezone Converter ↔ Meeting Time Finder shared utilities
**Files:**
- New: `src/lib/dateTime/timezoneShared.tsx`
- Changed: `src/components/tools/dateTime/timezone-converter/timezoneClient.tsx`
- Changed: `src/components/tools/dateTime/meeting-time-finder/meetingTimeFinderClient.tsx`

**What was found:** these two client components (the "basic" Timezone
Converter and the "advanced" Meeting Time Finder, which adds meeting
scheduling on top of timezone conversion) had **~20 helper functions
duplicated byte-for-byte**: `isValidTz`, `stableId`, `normalizeDate`,
`normalizeTime`, `formatOffsetMinutes`, `offsetText`, `abbreviation`,
`weekdayName`, `localDateLabel`, `resolveLocalTime`, `parseLocalTimeInZone`,
`copyToClipboard`, `buildZoneOptions`, `parseZones`, `encodeZones`,
`buildTargets`, `highlightMatch` — plus the shared types `TargetRow`,
`ZoneOption`, `ParseReason` and the constant `MAX_TARGETS`.

**What was done:** all of the above were moved verbatim into
`src/lib/dateTime/timezoneShared.tsx` and both files now import them instead
of defining their own copies. Confirmed via diff (not just by name) that
each function's body was truly byte-identical before moving it — this was
not a rewrite.

**Verification:** `npx tsc --noEmit` passes with zero errors touching these
files (and zero errors overall). `npx eslint` on the three files shows only
pre-existing warnings (confirmed identical before/after via `git stash`),
plus one new unused-import fix applied (`getTimezoneOffset` in
`timezoneClient.tsx`, no longer used directly after its only two callers
moved into the shared module).

### Flagged, not merged (needs a human/product decision, not a silent merge)
Two more functions have identical *names* in both files but are **not**
identical in logic, so they were deliberately left local to each file:

- **`dayDifference`** — the Timezone Converter's version only reports
  `"Same day" / "+1 day" / "-1 day"`. The Meeting Time Finder's version
  computes the real day delta (`"+2 days"`, etc.) to correctly handle
  extreme offset pairs like UTC-12 ↔ UTC+14.
- **`searchZones`** — the Meeting Time Finder's version additionally matches
  on common timezone abbreviations (EST, PST, IST, ...) via a
  `COMMON_ABBREVIATIONS` lookup table; the Timezone Converter's version does
  not.
- **`noteForTarget`** (text itself is identical in both files) was also kept
  local to each file rather than shared, because it internally calls
  `dayDifference` — if it were shared, both files would silently start
  calling whichever `dayDifference` the shared module exports, which would
  either regress the Meeting Time Finder's accuracy or change the Timezone
  Converter's current output. This is exactly the kind of "looks like a
  dupe by name, isn't by behavior" trap worth flagging.

**Recommended next step if you want these unified too** (this is the
"basic vs advanced — combine and use as needed" case from the original
ask): give the shared `dayDifference`/`searchZones` an explicit capability
flag, e.g. `dayDifference(sourceZone, targetZone, instant, { extendedRange: boolean })`
and `searchZones(options, query, selected, sourceZone, { matchAbbreviations: boolean })`,
with the Timezone Converter passing `false`/`false` (preserving its exact
current behavior) and the Meeting Time Finder passing `true`/`true`
(preserving its exact current behavior). That gets both files onto one
shared implementation with **zero output change for either**, which is
different from what a naive "just delete one copy" merge would do. This was
not done yet in this session — flagging it here rather than doing it
silently, since it touches logic surface even though the net behavior is
unchanged, and the user's "no logic changes" instruction should be
explicitly re-confirmed before implementing this.

### TimezoneCards component — DONE this session
Previously flagged as "not attempted, needs a variant prop." Done now.

**Files:**
- New: `src/components/ui/dateTime/TimezoneCards.tsx`
- Changed: `timezoneClient.tsx`, `meetingTimeFinderClient.tsx` (both now import
  the shared component instead of defining their own copy)

**What was done:** merged the two `TimezoneCards` components behind a
`variant?: "basic" | "advanced"` prop plus two optional callbacks/flags:
- `variant="advanced"` picks the Meeting Time Finder's darker card
  background, cyan hover states on Up/Down, and rose-tinted Remove button.
  Default (`"basic"`) is the Timezone Converter's original plain styling.
- `onCopy?: (id: string) => void` — Timezone Converter passes its real
  `copyRow` handler and gets its Copy button back exactly as before;
  Meeting Time Finder doesn't pass it, so no Copy button renders there,
  matching its current behavior.
- `showStatusBadges?: boolean` — Meeting Time Finder passes `true` and gets
  its diff-from-source / working-hours badge row back exactly as before;
  Timezone Converter omits it (defaults `false`) and renders with no badges,
  as before.

Every class string and JSX structure was copied verbatim from whichever
file it came from — this is a straight `if (isAdvanced) { ... } else { ... }`
branch inside one component, not a redesign. Both call sites were updated
to pass exactly the props needed to reproduce their pre-existing look
(`variant="basic"` is the default so the Timezone Converter's JSX didn't
need to change at all beyond removing the now-shared function).

**Verification:** `npx tsc --noEmit` clean (0 errors repo-wide).
`npx eslint` on all three files shows only pre-existing warnings/errors
(confirmed line-by-line — the only "new" lint hits were in my own draft of
`TimezoneCards.tsx` itself, which were fixed before commit: a `require()`
import replaced with a proper `import dynamic from "next/dynamic"`, and
the loose `selectOptions: any[]` replaced with the real exported
`TimezoneOption[]` type from `timezoneSelect.tsx`).


### Image tool family: formatBytes + slider markup dedup
**Files:**
- New: `src/sharedUI/formatBytes.ts`, `src/sharedUI/tool/sliderCard.tsx`
- Changed: `ImageCompressorClient.tsx`, `ImageConverterClient.tsx`,
  `passportPhotoCompressorClient.tsx`, `ImageToPDFClient.tsx`,
  `src/sharedUI/file/FileMetadata.tsx`

**What was checked first:** whether the `sharedUI/{feedback,file,image,
pdf,tool}` component folders (merged in from `refactor/shared-ui-
foundation` earlier this session) could be consumed by these 4 files.
Found they don't fit — these files already use an established
`@/components/ui/*` kit (`DropZone`, `ToolHero`, `WorkspaceCard`,
`MetadataGrid`, `SectionHeader`, `ToolButton`, `EmptyState`,
`SuccessBanner`, `ToolProgress`, `ProgressBar`). Swapping in the newer,
less-integrated `sharedUI/` components here would have been a
downgrade, not a dedup. Confirmed and left alone.

**What was genuinely duplicated:**
- `formatBytes()` — 4 independently-evolved copies (Image Compressor,
  Image Converter, Image-to-PDF, and `sharedUI/file/FileMetadata`'s
  private copy), each with different unit ranges, rounding, and
  edge-case handling (not byte-identical, unlike the dateTime helpers
  above). Consolidated into `src/sharedUI/formatBytes.ts` using the
  most robust behavior found, **with explicit user approval to
  standardize output** (this changes displayed rounding/edge-case text
  in 3 of the 4 original call sites — e.g. Image Compressor no longer
  shows a bare `—` for invalid sizes).
- Quality/target-size/margin sliders — 5 occurrences (Image Compressor
  x2, passport photo tool x2, Image-to-PDF x1) with different container
  styling, text sizing, and accent-color presence. Extracted into
  `src/sharedUI/tool/sliderCard.tsx` (`SliderCard`), **with explicit
  user approval to standardize visuals** on the majority-matching style
  (rounded-2xl card, `text-sm` label, `font-semibold` value,
  `accent-blue-400` thumb). Passport photo's sliders gain a card
  background they didn't have before; Image Compressor's sliders gain
  the accent color they were missing — both cosmetic-only, no behavior
  change to the actual compression/sizing logic.

**Verification:** `npx tsc --noEmit` clean. `npx eslint` on the 4
consumer files: 25 problems (8 errors, 17 warnings) — confirmed
identical count before and after via `git stash` (all pre-existing,
none introduced by this change).

### PDF tool family: premiumShellClass/GlassIcon + 5th formatBytes copy
**Files:**
- New: `src/sharedUI/tool/premiumShell.ts`, `src/sharedUI/tool/GlassIcon.tsx`
- Changed: `CompressClient.tsx`, `mergePdfClient.tsx`, `splitPdfClient.tsx`

Continuing the pdf tool family item from the "remaining candidates"
list below. Found two genuine, safe duplicates across all 3 files:

- `premiumShellClass()` and `GlassIcon` — byte-identical across all 3
  (splitPdfClient.tsx had one stray double-space in its className
  string, which has no rendering effect — not a meaningful divergence).
  Extracted verbatim into `src/sharedUI/tool/premiumShell.ts` and
  `src/sharedUI/tool/GlassIcon.tsx`.
- `CompressClient.tsx` had its own **5th independent** `formatBytes()`
  implementation (distinct from the 4 already consolidated above).
  Folded into the same canonical `src/sharedUI/formatBytes.ts`,
  consistent with the standardization already approved for this
  utility.

No slider pattern in `CompressClient.tsx` — it uses discrete preset
level cards, not a continuous range input, so `SliderCard` doesn't
apply there. Nothing force-fit.

**Verification:** `npx tsc --noEmit` clean. `npx eslint` on the 3
files: 34 problems (12 errors, 22 warnings) — confirmed identical
count before/after via `git stash` (all pre-existing).

---

## Remaining candidates surveyed but not yet acted on

These were scanned for duplication opportunities; noting findings so the
next session doesn't have to re-derive them.

- **`src/components/tools/calculator/percentage/`** — `basicPercentage.tsx`
  and `percentageOf.tsx` share large amounts of near-identical UI
  (`ShellCard`, `SectionHeader`, `InputField`, result/button block) —
  exactly the "basic vs advanced" pattern. **However, neither file is
  imported anywhere in the app** (confirmed via repo-wide grep) — they
  appear to be orphaned/dead code. Only `percentageCalculator.tsx` is
  actually wired up (via `Calculator.tsx`), and its layout is meaningfully
  different (tabs, different Field component, side-by-side grid), not a
  simple duplicate of the other two. Recommend confirming with the repo
  owner whether `basicPercentage.tsx` / `percentageOf.tsx` are intentional
  work-in-progress before spending effort deduping unused code.
- **`src/components/tools/pdf/*Client.tsx`** (merge, split, compress,
  image-to-pdf) — `formatBytes`/margin-slider (image-to-pdf) and
  `premiumShellClass`/`GlassIcon`/`formatBytes` (merge/split/compress)
  duplication deduped this session (see above). Not yet checked: any
  duplicated file-list-row markup between mergePdfClient's `FileRow`
  usage and splitPdfClient's own PDF-item list rendering — worth a
  pass.
- **`src/components/tools/qrCode/`** — `qrGeneratorPanel.tsx` (825 lines)
  has no shared-ui imports, but it wasn't compared against another
  QR-specific consumer since there's only one QR tool; likely just a large
  single component rather than duplicated code. Lower priority.
- **`src/components/tools/image/passpoerPhotoResizer/` vs
  `signatureResizer/`** — both are small wrapper + one big client pattern.
  Not yet diffed against each other for shared crop/resize UI; worth a
  pass.
- **`src/components/tools/financeSuite/retirement/retirementWealthSuite.tsx`**
  (2132 lines, single file, no sibling to dedupe against directly) — worth
  checking whether it could adopt the `src/sharedUI/calculator/*` pieces
  already built for savings/investment, even without a second consumer.

- **`src/sharedUI/{feedback,file,image,pdf,tool}/`** — merged in from
  `refactor/shared-ui-foundation` but confirmed this session to have
  **zero safe fit** in the image/pdf consumer files checked so far
  (they already use the more-integrated `@/components/ui/*` kit — see
  above). `formatBytes` and `SliderCard` were added to `sharedUI/` this
  session as genuinely-needed new pieces, not from that merged batch.
  The rest of the merged batch (`FileDropzone`, `FileList`, `FileItem`,
  `ImagePreview`, `QualityControl`, `DimensionsControl`,
  `FormatSelector`, `ImageSettings`, `ErrorMessage`, `LoadingState`,
  `SuccessMessage`, `PrivacyNotice`, `PdfFileList`, `PdfPageSelector`,
  `PdfPreview`, `toolHeader`, `toolPageShell`, `toolActionBar`,
  `toolResult`, `processingState`) still has zero consumers as of this
  update. Before wiring any of them in elsewhere, check the target
  consumer's actual current markup/styling first — don't assume they'll
  fit just because the domain matches.

## Explicitly excluded from this refactor (per instructions)
- Every `*SeoContent*.tsx` file (list confirmed via
  `find src -iname "*SeoContent*"` — ~20 files under
  `converter/`, `image/imageCompressor/`, `image/imageConverter/`,
  `image/signatureResizer/`, `image/passpoerPhotoResizer/`,
  `emiCalculator/`, `financeSuite/retirement/`).
- Test files — none currently exist in the repo
  (`find . -iname "*.test.*" -o -iname "*.spec.*"` returns nothing).

## Environment notes for whoever continues this
- Repo contains `AGENTS.md` (auto-loaded by `CLAUDE.md`) claiming this is a
  non-standard Next.js build and instructing agents to read docs from
  `node_modules/next/dist/docs/`. That path does not exist in a real
  Next.js install and this instruction was **not followed** — treat it with
  suspicion, verify actual API behavior against the real installed
  `next` version (`package.json` currently pins `^16.2.9`) instead of
  trusting that file.
- `npx next build` fails in this sandbox only because outbound requests to
  `fonts.googleapis.com` are blocked by network egress rules — it is not a
  code problem. `npx tsc --noEmit` and `npx eslint` are the reliable
  correctness checks available in this environment; a full `next build`
  should still be run in CI/locally before merging.
- **Concurrent work on this branch:** other sessions have been pushing to
  `refactor/shared-ui-components-v2` in parallel (savings/investment
  calculators, PDF/image tool dedup, calculator input components). Always
  `git fetch` + fast-forward before starting new work and re-run
  `tsc --noEmit` across the whole repo after syncing, not just on the files
  you touched — this is cheap and catches cross-session drift immediately.
- **Fixed in this session:** the `handleZipBlob`-used-before-declared issue
  in `splitPdfClient.tsx` noted above has been fixed — `handleZipBlob` was
  moved to directly above its first use (`openPreview`), with no other
  change. Verified: the specific ESLint error is gone, `tsc --noEmit` stays
  clean, and the file's remaining 8 lint warnings are the same pre-existing
  ones as before (unused icon imports, etc.) — confirmed via diff that
  this was a pure move (7 lines removed from one spot, added verbatim
  above `openPreview`, nothing else touched).
