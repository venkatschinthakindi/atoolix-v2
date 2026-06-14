import { ImageMetadata } from "@/types/imageMetadata";

interface Props {
  metadata: ImageMetadata;
  file: File;
}

export function MetadataCard({
  metadata,
  file,
}: Props) {
  return (
    <div className="text-sm text-white/60 space-y-1">

      <div>
        Dimensions:{" "}
        {metadata.width} × {metadata.height}
      </div>

      <div>
        Size:{" "}
        {(
          metadata.size /
          1024 /
          1024
        ).toFixed(2)}{" "}
        MB
      </div>

      <div>
        Type:{" "}
        {file.type || "unknown"}
      </div>

    </div>
  );
}