import { CURRENCIES, CurrencyCode } from "./currencyCode";

export function createCurrencyFormatter(currency: CurrencyCode) {
  const meta = CURRENCIES[currency];

  const nf = new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
    minimumFractionDigits: currency === "JPY" ? 0 : 2,
  });

  return (value: number) =>
    nf.format(Number.isFinite(value) ? value : 0);
}