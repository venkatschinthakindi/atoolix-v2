import type { ComponentType } from "react";

type SeoComponent = ComponentType<any>;
type SeoLoader = () => Promise<{ default: SeoComponent }>;

const seoLoaders: Record<string, SeoLoader> = {
  "pdf/split-pdf": () => import("@/components/tools/pdf/splitPdf/splitPdfSeoContent"),
  "pdf/merge-pdf": () => import("@/components/tools/pdf/mergePdf/mergePdfSeoContent"),
  "calculator/emi-calculator": () => import("@/components/tools/emiCalculator/emiCalculatorSeoContent"),
  "calculator/roi-calculator": () => import("@/components/tools/financeSuite/investment/investmentReturnsSuiteSeoContent"),
  "calculator/fd-calculator": () => import("@/components/tools/financeSuite/savings/savingsDepositsSuiteSeoContent"),
  "calculator/retirement-calculator": () => import("@/components/tools/financeSuite/retirement/retirementWealthSuiteSeoContent"),
  "image/image-to-pdf": () => import("@/components/tools/pdf/image-to-pdf/ImageToPDFSeoContent"),
  "image/jpg-to-pdf": () => import("@/components/tools/pdf/image-to-pdf/JpgToPdfSeoContent"),
  "image/png-to-pdf": () => import("@/components/tools/pdf/image-to-pdf/PngToPdfSeoContent"),
  "image/webp-to-pdf": () => import("@/components/tools/pdf/image-to-pdf/WebpToPdfSeoContent"),
  "pdf/compress-pdf": () => import("@/components/tools/pdf/compress-pdf/pdfCompressorSeoContent"),
  calculator: () => import("@/components/tools/calculator/calculatorSeoContent"),
  converter: () => import("@/components/tools/converter/unitConverterSeoContent"),
  "image/jpg-to-png": () => import("@/components/tools/image/imageConverter/jpgToPngSeoContent"),
  "image/png-to-jpg": () => import("@/components/tools/image/imageConverter/pngToJpgSeoContent"),
  "image/png-to-jpeg": () => import("@/components/tools/image/imageConverter/pngToJpegSeoContent"),
  "image/jpg-to-webp": () => import("@/components/tools/image/imageConverter/jpgToWebpSeoContent"),
  "image/png-to-webp": () => import("@/components/tools/image/imageConverter/pngToWebpSeoContent"),
  "image/webp-to-jpg": () => import("@/components/tools/image/imageConverter/webpToJpgSeoContent"),
  "image/webp-to-jpeg": () => import("@/components/tools/image/imageConverter/webpToJpegSeoContent"),
  "image/webp-to-png": () => import("@/components/tools/image/imageConverter/webpToPngSeoContent"),
  "image/svg-to-png": () => import("@/components/tools/image/imageConverter/svgToPngSeoContent"),
  "image/svg-to-jpg": () => import("@/components/tools/image/imageConverter/svgToJpgSeoContent"),
  "image/compress-image": () => import("@/components/tools/image/imageCompressor/imageCompressorSeoContent"),
  "image/compress-jpg": () => import("@/components/tools/image/imageCompressor/compressJpgSeoContent"),
  "image/compress-png": () => import("@/components/tools/image/imageCompressor/compressPngSeoContent"),
  "image/compress-webp": () => import("@/components/tools/image/imageCompressor/compressWebpSeoContent"),
  "image/compress-image-to-50kb": () => import("@/components/tools/image/imageCompressor/compress50SeoContent"),
  "image/compress-image-to-20kb": () => import("@/components/tools/image/imageCompressor/compress20SeoContent"),
  "image/compress-image-to-100kb": () => import("@/components/tools/image/imageCompressor/compress100SeoContent"),
  "image/passport-photo-resizer": () => import("@/components/tools/image/passpoerPhotoResizer/passpoerPhotoSeoContent"),
  "image/resize-signature-for-upload": () => import("@/components/tools/image/signatureResizer/signatureResizerSeoContent"),
  "date-time/timezone-converter": () => import("@/components/tools/dateTime/timezone-converter/timezoneConverterSeoContent"),
  "date-time/meeting-time-finder": () => import("@/components/tools/dateTime/meeting-time-finder/meetingTimeFinderSeoContent"),
};

export default async function ToolSeoContent({ toolId }: { toolId: string }) {
  const key = toolId.toLowerCase();
  const loader = seoLoaders[key];
  if (!loader) return null;

  const Mod = await loader();
  const SeoContent = Mod.default;
  return <SeoContent />;
}