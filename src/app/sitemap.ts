import { serverConfig } from "@/config/server";
import { tools } from "@/data/tools";
import { getTool } from "@/utility/getTool";
import type { MetadataRoute } from "next";

const BASE_URL = serverConfig.siteUrl.replace(/\/$/, "");
const SIP_NEW_PATH = "/tools/calculator/sip-calculator";
const HOME_LOAN_EMI_PATH = "/tools/calculator/home-loan-emi-calculator";

const staticRoutes = [
  "",
  "about",
  "contact",
  "documentation",
  "privacy",
  "terms",
  "disclaimer",
  "tools",
  "datetime",
  "finance",
  "image",
  "pdf",
  "qrcode",
  "privacysecurity",
  "tools/converter",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = tools
    // Archived tools remain eligible for sitemap inclusion because they may be
    // reactivated. Only tools explicitly marked comingSoon are excluded.
    .filter((tool) => !tool.comingSoon)
    .map((tool) => getTool(tool.id).tool?.alternates?.canonical)
    .filter((url): url is string => Boolean(url))
    .map((url) => url.replace(/\/$/, ""));

  const urls = Array.from(
    new Set([
      ...staticRoutes.map((route) =>
        route ? `${BASE_URL}/${route}` : BASE_URL,
      ),
      ...toolUrls,
      `${BASE_URL}${SIP_NEW_PATH}`,
      `${BASE_URL}${HOME_LOAN_EMI_PATH}`,
    ]),
  );

  return urls.map((url) => ({ url }));
}
