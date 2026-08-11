"use client";

import { useMemo, useState, useRef, type ReactNode, type ComponentType } from "react";
import CustomSelect from "@/components/ui/customSelect";
import {
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  Calculator,
  BarChart3,
} from "lucide-react";
const FinanceChart = dynamic(
  () => import("@/components/tools/financeSuite/financeChart").then((m) => m.FinanceChart),
  { ssr: false}
);
const FinancePdfExport = dynamic(
  () => import("@/components/tools/financeSuite/financePdfExport").then((m) => m.FinancePdfExport),
  {
    ssr: false,
    loading: () => null,
  }
);
import dynamic from "next/dynamic";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

type CalculatorTab = "simple" | "compound" | "deposits";
type DepositMode = "fd" | "rd";
type RdConvention = "end" | "beginning";
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

/* ─────────────────────────────────────────────
   Small presentational building blocks (EXACT match to EMI)
───────────────────────────────────────────── */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
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

function StatCard({
  label,
  value,
  icon,
  accent,
  tone,
}: {
  label: string;
  value: string;
  icon?: string;
  accent?: boolean;
  tone?: "positive" | "neutral";
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
      <div className="text-xs text-white/60 mb-1 flex items-center gap-1.5">
        {icon && <span className="text-base">{icon}</span>}
        {label}
      </div>
      <div
        className={`text-lg font-semibold ${
          tone === "positive" ? "text-emerald-300" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-blue-400/15 border border-blue-400/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-300" />
      </div>
      <div>
        <div className="text-sm font-semibold text-white/90">{title}</div>
        <div className="text-xs text-white/50 mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Calculation helpers (with bug fixes)
───────────────────────────────────────────── */

function computeSimpleInterest(principal: number, ratePct: number, years: number) {
  const p = Math.max(0, principal);
  const r = Math.max(0, ratePct);
  const y = Math.max(0, years);
  const interest = p * (r / 100) * y;
  return { interest, value: p + interest };
}

function computeCompoundInterest({
  principal,
  annualRatePct,
  years,
  frequency,
}: {
  principal: number;
  annualRatePct: number;
  years: number;
  frequency: number;
}) {
  const p = Math.max(0, principal);
  const r = Math.max(0, annualRatePct) / 100;
  const n = Math.max(1, frequency);
  const t = Math.max(0, years);
  const amount = p * Math.pow(1 + r / n, n * t);
  const interest = amount - p;
  return { value: amount, interest };
}

function computeFD({
  amount,
  annualRatePct,
  years,
  frequency,
}: {
  amount: number;
  annualRatePct: number;
  years: number;
  frequency: number;
}) {
  return computeCompoundInterest({
    principal: amount,
    annualRatePct,
    years,
    frequency,
  });
}

function computeRD({
  monthlyDeposit,
  annualRatePct,
  months,
  convention,
}: {
  monthlyDeposit: number;
  annualRatePct: number;
  months: number;
  convention: RdConvention;
}) {
  const n = Math.max(0, Math.floor(months));
  const p = Math.max(0, monthlyDeposit);
  const r = Math.max(0, annualRatePct) / 12 / 100;

  if (n === 0 || p === 0) {
    return {
      value: 0,
      interest: 0,
      totalInvested: p * n,
    };
  }

  if (r === 0) {
    const totalInvested = p * n;
    return {
      value: totalInvested,
      interest: 0,
      totalInvested,
    };
  }

  let fv = p * ((Math.pow(1 + r, n) - 1) / r);

  if (convention === "beginning") {
    fv *= 1 + r;
  }

  const totalInvested = p * n;
  const interest = fv - totalInvested;

  return { value: fv, interest, totalInvested };
}

/* ─────────────────────────────────────────────
   Quick start strip (EXACT match to EMI)
───────────────────────────────────────────── */

function QuickStartStrip() {
  const steps = [
    { icon: "🧮", title: "Pick a calculator", body: "Simple, compound, FD, or RD — choose your investment type." },
    { icon: "💰", title: "Enter your numbers", body: "Amount, rate, and duration — drag sliders or type exact values." },
    { icon: "📊", title: "See projections", body: "View charts and export reports to plan your finances." },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3 mb-8">
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

/* ─────────────────────────────────────────────
   Methodology note (EXACT match to EMI)
───────────────────────────────────────────── */

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
            <strong>Simple interest:</strong> Calculated as Principal × Rate × Time. Interest is only earned on the original principal amount.
          </p>
          <p>
            <strong>Compound interest:</strong> Uses the formula A = P(1 + r/n)^(nt). Interest compounds and is added to principal each period.
          </p>
          <p>
            <strong>Fixed Deposit (FD):</strong> Same as compound interest. Quarterly compounding is common but actual products may vary.
          </p>
          <p>
            <strong>Recurring deposit / monthly savings:</strong> Uses an annuity-style monthly compounding model. Actual financial products may use different calculation conventions.
          </p>
          <p className="text-white/40">
            These are standard mathematical estimates. Actual financial products may
            include fees, taxes, timing rules, or different compounding methods.
            Confirm exact figures with your financial institution.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function SavingsAndDepositsCalculator() {
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

  const [activeTab, setActiveTab] = useState<CalculatorTab>("simple");
  const [depositMode, setDepositMode] = useState<DepositMode>("fd");

  /* Simple interest state */
  const [principal, setPrincipal] = useState<number>(100000);
  const [simpleRate, setSimpleRate] = useState<number>(7);
  const [simpleYears, setSimpleYears] = useState<number>(5);

  const simpleCalc = useMemo(
    () => computeSimpleInterest(principal, simpleRate, simpleYears),
    [principal, simpleRate, simpleYears]
  );

  /* Compound interest state */
  const [compoundPrincipal, setCompoundPrincipal] = useState<number>(100000);
  const [compoundRate, setCompoundRate] = useState<number>(8);
  const [compoundYears, setCompoundYears] = useState<number>(5);
  const [compoundFrequency, setCompoundFrequency] = useState<string>("4");

  const compoundCalc = useMemo(
    () =>
      computeCompoundInterest({
        principal: compoundPrincipal,
        annualRatePct: compoundRate,
        years: compoundYears,
        frequency: Number(compoundFrequency),
      }),
    [compoundPrincipal, compoundRate, compoundYears, compoundFrequency]
  );

  /* FD state */
  const [fdAmount, setFdAmount] = useState<number>(100000);
  const [fdRate, setFdRate] = useState<number>(7.5);
  const [fdYears, setFdYears] = useState<number>(5);
  const [fdFrequency, setFdFrequency] = useState<string>("4");

  const fdCalc = useMemo(
    () =>
      computeFD({
        amount: fdAmount,
        annualRatePct: fdRate,
        years: fdYears,
        frequency: Number(fdFrequency),
      }),
    [fdAmount, fdRate, fdYears, fdFrequency]
  );

  /* RD state */
  const [rdAmount, setRdAmount] = useState<number>(5000);
  const [rdRate, setRdRate] = useState<number>(7);
  const [rdMonths, setRdMonths] = useState<number>(60);
  const [rdConvention, setRdConvention] = useState<RdConvention>("end");

  const rdCalc = useMemo(
    () =>
      computeRD({
        monthlyDeposit: rdAmount,
        annualRatePct: rdRate,
        months: Math.min(600, Math.max(1, rdMonths)),
        convention: rdConvention,
      }),
    [rdAmount, rdRate, rdMonths, rdConvention]
  );

  /* Chart refs */
  const simpleChartRef = useRef<HTMLDivElement | null>(null);
  const compoundChartRef = useRef<HTMLDivElement | null>(null);
  const fdChartRef = useRef<HTMLDivElement | null>(null);
  const rdChartRef = useRef<HTMLDivElement | null>(null);

  /* Series for charts */
  const simpleSeries = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const years = Math.max(0, simpleYears);

    for (let y = 0; y <= Math.floor(years); y++) {
      const { value } = computeSimpleInterest(principal, simpleRate, y);
      labels.push(`Year ${y}`);
      data.push(value);
    }

    // Add exact final duration if it isn't already a whole year
    if (!Number.isInteger(years)) {
      const { value } = computeSimpleInterest(
        principal,
        simpleRate,
        years
      );

      labels.push(`Year ${years}`);
      data.push(value);
    }
    return { labels, data };
  }, [principal, simpleRate, simpleYears]);

  const compoundSeries = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const years = Math.max(0, compoundYears);

    for (let y = 0; y <= Math.floor(years); y++) {
      const { value } = computeCompoundInterest({
        principal: compoundPrincipal,
        annualRatePct: compoundRate,
        years: y,
        frequency: Number(compoundFrequency),
      });

      labels.push(`Year ${y}`);
      data.push(value);
    }

    if (!Number.isInteger(years)) {
      const { value } = computeCompoundInterest({
        principal: compoundPrincipal,
        annualRatePct: compoundRate,
        years,
        frequency: Number(compoundFrequency),
      });

      labels.push(`Year ${years}`);
      data.push(value);
    }
    return { labels, data };
  }, [compoundPrincipal, compoundRate, compoundYears, compoundFrequency]);

  const fdSeries = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const years = Math.max(0, fdYears);

    for (let y = 0; y <= Math.floor(years); y++) {
      const { value } = computeFD({
        amount: fdAmount,
        annualRatePct: fdRate,
        years: y,
        frequency: Number(fdFrequency),
      });

      labels.push(`Year ${y}`);
      data.push(value);
    }

    if (!Number.isInteger(years)) {
      const { value } = computeFD({
        amount: fdAmount,
        annualRatePct: fdRate,
        years,
        frequency: Number(fdFrequency),
      });

      labels.push(`Year ${years}`);
      data.push(value);
    }
    return { labels, data };
  }, [fdAmount, fdRate, fdYears, fdFrequency]);

  const rdSeries = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const months = Math.min(600, Math.max(1, Math.floor(rdMonths)));
    for (let m = 0; m <= months; m++) {
      const { value } = computeRD({
        monthlyDeposit: rdAmount,
        annualRatePct: rdRate,
        months: m,
        convention: rdConvention,
      });
      labels.push(`Month ${m}`);
      data.push(value);
    }
    return { labels, data };
  }, [rdAmount, rdRate, rdMonths, rdConvention]);

  /* Export data */
  const exportData = useMemo(() => {
    const base = {
      title: "Savings & Deposits Report",
      subtitle: "Projection summary",
      summaryCards: [] as { label: string; value: string }[],
      inputRows: [] as { label: string; value: string }[],
      resultRows: [] as { label: string; value: string }[],
      notes: [] as string[],
    };

    if (activeTab === "simple") {
      return {
        ...base,
        title: "Simple Interest Report",
        subtitle: `Principal ${fmt(principal)} • ${simpleRate}% • ${simpleYears} years`,
        summaryCards: [
          { label: "Principal", value: fmt(principal) },
          { label: "Interest", value: fmt(simpleCalc.interest) },
          { label: "Maturity", value: fmt(simpleCalc.value) },
        ],
        inputRows: [
          { label: "Principal", value: fmt(principal) },
          { label: "Rate", value: `${simpleRate}%` },
          { label: "Duration", value: `${simpleYears} years` },
        ],
        resultRows: [
          { label: "Total Interest", value: fmt(simpleCalc.interest) },
          { label: "Maturity Value", value: fmt(simpleCalc.value) },
        ],
        notes: ["Simple interest calculated on original principal only."],
      };
    }

    if (activeTab === "compound") {
      return {
        ...base,
        title: "Compound Interest Report",
        subtitle: `${compoundFrequency}x yearly compounding`,
        summaryCards: [
          { label: "Principal", value: fmt(compoundPrincipal) },
          { label: "Compound Interest", value: fmt(compoundCalc.interest) },
          { label: "Maturity", value: fmt(compoundCalc.value) },
        ],
        inputRows: [
          { label: "Principal", value: fmt(compoundPrincipal) },
          { label: "Rate", value: `${compoundRate}%` },
          { label: "Duration", value: `${compoundYears} years` },
          { label: "Frequency", value: `${compoundFrequency}x/year` },
        ],
        resultRows: [
          { label: "Maturity Value", value: fmt(compoundCalc.value) },
          { label: "Compound Gain", value: fmt(compoundCalc.interest) },
        ],
        notes: ["Interest compounds and is added to principal each period."],
      };
    }

    if (activeTab === "deposits" && depositMode === "fd") {
      return {
        ...base,
        title: "Fixed Deposit (Estimate)",
        subtitle: "Quarterly is a common compounding assumption for this estimate.",
        summaryCards: [
          { label: "Deposit", value: fmt(fdAmount) },
          { label: "Interest", value: fmt(fdCalc.interest) },
          { label: "Maturity", value: fmt(fdCalc.value) },
        ],
        inputRows: [
          { label: "Deposit Amount", value: fmt(fdAmount) },
          { label: "Rate", value: `${fdRate}%` },
          { label: "Duration", value: `${fdYears} years` },
          { label: "Frequency", value: `${fdFrequency}x/year` },
        ],
        resultRows: [
          { label: "Maturity Value", value: fmt(fdCalc.value) },
          { label: "Interest Earned", value: fmt(fdCalc.interest) },
        ],
        notes: [
          "Uses standard compound-interest formula. Actual products may use different rules.",
        ],
      };
    }

    // RD
    return {
      ...base,
      title: "Recurring Deposit / Monthly Savings (Estimate)",
      subtitle: "Uses a standard monthly-compounding annuity model for estimation.",
      summaryCards: [
        { label: "Total Invested", value: fmt(rdCalc.totalInvested) },
        { label: "Interest", value: fmt(rdCalc.interest) },
        { label: "Maturity", value: fmt(rdCalc.value) },
      ],
      inputRows: [
        { label: "Monthly Deposit", value: fmt(rdAmount) },
        { label: "Rate", value: `${rdRate}%` },
        { label: "Term", value: `${Math.min(600, Math.max(1, rdMonths))} months` },
        { label: "Timing", value: rdConvention },
      ],
      resultRows: [
        { label: "Maturity Value", value: fmt(rdCalc.value) },
        { label: "Interest Earned", value: fmt(rdCalc.interest) },
      ],
      notes: [
        "Actual bank RD calculations may use different compounding conventions.",
      ],
    };
  }, [
    activeTab,
    depositMode,
    principal,
    simpleRate,
    simpleYears,
    simpleCalc,
    compoundPrincipal,
    compoundRate,
    compoundYears,
    compoundFrequency,
    compoundCalc,
    fdAmount,
    fdRate,
    fdYears,
    fdFrequency,
    fdCalc,
    rdAmount,
    rdRate,
    rdMonths,
    rdConvention,
    rdCalc,
    fmt,
  ]);

  const tabs: { id: CalculatorTab; label: string; icon: string }[] = [
    { id: "simple", label: "Simple Interest", icon: "🧮" },
    { id: "compound", label: "Compound Interest", icon: "📈" },
    { id: "deposits", label: "FD / RD", icon: "🏦" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6">
      {/* ── Hero ── */}
      <section className="mb-5 px-5 py-6 sm:px-6 lg:px-8 rounded-3xl border border-white/10 bg-slate-950/60">
        {/* ── COMPLETELY REIMAGINED HERO ── */}
<div className="relative mb-8">
  {/* Split layout: Content left, Visual right */}
  <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
    
    {/* Left: Content */}
    <div className="space-y-6">
      {/* Badge with animation hint */}
      <div className="inline-flex items-center gap-2">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400/30 blur-md rounded-full animate-pulse" />
          <div className="relative inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/15 px-3 py-1.5 text-xs font-medium text-blue-200 backdrop-blur-sm">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Private finance workspace</span>
          </div>
        </div>
      </div>

      {/* Headline with interesting typography */}
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
          See how your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400">
            savings grow
          </span>{" "}
          over time
        </h2>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
          See exactly how your savings grow over time — whether it's simple interest, 
          compound growth, or bank deposits. No accounts, no tracking, just calculations.
        </p>
      </div>

      {/* Interactive value props */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-blue-400/10">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30 flex items-center justify-center text-lg group-hover:scale-110 transition">
              🔒
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">100% Private</div>
              <div className="text-xs text-white/50 mt-0.5">Calculations run locally in your browser</div>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-emerald-400/30 hover:bg-emerald-400/10">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-400/30 flex items-center justify-center text-lg group-hover:scale-110 transition">
              📄
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">Export Reports</div>
              <div className="text-xs text-white/50 mt-0.5">Download PDF summaries instantly</div>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-violet-400/30 hover:bg-violet-400/10">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 border border-violet-400/30 flex items-center justify-center text-lg group-hover:scale-110 transition">
              🌍
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">Global Currencies</div>
              <div className="text-xs text-white/50 mt-0.5">
                Display results in 9 major currencies
              </div>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-400/30 hover:bg-amber-400/10">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-400/30 flex items-center justify-center text-lg group-hover:scale-110 transition">
              ⚡
            </div>
            <div>
              <div className="text-sm font-semibold text-white/90">Instant Results</div>
              <div className="text-xs text-white/50 mt-0.5">Real-time calculations as you type</div>
            </div>
          </div>
        </div>
      </div>

      {/* Currency + CTA */}
      {/* <div className="flex flex-wrap items-center gap-3 pt-2">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
          <span className="text-xs text-white/50">Currency</span>
          <CustomSelect
            value={currency}
            callBackTrigger={(e) => setCurrency(e as CurrencyCode)}
            options={Object.entries(CURRENCIES).map(([code, meta]) => ({
              value: code,
              label: meta.label,
            }))}
          />
        </div>
      </div> */}
    </div>

    {/* Right: Interactive visual / Live preview */}
    <div className="relative min-w-0">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-2xl" />
      
      {/* Main card */}
      <div className="relative rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-white/50 uppercase tracking-wide">Live preview</div>
            <div className="text-sm font-semibold text-white/90">Your projections at a glance</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Live stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧮</span>
              <span className="text-xs text-white/60">Simple</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {fmt(simpleCalc.value)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">
              +{fmt(simpleCalc.interest)} interest
            </div>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-violet-400/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📈</span>
              <span className="text-xs text-white/60">Compound</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {fmt(compoundCalc.value)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">
              +{fmt(compoundCalc.interest)} interest
            </div>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏦</span>
              <span className="text-xs text-white/60">FD</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {fmt(fdCalc.value)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">
              +{fmt(fdCalc.interest)} earned
            </div>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-emerald-400/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🗓️</span>
              <span className="text-xs text-white/60">RD</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              {fmt(rdCalc.value)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">
              +{fmt(rdCalc.interest)} earned
            </div>
          </div>
        </div>

        {/* Active calculator indicator */}
        <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white">
                {activeTab === "simple" ? "🧮" : activeTab === "compound" ? "📈" : "🏦"}
              </div>
              <div>
                <div className="text-xs text-white/50">Currently viewing</div>
                <div className="text-sm font-semibold text-white">
                  {activeTab === "simple" ? "Simple Interest" : activeTab === "compound" ? "Compound Interest" : depositMode === "fd" ? "Fixed Deposit" : "Recurring Deposit"}
                </div>
              </div>
            </div>
            <div className="text-xs text-white/40">
              {tabs.find(t => t.id === activeTab)?.label}
            </div>
          </div>
        </div>
        <div className="sm:flex items-center gap-2 text-xs text-white/40">
        {/* ── Currency selector ── */}
          <div className="text-center space-y-2">
            <div className="sm:flex items-center gap-2 text-xs text-white/40">
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
            <p className="text-[11px] text-white/35">
              Currency affects display only — no exchange-rate conversion is applied.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </section>

      

      {/* ── Quick start ── */}
      <QuickStartStrip />

      {/* ── Methodology note ── */}
      <MethodologyNote />

      {/* ── Tabs ── */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 justify-center gap-2 flex-wrap">
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

      {/* ── Content ── */}
      <div className="w-full min-w-0 max-w-full space-y-6 overflow-hidden">
        {activeTab === "simple" && (
          <div className="space-y-4">
            <div className="grid w-full min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <section className="min-w-0 w-full max-w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <SectionHeader
                      title="Simple interest calculator"
                      subtitle="Enter principal, rate, and time to see total interest and maturity value."
                      icon={PiggyBank}
                    />
                    <FinancePdfExport
                      filename="simple-interest-report"
                      title={exportData.title}
                      subtitle={exportData.subtitle}
                      summaryCards={exportData.summaryCards}
                      inputRows={exportData.inputRows.map(r => [r.label, r.value])}
                      resultRows={exportData.resultRows.map(r => [r.label, r.value])}
                      notes={exportData.notes}
                      chartRef={simpleChartRef}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Field label={`Principal (${currencyMeta.symbol})`}>
                      <input
                        type="number"
                        min={0}
                        step="1"
                        inputMode="decimal"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className={inputCls}
                      />
                    </Field>
                    <div className="text-[11px] text-white/35 mt-1">
                      The starting amount you invest or deposit.
                    </div>
                  </div>

                  <div>
                    <Field label="Interest rate (%)">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        inputMode="decimal"
                        value={simpleRate}
                        onChange={(e) => setSimpleRate(Number(e.target.value))}
                        className={inputCls}
                      />
                    </Field>
                    <div className="text-[11px] text-white/35 mt-1">
                      Annual simple interest rate.
                    </div>
                  </div>

                  <div>
                    <Field label="Duration (years)">
                      <input
                        type="number"
                        min={0}
                        step="1"
                        inputMode="decimal"
                        value={simpleYears}
                        onChange={(e) => setSimpleYears(Number(e.target.value))}
                        className={inputCls}
                      />
                    </Field>
                    <div className="text-[11px] text-white/35 mt-1">
                      How long the money stays invested.
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 mt-5">
                  <StatCard label="Total interest" value={fmt(simpleCalc.interest)} icon="💹" />
                  <StatCard label="Principal" value={fmt(principal)} icon="💵" />
                  <StatCard label="Maturity value" value={fmt(simpleCalc.value)} icon="🏆" />
                </div>
              </section>

              <section ref={simpleChartRef} className="min-w-0 w-full max-w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <SectionHeader
                    title="Projection"
                    subtitle="Shows the projected value over the selected duration."
                    icon={BarChart3}
                  />
                </div>

                <div className="w-full min-w-0 min-h-[260px] overflow-hidden">
                  <FinanceChart
                    labels={simpleSeries.labels}
                    datasets={[
                      {
                        label: "Projected value",
                        data: simpleSeries.data,
                        color: "rgba(59,130,246,0.9)",
                      },
                    ]}
                  />
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === "compound" && (
          <div className="space-y-4">
            <div className="grid w-full min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <SectionHeader
                      title="Compound interest calculator"
                      subtitle="Default compounding is quarterly, but you can change it."
                      icon={TrendingUp}
                    />
                    <FinancePdfExport
                      filename="compound-interest-report"
                      title={exportData.title}
                      subtitle={exportData.subtitle}
                      summaryCards={exportData.summaryCards}
                      inputRows={exportData.inputRows.map(r => [r.label, r.value])}
                      resultRows={exportData.resultRows.map(r => [r.label, r.value])}
                      notes={exportData.notes}
                      chartRef={compoundChartRef}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Field label={`Principal (${currencyMeta.symbol})`}>
                      <input
                        type="number"
                        min={0}
                        step="1"
                        inputMode="decimal"
                        value={compoundPrincipal}
                        onChange={(e) => setCompoundPrincipal(Number(e.target.value))}
                        className={inputCls}
                      />
                    </Field>
                    <div className="text-[11px] text-white/35 mt-1">
                      The amount on which compound interest will be calculated.
                    </div>
                  </div>

                  <div>
                    <Field label="Interest rate (%)">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        inputMode="decimal"
                        value={compoundRate}
                        onChange={(e) => setCompoundRate(Number(e.target.value))}
                        className={inputCls}
                      />
                    </Field>
                    <div className="text-[11px] text-white/35 mt-1">
                      Annual nominal interest rate.
                    </div>
                  </div>

                  <div>
                    <Field label="Duration (years)">
                      <input
                        type="number"
                        min={0}
                        step="1"
                        inputMode="decimal"
                        value={compoundYears}
                        onChange={(e) => setCompoundYears(Number(e.target.value))}
                        className={inputCls}
                      />
                    </Field>
                    <div className="text-[11px] text-white/35 mt-1">
                      How long the investment stays active.
                    </div>
                  </div>

                  <div>
                    <Field label="Compounding frequency">
                      <CustomSelect
                        value={compoundFrequency}
                        callBackTrigger={(e) => setCompoundFrequency(e)}
                        options={[
                          { value: "1", label: "Annually (once a year)" },
                          { value: "2", label: "Semi-annually (every 6 months)" },
                          { value: "4", label: "Quarterly (every 3 months)" },
                          { value: "12", label: "Monthly (every month)" },
                        ]}
                      />
                    </Field>
                    <div className="text-[11px] text-white/35 mt-1">
                      How often interest is added to the principal.
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 mt-5">
                  <StatCard label="Principal" value={fmt(compoundPrincipal)} icon="💵" />
                  <StatCard label="Maturity value" value={fmt(compoundCalc.value)} icon="🏆" />
                  <StatCard
                    label="Compound interest"
                    value={fmt(compoundCalc.interest)}
                    icon="✨"
                  />
                </div>
              </section>

              <section ref={compoundChartRef} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <SectionHeader
                    title="Projection"
                    subtitle="Shows how the investment grows over the selected duration."
                    icon={BarChart3}
                  />
                </div>

                <div className="w-full min-w-0 min-h-[260px] overflow-hidden">
                  <FinanceChart
                    labels={compoundSeries.labels}
                    datasets={[
                      {
                        label: "Projected value",
                        data: compoundSeries.data,
                        color: "rgba(34,197,94,0.85)",
                      },
                    ]}
                  />
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === "deposits" && (
          <div className="space-y-4">
            {/* FD / RD sub-tabs */}
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { id: "fd", label: "Fixed Deposit" },
                { id: "rd", label: "Recurring Deposit" },
              ].map((mode) => {
                const active = depositMode === (mode.id as DepositMode);
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setDepositMode(mode.id as DepositMode)}
                    className={[
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
                      active
                        ? "border-blue-400/30 bg-blue-400/15 text-blue-100"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-blue-400/20 hover:bg-white/[0.06]",
                    ].join(" ")}
                  >
                    {mode.id === "fd" ? "🏦" : "🗓️"} {mode.label}
                  </button>
                );
              })}
            </div>

            {depositMode === "fd" ? (
              <div className="grid w-full min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6">
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <SectionHeader
                        title="Fixed deposit planner"
                        subtitle="Choose the compounding frequency used for this estimate."
                        icon={ShieldCheck}
                      />
                      <FinancePdfExport
                        filename="fixed-deposit-report"
                        title={exportData.title}
                        subtitle={exportData.subtitle}
                        summaryCards={exportData.summaryCards}
                        inputRows={exportData.inputRows.map(r => [r.label, r.value])}
                        resultRows={exportData.resultRows.map(r => [r.label, r.value])}
                        notes={exportData.notes}
                        chartRef={fdChartRef}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Field label={`Deposit amount (${currencyMeta.symbol})`}>
                        <input
                          type="number"
                          min={0}
                          step="1"
                          inputMode="decimal"
                          value={fdAmount}
                          onChange={(e) => setFdAmount(Number(e.target.value))}
                          className={inputCls}
                        />
                      </Field>
                      <div className="text-[11px] text-white/35 mt-1">
                        The one-time amount you deposit today.
                      </div>
                    </div>

                    <div>
                      <Field label="Interest rate (%)">
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          inputMode="decimal"
                          value={fdRate}
                          onChange={(e) => setFdRate(Number(e.target.value))}
                          className={inputCls}
                        />
                      </Field>
                      <div className="text-[11px] text-white/35 mt-1">
                        Annual FD rate.
                      </div>
                    </div>

                    <div>
                      <Field label="Duration (years)">
                        <input
                          type="number"
                          min={0}
                          step="1"
                          inputMode="decimal"
                          value={fdYears}
                          onChange={(e) => setFdYears(Number(e.target.value))}
                          className={inputCls}
                        />
                      </Field>
                      <div className="text-[11px] text-white/35 mt-1">
                        How long the deposit stays invested.
                      </div>
                    </div>

                    <div>
                      <Field label="Compounding frequency">
                        <CustomSelect
                          value={fdFrequency}
                          callBackTrigger={(e) => setFdFrequency(e)}
                          options={[
                            { value: "1", label: "Annually (once a year)" },
                            { value: "2", label: "Semi-annually (every 6 months)" },
                            { value: "4", label: "Quarterly (every 3 months)" },
                            { value: "12", label: "Monthly (every month)" },
                          ]}
                        />
                      </Field>
                      <div className="text-[11px] text-white/35 mt-1">
                      Choose the frequency that best matches the deposit product you are estimating. Actual products may use different rules.
                    </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 mt-5">
                    <StatCard label="Deposit" value={fmt(fdAmount)} icon="💰" />
                    <StatCard label="Maturity value" value={fmt(fdCalc.value)} icon="💎" />
                    <StatCard label="Interest earned" value={fmt(fdCalc.interest)} icon="💹" />
                  </div>
                </section>

                <section ref={fdChartRef} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6">
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <SectionHeader
                      title="FD projection"
                      subtitle="Shows the projected value over the selected duration."
                      icon={BarChart3}
                    />
                  </div>

                  <div className="w-full min-w-0 min-h-[260px] overflow-hidden">
                    <FinanceChart
                      labels={fdSeries.labels}
                      datasets={[
                        {
                          label: "Maturity value",
                          data: fdSeries.data,
                          color: "rgba(14,165,233,0.85)",
                        },
                      ]}
                    />
                  </div>
                </section>
              </div>
            ) : (
              <div className="grid w-full min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6">
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <SectionHeader
                        title="Recurring deposit planner"
                        subtitle="Choose the deposit timing assumption before reviewing the result."
                        icon={Calculator}
                      />
                      <FinancePdfExport
                        filename="recurring-deposit-report"
                        title={exportData.title}
                        subtitle={exportData.subtitle}
                        summaryCards={exportData.summaryCards}
                        inputRows={exportData.inputRows.map(r => [r.label, r.value])}
                        resultRows={exportData.resultRows.map(r => [r.label, r.value])}
                        notes={exportData.notes}
                        chartRef={rdChartRef}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Field label={`Monthly deposit (${currencyMeta.symbol})`}>
                        <input
                          type="number"
                          min={0}
                          step="1"
                          inputMode="decimal"
                          value={rdAmount}
                          onChange={(e) => setRdAmount(Number(e.target.value))}
                          className={inputCls}
                        />
                      </Field>
                      <div className="text-[11px] text-white/35 mt-1">
                        The amount you deposit every month.
                      </div>
                    </div>

                    <div>
                      <Field label="Interest rate (%)">
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          inputMode="decimal"
                          value={rdRate}
                          onChange={(e) => setRdRate(Number(e.target.value))}
                          className={inputCls}
                        />
                      </Field>
                      <div className="text-[11px] text-white/35 mt-1">
                        Annual RD rate.
                      </div>
                    </div>

                    <div>
                      <Field label="Term (months)">
                        <input
                          type="number"
                          min={1}
                          max={600}
                          step={1}
                          inputMode="numeric"
                          value={rdMonths}
                          onChange={(e) => setRdMonths(Math.min(600, Math.max(1, Number(e.target.value))))}
                          className={inputCls}
                        />
                      </Field>
                      <div className="text-[11px] text-white/35 mt-1">
                        How many months you keep depositing.
                      </div>
                    </div>

                    <div>
                      <Field label="Deposit timing">
                        <CustomSelect
                          value={rdConvention}
                          callBackTrigger={(e) => setRdConvention(e as RdConvention)}
                          options={[
                            { value: "end", label: "End of month" },
                            { value: "beginning", label: "Beginning of month" },
                          ]}
                        />
                      </Field>
                      <div className="text-[11px] text-white/35 mt-1">
                        Use the default if you just want a quick estimate.
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 mt-5">
                    <StatCard label="Total invested" value={fmt(rdCalc.totalInvested)} icon="🏦" />
                    <StatCard label="Maturity value" value={fmt(rdCalc.value)} icon="💎" />
                    <StatCard label="Interest earned" value={fmt(rdCalc.interest)} icon="💹" />
                  </div>
                </section>

                <section ref={rdChartRef} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 sm:p-6">
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <SectionHeader
                      title="RD projection"
                      subtitle="Shows the maturity value month by month."
                      icon={BarChart3}
                    />
                  </div>

                  <div className="w-full min-w-0 min-h-[260px] overflow-hidden">
                    <FinanceChart
                      labels={rdSeries.labels}
                      datasets={[
                        {
                          label: "Maturity value",
                          data: rdSeries.data,
                          color: "rgba(16,185,129,0.85)",
                        },
                      ]}
                    />
                  </div>
                </section>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Footer disclaimer ── */}
      <p className="text-center text-sm text-emerald-300 px-2">
        <b>Note: </b>Estimates only, based on standard interest formulas. Actual
        financial products may differ due to product terms, taxes, fees, or
        calculation methods. Confirm exact figures with your financial institution.
      </p>
    </div>
  );
}