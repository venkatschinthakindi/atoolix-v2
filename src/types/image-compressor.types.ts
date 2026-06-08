import { CompressionMode } from "./compression.types";
import { ImageFormat } from "./image-converter.types";

export interface CompressorConfig {
  title: string | undefined;

  allowedFormats: ImageFormat[] | undefined;

  defaultQuality?: number;
  mode: CompressionMode | undefined;
  targetKB?: number;
  lockTarget?: boolean;
}