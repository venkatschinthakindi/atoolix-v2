    "use client";

import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  return (
    <footer className="relative mt-28 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_bottom,_rgba(124,58,237,0.25),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-semibold tracking-tight">
              ToolKit
            </h3>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              A modern SaaS suite of tools designed to accelerate development,
              productivity, and workflow efficiency.
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              All systems operational
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="hover:text-white cursor-pointer transition" onClick={() => router.push("/tools")}>
                Tools
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Features
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Pricing
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Roadmap
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="hover:text-white cursor-pointer transition">
                Documentation
              </li>
              <li className="hover:text-white cursor-pointer transition">
                API Reference
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Guides
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Support
              </li>
            </ul>
          </div>

          {/* CTA / Community */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white">
              Stay Updated
            </h4>

            <p className="text-sm text-zinc-400">
              Get updates on new tools and improvements.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
              />

              <button className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition text-sm font-medium text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          
          <p>
            © {new Date().getFullYear()} ToolKit. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition">
              Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Status
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}