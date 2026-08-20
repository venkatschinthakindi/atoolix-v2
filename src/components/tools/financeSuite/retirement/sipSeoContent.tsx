import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
import { serverConfig } from "@/config/server";

const TOOL_PATH = "/tools/calculator/retirement-calculator";
const TOOL_URL = `${serverConfig.siteUrl.replace(/\/+$/, "")}${TOOL_PATH}`;

const LAST_REVIEWED = "August 2026";

const faqItems = [
  {
    q: "How much retirement corpus do I need?",
    a: "The retirement corpus you need depends on your annual retirement expenses, expected inflation, retirement duration, investment returns, withdrawal rate, taxes, healthcare costs, and other financial goals. A common planning shortcut is annual retirement expenses divided by a chosen withdrawal rate, but the result is only an estimate and should not be treated as a guaranteed target.",
  },
  {
    q: "What is a retirement corpus?",
    a: "A retirement corpus is the pool of investments or other financial assets intended to support living expenses after regular employment income stops. The required corpus depends on expected spending, retirement duration, investment returns, inflation, withdrawal strategy, and other sources of income.",
  },
  {
    q: "How is retirement corpus calculated?",
    a: "A simple planning estimate is Retirement Corpus = Annual Retirement Expenses ÷ Withdrawal Rate. For example, ₹6,00,000 of annual expenses at a 4% withdrawal rate gives ₹1.5 crore. A more complete retirement plan should also consider inflation, taxes, healthcare costs, investment returns, retirement duration, and other income.",
  },
  {
    q: "What is the 4% withdrawal rule?",
    a: "The 4% withdrawal rule is a retirement-planning guideline based on withdrawing approximately 4% of an initial portfolio during the first year and adjusting withdrawals over time under specific historical assumptions. It is not a guarantee of future portfolio sustainability, and a suitable withdrawal rate depends on the individual's circumstances and assumptions.",
  },
  {
    q: "What is FIRE?",
    a: "FIRE stands for Financial Independence, Retire Early. It is a financial planning approach focused on building enough invested assets to potentially cover living expenses without depending entirely on active employment income.",
  },
  {
    q: "What is Lean FIRE?",
    a: "Lean FIRE focuses on reaching financial independence while maintaining relatively low annual spending. Because the target spending level is lower, the required portfolio may also be lower, assuming the same withdrawal-rate methodology.",
  },
  {
    q: "What is Fat FIRE?",
    a: "Fat FIRE focuses on financial independence with a higher spending level and therefore generally requires a larger investment portfolio than a lower-spending FIRE plan.",
  },
  {
    q: "What is Coast FIRE?",
    a: "Coast FIRE describes a situation where existing investments may potentially grow to a future retirement target without additional contributions, assuming the required long-term return is achieved.",
  },
  {
    q: "How does inflation affect retirement planning?",
    a: "Inflation reduces the purchasing power of money over time. If retirement is several years away, current expenses may need to be increased to estimate the future amount required to maintain a similar lifestyle.",
  },
  {
    q: "What factors affect the retirement corpus?",
    a: "Important factors include current and future expenses, inflation, retirement age, life expectancy, investment returns, withdrawal rate, taxes, healthcare costs, debt, other income sources, and the level of spending flexibility available during retirement.",
  },
  {
    q: "What return rate should I assume for retirement planning?",
    a: "Use a return assumption that is reasonable for the portfolio and investment strategy being considered rather than relying on an optimistic return. Higher assumed returns reduce the estimated amount required, but they also increase the risk that the projection may not reflect future market performance.",
  },
  {
    q: "How long will my retirement corpus last?",
    a: "Corpus longevity depends on the starting portfolio, withdrawals, investment returns, inflation, taxes, retirement duration, and market conditions. A calculator provides a projection based on assumptions; it cannot guarantee how long an actual portfolio will last.",
  },
  {
    q: "Can I use SIPs for retirement planning?",
    a: "Yes. Regular investments such as SIPs can be used to build retirement wealth over time. The required monthly investment depends on the target corpus, current investments, investment horizon, expected return, and other assumptions.",
  },
  {
    q: "How much should I save every month for retirement?",
    a: "The required monthly investment depends on your current investments, target retirement corpus, years until retirement, expected return, inflation assumptions, and other income or savings. The amount should be reviewed periodically as those assumptions change.",
  },
  {
    q: "How much money is needed to retire in India?",
    a: "There is no single retirement corpus that applies to everyone in India. The amount depends on location, household size, lifestyle, healthcare costs, retirement age, inflation, expected retirement duration, and other income sources.",
  },
  {
    q: "Can I retire at 40?",
    a: "Retiring at 40 may be achievable for some people, but it generally requires substantial invested assets, a high savings rate, controlled expenses, and a portfolio that can potentially support a long retirement period. Inflation, healthcare, taxes, and market volatility are particularly important for an early retirement plan.",
  },
  {
    q: "Can I retire at 50?",
    a: "Retiring at 50 may be more achievable than retiring at 40 because the accumulation period can be longer and the retirement horizon may be shorter. However, the required corpus still depends on spending, inflation, investment returns, healthcare, taxes, and withdrawal assumptions.",
  },
  {
    q: "What is sequence of returns risk?",
    a: "Sequence of returns risk is the risk that poor investment returns occur early in retirement while withdrawals are being made. Early losses combined with withdrawals can reduce the portfolio more severely than the same losses occurring later.",
  },
  {
    q: "Should pensions be included in retirement planning?",
    a: "Reliable pension or other recurring retirement income can reduce the amount that needs to be withdrawn from investments. However, retirement planning should still account for healthcare costs, unexpected expenses, inflation, and changes in income.",
  },
  {
    q: "Is this retirement calculator free?",
    a: "Yes. The retirement calculator is free to use and can be used to estimate retirement-planning scenarios without requiring a paid subscription.",
  },
  {
    q: "Does the retirement calculator work on mobile?",
    a: "Yes. The retirement calculator page is designed to work across mobile, tablet, and desktop screen sizes.",
  },
  {
    q: "Are retirement calculator results guaranteed?",
    a: "No. Calculator results are estimates based on the assumptions entered. Investment returns, inflation, expenses, taxes, and other real-world factors can differ from the assumptions used in a projection.",
  },
  {
    q: "How often should retirement assumptions be reviewed?",
    a: "Retirement assumptions should be reviewed periodically and whenever there is a significant change in income, expenses, investment strategy, retirement timing, family circumstances, inflation expectations, or other financial goals.",
  },
];

const howToSteps = [
  {
    title: "Estimate your retirement expenses",
    desc: "Start with your current annual spending and consider future lifestyle costs, healthcare, housing, family obligations, and other expected retirement expenses.",
  },
  {
    title: "Set your retirement timeline",
    desc: "Enter the expected retirement age or investment horizon used by the calculator and consider how long the retirement portfolio may need to support your expenses.",
  },
  {
    title: "Account for inflation",
    desc: "Use an appropriate inflation assumption to estimate how current expenses may change before retirement.",
  },
  {
    title: "Choose realistic return assumptions",
    desc: "Use an assumption that is consistent with the type of portfolio and risk level being considered rather than relying on an unusually high return.",
  },
  {
    title: "Estimate the required corpus",
    desc: "Use the calculator to estimate the retirement corpus required under the selected assumptions.",
  },
  {
    title: "Compare different scenarios",
    desc: "Test different retirement ages, expenses, returns, inflation rates, withdrawal rates, and savings levels to understand how sensitive the result is to your assumptions.",
  },
  {
    title: "Review the plan regularly",
    desc: "Update your assumptions as your income, expenses, investments, retirement date, and financial circumstances change.",
  },
];

const coreFeatures = [
  {
    title: "Retirement Corpus Planning",
    desc: "Estimate the investment corpus required to support planned retirement expenses using the assumptions entered into the calculator.",
    icon: "🏦",
  },
  {
    title: "FIRE Planning",
    desc: "Explore financial-independence and early-retirement targets based on annual spending and withdrawal assumptions.",
    icon: "🔥",
  },
  {
    title: "SWP Income Planning",
    desc: "Understand how systematic withdrawals can be considered when planning regular income from a retirement portfolio.",
    icon: "💸",
  },
  {
    title: "Inflation Adjustment",
    desc: "Account for the effect of rising living costs when estimating future retirement expenses.",
    icon: "📈",
  },
  {
    title: "Withdrawal Rate Planning",
    desc: "Compare how different withdrawal-rate assumptions can change the estimated retirement corpus.",
    icon: "🧮",
  },
  {
    title: "Retirement Risk Awareness",
    desc: "Consider inflation, healthcare costs, market volatility, and sequence-of-returns risk when reviewing a retirement plan.",
    icon: "⚠️",
  },
  {
    title: "Scenario Planning",
    desc: "Compare different retirement assumptions instead of relying on a single projection.",
    icon: "📊",
  },
  {
    title: "Responsive Calculator",
    desc: "Use the retirement-planning tool across mobile, tablet, and desktop devices.",
    icon: "📱",
  },
];

const audiences = [
  {
    title: "Working Professionals",
    desc: "Estimate how much may need to be saved and invested before retirement.",
    icon: "👔",
  },
  {
    title: "Early Retirement Seekers",
    desc: "Explore FIRE and early-retirement scenarios based on spending and investment assumptions.",
    icon: "🔥",
  },
  {
    title: "Indian Investors",
    desc: "Use INR-based retirement examples and consider India-specific living and inflation assumptions.",
    icon: "🇮🇳",
  },
  {
    title: "Pre-Retirees",
    desc: "Review corpus requirements, withdrawal assumptions, and potential retirement income needs.",
    icon: "🏖️",
  },
  {
    title: "Financial Planning Learners",
    desc: "Understand how retirement expenses, inflation, returns, and withdrawal rates affect planning.",
    icon: "📚",
  },
  {
    title: "Long-Term Investors",
    desc: "Explore how investment horizons and recurring contributions can affect retirement planning.",
    icon: "📈",
  },
];

const retirementEducation = [
  {
    title: "What Is Retirement Planning?",
    body: "Retirement planning involves estimating future expenses, determining how much capital may be required, selecting reasonable savings and investment assumptions, and creating a strategy for funding expenses after employment income decreases or stops.",
  },
  {
    title: "What Is a Retirement Corpus?",
    body: "A retirement corpus is the investment portfolio or pool of assets intended to support living expenses during retirement through withdrawals and other income sources.",
  },
  {
    title: "What Is FIRE?",
    body: "FIRE means Financial Independence, Retire Early. The concept focuses on building sufficient invested wealth so that employment becomes optional before a conventional retirement age.",
  },
  {
    title: "Understanding SWP",
    body: "A Systematic Withdrawal Plan allows an investor to withdraw a specified amount from an investment portfolio at regular intervals while the remaining balance remains invested. Actual outcomes depend on investment performance and withdrawal assumptions.",
  },
  {
    title: "How Inflation Changes the Goal",
    body: "Inflation reduces purchasing power. If retirement is many years away, today's expenses may need to be significantly higher in the future to maintain a similar standard of living.",
  },
  {
    title: "Withdrawal Rate Explained",
    body: "A withdrawal rate represents the percentage of a retirement portfolio withdrawn during a period. A lower withdrawal rate generally requires a larger starting corpus but can provide a larger margin between spending needs and portfolio value.",
  },
  {
    title: "Sequence of Returns Risk",
    body: "Poor investment returns early in retirement can have a larger effect when withdrawals are occurring at the same time. This makes portfolio construction, liquidity, and withdrawal flexibility important planning considerations.",
  },
  {
    title: "Asset Allocation",
    body: "Asset allocation determines how investments are distributed across asset classes. The appropriate mix depends on time horizon, risk tolerance, withdrawal needs, and financial goals.",
  },
];

const retirementMistakes = [
  "Starting retirement planning too late.",
  "Ignoring inflation when estimating future expenses.",
  "Using an overly optimistic return assumption.",
  "Ignoring healthcare, emergencies, and family obligations.",
  "Using an aggressive withdrawal rate without considering retirement duration.",
  "Assuming a calculator projection is a guaranteed investment outcome.",
];

const retirementStrategies = [
  "Start investing early and increase contributions as income grows.",
  "Use realistic return and inflation assumptions.",
  "Build a diversified portfolio appropriate for your risk tolerance.",
  "Maintain a liquidity buffer for near-term retirement expenses.",
  "Review the retirement target after major financial changes.",
  "Test conservative, base-case, and adverse scenarios before relying on a target.",
];

const corpusExamples = [
  {
    monthly: "₹25,000",
    annual: "₹3 lakh",
    corpus: "₹75 lakh",
  },
  {
    monthly: "₹50,000",
    annual: "₹6 lakh",
    corpus: "₹1.5 crore",
  },
  {
    monthly: "₹1,00,000",
    annual: "₹12 lakh",
    corpus: "₹3 crore",
  },
  {
    monthly: "₹2,00,000",
    annual: "₹24 lakh",
    corpus: "₹6 crore",
  },
];

const factors = [
  {
    title: "Inflation",
    desc: "Higher inflation increases future living costs and can increase the amount required for retirement.",
  },
  {
    title: "Healthcare Costs",
    desc: "Healthcare expenses can materially affect retirement budgets and should be considered separately where appropriate.",
  },
  {
    title: "Life Expectancy",
    desc: "A longer retirement period generally requires a more sustainable withdrawal strategy and may require a larger corpus.",
  },
  {
    title: "Investment Returns",
    desc: "Expected portfolio growth affects how much capital may be required before and during retirement.",
  },
  {
    title: "Withdrawal Rate",
    desc: "A lower withdrawal rate generally requires a larger initial corpus but can provide a larger planning margin.",
  },
  {
    title: "Lifestyle",
    desc: "Housing, travel, family support, healthcare, and discretionary spending can materially change retirement requirements.",
  },
];

export default function RetirementCalculatorSeoContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: serverConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${serverConfig.siteUrl}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Retirement Calculator",
        item: TOOL_URL,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 text-white">
      {/* Breadcrumb structured data only.
          FAQPage, HowTo, Article and ItemList schemas are intentionally omitted.
          The visible FAQ/how-to content remains useful to users. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Primary Intent */}
      <section aria-labelledby="retirement-intro-heading" className="space-y-4">
        <p className="text-sm font-medium text-blue-300">
          Retirement planning • Retirement corpus • FIRE • SWP
        </p>

        <h2
          id="retirement-intro-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Retirement Calculator for Corpus Planning, FIRE, SWP and Financial Independence
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-base">
          Use this retirement calculator to estimate your retirement corpus,
          retirement income requirements, FIRE target, inflation-adjusted
          expenses, and withdrawal needs. You can compare different retirement
          assumptions to understand how savings, spending, investment returns,
          inflation, and retirement timing can affect your long-term plan.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/60 sm:text-base">
          The calculator provides an estimate based on the assumptions you
          enter. Investment returns, inflation, expenses, taxes, and other
          real-world conditions can differ from those assumptions, so the
          result should be treated as a planning illustration rather than a
          guaranteed outcome.
        </p>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <h2
          id="features-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Calculator Features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div
                className="text-2xl"
                aria-hidden="true"
              >
                {item.icon}
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/65">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How To */}
      <section
        aria-labelledby="howto-heading"
        className="space-y-4"
      >
        <h2
          id="howto-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          How to Use the Retirement Calculator
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-white/65">
                    {step.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section
        aria-labelledby="audience-heading"
        className="space-y-4"
      >
        <h2
          id="audience-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Who Should Use a Retirement Calculator?
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div
                className="text-2xl"
                aria-hidden="true"
              >
                {item.icon}
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/65">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section
        aria-labelledby="formula-heading"
        className="space-y-4"
      >
        <h2
          id="formula-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Calculator Formula
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Retirement Corpus Formula
            </h3>

            <p className="mt-3 text-xs leading-6 text-white/65">
              A simple retirement corpus estimate can be calculated by
              dividing annual retirement expenses by the selected withdrawal
              rate.
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="font-medium text-white">
                Retirement Corpus = Annual Retirement Expenses ÷ Withdrawal Rate
              </p>
            </div>

            <h4 className="mt-5 text-sm font-semibold">
              Variables
            </h4>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-white/65">
              <li>
                <strong className="text-white">
                  Annual Retirement Expenses:
                </strong>{" "}
                The amount expected to be spent during one year of retirement.
              </li>
              <li>
                <strong className="text-white">
                  Withdrawal Rate:
                </strong>{" "}
                The percentage of the retirement portfolio used as the planning
                withdrawal assumption.
              </li>
              <li>
                <strong className="text-white">
                  Retirement Corpus:
                </strong>{" "}
                The estimated portfolio value required under the selected
                assumptions.
              </li>
            </ul>

            <p className="mt-5 text-xs leading-6 text-white/65">
              Example: if annual retirement expenses are ₹12,00,000 and the
              selected withdrawal rate is 4%:
            </p>

            <p className="mt-3 font-medium text-white">
              ₹12,00,000 ÷ 0.04 = ₹3,00,00,000
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              FIRE Number Formula
            </h3>

            <p className="mt-3 text-xs leading-6 text-white/65">
              A commonly used FIRE planning shortcut is to multiply annual
              expenses by 25 when using a 4% withdrawal-rate assumption.
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="font-medium text-white">
                FIRE Number ≈ Annual Expenses × 25
              </p>
            </div>

            <p className="mt-4 text-xs leading-6 text-white/65">
              The 25× shortcut corresponds mathematically to a 4% withdrawal
              assumption. It is a planning shortcut rather than a guarantee
              that a portfolio will support a particular spending level.
            </p>

            <p className="mt-4 text-xs leading-6 text-white/65">
              Example with annual expenses of ₹12 lakh:
            </p>

            <p className="mt-3 font-medium text-white">
              ₹12,00,000 × 25 = ₹3,00,00,000
            </p>
          </article>
        </div>
      </section>

      {/* Methodology */}
      <section
        aria-labelledby="methodology-heading"
        className="space-y-4"
      >
        <h2
          id="methodology-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Calculator Methodology
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs leading-7 text-white/65 sm:text-sm">
            This calculator uses the assumptions entered by the user to
            estimate retirement-planning outcomes. The calculation is
            scenario-based: changing the retirement age, expenses, inflation,
            investment return, withdrawal rate, savings, or other inputs can
            materially change the result.
          </p>

          <p className="mt-4 text-xs leading-7 text-white/65 sm:text-sm">
            The displayed result should therefore be interpreted as an
            estimate under a specific set of assumptions rather than a
            prediction of future investment performance.
          </p>

          <p className="mt-4 text-xs leading-7 text-white/65 sm:text-sm">
            Where a withdrawal-rate shortcut is used, the calculation should
            be interpreted according to the selected withdrawal assumption.
            A lower withdrawal rate generally produces a larger estimated
            required corpus.
          </p>
        </div>
      </section>

      {/* Assumptions */}
      <section
        aria-labelledby="assumptions-heading"
        className="space-y-4"
      >
        <h2
          id="assumptions-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Planning Assumptions
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Inflation Assumption
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Inflation is an assumption about how expenses may increase over
              time. Higher inflation generally increases the future spending
              amount required to maintain the same lifestyle.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Return Assumption
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Expected investment returns are assumptions rather than
              guaranteed outcomes. More optimistic return assumptions can
              produce a lower estimated savings requirement but also increase
              the risk that the projection will differ from actual results.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Withdrawal Assumption
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              The withdrawal rate represents the percentage used to estimate
              how much of a retirement portfolio may be withdrawn. A lower
              rate generally requires a larger starting corpus.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Retirement Duration
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              A longer retirement period can increase the importance of
              inflation, market volatility, healthcare costs, and sustainable
              withdrawals.
            </p>
          </article>
        </div>
      </section>

      {/* Education */}
      <section
        aria-labelledby="education-heading"
        className="space-y-6"
      >
        <h2
          id="education-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Planning Education
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {retirementEducation.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/65">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FIRE */}
      <section
        aria-labelledby="fire-heading"
        className="space-y-4"
      >
        <h2
          id="fire-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          FIRE, Lean FIRE, Coast FIRE and Fat FIRE
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              FIRE Number
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              The FIRE number is the portfolio value targeted to support
              planned expenses without depending entirely on active employment
              income. A common starting estimate is annual expenses multiplied
              by 25 when using a 4% withdrawal assumption.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Lean FIRE vs Fat FIRE
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Lean FIRE targets a lower-expense lifestyle and therefore a
              potentially smaller corpus. Fat FIRE targets a larger corpus
              intended to support higher spending and greater lifestyle
              flexibility.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Coast FIRE
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Coast FIRE describes a situation where existing investments may
              potentially grow toward a future retirement target without
              additional contributions, assuming the required long-term
              investment returns materialize.
            </p>
          </article>
        </div>
      </section>

      {/* Comparison */}
      <section
        aria-labelledby="comparison-heading"
        className="space-y-4"
      >
        <h2
          id="comparison-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Calculator vs FIRE Calculator
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">
              Comparison between retirement planning and FIRE planning
            </caption>

            <thead className="border-b border-white/10">
              <tr>
                <th scope="col" className="p-4">
                  Planning Area
                </th>
                <th scope="col" className="p-4">
                  Retirement Calculator
                </th>
                <th scope="col" className="p-4">
                  FIRE Planning
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-white/5">
                <th scope="row" className="p-4 font-medium">
                  Primary goal
                </th>
                <td className="p-4 text-white/65">
                  Estimate retirement funding requirements.
                </td>
                <td className="p-4 text-white/65">
                  Estimate the assets required for financial independence.
                </td>
              </tr>

              <tr className="border-b border-white/5">
                <th scope="row" className="p-4 font-medium">
                  Spending
                </th>
                <td className="p-4 text-white/65">
                  Future retirement expenses.
                </td>
                <td className="p-4 text-white/65">
                  Annual spending used to determine the FIRE target.
                </td>
              </tr>

              <tr className="border-b border-white/5">
                <th scope="row" className="p-4 font-medium">
                  Retirement timing
                </th>
                <td className="p-4 text-white/65">
                  Can focus on a planned retirement age.
                </td>
                <td className="p-4 text-white/65">
                  Often focuses on reaching financial independence earlier.
                </td>
              </tr>

              <tr>
                <th scope="row" className="p-4 font-medium">
                  Withdrawal planning
                </th>
                <td className="p-4 text-white/65">
                  Can incorporate withdrawal assumptions.
                </td>
                <td className="p-4 text-white/65">
                  Often uses a target withdrawal rate to estimate the FIRE number.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Corpus */}
      <section
        aria-labelledby="corpus-heading"
        className="space-y-4"
      >
        <h2
          id="corpus-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          How Much Retirement Corpus Is Needed?
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs leading-6 text-white/65">
            The required retirement corpus depends on annual expenses,
            retirement age, life expectancy, inflation, investment returns,
            taxes, healthcare costs, and withdrawal assumptions. A common
            planning shortcut uses annual expenses divided by a 4% withdrawal
            rate, equivalent to approximately 25 times annual expenses.
          </p>

          <p className="mt-3 text-xs leading-6 text-white/65">
            For example, annual retirement expenses of ₹12 lakh correspond to
            approximately ₹3 crore at a 4% withdrawal-rate assumption. A lower
            withdrawal rate would require a larger starting corpus.
          </p>

          <p className="mt-3 text-xs leading-6 text-white/65">
            This simplified calculation does not guarantee that the estimated
            corpus will support a particular lifestyle for a particular
            retirement duration.
          </p>
        </div>
      </section>

      {/* Corpus Table */}
      <section
        aria-labelledby="corpus-table-heading"
        className="space-y-4"
      >
        <h2
          id="corpus-table-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Corpus Examples at a 4% Withdrawal Rate
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full min-w-[600px] text-left text-sm">
            <caption className="sr-only">
              Illustrative retirement corpus estimates using a 4% withdrawal
              rate
            </caption>

            <thead className="border-b border-white/10">
              <tr>
                <th scope="col" className="p-4">
                  Monthly Expense
                </th>
                <th scope="col" className="p-4">
                  Annual Expense
                </th>
                <th scope="col" className="p-4">
                  Corpus at 4%
                </th>
              </tr>
            </thead>

            <tbody>
              {corpusExamples.map((item) => (
                <tr
                  key={item.monthly}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="p-4">
                    {item.monthly}
                  </td>
                  <td className="p-4">
                    {item.annual}
                  </td>
                  <td className="p-4">
                    {item.corpus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-white/65">
          These are simple illustrations using a 4% withdrawal-rate assumption.
          They do not account for taxes, inflation after retirement, healthcare
          costs, portfolio volatility, changes in spending, or other income
          sources.
        </p>
      </section>

      {/* Age */}
      <section
        aria-labelledby="age-heading"
        className="space-y-4"
      >
        <h2
          id="age-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Planning by Age
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Retirement Planning in Your 20s and 30s
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              A longer investment horizon can provide more time for regular
              contributions and compounding. Starting early can provide more
              flexibility to adjust savings when assumptions change.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Retirement Planning in Your 40s and 50s
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              As retirement approaches, investors may focus more closely on
              savings rates, debt, asset allocation, liquidity, healthcare
              planning, and a realistic withdrawal strategy.
            </p>
          </article>
        </div>
      </section>

      {/* Factors */}
      <section
        aria-labelledby="factors-heading"
        className="space-y-4"
      >
        <h2
          id="factors-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Factors That Affect Retirement Corpus
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {factors.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/65">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Mistakes */}
      <section
        aria-labelledby="mistakes-heading"
        className="space-y-4"
      >
        <h2
          id="mistakes-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Common Retirement Planning Mistakes
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Mistakes to Avoid
            </h3>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-white/65">
              {retirementMistakes.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Better Planning Practices
            </h3>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-white/65">
              {retirementStrategies.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Allocation */}
      <section
        aria-labelledby="allocation-heading"
        className="space-y-4"
      >
        <h2
          id="allocation-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Asset Allocation and Sequence of Returns Risk
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Asset Allocation
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Asset allocation can affect the risk and growth characteristics
              of a retirement portfolio. The appropriate mix of equity, debt,
              cash, and other assets depends on time horizon, risk tolerance,
              liquidity needs, and financial goals.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Sequence of Returns Risk
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Poor returns early in retirement can have a larger impact when
              withdrawals are occurring simultaneously. Maintaining appropriate
              liquidity and flexibility in withdrawals can be important when
              managing this risk.
            </p>
          </article>
        </div>
      </section>

      {/* India */}
      <section
        aria-labelledby="india-heading"
        className="space-y-4"
      >
        <h2
          id="india-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Planning in India
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              How Much Money Is Needed to Retire in India?
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              There is no universal retirement amount for India. The required
              corpus depends on location, household size, lifestyle, healthcare
              expenses, retirement age, inflation, expected retirement duration,
              and other sources of income.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Inflation and Retirement in India
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Long retirement horizons make inflation an important planning
              variable. Future expenses should be estimated instead of assuming
              that today's spending will remain unchanged.
            </p>
          </article>
        </div>
      </section>

      {/* Results */}
      <section
        aria-labelledby="results-heading"
        className="space-y-4"
      >
        <h2
          id="results-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          How to Interpret Retirement Calculator Results
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Estimated Corpus
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              This represents the estimated investment amount required under
              the selected assumptions.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Estimated Retirement Income
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Where supported by the calculator, retirement income estimates
              can help translate a portfolio target into an approximate
              withdrawal requirement.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Scenario Sensitivity
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Changing assumptions can materially change the result, so
              comparing multiple scenarios is more useful than relying on a
              single projection.
            </p>
          </article>
        </div>
      </section>

      {/* Limitations */}
      <section
        aria-labelledby="limitations-heading"
        className="space-y-4"
      >
        <h2
          id="limitations-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Calculator Limitations
        </h2>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6">
          <ul className="space-y-3 text-xs leading-6 text-white/70 sm:text-sm">
            <li>
              Results are estimates based on the inputs and assumptions used.
            </li>
            <li>
              Investment returns are not guaranteed and actual market
              performance can differ from projections.
            </li>
            <li>
              Inflation may differ from the assumed rate.
            </li>
            <li>
              Taxes, fees, healthcare costs, emergencies, and changes in
              lifestyle may materially affect actual retirement requirements.
            </li>
            <li>
              A withdrawal-rate shortcut does not guarantee that a portfolio
              will last for a particular retirement duration.
            </li>
            <li>
              The calculator should be used for educational and planning
              purposes rather than as a guarantee of future financial results.
            </li>
          </ul>
        </div>
      </section>

      {/* Methodology / Review */}
      <section
        aria-labelledby="review-heading"
        className="space-y-4"
      >
        <h2
          id="review-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Methodology and Review Information
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Methodology
              </dt>
              <dd className="mt-1 text-sm text-white/75">
                Scenario-based retirement planning calculations using the
                assumptions entered into the calculator.
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Last reviewed
              </dt>
              <dd className="mt-1 text-sm text-white/75">
                {LAST_REVIEWED}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Purpose
              </dt>
              <dd className="mt-1 text-sm text-white/75">
                Educational and retirement-planning estimation.
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Financial advice
              </dt>
              <dd className="mt-1 text-sm text-white/75">
                This calculator does not provide personalized financial advice
                or guarantee investment performance.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Disclaimer */}
      <section
        aria-labelledby="disclaimer-heading"
        className="space-y-4"
      >
        <h2
          id="disclaimer-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Financial Disclaimer
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs leading-7 text-white/65 sm:text-sm">
            This retirement calculator is provided for educational and
            planning purposes only. The results are estimates based on the
            assumptions entered and should not be interpreted as a guarantee
            of future investment returns or retirement outcomes. Actual
            results can vary because of market performance, inflation, taxes,
            fees, healthcare costs, changes in spending, and other factors.
          </p>

          <p className="mt-4 text-xs leading-7 text-white/65 sm:text-sm">
            Consider your own financial circumstances, objectives, risk
            tolerance, and applicable investment costs before making financial
            decisions. Where appropriate, consider obtaining advice from a
            qualified financial professional.
          </p>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools toolId="calculator/retirement-calculator" />

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <h2
          id="faq-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <details className="w-full">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-white/10">
                  <span className="text-sm font-semibold text-white">
                    {item.q}
                  </span>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lg text-blue-400"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-dashed border-white/5 p-5 pt-4">
                  <p className="text-xs leading-relaxed text-white/60">
                    {item.a}
                  </p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        aria-labelledby="cta-heading"
        className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:p-8"
      >
        <h2
          id="cta-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Plan Your Retirement Scenario
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/65">
          Enter your retirement assumptions above and compare different
          spending, inflation, investment-return, retirement-age, and
          withdrawal scenarios to understand how your estimated retirement
          target changes.
        </p>

        <p className="mt-4 text-xs text-white/45">
          Results are estimates for planning purposes and are not guaranteed
          investment outcomes.
        </p>
      </section>
    </div>
  );
}