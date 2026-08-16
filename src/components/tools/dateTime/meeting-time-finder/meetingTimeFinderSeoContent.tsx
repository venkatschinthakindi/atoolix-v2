import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl;

const canonicalPath = "/tools/datetime/meeting-time-finder";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

const timezoneConverterPath = "/tools/datetime/timezone-converter";

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
    a: "A meeting time finder checks multiple time zones and working schedules to find meeting slots that are available for everyone. Instead of manually converting each participant's local time, the finder checks upcoming dates for overlapping availability.",
  },
  {
    q: "How do I find a meeting time across time zones?",
    a: "Add the locations involved in the meeting, set the local working days and hours for each location, choose a meeting duration, and search for available slots. The finder checks the schedules and returns overlapping times that fit everyone.",
  },
  {
    q: "Can I find a meeting time between India, the US, and the UK?",
    a: "Yes. Add the relevant locations for India, the United States, and the United Kingdom, set each location's working hours, choose the meeting duration, and find upcoming slots where all selected locations are available.",
  },
  {
    q: "Can I set different working hours for each time zone?",
    a: "Yes. Each location can have its own local work start and work end times. The finder uses those local schedules when calculating available meeting slots.",
  },
  {
    q: "Can I find the next available meeting slots?",
    a: "Yes. After setting the working schedules and meeting duration, the finder can scan upcoming dates and identify the next available slots where all selected locations overlap.",
  },
  {
    q: "Does the meeting finder handle daylight saving time?",
    a: "Yes. Time zone offsets are calculated for the relevant date, so daylight saving changes are taken into account when determining local times and overlapping working hours.",
  },
  {
    q: "How many time zones can I compare?",
    a: "The Meeting Time Finder supports multiple locations and uses the same multi-time-zone comparison functionality as the Time Zone Converter, allowing you to search and compare up to 10 target time zones.",
  },
  {
    q: "Can I search for time zones by city or country?",
    a: "Yes. Search for a city, country, time zone name, or supported abbreviation to add the locations involved in the meeting.",
  },
  {
    q: "Can I choose a meeting duration?",
    a: "Yes. You can use meeting templates with predefined durations or enter the duration required for your meeting. The finder uses the duration when checking whether a slot fits inside every location's working hours.",
  },
  {
    q: "Can I add a meeting title and description?",
    a: "Yes. You can add a meeting title and optional description before exporting the selected meeting.",
  },
  {
    q: "Can I export the meeting?",
    a: "Yes. You can export meeting information as CSV and download an .ics calendar file for the selected meeting slot.",
  },
  {
    q: "Can I share the complete meeting setup?",
    a: "Yes. A share link can preserve the meeting configuration, including locations, dates, time settings, working hours, meeting duration, and other selected options.",
  },
];

const featureItems: FeatureItem[] = [
  {
    title: "Search Multiple Time Zones",
    desc: "Search by city, country, time zone, or supported abbreviation and add the locations involved in the meeting.",
    icon: "🌍",
  },
  {
    title: "Compare Up to 10 Locations",
    desc: "Compare multiple participant locations in the same setup instead of converting each time separately.",
    icon: "🔢",
  },
  {
    title: "Local Working Hours",
    desc: "Set work starts and work ends independently for every location.",
    icon: "🕘",
  },
  {
    title: "Next Available Slots",
    desc: "Scan upcoming dates and find the next meeting slots that fit all selected working schedules.",
    icon: "🔎",
  },
  {
    title: "Overlapping Availability",
    desc: "Find the periods where every selected location is within its defined working hours.",
    icon: "✅",
  },
  {
    title: "DST-Aware Scheduling",
    desc: "Use date-specific time zone offsets so daylight saving changes are reflected in meeting calculations.",
    icon: "🔄",
  },
  {
    title: "Meeting Duration",
    desc: "Set the amount of time required for the meeting so short and long meetings are checked differently.",
    icon: "⏱️",
  },
  {
    title: "Meeting Templates",
    desc: "Start quickly with predefined meeting types such as sales calls, board reviews, client demos, and travel briefings.",
    icon: "📋",
  },
  {
    title: "Meeting Details",
    desc: "Add a meeting title and optional description before exporting the selected meeting.",
    icon: "📝",
  },
  {
    title: "CSV Export",
    desc: "Export the meeting comparison and local time information for further use or record keeping.",
    icon: "📊",
  },
  {
    title: "ICS Calendar Export",
    desc: "Download a calendar-compatible .ics event for the selected meeting time.",
    icon: "📅",
  },
  {
    title: "Complete Setup Sharing",
    desc: "Create a share link that preserves the meeting configuration so another person can open the same setup.",
    icon: "🔗",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Add the participant locations",
    desc: "Search by city, country, or time zone and add every location involved in the meeting.",
    icon: "🌍",
  },
  {
    title: "Set local working hours",
    desc: "Choose work starts and work ends for each location based on its local schedule.",
    icon: "🕘",
  },
  {
    title: "Choose the meeting duration",
    desc: "Use a meeting template or enter the number of minutes required for the meeting.",
    icon: "⏱️",
  },
  {
    title: "Find available slots",
    desc: "Search upcoming dates for periods where all selected locations have overlapping availability.",
    icon: "🔎",
  },
  {
    title: "Add meeting details",
    desc: "Enter a title and optional description for the selected meeting.",
    icon: "📝",
  },
  {
    title: "Share or export",
    desc: "Share the complete setup or export the meeting as CSV or an .ics calendar event.",
    icon: "📤",
  },
];

const meetingTemplates = [
  {
    title: "Sales Call",
    duration: "30 minutes",
    desc: "A short meeting for sales conversations, discovery calls, and follow-ups.",
  },
  {
    title: "Board Review",
    duration: "90 minutes",
    desc: "A longer template for board meetings, reviews, and detailed discussions.",
  },
  {
    title: "Client Demo",
    duration: "45 minutes",
    desc: "A practical duration for product demonstrations and client presentations.",
  },
  {
    title: "Travel Briefing",
    duration: "20 minutes",
    desc: "A short template for travel coordination, briefings, and logistics.",
  },
  {
    title: "Custom Meeting",
    duration: "Custom",
    desc: "Choose your own meeting duration when the predefined templates do not fit.",
  },
];

const meetingExamples = [
  {
    title: "India, UK and US meeting",
    desc: "Add locations in India, the UK, and the United States, define each region's working hours, and find upcoming slots that fit all three schedules.",
  },
  {
    title: "Distributed team meeting",
    desc: "Add your team locations and use their local working schedules to identify practical overlapping hours without manually converting every time.",
  },
  {
    title: "Client meeting across time zones",
    desc: "Set your working hours and the client's working hours, choose a duration, and find a slot that fits both schedules.",
  },
];

const useCases = [
  {
    title: "Global team meetings",
    desc: "Find overlapping working hours for distributed teams working across different countries.",
  },
  {
    title: "International meeting scheduling",
    desc: "Find a practical time for participants in multiple regions before sending the invitation.",
  },
  {
    title: "Sales calls",
    desc: "Use the 30-minute sales call template and find a time that fits both the sales team and the prospect.",
  },
  {
    title: "Client demos",
    desc: "Use a 45-minute meeting duration and find availability across your team and the client.",
  },
  {
    title: "Interviews",
    desc: "Coordinate candidate and interviewer schedules when they are located in different time zones.",
  },
  {
    title: "Board and leadership meetings",
    desc: "Use longer meeting durations and working-hour constraints when coordinating leadership across regions.",
  },
  {
    title: "Remote work coordination",
    desc: "Identify shared working hours without manually checking each person's local clock.",
  },
  {
    title: "Webinars and events",
    desc: "Compare event times across regions and verify how the selected time appears locally.",
  },
];

const popularComparisons = [
  "India and US Eastern Time",
  "India and US Pacific Time",
  "India and UK Time",
  "India and Central European Time",
  "India and Singapore",
  "India and Japan",
  "India and Dubai",
  "India and Sydney",
  "US Eastern Time and UK Time",
  "US Eastern Time and Pacific Time",
];

const tips = [
  "Set the actual local working hours for every location before searching for availability.",
  "Use a city or IANA time zone instead of relying only on ambiguous abbreviations such as EST or CST.",
  "Choose the correct date because daylight saving rules can change the difference between locations.",
  "Set the meeting duration before searching so the finder can ensure the complete meeting fits within everyone's schedule.",
  "Check whether a proposed meeting falls on the previous or next calendar day for another participant.",
  "Use 24-hour time when sharing international schedules if AM/PM could cause confusion.",
  "Add a clear meeting title and description before generating an .ics calendar event.",
];

const relatedTools = [
  {
    name: "Time Zone Converter",
    href: timezoneConverterPath,
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
    href: "/pdf",
  },
  {
    name: "Image Tools",
    href: "/image",
  },
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
    <div className="mx-auto space-y-8 px-3 py-5 text-white sm:px-4 sm:py-6 lg:px-5 lg:py-8">
      <JsonLd data={breadcrumbJsonLd} />

      {/* INTRO */}
      <section
        aria-labelledby="intro-heading"
        className="space-y-3"
      >
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Online Meeting Time Finder
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Meeting Time Finder – Find a Meeting Time Across Time Zones
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Find a meeting time that works across multiple time zones without
          manually converting every participant's local time. Search for
          locations by city, country, or time zone, set local working hours
          for each location, choose a meeting duration, and find upcoming
          meeting slots where everyone is available.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/65 sm:text-[0.95rem]">
          The Meeting Time Finder accounts for daylight saving time and
          date-specific time zone offsets. You can use meeting templates, add
          a title and description, share the complete setup, export meeting
          data as CSV, or download the selected meeting as an .ics calendar
          event.
        </p>
      </section>

      {/* CORE FEATURES */}
      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="features-heading"
          title="What the Meeting Time Finder Can Do"
          description="Find practical meeting slots using time zones, working hours, meeting duration, and upcoming availability."
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

      {/* HOW IT WORKS */}
      <section
        aria-labelledby="how-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="how-heading"
          title="How to Find a Meeting Time Across Time Zones"
          description="Set the participants' locations and schedules, then let the finder search for overlapping availability."
        />

        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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

      {/* SEARCH LOCATIONS */}
      <section
        aria-labelledby="search-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="search-heading"
          title="Search and Compare Multiple Time Zones"
          description="Add meeting participants using locations you already know instead of manually selecting technical time zone identifiers."
        />

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm leading-7 text-white/75">
            Search by <strong>city</strong>, <strong>country</strong>,{" "}
            <strong>time zone name</strong>, or supported abbreviation. You
            can compare multiple locations in the same meeting setup.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "New York",
              "London",
              "Mumbai",
              "Singapore",
              "Tokyo",
              "Dubai",
              "Sydney",
              "Los Angeles",
            ].map((location) => (
              <div
                key={location}
                className="rounded-lg border border-white/10 bg-black/10 p-3 text-sm text-white/75"
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKING HOURS */}
      <section
        aria-labelledby="working-hours-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="working-hours-heading"
          title="Set Work Starts and Work Ends for Each Location"
          description="Every location can have its own local working schedule."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Work starts — local time
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Define when the working day begins for a participant or
              location. The value is interpreted in that location's local
              time zone.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Work ends — local time
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Define when the working day ends. The finder uses the local
              start and end times when deciding whether a meeting slot is
              available.
            </p>
          </article>
        </div>

        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
          <p className="text-sm leading-7 text-white/75">
            This means a 9:00 AM–5:00 PM schedule in India is evaluated
            according to India's local clock, while a 9:00 AM–5:00 PM schedule
            in New York is evaluated according to New York's local clock.
          </p>
        </div>
      </section>

      {/* NEXT AVAILABLE */}
      <section
        aria-labelledby="availability-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="availability-heading"
          title="Find the Next Available Meeting Slots"
          description="Instead of manually trying different times, let the finder search upcoming dates for overlapping availability."
        />

        <div className="grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              1. Define schedules
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Set working days and local start and end times for each location.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              2. Choose duration
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Tell the finder how many minutes the meeting needs to last.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              3. Find availability
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Search upcoming dates for slots where all selected locations
              overlap.
            </p>
          </article>
        </div>
      </section>

      {/* EXAMPLE */}
      <section
        aria-labelledby="example-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="example-heading"
          title="Example: Find a Meeting Between India, UK and US"
          description="The finder can check several local working schedules at the same time."
        />

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["India", "09:00 – 18:00"],
              ["London", "09:00 – 17:00"],
              ["New York", "09:00 – 17:00"],
            ].map(([location, hours]) => (
              <div
                key={location}
                className="rounded-lg border border-white/10 bg-black/10 p-4"
              >
                <div className="text-sm font-semibold">
                  {location}
                </div>

                <div className="mt-1 text-xs text-white/50">
                  Working hours
                </div>

                <div className="mt-1 text-sm text-white/75">
                  {hours}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-cyan-400/20 bg-cyan-500/10 p-4">
            <div className="text-xs text-cyan-300">
              Meeting duration
            </div>

            <div className="mt-1 text-sm font-semibold">
              30 minutes
            </div>

            <p className="mt-2 text-sm leading-6 text-white/70">
              The finder checks upcoming dates and returns slots where the
              complete 30-minute meeting fits within all three local working
              schedules.
            </p>
          </div>
        </div>
      </section>

      {/* DURATION */}
      <section
        aria-labelledby="duration-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="duration-heading"
          title="Choose the Meeting Duration"
          description="A meeting needs enough continuous availability to fit its entire duration."
        />

        <p className="text-sm leading-7 text-white/70">
          A 20-minute meeting and a 90-minute meeting can have very different
          available slots. The Meeting Time Finder uses the selected duration
          when evaluating whether an overlapping period is long enough.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {meetingTemplates.map((template) => (
            <article
              key={template.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">
                  {template.title}
                </h3>

                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/60">
                  {template.duration}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-white/70">
                {template.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* TEMPLATES */}
      <section
        aria-labelledby="templates-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="templates-heading"
          title="Meeting Time Templates"
          description="Start common meeting types with a predefined duration, then adjust the details if needed."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {meetingTemplates.slice(0, 4).map((template) => (
            <article
              key={template.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {template.title}
              </h3>

              <div className="mt-1 text-xs text-cyan-300">
                {template.duration}
              </div>

              <p className="mt-2 text-sm leading-6 text-white/65">
                {template.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* DST */}
      <section
        aria-labelledby="dst-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="dst-heading"
          title="Daylight Saving Time Is Accounted For"
          description="The same two locations can have different time differences at different points in the year."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Date-aware time zone offsets
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              The finder calculates time zone offsets using the relevant date
              rather than assuming a fixed offset throughout the year.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Local schedules remain local
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Working hours are evaluated according to each location's local
              time, even when daylight saving changes the relationship between
              locations.
            </p>
          </article>
        </div>
      </section>

      {/* TIMEZONE FEATURES */}
      <section
        aria-labelledby="timezone-features-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="timezone-features-heading"
          title="Everything You Need for Time Zone Comparison"
          description="The Meeting Time Finder includes the core time zone comparison features of the Atoolix Time Zone Converter."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Search by city or country",
              desc: "Find locations without needing to know their technical time zone identifier.",
            },
            {
              title: "Compare multiple locations",
              desc: "Compare several time zones in one meeting setup.",
            },
            {
              title: "12-hour and 24-hour time",
              desc: "Choose AM/PM or 24-hour display.",
            },
            {
              title: "Date selection",
              desc: "Use the actual date when calculating local times and DST rules.",
            },
            {
              title: "Day difference",
              desc: "See when a location falls on the previous or next calendar day.",
            },
            {
              title: "Shareable setup",
              desc: "Preserve the selected meeting and time zone configuration in a share link.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* DETAILS */}
      <section
        aria-labelledby="details-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="details-heading"
          title="Add Meeting Details"
          description="Prepare the meeting information before sharing or exporting the selected slot."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Meeting title
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Add a clear title such as "Client Demo", "Weekly Sales Call",
              or "Board Review".
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Optional description
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Add additional context, an agenda, or notes that should
              accompany the calendar event.
            </p>
          </article>
        </div>
      </section>

      {/* EXPORT */}
      <section
        aria-labelledby="export-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="export-heading"
          title="Export the Meeting"
          description="Once you have found a suitable time, take the meeting outside the browser."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div
              className="text-lg"
              aria-hidden="true"
            >
              📊
            </div>

            <h3 className="mt-2 text-sm font-semibold">
              Export as CSV
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Export the selected meeting comparison and local time
              information in CSV format for analysis, records, or further
              processing.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div
              className="text-lg"
              aria-hidden="true"
            >
              📅
            </div>

            <h3 className="mt-2 text-sm font-semibold">
              Download an .ics calendar event
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Download the selected meeting as an .ics calendar file so it can
              be opened by compatible calendar applications.
            </p>
          </article>
        </div>
      </section>

      {/* SHARE */}
      <section
        aria-labelledby="share-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="share-heading"
          title="Share the Complete Meeting Setup"
          description="Share more than just the final time."
        />

        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
          <p className="text-sm leading-7 text-white/75">
            The share link can preserve the complete meeting configuration,
            including selected locations, date and time settings, working
            hours, meeting duration, and other scheduling options. Another
            person can open the link and review the same setup instead of
            manually recreating it.
          </p>
        </div>
      </section>

      {/* COMMON USE CASES */}
      <section
        aria-labelledby="use-cases-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="use-cases-heading"
          title="Common Meeting Scheduling Use Cases"
          description="Useful whenever participants work or live in different time zones."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* POPULAR COMPARISONS */}
      <section
        aria-labelledby="comparisons-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="comparisons-heading"
          title="Popular Time Zone Meeting Comparisons"
          description="Common combinations for international meetings and remote teams."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularComparisons.map((comparison) => (
            <div
              key={comparison}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/75"
            >
              {comparison}
            </div>
          ))}
        </div>
      </section>

      {/* TIPS */}
      <section
        aria-labelledby="tips-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="tips-heading"
          title="Tips for Scheduling Across Time Zones"
          description="Use these checks to avoid common international scheduling mistakes."
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

      {/* CONVERTER CTA */}
      <section
        aria-labelledby="converter-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="converter-heading"
          title="Need a Simple Time Zone Conversion?"
          description="If you already know the meeting time and only need to convert it between locations, use the Time Zone Converter."
        />

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm leading-7 text-white/70">
            The Time Zone Converter lets you select a source date and time,
            search for cities or countries, compare multiple time zones, use
            12-hour or 24-hour time, account for daylight saving time, and
            share the conversion.
          </p>

          <a
            href={timezoneConverterPath}
            className="mt-3 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/20"
          >
            Open Time Zone Converter
          </a>
        </div>
      </section>

      {/* RELATED TOOLS */}
      <section
        aria-labelledby="related-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="related-heading"
          title="More Free Online Tools"
          description="Explore other Atoolix tools for calculations, conversions, files, and productivity."
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