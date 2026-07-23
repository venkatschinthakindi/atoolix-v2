"use server";
import { serverConfig } from "@/config/server";
import Image from "next/image";
import Link from "next/link";

const footerLink =
  "text-zinc-400 transition-colors duration-200 hover:text-white hover:underline underline-offset-4";

const popularTools = [
  { href: "/tools/calculator/emi-calculator", label: "EMI Calculator" },
  { href: "/tools/calculator/retirement-calculator", label: "Retirement Planning" },
  { href: "/tools/image/compress-image-to-100kb", label: "Image Compressor" },
  { href: "/tools/image/passport-photo-resizer", label: "Passport Photo Resizer" },
  { href: "/tools/pdf/merge-pdf", label: "PDF Merge" },
  { href: "/tools/pdf/split-pdf", label: "PDF Split" },
];

export async function Footer() {
  const year = new Date().getFullYear();

  return (
  <footer className="footer-panel relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(124,58,237,0.18),transparent_60%)] opacity-40" />

  <div className="footer-inner relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">

    <div className="grid grid-cols-1 gap-5 md:grid-cols-5">

      {/* Brand */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          <Link
            href="/"
            className="text-white transition-colors duration-200 hover:text-violet-300 flex items-center"
          >
            <Image src="/android-chrome-192x192.png" title='Atoolix find the best tool' width={35} height={35} alt="Atoolix find the perfect tools" />
            <span className="-ml-3">Toolix</span>
          </Link>
        </h2>

        <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
          Free browser-based PDF tools, image tools, passport photo and
          signature resizers, finance calculators, timezone converter, meeting
          planner, unit converters, and many more. Fast,
          secure, privacy-focused.
        </p>
      </div>

      {/* Categories */}
      <nav aria-label="Tool categories">
        <h2 className="mb-4 text-sm font-medium text-white">
          Tool Categories
        </h2>

        <ul className="space-y-3 text-sm">
          <li><Link href="/pdf" className={footerLink}>PDF Tools</Link></li>
          <li><Link href="/image" className={footerLink}>Image Tools</Link></li>
          <li><Link href="/finance" className={footerLink}>Finance Calculators</Link></li>
          <li><Link href="/datetime" className={footerLink}>Date &amp; Time Tools</Link></li>
          <li><Link href="/calculator" className={footerLink}>Math Tools</Link></li>
          <li><Link href="/tools/image/passport-photo-resizer" className={footerLink}>Passport Photo Maker</Link></li>
        </ul>
      </nav>

      {/* Company */}
      <nav aria-label="Company">
        <h2 className="mb-4 text-sm font-medium text-white">
          Company
        </h2>

        <ul className="space-y-3 text-sm">
          <li><Link href="/about" className={footerLink}>About</Link></li>
          <li><Link href="/contact" className={footerLink}>Contact</Link></li>
          <li><Link href="/privacy" className={footerLink}>Privacy Policy</Link></li>
          <li><Link href="/terms" className={footerLink}>Terms</Link></li>
          <li><Link href="/disclaimer" className={footerLink}>Disclaimer</Link></li>
        </ul>
      </nav>

      {/* Popular */}
      <nav aria-label="Popular tools">
        <h2 className="mb-4 text-sm font-medium text-white">
          Popular Tools
        </h2>

        <ul className="space-y-3 text-sm">
          {popularTools.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={footerLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Resources */}
      <nav aria-label="Resources">
        <h2 className="mb-4 text-sm font-medium text-white">
          Resources
        </h2>

        <ul className="space-y-3 text-sm">
          <li><Link href="/sitemap.xml" className={footerLink}>Sitemap</Link></li>
          <li><Link href="/documentation" className={footerLink}>FAQ</Link></li>
          <li><Link href="/tools" className={footerLink}>All Tools</Link></li>
        </ul>
      </nav>

    </div>

    <div className="my-10 border-t border-white/10" />

    {/* SEO description */}
    <div className="mx-auto max-w-5xl text-center text-sm leading-7 text-zinc-400">
      <p>
        Atoolix is a free browser-based web application providing PDF editing,
        image compression, image conversion, passport photo creation,
        signature resizing, finance calculators, timezone conversion,
        meeting scheduling, QR code utilities, unit converters,
        math tools, and many other productivity tools designed to work
        securely across desktop and mobile devices without requiring
        software installation.
      </p>
    </div>

    <div className="my-8 border-t border-white/10" />

    <div className="flex flex-col items-center justify-between gap-4 text-lg text-zinc-500 md:flex-row">

      <div className="space-y-1 text-center md:text-left">

        <small>
          © {year} {serverConfig.siteName}. Free • Fast • Secure - Your Files Never Leave Your Device.
        </small>

        <p className="text-sm leading-5 text-zinc-500">
          Atoolix is developed and maintained by{" "}
          <a
            href="https://thrinetratech.in"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-violet-300"
          >
            Thrinetra Tech.
          </a>
        </p>

      </div>

      <div className="flex items-center gap-6 text-sm">

        <Link href="/contact" className={footerLink}>
          Suggest a Tool
        </Link>

        <Link href="/contact" className={footerLink}>
          Report a Bug
        </Link>

      </div>

    </div>

  </div>
</footer>
  );
}