"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CustomSelect from "@/components/ui/customSelect";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  CURRENCIES,
  CurrencyCode,
  LoanType,
  PrepaymentEntry,
  PrepaymentMode,
  PrepaymentType,
  amortizationSchedule,
  amortizationScheduleWithPrepayments,
  getLoanPreset,
} from "@/components/tools/emiCalculator/core/Engine";
import { ROUTE_MAP } from "@/components/tools/emiCalculator/core/Config";
import { StatCard } from "@/sharedUI/statCard";
/**
 * ToolRendererClient does:
 *   mergedProps = { ...toolMeta.defaultProps, ...toolMeta }
 * and spreads that onto this component. That means this component receives
 * EVERY field of the matched ToolRegistryEntry as a prop (title, description,
 * alternates, category, keywords, icon, defaultProps-as-a-nested-object,
 * etc.) — not just the one value we actually care about. We only read
 * `defaultType` (which we control via each registry entry's `defaultProps`)
 * and intentionally ignore the rest via the index signature below, so this
 * stays compatible if new fields get added to ToolRegistryEntry later.
 */
type EMICalculatorProps = {
  defaultType?: LoanType;
  [key: string]: unknown;
};

const AmortizationChart = dynamic(
  () =>
    import("@/components/tools/emiCalculator/AmortizationChart").then(
      (m) => m.default
    ),
  { ssr: false, loading: () => null }
);

/* ─────────────────────────────────────────────
   Types local to the UI layer
───────────────────────────────────────────── */
type ResultTab = "summary" | "chart" | "schedule";
// Simplified on purpose: the old dropdown had 7 chart types (line, area,
// smooth, stepped, bar, pie, doughnut). Three covers every question people
// actually ask ("how does my balance drop", "year by year", "split") without
// turning this into a generic charting tool.
type ChartType = "line" | "bar" | "pie";

/* ─────────────────────────────────────────────
   Small presentational building blocks
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

/** Slider + synced number input, so numbers are easy to both scrub and type */
function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  formatValue,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  formatValue?: (v: number) => string;
}) {
  const pct = Math.min(
    100,
    Math.max(0, ((value - min) / Math.max(1, max - min)) * 100)
  );
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-white/80">{label}</label>
        <div className="flex items-center rounded-lg border border-white/10 bg-white/5 focus-within:border-blue-400/50 overflow-hidden">
          {prefix && (
            <span className="pl-3 text-xs text-white/40">{prefix}</span>
          )}
          <input
            type="number"
            aria-label={label}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-28 bg-transparent px-2 py-1.5 text-right text-sm text-white focus:outline-none"
          />
          {suffix && (
            <span className="pr-3 text-xs text-white/40">{suffix}</span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(Math.max(value, min), max)}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} slider`}
        className="w-full accent-blue-400 cursor-pointer"
        style={{
          background: `linear-gradient(to right, rgb(96 165 250 / 0.9) ${pct}%, rgb(255 255 255 / 0.1) ${pct}%)`,
          height: 6,
          borderRadius: 999,
          appearance: "none",
        }}
      />
      <div className="flex justify-between text-[11px] text-white/35">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}

function SectionHeading({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-semibold text-white/80 tracking-wide uppercase">
        {children}
      </h2>
      {action}
    </div>
  );
}

/** Quick 3-step onboarding strip so first-time visitors know the flow */
function QuickStartStrip() {
  const steps = [
    { icon: "🏦", title: "Pick a loan type", body: "Home, personal or car — loads a sensible starting point." },
    { icon: "🧮", title: "Adjust the numbers", body: "Drag the sliders or type exact amount, rate and tenure." },
    { icon: "📉", title: "See what you save", body: "Add prepayments and instantly compare interest & tenure." },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div
          key={s.title}
          className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 p-3 sm:p-4 flex gap-3 items-start"
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

/** Collapsible note explaining the calculation method, so it's clear what
 *  standard this follows and where it may differ from a lender's own quote. */
function MethodologyNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 overflow-hidden">
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
            This calculator uses the standard reducing-balance (amortizing
            loan) formula used by banks worldwide: EMI = P × r × (1+r)ⁿ / [(1+r)ⁿ − 1],
            where interest is charged only on the outstanding balance each
            month. It works the same way regardless of currency or country.
          </p>
          <p>
            It doesn't include fees, insurance, or charges some lenders bundle
            into an official APR/APRC quote, and it assumes your rate
            compounds monthly rather than daily. It also doesn't support
            flat-rate (add-on interest) loans, used by some auto or consumer
            lenders. Treat these numbers as an estimate and confirm the exact
            figures with your lender.
          </p>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
        active
          ? "border-blue-400/50 bg-blue-400/15 text-white"
          : "border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function EmiCalculatorHubPage({
  defaultType = "home",
}: EMICalculatorProps) {
  const defaultPreset = getLoanPreset(defaultType);
  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialActiveTab = (): LoanType => {
    const type = searchParams.get("category")?.toLowerCase() || "";
    if (type === "home") return "home";
    if (type === "car") return "car";
    if (type === "personal") return "personal";
    return defaultType;
  };

  /* Core state */
  const [loanType, setLoanType] = useState<LoanType>(() =>
    getInitialActiveTab()
  );
  const [principal, setPrincipal] = useState<number>(defaultPreset.principal);
  const [annualRate, setAnnualRate] = useState<number>(
    defaultPreset.annualRate
  );
  const [tenureYears, setTenureYears] = useState<number>(
    defaultPreset.tenureYears
  );

  // Warm the other two product routes so switching tabs feels instant
  // (client-side transition, no full page reload) instead of waiting on
  // a cold fetch the first time someone clicks a different loan type.
  useEffect(() => {
    (Object.keys(ROUTE_MAP) as LoanType[])
      .filter((t) => t !== loanType)
      .forEach((t) => router.prefetch(ROUTE_MAP[t]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Currency — lets users worldwide see amounts in their own currency */
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const currencyMeta = CURRENCIES[currency];
  const fmt = useMemo(() => {
    const nf = new Intl.NumberFormat(currencyMeta.locale, {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "JPY" ? 0 : 2,
      minimumFractionDigits: currency === "JPY" ? 0 : 2,
    });
    return (v: number) => nf.format(Number.isFinite(v) ? v : 0);
  }, [currency, currencyMeta.locale]);

  /* Prepayment & advanced state — advanced stays collapsed until asked for */
  const [compareEnabled, setCompareEnabled] = useState<boolean>(true);
  const [bankEmiLimit, setBankEmiLimit] = useState<number>(25);
  const [prepayOpen, setPrepayOpen] = useState<boolean>(false);
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);
  const [balloonPayment, setBalloonPayment] = useState<number>(0);
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);

  /* Results tab */
  const [resultTab, setResultTab] = useState<ResultTab>("summary");

  /* Chart visibility toggles */
  const [showBasePrincipal, setShowBasePrincipal] = useState<boolean>(true);
  const [showBaseInterest, setShowBaseInterest] = useState<boolean>(true);
  const [showPrepayPrincipal, setShowPrepayPrincipal] = useState<boolean>(true);
  const [showPrepayInterest, setShowPrepayInterest] = useState<boolean>(true);
  const [chartType, setChartType] = useState<ChartType>("line");

  /* Prepayment entries */
  const [prepayments, setPrepayments] = useState<PrepaymentEntry[]>([
    { id: 1, type: "one-time", amount: 50000, month: 12, mode: "principal" },
  ]);
  const [nextPrepaymentId, setNextPrepaymentId] = useState<number>(2);
  
  const prepaySectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prepayOpen) {
      prepaySectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      prepaySectionRef.current?.focus();
    }
  }, [prepayOpen]);

  const addPrepayment = () => {
    setPrepayments((c) => [
      ...c,
      {
        id: nextPrepaymentId,
        type: "one-time",
        amount: 10000,
        month: Math.min(12, tenureYears * 12),
        mode: "principal",
      },
    ]);
    setNextPrepaymentId((id) => id + 1);
    setPrepayOpen(true);
  };

  const updatePrepayment = <K extends keyof PrepaymentEntry>(
    id: number,
    field: K,
    value: PrepaymentEntry[K]
  ) => {
    setPrepayments((c) =>
      c.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const removePrepayment = (id: number) => {
    setPrepayments((c) => c.filter((e) => e.id !== id));
  };

  /** Switching loan type both resets to that product's preset AND updates
   *  the URL to its dedicated page — client-side (router.push), so there's
   *  no full page reload, the calculator state transition is instant, and
   *  the address bar / share link / back button all stay correct. */
  const handleLoanTypeChange = (type: LoanType) => {
    const preset = getLoanPreset(type);
    setLoanType(type);
    setPrincipal(preset.principal);
    setAnnualRate(preset.annualRate);
    setTenureYears(preset.tenureYears);
    if (ROUTE_MAP[type]) {
      router.push(ROUTE_MAP[type], { scroll: false });
    }
  };

  /* Derived */
  const months = Math.max(1, tenureYears) * 12;

  const base = useMemo(
    () => amortizationSchedule(principal, annualRate, months),
    [principal, annualRate, months]
  );

  const adjusted = useMemo(
    () =>
      amortizationScheduleWithPrepayments(
        principal,
        annualRate,
        months,
        prepayments,
        bankEmiLimit,
        extraMonthlyPayment,
        balloonPayment,
        currencyMeta.symbol
      ),
    [
      principal,
      annualRate,
      months,
      prepayments,
      bankEmiLimit,
      extraMonthlyPayment,
      balloonPayment,
      currencyMeta.symbol,
    ]
  );

  const monthsSaved = Math.max(0, base.monthsUsed - adjusted.monthsUsed);
  const interestSaved = Math.max(
    0,
    (base.cumulativeInterest.at(-1) ?? 0) -
      (adjusted.cumulativeInterest.at(-1) ?? 0)
  );
  const totalPrepaymentAmount = adjusted.monthRows.reduce(
    (s, r) => s + r.prepaymentAmount,
    0
  );
  const finalEmi = adjusted.monthRows.at(-1)?.currentEmi ?? adjusted.emi;
  const clippedPrepayments = adjusted.monthRows.some((r) => r.clipped);
  const emiCapAdjustments = (adjusted.capAdjustments ?? []).filter(
    (a) => a.mode === "emi"
  );
  const loanPreset = getLoanPreset(loanType);

  /* Validation */
  const amountValid = principal > 0;
  const rateValid = annualRate >= 0;
  const tenureValid = tenureYears >= 1;
  const emiLimitValid = bankEmiLimit >= 1 && bankEmiLimit <= 100;
  const prepaymentsValid = prepayments.every(
    (e) => e.month >= 1 && e.month <= months && e.amount > 0
  );
  const advancedValid = extraMonthlyPayment >= 0 && balloonPayment >= 0;
  const hasValidationErrors =
    !amountValid ||
    !rateValid ||
    !tenureValid ||
    !emiLimitValid ||
    !prepaymentsValid ||
    !advancedValid;

  const pieChartData = useMemo(
    () => ({
      labels: ["Principal Paid", "Interest Paid"],
      values: [principal, adjusted.cumulativeInterest.at(-1) ?? 0],
      colors: ["#22c55e", "#60a5fa"],
    }),
    [principal, adjusted.cumulativeInterest]
  );

  const hasPrepayments = totalPrepaymentAmount > 0;

  /* ───── Render ───── */
  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6 max-w-4xl mx-auto">
      {/* ── Intro ── */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 pt-1">
          <span className="text-xs text-white/40">Currency</span>
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

      {/* ── Loan type tabs — instant client-side switch, URL updates too ── */}
      <div className="flex gap-2 flex-wrap justify-center">
        {(["home", "personal", "car"] as LoanType[]).map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => handleLoanTypeChange(t)}
            aria-pressed={loanType === t}
            className={`px-5 py-2.5 rounded-full text-sm font-medium border transition ${
              loanType === t
                ? "border-blue-400/60 bg-blue-400/15 text-white"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t === "home" ? "🏠" : t === "personal" ? "👤" : "🚗"}{" "}
            {t.charAt(0).toUpperCase() + t.slice(1)} Loan
          </button>
        ))}
      </div>

      {/* ── Validation banner ── */}
      {hasValidationErrors && (
        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 px-5 py-4 text-sm text-orange-100">
          <div className="font-semibold text-white mb-2">
            ⚠️ Please check these before your numbers are fully accurate
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs text-orange-200">
            {!amountValid && <li>Loan amount must be greater than 0.</li>}
            {!rateValid && <li>Interest rate cannot be negative.</li>}
            {!tenureValid && <li>Tenure must be at least 1 year.</li>}
            {!emiLimitValid && (
              <li>EMI reduction limit must be between 1% and 100%.</li>
            )}
            {!prepaymentsValid && (
              <li>
                One or more prepayment entries have an invalid amount or
                month.
              </li>
            )}
            {!advancedValid && (
              <li>Advanced payment values must be zero or greater.</li>
            )}
          </ul>
        </div>
      )}

      {/* ── Quick start ── */}
      <QuickStartStrip />

      {/* ── Loan details + live EMI result (Basic layer) ── */}
      <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 p-6 sm:p-8">
        <SectionHeading
          action={
            <button
              type="button"
              onClick={() => handleLoanTypeChange(loanType)}
              className="text-xs text-blue-300 hover:text-blue-200 underline underline-offset-2"
            >
              Reset to {loanType.charAt(0).toUpperCase() + loanType.slice(1)}{" "}
              preset
            </button>
          }
        >
          Loan Details
        </SectionHeading>
        <p className="text-xs text-white/40 -mt-1 mb-5">
          {loanPreset.description}. Drag a slider or type an exact value.
        </p>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 items-start">
          {/* Inputs */}
          <div className="space-y-5">
            <SliderField
              label="Loan Amount"
              value={principal}
              onChange={setPrincipal}
              min={loanPreset.min}
              max={loanPreset.max}
              step={loanPreset.step}
              prefix={currencyMeta.symbol}
              formatValue={(v) => fmt(v)}
            />
            <SliderField
              label="Annual Interest Rate"
              value={annualRate}
              onChange={setAnnualRate}
              min={1}
              max={20}
              step={0.05}
              suffix="%"
            />
            <SliderField
              label="Tenure"
              value={tenureYears}
              onChange={setTenureYears}
              min={1}
              max={30}
              step={1}
              suffix="yrs"
            />
          </div>

          {/* Live result */}
          <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5 md:sticky md:top-4">
            <div className="text-xs text-white/50 uppercase tracking-wide mb-2">
              Estimated Monthly EMI
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white break-all">
              {fmt(base.emi)}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="min-w-0">
                <StatCard
                  label="Total Interest"
                  accent
                  value={fmt(base.cumulativeInterest.at(-1) ?? 0)}
                />
              </div>

              <div className="min-w-0">
                <StatCard
                  accent
                  label="Total Payment"
                  value={fmt(base.totalPayment ?? base.emi * base.monthsUsed)}
                />
              </div>
            </div>
            {hasPrepayments && (
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/50">With your prepayments</span>
                <span className="text-emerald-300 font-semibold">
                  🎉 Save {fmt(interestSaved)} ·{" "}
                  {monthsSaved > 0 ? `${monthsSaved} month${monthsSaved > 1 ? 's' : ''} faster` : "same tenure"}
                </span>
              </div>
            )}
            {!prepayOpen && (
              <button
                type="button"
                onClick={() => setPrepayOpen(true)}
                className="mt-4 w-full text-xs font-semibold text-blue-300 hover:text-blue-200 underline underline-offset-2 text-left"
              >
                Want to reduce your interest? Explore prepayment →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── How this is calculated ── */}
      <MethodologyNote />

      {/* ── Prepayment & advanced options (progressively revealed) ── */}
      <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 overflow-hidden"
        tabIndex={-1}
        ref={prepaySectionRef}>
        <button
          type="button"
          onClick={() => setPrepayOpen(!prepayOpen)}
          aria-expanded={prepayOpen}
          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition"
        >
          <div>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              💰 Prepayment Options
              {hasPrepayments && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
                  Active
                </span>
              )}
            </div>
            <div className="text-xs text-white/50 mt-0.5">
              Optional — add extra payments to close your loan faster
            </div>
          </div>
          <span className="text-white/50 text-xl w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 shrink-0">
            {prepayOpen ? "−" : "+"}
          </span>
        </button>

        {prepayOpen && (
          <div className="px-6 pb-6 pt-2 space-y-5 border-t border-white/10">
            {/* Bank limit + Advanced toggle row — advanced stays collapsed by default */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Bank EMI reduction limit (%)"
                hint="Most banks cap this at 25%"
              >
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={bankEmiLimit}
                  onChange={(e) => setBankEmiLimit(Number(e.target.value))}
                  className={inputCls}
                />
              </Field>
              <div className="space-y-2">
                <div className="text-sm font-medium text-white/80">
                  Advanced options
                </div>
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition"
                >
                  {advancedOpen ? "Hide advanced ↑" : "Show advanced ↓"}
                </button>
              </div>
            </div>

            {/* Advanced options — extra monthly / balloon, hidden until asked for */}
            {advancedOpen && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
                <div className="text-xs text-white/50 uppercase tracking-wide">
                  Extra payments
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label={`Extra monthly contribution (${currencyMeta.symbol})`}
                    hint="Added on top of every EMI"
                  >
                    <input
                      type="number"
                      min={0}
                      value={extraMonthlyPayment}
                      onChange={(e) =>
                        setExtraMonthlyPayment(Number(e.target.value))
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label={`Balloon payment at maturity (${currencyMeta.symbol})`}
                    hint="Lowers your EMI now"
                  >
                    <input
                      type="number"
                      min={0}
                      value={balloonPayment}
                      onChange={(e) =>
                        setBalloonPayment(Number(e.target.value))
                      }
                      className={inputCls}
                    />
                  </Field>
                </div>
                {balloonPayment > 0 && (
                  <div className="rounded-xl border border-blue-400/30 bg-blue-400/10 px-4 py-3 text-xs text-blue-200 leading-relaxed">
                    A balloon payment lowers your regular EMI starting right
                    away — the loan is structured so this lump sum covers
                    what's left when it matures. Increase it and watch the
                    Effective EMI drop; decrease it and the EMI rises back
                    toward normal.
                  </div>
                )}
              </div>
            )}

            {/* Prepayment entries */}
            <div className="space-y-4">
              {prepayments.map((entry, index) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold text-white">
                      Prepayment #{index + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => removePrepayment(entry.id)}
                      className="text-xs text-red-400 hover:text-red-300 transition underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Type">
                      <CustomSelect
                        value={entry.type}
                        callBackTrigger={(e: PrepaymentType) =>
                          updatePrepayment(entry.id, "type", e)
                        }
                        options={[
                          { value: "one-time", label: "One-time" },
                          { value: "monthly", label: "Monthly" },
                        ]}
                      />
                    </Field>
                    <Field label="Mode">
                      <CustomSelect
                        value={entry.mode}
                        callBackTrigger={(e: PrepaymentMode) =>
                          updatePrepayment(entry.id, "mode", e)
                        }
                        options={[
                          { value: "principal", label: "Principal reduction" },
                          { value: "emi", label: "EMI reduction" },
                        ]}
                      />
                    </Field>
                    <Field label={`Amount (${currencyMeta.symbol})`}>
                      <input
                        type="number"
                        min={0}
                        value={entry.amount}
                        onChange={(e) =>
                          updatePrepayment(
                            entry.id,
                            "amount",
                            Number(e.target.value)
                          )
                        }
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Starting Month">
                      <input
                        type="number"
                        min={1}
                        max={months}
                        value={entry.month}
                        onChange={(e) =>
                          updatePrepayment(
                            entry.id,
                            "month",
                            Number(e.target.value)
                          )
                        }
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  {entry.mode === "emi" && (
                    <div className="mt-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-xs text-yellow-200">
                      EMI reductions are capped to {bankEmiLimit}% of the
                      current EMI at each payment month.
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addPrepayment}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold hover:bg-blue-500/30 hover:text-white transition"
            >
              + Add another prepayment
            </button>

            {prepayments.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/50">
                {prepayments.length} prepayment
                {prepayments.length > 1 ? "s" : ""} configured. EMI reduction
                entries are validated against the bank cap when the schedule
                is calculated.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Results: Summary / Chart / Schedule tabs ── */}
      <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 p-6 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-5">
          <TabButton
            active={resultTab === "summary"}
            onClick={() => setResultTab("summary")}
          >
            📊 Summary
          </TabButton>
          <TabButton
            active={resultTab === "chart"}
            onClick={() => setResultTab("chart")}
          >
            📈 Chart
          </TabButton>
          <TabButton
            active={resultTab === "schedule"}
            onClick={() => setResultTab("schedule")}
          >
            📅 Schedule
          </TabButton>
        </div>

        {/* Summary tab */}
        {resultTab === "summary" && (
          <div>
            {hasPrepayments ? (
              <div className="space-y-5">
                {/* Plain-language payoff summary — the "why bother" answer */}
                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-5">
                  <div className="text-sm font-semibold text-emerald-300 mb-1.5">
                    🎉 Your prepayments are working for you
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    By putting {fmt(totalPrepaymentAmount)} extra toward this
                    loan, you cut total interest from{" "}
                    <span className="text-white font-medium">
                      {fmt(base.cumulativeInterest.at(-1) ?? 0)}
                    </span>{" "}
                    down to{" "}
                    <span className="text-white font-medium">
                      {fmt(adjusted.cumulativeInterest.at(-1) ?? 0)}
                    </span>
                    {" — "}
                    that's{" "}
                    <span className="text-emerald-300 font-semibold">
                      {fmt(interestSaved)} saved
                      {(base.cumulativeInterest.at(-1) ?? 0) > 0
                        ? ` (${(
                            (interestSaved /
                              (base.cumulativeInterest.at(-1) || 1)) *
                            100
                          ).toFixed(1)}% less interest)`
                        : ""}
                    </span>
                    .{" "}
                    {monthsSaved > 0
                      ? `You'll also be debt-free ${monthsSaved} month${
                          monthsSaved > 1 ? "s" : ""
                        } sooner.`
                      : "Your tenure stays the same, but every extra payment you make now reduces the interest you'll pay over the life of the loan."}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <StatCard
                    accent
                    label="Total Prepayments Applied"
                    value={fmt(totalPrepaymentAmount)}
                  />
                  <StatCard
                    label="Effective EMI"
                    value={fmt(finalEmi)}
                    accent
                  />
                  <StatCard
                    accent
                    label="Interest Saved"
                    value={fmt(interestSaved)}
                    tone="positive"
                  />
                  <StatCard
                    accent
                    label="Months Saved"
                    value={String(monthsSaved)}
                    tone="positive"
                  />
                </div>

                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-5 py-4">
                  <div className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
                    Base vs. With Prepayment
                  </div>
                  <div className="grid gap-y-2 gap-x-4 text-xs text-white/60 sm:grid-cols-2">
                    <div className="flex justify-between">
                      <span>Base EMI</span>
                      <span className="text-white">{fmt(base.emi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Base total interest</span>
                      <span className="text-white">
                        {fmt(base.cumulativeInterest.at(-1) ?? 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adjusted EMI</span>
                      <span className="text-white">{fmt(finalEmi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adjusted total interest</span>
                      <span className="text-white">
                        {fmt(adjusted.cumulativeInterest.at(-1) ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {clippedPrepayments && (
                  <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-xs text-yellow-200">
                    One or more EMI reduction entries exceeded the bank limit
                    and were capped to {bankEmiLimit}% of the current EMI.
                  </div>
                )}

                {emiCapAdjustments.length > 0 && (
                  <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5">
                    <div className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
                      EMI Cap Adjustment Details
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs">
                        <thead>
                          <tr className="text-left text-white/40">
                            <th className="pb-2 pr-4">Month</th>
                            <th className="pb-2 pr-4">Requested</th>
                            <th className="pb-2 pr-4">Applied</th>
                            <th className="pb-2 pr-4">Cap</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {emiCapAdjustments.map((adj, idx) => (
                            <tr
                              key={`${adj.month}-${adj.prepaymentId}-${idx}`}
                              className={`border-t border-white/5 text-white/60 ${
                                idx % 2 === 0 ? "bg-white/[0.02]" : ""
                              }`}
                            >
                              <td className="py-2 pr-4">{adj.month}</td>
                              <td className="py-2 pr-4">
                                {fmt(adj.requestedAmount)}
                              </td>
                              <td className="py-2 pr-4">
                                {fmt(adj.appliedAmount)}
                              </td>
                              <td className="py-2 pr-4">
                                {adj.capAmount ? fmt(adj.capAmount) : "—"}
                              </td>
                              <td className="py-2">{adj.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <p className="text-sm text-white/50">
                  No prepayments applied yet. Even a small extra payment early
                  in your loan can meaningfully cut your total interest — try
                  it and see the difference instantly.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 max-w-md mx-auto text-left text-xs text-white/60 leading-relaxed">
                  <span className="text-white/80 font-medium">
                    Principal reduction
                  </span>{" "}
                  pays down what you owe directly — it lowers your total
                  interest the most and can shorten your loan.
                  <br />
                  <br />
                  <span className="text-white/80 font-medium">
                    EMI reduction
                  </span>{" "}
                  keeps your tenure the same but lowers your future monthly
                  payment, within your bank's allowed limit — useful if
                  monthly cash flow matters more to you than finishing early.
                </div>
                <button
                  type="button"
                  onClick={() => setPrepayOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold hover:bg-blue-500/30 hover:text-white transition"
                >
                  💰 Open Prepayment Options
                </button>
              </div>
            )}
          </div>
        )}

        {/* Chart tab — simplified to 3 chart types */}
        {resultTab === "chart" && (
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span>Chart type</span>
                <CustomSelect
                  value={chartType}
                  callBackTrigger={(e) => setChartType(e as ChartType)}
                  options={[
                    { value: "line", label: "Balance over time" },
                    { value: "bar", label: "Yearly breakdown" },
                    { value: "pie", label: "Principal vs interest" },
                  ]}
                />
              </div>
              {chartType === "line" && (
                <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                  {(
                    [
                      [
                        "compareEnabled",
                        compareEnabled,
                        setCompareEnabled,
                        "Compare with Prepay",
                      ] as const,
                      [
                        "showBasePrincipal",
                        showBasePrincipal,
                        setShowBasePrincipal,
                        "Base Principal",
                      ] as const,
                      [
                        "showBaseInterest",
                        showBaseInterest,
                        setShowBaseInterest,
                        "Base Interest",
                      ] as const,
                    ]
                  ).map(([key, checked, setter, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-1.5 text-xs text-white/60 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setter(e.target.checked)}
                        className="accent-blue-400"
                      />
                      {label}
                    </label>
                  ))}
                  {compareEnabled && (
                    <>
                      <label className="flex items-center gap-1.5 text-xs text-white/60 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showPrepayPrincipal}
                          onChange={(e) =>
                            setShowPrepayPrincipal(e.target.checked)
                          }
                          className="accent-blue-400"
                        />
                        Prepay Principal
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-white/60 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showPrepayInterest}
                          onChange={(e) =>
                            setShowPrepayInterest(e.target.checked)
                          }
                          className="accent-blue-400"
                        />
                        Prepay Interest
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>

            <div style={{ minHeight: 360 }}>
              <AmortizationChart
                labels={base.labels}
                principalSeries={base.principalRemaining}
                interestSeries={base.cumulativeInterest}
                principalSeriesB={
                  compareEnabled ? adjusted.principalRemaining : undefined
                }
                interestSeriesB={
                  compareEnabled ? adjusted.cumulativeInterest : undefined
                }
                prepaymentMarkers={adjusted.prepaymentMarkers}
                chartType={chartType}
                pieData={pieChartData}
                showBasePrincipal={showBasePrincipal}
                showBaseInterest={showBaseInterest}
                showPrepayPrincipal={showPrepayPrincipal}
                showPrepayInterest={showPrepayInterest}
              />
            </div>
          </div>
        )}

        {/* Schedule tab */}
        {resultTab === "schedule" && (
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-5">
              <div className="text-sm font-semibold text-white/80">
                {showFullSchedule
                  ? "Full Schedule — Base / With Prepay"
                  : "First 12 Months"}
              </div>
              <button
                type="button"
                onClick={() => setShowFullSchedule(!showFullSchedule)}
                className="text-xs text-blue-400 hover:text-blue-300 transition underline self-start sm:self-auto"
              >
                {showFullSchedule
                  ? "Show first 12 months"
                  : "View full schedule"}
              </button>
            </div>

            {/* Mobile card layout */}
            <div className="md:hidden space-y-3">
              {(showFullSchedule
                ? adjusted.monthRows
                : adjusted.monthRows.slice(0, 12)
              ).map((row) => (
                <div
                  key={row.month}
                  className={`rounded-xl border p-4 ${
                    row.isEvent
                      ? "border-blue-400/20 bg-blue-400/5"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-white">
                      Month {row.month}
                    </div>
                    {row.isEvent && (
                      <span className="text-xs bg-blue-400/20 text-blue-300 px-2 py-0.5 rounded-full">
                        Prepayment
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-white/60">
                    <div className="flex justify-between">
                      <span>Base Remaining</span>
                      <span className="text-white">
                        {fmt(base.principalRemaining[row.month - 1] ?? 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>With Prepay</span>
                      <span className="text-white">{fmt(row.balance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment</span>
                      <span className="text-white">{fmt(row.payment)}</span>
                    </div>
                    {row.prepaymentLabel && (
                      <div className="mt-2 pt-2 border-t border-white/10 text-yellow-300">
                        {row.prepaymentLabel}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table layout */}
            <div
              className={`hidden md:block ${
                showFullSchedule ? "max-h-[420px] overflow-y-auto" : ""
              }`}
            >
              <table className="min-w-full text-xs">
                <thead className="sticky top-0 z-10 bg-gray-900">
                  <tr className="text-left text-white/40 border-b border-white/10">
                    <th className="pb-2 pr-4 font-medium">Month</th>
                    <th className="pb-2 pr-4 font-medium">Base Remaining</th>
                    <th className="pb-2 pr-4 font-medium">
                      With Prepay Remaining
                    </th>
                    <th className="pb-2 pr-4 font-medium">Payment</th>
                    <th className="pb-2 font-medium">Prepayment</th>
                  </tr>
                </thead>
                <tbody>
                  {(showFullSchedule
                    ? adjusted.monthRows
                    : adjusted.monthRows.slice(0, 12)
                  ).map((row) => (
                    <tr
                      key={row.month}
                      className={`border-t border-white/5 text-white/60 ${
                        row.isEvent ? "bg-blue-400/5" : ""
                      }`}
                    >
                      <td className="py-2 pr-4">{row.month}</td>
                      <td className="py-2 pr-4">
                        {base.principalRemaining[row.month - 1] !== undefined
                          ? fmt(base.principalRemaining[row.month - 1])
                          : "—"}
                      </td>
                      <td className="py-2 pr-4">{fmt(row.balance)}</td>
                      <td className="py-2 pr-4">{fmt(row.payment)}</td>
                      <td className="py-2 text-yellow-300/80">
                        {row.prepaymentLabel || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer disclaimer ── */}
      <p className="text-center text-sm text-emerald-300 px-2">
        <b>Note: </b>Estimates only, based on standard reducing-balance amortization.
        Actual EMI, fees, and total interest may vary by lender — confirm the
        exact figures with your bank.
      </p>
    </div>
  );
}