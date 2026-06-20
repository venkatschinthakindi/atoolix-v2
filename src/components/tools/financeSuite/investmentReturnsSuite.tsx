"use client";

import { useMemo, useRef, useState } from "react";
import { FinanceChart } from "@/components/tools/financeSuite/financeChart";
import { FinancePdfExport } from "@/components/tools/financeSuite/financePdfExport";
import { Field } from "@/components/ui/field";

const formatCurrency = (value: number) => {
  if (Number.isNaN(value) || !Number.isFinite(value)) return "-";
  return `₹ ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

const formatPercent = (value: number) => {
  if (Number.isNaN(value) || !Number.isFinite(value)) return "-";
  return `${value.toFixed(2)}%`;
};

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

function calculateRdValue(monthlyDeposit: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (r === 0) {
    return monthlyDeposit * months;
  }
  return monthlyDeposit * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
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

function xnpv(rate: number, cashflows: { amount: number; date: string }[]) {
  const firstDate = new Date(cashflows[0].date).getTime();
  return cashflows.reduce((sum, flow) => {
    const dt = (new Date(flow.date).getTime() - firstDate) / (1000 * 60 * 60 * 24);
    return sum + flow.amount / Math.pow(1 + rate, dt / 365);
  }, 0);
}

function xirr(cashflows: { amount: number; date: string }[]) {
  let guess = 0.1;
  const maxIterations = 60;
  for (let i = 0; i < maxIterations; i += 1) {
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

export default function InvestmentReturnsSuite() {
  const [activeTab, setActiveTab] = useState<"sip" | "lump" | "performance">("sip");
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
  const [xirrFlows, setXirrFlows] = useState([
    { amount: -100000, date: "2024-06-01" },
    { amount: 20000, date: "2025-06-01" },
    { amount: 90000, date: "2028-06-01" },
  ]);

  const sipResult = useMemo(
    () => calculateSIPValue(sipAmount, sipRate, sipYears, sipStepUp),
    [sipAmount, sipRate, sipYears, sipStepUp]
  );

  const lumpResult = useMemo(
    () => calculateCompoundValue(lumpAmount, lumpRate, lumpYears, lumpFrequency),
    [lumpAmount, lumpRate, lumpYears, lumpFrequency]
  );

  const cagrResult = useMemo(() => {
    if (cagrStart <= 0 || cagrYears <= 0) return 0;
    return Math.pow(cagrEnd / cagrStart, 1 / cagrYears) - 1;
  }, [cagrStart, cagrEnd, cagrYears]);

  const exportRef = useRef<HTMLDivElement | null>(null);

  const basicSipResult = useMemo(
    () => calculateSIPValue(sipAmount, sipRate, sipYears, 0),
    [sipAmount, sipRate, sipYears]
  );

  const stepUpSipResult = useMemo(
    () => calculateSIPValue(sipAmount, sipRate, sipYears, sipStepUp),
    [sipAmount, sipRate, sipYears, sipStepUp]
  );

  const sipLabels = useMemo(
    () => Array.from({ length: sipYears }, (_, index) => `Year ${index + 1}`),
    [sipYears]
  );

  const lumpLabels = useMemo(
    () => Array.from({ length: lumpYears }, (_, index) => `Year ${index + 1}`),
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

  const xirrResult = useMemo(() => {
    try {
      const rate = xirr(xirrFlows);
      return Number.isFinite(rate) ? rate : 0;
    } catch {
      return 0;
    }
  }, [xirrFlows]);

  const updateFlow = (index: number, field: "amount" | "date", value: string) => {
    setXirrFlows((current) => {
      const next = [...current];
      next[index] = { ...next[index], [field]: field === "amount" ? Number(value) : value };
      return next;
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="justify-center tab-group mx-auto">
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              { id: "sip", label: "SIP Growth" },
              { id: "lump", label: "Lump Sum Returns" },
              { id: "performance", label: "CAGR & XIRR" },
            ].map((tab, index) => (

            <div ref={exportRef} key={index} className="space-y-6">
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`tab-button ${activeTab === tab.id ? "tab-button-active" : ""}`}
                >
                {tab.label}
                </button>
            </div>
            ))}
          </div>
        </div>
        <FinancePdfExport />
      </div>

    

      {activeTab === "sip" && (
        <div className="space-y-6">
          <h1 data-export-title className="text-lg text-white/70">
            SIP returns calculator
          </h1>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Monthly SIP">
              <input
                type="number"
                value={sipAmount}
                onChange={(event) =>  setSipAmount(Number(event.target.value))}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                min={0}
              />
            </Field>
            <Field label="Expected annual return (%)">
              <input
                type="number"
                value={sipRate}
                onChange={(event) => setSipRate(Number(event.target.value))}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                min={0}
                step={0.1}
              />
            </Field>
            <Field label="Investment horizon (years)">
              <input
                type="number"
                value={sipYears}
                onChange={(event) => setSipYears(Number(event.target.value))}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                min={0}
              />
            </Field>

            <Field label="Annual step-up rate (%)">
            <input
              type="number"
              value={sipStepUp}
              onChange={(event) => setSipStepUp(Number(event.target.value))}
              className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
              min={0}
              step={0.1}
            />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-gray-900 p-3" data-export-result>
              <div className="text-xs text-white/60">Total invested</div>
              <div className="mt-1 text-lg text-white">{formatCurrency(sipResult.invested)}</div>
            </div>
            <div className="rounded-md bg-gray-900 p-3" data-export-result>
              <div className="text-xs text-white/60">Future value</div>
              <div className="mt-1 text-lg text-white">{formatCurrency(sipResult.futureValue)}</div>
            </div>
            <div className="rounded-md bg-gray-900 p-3" data-export-result>
              <div className="text-xs text-white/60">Wealth gain</div>
              <div className="mt-1 text-lg text-white">{formatCurrency(sipResult.gain)}</div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-white/60 font-semibold">SIP growth comparison</h3>
                <p className="text-xs text-muted">Basic SIP vs Step-up SIP over the investment horizon.</p>
              </div>
            </div>
            <div className="mt-6" ref={exportRef} data-export-chart>
              <FinanceChart
                labels={sipLabels}
                datasets={[
                  {
                    label: "Basic SIP",
                    data: sipSeries,
                    color: "rgba(34,197,94,0.8)",
                    // fill: "rgba(34,197,94,0.2)",
                  },
                  {
                    label: "Step-up SIP",
                    data: stepUpSipSeries,
                    color: "rgba(59,130,246,0.8)",
                    // fill: "rgba(59,130,246,0.2)",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "lump" && (
        <div className="space-y-6">
          <h1 data-export-title className="text-lg text-white/70">
            Lump sum returns calculator
          </h1>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Investment amount">
              <input
                type="number"
                value={lumpAmount}
                onChange={(event) => setLumpAmount(Number(event.target.value))}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                min={0}
              />
            </Field>

            <Field label="Annual rate (%)">
              <input
                type="number"
                value={lumpRate}
                onChange={(event) => setLumpRate(Number(event.target.value))}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                min={0}
                step={0.1}
              />
            </Field>
            <Field label="Investment horizon (years)">
              <input
                type="number"
                value={lumpYears}
                onChange={(event) => setLumpYears(Number(event.target.value))}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                min={1}
              />
            </Field>
          <Field label="Compounding frequency">
              <select
                value={lumpFrequency}
                onChange={(event) => setLumpFrequency(Number(event.target.value))}
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
                <div className="text-xs text-white/60">Invested amount</div>
                <div className="mt-1 text-lg text-white">{formatCurrency(lumpAmount)}</div>
              </div>
              <div className="rounded-md bg-gray-900 p-3" data-export-result>
                <div className="text-xs text-white/60">Estimated value</div>
                <div className="mt-1 text-lg text-white">{formatCurrency(lumpResult)}</div>
              </div>
              <div className="rounded-md bg-gray-900 p-3" data-export-result>
                <div className="text-xs text-white/60">Compound gain</div>
                <div className="mt-1 text-lg text-white">{formatCurrency(lumpResult - lumpAmount)}</div>
              </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-white/60 font-semibold">Lump sum value projection</h3>
                <p className="text-xs text-muted">Track how the investment grows across your time horizon.</p>
              </div>
            </div>
            <div className="mt-6" ref={exportRef} data-export-chart>
              <FinanceChart
                labels={lumpLabels}
                datasets={[
                  {
                    label: "Projected value",
                    data: lumpSeries,
                    color: "rgba(59,130,246,0.9)",
                    // backgroundColor: "rgba(59,130,246,0.2)",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "performance" && (
        <div className="space-y-6">
          <h1 className="block text-lg text-white/80" data-export-title>CAGR calculator</h1>
            <div className="grid gap-4 md:grid-cols-2">
            <Field label="Opening value">
              <input
                type="number"
                value={cagrStart}
                onChange={(event) => setCagrStart(Number(event.target.value))}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                min={0}
              />
            </Field>
            <Field label="Ending value">
              <input
                type="number"
                value={cagrEnd}
                onChange={(event) => setCagrEnd(Number(event.target.value))}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                min={0}
              />
            </Field>

             <Field label="Period (years)">
              <input
                type="number"
                value={cagrYears}
                onChange={(event) => setCagrYears(Number(event.target.value))}
                className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                min={1}
              />
            </Field>
            </div>
            <div className="mt-4 rounded-lg bg-gray-900 p-4" data-export-result>
                <div className="block text-sm text-white/80">Compound annual growth rate (CAGR)</div>
                <div className="mt-2 text-2xl text-white">{formatPercent(cagrResult * 100)}</div>
              </div>
            <div>
              <h1 className="block text-lg text-white/80" data-export-title>XIRR calculator</h1>
              <div className="grid gap-4">
                {xirrFlows.map((flow, index) => (
                  <div key={index} className="grid gap-4 md:grid-cols-2">

                    <Field label="Amount">
                      <input
                        type="number"
                        value={flow.amount}
                        onChange={(event) => updateFlow(index, "amount", event.target.value)}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white"
                      />
                    </Field>
                    <Field label="Date">
                      <input
                        type="date"
                        value={flow.date}
                        onChange={(event) => updateFlow(index, "date", event.target.value)}
                        className="w-full p-3 rounded-md border border-gray-700 bg-gray-950/40 text-white/80"
                      />
                    </Field>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-gray-900 p-4" data-export-result>
                <div className="block text-sm text-white/80">Annualized XIRR</div>
                <div className="mt-2 text-2xl text-white">{formatPercent(xirrResult * 100)}</div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}
