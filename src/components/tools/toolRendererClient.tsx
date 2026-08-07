"use client";

import dynamic from "next/dynamic";
import { useMemo, type ComponentType } from "react";
import { ToolContextProvider } from "@/context/ToolContext";
import ToolLoader from "@/components/tools/ToolLoader";
import { ToolRegistryEntry } from "@/data/tools";

type ToolMeta = Omit<ToolRegistryEntry, "loader">;
export type ToolRendererClientProps = {
  toolId?: string;
  toolMeta?: ToolMeta;
};

const createDynamicTool = (loader: () => Promise<{ default: ComponentType<any> }>) =>
  dynamic(loader as any, {
    loading: () => <ToolLoader />,
    ssr: true,
  });

const toolComponentMap: Record<string, ComponentType<any>> = {
  "privacysecurity/file-analyzer": createDynamicTool(() => import("@/components/tools/privacysecurity/fileAnalyzer")),
  "calculator/emi-calculator": createDynamicTool(() => import("@/components/tools/emiCalculator/EMICalculator")),
  "calculator/roi-calculator": createDynamicTool(() => import("@/components/tools/financeSuite/investment/investmentReturnsSuite")),
  "calculator/fd-calculator": createDynamicTool(() => import("@/components/tools/financeSuite/savings/savingsDepositsSuite")),
  "calculator/retirement-calculator": createDynamicTool(() => import("@/components/tools/financeSuite/retirement/retirementWealthSuite")),
  "pdf/split-pdf": createDynamicTool(() => import("@/components/tools/pdf/splitPdf/splitPdf")),
  "pdf/merge-pdf": createDynamicTool(() => import("@/components/tools/pdf/mergePdf/mergePdf")),
  "pdf/compress-pdf": createDynamicTool(() => import("@/components/tools/pdf/compress-pdf/CompressPDF")),
  "image/image-to-pdf": createDynamicTool(() => import("@/components/tools/pdf/image-to-pdf/ImageToPDF")),
  "image/jpg-to-pdf": createDynamicTool(() => import("@/components/tools/pdf/image-to-pdf/ImageToPDF")),
  "image/png-to-pdf": createDynamicTool(() => import("@/components/tools/pdf/image-to-pdf/ImageToPDF")),
  "image/webp-to-pdf": createDynamicTool(() => import("@/components/tools/pdf/image-to-pdf/ImageToPDF")),
  "qrcode/qr-code-generator": createDynamicTool(() => import("@/components/tools/qrCode/QrCode")),
  calculator: createDynamicTool(() => import("@/components/tools/calculator/Calculator")),
  converter: createDynamicTool(() => import("@/components/tools/converter/UnitConverter")),
  "image/jpg-to-png": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/png-to-jpg": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/png-to-jpeg": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/jpg-to-webp": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/png-to-webp": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/webp-to-jpg": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/webp-to-jpeg": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/webp-to-png": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/svg-to-png": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/svg-to-jpg": createDynamicTool(() => import("@/components/tools/image/imageConverter/ImageConverter")),
  "image/compress-image": createDynamicTool(() => import("@/components/tools/image/imageCompressor/ImageCompressor")),
  "image/compress-jpg": createDynamicTool(() => import("@/components/tools/image/imageCompressor/ImageCompressor")),
  "image/compress-png": createDynamicTool(() => import("@/components/tools/image/imageCompressor/ImageCompressor")),
  "image/compress-webp": createDynamicTool(() => import("@/components/tools/image/imageCompressor/ImageCompressor")),
  "image/compress-image-to-20kb": createDynamicTool(() => import("@/components/tools/image/imageCompressor/ImageCompressor")),
  "image/compress-image-to-50kb": createDynamicTool(() => import("@/components/tools/image/imageCompressor/ImageCompressor")),
  "image/compress-image-to-100kb": createDynamicTool(() => import("@/components/tools/image/imageCompressor/ImageCompressor")),
  "image/passport-photo-resizer": createDynamicTool(() => import("@/components/tools/image/passpoerPhotoResizer/passpoerPhotoCompressor")),
  "image/resize-signature-for-upload": createDynamicTool(() => import("@/components/tools/image/signatureResizer/signatureCompressor")),
  "image/background-remover": createDynamicTool(() => import("@/components/tools/image/backgroundRemover/backgroundRemover")),
  "datetime/timezone-converter": createDynamicTool(() => import("@/components/tools/dateTime/timezone-converter/timezoneConverter")),
  "datetime/meeting-time-finder": createDynamicTool(() => import("@/components/tools/dateTime/meeting-time-finder/meetingTimeFinder")),
};

const services = {
  api: {
    get: async (path: string) => {
      try {
        const res = await fetch(path, {
          next: { revalidate: 0 },
        });
        return await res.json();
      } catch {
        return null;
      }
    },
  },
  analytics: {
    track: () => {},
  },
};

export default function ToolRendererClient({
  toolId,
  toolMeta,
}: ToolRendererClientProps) {
  const DynamicComp = useMemo(() => {
    if (!toolId) return null;
    return toolComponentMap[toolId] ?? null;
  }, [toolId]);

  if (!toolMeta || !DynamicComp) return null;

  const mergedProps = {
    ...(toolMeta.defaultProps ?? {}),
    ...toolMeta,
  };

  return (
    <ToolContextProvider services={services}>
      <DynamicComp {...mergedProps} />
    </ToolContextProvider>
  );
}