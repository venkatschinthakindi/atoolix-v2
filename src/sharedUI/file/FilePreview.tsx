import type { ReactNode } from "react";

export interface FilePreviewProps {
  file?: File | null;
  src?: string;
  alt?: string;
  kind?: "image" | "custom";
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
}

export function FilePreview({
  file,
  src,
  alt = "File preview",
  kind = "image",
  children,
  className = "",
  imageClassName = "",
}: FilePreviewProps) {
  const url = src ?? (file && kind === "image" ? URL.createObjectURL(file) : undefined);

  return (
    <div className={`overflow-hidden rounded-xl bg-black/20 ${className}`.trim()}>
      {url && kind === "image" ? (
        <img
          src={url}
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
