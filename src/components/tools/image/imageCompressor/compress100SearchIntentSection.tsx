import Link from "next/link";

const relatedSizeTools = [
  {
    href: "/tools/image/compress-image-to-50kb",
    title: "Compress Image to 50 KB",
    description: "Use a smaller target when your upload or form has a 50 KB limit.",
  },
  {
    href: "/tools/image/compress-image-to-20kb",
    title: "Compress Image to 20 KB",
    description: "Choose a 20 KB target for workflows with stricter file-size limits.",
  },
  {
    href: "/tools/image/compress-image",
    title: "Image Compressor",
    description: "Use the general compressor when you need a different target or compression workflow.",
  },
];

export function Compress100SearchIntentSection() {
  return (
    <section aria-labelledby="under-100kb-heading" className="space-y-4">
      <div className="space-y-2">
        <h2 id="under-100kb-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Compress an Image Under 100 KB
        </h2>
        <p className="text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">
          If a website or application requires an image to be below 100 KB, start with the 100 KB target and check the resulting file size. If the file is still above the limit, reduce the target or image dimensions and process it again.
        </p>
        <p className="text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">
          There is no universal setting that can make every image reach 100 KB without visual changes. Photos, screenshots, graphics, dimensions, and image formats compress differently. For the best result, use the smallest target that satisfies the requirement while keeping the image visually useful.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {relatedSizeTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-border-strong hover:bg-surface-raised"
          >
            <h3 className="text-sm font-semibold sm:text-[0.95rem]">{tool.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
