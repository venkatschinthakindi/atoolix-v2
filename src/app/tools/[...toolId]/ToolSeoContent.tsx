import dynamic from "next/dynamic";

const seoRegistry: Record<string, any> = {
  "pdf/split-pdf": dynamic(
    () => import("@/components/tools/pdf/splitPdf/splitPdfSeoContent"),
    { ssr: true }
  ),

  "pdf/merge-pdf": dynamic(
    () => import("@/components/tools/pdf/mergePdf/mergePdfSeoContent"),
    { ssr: true }
  ),

  "calculator/emi-calculator": dynamic(
    () => import("@/components/tools/emiCalculator/emiCalculatorSeoContent"),
    { ssr: true }
  ),
  "calculator/roi-calculator": dynamic(
    () => import("@/components/tools/financeSuite/investment/investmentReturnsSuiteSeoContent"),
    { ssr: true }
  ),
  "calculator/fd-calculator": dynamic(
    () => import("@/components/tools/financeSuite/savings/savingsDepositsSuiteSeoContent"),
    { ssr: true }
  ),
  "calculator/retirement-calculator": dynamic(
    () => import("@/components/tools/financeSuite/retirement/retirementWealthSuiteSeoContent"),
    { ssr: true }
  ),

  "image/image-to-pdf": dynamic(
    () => import("@/components/tools/pdf/image-to-pdf/ImageToPDFSeoContent"),
    { ssr: true }
  ),
  "image/jpg-to-pdf": dynamic(
    () => import("@/components/tools/pdf/image-to-pdf/JpgJpegSeoContent"),
    { ssr: true }
  ),
  "image/png-to-pdf": dynamic(
    () => import("@/components/tools/pdf/image-to-pdf/PngToPdfSeoContent"),
    { ssr: true }
  ),
  "image/webp-to-pdf": dynamic(
    () => import("@/components/tools/pdf/image-to-pdf/WebpToPdfSeoContent"),
    { ssr: true }
  ),
  "pdf/compress-pdf": dynamic(
    () => import("@/components/tools/pdf/compress-pdf/pdfCompressorSeoContent"),
    { ssr: true }
  ),
  "calculator": dynamic(
    () => import("@/components/tools/calculator/calculatorSeoContent"),
    { ssr: true }
  ),
  "converter": dynamic(
    () => import("@/components/tools/converter/unitConverterSeoContent"),
    { ssr: true }
  ),

  "image/jpg-to-png": dynamic(
    () => import("@/components/tools/image/imageConverter/jpgToPngSeoContent"),
    { ssr: true }
  ),
  "image/png-to-jpg": dynamic(
    () => import("@/components/tools/image/imageConverter/pngToJpegSeoContent"),
    { ssr: true }
  ),
  "image/png-to-jpeg": dynamic(
    () => import("@/components/tools/image/imageConverter/pngToJpegSeoContent"),
    { ssr: true }
  ),
  "image/jpg-to-webp": dynamic(
    () => import("@/components/tools/image/imageConverter/jpgToWebpSeoContent"),
    { ssr: true }
  ),
  "image/png-to-webp": dynamic(
    () => import("@/components/tools/image/imageConverter/pngToWebpSeoContent"),
    { ssr: true }
  ),
  "image/webp-to-jpg": dynamic(
    () => import("@/components/tools/image/imageConverter/webpToJpgSeoContent"),
    { ssr: true }
  ),
  "image/webp-to-jpeg": dynamic(
    () => import("@/components/tools/image/imageConverter/webpToJpegSeoContent"),
    { ssr: true }
  ),
  "image/webp-to-png": dynamic(
    () => import("@/components/tools/image/imageConverter/webpToPngSeoContent"),
    { ssr: true }
  ),
  "image/svg-to-png": dynamic(
    () => import("@/components/tools/image/imageConverter/svgToPngSeoContent"),
    { ssr: true }
  ),
  "image/svg-to-jpg": dynamic(
    () => import("@/components/tools/image/imageConverter/svgToJpgSeoContent"),
    { ssr: true }
  ),
};

export default function ToolSeoContent({ toolId }: { toolId: string }) {
  const SeoContent = seoRegistry[toolId.toLowerCase()];

  if (!SeoContent) return null;

  return <SeoContent />;
}