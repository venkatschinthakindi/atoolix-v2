import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl ?? "https://atoolix.com";
const supportEmail = "support@atoolix.com";

const updatedAt = new Date("2026-08-19T00:00:00Z");

export const metadata: Metadata = {
  title: `Contact ${siteName}`,
  description:
    `Contact ${siteName} for tool support, feedback, bug reports, feature requests, partnerships, and general questions.`,
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: `Contact ${siteName}`,
    description:
      `Contact ${siteName} for tool support, feedback, bug reports, feature requests, partnerships, and general questions.`,
    url: `${siteUrl}/contact`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${siteName}`,
    description:
      `Contact ${siteName} for tool support, feedback, bug reports, feature requests, partnerships, and general questions.`,
  },
};

const contactOptions = [
  {
    title: "Support & feedback",
    description:
      "Need help with a tool, found a bug, or want to suggest an improvement?",
    value: supportEmail,
    href: `mailto:${supportEmail}`,
  },
  {
    title: "Partnerships & business",
    description:
      "For partnerships, collaborations, integrations, or other business inquiries.",
    value: supportEmail,
    href: `mailto:${supportEmail}`,
  },
];

const reasons = [
  "Tool support",
  "Bug reports",
  "Feature requests",
  "Product feedback",
  "New tool ideas",
  "Partnerships",
];

export default function ContactPage() {
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
        email: `mailto:${supportEmail}`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en",
      },
      {
        "@type": "ContactPage",
        "@id": `${siteUrl}/contact#webpage`,
        name: `Contact ${siteName}`,
        description:
          `Contact ${siteName} for tool support, feedback, bug reports, feature requests, partnerships, and general questions.`,
        url: `${siteUrl}/contact`,
        inLanguage: "en",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#organization`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <div className="app-shell px-4 pt-24 sm:px-6 lg:px-10">
      <FloatingDock />

      <div className="app-container page-section pt-2">
        {/* Structured data helps search engines understand the site,
            organization, website, and contact page. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        {/* Hero */}
        <section className="mb-12 rounded-3xl border border-border bg-card px-6 py-10 shadow-2xl backdrop-blur-xl sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-border bg-surface-raised px-3 py-1 text-xs font-medium text-foreground-secondary">
            Contact {siteName} • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Contact {siteName}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-foreground-secondary">
            Have a question about one of our tools, found a problem, or have
            an idea for something we should build? Get in touch with us.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-foreground-secondary">
            <span className="rounded-full border border-border bg-card px-3 py-1">
              Tool support
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1">
              Bug reports
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1">
              Feedback
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1">
              Partnerships
            </span>
          </div>
        </section>

        {/* Contact methods */}
        <section
          aria-labelledby="contact-methods"
          className="mb-14"
        >
          <h2
            id="contact-methods"
            className="text-3xl font-semibold text-foreground"
          >
            How to reach us
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-foreground-secondary">
            Email is the easiest way to contact us. Please describe the
            problem or request clearly so we can understand what you need.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {contactOptions.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-border bg-card p-6"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                  {item.description}
                </p>

                <a
                  href={item.href}
                  className="mt-5 inline-flex text-sm font-medium text-violet-700 dark:text-violet-300 transition hover:text-violet-800 dark:hover:text-violet-200"
                >
                  {item.value}
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* What users can contact about */}
        <section
          aria-labelledby="contact-reasons"
          className="mb-14"
        >
          <h2
            id="contact-reasons"
            className="text-3xl font-semibold text-foreground"
          >
            What can you contact us about?
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-foreground-secondary">
            We welcome useful feedback that helps us improve Atoolix and make
            the tools easier to use.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="rounded-3xl border border-border bg-surface-sunken px-5 py-4 text-sm text-foreground-secondary"
              >
                {reason}
              </div>
            ))}
          </div>
        </section>

        {/* Support information */}
        <section
          aria-labelledby="before-contact"
          className="mb-14"
        >
          <h2
            id="before-contact"
            className="text-3xl font-semibold text-foreground"
          >
            Before contacting us
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-foreground-secondary">
            <p>
              If you are reporting a problem, please include the name of the
              tool, what you were trying to do, what happened, and the browser
              or device you were using.
            </p>

            <p>
              If possible, include the exact error message or a screenshot
              that helps explain the problem. Please do not send passwords,
              payment information, or other unnecessary sensitive information.
            </p>

            <p>
              For feature requests, tell us what you would like the tool to
              do and how it would help you. Specific examples are especially
              useful.
            </p>
          </div>
        </section>

        {/* Privacy / file safety */}
        <section
          aria-labelledby="privacy-note"
          className="mb-14 rounded-3xl border border-border bg-card p-6 sm:p-8"
        >
          <h2
            id="privacy-note"
            className="text-2xl font-semibold text-foreground"
          >
            Privacy and file safety
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-foreground-secondary">
            Please avoid sending private files or sensitive personal
            information by email unless it is necessary for resolving your
            request. How a file is processed can vary by tool, so check the
            relevant tool page for its processing details before uploading
            sensitive content.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/privacy"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:bg-surface-raised"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:bg-surface-raised"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/disclaimer"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:bg-surface-raised"
            >
              Disclaimer
            </Link>
          </div>
        </section>

        {/* About / transparency */}
        <section
          aria-labelledby="about-atoolix"
          className="mb-14"
        >
          <h2
            id="about-atoolix"
            className="text-3xl font-semibold text-foreground"
          >
            About {siteName}
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-foreground-secondary">
            {siteName} provides browser-based utility tools for everyday
            tasks, including PDF, image, calculator, date and time, and other
            productivity tools. Our goal is to make common tasks easier
            without requiring users to install separate software whenever a
            browser-based solution is practical.
          </p>

          <div className="mt-6">
            <Link
              href="/about"
              className="inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface-raised"
            >
              Learn more about {siteName}
            </Link>
          </div>
        </section>

        {/* Quick links */}
        <section
          aria-labelledby="quick-links"
          className="mb-14"
        >
          <h2
            id="quick-links"
            className="text-3xl font-semibold text-foreground"
          >
            Explore {siteName}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/tools"
              className="rounded-3xl border border-border bg-card p-5 text-foreground transition hover:border-border-strong hover:bg-surface-raised"
            >
              <p className="text-sm font-semibold">All tools</p>
              <p className="mt-2 text-sm text-foreground-secondary">
                Browse the available online utilities.
              </p>
            </Link>

            <Link
              href="/tools/calculator/emi-calculator"
              className="rounded-3xl border border-border bg-card p-5 text-foreground transition hover:border-border-strong hover:bg-surface-raised"
            >
              <p className="text-sm font-semibold">EMI Calculator</p>
              <p className="mt-2 text-sm text-foreground-secondary">
                Estimate loan payments.
              </p>
            </Link>

            <Link
              href="/tools/pdf/merge-pdf"
              className="rounded-3xl border border-border bg-card p-5 text-foreground transition hover:border-border-strong hover:bg-surface-raised"
            >
              <p className="text-sm font-semibold">PDF Merge</p>
              <p className="mt-2 text-sm text-foreground-secondary">
                Combine PDF documents.
              </p>
            </Link>

            <Link
              href="/tools/image/compress-image"
              className="rounded-3xl border border-border bg-card p-5 text-foreground transition hover:border-border-strong hover:bg-surface-raised"
            >
              <p className="text-sm font-semibold">Image Compressor</p>
              <p className="mt-2 text-sm text-foreground-secondary">
                Reduce image file sizes.
              </p>
            </Link>
          </div>
        </section>

        {/* Legal links */}
        <section
          aria-labelledby="legal-information"
          className="mb-14"
        >
          <h2
            id="legal-information"
            className="text-3xl font-semibold text-foreground"
          >
            Site information
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-foreground-secondary">
            For information about how the website operates, how information is
            handled, and the terms that apply when using our services, please
            review the following pages.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:bg-surface-raised"
            >
              About
            </Link>

            <Link
              href="/privacy"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:bg-surface-raised"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:bg-surface-raised"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/disclaimer"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition hover:bg-surface-raised"
            >
              Disclaimer
            </Link>
          </div>
        </section>

        {/* Final contact CTA */}
        <section className="mb-14 rounded-3xl border border-violet-300 dark:border-violet-400/20 bg-violet-100 dark:bg-violet-500/10 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Have a question?
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-foreground-secondary">
            Send us a message at{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="font-medium text-violet-700 dark:text-violet-300 underline underline-offset-4 hover:text-violet-800 dark:hover:text-violet-200"
            >
              {supportEmail}
            </a>
            . We appreciate clear feedback and suggestions that help make
            {` ${siteName}`} better.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}