"use client";
import dynamic from "next/dynamic";
import { PdfToolConfig } from "@/types/imageConverter.types";



export default function PdfMergerTool({
  title,
  description,
  allowedFormats,
}: any) {
  const config: PdfToolConfig = {
    title,
    description,
    allowedFormats,
  };
  const PdfMergerClient = dynamic(
    () => import("@/components/tools/pdf/mergePdf/mergePdfClient"),
    {
      loading: () => null,
    }
  );
  return <PdfMergerClient config={config} />;
}