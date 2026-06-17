"use client";

// A bank of ~100 gradient + icon-color pairings. Each card picks one at
// random on render, with the icon color always matching its gradient family
// so it stays legible on the white icon tile.
const CARD_COLORS: { bg: string; icon: string }[] = [
  { bg: "from-slate-400 to-slate-500", icon: "text-slate-600" },
  { bg: "from-slate-500 to-slate-600", icon: "text-slate-600" },
  { bg: "from-slate-600 to-slate-700", icon: "text-slate-600" },
  { bg: "from-slate-400 to-slate-600", icon: "text-slate-600" },
  { bg: "from-slate-500 to-slate-700", icon: "text-slate-600" },
  { bg: "from-taupe-400 to-taupe-500", icon: "text-taupe-600" },
  { bg: "from-taupe-500 to-taupe-600", icon: "text-taupe-600" },
  { bg: "from-taupe-600 to-taupe-700", icon: "text-taupe-600" },
  { bg: "from-taupe-400 to-taupe-600", icon: "text-taupe-600" },
  { bg: "from-taupe-500 to-taupe-700", icon: "text-taupe-600" },
  { bg: "from-zinc-400 to-zinc-500", icon: "text-zinc-600" },
  { bg: "from-zinc-500 to-zinc-600", icon: "text-zinc-600" },
  { bg: "from-zinc-600 to-zinc-700", icon: "text-zinc-600" },
  { bg: "from-zinc-400 to-zinc-600", icon: "text-zinc-600" },
  { bg: "from-zinc-500 to-zinc-700", icon: "text-zinc-600" },
  { bg: "from-neutral-400 to-neutral-500", icon: "text-neutral-600" },
  { bg: "from-neutral-500 to-neutral-600", icon: "text-neutral-600" },
  { bg: "from-neutral-600 to-neutral-700", icon: "text-neutral-600" },
  { bg: "from-neutral-400 to-neutral-600", icon: "text-neutral-600" },
  { bg: "from-neutral-500 to-neutral-700", icon: "text-neutral-600" },
  { bg: "from-stone-400 to-stone-500", icon: "text-stone-600" },
  { bg: "from-stone-500 to-stone-600", icon: "text-stone-600" },
  { bg: "from-stone-600 to-stone-700", icon: "text-stone-600" },
  { bg: "from-stone-400 to-stone-600", icon: "text-stone-600" },
  { bg: "from-stone-500 to-stone-700", icon: "text-stone-600" },
  { bg: "from-red-400 to-red-500", icon: "text-red-600" },
  { bg: "from-red-500 to-red-600", icon: "text-red-600" },
  { bg: "from-red-600 to-red-700", icon: "text-red-600" },
  { bg: "from-red-400 to-red-600", icon: "text-red-600" },
  { bg: "from-red-500 to-red-700", icon: "text-red-600" },
  { bg: "from-orange-400 to-orange-500", icon: "text-orange-600" },
  { bg: "from-orange-500 to-orange-600", icon: "text-orange-600" },
  { bg: "from-orange-600 to-orange-700", icon: "text-orange-600" },
  { bg: "from-orange-400 to-orange-600", icon: "text-orange-600" },
  { bg: "from-orange-500 to-orange-700", icon: "text-orange-600" },
  { bg: "from-amber-400 to-amber-500", icon: "text-amber-600" },
  { bg: "from-amber-500 to-amber-600", icon: "text-amber-600" },
  { bg: "from-amber-600 to-amber-700", icon: "text-amber-600" },
  { bg: "from-amber-400 to-amber-600", icon: "text-amber-600" },
  { bg: "from-amber-500 to-amber-700", icon: "text-amber-600" },
  { bg: "from-yellow-400 to-yellow-500", icon: "text-yellow-600" },
  { bg: "from-yellow-500 to-yellow-600", icon: "text-yellow-600" },
  { bg: "from-yellow-600 to-yellow-700", icon: "text-yellow-600" },
  { bg: "from-yellow-400 to-yellow-600", icon: "text-yellow-600" },
  { bg: "from-yellow-500 to-yellow-700", icon: "text-yellow-600" },
  { bg: "from-lime-400 to-lime-500", icon: "text-lime-600" },
  { bg: "from-lime-500 to-lime-600", icon: "text-lime-600" },
  { bg: "from-lime-600 to-lime-700", icon: "text-lime-600" },
  { bg: "from-lime-400 to-lime-600", icon: "text-lime-600" },
  { bg: "from-lime-500 to-lime-700", icon: "text-lime-600" },
  { bg: "from-green-400 to-green-500", icon: "text-green-600" },
  { bg: "from-green-500 to-green-600", icon: "text-green-600" },
  { bg: "from-green-600 to-green-700", icon: "text-green-600" },
  { bg: "from-green-400 to-green-600", icon: "text-green-600" },
  { bg: "from-green-500 to-green-700", icon: "text-green-600" },
  { bg: "from-emerald-400 to-emerald-500", icon: "text-emerald-600" },
  { bg: "from-emerald-500 to-emerald-600", icon: "text-emerald-600" },
  { bg: "from-emerald-600 to-emerald-700", icon: "text-emerald-600" },
  { bg: "from-emerald-400 to-emerald-600", icon: "text-emerald-600" },
  { bg: "from-emerald-500 to-emerald-700", icon: "text-emerald-600" },
  { bg: "from-teal-400 to-teal-500", icon: "text-teal-600" },
  { bg: "from-teal-500 to-teal-600", icon: "text-teal-600" },
  { bg: "from-teal-600 to-teal-700", icon: "text-teal-600" },
  { bg: "from-teal-400 to-teal-600", icon: "text-teal-600" },
  { bg: "from-teal-500 to-teal-700", icon: "text-teal-600" },
  { bg: "from-cyan-400 to-cyan-500", icon: "text-cyan-600" },
  { bg: "from-cyan-500 to-cyan-600", icon: "text-cyan-600" },
  { bg: "from-cyan-600 to-cyan-700", icon: "text-cyan-600" },
  { bg: "from-cyan-400 to-cyan-600", icon: "text-cyan-600" },
  { bg: "from-cyan-500 to-cyan-700", icon: "text-cyan-600" },
  { bg: "from-sky-400 to-sky-500", icon: "text-sky-600" },
  { bg: "from-sky-500 to-sky-600", icon: "text-sky-600" },
  { bg: "from-sky-600 to-sky-700", icon: "text-sky-600" },
  { bg: "from-sky-400 to-sky-600", icon: "text-sky-600" },
  { bg: "from-sky-500 to-sky-700", icon: "text-sky-600" },
  { bg: "from-blue-400 to-blue-500", icon: "text-blue-600" },
  { bg: "from-blue-500 to-blue-600", icon: "text-blue-600" },
  { bg: "from-blue-600 to-blue-700", icon: "text-blue-600" },
  { bg: "from-blue-400 to-blue-600", icon: "text-blue-600" },
  { bg: "from-blue-500 to-blue-700", icon: "text-blue-600" },
  { bg: "from-indigo-400 to-indigo-500", icon: "text-indigo-600" },
  { bg: "from-indigo-500 to-indigo-600", icon: "text-indigo-600" },
  { bg: "from-indigo-600 to-indigo-700", icon: "text-indigo-600" },
  { bg: "from-indigo-400 to-indigo-600", icon: "text-indigo-600" },
  { bg: "from-indigo-500 to-indigo-700", icon: "text-indigo-600" },
  { bg: "from-violet-400 to-violet-500", icon: "text-violet-600" },
  { bg: "from-violet-500 to-violet-600", icon: "text-violet-600" },
  { bg: "from-violet-600 to-violet-700", icon: "text-violet-600" },
  { bg: "from-violet-400 to-violet-600", icon: "text-violet-600" },
  { bg: "from-violet-500 to-violet-700", icon: "text-violet-600" },
  { bg: "from-purple-400 to-purple-500", icon: "text-purple-600" },
  { bg: "from-purple-500 to-purple-600", icon: "text-purple-600" },
  { bg: "from-purple-600 to-purple-700", icon: "text-purple-600" },
  { bg: "from-purple-400 to-purple-600", icon: "text-purple-600" },
  { bg: "from-purple-500 to-purple-700", icon: "text-purple-600" },
  { bg: "from-fuchsia-400 to-fuchsia-500", icon: "text-fuchsia-600" },
  { bg: "from-fuchsia-500 to-fuchsia-600", icon: "text-fuchsia-600" },
  { bg: "from-fuchsia-600 to-fuchsia-700", icon: "text-fuchsia-600" },
  { bg: "from-fuchsia-400 to-fuchsia-600", icon: "text-fuchsia-600" },
  { bg: "from-fuchsia-500 to-fuchsia-700", icon: "text-fuchsia-600" },
  { bg: "from-pink-400 to-pink-500", icon: "text-pink-600" },
  { bg: "from-pink-500 to-pink-600", icon: "text-pink-600" },
  { bg: "from-pink-600 to-pink-700", icon: "text-pink-600" },
  { bg: "from-pink-400 to-pink-600", icon: "text-pink-600" },
  { bg: "from-pink-500 to-pink-700", icon: "text-pink-600" },
  { bg: "from-rose-400 to-rose-500", icon: "text-rose-600" },
  { bg: "from-rose-500 to-rose-600", icon: "text-rose-600" },
  { bg: "from-rose-600 to-rose-700", icon: "text-rose-600" },
  { bg: "from-rose-400 to-rose-600", icon: "text-rose-600" },
  { bg: "from-rose-500 to-rose-700", icon: "text-rose-600" },
];

function getRandomColor() {
  return CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];
}

export function ToolCard({ label, icon: Icon, description }: any) {
  const color = getColorFromLabel(label);

  return (
    <button  title={String(description)}
      type="button"
      className={`group relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br ${color.bg} px-3 py-3 text-center shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400`}
    >
      {/* decorative circle accents, matching the reference image */}
      <span className="pointer-events-none absolute -top-4 -right-4 h-12 w-12 rounded-full bg-white/10" />
      <span className="pointer-events-none absolute -bottom-5 -left-5 h-14 w-14 rounded-full bg-white/5" />

      {/* icon tile */}
      <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
        <Icon className={`h-4 w-4 ${color.icon}`} strokeWidth={2} />
      </span>

      {/* label */}
      <span className="relative z-10 text-md font-semibold text-white line-clamp-2">
        {label}
      </span>
    </button>
  );
}

export default ToolCard;
function getColorFromLabel(label: string) {
  let hash = 0;

  for (let i = 0; i < label.length; i++) {
    hash = ((hash << 5) - hash + label.charCodeAt(i)) | 0;
  }

  return CARD_COLORS[Math.abs(hash) % CARD_COLORS.length];
}