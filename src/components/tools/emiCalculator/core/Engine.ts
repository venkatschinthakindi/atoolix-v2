/**
 * EMI Calculator — shared calculation engine.
 *
 * This file is intentionally framework-free (no React, no "use client").
 * It is imported by the single EMICalculator component, so Home/Car/Personal
 * loans always compute against the exact same logic — there is only ever
 * ONE amortization implementation to maintain and test.
 */

export type LoanType = "home" | "personal" | "car";
export type PrepaymentType = "monthly" | "one-time";
export type PrepaymentMode = "principal" | "emi";

export type CurrencyCode =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD"
  | "SGD"
  | "JPY";

export const CURRENCIES: Record<
  CurrencyCode,
  { label: string; symbol: string; locale: string }
> = {
  INR: { label: "Indian Rupee — INR (₹)", symbol: "₹", locale: "en-IN" },
  USD: { label: "US Dollar — USD ($)", symbol: "$", locale: "en-US" },
  EUR: { label: "Euro — EUR (€)", symbol: "€", locale: "de-DE" },
  GBP: { label: "British Pound — GBP (£)", symbol: "£", locale: "en-GB" },
  AED: { label: "UAE Dirham — AED", symbol: "AED", locale: "en-AE" },
  AUD: { label: "Australian Dollar — AUD (A$)", symbol: "A$", locale: "en-AU" },
  CAD: { label: "Canadian Dollar — CAD (C$)", symbol: "C$", locale: "en-CA" },
  SGD: { label: "Singapore Dollar — SGD (S$)", symbol: "S$", locale: "en-SG" },
  JPY: { label: "Japanese Yen — JPY (¥)", symbol: "¥", locale: "ja-JP" },
};

export type LoanPreset = {
  principal: number;
  annualRate: number;
  tenureYears: number;
  description: string;
  min: number;
  max: number;
  step: number;
};

export type PrepaymentEntry = {
  id: number;
  type: PrepaymentType;
  amount: number;
  month: number;
  mode: PrepaymentMode;
};

export type PrepaymentRow = {
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

export type PrepaymentAdjustment = {
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

export function computeEMI(
  principal: number,
  annualRatePct: number,
  months: number
) {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / months;
  return (
    (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
  );
}

/** Present value of a lump sum due `months` from now — used to work out how
 *  much a balloon payment actually lowers today's regular EMI by. */
export function presentValue(
  futureValue: number,
  annualRatePct: number,
  months: number
) {
  const r = annualRatePct / 12 / 100;
  if (months <= 0) return futureValue;
  if (r === 0) return futureValue;
  return futureValue / Math.pow(1 + r, months);
}

export function getLoanPreset(type: LoanType): LoanPreset {
  switch (type) {
    case "home":
      return {
        principal: 3000000,
        annualRate: 7.5,
        tenureYears: 20,
        description: "Long-term home loan with lower interest",
        min: 100000,
        max: 20000000,
        step: 50000,
      };
    case "personal":
      return {
        principal: 800000,
        annualRate: 12.5,
        tenureYears: 5,
        description: "Shorter personal loan with higher rate",
        min: 25000,
        max: 5000000,
        step: 5000,
      };
    case "car":
      return {
        principal: 1200000,
        annualRate: 9.0,
        tenureYears: 7,
        description: "Vehicle loan with mid-term tenure",
        min: 50000,
        max: 10000000,
        step: 10000,
      };
  }
}

export function amortizationSchedule(
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

export function buildPrepaymentEvents(
  entries: PrepaymentEntry[],
  months: number
) {
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

export function amortizationScheduleWithPrepayments(
  principal: number,
  annualRatePct: number,
  months: number,
  prepayments: PrepaymentEntry[],
  bankEmiLimitPercent: number,
  extraMonthlyPayment: number,
  balloonPayment: number,
  currencySymbol: string = "₹"
) {
  const fmtPlain = (v: number) =>
    v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  const monthlyRate = annualRatePct / 12 / 100;
  let balance = principal;
  // A balloon due at maturity is financed like a real balloon loan: it lowers
  // the principal that the regular EMI needs to amortize, since the balloon's
  // present value effectively covers that slice of the loan up front.
  const balloonFinancedPrincipal =
    balloonPayment > 0
      ? Math.max(0, principal - presentValue(balloonPayment, annualRatePct, months))
      : principal;
  let currentEmi = computeEMI(balloonFinancedPrincipal, annualRatePct, months);
  const baseEmiWithBalloon = currentEmi;
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
      prepaymentLabel += `${prefix} ${modeText} ${currencySymbol}${fmtPlain(actualAmount)}${
        event.type === "one-time"
          ? ` on month ${event.month}`
          : ` from month ${event.month}`
      } ; `;
    });

    if (extraMonthlyPayment > 0) {
      payment += extraMonthlyPayment;
      prepaymentAmount += extraMonthlyPayment;
      prepaymentLabel += `Extra monthly ${currencySymbol}${fmtPlain(extraMonthlyPayment)} ; `;
    }

    if (m === months && balloonPayment > 0) {
      payment += balloonPayment;
      prepaymentAmount += balloonPayment;
      prepaymentLabel += `Balloon ${currencySymbol}${fmtPlain(balloonPayment)} ; `;
    }

    if (balance + interest <= payment) payment = balance + interest;

    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    totalPaid += payment;
    cumInterest += interest;

    if (prepaymentAmount > 0 && balance > 0 && m < months) {
      const remainingMonths = months - m;
      const remainingBalloonFinanced =
        balloonPayment > 0
          ? Math.max(
              0,
              balance - presentValue(balloonPayment, annualRatePct, remainingMonths)
            )
          : balance;
      currentEmi = computeEMI(
        remainingBalloonFinanced,
        annualRatePct,
        remainingMonths
      );
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
    emi: baseEmiWithBalloon,
    monthsUsed: labels.length,
    totalPayment: totalPaid,
    monthRows,
    prepaymentMarkers,
    capAdjustments,
    finalEmi: currentEmi,
  };
}