import { ToolRegistryEntry } from "@/data/tools";
import { getTool } from "@/utility/getTool";
import { serverConfig } from "@/config/server";
import type { Metadata } from "next";

export async function generateMetadata(params : any): Promise<Metadata> {
    const resolvedParams = await params;
    const rawToolId = resolvedParams.toolId;

    const { toolId , tool} = getTool(rawToolId) as { toolId: string, tool: ToolRegistryEntry };
    
  return {
    title: tool?.title,
    description: tool?.description,
    keywords: tool?.keywords,

    alternates: {
      canonical: tool?.alternates?.canonical,
    },
    openGraph: {
      title: tool?.title,
      description: tool?.description,
      url: tool?.alternates?.canonical,
      siteName: serverConfig.siteName,
      type: "website",
      images: [
        {
          url: serverConfig.siteLogoUrl,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: tool?.title,
      description: tool?.description,
      images: [
        {
          url: serverConfig.siteLogoUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}