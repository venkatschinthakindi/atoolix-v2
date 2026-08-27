import type { CSSProperties, ReactNode } from "react";

export interface ImagePreviewProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: CSSProperties["objectFit"];
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
  fallback?: ReactNode;
}

export function ImagePreview({ src, alt = "", width, height, className = "", objectFit = "contain", loading = "lazy", decoding = "async", fallback }: ImagePreviewProps) {
  return (
    <div className={`flex min-h-24 min-w-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${className}`.trim()}>
      {src ? <img src={src} alt={alt} width={width} height={height} loading={loading} decoding={decoding} className="h-full w-full" style={{ objectFit }} /> : fallback ?? null}
    </div>
  );
}
