import { ToolRegistryEntry } from "@/data/tools";
import { getTool } from "@/utility/getTool";
import { serverConfig } from "@/config/server";
import type { Metadata } from "next";

const CALCULATOR_CANONICAL = `${serverConfig.siteUrl}/tools/calculator`;
const CALCULATOR_TITLE = "Free Online Calculator – Scientific, Percentage & Equation Solver";
const CALCULATOR_DESCRIPTION =
  "Free online calculator for everyday arithmetic, scientific calculations, percentages, and equation solving. Calculate results instantly in your browser on desktop or mobile.";

const IMAGE_TARGET_SIZE_METADATA: Record<
  string,
  { title: string; description: string }
> = {
  "image/compress-image-to-100kb": {
    title: "Compress Image to 100 KB Online Free | JPG, PNG & WebP | Atoolix",
    description:
      "Compress an image to a 100 KB target online. Choose JPG, PNG, or WebP, adjust dimensions or quality when needed, preview the result, and download it in your browser.",
  },
  "image/compress-image-to-50kb": {
    title: "Compress Image to 50 KB Online Free | JPG, PNG & WebP | Atoolix",
    description:
      "Compress an image to a 50 KB target online. Choose JPG, PNG, or WebP, adjust dimensions or quality when needed, preview the result, and download it in your browser.",
  },
  "image/compress-image-to-20kb": {
    title: "Compress Image to 20 KB Online Free | JPG, PNG & WebP | Atoolix",
    description:
      "Compress an image to a 20 KB target online. Choose JPG, PNG, or WebP, adjust dimensions or quality when needed, preview the result, and download it in your browser.",
  },
};

const PASSPORT_PHOTO_METADATA = {
  title: "Passport Photo Resizer Online – Resize & Compress Photos | Atoolix",
  description:
    "Resize passport, visa, ID, and application photos online. Set custom dimensions, reduce file size, adjust quality, preview the result, and download the image in your browser.",
};

const TIMEZONE_CONVERTER_TITLE =
  "Time Zone Converter – Convert Time Between Time Zones | Atoolix";
const TIMEZONE_CONVERTER_DESCRIPTION =
  "Convert time between time zones by date, city, or country. Compare multiple locations, UTC offsets, day differences, and daylight saving changes online for free.";

const ROI_CALCULATOR_METADATA = {
  title: "ROI Calculator – Calculate Return on Investment Online | Atoolix",
  description:
    "Calculate return on investment (ROI) online from your initial investment, final value, profit, and return percentage. Compare investment outcomes quickly with a free calculator.",
};

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
  const targetSizeMetadata = IMAGE_TARGET_SIZE_METADATA[normalizedToolId];
  const isPassportPhotoResizer = normalizedToolId === "image/passport-photo-resizer";
  const isTimezoneConverter = normalizedToolId === "datetime/timezone-converter";
  const isRoiCalculator = normalizedToolId === "calculator/roi-calculator";

  const title = isCalculatorHub
    ? CALCULATOR_TITLE
    : targetSizeMetadata?.title ??
      (isPassportPhotoResizer
        ? PASSPORT_PHOTO_METADATA.title
        : isTimezoneConverter
          ? TIMEZONE_CONVERTER_TITLE
          : isRoiCalculator
            ? ROI_CALCULATOR_METADATA.title
            : tool.title);
  const description = isCalculatorHub
    ? CALCULATOR_DESCRIPTION
    : targetSizeMetadata?.description ??
      (isPassportPhotoResizer
        ? PASSPORT_PHOTO_METADATA.description
        : isTimezoneConverter
          ? TIMEZONE_CONVERTER_DESCRIPTION
          : isRoiCalculator
            ? ROI_CALCULATOR_METADATA.description
            : tool.description);
  const canonical = isCalculatorHub
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
