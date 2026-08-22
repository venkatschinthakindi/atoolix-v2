import Link from "next/link";

const TARGET_PAGES = {
  100: "/tools/image/compress-image-to-100kb",
  50: "/tools/image/compress-image-to-50kb",
  20: "/tools/image/compress-image-to-20kb",
} as const;

type Target = keyof typeof TARGET_PAGES;

const copy: Record<Target, { title: string; intro: string; action: string }> = {
  100: {
    title: "Choosing the Right Image File-Size Target",
    intro: "Use the target that matches the destination's maximum file size. A smaller target is not automatically better because reducing an image further can require lower quality or smaller dimensions.",
    action: "If the requirement is 100 KB or less, start with 100 KB and verify the final file size. If the portal requires a smaller limit, use the 50 KB or 20 KB workflow instead.",
  },
  50: {
    title: "When Should You Use a 50 KB Image Target?",
    intro: "A 50 KB target is useful when a form or upload portal has a small file-size limit but does not require the image to be as small as 20 KB.",
    action: "Start at 50 KB when that is the stated maximum. If the destination says 20 KB or less, use the 20 KB workflow rather than compressing a 50 KB result again.",
  },
  20: {
    title: "When Should You Use a 20 KB Image Target?",
    intro: "A 20 KB target is intended for strict upload limits where a very small image file is required. Reaching this size may require a combination of compression and reduced dimensions.",
    action: "If the destination allows 50 KB or 100 KB, use the larger target when it produces a better-looking image. A smaller file is only useful when the destination actually requires it.",
  },
};

export function CompressTargetSizeGuidance({ target }: { target: Target }) {
  const current = copy[target];
  const alternatives = (Object.keys(TARGET_PAGES) as Target[]).filter((value) => value !== target);

  return (
    <section
      aria-labelledby="target-size-guidance-heading"
      className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-5 text-white sm:p-6"
    >
      <h2
        id="target-size-guidance-heading"
        className="text-xl font-bold tracking-tight sm:text-2xl"
      >
        {current.title}
      </h2>
      <p className="mt-2 max-w-4xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
        {current.intro}
      </p>
      <p className="mt-2 max-w-4xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
        {current.action}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {alternatives.map((value) => (
          <Link
            key={value}
            href={TARGET_PAGES[value]}
            className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <span className="text-sm font-semibold">
              {value} KB image compressor
            </span>
            <span className="mt-1 block text-xs leading-5 text-white/60">
              Use this workflow when the destination has a {value} KB target or maximum.
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
