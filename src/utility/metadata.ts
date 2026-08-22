import { ToolRegistryEntry } from "@/data/tools";
import { getTool } from "@/utility/getTool";
import { serverConfig } from "@/config/server";
import type { Metadata } from "next";

const SIP_CANONICAL = `${serverConfig.siteUrl}/tools/calculator/sip-calculator`;
const CALCULATOR_CANONICAL = `${serverConfig.siteUrl}/calculator`;
const CALCULATOR_TITLE = "Free Online Calculator – Scientific, Percentage & Equation Solver";
const CALCULATOR_DESCRIPTION =
  "Free online calculator for everyday arithmetic, scientific calculations, percentages, and equation solving. Calculate results instantly in your browser on desktop or mobile.";

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
  const canonical =
    normalizedToolId === "calculator/sip-calculator"
      ? SIP_CANONICAL
      : isCalculatorHub
        ? CALCULATOR_CANONICAL
        : tool.alternates.canonical.replace(/\/$/, "");

  const isIndexable = !tool.comingSoon;

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