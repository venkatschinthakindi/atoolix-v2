import { CompressionMode } from "./compression.types";
import { ImageFormat } from "./imageConverter.types";

export interface CompressorConfig {
  title: string | undefined;
  description: string | undefined;
  allowedFormats: ImageFormat[] | undefined;

  defaultQuality?: number;
  mode: CompressionMode | undefined;
  targetKB?: number;
  lockTarget?: boolean;
}