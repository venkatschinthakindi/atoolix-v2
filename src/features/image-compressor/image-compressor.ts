import { CompressorConfig }
  from "@/types/image-compressor.types";

export const compressImageConfig: CompressorConfig =
  {
    title: "Compress Image",
    description: "Reduce image size across formats (JPG, JPEG, PNG, WebP) while keeping clear quality for web use, emails, and social sharing",
    allowedFormats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    defaultQuality: 80,
    mode: "quality",
    lockTarget: false
  };