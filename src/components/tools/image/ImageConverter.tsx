import ImageConverterClient from "@/components/tools/image/ImageConverterClient";
import { ImageConverterToolProps } from "@/lib/toolRegistry";
import { ToolConfig } from "@/types/image-converter.types";

export default function ImageConverterTool({ initialExpression, theme, title, inputFormats, outputFormats }: ImageConverterToolProps) {
  return <ImageConverter initialExpression={initialExpression} theme={theme} title={title} inputFormats={inputFormats} outputFormats={outputFormats} />;
}

type ImageConverterProps = ImageConverterToolProps;
function ImageConverter({ initialExpression, theme, title, inputFormats, outputFormats }: ImageConverterProps) 
{
  console.log("ImageConverter props:", { initialExpression, theme, title, inputFormats, outputFormats });
  if (!inputFormats || !outputFormats) {
    return <div className="p-10">
      This location doesn’t include the Image Converter. Don’t worry — you can access it from the main dashboard.
    </div>;
  }
  const toolConfig = {
        title: title,
        inputFormats,
        outputFormats
      } as ToolConfig;
  return (
    <div className="p-6">
      <ImageConverterClient config={toolConfig} />
    </div>
  );
}