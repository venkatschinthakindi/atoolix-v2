import type { Metadata } from "next";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/png-compressor";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Free PNG Compressor Online – Compress PNG Images with Transparency",
  description:
    "Compress PNG images online for free while preserving transparency and crisp detail. Reduce PNG file size for logos, screenshots, icons, and graphics with preview and instant download.",
  keywords: [
    "png compressor",
    "compress png",
    "compress png online",
    "free png compressor",
    "reduce png file size",
    "png size reducer",
    "optimize png",
    "png optimizer",
    "compress png with transparency",
    "compress transparent png",
    "compress png screenshots",
    "compress png logos",
    "compress png icons",
    "compress png for website",
    "compress png for email",
    "browser png compressor",
    "preview png compression",
    "lossless png compressor",
  ],
  alternates: {
    canonical: canonicalPath,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  applicationName: "PNG Compressor with Preview",
  category: "Utilities",
  openGraph: {
    title: "Free PNG Compressor Online – Compress PNG Images with Transparency",
    description:
      "Compress PNG images online for free while preserving transparency and crisp detail. Reduce PNG file size for logos, screenshots, icons, and graphics with preview and instant download.",
    url: canonicalUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PNG Compressor Online – Compress PNG Images with Transparency",
    description:
      "Compress PNG images online for free while preserving transparency and crisp detail. Reduce PNG file size for logos, screenshots, icons, and graphics with preview and instant download.",
  },
};

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  {
    q: "What does this PNG compressor do?",
    a: "It reduces PNG file size while preserving transparency and the sharp detail PNG is known for.",
  },
  {
    q: "Why use a PNG compressor?",
    a: "PNG files are often used for logos, screenshots, icons, and graphics, and compression helps make them easier to upload, share, and load.",
  },
  {
    q: "Does PNG compression keep transparency?",
    a: "Yes. The tool is designed to preserve transparent backgrounds and alpha channel areas.",
  },
  {
    q: "Is this tool free?",
    a: "Yes. You can use it without a paid plan.",
  },
  {
    q: "Can I preview the result first?",
    a: "Yes. You can preview the compressed PNG before downloading it.",
  },
  {
    q: "Will PNG compression reduce quality?",
    a: "It may if you compress too aggressively, but the goal is to keep the visual difference minimal for practical use.",
  },
  {
    q: "What kinds of PNG files work best?",
    a: "Logos, icons, UI graphics, screenshots, diagrams, and transparent images usually work very well.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Yes. The page is responsive and works on phones and tablets.",
  },
  {
    q: "Does compression change dimensions?",
    a: "No. Compression reduces file size, while dimensions stay the same unless you resize separately.",
  },
  {
    q: "Can I compress PNG for websites?",
    a: "Yes. Smaller PNGs are useful for page speed, design assets, and web graphics.",
  },
  {
    q: "Can I compress PNG for email?",
    a: "Yes. Smaller files are easier to send as attachments.",
  },
  {
    q: "Does this tool remove transparency?",
    a: "No. The goal is to keep PNG transparency intact while reducing file size.",
  },
];

const howToSteps: StepItem[] = [
  { title: "Choose a PNG file", desc: "Select a PNG image from your device.", icon: "📁" },
  { title: "Preview the graphic", desc: "Check the image before compression.", icon: "🖼️" },
  { title: "Adjust compression", desc: "Tune the settings for your file size goal.", icon: "🎚️" },
  { title: "Compress and compare", desc: "See the optimized result before downloading.", icon: "🔍" },
  { title: "Download instantly", desc: "Save the compressed PNG to your device.", icon: "⬇️" },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "Transparency Preserved",
    desc: "Keeps transparent backgrounds and alpha channels intact.",
    icon: "🔲",
  },
  {
    title: "Built for Graphics",
    desc: "Ideal for logos, icons, screenshots, and UI visuals.",
    icon: "🎨",
  },
  {
    title: "Preview Before Download",
    desc: "Review the result before saving the file.",
    icon: "👀",
  },
  {
    title: "Browser Processing",
    desc: "Compress images directly in the browser for a smoother workflow.",
    icon: "🌐",
  },
  {
    title: "Fast Export",
    desc: "Download the optimized PNG immediately.",
    icon: "⚡",
  },
  {
    title: "Quality-Friendly Compression",
    desc: "Reduce file size while keeping edges and text clear.",
    icon: "🎛️",
  },
  {
    title: "Mobile Ready",
    desc: "Works on desktop and mobile devices.",
    icon: "📱",
  },
  {
    title: "Made for PNG Use Cases",
    desc: "Best for transparent visuals and pixel-perfect assets.",
    icon: "🧩",
  },
];

const qualityGuide = [
  { range: "90–100%", reduction: "5–15% smaller", use: "When quality and pixel precision matter most" },
  { range: "75–90%", reduction: "20–40% smaller", use: "Best default for most PNG graphics" },
  { range: "60–75%", reduction: "40–70% smaller", use: "When you want lighter files for web use" },
  { range: "Below 60%", reduction: "Maximum compression", use: "Only when file size matters more than detail" },
];

const whenToCompress = [
  "Before uploading logos to websites.",
  "Before adding screenshots to blogs or docs.",
  "Before sending UI graphics by email.",
  "Before publishing icons or interface assets.",
  "Before storing transparent design files in bulk.",
];

const whenNotToCompress = [
  "Images that are already tiny.",
  "Files that must stay perfectly unchanged for editing.",
  "Print assets where you want maximum detail control.",
  "Graphics where the source file should remain untouched.",
];

const commonUses = [
  "Logos.",
  "Screenshots.",
  "Icons.",
  "UI graphics.",
  "Illustrations.",
  "Diagrams.",
  "Transparent overlays.",
  "Documentation images.",
];

const audience = [
  "Designers",
  "Developers",
  "Product teams",
  "Bloggers",
  "Students",
  "Teachers",
  "Marketers",
  "Online sellers",
  "Content creators",
  "Support teams",
];

const devices = ["Windows", "macOS", "Android", "iPhone"];

const relatedTools = [
  { name: "Compress Image", href: "/tools/image/compress-image" },
  { name: "Compress JPG", href: "/tools/image/compress-jpg" },
  { name: "Compress Image to Custom Size", href: "/tools/image/compress-image-to-100kb" },
  { name: "Passport Photo Resizer", href: "/tools/image/passport-photo-resizer" },
  { name: "Signature Photo Resizer", href: "/tools/image/resize-signature-for-upload" },
  { name: "Compress Image to 20 KB", href: "/tools/image/compress-image-to-20kb" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress PNG Images",
  description: "Compress PNG images online with preview and transparency support.",
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
    { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
    { "@type": "ListItem", position: 2, name: "PNG Compressor with Preview", item: canonicalUrl },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Related Image Tools",
  itemListElement: relatedTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `${siteUrl}${tool.href}`,
  })),
};

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function SectionHeading({ id, title, description }: { id: string; title: string; description?: string }) {
  return (
    <div className="space-y-1.5">
      <h2 id={id} className="text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {description ? <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">{description}</p> : null}
    </div>
  );
}

export default function PngCompressorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          PNG Transparency Compressor
        </p>
        <h2 id="intro-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Free PNG Compressor Online – Compress PNG Images with Transparency
        </h2>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Compress PNG images online without losing the properties that make PNG useful in the first place. Keep transparent backgrounds, sharp edges, and clean graphic detail while reducing file size with preview and download controls.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          PNG is the format people often choose for logos, screenshots, icons, UI assets, and illustrations. This tool is intentionally focused on PNG so users can optimize graphics without switching to a different format or dealing with unnecessary complexity.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          If you need a smaller PNG for a website, document, email, or design workflow, this page gives you a direct way to reduce file size while keeping transparency and visual clarity intact.
        </p>
      </section>

      <section aria-labelledby="why-png-heading" className="space-y-4">
        <SectionHeading id="why-png-heading" title="Why Compress PNG Images?" description="PNG compression helps make graphics lighter without breaking the visual qualities people expect." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Preserve transparency", "PNG is often used because it supports transparent backgrounds."],
            ["Reduce page weight", "Smaller PNG files help websites and apps load faster."],
            ["Make graphics easier to share", "Compressed files are simpler to send in email or chat."],
            ["Save storage space", "Smaller graphics take less room on your device or server."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="why-specific-heading" className="space-y-4">
        <SectionHeading id="why-specific-heading" title="Why Use a Dedicated PNG Compressor?" description="A focused PNG tool feels more relevant than a general image utility." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Built for transparency", "The page is centered on preserving alpha channels and transparent areas."],
            ["Better for graphics", "PNG is strongest for logos, icons, screenshots, and sharp UI elements."],
            ["Cleaner file filtering", "Users can focus on PNG files instead of mixed-format uploads."],
            ["Less confusion", "The tool is easy to understand because it solves one clear job."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="space-y-4">
        <SectionHeading id="trust-heading" title="How Your PNG Files Are Processed" description="The workflow is designed for speed, privacy, and predictable output." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Runs in the browser", "The compression workflow stays inside the browser experience."],
            ["No extra conversion step", "Users can optimize PNGs without changing format goals."],
            ["Instant preview", "Check the result before downloading the file."],
            ["Better control", "You can decide how small the file should be without guessing."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="quality-heading" className="space-y-4">
        <SectionHeading id="quality-heading" title="Recommended Compression Levels" description="Use this guide to choose the best balance of size and clarity." />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Quality</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Typical Reduction</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Best For</th>
              </tr>
            </thead>
            <tbody>
              {qualityGuide.map((item) => (
                <tr key={item.range} className="border-t border-white/10">
                  <td className="px-3 py-2.5 sm:px-4">{item.range}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.reduction}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="comparison-heading" className="space-y-4">
        <SectionHeading id="comparison-heading" title="What This Tool Gives You" description="These are the features users expect from a strong PNG compressor." />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Feature</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Included</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Transparency preserved", "✅"],
                ["Preview before download", "✅"],
                ["Compression controls", "✅"],
                ["Browser processing", "✅"],
                ["Instant download", "✅"],
                ["Mobile friendly", "✅"],
              ].map(([feature, value]) => (
                <tr key={feature} className="border-t border-white/10">
                  <td className="px-3 py-2.5 sm:px-4">{feature}</td>
                  <td className="px-3 py-2.5 sm:px-4">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="space-y-4">
        <SectionHeading id="steps-heading" title="How to Compress PNG Images" description="A short workflow keeps the page easy to scan and use." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {howToSteps.map((step, index) => (
            <article key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-black">{index + 1}</div>
                <span className="text-xl">{step.icon}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold sm:text-[0.95rem]">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="benefits-heading" className="space-y-4">
        <SectionHeading id="benefits-heading" title="Core Advantages" description="These benefits explain why a PNG-specific tool matters." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xl">{feature.icon}</div>
              <h3 className="mt-2.5 text-sm font-semibold sm:text-[0.95rem]">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-heading" className="space-y-4">
        <SectionHeading id="audience-heading" title="Perfect For" description="These users commonly work with PNG files." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="uses-heading" className="space-y-4">
        <SectionHeading id="uses-heading" title="Common PNG Use Cases" description="PNG is especially useful when precision and transparency matter." />
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {commonUses.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="when-heading" className="space-y-4">
        <SectionHeading id="when-heading" title="When to Compress PNG Images" description="Use compression when you want smaller files without changing the visual purpose of the graphic." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenToCompress.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="avoid-heading" className="space-y-4">
        <SectionHeading id="avoid-heading" title="When to Avoid Heavy Compression" description="Some graphics should stay as close to the original as possible." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenNotToCompress.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="devices-heading" className="space-y-4">
        <SectionHeading id="devices-heading" title="Compress PNG Images on Windows, Mac, Android, and iPhone" description="The tool works across the devices people already use every day." />
        <div className="flex flex-wrap gap-2.5">
          {devices.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-heading" className="space-y-4">
        <SectionHeading id="related-heading" title="Related Searches and Tools" description="Helpful next steps for users working with image files." />
        <div className="flex flex-wrap gap-2.5">
          {relatedTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading id="faq-heading" title="Frequently Asked Questions" description="These questions align with real PNG compression intent." />
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.q} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">{item.q}</summary>
              <div className="border-t border-white/10 px-4 py-3">
                <p className="text-sm leading-6 text-white/70">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="space-y-4">
        <SectionHeading
          id="cta-heading"
          title="Start Compressing Your PNG Files"
          description="This page is designed to help users reduce PNG size while keeping transparency and crisp visual quality."
        />
      </section>
    </div>
  );
}