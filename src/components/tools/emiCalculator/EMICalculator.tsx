"use client";

import { useMemo, useState } from "react";
import AmortizationChart from "@/components/tools/emiCalculator/amortizationChart";
import { formatCurrency } from "@/utility/formatCurrencyUtility";
import CustomSelect from "@/components/ui/customSelect";
import { useSearchParams } from "next/navigation";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type LoanType = "home" | "personal" | "car";
type PrepaymentType = "monthly" | "one-time";
type PrepaymentMode = "principal" | "emi";

type LoanPreset = {
  principal: number;
  annualRate: number;
  tenureYears: number;
  description: string;
};

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

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

function computeEMI(principal: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / months;
  return (
    (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
  );
}

function getLoanPreset(type: LoanType): LoanPreset {
  switch (type) {
    case "home":
      return {
        principal: 3000000,
        annualRate: 7.5,
        tenureYears: 20,
        description: "Long-term home loan with lower interest",
      };
    case "personal":
      return {
        principal: 800000,
        annualRate: 12.5,
        tenureYears: 5,
        description: "Shorter personal loan with higher rate",
      };
    case "car":
      return {
        principal: 1200000,
        annualRate: 9.0,
        tenureYears: 7,
        description: "Vehicle loan with mid-term tenure",
      };
  }
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
    if (balance + interest <= payment) payment = balance + interest;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    totalPaid += payment;
    cumInterest += interest;
    labels.push(String(m));
    principalRemaining.push(balance);
    cumulativeInterest.push(cumInterest);
    m++;
  }

  return {
    labels,
    principalRemaining,
    cumulativeInterest,
    emi,
    monthsUsed: labels.length,
    totalPayment: totalPaid,
  };
}

function buildPrepaymentEvents(entries: PrepaymentEntry[], months: number) {
  const eventsByMonth: Record<number, PrepaymentEntry[]> = {};
  entries.forEach((entry) => {
    if (!entry.amount || entry.amount <= 0) return;
    if (entry.type === "monthly") {
      for (let m = Math.max(1, entry.month); m <= months; m++) {
        eventsByMonth[m] = [...(eventsByMonth[m] ?? []), entry];
      }
    } else if (
      entry.type === "one-time" &&
      entry.month >= 1 &&
      entry.month <= months
    ) {
      eventsByMonth[entry.month] = [
        ...(eventsByMonth[entry.month] ?? []),
        entry,
      ];
    }
  });
  return eventsByMonth;
}

function amortizationScheduleWithPrepayments(
  principal: number,
  annualRatePct: number,
  months: number,
  prepayments: PrepaymentEntry[],
  bankEmiLimitPercent: number,
  extraMonthlyPayment: number,
  balloonPayment: number
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
      const maxAllowed =
        event.mode === "emi"
          ? currentEmi * (bankEmiLimitPercent / 100)
          : event.amount;
      const actualAmount =
        event.mode === "emi"
          ? Math.min(event.amount, maxAllowed)
          : event.amount;
      const capAmount = event.mode === "emi" ? maxAllowed : null;
      const note =
        event.mode === "emi"
          ? event.amount > maxAllowed
            ? "Capped by bank limit"
            : "Within bank limit"
          : "Principal reduction";

      if (event.mode === "emi" && event.amount > maxAllowed) clipped = true;

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
      const modeText =
        event.mode === "emi" ? "EMI reduction" : "Principal reduction";
      prepaymentLabel += `${prefix} ${modeText} ₹${formatCurrency(actualAmount)}${
        event.type === "one-time"
          ? ` on month ${event.month}`
          : ` from month ${event.month}`
      } ; `;
    });

    if (extraMonthlyPayment > 0) {
      payment += extraMonthlyPayment;
      prepaymentAmount += extraMonthlyPayment;
      prepaymentLabel += `Extra monthly ₹${formatCurrency(extraMonthlyPayment)} ; `;
    }

    if (m === months && balloonPayment > 0) {
      payment += balloonPayment;
      prepaymentAmount += balloonPayment;
      prepaymentLabel += `Balloon ₹${formatCurrency(balloonPayment)} ; `;
    }

    if (balance + interest <= payment) payment = balance + interest;

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

  return {
    labels,
    principalRemaining,
    cumulativeInterest,
    emi: computeEMI(principal, annualRatePct, months),
    monthsUsed: labels.length,
    totalPayment: totalPaid,
    monthRows,
    prepaymentMarkers,
    capAdjustments,
    finalEmi: currentEmi,
  };
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Labelled number input */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition text-sm";

const selectCls =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-gray-900 text-white focus:outline-none focus:border-blue-400/50 transition text-sm";

/** Stat card used in summary grids */
function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 py-2 ${
        accent
          ? "border-blue-400/30 bg-blue-400/5"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="text-xs text-white/60 mb-1">{label}</div>
      <div className="text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

/** Section heading used throughout */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-white/80 tracking-wide uppercase mb-3">
      {children}
    </h3>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function EMICalculator({
  defaultType = "home",
}: {
  defaultType?: LoanType;
}) {
  const defaultPreset = getLoanPreset(defaultType);

  const searchParams = useSearchParams();
  const getInitialActiveTab = (): LoanType  => {
    const type = searchParams.get("category")?.toLowerCase() || "";

    if (type === "home") return "home";
    if (type === "car") return "car";
    if (type === "personal") return "personal";

    return defaultType;
  };

  /* Core state */
  const [loanType, setLoanType] = useState<LoanType>(() => getInitialActiveTab());
  const [principal, setPrincipal] = useState<number>(defaultPreset.principal);
  const [annualRate, setAnnualRate] = useState<number>(defaultPreset.annualRate);
  const [tenureYears, setTenureYears] = useState<number>(
    defaultPreset.tenureYears
  );

  /* Prepayment & advanced state */
  const [compareEnabled, setCompareEnabled] = useState<boolean>(true);
  const [bankEmiLimit, setBankEmiLimit] = useState<number>(25);
  const [prepayOpen, setPrepayOpen] = useState<boolean>(false);
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);
  const [balloonPayment, setBalloonPayment] = useState<number>(0);
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);

  /* Chart visibility toggles */
  const [showBasePrincipal, setShowBasePrincipal] = useState<boolean>(true);
  const [showBaseInterest, setShowBaseInterest] = useState<boolean>(true);
  const [showPrepayPrincipal, setShowPrepayPrincipal] = useState<boolean>(true);
  const [showPrepayInterest, setShowPrepayInterest] = useState<boolean>(true);
  const [chartType, setChartType] = useState<
    "line" | "area" | "smooth" | "stepped" | "bar" | "pie" | "doughnut"
  >("line");

  /* Prepayment entries */
  const [prepayments, setPrepayments] = useState<PrepaymentEntry[]>([
    { id: 1, type: "one-time", amount: 50000, month: 12, mode: "principal" },
  ]);
  const [nextPrepaymentId, setNextPrepaymentId] = useState<number>(2);

  const addPrepayment = () => {
    setPrepayments((c) => [
      ...c,
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

  const updatePrepayment = <K extends keyof PrepaymentEntry>(
    id: number,
    field: K,
    value: PrepaymentEntry[K]
  ) => {
    setPrepayments((c) =>
      c.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const removePrepayment = (id: number) => {
    setPrepayments((c) => c.filter((e) => e.id !== id));
  };

  const handleLoanTypeChange = (type: LoanType) => {
    const preset = getLoanPreset(type);
    setLoanType(type);
    setPrincipal(preset.principal);
    setAnnualRate(preset.annualRate);
    setTenureYears(preset.tenureYears);
  };

  /* Derived */
  const months = Math.max(1, tenureYears) * 12;

  const base = useMemo(
    () => amortizationSchedule(principal, annualRate, months),
    [principal, annualRate, months]
  );

  const adjusted = useMemo(
    () =>
      amortizationScheduleWithPrepayments(
        principal,
        annualRate,
        months,
        prepayments,
        bankEmiLimit,
        extraMonthlyPayment,
        balloonPayment
      ),
    [
      principal,
      annualRate,
      months,
      prepayments,
      bankEmiLimit,
      extraMonthlyPayment,
      balloonPayment,
    ]
  );

  const monthsSaved = Math.max(0, base.monthsUsed - adjusted.monthsUsed);
  const interestSaved = Math.max(
    0,
    (base.cumulativeInterest.at(-1) ?? 0) -
      (adjusted.cumulativeInterest.at(-1) ?? 0)
  );
  const totalPrepaymentAmount = adjusted.monthRows.reduce(
    (s, r) => s + r.prepaymentAmount,
    0
  );
  const finalEmi = adjusted.monthRows.at(-1)?.currentEmi ?? adjusted.emi;
  const clippedPrepayments = adjusted.monthRows.some((r) => r.clipped);
  const emiCapAdjustments = (adjusted.capAdjustments ?? []).filter(
    (a) => a.mode === "emi"
  );
  const loanPreset = getLoanPreset(loanType);

  /* Validation */
  const amountValid = principal > 0;
  const rateValid = annualRate >= 0;
  const tenureValid = tenureYears >= 1;
  const emiLimitValid = bankEmiLimit >= 1 && bankEmiLimit <= 100;
  const prepaymentsValid = prepayments.every(
    (e) => e.month >= 1 && e.month <= months && e.amount > 0
  );
  const advancedValid = extraMonthlyPayment >= 0 && balloonPayment >= 0;
  const hasValidationErrors =
    !amountValid ||
    !rateValid ||
    !tenureValid ||
    !emiLimitValid ||
    !prepaymentsValid ||
    !advancedValid;

  const pieChartData = useMemo(
    () => ({
      labels: ["Principal Paid", "Interest Paid"],
      values: [principal, adjusted.cumulativeInterest.at(-1) ?? 0],
      colors: ["#22c55e", "#60a5fa"],
    }),
    [principal, adjusted.cumulativeInterest]
  );

  /* ───── Render ───── */
  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6 max-w-4xl mx-auto">
      {/* ── Loan type tabs ── */}
      <div className="flex gap-2 flex-wrap justify-center">
        {(["home", "personal", "car"] as LoanType[]).map((t) => (
          <button
            key={t}
            onClick={() => handleLoanTypeChange(t)}
            aria-pressed={loanType === t}
            className={`px-5 py-2.5 rounded-full text-sm font-medium border transition ${
              loanType === t
                ? "border-blue-400/60 bg-blue-400/15 text-white"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t === "home" ? "🏠" : t === "personal" ? "👤" : "🚗"}{" "}
            {t.charAt(0).toUpperCase() + t.slice(1)} Loan
          </button>
        ))}
      </div>

      {/* ── Preset description ── */}
      <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <div className="text-xs text-white/50 mb-1 uppercase tracking-wide">Loan preset</div>
        <div className="text-sm text-white/80">{loanPreset.description}.</div>
      </div>

      {/* ── EMI Hero ── */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-xs text-white/50 uppercase tracking-wide mb-2">
          Estimated Monthly EMI
        </div>
        <div className="text-4xl font-bold text-white">
          ₹ {formatCurrency(base.emi)}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5 pt-2">
          <StatCard
            label="Total Interest"
            value={`₹ ${formatCurrency(base.cumulativeInterest.at(-1) ?? 0)}`}
          />
          <StatCard
            label="Total Payment"
            value={`₹ ${formatCurrency(base.totalPayment ?? base.emi * base.monthsUsed)}`}
          />
        </div>
      </div>

      {/* ── Validation banner ── */}
      {hasValidationErrors && (
        <div className="rounded-2xl border border-orange-500/40 bg-orange-500/10 px-5 py-4 text-sm text-orange-100">
          <div className="font-semibold text-white mb-2">Validation notes</div>
          <ul className="list-disc pl-5 space-y-1 text-xs text-orange-200">
            {!amountValid && <li>Loan amount must be greater than 0.</li>}
            {!rateValid && <li>Interest rate cannot be negative.</li>}
            {!tenureValid && <li>Tenure must be at least 1 year.</li>}
            {!emiLimitValid && (
              <li>EMI reduction limit must be between 1% and 100%.</li>
            )}
            {!prepaymentsValid && (
              <li>
                One or more prepayment entries have invalid amount or month.
              </li>
            )}
            {!advancedValid && (
              <li>Advanced payment values must be zero or greater.</li>
            )}
          </ul>
        </div>
      )}

      {/* ── Loan inputs ── */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">
        <SectionHeading>Loan Details</SectionHeading>
        <Field label="Loan Amount (₹)">
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className={inputCls}
          />
        </Field>
        <Field label="Annual Interest Rate (%)">
          <input
            type="number"
            step="0.01"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className={inputCls}
          />
        </Field>
        <Field label="Tenure (Years)">
          <input
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className={inputCls}
          />
        </Field>
      </div>

      {/* ── Prepayment accordion ── */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <button
          onClick={() => setPrepayOpen(!prepayOpen)}
          aria-expanded={prepayOpen}
          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition"
        >
          <div>
            <div className="text-sm font-semibold text-white">
              💰 Prepayment Options
            </div>
            <div className="text-xs text-white/50 mt-0.5">
              Add one-time or recurring prepayments with principal / EMI
              reduction
            </div>
          </div>
          <span className="text-white/50 text-xl w-7 h-7 flex items-center justify-center rounded-lg bg-white/10">
            {prepayOpen ? "−" : "+"}
          </span>
        </button>

        {prepayOpen && (
          <div className="px-6 pb-6 pt-2 space-y-5 border-t border-white/10">
            {/* Bank limit + Advanced toggle row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Bank EMI reduction limit (%)">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={bankEmiLimit}
                  onChange={(e) => setBankEmiLimit(Number(e.target.value))}
                  className={inputCls}
                />
              </Field>
              <div className="space-y-2">
                <div className="text-sm font-medium text-white/80">
                  Advanced options
                </div>
                <button
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition"
                >
                  {advancedOpen ? "Hide advanced ↑" : "Show advanced ↓"}
                </button>
              </div>
            </div>

            {/* Advanced options */}
            {advancedOpen && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
                <div className="text-xs text-white/50 uppercase tracking-wide">
                  Extra payments
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Extra monthly contribution (₹)">
                    <input
                      type="number"
                      min={0}
                      value={extraMonthlyPayment}
                      onChange={(e) =>
                        setExtraMonthlyPayment(Number(e.target.value))
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Balloon payment at maturity (₹)">
                    <input
                      type="number"
                      min={0}
                      value={balloonPayment}
                      onChange={(e) => setBalloonPayment(Number(e.target.value))}
                      className={inputCls}
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* Add prepayment button */}
            <button
              onClick={addPrepayment}
              className="px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold hover:bg-blue-500/30 hover:text-white transition"
            >
              + Add Prepayment Entry
            </button>

            {/* Prepayment entries */}
            <div className="space-y-4">
              {prepayments.map((entry, index) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold text-white">
                      Prepayment #{index + 1}
                    </div>
                    <button
                      onClick={() => removePrepayment(entry.id)}
                      className="text-xs text-red-400 hover:text-red-300 transition underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Type">
                      {/* <select
                        value={entry.type}
                        onChange={(e) =>
                          updatePrepayment(
                            entry.id,
                            "type",
                            e.target.value as PrepaymentType
                          )
                        }
                        className={selectCls}
                      >
                        <option value="one-time">One-time</option>
                        <option value="monthly">Monthly</option>
                      </select> */}
                      <CustomSelect value={entry.type} 
                                    callBackTrigger={(e:PrepaymentType) =>
                          updatePrepayment(
                            entry.id,
                            "type",
                            e as PrepaymentType  
                          )
                        }
                        options={[
                            { value: "one-time", label: "One-time" },
                            { value: "monthly", label: "Monthly" },
                        ]} />
                    </Field>
                    <Field label="Mode">
                      {/* <select
                        value={entry.mode}
                        onChange={(e) =>
                          updatePrepayment(
                            entry.id,
                            "mode",
                            e.target.value as PrepaymentMode
                          )
                        }
                        className={selectCls}
                      >
                        <option value="principal">Principal reduction</option>
                        <option value="emi">EMI reduction</option>
                      </select> */}

                      <CustomSelect value={entry.mode} 
                                    callBackTrigger={(e:PrepaymentMode) =>
                          updatePrepayment(
                            entry.id,
                            "mode",
                            e
                          )
                        }
                        options={[
                            { value: "principal", label: "Principal reduction" },
                            { value: "emi", label: "EMI reduction" },
                        ]} />
                    </Field>
                    <Field label="Amount (₹)">
                      <input
                        type="number"
                        min={0}
                        value={entry.amount}
                        onChange={(e) =>
                          updatePrepayment(
                            entry.id,
                            "amount",
                            Number(e.target.value)
                          )
                        }
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Starting Month">
                      <input
                        type="number"
                        min={1}
                        max={months}
                        value={entry.month}
                        onChange={(e) =>
                          updatePrepayment(
                            entry.id,
                            "month",
                            Number(e.target.value)
                          )
                        }
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  {entry.mode === "emi" && (
                    <div className="mt-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-xs text-yellow-200">
                      EMI reductions are capped to {bankEmiLimit}% of the
                      current EMI at each payment month.
                    </div>
                  )}
                </div>
              ))}
            </div>

            {prepayments.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 px-2 mb-2 py-3 text-xs text-white/50">
                {prepayments.length} prepayment{prepayments.length > 1 ? "s" : ""}{" "}
                configured. EMI reduction entries are validated against the bank
                cap when the schedule is calculated.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Reset button ── */}
      <button
        onClick={() => handleLoanTypeChange(loanType)}
        className="w-full py-3 rounded-2xl border border-white/10 bg-white/5 text-white/70 text-sm font-semibold hover:bg-white/10 hover:text-white transition"
      >
        Reset to {loanType.charAt(0).toUpperCase() + loanType.slice(1)} Loan
        Preset
      </button>

      {/* ── Prepayment summary ── */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <SectionHeading>With Prepayment Summary</SectionHeading>
        {totalPrepaymentAmount > 0 ? (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard
                label="Total Prepayments Applied"
                value={`₹ ${formatCurrency(totalPrepaymentAmount)}`}
              />
              <StatCard
                label="Effective EMI"
                value={`₹ ${formatCurrency(finalEmi)}`}
                accent
              />
              <StatCard
                label="Interest Saved"
                value={`₹ ${formatCurrency(interestSaved)}`}
                accent
              />
              <StatCard
                label="Months Saved"
                value={String(monthsSaved)}
                accent
              />
            </div>

            {/* Comparison table */}
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-5 py-4">
              <div className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
                Comparison
              </div>
              <div className="grid gap-y-2 gap-x-4 text-xs text-white/60 sm:grid-cols-2">
                <div className="flex justify-between">
                  <span>Base EMI</span>
                  <span className="text-white">₹ {formatCurrency(base.emi)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base total interest</span>
                  <span className="text-white">
                    ₹ {formatCurrency(base.cumulativeInterest.at(-1) ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Adjusted EMI</span>
                  <span className="text-white">₹ {formatCurrency(finalEmi)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Adjusted total interest</span>
                  <span className="text-white">
                    ₹ {formatCurrency(adjusted.cumulativeInterest.at(-1) ?? 0)}
                  </span>
                </div>
              </div>
            </div>

            {clippedPrepayments && (
              <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-2 py-3 text-xs text-yellow-200">
                One or more EMI reduction entries exceeded the bank limit and
                were capped to {bankEmiLimit}% of the current EMI.
              </div>
            )}

            {emiCapAdjustments.length > 0 && (
              <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5">
                <div className="text-xs font-semibold text-white mb-3 uppercase tracking-wide">
                  EMI Cap Adjustment Details
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="text-left text-white/40">
                        <th className="pb-2 pr-4">Month</th>
                        <th className="pb-2 pr-4">Requested</th>
                        <th className="pb-2 pr-4">Applied</th>
                        <th className="pb-2 pr-4">Cap</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emiCapAdjustments.map((adj, idx) => (
                        <tr
                          key={`${adj.month}-${adj.prepaymentId}-${idx}`}
                          className={`border-t border-white/5 text-white/60 ${
                            idx % 2 === 0 ? "bg-white/[0.02]" : ""
                          }`}
                        >
                          <td className="py-2 pr-4">{adj.month}</td>
                          <td className="py-2 pr-4">
                            ₹ {formatCurrency(adj.requestedAmount)}
                          </td>
                          <td className="py-2 pr-4">
                            ₹ {formatCurrency(adj.appliedAmount)}
                          </td>
                          <td className="py-2 pr-4">
                            {adj.capAmount
                              ? `₹ ${formatCurrency(adj.capAmount)}`
                              : "—"}
                          </td>
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
          <p className="text-sm text-white/40">
            No prepayments applied. Open Prepayment Options above to add extras.
          </p>
        )}
      </div>

      {/* ── Chart ── */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        {/* Chart controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <SectionHeading>Amortization Overview</SectionHeading>
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span>Chart</span>
              {/* <select
                value={chartType}
                onChange={(e) =>
                  setChartType(
                    e.target.value as
                      | "line"
                      | "area"
                      | "smooth"
                      | "stepped"
                      | "bar"
                      | "pie"
                      | "doughnut"
                  )
                }
                className="rounded-lg border border-white/10 bg-gray-900 px-2 py-1 text-white text-xs focus:outline-none"
              >
                <option value="line">Line</option>
                <option value="area">Area</option>
                <option value="smooth">Smooth</option>
                <option value="stepped">Stepped</option>
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
                <option value="doughnut">Doughnut</option>
              </select> */}
              <CustomSelect value={chartType}
                                    callBackTrigger={(e) =>
                  setChartType(
                    e as
                      | "line"
                      | "area"
                      | "smooth"
                      | "stepped"
                      | "bar"
                      | "pie"
                      | "doughnut"
                  )
                }
                        options={[
                            { value: "line", label: "Line" },
                            { value: "area", label: "Area" },
                            { value: "smooth", label: "Smooth" },
                            { value: "stepped", label: "Stepped" },
                            { value: "bar", label: "Bar" },
                            { value: "pie", label: "Pie" },
                            { value: "doughnut", label: "Doughnut" }
                        ]} />
            </div>
            {(
              [
                ["compareEnabled", compareEnabled, setCompareEnabled, "Compare with Prepay"] as const,
                ["showBasePrincipal", showBasePrincipal, setShowBasePrincipal, "Base Principal"] as const,
                ["showBaseInterest", showBaseInterest, setShowBaseInterest, "Base Interest"] as const,
              ]
            ).map(([key, checked, setter, label]) => (
              <label key={key} className="flex items-center gap-1.5 text-xs text-white/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setter(e.target.checked)}
                  className="accent-blue-400"
                />
                {label}
              </label>
            ))}
            {compareEnabled && (
              <>
                <label className="flex items-center gap-1.5 text-xs text-white/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPrepayPrincipal}
                    onChange={(e) => setShowPrepayPrincipal(e.target.checked)}
                    className="accent-blue-400"
                  />
                  Prepay Principal
                </label>
                <label className="flex items-center gap-1.5 text-xs text-white/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPrepayInterest}
                    onChange={(e) => setShowPrepayInterest(e.target.checked)}
                    className="accent-blue-400"
                  />
                  Prepay Interest
                </label>
              </>
            )}
          </div>
        </div>

        <div style={{ minHeight: 360 }}>
          <AmortizationChart
            labels={base.labels}
            principalSeries={base.principalRemaining}
            interestSeries={base.cumulativeInterest}
            principalSeriesB={
              compareEnabled ? adjusted.principalRemaining : undefined
            }
            interestSeriesB={
              compareEnabled ? adjusted.cumulativeInterest : undefined
            }
            prepaymentMarkers={adjusted.prepaymentMarkers}
            chartType={chartType}
            pieData={pieChartData}
            showBasePrincipal={showBasePrincipal}
            showBaseInterest={showBaseInterest}
            showPrepayPrincipal={showPrepayPrincipal}
            showPrepayInterest={showPrepayInterest}
          />
        </div>
      </div>

      {/* ── Amortization schedule ── */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-5">
          <SectionHeading>
            {showFullSchedule
              ? "Full Schedule — Base / With Prepay"
              : "Schedule — First 12 Months"}
          </SectionHeading>
          <button
            onClick={() => setShowFullSchedule(!showFullSchedule)}
            className="text-xs text-blue-400 hover:text-blue-300 transition underline"
          >
            {showFullSchedule ? "Show first 12 months" : "View full schedule"}
          </button>
        </div>

        {/* Mobile card layout */}
        <div className="md:hidden space-y-3">
          {(showFullSchedule
            ? adjusted.monthRows
            : adjusted.monthRows.slice(0, 12)
          ).map((row) => (
            <div
              key={row.month}
              className={`rounded-xl border p-4 ${
                row.isEvent
                  ? "border-blue-400/20 bg-blue-400/5"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-white">
                  Month {row.month}
                </div>
                {row.isEvent && (
                  <span className="text-xs bg-blue-400/20 text-blue-300 px-2 py-0.5 rounded-full">
                    Prepayment
                  </span>
                )}
              </div>
              <div className="space-y-1 text-xs text-white/60">
                <div className="flex justify-between">
                  <span>Base Remaining</span>
                  <span className="text-white">
                    ₹ {formatCurrency(base.principalRemaining[row.month - 1] ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>With Prepay</span>
                  <span className="text-white">₹ {formatCurrency(row.balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment</span>
                  <span className="text-white">₹ {formatCurrency(row.payment)}</span>
                </div>
                {row.prepaymentLabel && (
                  <div className="mt-2 pt-2 border-t border-white/10 text-yellow-300">
                    {row.prepaymentLabel}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table layout */}
        <div
          className={`hidden md:block ${
            showFullSchedule
              ? "max-h-[420px] overflow-y-auto"
              : ""
          }`}
        >
          <table className="min-w-full text-xs">
            <thead className="sticky top-0 z-10 bg-gray-900">
              <tr className="text-left text-white/40 border-b border-white/10">
                <th className="pb-2 pr-4 font-medium">Month</th>
                <th className="pb-2 pr-4 font-medium">Base Remaining</th>
                <th className="pb-2 pr-4 font-medium">With Prepay Remaining</th>
                <th className="pb-2 pr-4 font-medium">Payment</th>
                <th className="pb-2 font-medium">Prepayment</th>
              </tr>
            </thead>
            <tbody>
              {(showFullSchedule
                ? adjusted.monthRows
                : adjusted.monthRows.slice(0, 12)
              ).map((row) => (
                <tr
                  key={row.month}
                  className={`border-t border-white/5 text-white/60 ${
                    row.isEvent ? "bg-blue-400/5" : ""
                  }`}
                >
                  <td className="py-2 pr-4">{row.month}</td>
                  <td className="py-2 pr-4">
                    {base.principalRemaining[row.month - 1] !== undefined
                      ? `₹ ${formatCurrency(base.principalRemaining[row.month - 1])}`
                      : "—"}
                  </td>
                  <td className="py-2 pr-4">₹ {formatCurrency(row.balance)}</td>
                  <td className="py-2 pr-4">₹ {formatCurrency(row.payment)}</td>
                  <td className="py-2 text-yellow-300/80">
                    {row.prepaymentLabel || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}