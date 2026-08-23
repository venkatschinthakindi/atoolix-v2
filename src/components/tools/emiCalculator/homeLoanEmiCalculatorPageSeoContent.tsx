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
    description: "Calculate home loan EMI, total interest, amortization, and compare prepayment scenarios online.",
    offers: {
      "@type": "Offer",
      price: 0,
    },
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 text-white">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={appSchema} />
      <section className="space-y-4" aria-labelledby="home-loan-intro">
        <SectionHeading id="home-loan-intro" title="Home Loan EMI Calculator" description="Estimate monthly EMI, total interest, and the effect of prepayments." />
        <p className="text-sm leading-7 text-white/65">A home loan EMI depends mainly on the loan amount, annual interest rate, and repayment tenure. Use the calculator to compare monthly payments and understand how changing the rate or tenure affects total repayment.</p>
        <p className="text-sm leading-7 text-white/65">Home loans often run for many years, so a small change in interest rate or tenure can materially change the total interest paid. You can test different combinations before discussing a loan offer with a lender.</p>
        <p className="text-sm leading-7 text-white/65">Atoolix uses the standard reducing-balance EMI formula with the annual rate converted to a monthly rate. A lender's actual schedule may differ because repayment frequency, rate resets, fees, insurance, taxes, rounding, disbursement timing, and lender-specific rules vary.</p>
      </section>
      <section className="space-y-4" aria-labelledby="home-loan-planning">
        <SectionHeading id="home-loan-planning" title="Home Loan Planning Scenarios" description="Use the calculator to compare decisions that can change the cost of a long-term mortgage." />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><h3 className="font-semibold text-white">Compare loan tenures</h3><p className="mt-2 text-sm leading-7 text-white/60">A longer tenure generally lowers the monthly EMI but keeps the principal outstanding for longer. Compare a comfortable EMI with the total interest cost before choosing a repayment period.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><h3 className="font-semibold text-white">Test an interest-rate change</h3><p className="mt-2 text-sm leading-7 text-white/60">Compare the repayment impact of different rates. This is useful when evaluating loan offers or understanding how a rate change could affect an existing repayment plan.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><h3 className="font-semibold text-white">Model a lump-sum prepayment</h3><p className="mt-2 text-sm leading-7 text-white/60">Enter an additional principal payment and compare the resulting interest and repayment period with the original schedule.</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><h3 className="font-semibold text-white">Compare EMI versus tenure reduction</h3><p className="mt-2 text-sm leading-7 text-white/60">After a prepayment, reducing the future EMI can improve monthly cash flow, while keeping the EMI higher can generally repay principal sooner. The lender's rules determine which option is available.</p></div>
        </div>
      </section>
      <section className="space-y-4" aria-labelledby="home-loan-example">
        <SectionHeading id="home-loan-example" title="Illustrative Home Loan EMI Example" description="A simple example to show how principal, rate, and tenure interact." />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">
          <p>For example, a ₹50,00,000 loan at 8.5% annual interest over 20 years produces an estimated EMI of about ₹43,391 using the standard reducing-balance formula. Extending the tenure can reduce the monthly payment, but it also increases the number of months over which interest accrues.</p>
          <p className="mt-3">This is an illustration, not a lender quote. Processing fees, insurance, taxes, rate resets, rounding, disbursement timing, and lender-specific repayment rules can change the actual schedule.</p>
        </div>
      </section>
      <section className="space-y-4" aria-labelledby="home-loan-formula">
        <SectionHeading id="home-loan-formula" title="How Home Loan EMI Is Calculated" description="Reducing-balance loan calculation." />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">Atoolix uses EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is principal, r is the monthly interest rate, and n is the number of monthly payments. The calculator applies monthly interest to the outstanding balance and adjusts the final payment when the remaining balance is smaller than the regular EMI. Lender schedules can differ when their repayment conventions or terms differ.</div>
      </section>
      <section className="space-y-4" aria-labelledby="home-loan-faq">
        <SectionHeading id="home-loan-faq" title="Home Loan EMI Questions" description="Common questions about repayment and prepayment." />
        <div className="space-y-4 text-sm leading-7 text-white/65">
          <div><h3 className="font-semibold text-white">Does a longer home-loan tenure reduce total interest?</h3><p>No. It normally reduces the monthly EMI but increases total interest because the principal remains outstanding for longer.</p></div>
          <div><h3 className="font-semibold text-white">Does home-loan prepayment reduce interest?</h3><p>A principal prepayment can reduce future interest because it reduces the outstanding balance earlier. The exact saving depends on timing, amount, rate, remaining tenure, and lender rules.</p></div>
          <div><h3 className="font-semibold text-white">Should I reduce EMI or tenure after a prepayment?</h3><p>Keeping the EMI similar and shortening the tenure can increase interest savings, while reducing EMI provides more monthly cash-flow flexibility. Your lender's terms determine which option is available.</p></div>
          <div><h3 className="font-semibold text-white">Will this calculator exactly match my bank's schedule?</h3><p>Not necessarily. The calculator provides an estimate from your inputs. Fees, insurance, taxes, rate changes, rounding, disbursement timing, repayment frequency, and lender-specific rules can change the final repayment schedule.</p></div>
        </div>
      </section>
      <section className="space-y-4" aria-labelledby="related-loan-calculators">
        <SectionHeading id="related-loan-calculators" title="Related Loan EMI Calculators" description="Compare the home-loan calculation with other loan types." />
        <div className="grid gap-4 md:grid-cols-3">
          <a href="/tools/calculator/emi-calculator" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"><h3 className="font-semibold">EMI Calculator</h3><p className="mt-2 text-sm text-white/55">Compare general loan repayment scenarios and switch between home, car, and personal loan calculations.</p></a>
          <a href="/tools/calculator/car-loan-emi-calculator" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"><h3 className="font-semibold">Car Loan EMI Calculator</h3><p className="mt-2 text-sm text-white/55">Estimate vehicle-loan EMI, total interest, and the effect of extra payments.</p></a>
          <a href="/tools/calculator/personal-loan-emi-calculator" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"><h3 className="font-semibold">Personal Loan EMI Calculator</h3><p className="mt-2 text-sm text-white/55">Calculate unsecured-loan EMI and compare rate and tenure scenarios.</p></a>
        </div>
      </section>
    </div>
  );
}
