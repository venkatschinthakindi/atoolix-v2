import "client-only";

export const serverConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME!,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
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