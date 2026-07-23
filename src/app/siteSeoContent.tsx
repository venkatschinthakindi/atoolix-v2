import type { Metadata } from "next";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;

const TITLE = "Free Online Tools – PDF, Image, Calculator & Finance Tools";
const DESCRIPTION =
  "Free online PDF tools, image converters and compressors, calculators, EMI and finance tools. Fast, secure, no signup required.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${serverConfig.siteName}`,
  },
  description: DESCRIPTION,
  applicationName: serverConfig.siteName,
  alternates: {
    canonical: serverConfig.siteUrl,
  },
  authors: [{ name: serverConfig.siteName, url: serverConfig.siteUrl }],
  creator: serverConfig.siteName,
  publisher: serverConfig.siteName,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: serverConfig.siteUrl,
    siteName: serverConfig.siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${serverConfig.siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${serverConfig.siteName} - Free Online Tools`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${serverConfig.siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${serverConfig.siteName} - Free Online Tools`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const quickLinks = [
  { href: "/tools/image/compress-image", label: "Image Compressor" },
  { href: "/tools/image/passport-photo-resizer", label: "Passport Photo Resizer" },
  { href: "/tools/image/resize-signature-for-upload", label: "Signature Resizer" },
  { href: "/tools/pdf/merge-pdf", label: "PDF Merge" },
  { href: "/tools/date-time/timezone-converter", label: "Time Zone Converter" },
  { href: "/tools/calculator", label: "Percentage Calculator" },
  { href: "/tools/calculator/fd-calculator?category=fd", label: "Fixed Deposit Calculator" },
  { href: "/tools/calculator/retirement-calculator?category=retirement", label: "Retirement Calculator" },
  { href: "/tools/calculator/retirement-calculator?category=fire", label: "FIRE Calculator" },
];

const categories = [
  {
    title: "PDF Tools",
    description:
      "Merge, split, compress, convert, and manage PDF files quickly in your browser.",
    items: [
      { href: "/tools/pdf/merge-pdf", label: "PDF Merge" },
      { href: "/tools/pdf/split-pdf", label: "PDF Split" },
      { href: "/tools/pdf/compress-pdf", label: "PDF Compress" },
      { href: "/tools/image/image-to-pdf", label: "PDF Convert" },
    ],
  },
  {
    title: "Finance Calculators",
    description:
      "Use practical calculators for savings, interest, deposits, and planning.",
    items: [
      { href: "/tools/calculator/fd-calculator?category=compound", label: "Compound Interest" },
      { href: "/tools/calculator/fd-calculator?category=fd", label: "Fixed Deposit Calculator" },
      { href: "/tools/calculator/retirement-calculator", label: "Retirement Planning" },
      { href: "/tools/calculator/roi-calculator", label: "Investment Returns" }      
    ],
  },
  {
    title: "Math Tools",
    description:
      "Solve common math and percentage problems with simple inputs.",
    items: [
      { href: "/tools/calculator?category=percentage", label: "Percentage Calculator" },
      { href: "/tools/calculator?category=equation", label: "Equation Solver" },
      { href: "/tools/converter", label: "Unit Conversion" },
    ],
  },
  {
    title: "Image Tools",
    description:
      "Convert and compress images for web, forms, and sharing.",
    items: [
      { href: "/tools/image/jpg-to-png", label: "JPG to PNG" },
      { href: "/tools/image/png-to-jpg", label: "PNG to JPG" },
      { href: "/tools/image/compress-image", label: "Image Compressor" },
      { href: "/tools/image/jpg-to-webp", label: "WebP Converter" },
    ],
  },
  {
    title: "Passport Photo Tools",
    description:
      "Create passport size photos and resize signatures to target dimensions and file size.",
    items: [
      { href: "/tools/image/passport-photo-resizer", label: "Passport Size Photo" },
      { href: "/tools/image/resize-signature-for-upload", label: "Signature Resizer" },
      { href: "/tools/image/resize-signature-for-upload?mode=dimensions", label: "Target Dimensions" },
      { href: "/tools/image/compress-image-to-50kb", label: "Target File Size" },
    ],
  },
  {
    title: "Date & Time Tools",
    description:
      "Convert time between UTC, GMT, IST, PST, EST, CET, JST, and hundreds of other time zones instantly. Compare multiple cities and plan meetings across different regions.",
    items: [
      { href: "/tools/date-time/timezone-converter", label: "Time Zone Converter" }
    ],
  },
];
const recentlyUpdated = [
  {href: "/tools/date-time/timezone-converter", label: "Time Zone Converter" },
  {href: "/tools/qr-code/qr-code-generator", label: "QR Code Generator & Scanner" },
  { href: "/tools/image/passport-photo-resizer", label: "Passport Photo Resizer" },
  { href: "/tools/image/resize-signature-for-upload", label: "Signature Resizer" },
  { href: "/tools/image/compress-jpg", label: "JPG Compressor" },
  { href: "/tools/pdf/merge-pdf", label: "PDF Merge" },
];

import Link from "next/link";

export async function HomePageSeo() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="text-white">
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
              Nothing leaves your device
            </p>

            <h1 className="max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl lg:text-3xl">
              Finance, calculators, PDF and image tools, QR codes, meeting schedulers, time zone conversions — all run entirely in your browser.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Access free browser-based tools for PDF editing, image conversion and compression, passport size photo
              creation, signature resizing, finance calculations, and mathematical problem solving. Everything runs
              directly in your browser without software installation or registration, helping keep your files private.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/pdf"
                className="rounded-xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/12"
              >
                Start with PDF tools
              </Link>
              <Link
                href="/finance"
                className="rounded-xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/12"
              >
                Open finance calculators
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-white/65">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Fast loading</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Mobile friendly</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">No install needed</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Privacy-friendly</span>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-sm sm:p-6">
            <span className="text-lg font-semibold text-white">Popular tools</span>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm font-medium text-white transition hover:border-white/20 hover:bg-slate-950/40"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-white/65">
              Everything is designed to load fast and work well on mobile, so users can reach the right tool quickly.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-slate-200 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl pt-4">
            <span className="text-2xl font-semibold sm:text-3xl">Browse Free Online Tool Categories</span>
            <p className="mt-3 text-base">
              Find the tool you need without installing software. Each category is built for quick access, clear input,
              and useful output.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((group) => (
              <article
                key={group.title}
                className="rounded-3xl border border-slate-200 p-6 shadow-sm transition hover:shadow-md"
              >
                <span className="text-xl font-semibold">{group.title}</span>
                <p className="mt-3 text-sm leading-6">{group.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <span className="text-2xl font-semibold tracking-tight sm:text-3xl">Why people use this site</span>
              <p className="mt-4 text-base">
                The site is built for students, job seekers, creators, and professionals who need quick browser tools for
                documents, calculations, and image preparation.
              </p>
            </div>

            <div>
              <span className="text-2xl font-semibold tracking-tight sm:text-3xl">Common use cases</span>
              <ul className="mt-4 space-y-3 text-base">
                <li>Compress a passport photo to the required size.</li>
                <li>Reduce signature file size for upload forms.</li>
                <li>Solve percentage and equation problems quickly.</li>
                <li>Use finance calculators for interest and deposit planning.</li>
                <li>Convert or compress images before uploading.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-slate-200 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">About our tools</span>
            <p className="mt-4 text-base leading-7">
              Our browser-based tools are designed to help users complete common tasks quickly with a simple interface and
              clear results. We focus on practical utilities such as PDF processing, image conversion, finance planning,
              and passport photo preparation.
            </p>
            <p className="mt-4 text-base leading-7">
              Whether you're preparing documents for government forms, optimizing images for websites, calculating
              financial values, or solving mathematical problems, our collection of browser-based tools helps you complete
              tasks quickly without installing software.
            </p>
          </div>
        </div>
      </section>

      <section className="border-slate-200 text-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xl font-semibold">Explore Tool Categories</span>
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-slate-950/30 p-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-slate-950/40"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-slate-200 text-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <span className="text-xl font-semibold">Recently updated</span>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/75">
              {recentlyUpdated.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}