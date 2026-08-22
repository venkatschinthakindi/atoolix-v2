import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl.replace(/\/$/, "");
const pageUrl = `${siteUrl}/tools/calculator/home-loan-emi-calculator`;

export default function HomeLoanEmiCalculatorPageSeoContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteUrl}/tools/calculator` },
      { "@type": "ListItem", position: 3, name: "EMI Calculator", item: `${siteUrl}/tools/calculator/emi-calculator` },
      { "@type": "ListItem", position: 4, name: "Home Loan EMI Calculator", item: pageUrl },
    ],
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Home Loan EMI Calculator",
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Calculate home loan EMI, total interest, amortization, and prepayment savings online.",
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 text-white">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={appSchema} />
      <section className="space-y-4" aria-labelledby="home-loan-intro">
        <SectionHeading id="home-loan-intro" title="Home Loan EMI Calculator" description="Estimate monthly EMI, total interest, and the effect of prepayments." />
        <p className="text-sm leading-7 text-white/65">A home loan EMI depends mainly on the loan amount, annual interest rate, and repayment tenure. Use the calculator to compare monthly payments and understand how changing the rate or tenure affects total repayment.</p>
        <p className="text-sm leading-7 text-white/65">You can also model an early lump-sum prepayment or additional monthly payment. Paying down principal earlier can reduce future interest, while keeping the original EMI after a prepayment can shorten the repayment period. Actual lender schedules may differ because of fees, insurance, taxes, rate changes, rounding, and lender-specific rules.</p>
      </section>
      <section className="space-y-4" aria-labelledby="home-loan-formula">
        <SectionHeading id="home-loan-formula" title="How Home Loan EMI Is Calculated" description="Reducing-balance loan calculation." />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is principal, r is the monthly interest rate, and n is the number of monthly payments. Interest is calculated on the outstanding balance rather than the original principal throughout the entire tenure.</div>
      </section>
      <section className="space-y-4" aria-labelledby="home-loan-faq">
        <SectionHeading id="home-loan-faq" title="Home Loan EMI Questions" description="Common questions about repayment and prepayment." />
        <div className="space-y-4 text-sm leading-7 text-white/65">
          <div><h3 className="font-semibold text-white">Does a longer home-loan tenure reduce total interest?</h3><p>No. It normally reduces the monthly EMI but increases total interest because the principal remains outstanding for longer.</p></div>
          <div><h3 className="font-semibold text-white">Does home-loan prepayment reduce interest?</h3><p>Usually yes, because reducing principal earlier leaves a smaller balance on which future interest is calculated. The exact saving depends on timing, amount, rate, and lender rules.</p></div>
          <div><h3 className="font-semibold text-white">Should I reduce EMI or tenure after a prepayment?</h3><p>Keeping the EMI similar and shortening the tenure generally maximizes interest savings, while reducing EMI provides more monthly cash-flow flexibility.</p></div>
        </div>
      </section>
    </div>
  );
}
