import { serverConfig } from "@/config/server";
import { tools } from "@/data/tools";
import type { MetadataRoute } from "next";

const BASE_URL = serverConfig.siteUrl.replace(/\/$/, "");
const BASE_ORIGIN = new URL(BASE_URL).origin;

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
  "tools/calculator",
  "tools/converter",
];

function getCanonicalToolUrls() {
  const urls = tools
    // Only current, indexable tools belong in the XML sitemap.
    // Archived tools remain reachable for legacy/internal links, but their
    // metadata intentionally uses noindex and therefore must not be submitted.
    .filter((tool) => !tool.comingSoon && !tool.archived)
    .map((tool) => tool.alternates.canonical)
    .filter((url): url is string => Boolean(url))
    .map((url) => url.replace(/\/$/, ""));

  const invalidUrls = urls.filter((url) => {
    try {
      return new URL(url).origin !== BASE_ORIGIN;
    } catch {
      return true;
    }
  });

  if (invalidUrls.length > 0) {
    throw new Error(
      `Sitemap contains non-canonical or invalid tool URLs: ${invalidUrls.join(", ")}`,
    );
  }

  const seen = new Set<string>();
  const duplicateUrls: string[] = [];

  for (const url of urls) {
    if (seen.has(url)) duplicateUrls.push(url);
    seen.add(url);
  }

  if (duplicateUrls.length > 0) {
    throw new Error(
      `Sitemap contains duplicate tool canonical URLs: ${[...new Set(duplicateUrls)].join(", ")}`,
    );
  }

  return urls;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = getCanonicalToolUrls();

  const urls = Array.from(
    new Set([
      ...staticRoutes.map((route) =>
        route ? `${BASE_URL}/${route}` : BASE_URL,
      ),
      ...toolUrls,
    ]),
  );

  return urls.map((url) => ({ url }));
}
