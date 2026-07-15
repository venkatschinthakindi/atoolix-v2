import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl ?? "https://atoolix.com";
const updatedAt = new Date("2026-06-28T00:00:00Z");

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteName}`,
  description:
    `Read the ${siteName} Privacy Policy to understand what data we collect, how we use it, and how we protect your information.`,
  alternates: {
    canonical: `${serverConfig.siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy | ${siteName}`,
    description:
      `Read the ${siteName} Privacy Policy to understand what data we collect, how we use it, and how we protect your information.`,
    url: `${serverConfig.siteUrl}/privacy-policy`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${siteName}`,
    description:
      `Read the ${siteName} Privacy Policy to understand what data we collect, how we use it, and how we protect your information.`,
  },
};

const sections = [
  { id: "summary", title: "Summary" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-information", title: "How We Use Information" },
  { id: "files-and-processing", title: "Files and Processing" },
  { id: "cookies-and-analytics", title: "Cookies and Analytics" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "data-retention", title: "Data Retention" },
  { id: "data-security", title: "Data Security" },
  { id: "children", title: "Children's Privacy" },
  { id: "your-rights", title: "Your Rights" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(updatedAt);

  return (
    <div className="app-shell px-10 pt-30">
      <FloatingDock />

      <div className="app-container page-section pt-2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: `Privacy Policy | ${siteName}`,
              description: `Read the ${siteName} Privacy Policy to understand what data we collect, how we use it, and how we protect your information.`,
              url: `${siteUrl}/privacy-policy`,
              inLanguage: "en",
            }).replace(/</g, "\\u003c"),
          }}
        />

        <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            Privacy Policy • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            This Privacy Policy explains how {siteName} handles information when you use our website and tools. We keep this
            policy simple and direct so you can understand what data is collected, how it is used, and what choices you have.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Plain language</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Transparent</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Browser-based tools</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Updated regularly</span>
          </div>
        </section>

        <nav aria-label="On this page" className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Contents</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-zinc-300 transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="summary" className="scroll-mt-24 py-2">
          <h2 className="text-3xl font-semibold text-white">Summary</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              {siteName} is designed to provide utility tools such as calculators, PDF tools, and image tools. Most processing
              for browser-based tools happens locally in your browser whenever technically possible.
            </p>
            <p>
              We do not aim to collect more data than needed to operate, secure, and improve the website. If a specific tool
              requires extra handling, that should be described on that tool’s page.
            </p>
          </div>
        </section>

        <section id="information-we-collect" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Information We Collect</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We may collect limited information that you voluntarily provide, such as your name, email address, or message when
              you contact us.
            </p>
            <p>
              We may also collect basic technical information such as browser type, device information, pages visited, and general
              usage data to keep the site working correctly and improve performance.
            </p>
            <p>
              If you submit files to a tool, the treatment of those files depends on the tool itself. Browser-based tools may
              process content locally, while some features may use server-side processing if clearly stated.
            </p>
          </div>
        </section>

        <section id="how-we-use-information" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">How We Use Information</h2>
          <ul className="mt-4 space-y-3 text-zinc-300 leading-7">
            <li>To operate and maintain the website.</li>
            <li>To respond to support requests and general inquiries.</li>
            <li>To improve tools, performance, and user experience.</li>
            <li>To diagnose errors, bugs, and technical issues.</li>
            <li>To understand which tools are most useful.</li>
            <li>To protect the site against abuse, fraud, and misuse.</li>
          </ul>
        </section>

        <section id="files-and-processing" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Files and Processing</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              Many of our PDF and image tools are designed to process files in the browser when possible. This helps reduce
              unnecessary server handling and keeps the experience fast.
            </p>
            <p>
              If a tool uses server-side processing or temporary file handling, we will aim to explain that clearly on the tool
              page itself.
            </p>
            <p>
              Please avoid uploading sensitive information unless the tool specifically requires it and you are comfortable doing so.
            </p>
          </div>
        </section>

        <section id="cookies-and-analytics" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Cookies and Analytics</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We may use cookies or similar technologies to remember preferences, improve functionality, or understand site usage.
            </p>
            <p>
              We may also use analytics tools to measure traffic and performance. Any analytics or tracking tools should be used
              only to improve the site and should not be more intrusive than necessary.
            </p>
            <p>
              If you want stricter privacy handling, you can add a cookie consent banner and update this section to match the exact
              tools you use.
            </p>
          </div>
        </section>

        <section id="third-party-services" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Third-Party Services</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We may use third-party providers for hosting, analytics, monitoring, email delivery, or other operational purposes.
            </p>
            <p>
              Those providers may process limited information on our behalf under their own policies and terms.
            </p>
            <p>
              We recommend listing any active third-party services here once they are confirmed in production.
            </p>
          </div>
        </section>

        <section id="data-retention" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Data Retention</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We keep personal information only as long as needed for the purpose it was collected, such as responding to a
              message or maintaining site security.
            </p>
            <p>
              File retention may vary by tool. Some tools may process files temporarily and delete them automatically, while other
              tools may not store files at all.
            </p>
          </div>
        </section>

        <section id="data-security" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Data Security</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We use reasonable technical and organizational measures to help protect information from unauthorized access, loss,
              misuse, or alteration.
            </p>
            <p>
              No method of online storage or transmission is completely secure, so we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        <section id="children" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Children&apos;s Privacy</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              Our website is intended for general use and is not directed at children under 13.
            </p>
            <p>
              We do not knowingly collect personal information from children under 13. If you believe a child has provided us
              personal information, please contact us so we can review and address it.
            </p>
          </div>
        </section>

        <section id="your-rights" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Your Rights</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              Depending on your location, you may have rights to access, correct, delete, or restrict certain personal information.
            </p>
            <p>
              You may also have rights to object to certain uses of your information or request a copy of the information we hold.
            </p>
            <p>
              To make a privacy request, contact us using the details below.
            </p>
          </div>
        </section>

        <section id="changes" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Changes to This Policy</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in the site, tools, or legal requirements.
            </p>
            <p>
              When we update the policy, we will revise the “Last updated” date at the top of the page.
            </p>
            <p>
              We recommend reviewing this page periodically so you stay informed about how information is handled.
            </p>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              If you have questions about this Privacy Policy or how your information is handled, please contact us at{" "}
              <a href="mailto:support@atoolix.com" className="text-violet-300 hover:text-violet-200">
                support@{siteName}.com
              </a>
              .
            </p>
            <p>
              You can also visit our{" "}
              <Link href="/contact" className="text-violet-300 hover:text-violet-200">
                Contact page
              </Link>{" "}
              for general support or inquiries.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}