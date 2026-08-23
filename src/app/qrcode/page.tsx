import Link from "next/link";
import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "QR Code Generator & Scanner - Free Online Tools";
const description =
  "Create QR codes for links, WiFi, contacts, text, email, phone and more, or scan QR codes with your camera. Customize and export QR codes in your browser.";

export const metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/qrcode` },
  openGraph: { title, description, url: `${siteUrl}/qrcode`, siteName, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-12">
        <FilterToolHubPage filterKey="qrcode" title={title} />
        <main className="mx-auto mt-10 max-w-5xl space-y-10 px-4 pb-12">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Free QR Code Generator and Scanner</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Use Atoolix QR tools to create a QR code from a URL, text, phone number, email, SMS, WiFi details, contact information, or other supported data. You can also scan a QR code using a device camera or an image, depending on the tool and browser capabilities.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Create QR Codes for Different Uses</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><h3 className="font-semibold">Web links and text</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Create a QR code that opens a website or contains text that can be read after scanning.</p></div>
              <div><h3 className="font-semibold">WiFi access</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Encode supported WiFi network details so compatible scanners can offer a quick connection workflow.</p></div>
              <div><h3 className="font-semibold">Contacts and communication</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Create QR codes for supported contact, phone, email, or SMS information.</p></div>
              <div><h3 className="font-semibold">Branding and export</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Customize supported QR code appearance and export the result in the formats offered by the generator.</p></div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">QR Code Scanning</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A QR scanner can read a code from a camera or supported image input. Always review the destination before opening an unfamiliar QR code, especially when it leads to a login page, payment request, download, or other sensitive action.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Related Tools</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              For document workflows, you can also use Atoolix <Link className="underline" href="/pdf">PDF tools</Link> or browse <Link className="underline" href="/tools">all online tools</Link>.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
