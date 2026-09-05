import { serverConfig } from "@/config/server";
import RelatedTools from "@/app/tools/[...toolId]/Relatedtools";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
const siteUrl = serverConfig.siteUrl;

const canonicalPath = "/tools/datetime/meeting-time-finder";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

const timezoneConverterPath = "/tools/datetime/timezone-converter";

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  { q: "What is a meeting time finder?", a: "A meeting time finder checks multiple time zones and working schedules to find meeting slots that are available for everyone. Instead of manually converting each participant's local time, the finder checks upcoming dates for overlapping availability." },
  { q: "How do I find a meeting time across time zones?", a: "Add the locations involved in the meeting, set the local working days and hours for each location, choose a meeting duration, and search for available slots. The finder checks the schedules and returns overlapping times that fit everyone." },
  { q: "Can I find a meeting time between India, the US, and the UK?", a: "Yes. Add the relevant locations for India, the United States, and the United Kingdom, set each location's working hours, choose the meeting duration, and find upcoming slots where all selected locations are available." },
  { q: "Can I set different working hours for each time zone?", a: "Yes. Each location can have its own local work start and work end times. The finder uses those local schedules when calculating available meeting slots." },
  { q: "Can I find the next available meeting slots?", a: "Yes. After setting the working schedules and meeting duration, the finder can scan upcoming dates and identify the next available slots where all selected locations overlap." },
  { q: "Does the meeting finder handle daylight saving time?", a: "Yes. Time zone offsets are calculated for the relevant date, so daylight saving changes are taken into account when determining local times and overlapping working hours." },
  { q: "How many time zones can I compare?", a: "The Meeting Time Finder supports multiple locations and uses the same multi-time-zone comparison functionality as the Time Zone Converter, allowing you to search and compare up to 10 target time zones." },
  { q: "Can I search for time zones by city or country?", a: "Yes. Search for a city, country, time zone name, or supported abbreviation to add the locations involved in the meeting." },
  { q: "Can I choose a meeting duration?", a: "Yes. You can use meeting templates with predefined durations or enter the duration required for your meeting. The finder uses the duration when checking whether a slot fits inside every location's working hours." },
  { q: "Can I add a meeting title and description?", a: "Yes. You can add a meeting title and optional description before exporting the selected meeting." },
  { q: "Can I export the meeting?", a: "Yes. You can export meeting information as CSV and download an .ics calendar file for the selected meeting slot." },
  { q: "Can I share the complete meeting setup?", a: "Yes. A share link can preserve the meeting configuration, including locations, dates, time settings, working hours, meeting duration, and other selected options." },
];

const featureItems: FeatureItem[] = [
  { title: "Search Multiple Time Zones", desc: "Search by city, country, time zone, or supported abbreviation and add the locations involved in the meeting.", icon: "🌍" },
  { title: "Compare Up to 10 Locations", desc: "Compare multiple participant locations in the same setup instead of converting each time separately.", icon: "🔢" },
  { title: "Local Working Hours", desc: "Set work starts and work ends independently for every location.", icon: "🕘" },
  { title: "Next Available Slots", desc: "Scan upcoming dates and find the next meeting slots that fit all selected working schedules.", icon: "🔎" },
  { title: "Overlapping Availability", desc: "Find the periods where every selected location is within its defined working hours.", icon: "✅" },
  { title: "DST-Aware Scheduling", desc: "Use date-specific time zone offsets so daylight saving changes are reflected in meeting calculations.", icon: "🔄" },
  { title: "Meeting Duration", desc: "Set the amount of time required for the meeting so short and long meetings are checked differently.", icon: "⏱️" },
  { title: "Meeting Templates", desc: "Start quickly with predefined meeting types such as sales calls, board reviews, client demos, and travel briefings.", icon: "📋" },
  { title: "Meeting Details", desc: "Add a meeting title and optional description before exporting the selected meeting.", icon: "📝" },
  { title: "CSV Export", desc: "Export the meeting comparison and local time information for further use or record keeping.", icon: "📊" },
  { title: "ICS Calendar Export", desc: "Download a calendar-compatible .ics event for the selected meeting time.", icon: "📅" },
  { title: "Complete Setup Sharing", desc: "Create a share link that preserves the meeting configuration so another person can open the same setup.", icon: "🔗" },
];

const howToSteps: StepItem[] = [
  { title: "Add the participant locations", desc: "Search by city, country, or time zone and add every location involved in the meeting.", icon: "🌍" },
  { title: "Set local working hours", desc: "Choose work starts and work ends for each location based on its local schedule.", icon: "🕘" },
  { title: "Choose the meeting duration", desc: "Use a meeting template or enter the number of minutes required for the meeting.", icon: "⏱️" },
  { title: "Find available slots", desc: "Search upcoming dates for periods where all selected locations have overlapping availability.", icon: "🔎" },
  { title: "Add meeting details", desc: "Enter a title and optional description for the selected meeting.", icon: "📝" },
  { title: "Share or export", desc: "Share the complete setup or export the meeting as CSV or an .ics calendar event.", icon: "📤" },
];

const meetingTemplates = [
  { title: "Sales Call", duration: "30 minutes", desc: "A short meeting for sales conversations, discovery calls, and follow-ups." },
  { title: "Board Review", duration: "90 minutes", desc: "A longer template for board meetings, reviews, and detailed discussions." },
  { title: "Client Demo", duration: "45 minutes", desc: "A practical duration for product demonstrations and client presentations." },
  { title: "Travel Briefing", duration: "20 minutes", desc: "A short template for travel coordination, briefings, and logistics." },
  { title: "Custom Meeting", duration: "Custom", desc: "Choose your own meeting duration when the predefined templates do not fit." },
];

const meetingExamples = [
  { title: "India, UK and US meeting", desc: "Add locations in India, the UK, and the United States, define each region's working hours, and find upcoming slots that fit all three schedules." },
  { title: "Distributed team meeting", desc: "Add your team locations and use their local working schedules to identify practical overlapping hours without manually converting every time." },
  { title: "Client meeting across time zones", desc: "Set your working hours and the client's working hours, choose a duration, and find a slot that fits both schedules." },
];

const useCases = [
  { title: "Global team meetings", desc: "Find overlapping working hours for distributed teams working across different countries." },
  { title: "International meeting scheduling", desc: "Find a practical time for participants in multiple regions before sending the invitation." },
  { title: "Sales calls", desc: "Use the 30-minute sales call template and find a time that fits both the sales team and the prospect." },
  { title: "Client demos", desc: "Use a 45-minute meeting duration and find availability across your team and the client." },
  { title: "Interviews", desc: "Coordinate candidate and interviewer schedules when they are located in different time zones." },
  { title: "Board and leadership meetings", desc: "Use longer meeting durations and working-hour constraints when coordinating leadership across regions." },
  { title: "Remote work coordination", desc: "Identify shared working hours without manually checking each person's local clock." },
  { title: "Webinars and events", desc: "Compare event times across regions and verify how the selected time appears locally." },
];

const popularComparisons = ["India and US Eastern Time", "India and US Pacific Time", "India and UK Time", "India and Central European Time", "India and Singapore", "India and Japan", "India and Dubai", "India and Sydney", "US Eastern Time and UK Time", "US Eastern Time and Pacific Time"];
const tips = ["Set the actual local working hours for every location before searching for availability.", "Use a city or IANA time zone instead of relying only on ambiguous abbreviations such as EST or CST.", "Choose the correct date because daylight saving rules can change the difference between locations.", "Set the meeting duration before searching so the finder can ensure the complete meeting fits within everyone's schedule.", "Check whether a proposed meeting falls on the previous or next calendar day for another participant.", "Use 24-hour time when sharing international schedules if AM/PM could cause confusion.", "Add a clear meeting title and description before generating an .ics calendar event."];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
    { "@type": "ListItem", position: 2, name: "Date & Time Tools", item: `${siteUrl}/datetime` },
    { "@type": "ListItem", position: 3, name: "Meeting Time Finder", item: canonicalUrl },
  ],
};

export default function MeetingTimeFinderSeoContent() {
  return (
    <div className="mx-auto space-y-8 px-3 py-5 text-foreground sm:px-4 sm:py-6 lg:px-5 lg:py-8">
      <JsonLd data={breadcrumbJsonLd} />
      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground-secondary">Free Online Meeting Time Finder</p>
        <h2 id="intro-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Meeting Time Finder – Find a Meeting Time Across Time Zones</h2>
        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">Find a meeting time that works across multiple time zones without manually converting every participant's local time. Search for locations by city, country, or time zone, set local working hours for each location, choose a meeting duration, and find upcoming meeting slots where everyone is available.</p>
        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">The Meeting Time Finder accounts for daylight saving time and date-specific time zone offsets. You can use meeting templates, add a title and description, share the complete setup, export meeting data as CSV, or download the selected meeting as an .ics calendar event.</p>
      </section>
      <section aria-labelledby="features-heading" className="space-y-4"><SectionHeading id="features-heading" title="What the Meeting Time Finder Can Do" description="Find practical meeting slots using time zones, working hours, meeting duration, and upcoming availability." /><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{featureItems.map((item) => <article key={item.title} className="rounded-xl border border-border bg-card p-4"><div className="text-lg" aria-hidden="true">{item.icon}</div><h3 className="mt-2 text-sm font-semibold sm:text-[0.95rem]">{item.title}</h3><p className="mt-1.5 text-sm leading-6 text-foreground-secondary">{item.desc}</p></article>)}</div></section>
      <section aria-labelledby="how-heading" className="space-y-4"><SectionHeading id="how-heading" title="How to Find a Meeting Time Across Time Zones" description="Set the participants' locations and schedules, then let the finder search for overlapping availability." /><ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{howToSteps.map((step, index) => <li key={step.title} className="rounded-xl border border-border bg-card p-4"><div className="flex items-center gap-2"><span className="text-lg" aria-hidden="true">{step.icon}</span><span className="text-xs font-semibold text-foreground-faint">Step {index + 1}</span></div><h3 className="mt-2 text-sm font-semibold">{step.title}</h3><p className="mt-1.5 text-sm leading-6 text-foreground-secondary">{step.desc}</p></li>)}</ol></section>
      <section aria-labelledby="templates-heading" className="space-y-4"><SectionHeading id="templates-heading" title="Meeting Templates" description="Start with a practical duration or choose a custom meeting length." /><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{meetingTemplates.map((item) => <article key={item.title} className="rounded-xl border border-border bg-card p-4"><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-1 text-xs text-foreground-faint">{item.duration}</p><p className="mt-2 text-sm leading-6 text-foreground-secondary">{item.desc}</p></article>)}</div></section>
      <section aria-labelledby="examples-heading" className="space-y-4"><SectionHeading id="examples-heading" title="Meeting Time Examples" description="Common ways to use the finder when participants work across regions." /><div className="grid gap-3 md:grid-cols-3">{meetingExamples.map((item) => <article key={item.title} className="rounded-xl border border-border bg-card p-4"><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-foreground-secondary">{item.desc}</p></article>)}</div></section>
      <section aria-labelledby="use-cases-heading" className="space-y-4"><SectionHeading id="use-cases-heading" title="Meeting Time Finder Use Cases" description="Useful for teams, clients, interviews, events, and international scheduling." /><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{useCases.map((item) => <article key={item.title} className="rounded-xl border border-border bg-card p-4"><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-foreground-secondary">{item.desc}</p></article>)}</div></section>
      <section aria-labelledby="comparisons-heading" className="space-y-4"><SectionHeading id="comparisons-heading" title="Popular Time Zone Comparisons" description="Examples of common location combinations to check when planning an international meeting." /><ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{popularComparisons.map((item) => <li key={item} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground-secondary">{item}</li>)}</ul></section>
      <section aria-labelledby="tips-heading" className="space-y-4"><SectionHeading id="tips-heading" title="Tips for Scheduling Meetings Across Time Zones" description="Use date-aware time zones and realistic schedules when choosing a meeting slot." /><ul className="space-y-2 text-sm leading-6 text-foreground-secondary">{tips.map((tip) => <li key={tip} className="rounded-lg border border-border bg-card px-4 py-2">{tip}</li>)}</ul></section>
      <section aria-labelledby="faq-heading" className="space-y-4"><SectionHeading id="faq-heading" title="Meeting Time Finder FAQ" description="Answers to common questions about finding meeting times across time zones." /><div className="space-y-3">{faqItems.map((item) => <details key={item.q} className="rounded-xl border border-border bg-card p-4"><summary className="cursor-pointer text-sm font-semibold">{item.q}</summary><p className="mt-2 text-sm leading-6 text-foreground-secondary">{item.a}</p></details>)}</div></section>
      <RelatedTools
        toolId="meeting-time-finder"
        items={[{ name: "Time Zone Converter", href: timezoneConverterPath }]}
      />
    </div>
  );
}
