"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState, memo } from "react";
import {
  Calculator,
  Percent,
  PiggyBank,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  TriangleAlert,
  Info,
  ArrowDownCircle,
  ArrowUpCircle,
  Trash2,
} from "lucide-react";

import { Field } from "@/components/ui/Field";
import { SectionHeader } from "@/sharedUI/sectionHeader";
import { ExplainerPanel, TabKey } from "@/sharedUI/explainerPanel";
import CustomSelect from "@/components/ui/customSelect";
import { useSearchParams } from "next/navigation";

// NOTE: this component calls useSearchParams(). In the App Router, any
// route that renders it must wrap it in a <Suspense> boundary (e.g. in
// page.tsx: `<Suspense fallback={...}><InvestmentReturnsSuite /></Suspense>`)
// or Next.js will fail the build / throw at runtime for statically
// rendered routes.

const FinanceChart = dynamic(
  () => import("@/components/tools/financeSuite/financeChart").then((m) => m.FinanceChart),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
);

const FinancePdfExport = dynamic(
  () => import("@/components/tools/financeSuite/financePdfExport").then((m) => m.FinancePdfExport),
  {
    ssr: false,
    loading: () => null,
  }
);

// ---------------------------------------------------------------------------
// Currency
// ---------------------------------------------------------------------------
// This tool only swaps the currency *symbol* and keeps Indian-style digit
// grouping (e.g. ₹5,00,000 -> $5,00,000). It does NOT convert amounts. This
// is intentional and called out to the user in the UI (see the warning
// banner in the hero section).

const CURRENCIES = {
  INR: { code: "INR", symbol: "₹", label: "₹ INR — Indian Rupee" },
  USD: { code: "USD", symbol: "$", label: "$ USD — US Dollar" },
  EUR: { code: "EUR", symbol: "€", label: "€ EUR — Euro" },
  GBP: { code: "GBP", symbol: "£", label: "£ GBP — British Pound" },
  JPY: { code: "JPY", symbol: "¥", label: "¥ JPY — Japanese Yen" },
  AUD: { code: "AUD", symbol: "A$", label: "A$ AUD — Australian Dollar" },
  CAD: { code: "CAD", symbol: "C$", label: "C$ CAD — Canadian Dollar" },
  SGD: { code: "SGD", symbol: "S$", label: "S$ SGD — Singapore Dollar" },
  AED: { code: "AED", symbol: "د.إ", label: "د.إ AED — UAE Dirham" },
} as const;

type CurrencyCode = keyof typeof CURRENCIES;

function formatCurrency(value: number, currency: CurrencyCode = "INR") {
  if (!Number.isFinite(value)) return "—";
  const symbol = CURRENCIES[currency].symbol;
  const sign = value < 0 ? "-" : "";
  const grouped = Math.abs(Math.round(value)).toLocaleString("en-IN");
  return `${sign}${symbol}${grouped}`;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CashFlow = {
  id: string;
  amount: number | "";
  date: string;
};

// Numeric form fields can be transiently empty while the user retypes them.
type NumField = number | "";

type XirrStatus = "idle" | "invalid" | "same-date" | "no-solution" | "ok";

const tabs: { id: TabKey; label: string; icon: string }[] = [
  { id: "sip", label: "SIP Growth", icon: "🚀" },
  { id: "lump", label: "Lump Sum", icon: "💎" },
  { id: "performance", label: "CAGR & XIRR", icon: "🎯" },
];

const EXPLAINERS: any = {
  sip: {
    title: "What is SIP (Systematic Investment Plan)?",
    lines: [
      "A SIP lets you invest a fixed amount every month into a mutual fund or investment vehicle.",
      "Instead of needing a large lump sum upfront, you build wealth steadily over time.",
      "The step-up feature lets you increase your monthly investment by a % each year — matching salary hikes.",
      "Example: ₹5,000/month at 12% for 10 years → compare basic SIP vs. 5% annual step-up.",
    ],
  },
  lump: {
    title: "What is a Lump Sum investment?",
    lines: [
      "A lump sum is a one-time investment of a larger amount, left to grow through compound interest.",
      "The compounding frequency determines how often interest is calculated and added to your principal.",
      "More frequent compounding (monthly > quarterly > annually) means slightly more growth over time.",
      "Example: ₹1,00,000 at 8% for 5 years compounded quarterly.",
    ],
  },
  performance: {
    title: "What are CAGR and XIRR?",
    lines: [
      "CAGR (Compound Annual Growth Rate) tells you the steady annual rate at which an investment grew from start to end.",
      "It ignores timing of cash flows — use it to compare two investments over the same period.",
      "XIRR is more powerful: it accounts for the exact dates of each investment and withdrawal.",
      "Use XIRR when you've made multiple investments at different times (e.g. SIP purchases + redemptions).",
      "Investments are entered as negative numbers (money out of your pocket), payouts as positive (money back to you).",
    ],
  },
};

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function uid() {
  return `cf_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// Lets a field go empty (so the user can delete-then-retype) instead of
// collapsing to 0 the instant the box is cleared.
function parseNumericInput(value: string): NumField {
  if (value.trim() === "") return "";
  const n = Number(value);
  return Number.isFinite(n) ? n : "";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function clampField(value: NumField, min: number, max: number): NumField {
  if (value === "") return value;
  return clamp(value, min, max);
}

// Converts a possibly-empty field into a real number for calculations,
// clamped into a safe range so a stray invalid state can never blow up a
// loop (e.g. someone entering a few million "years").
function toCalcNumber(value: NumField, fallback: number, min: number, max: number) {
  const n = value === "" ? fallback : value;
  return clamp(n, min, max);
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(2)}%`;
}

// Per-field limits: keeps huge inputs from creating runaway loops, and
// gives every numeric field an enforced (not just cosmetic) min/max.
const LIMITS = {
  sipAmount: { min: 0, max: 10_000_000 },
  sipRate: { min: 0, max: 50 },
  sipYears: { min: 1, max: 100 },
  sipStepUp: { min: 0, max: 100 },
  lumpAmount: { min: 0, max: 100_000_000 },
  lumpRate: { min: 0, max: 50 },
  lumpYears: { min: 1, max: 100 },
  cagrStart: { min: 1, max: 100_000_000 },
  cagrEnd: { min: 0, max: 100_000_000 },
  cagrYears: { min: 1, max: 100 },
} as const;

// Builds onChange/onBlur handlers for a numeric field: onChange stays
// permissive (so typing "-" or an empty box works), onBlur clamps into
// range and optionally rounds to a whole number (used for "years" fields
// so they can never drift out of sync with month-based calculations).
function numberFieldHandlers(
  setter: React.Dispatch<React.SetStateAction<NumField>>,
  { min, max, integer = false }: { min: number; max: number; integer?: boolean }
) {
  return {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(parseNumericInput(e.target.value));
    },
    onBlur: () => {
      setter((current) => {
        if (current === "") return current;
        let next = clamp(current, min, max);
        if (integer) next = Math.round(next);
        return next;
      });
    },
  };
}

// ---------------------------------------------------------------------------
// Finance math
// ---------------------------------------------------------------------------

function calculateSIPValue(
  monthly: number,
  annualRate: number,
  years: number,
  stepUpPercent: number
) {
  const months = Math.max(0, Math.round(years * 12));
  const monthlyRate = annualRate / 100 / 12;

  let balance = 0;
  let currentMonthly = monthly;
  let invested = 0;

  for (let month = 1; month <= months; month += 1) {
    balance = balance * (1 + monthlyRate) + currentMonthly;
    invested += currentMonthly;
    if (month % 12 === 0) {
      currentMonthly *= 1 + stepUpPercent / 100;
    }
  }

  return {
    futureValue: balance,
    invested,
    gain: balance - invested,
  };
}

function calculateCompoundValue(
  amount: number,
  rate: number,
  years: number,
  frequency: number
) {
  if (years <= 0) return amount;
  const periodic = rate / 100 / frequency;
  return amount * Math.pow(1 + periodic, frequency * years);
}

function buildSipSeries(
  monthly: number,
  annualRate: number,
  years: number,
  stepUpPercent: number
) {
  // years is always a whole number by the time it reaches here (enforced
  // via step=1 + onBlur rounding), so month count and the yearly chart
  // labels built from `years` stay in sync.
  const months = Math.max(0, Math.round(years) * 12);
  const monthlyRate = annualRate / 100 / 12;

  const series: number[] = [];
  let balance = 0;
  let currentMonthly = monthly;

  for (let month = 1; month <= months; month += 1) {
    balance = balance * (1 + monthlyRate) + currentMonthly;
    if (month % 12 === 0) {
      series.push(balance);
      currentMonthly *= 1 + stepUpPercent / 100;
    }
  }

  return series;
}

function buildLumpSeries(
  amount: number,
  rate: number,
  years: number,
  frequency: number
) {
  const series: number[] = [];
  const wholeYears = Math.round(years);
  for (let year = 1; year <= wholeYears; year += 1) {
    const periodic = rate / 100 / frequency;
    series.push(amount * Math.pow(1 + periodic, frequency * year));
  }
  return series;
}

function utcDay(dateStr: string) {
  const d = new Date(dateStr);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function xnpv(rate: number, cashflows: CashFlow[]) {
  if (!Number.isFinite(rate) || rate <= -1) return NaN;
  if (!cashflows.length) return NaN;

  const sorted = [...cashflows].sort((a, b) => utcDay(a.date) - utcDay(b.date));
  const first = utcDay(sorted[0].date);

  let total = 0;
  for (const flow of sorted) {
    if (typeof flow.amount !== "number" || !Number.isFinite(flow.amount) || !flow.date)
      return NaN;
    const days = (utcDay(flow.date) - first) / 86400000;
    total += flow.amount / Math.pow(1 + rate, days / 365);
  }
  return total;
}

function xirrNewton(cashflows: CashFlow[], guess = 0.1) {
  let rate = guess;

  for (let i = 0; i < 100; i += 1) {
    const f = xnpv(rate, cashflows);
    if (!Number.isFinite(f)) return NaN;

    const h = 1e-7;
    const fp = xnpv(rate + h, cashflows);
    const derivative = (fp - f) / h;

    if (!Number.isFinite(derivative) || Math.abs(derivative) < 1e-12) return NaN;

    const next = rate - f / derivative;
    if (!Number.isFinite(next) || next <= -0.9999999999) return NaN;
    if (Math.abs(next - rate) < 1e-10) return next;
    rate = next;
  }

  return NaN;
}

function xirrBisection(cashflows: CashFlow[]) {
  let low = -0.9999999999;
  let high = 10;

  let fLow = xnpv(low, cashflows);
  let fHigh = xnpv(high, cashflows);

  if (!Number.isFinite(fLow) || !Number.isFinite(fHigh)) return NaN;

  for (let i = 0; i < 50 && fLow * fHigh > 0; i += 1) {
    high *= 2;
    fHigh = xnpv(high, cashflows);
    if (!Number.isFinite(fHigh)) return NaN;
  }

  if (fLow * fHigh > 0) return NaN;

  for (let i = 0; i < 120; i += 1) {
    const mid = (low + high) / 2;
    const fMid = xnpv(mid, cashflows);

    if (!Number.isFinite(fMid)) return NaN;
    if (Math.abs(fMid) < 1e-12) return mid;

    if (fLow * fMid <= 0) {
      high = mid;
      fHigh = fMid;
    } else {
      low = mid;
      fLow = fMid;
    }

    if (Math.abs(high - low) < 1e-12) return (low + high) / 2;
  }

  return (low + high) / 2;
}

// Cash-flow sets with unusual sign patterns (e.g. invest, partial payout,
// invest again) can mathematically have more than one rate that zeroes the
// NPV, or none at all. There's no way to guarantee "the one true answer" in
// that case — but trying several starting points and keeping only the ones
// that actually verify (|NPV| ~ 0) makes single-root cases far more
// reliable than one fixed guess, and picking the smallest-magnitude root
// among verified candidates matches the conventional XIRR convention.
function solveXirr(cashflows: CashFlow[]) {
  const sorted = [...cashflows].sort((a, b) => utcDay(a.date) - utcDay(b.date));
  const seeds = [0.1, 0.3, -0.3, 0.5, -0.5, 1, 2, -0.9];

  const verified: number[] = [];
  for (const seed of seeds) {
    const candidate = xirrNewton(sorted, seed);
    if (!Number.isFinite(candidate) || candidate <= -0.999999) continue;
    const check = xnpv(candidate, sorted);
    if (Number.isFinite(check) && Math.abs(check) < 1e-4) {
      verified.push(candidate);
    }
  }

  if (verified.length) {
    verified.sort((a, b) => Math.abs(a) - Math.abs(b));
    return verified[0];
  }

  const bisected = xirrBisection(sorted);
  if (Number.isFinite(bisected)) {
    const check = xnpv(bisected, sorted);
    if (Number.isFinite(check) && Math.abs(check) < 1e-4) return bisected;
  }

  return NaN;
}

function xirr(cashflows: CashFlow[]) {
  const valid = cashflows.filter(
    (f) => typeof f.amount === "number" && Number.isFinite(f.amount) && !!f.date
  );
  if (valid.length < 2) return NaN;

  const hasPos = valid.some((f) => (f.amount as number) > 0);
  const hasNeg = valid.some((f) => (f.amount as number) < 0);
  if (!hasPos || !hasNeg) return NaN;

  return solveXirr(valid);
}

// ---------------------------------------------------------------------------
// Presentational bits
// ---------------------------------------------------------------------------

const premiumShellClass =
  "relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-blue-400/40";

const cardClass = "rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4";

type BadgeColor = "blue" | "green" | "purple";

function Badge({ color, children }: { color: BadgeColor; children: React.ReactNode }) {
  const styles: Record<BadgeColor, string> = {
    blue: "border-blue-400/20 bg-blue-400/10 text-blue-200",
    green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    purple: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium ${styles[color]}`}>
      {children}
    </span>
  );
}

function ResultBox({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "positive" | "gradient";
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/50">{label}</div>
      <div
        className={
          tone === "gradient"
            ? "mt-2 bg-gradient-to-r from-emerald-300 via-white to-blue-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent"
            : tone === "positive"
            ? "mt-2 text-lg font-semibold text-emerald-300"
            : "mt-2 text-lg font-semibold text-white"
        }
      >
        {value}
      </div>
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

function FieldHint({ text }: { text: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-2 text-xs leading-snug text-white/45">
      <Info className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
      {text}
    </p>
  );
}

function isFlowValid(flow: CashFlow) {
  return (
    typeof flow.amount === "number" &&
    Number.isFinite(flow.amount) &&
    flow.amount !== 0 &&
    !!flow.date
  );
}

const FlowRow = memo(function FlowRow({
  flow,
  index,
  currency,
  onChange,
  onRemove,
  canRemove,
}: {
  flow: CashFlow;
  index: number;
  currency: CurrencyCode;
  onChange: (index: number, field: keyof Omit<CashFlow, "id">, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}) {
  const invalid = !isFlowValid(flow);
  const isNegative =
    typeof flow.amount === "number" && Number.isFinite(flow.amount) && flow.amount < 0;
  const isPositive =
    typeof flow.amount === "number" && Number.isFinite(flow.amount) && flow.amount > 0;
  const symbol = CURRENCIES[currency].symbol;

  return (
    <div
      className={[
        "grid gap-3 rounded-2xl border p-3 transition md:grid-cols-[1fr_1fr_auto] md:items-center",
        invalid
          ? "border-amber-400/30 bg-amber-500/5"
          : "border-white/10 bg-black/10",
      ].join(" ")}
    >
      <div>
        <Field label={`Amount (${symbol})`}>
          <div
            className={[
              "flex overflow-hidden rounded-xl border bg-black/20",
              invalid && flow.amount !== ""
                ? "border-amber-400/40"
                : "border-white/10 focus-within:border-blue-400/40",
            ].join(" ")}
          >
            <div
              className={[
                "flex w-12 shrink-0 items-center justify-center border-r border-white/10",
                isNegative
                  ? "text-red-400"
                  : isPositive
                  ? "text-green-400"
                  : "text-white/40",
              ].join(" ")}
            >
              {isNegative ? (
                <ArrowDownCircle className="h-4 w-4" />
              ) : isPositive ? (
                <ArrowUpCircle className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{symbol}</span>
              )}
            </div>

            <input
              type="number"
              value={flow.amount === "" ? "" : flow.amount}
              onChange={(e) => onChange(index, "amount", e.target.value)}
              className="
                w-full
                border-0
                bg-transparent
                px-4
                py-3
                text-white
                outline-none
                placeholder:text-white/30
              "
              placeholder="e.g. −100000"
              aria-describedby={`flow-hint-${index}`}
            />
          </div>
        </Field>
        <p id={`flow-hint-${index}`} className="mt-1 text-xs text-white/40">
          {isNegative && "Outflow — money you invested"}
          {isPositive && "Inflow — money you received"}
          {!isNegative && !isPositive && "Negative = investment, positive = payout"}
        </p>
      </div>

      <Field label="Date">
        <input
          type="date"
          value={flow.date}
          onChange={(e) => onChange(index, "date", e.target.value)}
          className={[
            inputClass,
            "cursor-pointer",
            !flow.date ? "border-amber-400/40" : "",
          ].join(" ")}
        />
        <p className="mt-1 text-xs text-white/40">
        Date of the cash flow
        </p>
      </Field>

      <button
        type="button"
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Remove this cash flow row"
      >
        <Trash2 className="h-4 w-4" />
        Remove
      </button>
    </div>
  );
});

function XirrSignLegend() {
  return (
    <div className="flex flex-wrap gap-4 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm">
      <div className="flex items-center gap-2 text-white/70">
        <ArrowDownCircle className="h-4 w-4 text-red-400" aria-hidden="true" />
        <span>
          <span className="font-medium text-white">Negative amount</span> = money you invested (outflow)
        </span>
      </div>
      <div className="flex items-center gap-2 text-white/70">
        <ArrowUpCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
        <span>
          <span className="font-medium text-white">Positive amount</span> = money you received (inflow)
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function InvestmentReturnsSuite() {
  const searchParams = useSearchParams();

  const getInitialActiveTab = (): TabKey => {
    const type = searchParams.get("category")?.toLowerCase() || "";

    if (type === "sip") return "sip";
    if (type === "lump") return "lump";
    if (type === "performance") return "performance";

    return "sip";
  };
  const [activeTab, setActiveTab] = useState<TabKey>(() => getInitialActiveTab());
  const [currency, setCurrency] = useState<CurrencyCode>("INR");

  const chartRef = useRef<HTMLDivElement | null>(null);
  const performanceRef = useRef<HTMLDivElement | null>(null);

  const [sipAmount, setSipAmount] = useState<NumField>(5000);
  const [sipRate, setSipRate] = useState<NumField>(12);
  const [sipYears, setSipYears] = useState<NumField>(10);
  const [sipStepUp, setSipStepUp] = useState<NumField>(5);

  const [lumpAmount, setLumpAmount] = useState<NumField>(100000);
  const [lumpRate, setLumpRate] = useState<NumField>(8);
  const [lumpYears, setLumpYears] = useState<NumField>(5);
  const [lumpFrequency, setLumpFrequency] = useState(4);

  const [cagrStart, setCagrStart] = useState<NumField>(100000);
  const [cagrEnd, setCagrEnd] = useState<NumField>(180000);
  const [cagrYears, setCagrYears] = useState<NumField>(5);

  const [xirrFlows, setXirrFlows] = useState<CashFlow[]>([
    { id: uid(), amount: -100000, date: "2024-06-01" },
    { id: uid(), amount: 125851, date: "2025-06-01" },
    { id: uid(), amount: 780000, date: "2028-06-01" },
  ]);

  // Field handlers (parse permissively on change, clamp + round on blur).
  const sipAmountField = numberFieldHandlers(setSipAmount, LIMITS.sipAmount);
  const sipRateField = numberFieldHandlers(setSipRate, LIMITS.sipRate);
  const sipYearsField = numberFieldHandlers(setSipYears, { ...LIMITS.sipYears, integer: true });
  const sipStepUpField = numberFieldHandlers(setSipStepUp, LIMITS.sipStepUp);

  const lumpAmountField = numberFieldHandlers(setLumpAmount, LIMITS.lumpAmount);
  const lumpRateField = numberFieldHandlers(setLumpRate, LIMITS.lumpRate);
  const lumpYearsField = numberFieldHandlers(setLumpYears, { ...LIMITS.lumpYears, integer: true });

  const cagrStartField = numberFieldHandlers(setCagrStart, LIMITS.cagrStart);
  const cagrEndField = numberFieldHandlers(setCagrEnd, LIMITS.cagrEnd);
  const cagrYearsField = numberFieldHandlers(setCagrYears, { ...LIMITS.cagrYears, integer: true });

  // Calc-safe numbers: empty fields fall back to a sane default and every
  // value is clamped again as a last line of defence against runaway loops.
  const sipAmountN = toCalcNumber(sipAmount, 0, LIMITS.sipAmount.min, LIMITS.sipAmount.max);
  const sipRateN = toCalcNumber(sipRate, 0, LIMITS.sipRate.min, LIMITS.sipRate.max);
  const sipYearsN = Math.round(toCalcNumber(sipYears, 1, LIMITS.sipYears.min, LIMITS.sipYears.max));
  const sipStepUpN = toCalcNumber(sipStepUp, 0, LIMITS.sipStepUp.min, LIMITS.sipStepUp.max);

  const lumpAmountN = toCalcNumber(lumpAmount, 0, LIMITS.lumpAmount.min, LIMITS.lumpAmount.max);
  const lumpRateN = toCalcNumber(lumpRate, 0, LIMITS.lumpRate.min, LIMITS.lumpRate.max);
  const lumpYearsN = Math.round(toCalcNumber(lumpYears, 1, LIMITS.lumpYears.min, LIMITS.lumpYears.max));

  const cagrStartN = toCalcNumber(cagrStart, 0, LIMITS.cagrStart.min, LIMITS.cagrStart.max);
  const cagrEndN = toCalcNumber(cagrEnd, 0, LIMITS.cagrEnd.min, LIMITS.cagrEnd.max);
  const cagrYearsN = Math.round(toCalcNumber(cagrYears, 1, LIMITS.cagrYears.min, LIMITS.cagrYears.max));

  const sipResult = useMemo(
    () => calculateSIPValue(sipAmountN, sipRateN, sipYearsN, sipStepUpN),
    [sipAmountN, sipRateN, sipYearsN, sipStepUpN]
  );

  const sipBasicResult = useMemo(
    () => calculateSIPValue(sipAmountN, sipRateN, sipYearsN, 0),
    [sipAmountN, sipRateN, sipYearsN]
  );

  const lumpResult = useMemo(
    () => calculateCompoundValue(lumpAmountN, lumpRateN, lumpYearsN, lumpFrequency),
    [lumpAmountN, lumpRateN, lumpYearsN, lumpFrequency]
  );

  const cagrResult = useMemo(() => {
    if (cagrStartN <= 0 || cagrYearsN <= 0 || cagrEndN < 0) return NaN;
    return Math.pow(cagrEndN / cagrStartN, 1 / cagrYearsN) - 1;
  }, [cagrStartN, cagrEndN, cagrYearsN]);

  const cagrIsValid = Number.isFinite(cagrResult);

  const xirrMeta = useMemo(() => {
    const validFlows = xirrFlows.filter(
      (f) => typeof f.amount === "number" && Number.isFinite(f.amount) && f.amount !== 0 && !!f.date
    );
    const hasPos = validFlows.some((f) => (f.amount as number) > 0);
    const hasNeg = validFlows.some((f) => (f.amount as number) < 0);

    if (validFlows.length < 2) return { status: "invalid" as XirrStatus, value: NaN };
    if (!hasPos || !hasNeg) return { status: "invalid" as XirrStatus, value: NaN };

    const distinctDays = new Set(validFlows.map((f) => utcDay(f.date)));
    if (distinctDays.size < 2) return { status: "same-date" as XirrStatus, value: NaN };

    const rate = xirr(validFlows);
    if (Number.isFinite(rate)) return { status: "ok" as XirrStatus, value: rate };

    return { status: "no-solution" as XirrStatus, value: NaN };
  }, [xirrFlows]);

  const sipLabels = useMemo(
    () => Array.from({ length: sipYearsN }, (_, i) => `Year ${i + 1}`),
    [sipYearsN]
  );

  const lumpLabels = useMemo(
    () => Array.from({ length: lumpYearsN }, (_, i) => `Year ${i + 1}`),
    [lumpYearsN]
  );

  const sipSeries = useMemo(
    () => buildSipSeries(sipAmountN, sipRateN, sipYearsN, 0),
    [sipAmountN, sipRateN, sipYearsN]
  );

  const stepUpSipSeries = useMemo(
    () => buildSipSeries(sipAmountN, sipRateN, sipYearsN, sipStepUpN),
    [sipAmountN, sipRateN, sipYearsN, sipStepUpN]
  );

  const lumpSeries = useMemo(
    () => buildLumpSeries(lumpAmountN, lumpRateN, lumpYearsN, lumpFrequency),
    [lumpAmountN, lumpRateN, lumpYearsN, lumpFrequency]
  );

  const updateFlow = useCallback(
    (index: number, field: keyof Omit<CashFlow, "id">, value: string) => {
      setXirrFlows((current) => {
        const next = [...current];
        const target = next[index];
        if (!target) return current;
        next[index] = {
          ...target,
          [field]: field === "amount" ? parseNumericInput(value) : value,
        };
        return next;
      });
    },
    []
  );

  const addInvestment = useCallback(() => {
    setXirrFlows((cur) => [
      ...cur,
      { id: uid(), amount: -10000, date: todayISO() },
    ]);
  }, []);

  const addPayout = useCallback(() => {
    setXirrFlows((cur) => [
      ...cur,
      { id: uid(), amount: 10000, date: todayISO() },
    ]);
  }, []);

  const removeFlow = useCallback((indexToRemove: number) => {
    setXirrFlows((cur) => {
      if (cur.length <= 2) return cur;
      return cur.filter((_, i) => i !== indexToRemove);
    });
  }, []);

  const resetXirrExample = useCallback(() => {
    setXirrFlows([
      { id: uid(), amount: -100000, date: "2024-06-01" },
      { id: uid(), amount: 20000, date: "2025-06-01" },
      { id: uid(), amount: 90000, date: "2028-06-01" },
    ]);
  }, []);

  const xirrValueText =
    xirrMeta.status === "ok" ? formatPercent(xirrMeta.value * 100) : "—";

  const hasInvalidRows = xirrFlows.some((f) => !isFlowValid(f));

  const exportData = useMemo(() => {
    if (activeTab === "sip") {
      return {
        title: "SIP Growth Report",
        subtitle: "SIP projection and step-up comparison",
        summaryCards: [
          {
            label: "Future Value",
            value: formatCurrency(sipResult.futureValue, currency),
            tone: "positive" as const,
          },
          {
            label: "Total Invested",
            value: formatCurrency(sipResult.invested, currency),
            tone: "neutral" as const,
          },
          {
            label: "Wealth Gain",
            value: formatCurrency(sipResult.gain, currency),
            tone: "accent" as const,
          },
        ],
        inputRows: [
          ["Monthly SIP amount", formatCurrency(sipAmountN, currency)],
          ["Expected annual return", formatPercent(sipRateN)],
          ["Investment horizon", `${sipYearsN} years`],
          ["Annual Step-up rate", formatPercent(sipStepUpN)],
        ],
        resultRows: [
          ["Future value", formatCurrency(sipResult.futureValue, currency)],
          ["Total invested", formatCurrency(sipResult.invested, currency)],
          ["Gain", formatCurrency(sipResult.gain, currency)],
        ],
        notes: [
          "Contributions are assumed at the end of each month.",
          "Step-up is applied once per year.",
        ],
      };
    }

    if (activeTab === "lump") {
      return {
        title: "Lump Sum Report",
        subtitle: "One-time investment projection",
        summaryCards: [
          {
            label: "Future Value",
            value: formatCurrency(lumpResult, currency),
            tone: "positive" as const,
          },
          {
            label: "Invested Amount",
            value: formatCurrency(lumpAmountN, currency),
            tone: "neutral" as const,
          },
          {
            label: "Gain",
            value: formatCurrency(lumpResult - lumpAmountN, currency),
            tone: "accent" as const,
          },
        ],
        inputRows: [
          ["Investment amount", formatCurrency(lumpAmountN, currency)],
          ["Annual rate", formatPercent(lumpRateN)],
          ["Horizon", `${lumpYearsN} years`],
          ["Compounding", `${lumpFrequency}x per year`],
        ],
        resultRows: [
          ["Future value", formatCurrency(lumpResult, currency)],
          ["Gain", formatCurrency(lumpResult - lumpAmountN, currency)],
        ],
        notes: ["Compounding frequency affects returns slightly."],
      };
    }

    return {
      title: "Performance Report",
      subtitle: "CAGR and XIRR analysis",
      summaryCards: [
        {
          label: "CAGR",
          value: cagrIsValid ? formatPercent(cagrResult * 100) : "—",
          tone: "positive" as const,
        },
        { label: "XIRR", value: xirrValueText, tone: "accent" as const },
      ],
      inputRows: [
        ["CAGR start", formatCurrency(cagrStartN, currency)],
        ["CAGR end", formatCurrency(cagrEndN, currency)],
        ["CAGR years", `${cagrYearsN}`],
        ["XIRR rows", `${xirrFlows.length}`],
      ],
      resultRows: [
        ["CAGR", cagrIsValid ? formatPercent(cagrResult * 100) : "—"],
        ["XIRR", xirrValueText],
      ],
      notes: [
        "CAGR ignores the timing of cash flows.",
        "XIRR uses the exact dates of each cash flow.",
      ],
    };
  }, [
    activeTab,
    currency,
    sipResult,
    sipAmountN,
    sipRateN,
    sipYearsN,
    sipStepUpN,
    lumpResult,
    lumpAmountN,
    lumpRateN,
    lumpYearsN,
    lumpFrequency,
    cagrResult,
    cagrIsValid,
    cagrStartN,
    cagrEndN,
    cagrYearsN,
    xirrValueText,
    xirrFlows.length,
  ]);

  const symbol = CURRENCIES[currency].symbol;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-3 py-3 text-white">
      <section className={`${premiumShellClass} mb-5 px-5 py-6`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_minmax(300px,420px)]">
            <div className="max-w-3xl min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
                <BarChart3 className="h-3.5 w-3.5" />
                Private finance workspace
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Investment returns with{" "}
                <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                  clear projections
                </span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
                Compare SIP, lump sum, CAGR, and XIRR — all calculations run locally in your browser.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge color="blue">⚡ Instant Calculations</Badge>
                <Badge color="green">🔒 100% Private</Badge>
                <Badge color="purple">📊 Live Charts</Badge>
              </div>
            </div>

            <div className="min-w-0 rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur">
                <div className="text-lg font-semibold text-white">Quick Overview</div>

                <div className="mt-6 space-y-4">
                  <div className="min-w-0 flex items-start justify-between gap-3">
                    <span className="shrink-0 text-slate-400">Mode</span>
                    <span className="min-w-0 break-words text-right text-emerald-300">
                      {tabs.find((t) => t.id === activeTab)?.label ?? "SIP"}
                    </span>
                  </div>
                  <div className="min-w-0 flex items-start justify-between gap-3">
                    <span className="shrink-0 text-slate-400">SIP value</span>
                    <span className="min-w-0 break-words text-right text-emerald-300">
                      {formatCurrency(sipResult.futureValue, currency)}
                    </span>
                  </div>
                  <div className="min-w-0 flex items-start justify-between gap-3">
                    <span className="shrink-0 text-slate-400">Lump sum</span>
                    <span className="min-w-0 break-words text-right text-emerald-300">
                      {formatCurrency(lumpResult, currency)}
                    </span>
                  </div>
                  <div className="min-w-0 flex items-start justify-between gap-3">
                    <span className="shrink-0 text-slate-400">XIRR</span>
                    <span className="min-w-0 break-words text-right text-emerald-300">
                      {xirrValueText}
                    </span>
                  </div>
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

                  <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-[10px] sm:text-[11px] text-yellow-200 leading-snug flex items-start gap-1.5">
                    <TriangleAlert className="mt-0.5 h-3 w-3 shrink-0" />
                    <span>
                      Switching currency only changes the symbol and number
                      formatting — it does <b>not</b> convert your amounts. ₹5,00,000
                      becomes $5,00,000, not an equivalent dollar value.
                    </span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
                  active
                    ? "border-blue-400/30 bg-blue-400/15 text-blue-100"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-blue-400/20 hover:bg-white/[0.06]",
                ].join(" ")}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "sip" && (
        <div className="space-y-4">
          <ExplainerPanel tabKey="sip" explainers={EXPLAINERS} />

          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <section className={premiumShellClass}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-white/10 p-4 sm:p-5">
                <SectionHeader
                  title="SIP growth calculator"
                  subtitle="Compare basic SIP vs. step-up SIP over your chosen horizon."
                  icon={PiggyBank}
                />

                <FinancePdfExport
                  filename="SIP-growth-report"
                  title={exportData.title}
                  subtitle={exportData.subtitle}
                  summaryCards={exportData.summaryCards}
                  inputRows={exportData.inputRows}
                  resultRows={exportData.resultRows}
                  notes={exportData.notes}
                  chartRef={chartRef}
                />
              </div>

              <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5">
                <div>
                  <Field label={`Monthly SIP amount (${symbol})`}>
                    <input
                      type="number"
                      aria-label="Monthly SIP amount"
                      value={sipAmount}
                      onChange={sipAmountField.onChange}
                      onBlur={sipAmountField.onBlur}
                      min={LIMITS.sipAmount.min}
                      max={LIMITS.sipAmount.max}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text={`How much you invest each month. Even ${symbol}500/month adds up significantly over time.`} />
                </div>

                <div>
                  <Field label="Expected annual return (%)">
                    <input
                      type="number"
                      aria-label="Expected annual return in percentage"
                      value={sipRate}
                      onChange={sipRateField.onChange}
                      onBlur={sipRateField.onBlur}
                      min={LIMITS.sipRate.min}
                      max={LIMITS.sipRate.max}
                      step={0.1}
                      inputMode="decimal"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="Average yearly return from your fund. Indian equity mutual funds have historically returned 10–14%." />
                </div>

                <div>
                  <Field label="Investment horizon (years)">
                    <input
                      type="number"
                      aria-label="Investment horizon in years"
                      value={sipYears}
                      onChange={sipYearsField.onChange}
                      onBlur={sipYearsField.onBlur}
                      min={LIMITS.sipYears.min}
                      max={LIMITS.sipYears.max}
                      step={1}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text={`How long you plan to stay invested (whole years, up to ${LIMITS.sipYears.max}). Longer horizons benefit far more from compounding.`} />
                </div>

                <div>
                  <Field label="Annual step-up rate (%)">
                    <input
                      type="number"
                      aria-label="Annual step-up rate in percentage"
                      value={sipStepUp}
                      onChange={sipStepUpField.onChange}
                      onBlur={sipStepUpField.onBlur}
                      min={LIMITS.sipStepUp.min}
                      max={LIMITS.sipStepUp.max}
                      step={0.1}
                      inputMode="decimal"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="Increase your monthly SIP by this % every year — set to 0 for a fixed SIP. A 5–10% step-up mirrors typical salary growth." />
                </div>
              </div>

              <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
                <ResultBox label="Total invested" value={formatCurrency(sipResult.invested, currency)} tone="neutral" />
                <ResultBox label="Future value (with step-up)" value={formatCurrency(sipResult.futureValue, currency)} tone="gradient" />
                <ResultBox label="Wealth gain" value={formatCurrency(sipResult.gain, currency)} tone="positive" />
              </div>
            </section>

            <section className={premiumShellClass}>
              <div className="border-b border-white/10 p-4 sm:p-5">
                <SectionHeader
                  title="Growth comparison"
                  subtitle="Basic SIP (no step-up) vs. step-up SIP — year by year."
                  icon={BarChart3}
                />
              </div>

              <div ref={chartRef} className="p-4 sm:p-5">
                <FinanceChart
                  labels={sipLabels}
                  datasets={[
                    {
                      label: "Basic SIP",
                      data: sipSeries,
                      color: "rgba(34,197,94,0.8)",
                    },
                    {
                      label: `Step-up SIP (+${sipStepUpN}%/yr)`,
                      data: stepUpSipSeries,
                      color: "rgba(59,130,246,0.8)",
                    },
                  ]}
                />
              </div>

              {sipStepUpN > 0 && (
                <div className="p-4 sm:p-5 text-sm text-white/60">
                  Step-up adds{" "}
                  <span className="font-semibold text-white">
                    {formatCurrency(sipResult.futureValue - sipBasicResult.futureValue, currency)}
                  </span>{" "}
                  extra over {sipYearsN} years compared to a flat SIP.
                </div>
              )}
            </section>
          </div>
        </div>
      )}

      {activeTab === "lump" && (
        <div className="space-y-4">
          <ExplainerPanel tabKey="lump" explainers={EXPLAINERS} />

          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <section className={premiumShellClass}>
              <div className="border-b border-white/10 p-4 sm:p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <SectionHeader
                    title="Lump sum calculator"
                    subtitle="Project the future value of a single one-time investment."
                    icon={TrendingUp}
                  />

                  <FinancePdfExport
                    filename="lump-sum-report"
                    title={exportData.title}
                    subtitle={exportData.subtitle}
                    summaryCards={exportData.summaryCards}
                    inputRows={exportData.inputRows}
                    resultRows={exportData.resultRows}
                    notes={exportData.notes}
                    chartRef={chartRef}
                  />
                </div>
              </div>
              <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5">
                <div>
                  <Field label={`Investment amount (${symbol})`}>
                    <input
                      type="number"
                      aria-label="Investment amount"
                      value={lumpAmount}
                      onChange={lumpAmountField.onChange}
                      onBlur={lumpAmountField.onBlur}
                      min={LIMITS.lumpAmount.min}
                      max={LIMITS.lumpAmount.max}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="The one-time sum you're investing today." />
                </div>

                <div>
                  <Field label="Annual rate (%)">
                    <input
                      type="number"
                      aria-label="Expected annual return in percentage"
                      value={lumpRate}
                      onChange={lumpRateField.onChange}
                      onBlur={lumpRateField.onBlur}
                      min={LIMITS.lumpRate.min}
                      max={LIMITS.lumpRate.max}
                      step={0.1}
                      inputMode="decimal"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="Expected yearly return. For fixed deposits this is typically 6–7%; equity funds 10–14%." />
                </div>

                <div>
                  <Field label="Investment horizon (years)">
                    <input
                      type="number"
                      aria-label="Investment horizon in years"
                      value={lumpYears}
                      onChange={lumpYearsField.onChange}
                      onBlur={lumpYearsField.onBlur}
                      min={LIMITS.lumpYears.min}
                      max={LIMITS.lumpYears.max}
                      step={1}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text={`How many whole years you'll stay invested before withdrawing (up to ${LIMITS.lumpYears.max}).`} />
                </div>

                <div>
                  <Field label="Compounding frequency">
                    <CustomSelect value={lumpFrequency.toString()}
                      callBackTrigger={(e) => setLumpFrequency(Number(e))}
                      options={[
                          { value: "1", label: "Annually (once a year)" },
                          { value: "2", label: "Semi-annually (every 6 months)" },
                          { value: "4", label: "Quarterly (every 3 months)" },
                          { value: "12", label: "Monthly (every month)" },
                      ]} />
                  </Field>
                  <FieldHint text="More frequent compounding = slightly higher returns. Most mutual funds compound daily or monthly." />
                </div>
              </div>

              <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
                <ResultBox label="Invested amount" value={formatCurrency(lumpAmountN, currency)} tone="neutral" />
                <ResultBox label="Future value" value={formatCurrency(lumpResult, currency)} tone="gradient" />
                <ResultBox label="Compound gain" value={formatCurrency(lumpResult - lumpAmountN, currency)} tone="positive" />
              </div>
            </section>

            <section className={premiumShellClass}>
              <div className="border-b border-white/10 p-4 sm:p-5">
                <SectionHeader
                  title="Value projection"
                  subtitle="How your investment grows year by year."
                  icon={BarChart3}
                />
              </div>

              <div ref={chartRef} className="p-4 sm:p-5">
                <FinanceChart
                  labels={lumpLabels}
                  datasets={[
                    {
                      label: "Projected value",
                      data: lumpSeries,
                      color: "rgba(59,130,246,0.9)",
                    },
                  ]}
                />
              </div>
            </section>
          </div>
        </div>
      )}

      {activeTab === "performance" && (
        <div className="space-y-5">
          <ExplainerPanel tabKey="performance" explainers={EXPLAINERS} />

          {/* This tab has no chart component, but FinancePdfExport still
              expects a chartRef. Pointing it at the results wrapper below
              keeps the ref non-null so a PDF export from this tab doesn't
              crash trying to capture a missing chart element. */}
          <div ref={performanceRef} className="grid gap-5 xl:grid-cols-2">
            <section className={premiumShellClass}>
              <div className="border-b border-white/10 p-4 sm:p-5">

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <SectionHeader
                    title="CAGR calculator"
                    subtitle="Find the annualised growth rate between two values."
                    icon={Percent}
                  />

                  <FinancePdfExport
                    filename="CAGR-report"
                    title={exportData.title}
                    subtitle={exportData.subtitle}
                    summaryCards={exportData.summaryCards}
                    inputRows={exportData.inputRows}
                    resultRows={exportData.resultRows}
                    notes={exportData.notes}
                    chartRef={performanceRef}
                  />
                </div>
              </div>

              <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5">
                <div>
                  <Field label={`Opening value (${symbol})`}>
                    <input
                      type="number"
                      aria-label="What the investment was worth at the start of the period."
                      value={cagrStart}
                      onChange={cagrStartField.onChange}
                      onBlur={cagrStartField.onBlur}
                      min={LIMITS.cagrStart.min}
                      max={LIMITS.cagrStart.max}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="What the investment was worth at the start of the period." />
                </div>

                <div>
                  <Field label={`Ending value (${symbol})`}>
                    <input
                      type="number"
                      aria-label="What the investment is worth at the end of the period."
                      value={cagrEnd}
                      onChange={cagrEndField.onChange}
                      onBlur={cagrEndField.onBlur}
                      min={LIMITS.cagrEnd.min}
                      max={LIMITS.cagrEnd.max}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="What the investment is worth today (or at the end of the period)." />
                </div>

                <div className="sm:col-span-2">
                  <Field label="Period (years)">
                    <input
                      type="number"
                      aria-label="Number of years between the opening and ending values."
                      value={cagrYears}
                      onChange={cagrYearsField.onChange}
                      onBlur={cagrYearsField.onBlur}
                      min={LIMITS.cagrYears.min}
                      max={LIMITS.cagrYears.max}
                      step={1}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text={`Number of whole years between the opening and ending values (up to ${LIMITS.cagrYears.max}).`} />
                </div>
              </div>

              <div className="p-4 pt-0 sm:p-5 sm:pt-0">
                <ResultBox
                  label="Compound annual growth rate (CAGR)"
                  value={cagrIsValid ? formatPercent(cagrResult * 100) : "Enter valid values above"}
                  tone={cagrIsValid ? "gradient" : "neutral"}
                />
                {cagrIsValid && (
                  <p className="mt-3 text-xs text-white/45">
                    {formatCurrency(cagrStartN, currency)} grew to {formatCurrency(cagrEndN, currency)} in {cagrYearsN} year{cagrYearsN !== 1 ? "s" : ""} — equivalent to a steady {formatPercent(cagrResult * 100)} every year.
                  </p>
                )}
              </div>
            </section>

            <section className={premiumShellClass}>
              <div className="border-b border-white/10 p-4 sm:p-5">
                <SectionHeader
                  title="XIRR calculator"
                  subtitle="Annualised return across multiple dated cash flows."
                  icon={Calculator}
                />
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                <XirrSignLegend />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={addInvestment}
                    className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/15"
                  >
                    <ArrowDownCircle className="h-4 w-4" />
                    Add investment
                  </button>
                  <button
                    type="button"
                    onClick={addPayout}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/15"
                  >
                    <ArrowUpCircle className="h-4 w-4" />
                    Add payout
                  </button>
                  <button
                    type="button"
                    onClick={resetXirrExample}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/[0.08]"
                  >
                    Reset example
                  </button>
                </div>

                <p className="text-xs text-white/40">
                  {xirrFlows.length} cash flow{xirrFlows.length !== 1 ? "s" : ""} — need at least 1 investment and 1 payout to calculate XIRR.
                </p>

                <div className="space-y-3">
                  {xirrFlows.map((flow, index) => (
                    <FlowRow
                      key={flow.id}
                      flow={flow}
                      index={index}
                      currency={currency}
                      onChange={updateFlow}
                      onRemove={removeFlow}
                      canRemove={xirrFlows.length > 2}
                    />
                  ))}
                </div>

                {hasInvalidRows && (
                  <div className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    Some rows have a zero amount or missing date and are excluded from the calculation.
                  </div>
                )}

                <ResultBox label="Annualised XIRR" value={xirrValueText} tone={xirrMeta.status === "ok" ? "gradient" : "neutral"} />

                {xirrMeta.status === "invalid" && (
                  <div className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    Add at least one investment (negative) and one payout (positive) with valid dates.
                  </div>
                )}

                {xirrMeta.status === "same-date" && (
                  <div className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    All cash flows fall on the same date, so there's no time period to annualise a return over. Add at least one flow on a different date.
                  </div>
                )}

                {xirrMeta.status === "no-solution" && (
                  <div className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    No stable XIRR solution found for this cash flow set. XIRR depends on both the amounts and their exact timing — try adjusting the dates or amounts.
                  </div>
                )}

                {xirrMeta.status === "ok" && (
                  <p className="text-xs text-white/45">
                    This means your investment portfolio generated the equivalent of{" "}
                    <span className="text-white">{formatPercent(xirrMeta.value * 100)}</span> per year, adjusted for the exact timing of each cash flow.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}