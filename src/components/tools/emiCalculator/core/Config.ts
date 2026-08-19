import type { LoanType } from "@/components/tools/emiCalculator/core/Engine";
import { serverConfig } from "@/config/client";
// TODO: replace with your real production domain (used for canonical URLs
// and JSON-LD). Pulling from an env var keeps preview deployments honest.
export const SITE_URL =serverConfig.siteUrl?.replace(/\/$/, "") ??
  "https://atoolix.com";

/** Single source of truth for which loan type lives at which URL.
 *  The calculator component uses this to update the address bar client-side
 *  when someone switches tabs — nothing else should hardcode these paths. */
// Must exactly match the `id` field (and therefore the resolved URL) of
// each entry added to src/data/tools.ts.
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

/** Generic hub copy — deliberately distinct from LOAN_PAGE_COPY.home, so the
 *  hub page and the home-loan page don't render near-identical text. */
export const HUB_COPY: LoanPageCopy = {
  h1: "EMI Calculator",
  intro:
    "One calculator, three loan types. Pick Home, Car, or Personal below and the calculator adapts its defaults — loan amount range, typical rate, and tenure — to that product, while the underlying math stays identical across all three. If you already know which loan you're calculating, jump straight to the dedicated home loan, car loan, or personal loan EMI calculator page for content tailored to that product.",
  faqs: [
    {
      q: "Which loan type should I pick if I'm not sure?",
      a: "Home loans are long-tenure and lower-rate (usually 15–30 years), car loans are mid-tenure (3–7 years), and personal loans are short-tenure but higher-rate since they're unsecured (usually up to 5 years). Pick whichever matches what you're actually borrowing for — the calculator adjusts sensible defaults either way.",
    },
    {
      q: "Can I switch loan types without losing my inputs?",
      a: "Switching loan type resets the amount, rate, and tenure to that product's typical defaults — it's meant as a starting point per product rather than preserving custom numbers across very different loan types.",
    },
  ],
};

/**
 * Unique per-page H1/intro/FAQ, one entry per dedicated loan-type page.
 * Rendered server-side by each page.tsx (not by the shared client widget),
 * so this content is present in the initial HTML for crawlers without
 * depending on client JS — the actual fix for the 4 pages reading as
 * near-duplicates of each other.
 */
export const LOAN_PAGE_COPY: Record<LoanType, LoanPageCopy> = {
  home: {
    h1: "Home Loan EMI Calculator",
    intro:
      "A home loan is usually the largest, longest-running debt most people take on — often 15 to 30 years — so even small differences in rate or tenure compound into large amounts of interest. This calculator estimates your monthly EMI using the same reducing-balance method banks use, then lets you model what happens if you make a lump-sum prepayment after a bonus, or add a bit extra to every EMI.",
    faqs: [
      {
        q: "How is home loan EMI calculated?",
        a: "EMI is calculated on the outstanding balance each month using the standard formula EMI = P × r × (1+r)ⁿ ÷ [(1+r)ⁿ − 1]. Interest is charged only on what you still owe, not the original loan amount.",
      },
      {
        q: "Does prepaying a home loan actually save money?",
        a: "Yes. A prepayment in year 2 of a 20-year loan typically saves far more interest than the same amount paid in year 15, because it removes principal that would otherwise have accrued interest for the remaining tenure.",
      },
      {
        q: "Should I reduce my EMI or shorten my tenure after a prepayment?",
        a: "Shortening the tenure while keeping the EMI the same generally saves more total interest. Reducing the EMI instead frees up more monthly cash flow.",
      },
    ],
  },
  car: {
    h1: "Car Loan EMI Calculator",
    intro:
      "Car loans move faster than home loans — typically 3 to 7 years — but the shorter tenure means the EMI takes up a bigger slice of the loan amount each month. This calculator gives you a quick, reducing-balance EMI estimate for a new or used vehicle loan, and shows what happens if you pay a bit extra toward the principal.",
    faqs: [
      {
        q: "How is car loan EMI different from a flat-rate auto loan?",
        a: "This calculator uses the reducing-balance method, where interest is charged only on the remaining balance. Some dealers quote a flat (add-on) rate on the original amount instead, which usually costs more overall.",
      },
      {
        q: "Can I prepay a car loan without a penalty?",
        a: "It depends on your lender — some auto loans carry a prepayment or foreclosure charge, especially in the first year. Check your loan agreement before assuming it's free.",
      },
      {
        q: "Is a longer tenure ever a good idea for a car loan?",
        a: "It lowers your EMI but increases total interest and extends how long the car is worth less than what you owe on it. It can help cash flow, but it's rarely the cheapest option.",
      },
    ],
  },
  personal: {
    h1: "Personal Loan EMI Calculator",
    intro:
      "Personal loans are unsecured, which is why they carry noticeably higher interest rates than home or car loans — there's no collateral backing the lender's risk. With tenures usually capped around 5 years, extra payments made early have less time to compound but still meaningfully cut what you'll pay overall.",
    faqs: [
      {
        q: "Why is my personal loan interest rate so much higher than a home loan?",
        a: "Personal loans are unsecured — you haven't pledged an asset against the loan — so lenders price in more risk based on your credit score, income, and existing debt.",
      },
      {
        q: "Is there a prepayment penalty on personal loans?",
        a: "Many lenders charge a foreclosure fee, sometimes a percentage of the outstanding balance, and some restrict prepayment within the first 6–12 months.",
      },
      {
        q: "What's the difference between EMI reduction and principal reduction?",
        a: "Principal reduction pays down the balance directly, cutting total interest the most. EMI reduction keeps your tenure the same but lowers your future monthly payment.",
      },
    ],
  },
};

// Note: page <title>/<meta description> come from src/data/tools.ts
// (via getCachedTools() in each page.tsx's generateMetadata()) — this file
// only owns the on-page H1/intro/FAQ copy actually rendered in the body.