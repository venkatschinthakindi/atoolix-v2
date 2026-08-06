import { serverConfig } from "@/config/server";
import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    "id": "/",
    name: serverConfig.siteName,
    short_name: serverConfig.siteName,
    description: serverConfig.siteDescription,
    "start_url": "/",
    "scope": "/",
     display: "standalone",
    "display_override": [
      "window-controls-overlay",
      "standalone"
    ],
    orientation: "portrait",
    lang: "en",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    "screenshots": [
      {
        "src": "/screenshots/desktop-home.png",
        "sizes": "1907x881",
        "type": "image/png",
        "form_factor": "wide"
      },
      {
        "src": "/screenshots/mobile-home.png",
        "sizes": "720x1420",
        "type": "image/png"
      }
    ]
  };
}