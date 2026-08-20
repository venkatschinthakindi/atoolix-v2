import { serverConfig } from "@/config/server";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import RelatedTools from "@/app/tools/[...toolId]/Relatedtools";

const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");
const canonicalPath = "/tools/qrcode/qr-code-generator";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

type FaqItem = {
  q: string;
  a: string;
};

type StepItem = {
  title: string;
  desc: string;
  icon: string;
};

type FeatureItem = {
  name: string;
  desc: string;
};

const faqItems: FaqItem[] = [
  {
    q: "What is a QR code generator?",
    a: "A QR code generator creates scannable QR codes from information such as website URLs, text, email addresses, phone numbers, SMS messages, WiFi credentials, contact details, locations, WhatsApp information, and events.",
  },
  {
    q: "Is this QR code generator free?",
    a: "Yes. The Atoolix QR code generator and scanner is free to use and does not require an account.",
  },
  {
    q: "What types of QR codes can I create?",
    a: "You can create QR codes for URLs, plain text, email, phone numbers, SMS, WhatsApp, WiFi networks, vCards, locations, and events.",
  },
  {
    q: "Can I create a QR code for a website URL?",
    a: "Yes. Enter a valid website address and the generator creates a QR code that compatible phones and QR scanners can use to open the URL.",
  },
  {
    q: "Can I create a QR code for plain text?",
    a: "Yes. The text QR option lets you encode notes, instructions, messages, labels, or other plain-text information.",
  },
  {
    q: "Can I create a QR code for email?",
    a: "Yes. You can create an email QR code containing an email address, subject, and message information.",
  },
  {
    q: "Can I create a QR code for a phone number?",
    a: "Yes. The phone QR option can encode a phone number for compatible calling workflows.",
  },
  {
    q: "Can I create a QR code for SMS?",
    a: "Yes. You can encode an SMS recipient and message into a QR code for compatible messaging workflows.",
  },
  {
    q: "Can I create a WhatsApp QR code?",
    a: "Yes. The WhatsApp option can encode compatible WhatsApp contact and messaging information.",
  },
  {
    q: "Can I create a QR code for WiFi?",
    a: "Yes. You can encode compatible WiFi network information including the network name, security type, and password when required.",
  },
  {
    q: "Can I create a QR code for a contact or vCard?",
    a: "Yes. The vCard option lets you encode contact information into a QR code for compatible contact-saving workflows.",
  },
  {
    q: "Can I create a QR code for a location?",
    a: "Yes. The location option can encode latitude and longitude information for compatible map and location workflows.",
  },
  {
    q: "Can I create a QR code for an event?",
    a: "Yes. Event information can be encoded into a QR code for compatible calendar and event workflows.",
  },
  {
    q: "Can I customize the QR code colors?",
    a: "Yes. You can customize the foreground and background colors and view the result in the live QR preview.",
  },
  {
    q: "Can I add a logo to a QR code?",
    a: "Yes. You can upload a supported logo image and place it in the QR code design. Testing the final QR code is recommended after adding a logo.",
  },
  {
    q: "Can I customize the information shown with the QR code?",
    a: "Yes. The QR card customization option lets you add a title, description, optional image, title color, description color, card background color, and separate fonts for the title and description.",
  },
  {
    q: "Can I upload an image to the QR card?",
    a: "Yes. The QR card customization feature supports PNG, JPG, and WEBP images up to the configured file-size limit.",
  },
  {
    q: "Can I change the QR card title and description?",
    a: "Yes. You can enter a custom title and description that appear with the QR code when card customization is enabled.",
  },
  {
    q: "Can I change the QR card fonts?",
    a: "Yes. The QR card customization feature supports selectable fonts for the title and description.",
  },
  {
    q: "What is QR code error correction?",
    a: "QR code error correction helps scanners recover encoded information when part of a QR code is damaged, obscured, dirty, or covered. Higher levels can be useful when adding a logo or preparing QR codes for physical use.",
  },
  {
    q: "Can I change the QR code size?",
    a: "Yes. The generator supports QR code sizing for different digital, document, label, signage, and print requirements.",
  },
  {
    q: "Does the QR code have a live preview?",
    a: "Yes. The QR code preview updates as supported generation and customization settings are changed.",
  },
  {
    q: "What formats can I download a QR code in?",
    a: "Supported export formats include PNG, SVG, and PDF.",
  },
  {
    q: "Which QR format is best for printing?",
    a: "SVG and PDF are generally useful for print workflows because they can preserve sharp output when resized. PNG is convenient for many digital uses.",
  },
  {
    q: "Can I scan a QR code with my phone camera?",
    a: "Yes. The built-in scanner can use a compatible device camera when browser camera access is available.",
  },
  {
    q: "Can I scan a QR code from an image?",
    a: "Yes. You can upload a supported image containing a QR code, including a photo or screenshot, and decode the QR content.",
  },
  {
    q: "Can I copy a scanned QR result?",
    a: "Yes. The scanner provides a copy option for decoded QR content when clipboard access is available.",
  },
  {
    q: "Can I open a scanned QR URL?",
    a: "Yes. Supported URLs can be opened after reviewing the decoded result. External websites can require confirmation before leaving the current site.",
  },
  {
    q: "Does the tool work on mobile phones?",
    a: "Yes. The responsive interface is designed for smartphones, tablets, laptops, and desktop browsers. Camera scanning depends on browser support and camera permissions.",
  },
  {
    q: "Is my QR code data uploaded to a server?",
    a: "QR generation and scanning are designed to run directly in the browser, so QR content is not uploaded to a processing server as part of the normal client-side workflow.",
  },
  {
    q: "Does the tool store the QR codes I create?",
    a: "The normal QR generation workflow does not store generated QR content as an account-based record. Files are only saved when you choose to download them.",
  },
  {
    q: "Do QR codes expire?",
    a: "A QR code itself does not automatically expire. If it contains a URL, however, the destination website or service can later change or become unavailable.",
  },
  {
    q: "How can I make a QR code easier to scan?",
    a: "Use strong contrast, sufficient quiet space around the QR code, an appropriate physical size, suitable error correction, and limited logo coverage. Always test the finished QR code with a real device.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Choose a QR code type",
    desc: "Select the type of information you want to encode, such as a URL, text, email, phone, SMS, WhatsApp, WiFi, contact, location, or event.",
    icon: "🧩",
  },
  {
    title: "Enter your information",
    desc: "Complete the fields required for the selected QR type and review the information before generating the code.",
    icon: "⌨️",
  },
  {
    title: "Customize QR colors and size",
    desc: "Adjust the foreground color, background color, QR size, and error-correction level according to your use case.",
    icon: "🎨",
  },
  {
    title: "Add a logo if needed",
    desc: "Upload a supported logo image when you want a branded QR code. Use suitable error correction and test the final result.",
    icon: "🏷️",
  },
  {
    title: "Customize the QR card",
    desc: "Optionally enable card customization and add a title, description, image, colors, and fonts around the generated QR code.",
    icon: "🖼️",
  },
  {
    title: "Check the live preview",
    desc: "Review the QR code and card design and make sure the QR pattern remains easy to scan.",
    icon: "👁️",
  },
  {
    title: "Export the QR code",
    desc: "Download the generated result as PNG, SVG, or PDF depending on your digital or print requirements.",
    icon: "⬇️",
  },
  {
    title: "Scan when needed",
    desc: "Use the camera scanner or upload a supported image, photo, or screenshot containing a QR code.",
    icon: "📷",
  },
];

const generatorFeatures: FeatureItem[] = [
  {
    name: "URL QR Code",
    desc: "Turn a website address into a scannable QR code for websites, landing pages, menus, campaigns, documentation, and digital content.",
  },
  {
    name: "Text QR Code",
    desc: "Encode plain text, instructions, notes, labels, or other text information into a QR code.",
  },
  {
    name: "Email QR Code",
    desc: "Create a QR code containing an email address, subject, and message information.",
  },
  {
    name: "Phone QR Code",
    desc: "Encode a phone number for convenient calling workflows on compatible devices.",
  },
  {
    name: "SMS QR Code",
    desc: "Create a QR code containing an SMS recipient and message.",
  },
  {
    name: "WhatsApp QR Code",
    desc: "Create a QR code for compatible WhatsApp contact and messaging workflows.",
  },
  {
    name: "WiFi QR Code",
    desc: "Share compatible WiFi network information through a scannable QR code.",
  },
  {
    name: "vCard QR Code",
    desc: "Share contact information through a QR code for compatible contact workflows.",
  },
  {
    name: "Location QR Code",
    desc: "Encode geographic coordinates for compatible map and location workflows.",
  },
  {
    name: "Event QR Code",
    desc: "Encode supported event information for compatible calendar and event workflows.",
  },
];

const qrDesignFeatures: FeatureItem[] = [
  {
    name: "Foreground Color",
    desc: "Customize the main QR pattern color to match a visual style or brand.",
  },
  {
    name: "Background Color",
    desc: "Choose the QR background color while maintaining sufficient contrast.",
  },
  {
    name: "QR Size",
    desc: "Adjust the generated QR code dimensions for different digital and physical applications.",
  },
  {
    name: "Error Correction",
    desc: "Choose an error-correction level to improve resilience against partial damage or obstruction.",
  },
  {
    name: "Logo Upload",
    desc: "Upload a supported PNG, JPG, WEBP, or SVG logo for branded QR designs.",
  },
  {
    name: "Live QR Preview",
    desc: "See the generated QR code while changing supported generation settings.",
  },
];

const cardCustomizationFeatures: FeatureItem[] = [
  {
    name: "Custom QR Card Title",
    desc: "Add a clear heading above or alongside the QR code to explain what users should scan.",
  },
  {
    name: "Custom QR Card Description",
    desc: "Add supporting instructions or context for the QR code.",
  },
  {
    name: "QR Card Image",
    desc: "Add a supporting PNG, JPG, or WEBP image to the QR presentation card.",
  },
  {
    name: "Title Color",
    desc: "Choose a separate color for the QR card title.",
  },
  {
    name: "Description Color",
    desc: "Choose a separate color for supporting QR card text.",
  },
  {
    name: "Card Background",
    desc: "Customize the background color of the exported QR presentation card.",
  },
  {
    name: "Title Font",
    desc: "Choose from supported fonts for the QR card title.",
  },
  {
    name: "Description Font",
    desc: "Choose a separate supported font for the QR card description.",
  },
  {
    name: "Optional Customization",
    desc: "Keep QR card customization disabled when you only need the QR code itself.",
  },
];

const exportFeatures: FeatureItem[] = [
  {
    name: "PNG Export",
    desc: "Download a convenient raster image for websites, documents, email, presentations, and social media.",
  },
  {
    name: "SVG Export",
    desc: "Export a scalable vector QR code that can remain sharp when resized.",
  },
  {
    name: "PDF Export",
    desc: "Create a PDF suitable for many document and print workflows.",
  },
  {
    name: "Customized Card Export",
    desc: "When card customization is enabled, the PNG and PDF workflow can include the QR presentation design.",
  },
];

const scannerFeatures: FeatureItem[] = [
  {
    name: "QR Code Scanner",
    desc: "Decode supported QR codes directly inside the browser.",
  },
  {
    name: "Camera Scan",
    desc: "Scan QR codes using a compatible device camera when browser camera access is available.",
  },
  {
    name: "Image Scan",
    desc: "Upload an image containing a QR code and decode supported QR content.",
  },
  {
    name: "Photo Scan",
    desc: "Use saved QR code photos from a compatible device.",
  },
  {
    name: "Screenshot Scan",
    desc: "Decode QR codes from screenshots and other supported image files.",
  },
  {
    name: "Copy Result",
    desc: "Copy decoded QR content to the clipboard when browser clipboard access is available.",
  },
  {
    name: "Safe URL Opening",
    desc: "Review scanned URLs and confirm external destinations before opening them.",
  },
];

const privacyFeatures: FeatureItem[] = [
  {
    name: "Browser Based",
    desc: "QR generation and scanning are designed to run directly in the browser.",
  },
  {
    name: "Client-Side Workflow",
    desc: "The normal QR generation and scanning workflow is designed around browser-side processing.",
  },
  {
    name: "No Account Required",
    desc: "Use the QR generator and scanner without creating an account.",
  },
  {
    name: "No Normal QR Content Storage",
    desc: "Generated QR content is not stored as an account-based record during the normal generation workflow.",
  },
];

const supportedUseCases = [
  {
    useCase: "Restaurant Menus",
    note: "Create QR codes that let customers access digital menus from table cards, signs, posters, and printed materials.",
  },
  {
    useCase: "Business Cards",
    note: "Share contact information through a vCard QR code and make saving contact details easier.",
  },
  {
    useCase: "WiFi Access",
    note: "Share compatible network information without requiring visitors to manually type credentials.",
  },
  {
    useCase: "Event Information",
    note: "Connect invitations, posters, tickets, or event materials with supported event information.",
  },
  {
    useCase: "Product Packaging",
    note: "Connect packaging with product pages, manuals, support information, documentation, or other digital resources.",
  },
  {
    useCase: "Marketing Materials",
    note: "Connect flyers, brochures, posters, signs, and physical campaigns with digital destinations.",
  },
  {
    useCase: "Contact Sharing",
    note: "Share phone, email, and contact details through convenient scannable QR codes.",
  },
  {
    useCase: "Digital Content",
    note: "Create QR codes for websites, text, messaging, and other supported information.",
  },
  {
    useCase: "Branded QR Cards",
    note: "Add a title, description, image, colors, and fonts around a QR code for presentation-ready materials.",
  },
  {
    useCase: "Printed Instructions",
    note: "Add a short explanation or instruction next to a QR code to help users understand what scanning will do.",
  },
];

const bestPractices = [
  "Test every QR code with a real phone before printing or publishing it.",
  "Use strong contrast between the QR foreground pattern and background.",
  "Keep sufficient quiet space around the QR code so scanners can identify its boundaries.",
  "Choose a QR size appropriate for the distance and environment in which it will be scanned.",
  "Use suitable error correction when adding a logo or when the QR code may experience physical damage.",
  "Avoid excessive logo coverage or visual changes that interfere with the QR pattern.",
  "For printed materials, test the actual final printed size rather than only a large on-screen preview.",
  "Use SVG or PDF for many print workflows and PNG for typical digital use.",
  "Double-check encoded WiFi, contact, event, messaging, and URL information before publishing.",
];

const accessibilityAndUsability = [
  {
    title: "Give the QR code context",
    desc: "Use a short title or instruction such as 'Scan to view the menu' so users understand what the QR code is intended to do.",
  },
  {
    title: "Maintain readable contrast",
    desc: "Avoid color combinations that make the QR pattern difficult for scanners or users to distinguish.",
  },
  {
    title: "Use readable card text",
    desc: "When adding a QR card title or description, choose a font size and color that remain readable in the intended display environment.",
  },
  {
    title: "Test the complete design",
    desc: "A QR code that works by itself can become harder to scan after adding colors, a logo, an image, or other presentation elements.",
  },
];

const tips = [
  "Add a short instruction such as 'Scan to view menu' or 'Scan for details' when the QR code is used in physical materials.",
  "Test QR codes at their actual display or print size.",
  "Avoid placing QR codes on highly reflective, curved, distorted, or visually cluttered surfaces.",
  "Keep dense QR codes large enough to scan reliably in the intended environment.",
  "Maintain strong foreground and background contrast.",
  "Keep a copy of the original source information so you can regenerate the QR code later.",
  "When scanning an unfamiliar QR code, review the decoded destination before opening it.",
  "For branded QR codes, test the final logo, color, size, and error-correction combination with multiple devices.",
  "When using a customized QR card, make sure the surrounding title and description do not visually overpower the QR code.",
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: `${siteUrl}/tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "QR Code Generator & Scanner",
      item: canonicalUrl,
    },
  ],
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Atoolix QR Code Generator & Scanner",
  url: canonicalUrl,
  mainEntityOfPage: canonicalUrl,
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "QR Code Generator and Scanner",
  operatingSystem: "Web Browser",
  browserRequirements:
    "Requires a modern web browser. Camera scanning requires browser and device camera access.",
  description:
    "Free online QR code generator and scanner for URLs, text, email, phone, SMS, WhatsApp, WiFi, vCards, locations, and events, with QR colors, logo upload, error correction, QR sizing, live preview, customizable QR cards, camera scanning, image scanning, and PNG, SVG, and PDF export.",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
  },
  featureList: [
    "QR code generation",
    "QR code scanning",
    "QR code reader",
    "URL QR codes",
    "Text QR codes",
    "Email QR codes",
    "Phone QR codes",
    "SMS QR codes",
    "WhatsApp QR codes",
    "WiFi QR codes",
    "vCard QR codes",
    "Location QR codes",
    "Event QR codes",
    "Foreground color customization",
    "Background color customization",
    "QR code size customization",
    "QR code error correction",
    "Logo upload",
    "Live QR preview",
    "Custom QR card title",
    "Custom QR card description",
    "Custom QR card image",
    "Custom QR card title color",
    "Custom QR card description color",
    "Custom QR card background",
    "Custom QR card fonts",
    "PNG export",
    "SVG export",
    "PDF export",
    "Camera QR scanning",
    "Image QR scanning",
    "Photo QR scanning",
    "Screenshot QR scanning",
    "Clipboard QR result copying",
    "External URL confirmation",
    "Browser-based QR processing",
  ],
};

function FeatureGrid({
  items,
}: {
  items: FeatureItem[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.name}
          className="rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-sm font-semibold sm:text-[0.95rem]">
            {item.name}
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-white/70">
            {item.desc}
          </p>
        </article>
      ))}
    </div>
  );
}

export default function QrCodeSeoContent() {
  return (
    <div className="mx-auto space-y-8 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* IMPORTANT:
          No FAQPage JSON-LD here.
          Google removed FAQ rich-result support in 2026.
          The visible FAQ content remains useful for users and search understanding.
      */}

      <section
        aria-labelledby="qr-page-heading"
        className="space-y-4"
      >
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Online QR Code Generator & Scanner
        </p>

        <h1
          id="qr-page-heading"
          className="max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Free QR Code Generator & Scanner
        </h1>

        <p className="max-w-5xl text-sm leading-7 text-white/75 sm:text-base">
          Create, customize, download, and scan QR codes online. Generate QR
          codes for URLs, text, email, phone numbers, SMS, WhatsApp, WiFi,
          vCards, locations, and events, then customize colors, size, error
          correction, logos, and optional presentation-card content.
        </p>

        <p className="max-w-5xl text-sm leading-7 text-white/75 sm:text-base">
          The built-in QR scanner can decode QR codes from a compatible device
          camera or from uploaded images such as photos and screenshots. Review
          decoded results, copy them, or open supported destinations with the
          available safety checks.
        </p>
      </section>

      <section
        aria-labelledby="generator-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="generator-heading"
          title="QR Code Generator: Supported QR Types"
          description="Choose the type of information you want to encode and enter the required details in the generator."
        />

        <FeatureGrid items={generatorFeatures} />
      </section>

      <section
        aria-labelledby="input-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="input-heading"
          title="Enter QR Code Information"
          description="Each QR code type provides fields appropriate to the information being encoded."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Website URL",
              desc: "Enter a valid HTTP or HTTPS website address.",
            },
            {
              title: "Text",
              desc: "Enter plain text, instructions, notes, or other information.",
            },
            {
              title: "Email",
              desc: "Provide an email address together with optional subject and message information supported by the generator.",
            },
            {
              title: "Phone",
              desc: "Enter a valid phone number for compatible calling workflows.",
            },
            {
              title: "SMS",
              desc: "Enter the recipient phone number and SMS message.",
            },
            {
              title: "WhatsApp",
              desc: "Provide compatible WhatsApp contact and messaging information.",
            },
            {
              title: "WiFi",
              desc: "Enter the network SSID, security type, and password when required.",
            },
            {
              title: "vCard",
              desc: "Enter supported contact information such as name, email, phone, and website.",
            },
            {
              title: "Location",
              desc: "Enter valid latitude and longitude coordinates.",
            },
            {
              title: "Event",
              desc: "Provide supported event information for compatible calendar workflows.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="design-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="design-heading"
          title="QR Code Colors, Size, Logo & Error Correction"
          description="Customize the generated QR code while keeping scanning reliability in mind."
        />

        <FeatureGrid items={qrDesignFeatures} />
      </section>

      <section
        aria-labelledby="card-customization-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="card-customization-heading"
          title="Customize Your QR Code Card"
          description="Add presentation content around the QR code for branded instructions, menus, signs, cards, documents, and other visual materials."
        />

        <FeatureGrid items={cardCustomizationFeatures} />

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-semibold">
            QR Card Customization Options
          </h3>

          <p className="mt-2 text-sm leading-6 text-white/70">
            Enable QR card customization when you want more than the QR
            pattern itself. You can add a title and description, upload a
            supporting image, change title and description colors, choose a
            card background, and select separate fonts for the title and
            description. This is useful when the exported QR code needs to
            communicate its purpose without additional design software.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="preview-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="preview-heading"
          title="Live QR Code Preview"
          description="Review the generated QR code and customized presentation before downloading the final file."
        />

        <div className="grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Check Scanability
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Make sure the QR pattern remains clear and has sufficient
              foreground and background contrast.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Check Card Content
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Review the title, description, image, colors, and fonts when
              QR card customization is enabled.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Test Before Publishing
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Scan the final design with a real phone before printing or
              distributing it.
            </p>
          </article>
        </div>
      </section>

      <section
        aria-labelledby="export-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="export-heading"
          title="Download QR Codes as PNG, SVG or PDF"
          description="Choose an export format based on whether you need a digital image, scalable artwork, or a document-oriented file."
        />

        <FeatureGrid items={exportFeatures} />
      </section>

      <section
        aria-labelledby="scanner-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="scanner-heading"
          title="QR Code Scanner & Reader"
          description="Decode QR codes directly in the browser using your camera or an uploaded image."
        />

        <FeatureGrid items={scannerFeatures} />
      </section>

      <section
        aria-labelledby="scan-results-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="scan-results-heading"
          title="What to Do After Scanning a QR Code"
          description="Review decoded information before copying or opening it."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Review",
              desc: "Check the decoded QR content before taking an action.",
            },
            {
              title: "Copy",
              desc: "Copy supported decoded content to the clipboard.",
            },
            {
              title: "Open",
              desc: "Open supported URLs or communication actions when appropriate.",
            },
            {
              title: "Check External Sites",
              desc: "Review unfamiliar external website addresses before continuing.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="mobile-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="mobile-heading"
          title="QR Code Scanner on Mobile"
          description="Use a supported smartphone or tablet camera to scan QR codes directly from the browser."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Scan with Your Camera
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Open the scanner on a supported mobile browser, allow camera
              access when requested, and point the camera at the QR code.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Scan from an Image
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-white/70">
              If you already have a QR code photo or screenshot, upload the
              image instead of using the camera.
            </p>
          </article>
        </div>
      </section>

      <section
        aria-labelledby="privacy-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="privacy-heading"
          title="QR Code Privacy & Browser-Based Processing"
          description="The generator and scanner are designed around client-side browser workflows."
        />

        <FeatureGrid items={privacyFeatures} />
      </section>

      <section
        aria-labelledby="use-cases-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="use-cases-heading"
          title="QR Code Use Cases"
          description="Create QR codes for personal, business, marketing, hospitality, event, contact-sharing, and digital-content workflows."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {supportedUseCases.map((item) => (
            <article
              key={item.useCase}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.useCase}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="how-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="how-heading"
          title="How to Create and Scan a QR Code"
          description="Follow these steps to generate, customize, export, and scan QR codes."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm"
                aria-hidden="true"
              >
                {index + 1}
              </div>

              <div
                className="mt-3 text-lg"
                aria-hidden="true"
              >
                {step.icon}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {step.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="accessibility-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="accessibility-heading"
          title="QR Code Design, Accessibility & Usability"
          description="A good QR code design should communicate its purpose while preserving readability and scanning reliability."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {accessibilityAndUsability.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="best-practices-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="best-practices-heading"
          title="QR Code Best Practices for Reliable Scanning"
          description="Use these guidelines before publishing, displaying, or printing a QR code."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {bestPractices.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="tips-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="tips-heading"
          title="QR Code Tips & Tricks"
          description="Practical guidance for creating, designing, publishing, printing, and scanning QR codes."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="why-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-heading"
          title="Why Use This QR Code Generator & Scanner?"
        />

        <div className="space-y-4">
          <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
            This free QR code tool combines QR generation, QR customization,
            live preview, export, and QR scanning in one browser-based
            workspace. Create QR codes for common information types, customize
            colors and size, add a logo, choose error correction, and download
            the finished QR code as PNG, SVG, or PDF.
          </p>

          <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
            The optional QR card customization feature adds a presentation
            layer around the generated QR code. Add a title, description,
            supporting image, colors, and fonts when the QR code needs
            additional context for menus, signs, business materials,
            instructions, campaigns, or printed cards.
          </p>

          <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
            The scanner complements the generator by allowing compatible
            cameras and uploaded images to be used for QR decoding. Scanned
            content can be reviewed and copied, while supported actions can be
            opened with additional checks for external destinations.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions About QR Codes"
          description="Answers to common questions about creating, customizing, exporting, scanning, and using QR codes."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-4 py-3">
                <p className="text-sm leading-6 text-white/70">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="related-tools-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="related-tools-heading"
          title="Related Online Tools"
          description="Explore other useful browser-based tools from Atoolix."
        />

        <RelatedTools toolId="qrcode/qr-code-generator" />
      </section>
    </div>
  );
}
