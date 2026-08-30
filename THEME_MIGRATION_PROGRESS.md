# Dark/Light Theme Migration — Progress

**Branch:** `feature/dark-light-theme-migration` (created off
`refactor/shared-ui-components-v2` — not merged anywhere; merge back into
`refactor/shared-ui-components-v2` is done manually by the repo owner when
ready). `main` is never touched by this effort.

**Relationship to `REFACTOR_PROGRESS.md`:** that file tracks the unrelated
shared-UI-component dedup effort on `refactor/shared-ui-components-v2`.
This is a separate, distinct effort (styling/theming, not deduplication),
so it gets its own progress file to avoid conflating two different
workstreams in one doc. Cross-referenced here for anyone who lands on one
file looking for the other.

**Standing rules for this entire effort** (from the task brief):
- Never touch any `*SeoContent*.tsx` file.
- No business/calculation logic changes — styling/theming only. If a file
  mixes logic and styling, touch only the styling.
- One tool family (or shared-kit slice) per commit; each commit leaves the
  app in a working, typecheck-clean state.
- `npx tsc --noEmit` after every file change; `npx eslint <changed files>`
  before moving on — not batched at the end.
- Git workflow: `git fetch` + check `git merge-base --is-ancestor` before
  every push; rebase if the remote moved; re-run full `tsc`/`eslint` after
  any rebase, not just changed files. Never touch `main` or
  `refactor/shared-ui-components-v2` directly — this branch only.
- Keep this file in sync after every step.

---

## Session 1 — state verification + audit (no code changes yet, per instructions)

### 1. Verified existing state (confirmed accurate as of 2026-08-30)

- **Tailwind v4, CSS-first config** — confirmed. No `tailwind.config.*`
  file exists anywhere in the repo; `package.json` has
  `"tailwindcss": "^4.3.1"` and `"next": "^16.2.9"`.
- **`src/app/globals.css`** (960 lines) already contains a complete
  shadcn/ui light+dark CSS-variable token system:
  - `@custom-variant dark (&:is(.dark *));` at the top (line 6) — the
    `dark:` variant infrastructure is already wired, just unused.
  - `@theme inline { ... }` block (lines 8–50) mapping `--color-*` theme
    tokens to CSS custom properties.
  - `:root { ... }` (lines 62–95) — light-mode values for `--background`,
    `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`,
    `--muted`, `--accent`, `--destructive`, `--border`, `--input`,
    `--ring`, `--chart-1..5`, `--sidebar*`.
  - `.dark { ... }` (lines 97–129) — dark-mode values for the exact same
    token set.
  - A separate, smaller `:root` block above that (lines 51–61) holds
    app-specific tokens that are **not** light/dark-aware yet: `--radius`,
    `--app-max-width`, `--glass-bg`, `--glass-border`, `--aurora-purple`,
    `--aurora-cyan`. These will need their own light-mode values or a
    decision that they stay constant across themes.
- **Token system is confirmed unused** — `grep -r "bg-background\|text-foreground\|bg-card\|text-card-foreground"` across `src/components` and `src/app` (excluding this token definition file itself) returns no product-component matches.
- **No theme library installed** — confirmed no `next-themes` (or any
  theme package) in `package.json`, no `ThemeProvider` anywhere in `src/`.
- **`<html>` never gets a `dark` class** — confirmed in
  `src/app/layout.tsx`: the `<html>` tag's `className` is
  `cn("h-full", "antialiased", "font-mono", jetbrainsMono.variable)` —
  static, no theme class logic at all.

All of the above matches the brief's stated context exactly. Nothing had
changed since the brief was written.

### 2. Full hardcoded-color audit

Two separate categories were audited, since they have different migration
implications:

**A. Surface / text / border grayscale utilities** (the "does this need a
real semantic surface token" category — `bg-slate-*`, `bg-zinc-*`,
`bg-gray-*`, `bg-neutral-*`, `bg-stone-*`, `bg-black`, `bg-white`,
`text-white`, `text-black`, `border-white`, `border-black`, all with
opacity modifiers). **138 files, ~2,241 occurrences repo-wide** (excluding
`*SeoContent*` files), broken down by area:

| Area | Files | Occurrences |
|---|---:|---:|
| `src/components/ui/` (shared kit) | 35 | ~277 |
| `src/sharedUI/` (this repo's newer shared components) | 32 | ~175 |
| `src/app/` (route pages, layout, static pages) | 13 | ~489 |
| `src/components/tools/financeSuite/` | 15 | ~235 |
| `src/components/tools/image/` | 6 | ~196 |
| `src/components/tools/dateTime/` | 3 | ~204 |
| `src/components/tools/pdf/` | 4 | ~148 |
| `src/components/tools/emiCalculator/` | 2 | ~118 |
| `src/components/tools/calculator/` | 3 | ~103 |
| `src/components/tools/qrCode/` | 7 | ~94 |
| `src/components/report/` (file-checkup report UI) | 5 | ~63 |
| `src/components/tools/privacysecurity/` | 4 | ~52 |
| `src/components/tools/converter/` | 1 | ~47 |
| `src/components/pwa/`, `src/components/layout/`, `src/components/favorites/`, `src/components/dashboard/`, `src/utility/seo/SectionHeading.tsx` (misc, not tool-family-specific) | 8 | ~40 |

**B. Accent/brand colors** (`bg-blue-*`, `text-emerald-*`,
`border-violet-*`, etc. — colors that carry meaning/branding rather than
being a surface, e.g. QR's green, finance's blue/violet gradients, image
tools' blue accents). **100 files, ~948 occurrences.** This is a distinct
concern from (A): these mostly won't need to flip entirely between
themes, but several will need adjusted lightness/saturation for WCAG AA
contrast against a light background (a `text-emerald-300` that reads fine
on `bg-slate-950` will likely fail contrast on a white surface).

**C. Edge cases (brief's phase 5)** — checked explicitly:
- **Inline `style={{ color: ... }}`**: **zero** found anywhere in scope.
- **Hardcoded SVG `fill`/`stroke`** (hex or literal `white`/`black`, not
  `currentColor`): **zero** found anywhere in scope.
- **Chart libraries**: exactly 2 files use Chart.js —
  `src/components/tools/financeSuite/financeChart.tsx` and
  `src/components/tools/emiCalculator/AmortizationChart.tsx` (already
  counted in the financeSuite/emiCalculator rows above for their Tailwind
  usage). Both currently **omit explicit legend/tick/tooltip text colors**
  in their Chart.js options objects — meaning both are silently relying on
  Chart.js's own built-in default text color, not a value from this
  codebase. This needs to become an explicit, theme-aware color read from
  the resolved CSS variables (e.g. via `getComputedStyle` at chart-render
  time) during the actual migration — omission won't "just work" via CSS
  the way Tailwind classes do, since Chart.js paints text directly to
  `<canvas>`.

**Total scope:** roughly **150 unique files** need touching (138 ∪ 100,
accounting for overlap between the two categories), for an estimated
**~3,200 total color-utility occurrences** across both categories.

### 3. Recommendation on scope (continuous effort vs. multiple sessions)

Given ~150 files and ~3,200 occurrences, this should be **multiple
sessions/commits, not one continuous pass** — consistent with the brief's
own "one tool family per commit" rule. Rough sizing per phase-4 migration
order:

1. `src/components/ui/` + `src/sharedUI/` (shared kit) — 67 files, ~452
   occurrences. Highest leverage: every tool consumes these.
2. `src/app/` (layout, static pages, route shells) — 13 files, ~489
   occurrences. Second priority since it wraps every page.
3. `dateTime` → `pdf` → `image` → `calculator`/`emiCalculator`/
   `financeSuite` → `qrCode` → `privacysecurity`/`converter` — per the
   brief's stated order, ~2,150 occurrences total across these 6 families.
4. `src/components/report/`, PWA, layout dock, favorites, dashboard — the
   smaller "misc" bucket, ~103 occurrences, can go last or be folded into
   whichever family uses them most (`report/` is used by
   `privacysecurity`'s file-checkup tool).
5. Chart.js color injection (2 files) — do this alongside whichever family
   commit touches `financeSuite`/`emiCalculator`, since it's the same
   files.

This is not started yet — proposed order only, pending confirmation.

---

## Proposed semantic token vocabulary (for review — nothing implemented yet)

Extending the **existing** `:root`/`.dark` blocks in `globals.css`, not
replacing them. shadcn's existing tokens (`--background`, `--foreground`,
`--card`, `--border`, `--muted`, etc.) stay and get used where they
already map naturally (e.g. `--muted-foreground` for secondary text).
New tokens proposed to cover this codebase's actual layered-surface
pattern, which is more granular than shadcn's defaults:

**Surfaces** (replacing `bg-slate-950`, `bg-black/20-80`, `bg-white/5-10`
patterns seen across the audit):
- `--surface-app` — the page-level background (currently the
  `bg-slate-950` / gradient app shell).
- `--surface-panel` — the standard card/panel background (currently
  `bg-white/5` or `bg-black/20`, used almost everywhere as the primary
  "content card" surface).
- `--surface-raised` — hover/active/elevated state on interactive
  elements (currently `bg-white/10`).
- `--surface-sunken` — nested/inset areas inside a panel, like the
  finance calculators' input-group backgrounds (currently `bg-black/30`,
  `bg-black/40`, or `bg-slate-950/60`).
- `--surface-overlay` — modal/dialog backdrops (currently `bg-black/60`
  to `bg-black/80`).

**Text:**
- `--text-primary` — main content text (currently `text-white`).
- `--text-secondary` — secondary/body text (currently `text-white/70`
  to `text-white/80`).
- `--text-muted` — de-emphasized text, labels (currently `text-white/40`
  to `text-white/60`).
- `--text-faint` — hint/caption text, least emphasis (currently
  `text-white/30` to `text-white/35`).

**Borders:**
- `--border-default` — standard dividers/outlines (currently
  `border-white/10`).
- `--border-strong` — emphasized borders, e.g. focus/active states
  (currently `border-white/20` to `border-white/30`).

**Accents** — proposed to stay **per-tool-family named tokens** rather
than one global accent, since the audit confirmed real intentional
branding differences (QR's green, finance's blue/violet gradients, image
tools' blue, PDF's similar blue/glass treatment):
- `--accent-finance` (blue/violet family — savings & investment
  calculators' current `blue-400`/`violet-400`/`cyan-400`/`emerald-400`
  usage collapses into a small defined set here, not one single token).
- `--accent-image` (blue family, image/PDF tool consoles).
- `--accent-qr` (green family, QR tool's existing brand color).
- Plus reuse of shadcn's existing `--destructive` for error/danger states
  already used consistently for validation errors across forms.

**Status colors** (currently ad hoc emerald/amber/red per file):
- `--status-success` (currently `emerald-300`/`emerald-400`, used
  consistently for "reduced by X%" / positive deltas).
- `--status-warning` (currently `amber-*`, used for caveats/disclaimers).
- `--status-danger` — likely just aliases shadcn's existing
  `--destructive` rather than a new token.

**Non-color tokens already present but not yet theme-aware** — flagged for
a decision, not yet resolved: `--glass-bg` / `--glass-border` (used for
the "glass" panel treatment seen in several hero sections) and
`--aurora-purple` / `--aurora-cyan` (used for background glow/blur
effects). These may need light-mode-specific values (a glow designed for
a dark backdrop can look muddy or invisible on white) rather than simply
being reused as-is — flagged in the brief's phase 5 as a "genuinely
different, not just inverted" case.

**Not yet decided, needs your input:** exact OKLCH values for each new
token in both `:root` and `.dark`, and the final accent-token count (is
"finance" one token or should savings vs. investment vs. retirement get
their own, given they already use different gradient combinations today?).

---

## Explicitly not started yet
- No `next-themes` install, no `ThemeProvider`, no toggle UI.
- No component migration.
- No Lighthouse baseline captured yet (should be done before touching
  anything, per the brief's own "before and after" requirement — this is
  the next concrete step once the token vocabulary above is confirmed).
