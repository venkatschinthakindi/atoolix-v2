import type { Metadata } from "next";
import Link from "next/link";

const siteName = "Your Tools Site";
const siteUrl = "https://yourdomain.com";
const logoUrl = "https://yourdomain.com/logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free Online Tools for PDF, Images, Finance & Math",
    template: `%s | ${siteName}`,
  },
  description:
    "Free browser-based tools for PDF editing, image conversion and compression, passport size photo creation, signature resizing, finance calculators, and math tools. No installation or registration required.",
  keywords: [
    "online tools",
    "pdf tools",
    "image tools",
    "image compressor",
    "passport photo maker",
    "signature resizer",
    "finance calculators",
    "math tools",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Online Tools for PDF, Images, Finance & Math",
    description:
      "Use free browser-based tools for PDF editing, image conversion and compression, passport size photo creation, signature resizing, finance calculators, and math tools.",
    url: "/",
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools for PDF, Images, Finance & Math",
    description:
      "Free browser-based tools for PDF editing, image conversion and compression, passport size photo creation, signature resizing, finance calculators, and math tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const quickLinks = [
  { href: "/tools/image-compressor", label: "Image Compressor" },
  { href: "/tools/passport-photo", label: "Passport Photo Resizer" },
  { href: "/tools/signature-compressor", label: "Signature Resizer" },
  { href: "/tools/pdf-merge", label: "PDF Merge" },
  { href: "/tools/percentage-calculator", label: "Percentage Calculator" },
  { href: "/tools/fd-calculator", label: "FD Calculator" },
];

const categories = [
  {
    title: "PDF Tools",
    description:
      "Merge, split, compress, convert, and manage PDF files quickly in your browser.",
    items: [
      { href: "/tools/pdf-merge", label: "PDF Merge" },
      { href: "/tools/pdf-split", label: "PDF Split" },
      { href: "/tools/pdf-compress", label: "PDF Compress" },
      { href: "/tools/pdf-convert", label: "PDF Convert" },
    ],
  },
  {
    title: "Finance Calculators",
    description:
      "Use practical calculators for savings, interest, deposits, and planning.",
    items: [
      { href: "/tools/simple-interest", label: "Simple Interest" },
      { href: "/tools/compound-interest", label: "Compound Interest" },
      { href: "/tools/fd-calculator", label: "FD Calculator" },
      { href: "/tools/rd-calculator", label: "RD Calculator" },
    ],
  },
  {
    title: "Math Tools",
    description:
      "Solve common math and percentage problems with simple inputs.",
    items: [
      { href: "/tools/percentage-calculator", label: "Percentage Calculator" },
      { href: "/tools/equation-solver", label: "Equation Solver" },
      { href: "/tools/ratio-calculator", label: "Ratio Calculator" },
      { href: "/tools/unit-conversion", label: "Unit Conversion" },
    ],
  },
  {
    title: "Image Tools",
    description:
      "Convert and compress images for web, forms, and sharing.",
    items: [
      { href: "/tools/jpg-to-png", label: "JPG to PNG" },
      { href: "/tools/png-to-jpg", label: "PNG to JPG" },
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/webp-converter", label: "WebP Converter" },
    ],
  },
  {
    title: "Passport Photo Tools",
    description:
      "Create passport size photos and resize signatures to target dimensions and file size.",
    items: [
      { href: "/tools/passport-photo", label: "Passport Size Photo" },
      { href: "/tools/signature-compressor", label: "Signature Resizer" },
      { href: "/tools/photo-dimensions", label: "Target Dimensions" },
      { href: "/tools/file-size", label: "Target File Size" },
    ],
  },
];

const recentlyUpdated = [
  { href: "/tools/passport-photo", label: "Passport Photo Resizer" },
  { href: "/tools/signature-compressor", label: "Signature Resizer" },
  { href: "/tools/image-compressor", label: "JPG Compressor" },
  { href: "/tools/pdf-merge", label: "PDF Merge" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: logoUrl,
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: {
        "@id": `${siteUrl}/#logo`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description:
        "Free browser-based tools for PDF, finance, math, image conversion, compression, and passport photo creation.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      name: "Free Online Tools for PDF, Images, Finance & Math",
      url: siteUrl,
      description:
        "Free browser-based tools for PDF editing, image conversion and compression, passport size photo creation, signature resizing, finance calculators, and math tools.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function HomePageSeo() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="text-white">
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
              Free browser-based tools for everyday tasks
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Free Online Tools for PDF, Images, Finance & Math
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Access free browser-based tools for PDF editing, image conversion and compression, passport size photo
              creation, signature resizing, finance calculations, and mathematical problem solving. Everything runs
              directly in your browser without software installation or registration, helping keep your files private.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools/pdf"
                className="rounded-xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/12"
              >
                Start with PDF tools
              </Link>
              <Link
                href="/tools/finance"
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
            <h2 className="text-lg font-semibold text-white">Popular tools</h2>
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
          <div className="max-w-3xl">
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
                className="rounded-3xl border border-slate-200 p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-xl font-semibold">{group.title}</h3>
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
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Why people use this site</h2>
              <p className="mt-4 text-base">
                The site is built for students, job seekers, creators, and professionals who need quick browser tools for
                documents, calculations, and image preparation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Common use cases</h2>
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

      <section className="border-slate-200 text-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold">Explore Tool Categories</h2>
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
            <h2 className="text-xl font-semibold">Recently updated</h2>
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
  );
}