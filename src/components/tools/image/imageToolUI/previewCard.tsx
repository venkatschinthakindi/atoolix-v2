import Image from "next/image";

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
        <Image src={src}
          alt={alt} fill sizes="100vw"
                           className="rounded-lg max-h-96 mx-auto" style={{objectFit:'cover'}}/>
      )}
    </div>
  );
}
