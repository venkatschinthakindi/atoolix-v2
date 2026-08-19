import Link from "next/link";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function PngToWebpSeoContent() {
  const faqItems = [
    {
      q: "What is a PNG to WebP converter?",
      a: "A PNG to WebP converter changes PNG images into WebP format for workflows that can benefit from smaller files and modern web delivery. This browser-based tool lets you convert PNG images without installing desktop software.",
    },
    {
      q: "Why should I convert PNG to WebP?",
      a: "WebP can produce smaller image files than PNG while maintaining good visual quality. This can make WebP useful for websites, apps, blogs, and other workflows where image size and loading performance matter.",
    },
    {
      q: "Does converting PNG to WebP keep transparency?",
      a: "Yes. WebP supports transparency, so transparent PNG images can retain transparent backgrounds when converted to WebP, provided the conversion implementation preserves the alpha channel.",
    },
    {
      q: "Does converting PNG to WebP reduce quality?",
      a: "It depends on the WebP encoding settings. Lossy WebP can reduce file size with some visual changes, while lossless WebP can preserve image information but may produce larger files.",
    },
    {
      q: "Is WebP better than PNG?",
      a: "Neither format is always better. WebP is often useful when smaller files and web delivery are priorities, while PNG remains useful for lossless graphics, editing workflows, and images where PNG compatibility is required.",
    },
    {
      q: "Is this converter browser-based?",
      a: "Yes. The conversion runs directly in your browser, so files can be processed locally without uploading the image to a conversion server.",
    },
    {
      q: "Is this PNG to WebP converter mobile friendly?",
      a: "Yes. The responsive interface is designed to work across phones, tablets, laptops, and desktop devices.",
    },
    {
      q: "Do I need to sign up to use it?",
      a: "No. The converter does not require account registration to perform the image conversion.",
    },
    {
      q: "Can I use PNG to WebP conversion for website optimization?",
      a: "Yes. Converting suitable PNG images to WebP can reduce image file sizes and help improve image delivery performance on websites and applications.",
    },
    {
      q: "Can I convert transparent PNG images to WebP?",
      a: "Yes. WebP supports transparency, making it suitable for many logos, icons, graphics, and other PNG assets that use transparent backgrounds.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload your PNG",
      desc: "Choose a PNG image from your device.",
      icon: "🖼️",
    },
    {
      title: "Convert in the browser",
      desc: "The image is processed locally in your browser for a simple conversion workflow.",
      icon: "⚡",
    },
    {
      title: "Download the WebP",
      desc: "Save the converted WebP image to your device.",
      icon: "⬇️",
    },
    {
      title: "Use it on the web",
      desc: "Use the WebP file for websites, apps, blogs, and digital assets.",
      icon: "🌐",
    },
  ];

  const coreFeatures = [
    {
      title: "Browser-Based Conversion",
      desc: "Convert PNG images locally in the browser without an upload-dependent workflow.",
      icon: "🌐",
    },
    {
      title: "PNG Support",
      desc: "Convert PNG images including many graphics and transparent assets.",
      icon: "🧾",
    },
    {
      title: "WebP Output",
      desc: "Create WebP images for modern web and application workflows.",
      icon: "🚀",
    },
    {
      title: "Transparency Support",
      desc: "WebP can preserve transparent backgrounds when the source and conversion settings support alpha.",
      icon: "◻️",
    },
    {
      title: "Privacy Friendly",
      desc: "Local browser processing reduces the need to send image files to a server.",
      icon: "🔒",
    },
    {
      title: "Responsive Design",
      desc: "Works across phones, tablets, laptops, and desktop devices.",
      icon: "📱",
    },
    {
      title: "Simple Download",
      desc: "Download the converted WebP file after processing.",
      icon: "💾",
    },
    {
      title: "Clean User Experience",
      desc: "A focused layout keeps the conversion process easy to understand and use.",
      icon: "✨",
    },
  ];

  const audiences = [
    {
      title: "Developers",
      desc: "Prepare smaller web-ready image assets for websites and applications.",
      icon: "👨‍💻",
    },
    {
      title: "Designers",
      desc: "Convert graphics and transparent assets for modern web workflows.",
      icon: "🎨",
    },
    {
      title: "Students",
      desc: "Convert images for projects, assignments, websites, and presentations.",
      icon: "🎓",
    },
    {
      title: "Office Users",
      desc: "Quickly convert PNG images for digital documents and sharing.",
      icon: "💼",
    },
    {
      title: "Marketers",
      desc: "Prepare lighter image assets for websites, campaigns, and landing pages.",
      icon: "📣",
    },
    {
      title: "Mobile Users",
      desc: "Convert PNG images from phones and tablets without installing desktop software.",
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
          PNG to WebP Converter – Convert PNG Images Online
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Convert PNG images to WebP online directly in your browser. This free PNG to
          WebP converter provides a simple way to create web-ready images without
          installing desktop software or creating an account.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          WebP can provide smaller image files while supporting transparency, making it
          useful for websites, apps, blogs, online stores, and other digital workflows.
        </p>
      </section>

      {/* Definition */}
      <section aria-labelledby="definition-heading">
        <h2
          id="definition-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Is a PNG to WebP Converter?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          A PNG to WebP converter changes PNG images into WebP format. WebP is a modern
          image format designed to provide efficient compression while supporting
          features such as transparency.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          Converting PNG to WebP can be useful when you want to reduce image file sizes
          for websites, applications, blogs, online stores, and other digital content.
        </p>
      </section>

      {/* PNG vs WebP */}
      <section aria-labelledby="comparison-heading">
        <h2
          id="comparison-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          PNG vs WebP: Which Format Should You Use?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          PNG and WebP both support transparency, but they serve different purposes.
          WebP is often attractive for web delivery because it can provide smaller files,
          while PNG remains useful when lossless PNG encoding or established PNG workflows
          are required.
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-4 py-3 font-semibold text-white">Feature</th>
                  <th className="px-4 py-3 font-semibold text-white">PNG</th>
                  <th className="px-4 py-3 font-semibold text-white">WebP</th>
                </tr>
              </thead>

              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Compression</td>
                  <td className="px-4 py-3">Lossless</td>
                  <td className="px-4 py-3">
                    Lossy or lossless, depending on encoding
                  </td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Transparency</td>
                  <td className="px-4 py-3">Supported</td>
                  <td className="px-4 py-3">Supported</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Typical file size</td>
                  <td className="px-4 py-3">Often larger</td>
                  <td className="px-4 py-3">Often smaller</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="px-4 py-3 font-medium text-white">Best suited for</td>
                  <td className="px-4 py-3">
                    Graphics, editing, and lossless workflows
                  </td>
                  <td className="px-4 py-3">
                    Web delivery and optimized digital assets
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-medium text-white">
                    Web performance
                  </td>
                  <td className="px-4 py-3">Can produce larger assets</td>
                  <td className="px-4 py-3">
                    Often useful for reducing image payload size
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why convert */}
      <section aria-labelledby="why-use-heading">
        <h2
          id="why-use-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Convert PNG to WebP?
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>
            WebP can create smaller image files than PNG for many types of images.
          </li>
          <li>
            Smaller images can reduce the amount of data needed to load a web page.
          </li>
          <li>
            WebP supports transparency, making it suitable for many PNG graphics.
          </li>
          <li>
            WebP can be useful for websites, apps, blogs, and online stores.
          </li>
          <li>
            Browser-based conversion avoids the need for desktop image-conversion
            software.
          </li>
        </ul>
      </section>

      {/* When to keep PNG */}
      <section aria-labelledby="keep-png-heading">
        <h2
          id="keep-png-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          When Should You Keep PNG Instead?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          PNG is still an excellent format. You may want to keep an image as PNG when
          you specifically need PNG output, are working in a PNG-based editing workflow,
          or want predictable lossless PNG encoding.
        </p>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Use PNG when a workflow specifically requires PNG files.</li>
          <li>
            Keep PNG when preserving the original lossless PNG representation matters.
          </li>
          <li>
            PNG can be a good choice for graphics, screenshots, and editing workflows
            where PNG is already supported.
          </li>
          <li>
            Keep the original PNG as your source file when converting an asset to WebP
            for web delivery.
          </li>
        </ul>
      </section>

      {/* Transparency */}
      <section aria-labelledby="transparency-heading">
        <h2
          id="transparency-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          PNG to WebP and Transparent Backgrounds
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          One important advantage of WebP is its ability to support transparency.
          This means PNG images containing transparent backgrounds can be suitable
          candidates for WebP conversion.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          Transparency is particularly useful for logos, icons, interface graphics,
          product images, and other assets that need to appear over different
          backgrounds.
        </p>
      </section>

      {/* Use cases */}
      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Common PNG to WebP Use Cases
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Convert PNG graphics into WebP for website delivery.</li>
          <li>Convert transparent PNG assets into WebP for modern web projects.</li>
          <li>Prepare smaller image files for blogs and online stores.</li>
          <li>Optimize suitable PNG assets for websites and applications.</li>
          <li>Use WebP when reducing image payload size is a priority.</li>
          <li>Prepare web-ready graphics without installing conversion software.</li>
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
          How to Convert PNG to WebP
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          Converting a PNG image to WebP only takes a few simple steps.
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
          JPG to WebP Converter Features
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
          Who Can Use This PNG to WebP Converter?
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
          This PNG to WebP converter is designed to process images locally in your
          browser. When conversion is performed entirely on your device, the image
          does not need to be uploaded to a conversion server.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          The converter does not require account registration. If analytics or error
          monitoring are enabled on the site, they should not include the contents of
          the images being converted.
        </p>

        <p className="mt-3 text-sm text-white/60">
          Read the full{" "}
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
      <RelatedTools toolId="image/png-to-webp" />
    </div>
  );
}