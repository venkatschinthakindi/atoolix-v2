# Shared UI Refactor — Progress & Handoff

Branch: `refactor/shared-ui-components-v2` (never merge into / touch `main` directly)

**Note:** a separate, unrelated effort — dark/light theme migration — is
happening on branch `feature/dark-light-theme-migration` (created off this
branch, merged back manually by the repo owner when ready). That effort
tracks its own progress in `THEME_MIGRATION_PROGRESS.md` at the repo root,
not here, since it's a distinct workstream (styling/theming vs.
deduplication). If you're looking for theme-migration status, check that
file instead.

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

## Already done (before this session — commits `d8db5f2` and `ffee72b` on this branch)

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

### `dayDifference` / `searchZones` unified behind capability flags — DONE this session
Previously flagged as "needs a human/product decision before implementing."
User confirmed to proceed.

**Files:** `src/lib/dateTime/timezoneShared.tsx`, `timezoneClient.tsx`,
`meetingTimeFinderClient.tsx`.

**What was done:**
- `dayDifference(sourceZone, targetZone, instant, options?)` — the two
  previously-separate function bodies are now selected by
  `options.extendedRange` (`false`/omitted = Timezone Converter's original
  ±1-day-only string comparison; `true` = Meeting Time Finder's original
  real day-delta math for extreme offset pairs).
- `searchZones(options, query, selected, sourceZone, opts?)` — selected by
  `opts.matchAbbreviations` (`false`/omitted = Timezone Converter's
  original name/searchKey-only matching; `true` = Meeting Time Finder's
  original `COMMON_ABBREVIATIONS`-aware matching). `COMMON_ABBREVIATIONS`
  itself moved into the shared module as a private constant.
- Both consumer files now import these from the shared module instead of
  keeping local copies. `timezoneClient.tsx`'s call sites pass no options
  (defaults reproduce its exact original behavior). `meetingTimeFinderClient.tsx`'s
  call sites pass `{ extendedRange: true }` and `{ matchAbbreviations: true }`
  respectively, reproducing its exact original behavior.
- `noteForTarget` stays local to each file (unchanged) — it's 5 lines of
  glue calling `dayDifference`, not worth a shared export on its own.

**Verification — beyond just tsc/eslint this time:**
- `npx tsc --noEmit`: 0 errors repo-wide.
- `npx eslint` on all three touched files: identical problem count
  before/after (43 problems: 37 errors, 6 warnings on the two client
  files, 0 on the shared module) — confirmed via `git stash` comparison.
  One incidental fix included: removed a `ZoneOption` type import that
  became unused in both files once the last function using it moved to
  the shared module.
- **Behavioral equivalence test** (not just code review): wrote small
  standalone scripts reimplementing the old basic/advanced/new versions of
  both functions and ran them against multiple zone pairs (including a
  ~26-hour-gap pair to specifically exercise the extended-range branch)
  and multiple queries (empty, abbreviation, partial city/country, no
  match) across several instants (including a DST-transition date). Old
  basic output == new output with no options, and old advanced output ==
  new output with the flags set, in every case tested — confirms the
  merge is output-identical for both tools, not just "looks the same by
  inspection."



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

### EMI calculator loan-type route wrappers + Home Loan intro fix
**Files:**
- New: `src/sharedUI/calculator/createEmiLoanPage.tsx`
- Changed: `CarLoanEmiCalculatorPage.tsx`, `HomeLoanEmiCalculatorPage.tsx`,
  `PersonalLoanEmiCalculatorPage.tsx`

Same route-wrapper pattern as `createInvestmentReturnsPage` — the 3
loan-type pages were near-identical dynamic-import + intro-paragraph +
`EmiCalculatorHubPage` wrappers. Extracted into
`createEmiLoanPage(loanType)`; each route file is now a 2-line call.
Also removed genuinely dead code found while comparing the 3 files:
Car and Personal imported `Metadata`, `Link`, `getCachedTools`,
`HUB_ROUTE`, `ROUTE_MAP` and declared a `REGISTRY_ID` constant, none of
which were referenced anywhere in either file.

**Content fix, explicit user approval (not a silent change):** Home
Loan's page was showing the generic 3-loan-type hub intro
(`HUB_COPY.intro`) instead of its own dedicated home-loan intro
(`LOAN_PAGE_COPY.home.intro`) — Car and Personal correctly used their
own type-specific copy, so this was a real mismatch, not intentional
design. Asked the user before touching it; approved fix applied. The
shared factory now sources every loan type's intro from
`LOAN_PAGE_COPY[type]` consistently. This is the only behavior/content
change in that commit — the wrapper dedup itself is behavior-preserving
for Car and Personal.

**Verification:** `npx tsc --noEmit` clean; `npx eslint` clean on all 4
touched/new files.

---

### Calculator ShellCard (Equation Solver ↔ Smart Calculator) — DONE this session
**Files:**
- New: `src/components/ui/calculator/ShellCard.tsx`
- Changed: `EquationSolver.tsx`, `SmartCalculator.tsx`

**What was found:** both components (consumed via `Calculator.tsx`) defined
an identical local `ShellCard` — a presentational wrapper `<section>` with
no props beyond `children`/`className` and no logic at all. Confirmed
byte-identical via `diff -w` (only indentation/formatting differed —
`EquationSolver.tsx` had no indentation throughout the file, a pre-existing
quirk unrelated to this change).

**What was done:** extracted verbatim into
`src/components/ui/calculator/ShellCard.tsx`; both files now import it.
Checked `percentageCalculator.tsx` and `Calculator.tsx` too — neither
defines or uses `ShellCard`, so this is a clean two-consumer dedup with no
other call sites to account for.

**Verification:** `tsc --noEmit` 0 errors repo-wide. `eslint` on both files
plus the new one: identical 3 pre-existing problems before/after (confirmed
via `git stash`), 0 new issues, new file itself is fully clean.

### `premiumShellClass`/`GlassIcon` — 4th consumer found and deduped (`backgroundRemoverClient.tsx`) — DONE this session
A fresh full-repo scan (see "Broader scan" note below) turned up a 4th
byte-identical copy of `premiumShellClass`/`GlassIcon` beyond the 3 already
deduped in the PDF tool family (commit `4a745ad`): the background remover
tool had its own local copies of both, confirmed byte-identical to
`src/sharedUI/tool/premiumShell.ts` / `src/sharedUI/tool/GlassIcon.tsx` by
direct comparison. Removed the local copies from
`backgroundRemoverClient.tsx` and pointed its 5 call sites (1×
`premiumShellClass()`, 4× `<GlassIcon>`) at the existing shared module — no
new shared file needed, this tool just joins the existing one. Also dropped
one line of dead commented-out code that lived inside the old local
`premiumShellClass()` function (a stale alternate class-string comment with
no effect on behavior).

**Verification:** `tsc --noEmit` 0 errors repo-wide. `eslint`: identical 7
pre-existing problems before/after (confirmed via `git stash`).

**Separately noted, not touched:** `src/components/ui/glassIcon.tsx`
(lowercase filename) is a *different*, unrelated `GlassIcon` — different
sizing/styling, `icon: any` typed — with **zero consumers anywhere in the
app** (repo-wide grep). It's dead code that happens to share a name with
the real shared component, not a live duplicate; flagging rather than
deleting, consistent with how the other orphaned files
(`basicPercentage.tsx`/`percentageOf.tsx`) have been handled — worth
confirming with the repo owner whether it's safe to remove.

### Broader scan: confirmed every top-level tool category is now checked
Walked all 9 top-level folders under `src/components/tools/` explicitly
this session, not just the ones with open questions:
`calculator` ✓ (ShellCard deduped above), `converter` ✓ (single file,
`UnitConverter.tsx`, no sibling to dedupe against), `dateTime` ✓ (fully
done, see above), `emiCalculator` ✓ (done, prior commit), `financeSuite`
✓ (savings/investment done, retirement checked-do-not-touch),
`image` ✓ (compressor/converter done, passport/signature already correct,
**backgroundRemover fixed this session** — see above), `pdf` ✓ (done,
prior commits), `privacysecurity` ✓ (single tool, `fileAnalyzer.tsx` +
2 small helpers, nothing to dedupe against), `qrCode` ✓ (6 sub-components
checked for name/structure overlap — `Field` vs `ColorField`/`FontField`
etc. are genuinely different fields for different purposes, not
duplicates; confirmed nothing to do). Only `backgroundRemover` turned up
a real, previously-missed duplicate; everything else confirms prior
sessions' findings.

### Full-codebase bug review (separate from dedup work) — DONE this session
Ran a broader pass looking for actual bugs, not just duplication:
full `tsc --noEmit` (0 errors repo-wide), full `eslint` across `src/`
(380 problems categorized by rule), plus targeted checks for security
anti-patterns (`eval`, hardcoded secrets, `dangerouslySetInnerHTML`
usage — none found beyond static/SEO content and one low-risk
self-XSS-only case in the local, single-user PDF header/footer editor
preview in `tiptapEditor.tsx`).

Two real bugs found and fixed (both approved before/during the work):
- **`src/components/ui/DropZone.tsx`** (commit `1fc70cd`) — used by
  nearly every upload-based tool. `handleFiles()` started a
  `setInterval`/`setTimeout` pair with no cleanup; unmounting mid-
  "upload" (reset/navigate within the 2s window) leaked the timers and
  called `setState`/`onFiles` on an unmounted component. Also,
  `handleDrop`'s `useCallback(..., [])` was frozen to a stale
  `handleFiles` closure — if a consumer's `onFiles`/`validFileTypes`
  prop changed after mount, drag-and-drop could use stale values while
  the file-picker path stayed current. Fixed: timers tracked in refs
  and cleared on unmount (and before starting a new run);
  `handleFiles`/`validatePDF` properly memoized with correct deps;
  `openPicker` moved above the `useImperativeHandle` call that
  references it (same TDZ-avoidance pattern as the earlier
  `splitPdfClient` fix). No visual/behavioral change while mounted.
- **`useQrCode.ts`** and **`favoriteToolsStore.ts`** (commit `28f47ea`)
  — a dead statement (`ref.current?.innerHTML;` — read and discarded,
  no effect) and a ternary used purely for side effects instead of
  `if`/`else`. Both harmless as written, cleaned up for clarity/
  robustness. Both files now have 0 eslint problems.

Everything else in the 380-problem eslint count is type-safety/
cleanliness debt, not bugs: 109 `any` types, 109 unused vars/imports,
86 unescaped-JSX-entity warnings (cosmetic), 32 `<img>` tags instead of
`next/image` (perf/SEO best practice, not broken), and the remaining
`react-hooks/exhaustive-deps`/`set-state-in-effect` warnings were spot-
checked and are intentional patterns (e.g. mount-only URL-param
hydration effects — adding the "missing" dependency would actually
introduce a bug by resetting user input on every URL change).

## Dead / unused / commented code removal pass

A separate pass from the duplication-extraction work above: went through
the whole non-`*SeoContent*` codebase removing code that had zero effect —
unused imports/variables, unreachable code, fully-commented-out blocks and
files, and files with zero consumers anywhere in the app. Every change was
individually confirmed unused (via eslint's `no-unused-vars`, direct grep
for consumers, or reading full context) before removal, and validated with
`tsc --noEmit` after each file.

**Results:** `no-unused-vars` issues went from 109 → 16 (the 16 remaining
are all inside `*SeoContent*` files, correctly left untouched, plus one
`_errorMessage` callback param in `qrScanner.ts` that's required by an
external library's fixed callback signature and can't be removed without
breaking that API contract). Total ESLint problems repo-wide: 380 → 278,
with zero new issues introduced anywhere (verified via full `tsc --noEmit`
after every single file change, not just at the end).

### Two real bugs caught and fixed while doing this
- **`src/lib/analyzers/pdf.ts`**: while batch-fixing unused `catch (err)`
  bindings across 3 analyzer files with a single `sed` command, one
  instance in this file actually *did* use `err` in its body
  (`console.error('...', err)`). Caught immediately by the mandatory
  `tsc --noEmit` check after the change (`Cannot find name 'err'`),
  reverted just that one instance, reconfirmed clean. A reminder of why
  every change here was individually typechecked rather than trusting a
  bulk regex.
- **`src/types/fileItem.types.ts` / `src/types/mergeMode.types.ts`**:
  these were non-exported (`type Foo = ...`, no `export`) with zero
  importers per-file — but TypeScript treats a script file with no
  `import`/`export` statements as a **global script**, not a module, so
  their type declarations were silently available project-wide as global
  ambient types. Deleting them broke `fileRow.tsx` and `optionCard.tsx`,
  which referenced `FileItem`/`MergeMode` with no import at all. Caught by
  the routine full-repo `tsc --noEmit` (not just checking the file I'd
  changed), then properly fixed by restoring both types as real exported
  modules and adding explicit imports to the two consumers — a genuine fix
  of a latent footgun, not just a revert.

### Complete-but-never-wired features removed (flagging distinctly)
These aren't typical debris — each is a fully working, self-contained piece
of functionality that was written but never connected to any UI trigger.
Removed per the same "remove unused code" instruction since they have zero
live call sites, but noted here individually since deleting a working
feature is a different kind of change than deleting a dead import, and any
of these are easy to recover from git history if they were meant to be
wired up rather than abandoned:
- `copyAll` in `timezoneClient.tsx` — a full "copy all rows to clipboard" feature.
- `resetTool` in `ImageConverterClient.tsx` — a full tool-state reset function.
- `clearAllFiles` in `mergePdfClient.tsx` — a full "clear all files" reset function.
- `calculateFireMonthsToGoal` in `retirementWealthSuite.tsx` — a full "months to FIRE goal" calculation.
- `showCategoryBar` prop on `FilterToolHubPage` — accepted a boolean from
  its one caller (`src/app/tools/page.tsx`, passing `true`) but had zero
  supporting implementation anywhere in the component; removed from both.
- A fully disabled AdSense integration in `adComponent.tsx` — commented-out
  script tag with a literal placeholder client ID (`YOUR-CLIENT-ID`), plus
  a `setAdLoaded` setter only ever called from inside that commented block.
  Zero behavior change: `adLoaded` was already permanently `false` in live
  code (nothing was calling the setter), so the fallback UI that renders
  today keeps rendering identically.
- A fully commented-out "app update available" PWA feature spread across
  `PwaProvider.tsx` (interface fields, state, effect logic, context value)
  and a fully-commented, zero-live-code `PwaUpdateToast.tsx` component
  whose only reference was itself commented out in `layout.tsx`.

### Files deleted entirely (confirmed zero consumers, including dynamic/string-path checks)
- `src/components/tools/calculator/percentage/basicPercentage.tsx` and
  `percentageOf.tsx` — the "unused, dead-code candidates" flagged in
  earlier sessions; confirmed via repo-wide grep and removed now that
  removal was explicitly requested.
- `src/components/ui/glassIcon.tsx` — the unrelated, differently-styled
  `GlassIcon` flagged in an earlier session as dead; confirmed zero
  consumers, removed.
- `src/components/ui/premiumButton.tsx` — zero consumers anywhere.
- `src/utility/compressPDF.ts` — an entire exported `compressPDF()`
  function + `CompressionLevel` type with zero callers anywhere in the app
  (the real PDF-compression tool's logic lives elsewhere).
- `src/components/pwa/PwaUpdateToast.tsx`, `src/components/ui/ToolTitleDesc.tsx`,
  `src/components/ui/imageToolUI/toolLayout.tsx` — each 100% commented out,
  zero live code, zero consumers.

### Other commented-out dead code removed (component stayed, dead block didn't)
- `qrPreviewCard.tsx` — an entire old, superseded implementation (100
  lines) commented out directly above the live current one; removed the
  dead half only.
- `CommandPalette.tsx` — a commented-out `AnimatePresence` wrapper (import
  + opening/closing tags) and commented-out motion props inside the JSX it
  used to wrap; the live conditional rendering underneath was untouched.
- `customSelect.tsx` — an old, superseded `updatePosition` implementation
  commented out directly above the live current one.
- `fileRow.tsx` (mergePdf) — unreachable code after a `return` statement
  (a disabled 30-page truncation branch).
- `featuredTools.tsx` — a whole dead scroll-carousel apparatus (state,
  effect, `scroll()` function) with no corresponding buttons left in the
  render to use it.

### Explicitly left alone (checked, not debris)
- `src/data/tools.ts` has 3 commented-out tool entries ("Image Resizer",
  "Image Cropper"). This reads as an intentional "planned but not yet
  built" staging pattern in a data file, not dead logic — left alone
  rather than assumed safe to delete.
- The large multi-line comment blocks found in `src/lib/analyzers/*`,
  `retirementWealthSuite.tsx`, `investment/core/engine.ts`,
  `FixAllPanel.tsx`, and `FileReport.tsx` were all individually read and
  are legitimate explanatory documentation (this codebase has a strong
  convention of thorough inline "why" comments), not dead code — confirmed
  via a full sweep of every file with 5+ consecutive commented lines, not
  skipped based on assumption.
- `qrScanner.ts`'s `_errorMessage` unused callback parameter — required by
  an external library's fixed two-argument callback signature; removing it
  would break that contract even though the parameter itself is unused.

## Remaining candidates surveyed but not yet acted on


These were scanned for duplication opportunities; noting findings so the
next session doesn't have to re-derive them.

- **`src/components/tools/calculator/percentage/`** — `basicPercentage.tsx`
  and `percentageOf.tsx` were orphaned (zero consumers anywhere in the
  app, confirmed via repo-wide grep) and have since been **deleted** as
  part of the dead-code removal pass (see below). Only
  `percentageCalculator.tsx` remains, and it's actively wired up via
  `Calculator.tsx` with a meaningfully different layout (tabs, different
  Field component, side-by-side grid) — not a duplicate of anything.
  Resolved, nothing further to do here.
- **`src/components/tools/pdf/*Client.tsx`** (merge, split, compress,
  image-to-pdf) — `formatBytes`/margin-slider (image-to-pdf),
  `premiumShellClass`/`GlassIcon`/`formatBytes` (merge/split/compress),
  and the file-list-row comparison (merge vs split — not a fit, see
  below) are all now checked. This tool family is done.
- **`src/components/tools/qrCode/`** — checked. `qrGeneratorPanel.tsx`
  has one `type="range"` slider, but it's a single isolated occurrence
  styled to match its local `Field`-wrapped siblings (green accent for
  QR branding, no card wrapper) — no duplicate sibling to extract
  against, and forcing the `SliderCard` pattern in would actually break
  visual consistency with the surrounding fields. No other known
  duplication patterns found. Confirmed: nothing to do here.
- **`src/components/tools/privacysecurity/`** and
  **`src/components/tools/converter/`** — checked for the known
  duplication patterns (`formatBytes`, `premiumShellClass`/`GlassIcon`,
  sliders, local `SectionHeader`/`StatCard`); none found. Both are
  single-tool families with no sibling to dedupe against. Confirmed:
  nothing to do here.
- **`src/components/tools/emiCalculator/calculators/`** — done this
  session (see above): 3 loan-type route wrappers deduped via
  `createEmiLoanPage`, plus a real Home Loan intro-copy bug found and
  fixed with approval.
- **`src/components/tools/image/passpoerPhotoResizer/` vs
  `signatureResizer/`** — checked (see below): already correctly
  deduped, nothing to do.
- **`src/components/tools/financeSuite/retirement/retirementWealthSuite.tsx`**
  — checked (see below): must NOT adopt `sharedUI/calculator/*`'s
  `NumberInput`/`CurrencyInput` — would reintroduce a fixed bug.

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

### File-list-row comparison (mergePdf vs splitPdf) — checked, not a fit
Compared `mergePdfClient.tsx`'s use of the shared `FileRow` component
against `splitPdfClient.tsx`'s own inline per-item card. They are
**not safe duplicates**: `FileRow` supports reordering (move up/down)
and removing files, plus a truncated page-preview badge with a title
tooltip; splitPdf's cards have none of that (no reordering makes sense
there — you're not sequencing multiple files into one output) and show
a different "Selected pages: X" summary line instead of a badge.
Unifying them would mean adding or removing real interactive features,
not just deduping markup — left alone.

### `retirementWealthSuite.tsx` adopting `sharedUI/calculator/*` — checked, do not do this
Checked whether its local numeric `Field`/`inputCls` pattern could
adopt the shared `CurrencyInput`/`NumberInput`/`DurationInput` used by
the savings calculators. **It must not.** This file has its own
`NumberField` component with a deliberate, documented behavior: it
keeps a local draft string while focused and only clamps the value on
blur/Enter, specifically to fix a real bug where per-keystroke
clamping would snap the field back to a bound mid-edit (e.g. turning
30 into 31 by retyping a middle digit). The shared `NumberInput`/
`CurrencyInput` components clamp on every keystroke via `onChange` —
swapping to them would silently reintroduce that exact bug. Left
alone; this file's local input handling is intentional, not
duplicated cruft.

### `signatureCompressor.tsx` vs `passportPhotoCompressorClient.tsx` — already deduped
Checked the signature-resizer tool against the passport-photo tool.
`signatureCompressor.tsx` (31 lines) is already just a thin
`CompressorConfig` wrapper that renders `PassportPhotoCompressorClient`
directly with signature-specific copy/labels — there's no duplicate
markup left to extract; this was already done correctly before this
refactor effort started. (Its sibling `signatureResizerSeoContent.tsx`
was not opened, per the standing rule to never touch `*SeoContent*`
files.)

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
