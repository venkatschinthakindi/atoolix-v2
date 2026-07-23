"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  fallbackHref?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function BackButton({
  fallbackHref = "/",
  children = " Back",
  className = "text-md text-white/50 hover:text-white mb-2 flex items-center",
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
      <ArrowLeft className="mr-2 h-4 w-4" />{children}
    </button>
  );
}