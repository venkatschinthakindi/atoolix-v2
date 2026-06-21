import { ToolRegistryEntry } from "@/components/tools/toolRegistry";
import { getTool } from "@/utility/getTool";

export async function generateMetadata(params : any) {
    const resolvedParams = await params;
    const rawToolId = resolvedParams.toolId;

    const { toolId , tool} = getTool(rawToolId) as { toolId: string, tool: ToolRegistryEntry };
    
  return {
    title: tool?.title,
    description: tool?.description,
    keywords: tool?.keywords,

    alternates: tool?.alternates,
    openGraph: {
      title: tool?.title,
      description: tool?.description,
      url: tool?.alternates?.canonical,
      siteName: "YourSite",
      type: "website",
      images: [
        {
          url: "https://example.com/og.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: tool?.title,
      description: tool?.description,
      images: ["https://example.com/og.jpg"],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      }
    },
  };
}