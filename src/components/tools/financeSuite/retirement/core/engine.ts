/**
 * Investment Returns — shared calculation engine.
 *
 * Framework-free (no React), imported by the single shared widget so all
 * 5 pages (hub + SIP + Lump Sum + CAGR + XIRR) compute against the exact
 * same math — there is only ever one implementation to maintain and test.
 */

// ---------------------------------------------------------------------------
// Currency
// ---------------------------------------------------------------------------
// This tool only swaps the currency *symbol* and keeps Indian-style digit
// grouping (e.g. ₹5,00,000 -> $5,00,000). It does NOT convert amounts.

export const CURRENCIES = {
  INR: { code: "INR", symbol: "₹", label: "₹ INR — Indian Rupee" },
  USD: { code: "USD", symbol: "$", label: "$ USD — US Dollar" },
  EUR: { code: "EUR", symbol: "€", label: "€ EUR — Euro" },
  GBP: { code: "GBP", symbol: "£", label: "£ GBP — British Pound" },
  JPY: { code: "JPY", symbol: "¥", label: "¥ JPY — Japanese Yen" },
  AUD: { code: "AUD", symbol: "A$", label: "A$ AUD — Australian Dollar" },
  CAD: { code: "CAD", symbol: "C$", label: "C$ CAD — Canadian Dollar" },
  SGD: { code: "SGD", symbol: "S$", label: "S$ SGD — Singapore Dollar" },
  AED: { code: "AED", symbol: "د.إ", label: "د.إ AED — UAE Dirham" },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export function formatCurrency(value: number, currency: CurrencyCode = "INR") {
  if (!Number.isFinite(value)) return "—";
  const symbol = CURRENCIES[currency].symbol;
  const sign = value < 0 ? "-" : "";
  const grouped = Math.abs(Math.round(value)).toLocaleString("en-IN");
  return `${sign}${symbol}${grouped}`;
}

export function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(2)}%`;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CashFlow = {
  id: string;
  amount: number | "";
  date: string;
};

// Numeric form fields can be transiently empty while the user retypes them.
export type NumField = number | "";

export type XirrStatus = "idle" | "invalid" | "same-date" | "no-solution" | "ok";

export type InvestmentTabKey = "sip" | "lump" | "cagr" | "xirr";

// ---------------------------------------------------------------------------
// Small pure helpers
// ---------------------------------------------------------------------------

export function uid() {
  return `cf_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// Lets a field go empty (so the user can delete-then-retype) instead of
// collapsing to 0 the instant the box is cleared.
export function parseNumericInput(value: string): NumField {
  if (value.trim() === "") return "";
  const n = Number(value);
  return Number.isFinite(n) ? n : "";
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function clampField(value: NumField, min: number, max: number): NumField {
  if (value === "") return value;
  return clamp(value, min, max);
}

// Converts a possibly-empty field into a real number for calculations,
// clamped into a safe range so a stray invalid state can never blow up a
// loop (e.g. someone entering a few million "years").
export function toCalcNumber(value: NumField, fallback: number, min: number, max: number) {
  const n = value === "" ? fallback : value;
  return clamp(n, min, max);
}

// Per-field limits: keeps huge inputs from creating runaway loops, and
// gives every numeric field an enforced (not just cosmetic) min/max.
export const LIMITS = {
  sipAmount: { min: 0, max: 10_000_000 },
  sipRate: { min: 0, max: 50 },
  sipYears: { min: 1, max: 100 },
  sipStepUp: { min: 0, max: 100 },
  lumpAmount: { min: 0, max: 100_000_000 },
  lumpRate: { min: 0, max: 50 },
  lumpYears: { min: 1, max: 100 },
  cagrStart: { min: 1, max: 100_000_000 },
  cagrEnd: { min: 0, max: 100_000_000 },
  cagrYears: { min: 1, max: 100 },
} as const;

// ---------------------------------------------------------------------------
// SIP math
// ---------------------------------------------------------------------------

export function calculateSIPValue(
  monthly: number,
  annualRate: number,
  years: number,
  stepUpPercent: number
) {
  const months = Math.max(0, Math.round(years * 12));
  const monthlyRate = annualRate / 100 / 12;

  let balance = 0;
  let currentMonthly = monthly;
  let invested = 0;

  for (let month = 1; month <= months; month += 1) {
    balance = balance * (1 + monthlyRate) + currentMonthly;
    invested += currentMonthly;
    if (month % 12 === 0) {
      currentMonthly *= 1 + stepUpPercent / 100;
    }
  }

  return {
    futureValue: balance,
    invested,
    gain: balance - invested,
  };
}

export function buildSipSeries(
  monthly: number,
  annualRate: number,
  years: number,
  stepUpPercent: number
) {
  // years is always a whole number by the time it reaches here (enforced
  // via step=1 + onBlur rounding), so month count and the yearly chart
  // labels built from `years` stay in sync.
  const months = Math.max(0, Math.round(years) * 12);
  const monthlyRate = annualRate / 100 / 12;

  const series: number[] = [];
  let balance = 0;
  let currentMonthly = monthly;

  for (let month = 1; month <= months; month += 1) {
    balance = balance * (1 + monthlyRate) + currentMonthly;
    if (month % 12 === 0) {
      series.push(balance);
      currentMonthly *= 1 + stepUpPercent / 100;
    }
  }

  return series;
}

// ---------------------------------------------------------------------------
// Lump sum math
// ---------------------------------------------------------------------------

export function calculateCompoundValue(
  amount: number,
  rate: number,
  years: number,
  frequency: number
) {
  if (years <= 0) return amount;
  const periodic = rate / 100 / frequency;
  return amount * Math.pow(1 + periodic, frequency * years);
}

export function buildLumpSeries(
  amount: number,
  rate: number,
  years: number,
  frequency: number
) {
  const series: number[] = [];
  const wholeYears = Math.round(years);
  for (let year = 1; year <= wholeYears; year += 1) {
    const periodic = rate / 100 / frequency;
    series.push(amount * Math.pow(1 + periodic, frequency * year));
  }
  return series;
}

// ---------------------------------------------------------------------------
// XIRR math
// ---------------------------------------------------------------------------

export function utcDay(dateStr: string) {
  const d = new Date(dateStr);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

export function xnpv(rate: number, cashflows: CashFlow[]) {
  if (!Number.isFinite(rate) || rate <= -1) return NaN;
  if (!cashflows.length) return NaN;

  const sorted = [...cashflows].sort((a, b) => utcDay(a.date) - utcDay(b.date));
  const first = utcDay(sorted[0].date);

  let total = 0;
  for (const flow of sorted) {
    if (typeof flow.amount !== "number" || !Number.isFinite(flow.amount) || !flow.date)
      return NaN;
    const days = (utcDay(flow.date) - first) / 86400000;
    total += flow.amount / Math.pow(1 + rate, days / 365);
  }
  return total;
}

export function xirrNewton(cashflows: CashFlow[], guess = 0.1) {
  let rate = guess;

  for (let i = 0; i < 100; i += 1) {
    const f = xnpv(rate, cashflows);
    if (!Number.isFinite(f)) return NaN;

    const h = 1e-7;
    const fp = xnpv(rate + h, cashflows);
    const derivative = (fp - f) / h;

    if (!Number.isFinite(derivative) || Math.abs(derivative) < 1e-12) return NaN;

    const next = rate - f / derivative;
    if (!Number.isFinite(next) || next <= -0.9999999999) return NaN;
    if (Math.abs(next - rate) < 1e-10) return next;
    rate = next;
  }

  return NaN;
}

export function xirrBisection(cashflows: CashFlow[]) {
  let low = -0.9999999999;
  let high = 10;

  let fLow = xnpv(low, cashflows);
  let fHigh = xnpv(high, cashflows);

  if (!Number.isFinite(fLow) || !Number.isFinite(fHigh)) return NaN;

  for (let i = 0; i < 50 && fLow * fHigh > 0; i += 1) {
    high *= 2;
    fHigh = xnpv(high, cashflows);
    if (!Number.isFinite(fHigh)) return NaN;
  }

  if (fLow * fHigh > 0) return NaN;

  for (let i = 0; i < 120; i += 1) {
    const mid = (low + high) / 2;
    const fMid = xnpv(mid, cashflows);

    if (!Number.isFinite(fMid)) return NaN;
    if (Math.abs(fMid) < 1e-12) return mid;

    if (fLow * fMid <= 0) {
      high = mid;
      fHigh = fMid;
    } else {
      low = mid;
      fLow = fMid;
    }

    if (Math.abs(high - low) < 1e-12) return (low + high) / 2;
  }

  return (low + high) / 2;
}

// Cash-flow sets with unusual sign patterns (e.g. invest, partial payout,
// invest again) can mathematically have more than one rate that zeroes the
// NPV, or none at all. There's no way to guarantee "the one true answer" in
// that case — but trying several starting points and keeping only the ones
// that actually verify (|NPV| ~ 0) makes single-root cases far more
// reliable than one fixed guess, and picking the smallest-magnitude root
// among verified candidates matches the conventional XIRR convention.
export function solveXirr(cashflows: CashFlow[]) {
  const sorted = [...cashflows].sort((a, b) => utcDay(a.date) - utcDay(b.date));
  const seeds = [0.1, 0.3, -0.3, 0.5, -0.5, 1, 2, -0.9];

  const verified: number[] = [];
  for (const seed of seeds) {
    const candidate = xirrNewton(sorted, seed);
    if (!Number.isFinite(candidate) || candidate <= -0.999999) continue;
    const check = xnpv(candidate, sorted);
    if (Number.isFinite(check) && Math.abs(check) < 1e-4) {
      verified.push(candidate);
    }
  }

  if (verified.length) {
    verified.sort((a, b) => Math.abs(a) - Math.abs(b));
    return verified[0];
  }

  const bisected = xirrBisection(sorted);
  if (Number.isFinite(bisected)) {
    const check = xnpv(bisected, sorted);
    if (Number.isFinite(check) && Math.abs(check) < 1e-4) return bisected;
  }

  return NaN;
}

export function xirr(cashflows: CashFlow[]) {
  const valid = cashflows.filter(
    (f) => typeof f.amount === "number" && Number.isFinite(f.amount) && !!f.date
  );
  if (valid.length < 2) return NaN;

  const hasPos = valid.some((f) => (f.amount as number) > 0);
  const hasNeg = valid.some((f) => (f.amount as number) < 0);
  if (!hasPos || !hasNeg) return NaN;

  return solveXirr(valid);
}

export function isFlowValid(flow: CashFlow) {
  return (
    typeof flow.amount === "number" &&
    Number.isFinite(flow.amount) &&
    flow.amount !== 0 &&
    !!flow.date
  );
}