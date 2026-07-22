import type { ComponentType } from "react";

export type ToolLoader = () => Promise<{
  default: ComponentType<any>;
}>;

// Shared loaders (avoids creating identical arrow functions dozens of times)
const imageConverterLoader: ToolLoader = () =>
  import("@/components/tools/image/imageConverter/ImageConverter");

const imageCompressorLoader: ToolLoader = () =>
  import("@/components/tools/image/imageCompressor/ImageCompressor");

const imageToPdfLoader: ToolLoader = () =>
  import("@/components/tools/pdf/image-to-pdf/ImageToPDF");

export const clientToolLoaders = new Map<string,() => Promise<any>>([
  [
    "calculator/emi-calculator",
    () => import("@/components/tools/emiCalculator/EMICalculator"),
  ],
  [
    "calculator/roi-calculator",
    () =>
      import(
        "@/components/tools/financeSuite/investment/investmentReturnsSuite"
      ),
  ],
  [
    "calculator/fd-calculator",
    () =>
      import("@/components/tools/financeSuite/savings/savingsDepositsSuite"),
  ],
  [
    "calculator/retirement-calculator",
    () =>
      import(
        "@/components/tools/financeSuite/retirement/retirementWealthSuite"
      ),
  ],

  [
    "pdf/split-pdf",
    () => import("@/components/tools/pdf/splitPdf/splitPdf"),
  ],
  [
    "pdf/merge-pdf",
    () => import("@/components/tools/pdf/mergePdf/mergePdf"),
  ],
  [
    "pdf/compress-pdf",
    () => import("@/components/tools/pdf/compress-pdf/CompressPDF"),
  ],

  ["image/image-to-pdf", imageToPdfLoader],
  ["image/jpg-to-pdf", imageToPdfLoader],
  ["image/png-to-pdf", imageToPdfLoader],
  ["image/webp-to-pdf", imageToPdfLoader],

  ["qr-code/qr-code-generator", () => import("@/components/tools/qrCode/QrCode")],
  [
    "calculator",
    () => import("@/components/tools/calculator/Calculator"),
  ],
  [
    "converter",
    () => import("@/components/tools/converter/UnitConverter"),
  ],

  ["image/jpg-to-png", imageConverterLoader],
  ["image/png-to-jpg", imageConverterLoader],
  ["image/png-to-jpeg", imageConverterLoader],
  ["image/jpg-to-webp", imageConverterLoader],
  ["image/png-to-webp", imageConverterLoader],
  ["image/webp-to-jpg", imageConverterLoader],
  ["image/webp-to-jpeg", imageConverterLoader],
  ["image/webp-to-png", imageConverterLoader],
  ["image/svg-to-png", imageConverterLoader],
  ["image/svg-to-jpg", imageConverterLoader],

  ["image/compress-image", imageCompressorLoader],
  ["image/compress-jpg", imageCompressorLoader],
  ["image/compress-png", imageCompressorLoader],
  ["image/compress-webp", imageCompressorLoader],
  ["image/compress-image-to-20kb", imageCompressorLoader],
  ["image/compress-image-to-50kb", imageCompressorLoader],
  ["image/compress-image-to-100kb", imageCompressorLoader],

  [
    "image/passport-photo-resizer",
    () =>
      import(
        "@/components/tools/image/passpoerPhotoResizer/passpoerPhotoCompressor"
      ),
  ],
  [
    "image/resize-signature-for-upload",
    () =>
      import(
        "@/components/tools/image/signatureResizer/signatureCompressor"
      ),
  ],
  [
    "image/background-remover",
    () => import("@/components/tools/image/backgroundRemover/backgroundRemover"),
  ],
  [
    "date-time/timezone-converter",
    () =>
      import(
        "@/components/tools/dateTime/timezone-converter/timezoneConverter"
      ),
  ],
  [
    "date-time/meeting-time-finder",
    () =>
      import(
        "@/components/tools/dateTime/meeting-time-finder/meetingTimeFinder"
      ),
  ],
]);