import { ToolRegistryEntry } from "@/data/tools";
import { getTool } from "@/utility/getTool";
import { serverConfig } from "@/config/server";
import type { Metadata } from "next";

const SIP_CANONICAL = `${serverConfig.siteUrl}/tools/calculator/sip-calculator`;

export async function generateMetadata(params: any): Promise<Metadata> {
  const resolvedParams = await params;
  const rawToolId = resolvedParams.toolId;
  const normalizedToolId = Array.isArray(rawToolId)
    ? rawToolId.join("/").toLowerCase()
    : String(rawToolId).toLowerCase();

  const { tool } = getTool(rawToolId) as {
    toolId: string;
    tool: ToolRegistryEntry | undefined;
  };

  if (!tool) {
    return {
      title: "Page Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical =
    normalizedToolId === "calculator/sip-calculator"
      ? SIP_CANONICAL
      : tool.alternates.canonical.replace(/\/$/, "");

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: canonical,
      siteName: serverConfig.siteName,
      type: "website",
      images: [
        {
          url: `${serverConfig.siteUrl}/toolimages/${tool.toolImage}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      images: [
        {
          url: `${serverConfig.siteUrl}/toolimages/${tool.toolImage}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
