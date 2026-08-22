"use server";

import Link from "next/link";
import { tools, type ToolRegistryEntry } from "@/data/tools";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atoolix.com";
const SIP_NEW_PATH = "/tools/calculator/sip-calculator";

function publicToolPath(toolId: string, canonical?: string) {
  if (toolId === "calculator/roi-calculator") return SIP_NEW_PATH;
  if (canonical) {
    return canonical.replace(SITE_URL, "").replace(/\/$/, "") || "/";
  }
  return `/tools/${toolId}`;
}

function publicCanonical(toolId: string, canonical?: string) {
  if (toolId === "calculator/roi-calculator") return `${SITE_URL}${SIP_NEW_PATH}`;
  return canonical ?? `${SITE_URL}/tools/${toolId}`;
}

type CategoryCopy = {
  heading: string;
  description: string;
  icon: string;
};

const CATEGORY_COPY: Record<string, CategoryCopy> = {
  Finance: {
    heading: "Related Financial Calculators",
    description:
      "Explore other Atoolix calculators for investment, deposits, retirement, and financial planning.",
    icon: "🧰",
  },
  Math: {
    heading: "Related Calculators & Tools",
    description: "Other free calculators and converters you might find useful.",
    icon: "🧮",
  },
  PDF: {
    heading: "Related PDF Tools",
    description: "Other free PDF tools to merge, split, compress, and convert your documents.",
    icon: "📄",
  },
  Image_Converter: {
    heading: "Related Image Converters",
    description: "Convert between other image formats with these free tools.",
    icon: "🖼️",
  },
  Image_Compressor: {
    heading: "Related Image Compressors",
    description: "Reduce image file size further with these free compression tools.",
    icon: "🗜️",
  },
  Image_Editor: {
    heading: "Related Image Tools",
    description: "Other free tools for editing, resizing, and preparing your photos.",
    icon: "🖌️",
  },
  DateAndTime: {
    heading: "Related Date & Time Tools",
    description: "Other free tools for working across time zones and schedules.",
    icon: "🕒",
  },
  QRCode: {
    heading: "Related Tools",
    description: "Other free utilities you might find handy.",
    icon: "🔗",
  },
  Privacy: {
    heading: "Related Privacy & Security Tools",
    description: "Other free tools to keep your files and data clean before sharing.",
    icon: "🛡️",
  },
};

const DEFAULT_COPY: CategoryCopy = {
  heading: "Related Tools",
  description: "Other free Atoolix tools you might find useful.",
  icon: "🧰",
};

const IMAGE_TO_PDF_CLUSTER: Record<string, RelatedToolItem[]> = {
  "/tools/image/image-to-pdf": [
    {
      name: "JPG to PDF",
      href: "/tools/image/jpg-to-pdf",
      canonical: `${SITE_URL}/tools/image/jpg-to-pdf`,
    },
    {
      name: "PNG to PDF",
      href: "/tools/image/png-to-pdf",
      canonical: `${SITE_URL}/tools/image/png-to-pdf`,
    },
    {
      name: "WebP to PDF",
      href: "/tools/image/webp-to-pdf",
      canonical: `${SITE_URL}/tools/image/webp-to-pdf`,
    },
  ],
  "/tools/image/jpg-to-pdf": [
    {
      name: "Image to PDF",
      href: "/tools/image/image-to-pdf",
      canonical: `${SITE_URL}/tools/image/image-to-pdf`,
    },
    {
      name: "PNG to PDF",
      href: "/tools/image/png-to-pdf",
      canonical: `${SITE_URL}/tools/image/png-to-pdf`,
    },
    {
      name: "WebP to PDF",
      href: "/tools/image/webp-to-pdf",
      canonical: `${SITE_URL}/tools/image/webp-to-pdf`,
    },
  ],
  "/tools/image/png-to-pdf": [
    {
      name: "Image to PDF",
      href: "/tools/image/image-to-pdf",
      canonical: `${SITE_URL}/tools/image/image-to-pdf`,
    },
    {
      name: "JPG to PDF",
      href: "/tools/image/jpg-to-pdf",
      canonical: `${SITE_URL}/tools/image/jpg-to-pdf`,
    },
    {
      name: "WebP to PDF",
      href: "/tools/image/webp-to-pdf",
      canonical: `${SITE_URL}/tools/image/webp-to-pdf`,
    },
  ],
  "/tools/image/webp-to-pdf": [
    {
      name: "Image to PDF",
      href: "/tools/image/image-to-pdf",
      canonical: `${SITE_URL}/tools/image/image-to-pdf`,
    },
    {
      name: "JPG to PDF",
      href: "/tools/image/jpg-to-pdf",
      canonical: `${SITE_URL}/tools/image/jpg-to-pdf`,
    },
    {
      name: "PNG to PDF",
      href: "/tools/image/png-to-pdf",
      canonical: `${SITE_URL}/tools/image/png-to-pdf`,
    },
  ],
};

export interface RelatedToolItem {
  name: string;
  href: string;
  canonical?: string;
}

export interface RelatedToolsProps {
  toolId: string;
  items?: RelatedToolItem[];
  heading?: string;
  description?: string;
  icon?: string;
  maxItems?: number;
  includeArchived?: boolean;
  includeComingSoon?: boolean;
  className?: string;
}

export async function RelatedTools({
  toolId,
  items,
  heading,
  description,
  icon,
  maxItems = 8,
  includeArchived = true,
  includeComingSoon = true,
  className,
}: RelatedToolsProps) {
  const currentTool = tools.find((t: any) => t.id === toolId);
  const currentPath = currentTool?.alternates?.canonical
    ? currentTool.alternates.canonical
        .replace(SITE_URL, "")
        .replace(/\/$/, "")
    : publicToolPath(toolId, currentTool?.alternates?.canonical);

  const clusterItems = IMAGE_TO_PDF_CLUSTER[currentPath];

  const relatedTools = items
    ? items.map((item) => ({
        name: item.name,
        href: item.href,
        canonical:
          item.canonical ??
          `${SITE_URL}${item.href.startsWith("/") ? item.href : `/${item.href}`}`,
      }))
    : clusterItems ??
      (currentTool?.relatedTools ?? [])
        .map((id: any) => tools.find((t: any) => t.id === id))
        .filter((t: any): t is ToolRegistryEntry => {
          if (!t) return false;
          if (!includeArchived && t.archived) return false;
          if (!includeComingSoon && t.comingSoon) return false;
          return true;
        })
        .slice(0, maxItems)
        .map((t: any) => ({
          name: t.toolShortName || t.title,
          href: publicToolPath(t.id, t.alternates.canonical),
          canonical: publicCanonical(t.id, t.alternates.canonical),
        }));

  const limitedRelatedTools = relatedTools.slice(0, maxItems);

  if (limitedRelatedTools.length === 0) {
    return null;
  }

  const copy = CATEGORY_COPY[currentTool?.category ?? ""] ?? DEFAULT_COPY;
  const finalHeading = heading ??
    (clusterItems ? "Related Image to PDF Converters" : copy.heading);
  const finalDescription = description ??
    (clusterItems
      ? "Convert other supported image formats to PDF or use the general image-to-PDF converter."
      : copy.description);
  const finalIcon = icon ?? copy.icon;

  const relatedToolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: finalHeading,
    itemListElement: limitedRelatedTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: tool.canonical,
    })),
  };

  return (
    <>
      <JsonLd data={relatedToolsSchema} />
      <section
        aria-labelledby="related-tools-heading"
        className={className ?? "space-y-4"}
      >
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            {finalIcon}
          </span>

          <SectionHeading
            id="related-tools-heading"
            title={finalHeading}
            description={finalDescription}
          />
        </div>

        <nav aria-label={finalHeading} className="flex flex-wrap gap-3">
          {limitedRelatedTools.map((tool: any) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-blue-400/30 hover:bg-blue-400/20 hover:text-white"
            >
              <span aria-hidden="true">🔗</span>
              {tool.name}
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}

export default RelatedTools;
