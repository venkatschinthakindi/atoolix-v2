
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
title:"404 | Atoolix",
description:"The page you're looking for could not be found.",
robots:{
index:false,
follow:true
}
}

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      {/* Aurora + noise background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(241,219,160,0.55),_rgba(13,23,42,0.1))] blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 h-[260px] w-[260px] -translate-x-1/3 translate-y-1/4 rounded-full bg-[radial-gradient(circle_at_bottom,_rgba(201,161,92,0.45),_rgba(15,23,42,0.1))] blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(148,163,184,0.15),_transparent_55%)] opacity-40" />
        <div className="absolute inset-0 opacity-[0.03]" />
      </div>

      {/* Top nav */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F1DBA0] text-xs font-bold text-slate-950">
            <Image src="/logo.png" alt="Atoolix find the best tools" title='Atoolix find the perfect tools' className="transparent" width={24} height={24} />
          </div>
          <span className="text-sm font-semibold tracking-wide text-foreground">
            Atoolix
          </span>
        </div>
        <nav className="flex items-center gap-4 text-xs text-foreground-secondary">
          <Link href="/" className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[#F1DBA0]">
            Home
          </Link>
          <Link href="/tools" className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[#F1DBA0]">
            Tools
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <section
        aria-labelledby="atoolix-404-title"
        className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-10 sm:px-6 lg:px-8"
      >
        {/* Big 404 hero */}
        <div className="relative mb-6 flex flex-col items-center">
          <div className="relative flex items-center justify-center rounded-3xl bg-popover px-10 py-6 shadow-2xl shadow-black/60 ring-1 ring-border backdrop-blur-xl">
            <span className="absolute -top-2 left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-[#F1DBA0]/0 via-[#F1DBA0]/80 to-[#F1DBA0]/0" />
            <span className="absolute -bottom-3 left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-[#D9B978]/0 via-[#D9B978]/70 to-[#D9B978]/0" />
            <span className="bg-gradient-to-tr from-[#F1DBA0] via-[#D9B978] to-[#C9A15C] bg-clip-text font-semibold tracking-[0.12em] text-transparent text-[4.5rem] sm:text-[7rem] lg:text-[9rem]">
              4&nbsp;0&nbsp;4
            </span>
          </div>

          {/* Status badge */}
          <span className="mt-4 inline-flex items-center rounded-full border border-[#F1DBA0]/40 bg-[#F1DBA0]/10 px-4 py-1 text-[11px] font-medium tracking-wide text-[#F1DBA0]">
            404 • Page Not Found
          </span>
        </div>

        {/* Heading + copy */}
        <div className="max-w-2xl text-center">
          <h1
            id="atoolix-404-title"
            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            We couldn&apos;t find the page you&apos;re looking for.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
            The page you requested doesn&apos;t exist anymore, or the link may be out of date.
            You can go back, return to the homepage, or browse all tools.
          </p>
        </div>

        {/* Primary actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {/* Primary: Home */}
          <Link href="/" aria-label="Go to Atoolix home">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F1DBA0] px-5 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-[#F1DBA0]/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D9B978] hover:shadow-[#D9B978]/40">
              🏠 Go home
            </span>
          </Link>

          {/* Secondary: Browse tools */}
          <Link href="/tools" aria-label="Browse all Atoolix tools">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground shadow-md shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F1DBA0]/70 hover:bg-card">
              🧰 Browse tools
            </span>
          </Link>
        </div>
      </section>

      {/* Footer / SEO line */}
      <footer className="mx-auto w-full max-w-5xl px-4 pb-10 text-center sm:px-6 lg:px-8">
        <p className="mt-6 text-[11px] text-foreground-faint">
          Free online tools for images, PDFs, developers, calculators, converters and productivity.
        </p>
      </footer>
    </main>
  );
}