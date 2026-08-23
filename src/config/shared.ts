const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atoolix.com";

export const sharedConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME!,
  // Keep a production-safe canonical fallback so metadata, sitemap, robots,
  // Open Graph, and tool registry URLs never resolve from an undefined site URL.
  siteUrl: SITE_URL,
  siteLogoUrl: process.env.NEXT_PUBLIC_SITE_LOGO_URL!,
  siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION!,
  companyName: process.env.NEXT_PUBLIC_SITE_COMPANY_NAME!,
  supportEmail: process.env.NEXT_PUBLIC_SITE_SUPPORT_EMAIL!,

  theme: {
    default: "dark",
    accent: "indigo",
  },

  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  },
} as const;
