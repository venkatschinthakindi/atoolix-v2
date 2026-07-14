import { serverConfig } from "@/config/server";
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/timezone-converter";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  {
    q: "What does this tool do?",
    a: "It converts one source date and time into up to 10 target time zones at once, and finds meeting slots where every selected zone is inside working hours — all calculated in your browser.",
  },
  {
    q: "Can it find a meeting time automatically, not just convert time?",
    a: "Yes. Set working days, start/end time, and slot precision for each zone, then it scans the next 10 days and lists the times when everyone overlaps.",
  },
  {
    q: "Does it handle daylight saving time correctly?",
    a: "Yes. Every conversion and every working-hours check is re-derived from the real UTC offset at that instant, so DST spring-forward and fall-back transitions in any zone are handled automatically. Invalid times (DST gaps) and ambiguous times (DST fall-back repeats) are flagged with a warning.",
  },
  {
    q: "Can I search by city, country, or abbreviation?",
    a: "Yes. Type a city name, country, or common abbreviation like EST, IST, CET, or GST and matching zones appear instantly, with quick-add buttons for popular cities.",
  },
  {
    q: "Can I export the comparison?",
    a: "Yes. Export a CSV with every zone's local date, time, weekday, offset, and working-hours status, or download a .ics calendar invite that opens at the correct local time in any calendar app.",
  },
  {
    q: "What are meeting templates?",
    a: "Presets like Sales Call, Board Review, Client Demo, and Travel Briefing that prefill the meeting title, duration, description, and suggested working hours in one click.",
  },
  {
    q: "Can I reorder or swap the source zone?",
    a: "Yes. Drag rows with the grip handle, use the up/down buttons, or click any zone's time to make it the new source zone.",
  },
  {
    q: "Can I share my comparison with someone else?",
    a: "Yes. Copy a share link that encodes your source zone, date, time, target zones, and time format so anyone opening it sees the exact same comparison.",
  },
  {
    q: "Does it support 12-hour and 24-hour time?",
    a: "Yes. Toggle between 12-hour AM/PM and 24-hour display at any time.",
  },
  {
    q: "Is this free and does it work on mobile?",
    a: "Yes. It's free to use, fully responsive, and switches to a card layout on smaller screens instead of a wide table.",
  },
  {
    q: "How many time zones can I compare at once?",
    a: "Up to 10 target zones alongside your source zone in a single comparison.",
  },
  {
    q: "Does my data leave my browser?",
    a: "No. All conversions, working-hours calculations, and exports run locally in your browser — nothing is uploaded to a server.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Set your source time",
    desc: "Pick the source time zone, then enter the date and time you want to convert. Your browser's zone is detected automatically.",
    icon: "🕒",
  },
  {
    title: "Add target zones",
    desc: "Search by city, country, or abbreviation, or use the quick-add buttons for popular locations. Add up to 10 zones.",
    icon: "🌍",
  },
  {
    title: "Set working hours",
    desc: "Choose working days, start and end times, and slot precision for each zone in the meeting finder.",
    icon: "🗓️",
  },
  {
    title: "Find overlapping slots",
    desc: "Click 'Find next available slots' to see upcoming times when every selected zone is within working hours.",
    icon: "✅",
  },
  {
    title: "Export or share",
    desc: "Apply a suggested slot, then download a CSV comparison, a .ics calendar invite, or copy a share link.",
    icon: "📤",
  },
];

const featureItems: FeatureItem[] = [
  {
    title: "Multi-zone conversion",
    desc: "Convert one source instant into up to 10 target time zones simultaneously, with local time, offset, abbreviation, and day difference for each.",
    icon: "🌐",
  },
  {
    title: "DST-safe calculations",
    desc: "Offsets and working-hours checks are recalculated from the real UTC offset at each instant, so results stay correct across daylight saving transitions.",
    icon: "🔁",
  },
  {
    title: "Meeting time finder",
    desc: "Define working days and hours per zone and scan the next 10 days for slots where everyone overlaps, at 5, 15, 30, or 60-minute precision.",
    icon: "🔎",
  },
  {
    title: "Meeting templates",
    desc: "One-click presets — Sales Call, Board Review, Client Demo, Travel Briefing — that prefill title, duration, description, and working hours.",
    icon: "📋",
  },
  {
    title: "Smart search",
    desc: "Find zones instantly by city, country, IANA name, or common abbreviation like EST, IST, CET, or GST.",
    icon: "🔤",
  },
  {
    title: "Drag-and-drop reordering",
    desc: "Reorder your comparison rows by dragging, using the up/down buttons, or promoting any target zone to become the new source.",
    icon: "↕️",
  },
  {
    title: "CSV export",
    desc: "Download a spreadsheet-ready comparison with local date, time, weekday, offset, diff vs. source, and working-hours status for every zone.",
    icon: "📊",
  },
  {
    title: "Calendar (.ics) export",
    desc: "Generate a calendar invite anchored to the exact UTC instant, so it opens correctly in any calendar app regardless of the recipient's zone or DST.",
    icon: "📅",
  },
  {
    title: "Shareable links",
    desc: "Copy a URL that encodes your source zone, date, time, target zones, and format — open it anywhere to see the identical comparison.",
    icon: "🔗",
  },
];

const supportedUseCases = [
  { useCase: "Global team meetings", note: "Find working-hours overlap automatically instead of manually checking each zone." },
  { useCase: "Interview scheduling", note: "Use the Sales Call or Client Demo template to quickly set duration and export a calendar invite." },
  { useCase: "Board & client reviews", note: "Apply the Board Review template for extended working hours and longer meeting slots." },
  { useCase: "Travel planning", note: "Check local arrival, departure, and briefing times before you fly, day-difference included." },
  { useCase: "Webinars and launches", note: "Compare launch time across every region your audience is in before you announce it." },
  { useCase: "Remote work coordination", note: "Export a CSV of overlapping hours to share with distributed teammates." },
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
  "Set working days and hours before running 'Find next available slots' — results depend on both.",
  "Use a meeting template to save time filling in title, duration, and description together.",
  "Check the day-difference badge before booking — an overlapping hour can still fall on a different calendar day.",
  "Export the .ics invite rather than typing times manually; it stays correct even if a recipient's zone observes DST differently.",
  "Use 24-hour mode when sharing with international teams to avoid AM/PM ambiguity.",
  "If a source time is flagged as invalid or ambiguous, it's a DST transition in that zone — adjust by an hour and re-check.",
];

const relatedTools = [
  { name: "Unit Converter", href: "/tools/converter" },
  { name: "Calculator", href: "/tools/calculator" },
  { name: "EMI Calculator", href: "/tools/calculator/emi-calculator" },
  { name: "ROI Calculator", href: "/tools/calculator/roi-calculator" },
  { name: "PDF Tools", href: "/tools/pdf" },
  { name: "Image Tools", href: "/tools/image" },
  { name: "Finance Tools", href: "/tools/finance" },
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
  name: "How to Find a Meeting Time Across Time Zones",
  description:
    "Convert a source time into multiple time zones and find overlapping working-hours meeting slots automatically.",
  totalTime: "PT2M",
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

export default function MeetingTimeFinderSeoContent() {
  return (
    <div className="mx-auto space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Browser-Based Timezone Converter & Meeting Time Finder
        </p>
        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Timezone Converter & Meeting Time Finder – Convert Time and Find Overlapping Hours
        </h1>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Convert one source time into up to 10 time zones at once, then let the built-in
          meeting finder scan the next 10 days for slots where every zone is inside working
          hours. Compare local time, UTC offset, and daylight saving changes for zones like
          IST, UTC, GMT, EST, and PST, apply a meeting template, and export the result as a
          CSV comparison or a .ics calendar invite — all calculated instantly in your browser.
        </p>
      </section>

      <section aria-labelledby="features-heading" className="space-y-4">
        <SectionHeading
          id="features-heading"
          title="What This Tool Does"
          description="More than a converter — it finds and exports a meeting time that actually works for everyone."
        />
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

      <section aria-labelledby="how-heading" className="space-y-4">
        <SectionHeading
          id="how-heading"
          title="How to Use the Meeting Time Finder"
          description="Five steps from source time to an exported invite everyone can trust."
        />
        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">{step.icon}</span>
                <span className="text-xs font-semibold text-white/50">Step {index + 1}</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="use-cases-heading" className="space-y-4">
        <SectionHeading
          id="use-cases-heading"
          title="Common Use Cases"
          description="Built for the situations where a single time needs to work across regions."
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
          description="Some of the most commonly searched timezone pairs."
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

      <section aria-labelledby="tips-heading" className="space-y-4">
        <SectionHeading
          id="tips-heading"
          title="Scheduling Tips"
          description="Quick tips to avoid the most common cross-timezone mistakes."
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
          description="Answers to the most common questions about the converter and meeting finder."
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
          description="Convert time, find overlapping working hours, apply a meeting template, and export a CSV or calendar invite — all in one tool. Useful for international teams, interview scheduling, board reviews, travel planning, and webinars. Explore the related tools below for more utilities."
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