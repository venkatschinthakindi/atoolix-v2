"use server";
import Link from "next/link";

const footerLink =
  "text-zinc-400 transition-colors duration-200 hover:text-white hover:underline underline-offset-4";

const popularTools = [
  { href: "/tools/image-compressor", label: "Image Compressor" },
  { href: "/tools/passport-photo", label: "Passport Photo Resizer" },
  { href: "/tools/signature-compressor", label: "Signature Resizer" },
  { href: "/tools/pdf-merge", label: "PDF Merge" },
  { href: "/tools/percentage-calculator", label: "Percentage Calculator" },
  { href: "/tools/pdf-split", label: "PDF Split" },
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
                ToolKit
              </Link>
            </h2>

            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              Free online tools for PDF editing, image compression, passport photo resizing, signature resizing,
              finance calculators, and math utilities. Fast, secure, and browser-based.
            </p>
          </div>

          <nav aria-label="Tool categories">
            <h4 className="mb-4 text-sm font-medium text-white">Tools</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/tools/pdf" className={footerLink}>PDF Tools</Link></li>
              <li><Link href="/tools/image" className={footerLink}>Image Tools</Link></li>
              <li><Link href="/tools/photo" className={footerLink}>Passport Photo Tools</Link></li>
              <li><Link href="/tools/finance" className={footerLink}>Finance Tools</Link></li>
              <li><Link href="/tools/math" className={footerLink}>Math Tools</Link></li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h4 className="mb-4 text-sm font-medium text-white">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className={footerLink}>About</Link></li>
              <li><Link href="/contact" className={footerLink}>Contact</Link></li>
              <li><Link href="/privacy" className={footerLink}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={footerLink}>Terms</Link></li>
            </ul>
          </nav>

          <nav aria-label="Popular tools">
            <h4 className="mb-4 text-sm font-medium text-white">Popular Tools</h4>
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
          <small>© {year} ToolKit. Fast • Secure • Browser-based.</small>
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