import { ImageFormat } from "./image-converter.types";

export interface CompressorConfig {
  title: string;

  allowedFormats: ImageFormat[];

  defaultQuality?: number;
}