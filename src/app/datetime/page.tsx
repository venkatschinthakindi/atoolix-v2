import Link from "next/link";
import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Time Zone Converter & Meeting Time Finder - Date & Time Tools";
const description =
  "Convert times between time zones, compare time differences, plan international meetings, and use free date and time utilities in your browser.";

export const metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/datetime` },
  openGraph: { title, description, url: `${siteUrl}/datetime`, siteName, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-12">
        <FilterToolHubPage filterKey="datetime" title={title} />
        <main className="mx-auto mt-10 max-w-5xl space-y-10 px-4 pb-12">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Time Zone Conversion and Meeting Planning</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Atoolix provides browser-based date and time utilities for international scheduling. Use a <Link className="underline" href="/tools/datetime/timezone-converter">time zone converter</Link> to convert a time between locations or compare time differences, and use the <Link className="underline" href="/tools/datetime/meeting-time-finder">meeting time finder</Link> to compare availability across multiple time zones.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Choose a Date or Time Tool</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><h3 className="font-semibold"><Link className="underline" href="/tools/datetime/timezone-converter">Time zone converter</Link></h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Convert a time between locations, compare time zones, and check the local time before scheduling calls, events, or deadlines.</p></div>
              <div><h3 className="font-semibold"><Link className="underline" href="/tools/datetime/meeting-time-finder">Meeting time finder</Link></h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Compare locations and find practical meeting times when people work across different time zones.</p></div>
              <div><h3 className="font-semibold">Date calculations</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use date-focused calculators when you need to calculate dates, intervals, durations, or other calendar-based values supported by the available tools.</p></div>
              <div><h3 className="font-semibold">Everyday scheduling</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Check time differences and calendar information directly in your browser without installing a separate desktop utility.</p></div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Time Zone Planning Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>• Confirm the location and date before comparing times because daylight-saving rules can change the offset.</li>
              <li>• Share the exact date with meeting participants rather than relying only on a clock time.</li>
              <li>• For international meetings, check both the organizer's and attendee's local times before sending an invitation.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Related Atoolix Tools</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Browse the available date and time tools above, or return to <Link className="underline" href="/tools">all online tools</Link> to explore calculators and utilities in other categories.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
