import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl ?? "https://atoolix.com";
const updatedAt = new Date("2026-07-28T00:00:00Z");

export const metadata: Metadata = {
  title: `Contact ${siteName}`,
  description:
    `Get in touch with ${siteName} for support, feedback, partnerships, and tool requests.`,
  alternates: {
    canonical: `${serverConfig.siteUrl}/contact`,
  },
  openGraph: {
    title: `Contact ${siteName}`,
    description:
      `Contact ${siteName} for support, feedback, partnerships, and tool requests.`,
    url:  `${serverConfig.siteUrl}/contact`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${siteName}`,
    description:
      `Contact ${siteName} for support, feedback, partnerships, and tool requests.`,
  },
};

const contactOptions = [
  {
    title: "Support",
    description: "Need help with a tool, upload issue, or browser problem?",
    value: `support@${siteName}.com`,
    href: `mailto:support@${siteName}.com`,
  },
  {
    title: "General inquiries",
    description: "For general questions, product feedback, or suggestions.",
    value: `support@${siteName}.com`,
    href: `mailto:support@${siteName}.com`,
  },
  {
    title: "Partnerships",
    description: "For business inquiries, collaborations, or integrations.",
    value: `support@${siteName}.com`,
    href: `mailto:support@${siteName}.com`,
  },
];

const reasons = [
  "Tool support",
  "Feature requests",
  "Bug reports",
  "Partnerships",
  "Product feedback",
  "New tool ideas",
];

export default function ContactPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
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
              "@type": "ContactPage",
              name: `Contact ${siteName}`,
              description: `Get in touch with ${siteName} for support, feedback, partnerships, and tool requests.`,
              url: `${siteUrl}/contact`,
              alternates: {
                canonical: `${serverConfig.siteUrl}/contact`,
              },
              inLanguage: "en",
            }).replace(/</g, "\\u003c"),
          }}
        />

        <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            Contact {siteName} • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Contact {siteName}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            Reach out for support, feature requests, partnerships, or tool ideas. We try to keep communication simple and
            easy to follow so you can get help quickly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Support</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Feedback</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Partnerships</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Tool requests</span>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">How to reach us</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {contactOptions.map((item) => (
              <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{item.description}</p>
                <a
                  href={item.href}
                  className="mt-4 inline-flex text-sm font-medium text-violet-300 transition hover:text-violet-200"
                >
                  {item.value}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">What you can contact us about</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="rounded-3xl border border-white/10 bg-slate-950/30 px-5 py-4 text-sm text-zinc-300"
              >
                {reason}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">Before you write</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              If you are reporting a problem, please include the tool name, what you expected, what happened, and the browser
              or device you were using.
            </p>
            <p>
              If you are suggesting a new tool, tell us what it should do and why it would be useful. That helps us plan future
              updates more effectively.
            </p>
            <p>
              For privacy reasons, avoid sending sensitive information unless it is absolutely necessary for support.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-white">Quick links</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              About page
            </Link>
            <Link
              href="/tools/calculator/emi-calculator"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              EMI Calculator
            </Link>
            <Link
              href="/tools/pdf/merge-pdf"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              PDF Merge
            </Link>
            <Link
              href="/tools/image/compress-image"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Image Compressor
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}