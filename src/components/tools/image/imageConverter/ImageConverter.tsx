import ImageConverterClient from "@/components/tools/image/imageConverter/ImageConverterClient";
import { ImageConverterToolProps } from "@/lib/toolRegistry";
import { ToolConfig } from "@/types/imageConverter.types";

export default function ImageConverterTool({ initialExpression, theme, title, description, inputFormats, outputFormats }: ImageConverterToolProps) {
  return <ImageConverter initialExpression={initialExpression} theme={theme} title={title} description={description} inputFormats={inputFormats} outputFormats={outputFormats} />;
}

type ImageConverterProps = ImageConverterToolProps;
function ImageConverter({ initialExpression, theme, title, description, inputFormats, outputFormats }: ImageConverterProps) 
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
    <ImageConverterClient config={toolConfig} />
  );
}