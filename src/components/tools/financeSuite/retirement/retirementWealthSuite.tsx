"use client";

import dynamic from "next/dynamic";
import type { ElementType } from "react";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Calculator,
  Percent,
  PiggyBank,
  BarChart3,
  TriangleAlert,
  Info,
  LineChart,
  Lock,
  FileDown,
  Globe,
  Zap,
  Flame,
  Landmark,
  TrendingUp,
} from "lucide-react";

import CustomSelect from "@/components/ui/customSelect";
import { useSearchParams } from "next/navigation";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type TabKey = "retirement" | "fire" | "swp";
type ScenarioKey = "conservative" | "base" | "aggressive";

type CurrencyCode =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD"
  | "SGD"
  | "JPY";

const CURRENCIES: Record<
  CurrencyCode,
  { label: string; symbol: string; locale: string }
> = {
  INR: { label: "Indian Rupee — INR (₹)", symbol: "₹", locale: "en-IN" },
  USD: { label: "US Dollar — USD ($)", symbol: "$", locale: "en-US" },
  EUR: { label: "Euro — EUR (€)", symbol: "€", locale: "de-DE" },
  GBP: { label: "British Pound — GBP (£)", symbol: "£", locale: "en-GB" },
  AED: { label: "UAE Dirham — AED", symbol: "AED", locale: "en-AE" },
  AUD: { label: "Australian Dollar — AUD (A$)", symbol: "A$", locale: "en-AU" },
  CAD: { label: "Canadian Dollar — CAD (C$)", symbol: "C$", locale: "en-CA" },
  SGD: { label: "Singapore Dollar — SGD (S$)", symbol: "S$", locale: "en-SG" },
  JPY: { label: "Japanese Yen — JPY (¥)", symbol: "¥", locale: "ja-JP" },
};

type Scenario = {
  label: string;
  returnRate: number;
  inflationRate: number;
  taxDrag: number;
  withdrawalRate: number;
};

const tabs: { id: TabKey; label: string; icon: string }[] = [
  { id: "retirement", label: "Retirement Planner", icon: "🏖️" },
  { id: "fire", label: "FIRE Calculator", icon: "🔥" },
  { id: "swp", label: "SWP Planner", icon: "🏦" },
];

const SCENARIOS: Record<ScenarioKey, Scenario> = {
  conservative: { label: "Conservative", returnRate: 6, inflationRate: 7, taxDrag: 1.0, withdrawalRate: 3 },
  base: { label: "Base", returnRate: 8, inflationRate: 6, taxDrag: 1.5, withdrawalRate: 4 },
  aggressive: { label: "Aggressive", returnRate: 10, inflationRate: 5, taxDrag: 2.0, withdrawalRate: 5 },
};

const FinanceChart = dynamic(
  () => import("@/components/tools/financeSuite/financeChart").then((m) => m.FinanceChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const FinancePdfExport = dynamic(
  () => import("@/components/tools/financeSuite/financePdfExport").then((m) => m.FinancePdfExport),
  { ssr: false, loading: () => null }
);

/* ─────────────────────────────────────────────
   Calculation helpers (unchanged logic)
───────────────────────────────────────────── */

function clampNum(value: number, min: number, max: number) {
  const n = Number.isFinite(value) ? value : min;
  return Math.max(min, Math.min(max, n));
}

function clampInt(value: number, min: number, max: number) {
  return Math.floor(clampNum(value, min, max));
}

function formatPercent(value: number) {
  return Number.isFinite(value) ? `${value.toFixed(2)}%` : "-";
}

function yearsLabel(years: number) {
  if (!Number.isFinite(years)) return "-";
  if (years <= 0) return "0 years";
  return years === 1 ? "1 year" : `${years} years`;
}

function annualNetReturn(annualReturn: number, taxDrag: number) {
  return Math.max(0, clampNum(annualReturn, 0, 25) - clampNum(taxDrag, 0, 10));
}

function monthlyRate(annualReturn: number) {
  return Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
}

function futureValue(current: number, annualReturn: number, months: number) {
  return current * Math.pow(1 + monthlyRate(annualReturn), Math.max(0, months));
}

function inflateValue(current: number, inflationRate: number, years: number) {
  return current * Math.pow(1 + inflationRate / 100, Math.max(0, years));
}

function calculateMonthlySavings(
  targetCorpus: number,
  currentSavings: number,
  annualReturn: number,
  years: number
) {
  const target = Math.max(0, targetCorpus);
  const current = Math.max(0, currentSavings);
  const months = Math.max(0, Math.round(years * 12));
  if (months <= 0) return 0;

  const r = monthlyRate(annualReturn);
  const fvCurrent = futureValue(current, annualReturn, months);
  const remaining = Math.max(0, target - fvCurrent);
  if (remaining <= 0) return 0;

  if (Math.abs(r) < 1e-12) return remaining / months;

  const factor = (Math.pow(1 + r, months) - 1) / r;
  return factor > 0 ? remaining / factor : 0;
}

function calculateFireTarget(annualExpense: number, withdrawalRate: number) {
  const wr = clampNum(withdrawalRate, 0.1, 10);
  return Math.max(0, annualExpense) / (wr / 100);
}

function calculateFireMonthsToGoal(
  start: number,
  contrib: number,
  annualReturn: number,
  target: number
) {
  const s = Math.max(0, start);
  const pmt = Math.max(0, contrib);
  const tgt = Math.max(0, target);
  if (s >= tgt) return 0;

  const r = monthlyRate(annualReturn);
  if (r <= 0) {
    if (pmt <= 0) return Number.POSITIVE_INFINITY;
    return Math.ceil((tgt - s) / pmt);
  }

  if (pmt <= 0) {
    const months = Math.log(tgt / s) / Math.log(1 + r);
    return Number.isFinite(months) && months >= 0 ? Math.ceil(months) : Number.POSITIVE_INFINITY;
  }

  const numerator = tgt + pmt / r;
  const denominator = s + pmt / r;
  if (numerator <= 0 || denominator <= 0) return Number.POSITIVE_INFINITY;

  const months = Math.log(numerator / denominator) / Math.log(1 + r);
  return Number.isFinite(months) && months >= 0 ? Math.ceil(months) : Number.POSITIVE_INFINITY;
}

function calculateSwpWithdrawal(
  corpus: number,
  annualReturn: number,
  years: number,
  inflationRate: number
) {
  const months = Math.max(1, Math.round(Math.max(0, years) * 12));
  const netCorpus = Math.max(0, corpus);
  const r = monthlyRate(annualReturn);
  const annualInflation = Math.max(0, inflationRate) / 100;

  if (netCorpus <= 0) return 0;

  // Zero-return case:
  // withdrawals increase once every 12 months.
  if (Math.abs(r) < 1e-12) {
    let denominator = 0;

    for (let month = 1; month <= months; month += 1) {
      const yearIndex = Math.floor((month - 1) / 12);
      denominator += Math.pow(1 + annualInflation, yearIndex);
    }

    return denominator > 0 ? netCorpus / denominator : 0;
  }

  // Solve for the initial monthly withdrawal when the withdrawal
  // increases once per year with inflation.
  //
  // We use binary search because the annual step-up makes the
  // closed-form constant-payment annuity formula inappropriate.
  let low = 0;
  let high = netCorpus;

  for (let iteration = 0; iteration < 80; iteration += 1) {
    const initialWithdrawal = (low + high) / 2;

    let balance = netCorpus;
    let withdrawal = initialWithdrawal;

    for (let month = 1; month <= months; month += 1) {
      balance = balance * (1 + r) - withdrawal;

      if (balance <= 0) {
        balance = 0;
        break;
      }

      if (month % 12 === 0 && month < months) {
        withdrawal *= 1 + annualInflation;
      }
    }

    // If money remains, withdrawal can be higher.
    // If money is exhausted, withdrawal is too high.
    if (balance > 0) {
      low = initialWithdrawal;
    } else {
      high = initialWithdrawal;
    }
  }

  return (low + high) / 2;
}

/** Walks a corpus forward month-by-month under the same SWP assumptions
 *  used elsewhere (shared `monthlyRate` helper, annual inflation step-up)
 *  and returns how many months it takes to hit zero — or the full
 *  horizon in months if it never does. Kept at module scope (like every
 *  other calculation helper here) so it isn't re-created on every render. */
function calculateSwpDepletionMonths(
  corpus: number,
  annualReturn: number,
  years: number,
  inflationRate: number,
  initialWithdrawal: number
) {
  const r = monthlyRate(annualReturn);
  const maxMonths = Math.max(1, Math.round(Math.max(0, years) * 12));

  let balance = Math.max(0, corpus);
  let withdrawal = Math.max(0, initialWithdrawal);

  for (let month = 1; month <= maxMonths; month += 1) {
    balance = balance * (1 + r) - withdrawal;

    if (balance <= 0) return month;

    if (month % 12 === 0) {
      withdrawal *= 1 + Math.max(0, inflationRate) / 100;
    }
  }

  return maxMonths;
}

function calculateGoalAchievement(projected: number, target: number) {
  if (!Number.isFinite(projected) || !Number.isFinite(target) || target <= 0) return 0;
  return Math.max(0, Math.min(1000, (projected / target) * 100));
}

function buildGrowthSeries(
  openingBalance: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
) {
  const months = Math.max(0, Math.round(years * 12));
  const r = monthlyRate(annualReturn);
  const series: number[] = [];

  let balance = Math.max(0, openingBalance);
  const contrib = Math.max(0, monthlyContribution);

  for (let month = 1; month <= months; month += 1) {
    balance = balance * (1 + r) + contrib;
    if (month % 12 === 0 || month === months) series.push(balance);
  }

  return series;
}

function buildRetirementProjection(
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
) {
  return buildGrowthSeries(currentSavings, monthlyContribution, annualReturn, years);
}

function buildSwpSeries(
  corpus: number,
  annualReturn: number,
  years: number,
  inflationRate: number,
  initialWithdrawal: number
) {
  const months = Math.max(0, Math.round(years * 12));
  const r = monthlyRate(annualReturn);
  const inflationFactor = 1 + Math.max(0, inflationRate) / 100;

  const series: number[] = [];

  let balance = Math.max(0, corpus);
  let withdrawal = Math.max(0, initialWithdrawal);

  for (let month = 1; month <= months; month += 1) {
    balance = Math.max(0, balance * (1 + r) - withdrawal);

    if (month % 12 === 0 || month === months) {
      series.push(balance);

      // Increase withdrawal for the NEXT year only.
      if (month < months) {
        withdrawal *= inflationFactor;
      }
    }

    if (balance <= 0) {
      // Once depleted, remaining years are also zero.
      // Keep the series length aligned with the requested horizon.
      for (let remaining = month + 1; remaining <= months; remaining += 1) {
        if (remaining % 12 === 0 || remaining === months) {
          series.push(0);
        }
      }
      break;
    }
  }

  return series;
}

/* ─────────────────────────────────────────────
   Small presentational building blocks
   (mirrors the EMI calculator's local components
   so both tools share one visual language)
───────────────────────────────────────────── */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <label className="block text-sm font-medium text-white/80">
          {label}
        </label>
        {hint && <span className="text-[11px] text-white/35">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition text-sm";

/** Numeric input that stays editable mid-keystroke.
 *
 *  The old pattern clamped and re-parsed the value on every keystroke,
 *  so deleting a digit to replace it (e.g. turning 30 into 31 by
 *  swapping the 0 for a 1) could momentarily fall outside min/max and
 *  the field would snap back to a bound before typing finished.
 *
 *  This keeps its own draft text while focused, forwards live numeric
 *  updates upstream as-you-type (so the rest of the tool still feels
 *  instant), and only clamps once the field is committed — on blur or
 *  Enter — so any edit pattern (retyping a middle digit, selecting all,
 *  clearing and starting over) works the way a normal text field would.
 */
function NumberField({
  value,
  onChange,
  onCommit,
  min,
  max,
  step,
  integer,
  suffix,
  ariaLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  onCommit?: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  integer?: boolean;
  suffix?: string;
  ariaLabel: string;
}) {
  const [text, setText] = useState(() => String(value));
  const focusedRef = useRef(false);

  // Sync draft text from upstream value changes (scenario presets,
  // cross-field corrections, currency switches) — but never while the
  // person is actively typing, or their keystrokes would get clobbered.
  useEffect(() => {
    if (!focusedRef.current) setText(String(value));
  }, [value]);

  const clamp = (n: number) => (integer ? clampInt(n, min, max) : clampNum(n, min, max));

  const commit = (raw: string) => {
    focusedRef.current = false;
    const n = Number(raw);
    const clamped = clamp(Number.isFinite(n) ? n : min);
    setText(String(clamped));
    (onCommit ?? onChange)(clamped);
  };

  const inputEl = (
    <input
      type="number"
      inputMode={integer ? "numeric" : "decimal"}
      aria-label={ariaLabel}
      value={text}
      min={min}
      max={max}
      step={step}
      onFocus={() => {
        focusedRef.current = true;
      }}
      onChange={(e) => {
        const raw = e.target.value;
        setText(raw);
        // Allow transient states — empty, a lone "-", a trailing "." —
        // while mid-edit. Only push a live value upstream once it
        // actually parses, and don't clamp yet.
        if (raw === "" || raw === "-") return;
        const n = Number(raw);
        if (Number.isFinite(n)) onChange(n);
      }}
      onBlur={(e) => commit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
      className={
        suffix
          ? "w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none"
          : inputCls
      }
    />
  );

  if (!suffix) return inputEl;

  return (
    <div className="flex items-center rounded-xl border border-white/10 bg-white/5 focus-within:border-blue-400/50 overflow-hidden">
      {inputEl}
      <span className="pr-4 text-xs text-white/40">{suffix}</span>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
  tone,
  hint,
}: {
  label: string;
  value: string;
  accent?: boolean;
  tone?: "positive" | "neutral";
  hint?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 py-3 ${
        tone === "positive"
          ? "border-emerald-400/30 bg-emerald-400/5"
          : accent
          ? "border-blue-400/30 bg-blue-400/5"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="text-xs text-white/60 mb-1">{label}</div>
      <div
        className={`text-lg font-semibold break-words ${
          tone === "positive" ? "text-emerald-300" : "text-white"
        }`}
      >
        {value}
      </div>
      {hint && <div className="text-[11px] text-white/35 mt-1">{hint}</div>}
    </div>
  );
}

function SectionHeading({
  children,
  action,
  icon: Icon,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  icon?: ElementType;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
      <h2 className="text-sm font-semibold text-white/80 tracking-wide uppercase flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-blue-300 shrink-0" />}
        {children}
      </h2>
      {action}
    </div>
  );
}

/** Quick 3-step onboarding strip so first-time visitors know the flow */
function QuickStartStrip() {
  const steps = [
    { icon: "🎯", title: "Pick a planner", body: "Retirement, FIRE or SWP — choose the tool that matches your goal." },
    { icon: "🧮", title: "Set your numbers", body: "Drag the sliders or type exact age, savings, returns and inflation." },
    { icon: "📈", title: "See your target", body: "Instantly view your target corpus, monthly numbers and growth chart." },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div
          key={s.title}
          className="rounded-3xl border border-white/10 bg-slate-950/60 p-3 sm:p-4 flex gap-3 items-start"
        >
          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-400/15 border border-blue-400/30 flex items-center justify-center text-sm">
            {s.icon}
          </div>
          <div>
            <div className="text-xs font-semibold text-white/80">
              {i + 1}. {s.title}
            </div>
            <div className="text-[11px] text-white/45 mt-0.5 leading-snug">
              {s.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Collapsible note explaining assumptions, mirrors the EMI calculator's
 *  "How this is calculated" note. */
function MethodologyNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-white/5 transition"
      >
        <span className="text-xs font-medium text-white/60">
          ⓘ How this is calculated
        </span>
        <span className="text-white/40 text-sm">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 text-xs text-white/50 leading-relaxed space-y-2 border-t border-white/10">
          <p>
            Growth is compounded monthly from your nominal annual return, net
            of an estimated tax drag. The Retirement and FIRE targets inflate
            today&apos;s annual expenses forward using your chosen inflation
            rate, then apply a fixed withdrawal-rate rule (e.g. the 4% rule)
            to size the corpus you&apos;ll need. The SWP planner solves for a
            monthly withdrawal that depletes the corpus over your chosen
            horizon, stepping the withdrawal up once a year for inflation.
          </p>
          <p>
            This model doesn&apos;t account for market volatility, sequence-
            of-returns risk, taxes on withdrawals, or country-specific
            retirement rules. Tax drag is a simplified flat estimate, not a
            full tax engine. Treat these numbers as directional planning
            estimates, not financial advice — figures will vary by market,
            currency and jurisdiction.
          </p>
        </div>
      )}
    </div>
  );
}

function InfoCallout({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-blue-400/30 bg-blue-400/10 px-4 py-3 text-xs text-blue-200 leading-relaxed flex items-start gap-2">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <span className="font-semibold text-blue-100">{title}: </span>
        {text}
      </div>
    </div>
  );
}

function WarningCallout({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-xs text-yellow-200 flex items-start gap-2">
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{text}</div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-72 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="h-4 w-40 rounded bg-white/10" />
      <div className="mt-6 h-56 rounded-xl bg-gradient-to-b from-white/5 to-white/[0.02]" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */

const HERO_FEATURES: {
  icon: ElementType;
  title: string;
  body: string;
  tone: string;
}[] = [
  {
    icon: Lock,
    title: "100% Private",
    body: "Calculations run locally in your browser",
    tone: "border-orange-400/30 bg-orange-400/15 text-orange-300",
  },
  {
    icon: FileDown,
    title: "Export Reports",
    body: "Download PDF summaries instantly",
    tone: "border-emerald-400/30 bg-emerald-400/15 text-emerald-300",
  },
  {
    icon: Globe,
    title: "Global Currencies",
    body: "Display results in 9 major currencies",
    tone: "border-blue-400/30 bg-gradient-to-br from-blue-400/20 to-violet-400/20 text-blue-200",
  },
  {
    icon: Zap,
    title: "Instant Results",
    body: "Live projections as you type",
    tone: "border-orange-400/30 bg-orange-400/15 text-orange-300",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  body,
  tone,
}: {
  icon: ElementType;
  title: string;
  body: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex gap-3 items-start">
      <div className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center ${tone}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-xs text-white/45 mt-0.5 leading-snug">{body}</div>
      </div>
    </div>
  );
}

function LivePreviewStat({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: ElementType;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-1.5 text-xs text-white/55">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1.5 text-lg font-semibold text-white break-words">{value}</div>
      <div className="mt-0.5 text-[11px] text-emerald-300">{note}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
function RetirementWealthSuiteInner() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const getInitialActiveTab = (): TabKey => {
    const type = searchParams.get("category")?.toLowerCase() || "";
    if (type === "retirement") return "retirement";
    if (type === "fire") return "fire";
    if (type === "swp") return "swp";
    return "retirement";
  };
  const [activeTab, setActiveTab] = useState<TabKey>(() => getInitialActiveTab());

  /* Currency — lets users worldwide see amounts in their own currency */
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const currencyMeta = CURRENCIES[currency];
  const fmt = useMemo(() => {
    const nf = new Intl.NumberFormat(currencyMeta.locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    return (v: number) => nf.format(Number.isFinite(v) ? v : 0);
  }, [currency, currencyMeta.locale]);

  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>("base");

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [inflationRate, setInflationRate] = useState(6);
  const [taxDrag, setTaxDrag] = useState(1.5);
  const [annualNeed, setAnnualNeed] = useState(120000);
  const [retirementWithdrawalRate, setRetirementWithdrawalRate] = useState(4);

  const [fireSavings, setFireSavings] = useState(500000);
  const [fireContribution, setFireContribution] = useState(15000);
  const [fireReturn, setFireReturn] = useState(8);
  const [fireTaxDrag, setFireTaxDrag] = useState(1.5);
  const [fireAnnualExpense, setFireAnnualExpense] = useState(120000);
  const [fireWithdrawalRate, setFireWithdrawalRate] = useState(4);
  const [fireHorizonYears, setFireHorizonYears] = useState(20);
  const [fireInflation, setFireInflation] = useState(6);

  const [swpCorpus, setSwpCorpus] = useState(1500000);
  const [swpReturn, setSwpReturn] = useState(7);
  const [swpYears, setSwpYears] = useState(20);
  const [swpInflationRate, setSwpInflationRate] = useState(6);
  const [swpTaxDrag, setSwpTaxDrag] = useState(1.5);

  const scenario = SCENARIOS[selectedScenario];
  const retirementYears = useMemo(() => clampInt(retirementAge - currentAge, 0, 60), [currentAge, retirementAge]);

  const applyScenario = useCallback((key: ScenarioKey) => {
    const s = SCENARIOS[key];
    setSelectedScenario(key);
    setExpectedReturn(s.returnRate);
    setInflationRate(s.inflationRate);
    setTaxDrag(s.taxDrag);
    setFireReturn(s.returnRate);
    setFireTaxDrag(s.taxDrag);
    setFireWithdrawalRate(s.withdrawalRate);
    setSwpReturn(s.returnRate);
    setSwpInflationRate(s.inflationRate);
    setFireInflation(s.inflationRate);
    setSwpTaxDrag(s.taxDrag);
  }, []);

  const retirementEffectiveReturn = useMemo(
    () => annualNetReturn(expectedReturn, taxDrag),
    [expectedReturn, taxDrag]
  );

  const fireEffectiveReturn = useMemo(
    () => annualNetReturn(fireReturn, fireTaxDrag),
    [fireReturn, fireTaxDrag]
  );

  const swpNetReturn = useMemo(
    () => annualNetReturn(swpReturn, swpTaxDrag),
    [swpReturn, swpTaxDrag]
  );

  const retirementNeedAtGoal = useMemo(
    () => inflateValue(annualNeed, inflationRate, retirementYears),
    [annualNeed, inflationRate, retirementYears]
  );

  const retirementTarget = useMemo(
    () => calculateFireTarget(retirementNeedAtGoal, retirementWithdrawalRate),
    [retirementNeedAtGoal, retirementWithdrawalRate]
  );

  const retirementMonthly = useMemo(
    () =>
      calculateMonthlySavings(
        retirementTarget,
        currentSavings,
        retirementEffectiveReturn,
        retirementYears
      ),
    [retirementTarget, currentSavings, retirementEffectiveReturn, retirementYears]
  );

  const retirementSeries = useMemo(
    () =>
      buildRetirementProjection(
        currentSavings,
        monthlyContribution,
        retirementEffectiveReturn,
        retirementYears
      ),
    [currentSavings, monthlyContribution, retirementEffectiveReturn, retirementYears]
  );

  const retirementLabels = useMemo(
    () => Array.from({ length: retirementSeries.length }, (_, i) => `Year ${i + 1}`),
    [retirementSeries.length]
  );

  const retirementTargetSeries = useMemo(
    () => Array.from({ length: retirementSeries.length }, () => retirementTarget),
    [retirementSeries.length, retirementTarget]
  );

  // Progress compares where your CURRENT contribution plan is actually
  // projected to land at retirement (last point of retirementSeries —
  // the same number the chart plots) against the target corpus. Comparing
  // today's nominal currentSavings straight against a decades-inflated
  // target (the previous behaviour) understated progress for almost every
  // plan, since it ignored both future growth and ongoing contributions.
  const retirementGoalAchievement = useMemo(() => {
    const projectedAtRetirement =
      retirementSeries.length > 0
        ? retirementSeries[retirementSeries.length - 1]
        : currentSavings;
    return calculateGoalAchievement(projectedAtRetirement, retirementTarget);
  }, [retirementSeries, retirementTarget, currentSavings]);

  const fireFutureExpense = useMemo(
    () => inflateValue(fireAnnualExpense, fireInflation, fireHorizonYears),
    [fireAnnualExpense, fireInflation, fireHorizonYears]
  );

  const fireTarget = useMemo(
    () => calculateFireTarget(fireFutureExpense, fireWithdrawalRate),
    [fireFutureExpense, fireWithdrawalRate]
  );

  const fireMonthsToGoal = useMemo(
    () => calculateFireMonthsToGoal(fireSavings, fireContribution, fireEffectiveReturn, fireTarget),
    [fireSavings, fireContribution, fireEffectiveReturn, fireTarget]
  );

  const safeFireMonthsToGoal = Number.isFinite(fireMonthsToGoal) ? fireMonthsToGoal : Infinity;

  const fireProjectionYears = useMemo(() => {
    if (!Number.isFinite(safeFireMonthsToGoal)) return 0;

    if (safeFireMonthsToGoal <= 0) {
      return 1;
    }

    return Math.ceil(safeFireMonthsToGoal / 12);
  }, [safeFireMonthsToGoal]);

  const fireSeries = useMemo(
    () =>
      fireProjectionYears <= 0
        ? []
        : buildGrowthSeries(fireSavings, fireContribution, fireEffectiveReturn, fireProjectionYears),
    [fireSavings, fireContribution, fireEffectiveReturn, fireProjectionYears]
  );

  const fireLabels = useMemo(
    () => Array.from({ length: fireSeries.length }, (_, i) => `Year ${i + 1}`),
    [fireSeries.length]
  );

  const fireTargetSeries = useMemo(
    () => Array.from({ length: fireSeries.length }, () => fireTarget),
    [fireSeries.length, fireTarget]
  );

  // Same fix as retirement progress above: measure the projected
  // portfolio value at the goal date, not today's nominal savings, against
  // the target.
  const fireGoalAchievement = useMemo(() => {
    const projectedAtGoal =
      fireSeries.length > 0 ? fireSeries[fireSeries.length - 1] : fireSavings;
    return calculateGoalAchievement(projectedAtGoal, fireTarget);
  }, [fireSeries, fireTarget, fireSavings]);

  const swpInitialWithdrawal = useMemo(
    () =>
      calculateSwpWithdrawal(
        swpCorpus,
        swpNetReturn,
        swpYears,
        swpInflationRate
      ),
    [swpCorpus, swpNetReturn, swpYears, swpInflationRate]
  );

  const swpDepletionMonths = useMemo(
    () =>
      calculateSwpDepletionMonths(
        swpCorpus,
        swpNetReturn,
        swpYears,
        swpInflationRate,
        swpInitialWithdrawal
      ),
    [
      swpCorpus,
      swpNetReturn,
      swpYears,
      swpInflationRate,
      swpInitialWithdrawal,
    ]
  );

  const swpSeries = useMemo(
    () => buildSwpSeries(swpCorpus, swpNetReturn, swpYears, swpInflationRate, swpInitialWithdrawal),
    [swpCorpus, swpNetReturn, swpYears, swpInflationRate, swpInitialWithdrawal]
  );

  const swpLabels = useMemo(
    () => Array.from({ length: swpSeries.length }, (_, i) => `Year ${i + 1}`),
    [swpSeries.length]
  );

  const retirementWarn =
    retirementYears <= 0
      ? "Retirement age must be greater than current age."
      : retirementMonthly <= 0 && retirementTarget > 0
        ? "Your current savings are projected to reach the target without additional monthly contributions under these assumptions."
        : null;

  const fireWarn =
    !Number.isFinite(fireTarget) || fireTarget < 0 || !Number.isFinite(safeFireMonthsToGoal)
      ? "The selected savings plan cannot reach the FIRE target under current assumptions."
      : null;

  const swpWarn =
    swpInitialWithdrawal <= 0
      ? "Check the corpus, return, and duration. The current setup does not produce a usable monthly withdrawal."
      : swpDepletionMonths < swpYears * 12
        ? "The corpus is projected to run out before the planned withdrawal period."
        : null;

  const handleAgeCommit = useCallback((v: number) => {
    const nextAge = clampInt(v, 18, 90);
    setCurrentAge(nextAge);
    // Keep retirement age valid if the current age is bumped past it,
    // instead of silently leaving the pair invalid until the person
    // notices the warning and fixes it by hand.
    setRetirementAge((prev) => (prev <= nextAge ? Math.min(nextAge + 1, 100) : prev));
  }, []);
  const handleRetAgeCommit = useCallback(
    (v: number) => setRetirementAge(clampInt(v, currentAge + 1, 100)),
    [currentAge]
  );

  const exportData = useMemo(() => {
    if (activeTab === "retirement") {
      return {
        title: "Retirement Planner Report",
        subtitle: "Retirement projection and savings summary",
        summaryCards: [
          { label: "Target corpus", value: fmt(retirementTarget), tone: "positive" as const },
          { label: "Required monthly savings", value: fmt(retirementMonthly), tone: "accent" as const },
          { label: "Progress", value: `${retirementGoalAchievement.toFixed(0)}%`, tone: "neutral" as const },
        ],
        inputRows: [
          ["Current age", `${currentAge}`],
          ["Retirement age", `${retirementAge}`],
          ["Current savings", fmt(currentSavings)],
          ["Monthly contribution", fmt(monthlyContribution)],
          ["Expected return", formatPercent(expectedReturn)],
          ["Tax drag", formatPercent(taxDrag)],
          ["Inflation rate", formatPercent(inflationRate)],
          ["Annual expense today", fmt(annualNeed)],
        ],
        resultRows: [
          ["Retirement horizon", yearsLabel(retirementYears)],
          ["Target corpus", fmt(retirementTarget)],
          ["Required monthly savings", fmt(retirementMonthly)],
          ["Current progress", `${retirementGoalAchievement.toFixed(0)}%`],
        ],
        notes: ["Projected corpus growth compared against the target corpus."],
      };
    }

    if (activeTab === "fire") {
      return {
        title: "FIRE Calculator Report",
        subtitle: "FIRE (Financial Independence, Retire Early) projection and savings summary",
        summaryCards: [
          { label: "FIRE target", value: fmt(fireTarget), tone: "positive" as const },
          {
            label: "Years to goal",
            value: !Number.isFinite(safeFireMonthsToGoal) ? "Not Reachable" : `${Math.ceil(safeFireMonthsToGoal / 12)} years`,
            tone: "accent" as const,
          },
          { label: "Current progress", value: `${fireGoalAchievement.toFixed(0)}%`, tone: "neutral" as const },
        ],
        inputRows: [
          ["Current savings", fmt(fireSavings)],
          ["Monthly savings", fmt(fireContribution)],
          ["Expected return", formatPercent(fireReturn)],
          ["Tax drag", formatPercent(fireTaxDrag)],
          ["Annual expense today", fmt(fireAnnualExpense)],
          ["Withdrawal rate", formatPercent(fireWithdrawalRate)],
          ["Inflation rate", formatPercent(fireInflation)],
          ["FIRE horizon", yearsLabel(fireHorizonYears)],
        ],
        resultRows: [
          ["FIRE target", fmt(fireTarget)],
          ["Years to goal", !Number.isFinite(safeFireMonthsToGoal) ? "Not Reachable" : `${Math.ceil(safeFireMonthsToGoal / 12)} years`],
          ["Current progress", `${fireGoalAchievement.toFixed(0)}%`],
        ],
        notes: [
          "Portfolio growth compared against the FIRE target.",
          "The FIRE target is based on the selected horizon and an estimated tax drag rather than a full tax engine.",
        ],
      };
    }

    return {
      title: "SWP Planner Report",
      subtitle: "Systematic withdrawal projection",
      summaryCards: [
        { label: "Corpus", value: fmt(swpCorpus), tone: "neutral" as const },
        { label: "Initial monthly SWP", value: fmt(swpInitialWithdrawal), tone: "accent" as const },
        { label: "Planned horizon", value: yearsLabel(swpYears), tone: "positive" as const },
      ],
      inputRows: [
        ["Corpus available", fmt(swpCorpus)],
        ["Expected return", formatPercent(swpReturn)],
        ["Withdrawal period", yearsLabel(swpYears)],
        ["Inflation rate", formatPercent(swpInflationRate)],
        ["Tax drag", formatPercent(swpTaxDrag)],
      ],
      resultRows: [
        ["Corpus", fmt(swpCorpus)],
        ["Initial monthly SWP", fmt(swpInitialWithdrawal)],
        ["Planned horizon", yearsLabel(swpYears)],
      ],
      notes: [
        "This SWP model applies a simplified tax drag to return and increases withdrawals once per year for readability.",
        "This is a simplified planning model.",
      ],
    };
  }, [
    activeTab,
    fmt,
    retirementTarget,
    retirementMonthly,
    retirementGoalAchievement,
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    taxDrag,
    inflationRate,
    annualNeed,
    retirementYears,
    fireTarget,
    safeFireMonthsToGoal,
    fireGoalAchievement,
    fireSavings,
    fireContribution,
    fireReturn,
    fireTaxDrag,
    fireAnnualExpense,
    fireWithdrawalRate,
    fireInflation,
    fireHorizonYears,
    swpCorpus,
    swpInitialWithdrawal,
    swpYears,
    swpReturn,
    swpInflationRate,
    swpTaxDrag,
  ]);

  const activeModeLabel = tabs.find((t) => t.id === activeTab)?.label ?? "Retirement";

  /* Per-tool summary used by the plan-comparison cards — each tool's two
     most decision-relevant numbers, kept distinct from the hero's glance
     stats so nothing on the page repeats itself. */
  const planSummaries: Record<
    TabKey,
    { icon: ElementType; primaryLabel: string; primaryValue: string; secondaryLabel: string; secondaryValue: string }
  > = {
    retirement: {
      icon: PiggyBank,
      primaryLabel: "Target corpus",
      primaryValue: fmt(retirementTarget),
      secondaryLabel: "Monthly savings needed",
      secondaryValue: fmt(retirementMonthly),
    },
    fire: {
      icon: Flame,
      primaryLabel: "FIRE target",
      primaryValue: fmt(fireTarget),
      secondaryLabel: "Time to goal",
      secondaryValue: !Number.isFinite(safeFireMonthsToGoal)
        ? "Not reachable"
        : safeFireMonthsToGoal <= 0
        ? "Already reached"
        : `${Math.ceil(safeFireMonthsToGoal / 12)} yrs`,
    },
    swp: {
      icon: Landmark,
      primaryLabel: "Monthly withdrawal",
      primaryValue: fmt(swpInitialWithdrawal),
      secondaryLabel: "Corpus lasts",
      secondaryValue: yearsLabel(swpYears),
    },
  };

  /* ───── Render ───── */
 return (
  <div className="w-full max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-5 lg:px-6 lg:py-6 text-white space-y-5 sm:space-y-6">
    {/* ── Hero ── */}
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center">
        {/* Left: pitch + features */}
        <div className="min-w-0 space-y-5 sm:space-y-6 font-mono">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-200">
            <LineChart className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Private finance workspace</span>
          </div>

          <h1 className="max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] tracking-tight break-words">
            Plan how your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              wealth grows
            </span>{" "}
            over time
          </h1>

          <p className="max-w-xl text-sm sm:text-base text-white/55 leading-relaxed">
            See exactly what it takes to retire, reach financial
            independence, or draw down a corpus — no accounts, no tracking,
            just calculations.
          </p>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {HERO_FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>

        {/* Right: live preview */}
        <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 md:p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-mono font-semibold text-white/40 uppercase tracking-wide">
                Live preview
              </div>

              <div className="text-sm font-semibold text-white mt-0.5 truncate">
                Your projections at a glance
              </div>
            </div>

            <span className="relative flex h-2.5 w-2.5 shrink-0 mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
          </div>

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
            <LivePreviewStat
              icon={PiggyBank}
              label="Retirement"
              value={fmt(retirementTarget)}
              note={`${yearsLabel(retirementYears)} to go`}
            />

            <LivePreviewStat
              icon={Flame}
              label="FIRE"
              value={fmt(fireTarget)}
              note={`${fireGoalAchievement.toFixed(0)}% funded`}
            />

            <LivePreviewStat
              icon={Landmark}
              label="SWP corpus"
              value={fmt(swpCorpus)}
              note={`${fmt(swpInitialWithdrawal)}/mo out`}
            />

            <LivePreviewStat
              icon={TrendingUp}
              label="Retirement progress"
              value={`${retirementGoalAchievement.toFixed(0)}%`}
              note="of target corpus"
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wide">
                Currently viewing
              </div>

              <div className="text-sm font-semibold text-white truncate">
                {activeModeLabel}
              </div>
            </div>

            <span className="self-start sm:self-auto shrink-0 text-[10px] sm:text-[11px] font-medium text-blue-300 bg-blue-400/10 border border-blue-400/30 rounded-full px-2.5 py-1">
              {scenario.label} scenario
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="text-xs text-white/40">Currency</span>

              <div className="w-full sm:w-auto">
                <CustomSelect
                  value={currency}
                  callBackTrigger={(e) => setCurrency(e as CurrencyCode)}
                  options={Object.entries(CURRENCIES).map(([code, meta]) => ({
                    value: code,
                    label: meta.label,
                  }))}
                />
              </div>
            </div>

            <p className="text-center text-[10px] sm:text-[11px] text-white/35 leading-snug">
              Currency affects display only — no exchange-rate conversion is
              applied.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* ── Mode tabs ── */}
    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          aria-pressed={activeTab === tab.id}
          className={`shrink-0 whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium border transition ${
            activeTab === tab.id
              ? "border-blue-400/60 bg-blue-400/15 text-white"
              : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>

    {/* ── Quick start ── */}
    <QuickStartStrip />

    {/* ── Compare your plans ── */}
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8">
      <SectionHeading
        action={
          <div className="w-full sm:w-auto flex flex-col items-start sm:items-end gap-2">
            <div className="w-full sm:w-auto flex overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1 gap-1">
              {(Object.keys(SCENARIOS) as ScenarioKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => applyScenario(key)}
                  aria-pressed={selectedScenario === key}
                  className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    selectedScenario === key
                      ? "bg-blue-400/20 text-white border border-blue-400/40"
                      : "border border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  {SCENARIOS[key].label}
                </button>
              ))}
            </div>

            <span className="text-[10px] sm:text-[11px] text-white/35 break-words">
              Return {formatPercent(scenario.returnRate)} · Inflation{" "}
              {formatPercent(scenario.inflationRate)} · Tax drag{" "}
              {formatPercent(scenario.taxDrag)}
            </span>
          </div>
        }
      >
        Compare Your Plans
      </SectionHeading>

      <p className="text-xs text-white/40 -mt-1 mb-5">
        Every plan updates with the scenario above. Pick a card to open that
        planner.
      </p>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        {tabs.map((tab) => {
          const summary = planSummaries[tab.id];
          const Icon = summary.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={active}
              className={`min-w-0 text-left rounded-2xl border p-4 transition ${
                active
                  ? "border-blue-400/50 bg-blue-400/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="min-w-0 text-sm font-semibold text-white flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-blue-300 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </span>

                {active && (
                  <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-200 border border-blue-400/30">
                    Viewing
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                <div className="min-w-0">
                  <div className="text-[11px] text-white/40">
                    {summary.primaryLabel}
                  </div>

                  <div className="text-base font-semibold text-white break-words">
                    {summary.primaryValue}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-[11px] text-white/40">
                    {summary.secondaryLabel}
                  </div>

                  <div className="text-sm text-white/70 break-words">
                    {summary.secondaryValue}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs font-medium text-blue-300">
                {active ? "Currently open" : "View plan →"}
              </div>
            </button>
          );
        })}
      </div>
    </div>

    {/* ── How this is calculated ── */}
    <MethodologyNote />

    {/* ── Retirement tab ── */}
    {activeTab === "retirement" && (
      <div className="grid min-w-0 gap-5 sm:gap-6 xl:grid-cols-2">
        {/* Retirement inputs */}
        <div className="min-w-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8">
          <SectionHeading
            icon={PiggyBank}
            action={
              <FinancePdfExport
                filename="retirement-planner-report"
                title={exportData.title}
                subtitle={exportData.subtitle}
                summaryCards={exportData.summaryCards}
                inputRows={exportData.inputRows}
                resultRows={exportData.resultRows}
                notes={exportData.notes}
                chartRef={chartRef}
              />
            }
          >
            Retirement Planner
          </SectionHeading>

          <p className="text-xs text-white/40 -mt-1 mb-5">
            Set your age, savings and assumptions. Drag a slider or type an
            exact value.
          </p>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Field label="Current age">
              <NumberField
                ariaLabel="Current age"
                value={currentAge}
                onChange={setCurrentAge}
                onCommit={handleAgeCommit}
                min={18}
                max={90}
                integer
              />
            </Field>

            <Field label="Retirement age">
              <NumberField
                ariaLabel="Retirement age"
                value={retirementAge}
                onChange={setRetirementAge}
                onCommit={handleRetAgeCommit}
                min={currentAge + 1}
                max={100}
                integer
              />
            </Field>

            <Field label={`Current savings (${currencyMeta.symbol})`}>
              <NumberField
                ariaLabel="Current savings"
                value={currentSavings}
                onChange={setCurrentSavings}
                min={0}
                max={1e12}
              />
            </Field>

            <Field label={`Monthly contribution (${currencyMeta.symbol})`}>
              <NumberField
                ariaLabel="Monthly contribution"
                value={monthlyContribution}
                onChange={setMonthlyContribution}
                min={0}
                max={1e12}
              />
            </Field>

            <Field label="Expected return" hint="0–25%">
              <NumberField
                ariaLabel="Expected return"
                value={expectedReturn}
                onChange={setExpectedReturn}
                min={0}
                max={25}
                step={0.1}
                suffix="%"
              />
            </Field>

            <Field label="Tax drag" hint="Estimated effective tax rate">
              <NumberField
                ariaLabel="Tax drag"
                value={taxDrag}
                onChange={setTaxDrag}
                min={0}
                max={10}
                step={0.1}
                suffix="%"
              />
            </Field>

            <Field label="Inflation rate">
              <NumberField
                ariaLabel="Inflation rate"
                value={inflationRate}
                onChange={setInflationRate}
                min={0}
                max={30}
                step={0.1}
                suffix="%"
              />
            </Field>

            <Field
              label={`Annual expense today (${currencyMeta.symbol})`}
            >
              <NumberField
                ariaLabel="Annual expense today"
                value={annualNeed}
                onChange={setAnnualNeed}
                min={0}
                max={1e12}
              />
            </Field>

            <Field
              label="Withdrawal rate"
              hint="e.g. the 4% rule"
            >
              <NumberField
                ariaLabel="Retirement withdrawal rate"
                value={retirementWithdrawalRate}
                onChange={setRetirementWithdrawalRate}
                min={0.1}
                max={10}
                step={0.1}
                suffix="%"
              />
            </Field>
          </div>

          <div className="grid gap-3 grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 mt-5 sm:mt-6">
            <StatCard
              label="Retirement horizon"
              value={yearsLabel(retirementYears)}
              hint="Years left until retirement"
            />

            <StatCard
              label="Target corpus"
              value={fmt(retirementTarget)}
              hint="Inflation-adjusted"
              accent
            />

            <StatCard
              label="Required monthly savings"
              value={fmt(retirementMonthly)}
              hint="After tax drag"
              tone="positive"
            />
          </div>

          {retirementWarn && (
            <div className="mt-4">
              <WarningCallout text={retirementWarn} />
            </div>
          )}
        </div>

        {/* Retirement chart */}
        <div className="min-w-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8">
          <SectionHeading icon={BarChart3}>
            Retirement Projection
          </SectionHeading>

          <p className="text-xs text-white/40 -mt-1 mb-5">
            Projected corpus growth compared against the target corpus.
          </p>

          <div
            ref={chartRef}
            className="min-w-0 w-full overflow-hidden"
          >
            {retirementSeries.length > 0 ? (
              <div className="w-full min-w-0">
                <FinanceChart
                  labels={retirementLabels}
                  datasets={[
                    {
                      label: "Projected corpus",
                      data: retirementSeries,
                      color: "rgba(59,130,246,0.85)",
                    },
                    {
                      label: "Target corpus",
                      data: retirementTargetSeries,
                      color: "rgba(239,68,68,0.85)",
                    },
                  ]}
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                No chart data available for the current retirement horizon.
              </div>
            )}
          </div>
        </div>
      </div>
    )}

    {/* ── FIRE tab ── */}
    {activeTab === "fire" && (
      <div className="grid min-w-0 gap-5 sm:gap-6 xl:grid-cols-2">
        {/* FIRE inputs */}
        <div className="min-w-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8">
          <SectionHeading
            icon={Calculator}
            action={
              <FinancePdfExport
                filename="fire-report"
                title={exportData.title}
                subtitle={exportData.subtitle}
                summaryCards={exportData.summaryCards}
                inputRows={exportData.inputRows}
                resultRows={exportData.resultRows}
                notes={exportData.notes}
                chartRef={chartRef}
              />
            }
          >
            FIRE Calculator
          </SectionHeading>

          <p className="text-xs text-white/40 -mt-1 mb-5">
            Target uses inflation-adjusted spending at the selected FIRE date.
          </p>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Field label={`Current savings (${currencyMeta.symbol})`}>
              <NumberField
                ariaLabel="Current savings"
                value={fireSavings}
                onChange={setFireSavings}
                min={0}
                max={1e12}
              />
            </Field>

            <Field label={`Monthly savings (${currencyMeta.symbol})`}>
              <NumberField
                ariaLabel="Monthly savings"
                value={fireContribution}
                onChange={setFireContribution}
                min={0}
                max={1e12}
              />
            </Field>

            <Field label="Expected return" hint="0–25%">
              <NumberField
                ariaLabel="Expected return"
                value={fireReturn}
                onChange={setFireReturn}
                min={0}
                max={25}
                step={0.1}
                suffix="%"
              />
            </Field>

            <Field label="Tax drag" hint="Estimated effective tax rate">
              <NumberField
                ariaLabel="Tax drag"
                value={fireTaxDrag}
                onChange={setFireTaxDrag}
                min={0}
                max={10}
                step={0.1}
                suffix="%"
              />
            </Field>

            <Field label={`Annual expense today (${currencyMeta.symbol})`}>
              <NumberField
                ariaLabel="Annual expense today"
                value={fireAnnualExpense}
                onChange={setFireAnnualExpense}
                min={0}
                max={1e12}
              />
            </Field>

            <Field label="FIRE horizon" hint="1–60 years">
              <NumberField
                ariaLabel="FIRE horizon"
                value={fireHorizonYears}
                onChange={setFireHorizonYears}
                min={1}
                max={60}
                integer
                suffix="yrs"
              />
            </Field>

            <Field label="Withdrawal rate">
              <NumberField
                ariaLabel="Withdrawal rate"
                value={fireWithdrawalRate}
                onChange={setFireWithdrawalRate}
                min={0.1}
                max={10}
                step={0.1}
                suffix="%"
              />
            </Field>

            <Field label="Inflation rate">
              <NumberField
                ariaLabel="Inflation rate"
                value={fireInflation}
                onChange={setFireInflation}
                min={0}
                max={30}
                step={0.1}
                suffix="%"
              />
            </Field>
          </div>

          <div className="grid gap-3 grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 mt-5 sm:mt-6">
            <StatCard
              label="FIRE target"
              value={
                !Number.isFinite(fireTarget) || fireTarget <= 0
                  ? "Invalid"
                  : fmt(fireTarget)
              }
              hint="Inflation-adjusted expense"
              accent
            />

            <StatCard
              label="Years to goal"
              value={
                !Number.isFinite(safeFireMonthsToGoal)
                  ? "Not Reachable"
                  : safeFireMonthsToGoal <= 0
                  ? "Already Reached"
                  : `${Math.ceil(safeFireMonthsToGoal / 12)} years`
              }
              hint="Closed-form timeline"
            />

            <StatCard
              label="Current progress"
              value={`${fireGoalAchievement.toFixed(0)}%`}
              hint="Projected corpus vs target"
              tone="positive"
            />
          </div>

          {fireWarn && (
            <div className="mt-4">
              <WarningCallout text={fireWarn} />
            </div>
          )}

          <div className="mt-4">
            <InfoCallout
              title="Model note"
              text="The FIRE target is based on the selected horizon and an estimated tax drag rather than a full tax engine."
            />
          </div>
        </div>

        {/* FIRE chart */}
        <div className="min-w-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8">
          <SectionHeading icon={BarChart3}>
            FIRE Projection
          </SectionHeading>

          <p className="text-xs text-white/40 -mt-1 mb-5">
            Portfolio growth compared against the FIRE target.
          </p>

          <div
            ref={chartRef}
            className="min-w-0 w-full overflow-hidden"
          >
            {fireSeries.length > 0 ? (
              <div className="w-full min-w-0">
                <FinanceChart
                  labels={fireLabels}
                  datasets={[
                    {
                      label: "Estimated portfolio value",
                      data: fireSeries,
                      color: "rgba(34,197,94,0.85)",
                    },
                    {
                      label: "FIRE target",
                      data: fireTargetSeries,
                      color: "rgba(239,68,68,0.85)",
                    },
                  ]}
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                {!Number.isFinite(safeFireMonthsToGoal)
                  ? "The selected savings plan cannot reach the FIRE target under current assumptions."
                  : "No chart data available for the current FIRE timeline."}
              </div>
            )}
          </div>
        </div>
      </div>
    )}

    {/* ── SWP tab ── */}
    {activeTab === "swp" && (
      <div className="grid min-w-0 gap-5 sm:gap-6 xl:grid-cols-2">
        {/* SWP inputs */}
        <div className="min-w-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8">
          <SectionHeading
            icon={Percent}
            action={
              <FinancePdfExport
                filename="swp-planner-report"
                title={exportData.title}
                subtitle={exportData.subtitle}
                summaryCards={exportData.summaryCards}
                inputRows={exportData.inputRows}
                resultRows={exportData.resultRows}
                notes={exportData.notes}
                chartRef={chartRef}
              />
            }
          >
            SWP Planner
          </SectionHeading>

          <p className="text-xs text-white/40 -mt-1 mb-5">
            Initial withdrawal is shown here; inflation applies yearly in the
            projection.
          </p>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Field label={`Corpus available (${currencyMeta.symbol})`}>
              <NumberField
                ariaLabel="Corpus available"
                value={swpCorpus}
                onChange={setSwpCorpus}
                min={0}
                max={1e12}
              />
            </Field>

            <Field label="Expected return" hint="0–25%">
              <NumberField
                ariaLabel="Expected return"
                value={swpReturn}
                onChange={setSwpReturn}
                min={0}
                max={25}
                step={0.1}
                suffix="%"
              />
            </Field>

            <Field label="Withdrawal period" hint="1–100 years">
              <NumberField
                ariaLabel="Withdrawal period"
                value={swpYears}
                onChange={setSwpYears}
                min={1}
                max={100}
                integer
                suffix="yrs"
              />
            </Field>

            <Field label="Inflation rate">
              <NumberField
                ariaLabel="Inflation rate"
                value={swpInflationRate}
                onChange={setSwpInflationRate}
                min={0}
                max={30}
                step={0.1}
                suffix="%"
              />
            </Field>

            <Field label="Tax drag" hint="Estimated effective tax rate">
              <NumberField
                ariaLabel="Tax drag"
                value={swpTaxDrag}
                onChange={setSwpTaxDrag}
                min={0}
                max={10}
                step={0.1}
                suffix="%"
              />
            </Field>
          </div>

          <div className="grid gap-3 grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 mt-5 sm:mt-6">
            <StatCard
              label="Corpus"
              value={fmt(swpCorpus)}
            />

            <StatCard
              label="Initial monthly SWP"
              value={
                !Number.isFinite(swpInitialWithdrawal) ||
                swpInitialWithdrawal <= 0
                  ? "Invalid"
                  : fmt(swpInitialWithdrawal)
              }
              hint="Before annual inflation step"
              accent
            />

            <StatCard
              label="Planned horizon"
              value={yearsLabel(swpYears)}
            />
          </div>

          {swpWarn && (
            <div className="mt-4">
              <WarningCallout text={swpWarn} />
            </div>
          )}

          <div className="mt-4">
            <InfoCallout
              title="Model note"
              text="This SWP model applies a simplified tax drag to return and increases withdrawals once per year for readability."
            />
          </div>
        </div>

        {/* SWP chart */}
        <div className="min-w-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6 md:p-8">
          <SectionHeading icon={BarChart3}>
            SWP Balance Forecast
          </SectionHeading>

          <p className="text-xs text-white/40 -mt-1 mb-5">
            Remaining balance after withdrawals, growth, inflation, and tax
            drag.
          </p>

          <div
            ref={chartRef}
            className="min-w-0 w-full overflow-hidden"
          >
            {swpSeries.length > 0 ? (
              <div className="w-full min-w-0">
                <FinanceChart
                  labels={swpLabels}
                  datasets={[
                    {
                      label: "Remaining balance",
                      data: swpSeries,
                      color: "rgba(245,158,11,0.85)",
                    },
                  ]}
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                No data
              </div>
            )}
          </div>
        </div>
      </div>
    )}

    {/* ── Footer disclaimer ── */}
    <p className="max-w-4xl mx-auto text-center text-xs sm:text-sm text-emerald-300 px-3 sm:px-4 leading-relaxed">
      <b>Note: </b>
      Estimates only, based on standard compounding assumptions with a
      simplified tax-drag and inflation model. Actual returns, taxes, and
      inflation will vary by market and currency — treat these figures as
      planning estimates, not financial advice.
    </p>
  </div>
);
}

/* useSearchParams() opts the whole subtree into client-side rendering and,
 * per Next.js's app-router rules, must be read inside a <Suspense> boundary
 * or the page fails to statically render / throws a build-time error
 * ("useSearchParams() should be wrapped in a suspense boundary"). The
 * previous default export read it directly, so any route rendering this
 * component without its own external <Suspense> wrapper was one Next.js
 * upgrade away from breaking. Wrapping it here makes the component safe
 * to drop into a page regardless of how the parent renders it. */
export default function RetirementWealthSuite() {
  return (
    <Suspense fallback={<SuiteLoadingFallback />}>
      <RetirementWealthSuiteInner />
    </Suspense>
  );
}

function SuiteLoadingFallback() {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-5 lg:px-6 lg:py-6 text-white">
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/60 p-6 sm:p-8 animate-pulse">
        <div className="h-4 w-40 rounded bg-white/10" />
        <div className="mt-4 h-8 w-2/3 rounded bg-white/10" />
        <div className="mt-3 h-4 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  );
}