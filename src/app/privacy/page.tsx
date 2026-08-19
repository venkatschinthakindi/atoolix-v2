import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl ?? "https://atoolix.com";
const privacyUrl = `${siteUrl}/privacy`;

const updatedAt = new Date("2026-08-19T00:00:00Z");

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteName}`,
  description: `Learn how ${siteName} handles personal information, files, cookies, analytics, and privacy when you use our online tools.`,
  alternates: {
    canonical: privacyUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Privacy Policy | ${siteName}`,
    description: `Learn how ${siteName} handles personal information, files, cookies, analytics, and privacy when you use our online tools.`,
    url: privacyUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${siteName}`,
    description: `Learn how ${siteName} handles personal information, files, cookies, analytics, and privacy when you use our online tools.`,
  },
};

const sections = [
  { id: "summary", title: "Summary" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-information", title: "How We Use Information" },
  { id: "files-and-processing", title: "Files and Tool Processing" },
  { id: "cookies-and-analytics", title: "Cookies and Analytics" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "data-retention", title: "Data Retention" },
  { id: "data-security", title: "Data Security" },
  { id: "privacy-by-design", title: "Privacy by Design" },
  { id: "children", title: "Children's Privacy" },
  { id: "your-rights", title: "Your Privacy Rights" },
  { id: "international-users", title: "International Users" },
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

  const isoUpdatedAt = updatedAt.toISOString();

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
        "@id": `${privacyUrl}#webpage`,
        url: privacyUrl,
        name: `Privacy Policy | ${siteName}`,
        description: `Learn how ${siteName} handles personal information, files, cookies, analytics, and privacy when you use our online tools.`,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#organization`,
        },
        dateModified: isoUpdatedAt,
        inLanguage: "en",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        publisher: {
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
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        {/* Header */}
        <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            Privacy Policy • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Privacy Policy | {siteName}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            We built {siteName} to provide useful online tools while keeping
            privacy clear and understandable. This policy explains what
            information we collect, how we use it, and how files are handled
            when you use our tools.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Plain language
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Privacy focused
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Browser-based tools
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Updated regularly
            </span>
          </div>
        </section>

        {/* Contents */}
        <nav
          aria-label="On this page"
          className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-lg font-semibold text-white">
            On this page
          </h2>

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

        {/* Summary */}
        <section id="summary" className="scroll-mt-24 py-2">
          <h2 className="text-3xl font-semibold text-white">Summary</h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              {siteName} provides free online tools for tasks such as working
              with PDFs, images, files, dates, time zones, QR codes,
              calculations, and other everyday tasks.
            </p>

            <p>
              We aim to collect only the information needed to operate,
              secure, maintain, and improve the website and to respond to
              users who contact us.
            </p>

            <p>
              Many of our tools are designed to process content directly in
              your browser. When a tool performs processing entirely on your
              device, the file does not need to be uploaded to our servers.
            </p>

            <p>
              Because different tools can work differently, the relevant tool
              page should be considered the best source for tool-specific
              processing information.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section
          id="information-we-collect"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-white">
            Information We Collect
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <h3 className="text-xl font-medium text-white">
              Information you provide
            </h3>

            <p>
              If you contact us, we may receive information such as your name,
              email address, and the contents of your message.
            </p>

            <h3 className="pt-2 text-xl font-medium text-white">
              Technical information
            </h3>

            <p>
              Our website or service providers may process technical
              information such as browser type, device information, IP
              address, approximate location, pages visited, referring pages,
              and information about how the website is used.
            </p>

            <p>
              The exact information collected depends on the technologies
              enabled on the website, including analytics, security,
              hosting, and other operational services.
            </p>
          </div>
        </section>

        {/* How We Use Information */}
        <section
          id="how-we-use-information"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-white">
            How We Use Information
          </h2>

          <ul className="mt-4 max-w-4xl space-y-3 text-zinc-300 leading-7">
            <li>• To provide and operate our website and tools.</li>
            <li>• To respond to questions and support requests.</li>
            <li>• To maintain website security and prevent abuse.</li>
            <li>• To diagnose errors and technical problems.</li>
            <li>• To understand website usage and improve our tools.</li>
            <li>• To maintain and improve website performance.</li>
            <li>• To comply with applicable legal obligations.</li>
          </ul>

          <p className="mt-5 max-w-4xl text-zinc-300 leading-7">
            We do not use personal information for purposes that are
            incompatible with the purposes described in this policy without
            providing appropriate notice where required.
          </p>
        </section>

        {/* Files */}
        <section
          id="files-and-processing"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-white">
            Files and Tool Processing
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              Privacy handling can differ between tools. We therefore
              distinguish between browser-based processing and server-side
              processing.
            </p>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
              <h3 className="font-semibold text-emerald-200">
                Browser-based processing
              </h3>

              <p className="mt-2">
                When a tool is designed to process a file locally in your
                browser, the file can be processed on your device without
                being uploaded to an Atoolix server.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
              <h3 className="font-semibold text-amber-200">
                Server-side processing
              </h3>

              <p className="mt-2">
                Some tools or features may require server-side processing.
                Where applicable, the relevant tool page should explain the
                processing method, storage, and deletion practices.
              </p>
            </div>

            <p>
              Please review the information displayed on a specific tool page
              before processing highly sensitive files.
            </p>
          </div>
        </section>

        {/* Cookies */}
        <section
          id="cookies-and-analytics"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-white">
            Cookies and Analytics
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We may use cookies, local storage, or similar technologies to
              provide functionality, remember preferences, maintain security,
              measure website performance, or understand how our tools are
              used.
            </p>

            <p>
              Where third-party analytics or advertising technologies are
              enabled, those providers may process information according to
              their own privacy policies and applicable settings.
            </p>

            <p>
              Browser settings can also be used to restrict or delete cookies
              and other locally stored information. Some website features may
              not function correctly if certain technologies are disabled.
            </p>
          </div>
        </section>

        {/* Third Party */}
        <section
          id="third-party-services"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-white">
            Third-Party Services
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We may rely on third-party providers for services such as
              hosting, infrastructure, security, analytics, email delivery,
              monitoring, or other technical operations.
            </p>

            <p>
              Depending on the service, these providers may process limited
              technical or personal information on our behalf.
            </p>

            <p>
              We expect third-party providers used by the service to handle
              information according to their applicable privacy and security
              practices.
            </p>

            <p>
              Where a specific third-party service materially affects how your
              information is processed, we aim to identify it in the relevant
              site or tool documentation.
            </p>
          </div>
        </section>

        {/* Retention */}
        <section id="data-retention" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Data Retention
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We retain personal information only for as long as reasonably
              necessary for the purpose for which it was collected, including
              responding to requests, maintaining security, resolving
              disputes, and meeting legal obligations.
            </p>

            <p>
              Files processed by our tools are handled according to the
              processing model of the individual tool.
            </p>

            <p>
              Files processed entirely in the browser are not stored on our
              servers as part of that browser-based processing.
            </p>
          </div>
        </section>

        {/* Security */}
        <section id="data-security" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Data Security
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We use reasonable technical and organizational measures designed
              to protect information against unauthorized access, misuse,
              alteration, disclosure, or loss.
            </p>

            <p>
              We also design eligible browser-based tools to minimize
              unnecessary transmission of user files.
            </p>

            <p>
              No website, network, storage system, or method of transmission
              can be guaranteed to be completely secure.
            </p>
          </div>
        </section>

        {/* Privacy by Design */}
        <section
          id="privacy-by-design"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-white">
            Privacy by Design
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              Privacy is considered when we design and improve our tools.
              Where technically practical, we prefer browser-based processing
              so that files can remain on the user's device.
            </p>

            <p>
              This approach can reduce unnecessary server transmission and
              give users more control over files they process.
            </p>

            <p>
              However, not every Atoolix tool necessarily uses the same
              processing architecture. Always check the individual tool's
              privacy information for details.
            </p>
          </div>
        </section>

        {/* Children */}
        <section id="children" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Children&apos;s Privacy
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              Our services are intended for general audiences and are not
              specifically directed to children.
            </p>

            <p>
              We do not knowingly request personal information from children
              for purposes that are prohibited by applicable law.
            </p>

            <p>
              If you believe that a child has provided personal information to
              us, please contact us so we can review the situation and take
              appropriate action where required.
            </p>
          </div>
        </section>

        {/* Rights */}
        <section
          id="your-rights"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-white">
            Your Privacy Rights
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              Depending on where you live and which privacy laws apply, you
              may have rights relating to your personal information.
            </p>

            <p>
              These may include rights to access, correct, delete, restrict,
              object to, or otherwise control certain processing of your
              personal information.
            </p>

            <p>
              You may contact us to ask about information associated with
              your interactions with Atoolix or to make a privacy-related
              request.
            </p>

            <p>
              We may need to verify your identity before completing certain
              requests in order to protect your information.
            </p>
          </div>
        </section>

        {/* International */}
        <section
          id="international-users"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-white">
            International Users
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              Atoolix may be accessible to users in different countries.
              Privacy and data protection requirements can differ depending
              on where you live.
            </p>

            <p>
              We aim to handle personal information in accordance with
              applicable privacy and data protection requirements.
            </p>

            <p>
              Users located in jurisdictions with specific privacy rights may
              contact us to exercise rights available to them under applicable
              law.
            </p>
          </div>
        </section>

        {/* Changes */}
        <section id="changes" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Changes to This Policy
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We may update this Privacy Policy when our services, tools,
              technologies, or legal obligations change.
            </p>

            <p>
              When we make changes, we will update the “Last updated” date at
              the top of this page.
            </p>

            <p>
              We encourage you to review this page periodically to understand
              how information is handled.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Contact Us
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              If you have questions about this Privacy Policy, our tools, or
              how your information is handled, contact us at{" "}
              <a
                href="mailto:support@atoolix.com"
                className="text-violet-300 hover:text-violet-200"
              >
                support@atoolix.com
              </a>
              .
            </p>

            <p>
              You can also visit our{" "}
              <Link
                href="/contact"
                className="text-violet-300 hover:text-violet-200"
              >
                Contact page
              </Link>{" "}
              for general questions and support.
            </p>
          </div>
        </section>

        {/* Related policies */}
        <section className="mt-8 mb-16 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            Related Information
          </h2>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="/terms"
              className="text-violet-300 hover:text-violet-200"
            >
              Terms of Service
            </Link>

            <Link
              href="/contact"
              className="text-violet-300 hover:text-violet-200"
            >
              Contact Atoolix
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