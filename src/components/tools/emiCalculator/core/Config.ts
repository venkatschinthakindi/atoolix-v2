import type { LoanType } from "@/components/tools/emiCalculator/core/Engine";
import { sharedConfig } from "@/config/shared";

export const SITE_URL = sharedConfig.siteUrl?.replace(/\/$/, "") ?? "https://atoolix.com";

export const ROUTE_MAP: Record<LoanType, string> = {
  home: "/tools/calculator/home-loan-emi-calculator",
  car: "/tools/calculator/car-loan-emi-calculator",
  personal: "/tools/calculator/personal-loan-emi-calculator",
};

export const HUB_ROUTE = "/tools/calculator/emi-calculator";

export type LoanPageCopy = {
  h1: string;
  intro: string;
  faqs: { q: string; a: string }[];
};

export const HUB_COPY: LoanPageCopy = {
  h1: "EMI Calculator",
  intro:
    "One calculator, three loan types. Pick Home, Car, or Personal below and the calculator adapts its defaults — loan amount range, typical rate, and tenure — to that product, while the underlying math stays identical across all three. If you already know which loan you're calculating, jump straight to the dedicated home loan, car loan, or personal loan EMI calculator page for content tailored to that product.",
  faqs: [
    { q: "Which loan type should I pick if I'm not sure?", a: "Home loans are long-tenure and lower-rate (usually 15–30 years), car loans are mid-tenure (3–7 years), and personal loans are shorter-tenure and often higher-rate because they are unsecured. Pick whichever matches what you're actually borrowing for — the calculator adjusts sensible defaults either way." },
    { q: "Can I switch loan types without losing my inputs?", a: "Switching loan type resets the amount, rate, and tenure to that product's typical defaults — it's meant as a starting point per product rather than preserving custom numbers across very different loan types." },
  ],
};

export const LOAN_PAGE_COPY: Record<LoanType, LoanPageCopy> = {
  home: {
    h1: "Home Loan EMI Calculator",
    intro:
      "A home loan is usually the largest, longest-running debt most people take on — often 15 to 30 years — so even small differences in rate or tenure compound into large amounts of interest. This calculator estimates your monthly EMI using a standard reducing-balance formula with monthly rate conversion, then lets you model lump-sum prepayments or additional monthly payments. Actual lender calculations can differ because repayment frequency, rate resets, fees, rounding, and lender-specific rules vary.",
    faqs: [
      { q: "How is home loan EMI calculated?", a: "Atoolix calculates EMI using the standard reducing-balance formula EMI = P × r × (1+r)ⁿ ÷ [(1+r)ⁿ − 1], where P is principal, r is the annual rate converted to a monthly rate, and n is the number of monthly payments. The calculator applies interest to the outstanding balance each month. A lender's actual schedule can differ because of its repayment conventions, fees, rate changes, rounding, or other terms." },
      { q: "Does prepaying a home loan actually save money?", a: "A principal prepayment can reduce future interest because the outstanding balance becomes smaller. The amount saved depends on when you prepay, how much you pay, the interest rate, the remaining tenure, and the lender's terms." },
      { q: "Should I reduce my EMI or shorten my tenure after a prepayment?", a: "Shortening the tenure while keeping the EMI similar can save more interest because the principal is repaid sooner. Reducing the EMI can provide more monthly cash-flow flexibility. Your lender's available options and terms determine the actual outcome." },
    ],
  },
  car: {
    h1: "Car Loan EMI Calculator",
    intro:
      "Car loans move faster than home loans — typically 3 to 7 years — but the shorter tenure means the EMI takes up a bigger slice of the loan amount each month. This calculator gives you a quick, reducing-balance EMI estimate for a new or used vehicle loan, and shows what happens if you pay a bit extra toward the principal. Actual lender schedules can differ because rates, fees, repayment conventions, and prepayment rules vary.",
    faqs: [
      { q: "How is car loan EMI different from a flat-rate auto loan?", a: "This calculator uses the reducing-balance method, where monthly interest is calculated from the outstanding balance. Some lenders or dealers may quote loans using different pricing conventions, so compare total repayment and terms rather than relying only on the advertised rate." },
      { q: "Can I prepay a car loan without a penalty?", a: "It depends on your lender — some auto loans carry a prepayment or foreclosure charge, especially in the first year. Check your loan agreement before assuming it's free." },
      { q: "Is a longer tenure ever a good idea for a car loan?", a: "It lowers your EMI but increases total interest and extends how long the car is worth less than what you owe on it. It can help cash flow, but compare total repayment before choosing a longer term." },
    ],
  },
  personal: {
    h1: "Personal Loan EMI Calculator",
    intro:
      "Personal loans are unsecured, which is why they can carry higher interest rates than secured loans such as home or vehicle loans — there is no pledged asset backing the lender's risk. With tenures commonly shorter than home loans, extra payments made early can still reduce the outstanding balance and future interest. Actual rates, fees, tenure limits, and prepayment rules depend on the lender and borrower.",
    faqs: [
      { q: "Why is my personal loan interest rate so much higher than a home loan?", a: "Personal loans are unsecured — you haven't pledged an asset against the loan — so lenders may price the loan differently based on factors such as credit history, income, existing obligations, loan amount, and lender policy." },
      { q: "Is there a prepayment penalty on personal loans?", a: "Some lenders charge a foreclosure or prepayment fee, while others have eligibility or timing restrictions. Check your loan agreement and current lender terms before making an additional payment." },
      { q: "What's the difference between EMI reduction and principal reduction?", a: "A principal prepayment reduces the outstanding balance directly. A lower EMI changes the future payment amount according to the lender's recalculation rules. The effect on total interest depends on the amount, timing, remaining tenure, and lender terms." },
    ],
  },
};

// Page <title>/<meta description> come from src/data/tools.ts via generateMetadata().
// This file owns the on-page H1/intro/FAQ copy rendered in the body.
