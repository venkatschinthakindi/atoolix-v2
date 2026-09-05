import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl.replace(/\/$/, "");
const pageUrl = `${siteUrl}/tools/calculator/emi-calculator`;

export default function EmiCalculatorHubSeoContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteUrl}/tools/calculator` },
      { "@type": "ListItem", position: 3, name: "EMI Calculator", item: pageUrl },
    ],
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EMI Calculator",
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description:
      "Free EMI calculator for home, car, and personal loans with repayment and prepayment comparisons.",
    offers: {
      "@type": "Offer",
      price: 0,
    },
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 text-foreground">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={appSchema} />

      <section aria-labelledby="emi-hub-intro" className="space-y-4">
        <SectionHeading
          id="emi-hub-intro"
          title="EMI Calculator — Home, Car & Personal Loans"
          description="Calculate monthly loan payments and compare repayment scenarios."
        />
        <p className="text-sm leading-7 text-foreground-secondary">
          An EMI calculator estimates the monthly payment for an amortizing loan from the principal, interest rate, and repayment tenure. Use this general calculator when you want to compare loan scenarios, then choose a dedicated calculator when you know the loan type.
        </p>
        <p className="text-sm leading-7 text-foreground-secondary">
          You can compare rates and tenures, review total interest, inspect repayment schedules, and model additional payments. Results are estimates based on your inputs and can differ from a lender&apos;s final schedule because fees, insurance, taxes, rate changes, rounding, and lender-specific rules may apply.
        </p>
      </section>

      <section aria-labelledby="emi-types" className="space-y-4">
        <SectionHeading
          id="emi-types"
          title="Which EMI Calculator Should You Use?"
          description="Choose the calculator that matches the loan you are planning."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <a href="/tools/calculator/home-loan-emi-calculator" className="rounded-2xl border border-border bg-card p-5 hover:bg-surface-raised transition">
            <h3 className="font-semibold">Home Loan EMI Calculator</h3>
            <p className="mt-2 text-sm text-foreground-faint">Calculate housing-loan EMI and compare prepayment, interest, and tenure scenarios.</p>
          </a>
          <a href="/tools/calculator/car-loan-emi-calculator" className="rounded-2xl border border-border bg-card p-5 hover:bg-surface-raised transition">
            <h3 className="font-semibold">Car Loan EMI Calculator</h3>
            <p className="mt-2 text-sm text-foreground-faint">Estimate vehicle-loan EMI and compare tenure, interest, and extra-payment scenarios.</p>
          </a>
          <a href="/tools/calculator/personal-loan-emi-calculator" className="rounded-2xl border border-border bg-card p-5 hover:bg-surface-raised transition">
            <h3 className="font-semibold">Personal Loan EMI Calculator</h3>
            <p className="mt-2 text-sm text-foreground-faint">Calculate unsecured-loan EMI and understand how rate and tenure affect total repayment.</p>
          </a>
        </div>
      </section>

      <section aria-labelledby="emi-formula" className="space-y-4">
        <SectionHeading
          id="emi-formula"
          title="How EMI Is Calculated"
          description="The standard reducing-balance formula for an amortizing loan."
        />
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3 text-sm text-foreground-secondary leading-7">
          <p>EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is principal, r is the monthly interest rate, and n is the number of monthly payments.</p>
          <p>Because interest is charged on the outstanding balance, the interest portion is generally higher earlier in the schedule while the principal portion increases later. A lower rate or shorter tenure can reduce total interest, although a shorter tenure normally increases the monthly EMI.</p>
        </div>
      </section>

      <section aria-labelledby="emi-faq" className="space-y-4">
        <SectionHeading id="emi-faq" title="EMI Calculator Questions" description="Common questions before calculating a loan payment." />
        <div className="space-y-4 text-sm text-foreground-secondary leading-7">
          <div><h3 className="font-semibold text-foreground">What does EMI mean?</h3><p>EMI means Equated Monthly Instalment. It is the scheduled monthly payment used to repay principal and interest over the loan tenure.</p></div>
          <div><h3 className="font-semibold text-foreground">Does a longer tenure reduce total interest?</h3><p>No. A longer tenure usually lowers the monthly EMI but increases total interest because the balance remains outstanding for longer.</p></div>
          <div><h3 className="font-semibold text-foreground">Can an EMI calculator show prepayment savings?</h3><p>Yes, when the calculator supports prepayments or extra monthly payments. You can compare the original schedule with a faster repayment scenario.</p></div>
          <div><h3 className="font-semibold text-foreground">Will the result exactly match my lender?</h3><p>Not necessarily. Lender fees, insurance, taxes, rate changes, rounding, and repayment rules can change the final schedule.</p></div>
        </div>
      </section>
    </div>
  );
}
