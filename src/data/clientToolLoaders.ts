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
    "privacysecurity/file-analyzer",
    () => import("@/components/tools/privacysecurity/fileAnalyzer"),
  ],
  [
    "calculator/emi-calculator",
    () => import("@/components/tools/emiCalculator/calculators/HomeLoanEmiCalculatorPage"),
  ],
  [
    "calculator/car-loan-emi-calculator",
    () => import("@/components/tools/emiCalculator/calculators/CarLoanEmiCalculatorPage"),
  ],
  [
    "calculator/home-loan-emi-calculator",
    () => import("@/components/tools/emiCalculator/calculators/HomeLoanEmiCalculatorPage"),
  ],
  [
    "calculator/personal-loan-emi-calculator",
    () => import("@/components/tools/emiCalculator/calculators/PersonalLoanEmiCalculatorPage"),
  ],
  [
    "calculator/roi-calculator",
    () =>
      import(
        "@/components/tools/financeSuite/investment/calculators/investmentReturnsSuite"
      ),
  ],
  [
    "calculator/cagr-calculator",
    () =>
      import(
        "@/components/tools/financeSuite/investment/calculators/cagrCalculator"
      ),
  ],
  [
    "calculator/xirr-calculator",
    () =>
      import(
        "@/components/tools/financeSuite/investment/calculators/xirrCalculator"
      ),
  ],
  [
    "calculator/lumpsum-calculator",
    () =>
      import(
        "@/components/tools/financeSuite/investment/calculators/lumpsumCalculator"
      ),
  ],
  [
    "calculator/simple-interest-calculator",
    () =>
      import("@/components/tools/financeSuite/savings/simpleInterestDepositsSuite"),
  ],
  [
    "calculator/compound-interest-calculator",
    () =>
      import("@/components/tools/financeSuite/savings/compoundInterestCalculator"),
  ],
  [
    "calculator/fd-calculator",
    () =>
      import("@/components/tools/financeSuite/savings/fixedDepositCalculator"),
  ],
  [
    "calculator/recurring-deposit-calculator",
    () =>
      import("@/components/tools/financeSuite/savings/recurringDepositCalculator"),
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

  ["qrcode/qr-code-generator", () => import("@/components/tools/qrCode/QrCode")],
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
    "datetime/timezone-converter",
    () =>
      import(
        "@/components/tools/dateTime/timezone-converter/timezoneConverter"
      ),
  ],
  [
    "datetime/meeting-time-finder",
    () =>
      import(
        "@/components/tools/dateTime/meeting-time-finder/meetingTimeFinder"
      ),
  ],
]);