import { serverConfig } from "@/config/server";
const siteUrl = serverConfig.siteUrl;

// FIX: this must match the live URL exactly. The previous version pointed at
// /tools/timezone-converter, which does not match the actual page
// (/tools/datetime/meeting-time-finder). A mismatched canonical/breadcrumb
// path is a structured-data error and works against consolidating ranking
// signal onto one URL.
const canonicalPath = "/tools/datetime/meeting-time-finder";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

// FAQ set: kept every original entry (don't lose the DST/export/share content
// that already earns impressions), and added entries phrased to match live
// Search Console queries — "ist meeting", "international meeting scheduler",
// "meeting times schedule", "find a meeting time", "time finder" — so the
// page answers the exact phrases Google is already testing it against.
const faqItems: FaqItem[] = [
  {
    q: "What is a meeting time finder?",
    a: "A meeting time finder is a tool that compares working hours across multiple time zones and finds the times when every participant's schedule overlaps, instead of you converting each zone by hand.",
  },
  {
    q: "How do I find a meeting time across time zones?",
    a: "Add each participant's location, set their working days and hours, then run the finder. It scans the next 10 days and lists the slots where every selected zone is inside working hours.",
  },
  {
    q: "Can this tool schedule an IST meeting with the US or UK?",
    a: "Yes. Add India Standard Time alongside US zones like EST or PST and UK time (GMT/BST), set working hours for each, and the tool lists overlapping slots while automatically applying the correct daylight saving offset for the US and UK.",
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
    q: "How many time zones can I compare at once?",
    a: "Up to 10 target zones alongside your source zone in a single comparison — enough for most distributed teams and international scheduling.",
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
    q: "Can I share my meeting time comparison with someone else?",
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
    q: "Does my data leave my browser?",
    a: "No. All conversions, working-hours calculations, and exports run locally in your browser — nothing is uploaded to a server.",
  },
];

// Long-tail, pair-specific FAQ entries. These target lower-competition,
// high-intent queries like "ist to cst meeting time" and "ist to est time
// difference" that are easier to rank for than the head term "meeting time
// finder," and are strong candidates for the FAQ/People-Also-Ask box since
// each answer is self-contained. Offsets are given as fixed math (IST has
// no DST) plus the target zone's standard/DST range, so the answer never
// goes stale — only the live tool shows the current converted time.
const timezonePairFaqs: FaqItem[] = [
  {
    q: "What is the time difference between IST and EST?",
    a: "IST is 10 hours 30 minutes ahead of EST (US Eastern Standard Time), or 9 hours 30 minutes ahead during EDT (Eastern Daylight Time, roughly March–November). A common overlap is IST evening (6–8:30 PM) with US Eastern morning (8–10 AM).",
  },
  {
    q: "What is the time difference between IST and CST?",
    a: "IST is 11 hours 30 minutes ahead of CST (US Central Standard Time), or 10 hours 30 minutes ahead during CDT (Central Daylight Time). IST evening (7–9 PM) generally lines up with US Central morning (7:30–9:30 AM).",
  },
  {
    q: "What is the time difference between IST and PST?",
    a: "IST is 13 hours 30 minutes ahead of PST (US Pacific Standard Time), or 12 hours 30 minutes ahead during PDT (Pacific Daylight Time). IST night (8:30–10:30 PM) typically overlaps with US Pacific morning (7–9 AM).",
  },
  {
    q: "What is the time difference between IST and GMT (UK)?",
    a: "IST is 5 hours 30 minutes ahead of GMT, or 4 hours 30 minutes ahead of BST (British Summer Time, roughly late March–late October). IST afternoon (2–5 PM) overlaps well with UK morning (9:30 AM–12:30 PM).",
  },
  {
    q: "What is the time difference between IST and CET (Europe)?",
    a: "IST is 4 hours 30 minutes ahead of CET, or 3 hours 30 minutes ahead of CEST (Central European Summer Time). IST afternoon (2:30–5:30 PM) generally overlaps with Central European morning (10 AM–1 PM).",
  },
  {
    q: "What is the time difference between IST and Singapore time (SGT)?",
    a: "Singapore is 2 hours 30 minutes ahead of IST, and does not observe daylight saving time. IST morning to midday (9:30 AM–1 PM) overlaps with Singapore midday to afternoon (12 PM–3:30 PM).",
  },
  {
    q: "What is the time difference between IST and Australia (AEST/Sydney)?",
    a: "Sydney is 4 hours 30 minutes ahead of IST on AEST, or 5 hours 30 minutes ahead on AEDT (Australian Eastern Daylight Time, roughly October–April — opposite season to US/EU DST). IST morning (9–11:30 AM) is the most reliable overlap with the Australian working day.",
  },
  {
    q: "What is the time difference between IST and Japan (JST)?",
    a: "Japan is 3 hours 30 minutes ahead of IST and does not observe daylight saving time. IST late morning to early afternoon (10 AM–2 PM) overlaps with Japan's early-to-mid afternoon (1:30–5:30 PM).",
  },
  {
    q: "What is the time difference between IST and Dubai (GST)?",
    a: "IST is 1 hour 30 minutes ahead of Gulf Standard Time (Dubai/UAE), and neither zone observes daylight saving time, so the offset is constant year-round. Most standard working hours in both regions overlap directly.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Set your source time",
    desc: "Pick the source time zone, then enter the date and time you want to convert. Your browser's zone is detected automatically.",
    icon: "🕒",
  },
  {
    title: "Add every participant's zone",
    desc: "Search by city, country, or abbreviation, or use the quick-add buttons for popular locations. Add up to 10 zones.",
    icon: "🌍",
  },
  {
    title: "Set working hours per zone",
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
    title: "Meeting time finder",
    desc: "Define working days and hours per zone and scan the next 10 days for slots where everyone overlaps, at 5, 15, 30, or 60-minute precision.",
    icon: "🔎",
  },
  {
    title: "Multi-zone time conversion",
    desc: "Convert one source instant into up to 10 target time zones simultaneously, with local time, offset, abbreviation, and day difference for each.",
    icon: "🌐",
  },
  {
    title: "DST-safe calculations",
    desc: "Offsets and working-hours checks are recalculated from the real UTC offset at each instant, so results stay correct across daylight saving transitions.",
    icon: "🔁",
  },
  {
    title: "Meeting templates",
    desc: "One-click presets — Sales Call, Board Review, Client Demo, Travel Briefing — that prefill title, duration, description, and working hours.",
    icon: "📋",
  },
  {
    title: "Smart zone search",
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
  { useCase: "Interview scheduling across time zones", note: "Use the Sales Call or Client Demo template to quickly set duration and export a calendar invite." },
  { useCase: "International meeting scheduling", note: "Coordinate board reviews and client calls across regions without back-and-forth emails on 'what time works for you'." },
  { useCase: "Board & client reviews", note: "Apply the Board Review template for extended working hours and longer meeting slots." },
  { useCase: "Travel planning", note: "Check local arrival, departure, and briefing times before you fly, day-difference included." },
  { useCase: "Webinars and product launches", note: "Compare launch time across every region your audience is in before you announce it." },
  { useCase: "Remote work coordination", note: "Export a CSV of overlapping hours to share with distributed teammates." },
];

const popularPairs = [
  { from: "IST", to: "EST" },
  { from: "IST", to: "CST" },
  { from: "IST", to: "PST" },
  { from: "IST", to: "GMT" },
  { from: "IST", to: "CET" },
  { from: "IST", to: "SGT" },
  { from: "IST", to: "AEST" },
  { from: "IST", to: "JST" },
  { from: "IST", to: "GST" },
];

// Real-world examples mapped to actual query intent from Search Console
// ("ist meeting", "international meeting scheduler", "time zone meeting
// scheduler"). This section exists specifically to earn relevance for those
// phrases with a concrete, skimmable example rather than abstract copy.
const meetingExamples = [
  {
    title: "IST meeting with New York and London",
    desc: "Set working hours for Hyderabad (IST), New York (EST/EDT), and London (GMT/BST). The finder accounts for each region's current daylight saving status and lists the hours all three overlap — typically a narrow morning window in IST.",
  },
  {
    title: "International meeting across India, USA and UK",
    desc: "Add all three zones, apply the Sales Call or Board Review template, then export the agreed slot as a .ics invite so every recipient's calendar shows the correct local time automatically.",
  },
  {
    title: "Time zone meeting scheduler for distributed teams",
    desc: "For teams spread across more than three regions, add up to 10 zones at once and use the CSV export to share full overlap availability with teammates who don't have the tool open.",
  },
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
  mainEntity: [...faqItems, ...timezonePairFaqs].map((item) => ({
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
    "Compare working hours across multiple time zones and find overlapping meeting slots automatically.",
  totalTime: "PT2M",
  step: howToSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.desc,
  })),
};

// FIX: name and item now match the real page identity and URL instead of
// "Timezone Converter" / the wrong canonical path.
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
    { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteUrl}/tools/datetime` },
    { "@type": "ListItem", position: 3, name: "Meeting Time Finder", item: canonicalUrl },
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

      {/*
        NOTE: this component renders the on-page SEO content, not the
        <head> metadata. There is no duplicate H1 here on purpose — the
        page's real <h1> ("Meeting Time Finder | Schedule Meetings Across
        Time Zones") already exists above this component. The previous
        version added a second, differently-worded large heading here
        ("Timezone Converter & Meeting Time Finder – Convert Time and Find
        Overlapping Hours"), which competes with the real H1 for topical
        focus. This intro is now an H2 that reinforces the SAME entity,
        not a second one.
      */}
      <section aria-labelledby="intro-heading" className="space-y-3">
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
          Add up to 10 time zones, set working hours for each, and instantly find the slots
          where everyone is available — no manual conversion required. Whether you're
          scheduling an IST meeting with the US and UK, an international team call, an
          interview, or a client demo, the finder scans the next 10 days, accounts for
          daylight saving time automatically, and lets you export the result as a CSV
          comparison or a .ics calendar invite.
        </p>
      </section>

      <section aria-labelledby="features-heading" className="space-y-4">
        <SectionHeading
          id="features-heading"
          title="What This Tool Does"
          description="More than a time converter — it finds and exports a meeting time that actually works for everyone."
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

      {/*
        New section targeting queries already producing impressions:
        "ist meeting", "international meeting scheduler",
        "time zone meeting scheduler". Concrete, skimmable examples earn
        relevance for these phrases better than abstract feature copy.
      */}
      <section aria-labelledby="examples-heading" className="space-y-4">
        <SectionHeading
          id="examples-heading"
          title="Example: Finding a Meeting Time Across India, the US and the UK"
          description="How the international meeting scheduler handles common cross-timezone scenarios."
        />
        <div className="grid gap-3 md:grid-cols-3">
          {meetingExamples.map((item) => (
            <article key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.desc}</p>
            </article>
          ))}
        </div>
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
          title="Popular Time Zone Pairs for Meetings"
          description="Some of the most commonly searched time zone pairs for scheduling."
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

      <section aria-labelledby="pair-faq-heading" className="space-y-4">
        <SectionHeading
          id="pair-faq-heading"
          title="IST Meeting Time Differences with Other Time Zones"
          description="Fixed offset and DST behavior for the most commonly searched IST time zone pairs. For the exact converted time on a specific date, use the finder above."
        />
        <div className="space-y-3">
          {timezonePairFaqs.map((item) => (
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
          description="Answers to the most common questions about the meeting time finder."
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
          title="Schedule Meetings Across Time Zones Faster"
          description="Find overlapping working hours, apply a meeting template, and export a CSV or calendar invite — all in one tool. Useful for international teams, interview scheduling, board reviews, travel planning, and webinars. Explore the related tools below for more utilities."
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