import type { ComponentType, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";
import { InvestmentCalculatorGuide } from "./InvestmentCalculatorGuide";
import { Compress100SearchIntentSection } from "@/components/tools/image/imageCompressor/compress100SearchIntentSection";
import { CompressTargetSizeGuidance } from "@/components/tools/image/imageCompressor/compressTargetSizeGuidance";
import { JsonLd } from "@/utility/seo/JsonLd";

type SeoComponent = ComponentType<any>;
type SeoLoader = () => Promise<{ default: SeoComponent }>;

type JsonLdScriptProps = {
  type?: string;
  dangerouslySetInnerHTML?: { __html?: unknown };
  children?: ReactNode;
};

function containsDeprecatedStructuredData(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some(containsDeprecatedStructuredData);

  const record = value as Record<string, unknown>;
  const type = record["@type"];
  if (type === "FAQPage" || type === "HowTo") return true;

  return Object.values(record).some(containsDeprecatedStructuredData);
}

function stripDeprecatedStructuredData(node: ReactNode): ReactNode {
  if (Array.isArray(node)) {
    return node.map(stripDeprecatedStructuredData);
  }

  if (!isValidElement(node)) return node;

  const props = node.props as JsonLdScriptProps;
  if (node.type === "script" && props.type === "application/ld+json") {
    const raw = props.dangerouslySetInnerHTML?.__html;
    if (typeof raw === "string") {
      try {
        if (containsDeprecatedStructuredData(JSON.parse(raw))) return null;
      } catch {
        // Preserve unparseable JSON-LD rather than changing unrelated markup.
      }
    }
  }

  if (props.children == null) return node;
  return cloneElement(node, undefined, stripDeprecatedStructuredData(props.children));
}

const seoLoaders: Record<string, SeoLoader> = {
  "pdf/split-pdf": () => import("@/components/tools/pdf/splitPdf/splitPdfSeoContent"),
  "pdf/merge-pdf": () => import("@/components/tools/pdf/mergePdf/mergePdfSeoContent"),
  "calculator/emi-calculator": () => import("@/components/tools/emiCalculator/emiCalculatorHubSeoContent"),
  "calculator/car-loan-emi-calculator": () => import("@/components/tools/emiCalculator/carLoanEmiCalculatorSeoContent"),
  "calculator/personal-loan-emi-calculator": () => import("@/components/tools/emiCalculator/personalLoanEmiCalculatorSeoContent"),
  "calculator/home-loan-emi-calculator": () => import("@/components/tools/emiCalculator/homeLoanEmiCalculatorPageSeoContent"),
  "calculator/sip-calculator": () => import("@/components/tools/financeSuite/investment/sipReturnCalculatorSeoContent"),
  "calculator/cagr-calculator": () => import("@/components/tools/financeSuite/investment/cagrSeoContent"),
  "calculator/xirr-calculator": () => import("@/components/tools/financeSuite/investment/xirrSeoContent"),
  "calculator/lumpsum-calculator": () => import("@/components/tools/financeSuite/investment/lumpsumcalculatorseocontent"),
  "calculator/simple-interest-calculator": () => import("@/components/tools/financeSuite/savings/simpleInterestCalculatorSeoContent"),
  "calculator/fd-calculator": () => import("@/components/tools/financeSuite/savings/fixedDepositCalculatorSeoContent"),
  "calculator/compound-interest-calculator": () => import("@/components/tools/financeSuite/savings/compoundInterestCalculatorSeoContent"),
  "calculator/recurring-deposit-calculator": () => import("@/components/tools/financeSuite/savings/recurringDepositCalculatorSeoContent"),
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
  "datetime/timezone-converter": () => import("@/components/tools/dateTime/timezone-converter/timezoneConverterSeoContent"),
  "datetime/meeting-time-finder": () => import("@/components/tools/dateTime/meeting-time-finder/meetingTimeFinderSeoContent"),
  "image/background-remover": () => import("@/components/tools/image/backgroundRemover/backgroundRemoverSeoContent"),
  "qrcode/qr-code-generator": () => import("@/components/tools/qrCode/qrCodeSeoContent"),
  "privacysecurity/file-analyzer": () => import("@/components/tools/privacysecurity/filecheckupseocontent"),
};

const investmentGuideByTool: Record<string, "sip" | "lumpsum" | "cagr" | "xirr" | undefined> = {
  calculator: undefined,
  "calculator/sip-calculator": "sip",
  "calculator/lumpsum-calculator": "lumpsum",
  "calculator/cagr-calculator": "cagr",
  "calculator/xirr-calculator": "xirr",
};

const lumpsumApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lumpsum Calculator",
  url: "https://atoolix.com/tools/calculator/lumpsum-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  description:
    "Estimate the future value and potential gain of a one-time investment using an initial amount, assumed annual return, and investment period.",
  offers: {
    "@type": "Offer",
    price: 0,
  },
};

export default async function ToolSeoContent({ toolId }: { toolId: string }) {
  const key = toolId.toLowerCase();
  const loader = seoLoaders[key];
  if (!loader) return null;

  const Mod = await loader();
  const SeoContent = Mod.default;
  const investmentGuide = Object.prototype.hasOwnProperty.call(investmentGuideByTool, key);

  return (
    <div className="my-12 space-y-12">
      {stripDeprecatedStructuredData(<SeoContent />)}
      {key === "calculator/lumpsum-calculator" && <JsonLd data={lumpsumApplicationSchema} />}
      {key === "image/compress-image-to-100kb" && <Compress100SearchIntentSection />}
      {key === "image/compress-image-to-50kb" && <CompressTargetSizeGuidance target={50} />}
      {key === "image/compress-image-to-20kb" && <CompressTargetSizeGuidance target={20} />}
      {investmentGuide && (
        <InvestmentCalculatorGuide active={investmentGuideByTool[key]} />
      )}
    </div>
  );
}