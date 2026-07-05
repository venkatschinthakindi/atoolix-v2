import { serverConfig } from "@/config/server";
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/timezone-converter";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  {
    q: "What does this timezone converter do?",
    a: "It converts one selected source time into multiple target time zones and shows the local time, offset, abbreviation, and day difference.",
  },
  {
    q: "Can I compare more than one time zone at once?",
    a: "Yes. You can compare several target zones side by side in a single view.",
  },
  {
    q: "Does this tool handle daylight saving time?",
    a: "Yes. It accounts for DST changes and can flag invalid or ambiguous source times during transitions.",
  },
  {
    q: "Can I convert a time from IST to UTC or EST?",
    a: "Yes. You can select the source zone and view conversions such as IST to UTC, EST, PST, GMT, and many other zones.",
  },
  {
    q: "Is this a world clock converter?",
    a: "It works like a world clock converter because it shows the same source instant across multiple cities and time zones.",
  },
  {
    q: "Can I use this for meeting planning?",
    a: "Yes. It is useful for scheduling calls, interviews, webinars, and global team meetings across different regions.",
  },
  {
    q: "Can I share the conversion link?",
    a: "Yes. The tool can generate a shareable URL with your selected source zone, date, time, and target zones.",
  },
  {
    q: "Does it support 12-hour and 24-hour time?",
    a: "Yes. You can switch between 12-hour and 24-hour display formats.",
  },
  {
    q: "Is this timezone converter free?",
    a: "Yes. You can use it without a paid subscription.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Yes. The interface is responsive and works on phones, tablets, and desktops.",
  },
  {
    q: "Does the tool show day differences?",
    a: "Yes. It shows whether the converted time falls on the same day, the next day, or the previous day in the target zone.",
  },
  {
    q: "Can I copy converted times?",
    a: "Yes. You can copy a single row or all rows for easy sharing and planning.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Choose the source time zone",
    desc: "Select the zone where your original time belongs.",
    icon: "🕒",
  },
  {
    title: "Enter the date and time",
    desc: "Set the source date and time you want to convert.",
    icon: "📅",
  },
  {
    title: "Add target zones",
    desc: "Pick one or more target cities or time zones to compare.",
    icon: "🌍",
  },
  {
    title: "Review conversions",
    desc: "Check the converted local time, offset, and day difference for each zone.",
    icon: "👀",
  },
  {
    title: "Copy or share",
    desc: "Copy the results or share the link with your selected settings.",
    icon: "🔗",
  },
];

const supportedUseCases = [
  { useCase: "Business meetings", note: "Plan calls across teams in different countries." },
  { useCase: "Interview scheduling", note: "Avoid confusion when booking cross-time-zone interviews." },
  { useCase: "Travel planning", note: "Check local arrival and departure times before you fly." },
  { useCase: "Webinars and events", note: "Coordinate a launch or live session for a global audience." },
  { useCase: "Remote work", note: "Keep your daily work schedule aligned with teammates abroad." },
  { useCase: "Exam and form deadlines", note: "Understand submission times in the correct local zone." },
];

const popularPairs = [
  { from: "IST", to: "UTC" },
  { from: "IST", to: "EST" },
  { from: "IST", to: "PST" },
  { from: "UTC", to: "IST" },
  { from: "UTC", to: "CET" },
  { from: "GMT", to: "IST" },
];

const tips = [
  "Set the source date carefully when DST changes are involved.",
  "Use the same source instant to compare all target zones.",
  "Check the day difference when scheduling international meetings.",
  "Use 24-hour mode to avoid AM/PM confusion.",
  "Copy the share link if you need to send the same conversion to someone else.",
  "Use city names when you want a more practical comparison view.",
];

const relatedTools = [
  { name: "Unit Converter", href: "/tools/converter" },
  { name: "Calculator", href: "/tools/calculator" },
  { name: "EMI Calculator", href: "/tools/calculator/emi-calculator" },
  { name: "ROI Calculator", href: "/tools/calculator/roi-calculator" },
  { name: "PDF Tools", href: "/tools/pdf" },
  { name: "Image Tools", href: "/tools/image" },
  { name: "Finance Tools", href: "/tools/finance" }
];

const faqJsonLd = {
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Timezone Converter",
  description: "Convert one source time into multiple time zones with local time, offset, and day difference.",
  totalTime: "PT1M",
  step: howToSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.desc,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
    { "@type": "ListItem", position: 2, name: "Timezone Converter", item: canonicalUrl },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Related Tools",
  itemListElement: relatedTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `${siteUrl}${tool.href}`,
  })),
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-1.5">
      <h2 id={id} className="text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">{description}</p>
      ) : null}
    </div>
  );
}

export default function TimezoneConverterSeoContent() {
  return (
    <div className="mx-auto space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      {/* <JsonLd data={softwareApplicationSchema} /> */}

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Browser-Based Timezone Converter
        </p>
        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Free Timezone Converter Online – Convert Time Across Multiple Time Zones
        </h1>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Convert one source time into multiple time zones instantly. Compare local time,
          UTC offset, daylight saving time changes, and day differences for cities around
          the world with a free timezone converter built for planning meetings, travel,
          and global coordination. Use common zones like IST, UTC, GMT, EST, PST, and
          many more to quickly see how the same instant appears in different regions.
        </p>
      </section>

      <section aria-labelledby="use-cases-heading" className="space-y-4">
        <SectionHeading
          id="use-cases-heading"
          title="Common Use Cases"
          description="A timezone converter is useful whenever you need to coordinate across regions."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {supportedUseCases.map((item) => (
            <article key={item.useCase} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{item.useCase}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="pairs-heading" className="space-y-4">
        <SectionHeading
          id="pairs-heading"
          title="Popular Timezone Conversions"
          description="These are some of the most commonly searched timezone pairs."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularPairs.map((pair) => (
            <div
              key={`${pair.from}-${pair.to}`}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              {pair.from} to {pair.to}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-heading" className="space-y-4">
        <SectionHeading
          id="how-heading"
          title="How the Converter Works"
          description="Enter a source time, pick your target zones, and compare the same instant everywhere."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step) => (
            <article key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-lg">{step.icon}</div>
              <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="features-heading" className="space-y-4">
        <SectionHeading
          id="features-heading"
          title="What You Can Compare"
          description="The tool focuses on practical conversion details that matter in real scheduling."
        />
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            Converted local time in each target zone.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            UTC or local offset for every selected zone.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            DST-aware conversions with invalid or ambiguous time warnings.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            Same-day, next-day, or previous-day indicators.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            Copyable results and shareable links.
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            12-hour and 24-hour display options.
          </li>
        </ul>
      </section>

      <section aria-labelledby="tips-heading" className="space-y-4">
        <SectionHeading
          id="tips-heading"
          title="Timezone Planning Tips"
          description="Use these quick tips to avoid confusion when scheduling across regions."
        />
        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to the most common timezone converter questions."
        />
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">{item.q}</summary>
              <div className="border-t border-white/10 px-4 py-3">
                <p className="text-sm leading-6 text-white/70">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="space-y-4">
        <SectionHeading
          id="cta-heading"
          title="Plan Across Time Zones Faster"
          description="Use this timezone converter to compare multiple cities, check day changes, and avoid meeting confusion. It is useful for international teams, interview scheduling, travel planning, webinars, and any situation where a single time needs to be understood in several regions. You can also switch formats, copy results, or share the conversion link directly. Explore the related tools below for more utilities."
        />
        <div className="flex flex-wrap gap-2.5">
          {relatedTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}