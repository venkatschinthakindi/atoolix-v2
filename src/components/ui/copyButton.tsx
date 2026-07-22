"use client";

import { memo, useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

type Props = {
  value?: string;
  copyEvent?: any;
  className?: string;
  label?: string;
  copiedLabel?: string;
  disabled?: boolean;
  onCopied?: () => void;
};

function CopyButtonImpl({
  value,
  copyEvent,
  className,
  label = "Copy",
  copiedLabel = "Copied",
  disabled,
  onCopied,
}: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
        if(!!value){
            await navigator.clipboard.writeText(value);
        }
        if(!!copyEvent) {
            copyEvent();
        }
        setCopied(true);
        onCopied?.();
    } catch {}
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className={className}
    >
      <span className="flex items-center justify-center gap-2">
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-400" />
            {copiedLabel}
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            {label}
          </>
        )}
      </span>
    </button>
  );
}

export const CopyButton = memo(CopyButtonImpl);