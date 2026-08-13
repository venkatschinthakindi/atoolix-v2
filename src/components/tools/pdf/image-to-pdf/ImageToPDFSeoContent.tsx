export default function ImageToPdfSeoContent() {
  const faqItems = [
    {
      q: 'How do I convert images to PDF online?',
      a: 'Add one or more JPG, JPEG, PNG, or WEBP images, arrange them in the order you want, choose the available page size, orientation, and margin settings, then generate and download your PDF directly in the browser.',
    },
    {
      q: 'Can I convert multiple images into one PDF?',
      a: 'Yes. You can add multiple images and combine them into a single PDF. You can also reorder the images before generating the document so the pages appear in the correct sequence.',
    },
    {
      q: 'Can I convert JPG to PDF?',
      a: 'Yes. JPG and JPEG images can be converted into a PDF document. You can add one image or combine multiple JPG images into a single PDF.',
    },
    {
      q: 'Can I convert PNG to PDF?',
      a: 'Yes. PNG images are supported and can be combined with other supported images to create a PDF.',
    },
    {
      q: 'Can I convert WEBP to PDF?',
      a: 'Yes. WEBP images can be converted to PDF and combined with other supported image formats in the same document.',
    },
    {
      q: 'Can I convert photos from my phone to PDF?',
      a: 'Yes. You can select supported photos from a mobile device and create a PDF directly from a compatible mobile browser.',
    },
    {
      q: 'Can I reorder images before creating the PDF?',
      a: 'Yes. Images can be rearranged before PDF generation so you can control the order in which they appear in the document.',
    },
    {
      q: 'Can I choose the PDF page size and orientation?',
      a: 'Yes. The converter provides page layout controls such as page size, portrait or landscape orientation, and margins so you can adjust the PDF to suit your content.',
    },
    {
      q: 'Are my images uploaded to Atoolix servers?',
      a: 'The conversion workflow processes the selected images locally in your browser. The files are not uploaded to Atoolix servers for the conversion itself.',
    },
    {
      q: 'Do I need to install software or create an account?',
      a: 'No. The tool runs in your browser, so you can use it without installing desktop software or creating an account.',
    },
    {
      q: 'Does the image to PDF converter work on mobile devices?',
      a: 'Yes. The interface is designed to work across mobile phones, tablets, laptops, and desktop browsers.',
    },
    {
      q: 'How many images can I convert at once?',
      a: 'The practical number of images depends on the size of the images and the available memory on your device and browser. Large image collections may require more device resources during local PDF generation.',
    },
  ];

  const howToSteps = [
    {
      title: 'Add your images',
      desc: 'Select or drag and drop JPG, JPEG, PNG, or WEBP images into the converter.',
      icon: '📤',
    },
    {
      title: 'Arrange the images',
      desc: 'Reorder the images so they appear in the desired sequence in your PDF.',
      icon: '↕️',
    },
    {
      title: 'Customize the page',
      desc: 'Choose the available page size, portrait or landscape orientation, and margin settings.',
      icon: '⚙️',
    },
    {
      title: 'Generate and preview',
      desc: 'Create the PDF and review the result before saving the finished document.',
      icon: '👁️',
    },
    {
      title: 'Download the PDF',
      desc: 'Save the generated PDF directly to your device without sending the images to a conversion server.',
      icon: '⬇️',
    },
  ];

  const coreFeatures = [
    {
      title: 'JPG, JPEG, PNG & WEBP to PDF',
      desc: 'Convert common image formats into a standard PDF document.',
      icon: '🖼️',
    },
    {
      title: 'Multiple Images',
      desc: 'Combine several images into one PDF instead of creating separate files.',
      icon: '📚',
    },
    {
      title: 'Image Reordering',
      desc: 'Arrange images in the exact sequence you want before generating the PDF.',
      icon: '↕️',
    },
    {
      title: 'Page Size',
      desc: 'Choose from the page sizes available in the converter for your document layout.',
      icon: '📄',
    },
    {
      title: 'Portrait & Landscape',
      desc: 'Select the orientation that best fits documents, screenshots, or wide images.',
      icon: '🔄',
    },
    {
      title: 'Margin Controls',
      desc: 'Adjust page margins to create a tighter or more spacious image layout.',
      icon: '📏',
    },
    {
      title: 'Browser-Based Processing',
      desc: 'Process images locally in the browser rather than uploading them for conversion.',
      icon: '🔒',
    },
    {
      title: 'Preview & Download',
      desc: 'Review the generated document before saving the PDF to your device.',
      icon: '✅',
    },
  ];

  const audiences = [
    {
      title: 'Students',
      desc: 'Combine photographed notes, assignments, worksheets, or screenshots into a single PDF for submission or sharing.',
      icon: '🎓',
    },
    {
      title: 'Office Users',
      desc: 'Turn scanned pages, receipts, forms, and image attachments into an easier-to-share PDF document.',
      icon: '💼',
    },
    {
      title: 'Mobile Users',
      desc: 'Convert photos and screenshots into PDFs directly from a phone or tablet browser.',
      icon: '📱',
    },
    {
      title: 'Designers',
      desc: 'Package selected design exports, mockups, or visual references into a single PDF.',
      icon: '🎨',
    },
    {
      title: 'Content Creators',
      desc: 'Combine image collections, screenshots, and visual assets into an organized PDF.',
      icon: '🧩',
    },
    {
      title: 'Privacy-Conscious Users',
      desc: 'Use a browser-based workflow when you prefer image conversion to happen locally on your device.',
      icon: '🛡️',
    },
  ];

  const relatedTools = [
    { name: 'PDF Merger', href: '/tools/pdf/merge-pdf' },
    { name: 'PDF Splitter', href: '/tools/pdf/split-pdf' },
    { name: 'WebP to PDF', href: '/tools/image/webp-to-pdf' },
    { name: 'PDF Compressor', href: '/tools/pdf/compress-pdf' },
    { name: 'Image Compressor', href: '/tools/image/compress-image' },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 text-white sm:space-y-5 sm:p-5 lg:space-y-6 lg:p-6">
      {/* Introduction */}
      <section aria-labelledby="intro-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🪄
          </span>

          <h2
            id="intro-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Image to PDF Converter – JPG, PNG & WEBP to PDF Online
          </h2>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
          Convert JPG, JPEG, PNG, and WEBP images into PDF documents directly in
          your browser. Add multiple images, arrange them in the order you want,
          choose the available page size and orientation, adjust margins, and
          generate a PDF ready to save or share.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          The workflow is designed for common tasks such as converting photos,
          screenshots, scanned pages, receipts, notes, and image collections
          into a single document. Image processing takes place locally in your
          browser, so the images used for conversion are not uploaded to
          Atoolix servers.
        </p>
      </section>

      {/* What is it */}
      <section aria-labelledby="what-is-heading">
        <div className="flex gap-3">
          <span aria-hidden="true">📘</span>

          <h2
            id="what-is-heading"
            className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            What Is an Image to PDF Converter?
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          An image to PDF converter turns one or more image files into a PDF
          document. This is useful when several images need to be kept together,
          printed, submitted, archived, or shared as one file instead of
          separate image attachments.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          A useful image-to-PDF workflow also gives you control over the order
          and layout of the images. With this converter, you can arrange the
          images and customize supported page settings before generating the
          final PDF.
        </p>
      </section>

      {/* Supported formats */}
      <section
        aria-labelledby="formats-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="formats-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Supported Image Formats
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 p-5">
            <h3 className="mb-3 font-semibold text-white">
              Supported Input Formats
            </h3>

            <ul className="space-y-2 text-sm text-white/70">
              <li>✓ JPG</li>
              <li>✓ JPEG</li>
              <li>✓ PNG</li>
              <li>✓ WEBP</li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 p-5">
            <h3 className="mb-3 font-semibold text-white">
              Common Conversion Tasks
            </h3>

            <ul className="space-y-2 text-sm text-white/70">
              <li>✓ JPG to PDF</li>
              <li>✓ JPEG to PDF</li>
              <li>✓ PNG to PDF</li>
              <li>✓ WEBP to PDF</li>
            </ul>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-white/65 sm:text-base">
          These formats cover many everyday images from phones, screenshots,
          cameras, scanned documents, and design workflows. You can combine
          supported image formats in the same PDF when needed.
        </p>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading">
        <div className="flex gap-3">
          <span aria-hidden="true">✨</span>

          <h2
            id="features-heading"
            className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Image to PDF Converter Features
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section aria-labelledby="workflow-heading">
        <div className="flex gap-3">
          <span aria-hidden="true">🪜</span>

          <h2
            id="workflow-heading"
            className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            How to Convert Images to PDF
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black shadow-lg"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>

                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-white/60">
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
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Common Image to PDF Use Cases
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <ul className="space-y-3 text-sm leading-relaxed text-white/70">
            <li>• Combine scanned pages into one PDF</li>
            <li>• Turn screenshots into a shareable document</li>
            <li>• Combine assignment or study-note photos</li>
            <li>• Organize receipts and invoice images</li>
            <li>• Create a PDF from photographed documents</li>
          </ul>

          <ul className="space-y-3 text-sm leading-relaxed text-white/70">
            <li>• Package product or portfolio images</li>
            <li>• Create printable photo documents</li>
            <li>• Send multiple images as one attachment</li>
            <li>• Archive image-based records</li>
            <li>• Combine mobile photos into one document</li>
          </ul>
        </div>
      </section>

      {/* Audience */}
      <section aria-labelledby="audience-heading">
        <div className="flex gap-3">
          <span aria-hidden="true">👥</span>

          <h2
            id="audience-heading"
            className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Who Can Use This Image to PDF Converter?
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why use */}
      <section aria-labelledby="why-use-heading">
        <h2
          id="why-use-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Why Convert Images to PDF Online?
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          PDF is useful when several images need to be handled as one document.
          Instead of sending individual photos or screenshots, you can combine
          them into a single file that is easier to share, print, submit, or
          archive.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          An online browser-based workflow is also convenient when you need to
          convert images quickly without installing additional software. The
          local processing approach is particularly useful when you prefer your
          selected images to remain on your device during conversion.
        </p>
      </section>

      {/* Layout controls */}
      <section aria-labelledby="settings-heading">
        <h2
          id="settings-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Customize Page Size, Orientation and Margins
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Page layout affects how images fit inside the generated PDF. Use the
          available page-size options to match the type of document you are
          creating, then select portrait or landscape orientation based on the
          shape of your images.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Margin settings can also help create a cleaner layout. Smaller margins
          can provide more space for the image, while larger margins can make a
          document easier to read or print.
        </p>
      </section>

      {/* How processing works */}
      <section aria-labelledby="how-it-works-heading">
        <h2
          id="how-it-works-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          How Image to PDF Conversion Works
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          When you select images, the browser reads the files locally and
          prepares them for PDF generation. You can then arrange the images and
          configure the available page settings before creating the document.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          During PDF generation, the selected images are placed into the
          document according to their order and the chosen layout settings.
          Images may be scaled to fit the selected page while maintaining a
          practical document layout.
        </p>
      </section>

      {/* Tips */}
      <section aria-labelledby="tips-heading">
        <h2
          id="tips-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Tips for Better Image to PDF Results
        </h2>

        <ul className="space-y-3 text-sm leading-relaxed text-white/70">
          <li>• Arrange images before generating the PDF.</li>
          <li>• Use portrait orientation for document-style images.</li>
          <li>• Use landscape orientation for wide images when appropriate.</li>
          <li>• Adjust margins when you need more or less space around images.</li>
          <li>• Start with clear, high-resolution images for better output quality.</li>
          <li>• For large image collections, process a manageable number at a time if your device has limited memory.</li>
        </ul>
      </section>

      {/* Privacy */}
      <section aria-labelledby="privacy-heading">
        <h2
          id="privacy-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Privacy and Local Browser Processing
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Image conversion is performed locally in your browser. The images you
          select for conversion are not uploaded to Atoolix servers as part of
          the PDF generation process.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          This browser-based approach can be useful when working with personal
          photos, screenshots, scanned documents, receipts, or other files that
          you prefer to keep on your device.
        </p>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-heading">
        <h2
          id="benefits-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Benefits of Using an Image to PDF Converter
        </h2>

        <ul className="space-y-3 text-sm leading-relaxed text-white/65">
          <li>
            Convert JPG, JPEG, PNG, and WEBP images into a single PDF.
          </li>
          <li>
            Combine multiple images without creating separate PDF files.
          </li>
          <li>
            Control image order before generating the document.
          </li>
          <li>
            Adjust available page size, orientation, and margin settings.
          </li>
          <li>
            Convert images directly from a browser without installing software.
          </li>
          <li>
            Keep image processing local to your device during conversion.
          </li>
          <li>
            Use the responsive workflow on phones, tablets, laptops, and desktops.
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-white/10">
                <span className="text-sm font-semibold text-white">
                  {item.q}
                </span>

                <span
                  className="text-lg text-blue-400"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>

              <div className="border-t border-dashed border-white/10 p-5 pt-4">
                <p className="text-xs leading-relaxed text-white/60 sm:text-sm">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Related tools */}
      <section aria-labelledby="related-tools-heading">
        <h2
          id="related-tools-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Related PDF and Image Tools
        </h2>

        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 transition hover:border-blue-400/30 hover:bg-blue-400/15 hover:text-white"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </section>

      {/* Conclusion */}
      <section
        aria-labelledby="conclusion-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="conclusion-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Convert Images to PDF in Your Browser
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Atoolix Image to PDF Converter provides a straightforward way to turn
          JPG, JPEG, PNG, and WEBP images into a single PDF. You can combine
          multiple images, arrange their order, customize the available page
          settings, preview the result, and download the finished document.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Whether you are converting photos, screenshots, scanned pages, notes,
          receipts, or image collections, the browser-based workflow keeps the
          process convenient while local processing helps keep your selected
          files on your device during conversion.
        </p>
      </section>
    </div>
  );
}