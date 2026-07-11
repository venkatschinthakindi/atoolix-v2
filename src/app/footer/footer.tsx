"use server";
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
      <div className="footer-inner relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              <Link href="/" className="text-white transition-colors duration-200 hover:text-violet-300">
                AToolVerse
              </Link>
            </h2>

            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              Free online tools for PDF editing, image compression, passport photo resizing, signature resizing,
              finance calculators, and math utilities. Fast, secure, and browser-based.
            </p>
          </div>

          <nav aria-label="Tool categories">
            <h1 className="mb-4 text-sm font-medium text-white">Tools</h1>
            <ul className="space-y-3 text-sm">
              <li><Link href="/pdf" className={footerLink}>PDF Tools</Link></li>
              <li><Link href="/image" className={footerLink}>Image Tools</Link></li>
              <li><Link href="/tools/image/passport-photo-resizer" className={footerLink}>Passport Photo Tool</Link></li>
              <li><Link href="/finance" className={footerLink}>Finance Tools</Link></li>
              <li><Link href="/datetime" className={footerLink}>Date & Time Tools</Link></li>
              <li><Link href="/calculator" className={footerLink}>Math Tools</Link></li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h1 className="mb-4 text-sm font-medium text-white">Company</h1>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className={footerLink}>About</Link></li>
              <li><Link href="/contact" className={footerLink}>Contact</Link></li>
              <li><Link href="/privacy" className={footerLink}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={footerLink}>Terms</Link></li>
            </ul>
          </nav>

          <nav aria-label="Popular tools">
            <h1 className="mb-4 text-sm font-medium text-white">Popular Tools</h1>
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
        </div>

        <div className="my-10 border-t border-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 md:flex-row">
          <small>© {year} AToolVerse. Fast • Secure • Browser-based.</small>
          <div className="flex items-center gap-6">
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