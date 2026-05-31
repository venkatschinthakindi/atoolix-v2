import { AppShell } from "@/components/layout/app-shell";
import { HeroCommandCenter } from "@/components/dashboard/hero-command-center";
import { FeaturedTools } from "@/components/dashboard/featured-tools";
import { Footer } from "@/components/footer/footer";

export default function HomePage() {
  return (
    <AppShell>
      <HeroCommandCenter />
      <FeaturedTools />
      <Footer />
    </AppShell>
  );
}