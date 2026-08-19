export function SectionHeading({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description?: string;
  }) {
    return (
      <div className="space-y-1.5">
        <h2
          id={id}
          className="text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          {title}
        </h2>

        {description ? (
          <p className="text-sm leading-7 text-white/65 sm:text-[0.95rem]">
            {description}
          </p>
        ) : null}
      </div>
    );
  }