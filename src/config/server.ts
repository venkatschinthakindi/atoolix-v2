import "server-only";

export const serverConfig = {
  siteName: process.env.SITE_NAME!,
  siteUrl: process.env.SITE_URL!,
  siteLogoUrl: process.env.SITE_LOGO_URL!,
  siteDescription: process.env.SITE_DESCRIPTION!,

  companyName: process.env.COMPANY_NAME!,

  supportEmail: process.env.SUPPORT_EMAIL!,

  theme: {
    default: "dark",
    accent: "indigo",
  },

  analytics: {
    googleAnalyticsId: process.env.GA_ID,
  },
} as const;