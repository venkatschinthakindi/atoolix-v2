import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://atoolix.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",//make it as allow befrore deploy
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}