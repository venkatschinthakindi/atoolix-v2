import type { MetadataRoute } from "next";
import { serverConfig } from "@/config/server";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = serverConfig.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
