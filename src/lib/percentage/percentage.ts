/**
 * Percentage Calculation Utilities
 *
 * Shared by all percentage calculator components.
 * Pure functions only (no React dependencies).
 */

/**
 * Round to a given number of decimal places.
 */
export function round(value: number, decimals = 2): number {
  if (!Number.isFinite(value)) return NaN;

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * What is X% of Y?
 *
 * Example:
 * 20% of 500 = 100
 */
export function percentageOf(value: number, percent: number): number {
  return (value * percent) / 100;
}

/**
 * X is what percent of Y?
 *
 * Example:
 * 25 is what % of 400?
 * = 6.25
 */
export function percentOf(part: number, whole: number): number {
  if (whole === 0) return NaN;

  return (part / whole) * 100;
}

/**
 * Increase a value by X%.
 *
 * Example:
 * 100 increased by 20%
 * = 120
 */
export function increaseByPercent(
  value: number,
  percent: number
): number {
  return value * (1 + percent / 100);
}

/**
 * Decrease a value by X%.
 *
 * Example:
 * 100 decreased by 20%
 * = 80
 */
export function decreaseByPercent(
  value: number,
  percent: number
): number {
  return value * (1 - percent / 100);
}

/**
 * Percentage Difference
 *
 * Example:
 * 100 vs 120
 * = 18.18%
 */
export function percentageDifference(
  first: number,
  second: number
): number {
  if (first === second) return 0;

  const average = (Math.abs(first) + Math.abs(second)) / 2;

  if (average === 0) return NaN;

  return (Math.abs(first - second) / average) * 100;
}

/**
 * Percentage Change
 *
 * Example:
 * 100 → 125
 * = 25%
 *
 * 100 → 75
 * = -25%
 */
export function percentageChange(
  oldValue: number,
  newValue: number
): number {
  if (oldValue === 0) return NaN;

  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Reverse Percentage
 *
 * Example:
 * Final = 120
 * Increase = 20%
 *
 * Original = 100
 */
export function reversePercentage(
  finalValue: number,
  percent: number
): number {
  return finalValue / (1 + percent / 100);
}

/**
 * Discount Calculator
 *
 * Example:
 * ₹500
 * 20%
 *
 * Final = ₹400
 */
export function discountAmount(
  originalPrice: number,
  percent: number
): number {
  return originalPrice * (percent / 100);
}

export function discountedPrice(
  originalPrice: number,
  percent: number
): number {
  return originalPrice - discountAmount(originalPrice, percent);
}

/**
 * Markup Calculator
 *
 * Cost = 100
 * Markup = 30%
 *
 * Selling = 130
 */
export function markupPrice(
  cost: number,
  markupPercent: number
): number {
  return cost * (1 + markupPercent / 100);
}

/**
 * Profit Margin (%)
 *
 * Cost = 100
 * Selling = 130
 *
 * Margin = 23.08%
 */
export function profitMargin(
  cost: number,
  sellingPrice: number
): number {
  if (sellingPrice === 0) return NaN;

  return ((sellingPrice - cost) / sellingPrice) * 100;
}

/**
 * GST / VAT
 *
 * Price = 100
 * GST = 18%
 */
export function gstAmount(
  amount: number,
  gstPercent: number
): number {
  return amount * gstPercent / 100;
}

export function amountWithGst(
  amount: number,
  gstPercent: number
): number {
  return amount + gstAmount(amount, gstPercent);
}

export function commissionAmount(sale: number, percent: number): number {
  return sale * (percent / 100);
}

export function payoutAfterCommission(sale: number, percent: number): number {
  return sale - commissionAmount(sale, percent);
}

export function tipAmount(bill: number, percent: number): number {
  return bill * (percent / 100);
}

export function totalWithTip(bill: number, percent: number): number {
  return bill + tipAmount(bill, percent);
}

export function profit(cost: number, selling: number): number {
  return selling - cost;
}

export function profitPercent(cost: number, selling: number): number {
  if (cost === 0) return NaN;
  return ((selling - cost) / cost) * 100;
}

export function lossPercent(cost: number, selling: number): number {
  if (cost === 0) return NaN;
  return ((cost - selling) / cost) * 100;
}

export function simpleInterest(
  principal: number,
  rate: number,
  time: number
): number {
  return (principal * rate * time) / 100;
}

export function totalWithInterest(
  principal: number,
  rate: number,
  time: number
): number {
  return principal + simpleInterest(principal, rate, time);
}

export function compoundAmount(
  principal: number,
  rate: number,
  time: number,
  frequency = 1
): number {
  return (
    principal *
    Math.pow(1 + rate / (100 * frequency), frequency * time)
  );
}
/**
 * Gross Margin %
 * (Selling - Cost) / Selling × 100
 */
export function marginPercent(cost: number, selling: number): number {
  if (selling === 0) return NaN;
  return ((selling - cost) / selling) * 100;
}
/**
 * ROI %
 * (Gain - Cost) / Cost × 100
 */
export function roiPercent(cost: number, gain: number): number {
  if (cost === 0) return NaN;
  return ((gain - cost) / cost) * 100;
}

/**
 * Find cost price from selling price & profit %
 */
export function reverseCostFromProfit(
  sellingPrice: number,
  profitPercent: number
): number {
  return sellingPrice / (1 + profitPercent / 100);
}
/**
 * Find selling price from cost & profit %
 */
export function sellingPriceFromProfit(
  cost: number,
  profitPercent: number
): number {
  return cost * (1 + profitPercent / 100);
}
/**
 * Reverse discount → original price
 * final = original - %
 */
export function originalPriceFromDiscount(
  finalPrice: number,
  discountPercent: number
): number {
  if (discountPercent === 100) return NaN;
  return finalPrice / (1 - discountPercent / 100);
}

/**
 * Remove GST from final price
 */
export function basePriceFromGst(
  total: number,
  gstPercent: number
): number {
  return total / (1 + gstPercent / 100);
}

/**
 * Break-even price (no profit, no loss)
 */
export function breakevenPrice(
  cost: number,
  fixedExpenses: number
): number {
  return cost + fixedExpenses;
}

export const PercentageEngine = {
  of: percentageOf,
  percent: percentOf,
  increase: increaseByPercent,
  decrease: decreaseByPercent,
  change: percentageChange,
  reverse: reversePercentage,

//   discount,
//   markup,
//   commission,
//   gst,

  profit,
  profitPercent,

  simpleInterest,
//   compoundGrowth,
};