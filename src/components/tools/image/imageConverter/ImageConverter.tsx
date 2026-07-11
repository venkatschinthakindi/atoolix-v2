"use client";

import { ToolConfig } from "@/types/imageConverter.types";
import ImageConverterClient from "@/components/tools/image/imageConverter/ImageConverterClient";



export default function ImageConverter({ initialExpression, theme, title, description, inputFormats, outputFormats }: any) 
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
  // const ImageConverterClient = dynamic(
  //   () => import("@/components/tools/image/imageConverter/ImageConverterClient"),
  //   { ssr: false }
  // );
  return (
    <ImageConverterClient config={toolConfig} />
  );
}