import Link from "next/link";
import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl;
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
    q: "What can I generate a QR code for?",
    a: "You can generate QR codes for URLs, plain text, email addresses, phone numbers, SMS messages, WhatsApp messages, WiFi network credentials, contact cards (vCard), map locations, and calendar events.",
  },
  {
    q: "Can I customize the look of my QR code?",
    a: "Yes. You can customize the QR code colors and add a logo to the center while maintaining suitable error correction for reliable scanning.",
  },
  {
    q: "Will a QR code with a logo still scan correctly?",
    a: "Yes, provided the QR code has enough error correction and the logo does not cover too much of the encoded pattern. Testing the finished code with a real phone camera before publishing is recommended.",
  },
  {
    q: "What is QR code error correction?",
    a: "Error correction allows a QR scanner to recover encoded information when part of the code is damaged, dirty, or covered. Higher correction levels are useful when adding logos or when a printed code may experience wear.",
  },
  {
    q: "What formats can I download my QR code in?",
    a: "You can download QR codes as PNG, SVG, or PDF, depending on the available export options and whether you need the code for digital use, printing, or vector-based layouts.",
  },
  {
    q: "Which QR code format is best for printing?",
    a: "SVG or PDF are generally better for printing because vector graphics remain sharp when resized. PNG is usually more convenient for websites, email, and social media.",
  },
  {
    q: "Can I create a QR code for my WiFi network?",
    a: "Yes. Enter the required WiFi network information and the generated QR code can allow compatible phones to connect without manually typing the network credentials.",
  },
  {
    q: "Can I create a QR code for contact details?",
    a: "Yes. The vCard option can encode contact information so a compatible scanner can offer to save the details to the phone's contacts.",
  },
  {
    q: "Can I create a QR code for an event?",
    a: "Yes. You can encode event information so compatible devices can use the scanned information for calendar-related actions.",
  },
  {
    q: "Can I create a QR code for WhatsApp?",
    a: "Yes. You can encode a WhatsApp-compatible phone number and optional message so scanning the QR code can open the relevant conversation.",
  },
  {
    q: "Does the tool include a QR code scanner?",
    a: "Yes. The tool includes QR scanning using a compatible device camera or an uploaded image containing a QR code.",
  },
  {
    q: "What can I do with a scanned QR result?",
    a: "You can copy the decoded content or open it directly when the result is a supported URL.",
  },
  {
    q: "Is there a limit to how many QR codes I can generate?",
    a: "There is no stated generation limit for normal use. You can create and download QR codes as needed.",
  },
  {
    q: "Do I need an account to use the QR code generator?",
    a: "No. The tool can be used without creating an account or signing in.",
  },
  {
    q: "Is my QR code data uploaded to a server?",
    a: "No. QR generation and scanning are designed to run in the browser, so the content you enter or scan is not uploaded to a server for processing.",
  },
  {
    q: "Does the tool store the QR codes I create?",
    a: "The QR code content is not stored as part of the generation process. Generated codes exist in the browser session unless you choose to save or download them yourself.",
  },
  {
    q: "Can I use the QR code generator on my phone?",
    a: "Yes. The interface is responsive and can be used from smartphones, tablets, laptops, and desktop browsers. Camera scanning depends on browser and device permissions.",
  },
  {
    q: "Do QR codes generated here expire?",
    a: "A QR code itself does not automatically expire. If it contains a URL, however, the destination website or service can change or become unavailable independently of the QR code.",
  },
  {
    q: "Can I change the QR code colors?",
    a: "Yes. You can customize the foreground and background colors and preview the resulting QR code before downloading it.",
  },
  {
    q: "Is this QR code generator free?",
    a: "Yes. The QR code generator and scanner is free to use and does not require an account.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Choose a QR type",
    desc: "Choose the data you want to encode, such as a URL, text, email, phone number, SMS, WhatsApp, WiFi, contact, location, or event.",
    icon: "🧩",
  },
  {
    title: "Enter your details",
    desc: "Enter the information required for the selected QR code type.",
    icon: "⌨️",
  },
  {
    title: "Customize the design",
    desc: "Adjust available colors, add a logo, and select an appropriate error correction level.",
    icon: "🎨",
  },
  {
    title: "Preview and download",
    desc: "Check the generated code and download it in the format that best fits your intended use.",
    icon: "⬇️",
  },
  {
    title: "Scan when needed",
    desc: "Use the built-in scanner with a compatible camera or upload an image containing a QR code.",
    icon: "📷",
  },
];

const generatorFeatures: FeatureItem[] = [
  {
    name: "URL",
    desc: "Turn a website address into a scannable QR code.",
  },
  {
    name: "Text",
    desc: "Encode plain text and information into a QR code.",
  },
  {
    name: "Email",
    desc: "Create a QR code for an email address or message.",
  },
  {
    name: "Phone",
    desc: "Encode a phone number for convenient dialing.",
  },
  {
    name: "SMS",
    desc: "Create a QR code containing a recipient and message.",
  },
  {
    name: "WhatsApp",
    desc: "Open a WhatsApp conversation with encoded information.",
  },
  {
    name: "WiFi",
    desc: "Share compatible WiFi network credentials through a QR code.",
  },
  {
    name: "vCard",
    desc: "Share contact information in a scannable format.",
  },
  {
    name: "Location",
    desc: "Encode a geographic location for map-based use.",
  },
  {
    name: "Event",
    desc: "Encode event information for compatible calendar workflows.",
  },
];

const customizationFeatures: FeatureItem[] = [
  {
    name: "Custom colors",
    desc: "Adjust the QR code appearance to fit your brand or design.",
  },
  {
    name: "Logo upload",
    desc: "Place a logo in the center of the QR code.",
  },
  {
    name: "Error correction",
    desc: "Improve resilience against partial damage or logo coverage.",
  },
  {
    name: "PNG export",
    desc: "Convenient for websites, email, documents, and social media.",
  },
  {
    name: "SVG export",
    desc: "Use a scalable vector format for sharp resizing and print workflows.",
  },
  {
    name: "PDF export",
    desc: "Create a print-friendly document containing the generated QR code.",
  },
];

const scannerFeatures: FeatureItem[] = [
  {
    name: "Camera scan",
    desc: "Scan QR codes directly with a compatible device camera.",
  },
  {
    name: "Upload image",
    desc: "Decode QR codes from photos, screenshots, or image files.",
  },
  {
    name: "Copy result",
    desc: "Copy decoded QR content to your clipboard.",
  },
  {
    name: "Open URL",
    desc: "Open a decoded web address when the result is a supported URL.",
  },
];

const privacyFeatures: FeatureItem[] = [
  {
    name: "Browser based",
    desc: "QR generation and scanning are processed in the browser.",
  },
  {
    name: "No server upload",
    desc: "QR content is not uploaded to a server for generation or scanning.",
  },
  {
    name: "No account",
    desc: "Use the tool without registration or login.",
  },
  {
    name: "Privacy focused",
    desc: "QR content is not stored as part of the generation workflow.",
  },
];

const supportedUseCases = [
  {
    useCase: "Restaurant menus",
    note: "Let customers scan a table QR code to access a digital menu.",
  },
  {
    useCase: "Business cards",
    note: "Share contact information through a scannable vCard.",
  },
  {
    useCase: "Event flyers",
    note: "Give attendees a convenient way to access event information.",
  },
  {
    useCase: "WiFi access",
    note: "Share compatible network credentials without manually typing them.",
  },
  {
    useCase: "Product packaging",
    note: "Connect customers to manuals, product pages, support information, or warranties.",
  },
  {
    useCase: "Marketing materials",
    note: "Connect printed materials with websites, contact details, or messaging channels.",
  },
];

const bestPractices = [
  "Test every QR code with a real phone before printing or publishing it.",
  "Use suitable error correction when adding a logo or when the printed code may be damaged.",
  "Maintain strong contrast between the QR pattern and its background.",
  "Use SVG or PDF for many print workflows and PNG for typical digital use.",
  "Leave sufficient quiet space around the QR code so scanners can identify its boundaries.",
  "Double-check encoded WiFi, contact, event, and messaging information before sharing.",
];

const tips = [
  "Add a short instruction such as 'Scan to view menu' so users understand the purpose of the code.",
  "Avoid placing QR codes on highly reflective, curved, or visually distorted surfaces.",
  "Keep dense QR codes large enough to scan reliably when printed.",
  "Keep a copy of the original source information so you can regenerate the code later.",
  "Check the QR code at its actual display or print size before publishing it.",
  "When scanning an unfamiliar QR code, review the decoded destination before opening it.",
];

const relatedTools = [
  {
    name: "Timezone Converter",
    href: "/tools/datetime/timezone-converter",
  },
  {
    name: "Meeting Time Finder",
    href: "/tools/datetime/meeting-time-finder",
  },
  {
    name: "Unit Converter",
    href: "/tools/converter",
  },
  {
    name: "Calculator",
    href: "/tools/calculator",
  },
  {
    name: "PDF Tools",
    href: "/tools/pdf",
  },
  {
    name: "Image Tools",
    href: "/tools/image",
  },
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
    "Learn how to generate, customize, download, and scan a QR code using the Atoolix QR Code Generator and Scanner.",
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

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Related Atoolix Tools",
  itemListElement: relatedTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `${siteUrl}${tool.href}`,
  })),
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QR Code Generator & Scanner",
  url: canonicalUrl,
  mainEntityOfPage: canonicalUrl,
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "QR Code Generator and Scanner",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires a modern web browser. Camera scanning requires device and browser camera access.",
  description:
    "Free online QR code generator and scanner for URLs, text, email, phone numbers, SMS, WhatsApp, WiFi, vCards, locations, and events, with customization and multiple export formats.",
  isAccessibleForFree: true,
  featureList: [
    "QR code generation",
    "QR code scanning",
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
    "Custom QR colors",
    "Logo support",
    "Error correction",
    "PNG export",
    "SVG export",
    "PDF export",
  ],
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-1.5">
      <h2 id={id} className="text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>

      {description ? (
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

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
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />

      <section
        aria-labelledby="intro-heading"
        className="space-y-3"
      >
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free QR Code Generator & Scanner
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          QR Code Generator & Scanner – Create, Customize, and Scan QR Codes
          Instantly
        </h2>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Generate QR codes for URLs, text, email, phone numbers, SMS,
          WhatsApp, WiFi, vCard contacts, locations, and events. Customize
          colors, add a logo, and export QR codes in supported formats such as
          PNG, SVG, or PDF. You can also scan QR codes using a compatible
          camera or an uploaded image.
        </p>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          QR generation and scanning are designed to run directly in your
          browser, so you can use the tool without creating an account or
          uploading QR content to a processing server.
        </p>
      </section>

      <section
        aria-labelledby="generator-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="generator-heading"
          title="Supported QR Code Types"
          description="Encode the type of information you need, from a simple website link to contact, WiFi, messaging, location, or event information."
        />

        <FeatureGrid items={generatorFeatures} />
      </section>

      <section
        aria-labelledby="customization-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="customization-heading"
          title="QR Code Customization & Export"
          description="Customize the appearance of your QR code and choose an appropriate output format for digital or print use."
        />

        <FeatureGrid items={customizationFeatures} />
      </section>

      <section
        aria-labelledby="scanner-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="scanner-heading"
          title="Built-in QR Code Scanner"
          description="Decode QR codes from your device camera or from an uploaded image without leaving the tool."
        />

        <FeatureGrid items={scannerFeatures} />
      </section>

      <section
        aria-labelledby="privacy-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="privacy-heading"
          title="QR Code Privacy & Security"
          description="QR generation and scanning are designed around browser-based processing."
        />

        <FeatureGrid items={privacyFeatures} />
      </section>

      <section
        aria-labelledby="use-cases-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="use-cases-heading"
          title="Common QR Code Use Cases"
          description="QR codes connect printed or physical experiences with digital information."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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
          description="Choose a data type, enter your information, customize the design, and download the finished QR code."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
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
          title="QR Code Best Practices"
          description="Follow these guidelines to improve scanning reliability before publishing or printing a QR code."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {bestPractices.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
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
          description="Practical ways to make QR codes easier to scan and more useful in real-world situations."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
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
          title="Why Use This QR Code Generator?"
        />

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          This QR code tool combines generation, customization, export, and
          scanning in one browser-based workspace. You can create QR codes for
          common data types, adjust their appearance, download them in
          supported formats, and decode existing QR codes without switching
          between separate tools.
        </p>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          The browser-based workflow also means you can use the generator
          without creating an account or uploading QR content for server-side
          processing.
        </p>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about creating, customizing, scanning, and using QR codes."
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
        aria-labelledby="cta-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="cta-heading"
          title="Explore More Free Atoolix Tools"
          description="Continue exploring browser-based tools for everyday calculations, conversions, documents, images, and time-related tasks."
        />

        <nav
          aria-label="Related Atoolix tools"
          className="flex flex-wrap gap-2.5"
        >
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {tool.name}
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}