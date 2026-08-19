import Link from "next/link";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function PngToJpgSeoContent() {
  const faqItems = [
    {
      q: "What is a PNG to JPG converter?",
      a: "A PNG to JPG converter is a browser-based tool that changes PNG images into JPG format. JPG is commonly used for photographs, sharing, and situations where a smaller image file is preferred.",
    },
    {
      q: "Why should I convert PNG to JPG?",
      a: "JPG is often a practical choice for photographs and general sharing because it can produce smaller files than PNG. It is also widely supported across websites, apps, documents, and social platforms.",
    },
    {
      q: "Does converting PNG to JPG reduce quality?",
      a: "It can. JPG uses lossy compression, so some image detail may change during conversion. The effect is usually more noticeable on text, sharp graphics, and images with strong edges than on photographs.",
    },
    {
      q: "Can I convert transparent PNG files?",
      a: "Yes. A transparent PNG can be converted to JPG, but JPG does not support transparency. Transparent areas therefore need to be represented by a solid background color in the resulting JPG.",
    },
    {
      q: "Is this converter browser-based?",
      a: "Yes. The conversion runs directly in your browser, so the image can be processed locally on your device without uploading it to a conversion server.",
    },
    {
      q: "Is this PNG to JPG converter mobile friendly?",
      a: "Yes. The responsive layout is designed to work across phones, tablets, laptops, and desktop computers.",
    },
    {
      q: "Do I need to sign up to use it?",
      a: "No. The converter is designed to be used directly without requiring account registration.",
    },
    {
      q: "Can I use it for photos and social media images?",
      a: "Yes. JPG is commonly used for photographs, social media images, website graphics, and general image sharing where smaller files and broad compatibility are useful.",
    },
    {
      q: "Is this tool suitable for designers and everyday users?",
      a: "Yes. It can be useful for designers, students, office users, marketers, developers, and anyone who needs a straightforward PNG to JPG conversion workflow.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload your PNG",
      desc: "Choose a PNG image from your phone, tablet, or computer.",
      icon: "🖼️",
    },
    {
      title: "Convert in the browser",
      desc: "The image is processed locally in the browser for a simple conversion workflow.",
      icon: "⚡",
    },
    {
      title: "Download the JPG",
      desc: "Save the converted JPG file to your device when processing is complete.",
      icon: "⬇️",
    },
    {
      title: "Use your JPG",
      desc: "Use the JPG for websites, documents, sharing, social media, or other compatible workflows.",
      icon: "📋",
    },
  ];

  const coreFeatures = [
    {
      title: "Browser-Based Conversion",
      desc: "Convert PNG images directly in your browser without an upload-based conversion workflow.",
      icon: "🌐",
    },
    {
      title: "PNG Support",
      desc: "Convert PNG images, including common graphics and transparent image assets.",
      icon: "🧾",
    },
    {
      title: "Fast Processing",
      desc: "A focused conversion flow helps you get from PNG to JPG with minimal steps.",
      icon: "⚡",
    },
    {
      title: "Local Processing",
      desc: "Browser-based processing can keep the image conversion on your device.",
      icon: "🔒",
    },
    {
      title: "Responsive Design",
      desc: "Works across phones, tablets, laptops, and desktop devices.",
      icon: "📱",
    },
    {
      title: "Simple Download",
      desc: "Download the resulting JPG directly after the conversion is complete.",
      icon: "💾",
    },
    {
      title: "Clear Page Structure",
      desc: "Organized sections make the conversion information easy to scan and understand.",
      icon: "📑",
    },
    {
      title: "Simple User Experience",
      desc: "A straightforward interface keeps the PNG to JPG workflow easy to follow.",
      icon: "✨",
    },
  ];

  const audiences = [
    {
      title: "Designers",
      desc: "Use JPG for previews, sharing, photographs, and lighter image assets.",
      icon: "🎨",
    },
    {
      title: "Students",
      desc: "Convert images for assignments, projects, presentations, and submissions.",
      icon: "🎓",
    },
    {
      title: "Office Users",
      desc: "Convert PNG files for documents, email attachments, and everyday sharing.",
      icon: "💼",
    },
    {
      title: "Marketers",
      desc: "Prepare JPG images for campaigns, websites, advertisements, and social content.",
      icon: "📣",
    },
    {
      title: "Developers",
      desc: "Convert image assets for websites, interfaces, applications, and testing workflows.",
      icon: "👨‍💻",
    },
    {
      title: "Mobile Users",
      desc: "Convert PNG images directly from a phone or tablet without installing desktop software.",
      icon: "📲",
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

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-white sm:p-5 lg:p-6">
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          PNG to JPG Converter – Convert PNG Images to JPG Online
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Convert PNG images to JPG online directly in your browser. This free PNG to JPG
          converter provides a simple way to change image formats without installing
          desktop software or creating an account.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          JPG is commonly useful when you need a widely supported image format, a smaller
          file for sharing, or a format better suited to photographs and general web use.
        </p>
      </section>

      {/* Definition */}
      <section aria-labelledby="definition-heading">
        <h2
          id="definition-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Is a PNG to JPG Converter?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          A PNG to JPG converter changes a PNG image into the JPG format. The conversion
          is useful when a workflow requires JPG, when a smaller file is preferred, or
          when you are preparing photographs and other images for broad compatibility.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          PNG and JPG serve different purposes. PNG is well suited to lossless graphics
          and transparency, while JPG is commonly used for photographs and images where
          compact file sizes are important.
        </p>
      </section>

      {/* PNG vs JPG */}
      <section aria-labelledby="comparison-heading">
        <h2
          id="comparison-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          PNG vs JPG: Which Format Should You Use?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          Neither format is universally better. The right choice depends on the type of
          image and how you plan to use it.
        </p>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 font-semibold text-white">
                  JPG / JPEG
                </th>
                <th className="px-4 py-3 font-semibold text-white">
                  PNG
                </th>
              </tr>
            </thead>

            <tbody className="text-white/70">
              <tr className="border-b border-white/10">
                <td className="px-4 py-3">
                  Often better for photographs
                </td>
                <td className="px-4 py-3">
                  Often better for graphics and illustrations
                </td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="px-4 py-3">
                  Uses lossy compression
                </td>
                <td className="px-4 py-3">
                  Supports lossless compression
                </td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="px-4 py-3">
                  Usually smaller for photographs
                </td>
                <td className="px-4 py-3">
                  Can produce larger files for photographs
                </td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="px-4 py-3">
                  Does not support transparency
                </td>
                <td className="px-4 py-3">
                  Supports transparency
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">
                  Good for sharing and general web use
                </td>
                <td className="px-4 py-3">
                  Good for logos, graphics, screenshots, and editing workflows
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Why convert */}
      <section aria-labelledby="why-use-heading">
        <h2
          id="why-use-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Convert PNG to JPG?
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>
            JPG is commonly more suitable for photographs and general image sharing.
          </li>
          <li>
            JPG files are often smaller than PNG files when used with photographic images.
          </li>
          <li>
            JPG is widely supported across websites, applications, documents, and devices.
          </li>
          <li>
            Some platforms or workflows specifically require JPG or JPEG images.
          </li>
          <li>
            Converting can simplify image delivery when transparency is not required.
          </li>
        </ul>
      </section>

      {/* When not to convert */}
      <section aria-labelledby="keep-png-heading">
        <h2
          id="keep-png-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          When Should You Keep PNG Instead?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          PNG can be the better choice when image quality, sharp edges, or transparency
          are more important than minimizing file size.
        </p>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Keep PNG when you need a transparent background.</li>
          <li>Keep PNG for logos, icons, diagrams, and sharp interface graphics.</li>
          <li>Keep PNG when you want lossless image storage.</li>
          <li>Keep PNG when the image contains small text or crisp geometric details.</li>
          <li>
            Avoid converting to JPG when introducing lossy compression would negatively
            affect the intended use.
          </li>
        </ul>
      </section>

      {/* Quality */}
      <section aria-labelledby="quality-heading">
        <h2
          id="quality-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Does PNG to JPG Conversion Reduce Quality?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          It can. PNG uses lossless compression, while JPG uses lossy compression.
          Converting a PNG to JPG may therefore change some image detail, particularly
          around sharp edges, text, and high-contrast graphics.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          For photographs, the visual difference can often be relatively small while the
          resulting file may be substantially more compact. For logos, screenshots, and
          text-heavy graphics, keeping PNG may provide better results.
        </p>
      </section>

      {/* Transparency */}
      <section aria-labelledby="transparency-heading">
        <h2
          id="transparency-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Happens to Transparent PNG Backgrounds?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          JPG does not support transparent pixels. When a transparent PNG is converted
          to JPG, transparent areas must become a solid background color.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          If preserving transparency is important, PNG or another format with transparency
          support may be a better choice.
        </p>
      </section>

      {/* Use cases */}
      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Common PNG to JPG Use Cases
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Convert PNG photographs to JPG for easier sharing.</li>
          <li>Prepare images for websites or applications that require JPG.</li>
          <li>Convert PNG images for email attachments or document workflows.</li>
          <li>Prepare images for social media and general online sharing.</li>
          <li>Use JPG when transparency is not needed.</li>
          <li>Create more compact photographic image files when appropriate.</li>
        </ul>
      </section>

      {/* How it works */}
      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-4"
      >
        <h2
          id="how-it-works-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Convert PNG to JPG
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          Converting a PNG image takes only a few straightforward steps.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {i + 1}
                </span>

                <span className="text-2xl">{step.icon}</span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {step.title}
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          PNG to JPG Converter Features
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section aria-labelledby="audience-heading">
        <h2
          id="audience-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Who Can Use This PNG to JPG Converter?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section aria-labelledby="privacy-heading">
        <h2
          id="privacy-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Privacy and Browser-Based Processing
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          This PNG to JPG converter processes images directly in your browser when
          browser-local processing is enabled. This approach can allow the image to
          remain on your device instead of being uploaded to a conversion server.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          The converter does not require account registration. If analytics or error
          monitoring are used on the site, they should be configured so that image
          contents and uploaded file data are not unnecessarily collected.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
          For more information about how the website handles information, see the{" "}
          <Link
            href="/privacy"
            className="text-blue-300 underline decoration-blue-300/40 underline-offset-4 transition hover:text-blue-200"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-4">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-white">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-4 py-4">
                <p className="text-sm leading-relaxed text-white/65">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Related tools */}
      <RelatedTools toolId="image/png-to-jpg" />
    </div>
  );
}