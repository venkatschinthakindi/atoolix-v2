import type { Metadata } from "next";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/compress-images-with-preview";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

// export const metadata: Metadata = {
//   metadataBase: new URL(siteUrl),
//   title: "Free Image Compressor – Compress Images Online JPG, JPEG, PNG & WebP",
//   description:
//     "Compress JPG, JPEG, PNG, and WebP images online for free. Reduce image file size with adjustable quality, preview results, and download optimized images directly in your browser.",
//   keywords: [
//     "image compressor",
//     "free image compressor",
//     "compress images online",
//     "compress images online free",
//     "compress image",
//     "compress photo",
//     "compress photos",
//     "compress pictures",
//     "compress jpg",
//     "compress jpeg",
//     "compress png",
//     "compress webp",
//     "jpg compressor",
//     "jpeg compressor",
//     "png compressor",
//     "webp compressor",
//     "reduce image size",
//     "image size reducer",
//     "shrink image",
//     "image optimizer",
//     "online image optimizer",
//     "optimize images",
//     "photo compressor",
//     "picture compressor",
//     "quality based image compression",
//     "browser image compressor",
//     "preview image before download",
//     "image quality control",
//   ],
//   alternates: {
//     canonical: canonicalUrl,
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//       "max-video-preview": -1,
//     },
//   },
//   applicationName: "Compress Images with Preview",
//   category: "Utilities",
//   openGraph: {
//     title: "Free Image Compressor – Compress Images Online JPG, JPEG, PNG & WebP",
//     description:
//       "Compress JPG, JPEG, PNG, and WebP images online for free. Reduce image file size with adjustable quality, preview results, and download optimized images directly in your browser.",
//     url: canonicalUrl,
//     siteName,
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Free Image Compressor – Compress Images Online JPG, JPEG, PNG & WebP",
//     description:
//       "Compress JPG, JPEG, PNG, and WebP images online for free. Reduce image file size with adjustable quality, preview results, and download optimized images directly in your browser.",
//   },
// };

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  { q: "What does this image compressor do?", a: "It compresses JPG, JPEG, PNG, and WebP images in your browser and lets you preview the result before downloading." },
  { q: "Can I control the compression quality?", a: "Yes. You can adjust quality to balance file size and visual clarity." },
  { q: "Can I preview the compressed image first?", a: "Yes. You can review the result before downloading it." },
  { q: "Which formats are supported?", a: "The compressor supports JPG, JPEG, PNG, and WebP." },
  { q: "Is this tool free?", a: "Yes. You can use it without a paid subscription." },
  { q: "Will compression change image dimensions?", a: "Compression usually reduces file size, while dimensions stay the same unless you resize the image separately." },
  { q: "What is the best quality setting?", a: "A mid-range quality setting is usually the best balance for most web images. Higher settings preserve more detail, while lower settings reduce file size more aggressively." },
  { q: "Can I compress images without losing quality?", a: "Compression can reduce visible quality if pushed too far, but good settings help keep the difference minimal for normal viewing." },
  { q: "Which image format is best for websites?", a: "WebP is often a strong choice for websites, while JPG works well for photos and PNG works well for graphics or transparency." },
  { q: "Can I compress images on my phone?", a: "Yes. The tool is responsive and works on mobile devices." },
  { q: "Can I compress screenshots?", a: "Yes. PNG or WebP often work well for screenshots depending on the content." },
  { q: "Can I compress transparent PNG images?", a: "Yes. PNG supports transparency, and the compressor can handle PNG files." },
  { q: "How much can image compression reduce file size?", a: "There is no fixed compression ratio for every image. Large photographs often shrink significantly, while logos, screenshots, or already compressed images may only reduce slightly. Testing different quality settings helps you find the best balance between file size and image quality." },
];

const howToSteps: StepItem[] = [
  { title: "Upload your image", desc: "Choose a JPG, JPEG, PNG, or WebP file from your device.", icon: "📁" },
  { title: "Preview the image", desc: "See the selected file before compression.", icon: "🖼️" },
  { title: "Adjust quality", desc: "Set the compression level based on your file size goal.", icon: "🎚️" },
  { title: "Compress and review", desc: "Generate the optimized version and check the result.", icon: "🔍" },
  { title: "Download the output", desc: "Save the compressed image to your device.", icon: "⬇️" },
];

const coreFeatures: FeatureItem[] = [
  { title: "Browser-Based Compression", desc: "Compress images directly in the browser without installing software.", icon: "🌐" },
  { title: "Live Preview", desc: "Preview the image before and after compression.", icon: "👀" },
  { title: "Quality Control", desc: "Adjust the compression level to balance quality and file size.", icon: "🎛️" },
  { title: "Supported Formats", desc: "Works with JPG, JPEG, PNG, and WebP image files.", icon: "🖼️" },
  { title: "Fast Compression", desc: "A simple flow helps users compress images quickly.", icon: "⚡" },
  { title: "Privacy Friendly", desc: "Browser-based processing reduces the need for file uploads.", icon: "🔒" },
  { title: "Responsive Layout", desc: "Works smoothly on desktop and mobile devices.", icon: "📱" },
  { title: "Instant Download", desc: "Save the optimized image immediately after compression.", icon: "⬇️" },
];

const supportedFormats = [
  { format: "JPG", bestFor: "Photographs", transparency: "No", compression: "High", websites: "Yes" },
  { format: "JPEG", bestFor: "Digital photos", transparency: "No", compression: "High", websites: "Yes" },
  { format: "PNG", bestFor: "Graphics and screenshots", transparency: "Yes", compression: "Medium", websites: "Yes" },
  { format: "WebP", bestFor: "Modern web images", transparency: "Yes", compression: "Very High", websites: "Yes" },
];

const qualityGuide = [
  { range: "90–100%", result: "Maximum quality", use: "When quality matters most" },
  { range: "70–90%", result: "Best balance", use: "Most web images" },
  { range: "50–70%", result: "Smaller files", use: "When file size matters more" },
  { range: "Below 50%", result: "Heavy compression", use: "Only when a very small file is required" },
];

const whenToCompress = [
  "Before uploading to websites.",
  "Before emailing images.",
  "Before posting to social media.",
  "Before submitting online forms.",
  "Before cloud backup.",
];

const whenNotToCompress = [
  "Medical images.",
  "Printed marketing materials.",
  "High-resolution photography.",
  "Images that need later editing.",
];

const commonUses = [
  "Website images.",
  "Blog images.",
  "Product photos.",
  "Email attachments.",
  "Online forms.",
  "Social media.",
  "Presentations.",
  "Documentation.",
];

const devices = [
  "Windows",
  "macOS",
  "Android",
  "iPhone",
];

const relatedTools = [
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
  name: "How to Compress JPG, JPEG, PNG, and WebP Images",
  description: "Compress JPG, JPEG, PNG, and WebP images online with preview and adjustable quality.",
  totalTime: "PT1M",
  step: howToSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.desc,
  })),
};

const searchActionJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": siteUrl,
  url: siteUrl,
  name: siteName,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
    { "@type": "ListItem", position: 2, name: "Compress Images with Preview", item: canonicalUrl },
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
      <h2 id={id} className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      {description ? <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">{description}</p> : null}
    </div>
  );
}

export default function CompressImagesWithPreviewSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={searchActionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Browser-Based Image Compressor
        </p>
        <h2 id="intro-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Free Image Compressor – Compress Images Online JPG, JPEG, PNG & WebP
        </h2>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Compress large JPG, JPEG, PNG, and WebP images online without installing software. Reduce image file size using adjustable compression quality, preview the optimized result, and download it instantly.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          Smaller images are easier to upload, share, store, and use on websites while maintaining good visual quality.
        </p>
      </section>

      <section aria-labelledby="browser-heading" className="space-y-4">
        <SectionHeading id="browser-heading" title="Why Browser-Based Compression?" description="Your image is processed directly in your browser." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["No Software Installation", "You can start compressing right away."],
            ["No Waiting for Uploads", "The workflow stays fast and simple."],
            ["Works on Multiple Devices", "Use it on Windows, macOS, Android, and iPhone."],
            ["Preview Before Download", "Review the result before saving it."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="why-compress-heading" className="space-y-4">
        <SectionHeading id="why-compress-heading" title="Why Compress Images?" description="Compression helps reduce file size and make images easier to use." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Reduce Image Size", "Compression makes files smaller."],
            ["Save Storage Space", "Optimized images take up less room."],
            ["Meet Upload Limits", "Smaller files fit more easily into form limits."],
            ["Share Faster", "Reduced files upload and send more quickly."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-compression-works-heading" className="space-y-4">
        <SectionHeading id="how-compression-works-heading" title="How Image Compression Works" description="Compression reduces file size by using more efficient encoding or removing some image data." />
        <p className="text-sm leading-7 text-white/70">
          Lossy compression reduces some image detail to make the file much smaller. Lossless compression keeps all visible image data but usually gives a larger result.
        </p>
        <p className="text-sm leading-7 text-white/70">
          The right compression level depends on the image content, format, dimensions, and how the final file will be used.
        </p>
      </section>

      <section aria-labelledby="quality-heading" className="space-y-4">
        <SectionHeading id="quality-heading" title="Recommended Image Quality Settings" description="Start with a balanced setting and adjust based on the result." />
        <div className="grid gap-3 md:grid-cols-2">
          {qualityGuide.map((item) => (
            <article key={item.range} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{item.range}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.result}</p>
              <p className="mt-1 text-xs text-white/45">{item.use}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="format-heading" className="space-y-4">
        <SectionHeading id="format-heading" title="Supported Image Formats" description="The compressor supports the four common image formats used on the web." />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Format</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Best For</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Transparency</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Compression</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Websites</th>
              </tr>
            </thead>
            <tbody>
              {supportedFormats.map((item) => (
                <tr key={item.format} className="border-t border-white/10">
                  <td className="px-3 py-2.5 sm:px-4">{item.format}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.bestFor}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.transparency}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.compression}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.websites}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="compare-heading" className="space-y-4">
        <SectionHeading id="compare-heading" title="JPG vs PNG vs WebP" description="Pick the format that matches the image type and compression goal." />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4"><h3 className="text-sm font-semibold">JPG</h3><p className="mt-1.5 text-sm leading-6 text-white/70">Best for photos.</p></div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4"><h3 className="text-sm font-semibold">PNG</h3><p className="mt-1.5 text-sm leading-6 text-white/70">Best for graphics and transparency.</p></div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4"><h3 className="text-sm font-semibold">WebP</h3><p className="mt-1.5 text-sm leading-6 text-white/70">Best for modern web compression.</p></div>
        </div>
      </section>

      <section aria-labelledby="resize-heading" className="space-y-4">
        <SectionHeading id="resize-heading" title="Compression vs Resizing" description="Compression changes file size. Resizing changes dimensions." />
        <p className="text-sm leading-7 text-white/70">
          If a file is still too large after compression, resizing it first can help reduce the final size more effectively.
        </p>
      </section>

      <section aria-labelledby="when-compress-heading" className="space-y-4">
        <SectionHeading id="when-compress-heading" title="When Should You Compress Images?" description="Use compression before publishing or sharing images." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenToCompress.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="uses-heading" className="space-y-4">
        <SectionHeading id="uses-heading" title="Common Uses" description="These are the most common everyday compression use cases." />
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {commonUses.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="not-compress-heading" className="space-y-4">
        <SectionHeading id="not-compress-heading" title="When You Should Avoid Heavy Compression" description="Some images need more detail and should not be compressed too aggressively." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenNotToCompress.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="size-heading" className="space-y-4">
        <SectionHeading id="size-heading" title="How Much Can Image Compression Reduce File Size?" description="Results depend on the file, quality setting, and image content." />
        <p className="text-sm leading-7 text-white/70">
          Compression results vary depending on the image format, dimensions, quality setting, and amount of detail. Large photographs usually compress more than graphics or screenshots. Already optimized images may only shrink slightly.
        </p>
        <p className="text-sm leading-7 text-white/70">
          There is no fixed compression ratio for every image. Testing different quality settings helps you find the best balance between file size and image quality.
        </p>
      </section>

      <section aria-labelledby="steps-heading" className="space-y-4">
        <SectionHeading id="steps-heading" title="How to Compress Images" description="A simple compression workflow keeps the page focused." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {howToSteps.map((step, index) => (
            <article key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-white/10">
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
        <SectionHeading id="benefits-heading" title="Core Features" description="These features keep the page useful for compression-focused visitors." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-white/10">
              <div className="text-xl">{feature.icon}</div>
              <h3 className="mt-2.5 text-sm font-semibold sm:text-[0.95rem]">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-heading" className="space-y-4">
        <SectionHeading id="audience-heading" title="Who Uses Image Compression?" description="These users commonly need to reduce image size." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Developers", "Bloggers", "Students", "Businesses", "Photographers", "Designers"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</div>
          ))}
        </div>
      </section>

      <section aria-labelledby="device-heading" className="space-y-4">
        <SectionHeading id="device-heading" title="Works on Common Devices" description="Use the compressor on the devices people use every day." />
        <div className="flex flex-wrap gap-2.5">
          {devices.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">{item}</span>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading id="faq-heading" title="Frequently Asked Questions" description="Short answers help visitors quickly understand compression behavior." />
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
          title="Start Compressing Your Images"
          description="This tool is designed for everyday image optimization directly in your browser. Whether you're preparing images for websites, documents, forms, or sharing online, you can quickly reduce file size while reviewing the result before downloading."
        />
        <div></div>
      </section>

      <section aria-labelledby="releated-tools" className="space-y-4">
        <SectionHeading id="releated-tools" title="Releated Tools"/>
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
    </div>
  );
}