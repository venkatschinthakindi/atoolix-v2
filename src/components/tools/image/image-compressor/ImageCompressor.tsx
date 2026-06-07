import ImageCompressorClient from "@/components/tools/image/image-compressor/ImageCompressorClient";
import { compressImageConfig } from "@/features/image-compressor/image-compressor";

export default function Page() {
  return (
    <ImageCompressorClient
      config={compressImageConfig}
    />
  );
}