import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl;

const canonicalPath = "/tools/datetime/meeting-time-finder";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

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
    q: "What is a meeting time finder?",
    a: "A meeting time finder compares working hours across multiple time zones and identifies the times when everyone is available. It removes the need to manually convert each participant's local time.",
  },
  {
    q: "How do I find a meeting time across time zones?",
    a: "Add each participant's time zone, choose their working days and hours, and run the meeting finder. The tool checks upcoming dates and identifies time slots that overlap across the selected zones.",
  },
  {
    q: "Can I find a meeting time between India, the US, and the UK?",
    a: "Yes. Add India Standard Time together with the relevant US and UK time zones, set working hours for each location, and the finder identifies overlapping availability while accounting for daylight saving changes.",
  },
  {
    q: "Does the meeting time finder handle daylight saving time?",
    a: "Yes. Time zone offsets are calculated for the selected date and time, so daylight saving changes are taken into account when checking conversions and working-hour overlap. DST transition times that are invalid or ambiguous can also be flagged.",
  },
  {
    q: "Can I search for a time zone by city or country?",
    a: "Yes. Search for a city, country, IANA time zone name, or supported common abbreviation to find the time zone you need.",
  },
  {
    q: "How many time zones can I compare?",
    a: "You can compare up to 10 target time zones alongside the source zone in a single comparison.",
  },
  {
    q: "Can I find the next available meeting slots?",
    a: "Yes. After setting the working days and hours for each time zone, the finder can scan upcoming dates and show slots where all selected zones overlap.",
  },
  {
    q: "Can I export a meeting time comparison?",
    a: "Yes. You can export the time zone comparison as CSV and generate an ICS calendar invite for a selected meeting time.",
  },
  {
    q: "Can I share a meeting time comparison?",
    a: "Yes. A share link can preserve the selected source zone, date, time, target zones, and display format so another person can open the same comparison.",
  },
  {
    q: "Does it support 12-hour and 24-hour time?",
    a: "Yes. You can switch between 12-hour AM/PM and 24-hour time formats.",
  },
  {
    q: "Is the meeting time finder free?",
    a: "Yes. The meeting time finder is available as a free browser-based tool.",
  },
  {
    q: "Does my time zone data leave my browser?",
    a: "The conversion, working-hours calculations, and export generation are performed locally in the browser, so the tool does not need to upload your scheduling data to a server.",
  },
];

const timezonePairFaqs: FaqItem[] = [
  {
    q: "What is the time difference between IST and US Eastern Time?",
    a: "India Standard Time is 10 hours 30 minutes ahead of US Eastern Standard Time and 9 hours 30 minutes ahead when Eastern Daylight Time is in effect. The exact difference depends on the date because the US observes daylight saving time while India does not.",
  },
  {
    q: "What is the time difference between IST and US Central Time?",
    a: "India Standard Time is 11 hours 30 minutes ahead of US Central Standard Time and 10 hours 30 minutes ahead when Central Daylight Time is in effect. The exact difference depends on the selected date.",
  },
  {
    q: "What is the time difference between IST and US Pacific Time?",
    a: "India Standard Time is 13 hours 30 minutes ahead of US Pacific Standard Time and 12 hours 30 minutes ahead when Pacific Daylight Time is in effect. The exact difference depends on the date.",
  },
  {
    q: "What is the time difference between IST and UK time?",
    a: "India Standard Time is 5 hours 30 minutes ahead of GMT and 4 hours 30 minutes ahead of British Summer Time. The exact difference depends on whether the UK is observing daylight saving time on the selected date.",
  },
  {
    q: "What is the time difference between IST and Central European Time?",
    a: "India Standard Time is 4 hours 30 minutes ahead of Central European Time and 3 hours 30 minutes ahead when Central European Summer Time is in effect. The exact difference depends on the date.",
  },
  {
    q: "What is the time difference between IST and Singapore time?",
    a: "Singapore Standard Time is 2 hours 30 minutes ahead of India Standard Time. Neither India nor Singapore observes daylight saving time, so this difference remains constant throughout the year.",
  },
  {
    q: "What is the time difference between IST and Sydney time?",
    a: "Sydney is normally 4 hours 30 minutes ahead of India Standard Time during Australian Eastern Standard Time and 5 hours 30 minutes ahead during Australian Eastern Daylight Time. The exact difference depends on the date.",
  },
  {
    q: "What is the time difference between IST and Japan time?",
    a: "Japan Standard Time is 3 hours 30 minutes ahead of India Standard Time. Neither India nor Japan observes daylight saving time, so the difference remains constant throughout the year.",
  },
  {
    q: "What is the time difference between IST and Dubai time?",
    a: "Dubai uses Gulf Standard Time, which is 1 hour 30 minutes behind India Standard Time. Neither location observes daylight saving time, so the difference remains constant throughout the year.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Set your source time",
    desc: "Choose the source time zone and enter the date and time you want to use for the comparison.",
    icon: "🕒",
  },
  {
    title: "Add participant time zones",
    desc: "Search by city, country, or time zone name and add the locations involved in the meeting.",
    icon: "🌍",
  },
  {
    title: "Set working hours",
    desc: "Define working days, start times, and end times for each participant or location.",
    icon: "🗓️",
  },
  {
    title: "Find overlapping availability",
    desc: "Run the finder to identify upcoming time slots where all selected locations are within their working hours.",
    icon: "✅",
  },
  {
    title: "Export or share",
    desc: "Choose a suitable slot and export the comparison or create an ICS calendar invite.",
    icon: "📤",
  },
];

const featureItems: FeatureItem[] = [
  {
    title: "Meeting Time Finder",
    desc: "Set working days and hours for each time zone and find upcoming slots where everyone is available.",
    icon: "🔎",
  },
  {
    title: "Multi-Time-Zone Conversion",
    desc: "Compare one date and time across multiple locations with local time, offset, abbreviation, and day difference.",
    icon: "🌐",
  },
  {
    title: "DST-Aware Calculations",
    desc: "Calculate time zone offsets for the selected date and time so daylight saving changes are handled correctly.",
    icon: "🔁",
  },
  {
    title: "Meeting Templates",
    desc: "Use predefined meeting templates to quickly prepare common scheduling scenarios.",
    icon: "📋",
  },
  {
    title: "Smart Time Zone Search",
    desc: "Find locations using city, country, IANA time zone names, or supported abbreviations.",
    icon: "🔤",
  },
  {
    title: "Zone Reordering",
    desc: "Reorder comparison rows or promote another location to become the source time zone.",
    icon: "↕️",
  },
  {
    title: "CSV Export",
    desc: "Export local date, time, weekday, offset, source difference, and working-hours status for the selected zones.",
    icon: "📊",
  },
  {
    title: "ICS Calendar Export",
    desc: "Create a calendar invite based on the selected instant so calendar applications can display it in the recipient's local time.",
    icon: "📅",
  },
  {
    title: "Shareable Comparisons",
    desc: "Create a share link containing the selected comparison settings so others can view the same meeting-time setup.",
    icon: "🔗",
  },
];

const supportedUseCases = [
  {
    useCase: "Global team meetings",
    note: "Find overlapping working hours for distributed teams instead of manually checking every participant's local time.",
  },
  {
    useCase: "International meeting scheduling",
    note: "Compare several locations before proposing a meeting time to clients, partners, or remote teams.",
  },
  {
    useCase: "Interview scheduling",
    note: "Find a suitable interview time across the candidate's and interviewer's time zones.",
  },
  {
    useCase: "Client and board meetings",
    note: "Coordinate meetings across regions and export the selected time as a calendar invite.",
  },
  {
    useCase: "Remote work coordination",
    note: "Identify shared working hours for teams operating across different countries.",
  },
  {
    useCase: "Webinars and product launches",
    note: "Check how a planned event time appears across the regions where your audience is located.",
  },
  {
    useCase: "Travel planning",
    note: "Compare local times across destinations when planning calls, briefings, or activities around travel.",
  },
];

const popularPairs = [
  { from: "IST", to: "US Eastern Time" },
  { from: "IST", to: "US Central Time" },
  { from: "IST", to: "US Pacific Time" },
  { from: "IST", to: "UK Time" },
  { from: "IST", to: "Central European Time" },
  { from: "IST", to: "Singapore Time" },
  { from: "IST", to: "Sydney Time" },
  { from: "IST", to: "Japan Time" },
  { from: "IST", to: "Dubai Time" },
];

const meetingExamples = [
  {
    title: "India, US and UK meeting",
    desc: "Add the relevant locations for India, the United States, and the United Kingdom, define working hours, and let the finder identify dates and times where the selected locations overlap.",
  },
  {
    title: "International team meeting",
    desc: "Add several team locations, set each region's working schedule, and use the next-available-slots feature to avoid manually comparing local clocks.",
  },
  {
    title: "Time zone meeting scheduler",
    desc: "Use the meeting finder when a meeting involves multiple countries and you need one practical time that works across the selected working schedules.",
  },
];

const tips = [
  "Set working days and hours before searching for available meeting slots.",
  "Use the actual location or IANA time zone rather than relying only on ambiguous abbreviations such as EST or CST.",
  "Check the selected date because daylight saving rules can change the offset between regions.",
  "Review the day-difference indicator when a meeting crosses midnight in another location.",
  "Use 24-hour time when coordinating with international teams if AM/PM could cause confusion.",
  "Export an ICS invite after choosing a final slot instead of manually entering converted times into calendars.",
];

const relatedTools = [
  { name: "Unit Converter", href: "/tools/converter" },
  { name: "Calculator", href: "/tools/calculator" },
  { name: "EMI Calculator", href: "/tools/calculator/emi-calculator" },
  { name: "ROI Calculator", href: "/tools/calculator/roi-calculator" },
  { name: "PDF Tools", href: "/pdf" },
  { name: "Image Tools", href: "/image" },
  { name: "Finance Tools", href: "/finance" },
];

/*
 * FAQ and HowTo structured data are intentionally not generated here.
 *
 * The visible FAQ and step-by-step content remain valuable for users and
 * search intent, but Google removed FAQ rich results for normal sites in
 * 2026 and deprecated HowTo rich results. Keeping large amounts of obsolete
 * structured data would add maintenance without providing the intended
 * Google Search enhancement.
 */

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
      name: "Meeting Time Finder",
      item: canonicalUrl,
    },
  ],
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

export default function MeetingTimeFinderSeoContent() {
  return (
    <div className="mx-auto space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={breadcrumbJsonLd} />

      <section
        aria-labelledby="intro-heading"
        className="space-y-3"
      >
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Browser-Based Meeting Time Finder
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Find the Best Meeting Time Across Time Zones
        </h2>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Find a meeting time that works across multiple time zones without
          manually converting every participant's local time. Add locations,
          define working hours, and find upcoming overlapping slots for
          international meetings, remote teams, interviews, client calls,
          and other cross-time-zone schedules.
        </p>

        <p className="text-sm leading-7 text-white/65 sm:text-[0.95rem]">
          The meeting time finder supports multiple time zones, date-aware
          daylight saving calculations, working-hours matching, shareable
          comparisons, CSV export, and ICS calendar invites.
        </p>
      </section>

      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="features-heading"
          title="What This Meeting Time Finder Does"
          description="Compare local times and find practical meeting slots instead of checking each time zone manually."
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

      <section
        aria-labelledby="how-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="how-heading"
          title="How to Find a Meeting Time Across Time Zones"
          description="Set the participants' locations and schedules, then find a time that works for everyone."
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

      <section
        aria-labelledby="examples-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="examples-heading"
          title="Meeting Time Examples"
          description="Common scenarios where comparing working hours across time zones is useful."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {meetingExamples.map((item) => (
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
        aria-labelledby="use-cases-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="use-cases-heading"
          title="Common Meeting Scheduling Use Cases"
          description="Useful when a single meeting needs to work across different countries, regions, or working schedules."
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

      <section
        aria-labelledby="pairs-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="pairs-heading"
          title="Popular Time Zone Pairs for Meetings"
          description="Common comparisons for international meeting scheduling. The exact offset depends on the selected date when daylight saving time applies."
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
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="tips-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="tips-heading"
          title="Tips for Scheduling Across Time Zones"
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

      <section
        aria-labelledby="pair-faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="pair-faq-heading"
          title="IST Meeting Time Differences"
          description="Common IST comparisons for international meetings. Use the finder for the exact local time on a particular date."
        />

        <div className="space-y-3">
          {timezonePairFaqs.map((item) => (
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
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about finding meeting times across time zones."
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
        aria-labelledby="cta-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="cta-heading"
          title="Find a Meeting Time That Works for Everyone"
          description="Compare time zones, match working hours, find overlapping availability, and export the selected meeting time as a calendar invite. Use the related Atoolix tools below when you need additional calculations or utilities."
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