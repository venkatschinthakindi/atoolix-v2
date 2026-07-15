"use client";

import { ToolConfig } from "@/types/imageConverter.types";
import BackgroundRemoverClient from "@/components/tools/image/backgroundRemover/backgroundRemoverClient";



export default function BackgroundRemover({ initialExpression, theme, title, description, inputFormats, outputFormats }: any) 
{
  if (!inputFormats || !outputFormats) {
    return <div className="p-10">
      This location doesn’t include the Image Converter. Don’t worry — you can access it from the main dashboard.
    </div>;
  }
  const toolConfig = {
        title: title,
        description: description,
        inputFormats,
        outputFormats
      } as ToolConfig;

  return (
    <BackgroundRemoverClient config={toolConfig} />
  );
}