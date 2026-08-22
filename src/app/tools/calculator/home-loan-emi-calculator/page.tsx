import type { Metadata } from "next";
import HomeLoanEmiCalculatorPage from "@/components/tools/emiCalculator/calculators/HomeLoanEmiCalculatorPage";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator – Prepayment & Interest Savings",
  description:
    "Calculate home loan EMI, total interest, amortization, and prepayment savings. Compare loan tenure and extra-payment scenarios with a free online calculator.",
  alternates: {
    canonical: "https://atoolix.com/tools/calculator/home-loan-emi-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Home Loan EMI Calculator – Prepayment & Interest Savings",
    description:
      "Calculate home loan EMI, total interest, amortization, and prepayment savings with a free online calculator.",
    url: "https://atoolix.com/tools/calculator/home-loan-emi-calculator",
    type: "website",
  },
};

export default function HomeLoanEmiCalculatorRoute() {
  return <HomeLoanEmiCalculatorPage />;
}
