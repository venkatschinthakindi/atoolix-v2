"use client";

import { useMemo, useRef, useState } from "react";
import { FinanceChart } from "@/components/tools/financeSuite/financeChart";
import { FinancePdfExport } from "@/components/tools/financeSuite/financePdfExport";
import { Field } from "@/components/ui/field";
import { formatCurrency } from "@/utility/formatCurrencyUtility";

function calculateMonthlySavings(goal: number, current: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const periods = years * 12;
  const futureCurrent = current * Math.pow(1 + r, periods);
  const required = goal - futureCurrent;
  if (required <= 0) return 0;
  const factor = (Math.pow(1 + r, periods) - 1) / r;
  return required / factor;
}

function calculateFireTarget(annualExpense: number, withdrawalRate: number) {
  if (withdrawalRate <= 0) return 0;
  return annualExpense / (withdrawalRate / 100);
}

function calculateYearsToGoal(current: number, monthlyContribution: number, annualRate: number, target: number) {
  const r = annualRate / 100 / 12;
  let balance = current;
  let months = 0;
  while (balance < target && months < 600) {
    balance = balance * (1 + r) + monthlyContribution;
    months += 1;
  }
  return months;
}

function calculateSwpWithdrawal(corpus: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  if (r === 0) return corpus / n;
  return corpus * (r / (1 - Math.pow(1 + r, -n)));
}

function buildRetirementSeries(currentSavings: number, monthlyContribution: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const series: number[] = [];
  let balance = currentSavings;
  for (let month = 1; month <= years * 12; month += 1) {
    balance = balance * (1 + r) + monthlyContribution;
    if (month % 12 === 0) {
      series.push(balance);
    }
  }
  return series;
}

function buildFireSeries(currentSavings: number, monthlyContribution: number, annualRate: number, years: number) {
  return buildRetirementSeries(currentSavings, monthlyContribution, annualRate, years);
}

function buildSwpSeries(corpus: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const monthly = calculateSwpWithdrawal(corpus, annualRate, years);
  const series: number[] = [];
  let balance = corpus;
  for (let month = 1; month <= n; month += 1) {
    balance = balance * (1 + r) - monthly;
    if (month % 12 === 0) {
      series.push(Math.max(balance, 0));
    }
  }
  return series;
}

export default function RetirementWealthSuite() {
  const [activeTab, setActiveTab] = useState<"retirement" | "fire" | "swp">("retirement");
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [annualNeed, setAnnualNeed] = useState(120000);
  const [fireSavings, setFireSavings] = useState(500000);
  const [fireContribution, setFireContribution] = useState(15000);
  const [fireReturn, setFireReturn] = useState(8);
  const [swpCorpus, setSwpCorpus] = useState(1500000);
  const [swpReturn, setSwpReturn] = useState(7);
  const [swpYears, setSwpYears] = useState(20);

  const retirementYears = Math.max(0, retirementAge - currentAge);
  const retirementTarget = useMemo(() => calculateFireTarget(annualNeed, 4), [annualNeed]);
  const retirementMonthly = useMemo(() => calculateMonthlySavings(retirementTarget, currentSavings, expectedReturn, retirementYears), [retirementTarget, currentSavings, expectedReturn, retirementYears]);
  const fireTarget = useMemo(() => calculateFireTarget(annualNeed, 4), [annualNeed]);
  const fireMonths = useMemo(() => calculateYearsToGoal(fireSavings, fireContribution, fireReturn, fireTarget), [fireSavings, fireContribution, fireReturn, fireTarget]);
  const fireYears = useMemo(() => Math.ceil(fireMonths / 12), [fireMonths]);
  const swpMonthly = useMemo(() => calculateSwpWithdrawal(swpCorpus, swpReturn, swpYears), [swpCorpus, swpReturn, swpYears]);

  const exportRef = useRef<HTMLDivElement | null>(null);
  const retirementSeries = useMemo(
    () => buildRetirementSeries(currentSavings, monthlyContribution, expectedReturn, retirementYears),
    [currentSavings, monthlyContribution, expectedReturn, retirementYears]
  );
  const fireSeries = useMemo(
    () => buildFireSeries(fireSavings, fireContribution, fireReturn, fireYears),
    [fireSavings, fireContribution, fireReturn, fireYears]
  );
  const swpSeries = useMemo(() => buildSwpSeries(swpCorpus, swpReturn, swpYears), [swpCorpus, swpReturn, swpYears]);
  const retirementLabels = useMemo(() => Array.from({ length: retirementYears }, (_, index) => `Year ${index + 1}`), [retirementYears]);
  const fireLabels = useMemo(() => Array.from({ length: fireYears }, (_, index) => `Year ${index + 1}`), [fireYears]);
  const swpLabels = useMemo(() => Array.from({ length: swpYears }, (_, index) => `Year ${index + 1}`), [swpYears]);

const money = (value: number) =>
  `Rs. ${value.toLocaleString('en-IN', {
    maximumFractionDigits: 0
  })}`;
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="justify-center tab-group mx-auto">
                <div className="flex gap-2 flex-wrap justify-center">
                    {[
                    { id: "retirement", label: "Retirement Planner" },
                    { id: "fire", label: "FIRE Calculator" },
                    { id: "swp", label: "SWP Planner" },
                    ].map((tab) => (
                        <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`tab-button ${activeTab === tab.id ? "tab-button-active" : ""}`}
                        >
                        {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <FinancePdfExport />
        </div>
        <div  className="space-y-6">
            {activeTab === "retirement" && (
                <div className="space-y-6">
                <h1 data-export-title className="text-lg text-white/70">
                    Plan your retirement savings and see how your corpus grows over time.
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Current age">
                        <input
                            type="number"
                            value={currentAge}
                            onChange={(event: any) =>  setCurrentAge(Number(event.target.value))}
                            className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                            min={18}
                            />
                    </Field>
                    <Field label="Retirement age">
                        <input
                        type="number"
                        value={retirementAge}
                        onChange={(event: any) =>  setRetirementAge(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={currentAge + 1}
                        />
                    </Field>
                    <Field label="Current savings">
                        <input
                        type="number"
                        value={currentSavings}
                        onChange={(event: any) =>  setCurrentSavings(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        />
                    </Field>
                    <Field label="Monthly contribution">
                        <input
                        type="number"
                        value={monthlyContribution}
                        onChange={(event: any) =>  setMonthlyContribution(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        />
                    </Field>
                    <Field label="Expected return (%)">
                        <input
                        type="number"
                        value={expectedReturn}
                        onChange={(event: any) =>  setExpectedReturn(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        step={0.1}
                        />
                    </Field>
                    <Field label="Annual retirement need">
                        <input
                        type="number"
                        value={annualNeed}
                        onChange={(event: any) =>  setAnnualNeed(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        step={0.1}
                        />
                    </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-xs text-white/60">Retirement horizon</div>
                        <div className="mt-1 text-lg text-white">{retirementYears} years</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-xs text-white/60">Target corpus</div>
                        <div className="mt-1 text-lg text-white">{formatCurrency(retirementTarget)}</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-xs text-white/60">Required monthly savings</div>
                        <div className="mt-1 text-lg text-white">{formatCurrency(retirementMonthly)}</div>
                    </div>
                </div>

                 <div className="rounded-xl border border-white/10 bg-surface p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg text-white/60 font-semibold">Retirement savings projection</h3>
                        </div>
                    </div>
                    <div className="mt-6" ref={exportRef} data-export-chart>
                    <FinanceChart
                        labels={retirementLabels}
                        datasets={[
                        {
                            label: "Projected savings",
                            data: retirementSeries,
                            color: "rgba(59,130,246,0.8)",
                            // backgroundColor: "rgba(59,130,246,0.2)",
                        },
                        ]}
                    />
                    </div>
                </div>
                </div>
            )}

            {activeTab === "fire" && (
                <div className="space-y-6">
                <h1 data-export-title className="text-lg text-white/70">
                    Calculate your FIRE (Financial Independence, Retire Early) target and see how soon you can achieve it.
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Current savings">
                        <input
                        type="number"
                        value={fireSavings}
                        onChange={(event) =>  setFireSavings(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        />
                    </Field>
                    <Field label="Monthly savings">
                        <input
                            type="number"
                            value={fireContribution}
                        onChange={(event) => setFireContribution(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                    />
                    </Field>
                     <Field label="Expected return (%)">
                        <input
                            type="number"
                            value={fireReturn}
                            onChange={(event) => setFireReturn(Number(event.target.value))}
                            className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                            min={0}
                            step={0.1}
                        />
                    </Field>
                    <Field label="Annual retirement expense">
                        <input
                            type="number"
                            value={annualNeed}
                            onChange={(event) => setAnnualNeed(Number(event.target.value))}
                            className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                            min={0}
                        />
                    </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-xs text-white/60">FIRE target</div>
                        <div className="mt-1 text-lg text-white">{formatCurrency(fireTarget)}</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-sm text-white/60">Years to reach goal</div>
                        <div className="mt-1 text-lg text-white">{fireYears === 0 ? "Already reached" : `${fireYears} years`}</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-sm text-white/60">Annual withdrawal rate</div>
                        <div className="mt-1 text-lg text-white">4.00%</div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-surface p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg text-white/60 font-semibold">FIRE goal projection</h3>
                        </div>
                    </div>
                    <div className="mt-6" ref={exportRef} data-export-chart>
                    <FinanceChart 
                        labels={fireLabels}
                        datasets={[
                        {
                            label: "Estimated portfolio value",
                            data: fireSeries,
                            color: "rgba(34,197,94,0.8)",
                            // backgroundColor: "rgba(34,197,94,0.2)",
                        },
                        ]}
                    />
                    </div>
                </div>
                </div>
            )}

            {activeTab === "swp" && (
                <div className="space-y-6">
                    <h1 data-export-title className="text-lg text-white/70">
                        Calculate your Social Welfare Pension (SWP) target and see how soon you can achieve it.
                    </h1>
                    <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Corpus available">
                        <input
                            type="number"
                            value={swpCorpus}
                        onChange={(event) => setSwpCorpus(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                    />
                    </Field>
                    <Field label="Expected return (%)">
                        <input
                            type="number"
                            value={swpReturn}
                            onChange={(event) => setSwpReturn(Number(event.target.value))}
                            className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                            min={0}
                            step={0.1}
                        />
                    </Field>
                    <Field label="Withdrawal period (years)">
                        <input
                            type="number"
                            value={swpYears}
                            onChange={(event) => setSwpYears(Number(event.target.value))}
                            className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                            min={1}
                        />
                    </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-sm text-white/60">Corpus</div>
                        <div className="mt-1 text-lg text-white">{formatCurrency(swpCorpus)}</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-sm text-white/60">Monthly SWP</div>
                        <div className="mt-1 text-lg text-white">{formatCurrency(swpMonthly)}</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-sm text-white/60">Planned horizon</div>
                        <div className="mt-1 text-lg text-white">{swpYears} years</div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-surface p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg text-white/60 font-semibold">SWP balance forecast</h3>
                            </div>
                        </div>
                    <div className="mt-6" ref={exportRef} data-export-chart>
                    <FinanceChart
                        labels={swpLabels}
                        datasets={[
                        {
                            label: "Remaining balance",
                            data: swpSeries,
                            color: "rgba(245,158,11,0.8)",
                            // backgroundColor: "rgba(245,158,11,0.2)",
                        },
                        ]}
                    />
                    </div>
                </div>
                </div>
            )}
        </div>
    </div>
  );
}
