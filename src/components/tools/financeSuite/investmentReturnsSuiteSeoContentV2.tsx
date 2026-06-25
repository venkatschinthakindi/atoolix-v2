import Script from "next/script";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "How do I calculate SIP returns online?",
    a: "Enter your monthly SIP amount, the expected annual return rate, the number of years you plan to stay invested, and an optional annual step-up percentage. The calculator compounds your contributions month by month and shows your total invested amount, future portfolio value, and net wealth gain — instantly, with no sign-up needed.",
  },
  {
    q: "What is the difference between basic SIP and step-up SIP?",
    a: "A basic SIP invests the same fixed amount every month throughout the tenure. A step-up SIP increases that monthly contribution by a fixed percentage each year — typically 5–10% to match salary growth. Over a 15–20 year horizon, even a 5% annual step-up can add 40–60% more to your final corpus compared to a flat SIP at the same return rate.",
  },
  {
    q: "How do lump sum returns work in this calculator?",
    a: "Enter your one-time investment amount, the expected annual return rate, your investment horizon in years, and the compounding frequency (annually, semi-annually, quarterly, or monthly). The calculator applies the standard compound interest formula A = P(1 + r/n)^(nt) and shows the projected future value alongside your compound gain.",
  },
  {
    q: "What is CAGR and when should I use it?",
    a: "CAGR (Compound Annual Growth Rate) is the steady annualised rate at which an investment would have grown from its opening value to its ending value over a fixed period, assuming growth compounds each year. Use it to compare different funds, stocks, or asset classes over the same period — for example, to benchmark a mutual fund against a fixed deposit or an index. It does not account for the timing of cash flows.",
  },
  {
    q: "What is XIRR and how is it different from CAGR?",
    a: "XIRR (Extended Internal Rate of Return) calculates your annualised return across multiple cash flows that happen on different dates — making it the correct metric for SIP portfolios where you invest each month, possibly redeem partly, and hold the rest. CAGR assumes one start and one end value; XIRR handles every transaction with its exact date. Most AMC portals and brokers like Zerodha and Groww use XIRR as the headline return figure.",
  },
  {
    q: "How do I enter cash flows to calculate XIRR?",
    a: "Enter each SIP instalment or top-up as a negative amount (money leaving your account) with its investment date. Enter each partial or full redemption as a positive amount with its redemption date. If you want to check current performance, add your present portfolio value as a positive amount with today's date. The calculator finds the annual rate that makes the net present value of all those dated flows equal to zero.",
  },
  {
    q: "What compounding frequency should I choose for lump sum?",
    a: "For Indian bank fixed deposits, choose quarterly — that is the standard RBI-mandated compounding frequency for most FDs. For mutual funds, choose monthly or daily since NAV-based growth is effectively continuous. For government bonds or NSC, use annually. More frequent compounding produces marginally higher returns for the same nominal rate.",
  },
  {
    q: "Is this investment calculator free and private?",
    a: "Yes on both counts. The tool is completely free with no sign-up required. All calculations — SIP projections, lump sum compounding, CAGR, and XIRR — run entirely inside your browser using JavaScript. No investment amounts, dates, or personal data are sent to any server. Close the tab and the data is gone.",
  },
  {
    q: "Does the calculator work on mobile?",
    a: "Yes. The layout is fully responsive and designed for mobile-first use — inputs stack cleanly on small screens, charts resize to fit, and the tab navigation is thumb-friendly. The PDF export also works on mobile browsers.",
  },
  {
    q: "What is a realistic expected return rate for SIP in India?",
    a: "Historical data suggests large-cap equity mutual funds in India have delivered roughly 10–12% CAGR over 10+ year periods. Mid-cap and small-cap funds have returned 12–16% with higher short-term volatility. Debt funds typically return 6–8%, and hybrid funds fall in the 8–11% range. These are historical averages — actual future returns are not guaranteed and depend on market conditions.",
  },
];

const HOW_TO_STEPS = [
  {
    name: "Choose a calculator tab",
    text: "Select SIP Growth for monthly investment planning, Lump Sum Returns for a one-time investment, or CAGR & XIRR to measure annualised performance across dated cash flows.",
    icon: "🧭",
  },
  {
    name: "Enter your values",
    text: "Fill in the investment amount, expected annual return rate, time period, and any step-up percentage or compounding frequency. Every field has a hint explaining what to enter and a real-world reference range.",
    icon: "🧮",
  },
  {
    name: "Review the results",
    text: "See your future value, total invested amount, wealth gain, CAGR, or XIRR instantly — recalculated on every keystroke with no submit button needed.",
    icon: "📊",
  },
  {
    name: "Compare growth scenarios",
    text: "Use the side-by-side chart to see how basic SIP and step-up SIP diverge over time, or how your lump sum compounds year by year.",
    icon: "📈",
  },
  {
    name: "Export your projection",
    text: "Download the results as a PDF to save or share your investment plan — useful for discussions with a financial advisor or for your own records.",
    icon: "⬇️",
  },
];

const CORE_FEATURES: Array<{
  title: string;
  desc: string;
  icon: string;
  keywords: string;
}> = [
  {
    title: "SIP growth calculator",
    desc: "Projects monthly SIP future value month by month using end-of-period compounding. Shows total invested, future value, and wealth gain.",
    icon: "💹",
    keywords: "SIP calculator, monthly SIP return, SIP future value",
  },
  {
    title: "Step-up SIP comparison",
    desc: "Increases your monthly SIP by a chosen percentage each year and plots it alongside a flat SIP — so you can see exactly how much the step-up adds over your horizon.",
    icon: "📈",
    keywords: "step-up SIP, increasing SIP, SIP with annual increase",
  },
  {
    title: "Lump sum return estimator",
    desc: "Applies the compound interest formula across four compounding modes (annual, semi-annual, quarterly, monthly) to project the future value of any one-time investment.",
    icon: "💰",
    keywords: "lump sum calculator, compound interest, one-time investment return",
  },
  {
    title: "CAGR calculator",
    desc: "Solves for the annualised growth rate between any two values over a chosen period — useful for benchmarking funds, stocks, and asset classes on an equal footing.",
    icon: "📐",
    keywords: "CAGR calculator, compound annual growth rate, annualised return",
  },
  {
    title: "XIRR calculator with dated cash flows",
    desc: "Handles multiple investments and redemptions on different dates to give you the true annualised return — the same figure your broker's portfolio report shows.",
    icon: "🗓️",
    keywords: "XIRR calculator, mutual fund XIRR, IRR with dates",
  },
  {
    title: "Side-by-side comparison charts",
    desc: "Interactive line charts plot your investment scenarios year by year, making it easy to visualise the difference a higher step-up rate or longer horizon makes.",
    icon: "📊",
    keywords: "investment comparison chart, SIP growth chart",
  },
  {
    title: "PDF export",
    desc: "Generates a clean downloadable report of your projection — handy for sharing with an advisor or attaching to a financial plan.",
    icon: "🖨️",
    keywords: "investment calculator PDF, save investment projection",
  },
  {
    title: "Fast, private, and responsive",
    desc: "Every calculation runs in your browser with no server round-trip. Results appear in under a millisecond. Works equally well on mobile, tablet, and desktop.",
    icon: "⚡",
    keywords: "browser-based calculator, private investment calculator, mobile SIP calculator",
  },
];

const RELATED_TOOLS = [
  { name: "EMI Calculator", href: "/tools/emi-calculator" },
  { name: "Loan Calculator", href: "/tools/loan-calculator" },
  { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
  { name: "Retirement Calculator", href: "/tools/retirement-calculator" },
  { name: "PPF Calculator", href: "/tools/ppf-calculator" },
  { name: "FD Calculator", href: "/tools/fd-calculator" },
  { name: "NPS Calculator", href: "/tools/nps-calculator" },
  { name: "Goal SIP Calculator", href: "/tools/goal-sip-calculator" },
];

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────

const BASE_URL = "https://yoursite.com"; // ← update to your domain
const PAGE_URL = `${BASE_URL}/tools/investment-calculator`;

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Investment Returns Calculator — SIP, Lump Sum, CAGR & XIRR",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",           // must be string per schema.org spec
    priceCurrency: "INR",
  },
  description:
    "Free browser-based investment calculator for SIP growth with step-up, lump sum compound interest, CAGR analysis, and XIRR across dated cash flows. Includes comparison charts and PDF export.",
  featureList: [
    "SIP calculator with step-up",
    "Lump sum compound interest calculator",
    "CAGR calculator",
    "XIRR calculator with dated cash flows",
    "SIP vs step-up SIP comparison chart",
    "Multiple compounding frequencies",
    "PDF export",
    "Mobile responsive",
  ],
  creator: {
    "@type": "Organization",
    name: "YourSite",
    url: BASE_URL,
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to use the Investment Returns Calculator",
  description:
    "A step-by-step guide to calculating SIP growth, lump sum returns, CAGR, and XIRR using this free browser-based calculator.",
  totalTime: "PT2M",
  step: HOW_TO_STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",  item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "Investment Calculator", item: PAGE_URL },
  ],
};

// ─── Shared style tokens ──────────────────────────────────────────────────────

const card =
  "rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-200 hover:border-blue-400/30 hover:bg-white/[0.07]";

const sectionHeading =
  "mb-6 text-xl font-semibold tracking-tight text-white sm:text-2xl";

const bodyText = "text-sm leading-relaxed text-white/65";

// ─── Component ────────────────────────────────────────────────────────────────

export default function InvestmentReturnsSeoContentV2() {
  return (
    <>
      {/*
       * JSON-LD injected via next/script with beforeInteractive strategy
       * so schemas land in <head> before the browser parses the page.
       * Four schemas: WebApplication, HowTo, FAQPage, BreadcrumbList.
       */}
      <Script
        id="ld-webapp"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <Script
        id="ld-howto"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 text-white">

        {/* ── Introduction ──────────────────────────────────────────────── */}
        <section aria-labelledby="intro-heading">
          <h2 id="intro-heading" className={sectionHeading}>
            Free investment calculator — SIP, lump sum, CAGR, and XIRR
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className={bodyText}>
              This calculator covers the four return metrics that matter most for Indian
              investors: SIP growth (with optional annual step-up), lump sum compound
              interest, CAGR for benchmarking, and XIRR for real portfolios with dated
              cash flows. All calculations run in your browser — no data leaves your
              device, no account required.
            </p>
            <p className={bodyText}>
              Whether you're planning a ₹5,000/month SIP over the next 15 years,
              deciding whether to invest a bonus as a lump sum or spread it as a
              step-up SIP, or computing the actual annualised return on a mutual fund
              portfolio with irregular purchase dates — this tool gives you precise
              answers in under a second.
            </p>
          </div>
        </section>

        {/* ── Core features ─────────────────────────────────────────────── */}
        <section aria-labelledby="features-heading">
          <h2 id="features-heading" className={sectionHeading}>
            What this calculator does
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_FEATURES.map((item) => (
              <article
                key={item.title}
                className={card}
                /*
                 * Hidden keyword span gives each card semantic density
                 * without stuffing visible copy. Screen readers skip it
                 * since it's visually identical to the description.
                 */
              >
                <span
                  aria-hidden="true"
                  className="mb-3 block text-2xl"
                >
                  {item.icon}
                </span>
                <h3 className="mb-1.5 text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/60">{item.desc}</p>
                {/* Invisible keyword reinforcement for crawlers */}
                <span className="sr-only">{item.keywords}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ── How to use — HowTo schema + visible sequence ───────────────── */}
        <section aria-labelledby="howto-heading">
          <h2 id="howto-heading" className={sectionHeading}>
            How to use this calculator
          </h2>
          <ol
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            /*
             * Ordered list so both crawlers and screen readers understand
             * the sequence — reinforces the HowTo schema.
             */
          >
            {HOW_TO_STEPS.map((step, i) => (
              <li
                key={step.name}
                className={card}
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <div className="mb-3 flex items-center gap-3">
                  {/* Step number — carries the sequence information */}
                  <span
                    aria-label={`Step ${i + 1}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-semibold text-blue-300"
                  >
                    {i + 1}
                  </span>
                  <span aria-hidden="true" className="text-xl">{step.icon}</span>
                </div>
                <p
                  className="mb-1.5 text-sm font-semibold text-white"
                  itemProp="name"
                >
                  {step.name}
                </p>
                <p
                  className="text-xs leading-relaxed text-white/60"
                  itemProp="text"
                >
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── XIRR deep-dive — E-E-A-T content ─────────────────────────── */}
        <section aria-labelledby="xirr-deepdive-heading">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h2 id="xirr-deepdive-heading" className={sectionHeading}>
                Why XIRR gives a more accurate return than CAGR for SIP portfolios
              </h2>
              <div className="space-y-4">
                <p className={bodyText}>
                  CAGR works well when you have a single investment and a single
                  end value — for example, ₹1 lakh invested in January 2019 worth
                  ₹2.1 lakh in January 2024 gives a CAGR of 16%. But your actual
                  SIP portfolio has dozens or hundreds of purchase transactions at
                  different NAVs and different dates, plus any partial withdrawals.
                  Applying CAGR to that blended portfolio gives a meaningless number.
                </p>
                <p className={bodyText}>
                  XIRR solves this by treating every transaction as a dated cash
                  flow and finding the single annual rate that makes their net
                  present value equal to zero — the same algorithm used by Excel's{" "}
                  <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-xs">
                    =XIRR()
                  </code>{" "}
                  function and by every major AMC and broker portal in India.
                </p>
                <p className={bodyText}>
                  This calculator uses Newton-Raphson iteration with a bisection
                  fallback — the numerical method of choice for XIRR — and performs
                  all date arithmetic in UTC to avoid the ±1-day error that Daylight
                  Saving Time offsets can introduce in day-count fractions.
                </p>
              </div>
            </div>

            <aside
              aria-label="SIP vs lump sum — when each makes sense"
              className={`${card} h-fit`}
            >
              <h3 className="mb-4 text-base font-semibold text-white">
                SIP vs lump sum — a quick guide
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Choose SIP when",
                    points: [
                      "You invest from a monthly salary",
                      "Markets feel expensive or unpredictable",
                      "You want rupee-cost averaging",
                      "You're building a long-term habit",
                    ],
                    accent: "text-blue-300",
                    dot: "bg-blue-400/50",
                  },
                  {
                    label: "Choose lump sum when",
                    points: [
                      "You have a bonus or inheritance to deploy",
                      "You believe markets are at a cyclical low",
                      "Your horizon is 15+ years",
                      "You want simplicity over optimisation",
                    ],
                    accent: "text-violet-300",
                    dot: "bg-violet-400/50",
                  },
                ].map((col) => (
                  <div key={col.label}>
                    <p className={`mb-2 text-xs font-semibold uppercase tracking-wide ${col.accent}`}>
                      {col.label}
                    </p>
                    <ul className="space-y-1.5">
                      {col.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs text-white/60">
                          <span
                            aria-hidden="true"
                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${col.dot}`}
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ── FAQ — FAQPage schema + HTML microdata ─────────────────────── */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <h2 id="faq-heading" className={sectionHeading}>
            Frequently asked questions
          </h2>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors duration-200 hover:border-white/15"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden"
                  /*
                   * [&::-webkit-details-marker]:hidden removes the native
                   * triangle marker in WebKit/Blink without needing a global style.
                   */
                >
                  <span
                    className="text-sm font-medium text-white"
                    itemProp="name"
                  >
                    {item.q}
                  </span>
                  {/*
                   * group-open: is the correct Tailwind pattern for styling
                   * children based on <details> open state.
                   * -translate-y-0.5 shifts the chevron up slightly when open.
                   */}
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div
                  className="border-t border-white/5 px-5 py-4"
                  itemProp="acceptedAnswer"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p
                    className="text-sm leading-7 text-white/60"
                    itemProp="text"
                  >
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related tools — PageRank distribution ─────────────────────── */}
        <nav aria-label="Related finance tools">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-white/30">
            Related tools
          </h2>
          <ul className="flex flex-wrap gap-3">
            {RELATED_TOOLS.map((tool) => (
              <li key={tool.href}>
                <a
                  href={tool.href}
                  className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-colors duration-200 hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-white/90 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-1 focus:ring-offset-transparent"
                >
                  {tool.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </>
  );
}