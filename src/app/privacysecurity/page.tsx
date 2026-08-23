import Link from "next/link";
import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Privacy & Security Tools - File Privacy and Metadata Checks";
const description =
  "Use free privacy and security tools to inspect supported files for metadata and sharing risks, with browser-based workflows designed to help protect sensitive information.";

export const metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/privacysecurity` },
  openGraph: { title, description, url: `${siteUrl}/privacysecurity`, siteName, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-12">
        <FilterToolHubPage filterKey="privacy" title={title} />
        <main className="mx-auto mt-10 max-w-5xl space-y-10 px-4 pb-12">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Privacy and Security Checks Before Sharing Files</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Files can contain information that is not obvious from their visible content. Metadata may include author details, timestamps, device information, GPS coordinates, or other properties. Atoolix privacy and security tools help you inspect supported files before sharing or uploading them.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Choose the Right Privacy Tool</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><h3 className="font-semibold">Inspect file metadata</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the File Privacy &amp; Security Checker to inspect supported files for hidden metadata and other information that may be relevant before sharing.</p></div>
              <div><h3 className="font-semibold">Check photos and documents</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Review supported image and document properties when you need to understand what information is embedded in a file.</p></div>
              <div><h3 className="font-semibold">Remove supported metadata</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Where the individual tool supports cleaning, remove supported privacy metadata and download a cleaned copy for sharing.</p></div>
              <div><h3 className="font-semibold">Prepare files before upload</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Check a file before sending it to an application portal, client, colleague, public website, or other third party.</p></div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Privacy Checks Are Not the Same as Security Guarantees</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A metadata or file inspection can reveal specific properties that a tool knows how to detect, but it cannot guarantee that a file is completely free of every possible privacy or security risk. Review the individual tool's supported formats, checks, and processing behavior before relying on its results.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Related Tools</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              After checking a file, you can use <Link className="underline" href="/image">image tools</Link> or <Link className="underline" href="/pdf">PDF tools</Link> for supported conversion and file-preparation tasks.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
