import Link from "next/link";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl.replace(/\/$/, "");
const pageUrl = `${siteUrl}/tools/calculator/home-loan-emi-calculator`;

type FaqItem = { q: string; a: string };
type FeatureItem = { title: string; desc: string; icon: string };
type ScenarioItem = { title: string; desc: string; icon: string };
type AudienceItem = { title: string; desc: string; icon: string };

const featureItems: FeatureItem[] = [
  { title: "Reducing-balance EMI", desc: "Calculates monthly EMI using the standard reducing-balance formula applied to home loans.", icon: "🏠" },
  { title: "Full amortization view", desc: "See the month-by-month split between principal and interest across the entire tenure.", icon: "📊" },
  { title: "Prepayment modeling", desc: "Enter a lump-sum or recurring prepayment and compare the resulting interest savings.", icon: "💰" },
  { title: "Tenure vs. EMI trade-off", desc: "Compare a lower EMI over a longer tenure against a higher EMI that clears the loan sooner.", icon: "⚖️" },
  { title: "Rate sensitivity", desc: "Test how a higher or lower interest rate changes the monthly payment and total interest.", icon: "📈" },
  { title: "Free and instant", desc: "No signup required. Results update as you change the loan amount, rate, or tenure.", icon: "⚡" },
];

const scenarios: ScenarioItem[] = [
  { title: "Compare loan tenures", desc: "A longer tenure generally lowers the monthly EMI but keeps the principal outstanding for longer, increasing total interest.", icon: "📅" },
  { title: "Test an interest-rate change", desc: "Compare the repayment impact of different rates when evaluating offers from different lenders.", icon: "🔁" },
  { title: "Model a lump-sum prepayment", desc: "Enter an additional principal payment and compare the resulting interest and repayment period with the original schedule.", icon: "💵" },
  { title: "Compare EMI vs. tenure reduction after prepayment", desc: "Keeping the EMI the same after a prepayment can shorten the tenure and save more interest; lowering the EMI instead improves monthly cash flow. The lender's rules determine which options are available.", icon: "🔀" },
];

const audienceItems: AudienceItem[] = [
  { title: "First-time home buyers", desc: "Estimate the monthly commitment before applying, and compare how down payment size changes the loan amount needed.", icon: "🏡" },
  { title: "Homeowners evaluating a refinance", desc: "Compare your current EMI against a hypothetical lower rate to see whether refinancing could reduce total interest.", icon: "🔄" },
  { title: "Borrowers planning prepayments", desc: "Model how directing a bonus or windfall toward the principal changes the remaining tenure or EMI.", icon: "🎯" },
  { title: "Anyone comparing loan offers", desc: "Run the same loan amount through different rate and tenure combinations from multiple lenders side by side.", icon: "🧮" },
];

const faqItems: FaqItem[] = [
  { q: "Does a longer home-loan tenure reduce total interest?", a: "No. A longer tenure normally reduces the monthly EMI but increases total interest, because the principal remains outstanding for longer." },
  { q: "Does home-loan prepayment reduce interest?", a: "A principal prepayment can reduce future interest because it reduces the outstanding balance earlier. The exact saving depends on timing, amount, rate, remaining tenure, and lender rules." },
  { q: "Should I reduce EMI or tenure after a prepayment?", a: "Keeping the EMI similar and shortening the tenure can increase interest savings, while reducing the EMI provides more monthly cash-flow flexibility. Your lender's terms determine which option is available." },
  { q: "Will this calculator exactly match my bank's schedule?", a: "Not necessarily. The calculator provides an estimate from your inputs. Fees, insurance, taxes, rate changes, rounding, disbursement timing, repayment frequency, and lender-specific rules can change the final repayment schedule." },
  { q: "What is the difference between a fixed and floating home loan rate?", a: "A fixed rate stays the same for an agreed period or the full tenure, giving predictable EMIs. A floating rate moves with the lender's benchmark rate, so the EMI or tenure can change over time. Check which type your lender is quoting before comparing offers." },
  { q: "How does the down payment affect my EMI?", a: "A larger down payment reduces the loan principal, which lowers both the EMI and the total interest paid over the tenure, assuming the rate and tenure stay the same." },
  { q: "Can I get tax benefits on a home loan in India?", a: "Home loan borrowers in India can potentially claim a deduction on the principal repaid under Section 80C (within its combined ₹1.5 lakh annual limit) and on interest paid under Section 24(b) (up to ₹2 lakh a year for a self-occupied property), subject to conditions. Tax rules change and depend on individual circumstances, so confirm current limits and eligibility with a tax advisor before relying on them." },
  { q: "What documents do lenders typically ask for when applying?", a: "Requirements vary by lender, but commonly include identity and address proof, income proof (salary slips or tax returns), bank statements, and property documents. Check directly with your lender for their exact list." },
  { q: "Does increasing the tenure always lower the EMI?", a: "Increasing tenure generally lowers the EMI for the same loan amount and rate, but there is a practical limit — very long tenures produce diminishing EMI reductions while total interest keeps rising." },
  { q: "Is this home loan EMI calculator free to use?", a: "Yes. The calculator is free, requires no signup, and can be used as many times as needed to compare scenarios." },
];

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
        <p className="text-sm leading-7 text-white/65">Atoolix uses the standard reducing-balance EMI formula with the annual rate converted to a monthly rate. A lender&apos;s actual schedule may differ because repayment frequency, rate resets, fees, insurance, taxes, rounding, disbursement timing, and lender-specific rules vary.</p>
      </section>

      <section className="space-y-4" aria-labelledby="home-loan-features">
        <SectionHeading id="home-loan-features" title="What the Home Loan EMI Calculator Does" description="A quick overview of what you can check before applying or refinancing." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((item) => (
            <article key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-lg" aria-hidden="true">{item.icon}</div>
              <h3 className="mt-2 text-sm font-semibold sm:text-[0.95rem]">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="home-loan-planning">
        <SectionHeading id="home-loan-planning" title="Home Loan Planning Scenarios" description="Use the calculator to compare decisions that can change the cost of a long-term mortgage." />
        <div className="grid gap-4 md:grid-cols-2">
          {scenarios.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/60">{item.desc}</p>
            </div>
          ))}
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

      <section className="space-y-4" aria-labelledby="home-loan-tax">
        <SectionHeading id="home-loan-tax" title="Home Loan Tax Benefits (India)" description="A home loan is one of the few loan types with dedicated tax provisions — a factor that doesn't apply to car or personal loans." />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65 space-y-3">
          <p>In India, home loan borrowers can potentially claim two separate deductions: principal repaid under <strong>Section 80C</strong> (within its combined ₹1.5 lakh annual limit, shared with other 80C investments) and interest paid under <strong>Section 24(b)</strong> (up to ₹2 lakh a year for a self-occupied property).</p>
          <p>Eligibility and limits depend on factors such as property possession status, whether the property is self-occupied or let out, and the tax regime chosen. Tax rules change over time, so treat these figures as general awareness rather than current, individually applicable advice — confirm with a tax advisor or the Income Tax Department before relying on them for a filing decision.</p>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="home-loan-audience">
        <SectionHeading id="home-loan-audience" title="Who Uses This Calculator" description="Common situations where checking the numbers first helps." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {audienceItems.map((item) => (
            <article key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-lg" aria-hidden="true">{item.icon}</div>
              <h3 className="mt-2 text-sm font-semibold sm:text-[0.95rem]">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="home-loan-faq">
        <SectionHeading id="home-loan-faq" title="Home Loan EMI Questions" description="Common questions about repayment, prepayment, and tax treatment." />
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.q} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer text-sm font-semibold">{item.q}</summary>
              <p className="mt-2 text-sm leading-6 text-white/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="related-loan-calculators">
        <SectionHeading id="related-loan-calculators" title="Related Loan EMI Calculators" description="Compare the home-loan calculation with other loan types." />
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/tools/calculator/emi-calculator" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"><h3 className="font-semibold">EMI Calculator</h3><p className="mt-2 text-sm text-white/55">Compare general loan repayment scenarios and switch between home, car, and personal loan calculations.</p></Link>
          <Link href="/tools/calculator/car-loan-emi-calculator" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"><h3 className="font-semibold">Car Loan EMI Calculator</h3><p className="mt-2 text-sm text-white/55">Estimate vehicle-loan EMI, total interest, and the effect of extra payments.</p></Link>
          <Link href="/tools/calculator/personal-loan-emi-calculator" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"><h3 className="font-semibold">Personal Loan EMI Calculator</h3><p className="mt-2 text-sm text-white/55">Calculate unsecured-loan EMI and compare rate and tenure scenarios.</p></Link>
        </div>
      </section>

      <RelatedTools toolId="calculator/home-loan-emi-calculator" />
    </div>
  );
}
