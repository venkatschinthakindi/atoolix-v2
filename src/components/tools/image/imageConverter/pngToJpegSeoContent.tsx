import Link from "next/link";

export default function PngToJpegSeoContent() {
  const faqItems = [
    {
      q: "What is a PNG to JPEG converter?",
      a: "A PNG to JPEG converter changes PNG images into JPEG format in your browser. JPEG is commonly used when you want smaller files and broad compatibility, especially for photographs and general web sharing.",
    },
    {
      q: "Why should I convert PNG to JPEG?",
      a: "PNG to JPEG conversion can be useful when you want a smaller file for photographs, sharing, websites, documents, or platforms that expect JPEG. JPEG is especially suitable when transparency and lossless compression are not required.",
    },
    {
      q: "Does converting PNG to JPEG reduce quality?",
      a: "It can. JPEG uses lossy compression, so some image information may be discarded during conversion. The effect is usually more noticeable around text, sharp edges, and detailed graphics than in photographs.",
    },
    {
      q: "What happens to transparency when converting PNG to JPEG?",
      a: "JPEG does not support transparency. If the original PNG contains transparent areas, those areas must be represented by a solid background in the JPEG output.",
    },
    {
      q: "Does converting PNG to JPEG make the file smaller?",
      a: "Often, especially for photographs and other detailed images. JPEG is designed for efficient lossy compression, so the resulting file can be considerably smaller than a comparable PNG. The exact size depends on the image and JPEG compression settings.",
    },
    {
      q: "Is this PNG to JPEG converter browser-based?",
      a: "Yes. The conversion runs directly in your browser, allowing the image to be processed locally on your device without uploading it to a conversion server.",
    },
    {
      q: "Is this PNG to JPEG converter mobile friendly?",
      a: "Yes. The responsive layout is designed to work on phones, tablets, laptops, and desktop computers.",
    },
    {
      q: "Do I need to sign up to use it?",
      a: "No. The converter can be used without creating an account or completing a registration process.",
    },
    {
      q: "Can I convert PNG images for websites and social media?",
      a: "Yes. JPEG is commonly used for photographs, social media graphics, websites, email attachments, and general online sharing when transparency is not required.",
    },
    {
      q: "Is this tool suitable for designers and everyday users?",
      a: "Yes. It can be useful for designers, developers, students, office users, marketers, and anyone who needs a straightforward PNG to JPEG conversion workflow.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload your PNG",
      desc: "Choose a PNG file from your device.",
      icon: "🖼️",
    },
    {
      title: "Convert in the browser",
      desc: "The image is processed locally in the browser for a simple conversion workflow.",
      icon: "⚡",
    },
    {
      title: "Download the JPEG",
      desc: "Save the converted JPEG file to your device.",
      icon: "⬇️",
    },
    {
      title: "Use the JPEG",
      desc: "Use the converted image for websites, sharing, documents, or other compatible workflows.",
      icon: "📋",
    },
  ];

  const coreFeatures = [
    {
      title: "Browser-Based Conversion",
      desc: "Convert PNG images directly in your browser without an upload-heavy workflow.",
      icon: "🌐",
    },
    {
      title: "PNG Support",
      desc: "Convert PNG images into JPEG format using a simple image conversion workflow.",
      icon: "🧾",
    },
    {
      title: "JPEG Output",
      desc: "Create JPEG files for websites, sharing, documents, and other common workflows.",
      icon: "🖼️",
    },
    {
      title: "Fast Processing",
      desc: "Get quick results with a focused upload, conversion, and download process.",
      icon: "⚡",
    },
    {
      title: "Privacy Friendly",
      desc: "Local browser processing reduces the need to send image files to a conversion server.",
      icon: "🔒",
    },
    {
      title: "Responsive Design",
      desc: "Works across phones, tablets, laptops, and desktop computers.",
      icon: "📱",
    },
    {
      title: "No Registration",
      desc: "Use the conversion workflow without creating an account.",
      icon: "✓",
    },
    {
      title: "Simple Download",
      desc: "Download the converted JPEG immediately after processing.",
      icon: "💾",
    },
  ];

  const audiences = [
    {
      title: "Designers",
      desc: "Use JPEG for previews, image sharing, and workflows where smaller files are useful.",
      icon: "🎨",
    },
    {
      title: "Students",
      desc: "Convert images for projects, assignments, presentations, and document workflows.",
      icon: "🎓",
    },
    {
      title: "Office Users",
      desc: "Convert image files for documents, email attachments, and general sharing.",
      icon: "💼",
    },
    {
      title: "Marketers",
      desc: "Prepare JPEG assets for campaigns, websites, email, and social content.",
      icon: "📣",
    },
    {
      title: "Developers",
      desc: "Convert image assets for websites, interfaces, applications, and testing.",
      icon: "👨‍💻",
    },
    {
      title: "Mobile Users",
      desc: "Run image conversions from phones and tablets without desktop software.",
      icon: "📲",
    },
  ];

  const relatedTools = [
    {
      name: "PNG to JPG Converter",
      href: "/tools/image/png-to-jpg",
    },
    {
      name: "JPG to WebP Converter",
      href: "/tools/image/jpg-to-webp",
    },
    {
      name: "WebP to PNG Converter",
      href: "/tools/image/webp-to-png",
    },
    {
      name: "SVG to PNG Converter",
      href: "/tools/image/svg-to-png",
    },
    {
      name: "Image Compressor",
      href: "/tools/image/compress-image",
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
      {/* FAQ Structured Data */}
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
          PNG to JPEG Converter – Convert PNG Images to JPEG Online
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Convert PNG images to JPEG online directly in your browser. This free PNG
          to JPEG converter provides a simple way to create smaller, widely
          supported image files without installing desktop software.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          JPEG is especially useful for photographs, sharing, websites, documents,
          and other workflows where transparency and lossless compression are not
          required.
        </p>
      </section>

      {/* Definition */}
      <section aria-labelledby="definition-heading">
        <h2
          id="definition-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Is a PNG to JPEG Converter?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          A PNG to JPEG converter is an online tool that changes PNG images into
          JPEG format. JPEG is commonly used when smaller image files and broad
          compatibility are more important than lossless compression or
          transparency.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          PNG to JPEG conversion can be useful for websites, social media,
          documents, email attachments, image sharing, and other digital
          workflows.
        </p>
      </section>

      {/* Before Conversion */}
      <section aria-labelledby="before-convert-heading">
        <h2
          id="before-convert-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What to Know Before Converting PNG to JPEG
        </h2>

        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>
            JPEG uses lossy compression, so converting a PNG to JPEG can change
            image quality. The difference may be more noticeable around text,
            sharp edges, and detailed graphics than in photographs.
          </p>

          <p>
            JPEG also does not support transparent pixels. If the original PNG
            has a transparent background, the converted JPEG will use a solid
            background instead.
          </p>

          <p>
            For photographs where smaller file sizes are useful, JPEG can be a
            practical choice. For logos, icons, screenshots, or graphics that
            require transparency, keeping PNG may be preferable.
          </p>
        </div>
      </section>

      {/* Why Convert */}
      <section aria-labelledby="why-use-heading">
        <h2
          id="why-use-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Convert PNG to JPEG?
        </h2>

        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>
            Convert PNG to JPEG when you need a smaller image file for sharing,
            publishing, or general web use.
          </p>

          <p>
            JPEG is particularly useful for photographs and other continuous-tone
            images where smaller file sizes are often more important than
            lossless compression.
          </p>

          <p>
            JPEG can also be useful when your destination platform or application
            expects or works better with JPEG files.
          </p>
        </div>
      </section>

      {/* Keep PNG */}
      <section aria-labelledby="keep-png-heading">
        <h2
          id="keep-png-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          When Should You Keep PNG Instead?
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Keep PNG when you need a transparent background.</li>
          <li>
            Keep PNG when preserving lossless image data is important.
          </li>
          <li>
            PNG is often preferable for logos, icons, screenshots, and sharp
            graphics.
          </li>
          <li>
            PNG can be better when text and hard edges need to remain crisp.
          </li>
          <li>
            Do not convert to JPEG simply because JPEG is smaller; choose the
            format based on the image and its intended use.
          </li>
        </ul>
      </section>

      {/* PNG vs JPEG */}
      <section aria-labelledby="comparison-heading">
        <h2
          id="comparison-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          PNG vs JPEG: Which Format Should You Use?
        </h2>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-white">
                  Feature
                </th>
                <th className="px-4 py-3 font-semibold text-white">
                  PNG
                </th>
                <th className="px-4 py-3 font-semibold text-white">
                  JPEG
                </th>
              </tr>
            </thead>

            <tbody className="text-white/70">
              <tr className="border-t border-white/10">
                <td className="px-4 py-3">Compression</td>
                <td className="px-4 py-3">Lossless</td>
                <td className="px-4 py-3">Lossy</td>
              </tr>

              <tr className="border-t border-white/10">
                <td className="px-4 py-3">Transparency</td>
                <td className="px-4 py-3">Supported</td>
                <td className="px-4 py-3">Not supported</td>
              </tr>

              <tr className="border-t border-white/10">
                <td className="px-4 py-3">Photographs</td>
                <td className="px-4 py-3">Good</td>
                <td className="px-4 py-3">Excellent</td>
              </tr>

              <tr className="border-t border-white/10">
                <td className="px-4 py-3">Sharp graphics</td>
                <td className="px-4 py-3">Excellent</td>
                <td className="px-4 py-3">
                  Can show compression artifacts
                </td>
              </tr>

              <tr className="border-t border-white/10">
                <td className="px-4 py-3">Typical file size</td>
                <td className="px-4 py-3">Often larger</td>
                <td className="px-4 py-3">
                  Often smaller for photographs
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Transparency */}
      <section aria-labelledby="transparency-heading">
        <h2
          id="transparency-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Happens to Transparency When PNG Is Converted to JPEG?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          JPEG does not support transparent pixels. If the original PNG has a
          transparent background, converting it to JPEG replaces that
          transparency with a solid background color. For transparent logos,
          icons, and graphics, PNG may therefore be the better format to keep.
        </p>
      </section>

      {/* Use Cases */}
      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Common PNG to JPEG Use Cases
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>
            Convert PNG photographs to JPEG for smaller files and easier
            sharing.
          </li>
          <li>
            Prepare images for websites and platforms that expect JPEG files.
          </li>
          <li>
            Convert PNG images for email attachments or document workflows.
          </li>
          <li>
            Create JPEG versions of images when transparency is not needed.
          </li>
          <li>
            Prepare image assets for social media and general online publishing.
          </li>
        </ul>
      </section>

      {/* How It Works */}
      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-4"
      >
        <h2
          id="how-it-works-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How This PNG to JPEG Converter Works
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          The converter is designed to keep the process simple, fast, and easy
          to understand.
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

      {/* Tool Benefits */}
      <section aria-labelledby="benefits-heading">
        <h2
          id="benefits-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Use This PNG to JPEG Converter?
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Convert PNG files directly in your browser.</li>
          <li>
            No desktop image-conversion software is required.
          </li>
          <li>
            Simple upload, conversion, and download workflow.
          </li>
          <li>
            Designed for both desktop and mobile devices.
          </li>
          <li>
            Useful for photos, sharing, websites, documents, and social
            content.
          </li>
        </ul>
      </section>

      {/* Core Features */}
      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Core Features
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
          Who Should Use This Tool?
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
          The PNG to JPEG conversion runs directly in your browser, so the
          image can be processed locally on your device without being uploaded
          to a conversion server. No account is required to use the converter.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          If analytics or error monitoring are enabled on the site, they should
          not include the contents of your image files.
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

      {/* Related Tools */}
      <section aria-labelledby="related-tools-heading">
        <h2
          id="related-tools-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Related Image Conversion Tools
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-blue-400/30 hover:bg-blue-400/15 hover:text-white"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}