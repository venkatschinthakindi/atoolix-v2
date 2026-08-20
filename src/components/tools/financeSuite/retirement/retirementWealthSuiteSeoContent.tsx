import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
import { serverConfig } from "@/config/server";

const TOOL_PATH = "/tools/calculator/retirement-calculator";
const TOOL_URL = `${serverConfig.siteUrl}${TOOL_PATH}`;

const faqItems = [
  {
    q: "How much retirement corpus do I need?",
    a: "The retirement corpus you need depends on your annual expenses, expected inflation, life expectancy, portfolio returns, and withdrawal rate. A common planning shortcut is annual retirement expenses multiplied by 25, based on a 4% withdrawal rate. Some investors use a more conservative withdrawal rate and therefore target a larger corpus.",
  },
  {
    q: "What is the 4% withdrawal rule?",
    a: "The 4% withdrawal rule is a retirement planning guideline suggesting that an initial withdrawal of about 4% of a portfolio may be sustainable over a long retirement under certain historical assumptions. It is not a guarantee, and the appropriate withdrawal rate depends on portfolio allocation, market returns, inflation, taxes, retirement duration, and spending flexibility.",
  },
  {
    q: "What is FIRE?",
    a: "FIRE stands for Financial Independence, Retire Early. It is a financial planning approach focused on building enough invested assets to eventually cover living expenses without depending entirely on active employment income.",
  },
  {
    q: "What is Lean FIRE?",
    a: "Lean FIRE focuses on achieving financial independence with relatively low annual spending and a smaller target corpus. It generally requires maintaining a simple lifestyle and keeping recurring expenses under control.",
  },
  {
    q: "What is Fat FIRE?",
    a: "Fat FIRE focuses on building a larger portfolio that can support a higher level of spending in financial independence or retirement. The required corpus depends on the lifestyle and annual expenses you want to maintain.",
  },
  {
    q: "What is Coast FIRE?",
    a: "Coast FIRE means having enough invested assets that, assuming a suitable long-term growth rate, the existing portfolio could potentially grow to the required retirement corpus without additional contributions. It is a planning concept rather than a guaranteed outcome.",
  },
  {
    q: "How is retirement corpus calculated?",
    a: "A simple retirement corpus estimate is annual retirement expenses divided by the chosen withdrawal rate. For example, ₹6,00,000 of annual expenses at a 4% withdrawal rate gives an estimated corpus of ₹1.5 crore. Future expenses should be adjusted for inflation before calculating the required retirement corpus.",
  },
  {
    q: "How does inflation affect retirement planning?",
    a: "Inflation increases the future cost of living, so retirement planning should account for the purchasing power of money over time. Ignoring inflation can significantly underestimate the corpus required, particularly when retirement is decades away.",
  },
  {
    q: "What is a safe withdrawal rate?",
    a: "A safe withdrawal rate is a planning percentage used to estimate how much of a retirement portfolio can be withdrawn each year while aiming for long-term sustainability. The appropriate rate depends on portfolio allocation, retirement duration, market conditions, inflation, taxes, and spending flexibility.",
  },
  {
    q: "How much monthly income can my retirement corpus generate?",
    a: "Monthly retirement income depends on your corpus, withdrawal amount, expected portfolio return, withdrawal period, inflation, taxes, and investment strategy. A systematic withdrawal plan can be used to withdraw a regular amount while the remaining portfolio stays invested.",
  },
  {
    q: "Can I retire early?",
    a: "Early retirement may be possible when savings and investments are sufficient to support your expected expenses for the remainder of your planned retirement. The earlier you retire, the more important it becomes to account for inflation, longer retirement periods, market volatility, and sequence of returns risk.",
  },
  {
    q: "What age should I start retirement planning?",
    a: "Starting retirement planning early gives investments more time to compound and provides more flexibility to adjust savings if assumptions change. Even relatively small regular investments can become meaningful over a long investment horizon.",
  },
  {
    q: "What return rate should I assume for retirement planning?",
    a: "Use an assumption that is consistent with your asset allocation and risk tolerance rather than relying on an optimistic return. Equity-heavy portfolios may have higher long-term growth potential but also greater volatility, while conservative portfolios generally warrant lower return assumptions.",
  },
  {
    q: "How long will my retirement corpus last?",
    a: "Corpus longevity depends on the starting portfolio, withdrawal amount, investment returns, inflation, taxes, and retirement duration. A retirement calculator provides an estimate based on assumptions, not a guarantee of future portfolio performance.",
  },
  {
    q: "What happens if inflation is higher than expected?",
    a: "Higher-than-expected inflation increases future expenses and can require a larger retirement corpus or lower withdrawals. Reviewing retirement assumptions regularly and maintaining a margin of safety can help address this risk.",
  },
  {
    q: "Should I include pensions in retirement planning?",
    a: "Yes. A reliable pension or other recurring retirement income can reduce the amount that needs to be withdrawn from your investment portfolio. It is still useful to maintain a buffer for healthcare, unexpected expenses, and changes in income.",
  },
  {
    q: "Can I use SIPs for retirement planning?",
    a: "Yes. SIPs can help build retirement wealth through regular investments over time. A SIP or investment returns calculator can estimate how monthly contributions may grow toward a target retirement corpus based on the selected assumptions.",
  },
  {
    q: "How much should I save every month for retirement?",
    a: "The required monthly investment depends on your current savings, years until retirement, target corpus, expected return, inflation, and existing investments. A retirement planning calculator can help translate a long-term corpus target into an estimated monthly savings requirement.",
  },
  {
    q: "How much money is needed to retire in India?",
    a: "There is no universal retirement corpus for India. The amount depends on location, household size, lifestyle, healthcare costs, inflation, retirement age, and expected retirement duration. A personalized calculation is more useful than a single generic number.",
  },
  {
    q: "Is SWP better than FD income?",
    a: "SWP and fixed deposits have different characteristics. An SWP can provide flexible withdrawals from an invested portfolio with potential for long-term growth, while an FD generally provides more predictable interest income. The appropriate choice depends on risk tolerance, liquidity needs, taxes, and income requirements.",
  },
  {
    q: "What is sequence of returns risk?",
    a: "Sequence of returns risk is the risk that poor investment returns occur early in retirement while withdrawals are being made. This can reduce portfolio longevity more severely than experiencing the same returns later, which makes withdrawal planning and portfolio diversification important.",
  },
  {
    q: "Can I retire at 40?",
    a: "Retiring at 40 may be achievable for some people, but it usually requires a high savings rate, substantial invested assets, and a portfolio capable of supporting a potentially very long retirement. Inflation, healthcare costs, taxes, and market volatility should be included in the plan.",
  },
  {
    q: "Can I retire at 50?",
    a: "Retiring at 50 can be more achievable than retiring at 40 because there may be more time to accumulate assets and a shorter retirement horizon. The plan should still account for inflation, healthcare, taxes, market volatility, and portfolio sustainability.",
  },
  {
    q: "How does FIRE work?",
    a: "FIRE works by increasing the gap between income and spending, investing the surplus, and building enough assets that investment income and withdrawals can eventually support living expenses. The required FIRE number depends primarily on annual spending and the withdrawal rate used.",
  },
  {
    q: "Is this retirement calculator free?",
    a: "Yes. The retirement calculator is free to use and does not require a sign-up to perform retirement planning calculations.",
  },
  {
    q: "Does the retirement calculator work on mobile?",
    a: "Yes. The calculator page is designed to work across mobile, tablet, and desktop screen sizes so users can perform retirement planning calculations on different devices.",
  },
  {
    q: "Can I export retirement calculations as PDF?",
    a: "If the calculator interface provides PDF export, you can use that feature to save or share the calculated retirement projection. The educational content on this page is separate from the calculator's interactive output.",
  },
  {
    q: "What is the difference between FIRE and traditional retirement?",
    a: "Traditional retirement generally focuses on leaving employment around a conventional retirement age, while FIRE focuses on achieving financial independence earlier by building a sufficiently large investment portfolio and controlling spending.",
  },
  {
    q: "How often should retirement plans be reviewed?",
    a: "A retirement plan should generally be reviewed at least annually and whenever there is a significant change in income, expenses, family circumstances, investment strategy, or retirement timing.",
  },
  {
    q: "Can retirement planning help achieve financial independence?",
    a: "Yes. Retirement planning and financial independence use many of the same principles: estimating future expenses, building investable assets, managing risk, and creating a sustainable withdrawal strategy. FIRE applies these principles with an emphasis on reaching financial independence earlier.",
  },
];

const howToSteps = [
  {
    title: "Estimate your annual expenses",
    desc: "Start with current yearly spending and account for future lifestyle goals, healthcare costs, and inflation.",
  },
  {
    title: "Choose a withdrawal rate",
    desc: "Select a planning withdrawal rate that reflects your portfolio, retirement duration, and desired margin of safety.",
  },
  {
    title: "Calculate your retirement corpus",
    desc: "Use annual retirement expenses and your withdrawal rate to estimate the portfolio required to support your planned spending.",
  },
  {
    title: "Compare retirement scenarios",
    desc: "Compare traditional retirement and FIRE scenarios to understand how different retirement ages and spending levels affect the target.",
  },
  {
    title: "Plan your monthly savings",
    desc: "Estimate the regular investment required to build the target corpus over your remaining investment horizon.",
  },
  {
    title: "Review the plan regularly",
    desc: "Update inflation, return, savings, and withdrawal assumptions as your financial circumstances change.",
  },
];

const coreFeatures = [
  {
    title: "Retirement Corpus Calculator",
    desc: "Estimate the corpus required to support retirement expenses using your selected assumptions.",
    icon: "🏦",
  },
  {
    title: "FIRE Planning",
    desc: "Explore financial independence and early retirement targets based on your spending needs.",
    icon: "🔥",
  },
  {
    title: "SWP Income Planning",
    desc: "Understand how systematic withdrawals can be used to generate regular retirement income.",
    icon: "💸",
  },
  {
    title: "Inflation Adjustment",
    desc: "Account for rising living costs when estimating future retirement expenses.",
    icon: "📈",
  },
  {
    title: "Withdrawal Rate Planning",
    desc: "Compare how different withdrawal rates affect the required retirement corpus.",
    icon: "🧮",
  },
  {
    title: "Retirement Risk Awareness",
    desc: "Consider inflation, healthcare costs, market volatility, and sequence of returns risk.",
    icon: "⚠️",
  },
  {
    title: "Asset Allocation Education",
    desc: "Understand how portfolio allocation can affect long-term growth and retirement risk.",
    icon: "📊",
  },
  {
    title: "Responsive Design",
    desc: "Use the retirement planning tool comfortably across mobile, tablet, and desktop devices.",
    icon: "⚡",
  },
];

const audiences = [
  {
    title: "Working Professionals",
    desc: "Estimate how much you may need to save and invest for retirement.",
    icon: "👔",
  },
  {
    title: "Early Retirement Seekers",
    desc: "Explore FIRE, Lean FIRE, Coast FIRE, and Fat FIRE planning scenarios.",
    icon: "🔥",
  },
  {
    title: "Indian Investors",
    desc: "Plan retirement expenses and corpus requirements using India-focused examples.",
    icon: "🇮🇳",
  },
  {
    title: "Pre-Retirees",
    desc: "Review corpus requirements, withdrawal rates, and potential retirement income.",
    icon: "🏖️",
  },
  {
    title: "Financial Planners",
    desc: "Use the calculator as an educational tool when discussing retirement assumptions.",
    icon: "📒",
  },
  {
    title: "Mobile Users",
    desc: "Access retirement planning calculations from phones and tablets.",
    icon: "📲",
  },
];

const retirementEducation = [
  {
    title: "What Is Retirement Planning?",
    body: "Retirement planning involves estimating future expenses, selecting appropriate investment and savings assumptions, and building enough assets to support your desired lifestyle after regular employment ends.",
  },
  {
    title: "What Is a Retirement Corpus?",
    body: "A retirement corpus is the investment portfolio or pool of assets intended to fund living expenses during retirement through withdrawals and other income sources.",
  },
  {
    title: "What Is FIRE?",
    body: "FIRE means Financial Independence, Retire Early. The goal is to build enough invested wealth that employment becomes optional before a traditional retirement age.",
  },
  {
    title: "Understanding SWP",
    body: "A Systematic Withdrawal Plan allows an investor to withdraw a specified amount from an investment portfolio at regular intervals while the remaining balance stays invested.",
  },
  {
    title: "How Inflation Changes the Goal",
    body: "Inflation reduces purchasing power over time. If retirement is many years away, today's expenses may need to be significantly higher in the future to maintain a similar lifestyle.",
  },
  {
    title: "Withdrawal Rate Explained",
    body: "A withdrawal rate represents the percentage of a retirement portfolio withdrawn during a period. Lower withdrawal rates generally require a larger starting corpus but can provide a greater margin of safety.",
  },
  {
    title: "Sequence of Returns Risk",
    body: "Poor market returns early in retirement can have a larger impact when withdrawals are occurring at the same time. This makes portfolio construction, cash reserves, and withdrawal flexibility important considerations.",
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
  "Relying on one asset class without considering diversification and risk.",
];

const retirementStrategies = [
  "Start investing early and increase contributions as income grows.",
  "Use realistic return and inflation assumptions.",
  "Build a diversified portfolio appropriate for your risk tolerance.",
  "Maintain a liquidity buffer for near-term retirement expenses.",
  "Review the retirement target after major financial changes.",
  "Test conservative, base-case, and adverse scenarios before relying on a target.",
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Retirement Calculator and FIRE Planning Guide",
  description:
    "Learn about retirement corpus planning, FIRE, SWP income, inflation, withdrawal rates, and retirement planning.",
  author: {
    "@type": "Organization",
    name: serverConfig.siteName,
    url: serverConfig.siteUrl,
  },
  publisher: {
    "@type": "Organization",
    name: serverConfig.siteName,
    url: serverConfig.siteUrl,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": TOOL_URL,
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Plan Your Retirement",
  description:
    "Steps for estimating retirement expenses, choosing a withdrawal rate, calculating a target corpus, and reviewing the plan.",
  step: howToSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.desc,
  })),
};

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Retirement Planning Topics",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Retirement Corpus Planning",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FIRE Planning",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "SWP Retirement Income",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Safe Withdrawal Rate",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Inflation-Adjusted Retirement Planning",
    },
  ],
};

export default function RetirementCalculatorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* Hero / Primary Intent */}
      <section
        aria-labelledby="hero-heading"
        className="space-y-4"
      >
        <p className="text-sm font-medium text-blue-300">
          Retirement planning • FIRE • SWP • Inflation
        </p>

        <h2
          id="hero-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Retirement Calculator for FIRE Planning, Retirement Corpus, SWP
          Income, Inflation, and Financial Independence
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-base">
          Use this retirement calculator to estimate your retirement corpus,
          FIRE number, retirement income, SWP withdrawals, inflation-adjusted
          expenses, and withdrawal requirements. Whether you are planning
          traditional retirement or exploring Lean FIRE, Coast FIRE, or Fat
          FIRE, the calculator helps turn your retirement goal into measurable
          planning assumptions.
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
              <div className="text-2xl">{item.icon}</div>

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
          How to Plan Your Retirement
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
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
        aria-labelledby="who-heading"
        className="space-y-4"
      >
        <h2
          id="who-heading"
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
              <div className="text-2xl">{item.icon}</div>

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
              Inflation-Adjusted Retirement Corpus
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Future retirement expenses can be estimated by increasing
              current expenses using an assumed inflation rate over the
              remaining years until retirement.
            </p>

            <p className="mt-3 text-xs leading-6 text-white/65">
              Retirement Corpus = Annual Retirement Expenses ÷ Withdrawal Rate
            </p>

            <p className="mt-3 text-xs leading-6 text-white/65">
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
              FIRE Number ≈ Annual Expenses × 25
            </p>

            <p className="mt-3 text-xs leading-6 text-white/65">
              A 25× multiple corresponds to a 4% withdrawal-rate assumption.
              It should be treated as a planning shortcut rather than a
              guaranteed retirement target.
            </p>

            <p className="mt-3 text-xs leading-6 text-white/65">
              Example: with annual expenses of ₹12 lakh:
            </p>

            <p className="mt-3 font-medium text-white">
              ₹12,00,000 × 25 = ₹3,00,00,000
            </p>
          </article>
        </div>
      </section>

      {/* Education */}
      <section
        aria-labelledby="edu-heading"
        className="space-y-6"
      >
        <h2
          id="edu-heading"
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
          FIRE, Lean FIRE, Coast FIRE, and Fat FIRE
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              FIRE Number Explained
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              The FIRE number is the portfolio value needed to support your
              planned expenses without depending on active employment income.
              A common starting estimate is annual expenses multiplied by 25.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Lean FIRE vs Fat FIRE
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Lean FIRE targets a lower-expense lifestyle and therefore a
              smaller corpus. Fat FIRE targets a larger corpus that supports
              greater spending flexibility.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Coast FIRE
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Coast FIRE describes a situation where existing investments may
              be sufficient to grow toward a future retirement target without
              additional contributions, assuming the expected long-term
              returns materialize.
            </p>
          </article>
        </div>
      </section>

      {/* Comparison */}
      <section
        aria-labelledby="compare-heading"
        className="space-y-4"
      >
        <h2
          id="compare-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Calculator vs FIRE Calculator
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Retirement Calculator
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              A retirement calculator focuses on future expenses, retirement
              age, inflation, corpus requirements, withdrawal rates, and
              potential retirement income.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              FIRE Calculator
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              A FIRE calculator focuses on reaching financial independence
              earlier by connecting annual spending, savings, investment
              growth, and the required FIRE number.
            </p>
          </article>
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
            taxes, and withdrawal rate. A common planning estimate uses annual
            expenses multiplied by 25, corresponding to a 4% withdrawal-rate
            assumption.
          </p>

          <p className="mt-3 text-xs leading-6 text-white/65">
            For example, annual retirement expenses of ₹12 lakh correspond to
            approximately ₹3 crore at a 4% withdrawal rate. A lower withdrawal
            rate would require a larger starting corpus.
          </p>

          <p className="mt-3 text-xs leading-6 text-white/65">
            A retirement calculator can provide a more personalized estimate
            by incorporating future expenses, inflation, retirement duration,
            expected returns, and withdrawal assumptions.
          </p>
        </div>
      </section>

      {/* Corpus Table */}
      <section
        aria-labelledby="expense-corpus-heading"
        className="space-y-4"
      >
        <h2
          id="expense-corpus-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Corpus for Different Monthly Expenses
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Estimated retirement corpus at a 4% withdrawal rate
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
                  Corpus at 4% Withdrawal Rate
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-4">₹25,000</td>
                <td className="p-4">₹3 lakh</td>
                <td className="p-4">₹75 lakh</td>
              </tr>

              <tr className="border-b border-white/5">
                <td className="p-4">₹50,000</td>
                <td className="p-4">₹6 lakh</td>
                <td className="p-4">₹1.5 crore</td>
              </tr>

              <tr className="border-b border-white/5">
                <td className="p-4">₹1,00,000</td>
                <td className="p-4">₹12 lakh</td>
                <td className="p-4">₹3 crore</td>
              </tr>

              <tr>
                <td className="p-4">₹2,00,000</td>
                <td className="p-4">₹24 lakh</td>
                <td className="p-4">₹6 crore</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-white/65">
          These figures are simple illustrations using a 4% withdrawal-rate
          assumption. They do not account for taxes, inflation after
          retirement, healthcare costs, portfolio volatility, or changes in
          spending.
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
              Investors with longer horizons have more time for regular
              contributions and compounding. Starting early can reduce the
              amount that needs to be invested later, although investment
              choices should still match individual risk tolerance.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Retirement Planning in Your 40s and 50s
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              As retirement approaches, investors may focus more closely on
              increasing savings, reducing debt, reviewing asset allocation,
              and building a realistic liquidity and withdrawal strategy.
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
          {[
            {
              title: "Inflation",
              desc: "Higher inflation increases future living costs and can require a larger retirement corpus.",
            },
            {
              title: "Healthcare Costs",
              desc: "Healthcare expenses can materially affect retirement budgets and should be included in planning.",
            },
            {
              title: "Life Expectancy",
              desc: "A longer retirement period generally requires a more sustainable withdrawal strategy and potentially a larger corpus.",
            },
            {
              title: "Investment Returns",
              desc: "Expected portfolio growth affects how much capital may be required before retirement.",
            },
            {
              title: "Withdrawal Rate",
              desc: "A lower withdrawal rate generally requires a larger initial corpus but may provide a greater margin of safety.",
            },
            {
              title: "Lifestyle",
              desc: "Housing, travel, family support, healthcare, and discretionary spending can materially change retirement needs.",
            },
          ].map((item) => (
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
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Better Planning Practices
            </h3>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-white/65">
              {retirementStrategies.map((item) => (
                <li key={item}>• {item}</li>
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
              Asset allocation can change the risk and growth characteristics
              of a retirement portfolio. The appropriate mix of equity, debt,
              and other assets depends on time horizon, risk tolerance, and
              withdrawal requirements.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Sequence of Returns Risk
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Poor returns early in retirement can have a larger effect when
              withdrawals are occurring simultaneously. Maintaining an
              appropriate liquidity buffer and flexible withdrawal strategy
              can help manage this risk.
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
              The required amount depends on location, household size,
              lifestyle, healthcare expenses, retirement age, inflation, and
              the length of retirement. A personalized calculation is more
              useful than relying on a single national estimate.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Inflation and Retirement in India
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Long retirement horizons make inflation an important planning
              variable. Future expenses should be estimated rather than
              assuming today's spending will remain unchanged.
            </p>
          </article>
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
    </div>
  );
}