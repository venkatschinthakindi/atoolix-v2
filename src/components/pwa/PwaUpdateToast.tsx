"use client";

import { RefreshCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { usePwa } from "./PwaProvider";
import { serverConfig } from "@/config/client";

export default function PwaUpdateToast() {
  const { updateAvailable, updateApp } = usePwa();

  const [dismissed, setDismissed] = useState(false);
  const [updating, setUpdating] = useState(false);

  if (!updateAvailable || dismissed) {
    return null;
  }

  const handleUpdate = () => {
    setUpdating(true);
    updateApp();
  };

  return (
    <div
      className="
        fixed
        bottom-5
        left-1/2
        z-[9999]
        w-[min(92vw,412px)]
        -translate-x-1/2
        animate-in
        fade-in
        slide-in-from-bottom-5
        duration-500
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[26px]
          border
          border-white/[0.18]
          bg-gradient-to-b
          from-white/[0.14]
          to-white/[0.05]
          p-5
          shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]
          backdrop-blur-2xl
        "
      >
        {/* gold hairline sheen along the top edge — the one signature flourish */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F1DBA0]/60 to-transparent" />

        <div className="flex gap-4">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.16] bg-white/[0.08]">
            <span className="absolute inset-0 rounded-2xl bg-[#F1DBA0]/[0.1]" />
            <Sparkles className="relative size-5 text-[#F1DBA0]" strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 text-lg font-semibold uppercase tracking-[0.14em] text-[#D9B978]">
              🚀 New version ready
            </div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">
              A newer version of {serverConfig.siteName} is ready. Refresh to get the latest
              features and fixes.
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDismissed(true)}
                disabled={updating}
                className="
                  rounded-xl
                  px-3.5
                  py-2
                  text-[12.5px]
                  font-medium
                  text-white/55
                  transition-colors
                  hover:bg-white/[0.08]
                  hover:text-white/85
                  disabled:pointer-events-none
                  disabled:opacity-40
                "
              >
                Later
              </button>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={updating}
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-1.5
                  overflow-hidden
                  rounded-xl
                  bg-gradient-to-r
                  from-[#F1DBA0]
                  to-[#C9A15C]
                  px-4
                  py-2
                  text-[12.5px]
                  font-semibold
                  tracking-tight
                  text-[#141414]
                  transition-transform
                  active:scale-[0.97]
                  disabled:pointer-events-none
                  disabled:opacity-70
                "
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <RefreshCcw
                  className={`relative size-3.5 ${updating ? "animate-spin" : ""}`}
                  strokeWidth={2}
                />
                <span className="relative">
                  {updating ? "Updating…" : "Update now"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}