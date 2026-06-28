"use client";

import dynamic from "next/dynamic";
import type { ElementType } from "react";
import { useCallback, useMemo, useState } from "react";
import {
  Calculator,
  Percent,
  PiggyBank,
  BarChart3,
  TriangleAlert,
  Info,
  TrendingUp,
} from "lucide-react";

import { Field } from "@/components/ui/field";
import { formatCurrency } from "@/utility/formatCurrencyUtility";
import { SectionHeader } from "@/sharedUI/sectionHeader";
import { StatCard } from "@/sharedUI/statCard";


type TabKey = "retirement" | "fire" | "swp";
type ScenarioKey = "conservative" | "base" | "aggressive";

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

const shellClass =
  "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";

function clampNum(value: number, min: number, max: number) {
  const n = Number.isFinite(value) ? value : min;
  return Math.max(min, Math.min(max, n));
}

function clampInt(value: number, min: number, max: number) {
  return Math.floor(clampNum(value, min, max));
}

function money(value: number) {
  if (!Number.isFinite(value)) return "Rs. -";
  return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
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

function calculateSwpWithdrawal(corpus: number, annualReturn: number, years: number) {
  const months = Math.max(1, Math.round(Math.max(0, years) * 12));
  const netCorpus = Math.max(0, corpus);
  const r = monthlyRate(annualReturn);

  if (netCorpus <= 0) return 0;
  if (Math.abs(r) < 1e-12) return netCorpus / months;

  const denom = 1 - Math.pow(1 + r, -months);
  return denom > 0 ? netCorpus * (r / denom) : 0;
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
  const series: number[] = [];
  let balance = Math.max(0, corpus);
  let withdrawal = Math.max(0, initialWithdrawal);

  for (let month = 1; month <= months; month += 1) {
    balance = Math.max(0, balance * (1 + r) - withdrawal);

    if (month % 12 === 0 || month === months) {
    withdrawal *= Math.pow(1 + inflationRate / 100, 1);
    series.push(balance);
    }
  }

  return series;
}

function ChartSkeleton() {
  return (
    <div className="h-72 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="h-4 w-40 rounded bg-white/10" />
      <div className="mt-6 h-56 rounded-xl bg-gradient-to-b from-white/5 to-white/[0.02]" />
    </div>
  );
}

function ResultBox({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
      {note ? <div className="mt-1 text-xs text-white/45">{note}</div> : null}
    </div>
  );
}

function InfoCallout({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-sm text-blue-50">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="mt-1 text-blue-50/75">{text}</div>
      </div>
    </div>
  );
}

function WarningCallout({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-50">
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{text}</div>
    </div>
  );
}

export default function RetirementWealthSuite() {
  const [activeTab, setActiveTab] = useState<TabKey>("retirement");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>("base");

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [inflationRate, setInflationRate] = useState(6);
  const [taxDrag, setTaxDrag] = useState(1.5);
  const [annualNeed, setAnnualNeed] = useState(120000);

  const [fireSavings, setFireSavings] = useState(500000);
  const [fireContribution, setFireContribution] = useState(15000);
  const [fireReturn, setFireReturn] = useState(8);
  const [fireTaxDrag, setFireTaxDrag] = useState(1.5);
  const [fireAnnualExpense, setFireAnnualExpense] = useState(120000);
  const [fireWithdrawalRate, setFireWithdrawalRate] = useState(4);
  const [fireHorizonYears, setFireHorizonYears] = useState(20);

  const [swpCorpus, setSwpCorpus] = useState(1500000);
  const [swpReturn, setSwpReturn] = useState(7);
  const [swpYears, setSwpYears] = useState(20);
  const [swpInflationRate, setSwpInflationRate] = useState(6);

  const scenario = SCENARIOS[selectedScenario];
  const retirementYears = useMemo(() => clampInt(retirementAge - currentAge, 0, 60), [currentAge, retirementAge]);

  
    const [fireInflation, setFireInflation] = useState(6);
    const [swpTaxDrag, setSwpTaxDrag] = useState(1.5);

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

  // ✅ FIX MISSING SYNC
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

//   swpEffectiveReturn
  const swpNetReturn = useMemo(
  () => annualNetReturn(swpReturn, swpTaxDrag),
  [swpReturn, swpTaxDrag]
);

  const retirementNeedAtGoal = useMemo(
    () => inflateValue(annualNeed, inflationRate, retirementYears),
    [annualNeed, inflationRate, retirementYears]
  );
const [retirementWithdrawalRate, setRetirementWithdrawalRate] = useState(4);

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

  const retirementGoalAchievement = useMemo(
    () => calculateGoalAchievement(retirementSeries.at(-1) ?? currentSavings, retirementTarget),
    [retirementSeries, currentSavings, retirementTarget]
  );

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

  const safeFireMonthsToGoal =
  Number.isFinite(fireMonthsToGoal) ? fireMonthsToGoal : Infinity;

  const fireProjectionYears = useMemo(() => {
  if (!safeFireMonthsToGoal || safeFireMonthsToGoal <= 0) return 0;
  return Math.min(Math.ceil(safeFireMonthsToGoal / 12), 50);
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

  const fireGoalAchievement = useMemo(
    () => calculateGoalAchievement(fireSeries.at(-1) ?? fireSavings, fireTarget),
    [fireSeries, fireSavings, fireTarget]
  );

  const swpInitialWithdrawal = useMemo(
    () => calculateSwpWithdrawal(swpCorpus, swpNetReturn, swpYears),
    [swpCorpus, swpNetReturn, swpYears]
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
      : retirementMonthly <= 0 && retirementTarget > currentSavings
        ? "You are already on track with the selected assumptions."
        : null;

  const fireWarn =
    !Number.isFinite(fireTarget) || fireTarget <= 0 || !Number.isFinite(safeFireMonthsToGoal)
      ? "The selected savings plan cannot reach the FIRE target under current assumptions."
      : null;

  const swpWarn =
    swpInitialWithdrawal <= 0
      ? "Check the corpus, return, and duration. The current setup does not produce a usable monthly withdrawal."
      : null;

  const handleAgeChange = useCallback((v: number) => setCurrentAge(clampInt(v, 18, 90)), []);
  const handleRetAgeChange = useCallback(
    (v: number) => setRetirementAge(clampInt(v, currentAge + 1, 100)),
    [currentAge]
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-3 py-4 text-white sm:px-4 md:px-5 lg:px-6">
      <section className={`${shellClass} px-5 py-6 sm:px-6 lg:px-8`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <TrendingUp className="h-3.5 w-3.5" />
              Private finance workspace
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Retirement planning with{" "}
              <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                clear projections
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Compare retirement, FIRE, and SWP projections with estimated tax drag, proper compounding, and cleaner scenario handling.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[560px]">
            <StatCard label="Mode" value={tabs.find((t) => t.id === activeTab)?.label ?? "Retirement"} icon="⚙️" hint="Current tool" />
            <StatCard label="Scenario" value={scenario.label} hint="Preset view" icon="🧩" />
            <StatCard label="FIRE Target" value={money(fireTarget)} hint="Inflation-adjusted" icon="🚀"/>
            <StatCard label="SWP/Month" value={money(swpInitialWithdrawal)} hint="Initial withdrawal" icon="💰"/>
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
      
              <div className="ml-auto">
                <FinancePdfExport />
              </div>
            </div>

      <section className={`${shellClass} p-4 sm:p-5`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-medium text-white">Scenario presets</div>
            <div className="mt-1 text-sm text-white/60">
              Choose a preset to quickly compare conservative, base, or aggressive assumptions.
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {(Object.keys(SCENARIOS) as ScenarioKey[]).map((key) => {
              const preset = SCENARIOS[key];
              const active = selectedScenario === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => applyScenario(key)}
                  className={[
                    "rounded-2xl border px-4 py-3 text-left transition",
                    active ? "border-blue-400/30 bg-blue-400/15" : "border-white/10 bg-black/20 hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  <div className="text-sm font-semibold text-white">{preset.label}</div>
                  <div className="mt-1 text-xs text-white/55">
                    Return {formatPercent(preset.returnRate)} | Inflation {formatPercent(preset.inflationRate)} | Tax drag {formatPercent(preset.taxDrag)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activeTab === "retirement" && (
        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="Retirement planner"
                subtitle="Chart shows corpus growth only, with the target shown separately."
                icon={PiggyBank}
              />
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
              <Field label="Current age">
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => handleAgeChange(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={18}
                  max={90}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Retirement age">
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => handleRetAgeChange(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={currentAge + 1}
                  max={100}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Current savings">
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(clampNum(Number(e.target.value), 0, 1e12))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Monthly contribution">
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(clampNum(Number(e.target.value), 0, 1e12))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Expected return (%)">
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(clampNum(Number(e.target.value), 0, 25))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  max={25}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>

              <Field label="Tax drag (%)">
                <input
                  type="number"
                  value={taxDrag}
                  onChange={(e) => setTaxDrag(clampNum(Number(e.target.value), 0, 10))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>

              <Field label="Inflation rate (%)">
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(clampNum(Number(e.target.value), 0, 30))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>

              <Field label="Annual expense today">
                <input
                  type="number"
                  value={annualNeed}
                  onChange={(e) => setAnnualNeed(clampNum(Number(e.target.value), 0, 1e12))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  inputMode="numeric"
                />
              </Field>
            </div>

            <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
              <ResultBox label="Retirement horizon" value={yearsLabel(retirementYears)} note="Years left until retirement" />
              <ResultBox label="Target corpus" value={money(retirementTarget)} note="4% rule, inflation-adjusted" />
              <ResultBox label="Required monthly savings" value={money(retirementMonthly)} note="After tax drag" />
            </div>

            {retirementWarn ? (
              <div className="px-4 pb-4 sm:px-5">
                <WarningCallout text={retirementWarn} />
              </div>
            ) : null}
          </section>

          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="Retirement projection"
                subtitle="Projected corpus growth compared against the target corpus."
                icon={BarChart3}
              />
            </div>

            <div className="p-4 sm:p-5">
              {retirementSeries.length > 0 ? (
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
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                  No chart data available for the current retirement horizon.
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {activeTab === "fire" && (
        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="FIRE calculator"
                subtitle="Target uses inflation-adjusted spending at the selected FIRE date."
                icon={Calculator}
              />
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
              <Field label="Current savings">
                <input
                  type="number"
                  value={fireSavings}
                  onChange={(e) => setFireSavings(clampNum(Number(e.target.value), 0, 1e12))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Monthly savings">
                <input
                  type="number"
                  value={fireContribution}
                  onChange={(e) => setFireContribution(clampNum(Number(e.target.value), 0, 1e12))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Expected return (%)">
                <input
                  type="number"
                  value={fireReturn}
                  onChange={(e) => setFireReturn(clampNum(Number(e.target.value), 0, 25))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  max={25}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>

              <Field label="Tax drag (%)">
                <input
                  type="number"
                  value={fireTaxDrag}
                  onChange={(e) => setFireTaxDrag(clampNum(Number(e.target.value), 0, 10))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>

              <Field label="Annual expense today">
                <input
                  type="number"
                  value={fireAnnualExpense}
                  onChange={(e) => setFireAnnualExpense(clampNum(Number(e.target.value), 0, 1e12))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  inputMode="numeric"
                />
              </Field>

              <Field label="FIRE horizon (years)">
                <input
                  type="number"
                  value={fireHorizonYears}
                  onChange={(e) => setFireHorizonYears(clampInt(Number(e.target.value), 1, 60))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={1}
                  max={60}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Withdrawal rate (%)">
                <input
                  type="number"
                  value={fireWithdrawalRate}
                  onChange={(e) => setFireWithdrawalRate(clampNum(Number(e.target.value), 0.1, 10))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0.1}
                  max={10}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>

              <Field label="Inflation rate (%)">
                <input
                  type="number"
                  value={fireInflation}
                  onChange={(e) => setFireInflation(clampNum(Number(e.target.value), 0, 30))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>
            </div>

            <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
              <ResultBox label="FIRE target" value={
  !Number.isFinite(fireTarget) || fireTarget <= 0
    ? "Invalid"
    : money(fireTarget)
} note="Inflation-adjusted expense" />
              <ResultBox
                label="Years to goal"
               value={
                !Number.isFinite(safeFireMonthsToGoal)
                    ? "Not Reachable"
                    : safeFireMonthsToGoal <= 0
                    ? "Already Reached"
                    : `${Math.ceil(safeFireMonthsToGoal / 12)} years`
                }
                note="Closed-form timeline"
              />
              <ResultBox
                label="Current progress"
                value={`${fireGoalAchievement.toFixed(0)}%`}
                note="Projected corpus vs target"
              />
            </div>

            {fireWarn ? (
              <div className="px-4 pb-4 sm:px-5">
                <WarningCallout text={fireWarn} />
              </div>
            ) : null}

            <div className="px-4 pb-4 sm:px-5">
              <InfoCallout
                title="Model note"
                text="The FIRE target is based on the selected horizon and an estimated tax drag rather than a full tax engine."
              />
            </div>
          </section>

          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="FIRE projection"
                subtitle="Portfolio growth compared against the FIRE target."
                icon={BarChart3}
              />
            </div>

            <div className="p-4 sm:p-5">
              {fireSeries.length > 0 ? (
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
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                  {!Number.isFinite(safeFireMonthsToGoal)
                    ? "The selected savings plan cannot reach the FIRE target under current assumptions."
                    : "No chart data available for the current FIRE timeline."}
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {activeTab === "swp" && (
        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="SWP planner"
                subtitle="Initial withdrawal is shown here; inflation applies yearly in the projection."
                icon={Percent}
              />
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
              <Field label="Corpus available">
                <input
                  type="number"
                  value={swpCorpus}
                  onChange={(e) => setSwpCorpus(clampNum(Number(e.target.value), 0, 1e12))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Expected return (%)">
                <input
                  type="number"
                  value={swpReturn}
                  onChange={(e) => setSwpReturn(clampNum(Number(e.target.value), 0, 25))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  max={25}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>

              <Field label="Withdrawal period (years)">
                <input
                  type="number"
                  value={swpYears}
                  onChange={(e) => setSwpYears(clampInt(Number(e.target.value), 1, 100))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={1}
                  max={100}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Inflation rate (%)">
                <input
                  type="number"
                  value={swpInflationRate}
                  onChange={(e) => setSwpInflationRate(clampNum(Number(e.target.value), 0, 30))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>

              <Field label="Tax drag (%)">
                <input
                  type="number"
                  value={swpTaxDrag}
                  onChange={(e) => setSwpTaxDrag(clampNum(Number(e.target.value), 0, 10))}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                />
              </Field>
            </div>

            <div className="grid gap-3 p-4 pt-0 sm:grid-cols-3 sm:p-5 sm:pt-0">
              <ResultBox label="Corpus" value={money(swpCorpus)} />
              <ResultBox label="Initial monthly SWP" value={
  !Number.isFinite(swpInitialWithdrawal) || swpInitialWithdrawal <= 0
    ? "Invalid"
    : money(swpInitialWithdrawal)
} note="Before annual inflation step" />
              <ResultBox label="Planned horizon" value={yearsLabel(swpYears)} />
            </div>

            {swpWarn ? (
              <div className="px-4 pb-4 sm:px-5">
                <WarningCallout text={swpWarn} />
              </div>
            ) : null}

            <div className="px-4 pb-4 sm:px-5">
              <InfoCallout
                title="Model note"
                text="This SWP model applies a simplified tax drag to return and increases withdrawals once per year for readability."
              />
            </div>
          </section>

          <section className={shellClass}>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <SectionHeader
                title="SWP balance forecast"
                subtitle="Remaining balance after withdrawals, growth, inflation, and tax drag."
                icon={BarChart3}
              />
            </div>

            <div className="p-4 sm:p-5">
              {swpSeries.length > 0 ? (
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
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                  No data
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}