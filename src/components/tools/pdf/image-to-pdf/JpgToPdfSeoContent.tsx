import Link from "next/link";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function JpgToPdfSeoContent() {
  const faqItems = [
    {
      id: "how-convert",
      q: "How do I convert JPG and JPEG images to PDF?",
      a: "Add one or more JPG or JPEG images, arrange them in the order you want, choose your PDF page settings, preview the result, and download the generated PDF.",
    },
    {
      id: "multiple-images",
      q: "Can I convert multiple JPG images into one PDF?",
      a: "Yes. You can add multiple JPG or JPEG images and combine them into a single PDF in the order you choose.",
    },
    {
      id: "jpeg-support",
      q: "Does this JPG to PDF converter support JPEG files?",
      a: "Yes. JPG and JPEG are both supported input formats, so you can convert either file extension to PDF.",
    },
    {
      id: "free",
      q: "Is the JPG to PDF converter free to use?",
      a: "Yes. You can use the JPG to PDF converter without creating an account or installing desktop software.",
    },
    {
      id: "privacy",
      q: "Are my JPG images uploaded to a server?",
      a: "The conversion is performed directly in your browser. The selected images do not need to be sent to a remote conversion server for the PDF generation process.",
    },
    {
      id: "reorder",
      q: "Can I reorder JPG images before converting them to PDF?",
      a: "Yes. You can drag and drop the images to change their order before generating the PDF.",
    },
    {
      id: "page-size",
      q: "Can I choose the PDF page size?",
      a: "Yes. You can select from the page sizes supported by the converter, including common document sizes such as A4 when available.",
    },
    {
      id: "orientation",
      q: "Can I choose portrait or landscape orientation?",
      a: "Yes. You can select portrait or landscape orientation to better match the shape and purpose of your images.",
    },
    {
      id: "margins",
      q: "Can I change the PDF margins?",
      a: "Yes. Supported margin settings let you control the spacing between the image and the edges of the PDF page.",
    },
    {
      id: "quality",
      q: "Will converting JPG to PDF reduce image quality?",
      a: "The final appearance depends on the original image resolution and the selected PDF layout. The converter places the images into the PDF according to your chosen page settings.",
    },
    {
      id: "mobile",
      q: "Can I convert JPG to PDF on my phone?",
      a: "Yes. The responsive interface works on modern mobile browsers, so you can select JPG or JPEG images stored on your phone and create a PDF.",
    },
    {
      id: "one-page",
      q: "Can I put each JPG image on a separate PDF page?",
      a: "Yes. The converter can place images into the PDF according to its supported page and layout settings, including workflows where each image appears on its own page.",
    },
    {
      id: "file-limit",
      q: "Is there a limit to how many JPG files I can convert?",
      a: "The practical limit depends on your browser, device memory, image dimensions, and the total size of the selected files. Large image collections may require more available device memory.",
    },
  ];

  const howToSteps = [
    {
      id: "upload",
      title: "Upload JPG or JPEG Images",
      desc: "Select one or more JPG or JPEG files using the file picker or drag-and-drop area.",
      icon: "📤",
    },
    {
      id: "reorder",
      title: "Arrange the Images",
      desc: "Drag and drop your images into the exact order you want them to appear in the PDF.",
      icon: "↕️",
    },
    {
      id: "settings",
      title: "Choose PDF Settings",
      desc: "Select the available page size, orientation, and margin options for your PDF layout.",
      icon: "⚙️",
    },
    {
      id: "preview",
      title: "Generate and Preview",
      desc: "Create the PDF and review the result before saving it to your device.",
      icon: "👁️",
    },
    {
      id: "download",
      title: "Download the PDF",
      desc: "Save the finished PDF directly to your device after checking the final result.",
      icon: "⬇️",
    },
  ];

  const coreFeatures = [
    {
      id: "jpg-jpeg",
      title: "JPG and JPEG to PDF",
      desc: "Convert common JPG and JPEG image files into PDF documents directly in your browser.",
      icon: "🖼️",
    },
    {
      id: "multiple",
      title: "Multiple Image Support",
      desc: "Combine multiple JPG or JPEG images into a single PDF instead of creating separate files.",
      icon: "📚",
    },
    {
      id: "reordering",
      title: "Drag-and-Drop Reordering",
      desc: "Arrange images in the correct sequence before generating the final PDF.",
      icon: "🖱️",
    },
    {
      id: "page-size",
      title: "Page Size Options",
      desc: "Choose from the page sizes supported by the converter for a better document layout.",
      icon: "📄",
    },
    {
      id: "orientation",
      title: "Portrait or Landscape",
      desc: "Choose an orientation that fits documents, screenshots, scans, and landscape photos.",
      icon: "🔄",
    },
    {
      id: "margins",
      title: "Margin Controls",
      desc: "Adjust supported margins to control the spacing around images on each PDF page.",
      icon: "📏",
    },
    {
      id: "local",
      title: "Browser-Based Processing",
      desc: "PDF generation takes place directly in your browser without requiring a remote conversion upload.",
      icon: "🔒",
    },
    {
      id: "preview",
      title: "Preview Before Download",
      desc: "Review the generated PDF before saving the final file to your device.",
      icon: "✅",
    },
  ];

  const audiences = [
    {
      id: "students",
      title: "Students",
      desc: "Combine assignment photos, handwritten notes, screenshots, or scanned pages into one PDF.",
      icon: "🎓",
    },
    {
      id: "office",
      title: "Office and Business Users",
      desc: "Turn receipts, invoices, scanned documents, and image attachments into organized PDF files.",
      icon: "💼",
    },
    {
      id: "photographers",
      title: "Photographers and Designers",
      desc: "Package selected JPG images into a convenient PDF for review, printing, or sharing.",
      icon: "🎨",
    },
    {
      id: "mobile",
      title: "Mobile Users",
      desc: "Convert photos stored on your phone without needing a separate desktop application.",
      icon: "📱",
    },
    {
      id: "personal",
      title: "Everyday Users",
      desc: "Combine screenshots, travel documents, receipts, forms, and other images into one PDF.",
      icon: "📁",
    },
    {
      id: "privacy",
      title: "Privacy-Conscious Users",
      desc: "Use browser-based processing when you prefer your selected images to stay on your device.",
      icon: "🛡️",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-5 p-4 text-foreground sm:space-y-6 sm:p-5 lg:space-y-7 lg:p-6">
      {/* Introduction */}
      <section aria-labelledby="intro-heading">
        <div className="flex gap-3">
          <span aria-hidden="true" className="text-2xl">
            🪄
          </span>

          <h2
            id="intro-heading"
            className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            JPG to PDF Converter – Convert JPG & JPEG Images to PDF Online
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Convert JPG and JPEG images to PDF online with a fast, browser-based
          JPG to PDF converter. Add multiple images, arrange them in the order
          you want, choose supported page settings, preview the result, and
          download the finished PDF.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          The tool is designed for common tasks such as combining scanned
          pages, screenshots, receipts, assignments, forms, and photos into a
          single PDF. The responsive interface works across desktop, tablet,
          and mobile browsers.
        </p>
      </section>

      {/* What is JPG to PDF */}
      <section aria-labelledby="what-is-heading">
        <div className="flex gap-3">
          <span aria-hidden="true" className="text-2xl">
            📘
          </span>

          <h2
            id="what-is-heading"
            className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            What Is a JPG to PDF Converter?
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          A JPG to PDF converter turns one or more JPG or JPEG image files into
          a PDF document. This is useful when images need to be grouped into a
          single file that is easier to print, share, archive, or submit.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Instead of converting each image separately, you can add multiple
          files, arrange their order, and create one PDF with the page settings
          supported by the converter.
        </p>
      </section>

      {/* Supported formats */}
      <section
        aria-labelledby="formats-heading"
        className="rounded-2xl border border-border bg-card p-5 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="formats-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Supported Image Formats
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-5">
            <h3 className="mb-3 font-semibold text-foreground">
              Supported Input Formats
            </h3>

            <ul className="space-y-2 text-sm text-foreground-secondary">
              <li>✓ JPG</li>
              <li>✓ JPEG</li>
            </ul>
          </div>

          <div className="rounded-xl border border-border p-5">
            <h3 className="mb-3 font-semibold text-foreground">
              Output Format
            </h3>

            <p className="text-sm leading-relaxed text-foreground-secondary">
              The converter generates a PDF containing the selected JPG or
              JPEG images according to the chosen page and layout settings.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading">
        <div className="flex gap-3">
          <span aria-hidden="true" className="text-2xl">
            ✨
          </span>

          <h2
            id="features-heading"
            className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            JPG to PDF Converter Features
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 text-2xl"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-foreground-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to */}
      <section aria-labelledby="workflow-heading">
        <div className="flex gap-3">
          <span aria-hidden="true" className="text-2xl">
            🪜
          </span>

          <h2
            id="workflow-heading"
            className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            How to Convert JPG to PDF
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <div
              key={step.id}
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black shadow-lg"
                >
                  {index + 1}
                </span>

                <span
                  aria-hidden="true"
                  className="flex-shrink-0 text-2xl"
                >
                  {step.icon}
                </span>

                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {step.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-foreground-secondary">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Common Uses for JPG to PDF Conversion
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <ul className="space-y-3 text-sm leading-relaxed text-foreground-secondary">
            <li>• Combine scanned document pages into one PDF.</li>
            <li>• Turn screenshots into a shareable PDF.</li>
            <li>• Combine assignment or study images for submission.</li>
            <li>• Organize receipts, invoices, and expense images.</li>
          </ul>

          <ul className="space-y-3 text-sm leading-relaxed text-foreground-secondary">
            <li>• Create a PDF from travel or identity document images.</li>
            <li>• Package multiple photos into a printable document.</li>
            <li>• Send several images as one PDF attachment.</li>
            <li>• Create simple image-based portfolios or archives.</li>
          </ul>
        </div>
      </section>

      {/* Audience */}
      <section aria-labelledby="audience-heading">
        <div className="flex gap-3">
          <span aria-hidden="true" className="text-2xl">
            👥
          </span>

          <h2
            id="audience-heading"
            className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            Who Can Use a JPG to PDF Converter?
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 text-2xl"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-foreground-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Page settings */}
      <section aria-labelledby="settings-heading">
        <h2
          id="settings-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Customize PDF Page Size, Orientation and Margins
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Page settings help you control how your JPG images are positioned
          inside the generated PDF. Choose from the page sizes supported by
          the converter, then select portrait or landscape orientation based
          on the shape of your images.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Margin controls can add more space around an image or allow the
          image to use more of the available page area. The final appearance
          depends on the original image dimensions and the selected PDF
          settings.
        </p>
      </section>

      {/* Why convert */}
      <section aria-labelledby="why-convert-heading">
        <h2
          id="why-convert-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Why Convert JPG Images to PDF?
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          JPG images are convenient for storing and sharing individual
          pictures, but multiple images can be difficult to organize as
          separate attachments. Converting them to one PDF keeps related
          images together in a single document.
        </p>

        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-secondary">
          <li>• Keep multiple images together in one file.</li>
          <li>• Make image collections easier to print and share.</li>
          <li>• Organize scanned pages and document images.</li>
          <li>• Create a single attachment from several JPG files.</li>
          <li>• Keep images in a defined page order.</li>
        </ul>
      </section>

      {/* Tips */}
      <section aria-labelledby="tips-heading">
        <h2
          id="tips-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Tips for Better JPG to PDF Results
        </h2>

        <ul className="space-y-3 text-sm leading-relaxed text-foreground-secondary">
          <li>
            • Arrange the images before generating the PDF so the page order is
            correct.
          </li>
          <li>
            • Use portrait orientation for document-style pages when it fits
            the source images.
          </li>
          <li>
            • Use landscape orientation for wide photographs and screenshots.
          </li>
          <li>
            • Choose appropriate margins when you need more or less space
            around the images.
          </li>
          <li>
            • Start with clear, sufficiently high-resolution JPG images when
            print quality matters.
          </li>
          <li>
            • For large image collections, keep an eye on available browser
            memory and device resources.
          </li>
        </ul>
      </section>

      {/* How processing works */}
      <section aria-labelledby="how-it-works-heading">
        <h2
          id="how-it-works-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          How JPG to PDF Conversion Works
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          When you select JPG or JPEG images, the converter reads the selected
          files in your browser and prepares them for PDF generation. You can
          then arrange the images and choose the available page settings
          before creating the final document.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Each selected image is added to the generated PDF according to its
          position in your image list and the selected layout settings. The
          images are fitted to the available PDF page area based on the
          converter's supported sizing behavior.
        </p>
      </section>

      {/* Privacy */}
      <section
        aria-labelledby="privacy-heading"
        className="rounded-2xl border border-border bg-card p-5 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="privacy-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Privacy and Browser-Based Processing
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          JPG to PDF conversion is performed directly in your browser. The
          selected images do not need to be sent to a remote conversion server
          for the PDF generation process.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          This browser-based workflow can be useful when working with personal
          photos, receipts, scanned documents, screenshots, or other files
          that you prefer to process locally on your device.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          You can use the converter without creating an account or installing
          additional desktop conversion software.
        </p>
      </section>

      {/* Mobile */}
      <section aria-labelledby="mobile-heading">
        <h2
          id="mobile-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Convert JPG to PDF on Mobile
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          You can use the converter from a modern mobile browser to turn photos
          stored on your phone into PDF documents. This is useful for quickly
          combining receipts, scanned pages, screenshots, assignments, forms,
          or other JPG images without moving them to a computer first.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          The responsive interface is designed to work across phones, tablets,
          laptops, and desktop screens.
        </p>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Frequently Asked Questions About JPG to PDF Conversion
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-surface-raised">
                <span className="text-sm font-semibold text-foreground">
                  {item.q}
                </span>

                <span
                  aria-hidden="true"
                  className="text-lg text-blue-700 dark:text-blue-400 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              <div className="border-t border-dashed border-border p-5 pt-4">
                <p className="text-xs leading-relaxed text-foreground-secondary sm:text-sm">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <RelatedTools toolId="image/jpg-to-pdf" />

      {/* Conclusion */}
      <section
        aria-labelledby="conclusion-heading"
        className="rounded-2xl border border-border bg-card p-5 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="conclusion-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          JPG to PDF Converter
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          A JPG to PDF converter provides a simple way to combine JPG and JPEG
          images into a single, organized PDF. You can upload multiple images,
          arrange their order, select supported page settings, preview the
          result, and download the finished document.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Whether you are preparing scanned documents, combining screenshots,
          organizing receipts, creating assignments, or packaging photos,
          browser-based JPG to PDF conversion provides a convenient workflow
          across desktop and mobile devices.
        </p>
      </section>
    </div>
  );
}