"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Circle } from "lucide-react";


export type SelectOption<T extends string> = {
  label: string;
  value: T;
  disabled?: boolean;
};


type CustomSelectProps<T extends string> = {
  label?: string;
  value: T;
  callBackTrigger: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};


export default function CustomSelect<T extends string>({
  label,
  value,
  callBackTrigger,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);


  const selected = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );


  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };


    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);


  useEffect(() => {
    if (!open || !buttonRef.current) return;


    const updatePosition = () => {
      const rect = buttonRef.current!.getBoundingClientRect();
      const maxHeight = 280;
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < maxHeight && rect.top > spaceBelow;


      setMenuStyle({
        position: "fixed",
        left: rect.left,
        width: rect.width,
        top: openUp ? Math.max(8, rect.top - maxHeight - 10) : rect.bottom + 10,
        zIndex: 999999,
      });
    };


    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);


    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);


  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      {label ? <div className="mb-2 p-2 text-xs sm:text-sm font-medium text-white/85">{label}</div> : null}


      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={[
          "flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-3 sm:px-4 py-1.5 sm:py-2 text-left text-white outline-none transition",
          "hover:border-blue-500 hover:bg-black/50 focus:border-blue-500",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className={selected ? "truncate text-xs sm:text-sm text-white" : "truncate text-xs sm:text-sm text-white/35"}>
            {selected?.label ?? placeholder}
          </span>
        </span>


        <ChevronDown
          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-white/75 transition ${open ? "rotate-180" : ""}`}
        />
      </button>


      {mounted && open
        ? createPortal(
            <div
              role="listbox"
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-sm"
              style={menuStyle}
            >
              <div className="border-b border-white/10 px-3 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/85">
                Choose an option
              </div>


              <div className="max-h-64 overflow-auto p-1 sm:p-2">
                {options.map((opt) => {
                  const active = opt.value === value;


                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={active}
                      disabled={opt.disabled}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (opt.disabled) return;
                        callBackTrigger(opt.value);
                        setOpen(false);
                      }}
                      className={[
                        "flex w-full items-center justify-between rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm transition",
                        active
                          ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                          : "bg-white/5 text-white/85 hover:bg-white/10",
                        active ? "cursor-not-allowed pointer-events-none opacity-50" : "cursor-pointer",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-2">
                        <span>{opt.label}</span>
                        {active ? (
                          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-blue-300" />
                        ) : (
                          <span className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}