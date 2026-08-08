import { serverConfig } from "@/config/server";
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/datetime/timezone-converter";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

// FIX: the live page linked to "/tools/meeting-time-finder", which does not
// exist — the real route is "/tools/datetime/meeting-time-finder". That was
// a dead internal link on a live page. Defined once here so both the intro
// paragraph and the Related Tools list can never drift apart again.
const meetingTimeFinderPath = "/tools/datetime/meeting-time-finder";

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type DstFact = { title: string; desc: string };

const faqItems: FaqItem[] = [
  {
    q: "What does this timezone converter do?",
    a: "It converts one source date and time into up to 10 other time zones side by side, showing local time, UTC offset, abbreviation, and day difference for each.",
  },
  {
    q: "How is this different from a meeting scheduler?",
    a: "This tool is for fast, one-off conversions — enter a time once and see it everywhere instantly. If you need to find a time slot where several people's working hours overlap, use the Meeting Time Finder instead.",
  },
  {
    q: "Does it handle daylight saving time?",
    a: "Yes. Offsets are calculated from the real UTC offset at the selected instant — not a fixed year-round number — so the conversion is automatically correct whether or not a DST transition falls between now and your selected date. The tool also flags source times that are invalid or ambiguous because they fall inside a DST transition.",
  },
  {
    q: "Can I convert IST to UTC, EST, or GMT?",
    a: "Yes. Pick any source zone and add target zones such as UTC, EST, PST, GMT, CET, and more from the quick-add list or the search box.",
  },
  {
    q: "Can I search by city or country instead of picking from a long list?",
    a: "Yes. Type a city or country name in the search box and matching zones appear instantly, ranked by relevance.",
  },
  {
    q: "Can I copy the converted times?",
    a: "Yes. Copy a single row's details or copy every zone at once as plain text, ready to paste into an email or message.",
  },
  {
    q: "Can I share this exact comparison with someone else?",
    a: "Yes. Copy a share link that encodes your source zone, date, time, and target zones — anyone who opens it sees the same comparison.",
  },
  {
    q: "Does it support 12-hour and 24-hour formats?",
    a: "Yes. Toggle between 12-hour AM/PM and 24-hour display at any time.",
  },
  {
    q: "Can I reorder the zones I'm comparing?",
    a: "Yes. Move any row up or down, or click a zone's time to make it the new source zone.",
  },
  {
    q: "Is this free and does it work on mobile?",
    a: "Yes. It's free to use and the layout adapts to a card view on phones and tablets.",
  },
  {
    q: "Does it show if a converted time falls on a different day?",
    a: "Yes. Each row shows whether the result lands on the same day, the next day, or the previous day relative to your source time.",
  },
  {
    q: "Does my data get sent to a server?",
    a: "No. All conversions happen locally in your browser.",
  },
];

// Pair-specific FAQs matching terms already in this page's own meta
// keywords ("EST to IST", "PST to IST", "GMT to IST") plus the highest
// search-volume IST pairs not yet covered. Phrased for pure conversion
// intent — "what is X in IST" — rather than meeting-overlap intent, since
// that's the Meeting Time Finder page's job. Offsets are fixed math (IST
// has no DST) so these answers don't go stale across DST transitions.
const conversionPairFaqs: FaqItem[] = [
  {
    q: "How do I convert EST to IST?",
    a: "Add 10 hours 30 minutes to EST (US Eastern Standard Time) to get IST, or 9 hours 30 minutes if the US is currently on EDT (Eastern Daylight Time, roughly March–November). Enter your EST time as the source above to get the exact IST equivalent for any date.",
  },
  {
    q: "How do I convert PST to IST?",
    a: "Add 13 hours 30 minutes to PST (US Pacific Standard Time) to get IST, or 12 hours 30 minutes if the US is currently on PDT (Pacific Daylight Time). Use the converter above with PST as the source zone to get the exact result for any date.",
  },
  {
    q: "How do I convert GMT to IST?",
    a: "Add 5 hours 30 minutes to GMT to get IST, or 4 hours 30 minutes if the UK is currently on BST (British Summer Time, roughly late March–late October). IST does not observe daylight saving, so only the UK side of this conversion shifts during the year.",
  },
  {
    q: "How do I convert UTC to IST?",
    a: "Add 5 hours 30 minutes to UTC to get IST. This offset is fixed year-round since neither UTC nor IST observes daylight saving time.",
  },
  {
    q: "How do I convert CST to IST?",
    a: "Add 11 hours 30 minutes to CST (US Central Standard Time) to get IST, or 10 hours 30 minutes during CDT (Central Daylight Time).",
  },
  {
    q: "How do I convert CET to IST?",
    a: "Add 4 hours 30 minutes to CET (Central European Time) to get IST, or 3 hours 30 minutes during CEST (Central European Summer Time).",
  },
  {
    q: "What is the current time in IST right now?",
    a: "Use the 'Use current time in source zone' option above with IST selected to see the live current time in India, along with the equivalent time in any other zone you add.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Pick the source zone",
    desc: "Choose the time zone your original time is in. Your browser's zone is detected automatically.",
    icon: "🕒",
  },
  {
    title: "Enter date and time",
    desc: "Set the exact source date and time you want converted.",
    icon: "📅",
  },
  {
    title: "Add target zones",
    desc: "Search by city or country, or use quick-add buttons, to compare up to 10 zones at once.",
    icon: "🌍",
  },
  {
    title: "Read the results",
    desc: "See converted local time, UTC offset, abbreviation, and day difference for every zone instantly.",
    icon: "👀",
  },
  {
    title: "Copy or share",
    desc: "Copy a single row, copy everything, or share a link that preserves your exact comparison.",
    icon: "🔗",
  },
];

const supportedUseCases = [
  { useCase: "Quick call scheduling", note: "Check what time it is somewhere else before you dial in." },
  { useCase: "Travel planning", note: "See local arrival and departure times before you book a flight." },
  { useCase: "Cross-border deadlines", note: "Confirm submission or filing deadlines in the correct local zone." },
  { useCase: "Remote check-ins", note: "Glance at a teammate's local time before messaging them." },
  { useCase: "Event announcements", note: "Convert a single event time into every region your audience is in." },
  { useCase: "Personal reminders", note: "Confirm a friend or family member's local time across zones." },
];

// Expanded to match this page's own meta-keywords list more fully
// (previously only 6 pairs; keywords already reference EST/PST/GMT/IST but
// the visible grid didn't cover CST, CET, SGT, JST, AEST, or GST).
const popularPairs = [
  { from: "IST", to: "UTC" },
  { from: "IST", to: "EST" },
  { from: "IST", to: "PST" },
  { from: "IST", to: "CST" },
  { from: "IST", to: "GMT" },
  { from: "IST", to: "CET" },
  { from: "IST", to: "SGT" },
  { from: "IST", to: "JST" },
  { from: "UTC", to: "EST" },
];

// New: DST is named explicitly in the meta description and keywords
// ("daylight saving time (DST) changes", "daylight saving time converter",
// "DST converter") but previously only got one line inside a single FAQ
// answer. This gives it dedicated, skimmable on-page content so the page
// can actually compete for DST-specific queries instead of just claiming
// the feature in metadata.
const dstFacts: DstFact[] = [
  {
    title: "Why time differences change during the year",
    desc: "Many countries move their clocks forward in spring and back in autumn. When only one side of a conversion observes DST, the gap between two zones shifts by an hour twice a year — even though neither zone's 'base' offset changed.",
  },
  {
    title: "Not every zone observes DST",
    desc: "India (IST), Japan (JST), Singapore (SGT), and the UAE (GST) never change their clocks. The US, UK, and most of Europe do. That's why an IST-to-EST gap changes across the year, but an IST-to-JST gap never does.",
  },
  {
    title: "Northern vs. Southern Hemisphere DST",
    desc: "The US and Europe move clocks forward in March and back in November. Australia and New Zealand do the opposite — forward in October, back in April — because their seasons are reversed. This converter accounts for each zone's own DST calendar automatically.",
  },
  {
    title: "Invalid and ambiguous times",
    desc: "When clocks spring forward, one hour is skipped entirely (an 'invalid' time that never occurred). When clocks fall back, one hour happens twice (an 'ambiguous' time). This tool detects both and flags them instead of silently guessing.",
  },
];

const tips = [
  "Double-check the source date when converting near a DST changeover — the tool will warn you if the time is invalid or ambiguous.",
  "Use city names in search when you want a more intuitive comparison than raw UTC offsets.",
  "Check the day-difference badge — an overlapping hour can still land on a different calendar day.",
  "Use 24-hour mode when sharing with international contacts to avoid AM/PM mix-ups.",
  "Copy the share link instead of retyping times when sending the comparison to someone else.",
  "Need to find a slot that works for everyone's working hours instead of a single conversion? Use the Meeting Time Finder.",
];

const relatedTools = [
  { name: "Meeting Time Finder", href: meetingTimeFinderPath },
  { name: "Unit Converter", href: "/tools/converter" },
  { name: "Calculator", href: "/tools/calculator" },
  { name: "EMI Calculator", href: "/tools/calculator/emi-calculator" },
  { name: "ROI Calculator", href: "/tools/calculator/roi-calculator" },
  { name: "PDF Tools", href: "/tools/pdf" },
  { name: "Image Tools", href: "/tools/image" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...faqItems, ...conversionPairFaqs].map((item) => ({
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
  name: "How to Convert a Time Across Multiple Time Zones",
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
    { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteUrl}/tools/datetime` },
    { "@type": "ListItem", position: 3, name: "Timezone Converter", item: canonicalUrl },
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

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Instant Timezone Converter
        </p>
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Timezone Converter – Instantly Convert Time Across Multiple Zones
        </h2>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Enter a time once and see it converted across up to 10 time zones instantly — no
          scheduling logic, just a fast, accurate lookup that automatically accounts for
          daylight saving time. Compare local time, UTC offset, and day differences for
          zones like IST, UTC, GMT, EST, and PST, copy the results, or share a link. Need to
          find a slot that fits everyone's working hours instead? Try the{" "}
          <a href={meetingTimeFinderPath} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
            Meeting Time Finder
          </a>.
        </p>
      </section>

      <section aria-labelledby="use-cases-heading" className="space-y-4">
        <SectionHeading
          id="use-cases-heading"
          title="Common Use Cases"
          description="A quick converter is useful whenever you need a single time translated, not a scheduled overlap."
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

      <section aria-labelledby="how-heading" className="space-y-4">
        <SectionHeading
          id="how-heading"
          title="How the Converter Works"
          description="Enter a source time, pick your target zones, and compare the same instant everywhere."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step) => (
            <article key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-lg" aria-hidden="true">{step.icon}</div>
              <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/*
        New section. DST is claimed explicitly in this page's meta
        description and keywords but previously had no dedicated on-page
        content — a real gap against competitors (timeanddate.com,
        worldtimebuddy.com) who have full DST explainers. This also targets
        "DST converter" / "daylight saving time converter" head terms
        directly rather than relying on a single FAQ line.
      */}
      <section aria-labelledby="dst-heading" className="space-y-4">
        <SectionHeading
          id="dst-heading"
          title="How This Converter Handles Daylight Saving Time"
          description="Every conversion is calculated from each zone's real, current UTC offset — not a fixed number — so results stay accurate through DST transitions."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {dstFacts.map((item) => (
            <article key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="tips-heading" className="space-y-4">
        <SectionHeading
          id="tips-heading"
          title="Conversion Tips"
          description="Quick tips to avoid the most common mistakes."
        />
        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/*
        New section: pair-specific conversion FAQs matching this page's own
        meta keywords (EST to IST, PST to IST, GMT to IST) which previously
        had zero dedicated content despite being explicitly targeted in
        <head>. Kept separate from the general FAQ so each section stays
        topically tight.
      */}
      <section aria-labelledby="pair-faq-heading" className="space-y-4">
        <SectionHeading
          id="pair-faq-heading"
          title="Common Time Zone Conversions Explained"
          description="Fixed offset math for the most searched conversion pairs. For the exact converted time on a specific date, use the converter above."
        />
        <div className="space-y-3">
          {conversionPairFaqs.map((item) => (
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
          title="Need to Schedule a Meeting Instead?"
          description="This tool is built for fast, single conversions. If you need to find a time slot where several people's working hours overlap — with templates, CSV export, and calendar invites — the Meeting Time Finder is the better fit."
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