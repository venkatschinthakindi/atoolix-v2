"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState, memo } from "react";
import {
  Calculator,
  ChevronRight,
  Percent,
  PiggyBank,
  TrendingUp,
  BarChart3,
  Download,
} from "lucide-react";

import { Field } from "@/components/ui/field";
import { formatCurrency } from "@/utility/formatCurrencyUtility";

// Lazy loaded to reduce initial bundle and improve LCP.
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

type TabKey = "sip" | "lump" | "performance";

type CashFlow = {
  amount: number;
  date: string;
};

const tabs: { id: TabKey; label: string; icon: any }[] = [
  { id: "sip", label: "SIP Growth", icon: '🚀' },
  { id: "lump", label: "Lump Sum Returns", icon: '💎' },
  { id: "performance", label: "CAGR & XIRR", icon: '🎯' },
];

function formatPercent(value: number) {
  if (Number.isNaN(value) || !Number.isFinite(value)) return "-";
  return `${value.toFixed(2)}%`;
}

function calculateSIPValue(monthly: number, annualRate: number, years: number, stepUpPercent: number) {
  const r = annualRate / 100 / 12;
  let balance = 0;
  let currentMonthly = monthly;

  for (let year = 0; year < years; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      balance = balance * (1 + r) + currentMonthly;
    }
    currentMonthly *= 1 + stepUpPercent / 100;
  }

  const invested = monthly * 12 * years;
  return {
    futureValue: balance,
    invested,
    gain: balance - invested,
  };
}

function calculateCompoundValue(amount: number, rate: number, years: number, frequency: number) {
  const periodic = rate / 100 / frequency;
  return amount * Math.pow(1 + periodic, frequency * years);
}

function buildSipSeries(monthly: number, annualRate: number, years: number, stepUpPercent: number) {
  const r = annualRate / 100 / 12;
  const series: number[] = [];
  let balance = 0;
  let currentMonthly = monthly;

  for (let year = 0; year < years; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      balance = balance * (1 + r) + currentMonthly;
    }
    series.push(balance);
    currentMonthly *= 1 + stepUpPercent / 100;
  }

  return series;
}

function buildLumpSeries(amount: number, rate: number, years: number, frequency: number) {
  const series: number[] = [];
  for (let year = 1; year <= years; year += 1) {
    const periodic = rate / 100 / frequency;
    series.push(amount * Math.pow(1 + periodic, frequency * year));
  }
  return series;
}

function xnpv(rate: number, cashflows: CashFlow[]) {
  const firstDate = new Date(cashflows[0].date).getTime();
  return cashflows.reduce((sum, flow) => {
    const dt = (new Date(flow.date).getTime() - firstDate) / (1000 * 60 * 60 * 24);
    return sum + flow.amount / Math.pow(1 + rate, dt / 365);
  }, 0);
}

function xirr(cashflows: CashFlow[]) {
  let guess = 0.1;

  for (let i = 0; i < 60; i += 1) {
    const value = xnpv(guess, cashflows);
    const derivative = (xnpv(guess + 1e-6, cashflows) - value) / 1e-6;

    if (Math.abs(derivative) < 1e-12) break;

    const next = guess - value / derivative;
    if (!Number.isFinite(next)) break;

    if (Math.abs(next - guess) < 1e-9) {
      guess = next;
      break;
    }

    guess = next;
  }

  return guess;
}

const shellClass =
  "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";

const cardClass =
  "rounded-2xl border border-white/10 bg-black/20 p-2 sm:p-2";

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: any;
}) {
  return (
    <div className={cardClass}>
      <div className="">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/45">
          {icon}
          <span>{label}</span>
        </div>
        <div>
          <div className="mx-2 text-xs font-semibold text-white sm:text-sm">{value}</div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-blue-300">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">{title}</h2>
        <p className="mt-1 text-sm text-white/60">{subtitle}</p>
      </div>
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

const FlowRow = memo(function FlowRow({
  flow,
  index,
  onChange,
}: {
  flow: CashFlow;
  index: number;
  onChange: (index: number, field: keyof CashFlow, value: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Amount">
        <input
          type="number"
          value={flow.amount}
          onChange={(e) => onChange(index, "amount", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
        />
      </Field>
      <Field label="Date">
        <input
          type="date"
          value={flow.date}
          onChange={(e) => onChange(index, "date", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
        />
      </Field>
    </div>
  );
});

export default function InvestmentReturnsSuite() {
  const [activeTab, setActiveTab] = useState<TabKey>("sip");

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
    { amount: -100000, date: "2024-06-01" },
    { amount: 20000, date: "2025-06-01" },
    { amount: 90000, date: "2028-06-01" },
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
    if (cagrStart <= 0 || cagrYears <= 0) return 0;
    return Math.pow(cagrEnd / cagrStart, 1 / cagrYears) - 1;
  }, [cagrStart, cagrEnd, cagrYears]);

  const xirrResult = useMemo(() => {
    try {
      const rate = xirr(xirrFlows);
      return Number.isFinite(rate) ? rate : 0;
    } catch {
      return 0;
    }
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

  const updateFlow = useCallback((index: number, field: keyof CashFlow, value: string) => {
    setXirrFlows((current) => {
      const next = [...current];
      next[index] = {
        ...next[index],
        [field]: field === "amount" ? Number(value) : value,
      };
      return next;
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6 max-w-4xl mx-auto">
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
              Compare SIP, lump sum, CAGR, and XIRR in a responsive interface built for speed and clarity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
            <StatCard label="Mode" value={tabs.find((t) => t.id === activeTab)?.label ?? "SIP"} icon='⚙️' />
            <StatCard label="SIP FV" value={formatCurrency(sipResult.futureValue)} icon='💰' />
            <StatCard label="Lump FV" value={formatCurrency(lumpResult)} icon='🔺' />
            <StatCard label="XIRR" value={formatPercent(xirrResult * 100)} icon='%' />
          </div>
        </div>
      </section>

      <div className="flex items-center">
        <div className="flex-1 gap-2 flex justify-center">
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
                  <span className="px-1">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
        </div>
        
        <div className="ml-auto">
         <FinancePdfExport />
        </div>
      </div>
      {activeTab === "sip" && (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="SIP growth calculator"
                subtitle="Compare basic SIP and step-up SIP over time."
                icon={PiggyBank}
              />
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
              <Field label="Monthly SIP">
                <input
                  type="number"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                  min={0}
                  inputMode="numeric"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>

              <Field label="Expected annual return (%)">
                <input
                  type="number"
                  value={sipRate}
                  onChange={(e) => setSipRate(Number(e.target.value))}
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>

              <Field label="Investment horizon (years)">
                <input
                  type="number"
                  value={sipYears}
                  onChange={(e) => setSipYears(Number(e.target.value))}
                  min={1}
                  inputMode="numeric"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>

              <Field label="Annual step-up rate (%)">
                <input
                  type="number"
                  value={sipStepUp}
                  onChange={(e) => setSipStepUp(Number(e.target.value))}
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>
            </div>

            <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
              <ResultBox label="Total invested" value={formatCurrency(sipResult.invested)} />
              <ResultBox label="Future value" value={formatCurrency(sipResult.futureValue)} />
              <ResultBox label="Wealth gain" value={formatCurrency(sipResult.gain)} />
            </div>
          </section>

          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="Growth comparison"
                subtitle="Basic SIP versus step-up SIP."
                icon={BarChart3}
              />
            </div>

            <div className="p-4 sm:p-5">
              <FinanceChart
                labels={sipLabels}
                datasets={[
                  {
                    label: "Basic SIP",
                    data: sipSeries,
                    color: "rgba(34,197,94,0.8)",
                  },
                  {
                    label: "Step-up SIP",
                    data: stepUpSipSeries,
                    color: "rgba(59,130,246,0.8)",
                  },
                ]}
              />
            </div>
          </section>
        </div>
      )}

      {activeTab === "lump" && (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="Lump sum calculator"
                subtitle="Project the future value of a one-time investment."
                icon={TrendingUp}
              />
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
              <Field label="Investment amount">
                <input
                  type="number"
                  value={lumpAmount}
                  onChange={(e) => setLumpAmount(Number(e.target.value))}
                  min={0}
                  inputMode="numeric"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>

              <Field label="Annual rate (%)">
                <input
                  type="number"
                  value={lumpRate}
                  onChange={(e) => setLumpRate(Number(e.target.value))}
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>

              <Field label="Investment horizon (years)">
                <input
                  type="number"
                  value={lumpYears}
                  onChange={(e) => setLumpYears(Number(e.target.value))}
                  min={1}
                  inputMode="numeric"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>

              <Field label="Compounding frequency">
                <select
                  value={lumpFrequency}
                  onChange={(e) => setLumpFrequency(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                >
                  <option value={1}>Annually</option>
                  <option value={2}>Semi-annually</option>
                  <option value={4}>Quarterly</option>
                  <option value={12}>Monthly</option>
                </select>
              </Field>
            </div>

            <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
              <ResultBox label="Invested amount" value={formatCurrency(lumpAmount)} />
              <ResultBox label="Estimated value" value={formatCurrency(lumpResult)} />
              <ResultBox label="Compound gain" value={formatCurrency(lumpResult - lumpAmount)} />
            </div>
          </section>

          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="Value projection"
                subtitle="How the investment grows year by year."
                icon={BarChart3}
              />
            </div>

            <div className="p-4 sm:p-5">
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
      )}

      {activeTab === "performance" && (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader title="CAGR calculator" subtitle="Measure annualized growth rate." icon={Percent} />
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
              <Field label="Opening value">
                <input
                  type="number"
                  value={cagrStart}
                  onChange={(e) => setCagrStart(Number(e.target.value))}
                  min={0}
                  inputMode="numeric"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>

              <Field label="Ending value">
                <input
                  type="number"
                  value={cagrEnd}
                  onChange={(e) => setCagrEnd(Number(e.target.value))}
                  min={0}
                  inputMode="numeric"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>

              <Field label="Period (years)">
                <input
                  type="number"
                  value={cagrYears}
                  onChange={(e) => setCagrYears(Number(e.target.value))}
                  min={1}
                  inputMode="numeric"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                />
              </Field>
            </div>

            <div className="p-4 pt-0 sm:p-5 sm:pt-0">
              <ResultBox label="Compound annual growth rate" value={formatPercent(cagrResult * 100)} />
            </div>

            <div className="border-t border-white/10 p-4 sm:p-5">
              <SectionHeader title="XIRR calculator" subtitle="Use dated cash flows for annualized return." icon={Calculator} />

              <div className="mt-4 space-y-4">
                {xirrFlows.map((flow, index) => (
                  <FlowRow key={index} flow={flow} index={index} onChange={updateFlow} />
                ))}
              </div>

              <div className="mt-4">
                <ResultBox label="Annualized XIRR" value={formatPercent(xirrResult * 100)} />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}