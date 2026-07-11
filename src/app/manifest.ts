import { serverConfig } from "@/config/server";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: serverConfig.siteName,
    short_name: serverConfig.siteName,
    description: "Free online PDF tools, image converters and compressors, calculators, EMI and finance tools. Fast, secure, no signup required.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      }
    ],
  };
}