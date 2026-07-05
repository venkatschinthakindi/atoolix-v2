import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import FloatingDockLoader from "@/components/layout/floatingDockLoader";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const updatedAt = new Date("2026-06-28T00:00:00Z");

export const metadata: Metadata = {
  title: `About ${siteName}`,
  description:
    `${siteName} is a growing platform for finance tools, PDF tools, image tools, and everyday utilities. Fast, private, browser-based, and built to expand.`,
  alternates: {
    canonical: `${serverConfig.siteUrl}/about`,
  },
  openGraph: {
    title: `About ${siteName}`,
    description:
      `${siteName} is a growing platform for finance tools, PDF tools, image tools, and everyday utilities.`,
    url: `${serverConfig.siteUrl}/about`,
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
      "Atoolverse is designed to expand, so new tools and categories can be added over time.",
  },
];

const quickLinks = [
  { href: "/tools/calculator/emi-calculator", label: "EMI Calculator" },
  { href: "/tools/calculator/roi-calculator", label: "ROI Calculator" },
  { href: "/tools/pdf/merge-pdf", label: "PDF Merge" },
  { href: "/tools/image/compress-image", label: "Image Compressor" },
];

export default function AboutPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(updatedAt);

  return (
    <div className="app-shell px-10 pt-30">
      <FloatingDockLoader />

      <div className="app-container page-section pt-2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: `About ${siteName}`,
              description: `${siteName} is a growing platform for finance tools, PDF tools, image tools, and everyday utilities.`,
              url: `${serverConfig.siteUrl}/about`,
              inLanguage: "en",
              alternates: {
                canonical: `${serverConfig.siteUrl}/about`,
              },
            }).replace(/</g, "\\u003c"),
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
            {siteName} is a growing collection of fast, simple, and useful online tools built to make everyday tasks easier.
            We started with finance calculators and practical utility tools, and the platform is designed to expand into more
            categories like image and PDF tools over time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Fast</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Private</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Browser-based</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Extensible</span>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">What we do</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            Atoolverse brings practical tools together in one place so you can calculate, convert, compress, and prepare files
            without unnecessary complexity. The goal is to keep the experience clean and fast while building a platform that can grow
            with new tools later.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">Why Atoolverse</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">What’s available now</h2>
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
          <h2 className="text-3xl font-semibold text-white">Designed to expand</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            The site is intentionally extensible, so more tools can be added in the future without changing the core experience.
            That makes Atoolverse a strong base for future categories such as more finance utilities, image tools, PDF tools, and
            other everyday productivity features.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">Start exploring</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            Use the tools that are live today and come back as the platform grows.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}