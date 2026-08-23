import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl ?? "https://atoolix.com";
const disclaimerUrl = `${siteUrl}/disclaimer`;
const updatedAt = new Date("2026-08-19T00:00:00Z");

export const metadata: Metadata = {
  title: `Disclaimer | ${siteName}`,
  description:
    `${siteName} provides online utility tools for calculations, conversions, file processing, image and PDF tasks, and everyday needs. Review important results before relying on them.`,
  alternates: {
    canonical: disclaimerUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Disclaimer | ${siteName}`,
    description:
      `${siteName} provides online utility tools for calculations, conversions, file processing, image and PDF tasks, and everyday needs.`,
    url: disclaimerUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Disclaimer | ${siteName}`,
    description:
      `${siteName} provides online utility tools for calculations, conversions, file processing, image and PDF tasks, and everyday needs.`,
  },
};

const contents = [
  { id: "general-information", label: "General Information" },
  { id: "no-professional-advice", label: "No Professional Advice" },
  { id: "accuracy-of-information", label: "Accuracy of Information" },
  { id: "tool-results", label: "Tool Results" },
  { id: "how-tools-work", label: "How Our Tools Work" },
  { id: "user-responsibility", label: "User Responsibility" },
  { id: "file-processing", label: "File Processing" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "website-availability", label: "Website Availability" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "changes-to-this-disclaimer", label: "Changes to This Disclaimer" },
  { id: "contact-us", label: "Contact Us" },
];

const quickLinks = [
  {
    href: "/tools/calculator/emi-calculator",
    label: "EMI Calculator",
  },
  {
    href: "/tools/calculator/sip-calculator",
    label: "ROI Calculator",
  },
  {
    href: "/tools/pdf/merge-pdf",
    label: "PDF Merge",
  },
  {
    href: "/tools/image/compress-image",
    label: "Image Compressor",
  },
];

export default function DisclaimerPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(updatedAt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        email: "support@atoolix.com",
      },
      {
        "@type": "WebPage",
        "@id": `${disclaimerUrl}#webpage`,
        url: disclaimerUrl,
        name: `Disclaimer | ${siteName}`,
        description:
          `${siteName} provides online utility tools for calculations, conversions, file processing, image and PDF tasks, and everyday needs.`,
        dateModified: updatedAt.toISOString(),
        inLanguage: "en",
        about: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <div className="app-shell px-4 pt-24 sm:px-6 lg:px-10">
      <FloatingDock />

      <div className="app-container page-section pt-2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        {/* Header */}
        <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-2xl backdrop-blur-xl sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            Disclaimer • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Disclaimer | {siteName}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            This Disclaimer explains the limitations and responsibilities
            associated with using the information and tools available on{" "}
            {siteName}. We aim to make our tools useful and reliable, but
            important results should always be reviewed before they are used
            for consequential decisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              General-purpose tools
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Transparent limitations
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Verify important results
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Updated regularly
            </span>
          </div>
        </section>

        {/* Contents */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            On this page
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-slate-950/40 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>

        {/* General Information */}
        <section
          id="general-information"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            General Information
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              {siteName} provides online utility tools for tasks such as
              calculations, conversions, PDF and image processing, QR code
              generation, date and time utilities, and other everyday needs.
            </p>

            <p>
              We make reasonable efforts to keep our tools useful, functional,
              and understandable. However, we cannot guarantee that every
              result will always be complete, accurate, current, or suitable
              for every possible purpose.
            </p>

            <p>
              Information and results provided by the website should be
              treated as general-purpose information and should be independently
              reviewed when accuracy is important.
            </p>
          </div>
        </section>

        {/* No Professional Advice */}
        <section
          id="no-professional-advice"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            No Professional Advice
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              The calculators, conversions, examples, information, and other
              outputs provided by {siteName} are not a substitute for
              professional advice.
            </p>

            <p>
              Nothing on this website should be interpreted as legal,
              financial, tax, accounting, investment, medical, engineering,
              or other professional advice.
            </p>

            <p>
              When a decision involves significant financial, legal, medical,
              business, or other consequences, consult an appropriately
              qualified professional and verify relevant information
              independently.
            </p>
          </div>
        </section>

        {/* Accuracy */}
        <section
          id="accuracy-of-information"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            Accuracy of Information
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            We work to maintain accurate and useful information, calculations,
            conversions, and tools. Nevertheless, errors, omissions,
            outdated information, browser differences, or technical issues
            may occasionally occur.
          </p>

          <ul className="mt-5 max-w-4xl list-disc space-y-2 pl-6 text-zinc-300">
            <li>Information may not always be current.</li>
            <li>Calculations may contain unexpected errors.</li>
            <li>Different inputs may produce different results.</li>
            <li>Some tools may not support every file or use case.</li>
            <li>Results may vary between browsers, devices, or software.</li>
          </ul>

          <p className="mt-5 max-w-4xl leading-7 text-zinc-300">
            If an output is important to you, verify it using an appropriate
            independent source before relying on it.
          </p>
        </section>

        {/* Tool Results */}
        <section
          id="tool-results"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            Tool Results
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              Results generated by our calculators, converters, file tools,
              image tools, PDF tools, and other utilities depend on the
              information and settings supplied by the user.
            </p>

            <p>
              Generated files, calculations, conversions, and other outputs
              are provided for their intended utility and should be reviewed
              before being used for business, legal, financial, academic,
              technical, or professional purposes.
            </p>

            <p>
              Where a result could have significant consequences, you should
              independently confirm the result using an appropriate source or
              qualified professional.
            </p>
          </div>
        </section>

        {/* How Tools Work */}
        <section
          id="how-tools-work"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            How Our Tools Work
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              Atoolix includes different types of browser-based utilities.
              Depending on the individual tool, processing may happen entirely
              in your browser or may require server-side processing.
            </p>

            <p>
              Where file handling or processing behavior is important, we aim
              to provide relevant information on the individual tool page so
              users can understand how the tool operates before using it.
            </p>

            <p>
              If privacy is particularly important for a task, review the
              processing information for the specific tool before selecting
              or uploading a file.
            </p>
          </div>
        </section>

        {/* User Responsibility */}
        <section
          id="user-responsibility"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            User Responsibility
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              You are responsible for reviewing the results produced by any
              Atoolix tool before relying on them.
            </p>

            <p>
              You are also responsible for keeping backup copies of important
              or irreplaceable files before using file-processing tools.
            </p>

            <p>
              You are responsible for ensuring that any content you process or
              upload is content you are legally permitted to use and process.
            </p>

            <p>
              You must use the website in accordance with applicable laws and
              our{" "}
              <Link
                href="/terms"
                className="text-violet-300 hover:text-violet-200"
              >
                Terms and Conditions
              </Link>
              .
            </p>
          </div>
        </section>

        {/* File Processing */}
        <section
          id="file-processing"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            File Processing
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              Many Atoolix tools are designed to perform processing directly
              within your web browser whenever technically possible.
            </p>

            <p>
              When a tool performs processing entirely in your browser, the
              selected files can be processed locally on your device without
              being uploaded to Atoolix servers.
            </p>

            <p>
              Some tools or features may require server-side processing,
              temporary file handling, or other technical services. Where
              applicable, the relevant tool page should provide information
              about how the tool handles files.
            </p>

            <p>
              If a file contains confidential, sensitive, or irreplaceable
              information, review the specific tool's processing behavior
              before using it.
            </p>

            <p>
              For more information about information handling, please review
              our{" "}
              <Link
                href="/privacy"
                className="text-violet-300 hover:text-violet-200"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Third Party */}
        <section
          id="third-party-links"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            Third-Party Links
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            Our website may contain links to third-party websites, services,
            or resources. These links may be provided for convenience or to
            help users find additional information.
          </p>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            We do not control third-party websites or services and are not
            responsible for their content, availability, security, privacy
            practices, or terms. Your use of a third-party service is subject
            to that provider's own policies and terms.
          </p>
        </section>

        {/* Availability */}
        <section
          id="website-availability"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            Website Availability
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              We aim to keep {siteName} available and functioning reliably.
              However, uninterrupted availability cannot be guaranteed.
            </p>

            <p>
              Maintenance, updates, technical problems, browser limitations,
              network issues, hosting problems, or circumstances outside our
              reasonable control may temporarily affect the website or
              individual tools.
            </p>

            <p>
              We may also improve, modify, replace, restrict, or discontinue
              individual tools or features as the service develops.
            </p>
          </div>
        </section>

        {/* Limitation */}
        <section
          id="limitation-of-liability"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            Limitation of Liability
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              To the fullest extent permitted by applicable law, {siteName},
              its owners, operators, employees, contractors, and service
              providers will not be liable for indirect, incidental,
              consequential, special, or punitive damages arising from your
              use of, or inability to use, the website or its tools.
            </p>

            <p>
              This may include losses relating to business interruption, lost
              profits, loss of data, or reliance on tool results, subject to
              applicable law.
            </p>

            <p>
              Nothing in this Disclaimer is intended to exclude or limit
              liability where such exclusion or limitation is not permitted
              by applicable law.
            </p>

            <p>
              Because some tools process or transform user files, users should
              maintain appropriate backup copies of important files before
              processing them.
            </p>
          </div>
        </section>

        {/* Changes */}
        <section
          id="changes-to-this-disclaimer"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            Changes to This Disclaimer
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              We may update this Disclaimer when our website, tools, services,
              file-processing methods, or legal requirements change.
            </p>

            <p>
              When changes are made, we will update the “Last updated” date
              displayed at the top of this page.
            </p>

            <p>
              We encourage users to review this page periodically so they can
              stay informed about the limitations and responsibilities
              associated with using Atoolix.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact-us"
          className="mb-12 scroll-mt-28"
        >
          <h2 className="text-3xl font-semibold text-white">
            Contact Us
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              If you have questions about this Disclaimer or how a particular
              Atoolix tool works, contact us at{" "}
              <a
                href="mailto:support@atoolix.com"
                className="text-violet-300 underline underline-offset-4 hover:text-violet-200"
              >
                support@atoolix.com
              </a>
              .
            </p>

            <p>
              You can also visit our{" "}
              <Link
                href="/contact"
                className="text-violet-300 underline underline-offset-4 hover:text-violet-200"
              >
                Contact page
              </Link>{" "}
              for general questions and support.
            </p>
          </div>
        </section>

        {/* Explore Tools */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            Explore Atoolix Tools
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
            Explore some of the tools available on Atoolix for everyday
            calculations and file-related tasks.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-slate-950/30 p-5 text-white transition hover:border-white/20 hover:bg-slate-950/40"
              >
                <p className="text-sm font-semibold">
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Policies */}
        <section className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">
            Related Policies
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            Learn more about Atoolix, how our website may be used, and how
            information is handled.
          </p>

          <div className="mt-5 flex flex-wrap gap-5 text-sm">
            <Link
              href="/about"
              className="text-violet-300 hover:text-violet-200"
            >
              About Atoolix
            </Link>

            <Link
              href="/privacy"
              className="text-violet-300 hover:text-violet-200"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-violet-300 hover:text-violet-200"
            >
              Terms and Conditions
            </Link>

            <Link
              href="/contact"
              className="text-violet-300 hover:text-violet-200"
            >
              Contact Us
            </Link>

            <Link
              href="/"
              className="text-violet-300 hover:text-violet-200"
            >
              Atoolix Tools
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}