import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl;

const canonicalPath = "/tools/datetime/timezone-converter";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

const meetingTimeFinderPath = "/tools/datetime/meeting-time-finder";

type FaqItem = {
  q: string;
  a: string;
};

type StepItem = {
  title: string;
  desc: string;
  icon: string;
};

type DstFact = {
  title: string;
  desc: string;
};

const faqItems: FaqItem[] = [
  {
    q: "What is a timezone converter?",
    a: "A timezone converter converts a date and time from one time zone into the corresponding local time in other time zones. This converter lets you compare up to 10 zones at once and shows the local time, UTC offset, abbreviation, and day difference.",
  },
  {
    q: "How do I convert time between time zones?",
    a: "Select the source time zone, enter the date and time, then add the time zones you want to compare. The converter calculates the corresponding local time for each zone automatically.",
  },
  {
    q: "Can I convert IST to EST, PST, GMT, or UTC?",
    a: "Yes. You can convert India Standard Time (IST) to US Eastern Time, Pacific Time, GMT, UTC, CET, CST, and many other time zones. Select IST as the source zone and add the destination zones you need.",
  },
  {
    q: "How do I convert EST to IST?",
    a: "Enter the date and time with US Eastern Time as the source and IST as the target. The exact difference depends on whether the US is observing Eastern Standard Time or Eastern Daylight Time, so the converter uses the selected date to calculate the correct result.",
  },
  {
    q: "How do I convert PST to IST?",
    a: "Select US Pacific Time as the source and IST as the target. The converter automatically accounts for Pacific Standard Time or Pacific Daylight Time based on the selected date.",
  },
  {
    q: "How do I convert GMT to IST?",
    a: "GMT is 5 hours 30 minutes behind IST. When the UK observes British Summer Time, the difference changes to 4 hours 30 minutes. Select the actual date in the converter to get the correct result.",
  },
  {
    q: "How do I convert UTC to IST?",
    a: "IST is 5 hours 30 minutes ahead of UTC throughout the year. Select UTC as the source zone and IST as the target to see the converted local time.",
  },
  {
    q: "Does the timezone converter handle daylight saving time?",
    a: "Yes. The conversion uses the applicable UTC offset for the selected date and time rather than assuming a fixed year-round offset. This accounts for daylight saving time changes in zones such as the US, UK, Europe, and Australia.",
  },
  {
    q: "Can I search for a time zone by city or country?",
    a: "Yes. Search for a city or country to find matching time zones instead of manually browsing a long list of zones.",
  },
  {
    q: "How many time zones can I compare?",
    a: "You can compare up to 10 target time zones with the selected source time, making it useful for international teams, travel, events, and global communication.",
  },
  {
    q: "Can I copy the converted times?",
    a: "Yes. You can copy an individual conversion or copy the complete comparison as text for use in email, chat, documents, or other applications.",
  },
  {
    q: "Can I share a timezone conversion?",
    a: "Yes. You can create a shareable link containing the selected source zone, date, time, and target zones so another person can open the same comparison.",
  },
  {
    q: "Does it support 12-hour and 24-hour time?",
    a: "Yes. You can switch between 12-hour AM/PM and 24-hour time formats.",
  },
  {
    q: "Does the converter show the date difference?",
    a: "Yes. Each result indicates whether the converted time is on the same day, the previous day, or the next day relative to the source time.",
  },
  {
    q: "Is the timezone converter free?",
    a: "Yes. The timezone converter is free to use and works directly in your browser.",
  },
  {
    q: "Does my timezone conversion data leave my browser?",
    a: "No. The conversion calculations run locally in your browser.",
  },
];

const conversionPairFaqs: FaqItem[] = [
  {
    q: "What is the time difference between IST and EST?",
    a: "IST is 10 hours 30 minutes ahead of Eastern Standard Time (EST). When the US observes Eastern Daylight Time (EDT), IST is 9 hours 30 minutes ahead. The exact difference depends on the date.",
  },
  {
    q: "What is the time difference between IST and PST?",
    a: "IST is 13 hours 30 minutes ahead of Pacific Standard Time (PST). During Pacific Daylight Time (PDT), IST is 12 hours 30 minutes ahead. Use the selected date for the exact conversion.",
  },
  {
    q: "What is the time difference between IST and CST?",
    a: "IST is 11 hours 30 minutes ahead of US Central Standard Time (CST). During Central Daylight Time (CDT), IST is 10 hours 30 minutes ahead.",
  },
  {
    q: "What is the time difference between IST and GMT?",
    a: "IST is 5 hours 30 minutes ahead of GMT. When the UK observes British Summer Time (BST), the difference is 4 hours 30 minutes.",
  },
  {
    q: "What is the time difference between IST and CET?",
    a: "IST is 4 hours 30 minutes ahead of Central European Time (CET). During Central European Summer Time (CEST), IST is 3 hours 30 minutes ahead.",
  },
  {
    q: "What is the time difference between IST and Singapore time?",
    a: "Singapore Standard Time (SGT) is 2 hours 30 minutes ahead of IST. Neither India nor Singapore observes daylight saving time, so this difference remains constant.",
  },
  {
    q: "What is the time difference between IST and Japan time?",
    a: "Japan Standard Time (JST) is 3 hours 30 minutes ahead of IST. Neither India nor Japan observes daylight saving time.",
  },
  {
    q: "What is the time difference between IST and Dubai?",
    a: "Gulf Standard Time (GST) in Dubai is 1 hour 30 minutes behind IST. Neither India nor the UAE observes daylight saving time, so this difference remains constant.",
  },
  {
    q: "What is the time difference between IST and Sydney?",
    a: "Sydney uses Australian Eastern Standard Time (AEST) or Australian Eastern Daylight Time (AEDT), depending on the date. Sydney is normally 4 hours 30 minutes or 5 hours 30 minutes ahead of IST.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Select the source time zone",
    desc: "Choose the time zone your original date and time belongs to. Your browser's time zone can be detected automatically.",
    icon: "🕒",
  },
  {
    title: "Enter the date and time",
    desc: "Enter the exact date and time you want to convert.",
    icon: "📅",
  },
  {
    title: "Add target time zones",
    desc: "Search by city or country, or use the quick-add options to compare multiple destinations.",
    icon: "🌍",
  },
  {
    title: "Compare local times",
    desc: "View the corresponding local time, UTC offset, abbreviation, and day difference for every selected zone.",
    icon: "🔄",
  },
  {
    title: "Copy or share the result",
    desc: "Copy the conversion or share the exact comparison using a generated link.",
    icon: "🔗",
  },
];

const supportedUseCases = [
  {
    useCase: "International calls",
    note: "Check the local time for another country before making a call.",
  },
  {
    useCase: "Travel planning",
    note: "Convert departure, arrival, and connection times between local time zones.",
  },
  {
    useCase: "Remote work",
    note: "Check a teammate's local time before sending a message or scheduling a call.",
  },
  {
    useCase: "Global events",
    note: "Convert one event time into several regions before publishing the schedule.",
  },
  {
    useCase: "International deadlines",
    note: "Verify a deadline or submission time in the correct local time zone.",
  },
  {
    useCase: "Personal communication",
    note: "Find a convenient local time for friends and family in other countries.",
  },
];

const popularPairs = [
  { from: "IST", to: "UTC" },
  { from: "IST", to: "EST" },
  { from: "IST", to: "PST" },
  { from: "IST", to: "CST" },
  { from: "IST", to: "GMT" },
  { from: "IST", to: "CET" },
  { from: "IST", to: "SGT" },
  { from: "IST", to: "JST" },
  { from: "IST", to: "GST" },
  { from: "IST", to: "AEST" },
  { from: "UTC", to: "IST" },
  { from: "EST", to: "IST" },
];

const dstFacts: DstFact[] = [
  {
    title: "Why time zone differences change",
    desc: "Some regions move their clocks forward or backward during the year. When only one of two zones changes its clock, the time difference between them can change by one hour.",
  },
  {
    title: "India does not observe daylight saving time",
    desc: "India Standard Time (IST) remains UTC+5:30 throughout the year. This makes IST a useful reference when comparing India with regions such as the US, UK, Europe, and Australia.",
  },
  {
    title: "Different countries use different DST schedules",
    desc: "The US, Europe, and Australia do not all change their clocks on the same dates. The converter uses the selected date so the result reflects the applicable offset for each zone.",
  },
  {
    title: "DST can create missing or repeated times",
    desc: "When clocks move forward, some local times do not occur. When clocks move backward, some local times occur twice. The converter can flag invalid or ambiguous source times instead of silently treating them as ordinary times.",
  },
];

const tips = [
  "Always select the correct source time zone before converting.",
  "Choose the actual date when converting between regions that observe daylight saving time.",
  "Check the day-difference indicator when converting late-night or early-morning times.",
  "Use city-based search when you are unsure which IANA time zone represents a location.",
  "Use 24-hour time when sharing international schedules to reduce AM/PM confusion.",
  "For an exact meeting slot that must fit everyone's working hours, use the Meeting Time Finder instead of a basic conversion.",
];

const relatedTools = [
  {
    name: "Meeting Time Finder",
    href: meetingTimeFinderPath,
  },
  {
    name: "Unit Converter",
    href: "/tools/converter",
  },
  {
    name: "Calculator",
    href: "/tools/calculator",
  },
  {
    name: "EMI Calculator",
    href: "/tools/calculator/emi-calculator",
  },
  {
    name: "ROI Calculator",
    href: "/tools/calculator/roi-calculator",
  },
  {
    name: "PDF Tools",
    href: "/tools/pdf",
  },
  {
    name: "Image Tools",
    href: "/tools/image",
  },
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
  name: "How to Convert Time Between Time Zones",
  description:
    "Convert a date and time from one time zone into multiple other time zones.",
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Tools",
      item: `${siteUrl}/tools`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Date & Time Tools",
      item: `${siteUrl}/tools/datetime`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Timezone Converter",
      item: canonicalUrl,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Related Atoolix Tools",
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
      <h2
        id={id}
        className="text-xl font-bold tracking-tight sm:text-2xl"
      >
        {title}
      </h2>

      {description ? (
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          {description}
        </p>
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
          Free Online Time Zone Converter
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Time Zone Converter – Convert Time Between Time Zones
        </h2>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Convert a date and time from one time zone to another instantly.
          Select a source time, add up to 10 target time zones, and compare
          local times, UTC offsets, abbreviations, and day differences in one
          view. Convert between IST, UTC, GMT, EST, PST, CST, CET, and other
          time zones while automatically accounting for daylight saving time.
          The conversion runs in your browser, so there is no need to upload
          your data.
        </p>
      </section>

      <section aria-labelledby="use-cases-heading" className="space-y-4">
        <SectionHeading
          id="use-cases-heading"
          title="What Can You Use a Time Zone Converter For?"
          description="Convert a single date and time whenever you need to know the corresponding local time somewhere else."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {supportedUseCases.map((item) => (
            <article
              key={item.useCase}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.useCase}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="pairs-heading" className="space-y-4">
        <SectionHeading
          id="pairs-heading"
          title="Popular Time Zone Conversions"
          description="Common conversions people use when comparing international times."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularPairs.map((pair) => (
            <div
              key={`${pair.from}-${pair.to}`}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              <span className="font-medium">
                {pair.from} to {pair.to}
              </span>

              <p className="mt-1 text-xs text-white/50">
                Convert {pair.from} time to {pair.to} time
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-heading" className="space-y-4">
        <SectionHeading
          id="how-heading"
          title="How to Use the Time Zone Converter"
          description="Convert time between time zones in a few simple steps."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">
                  {step.icon}
                </span>

                <span className="text-xs font-semibold text-white/50">
                  Step {index + 1}
                </span>
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {step.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="dst-heading" className="space-y-4">
        <SectionHeading
          id="dst-heading"
          title="Time Zone Converter and Daylight Saving Time"
          description="The correct time difference can change during the year when one of the selected time zones observes daylight saving time."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {dstFacts.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="conversion-guide-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="conversion-guide-heading"
          title="Common IST Time Zone Conversions"
          description="India Standard Time (IST) is fixed at UTC+5:30. Differences with regions that observe daylight saving time depend on the selected date."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {conversionPairFaqs.slice(0, 6).map((item) => (
            <article
              key={item.q}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.q}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="tips-heading" className="space-y-4">
        <SectionHeading
          id="tips-heading"
          title="Time Zone Conversion Tips"
          description="Avoid common mistakes when converting times internationally."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="pair-faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="pair-faq-heading"
          title="Time Zone Conversion Questions"
          description="Common questions about converting IST and other international time zones."
        />

        <div className="space-y-3">
          {conversionPairFaqs.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-4 py-3">
                <p className="text-sm leading-6 text-white/70">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about converting times between time zones."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-4 py-3">
                <p className="text-sm leading-6 text-white/70">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="meeting-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="meeting-heading"
          title="Need to Find a Meeting Time?"
          description="The Timezone Converter is best for converting one time between locations. If you need to find a meeting slot that fits several people's working hours, use the Meeting Time Finder."
        />

        <div className="flex flex-wrap gap-2.5">
          <a
            href={meetingTimeFinderPath}
            className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/20"
          >
            Meeting Time Finder
          </a>
        </div>
      </section>

      <section
        aria-labelledby="related-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="related-heading"
          title="More Free Online Tools"
          description="Explore other Atoolix tools for everyday conversions, calculations, files, and productivity."
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