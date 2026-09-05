import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl ?? "https://atoolix.com";
const termsUrl = `${siteUrl}/terms`;
const updatedAt = new Date("2026-08-19T00:00:00Z");

export const metadata: Metadata = {
  title: `Terms and Conditions | ${siteName}`,
  description: `Read the Terms and Conditions for ${siteName}, including rules for using our online tools, user responsibilities, intellectual property, disclaimers, and limitations.`,
  alternates: {
    canonical: termsUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Terms and Conditions | ${siteName}`,
    description: `Read the Terms and Conditions for ${siteName}, including rules for using our online tools, user responsibilities, intellectual property, disclaimers, and limitations.`,
    url: termsUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms and Conditions | ${siteName}`,
    description: `Read the Terms and Conditions for ${siteName}, including rules for using our online tools, user responsibilities, intellectual property, disclaimers, and limitations.`,
  },
};

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "tools-and-results", title: "Tools and Results" },
  { id: "eligibility", title: "Eligibility" },
  { id: "permitted-use", title: "Permitted Use" },
  { id: "prohibited-use", title: "Prohibited Use" },
  { id: "files-and-user-content", title: "Files and User Content" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "disclaimer", title: "Disclaimer of Warranties" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "indemnity", title: "Indemnity" },
  { id: "termination", title: "Suspension and Termination" },
  { id: "changes", title: "Changes to Terms" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact Us" },
];

export default function TermsPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(updatedAt);

  const structuredData = {
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
        "@id": `${termsUrl}#webpage`,
        url: termsUrl,
        name: `Terms and Conditions | ${siteName}`,
        description: `Terms and Conditions governing the use of ${siteName}.`,
        dateModified: updatedAt.toISOString(),
        inLanguage: "en",
        about: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <div className="app-shell px-10 pt-30">
      <FloatingDock />

      <div className="app-container page-section pt-2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        {/* Header */}
        <section className="mb-12 rounded-3xl border border-border bg-card px-6 py-10 sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-foreground-secondary">
            Terms and Conditions • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Terms and Conditions | {siteName}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-foreground-secondary">
            These Terms and Conditions explain the rules for using {siteName}
            and our online tools. We have written them in clear language so
            you can understand your responsibilities and how the service may
            be used.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-foreground-secondary">
            <span className="rounded-full border border-border bg-card px-3 py-1">
              Clear and simple
            </span>

            <span className="rounded-full border border-border bg-card px-3 py-1">
              Tool usage rules
            </span>

            <span className="rounded-full border border-border bg-card px-3 py-1">
              User responsibilities
            </span>

            <span className="rounded-full border border-border bg-card px-3 py-1">
              Updated regularly
            </span>
          </div>
        </section>

        {/* Contents */}
        <nav
          aria-label="On this page"
          className="mb-10 rounded-3xl border border-border bg-card p-6"
        >
          <h2 className="text-lg font-semibold text-foreground">
            On this page
          </h2>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-foreground-secondary transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Acceptance */}
        <section id="acceptance" className="scroll-mt-24 py-2">
          <h2 className="text-3xl font-semibold text-foreground">
            Acceptance of Terms
          </h2>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            By accessing or using {siteName}, you agree to these Terms and
            Conditions and our{" "}
            <Link
              href="/privacy"
              className="text-violet-700 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-200"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            If you do not agree with these Terms, please do not use the
            website or its tools.
          </p>
        </section>

        {/* Tools */}
        <section
          id="tools-and-results"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-foreground">
            Tools and Results
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-foreground-secondary leading-7">
            <p>
              {siteName} provides online tools for tasks such as file
              processing, calculations, conversions, image and PDF operations,
              QR code generation, date and time calculations, and other
              utilities.
            </p>

            <p>
              Results are generated from the information, settings, and files
              provided by the user and from the functionality available at
              the time the tool is used.
            </p>

            <p>
              You are responsible for reviewing important results before
              relying on them for financial, legal, business, technical, or
              other consequential decisions.
            </p>

            <p>
              We may improve, modify, replace, limit, or discontinue
              individual tools or features as the service develops.
            </p>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Eligibility
          </h2>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            You must have the legal capacity required by applicable law to
            use the website and agree to these Terms. If you use {siteName}
            on behalf of an organization, you represent that you have
            authority to accept these Terms on its behalf.
          </p>
        </section>

        {/* Permitted */}
        <section id="permitted-use" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Permitted Use
          </h2>

          <ul className="mt-4 max-w-4xl space-y-3 text-foreground-secondary leading-7">
            <li>
              • Use the website and tools only for lawful purposes.
            </li>
            <li>
              • Use tools according to their intended functionality.
            </li>
            <li>
              • Respect applicable laws and the rights of other people and
              organizations.
            </li>
            <li>
              • Review important outputs before relying on them.
            </li>
          </ul>
        </section>

        {/* Prohibited */}
        <section id="prohibited-use" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Prohibited Use
          </h2>

          <ul className="mt-4 max-w-4xl space-y-3 text-foreground-secondary leading-7">
            <li>
              • Do not attempt unauthorized access to the website,
              infrastructure, accounts, or data.
            </li>

            <li>
              • Do not upload malicious software, viruses, or intentionally
              harmful content.
            </li>

            <li>
              • Do not interfere with the availability, security, or
              performance of the website.
            </li>

            <li>
              • Do not use automated methods to abuse, overload, or disrupt
              our services.
            </li>

            <li>
              • Do not use the service for fraud, unlawful activity, or
              infringement of another person's rights.
            </li>

            <li>
              • Do not impersonate another person, organization, or service.
            </li>

            <li>
              • Do not attempt to reverse engineer or bypass technical
              restrictions except where such activity cannot legally be
              restricted.
            </li>
          </ul>
        </section>

        {/* Files */}
        <section
          id="files-and-user-content"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-foreground">
            Files and User Content
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-foreground-secondary leading-7">
            <p>
              You retain ownership of files and other content that you own and
              provide to an Atoolix tool.
            </p>

            <p>
              Files and content are processed only as necessary to provide
              the relevant tool or service, subject to the processing method
              used by that tool.
            </p>

            <p>
              Some Atoolix tools process files directly in your browser. When
              a tool operates entirely through client-side processing, the
              file does not need to be uploaded to Atoolix servers.
            </p>

            <p>
              You are responsible for ensuring that you have the necessary
              rights and permissions to process any file or content you
              provide.
            </p>

            <p>
              Do not use the service to process content that you are not
              legally permitted to possess, modify, transmit, or otherwise
              process.
            </p>
          </div>
        </section>

        {/* IP */}
        <section
          id="intellectual-property"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-foreground">
            Intellectual Property
          </h2>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            The Atoolix name, branding, website design, original text,
            software, interfaces, logos, and other site materials are owned
            by {siteName} or its licensors and are protected by applicable
            intellectual property laws.
          </p>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            You may use the website and tools for their intended purposes, but
            you may not copy, reproduce, redistribute, mirror, sell, or create
            derivative versions of our proprietary website materials without
            permission, except where permitted by applicable law.
          </p>
        </section>

        {/* Third Party */}
        <section
          id="third-party-services"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-foreground">
            Third-Party Services
          </h2>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            The website may use or link to third-party services. Third-party
            services operate under their own terms and privacy policies.
          </p>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            We are not responsible for third-party websites, services,
            content, availability, or policies that are outside our control.
          </p>
        </section>

        {/* Disclaimer */}
        <section id="disclaimer" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Disclaimer of Warranties
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-foreground-secondary leading-7">
            <p>
              The website and tools are provided on an “as is” and “as
              available” basis to the maximum extent permitted by applicable
              law.
            </p>

            <p>
              We do not guarantee that the website or any particular tool
              will always be available, uninterrupted, error-free, secure, or
              completely accurate.
            </p>

            <p>
              You should independently verify important outputs before using
              them for decisions that could result in financial, legal,
              technical, business, or other significant consequences.
            </p>
          </div>
        </section>

        {/* Liability */}
        <section id="liability" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Limitation of Liability
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-foreground-secondary leading-7">
            <p>
              To the maximum extent permitted by applicable law, {siteName}
              and its owners, operators, employees, contractors, and service
              providers will not be liable for indirect, incidental,
              consequential, special, or punitive damages arising from your
              use of or inability to use the website.
            </p>

            <p>
              This may include loss of data, business interruption, lost
              profits, or other indirect losses, subject to applicable law.
            </p>

            <p>
              Nothing in these Terms is intended to exclude liability that
              cannot legally be excluded or limited.
            </p>
          </div>
        </section>

        {/* Indemnity */}
        <section id="indemnity" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Indemnity
          </h2>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            To the extent permitted by applicable law, you agree to
            indemnify and hold harmless {siteName} and its related parties
            from claims, losses, liabilities, damages, and reasonable
            expenses arising from your unlawful use of the website, your
            violation of these Terms, or your infringement of another
            person's rights.
          </p>
        </section>

        {/* Termination */}
        <section id="termination" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Suspension and Termination
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-foreground-secondary leading-7">
            <p>
              We may restrict, suspend, or terminate access to the website or
              individual tools if necessary to protect the service, users,
              infrastructure, or third-party rights, or where these Terms are
              violated.
            </p>

            <p>
              We may also modify or discontinue tools and features as the
              service evolves.
            </p>
          </div>
        </section>

        {/* Changes */}
        <section id="changes" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Changes to Terms
          </h2>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            We may update these Terms when our services, tools, business
            practices, or legal requirements change. The updated version will
            be posted on this page with a revised “Last updated” date.
          </p>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            Your continued use of the website after an updated version is
            posted constitutes acceptance of the revised Terms to the extent
            permitted by applicable law.
          </p>
        </section>

        {/* Governing law */}
        <section
          id="governing-law"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-foreground">
            Governing Law
          </h2>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            These Terms are governed by the laws applicable to {siteName},
            subject to any mandatory consumer protection or other legal
            requirements that apply to you in your jurisdiction.
          </p>

          <p className="mt-4 max-w-4xl text-foreground-secondary leading-7">
            Any disputes will be handled by the courts or dispute-resolution
            mechanisms having appropriate jurisdiction, subject to applicable
            law.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Contact Us
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-foreground-secondary leading-7">
            <p>
              If you have questions about these Terms, contact us at{" "}
              <a
                href="mailto:support@atoolix.com"
                className="text-violet-700 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-200"
              >
                support@atoolix.com
              </a>
              .
            </p>

            <p>
              You can also visit our{" "}
              <Link
                href="/contact"
                className="text-violet-700 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-200"
              >
                Contact page
              </Link>{" "}
              for general questions or support.
            </p>
          </div>
        </section>

        {/* Related policies */}
        <section className="mt-10 mb-16 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Related Policies
          </h2>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="/privacy"
              className="text-violet-700 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-200"
            >
              Privacy Policy
            </Link>

            <Link
              href="/contact"
              className="text-violet-700 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-200"
            >
              Contact Us
            </Link>

            <Link
              href="/"
              className="text-violet-700 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-200"
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