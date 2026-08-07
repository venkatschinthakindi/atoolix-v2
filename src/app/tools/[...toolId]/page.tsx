
import { notFound } from "next/navigation";
import { getTool } from "@/utility/getTool";
import { generateMetadata as createMetadata } from "@/utility/metadata";
import { getCachedTools, ToolRegistryEntry } from "@/data/tools";
import { serverConfig } from "@/config/server";
import ToolPageClientShell from "./ToolPageClientShell";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getCachedTools()
    .filter((tool) => !tool.archived)
    .map((tool) => ({ toolId: tool.id.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ toolId: string }>;
}) {
  return createMetadata(params);
}

export default async function ToolPage({ params }: any) {
  const resolvedParams = await params;
  const rawToolId = resolvedParams.toolId;
  
  const { toolId , tool} = getTool(rawToolId) as { toolId: string, tool: ToolRegistryEntry};
  if (!tool) return notFound();

  const { ...toolMeta } = tool;
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": tool.applicationType ?? "WebApplication",

    name: tool.title,
    description: tool.description,
    "@id": `${tool.alternates?.canonical}#software`,
    url: tool.alternates?.canonical,
    browserRequirements: "Requires JavaScript. Works in modern web browsers.",
    inLanguage: "en",

    applicationCategory:
      tool.applicationCategory ?? "UtilitiesApplication",

    operatingSystem: "Any",
    isAccessibleForFree: true,

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    ...(tool.keywords && {
      keywords: Array.isArray(tool.keywords)
        ? tool.keywords.join(", ")
        : tool.keywords,
    }),
    publisher: {
      "@id": `${serverConfig.siteUrl}/#organization`,
    }
  };

  return (
    <>
      <ToolPageClientShell tool={tool} toolId={toolId} toolMeta={toolMeta} siteUrl={serverConfig.siteUrl} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}