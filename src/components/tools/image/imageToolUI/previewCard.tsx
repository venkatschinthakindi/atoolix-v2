interface Props {
  src: string | null;
  alt?: string;
}

export function PreviewCard({
  src,
  alt = "preview",
}: Props) {
  return (
    <div>
      {src && (
        <img
          src={src}
          alt={alt}
          className="rounded-lg max-h-96 mx-auto"
        />
      )}
    </div>
  );
}
