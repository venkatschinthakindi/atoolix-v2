import { CompressionMode } from "@/types/compression.types";
import { ImageFormat } from "@/types/imageConverter.types";

export interface CompressorConfig {
  title: string | undefined;
  description: string | undefined;
  allowedFormats: ImageFormat[] | undefined;

  defaultQuality?: number;
  mode: CompressionMode | undefined;
  targetKB?: number;
  lockTarget?: boolean;

  topSectionHeader?: string;
  topSectionDescription?: string;
}