"use client";

import { IconResolver } from "@/sharedUI/iconResolver";
import React, { useMemo } from "react";

// 100 UNIQUE gradient + icon-color pairings
const CARD_COLORS: { bg: string; icon: string }[] = [
  { bg: "from-blue-400 to-blue-500", icon: "text-blue-700" },
  { bg: "from-sky-400 to-sky-500", icon: "text-sky-700" },
  { bg: "from-indigo-400 to-indigo-500", icon: "text-indigo-700" },
  { bg: "from-violet-400 to-violet-500", icon: "text-violet-700" },
  { bg: "from-purple-400 to-purple-500", icon: "text-purple-700" },
  { bg: "from-fuchsia-400 to-fuchsia-500", icon: "text-fuchsia-700" },
  { bg: "from-pink-400 to-pink-500", icon: "text-pink-700" },
  { bg: "from-rose-400 to-rose-500", icon: "text-rose-700" },
  { bg: "from-red-400 to-red-500", icon: "text-red-700" },
  { bg: "from-orange-400 to-orange-500", icon: "text-orange-700" },
  { bg: "from-amber-400 to-amber-500", icon: "text-amber-700" },
  { bg: "from-yellow-400 to-yellow-500", icon: "text-yellow-700" },
  { bg: "from-lime-400 to-lime-500", icon: "text-lime-700" },
  { bg: "from-green-400 to-green-500", icon: "text-green-700" },
  { bg: "from-emerald-400 to-emerald-500", icon: "text-emerald-700" },
  { bg: "from-teal-400 to-teal-500", icon: "text-teal-700" },
  { bg: "from-cyan-400 to-cyan-500", icon: "text-cyan-700" },
  { bg: "from-slate-400 to-slate-500", icon: "text-slate-700" },
  { bg: "from-gray-400 to-gray-500", icon: "text-gray-700" },
  { bg: "from-zinc-400 to-zinc-500", icon: "text-zinc-700" },
  { bg: "from-neutral-400 to-neutral-500", icon: "text-neutral-700" },
  { bg: "from-stone-400 to-stone-500", icon: "text-stone-700" },
  { bg: "from-terra-400 to-terra-500", icon: "text-terra-700" },
  { bg: "from-brown-400 to-brown-500", icon: "text-brown-700" },
  { bg: "from-taupe-400 to-taupe-500", icon: "text-taupe-700" },
  { bg: "from-blue-500 to-blue-600", icon: "text-blue-800" },
  { bg: "from-sky-500 to-sky-600", icon: "text-sky-800" },
  { bg: "from-indigo-500 to-indigo-600", icon: "text-indigo-800" },
  { bg: "from-violet-500 to-violet-600", icon: "text-violet-800" },
  { bg: "from-purple-500 to-purple-600", icon: "text-purple-800" },
  { bg: "from-fuchsia-500 to-fuchsia-600", icon: "text-fuchsia-800" },
  { bg: "from-pink-500 to-pink-600", icon: "text-pink-800" },
  { bg: "from-rose-500 to-rose-600", icon: "text-rose-800" },
  { bg: "from-red-500 to-red-600", icon: "text-red-800" },
  { bg: "from-orange-500 to-orange-600", icon: "text-orange-800" },
  { bg: "from-amber-500 to-amber-600", icon: "text-amber-800" },
  { bg: "from-yellow-500 to-yellow-600", icon: "text-yellow-800" },
  { bg: "from-lime-500 to-lime-600", icon: "text-lime-800" },
  { bg: "from-green-500 to-green-600", icon: "text-green-800" },
  { bg: "from-emerald-500 to-emerald-600", icon: "text-emerald-800" },
  { bg: "from-teal-500 to-teal-600", icon: "text-teal-800" },
  { bg: "from-cyan-500 to-cyan-600", icon: "text-cyan-800" },
  { bg: "from-slate-500 to-slate-600", icon: "text-slate-800" },
  { bg: "from-gray-500 to-gray-600", icon: "text-gray-800" },
  { bg: "from-zinc-500 to-zinc-600", icon: "text-zinc-800" },
  { bg: "from-neutral-500 to-neutral-600", icon: "text-neutral-800" },
  { bg: "from-stone-500 to-stone-600", icon: "text-stone-800" },
  { bg: "from-terra-500 to-terra-600", icon: "text-terra-800" },
  { bg: "from-brown-500 to-brown-600", icon: "text-brown-800" },
  { bg: "from-taupe-500 to-taupe-600", icon: "text-taupe-800" },
  { bg: "from-blue-600 to-blue-700", icon: "text-blue-900" },
  { bg: "from-sky-600 to-sky-700", icon: "text-sky-900" },
  { bg: "from-indigo-600 to-indigo-700", icon: "text-indigo-900" },
  { bg: "from-violet-600 to-violet-700", icon: "text-violet-900" },
  { bg: "from-purple-600 to-purple-700", icon: "text-purple-900" },
  { bg: "from-fuchsia-600 to-fuchsia-700", icon: "text-fuchsia-900" },
  { bg: "from-pink-600 to-pink-700", icon: "text-pink-900" },
  { bg: "from-rose-600 to-rose-700", icon: "text-rose-900" },
  { bg: "from-red-600 to-red-700", icon: "text-red-900" },
  { bg: "from-orange-600 to-orange-700", icon: "text-orange-900" },
  { bg: "from-amber-600 to-amber-700", icon: "text-amber-900" },
  { bg: "from-yellow-600 to-yellow-700", icon: "text-yellow-900" },
  { bg: "from-lime-600 to-lime-700", icon: "text-lime-900" },
  { bg: "from-green-600 to-green-700", icon: "text-green-900" },
  { bg: "from-emerald-600 to-emerald-700", icon: "text-emerald-900" },
  { bg: "from-teal-600 to-teal-700", icon: "text-teal-900" },
  { bg: "from-cyan-600 to-cyan-700", icon: "text-cyan-900" },
  { bg: "from-slate-600 to-slate-700", icon: "text-slate-900" },
  { bg: "from-gray-600 to-gray-700", icon: "text-gray-900" },
  { bg: "from-zinc-600 to-zinc-700", icon: "text-zinc-900" },
  { bg: "from-neutral-600 to-neutral-700", icon: "text-neutral-900" },
  { bg: "from-stone-600 to-stone-700", icon: "text-stone-900" },
  { bg: "from-terra-600 to-terra-700", icon: "text-terra-900" },
  { bg: "from-brown-600 to-brown-700", icon: "text-brown-900" },
  { bg: "from-taupe-600 to-taupe-700", icon: "text-taupe-900" },
  { bg: "from-blue-300 to-blue-400", icon: "text-blue-600" },
  { bg: "from-sky-300 to-sky-400", icon: "text-sky-600" },
  { bg: "from-indigo-300 to-indigo-400", icon: "text-indigo-600" },
  { bg: "from-violet-300 to-violet-400", icon: "text-violet-600" },
  { bg: "from-purple-300 to-purple-400", icon: "text-purple-600" },
  { bg: "from-fuchsia-300 to-fuchsia-400", icon: "text-fuchsia-600" },
  { bg: "from-pink-300 to-pink-400", icon: "text-pink-600" },
  { bg: "from-rose-300 to-rose-400", icon: "text-rose-600" },
  { bg: "from-red-300 to-red-400", icon: "text-red-600" },
  { bg: "from-orange-300 to-orange-400", icon: "text-orange-600" },
  { bg: "from-amber-300 to-amber-400", icon: "text-amber-600" },
  { bg: "from-yellow-300 to-yellow-400", icon: "text-yellow-600" },
  { bg: "from-lime-300 to-lime-400", icon: "text-lime-600" },
  { bg: "from-green-300 to-green-400", icon: "text-green-600" },
  { bg: "from-emerald-300 to-emerald-400", icon: "text-emerald-600" },
  { bg: "from-teal-300 to-teal-400", icon: "text-teal-600" },
  { bg: "from-cyan-300 to-cyan-400", icon: "text-cyan-600" },
  { bg: "from-slate-300 to-slate-400", icon: "text-slate-600" },
  { bg: "from-gray-300 to-gray-400", icon: "text-gray-600" },
  { bg: "from-zinc-300 to-zinc-400", icon: "text-zinc-600" },
  { bg: "from-neutral-300 to-neutral-400", icon: "text-neutral-600" },
  { bg: "from-stone-300 to-stone-400", icon: "text-stone-600" },
];

function getColorFromLabel(label: string): { bg: string; icon: string } {
  let hash = 0;

  for (let i = 0; i < label.length; i++) {
    hash = ((hash << 5) - hash + label.charCodeAt(i)) | 0;
  }

  const extendedHash = Math.abs(hash + label.length * 31);
  
  return CARD_COLORS[extendedHash % CARD_COLORS.length];
}

export interface ToolCardProps {
  label: string;
  icon: string;
  description: string;
}

export function ToolCard({ label, icon: Icon, description }: ToolCardProps) {
  const color = useMemo(() => getColorFromLabel(label), [label]);

  return (
    <button
      type="button"
      title={description}
      aria-label={label}
      className={`group relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br ${color.bg} p-0.5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* PREMIUM inner glow border */}
      <span
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      
      {/* PREMIUM glass morph background */}
      <span
        className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* LUXURY $1000+ shimmer effect */}
      <span
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/15 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Card content wrapper with glass morph */}
      <div className="relative z-10 flex h-full w-full flex-col items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
        {/* icon tile - premium with subtle shadow */}
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-lg shadow-black/5">
          <IconResolver name={Icon} className={`h-5 w-5 ${color.icon}`} strokeWidth={2.5} />
        </span>

        {/* label - premium typography */}
        <span className="text-sm font-bold tracking-tight text-white drop-shadow-sm">
          {label}
        </span>
        
        {/* premium subtle divider */}
        <span className="h-0.5 w-8 rounded-full bg-white/20" aria-hidden="true" />
      </div>
    </button>
  );
}

export default ToolCard;