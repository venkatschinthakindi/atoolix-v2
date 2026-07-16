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
  "calculator",
  "date-time",
  "finance",
  "image",
  "pdf",

  // Calculator Tools
  "calculator/emi-calculator",
  "calculator/roi-calculator",
  "calculator/fd-calculator",
  "calculator/retirement-calculator",

  // PDF Tools
  "pdf/split-pdf",
  "pdf/merge-pdf",
  "pdf/compress-pdf",

  // Image → PDF
  "image/image-to-pdf",
  "image/jpg-to-pdf",
  "image/png-to-pdf",
  "image/webp-to-pdf",

  // Image Converter
  "image/jpg-to-png",
  "image/png-to-jpg",
  "image/png-to-jpeg",
  "image/jpg-to-webp",
  "image/png-to-webp",
  "image/webp-to-jpg",
  "image/webp-to-jpeg",
  "image/webp-to-png",
  "image/svg-to-png",
  "image/svg-to-jpg",

  // Image Compressor
  "image/compress-image",
  "image/compress-jpg",
  "image/compress-png",
  "image/compress-webp",
  "image/compress-image-to-20kb",
  "image/compress-image-to-50kb",
  "image/compress-image-to-100kb",

  // Image Tools
  "image/passport-photo-resizer",
  "image/resize-signature-for-upload",
  "image/background-remover",

  // Date & Time
  "date-time/timezone-converter",
  "date-time/meeting-time-finder",
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
        ? "weekly"
        : "monthly",
    priority:
      route === ""
        ? 1.0
        : route.includes("/")
        ? 0.9
        : 0.8,
  }));
}