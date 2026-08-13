import Link from "next/link";
import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl.replace(/\/$/, "");
const canonicalPath = "/tools/retirement-calculator";

const faqItems = [
  {
    q: "How much retirement corpus do I need?",
    a: "The retirement corpus you need depends on your annual retirement expenses, expected inflation, retirement duration, investment returns, taxes, and withdrawal strategy. A common planning shortcut is annual expenses multiplied by 25, which corresponds to a 4% withdrawal rate. This is a planning guideline rather than a guarantee.",
  },
  {
    q: "What is the 4% withdrawal rule?",
    a: "The 4% withdrawal rule is a retirement planning guideline suggesting that a person may start by withdrawing about 4% of their retirement portfolio in the first year and adjust withdrawals for inflation over time. It is not a guaranteed safe rate because portfolio returns, inflation, taxes, asset allocation, and retirement duration can vary.",
  },
  {
    q: "What is FIRE?",
    a: "FIRE stands for Financial Independence, Retire Early. It is a financial planning approach focused on building enough invested assets to eventually cover living expenses without depending on active employment income.",
  },
  {
    q: "What is Lean FIRE?",
    a: "Lean FIRE focuses on reaching financial independence with relatively low annual spending and a smaller target corpus. It generally suits people who are comfortable maintaining a simpler lifestyle and keeping recurring expenses low.",
  },
  {
    q: "What is Fat FIRE?",
    a: "Fat FIRE focuses on building a larger financial independence corpus that can support a higher level of spending, greater lifestyle flexibility, travel, or other discretionary expenses during retirement.",
  },
  {
    q: "What is Coast FIRE?",
    a: "Coast FIRE means having accumulated enough invested assets that, under your assumed long-term growth rate, the existing portfolio may grow to the required retirement corpus without additional contributions. It depends heavily on the assumptions used.",
  },
  {
    q: "How is retirement corpus calculated?",
    a: "A simple retirement corpus formula is annual retirement expenses divided by the chosen withdrawal rate. For example, annual expenses of ₹6,00,000 divided by 4% gives an estimated corpus of ₹1.5 crore. A complete retirement plan should also account for inflation, healthcare costs, taxes, investment returns, and retirement duration.",
  },
  {
    q: "How does inflation affect retirement planning?",
    a: "Inflation increases the future cost of living, so today's expenses may not be sufficient for planning a retirement that begins many years from now. Inflation-adjusted calculations help estimate the amount you may need to maintain a similar lifestyle in the future.",
  },
  {
    q: "What is a safe withdrawal rate?",
    a: "A safe withdrawal rate is a planning percentage used to estimate how much of a retirement portfolio can potentially be withdrawn each year while aiming for long-term sustainability. The appropriate rate depends on portfolio allocation, market conditions, inflation, taxes, and retirement duration.",
  },
  {
    q: "How much monthly income can my retirement corpus generate?",
    a: "Monthly retirement income depends on the portfolio size, withdrawal amount, investment returns, inflation, taxes, and withdrawal period. A systematic withdrawal plan, or SWP, can be used to withdraw a chosen amount regularly while the remaining portfolio stays invested.",
  },
  {
    q: "Can I retire early?",
    a: "Early retirement may be possible when your invested assets can reasonably support your expected expenses for the required retirement period. A FIRE plan usually focuses on savings rate, investment growth, future expenses, and the target financial independence corpus.",
  },
  {
    q: "What age should I start retirement planning?",
    a: "Starting early gives your investments more time to compound. Even relatively small recurring investments can become meaningful over a 20- or 30-year period, although the required amount depends on your target corpus, inflation, investment returns, and retirement age.",
  },
  {
    q: "What return rate should I assume for retirement planning?",
    a: "Use a return assumption that is consistent with your investment strategy and risk tolerance rather than relying on an optimistic number. Conservative, base-case, and lower-return scenarios can provide a more useful view of how sensitive your retirement plan is to investment performance.",
  },
  {
    q: "How long will my retirement corpus last?",
    a: "Portfolio longevity depends on withdrawals, investment returns, inflation, taxes, fees, and retirement duration. Poor investment returns early in retirement can have a particularly large impact when withdrawals are already being made.",
  },
  {
    q: "What happens if inflation is higher than expected?",
    a: "Higher-than-expected inflation increases future expenses and may require a larger retirement corpus or lower withdrawals. Reviewing your retirement assumptions regularly can help identify whether your target needs to be increased.",
  },
  {
    q: "Should I include pensions in retirement planning?",
    a: "Yes. A reliable pension or other recurring retirement income can reduce the amount that needs to be withdrawn from your investment corpus. It is still sensible to maintain a buffer for healthcare, emergencies, inflation, and unexpected expenses.",
  },
  {
    q: "Can I use SIPs for retirement planning?",
    a: "Yes. SIPs can help build retirement wealth through regular investments. A retirement plan can combine a target corpus with a monthly investment amount and an assumed long-term return to estimate whether the goal is achievable.",
  },
  {
    q: "How much should I save every month for retirement?",
    a: "The required monthly investment depends on your current age, retirement age, existing investments, target corpus, inflation, and expected investment return. A retirement or SIP calculator can help translate the long-term target into a monthly savings amount.",
  },
  {
    q: "How much money is needed to retire in India?",
    a: "There is no single retirement corpus that applies to everyone in India. The amount depends on location, household size, lifestyle, healthcare costs, housing, family responsibilities, inflation, and retirement duration. Personal expenses are a better starting point than a generic corpus number.",
  },
  {
    q: "Is SWP better than FD income?",
    a: "SWP and fixed deposits serve different purposes. An FD can provide relatively predictable interest income, while an SWP from an investment portfolio can provide flexible withdrawals with the possibility of continued portfolio growth. Neither approach is universally better because risk, return, taxation, and liquidity differ.",
  },
  {
    q: "What is sequence of returns risk?",
    a: "Sequence of returns risk is the risk that poor investment returns occur early in retirement while withdrawals are being made. Two portfolios with similar long-term average returns can have very different outcomes if their returns occur in a different sequence.",
  },
  {
    q: "Can I retire at 40?",
    a: "Retiring at 40 may be possible for some people, but it usually requires a high savings rate, substantial invested assets, controlled expenses, and a plan that can support several decades of retirement. Longer retirement periods make inflation and portfolio sustainability especially important.",
  },
  {
    q: "Can I retire at 50?",
    a: "Retiring at 50 can be achievable depending on your expenses, savings, investments, expected returns, and retirement duration. The shorter accumulation period and longer potential retirement period should both be included when estimating the required corpus.",
  },
  {
    q: "How does FIRE work?",
    a: "FIRE works by increasing the gap between income and expenses, investing the surplus, and building enough assets to eventually fund living expenses. The target is commonly expressed as a FIRE number based on annual spending and an assumed withdrawal rate.",
  },
  {
    q: "Is this retirement calculator free?",
    a: "Yes. The retirement calculator is free to use and is designed to provide quick retirement planning estimates without requiring an account.",
  },
  {
    q: "Does the retirement calculator work on mobile?",
    a: "Yes. The page is designed to be responsive so retirement planning content and calculator controls can be used on phones, tablets, and desktop screens.",
  },
  {
    q: "Can I export retirement calculations as PDF?",
    a: "If PDF export is available in the main retirement calculator interface, you can use it to save or share your calculated retirement projection. The SEO content page itself remains static and lightweight.",
  },
  {
    q: "What is the difference between FIRE and traditional retirement?",
    a: "Traditional retirement planning generally targets financial independence around a conventional retirement age, while FIRE focuses on reaching financial independence earlier. FIRE usually requires a higher savings rate and a longer period of portfolio sustainability.",
  },
  {
    q: "How often should I review my retirement plan?",
    a: "Review your retirement assumptions at least annually and after major changes to income, expenses, investments, family responsibilities, or retirement timing. Regular reviews can help keep your target corpus realistic.",
  },
  {
    q: "Can retirement planning help achieve financial independence?",
    a: "Yes. Retirement planning and financial independence use many of the same principles: controlling expenses, building investments, estimating future needs, and ensuring that invested assets can support your desired lifestyle.",
  },
];

const howToSteps = [
  {
    title: "Estimate your retirement expenses",
    desc: "Start with your current annual spending and consider future lifestyle goals, healthcare, family responsibilities, and inflation.",
  },
  {
    title: "Set your retirement assumptions",
    desc: "Choose a realistic retirement age, investment return assumption, inflation rate, retirement duration, and withdrawal rate.",
  },
  {
    title: "Calculate your target corpus",
    desc: "Use your inflation-adjusted retirement expenses and withdrawal assumptions to estimate the portfolio required for retirement.",
  },
  {
    title: "Compare retirement scenarios",
    desc: "Test traditional retirement and FIRE scenarios such as Lean FIRE, Coast FIRE, and Fat FIRE.",
  },
  {
    title: "Estimate monthly savings",
    desc: "Use regular investments such as SIPs to estimate the amount required to build the target retirement corpus.",
  },
  {
    title: "Review the plan regularly",
    desc: "Update your assumptions as your income, expenses, investments, retirement date, and financial goals change.",
  },
];

const coreFeatures = [
  {
    title: "Retirement Corpus Calculator",
    desc: "Estimate the retirement corpus required based on expenses, inflation, withdrawal assumptions, and retirement goals.",
    icon: "🏦",
  },
  {
    title: "FIRE Planning",
    desc: "Understand your financial independence target and explore early-retirement scenarios.",
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
    title: "Withdrawal Rate",
    desc: "Explore how different withdrawal assumptions affect the corpus required for retirement.",
    icon: "🧮",
  },
  {
    title: "Retirement Risk Planning",
    desc: "Understand sequence of returns risk, inflation risk, and other factors that can affect portfolio sustainability.",
    icon: "⚠️",
  },
  {
    title: "Asset Allocation Education",
    desc: "Learn why investment allocation and risk management matter during accumulation and retirement.",
    icon: "📊",
  },
  {
    title: "Responsive Experience",
    desc: "Use the retirement planning experience across mobile, tablet, and desktop screens.",
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
    desc: "Explore FIRE, Lean FIRE, Coast FIRE, and Fat FIRE scenarios.",
    icon: "🔥",
  },
  {
    title: "Indian Investors",
    desc: "Plan retirement expenses and corpus requirements using India-focused examples.",
    icon: "🇮🇳",
  },
  {
    title: "Pre-Retirees",
    desc: "Review corpus requirements, withdrawal rates, inflation, and retirement income.",
    icon: "🏖️",
  },
  {
    title: "Financial Planners",
    desc: "Use the educational content to explain retirement planning concepts and assumptions.",
    icon: "📒",
  },
  {
    title: "Mobile Users",
    desc: "Access retirement planning information and calculations from phones and tablets.",
    icon: "📲",
  },
];

const retirementEducation = [
  {
    title: "What Is Retirement Planning?",
    body: "Retirement planning is the process of estimating future expenses, deciding when you want financial independence, and building enough invested wealth to support your desired lifestyle after active employment.",
  },
  {
    title: "What Is a Retirement Corpus?",
    body: "A retirement corpus is the pool of invested assets intended to support your expenses after retirement. The required amount depends on future spending, inflation, investment returns, taxes, withdrawals, and retirement duration.",
  },
  {
    title: "What Is FIRE?",
    body: "FIRE means Financial Independence, Retire Early. The objective is to build enough invested wealth that employment becomes optional because the portfolio can potentially support ongoing expenses.",
  },
  {
    title: "Understanding SWP",
    body: "A Systematic Withdrawal Plan allows regular withdrawals from an investment portfolio. During retirement, the withdrawal amount needs to be considered alongside portfolio returns, inflation, taxes, and the expected duration of retirement.",
  },
  {
    title: "How Inflation Changes the Goal",
    body: "Future expenses can be substantially higher than today's expenses. Inflation-adjusted planning helps prevent an apparently adequate retirement target from becoming too small over a long investment horizon.",
  },
  {
    title: "Safe Withdrawal Rate Explained",
    body: "A withdrawal rate is a planning assumption used to estimate how much of a portfolio can be withdrawn each year. Lower withdrawal assumptions generally require a larger starting corpus.",
  },
  {
    title: "Sequence of Returns Risk",
    body: "Poor investment returns early in retirement can have a greater impact because withdrawals are occurring while the portfolio is falling. This makes portfolio sustainability important when planning retirement income.",
  },
  {
    title: "Asset Allocation Strategy",
    body: "Asset allocation affects both potential growth and investment risk. Many investors use a higher growth allocation during accumulation and gradually increase portfolio stability as retirement approaches.",
  },
];

const retirementMistakes = [
  "Starting too late and relying on unrealistic future returns.",
  "Ignoring inflation when estimating future retirement expenses.",
  "Using an aggressive withdrawal rate without considering retirement duration.",
  "Forgetting healthcare, emergency expenses, taxes, and family responsibilities.",
  "Depending on a single asset class without considering diversification.",
  "Assuming investment returns will be identical every year.",
];

const retirementStrategies = [
  "Start investing early to give compounding more time to work.",
  "Increase savings as income grows instead of allowing lifestyle inflation to consume the increase.",
  "Use conservative, base-case, and lower-return scenarios when testing your plan.",
  "Maintain an emergency fund separately from long-term retirement assets.",
  "Review asset allocation as retirement approaches.",
  "Recalculate the retirement target after major changes in income, expenses, or retirement timing.",
];

const relatedTools = [
  {
    name: "Home Loan EMI",
    href: "/tools/calculator/emi-calculator?category=home",
  },
  {
    name: "Car Loan EMI",
    href: "/tools/calculator/emi-calculator?category=car",
  },
  {
    name: "Personal Loan EMI",
    href: "/tools/calculator/emi-calculator?category=personal",
  },
  {
    name: "SIP Returns",
    href: "/tools/calculator/roi-calculator?category=sip",
  },
  {
    name: "Lumpsum Returns",
    href: "/tools/calculator/roi-calculator?category=lump",
  },
  {
    name: "Performance Returns",
    href: "/tools/calculator/roi-calculator?category=performance",
  },
  {
    name: "Simple Interest",
    href: "/tools/calculator/fd-calculator?category=simple",
  },
  {
    name: "Compound Interest",
    href: "/tools/calculator/fd-calculator?category=compound",
  },
  {
    name: "Fixed Deposit",
    href: "/tools/calculator/fd-calculator?category=fd",
  },
  {
    name: "Recurring Deposit",
    href: "/tools/calculator/fd-calculator?category=rd",
  },
];

/*
 * Structured data intentionally stays limited to schemas that directly
 * describe visible content on this page.
 */

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Retirement Calculator",
  description:
    "Steps for estimating retirement expenses, retirement corpus, FIRE targets, and monthly savings requirements.",
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
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: `${siteUrl}/tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Retirement Calculator",
      item: `${siteUrl}${canonicalPath}`,
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

export default function RetirementCalculatorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 text-white">
      {/* Structured data describes visible content; canonical belongs in page metadata. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

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
          Retirement Calculator for Corpus Planning, FIRE, SWP and
          Inflation-Adjusted Retirement Goals
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-base">
          Use this retirement calculator to estimate your retirement corpus,
          financial independence target, retirement income, and long-term
          savings requirements. You can use retirement planning assumptions
          such as inflation, investment returns, withdrawal rates, and
          retirement age to understand how much you may need for the future.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-base">
          The calculator can also help you explore FIRE planning, including
          Lean FIRE, Coast FIRE, and Fat FIRE, while giving you a practical
          way to think about SIP-based savings and systematic withdrawals
          during retirement.
        </p>
      </section>

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
              current expenses according to an assumed inflation rate for
              the years remaining until retirement.
            </p>

            <p className="mt-3 text-xs leading-6 text-white/65">
              Retirement Corpus = Annual Retirement Expenses ÷ Withdrawal
              Rate
            </p>

            <p className="mt-3 text-xs leading-6 text-white/65">
              For example, annual retirement expenses of ₹12,00,000 with a
              4% withdrawal assumption produce a simple planning estimate of:
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
              A commonly used FIRE planning shortcut is:
            </p>

            <p className="mt-3 text-xs leading-6 text-white/65">
              FIRE Number = Annual Expenses × 25
            </p>

            <p className="mt-3 text-xs leading-6 text-white/65">
              This corresponds to a 4% withdrawal assumption. It should be
              treated as a planning guideline rather than a guaranteed
              retirement rule.
            </p>

            <p className="mt-3 font-medium text-white">
              ₹12,00,000 × 25 = ₹3,00,00,000
            </p>
          </article>
        </div>
      </section>

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
              Your FIRE number is the approximate portfolio value you are
              targeting before financial independence. A common starting
              point is annual spending multiplied by 25, although the
              appropriate target depends on your assumptions.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Lean FIRE vs Fat FIRE
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Lean FIRE targets financial independence with lower annual
              spending, while Fat FIRE targets a larger portfolio capable
              of supporting a higher level of spending and flexibility.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Coast FIRE
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Coast FIRE focuses on reaching an invested portfolio size that
              may grow toward the eventual retirement target without
              requiring continued contributions, assuming the chosen growth
              assumptions are achieved.
            </p>
          </article>
        </div>
      </section>

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

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Retirement Calculator
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              A retirement calculator generally focuses on the corpus needed
              to support expenses after retirement, including inflation,
              retirement age, investment returns, withdrawal assumptions,
              and retirement duration.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              FIRE Calculator
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              A FIRE calculator focuses on achieving financial independence
              earlier by connecting annual spending, savings, investments,
              portfolio growth, and the target FIRE number.
            </p>
          </article>
        </div>
      </section>

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
            The retirement corpus required depends on annual expenses,
            retirement age, expected retirement duration, inflation,
            investment returns, taxes, and withdrawal strategy. A common
            planning approach starts with annual expenses divided by a chosen
            withdrawal rate.
          </p>

          <p className="mt-3 text-xs leading-6 text-white/65">
            For example, annual retirement expenses of ₹12 lakh would produce
            a ₹3 crore planning estimate at a 4% withdrawal assumption.
            Some investors may choose a lower withdrawal assumption and
            therefore target a larger corpus.
          </p>

          <p className="mt-3 text-xs leading-6 text-white/65">
            A calculator becomes more useful when it considers future
            inflation-adjusted expenses rather than simply multiplying
            today's spending by a fixed number.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="expense-corpus-heading"
        className="space-y-4"
      >
        <h2
          id="expense-corpus-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Retirement Corpus Required for Different Monthly Expenses
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Example retirement corpus estimates using a 4% withdrawal
              assumption
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
                  Corpus at 4% Withdrawal
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                ["₹25,000", "₹3 lakh", "₹75 lakh"],
                ["₹50,000", "₹6 lakh", "₹1.5 crore"],
                ["₹1,00,000", "₹12 lakh", "₹3 crore"],
                ["₹2,00,000", "₹24 lakh", "₹6 crore"],
              ].map(([monthly, annual, corpus]) => (
                <tr
                  key={monthly}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="p-4">{monthly}</td>
                  <td className="p-4">{annual}</td>
                  <td className="p-4">{corpus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-white/65">
          These are simple mathematical examples using a 4% withdrawal
          assumption. They do not account for taxes, inflation after
          retirement, healthcare costs, investment fees, or changes in
          spending.
        </p>
      </section>

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
              Investors in their 20s and 30s generally have a longer
              accumulation period. Starting early can give investments more
              time to compound, while regular contributions can help build
              long-term retirement wealth.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Retirement Planning in Your 40s and 50s
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              As retirement approaches, investors may need to increase
              savings, review debt, reassess asset allocation, and test
              whether their projected corpus is sufficient for their expected
              retirement expenses.
            </p>
          </article>
        </div>
      </section>

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
              desc: "Healthcare expenses can become an important part of retirement spending and should not be overlooked.",
            },
            {
              title: "Life Expectancy",
              desc: "A longer retirement period generally requires a more sustainable withdrawal strategy and potentially a larger corpus.",
            },
            {
              title: "Investment Returns",
              desc: "Portfolio growth affects how much capital is required before retirement and how long the corpus may last.",
            },
            {
              title: "Withdrawal Rate",
              desc: "A lower withdrawal assumption generally increases the corpus required but may provide a larger planning margin.",
            },
            {
              title: "Lifestyle",
              desc: "Housing, travel, family support, hobbies, and discretionary spending can significantly change retirement requirements.",
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
              Asset allocation affects both portfolio growth potential and
              investment risk. During accumulation, investors may accept
              greater volatility for long-term growth, while approaching
              retirement often increases the importance of portfolio
              stability and liquidity.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Sequence of Returns Risk
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Poor market returns early in retirement can have a larger
              impact when withdrawals are occurring at the same time. This
              is why retirement planning should consider portfolio
              sustainability rather than relying only on average returns.
            </p>
          </article>
        </div>
      </section>

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
              There is no universal retirement corpus for India. Your target
              depends on location, household expenses, housing, healthcare,
              family responsibilities, lifestyle, inflation, investment
              returns, and retirement duration.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Inflation and Retirement in India
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Long retirement horizons make inflation particularly important.
              Future expenses should be estimated rather than assuming that
              today's monthly budget will remain unchanged for decades.
            </p>
          </article>
        </div>
      </section>

      <section
        aria-labelledby="related-planning-heading"
        className="space-y-4"
      >
        <h2
          id="related-planning-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Related Retirement Planning Topics
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              FIRE Number
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Estimate the portfolio size required to support financial
              independence using annual spending and a chosen withdrawal
              assumption.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              SWP Income
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Understand how regular withdrawals can provide retirement
              income while the remaining portfolio stays invested.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              SIP Retirement Planning
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Estimate how regular monthly investments can contribute toward
              a long-term retirement corpus.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Compound Growth
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Understand how investment returns can compound over long
              periods and why starting early can affect retirement planning.
            </p>
          </article>
        </div>
      </section>

      <section
        aria-labelledby="related-heading"
        className="space-y-4"
      >
        <h2
          id="related-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Related Finance Calculators
        </h2>

        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 transition hover:border-blue-400/30 hover:bg-blue-400/15 hover:text-white"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <h2
          id="faq-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Frequently Asked Questions About Retirement Planning
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
                    className="shrink-0 text-lg text-blue-400"
                    aria-hidden="true"
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

                <div className="border-t border-dashed border-white/5 p-5">
                  <div className="mt-1 flex items-start gap-3">
                    <span
                      className="shrink-0 text-lg text-blue-400"
                      aria-hidden="true"
                    >
                      💡
                    </span>

                    <p className="text-xs leading-relaxed text-white/60">
                      {item.a}
                    </p>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}