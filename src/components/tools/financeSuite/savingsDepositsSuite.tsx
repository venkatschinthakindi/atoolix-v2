"use client";

import { useMemo, useRef, useState } from "react";
import { FinanceChart } from "./financeChart";
import { FinancePdfExport } from "./financePdfExport";
import { Field } from "@/components/ui/field";

const formatCurrency = (value: number) => {
  if (Number.isNaN(value) || !Number.isFinite(value)) return "-";
  return `₹ ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

function calculateCompound(amount: number, rate: number, years: number, frequency: number) {
  const periodic = rate / 100 / frequency;
  return amount * Math.pow(1 + periodic, frequency * years);
}

function calculateRd(monthly: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (r === 0) return monthly * months;
  return monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
}

function buildCompoundSeries(amount: number, rate: number, years: number, frequency: number) {
  const series: number[] = [];
  for (let year = 1; year <= years; year += 1) {
    series.push(calculateCompound(amount, rate, year, frequency));
  }
  return series;
}

function buildFdSeries(amount: number, rate: number, years: number) {
  return buildCompoundSeries(amount, rate, years, 12);
}

function buildRdSeries(monthly: number, annualRate: number, months: number) {
  const series: number[] = [];
  for (let month = 1; month <= months; month += 1) {
    series.push(calculateRd(monthly, annualRate, month));
  }
  return series;
}

export default function SavingsDepositsSuite() {
  const [activeTab, setActiveTab] = useState<"simple" | "compound" | "deposits">("simple");
  const [principal, setPrincipal] = useState(100000);
  const [simpleRate, setSimpleRate] = useState(6);
  const [simpleYears, setSimpleYears] = useState(3);
  const [compoundRate, setCompoundRate] = useState(7);
  const [compoundYears, setCompoundYears] = useState(5);
  const [compoundFrequency, setCompoundFrequency] = useState(4);
  const [depositMode, setDepositMode] = useState<"fd" | "rd">("fd");
  const [fdAmount, setFdAmount] = useState(200000);
  const [fdRate, setFdRate] = useState(6.5);
  const [fdYears, setFdYears] = useState(4);
  const [rdAmount, setRdAmount] = useState(5000);
  const [rdRate, setRdRate] = useState(6);
  const [rdMonths, setRdMonths] = useState(60);

  const simpleInterest = useMemo(() => principal * (simpleRate / 100) * simpleYears, [principal, simpleRate, simpleYears]);
  const compoundValue = useMemo(() => calculateCompound(principal, compoundRate, compoundYears, compoundFrequency), [principal, compoundRate, compoundYears, compoundFrequency]);
  const fdValue = useMemo(() => calculateCompound(fdAmount, fdRate, fdYears, 12), [fdAmount, fdRate, fdYears]);
  const rdValue = useMemo(() => calculateRd(rdAmount, rdRate, rdMonths), [rdAmount, rdRate, rdMonths]);

  const exportRef = useRef<HTMLDivElement | null>(null);
  const yearLabels = useMemo(() => Array.from({ length: Math.max(simpleYears, compoundYears, fdYears) }, (_, index) => `Year ${index + 1}`), [simpleYears, compoundYears, fdYears]);
  const rdLabels = useMemo(() => Array.from({ length: rdMonths }, (_, index) => `Month ${index + 1}`), [rdMonths]);
  const compoundSeries = useMemo(() => buildCompoundSeries(principal, compoundRate, compoundYears, compoundFrequency), [principal, compoundRate, compoundYears, compoundFrequency]);
  const fdSeries = useMemo(() => buildFdSeries(fdAmount, fdRate, fdYears), [fdAmount, fdRate, fdYears]);
  const rdSeries = useMemo(() => buildRdSeries(rdAmount, rdRate, rdMonths), [rdAmount, rdRate, rdMonths]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="justify-center tab-group mx-auto">
                <div className="flex gap-2 flex-wrap justify-center">
                    {[
                    { id: "simple", label: "Simple Interest" },
                    { id: "compound", label: "Compound Interest" },
                    { id: "deposits", label: "FD & RD Planner" },
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

        <div ref={exportRef} className="space-y-6">
            {activeTab === "simple" && (
                <div className="space-y-6">
                <h1 data-export-title className="text-lg text-white/70">
                    Simple interest calculator
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Principal">
                        <input
                        type="number"
                        value={principal}
                        onChange={(event: any) =>  setPrincipal(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        />
                    </Field>
                    <Field label="Rate (%)">
                        <input
                        type="number"
                        value={simpleRate}
                        onChange={(event: any) =>  setSimpleRate(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        step={0.1}
                        />
                    </Field>
                    <Field label="Duration (years)">
                        <input
                        type="number"
                        value={simpleYears}
                        onChange={(event: any) =>  setSimpleYears(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={1}
                        />
                    </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                    <div className="text-xs text-white/60">Total interest</div>
                    <div className="mt-1 text-lg text-white">{formatCurrency(simpleInterest)}</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                    <div className="text-sm text-white/60">Principal</div>
                    <div className="mt-1 text-lg text-white">{formatCurrency(principal)}</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                    <div className="text-sm text-white/60">Maturity value</div>
                    <div className="mt-1 text-lg text-white">{formatCurrency(principal + simpleInterest)}</div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-surface p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg text-white/60 font-semibold">Simple interest overview</h3>
                        </div>
                    </div>
                    <div className="mt-6" ref={exportRef} data-export-chart>
                    <FinanceChart
                        labels={yearLabels.slice(0, simpleYears)}
                        datasets={[
                        {
                            label: "Principal",
                            data: Array.from({ length: simpleYears }, () => principal),
                            color: "rgba(34,197,94,0.8)",
                            // backgroundColor: "rgba(34,197,94,0.2)",
                        },
                        {
                            label: "Maturity value",
                            data: Array.from({ length: simpleYears }, (_, index) => principal + simpleInterest * ((index + 1) / simpleYears)),
                            color: "rgba(59,130,246,0.8)",
                            // backgroundColor: "rgba(59,130,246,0.2)",
                        },
                        ]}
                    />
                    </div>
                </div>
                </div>
            )}

            {activeTab === "compound" && (
                <div className="space-y-6">
                <h1 data-export-title className="text-lg text-white/70">
                    Compound interest calculator
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Principal">
                        <input
                        type="number"
                        value={principal}
                        onChange={(event) =>  setPrincipal(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        />
                    </Field>
                    <Field label="Rate (%)">
                        <input
                        type="number"
                        value={compoundRate}
                        onChange={(event) =>  setCompoundRate(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        step={0.1}
                        />
                    </Field>
                    <Field label="Duration (years)">
                        <input
                        type="number"
                        value={compoundYears}
                        onChange={(event) =>  setCompoundYears(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        step={0.1}
                        />
                    </Field>
                    <Field label="Frequency">
                        <select
                            value={compoundFrequency}
                            onChange={(event) => setCompoundFrequency(Number(event.target.value))}
                            className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        >
                            <option value={1}>Annually</option>
                            <option value={2}>Semi-annually</option>
                            <option value={4}>Quarterly</option>
                            <option value={12}>Monthly</option>
                        </select>
                    </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-xs text-white/60">Principal</div>
                        <div className="mt-1 text-lg text-white">{formatCurrency(principal)}</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-sm text-white/60">Maturity value</div>
                        <div className="mt-1 text-lg text-white">{formatCurrency(compoundValue)}</div>
                    </div>
                    <div className="rounded-md bg-gray-900 p-3" data-export-result>
                        <div className="text-sm text-white/60">Compound gain</div>
                        <div className="mt-1 text-lg text-white">{formatCurrency(compoundValue - principal)}</div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-surface p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg text-white/60 font-semibold">Compound interest projection</h3>
                        </div>
                    </div>
                    <div className="mt-6" ref={exportRef} data-export-chart>
                    <FinanceChart
                        labels={yearLabels.slice(0, compoundYears)}
                        datasets={[
                        {
                            label: "Projected value",
                            data: compoundSeries,
                            color: "rgba(59,130,246,0.8)",
                            // backgroundColor: "rgba(59,130,246,0.2)",
                        },
                        ]}
                    />
                    </div>
                </div>
                </div>
            )}

            {activeTab === "deposits" && (
                <div className="space-y-6">
                <div className="flex flex-wrap gap-3 justify-center">
                    {[
                    { id: "fd", label: "Fixed Deposit" },
                    { id: "rd", label: "Recurring Deposit" },
                    ].map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setDepositMode(mode.id as any)}
                        className={`tab-button ${depositMode === mode.id ? "tab-button-active" : ""}`}
                    >
                        {mode.label}
                    </button>
                    ))}
                </div>

                {depositMode === "fd" ? (
                    <div className="space-y-6">
                    <h1 data-export-title className="text-lg text-white/70">
                        Fixed deposit planner
                    </h1>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Deposit amount">
                        <input
                        type="number"
                        value={fdAmount}
                        onChange={(event) =>  setFdAmount(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        />
                        </Field>
                        <Field label="Interest rate (%)">
                        <input
                        type="number"
                        value={fdRate}
                        onChange={(event) =>  setFdRate(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        step={0.1}
                        />
                        </Field>
                        <Field label="Duration (years)">
                        <input
                        type="number"
                        value={fdYears}
                        onChange={(event) =>  setFdYears(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={1}
                        />
                        </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-md bg-gray-900 p-3" data-export-result>
                            <div className="text-xs text-white/60">Deposit</div>
                            <div className="mt-1 text-lg text-white">{formatCurrency(fdAmount)}</div>
                        </div>
                        <div className="rounded-md bg-gray-900 p-3" data-export-result>
                            <div className="text-xs text-white/60">Maturity value</div>
                            <div className="mt-1 text-lg text-white">{formatCurrency(fdValue)}</div>
                        </div>
                        <div className="rounded-md bg-gray-900 p-3" data-export-result>
                            <div className="text-xs text-white/60">Interest earned</div>
                            <div className="mt-1 text-lg text-white">{formatCurrency(fdValue - fdAmount)}</div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-surface p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg text-white/60 font-semibold">FD growth projection</h3>
                            </div>
                        </div>
                        <div className="mt-6" ref={exportRef} data-export-chart>
                        <FinanceChart
                            labels={yearLabels.slice(0, fdYears)}
                            datasets={[
                            {
                                label: "Maturity value",
                                data: fdSeries,
                                color: "rgba(14,165,233,0.8)",
                                // backgroundColor: "rgba(14,165,233,0.2)",
                            },
                            ]}
                        />
                        </div>
                    </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                    <h1 className="block text-lg text-white/80" data-export-title>
                        Recurring deposit 
                    </h1>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Monthly deposit">
                        <input
                        type="number"
                        value={rdAmount}
                        onChange={(event) =>  setRdAmount(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        />
                        </Field>
                        <Field label="Rate (%)">
                        <input
                        type="number"
                        value={rdRate}
                        onChange={(event) =>  setRdRate(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        step={0.1}
                        />
                        </Field>
                        <Field label="Term (months)">
                        <input
                        type="number"
                        value={rdMonths}
                        onChange={(event) =>  setRdMonths(Number(event.target.value))}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                        min={0}
                        step={0.1}
                        />
                        </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-md bg-gray-900 p-3" data-export-result>
                            <div className="text-xs text-white/60">Total invested</div>
                            <div className="mt-1 text-lg text-white">{formatCurrency(rdAmount * rdMonths)}</div>
                        </div>
                        <div className="rounded-md bg-gray-900 p-3" data-export-result>
                            <div className="text-xs text-white/60">Maturity value</div>
                            <div className="mt-1 text-lg text-white">{formatCurrency(rdValue)}</div>
                        </div>
                        <div className="rounded-md bg-gray-900 p-3" data-export-result>
                            <div className="text-xs text-white/60">Interest earned</div>
                            <div className="mt-1 text-lg text-white">{formatCurrency(rdValue - rdAmount * rdMonths)}</div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-surface p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg text-white/60 font-semibold">RD maturity projection</h3>
                            </div>
                        </div>
                        <div className="mt-6" ref={exportRef} data-export-chart>
                        <FinanceChart
                            labels={rdLabels}
                            datasets={[
                            {
                                label: "Maturity value",
                                data: rdSeries,
                                color: "rgba(16,185,129,0.8)",
                                // backgroundColor: "rgba(16,185,129,0.2)",
                            },
                            ]}
                        />
                        </div>
                    </div>
                    </div>
                )}
                </div>
            )}
        </div>
    </div>
  );
}
