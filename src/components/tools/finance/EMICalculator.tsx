"use client";

import React, { useMemo, useState } from "react";
import AmortizationChart from "./AmortizationChart";

type LoanType = "home" | "personal" | "car";

function formatNumber(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function computeEMI(principal: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / months;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return emi;
}

function amortizationSchedule(
  principal: number,
  annualRatePct: number,
  months: number,
  extraMonthly = 0,
  lump?: { amount: number; month: number }
) {
  const monthlyRate = annualRatePct / 12 / 100;
  let balance = principal;
  const emi = computeEMI(principal, annualRatePct, months);
  const labels: string[] = [];
  const principalRemaining: number[] = [];
  const cumulativeInterest: number[] = [];
  let cumInterest = 0;
  let m = 1;
  const maxIter = Math.max(months * 2, 600);
  let totalPaid = 0;

  while (balance > 0.5 && m <= maxIter) {
    const interest = balance * monthlyRate;
    let payment = emi + extraMonthly;
    if (balance + interest <= payment) {
      payment = balance + interest;
    }

    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    totalPaid += payment;

    if (lump && lump.amount > 0 && lump.month === m) {
      const lumpPay = Math.min(lump.amount, balance);
      balance = Math.max(0, balance - lumpPay);
      totalPaid += lumpPay;
    }

    cumInterest += interest;
    labels.push(String(m));
    principalRemaining.push(balance);
    cumulativeInterest.push(cumInterest);
    m++;
  }

  const monthsUsed = labels.length;
  const totalPayment = totalPaid;
  return { labels, principalRemaining, cumulativeInterest, emi, monthsUsed, totalPayment };
}

export default function EMICalculator({ defaultType = "home" }: { defaultType?: LoanType }) {
  const [loanType, setLoanType] = useState<LoanType>(defaultType);
  const [principal, setPrincipal] = useState<number>(3000000);
  const [annualRate, setAnnualRate] = useState<number>(7.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const [extraMonthly, setExtraMonthly] = useState<number>(0);
  const [lumpSum, setLumpSum] = useState<number>(0);
  const [lumpMonth, setLumpMonth] = useState<number>(12);
  const [compareEnabled, setCompareEnabled] = useState<boolean>(true);

  const [prepayOpen, setPrepayOpen] = useState<boolean>(false);
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);
  const [showBasePrincipal, setShowBasePrincipal] = useState<boolean>(true);
  const [showBaseInterest, setShowBaseInterest] = useState<boolean>(true);
  const [showPrepayPrincipal, setShowPrepayPrincipal] = useState<boolean>(true);
  const [showPrepayInterest, setShowPrepayInterest] = useState<boolean>(true);

  const months = tenureYears * 12;

  const base = useMemo(() => amortizationSchedule(principal, annualRate, months), [principal, annualRate, months]);
  const adjusted = useMemo(() => amortizationSchedule(principal, annualRate, months, extraMonthly, { amount: lumpSum, month: lumpMonth }), [principal, annualRate, months, extraMonthly, lumpSum, lumpMonth]);

  const monthsSaved = Math.max(0, base.monthsUsed - adjusted.monthsUsed);
  const interestSaved = Math.max(0, (base.cumulativeInterest.at(-1) ?? 0) - (adjusted.cumulativeInterest.at(-1) ?? 0));
  const totalPaymentDiff = Math.max(0, (base.totalPayment ?? base.emi * base.monthsUsed) - (adjusted.totalPayment ?? adjusted.emi * adjusted.monthsUsed));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex gap-2 flex-wrap justify-center">
        {(["home", "personal", "car"] as LoanType[]).map((t) => (
          <button
            key={t}
            onClick={() => setLoanType(t)}
            className={`tab-button ${loanType === t ? "tab-button-active" : ""}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)} Loan
          </button>
        ))}
      </div>

      <div className="min-h-[60px] p-1">
        <div className="text-sm text-white/70">Estimated Monthly EMI</div>
        <div className="text-3xl font-semibold mt-2">₹ {formatNumber(base.emi)}</div>
        <div className="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-2">
          <div className="rounded-md bg-gray-900 p-3">
            <div className="text-xs text-white/60">Total Interest</div>
            <div className="mt-1 text-lg text-white">₹ {formatNumber(base.cumulativeInterest.at(-1) ?? 0)}</div>
          </div>
          <div className="rounded-md bg-gray-900 p-3">
            <div className="text-xs text-white/60">Total Payment</div>
            <div className="mt-1 text-lg text-white">₹ {formatNumber(base.totalPayment ?? base.emi * base.monthsUsed)}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-white/80">Loan Amount</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-white/80">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-white/80">Tenure (years)</label>
          <input
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
          />
        </div>

        <div>
          <button
            onClick={() => setPrepayOpen(!prepayOpen)}
            className="w-full flex items-center justify-between rounded-md bg-gray-900 p-3 text-left"
          >
            <div>
              <div className="text-sm text-white/80">Prepayment Options</div>
              <div className="text-xs text-white/60">Extra monthly payments or one-time lump sum</div>
            </div>
            <div className="text-white/60">{prepayOpen ? "−" : "+"}</div>
          </button>

          {prepayOpen && (
            <div className="mt-3 space-y-3">
              <div className="space-y-2">
                <label className="block text-sm text-white/80">Extra Monthly Payment</label>
                <input
                  type="number"
                  value={extraMonthly}
                  onChange={(e) => setExtraMonthly(Number(e.target.value))}
                  className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-white/80">One-time Lump Sum</label>
                <input
                  type="number"
                  value={lumpSum}
                  onChange={(e) => setLumpSum(Number(e.target.value))}
                  className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-white/80">Lump Month</label>
                <input
                  type="number"
                  min={1}
                  max={months}
                  value={lumpMonth}
                  onChange={(e) => setLumpMonth(Number(e.target.value))}
                  className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="compare"
                  type="checkbox"
                  checked={compareEnabled}
                  onChange={(e) => setCompareEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-900 text-white"
                />
                <label htmlFor="compare" className="text-sm text-white/70">
                  Show comparison (base vs with prepayment)
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => setPrincipal(principal)}
          className="w-full rounded-md bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-500 transition"
        >
          Recalculate
        </button>

        <div className="rounded-md border border-gray-600 bg-gray-800 p-4">
          <div className="text-sm text-white/70 mb-2">With Prepayment Summary</div>
          {extraMonthly > 0 || lumpSum > 0 ? (
            <div className="space-y-2">
              <div className="text-sm text-white/70">Monthly Payment With Prepay</div>
              <div className="text-lg text-white">₹ {formatNumber(adjusted.emi + extraMonthly)}</div>
              <div className="text-sm text-white/70">Interest Saved</div>
              <div className="text-lg text-white">₹ {formatNumber(interestSaved)}</div>
              <div className="text-sm text-white/70">Months Saved</div>
              <div className="text-lg text-white">{monthsSaved}</div>
              <div className="text-sm text-white/70">Total Payment Reduced</div>
              <div className="text-lg text-white">₹ {formatNumber(totalPaymentDiff)}</div>
            </div>
          ) : (
            <div className="text-sm text-white/60">No prepayments applied. Open Prepayment Options to add extras.</div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/70 mb-3">Amortization Overview</div>
          <div className="flex gap-3 items-center">
            <label className="text-sm text-white/70">Show</label>
            <label className="text-sm text-white/70 flex items-center gap-2"><input type="checkbox" checked={showBasePrincipal} onChange={(e) => setShowBasePrincipal(e.target.checked)} /> Base Principal</label>
            <label className="text-sm text-white/70 flex items-center gap-2"><input type="checkbox" checked={showBaseInterest} onChange={(e) => setShowBaseInterest(e.target.checked)} /> Base Interest</label>
            {compareEnabled && (
              <>
                <label className="text-sm text-white/70 flex items-center gap-2"><input type="checkbox" checked={showPrepayPrincipal} onChange={(e) => setShowPrepayPrincipal(e.target.checked)} /> Prepay Principal</label>
                <label className="text-sm text-white/70 flex items-center gap-2"><input type="checkbox" checked={showPrepayInterest} onChange={(e) => setShowPrepayInterest(e.target.checked)} /> Prepay Interest</label>
              </>
            )}
          </div>
        </div>
        <div className="rounded-md border border-gray-700 bg-gray-800 p-4">
          <div style={{ minHeight: 360 }}>
            <AmortizationChart
              labels={base.labels}
              principalSeries={base.principalRemaining}
              interestSeries={base.cumulativeInterest}
              principalSeriesB={compareEnabled ? adjusted.principalRemaining : undefined}
              interestSeriesB={compareEnabled ? adjusted.cumulativeInterest : undefined}
              showBasePrincipal={showBasePrincipal}
              showBaseInterest={showBaseInterest}
              showPrepayPrincipal={showPrepayPrincipal}
              showPrepayInterest={showPrepayInterest}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border border-gray-700 bg-gray-800 p-4 overflow-auto">
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/70 mb-3">
          { showFullSchedule ? "Full Schedule - Base / With Prepay" : "Schedule (First 12 months) - Base / With Prepay" }
          
          </div>
          <button onClick={() => setShowFullSchedule(!showFullSchedule)} className="text-sm text-white/70 underline">{showFullSchedule ? "Hide full schedule" : "View full schedule"}</button>
        </div>
      {
      !showFullSchedule && (
        <div className="mb-3">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-white/60">
                <th className="pb-2">#</th>
                <th className="pb-2">Base Principal</th>
                <th className="pb-2">Prepay Principal</th>
                <th className="pb-2">Base Cum Interest</th>
                <th className="pb-2">Prepay Cum Interest</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.min(12, base.labels.length) }).map((_, idx) => (
                <tr key={idx} className="border-t border-white/5">
                  <td className="py-2">{idx + 1}</td>
                  <td className="py-2">₹ {formatNumber(base.principalRemaining[idx] ?? 0)}</td>
                  <td className="py-2">₹ {formatNumber(adjusted.principalRemaining[idx] ?? 0)}</td>
                  <td className="py-2">₹ {formatNumber(base.cumulativeInterest[idx] ?? 0)}</td>
                  <td className="py-2">₹ {formatNumber(adjusted.cumulativeInterest[idx] ?? 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {showFullSchedule && (
          <div className="max-h-80 overflow-auto smooth-scroll border-t border-white/5 pt-3">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-white/60">
                  <th className="pb-2">Month</th>
                  <th className="pb-2">Base Principal</th>
                  <th className="pb-2">Prepay Principal</th>
                  <th className="pb-2">Base Cum Interest</th>
                  <th className="pb-2">Prepay Cum Interest</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(base.labels.length, adjusted.labels.length) }).map((_, idx) => (
                  <tr key={idx} className="border-t border-white/5">
                    <td className="py-2">{idx + 1}</td>
                    <td className="py-2">{base.principalRemaining[idx] !== undefined ? `₹ ${formatNumber(base.principalRemaining[idx])}` : "-"}</td>
                    <td className="py-2">{adjusted.principalRemaining[idx] !== undefined ? `₹ ${formatNumber(adjusted.principalRemaining[idx])}` : "-"}</td>
                    <td className="py-2">{base.cumulativeInterest[idx] !== undefined ? `₹ ${formatNumber(base.cumulativeInterest[idx])}` : "-"}</td>
                    <td className="py-2">{adjusted.cumulativeInterest[idx] !== undefined ? `₹ ${formatNumber(adjusted.cumulativeInterest[idx])}` : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
