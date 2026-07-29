import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;
const updatedAt = new Date("2026-07-28T00:00:00Z");

export const metadata: Metadata = {
  title: `Disclaimer | ${siteName}`,
  description: `${siteName} provides online utility tools for general informational and educational purposes only. Results are provided as-is and should be independently verified.`,
  alternates: {
    canonical: `${siteUrl}/disclaimer`,
  },
  openGraph: {
    title: `Disclaimer | ${siteName}`,
    description: `${siteName} provides online utility tools for general informational and educational purposes only.`,
    url: `${siteUrl}/disclaimer`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Disclaimer | ${siteName}`,
    description: `${siteName} provides online utility tools for general informational and educational purposes only.`,
  },
};

const contents = [
  { id: "general-information", label: "General Information" },
  { id: "no-professional-advice", label: "No Professional Advice" },
  { id: "accuracy-of-information", label: "Accuracy of Information" },
  { id: "tool-results", label: "Tool Results" },
  { id: "user-responsibility", label: "User Responsibility" },
  { id: "file-processing", label: "File Processing" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "website-availability", label: "Website Availability" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "changes-to-this-disclaimer", label: "Changes to This Disclaimer" },
  { id: "contact-us", label: "Contact Us" },
];

const quickLinks = [
  { href: "/tools/calculator/emi-calculator", label: "EMI Calculator" },
  { href: "/tools/calculator/roi-calculator", label: "ROI Calculator" },
  { href: "/tools/pdf/merge-pdf", label: "PDF Merge" },
  { href: "/tools/image/compress-image", label: "Image Compressor" },
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
    "@type": "WebPage",
    name: `Disclaimer | ${siteName}`,
    description: `${siteName} provides online utility tools for general informational and educational purposes only.`,
    url: `${siteUrl}/disclaimer`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
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

        <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-2xl backdrop-blur-xl sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            Disclaimer • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Disclaimer | {siteName}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            This Disclaimer explains the limitations of the information, tools, and services provided by {siteName}. By using our website, you acknowledge and agree to the terms outlined below.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">General information only</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Verify outputs</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Use at your own risk</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">No professional advice</span>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">Contents</h2>
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

        <section id="general-information" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">General Information</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            {siteName} provides online utility tools, calculators, PDF tools, image tools, converters, and related resources for general informational and educational purposes.
            While we strive to provide accurate and reliable tools, we do not guarantee that all information, calculations, conversions, or outputs will always be complete, accurate, or suitable for every purpose.
          </p>
        </section>

        <section id="no-professional-advice" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">No Professional Advice</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            The information, calculations, conversions, examples, and outputs provided on {siteName} are for general informational and educational purposes only.
            Nothing on this website constitutes legal, financial, tax, accounting, investment, medical, engineering, or other professional advice.
            You should consult an appropriately qualified professional before making decisions based on information or results obtained from this website.
          </p>
        </section>

        <section id="accuracy-of-information" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">Accuracy of Information</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            We make reasonable efforts to keep our website and tools accurate and up to date. However, errors, omissions, or inaccuracies may occur.
          </p>
          <ul className="mt-4 max-w-4xl list-disc space-y-2 pl-6 text-zinc-300">
            <li>All information may not be accurate or complete.</li>
            <li>Every calculation or conversion may not be free from error.</li>
            <li>Every tool may not meet your specific requirements.</li>
            <li>All content may not be current at all times.</li>
          </ul>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            You are responsible for independently verifying any result before relying on it.
          </p>
        </section>

        <section id="tool-results" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">Tool Results</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            Results generated by our calculators, converters, PDF tools, image tools, and other utilities are provided <span className="text-white">as is</span>.
            Different software, operating systems, browsers, devices, or file formats may produce different results.
            Before using any generated file, calculation, or conversion for business, legal, financial, academic, or professional purposes, you should verify that it meets your requirements.
          </p>
        </section>

        <section id="user-responsibility" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">User Responsibility</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            You are solely responsible for verifying the accuracy of tool outputs, maintaining backups of your files before using any tool, ensuring that uploaded content does not violate any law or third-party rights, and using the website in compliance with applicable laws.
          </p>
        </section>

        <section id="file-processing" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">File Processing</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            Many {siteName} tools are designed to process files directly within your web browser whenever technically possible.
            For tools that use browser-based processing, files typically remain on your device and are not uploaded to our servers.
            If a particular tool requires server-side processing or temporary file storage, this will be identified on the relevant tool page whenever reasonably possible.
          </p>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            Users should avoid uploading confidential, sensitive, or irreplaceable information unless they fully understand how the specific tool operates.
          </p>
        </section>

        <section id="third-party-links" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">Third-Party Links</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            Our website may contain links to third-party websites, services, or resources. These links are provided solely for convenience.
            We do not control, endorse, or assume responsibility for the content, privacy practices, availability, or services provided by third-party websites.
            Your use of any third-party website is at your own risk.
          </p>
        </section>

        <section id="website-availability" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">Website Availability</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            We aim to keep {siteName} available and functioning reliably. However, we do not guarantee uninterrupted access to the website or that every feature will always operate without errors.
            Maintenance, updates, technical issues, internet connectivity problems, or circumstances beyond our control may temporarily affect the availability of the website or its tools.
          </p>
        </section>

        <section id="limitation-of-liability" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">Limitation of Liability</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            To the fullest extent permitted by applicable law, {siteName}, its owners, affiliates, contributors, employees, contractors, and licensors shall not be liable for any direct, indirect, incidental, consequential, special, exemplary, or punitive damages arising from or related to:
          </p>
          <ul className="mt-4 max-w-4xl list-disc space-y-2 pl-6 text-zinc-300">
            <li>Use of or inability to use the website.</li>
            <li>Reliance on tool outputs or calculations.</li>
            <li>File corruption or data loss.</li>
            <li>Business interruption.</li>
            <li>Lost profits.</li>
            <li>Inaccuracies or omissions.</li>
            <li>Any other damages resulting from the use of this website.</li>
          </ul>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            Users should always keep backup copies of important files before using any file-processing tool.
          </p>
        </section>

        <section id="changes-to-this-disclaimer" className="mb-12 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">Changes to This Disclaimer</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            We may update this Disclaimer from time to time to reflect changes in our website, tools, services, or legal requirements.
            When changes are made, the “Last updated” date at the top of this page will be revised.
            We encourage users to review this page periodically.
          </p>
        </section>

        <section id="contact-us" className="mb-14 scroll-mt-28">
          <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            If you have any questions about this Disclaimer, please contact us at{" "}
            <a
              href="mailto:support@atoolix.com"
              className="text-white underline underline-offset-4"
            >
              support@{siteName}.com
            </a>
            . You can also visit our{" "}
            <Link href="/contact" className="text-white underline underline-offset-4">
              Contact page
            </Link>{" "}
            for general questions or support requests.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">Available tools</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-slate-950/30 p-5 text-white transition hover:border-white/20 hover:bg-slate-950/40"
              >
                <p className="text-sm font-semibold">{item.label}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}