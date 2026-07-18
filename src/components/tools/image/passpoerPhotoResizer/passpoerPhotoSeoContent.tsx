import type { Metadata } from "next";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/passport-photo-resizer";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

// export const metadata: Metadata = {
//   metadataBase: new URL(siteUrl),
//   title: "Free Passport Photo Resizer Online – Resize Passport Size Photo to Exact KB & Dimensions",
//   description:
//     "Resize passport size photos online for free. Set exact width, height, file size in KB, crop to passport ratio, preview instantly, and download optimized JPG, JPEG, PNG, or WebP images for passport, visa, OCI, and government applications.",
//   keywords: [
//     "passport photo resizer",
//     "passport size photo resizer",
//     "passport photo resize online",
//     "resize passport photo online",
//     "passport photo size converter",
//     "passport size photo maker",
//     "passport size photo editor online",
//     "passport photo resize to 10kb",
//     "passport photo resize to 20kb",
//     "passport photo resize to 30kb",
//     "passport photo resize to 50kb",
//     "passport photo resize to 100kb",
//     "passport photo resize to 150kb",
//     "passport photo resize to 200kb",
//     "passport photo resize to 200x200",
//     "passport photo resize to 300x300",
//     "passport photo resize for visa",
//     "passport photo for online application",
//     "passport photo dimensions online",
//     "passport photo file size",
//     "passport photo crop online",
//     "resize image to kb",
//     "resize image to exact dimensions",
//     "passport photo online free",
//     "passport photo jpg",
//     "passport photo jpeg",
//     "passport photo png",
//     "passport photo webp",
//     "passport size photo online",
//     "passport photo cropper",
//     "resize image in inches",
//     "resize image in cm",
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
//   applicationName: "Passport Photo Resizer",
//   category: "Utilities",
//   openGraph: {
//     title: "Free Passport Photo Resizer Online – Resize Passport Size Photo to Exact KB & Dimensions",
//     description:
//       "Resize passport size photos online for free. Set exact width, height, file size in KB, crop to passport ratio, preview instantly, and download optimized JPG, JPEG, PNG, or WebP images for passport, visa, OCI, and government applications.",
//     url: canonicalUrl,
//     siteName,
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Free Passport Photo Resizer Online – Resize Passport Size Photo to Exact KB & Dimensions",
//     description:
//       "Resize passport size photos online for free. Set exact width, height, file size in KB, crop to passport ratio, preview instantly, and download optimized JPG, JPEG, PNG, or WebP images for passport, visa, OCI, and government applications.",
//   },
// };

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  { q: "What does this passport photo resizer do?", a: "It resizes passport photos to exact dimensions and target file size in KB, while supporting JPG, JPEG, PNG, and WebP." },
  { q: "How do I resize a passport photo to 20 KB?", a: "Upload your photo, set the required dimensions, choose a lower target KB, and adjust quality until the file matches the required size as closely as possible." },
  { q: "How do I resize a passport photo to 50 KB or 100 KB?", a: "Use the target KB control, preview the result, and fine-tune compression until the file reaches the required range." },
  { q: "Can I resize a passport photo to 200x200 pixels?", a: "Yes. You can enter exact width and height values such as 200x200, 300x300, or custom dimensions." },
  { q: "Which formats are supported?", a: "The resizer supports JPG, JPEG, PNG, and WebP." },
  { q: "Can I crop to passport ratio?", a: "Yes. You can crop the image to the correct passport aspect ratio before resizing or compressing it." },
  { q: "Is this tool free?", a: "Yes. You can use it without a paid subscription." },
  { q: "Can I preview the result before downloading?", a: "Yes. You can preview the resized passport photo before saving it." },
  { q: "Will resizing affect image quality?", a: "Resizing can slightly change quality depending on how much you reduce the image, but the tool is designed to keep the photo clear and usable." },
  { q: "Can I use this on mobile?", a: "Yes. The tool is responsive and works on phones and tablets." },
  { q: "Does the tool keep my photos private?", a: "Browser-based processing helps keep image handling on your device." },
  { q: "Can I resize passport photos for visa applications?", a: "Yes. You can set the dimensions and KB required for passport, visa, OCI, and other government uploads." },
  { q: "Can I resize multiple passport photos?", a: "You can process one photo at a time in the interface and repeat the same settings for multiple files." },
  { q: "What dimensions are required for passport photos?", a: "Requirements vary by country and application type, so the best approach is to enter the exact dimensions requested by the form." },
];

const howToSteps: StepItem[] = [
  { title: "Upload your photo", desc: "Choose a JPG, JPEG, PNG, or WebP file from your device.", icon: "📁" },
  { title: "Preview the image", desc: "Check the face framing and composition before resizing.", icon: "🖼️" },
  { title: "Set dimensions", desc: "Enter exact width and height values for the required passport size.", icon: "📐" },
  { title: "Set target KB", desc: "Adjust compression to match the required file size range.", icon: "🎚️" },
  { title: "Download the result", desc: "Save the resized passport photo instantly.", icon: "⬇️" },
];

const coreFeatures: FeatureItem[] = [
  { title: "Exact Dimension Control", desc: "Resize passport photos to custom width and height values.", icon: "📐" },
  { title: "Target KB Control", desc: "Reduce file size to a required KB limit with adjustable compression.", icon: "🎚️" },
  { title: "Live Preview", desc: "Preview the passport photo before downloading.", icon: "👀" },
  { title: "Format Support", desc: "Works with JPG, JPEG, PNG, and WebP files.", icon: "🖼️" },
  { title: "Crop for Passport Ratio", desc: "Crop the image to passport-style proportions.", icon: "✂️" },
  { title: "Browser-Based", desc: "Process images in the browser without installing software.", icon: "🌐" },
  { title: "Responsive Design", desc: "Use it smoothly on desktop and mobile devices.", icon: "📱" },
  { title: "Instant Download", desc: "Download the optimized passport photo immediately.", icon: "⬇️" },
];

const supportedFormats = [
  { format: "JPG", bestFor: "Passport uploads", transparency: "No", compression: "High", websites: "Yes" },
  { format: "JPEG", bestFor: "Official photo files", transparency: "No", compression: "High", websites: "Yes" },
  { format: "PNG", bestFor: "Clear source images", transparency: "Yes", compression: "Medium", websites: "Yes" },
  { format: "WebP", bestFor: "Modern web uploads", transparency: "Yes", compression: "Very High", websites: "Yes" },
];

const qualityGuide = [
  { range: "90–100%", result: "Maximum clarity", use: "Use when file size limits are generous" },
  { range: "75–90%", result: "Best balance", use: "Good for most passport uploads" },
  { range: "60–75%", result: "Smaller file", use: "Use when the portal requires lower KB" },
  { range: "Below 60%", result: "Heavy compression", use: "Use only when the upload limit is very strict" },
];

const commonRequirements = [
  { label: "Width", value: "Depends on country and application" },
  { label: "Height", value: "Depends on country and application" },
  { label: "Background", value: "Plain white or light" },
  { label: "File size", value: "Often 20 KB to 500 KB" },
  { label: "Format", value: "JPG or JPEG is commonly accepted" },
  { label: "Face position", value: "Centered and clearly visible" },
];

const countryCards = [
  { country: "India", note: "Use the exact size requested by the application or portal." },
  { country: "USA", note: "Commonly uses 2 x 2 inch passport photos." },
  { country: "Canada", note: "Requirements may differ by application type and document portal." },
  { country: "UK", note: "Often uses 45 mm x 35 mm photo sizes." },
  { country: "Australia", note: "Follow the size and background rules shown in the form." },
  { country: "UAE", note: "Enter the exact dimensions required by the visa or ID system." },
];

const popularSizes = [
  "2 x 2 inch",
  "35 x 45 mm",
  "45 x 35 mm",
  "200 x 200 px",
  "300 x 300 px",
  "413 x 531 px",
  "600 x 600 px",
  "Custom dimensions",
];

const fileSizeTargets = [
  "10 KB",
  "20 KB",
  "30 KB",
  "50 KB",
  "100 KB",
  "150 KB",
  "200 KB",
  "300 KB",
  "500 KB",
];

const tips = [
  "Use a high-resolution original photo.",
  "Keep the face centered in the frame.",
  "Avoid shadows and uneven lighting.",
  "Use a plain background whenever possible.",
  "Do not over-compress the image.",
  "Check the file size before submitting the form.",
];

const mistakes = [
  "Using a blurry source photo.",
  "Choosing the wrong aspect ratio.",
  "Compressing too aggressively.",
  "Leaving the background cluttered.",
  "Submitting the wrong file format.",
  "Ignoring the requested dimensions or KB limit.",
];

const whenToResize = [
  "Before passport application upload.",
  "Before visa application upload.",
  "Before ID card submission.",
  "Before OCI or permit applications.",
  "Before form uploads with KB limits.",
];

const whenNotToResize = [
  "If the image is already within the exact requirement.",
  "If the photo is too blurry to begin with.",
  "If the source image needs editing first.",
  "If facial details are not clearly visible.",
];

const commonUses = [
  "Passport application.",
  "Visa application.",
  "Government forms.",
  "Identity uploads.",
  "OCI applications.",
  "Student applications.",
  "Job portals.",
  "Travel documents.",
];

const devices = ["Windows", "macOS", "Android", "iPhone"];

const relatedTools = [
  { name: "Compress Image", href: "/tools/image/compress-image" },
  { name: "Compress JPG", href: "/tools/image/compress-jpg" },
  { name: "Compress Image to Custom Size", href: "/tools/image/compress-image-to-100kb" },
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
  name: "How to Resize a Passport Photo to Exact KB and Dimensions",
  description: "Resize a passport photo online with preview, exact dimensions, and target KB control.",
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
    { "@type": "ListItem", position: 2, name: "Passport Photo Resizer", item: canonicalUrl },
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

export default function PassportPhotoResizerSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={searchActionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Browser-Based Passport Photo Resizer
        </p>
        <h1 id="intro-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Free Passport Photo Resizer Online – Resize Passport Size Photo to Exact KB & Dimensions
        </h1>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Resize passport size photos online for free with exact width, height, and file size control. Upload a JPG, JPEG, PNG, or WebP image, crop it to passport ratio, preview the output instantly, and download an optimized photo that is ready for passport, visa, OCI, or government applications. The tool is designed for users who need a practical passport size photo maker with precise pixel and KB controls in the same workflow. You can start with a preset size, enter a custom dimension, or target a specific file size such as 20 KB, 50 KB, 100 KB, or 200 KB depending on the portal requirements.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          Smaller and correctly sized images are easier to upload, faster to submit, and less likely to be rejected by online forms. This page focuses on the most common search intents, including passport photo resize online, passport size photo resizer, passport photo size converter, and resize passport photo to exact KB.
        </p>
      </section>

      <section aria-labelledby="browser-heading" className="space-y-4">
        <SectionHeading id="browser-heading" title="Why Browser-Based Resizing?" description="Your photo is processed directly in your browser." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["No Software Installation", "You can start resizing right away."],
            ["Exact Size Control", "Set both dimensions and KB targets from the UI."],
            ["Works on Multiple Devices", "Use it on Windows, macOS, Android, and iPhone."],
            ["Preview Before Download", "Check the result before saving it."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="why-resize-heading" className="space-y-4">
        <SectionHeading id="why-resize-heading" title="Why Resize Passport Photos?" description="Passport uploads often require strict file size and dimension rules." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Meet Upload Limits", "Many portals require a specific KB range."],
            ["Match Exact Dimensions", "Some applications require a fixed width and height."],
            ["Avoid Rejection", "Correct sizing helps reduce upload errors."],
            ["Save Time", "One tool handles crop, size, and download."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="requirements-heading" className="space-y-4">
        <SectionHeading id="requirements-heading" title="Common Passport Photo Requirements" description="Passport requirements vary by country and application, but the basics are often similar." />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Requirement</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Typical Value</th>
              </tr>
            </thead>
            <tbody>
              {commonRequirements.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <td className="px-3 py-2.5 sm:px-4">{row.label}</td>
                  <td className="px-3 py-2.5 sm:px-4">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="country-heading" className="space-y-4">
        <SectionHeading id="country-heading" title="Passport Photo Requirements by Country" description="Use the exact requirement from your application form, then resize the image to match it." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {countryCards.map((item) => (
            <article key={item.country} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{item.country}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="sizes-heading" className="space-y-4">
        <SectionHeading id="sizes-heading" title="Popular Passport Photo Sizes" description="These are some of the most common size searches people type into Google." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {popularSizes.map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</div>
          ))}
        </div>
      </section>

      <section aria-labelledby="filesize-heading" className="space-y-4">
        <SectionHeading id="filesize-heading" title="Common File Size Targets" description="Use target KB values to make your passport photo fit the upload limit." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {fileSizeTargets.map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</div>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-compression-works-heading" className="space-y-4">
        <SectionHeading id="how-compression-works-heading" title="How Passport Photo Resizing Works" description="Resize the image by adjusting dimensions, aspect ratio, and compression." />
        <p className="text-sm leading-7 text-white/70">
          The tool changes the image dimensions to match the required passport format and then adjusts compression to reach the target KB size.
        </p>
        <p className="text-sm leading-7 text-white/70">
          Exact results depend on the source image, face crop, format, and the final upload requirement.
        </p>
      </section>

      <section aria-labelledby="quality-heading" className="space-y-4">
        <SectionHeading id="quality-heading" title="Recommended Size Settings" description="Start with a balanced setting and adjust based on the upload requirement." />
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
        <SectionHeading id="format-heading" title="Supported Image Formats" description="The resizer supports the four common web image formats." />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Format</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Best For</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Transparency</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Compression</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Web Uploads</th>
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
        <SectionHeading id="compare-heading" title="Dimension Control vs KB Control" description="Use both controls together for the best upload result." />
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">Exact Dimensions</h3>
            <p className="mt-1.5 text-sm leading-6 text-white/70">Use this to match the required width and height for the form or application.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">Target KB Size</h3>
            <p className="mt-1.5 text-sm leading-6 text-white/70">Use this to stay within the file size limit required by the upload portal.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="tips-heading" className="space-y-4">
        <SectionHeading id="tips-heading" title="Tips for Better Passport Photos" description="These best practices help produce a cleaner final image." />
        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="mistakes-heading" className="space-y-4">
        <SectionHeading id="mistakes-heading" title="Common Passport Photo Mistakes" description="Avoid these issues to reduce the chance of rejection." />
        <ul className="grid gap-3 md:grid-cols-2">
          {mistakes.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="when-compress-heading" className="space-y-4">
        <SectionHeading id="when-compress-heading" title="When Should You Resize?" description="Use resizing before upload or official submission." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenToResize.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="uses-heading" className="space-y-4">
        <SectionHeading id="uses-heading" title="Common Uses" description="Passport photo resizing is useful across many document workflows." />
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {commonUses.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="not-compress-heading" className="space-y-4">
        <SectionHeading id="not-compress-heading" title="When You Should Avoid Heavy Resizing" description="Some photos need careful handling to stay acceptable." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenNotToResize.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="size-heading" className="space-y-4">
        <SectionHeading id="size-heading" title="How Much Can File Size Change?" description="The final size depends on the source image and chosen settings." />
        <p className="text-sm leading-7 text-white/70">
          A clean source image usually gives better results when you resize to a target KB. Highly detailed photos, noisy images, and already compressed files may behave differently.
        </p>
        <p className="text-sm leading-7 text-white/70">
          Testing a few settings helps you reach a practical balance between clarity and upload limits.
        </p>
      </section>

      <section aria-labelledby="steps-heading" className="space-y-4">
        <SectionHeading id="steps-heading" title="How to Resize a Passport Photo" description="A simple workflow keeps the page easy to use." />
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
        <SectionHeading id="benefits-heading" title="Core Features" description="These features make the page useful for passport photo users." />
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
        <SectionHeading id="audience-heading" title="Who Uses Passport Photo Resizing?" description="These users commonly need exact photo sizing and KB control." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Applicants", "Students", "Travelers", "Businesses", "Government users", "Freelancers"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</div>
          ))}
        </div>
      </section>

      <section aria-labelledby="device-heading" className="space-y-4">
        <SectionHeading id="device-heading" title="Works on Common Devices" description="Use the resizer on the devices people use every day." />
        <div className="flex flex-wrap gap-2.5">
          {devices.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">{item}</span>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading id="faq-heading" title="Frequently Asked Questions" description="Short answers help visitors understand resize behavior quickly." />
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
          title="Start Resizing Your Passport Photo"
          description="This tool is built for quick passport-style resizing with exact dimensions, target KB control, and a clear preview before download. Use the related tools below to crop, convert, or resize with alternative units like inches and cm when needed."
        />
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