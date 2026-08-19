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
    `${siteName} is a growing platform for finance tools, PDF tools, image tools, and everyday utilities. Fast, private, browser-based, and built to expand.`,
  alternates: {
    canonical: aboutUrl,
  },
  openGraph: {
    title: `About ${siteName}`,
    description:
      `${siteName} is a growing platform for finance tools, PDF tools, image tools, and everyday utilities.`,
    url: aboutUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteName}`,
    description:
      `${siteName} is a growing platform for finance tools, PDF tools, image tools, and everyday utilities.`,
  },
};

const features = [
  {
    title: "Finance tools",
    description:
      "Use practical calculators for EMI, ROI, FD, retirement planning, and more.",
  },
  {
    title: "Image tools",
    description:
      "Compress, resize, and convert images for uploads, forms, and web use.",
  },
  {
    title: "PDF tools",
    description:
      "Merge, split, compress, and convert PDF files without installing software.",
  },
  {
    title: "Built to grow",
    description:
      `${siteName} is designed to expand, so new tools and categories can be added over time.`,
  },
];

const quickLinks = [
  {
    href: "/tools/calculator/emi-calculator",
    label: "EMI Calculator",
  },
  {
    href: "/tools/calculator/roi-calculator",
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

export default function AboutPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(updatedAt);

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteName}`,
    description:
      `${siteName} is a growing platform for finance tools, PDF tools, image tools, and everyday utilities.`,
    url: aboutUrl,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <div className="app-shell px-10 pt-30">
      <FloatingDock />

      <div className="app-container page-section pt-2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(aboutPageSchema).replace(/</g, "\\u003c"),
          }}
        />

        <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            About {siteName} • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            About {siteName}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            {siteName} is a growing collection of fast, simple, and useful
            online tools built to make everyday tasks easier. We started with
            finance calculators and practical utility tools, and the platform
            is designed to expand into more categories like image and PDF tools
            over time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Fast
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Private
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Browser-based
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Extensible
            </span>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">What we do</h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            {siteName} brings practical tools together in one place so you can
            calculate, convert, compress, and prepare files without unnecessary
            complexity. The goal is to keep the experience clean and fast while
            building a platform that can grow with new tools later.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            Why {siteName}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            What’s available now
          </h2>

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

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            Designed to expand
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            The site is intentionally extensible, so more tools can be added
            in the future without changing the core experience. That makes{" "}
            {siteName} a strong base for future categories such as more finance
            utilities, image tools, PDF tools, and other everyday productivity
            features.
          </p>
        </section>

        {/* Third-party recognition and reviews */}
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

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">
            Start exploring
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            Use the tools that are live today and come back as the platform
            grows.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}