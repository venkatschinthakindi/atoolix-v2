import Link from "next/link";
import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;

const title = "Free Online PDF Tools – Merge, Split, Compress & Convert PDFs";
const description =
  "Free online PDF tools to merge, split, compress, convert, and manage PDF files in your browser. Fast, private, mobile-friendly, and no software installation required.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/pdf`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/pdf`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const popularTools = [
  {
    href: "/tools/pdf/merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs, reorder files, select pages, and create one customized document.",
  },
  {
    href: "/tools/pdf/split-pdf",
    title: "Split PDF",
    description: "Extract selected pages, page ranges, odd or even pages, or create separate PDF files.",
  },
  {
    href: "/tools/pdf/compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file size for email, uploads, applications, storage, and sharing.",
  },
  {
    href: "/tools/pdf/image-to-pdf",
    title: "Image to PDF",
    description: "Turn supported JPG, PNG, and WebP images into PDF documents in your browser.",
  },
];

export default function Page() {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-12">
        <FilterToolHubPage filterKey="pdf" title={title} />

        <main className="mx-auto mt-12 max-w-5xl space-y-12 px-4 pb-12">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Free PDF Tools for Everyday Document Tasks</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Atoolix provides free browser-based PDF tools for common document tasks. Merge several PDF files into one document, split a PDF into selected pages, compress large files before uploading or emailing them, or create PDFs from supported images. The tools are designed for quick use on desktop and mobile browsers without requiring a PDF application installation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Popular PDF Tools</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {popularTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-2xl border border-border/60 p-5 transition-colors hover:bg-muted/50"
                >
                  <h3 className="font-semibold">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Which PDF Tool Should You Use?</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
              <p>
                <strong className="text-foreground">Need one PDF from several files?</strong> Use Merge PDF to combine documents in a chosen order. You can select the pages you actually need instead of merging every page.
              </p>
              <p>
                <strong className="text-foreground">Need only part of a document?</strong> Use Split PDF to extract individual pages, page ranges, odd or even pages, or selected groups from one or more PDFs.
              </p>
              <p>
                <strong className="text-foreground">Is your PDF too large to upload or email?</strong> Use Compress PDF to create a smaller copy and review the result before downloading it.
              </p>
              <p>
                <strong className="text-foreground">Have images that need to become a document?</strong> Use Image to PDF to create a PDF from supported image files before sharing, printing, or submitting them.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">PDF Processing in Your Browser</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Many Atoolix PDF workflows are designed around local browser processing. This can keep documents on your device instead of requiring a remote upload, while also removing the need to install desktop PDF software. Actual processing behavior and limits can vary by tool, browser, document size, and device memory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Common PDF Use Cases</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 text-sm leading-6 text-muted-foreground">
              <li>• Combine reports, invoices, forms, and supporting documents.</li>
              <li>• Extract selected pages from a long report or scanned document.</li>
              <li>• Reduce PDF size before uploading to an application portal.</li>
              <li>• Prepare smaller attachments for email and online submissions.</li>
              <li>• Create a PDF from photos, scans, screenshots, or supported images.</li>
              <li>• Organize documents for school, work, applications, and sharing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions About PDF Tools</h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold">Are the PDF tools free?</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Atoolix provides these browser-based PDF utilities without requiring an account or desktop software installation.</p>
              </div>
              <div>
                <h3 className="font-semibold">Can I use PDF tools on my phone?</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Yes. The PDF tools are designed for modern mobile, tablet, and desktop browsers.</p>
              </div>
              <div>
                <h3 className="font-semibold">Do I need Adobe Acrobat?</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">No. The browser-based tools are intended for common PDF tasks without requiring a separate desktop PDF application.</p>
              </div>
              <div>
                <h3 className="font-semibold">Are my files uploaded?</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Many PDF workflows process files locally in the browser. Check the individual tool page for any tool-specific processing limitations.</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
