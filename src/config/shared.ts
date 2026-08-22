export const sharedConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME!,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL!,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION!,
  company: process.env.NEXT_PUBLIC_COMPANY!,
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL!,
  theme: process.env.NEXT_PUBLIC_THEME!,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
} as const;
