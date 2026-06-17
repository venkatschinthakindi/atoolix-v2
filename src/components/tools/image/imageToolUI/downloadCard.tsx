import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  imageUrl: string;
  alt?: string;
  buttonText?: string;
  onDownload: () => void;
  children?: ReactNode;
}

export function DownloadCard({
  imageUrl,
  alt = "result",
  buttonText = "Download Image",
  onDownload,
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-950/60 to-gray-900/30 p-5 space-y-4">
      <Image src={imageUrl} alt={alt} fill sizes="100vw"
                   className="rounded-lg max-h-96 mx-auto" style={{objectFit:'cover'}}/>

      {children}

      <button
        onClick={onDownload}
        className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-xl"
      >
        {buttonText}
      </button>

    </div>
  );
}