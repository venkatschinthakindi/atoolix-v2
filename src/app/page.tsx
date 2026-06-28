import { AppShell } from "@/components/layout/appShell";
import { HeroCommandCenter } from "@/components/dashboard/heroCommandCenter";
import { FeaturedTools } from "@/components/dashboard/featuredTools";
import { Footer } from "@/components/footer/footer";
import HomePageSeo from "./siteSeoContent";

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