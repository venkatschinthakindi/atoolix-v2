import { serverConfig } from "@/config/server";
import type { MetadataRoute } from "next";

const BASE_URL = serverConfig.siteUrl.replace(/\/$/, "");

const routes = [
  // Home
  "",

  // Static Pages
  "about",
  "contact",
  "documentation",
  "offline",
  "privacy",
  "terms",
  "disclaimer",

  // Categories
  "tools",
  "calculator",
  "datetime",
  "finance",
  "image",
  "pdf",
  "qrcode",
  "privacysecurity",

  // privacysecurity
  "tools/privacysecurity/file-analyzer",

  //Math 
  "tools/calculator",
  "tools/converter",
  
  // Calculator Tools
  "tools/calculator/emi-calculator",
  "tools/calculator/personal-loan-emi-calculator",
  "tools/calculator/car-loan-emi-calculator",

  "tools/calculator/roi-calculator",
  "tools/calculator/xirr-calculator",
  "tools/calculator/lampsum-calculator",
  "tools/calculator/cagr-calculator",

  "tools/calculator/fd-calculator",
  "tools/calculator/simple-interest-calculator",
  "tools/calculator/compound-interest-calculator",
  "tools/calculator/recurring-deposit-calculator",

  "tools/calculator/retirement-calculator",

  // PDF Tools
  "tools/pdf/split-pdf",
  "tools/pdf/merge-pdf",
  "tools/pdf/compress-pdf",

  // Image → PDF
  "tools/image/image-to-pdf",
  "tools/image/jpg-to-pdf",
  "tools/image/png-to-pdf",
  "tools/image/webp-to-pdf",

  // Image Converter
  "tools/image/jpg-to-png",
  "tools/image/png-to-jpg",
  "tools/image/png-to-jpeg",
  "tools/image/jpg-to-webp",
  "tools/image/png-to-webp",
  "tools/image/webp-to-jpg",
  "tools/image/webp-to-jpeg",
  "tools/image/webp-to-png",
  "tools/image/svg-to-png",
  "tools/image/svg-to-jpg",

  // Image Compressor
  "tools/image/compress-image",
  "tools/image/compress-jpg",
  "tools/image/compress-png",
  "tools/image/compress-webp",
  "tools/image/compress-image-to-20kb",
  "tools/image/compress-image-to-50kb",
  "tools/image/compress-image-to-100kb",

  // Image Tools
  "tools/image/passport-photo-resizer",
  "tools/image/resize-signature-for-upload",
  "tools/image/background-remover",

  // Date & Time
  "tools/datetime/timezone-converter",
  "tools/datetime/meeting-time-finder",

  // QR Code Tools
  "tools/qrcode/qr-code-generator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: route ? `${BASE_URL}/${route}` : BASE_URL,
    lastModified: now,
    changeFrequency:
      route === ""
        ? "daily"
        : route.includes("/")
        ? "daily"
        : "daily",
    priority:
      route === ""
        ? 1.0
        : route.includes("/")
        ? 0.9
        : 0.8,
  }));
}