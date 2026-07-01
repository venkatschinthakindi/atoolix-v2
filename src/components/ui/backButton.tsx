"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  fallbackHref?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function BackButton({
  fallbackHref = "/",
  children = "← Back",
  className = "text-sm text-white/50 hover:text-white mb-2",
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${className}`}
    >
      {children}
    </button>
  );
}