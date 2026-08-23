import { ToolRegistryEntry } from "@/data/tools";
import { getTool } from "@/utility/getTool";
import { serverConfig } from "@/config/server";
import type { Metadata } from "next";

const CALCULATOR_CANONICAL = `${serverConfig.siteUrl}/tools/calculator`;
const CALCULATOR_TITLE = "Free Online Calculator – Scientific, Percentage & Equation Solver";
const CALCULATOR_DESCRIPTION =
  "Free online calculator for everyday arithmetic, scientific calculations, percentages, and equation solving. Calculate results instantly in your browser on desktop or mobile.";

/**
 * Tool metadata is owned by the tool registry (`src/data/tools.ts`).
 * Keep this module focused on Next.js metadata generation and the special
 * calculator hub route, which is intentionally separate from tool entries.
 */
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

  const isCalculatorHub = normalizedToolId === "calculator";
  const title = isCalculatorHub ? CALCULATOR_TITLE : tool.title;
  const description = isCalculatorHub ? CALCULATOR_DESCRIPTION : tool.description;
  const canonical = isCalculatorHub
    ? CALCULATOR_CANONICAL
    : tool.alternates.canonical.replace(/\/$/, "");

  // Archived tools should not remain eligible for organic search while their
  // routes may still be reachable for legacy/internal links. `noindex` keeps
  // the URL accessible without presenting obsolete tools as current results.
  const isIndexable = !tool.comingSoon && !tool.archived;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: isIndexable,
      follow: true,
    },
    openGraph: {
      title,
      description,
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
      title,
      description,
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
