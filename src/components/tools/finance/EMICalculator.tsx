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
  months: number
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
    let payment = emi;
    if (balance + interest <= payment) {
      payment = balance + interest;
    }

    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    totalPaid += payment;

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

type PrepaymentType = "monthly" | "one-time";

type PrepaymentMode = "principal" | "emi";

type PrepaymentEntry = {
  id: number;
  type: PrepaymentType;
  amount: number;
  month: number;
  mode: PrepaymentMode;
};

type PrepaymentRow = {
  month: number;
  balance: number;
  cumulativeInterest: number;
  payment: number;
  prepaymentAmount: number;
  prepaymentLabel: string;
  isEvent: boolean;
  clipped: boolean;
  currentEmi: number;
};

type PrepaymentAdjustment = {
  month: number;
  prepaymentId: number;
  type: PrepaymentType;
  mode: PrepaymentMode;
  requestedAmount: number;
  appliedAmount: number;
  capAmount: number | null;
  currentEmi: number;
  note: string;
};

function buildPrepaymentEvents(entries: PrepaymentEntry[], months: number) {
  const eventsByMonth: Record<number, PrepaymentEntry[]> = {};

  entries.forEach((entry) => {
    if (!entry.amount || entry.amount <= 0) return;

    if (entry.type === "monthly") {
      for (let m = Math.max(1, entry.month); m <= months; m++) {
        eventsByMonth[m] = [...(eventsByMonth[m] ?? []), entry];
      }
    } else if (entry.type === "one-time" && entry.month >= 1 && entry.month <= months) {
      eventsByMonth[entry.month] = [...(eventsByMonth[entry.month] ?? []), entry];
    }
  });

  return eventsByMonth;
}

function amortizationScheduleWithPrepayments(
  principal: number,
  annualRatePct: number,
  months: number,
  prepayments: PrepaymentEntry[],
  bankEmiLimitPercent: number
) {
  const monthlyRate = annualRatePct / 12 / 100;
  let balance = principal;
  let currentEmi = computeEMI(principal, annualRatePct, months);
  const labels: string[] = [];
  const principalRemaining: number[] = [];
  const cumulativeInterest: number[] = [];
  const monthRows: PrepaymentRow[] = [];
  const prepaymentMarkers: (number | null)[] = [];
  const capAdjustments: PrepaymentAdjustment[] = [];
  let cumInterest = 0;
  let totalPaid = 0;
  let m = 1;
  const maxIter = Math.max(months * 2, 600);
  const eventsByMonth = buildPrepaymentEvents(prepayments, months);

  while (balance > 0.5 && m <= maxIter) {
    const events = eventsByMonth[m] ?? [];
    const interest = balance * monthlyRate;
    let payment = currentEmi;
    let prepaymentAmount = 0;
    let prepaymentLabel = "";
    let clipped = false;

    events.forEach((event) => {
      const maxAllowed = event.mode === "emi" ? currentEmi * (bankEmiLimitPercent / 100) : event.amount;
      const actualAmount = event.mode === "emi" ? Math.min(event.amount, maxAllowed) : event.amount;
      const capAmount = event.mode === "emi" ? maxAllowed : null;
      const note = event.mode === "emi"
        ? event.amount > maxAllowed
          ? "Capped by bank limit"
          : "Within bank limit"
        : "Principal reduction";

      if (event.mode === "emi" && event.amount > maxAllowed) {
        clipped = true;
      }

      payment += actualAmount;
      prepaymentAmount += actualAmount;
      capAdjustments.push({
        month: m,
        prepaymentId: event.id,
        type: event.type,
        mode: event.mode,
        requestedAmount: event.amount,
        appliedAmount: actualAmount,
        capAmount,
        currentEmi,
        note,
      });

      const prefix = event.type === "monthly" ? "Monthly" : "One-time";
      const modeText = event.mode === "emi" ? "EMI reduction" : "Principal reduction";
      prepaymentLabel += `${prefix} ${modeText} ₹${formatNumber(actualAmount)}${event.type === "one-time" ? ` on month ${event.month}` : ` from month ${event.month}`} ; `;
    });

    if (balance + interest <= payment) {
      payment = balance + interest;
    }

    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    totalPaid += payment;
    cumInterest += interest;

    if (prepaymentAmount > 0 && balance > 0 && m < months) {
      currentEmi = computeEMI(balance, annualRatePct, months - m);
    }

    labels.push(String(m));
    principalRemaining.push(balance);
    cumulativeInterest.push(cumInterest);
    prepaymentMarkers.push(events.length > 0 ? balance : null);
    monthRows.push({
      month: m,
      balance,
      cumulativeInterest: cumInterest,
      payment,
      prepaymentAmount,
      prepaymentLabel: prepaymentLabel.trim(),
      isEvent: events.length > 0,
      clipped,
      currentEmi,
    });

    m++;
  }

  const monthsUsed = labels.length;
  const totalPayment = totalPaid;
  const emi = computeEMI(principal, annualRatePct, months);

  return {
    labels,
    principalRemaining,
    cumulativeInterest,
    emi,
    monthsUsed,
    totalPayment,
    monthRows,
    prepaymentMarkers,
    capAdjustments,
    finalEmi: currentEmi,
  };
}

export default function EMICalculator({ defaultType = "home" }: { defaultType?: LoanType }) {
  const [loanType, setLoanType] = useState<LoanType>(defaultType);
  const [principal, setPrincipal] = useState<number>(3000000);
  const [annualRate, setAnnualRate] = useState<number>(7.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const [compareEnabled, setCompareEnabled] = useState<boolean>(true);
  const [bankEmiLimit, setBankEmiLimit] = useState<number>(25);
  const [prepayOpen, setPrepayOpen] = useState<boolean>(false);
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);
  const [showBasePrincipal, setShowBasePrincipal] = useState<boolean>(true);
  const [showBaseInterest, setShowBaseInterest] = useState<boolean>(true);
  const [showPrepayPrincipal, setShowPrepayPrincipal] = useState<boolean>(true);
  const [showPrepayInterest, setShowPrepayInterest] = useState<boolean>(true);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const [prepayments, setPrepayments] = useState<PrepaymentEntry[]>([
    { id: 1, type: "one-time", amount: 50000, month: 12, mode: "principal" },
  ]);
  const [nextPrepaymentId, setNextPrepaymentId] = useState<number>(2);

  const addPrepayment = () => {
    setPrepayments((current) => [
      ...current,
      {
        id: nextPrepaymentId,
        type: "one-time",
        amount: 10000,
        month: Math.min(12, tenureYears * 12),
        mode: "principal",
      },
    ]);
    setNextPrepaymentId((id) => id + 1);
  };

  const updatePrepayment = <K extends keyof PrepaymentEntry>(id: number, field: K, value: PrepaymentEntry[K]) => {
    setPrepayments((current) => current.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  };

  const removePrepayment = (id: number) => {
    setPrepayments((current) => current.filter((entry) => entry.id !== id));
  };

  const months = tenureYears * 12;

  const base = useMemo(() => amortizationSchedule(principal, annualRate, months), [principal, annualRate, months]);
  const adjusted = useMemo(
    () => amortizationScheduleWithPrepayments(principal, annualRate, months, prepayments, bankEmiLimit),
    [principal, annualRate, months, prepayments, bankEmiLimit]
  );

  const monthsSaved = Math.max(0, base.monthsUsed - adjusted.monthsUsed);
  const interestSaved = Math.max(0, (base.cumulativeInterest.at(-1) ?? 0) - (adjusted.cumulativeInterest.at(-1) ?? 0));
  const totalPaymentDiff = Math.max(0, (base.totalPayment ?? base.emi * base.monthsUsed) - (adjusted.totalPayment ?? adjusted.emi * adjusted.monthsUsed));
  const totalPrepaymentAmount = adjusted.monthRows.reduce((sum, row) => sum + row.prepaymentAmount, 0);
  const finalEmi = adjusted.monthRows.at(-1)?.currentEmi ?? adjusted.emi;
  const clippedPrepayments = adjusted.monthRows.some((row) => row.clipped);
  const emiCapAdjustments = (adjusted.capAdjustments ?? []).filter((adj) => adj.mode === "emi");

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
              <div className="text-xs text-white/60">Create multiple prepayments and choose principal or EMI reduction</div>
            </div>
            <div className="text-white/60">{prepayOpen ? "−" : "+"}</div>
          </button>

          {prepayOpen && (
            <div className="mt-3 space-y-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="space-y-2">
                  <label className="block text-sm text-white/80">Bank EMI reduction limit (%)</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={bankEmiLimit}
                    onChange={(e) => setBankEmiLimit(Number(e.target.value))}
                    className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
                  />
                </div>
                <button
                  onClick={addPrepayment}
                  className="h-full rounded-md bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-500 transition"
                >
                  Add Prepayment
                </button>
              </div>

              <div className="space-y-3">
                {prepayments.map((entry) => (
                  <div key={entry.id} className="rounded-md  bg-indigo-900/10 p-4">
                    <div className="flex flex-wrap gap-3 items-center justify-between">
                      <div className="text-sm text-white/80">Prepayment #{entry.id}</div>
                      <button
                        onClick={() => removePrepayment(entry.id)}
                        className="text-sm text-red-400 underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3 sm:grid-cols-2 mt-3">
                      <div className="space-y-2">
                        <label className="block text-sm text-white/80">Type</label>
                        <select
                          value={entry.type}
                          onChange={(e) => updatePrepayment(entry.id, "type", e.target.value as PrepaymentType)}
                          className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
                        >
                          <option value="one-time">One-time</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm text-white/80">Mode</label>
                        <select
                          value={entry.mode}
                          onChange={(e) => updatePrepayment(entry.id, "mode", e.target.value as PrepaymentMode)}
                          className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
                        >
                          <option value="principal">Principal reduction</option>
                          <option value="emi">EMI reduction</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm text-white/80">Amount</label>
                        <input
                          type="number"
                          min={0}
                          value={entry.amount}
                          onChange={(e) => updatePrepayment(entry.id, "amount", Number(e.target.value))}
                          className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm text-white/80">Month</label>
                        <input
                          type="number"
                          min={1}
                          max={months}
                          value={entry.month}
                          onChange={(e) => updatePrepayment(entry.id, "month", Number(e.target.value))}
                          className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
                        />
                      </div>
                    </div>
                    {entry.mode === "emi" && (
                      <div className="mt-3 rounded-md border border-yellow-600 bg-yellow-950/10 p-3 text-sm text-yellow-100">
                        EMI reductions are capped to {bankEmiLimit}% of the current EMI at each payment month.
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-md bg-indigo-900/10 p-4 text-sm text-white/70">
                <div>Total prepayment entries: {prepayments.length}</div>
                <div>Each EMI reduction entry is validated against the bank limit when the schedule is calculated.</div>
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

        <div className="rounded-md bg-indigo-900/10 p-4">
          <div className="text-lg text-white/70 mb-2">With Prepayment Summary</div>
          {totalPrepaymentAmount > 0 ? (
            <div className="space-y-2">
              <div className="text-sm text-white/70">Total Prepayments Applied</div>
              <div className="text-lg text-white">₹ {formatNumber(totalPrepaymentAmount)}</div>
              <div className="text-sm text-white/70">Effective EMI after adjustments</div>
              <div className="text-lg text-white">₹ {formatNumber(finalEmi)}</div>
              <div className="text-sm text-white/70">Interest Saved</div>
              <div className="text-lg text-white">₹ {formatNumber(interestSaved)}</div>
              <div className="text-sm text-white/70">Months Saved</div>
              <div className="text-lg text-white">{monthsSaved}</div>
              <div className="text-sm text-white/70">Total Payment Reduced</div>
              <div className="text-lg text-white">₹ {formatNumber(totalPaymentDiff)}</div>
              {clippedPrepayments && (
                <div className="rounded-md border border-yellow-600 bg-yellow-950/10 p-3 text-sm text-yellow-100">
                  One or more EMI reduction entries exceeded the bank limit and were capped to {bankEmiLimit}% of the current EMI.
                </div>
              )}

              {emiCapAdjustments.length > 0 && (
                <div className="rounded-md border border-sky-600 bg-sky-950/10 p-4 mt-4 text-sm text-white/80">
                  <div className="mb-3 text-white font-semibold">EMI Cap Adjustment Details</div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-separate border-spacing-0">
                      <thead>
                        <tr className="text-left text-white/60">
                          <th className="pb-2 pr-4">Month</th>
                          <th className="pb-2 pr-4">Requested</th>
                          <th className="pb-2 pr-4">Applied</th>
                          <th className="pb-2 pr-4">Cap</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emiCapAdjustments.map((adj, idx) => (
                          <tr key={`${adj.month}-${adj.prepaymentId}-${idx}`} className={idx % 2 === 0 ? "bg-white/5" : ""}>
                            <td className="py-2 pr-4">{adj.month}</td>
                            <td className="py-2 pr-4">₹ {formatNumber(adj.requestedAmount)}</td>
                            <td className="py-2 pr-4">₹ {formatNumber(adj.appliedAmount)}</td>
                            <td className="py-2 pr-4">{adj.capAmount ? `₹ ${formatNumber(adj.capAmount)}` : "—"}</td>
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
            <div className="text-sm text-white/60">No prepayments applied. Open Prepayment Options to add extras.</div>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/70 mb-3">Amortization Overview</div>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>Chart</span>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as "line" | "bar")}
                className="rounded-md border border-gray-600 bg-gray-900 p-2 text-white"
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
              </select>
            </div>
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
        <div className="rounded-md bg-indigo-900/10 p-4">
          <div style={{ minHeight: 360 }}>
            <AmortizationChart
              labels={base.labels}
              principalSeries={base.principalRemaining}
              interestSeries={base.cumulativeInterest}
              principalSeriesB={compareEnabled ? adjusted.principalRemaining : undefined}
              interestSeriesB={compareEnabled ? adjusted.cumulativeInterest : undefined}
              prepaymentMarkers={adjusted.prepaymentMarkers}
              chartType={chartType}
              showBasePrincipal={showBasePrincipal}
              showBaseInterest={showBaseInterest}
              showPrepayPrincipal={showPrepayPrincipal}
              showPrepayInterest={showPrepayInterest}
            />
          </div>
        </div>
      </div>

      <div className="rounded-md bg-indigo-900/10 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="text-sm text-white/70">
            { showFullSchedule ? "Full Schedule - Base / With Prepay" : "Schedule (First 12 months) - Base / With Prepay" }
          </div>
          <button onClick={() => setShowFullSchedule(!showFullSchedule)} className="text-sm text-white/70 underline hover:text-white transition">{showFullSchedule ? "Hide full schedule" : "View full schedule"}</button>
        </div>

        {!showFullSchedule && (
          <div className="space-y-3 md:overflow-x-auto">
            {/* Mobile: Card layout */}
            <div className="md:hidden space-y-3">
              {adjusted.monthRows.slice(0, 12).map((row) => (
                <div key={row.month} className={`rounded-md  p-3 ${row.isEvent ? "bg-indigo-900/10" : "bg-indigo-900/10"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-white">Month {row.month}</div>
                    {row.isEvent && <span className="text-xs bg-indigo-900/10 text-white px-2 py-1 rounded">Prepayment</span>}
                  </div>
                  <div className="space-y-1 text-sm text-white/80">
                    <div className="flex justify-between"><span>Base Remaining:</span> <span className="text-white font-medium">₹ {formatNumber(base.principalRemaining[row.month - 1] ?? 0)}</span></div>
                    <div className="flex justify-between"><span>With Prepay:</span> <span className="text-white font-medium">₹ {formatNumber(row.balance)}</span></div>
                    <div className="flex justify-between"><span>Payment:</span> <span className="text-white font-medium">₹ {formatNumber(row.payment)}</span></div>
                    {row.prepaymentLabel && (
                      <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-yellow-100">
                        <strong>Prepayment:</strong> {row.prepaymentLabel}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500/60 text-md">
                    <th className="pb-2 pr-3">#</th>
                    <th className="pb-2 pr-3">Base Remaining</th>
                    <th className="pb-2 pr-3">With Prepay Remaining</th>
                    <th className="pb-2 pr-3">Payment</th>
                    <th className="pb-2">Prepayment</th>
                  </tr>
                </thead>
                <tbody>
                  {adjusted.monthRows.slice(0, 12).map((row) => (
                    <tr key={row.month} className={`border-t border-white/5 text-white/60 ${row.isEvent ? "bg-indigo-900/10" : ""}`}>
                      <td className="py-2 pr-3">{row.month}</td>
                      <td className="py-2 pr-3">₹ {formatNumber(base.principalRemaining[row.month - 1] ?? 0)}</td>
                      <td className="py-2 pr-3">₹ {formatNumber(row.balance)}</td>
                      <td className="py-2 pr-3">₹ {formatNumber(row.payment)}</td>
                      <td className="py-2">{row.prepaymentLabel || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showFullSchedule && (
          <div className="space-y-3">
            {/* Mobile: Card layout */}
            <div className="md:hidden smooth-scroll space-y-3 max-h-96 overflow-y-auto">
              {adjusted.monthRows.map((row) => (
                <div key={row.month} className={`rounded-md border border-gray-600 p-3 ${row.isEvent ? "bg-gray-700/50 border-orange-600" : "bg-gray-900/50"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-white">Month {row.month}</div>
                    {row.isEvent && <span className="text-xs text-gray-500/60 text-white px-2 py-1 rounded">Prepayment</span>}
                  </div>
                  <div className="space-y-1 text-sm text-white/80">
                    <div className="flex justify-between"><span>Base Remaining:</span> <span className="text-white font-medium">{base.principalRemaining[row.month - 1] !== undefined ? `₹ ${formatNumber(base.principalRemaining[row.month - 1])}` : "-"}</span></div>
                    <div className="flex justify-between"><span>With Prepay:</span> <span className="text-white font-medium">₹ {formatNumber(row.balance)}</span></div>
                    <div className="flex justify-between"><span>Payment:</span> <span className="text-white font-medium">₹ {formatNumber(row.payment)}</span></div>
                    {row.prepaymentLabel && (
                      <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-yellow-100">
                        <strong>Prepayment:</strong> {row.prepaymentLabel}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table layout */}
            <div className="hidden md:block max-h-96 smooth-scroll overflow-y-auto border-t border-white/5 pt-3">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="text-left text-gray-500/60 ">
                    <th className="pb-2 pr-3">Month</th>
                    <th className="pb-2 pr-3">Base Remaining</th>
                    <th className="pb-2 pr-3">With Prepay Remaining</th>
                    <th className="pb-2 pr-3">Payment</th>
                    <th className="pb-2">Prepayment</th>
                  </tr>
                </thead>
                <tbody>
                  {adjusted.monthRows.map((row) => (
                    <tr key={row.month} className={`border-t border-white/5 text-white/60 ${row.isEvent ? "bg-white/5" : ""}`}>
                      <td className="py-2 pr-3">{row.month}</td>
                      <td className="py-2 pr-3">{base.principalRemaining[row.month - 1] !== undefined ? `₹ ${formatNumber(base.principalRemaining[row.month - 1])}` : "-"}</td>
                      <td className="py-2 pr-3">₹ {formatNumber(row.balance)}</td>
                      <td className="py-2 pr-3">₹ {formatNumber(row.payment)}</td>
                      <td className="py-2">{row.prepaymentLabel || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
