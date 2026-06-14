// image tools specific types
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "svg";
export interface ToolConfig {
  title: string;
  description?: string;
  inputFormats: ImageFormat[];
  outputFormats: ImageFormat[];
}

export interface PdfToolConfig {
  title: string;
  description?: string;
  allowedFormats?:ImageFormat[];
}

export interface ConvertOptions {
  targetFormat: ImageFormat;
  quality?: number;
}