import { serverConfig } from "@/config/server";
import RelatedTools from "@/app/tools/[...toolId]/Relatedtools";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";

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

type FeatureItem = {
  title: string;
  desc: string;
  icon: string;
};

const faqItems: FaqItem[] = [
  {
    q: "What is a time zone converter?",
    a: "A time zone converter converts a date and time from one time zone into the corresponding local time in other time zones. Atoolix lets you compare multiple locations at once and shows local time, UTC offset, abbreviation, and day difference.",
  },
  {
    q: "How do I convert time between time zones?",
    a: "Select the source time zone, enter the date and time, then search for and add the locations you want to compare. The converter calculates the corresponding local time for each selected location.",
  },
  {
    q: "Can I search for a time zone by city or country?",
    a: "Yes. You can search by city, country, time zone name, or supported time zone abbreviation. This means you do not need to know the IANA time zone identifier to find a location.",
  },
  {
    q: "How many time zones can I compare?",
    a: "You can compare up to 10 target time zones with the selected source time. This makes the converter useful for international teams, travel, events, calls, and global communication.",
  },
  {
    q: "Does the time zone converter handle daylight saving time?",
    a: "Yes. The converter uses the applicable time zone offset for the selected date and time. This means regions that observe daylight saving time can automatically show a different offset during the year.",
  },
  {
    q: "Does it support 12-hour and 24-hour time?",
    a: "Yes. You can switch between 12-hour AM/PM and 24-hour time formats when viewing your conversions.",
  },
  {
    q: "Can I copy or share a time zone conversion?",
    a: "Yes. You can copy converted times and create a shareable link containing the selected date, source time zone, target locations, and display settings.",
  },
  {
    q: "Does the converter show the date difference?",
    a: "Yes. The results indicate whether a converted time falls on the same day, the previous day, or the next day compared with the source time.",
  },
  {
    q: "Is the time zone converter free?",
    a: "Yes. The Atoolix time zone converter is free to use directly in your browser.",
  },
];

const conversionPairFaqs: FaqItem[] = [
  {
    q: "What is the time difference between IST and US Eastern Time?",
    a: "India Standard Time is 10 hours 30 minutes ahead of US Eastern Standard Time and 9 hours 30 minutes ahead when Eastern Daylight Time is in effect. The exact difference depends on the selected date.",
  },
  {
    q: "What is the time difference between IST and US Pacific Time?",
    a: "India Standard Time is 13 hours 30 minutes ahead of US Pacific Standard Time and 12 hours 30 minutes ahead when Pacific Daylight Time is in effect. The exact difference depends on the selected date.",
  },
  {
    q: "What is the time difference between IST and US Central Time?",
    a: "India Standard Time is 11 hours 30 minutes ahead of US Central Standard Time and 10 hours 30 minutes ahead when Central Daylight Time is in effect.",
  },
  {
    q: "What is the time difference between IST and UK time?",
    a: "India Standard Time is 5 hours 30 minutes ahead of GMT and 4 hours 30 minutes ahead when the UK observes British Summer Time.",
  },
  {
    q: "What is the time difference between IST and Central European Time?",
    a: "India Standard Time is 4 hours 30 minutes ahead of Central European Time and 3 hours 30 minutes ahead when Central European Summer Time is in effect.",
  },
  {
    q: "What is the time difference between IST and Singapore?",
    a: "Singapore Standard Time is 2 hours 30 minutes ahead of India Standard Time. Neither India nor Singapore observes daylight saving time, so the difference remains constant.",
  },
  {
    q: "What is the time difference between IST and Japan?",
    a: "Japan Standard Time is 3 hours 30 minutes ahead of India Standard Time. Neither India nor Japan observes daylight saving time.",
  },
  {
    q: "What is the time difference between IST and Dubai?",
    a: "Dubai uses Gulf Standard Time, which is 1 hour 30 minutes behind India Standard Time. Neither India nor the UAE observes daylight saving time.",
  },
  {
    q: "What is the time difference between IST and Sydney?",
    a: "Sydney uses Australian Eastern Standard Time or Australian Eastern Daylight Time depending on the date. Sydney is generally 4 hours 30 minutes or 5 hours 30 minutes ahead of IST.",
  },
];

const featureItems: FeatureItem[] = [
  {
    title: "Compare Multiple Time Zones",
    desc: "Compare one source time with up to 10 target locations in a single view.",
    icon: "🌍",
  },
  {
    title: "Search by City or Country",
    desc: "Find locations using a city, country, time zone name, or supported abbreviation.",
    icon: "🔎",
  },
  {
    title: "Date-Aware Conversion",
    desc: "Select the exact date and time so the converter can use the applicable offset for that date.",
    icon: "📅",
  },
  {
    title: "Automatic DST Handling",
    desc: "Daylight saving changes are taken into account for locations that change their clocks during the year.",
    icon: "🔄",
  },
  {
    title: "12-Hour and 24-Hour Time",
    desc: "Switch between AM/PM and 24-hour formats depending on how you prefer to read the result.",
    icon: "🕐",
  },
  {
    title: "Day Difference",
    desc: "See when a converted time falls on the previous, same, or next calendar day.",
    icon: "📆",
  },
  {
    title: "Copy Results",
    desc: "Copy individual conversions or the complete comparison for use in messages, documents, or emails.",
    icon: "📋",
  },
  {
    title: "Shareable Comparisons",
    desc: "Create a link that preserves the selected source time, date, target zones, and display settings.",
    icon: "🔗",
  },
  {
    title: "Browser-Based Conversion",
    desc: "Time zone conversion is performed in your browser without requiring you to upload scheduling data.",
    icon: "💻",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Select the source time zone",
    desc: "Choose the time zone that your original date and time belongs to.",
    icon: "🕒",
  },
  {
    title: "Enter the date and time",
    desc: "Select the exact date and enter the time you want to convert.",
    icon: "📅",
  },
  {
    title: "Search and add locations",
    desc: "Search by city, country, or time zone and add the locations you want to compare.",
    icon: "🌍",
  },
  {
    title: "Compare the results",
    desc: "View local time, UTC offset, abbreviation, and day difference for each location.",
    icon: "🔄",
  },
  {
    title: "Copy or share",
    desc: "Copy the results or create a share link containing the complete comparison.",
    icon: "🔗",
  },
];

const supportedUseCases = [
  {
    useCase: "International calls",
    note: "Check the local time in another country before making a call or sending a message.",
  },
  {
    useCase: "Remote work",
    note: "See your teammates' local times before scheduling meetings or sending time-sensitive messages.",
  },
  {
    useCase: "Travel planning",
    note: "Convert departure, arrival, connection, and activity times between different locations.",
  },
  {
    useCase: "Global events",
    note: "Convert one event time into several regions before publishing an international schedule.",
  },
  {
    useCase: "International deadlines",
    note: "Check how a deadline or submission time appears in another time zone.",
  },
  {
    useCase: "Personal communication",
    note: "Find a convenient local time for friends and family in different countries.",
  },
];

const popularPairs = [
  { from: "IST", to: "UTC" },
  { from: "IST", to: "US Eastern Time" },
  { from: "IST", to: "US Pacific Time" },
  { from: "IST", to: "US Central Time" },
  { from: "IST", to: "UK Time" },
  { from: "IST", to: "Central European Time" },
  { from: "IST", to: "Singapore Time" },
  { from: "IST", to: "Japan Time" },
  { from: "IST", to: "Dubai Time" },
  { from: "IST", to: "Sydney Time" },
  { from: "UTC", to: "IST" },
  { from: "US Eastern Time", to: "IST" },
];

const dstFacts = [
  {
    title: "Time differences can change during the year",
    desc: "When one location observes daylight saving time and another does not, the difference between the two locations can change by one hour.",
  },
  {
    title: "India remains on UTC+5:30",
    desc: "India Standard Time does not observe daylight saving time and remains UTC+5:30 throughout the year.",
  },
  {
    title: "DST schedules differ by region",
    desc: "The United States, Europe, Australia, and other regions can change their clocks on different dates. Selecting the actual date helps produce the correct conversion.",
  },
  {
    title: "Some local times can be ambiguous",
    desc: "Clock changes can create local times that either do not occur or occur twice. Date-aware time zone calculations help handle these transitions correctly.",
  },
];

const tips = [
  "Select the actual source time zone rather than relying only on an abbreviation such as EST or CST.",
  "Choose the exact date when converting between regions that observe daylight saving time.",
  "Check the day-difference indicator when converting late-night or early-morning times.",
  "Search for a city or country if you are unsure which time zone to select.",
  "Use 24-hour time when sharing international schedules where AM/PM could cause confusion.",
  "If you need to find a time that fits everyone's working hours, use the Meeting Time Finder instead of a basic conversion.",
];

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
      name: "Time Zone Converter",
      item: canonicalUrl,
    },
  ],
};

export default function TimezoneConverterSeoContent() {
  return (
    <div className="mx-auto space-y-8 px-3 py-5 text-white sm:px-4 sm:py-6 lg:px-5 lg:py-8">
      <JsonLd data={breadcrumbJsonLd} />

      {/* INTRO */}
      <section
        aria-labelledby="intro-heading"
        className="space-y-3"
      >
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Online Time Zone Converter
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Time Zone Converter – Convert Time Between Time Zones
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Convert a date and time between multiple time zones in one view.
          Choose a source time, search for locations by city or country, and
          compare up to 10 time zones with their local time, UTC offset,
          abbreviation, and day difference.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/65 sm:text-[0.95rem]">
          Atoolix uses the selected date when calculating time zone offsets,
          including daylight saving time changes. You can switch between
          12-hour and 24-hour time, copy results, and share the complete
          conversion setup with a link.
        </p>
      </section>

      {/* FEATURES */}
      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="features-heading"
          title="What This Time Zone Converter Does"
          description="Everything you need to convert and compare times across international locations."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div
                className="text-lg"
                aria-hidden="true"
              >
                {item.icon}
              </div>

              <h3 className="mt-2 text-sm font-semibold sm:text-[0.95rem]">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* SEARCH */}
      <section
        aria-labelledby="search-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="search-heading"
          title="Search Time Zones by City, Country, or Time Zone"
          description="You do not need to know the technical time zone identifier to find a location."
        />

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm leading-7 text-white/75">
            Search for locations such as <strong>New York</strong>,{" "}
            <strong>London</strong>, <strong>Mumbai</strong>,{" "}
            <strong>Tokyo</strong>, <strong>Singapore</strong>,{" "}
            <strong>Dubai</strong>, or <strong>Sydney</strong>. You can also
            search using a country, time zone name, or supported abbreviation.
          </p>

          <p className="mt-3 text-sm leading-7 text-white/65">
            This makes the converter useful even when you know the destination
            but do not know its IANA time zone identifier.
          </p>
        </div>
      </section>

      {/* MULTI ZONE */}
      <section
        aria-labelledby="compare-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="compare-heading"
          title="Compare Up to 10 Time Zones at Once"
          description="Convert one source time into several local times without opening separate converters."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "India Standard Time",
            "US Eastern Time",
            "US Pacific Time",
            "UK Time",
            "Singapore Time",
            "Japan Time",
            "Dubai Time",
            "Sydney Time",
            "Central European Time",
          ].map((zone) => (
            <div
              key={zone}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/75"
            >
              {zone}
            </div>
          ))}
        </div>

        <p className="text-sm leading-7 text-white/65">
          The comparison can show the local date and time, UTC offset, time
          zone abbreviation, and whether the result falls on the previous,
          same, or next day.
        </p>
      </section>

      {/* HOW TO */}
      <section
        aria-labelledby="how-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="how-heading"
          title="How to Use the Time Zone Converter"
          description="Convert time between locations in a few simple steps."
        />

        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-lg"
                  aria-hidden="true"
                >
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
            </li>
          ))}
        </ol>
      </section>

      {/* 12/24 */}
      <section
        aria-labelledby="format-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="format-heading"
          title="Use 12-Hour or 24-Hour Time"
          description="Choose the display format that is easiest for you and the people you are sharing the conversion with."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              12-hour format
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              View times using AM and PM, such as 9:30 AM or 6:00 PM.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              24-hour format
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              View times using a 24-hour clock, such as 09:30 or 18:00,
              which can reduce AM/PM confusion in international schedules.
            </p>
          </article>
        </div>
      </section>

      {/* DST */}
      <section
        aria-labelledby="dst-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="dst-heading"
          title="Time Zone Conversion and Daylight Saving Time"
          description="The exact difference between two locations can change depending on the date."
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

      {/* EXAMPLE */}
      <section
        aria-labelledby="example-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="example-heading"
          title="Example: Compare One Time Across Multiple Locations"
          description="A single source time can be converted into several local times at once."
        />

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Source", "India Standard Time"],
              ["Location 1", "New York"],
              ["Location 2", "London"],
              ["Location 3", "Singapore"],
              ["Location 4", "Tokyo"],
              ["Location 5", "Dubai"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-black/10 p-3"
              >
                <div className="text-xs text-white/45">
                  {label}
                </div>

                <div className="mt-1 text-sm font-medium">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm leading-7 text-white/65">
            Select the actual date and time in the converter to calculate the
            corresponding local time for every selected location. The result
            automatically reflects applicable daylight saving rules.
          </p>
        </div>
      </section>

      {/* POPULAR CONVERSIONS */}
      <section
        aria-labelledby="pairs-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="pairs-heading"
          title="Popular Time Zone Conversions"
          description="Common conversions people use for international communication, travel, and scheduling."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularPairs.map((pair) => (
            <div
              key={`${pair.from}-${pair.to}`}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              <span className="font-semibold text-white">
                {pair.from}
              </span>

              <span className="px-2 text-white/40">
                →
              </span>

              <span className="text-white/75">
                {pair.to}
              </span>

              <p className="mt-1 text-xs text-white/45">
                Convert {pair.from} time to {pair.to} time
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMON IST */}
      <section
        aria-labelledby="conversion-guide-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="conversion-guide-heading"
          title="Common IST Time Zone Conversions"
          description="India Standard Time is UTC+5:30 throughout the year. The difference with regions that observe daylight saving time depends on the selected date."
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

      {/* USE CASES */}
      <section
        aria-labelledby="use-cases-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="use-cases-heading"
          title="What Can You Use a Time Zone Converter For?"
          description="Useful whenever the same date and time needs to be understood in another location."
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

      {/* SHARE */}
      <section
        aria-labelledby="share-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="share-heading"
          title="Copy and Share Time Zone Conversions"
          description="Keep the entire conversion setup available when you need to send it to someone else."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Copy the result
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Copy an individual converted time or the comparison for use in
              email, chat, documents, or scheduling messages.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Share the complete comparison
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Create a share link that preserves the selected source time,
              date, target locations, and display format.
            </p>
          </article>
        </div>
      </section>

      {/* TIPS */}
      <section
        aria-labelledby="tips-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="tips-heading"
          title="Time Zone Conversion Tips"
          description="A few simple checks can prevent common international scheduling mistakes."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/75"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Common questions about converting time between time zones."
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

      {/* MEETING FINDER */}
      <section
        aria-labelledby="meeting-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="meeting-heading"
          title="Need to Find a Meeting Time?"
          description="The Time Zone Converter is ideal when you already have a time and need to convert it. If you need to find a time that fits several people's working hours, use the Meeting Time Finder."
        />

        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
          <h3 className="text-sm font-semibold text-cyan-200">
            Find a time that works for everyone
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-white/70">
            Set working hours for each location, choose a meeting duration,
            and find upcoming overlapping slots across multiple time zones.
          </p>

          <a
            href={meetingTimeFinderPath}
            className="mt-3 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/20"
          >
            Open Meeting Time Finder
          </a>
        </div>
      </section>

      {/* RELATED */}
      <RelatedTools toolId="datetime/timezone-converter" />
    </div>
  );
}