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
  Info,
  ArrowDownCircle,
  ArrowUpCircle,
  Trash2,
} from "lucide-react";

import { Field } from "@/components/ui/field";
import { formatCurrency } from "@/utility/formatCurrencyUtility";
import { SectionHeader } from "@/sharedUI/sectionHeader";
import { ExplainerPanel, TabKey } from "@/sharedUI/explainerPanel";
import CustomSelect from "@/components/ui/customSelect";

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

type CashFlow = {
  id: string;
  amount: number | "";
  date: string;
};

type XirrStatus = "idle" | "invalid" | "no-solution" | "ok";

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

function uid() {
  return `cf_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function safeNumber(value: string): number | "" {
  if (value.trim() === "") return "";
  const n = Number(value);
  return Number.isFinite(n) ? n : "";
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(2)}%`;
}

function calculateSIPValue(
  monthly: number,
  annualRate: number,
  years: number,
  stepUpPercent: number
) {
  const months = Math.max(0, Math.floor(years * 12));
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
  const months = Math.max(0, Math.floor(years * 12));
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
  for (let year = 1; year <= years; year += 1) {
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
  const sorted = [...cashflows].sort((a, b) => utcDay(a.date) - utcDay(b.date));
  let rate = guess;

  for (let i = 0; i < 100; i += 1) {
    const f = xnpv(rate, sorted);
    if (!Number.isFinite(f)) return NaN;

    const h = 1e-7;
    const fp = xnpv(rate + h, sorted);
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
  const sorted = [...cashflows].sort((a, b) => utcDay(a.date) - utcDay(b.date));
  let low = -0.9999999999;
  let high = 10;

  let fLow = xnpv(low, sorted);
  let fHigh = xnpv(high, sorted);

  if (!Number.isFinite(fLow) || !Number.isFinite(fHigh)) return NaN;

  for (let i = 0; i < 50 && fLow * fHigh > 0; i += 1) {
    high *= 2;
    fHigh = xnpv(high, sorted);
    if (!Number.isFinite(fHigh)) return NaN;
  }

  if (fLow * fHigh > 0) return NaN;

  for (let i = 0; i < 120; i += 1) {
    const mid = (low + high) / 2;
    const fMid = xnpv(mid, sorted);

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

function xirr(cashflows: CashFlow[], guess = 0.1) {
  const valid = cashflows.filter(
    (f) => typeof f.amount === "number" && Number.isFinite(f.amount) && !!f.date
  );
  if (valid.length < 2) return NaN;

  const hasPos = valid.some((f) => (f.amount as number) > 0);
  const hasNeg = valid.some((f) => (f.amount as number) < 0);
  if (!hasPos || !hasNeg) return NaN;

  const sorted = [...valid].sort((a, b) => utcDay(a.date) - utcDay(b.date));

  const newton = xirrNewton(sorted, guess);
  if (Number.isFinite(newton)) return newton;

  return xirrBisection(sorted);
}

const shellClass =
  "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/20 px-8  p-3  text-white outline-none transition focus:border-blue-400/40";

const cardClass = "rounded-2xl border border-white/10 bg-black/20 p-2 sm:p-2";

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/45">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="mx-2 text-xs font-semibold text-white sm:text-sm">{value}</div>
    </div>
  );
}

function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
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
  onChange,
  onRemove,
  canRemove,
}: {
  flow: CashFlow;
  index: number;
  onChange: (index: number, field: keyof Omit<CashFlow, "id">, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}) {
  const invalid = !isFlowValid(flow);
  const isNegative =
    typeof flow.amount === "number" && Number.isFinite(flow.amount) && flow.amount < 0;
  const isPositive =
    typeof flow.amount === "number" && Number.isFinite(flow.amount) && flow.amount > 0;

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
        <Field label="Amount (₹)">
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
                <span className="text-xs font-medium">₹</span>
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

export default function InvestmentReturnsSuite() {
  const [activeTab, setActiveTab] = useState<TabKey>("sip");
  const chartRef = useRef<HTMLDivElement | null>(null);

  const [sipAmount, setSipAmount] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);
  const [sipStepUp, setSipStepUp] = useState(5);

  const [lumpAmount, setLumpAmount] = useState(100000);
  const [lumpRate, setLumpRate] = useState(8);
  const [lumpYears, setLumpYears] = useState(5);
  const [lumpFrequency, setLumpFrequency] = useState(4);

  const [cagrStart, setCagrStart] = useState(100000);
  const [cagrEnd, setCagrEnd] = useState(180000);
  const [cagrYears, setCagrYears] = useState(5);

  const [xirrFlows, setXirrFlows] = useState<CashFlow[]>([
    { id: uid(), amount: -100000, date: "2024-06-01" },
    { id: uid(), amount: 125851, date: "2025-06-01" },
    { id: uid(), amount: 780000, date: "2028-06-01" },
  ]);

  const sipResult = useMemo(
    () => calculateSIPValue(sipAmount, sipRate, sipYears, sipStepUp),
    [sipAmount, sipRate, sipYears, sipStepUp]
  );

  const sipBasicResult = useMemo(
    () => calculateSIPValue(sipAmount, sipRate, sipYears, 0),
    [sipAmount, sipRate, sipYears]
  );

  const lumpResult = useMemo(
    () => calculateCompoundValue(lumpAmount, lumpRate, lumpYears, lumpFrequency),
    [lumpAmount, lumpRate, lumpYears, lumpFrequency]
  );

  const cagrResult = useMemo(() => {
    if (cagrStart <= 0 || cagrYears <= 0 || cagrEnd < 0) return NaN;
    return Math.pow(cagrEnd / cagrStart, 1 / cagrYears) - 1;
  }, [cagrStart, cagrEnd, cagrYears]);

  const xirrMeta = useMemo(() => {
    const validFlows = xirrFlows.filter(
      (f) => typeof f.amount === "number" && Number.isFinite(f.amount) && f.amount !== 0 && !!f.date
    );
    const hasPos = validFlows.some((f) => (f.amount as number) > 0);
    const hasNeg = validFlows.some((f) => (f.amount as number) < 0);

    if (validFlows.length < 2) return { status: "invalid" as XirrStatus, value: NaN };
    if (!hasPos || !hasNeg) return { status: "invalid" as XirrStatus, value: NaN };

    const rate = xirr(validFlows);
    if (Number.isFinite(rate)) return { status: "ok" as XirrStatus, value: rate };

    return { status: "no-solution" as XirrStatus, value: NaN };
  }, [xirrFlows]);

  const sipLabels = useMemo(
    () => Array.from({ length: sipYears }, (_, i) => `Year ${i + 1}`),
    [sipYears]
  );

  const lumpLabels = useMemo(
    () => Array.from({ length: lumpYears }, (_, i) => `Year ${i + 1}`),
    [lumpYears]
  );

  const sipSeries = useMemo(
    () => buildSipSeries(sipAmount, sipRate, sipYears, 0),
    [sipAmount, sipRate, sipYears]
  );

  const stepUpSipSeries = useMemo(
    () => buildSipSeries(sipAmount, sipRate, sipYears, sipStepUp),
    [sipAmount, sipRate, sipYears, sipStepUp]
  );

  const lumpSeries = useMemo(
    () => buildLumpSeries(lumpAmount, lumpRate, lumpYears, lumpFrequency),
    [lumpAmount, lumpRate, lumpYears, lumpFrequency]
  );

  const updateFlow = useCallback(
    (index: number, field: keyof Omit<CashFlow, "id">, value: string) => {
      setXirrFlows((current) => {
        const next = [...current];
        const target = next[index];
        if (!target) return current;
        next[index] = {
          ...target,
          [field]: field === "amount" ? safeNumber(value) : value,
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
            value: formatCurrency(sipResult.futureValue),
            tone: "positive" as const,
          },
          {
            label: "Total Invested",
            value: formatCurrency(sipResult.invested),
            tone: "neutral" as const,
          },
          {
            label: "Wealth Gain",
            value: formatCurrency(sipResult.gain),
            tone: "accent" as const,
          },
        ],
        inputRows: [
          ["Monthly SIP amount", formatCurrency(sipAmount)],
          ["Expected annual return", formatPercent(sipRate)],
          ["Investment horizon", `${sipYears} years`],
          ["Annual Step-up rate", formatPercent(sipStepUp)],
        ],
        resultRows: [
          ["Future value", formatCurrency(sipResult.futureValue)],
          ["Total invested", formatCurrency(sipResult.invested)],
          ["Gain", formatCurrency(sipResult.gain)],
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
            value: formatCurrency(lumpResult),
            tone: "positive" as const,
          },
          {
            label: "Invested Amount",
            value: formatCurrency(lumpAmount),
            tone: "neutral" as const,
          },
          {
            label: "Gain",
            value: formatCurrency(lumpResult - lumpAmount),
            tone: "accent" as const,
          },
        ],
        inputRows: [
          ["Investment amount", formatCurrency(lumpAmount)],
          ["Annual rate", formatPercent(lumpRate)],
          ["Horizon", `${lumpYears} years`],
          ["Compounding", `${lumpFrequency}x per year`],
        ],
        resultRows: [
          ["Future value", formatCurrency(lumpResult)],
          ["Gain", formatCurrency(lumpResult - lumpAmount)],
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
          value: formatPercent(cagrResult * 100),
          tone: "positive" as const,
        },
        { label: "XIRR", value: xirrValueText, tone: "accent" as const },
      ],
      inputRows: [
        ["CAGR start", formatCurrency(cagrStart)],
        ["CAGR end", formatCurrency(cagrEnd)],
        ["CAGR years", `${cagrYears}`],
        ["XIRR rows", `${xirrFlows.length}`],
      ],
      resultRows: [
        ["CAGR", formatPercent(cagrResult * 100)],
        ["XIRR", xirrValueText],
      ],
      notes: [
        "CAGR ignores the timing of cash flows.",
        "XIRR uses the exact dates of each cash flow.",
      ],
    };
  }, [
    activeTab,
    sipResult,
    sipAmount,
    sipRate,
    sipYears,
    sipStepUp,
    lumpResult,
    lumpAmount,
    lumpRate,
    lumpYears,
    lumpFrequency,
    cagrResult,
    cagrStart,
    cagrEnd,
    cagrYears,
    xirrValueText,
    xirrFlows.length,
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-3 py-3 text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <section className={`${shellClass} mb-5 px-5 py-6 sm:px-6 lg:px-8`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <BarChart3 className="h-3.5 w-3.5" />
              Private finance workspace
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Investment returns with{" "}
              <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                clear projections
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Compare SIP, lump sum, CAGR, and XIRR — all calculations run locally in your browser.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
            <StatCard label="Mode" value={tabs.find((t) => t.id === activeTab)?.label ?? "SIP"} icon="⚙️" />
            <StatCard label="SIP value" value={formatCurrency(sipResult.futureValue)} icon="💰" />
            <StatCard label="Lump sum" value={formatCurrency(lumpResult)} icon="🔺" />
            <StatCard label="XIRR" value={xirrValueText} icon="%" />
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
            <section className={shellClass}>
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
                  <Field label="Monthly SIP amount (₹)">
                    <input
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      min={0}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="How much you invest each month. Even ₹500/month adds up significantly over time." />
                </div>

                <div>
                  <Field label="Expected annual return (%)">
                    <input
                      type="number"
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                      min={0}
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
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      min={1}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="How long you plan to stay invested. Longer horizons benefit far more from compounding." />
                </div>

                <div>
                  <Field label="Annual step-up rate (%)">
                    <input
                      type="number"
                      value={sipStepUp}
                      onChange={(e) => setSipStepUp(Number(e.target.value))}
                      min={0}
                      step={0.1}
                      inputMode="decimal"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="Increase your monthly SIP by this % every year — set to 0 for a fixed SIP. A 5–10% step-up mirrors typical salary growth." />
                </div>
              </div>

              <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
                <ResultBox label="Total invested" value={formatCurrency(sipResult.invested)} />
                <ResultBox label="Future value (with step-up)" value={formatCurrency(sipResult.futureValue)} />
                <ResultBox label="Wealth gain" value={formatCurrency(sipResult.gain)} />
              </div>
            </section>

            <section className={shellClass}>
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
                      label: `Step-up SIP (+${sipStepUp}%/yr)`,
                      data: stepUpSipSeries,
                      color: "rgba(59,130,246,0.8)",
                    },
                  ]}
                />
              </div>

              {sipStepUp > 0 && (
                <div className="p-4 sm:p-5 text-sm text-white/60">
                  Step-up adds{" "}
                  <span className="font-semibold text-white">
                    {formatCurrency(sipResult.futureValue - sipBasicResult.futureValue)}
                  </span>{" "}
                  extra over {sipYears} years compared to a flat SIP.
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
            <section className={shellClass}>
              <div className="border-b border-white/10 p-4 sm:p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-white/10 p-4 sm:p-5">
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
                  <Field label="Investment amount (₹)">
                    <input
                      type="number"
                      value={lumpAmount}
                      onChange={(e) => setLumpAmount(Number(e.target.value))}
                      min={0}
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
                      value={lumpRate}
                      onChange={(e) => setLumpRate(Number(e.target.value))}
                      min={0}
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
                      value={lumpYears}
                      onChange={(e) => setLumpYears(Number(e.target.value))}
                      min={1}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="How many years you'll stay invested before withdrawing." />
                </div>

                <div>
                  <Field label="Compounding frequency">
                    {/* <select
                      value={lumpFrequency}
                      onChange={(e) => setLumpFrequency(Number(e.target.value))}
                      className={inputClass}
                      aria-label="How often interest is compounded"
                    >
                      <option value={1}>Annually (once a year)</option>
                      <option value={2}>Semi-annually (every 6 months)</option>
                      <option value={4}>Quarterly (every 3 months)</option>
                      <option value={12}>Monthly (every month)</option>
                    </select> */}
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
                <ResultBox label="Invested amount" value={formatCurrency(lumpAmount)} />
                <ResultBox label="Future value" value={formatCurrency(lumpResult)} />
                <ResultBox label="Compound gain" value={formatCurrency(lumpResult - lumpAmount)} />
              </div>
            </section>

            <section className={shellClass}>
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

          <div className="grid gap-5 xl:grid-cols-2">
            <section className={shellClass}>
              <div className="border-b border-white/10 p-4 sm:p-5">
                
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-white/10 p-4 sm:p-5">
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
                    chartRef={chartRef}
                  />
                </div>
              </div>

              <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5">
                <div>
                  <Field label="Opening value (₹)">
                    <input
                      type="number"
                      value={cagrStart}
                      onChange={(e) => setCagrStart(Number(e.target.value))}
                      min={1}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="What the investment was worth at the start of the period." />
                </div>

                <div>
                  <Field label="Ending value (₹)">
                    <input
                      type="number"
                      value={cagrEnd}
                      onChange={(e) => setCagrEnd(Number(e.target.value))}
                      min={0}
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
                      value={cagrYears}
                      onChange={(e) => setCagrYears(Number(e.target.value))}
                      min={1}
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </Field>
                  <FieldHint text="Number of years between the opening and ending values." />
                </div>
              </div>

              <div className="p-4 pt-0 sm:p-5 sm:pt-0">
                <ResultBox
                  label="Compound annual growth rate (CAGR)"
                  value={
                    cagrStart > 0 && cagrYears > 0
                      ? formatPercent(cagrResult * 100)
                      : "Enter valid values above"
                  }
                />
                {Number.isFinite(cagrResult) && (
                  <p className="mt-3 text-xs text-white/45">
                    ₹{cagrStart.toLocaleString("en-IN")} grew to ₹{cagrEnd.toLocaleString("en-IN")} in {cagrYears} year{cagrYears !== 1 ? "s" : ""} — equivalent to a steady {formatPercent(cagrResult * 100)} every year.
                  </p>
                )}
              </div>
            </section>

            <section className={shellClass}>
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

                <ResultBox label="Annualised XIRR" value={xirrValueText} />

                {xirrMeta.status === "invalid" && (
                  <div className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    Add at least one investment (negative) and one payout (positive) with valid dates.
                  </div>
                )}

                {xirrMeta.status === "no-solution" && (
                  <div className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-100">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    No stable XIRR solution found for this cash flow set. Try adjusting dates or amounts — payouts should exceed total investments for a positive rate.
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