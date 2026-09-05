import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;

// Confirmed: page.tsx does
//   import { HomePageSeo, metadata as homeMetadata } from "./siteSeoContent";
//   export const metadata = homeMetadata;
// so this IS correctly picked up by Next's metadata resolution. Page-level
// metadata replaces layout.tsx's per top-level key (title/description/
// openGraph/twitter/alternates/robots), so this file's values are what
// actually ship for "/". Fields NOT set here (icons, manifest, viewport,
// appleWebApp) correctly fall through to layout.tsx — leave those there,
// don't duplicate them here.

// Kept under ~60 chars so it doesn't get truncated in the SERP.
// The homepage uses `default`, so — unlike child routes — the `%s | siteName`
// template does NOT get appended here. Brand name is included manually.
const TITLE = `Free Online PDF, Image, Finance & QR Code Tools | ${siteName}`;
const DESCRIPTION =
  "Free online tools for PDF, images, finance, math, QR codes and time zones. Process files in your browser with no signup or software installation.";

const quickLinks = [
  { href: "/tools/privacysecurity/file-analyzer", label: "File Analyzer" },
  { href: "/tools/datetime/timezone-converter", label: "Time Zone Converter" },
  { href: "/tools/image/compress-image", label: "Image Compressor" },
  { href: "/tools/image/passport-photo-resizer", label: "Passport Photo Resizer" },
  { href: "/tools/image/resize-signature-for-upload", label: "Signature Resizer" },
  { href: "/tools/pdf/merge-pdf", label: "PDF Merge" },
  { href: "/calculator", label: "Percentage Calculator" },
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
      { href: "/tools/calculator/sip-calculator", label: "SIP Calculator" },
    ],
  },
  {
    title: "Privacy & Security Tools",
    description:
      "Inspect files for hidden metadata and potential privacy information before sharing them.",
    items: [
      { href: "/tools/privacysecurity/file-analyzer", label: "File Analyzer" },
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
    title: "QR Code Tools",
    description:
      "Create and scan QR codes for links, text, contact details, Wi-Fi, and other common uses.",
    items: [
      {
        href: "/tools/qrcode/qr-code-generator",
        label: "QR Code Generator & Scanner",
      },
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
      { href: "/tools/datetime/timezone-converter", label: "Time Zone Converter" },
    ],
  },
];

const recentlyUpdated = [
  { href: "/tools/datetime/timezone-converter", label: "Time Zone Converter" },
  { href: "/tools/privacysecurity/file-analyzer", label: "File Analyzer" },
  { href: "/tools/qrcode/qr-code-generator", label: "QR Code Generator & Scanner" },
  { href: "/tools/image/passport-photo-resizer", label: "Passport Photo Resizer" },
  { href: "/tools/image/resize-signature-for-upload", label: "Signature Resizer" },
  { href: "/tools/image/compress-jpg", label: "JPG Compressor" },
  { href: "/tools/pdf/merge-pdf", label: "PDF Merge" },
];

import Link from "next/link";

// Structured data: kept additive-only, doesn't touch layout/UI. Uses @id
// references so WebSite + Organization dedupe cleanly if other pages/layout
// also emit an Organization node with the same @id.
function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: DESCRIPTION,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#popular-tools`,
        name: "Popular tools",
        itemListElement: quickLinks.map((link, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}${link.href}`,
          name: link.label,
        })),
      },
    ],
  };
}

export async function HomePageSeo() {
  const jsonLd = buildJsonLd();

  return (
    <>
      {/* Structured data: static/internal content only, safe as-is */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="text-foreground">
            <p className="mb-4 inline-flex rounded-full border border-border bg-surface-raised px-3 py-1 text-xs font-medium tracking-wide text-foreground backdrop-blur">
              Nothing leaves your device
            </p>

            <h1 className="max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl lg:text-3xl">
              Finance, calculators, PDF and image tools, QR codes, meeting schedulers, time zone conversions — all run entirely in your browser.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-foreground-secondary sm:text-lg">
              Use free browser-based tools for PDF files, image conversion and compression,
              finance calculations, math, QR codes, time zones, and more. Your files are
              processed directly in your browser, with no software installation or
              registration required.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/pdf"
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-surface-raised"
              >
                Start with PDF tools
              </Link>
              <Link
                href="/finance"
                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-surface-raised"
              >
                Open finance calculators
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-foreground-secondary">
              <span className="rounded-full border border-border bg-card px-3 py-1">Fast loading</span>
              <span className="rounded-full border border-border bg-card px-3 py-1">Mobile friendly</span>
              <span className="rounded-full border border-border bg-card px-3 py-1">No install needed</span>
              <span className="rounded-full border border-border bg-card px-3 py-1">Privacy-friendly</span>
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-surface-raised p-5 shadow-2xl backdrop-blur-sm sm:p-6">
            {/* was a <span> styled like a heading — now a real heading node */}
            <h2 className="text-lg font-semibold text-foreground">Popular tools</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-border bg-surface-sunken p-4 text-sm font-medium text-foreground transition hover:border-border-strong hover:bg-surface-sunken"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground-secondary">
              Everything is designed to load fast and work well on mobile, so users can reach the right tool quickly.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-border text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Browser-Based and Privacy-Friendly
            </h2>

            <p className="mt-4 text-base leading-7">
              Many Atoolix file tools process your files directly in your browser.
              This means the file can stay on your device instead of being uploaded
              to a remote server. No software installation or account is required
              for these tools.
            </p>
          </div>
        </div>
      </section>

      <section className="border-border text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl pt-4">
            <h2 className="text-2xl font-semibold sm:text-3xl">Browse Free Online Tool Categories</h2>
            <p className="mt-3 text-base">
              Find the tool you need without installing software. Each category is built for quick access, clear input,
              and useful output.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((group) => (
              <article
                key={group.title}
                className="rounded-3xl border border-border p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-xl font-semibold">{group.title}</h3>
                <p className="mt-3 text-sm leading-6">{group.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-foreground underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
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

      <section className="text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Why people use this site</h2>
              <p className="mt-4 text-base">
                The site is built for students, job seekers, creators, and professionals who need quick browser tools for
                documents, calculations, and image preparation.
              </p>
            </div>

            <div>
              {/* was a <span> styled like a heading — now a real heading node */}
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Common use cases</h2>
              <ul className="mt-4 space-y-3 text-base">
                <li>Resize and compress photos to meet online application requirements.</li>
                <li>Reduce signature images to a required file size or dimensions.</li>
                <li>Check files for hidden metadata before sharing them.</li>
                <li>Convert and compress images before uploading or publishing them.</li>
                <li>Merge, split, and compress PDF documents in your browser.</li>
                <li>Calculate interest, investment returns, and retirement projections.</li>
                <li>Compare time zones when planning meetings across countries.</li>
                <li>Create QR codes for links, contact details, and other information.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-border text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* was a <span> styled like a heading — now a real heading node */}
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">About our tools</h2>
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

      <section className="border-border text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* was a <span> styled like a heading — now a real heading node */}
            <h2 className="text-xl font-semibold">Explore Tool Categories</h2>
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-border bg-surface-sunken p-3 text-sm font-medium text-foreground transition hover:border-border-strong hover:bg-surface-sunken"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-border text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-6">
            {/* was a <span> styled like a heading — now a real heading node */}
            <h2 className="text-xl font-semibold">Recently updated</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground-secondary">
              {recentlyUpdated.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
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
  );
}
