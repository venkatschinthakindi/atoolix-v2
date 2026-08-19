import Link from "next/link";
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
    a: "A QR code generator creates scannable QR codes from information such as website URLs, text, email addresses, phone numbers, SMS messages, WiFi credentials, contact details, locations, and events.",
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
    a: "Yes. Enter a website address and the generator creates a QR code that compatible phones and QR scanners can use to open the URL.",
  },
  {
    q: "Can I create a QR code for WiFi?",
    a: "Yes. You can encode compatible WiFi network information into a QR code so supported devices can use the scanned information to connect without manually entering the network details.",
  },
  {
    q: "Can I create a QR code for a contact or vCard?",
    a: "Yes. The vCard option lets you encode contact information into a QR code that compatible devices can use to save or process the contact details.",
  },
  {
    q: "Can I create a QR code for email, phone, or SMS?",
    a: "Yes. The generator supports email addresses, phone numbers, and SMS information so users can create QR codes for communication workflows.",
  },
  {
    q: "Can I create a WhatsApp QR code?",
    a: "Yes. You can encode compatible WhatsApp contact information and optional messaging details into a QR code.",
  },
  {
    q: "Can I create a QR code for a location?",
    a: "Yes. The location option can encode geographic information for compatible map and location workflows.",
  },
  {
    q: "Can I create a QR code for an event?",
    a: "Yes. Event information can be encoded into a QR code for compatible calendar and event workflows.",
  },
  {
    q: "Can I customize the QR code colors?",
    a: "Yes. You can customize the foreground color and background color and see the result in the live preview before exporting the QR code.",
  },
  {
    q: "Can I add a logo to a QR code?",
    a: "Yes. You can upload a logo and place it in the QR code design. Using appropriate error correction and testing the finished QR code helps maintain reliable scanning.",
  },
  {
    q: "What is QR code error correction?",
    a: "QR code error correction helps scanners recover encoded information when part of a QR code is damaged, obscured, dirty, or covered. Higher error correction can be useful when adding a logo or preparing codes for physical use.",
  },
  {
    q: "Can I change the QR code size?",
    a: "Yes. The generator supports custom QR code sizing so you can create a code appropriate for digital displays, documents, labels, signage, or printing.",
  },
  {
    q: "Does the QR code have a live preview?",
    a: "Yes. The QR code can be previewed while you adjust supported settings such as colors, logo, and size before exporting the finished code.",
  },
  {
    q: "What formats can I download a QR code in?",
    a: "Supported export formats include PNG, SVG, and PDF. PNG is convenient for many digital uses, while SVG and PDF are useful for scalable and print-oriented workflows.",
  },
  {
    q: "Which QR code format is best for printing?",
    a: "SVG or PDF are generally useful for print workflows because they can preserve sharp output when resized. PNG is convenient for many websites, documents, email messages, and social media uses.",
  },
  {
    q: "Can I scan a QR code with my phone camera?",
    a: "Yes. The built-in QR scanner can use a compatible device camera when camera access is available. This makes the tool useful on smartphones and other supported devices.",
  },
  {
    q: "Can I scan a QR code from an image?",
    a: "Yes. You can upload an image containing a QR code, including a photo or screenshot, and use the scanner to decode supported QR content.",
  },
  {
    q: "Does the tool work on mobile phones?",
    a: "Yes. The responsive interface is designed for smartphones, tablets, laptops, and desktop browsers. Camera scanning depends on browser support and camera permissions.",
  },
  {
    q: "What can I do with a scanned QR result?",
    a: "You can copy the decoded QR content or open it directly when the result is a supported URL. When scanning unfamiliar codes, review the destination before opening it.",
  },
  {
    q: "Is my QR code data uploaded to a server?",
    a: "QR generation and scanning are designed to run directly in the browser, so the QR content is not uploaded to a processing server as part of the normal workflow.",
  },
  {
    q: "Does the tool store the QR codes I create?",
    a: "The QR content is not stored as part of the normal generation workflow. Generated QR codes remain available in the browser workflow unless you choose to save or download them.",
  },
  {
    q: "Do QR codes expire?",
    a: "A QR code itself does not automatically expire. If it contains a URL, the destination website or service can later change or become unavailable independently of the QR code.",
  },
  {
    q: "How can I make a QR code easier to scan?",
    a: "Use strong contrast between the QR pattern and background, leave enough quiet space around the code, choose an appropriate size, avoid excessive logo coverage, and test the finished QR code with a real phone before publishing or printing it.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Choose a QR type",
    desc: "Select the information you want to encode, such as a URL, text, email, phone number, SMS, WhatsApp, WiFi, contact, location, or event.",
    icon: "🧩",
  },
  {
    title: "Enter your information",
    desc: "Provide the details required for the selected QR code type and review the information before generating the code.",
    icon: "⌨️",
  },
  {
    title: "Customize the QR code",
    desc: "Adjust the foreground color, background color, logo, error correction, and supported QR code size settings.",
    icon: "🎨",
  },
  {
    title: "Check the live preview",
    desc: "Review the QR code preview and make sure the design has sufficient contrast and remains easy to scan.",
    icon: "👁️",
  },
  {
    title: "Export the QR code",
    desc: "Download the finished QR code as PNG, SVG, or PDF according to your digital or print requirements.",
    icon: "⬇️",
  },
  {
    title: "Scan when needed",
    desc: "Use the QR scanner with a compatible device camera or upload an image such as a photo or screenshot containing a QR code.",
    icon: "📷",
  },
];

const generatorFeatures: FeatureItem[] = [
  {
    name: "URL QR Code",
    desc: "Turn a website address into a scannable QR code for websites, landing pages, menus, campaigns, and digital content.",
  },
  {
    name: "Text QR Code",
    desc: "Encode plain text, instructions, notes, or other text information into a QR code.",
  },
  {
    name: "Email QR Code",
    desc: "Create a QR code for an email address and supported message information.",
  },
  {
    name: "Phone QR Code",
    desc: "Encode a phone number so compatible scanners can use the information for convenient calling workflows.",
  },
  {
    name: "SMS QR Code",
    desc: "Create a QR code containing supported SMS recipient and message information.",
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
    desc: "Share contact information in a QR code that compatible devices can use for contact workflows.",
  },
  {
    name: "Location QR Code",
    desc: "Encode geographic location information for compatible map and location workflows.",
  },
  {
    name: "Event QR Code",
    desc: "Encode event information for compatible calendar and event workflows.",
  },
];

const customizationFeatures: FeatureItem[] = [
  {
    name: "Foreground Color",
    desc: "Customize the main QR pattern color to match your visual style or branding.",
  },
  {
    name: "Background Color",
    desc: "Choose the QR code background color while maintaining suitable contrast for scanning.",
  },
  {
    name: "Logo Upload",
    desc: "Upload a logo and place it within the QR code design for branded QR codes.",
  },
  {
    name: "Error Correction",
    desc: "Choose suitable error correction to improve resilience against partial damage or logo coverage.",
  },
  {
    name: "Custom QR Size",
    desc: "Adjust the QR code size for different digital, document, label, signage, and print requirements.",
  },
  {
    name: "Live Preview",
    desc: "Preview the QR code while customizing supported design settings before exporting it.",
  },
  {
    name: "PNG Export",
    desc: "Download a convenient raster image for websites, documents, email, social media, and other digital uses.",
  },
  {
    name: "SVG Export",
    desc: "Export a scalable vector QR code that can remain sharp when resized for many design and print workflows.",
  },
  {
    name: "PDF Export",
    desc: "Download a print-friendly PDF containing the generated QR code for supported document and printing workflows.",
  },
];

const scannerFeatures: FeatureItem[] = [
  {
    name: "QR Code Scanner",
    desc: "Decode supported QR codes directly inside the browser without switching to a separate scanning tool.",
  },
  {
    name: "Camera Scan",
    desc: "Scan QR codes using a compatible smartphone, tablet, laptop, or desktop camera when camera access is available.",
  },
  {
    name: "Image Scan",
    desc: "Upload an image containing a QR code and decode supported QR content from the file.",
  },
  {
    name: "Photo & Screenshot Scan",
    desc: "Use saved photos, screenshots, or other supported image files containing QR codes.",
  },
  {
    name: "QR Code Reader",
    desc: "Read decoded QR content and review the result before taking the next action.",
  },
  {
    name: "Copy Result",
    desc: "Copy decoded QR content to the clipboard for convenient use in another application.",
  },
  {
    name: "Open URL",
    desc: "Open a decoded web address when the scanned result is a supported URL.",
  },
];

const privacyFeatures: FeatureItem[] = [
  {
    name: "Browser Based",
    desc: "QR generation and scanning are designed to run directly in your browser.",
  },
  {
    name: "No Server Upload",
    desc: "QR content is not uploaded to a processing server as part of the normal generation and scanning workflow.",
  },
  {
    name: "No Account",
    desc: "Use the QR code generator and scanner without creating an account or signing in.",
  },
  {
    name: "Privacy Focused",
    desc: "QR content is not stored as part of the normal generation workflow.",
  },
];

const supportedUseCases = [
  {
    useCase: "Restaurant Menus",
    note: "Create QR codes that let customers access digital menus from printed table cards, signs, or promotional materials.",
  },
  {
    useCase: "Business Cards",
    note: "Share contact details through a scannable vCard QR code and make it easier for people to save your information.",
  },
  {
    useCase: "WiFi Access",
    note: "Share compatible network information through a QR code instead of requiring visitors to manually type network credentials.",
  },
  {
    useCase: "Event Information",
    note: "Connect printed invitations, posters, or event materials with supported event information.",
  },
  {
    useCase: "Product Packaging",
    note: "Connect packaging with product pages, manuals, support information, documentation, or other supported web content.",
  },
  {
    useCase: "Marketing Materials",
    note: "Connect flyers, posters, brochures, signs, and other physical marketing materials with digital destinations.",
  },
  {
    useCase: "Contact Sharing",
    note: "Share phone, email, and contact information through convenient scannable QR codes.",
  },
  {
    useCase: "Digital Content",
    note: "Create QR codes for websites, text, messaging, and other information that users can access from a compatible device.",
  },
];

const bestPractices = [
  "Test every QR code with a real phone before printing or publishing it.",
  "Use strong contrast between the foreground QR pattern and the background.",
  "Choose suitable error correction when adding a logo or when the printed QR code may experience damage.",
  "Keep sufficient quiet space around the QR code so scanners can identify its boundaries.",
  "Choose a QR code size appropriate for the distance and environment in which it will be scanned.",
  "Use SVG or PDF for many print workflows and PNG for typical digital use.",
  "Double-check encoded WiFi, contact, event, messaging, and URL information before sharing.",
  "Avoid excessive logo coverage or visual changes that interfere with the QR pattern.",
];

const tips = [
  "Add a short instruction such as 'Scan to view menu' or 'Scan for details' when the QR code is used in physical materials.",
  "Test QR codes at their actual display or print size rather than only checking a large preview.",
  "Avoid placing QR codes on highly reflective, curved, distorted, or visually cluttered surfaces.",
  "Keep dense QR codes large enough to scan reliably in the intended environment.",
  "Maintain strong foreground and background contrast for better scanning reliability.",
  "Keep a copy of the original source information so you can regenerate the QR code later.",
  "When scanning an unfamiliar QR code, review the decoded destination before opening it.",
  "For branded QR codes, test the final logo, color, size, and error-correction combination with multiple devices.",
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create and Scan a QR Code",
  description:
    "Learn how to generate, customize, export, and scan a QR code using the Atoolix QR Code Generator and Scanner.",
  totalTime: "PT1M",
  step: howToSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.desc,
  })),
};

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
  name: "Free QR Code Generator & Scanner",
  url: canonicalUrl,
  mainEntityOfPage: canonicalUrl,
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "QR Code Generator and Scanner",
  operatingSystem: "Web Browser",
  browserRequirements:
    "Requires a modern web browser. Camera scanning requires device and browser camera access.",
  description:
    "Free online QR code generator and scanner for URLs, text, email, phone numbers, SMS, WhatsApp, WiFi, vCards, locations, and events, with custom colors, logo upload, error correction, custom QR size, live preview, camera scanning, image scanning, and PNG, SVG, and PDF export.",
  isAccessibleForFree: true,
  featureList: [
    "QR code generation",
    "Free QR code generator",
    "Online QR code maker",
    "QR code scanning",
    "QR code reader",
    "Mobile QR code scanning",
    "Camera QR code scanning",
    "Image QR code scanning",
    "Photo QR code scanning",
    "Screenshot QR code scanning",
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
    "Logo upload",
    "QR code error correction",
    "QR scan reliability settings",
    "Custom QR code size",
    "Live QR code preview",
    "PNG export",
    "SVG export",
    "PDF export",
    "Browser-based QR processing",
  ],
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
  }
};

function FeatureGrid({ items }: { items: FeatureItem[] }) {
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
    <div className="mx-auto space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Online QR Code Generator & Scanner
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Free QR Code Generator & Scanner – Create, Customize & Scan QR Codes
          Instantly
        </h2>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Create QR codes online for URLs, text, email, phone numbers, SMS,
          WhatsApp, WiFi, vCards, locations, and events. Customize the
          foreground and background colors, upload a logo, adjust supported QR
          code size and error correction, preview the result live, and export
          your QR code as PNG, SVG, or PDF.
        </p>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          You can also use the built-in QR code scanner and reader to scan
          codes from a compatible camera or upload an image, photo, or
          screenshot containing a QR code. The responsive browser-based
          workflow is designed for smartphones, tablets, laptops, and desktop
          browsers.
        </p>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          QR generation and scanning are designed to run directly in your
          browser, so you can use the tool without creating an account or
          uploading QR content to a processing server as part of the normal
          workflow.
        </p>
      </section>

      <section
        aria-labelledby="generator-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="generator-heading"
          title="QR Code Generator: Supported QR Types"
          description="Create different types of QR codes from the information you want to share, from a simple website URL to WiFi, contacts, messaging, locations, and events."
        />

        <FeatureGrid items={generatorFeatures} />
      </section>

      <section
        aria-labelledby="customization-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="customization-heading"
          title="QR Code Customization, Live Preview & Export"
          description="Customize the appearance and size of your QR code, preview the result, and export it in a format suited to digital or print use."
        />

        <FeatureGrid items={customizationFeatures} />
      </section>

      <section
        aria-labelledby="scanner-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="scanner-heading"
          title="QR Code Scanner & Reader"
          description="Scan and decode QR codes directly from a compatible device camera or from an uploaded image, photo, or screenshot."
        />

        <FeatureGrid items={scannerFeatures} />
      </section>

      <section
        aria-labelledby="mobile-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="mobile-heading"
          title="QR Code Scanner on Mobile"
          description="Use your smartphone or tablet camera to scan QR codes when your browser supports camera access."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold sm:text-[0.95rem]">
              Scan with Your Camera
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Open the scanner on a supported mobile browser, allow camera
              access when requested, and point the camera at the QR code.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold sm:text-[0.95rem]">
              Scan from an Image
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-white/70">
              If you already have a QR code photo or screenshot, upload the
              image instead of using the camera to decode the QR content.
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
          title="QR Code Privacy & Security"
          description="The QR code generator and scanner are designed around browser-based processing."
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
          description="Create QR codes for everyday personal, business, marketing, hospitality, event, contact-sharing, and digital-content workflows."
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
          title="How to Create a QR Code"
          description="Choose the information type, enter your details, customize the QR code, preview it, and export the finished result."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {howToSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div
                className="text-lg"
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
        aria-labelledby="best-practices-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="best-practices-heading"
          title="QR Code Best Practices for Reliable Scanning"
          description="Use these guidelines to improve QR code readability before publishing, displaying, or printing your code."
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
          description="Practical tips for creating, publishing, printing, and scanning QR codes in real-world situations."
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
        className="space-y-3"
      >
        <SectionHeading
          id="why-heading"
          title="Why Use This QR Code Generator & Scanner?"
        />

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          This free QR code tool combines QR generation, customization,
          live preview, export, and scanning in one browser-based workspace.
          Create QR codes for common data types, customize their colors and
          design, add a logo, adjust supported size and error correction,
          download PNG, SVG, or PDF files, and scan existing QR codes from a
          compatible camera or uploaded image.
        </p>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          The responsive workflow makes the tool useful on mobile phones,
          tablets, laptops, and desktop browsers. You can generate or scan QR
          codes without creating an account, while browser-based processing is
          designed to keep QR content within the normal client-side workflow.
        </p>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions About QR Codes"
          description="Answers to common questions about generating, customizing, exporting, scanning, and using QR codes."
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

      <RelatedTools toolId="qrcode/qr-code-generator" />
    </div>
  );
}