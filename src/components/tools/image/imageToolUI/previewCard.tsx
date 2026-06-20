import { asyncGetNextImageLib } from "@/lib/nextImageUtility";

interface Props {
  src: string | null;
  alt?: string;
}

export async function PreviewCard({
  src,
  alt = "preview",
}: Props) {
  const Image = await asyncGetNextImageLib();
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
