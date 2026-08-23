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
      "Estimate your car loan EMI from the financed amount, annual interest rate, and repayment tenure. Vehicle loans are often shorter than home loans, so comparing the monthly payment with total interest can help you choose a repayment period that fits your budget. You can also use the calculator to model additional payments or prepayments when those options are available to you. Actual lender schedules can differ because rates, fees, repayment frequency, rounding, and prepayment rules vary.",
    faqs: [
      { q: "How is car loan EMI calculated?", a: "Atoolix estimates car loan EMI using the standard reducing-balance formula: EMI = P × r × (1+r)ⁿ ÷ [(1+r)ⁿ − 1]. Here P is the financed principal, r is the annual interest rate converted to a monthly rate, and n is the number of monthly payments. Your lender's actual repayment schedule can differ because its rate, fees, repayment conventions, rounding, or other loan terms may be different." },
      { q: "How is a reducing-balance car loan different from a flat-rate quote?", a: "A reducing-balance calculation applies periodic interest to the outstanding principal as the balance falls. Some lenders or dealers may present financing using a different pricing convention. Compare the total repayment, fees, rate, and repayment terms rather than comparing advertised rates alone." },
      { q: "Can I prepay a car loan without a penalty?", a: "It depends on the lender and your loan agreement. Some vehicle loans may have prepayment or foreclosure charges or timing restrictions. Check the current terms of your loan before assuming an additional payment is free." },
      { q: "Does a longer car-loan tenure reduce the total cost?", a: "A longer tenure generally lowers the regular EMI but gives interest more time to accrue, which can increase total interest. Compare both monthly affordability and total repayment before choosing the term." },
      { q: "Can I use the calculator for a used car loan?", a: "Yes. The EMI calculation can be used for a new or used vehicle when you know the amount financed, annual interest rate, and repayment tenure. The lender's eligibility rules, fees, and rate may differ for used-car financing." },
    ],
  },
  personal: {
    h1: "Personal Loan EMI Calculator",
    intro:
      "Estimate your personal loan EMI from the amount borrowed, annual interest rate, and repayment tenure. Because personal loans are unsecured, lenders may price them differently from secured loans such as home or vehicle loans. Compare the monthly EMI with total repayment, and use the calculator's prepayment scenarios to understand how additional principal payments could change the schedule. Actual rates, fees, tenure limits, repayment conventions, and prepayment rules depend on the lender and your loan agreement.",
    faqs: [
      { q: "How is personal loan EMI calculated?", a: "Atoolix estimates personal loan EMI using the standard reducing-balance formula: EMI = P × r × (1+r)ⁿ ÷ [(1+r)ⁿ − 1]. P is the principal, r is the annual interest rate converted to a monthly rate, and n is the number of monthly payments. Your lender's actual schedule can differ because of its repayment conventions, fees, rounding, rate changes, or other loan terms." },
      { q: "Why can a personal loan have a higher interest rate than a home loan?", a: "Personal loans are generally unsecured, meaning there is no pledged asset securing the loan. Lenders can therefore price them differently from secured loans. The rate offered to an individual also depends on factors such as credit history, income, existing obligations, loan amount, tenure, and lender policy." },
      { q: "Can I make multiple prepayments on a personal loan?", a: "If your loan agreement allows additional principal payments, you can use the calculator to model multiple one-time prepayments at different points in the schedule. Check your lender's current prepayment or foreclosure terms before using a scenario for financial planning." },
      { q: "Can I add a recurring extra payment to my personal loan?", a: "If you have the option to pay more than the scheduled EMI, you can model a recurring additional payment to see how it could affect the outstanding balance, interest, and payoff time. Your lender's agreement determines whether such payments are permitted and how they are applied." },
      { q: "Is there a prepayment or foreclosure charge on personal loans?", a: "It depends on the lender, loan agreement, and applicable terms. Some personal loans may have prepayment or foreclosure charges or timing restrictions. Check the current terms of your specific loan before making an additional payment." },
      { q: "Does paying a personal loan early affect my credit score?", a: "Credit-score effects depend on the individual's credit profile and reporting history, so there is no universal result. Early repayment can change factors such as outstanding debt and account history, but this calculator does not predict credit-score changes; use it for the loan's payment and interest calculations only." },
      { q: "Does a longer personal-loan tenure reduce the total cost?", a: "A longer tenure can lower the scheduled EMI but may increase total interest because the balance remains outstanding for longer. Compare both monthly affordability and total repayment before choosing a term." },
    ],
  },
};

// Page <title>/<meta description> come from src/data/tools.ts via generateMetadata().
// This file owns the on-page H1/intro/FAQ copy rendered in the body.
