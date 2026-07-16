"use client";

import { useMemo, useRef, useState } from "react";
import {
  BarChart3,
  Calculator,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { FinanceChart } from "@/components/tools/financeSuite/financeChart";
import { FinancePdfExport } from "@/components/tools/financeSuite/financePdfExport";
import { Field } from "@/components/ui/Field";
import { formatCurrency } from "@/utility/formatCurrencyUtility";
import { StatCard } from "@/sharedUI/statCard";
import { SectionHeader } from "@/sharedUI/sectionHeader";
import { ExplainerPanel } from "@/sharedUI/explainerPanel";
import CustomSelect from "@/components/ui/customSelect";
import { useSearchParams } from "next/navigation";

type MainTab = "simple" | "compound" | "deposits";
type DepositMode = "fd" | "rd";
type RdConvention = "end" | "beginning";
type TabKey = MainTab;
type NumInput = string;

type CalcResult = {
  value: number;
  interest: number;
};

type ExportCard = {
  label: string;
  value: string;
  icon?: string;
};

type ExportData = {
  title: string;
  subtitle: string;
  summaryCards: ExportCard[];
  inputRows: string[][];
  resultRows: string[][];
  notes: string[];
};

const shellClass =
  "rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.55)] backdrop-blur";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-blue-400/40 focus:bg-white/[0.07]";

const tabs: { id: MainTab; label: string; icon: string }[] = [
  { id: "simple", label: "Simple Interest", icon: "🧮" },
  { id: "compound", label: "Compound Interest", icon: "📈" },
  { id: "deposits", label: "FD & RD Planner", icon: "🏦" },
];

const EXPLAINERS: Record<TabKey, { title: string; lines: string[] }> = {
  simple: {
    title: "What is simple interest?",
    lines: [
      "Simple interest is calculated only on the original principal amount.",
      "It is best for quick estimates when interest does not get added back into the principal.",
      "Use this when you want the easiest possible growth calculation.",
      "Example: ₹1,00,000 at 6% for 3 years.",
    ],
  },
  compound: {
    title: "What is compound interest?",
    lines: [
      "Compound interest means interest is added back to the principal and then earns more interest.",
      "More frequent compounding usually gives a slightly higher final value.",
      "This is common for savings, deposits, and long-term growth planning.",
      "Example: ₹1,00,000 at 7% for 5 years, compounded quarterly.",
    ],
  },
  deposits: {
    title: "What are FD and RD?",
    lines: [
      "FD means Fixed Deposit: a one-time amount is invested for a chosen duration.",
      "RD means Recurring Deposit: the same amount is deposited every month.",
      "FD usually grows with compounding, while RD depends on monthly contributions plus interest.",
      "Use the dropdowns if you want to change the calculation assumption.",
    ],
  },
};

function toNumber(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function clampMin(value: number, min: number) {
  return Math.max(min, value);
}

function calculateSimpleInterest(principal: number, rate: number, years: number): CalcResult {
  const interest = principal * (rate / 100) * years;
  return { value: principal + interest, interest };
}

function calculateCompound(amount: number, rate: number, years: number, frequency: number): CalcResult {
  const periodic = rate / 100 / frequency;
  const value = amount * Math.pow(1 + periodic, frequency * years);
  return { value, interest: value - amount };
}

function calculateRd(monthly: number, annualRate: number, months: number, convention: RdConvention): CalcResult {
  const r = annualRate / 100 / 12;
  const value =
    r === 0
      ? monthly * months
      : convention === "beginning"
        ? monthly * (((Math.pow(1 + r, months) - 1) / r) * (1 + r))
        : monthly * (((Math.pow(1 + r, months) - 1) / r));
  return { value, interest: value - monthly * months };
}

function buildSeries(
  count: number,
  labelFactory: (index: number) => string,
  valueFactory: (index: number) => number
) {
  const safeCount = Math.max(0, Math.floor(count));
  return {
    labels: Array.from({ length: safeCount }, (_, index) => labelFactory(index + 1)),
    data: Array.from({ length: safeCount }, (_, index) => valueFactory(index + 1)),
  };
}

function FieldHint({ text }: { text: string }) {
  return <p className="mt-2 text-xs leading-5 text-white/45">{text}</p>;
}

export default function SavingsDepositsSuite() {
  const searchParams = useSearchParams();

  const getInitialActiveTab = (): MainTab => {
    const type = searchParams.get("category")?.toLowerCase() || "";

    if (type === "simple") return "simple";
    if (type === "compound") return "compound";
    if (type === "fd" || type === "rd") return "deposits";

    return "simple";
  };

  const getInitialDepositMode = (): DepositMode => {
    const type = searchParams.get("category")?.toLowerCase() || "";

    if (type === "rd") return "rd";
    return "fd";
  };

  const [activeTab, setActiveTab] = useState<MainTab>(() => getInitialActiveTab());
  const [depositMode, setDepositMode] = useState<DepositMode>(() => getInitialDepositMode());


  const [principal, setPrincipal] = useState<NumInput>("100000");
  const [simpleRate, setSimpleRate] = useState<NumInput>("6");
  const [simpleYears, setSimpleYears] = useState<NumInput>("3");

  const [compoundPrincipal, setCompoundPrincipal] = useState<NumInput>("100000");
  const [compoundRate, setCompoundRate] = useState<NumInput>("7");
  const [compoundYears, setCompoundYears] = useState<NumInput>("5");
  const [compoundFrequency, setCompoundFrequency] = useState<NumInput>("4");

  const [fdAmount, setFdAmount] = useState<NumInput>("200000");
  const [fdRate, setFdRate] = useState<NumInput>("6.5");
  const [fdYears, setFdYears] = useState<NumInput>("4");
  const [fdFrequency, setFdFrequency] = useState<NumInput>("4");

  const [rdAmount, setRdAmount] = useState<NumInput>("5000");
  const [rdRate, setRdRate] = useState<NumInput>("6");
  const [rdMonths, setRdMonths] = useState<NumInput>("60");
  const [rdConvention, setRdConvention] = useState<RdConvention>("end");

  const exportRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const simpleInputs = {
    principal: toNumber(principal),
    rate: toNumber(simpleRate),
    years: toNumber(simpleYears),
  };

  const compoundInputs = {
    principal: toNumber(compoundPrincipal),
    rate: toNumber(compoundRate),
    years: toNumber(compoundYears),
    frequency: toNumber(compoundFrequency),
  };

  const fdInputs = {
    amount: toNumber(fdAmount),
    rate: toNumber(fdRate),
    years: toNumber(fdYears),
    frequency: toNumber(fdFrequency),
  };

  const rdInputs = {
    amount: toNumber(rdAmount),
    rate: toNumber(rdRate),
    months: toNumber(rdMonths),
  };

  const simpleError =
    simpleInputs.principal === null || simpleInputs.rate === null || simpleInputs.years === null
      ? "Please enter all simple interest values."
      : simpleInputs.principal < 0 || simpleInputs.rate < 0 || simpleInputs.years < 0
        ? "Simple interest values cannot be negative."
        : null;

  const compoundError =
    compoundInputs.principal === null || compoundInputs.rate === null || compoundInputs.years === null || compoundInputs.frequency === null
      ? "Please enter all compound interest values."
      : compoundInputs.principal < 0 || compoundInputs.rate < 0 || compoundInputs.years < 0 || compoundInputs.frequency <= 0
        ? "Compound interest values must be valid and frequency must be at least 1."
        : null;

  const fdError =
    fdInputs.amount === null || fdInputs.rate === null || fdInputs.years === null || fdInputs.frequency === null
      ? "Please enter all FD values."
      : fdInputs.amount < 0 || fdInputs.rate < 0 || fdInputs.years < 0 || fdInputs.frequency <= 0
        ? "FD values must be valid and frequency must be at least 1."
        : null;

  const rdError =
    rdInputs.amount === null || rdInputs.rate === null || rdInputs.months === null
      ? "Please enter all RD values."
      : rdInputs.amount < 0 || rdInputs.rate < 0 || rdInputs.months < 0
        ? "RD values cannot be negative."
        : null;

  const simpleCalc = useMemo(() => {
    if (simpleError) return { value: 0, interest: 0 };
    return calculateSimpleInterest(simpleInputs.principal!, simpleInputs.rate!, simpleInputs.years!);
  }, [simpleError, simpleInputs.principal, simpleInputs.rate, simpleInputs.years]);

  const compoundCalc = useMemo(() => {
    if (compoundError) return { value: 0, interest: 0 };
    return calculateCompound(
      compoundInputs.principal!,
      compoundInputs.rate!,
      compoundInputs.years!,
      clampMin(compoundInputs.frequency!, 1)
    );
  }, [compoundError, compoundInputs.principal, compoundInputs.rate, compoundInputs.years, compoundInputs.frequency]);

  const fdCalc = useMemo(() => {
    if (fdError) return { value: 0, interest: 0 };
    return calculateCompound(fdInputs.amount!, fdInputs.rate!, fdInputs.years!, clampMin(fdInputs.frequency!, 1));
  }, [fdError, fdInputs.amount, fdInputs.rate, fdInputs.years, fdInputs.frequency]);

  const rdCalc = useMemo(() => {
    if (rdError) return { value: 0, interest: 0 };
    return calculateRd(rdInputs.amount!, rdInputs.rate!, clampMin(rdInputs.months!, 0), rdConvention);
  }, [rdError, rdInputs.amount, rdInputs.rate, rdInputs.months, rdConvention]);

  const simpleSeries = useMemo(() => {
    if (simpleError) return { labels: [] as string[], data: [] as number[] };
    const years = Math.max(1, Math.floor(simpleInputs.years!));
    return buildSeries(years, (i) => `Year ${i}`, (i) => calculateSimpleInterest(simpleInputs.principal!, simpleInputs.rate!, i).value);
  }, [simpleError, simpleInputs.principal, simpleInputs.rate, simpleInputs.years]);

  const compoundSeries = useMemo(() => {
    if (compoundError) return { labels: [] as string[], data: [] as number[] };
    const years = Math.max(1, Math.floor(compoundInputs.years!));
    return buildSeries(
      years,
      (i) => `Year ${i}`,
      (i) => calculateCompound(compoundInputs.principal!, compoundInputs.rate!, i, clampMin(compoundInputs.frequency!, 1)).value
    );
  }, [compoundError, compoundInputs.principal, compoundInputs.rate, compoundInputs.years, compoundInputs.frequency]);

  const fdSeries = useMemo(() => {
    if (fdError) return { labels: [] as string[], data: [] as number[] };
    const years = Math.max(1, Math.floor(fdInputs.years!));
    return buildSeries(
      years,
      (i) => `Year ${i}`,
      (i) => calculateCompound(fdInputs.amount!, fdInputs.rate!, i, clampMin(fdInputs.frequency!, 1)).value
    );
  }, [fdError, fdInputs.amount, fdInputs.rate, fdInputs.years, fdInputs.frequency]);

  const rdSeries = useMemo(() => {
    if (rdError) return { labels: [] as string[], data: [] as number[] };
    const months = Math.max(1, Math.floor(rdInputs.months!));
    return buildSeries(
      months,
      (i) => `Month ${i}`,
      (i) => calculateRd(rdInputs.amount!, rdInputs.rate!, i, rdConvention).value
    );
  }, [rdError, rdInputs.amount, rdInputs.rate, rdInputs.months, rdConvention]);

  const reportLabel = tabs.find((t) => t.id === activeTab)?.label ?? "Simple Interest";

  const exportData: ExportData = useMemo(() => {
    if (activeTab === "simple") {
      return {
        title: "Simple Interest Report",
        subtitle: "Principal, rate, time, and projection summary.",
        summaryCards: [
          { label: "Principal", value: formatCurrency(simpleInputs.principal ?? 0), icon: "💵" },
          { label: "Interest", value: simpleError ? "Fix inputs" : formatCurrency(simpleCalc.interest), icon: "💹" },
          { label: "Maturity", value: simpleError ? "Fix inputs" : formatCurrency(simpleCalc.value), icon: "🏆" },
        ],
        inputRows: [
          ["Principal", formatCurrency(simpleInputs.principal ?? 0)],
          ["Rate", `${simpleInputs.rate ?? 0}%`],
          ["Years", `${simpleInputs.years ?? 0}`],
        ],
        resultRows: [
          ["Total interest", simpleError ? "Fix inputs" : formatCurrency(simpleCalc.interest)],
          ["Maturity value", simpleError ? "Fix inputs" : formatCurrency(simpleCalc.value)],
        ],
        notes: ["Simple interest is calculated only on the original principal."],
      };
    }

    if (activeTab === "compound") {
      return {
        title: "Compound Interest Report",
        subtitle: "Compound growth with selected frequency.",
        summaryCards: [
          { label: "Principal", value: formatCurrency(compoundInputs.principal ?? 0), icon: "💵" },
          { label: "Maturity", value: compoundError ? "Fix inputs" : formatCurrency(compoundCalc.value), icon: "🏆" },
          { label: "Gain", value: compoundError ? "Fix inputs" : formatCurrency(compoundCalc.interest), icon: "✨" },
        ],
        inputRows: [
          ["Principal", formatCurrency(compoundInputs.principal ?? 0)],
          ["Rate", `${compoundInputs.rate ?? 0}%`],
          ["Years", `${compoundInputs.years ?? 0}`],
          ["Frequency", `${compoundInputs.frequency ?? 0} times/year`],
        ],
        resultRows: [
          ["Total gain", compoundError ? "Fix inputs" : formatCurrency(compoundCalc.interest)],
          ["Maturity value", compoundError ? "Fix inputs" : formatCurrency(compoundCalc.value)],
        ],
        notes: ["Compound interest adds earned interest back into principal before each new period."],
      };
    }

    return {
      title: depositMode === "fd" ? "Fixed Deposit Report" : "Recurring Deposit Report",
      subtitle:
        depositMode === "fd"
          ? "Lump-sum deposit growth with compounding."
          : "Monthly contribution growth with deposit timing choice.",
      summaryCards:
        depositMode === "fd"
          ? [
              { label: "Deposit", value: formatCurrency(fdInputs.amount ?? 0), icon: "💰" },
              { label: "Maturity", value: fdError ? "Fix inputs" : formatCurrency(fdCalc.value), icon: "💎" },
              { label: "Interest", value: fdError ? "Fix inputs" : formatCurrency(fdCalc.interest), icon: "💹" },
            ]
          : [
              { label: "Monthly deposit", value: formatCurrency(rdInputs.amount ?? 0), icon: "🏦" },
              { label: "Maturity", value: rdError ? "Fix inputs" : formatCurrency(rdCalc.value), icon: "💎" },
              { label: "Interest", value: rdError ? "Fix inputs" : formatCurrency(rdCalc.interest), icon: "💹" },
            ],
      inputRows:
        depositMode === "fd"
          ? [
              ["Deposit amount", formatCurrency(fdInputs.amount ?? 0)],
              ["Rate", `${fdInputs.rate ?? 0}%`],
              ["Years", `${fdInputs.years ?? 0}`],
              ["Compounding frequency", `${fdInputs.frequency ?? 0} times/year`],
            ]
          : [
              ["Monthly deposit", formatCurrency(rdInputs.amount ?? 0)],
              ["Rate", `${rdInputs.rate ?? 0}%`],
              ["Term", `${rdInputs.months ?? 0} months`],
              ["Timing", rdConvention === "beginning" ? "Beginning of month" : "End of month"],
            ],
      resultRows:
        depositMode === "fd"
          ? [
              ["Maturity value", fdError ? "Fix inputs" : formatCurrency(fdCalc.value)],
              ["Interest earned", fdError ? "Fix inputs" : formatCurrency(fdCalc.interest)],
            ]
          : [
              ["Maturity value", rdError ? "Fix inputs" : formatCurrency(rdCalc.value)],
              ["Interest earned", rdError ? "Fix inputs" : formatCurrency(rdCalc.interest)],
            ],
      notes:
        depositMode === "fd"
          ? ["FD calculations assume the selected compounding frequency."]
          : ["RD calculation uses the selected monthly deposit timing assumption."],
    };
  }, [
    activeTab,
    depositMode,
    simpleInputs.principal,
    simpleInputs.rate,
    simpleInputs.years,
    simpleError,
    simpleCalc.interest,
    simpleCalc.value,
    compoundInputs.principal,
    compoundInputs.rate,
    compoundInputs.years,
    compoundInputs.frequency,
    compoundError,
    compoundCalc.value,
    compoundCalc.interest,
    fdInputs.amount,
    fdInputs.rate,
    fdInputs.years,
    fdInputs.frequency,
    fdError,
    fdCalc.value,
    fdCalc.interest,
    rdInputs.amount,
    rdInputs.rate,
    rdInputs.months,
    rdError,
    rdCalc.value,
    rdCalc.interest,
    rdConvention,
  ]);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6">
      <section className={`${shellClass} mb-5 px-5 py-6 sm:px-6 lg:px-8`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <BarChart3 className="h-3.5 w-3.5" />
              Private finance workspace
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Savings and deposits with{" "}
              <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                clear projections
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Compare simple interest, compound growth, FD, and RD — all calculations run locally in your browser.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
            <StatCard label="Mode" value={tabs.find((t) => t.id === activeTab)?.label ?? "Simple Interest"} icon="⚙️" />
            <StatCard label="Simple interest" value={formatCurrency(simpleCalc.value)} icon="🧮" />
            <StatCard label="Compound value" value={formatCurrency(compoundCalc.value)} icon="📈" />
            <StatCard label="FD / RD" value={formatCurrency(depositMode === "fd" ? fdCalc.value : rdCalc.value)} icon="🏦"  />
          </div>
        </div>
      </section>

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

      <ExplainerPanel tabKey={activeTab} explainers={EXPLAINERS} />

      <div ref={exportRef} className="space-y-6">
        {activeTab === "simple" && (
          <div className="space-y-4">
            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <section className={shellClass}>
                <div className="border-b border-white/10 p-4 sm:p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-white/10 p-4 sm:p-5">
                    <SectionHeader
                      title="Simple interest calculator"
                      subtitle="Enter principal, rate, and time to see total interest and maturity value."
                      icon={PiggyBank}
                    />
                    <FinancePdfExport
                      filename="simle-interest-report"
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
                    <Field label="Principal (₹)" >
                      <input
                        type="text"
                        aria-label="Principal (₹)"
                        inputMode="decimal"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <FieldHint text="The starting amount you invest or deposit." />
                  </div>

                  <div>
                    <Field label="Interest rate (%)">
                      <input
                        type="text"
                        aria-label="Interest rate (%)"
                        inputMode="decimal"
                        value={simpleRate}
                        onChange={(e) => setSimpleRate(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <FieldHint text="Annual simple interest rate." />
                  </div>

                  <div>
                    <Field label="Duration (years)">
                      <input
                        type="text"
                        aria-label="Duration (years)"
                        inputMode="decimal"
                        value={simpleYears}
                        onChange={(e) => setSimpleYears(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <FieldHint text="How long the money stays invested." />
                  </div>
                </div>

                {simpleError ? <div className="px-4 pb-4 text-sm text-amber-200 sm:px-5">{simpleError}</div> : null}

                <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
                    <StatCard label="Total interest" value={simpleError ? "Fix inputs" : formatCurrency(simpleCalc.interest)}  icon="💹" />
                  <StatCard label="Principal" value={formatCurrency(simpleInputs.principal ?? 0)} icon="💵" />
                  <StatCard label="Maturity value" value={simpleError ? "Fix inputs" : formatCurrency(simpleCalc.value)} icon="🏆" />
                </div>
              </section>

              <section ref={chartRef} className={shellClass}>
                <div className="border-b border-white/10 p-4 sm:p-5">
                  <SectionHeader
                    title="Projection"
                    subtitle="Shows the maturity value growing year by year."
                    icon={BarChart3}
                  />
                </div>

                <div className="p-4 sm:p-5">
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
            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <section className={shellClass}>
                <div className="border-b border-white/10 p-4 sm:p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-white/10 p-4 sm:p-5">
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
                      inputRows={exportData.inputRows}
                      resultRows={exportData.resultRows}
                      notes={exportData.notes}
                      chartRef={chartRef}
                    />
                  </div>
                </div>

                <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5">
                  <div>
                    <Field label="Principal (₹)">
                      <input
                        type="text"
                        aria-label="Principal"
                        inputMode="decimal"
                        value={compoundPrincipal}
                        onChange={(e) => setCompoundPrincipal(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <FieldHint text="The amount on which compound interest will be calculated." />
                  </div>

                  <div>
                    <Field label="Interest rate (%)">
                      <input
                        type="text"
                        aria-label="Annual nominal interest rate in percentage"
                        inputMode="decimal"
                        value={compoundRate}
                        onChange={(e) => setCompoundRate(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <FieldHint text="Annual nominal interest rate." />
                  </div>

                  <div>
                    <Field label="Duration (years)">
                      <input
                        type="text"
                        aria-label="Duration in years for which the money is invested"
                        inputMode="decimal"
                        value={compoundYears}
                        onChange={(e) => setCompoundYears(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <FieldHint text="How long the investment stays active." />
                  </div>

                  <div>
                    <Field label="Compounding frequency">
                      <CustomSelect value={compoundFrequency}
                        callBackTrigger={(e) => setCompoundFrequency(e)}
                        options={[
                            { value: "1", label: "Annually (once a year)" },
                            { value: "2", label: "Semi-annually (every 6 months)" },
                            { value: "4", label: "Quarterly (every 3 months)" },
                            { value: "12", label: "Monthly (every month)" },
                        ]} />
                    </Field>
                    <FieldHint text="How often interest is added to the principal." />
                  </div>
                </div>

                {compoundError ? <div className="px-4 pb-4 text-sm text-amber-200 sm:px-5">{compoundError}</div> : null}

                <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
                  <StatCard label="Principal" value={formatCurrency(compoundInputs.principal ?? 0)} icon="💵" />
                  <StatCard label="Maturity value" value={compoundError ? "Fix inputs" : formatCurrency(compoundCalc.value)} icon="🏆" />
                  <StatCard label="Compound gain" value={compoundError ? "Fix inputs" : formatCurrency(compoundCalc.interest)}  icon="✨" />
                </div>
              </section>

              <section ref={chartRef} className={shellClass}>
                <div className="border-b border-white/10 p-4 sm:p-5">
                  <SectionHeader
                    title="Projection"
                    subtitle="Shows the compounded value at each year."
                    icon={BarChart3}
                  />
                </div>

                <div className="p-4 sm:p-5">
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
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { id: "fd", label: "Fixed Deposit" },
                { id: "rd", label: "Recurring Deposit" },
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setDepositMode(mode.id as DepositMode)}
                  className={`tab-button ${depositMode === mode.id ? "tab-button-active" : ""}`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {depositMode === "fd" ? (
              <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <section className={shellClass}>
                  <div className="border-b border-white/10 p-4 sm:p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-white/10 p-4 sm:p-5">
                      <SectionHeader
                        title="Fixed deposit planner"
                        subtitle="Default compounding is quarterly. Change it if your product uses a different rule."
                        icon={ShieldCheck}
                      />
                      <FinancePdfExport
                        filename="fixed-deposit-report"
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
                      <Field label="Deposit amount (₹)">
                        <input
                          type="text"
                          aria-label="Deposit amount"
                          inputMode="decimal"
                          value={fdAmount}
                          onChange={(e) => setFdAmount(e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <FieldHint text="The one-time amount you deposit today." />
                    </div>

                    <div>
                      <Field label="Interest rate (%)">
                        <input
                          type="text"
                          aria-label="Annual interest rate in percentage"
                          inputMode="decimal"
                          value={fdRate}
                          onChange={(e) => setFdRate(e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <FieldHint text="Annual FD rate." />
                    </div>

                    <div>
                      <Field label="Duration (years)">
                        <input
                          type="text"
                          aria-label="Duration in years for which the deposit is held"
                          inputMode="decimal"
                          value={fdYears}
                          onChange={(e) => setFdYears(e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <FieldHint text="How long the deposit stays invested." />
                    </div>

                    <div>
                      <Field label="Compounding frequency">
                        <CustomSelect value={fdFrequency}
                        callBackTrigger={(e) => setFdFrequency(e)}
                        options={[
                            { value: "1", label: "Annually (once a year)" },
                            { value: "2", label: "Semi-annually (every 6 months)" },
                            { value: "4", label: "Quarterly (every 3 months)" },
                            { value: "12", label: "Monthly (every month)" },
                        ]} />
                      </Field>
                      <FieldHint text="Quarterly is the common default for bank-style FD calculations." />
                    </div>
                  </div>

                  {fdError ? <div className="px-4 pb-4 text-sm text-amber-200 sm:px-5">{fdError}</div> : null}

                  <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
                    <StatCard label="Deposit" value={formatCurrency(fdInputs.amount ?? 0)} icon="💰" />
                    <StatCard label="Maturity value" value={fdError ? "Fix inputs" : formatCurrency(fdCalc.value)} icon="💎" />
                    <StatCard label="Interest earned" value={fdError ? "Fix inputs" : formatCurrency(fdCalc.interest)} icon="💹" />
                  </div>
                </section>

                <section ref={chartRef} className={shellClass}>
                  <div className="border-b border-white/10 p-4 sm:p-5">
                    <SectionHeader
                      title="FD projection"
                      subtitle="Shows the future value year by year."
                      icon={BarChart3}
                    />
                  </div>

                  <div className="p-4 sm:p-5">
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
              <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <section className={shellClass}>
                  <div className="border-b border-white/10 p-4 sm:p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-white/10 p-4 sm:p-5">
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
                        inputRows={exportData.inputRows}
                        resultRows={exportData.resultRows}
                        notes={exportData.notes}
                        chartRef={chartRef}
                      />                  
                    </div>
                  </div>
                  <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5">
                    <div>
                      <Field label="Monthly deposit (₹)">
                        <input
                          type="text"
                          aria-label="Monthly deposit amount"
                          inputMode="decimal"
                          value={rdAmount}
                          onChange={(e) => setRdAmount(e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <FieldHint text="The amount you deposit every month." />
                    </div>

                    <div>
                      <Field label="Interest rate (%)">
                        <input
                          type="text"
                          aria-label="Annual interest rate in percentage"
                          inputMode="decimal"
                          value={rdRate}
                          onChange={(e) => setRdRate(e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <FieldHint text="Annual RD rate." />
                    </div>

                    <div>
                      <Field label="Term (months)">
                        <input
                          type="text"
                          aria-label="Duration in months for which the money is deposited"
                          inputMode="decimal"
                          value={rdMonths}
                          onChange={(e) => setRdMonths(e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <FieldHint text="How many months you keep depositing." />
                    </div>

                    <div>
                      <Field label="Deposit timing">
                        <CustomSelect value={rdConvention}
                        callBackTrigger={(e) => setRdConvention(e as RdConvention)}
                        options={[
                            { value: "end", label: "End of month" },
                            { value: "beginning", label: "Beginning of month" }
                        ]} />
                      </Field>
                      <FieldHint text="Use the default if you just want a quick estimate." />
                    </div>
                  </div>

                  {rdError ? <div className="px-4 pb-4 text-sm text-amber-200 sm:px-5">{rdError}</div> : null}

                  <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
                    <StatCard label="Total invested" value={formatCurrency((rdInputs.amount ?? 0) * (rdInputs.months ?? 0))} icon="🏦" />
                    <StatCard label="Maturity value" value={rdError ? "Fix inputs" : formatCurrency(rdCalc.value)}  icon="💎" />
                    <StatCard label="Interest earned" value={rdError ? "Fix inputs" : formatCurrency(rdCalc.interest)} icon="💹" />
                  </div>
                </section>

                <section ref={chartRef} className={shellClass}>
                  <div className="border-b border-white/10 p-4 sm:p-5">
                    <SectionHeader
                      title="RD projection"
                      subtitle="Shows the maturity value month by month."
                      icon={BarChart3}
                    />
                  </div>

                  <div className="p-4 sm:p-5">
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
    </div>
  );
}