import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");
const updatedAt = new Date("2026-08-19T00:00:00Z");

const aboutUrl = `${siteUrl}/about`;

export const metadata: Metadata = {
  title: `About ${siteName}`,
  description:
    `${siteName} provides browser-based finance calculators, PDF tools, image tools, file utilities, and everyday productivity tools designed to make common tasks simpler.`,
  alternates: {
    canonical: aboutUrl,
  },
  openGraph: {
    title: `About ${siteName}`,
    description:
      `${siteName} provides browser-based finance calculators, PDF tools, image tools, file utilities, and everyday productivity tools.`,
    url: aboutUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteName}`,
    description:
      `${siteName} provides browser-based finance calculators, PDF tools, image tools, file utilities, and everyday productivity tools.`,
  },
};

const categories = [
  {
    title: "Finance calculators",
    description:
      "Calculators for common financial estimates such as EMI, ROI, fixed deposits, SIP returns, and retirement planning.",
    href: "/calculator",
  },
  {
    title: "PDF tools",
    description:
      "Browser-based tools for merging, splitting, compressing, and converting supported PDF files.",
    href: "/tools/pdf",
  },
  {
    title: "Image tools",
    description:
      "Tools for compressing, resizing, converting, and preparing images for websites, forms, and uploads.",
    href: "/tools/image",
  },
  {
    title: "Privacy and file tools",
    description:
      "Utilities that help users inspect file properties and understand information associated with files before sharing them.",
    href: "/tools/privacysecurity",
  },
  {
    title: "Date and time tools",
    description:
      "Utilities for time-zone conversion and coordinating times across different locations.",
    href: "/tools/datetime",
  },
  {
    title: "Everyday utilities",
    description:
      "Practical calculators, converters, QR tools, and other utilities for common digital tasks.",
    href: "/tools",
  },
];

const quickLinks = [
  {
    href: "/tools/calculator/emi-calculator",
    label: "EMI Calculator",
    description: "Estimate monthly loan payments.",
  },
  {
    href: "/tools/calculator/sip-calculator",
    label: "SIP Calculator",
    description: "Estimate investment returns.",
  },
  {
    href: "/tools/calculator/fd-calculator",
    label: "FD Calculator",
    description: "Estimate fixed-deposit maturity values.",
  },
  {
    href: "/tools/calculator/retirement-calculator",
    label: "Retirement Calculator",
    description: "Explore retirement savings scenarios.",
  },
  {
    href: "/tools/pdf/merge-pdf",
    label: "PDF Merge",
    description: "Combine multiple PDF files.",
  },
  {
    href: "/tools/pdf/split-pdf",
    label: "PDF Split",
    description: "Extract selected PDF pages.",
  },
  {
    href: "/tools/pdf/compress-pdf",
    label: "PDF Compressor",
    description: "Reduce PDF file size.",
  },
  {
    href: "/tools/image/compress-image",
    label: "Image Compressor",
    description: "Reduce image file size.",
  },
  {
    href: "/tools/image/passport-photo-resizer",
    label: "Passport Photo Resizer",
    description: "Prepare photos for specified dimensions.",
  },
  {
    href: "/tools/image/resize-signature-for-upload",
    label: "Signature Resizer",
    description: "Resize signatures for upload requirements.",
  },
  {
    href: "/tools/datetime/timezone-converter",
    label: "Time Zone Converter",
    description: "Convert times between locations.",
  },
  {
    href: "/tools/qrcode/qr-code-generator",
    label: "QR Code Generator",
    description: "Create QR codes for common uses.",
  },
];

export default function AboutPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(updatedAt);

  const organizationId = `${siteUrl}/#organization`;
  const founderId = `${siteUrl}/#founder-venkatesh`;

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": aboutUrl,
    name: `About ${siteName}`,
    description:
      `${siteName} provides browser-based finance calculators, PDF tools, image tools, file utilities, and everyday productivity tools.`,
    url: aboutUrl,
    inLanguage: "en",
    dateModified: updatedAt.toISOString(),
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
    },
    about: {
      "@id": organizationId,
    },
    mainEntity: {
      "@id": organizationId,
    },
  };

  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderId,
    name: "Venkatesh",
    jobTitle: "Founder & Operator",
    worksFor: {
      "@id": organizationId,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    legalName: "Thrinetra Tech",
    url: siteUrl,
    description:
      `${siteName} provides browser-based finance calculators, PDF tools, image tools, file utilities, and everyday productivity tools.`,
    email: `support@${siteName}.com`,
    founder: {
      "@id": founderId,
    },
    employee: {
      "@id": founderId,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: `support@${siteName}.com`,
      url: `${siteUrl}/contact`,
    },
  };

  return (
    <div className="app-shell px-4 pt-24 sm:px-6 lg:px-10">
      <FloatingDock />

      <div className="app-container page-section pt-2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              aboutPageSchema,
              organizationSchema,
              founderSchema,
            ]).replace(/</g, "\\u003c"),
          }}
        />

        {/* Hero */}
        <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-2xl backdrop-blur-xl sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            About {siteName} • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            About {siteName}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            {siteName} is a browser-based utility platform that brings
            practical calculators, file tools, image tools, and everyday
            utilities together in one place.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
            Our goal is straightforward: make common digital tasks easier to
            complete without requiring users to install separate software for
            every small job.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Browser-based
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Practical tools
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Simple workflows
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Regularly improved
            </span>
          </div>
        </section>

        {/* Who we are */}
        <section className="mb-14" aria-labelledby="who-we-are-heading">
          <h2 id="who-we-are-heading" className="text-3xl font-semibold text-white">
            Who we are
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              {siteName} is an independent online utility platform focused on
              practical tools for everyday digital tasks.
            </p>

            <p>
              The platform brings several categories together, including
              finance calculators, PDF utilities, image processing tools,
              file-related utilities, date and time tools, and other
              productivity features.
            </p>

            <p>
              We aim to make each tool understandable and useful on its own,
              rather than requiring users to learn complicated software for
              simple tasks.
            </p>

            <p>
              {siteName} is built and operated by{" "}
              <strong className="font-semibold text-white">Venkatesh</strong>,
              based in Hyderabad, Telangana, India, through the operating
              entity{" "}
              <a
                href="https://www.thrinetratech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-violet-300 underline underline-offset-4 hover:text-violet-200"
              >
                Thrinetra Tech
              </a>
              . Venkatesh is responsible for the calculators and tools
              published on this site, including reviewing the formulas and
              worked examples used on each calculator page for accuracy. You
              can reach the team directly at{" "}
              <a
                href={`mailto:support@${siteName}.com`}
                className="font-medium text-violet-300 underline underline-offset-4 hover:text-violet-200"
              >
                support@{siteName}.com
              </a>
              , or see full contact and operator details in the site footer.
            </p>
          </div>
        </section>

        {/* What we do */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            What {siteName} does
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            The platform provides tools for calculations, document handling,
            image preparation, conversions, and other common online tasks.
            Available tools can change as the platform is updated.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
              >
                <h3 className="text-xl font-semibold text-white">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {category.description}
                </p>

                <span className="mt-5 inline-flex text-sm font-medium text-violet-300">
                  Explore tools →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* How tools work */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            How our tools work
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold tracking-wide text-violet-300">
                01
              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">
                Choose a tool
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Select the calculator, converter, document tool, image tool,
                or other utility that matches your task.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold tracking-wide text-violet-300">
                02
              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">
                Enter information
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Depending on the tool, enter values or select a file and
                configure the available options.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold tracking-wide text-violet-300">
                03
              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">
                Review the result
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Review the generated calculation or file before using it for
                your intended purpose.
              </p>
            </article>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            Privacy and file handling
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              Where technically possible, some file-processing tools are
              designed to perform processing directly in the browser rather
              than sending the file to a server.
            </p>

            <p>
              File handling can differ between tools. Users should check the
              specific tool page and our Privacy Policy before processing
              confidential or sensitive information.
            </p>

            <p>
              We do not describe a tool as browser-only or server-free unless
              that behavior is actually supported by the implementation.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/privacy"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Read Privacy Policy
            </Link>

            <Link
              href="/documentation"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Read Documentation
            </Link>
          </div>
        </section>

        {/* Accuracy */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            Accuracy and responsible use
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              Our tools are designed to provide useful calculations,
              conversions, and file-processing results, but outputs can depend
              on the information supplied, selected settings, supported file
              formats, and the implementation of the individual tool.
            </p>

            <p>
              Financial calculators are intended for estimates and educational
              planning rather than financial advice. Important decisions
              should be independently verified and, where appropriate,
              discussed with a qualified professional.
            </p>

            <p>
              Similarly, generated files and converted documents should be
              reviewed before being submitted to an official service,
              institution, employer, school, bank, or government portal.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/disclaimer"
              className="text-sm font-medium text-violet-300 underline underline-offset-4"
            >
              Read the full Disclaimer
            </Link>
          </div>
        </section>

        {/* Transparency */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            Transparency
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              We aim to describe our tools according to what they actually do.
              Tool availability, supported formats, processing methods, and
              features may change as the platform develops.
            </p>

            <p>
              We do not guarantee that every calculation, conversion, or
              generated file will be suitable for every situation. Users
              should review important results before relying on them.
            </p>

            <p>
              Our legal and policy pages explain additional information about
              website use, privacy, limitations, and contact methods.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/terms"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Terms
            </Link>

            <Link
              href="/privacy"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Privacy
            </Link>

            <Link
              href="/disclaimer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Disclaimer
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </section>

        {/* Available tools */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            Available tools
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            The following tools are currently available. This list may change
            as new utilities are introduced and existing tools are improved.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-slate-950/30 p-5 text-white transition hover:border-white/20 hover:bg-slate-950/40"
              >
                <p className="text-sm font-semibold">
                  {item.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-14 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <h2 className="text-3xl font-semibold text-white">
            Contact {siteName}
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
            If you find a problem with a tool, have a feature suggestion, or
            want to discuss a partnership or other matter, you can contact us.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:support@${siteName}.com`}
              className="text-sm font-medium text-violet-300 underline underline-offset-4"
            >
              support@{siteName}.com
            </a>

            <Link
              href="/contact"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-white transition hover:bg-white/10"
            >
              Contact page
            </Link>
          </div>
        </section>

        {/* External listings */}
        <section
          className="mb-14 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
          aria-labelledby="recognition-heading"
        >
          <div className="max-w-3xl">
            <h2
              id="recognition-heading"
              className="text-3xl font-semibold text-white"
            >
              Recognition &amp; Reviews
            </h2>

            <p className="mt-4 leading-7 text-zinc-300">
              {siteName} is listed on independent product and software
              discovery platforms. You can learn more about the platform,
              explore its listings, and share your feedback on these services.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {/* SaaSHub */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
              <h3 className="text-lg font-semibold text-white">
                SaaSHub
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                View the {siteName} listing on SaaSHub.
              </p>

              <div className="mt-5 flex min-h-12 items-center">
                <a
                  href="https://www.saashub.com/atoolix-free-online-tools?utm_source=badge&utm_campaign=badge&utm_content=atoolix-free-online-tools&badge_variant=color&badge_kind=approved"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteName} on SaaSHub`}
                >
                  <img
                    src="https://cdn-b.saashub.com/img/badges/approved-color.png?v=1"
                    alt={`${siteName} SaaSHub Approved badge`}
                    width={150}
                    height={42}
                    loading="lazy"
                    decoding="async"
                    className="h-auto max-w-[150px]"
                  />
                </a>
              </div>
            </div>

            {/* Product Hunt */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
              <h3 className="text-lg font-semibold text-white">
                Product Hunt
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Visit {siteName} on Product Hunt and share your review.
              </p>

              <div className="mt-5 flex min-h-12 items-center">
               <a
                href="https://www.producthunt.com/products/atoolix?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-atoolix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteName} on producthunt`}
              >
                <img
                  alt="Atoolix - Free, privacy-first tools for PDFs, images, finance, time & more | Product Hunt"
                  width={150}
                  height={42}
                  loading="lazy"
                  decoding="async"
                  className="h-auto max-w-[150px]"
                  src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1218444&amp;theme=neutral&amp;t=1787153031342'
                />
              </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-14 rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:p-8">
          <h2 className="text-3xl font-semibold text-white">
            Explore {siteName}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
            Browse the available tools and choose the utility that fits your
            task.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/tools"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-zinc-200"
            >
              Browse all tools
            </Link>

            <Link
              href="/documentation"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
            >
              Read documentation
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}