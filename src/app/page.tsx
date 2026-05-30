// export default function HomePage() {
//   return (
//     <main className="aurora-bg">
//       <div className="app-container py-20">
//         <div className="glass p-10">
//           <h1 className="display-xl text-white">
//             ToolKit V2
//           </h1>

//           <p className="mt-4 text-white/70">
//             Premium SaaS Dashboard
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

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