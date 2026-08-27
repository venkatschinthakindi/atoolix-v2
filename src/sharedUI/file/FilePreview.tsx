import type { ReactNode } from "react";

export interface FilePreviewProps {
  src?: string;
  alt?: string;
  kind?: "image" | "custom";
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
}

export function FilePreview({
  src,
  alt = "File preview",
  kind = "image",
  children,
  className = "",
  imageClassName = "",
}: FilePreviewProps) {
  return (
    <div className={`overflow-hidden rounded-xl bg-black/20 ${className}`.trim()}>
      {src && kind === "image" ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`max-h-80 w-full object-contain ${imageClassName}`.trim()}
        />
      ) : (
        children
      )}
    </div>
  );
}
