import { AppShell } from "@/components/layout/appShell";
import { HeroCommandCenter } from "@/components/dashboard/heroCommandCenter";
import { FeaturedTools } from "@/components/dashboard/featuredTools";
import { Footer } from "@/app/footer/footer";
import { HomePageSeo, metadata as homeMetadata } from "./siteSeoContent";

export const metadata = homeMetadata;
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <AppShell>
      <HeroCommandCenter />
      <FeaturedTools />
      <HomePageSeo />
      <Footer />
    </AppShell>
  );
}