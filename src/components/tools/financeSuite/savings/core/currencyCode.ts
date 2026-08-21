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