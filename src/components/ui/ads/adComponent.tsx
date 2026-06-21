"use client";

import { useEffect, useState } from "react";

type AdComponentProps = {
  duration?: number;
  documentName?: string;
  onAdvance?: () => void;
  variant?: "preview" | "download";
  alwaysShow?: boolean;
};

export default function AdComponent({
  duration = 2000,
  documentName = "Document",
  onAdvance,
  variant = "preview",
  alwaysShow = true,
}: AdComponentProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [adLoaded, setAdLoaded] = useState(false);

  // Friendly rotating messages
  const messages = variant === "preview" 
    ? [
        "Preparing your document for preview...",
        "Optimizing pages for best viewing...",
        "Rendering your document beautifully...",
        "Getting everything ready for you...",
      ]
    : [
        "Preparing your document for download...",
        "Compressing file for faster download...",
        "Securing your document safely...",
        "Getting everything ready for you...",
      ];

  useEffect(() => {
    const startTime = Date.now();
    
    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 500);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / duration) * 100;
      
      if (newProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        clearInterval(messageInterval);
        if (onAdvance) onAdvance();
      } else {
        setProgress(newProgress);
      }
    }, 50);

    // Load AdSense after component mounts
    setTimeout(() => {
      try {
        // if (typeof window !== "undefined" && window.adsbygoogle) {
        //   (window.adsbygoogle as any).push({});
        //   setAdLoaded(true);
        // }
      } catch (e) {
        console.log("AdSense not loaded");
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [duration, onAdvance, messages.length]);

  if (!alwaysShow) return null;

  return (
    <div className="relative">
      <div
        className="flex h-[100px] sm:h-[120px] items-center justify-center rounded-xl sm:rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-sm transition"
        role="complementary"
        aria-label="Advertisement"
      >
        {/* ====== GOOGLE ADSENSE AD CODE ====== */}
        <div className="w-full h-full flex items-center justify-center">
          
          {/* AdSense Container */}
          <ins 
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-YOUR-CLIENT-ID"  // ← Replace with your ID
            data-ad-slot="YOUR-AD-SLOT-ID"         // ← Replace with your slot
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          
          {/* AdSense Script (load once) */}
          {/* {!adLoaded && (
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-CLIENT-ID"
              crossOrigin="anonymous"
              onLoad={() => {
                try {
                  (window as any).adsbygoogle.push({});
                  setAdLoaded(true);
                } catch (e) {
                  console.log("Ad push failed");
                }
              }}
            />
          )} */}
          
          {/* Fallback if ad doesn't load */}
          {!adLoaded && (
            <div className="text-center px-4">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="relative">
                  <svg
                    className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-indigo-400" />
                </div>
                
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    {documentName}
                  </p>
                  <p className="text-xs text-indigo-300">
                    {variant === "preview" ? "Preview" : "Download"} in progress
                  </p>
                </div>
              </div>

              <p className="text-sm text-indigo-200 mb-3 animate-pulse">
                {messages[messageIndex]}
              </p>

              <div className="relative w-full max-w-[200px] mx-auto mb-2">
                <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-zinc-400">
                Preview loading in <span className="text-indigo-300 font-medium">{Math.ceil((duration - (progress / 100) * duration) / 1000)}s</span>
              </p>
            </div>
          )}
        </div>
        {/* ====== END ADSENSE AD CODE ====== */}
      </div>
    </div>
  );
}