// image tools specific types
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "svg";
export interface ToolConfig {
  title: string;
  inputFormats: ImageFormat[];
  outputFormats: ImageFormat[];
}

export interface ConvertOptions {
  targetFormat: ImageFormat;
  quality?: number;
}