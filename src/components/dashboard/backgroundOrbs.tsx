export function BackgroundOrbs() {
  return (
    <>
      <div
        className="
          absolute
          left-20
          top-40
          h-72
          w-72
          rounded-full
          bg-[rgb(var(--aurora-purple)/20%)]
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          right-20
          top-32
          h-72
          w-72
          rounded-full
          bg-[rgb(var(--aurora-cyan)/20%)]
          blur-[120px]
        "
      />
    </>
  );
}