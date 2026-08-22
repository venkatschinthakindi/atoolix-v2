"use client";

import { useRef, useState } from "react";
import { usePwa } from "@/components/pwa/PwaProvider";
import { clientConfig } from "@/config/client";

const HANDLE_WIDTH = 34;
const PANEL_WIDTH = 264;

/** Custom install mark — an app tile with an arrow drawing down into a dock. */
function InstallGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ib-gold" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F1DBA0" />
          <stop offset="100%" stopColor="#C9A15C" />
        </linearGradient>
      </defs>
      <rect x="5" y="2.5" width="14" height="14" rx="4" stroke="url(#ib-gold)" strokeWidth="1.5" />
      <path d="M12 6.5V13M12 13L9.4 10.4M12 13L14.6 10.4" stroke="url(#ib-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 19.5C3.5 19.5 6 21 12 21C18 21 20.5 19.5 20.5 19.5" stroke="url(#ib-gold)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function InstallButton() {
  const { canInstall, isInstalled, install } = usePwa();

  // No dismiss/hide state at all — this is a permanent fixture on the edge,
  // always reachable as a collapsed tab. Only real reasons to not render:
  // already installed, or the platform doesn't support installing right now.
  const [expanded, setExpanded] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const dragXCollapsed = PANEL_WIDTH - HANDLE_WIDTH;
  const [dragX, setDragX] = useState(dragXCollapsed);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startDragX = useRef(dragXCollapsed);

  if (isInstalled || !canInstall) return null;

  const clamp = (v: number) => Math.min(Math.max(v, 0), dragXCollapsed);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setShowTip(false);
    startX.current = e.clientX;
    startDragX.current = dragX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const delta = e.clientX - startX.current;
    setDragX(clamp(startDragX.current + delta));
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    const shouldExpand = dragX < dragXCollapsed / 2;
    setExpanded(shouldExpand);
    setDragX(shouldExpand ? 0 : dragXCollapsed);
  };

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    setDragX(next ? 0 : dragXCollapsed);
    setShowTip(false);
  };

  // Collapses back to the edge tab — it never fully disappears or gets
  // remembered as "dismissed". It's always there, just tucked away.
  const collapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(false);
    setDragX(dragXCollapsed);
  };

  return (
  <div
    className="fixed right-0 top-1/2 z-[9999] -translate-y-1/2 pointer-events-none"
    style={{ width: PANEL_WIDTH }}
  >
    {/* Tooltip */}
    <div
      role="tooltip"
      className={`
        pointer-events-none absolute bottom-full right-3 mb-3 w-[250px]
        rounded-2xl border border-white/[0.18] bg-indigo-950/80 p-4
        shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)]
        backdrop-blur-2xl
        transition-all duration-300 ease-out
        ${
          showTip && !expanded && !dragging
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0"
        }
      `}
    >
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D9B978]">
        {clientConfig.siteName} · App
      </div>

      <div className="text-[13px] font-medium leading-snug text-white/90">
        Install for instant, offline-ready access — no browser tab required.
      </div>

      <span className="absolute -bottom-[7px] right-6 h-3.5 w-3.5 rotate-45 border-b border-r border-white/[0.18] bg-indigo-950/80" />
    </div>

    {/* ============================================================
        PANEL
        ============================================================ */}
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        transform: `translateX(${dragX}px)`,
        transition: dragging
          ? "none"
          : "transform 340ms cubic-bezier(0.22, 1, 0.36, 1)",
        touchAction: "pan-y",
      }}
      className={`
        relative
        flex
        items-stretch
        overflow-visible
        rounded-l-[20px]
        border
        border-white/[0.18]
        border-r-0
        bg-gradient-to-b
        from-white/[0.14]
        to-white/[0.05]
        shadow-[0_25px_60px_-18px_rgba(0,0,0,0.55)]
        backdrop-blur-2xl

        ${expanded ? "pointer-events-auto" : "pointer-events-none"}
      `}
    >
      {/* Hairline sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-l-[20px] bg-gradient-to-r from-transparent via-[#F1DBA0]/60 to-transparent" />

      {/* ============================================================
          HANDLE
          ============================================================ */}
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        aria-label={
          expanded
            ? "Collapse install panel"
            : "Expand install panel"
        }
        aria-expanded={expanded}
        className={`
          group relative z-30
          flex w-[34px] shrink-0
          cursor-grab flex-col
          items-center justify-center
          gap-2.5
          border-r border-white/[0.16]
          py-4
          active:cursor-grabbing

          ${!expanded ? "pointer-events-auto" : "pointer-events-auto"}
        `}
      >
        <span className="pointer-events-none absolute inset-0 rounded-l-[20px] bg-[#F1DBA0]/0 transition-colors duration-300 group-hover:bg-[#F1DBA0]/[0.08]" />

        <span className="h-5 w-[2.5px] rounded-full bg-white/25 transition-colors group-hover:bg-white/45" />

        <span className="relative flex h-7 w-7 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[#F1DBA0]/15 blur-[6px]" />

          <InstallGlyph className="relative size-4" />
        </span>
      </button>

      {/* ============================================================
          REVEALED CONTENT
          ============================================================ */}
      <div
        className={`
          flex min-w-0 flex-1 flex-col
          transition-opacity duration-200
          ${expanded ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
      >
        {/* Header */}
        <div className="flex flex-1 items-center gap-3 px-4 py-3.5">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.16] bg-white/[0.08]">
            <span className="absolute inset-0 rounded-xl bg-[#F1DBA0]/[0.08]" />

            <InstallGlyph className="relative size-[18px]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#D9B978]">
              {clientConfig.siteName}
            </div>

            <div className="truncate text-[13px] font-medium tracking-tight text-white">
              Install the app
            </div>
          </div>

          {/* Collapse */}
          <button
            type="button"
            onClick={collapse}
            aria-label="Collapse to edge"
            className="
              shrink-0 rounded-full p-1.5
              text-white/40
              transition-colors
              hover:bg-white/[0.12]
              hover:text-white/85
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Benefits */}
        <div className="flex items-center gap-3 px-4 pb-3 text-[10.5px] text-white/60">
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-[#D9B978]" />
            Offline ready
          </span>

          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-[#D9B978]" />
            One-tap launch
          </span>
        </div>

        {/* Install CTA */}
        <button
          type="button"
          onClick={install}
          className="
            group relative flex items-center
            justify-center gap-1.5 overflow-hidden
            border-t border-white/[0.16]
            bg-gradient-to-r
            from-[#F1DBA0]
            to-[#C9A15C]
            py-3
            text-[12.5px]
            font-semibold
            tracking-tight
            text-[#141414]
            transition-transform
            active:scale-[0.98]
          "
        >
          <span
            className="
              pointer-events-none absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/40
              to-transparent
              transition-transform duration-700
              group-hover:translate-x-full
            "
          />

          <svg
            viewBox="0 0 24 24"
            className="relative size-3.5"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 5v9M12 14l-3.2-3.2M12 14l3.2-3.2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M5 19h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <span className="relative">
            Install now
          </span>
        </button>
      </div>
    </div>
  </div>
);
}