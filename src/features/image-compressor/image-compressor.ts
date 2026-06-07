import { CompressorConfig }
  from "@/types/image-compressor.types";

export const compressImageConfig: CompressorConfig =
  {
    title: "Compress Image",

    allowedFormats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    defaultQuality: 80,
  };