import { serverConfig } from "@/config/server";
import { tools } from "@/data/tools";
import type { MetadataRoute } from "next";

const BASE_URL = serverConfig.siteUrl.replace(/\/$/, "");
const SIP_OLD_PATH = "/tools/calculator/roi-calculator";
const SIP_NEW_PATH = "/tools/calculator/sip-calculator";

const staticRoutes = [
  "",
  "about",
  "contact",
  "documentation",
  "privacy",
  "terms",
  "disclaimer",
  "tools",
  "calculator",
  "datetime",
  "finance",
  "image",
  "pdf",
  "qrcode",
  "privacysecurity",
  "tools/calculator",
  "tools/converter",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = tools
    // Archived tools remain eligible for sitemap inclusion because they may be
    // reactivated. Only tools explicitly marked comingSoon are excluded.
    .filter((tool) => !tool.comingSoon && Boolean(tool.alternates?.canonical))
    .map((tool) => tool.alternates.canonical.replace(/\/$/, ""))
    .filter((url) => !url.endsWith(SIP_OLD_PATH));

  const urls = Array.from(
    new Set([
      ...staticRoutes.map((route) =>
        route ? `${BASE_URL}/${route}` : BASE_URL,
      ),
      ...toolUrls,
      `${BASE_URL}${SIP_NEW_PATH}`,
    ]),
  );

  return urls.map((url) => ({ url }));
}
