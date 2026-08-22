"use server";

import { serverConfig } from "@/config/server";
import Image from "next/image";
import Link from "next/link";

const footerLink =
  "text-zinc-400 transition-colors duration-200 hover:text-white hover:underline underline-offset-4";

const popularTools = [
  {
    href: "/tools/calculator/emi-calculator",
    label: "EMI Calculator",
  },
  {
    href: "/tools/calculator/personal-loan-emi-calculator",
    label: "Personal Loan Calculator",
  },
  {
    href: "/tools/calculator/car-loan-emi-calculator",
    label: "Car Loan Calculator",
  },
  {
    href: "/tools/calculator/home-loan-emi-calculator",
    label: "Home Loan Calculator",
  },
  {
    href: "/tools/privacysecurity/file-analyzer",
    label: "File Analyzer",
  },
  {
    href: "/tools/calculator/retirement-calculator",
    label: "Retirement Planning",
  },
  {
    href: "/tools/image/compress-image-to-100kb",
    label: "Image Compressor",
  },
  {
    href: "/tools/image/passport-photo-resizer",
    label: "Passport Photo Resizer",
  },
  {
    href: "/tools/pdf/merge-pdf",
    label: "PDF Merge",
  },
  {
    href: "/tools/pdf/split-pdf",
    label: "PDF Split",
  },
];

const financeTools = [
  {
    href: "/tools/calculator/emi-calculator",
    label: "EMI Calculator",
  },
  {
    href: "/tools/calculator/personal-loan-emi-calculator",
    label: "Personal Loan Calculator",
  },
  {
    href: "/tools/calculator/car-loan-emi-calculator",
    label: "Car Loan Calculator",
  },
  {
    href: "/tools/calculator/home-loan-emi-calculator",
    label: "Home Loan Calculator",
  },
  {
    href: "/tools/calculator/fd-calculator",
    label: "FD Calculator",
  },
  {
    href: "/tools/calculator/sip-calculator",
    label: "SIP Calculator",
  },
  {
    href: "/tools/calculator/retirement-calculator",
    label: "Retirement Calculator",
  },
];

const toolCategories = [
  {
    href: "/privacysecurity",
    label: "Privacy & Security Tools",
  },
  {
    href: "/pdf",
    label: "PDF Tools",
  },
  {
    href: "/image",
    label: "Image Tools",
  },
  {
    href: "/finance",
    label: "Finance Calculators",
  },
  {
    href: "/datetime",
    label: "Date & Time Tools",
  },
  {
    href: "/tools/calculator",
    label: "Math Tools",
  },
  {
    href: "/tools/qrcode/qr-code-generator",
    label: "QR Code Tools",
  },
];

export async function Footer() {
  const year = new Date().getFullYear();

  const siteName = serverConfig.siteName.toPascalCase();
  const siteUrl = (serverConfig.siteUrl ?? "").replace(/\/+$/, "");

  const businessName = "Thrinetra Tech";

  const operator = {
    name: "Venkatesh",
    location: "Hyderabad, Telangana, India",
    email: `support@${siteName}.com`,
  };

  const businessEmail = `support@${siteName}.com`;

  return (
    <footer
      className="footer-panel relative overflow-hidden"
      aria-labelledby="site-footer-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(124,58,237,0.18),transparent_60%)] opacity-40"
        aria-hidden="true"
      />

      <div className="footer-inner relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <section
          className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          aria-labelledby="site-footer-heading"
        >
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/android-chrome-192x192.png"
                  title={`${siteName} logo`}
                  width={42}
                  height={42}
                  alt={`${siteName} logo`}
                />

                <div>
                  <h2
                    id="site-footer-heading"
                    className="text-xl font-semibold tracking-tight text-white"
                  >
                    <Link
                      href="/"
                      className="transition-colors hover:text-violet-300"
                    >
                      {siteName}
                    </Link>
                  </h2>

                  <p className="mt-1 text-xs text-zinc-500">
                    Online tools for everyday tasks
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
                {siteName} provides browser-based tools for finance
                calculations, PDFs, images, date and time utilities,
                privacy-related file checks, QR codes, and other everyday
                productivity tasks.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
                The service is designed to make common online tasks easier to
                complete without requiring users to install desktop software.
                Individual tools may use different processing methods, so users
                should review the information provided on each tool page before
                using it.
              </p>
            </div>

            <address className="not-italic">
              <h3 className="text-sm font-semibold text-white">
                Website operator
              </h3>

              <p className="mt-3 text-sm font-medium text-zinc-200">
                <span className="text-lg text-green-600">
                  {" "}
                  <a href="https://www.thrinetratech.in" target="_blank" rel="noopener noreferrer">
                    {businessName}
                  </a>
                </span>
              </p>

              <address className="not-italic">
                <h3 className="text-sm font-semibold text-white">
                  About the operator
                </h3>

                <p className="mt-3 text-sm font-medium text-zinc-200">
                  {operator.name}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {operator.location}
                </p>

                <p className="mt-4 text-sm">
                  <span className="text-zinc-500">Email: </span>
                  <a
                    href={`mailto:${operator.email}`}
                    className={footerLink}
                  >
                    {operator.email}
                  </a>
                </p>
              </address>

              <div className="mt-4 space-y-2 text-sm">
                {siteUrl ? (
                  <p>
                    <span className="text-zinc-500">Website: </span>
                    <Link href="/" className={footerLink}>
                      {siteName}
                    </Link>
                  </p>
                ) : null}
              </div>
            </address>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-white">
              {siteName}
            </h2>

            <p className="max-w-xs text-sm leading-7 text-zinc-400">
              Practical browser-based tools for calculations, documents,
              images, time, privacy checks, and everyday productivity.
            </p>

            <Link
              href="/about"
              className="inline-flex text-sm text-violet-300 transition hover:text-violet-200 hover:underline"
            >
              Learn more about {siteName}
            </Link>
          </div>

          <nav aria-label="Tool categories">
            <h2 className="mb-4 text-sm font-semibold text-white">
              Tool Categories
            </h2>

            <ul className="space-y-3 text-sm">
              {toolCategories.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Finance tools">
            <h2 className="mb-4 text-sm font-semibold text-white">
              Finance Tools
            </h2>

            <ul className="space-y-3 text-sm">
              {financeTools.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company and legal">
            <h2 className="mb-4 text-sm font-semibold text-white">
              Company &amp; Legal
            </h2>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className={footerLink}>
                  About {siteName}
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footerLink}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={footerLink}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className={footerLink}>
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/documentation" className={footerLink}>
                  Documentation
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h2 className="mb-4 text-sm font-semibold text-white">
              Resources
            </h2>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/tools" className={footerLink}>
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/documentation" className={footerLink}>
                  Help &amp; FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footerLink}>
                  Suggest a Tool
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footerLink}>
                  Report a Bug
                </Link>
              </li>
              <li>
                <Link href="/about#recognition-heading" className={footerLink}>
                  Recognition &amp; Reviews
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <section
          className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-6"
          aria-labelledby="popular-tools-heading"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="popular-tools-heading"
                className="text-sm font-semibold text-white"
              >
                Popular Tools
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Quick access to commonly used tools.
              </p>
            </div>

            <Link
              href="/tools"
              className="text-sm text-violet-300 hover:text-violet-200 hover:underline"
            >
              View all tools
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {popularTools.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section
          className="mt-8 rounded-3xl border border-white/10 bg-slate-950/30 p-6"
          aria-labelledby="important-information-heading"
        >
          <h2
            id="important-information-heading"
            className="text-sm font-semibold text-white"
          >
            Important information
          </h2>

          <div className="mt-3 space-y-3 text-xs leading-6 text-zinc-500">
            <p>
              Tool behavior can vary by feature. Before submitting sensitive
              files or information, review the individual tool's instructions
              and the{" "}
              <Link
                href="/privacy"
                className="text-zinc-300 hover:text-white hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <p>
              Finance calculators provide estimates for informational and
              planning purposes only. Results may differ from actual loan,
              investment, deposit, or financial product terms. Always verify
              important financial decisions with the relevant lender,
              financial institution, or qualified professional.
            </p>

            <p>
              {siteName} does not represent that calculator results constitute
              financial, investment, tax, legal, or professional advice.
            </p>
          </div>
        </section>

        <div className="my-10 border-t border-white/10" />

        <div className="mx-auto max-w-5xl text-center text-sm leading-7 text-zinc-500">
          <p>
            {siteName} is a browser-based utility platform providing finance
            calculators, PDF tools, image tools, file utilities, passport
            photo and signature preparation tools, date and time utilities,
            QR code tools, unit conversion, mathematics tools, and other
            everyday productivity features.
          </p>
        </div>

        <div className="my-8 border-t border-white/10" />

        <div className="flex flex-col items-center justify-between gap-5 pb-8 text-sm text-zinc-500 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <p>
              © {year} {siteName}. All rights reserved.
            </p>

            <p>
              {siteName} is independently operated and maintained by the
              <span className="text-lg text-green-600">
                {" "}
                <a href="https://www.thrinetratech.in" target="_blank" rel="noopener noreferrer">
                  {businessName}
                </a>
              </span>
            </p>

            <p className="text-xs text-zinc-600">
              Information on this website is provided for general informational
              and utility purposes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href="/contact" className={footerLink}>
              Suggest a Tool
            </Link>
            <Link href="/contact" className={footerLink}>
              Report a Bug
            </Link>
            <Link href="/privacy" className={footerLink}>
              Privacy
            </Link>
            <Link href="/terms" className={footerLink}>
              Terms
            </Link>
            <Link href="/disclaimer" className={footerLink}>
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
