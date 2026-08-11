"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

export interface TimezoneOption {
  value: string;
  label: string;
  city: string;
  country: string;
  abbreviation: string;
  offset: string;
}

interface Props {
  value: string;
  options: TimezoneOption[];
  placeholder?: string;
  onChange(value: string): void;
  className?: string;
}

function normalize(str: string) {
  return str.toLowerCase().replace(/_/g, " ");
}

function score(option: TimezoneOption, query: string) {
  const q = normalize(query);

  const zone = normalize(option.value);
  const city = normalize(option.city);
  const country = normalize(option.country);
  const abbr = normalize(option.abbreviation);
  const offset = normalize(option.offset);

  if (city === q) return 0;
  if (abbr === q) return 1;
  if (zone === q) return 2;
  if (country === q) return 3;

  if (city.startsWith(q)) return 4;
  if (abbr.startsWith(q)) return 5;
  if (country.startsWith(q)) return 6;
  if (zone.startsWith(q)) return 7;

  if (city.includes(q)) return 8;
  if (abbr.includes(q)) return 9;
  if (country.includes(q)) return 10;
  if (offset.includes(q)) return 11;
  if (zone.includes(q)) return 12;

  return 100;
}

function Highlight({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  if (!query) return <>{text}</>;

  const lower = text.toLowerCase();
  const q = query.toLowerCase();

  const index = lower.indexOf(q);

  if (index === -1)
    return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="bg-amber-400/30 rounded px-0.5">
        {text.slice(index, index + query.length)}
      </span>
      {text.slice(index + query.length)}
    </>
  );
}

export default function TimezoneSelect({
  value,
  options,
  placeholder = "Search timezone...",
  onChange,
  className = "",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [active, setActive] = useState(-1);

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", outside);

    return () =>
      document.removeEventListener(
        "mousedown",
        outside
      );
  }, []);
    const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  useEffect(() => {
    if (!open) {
      setSearch(
          selected
              ? `${selected.city}, ${selected.country}`
              : ""
      );
      setActive(-1);
    }
  }, [open, selected]);

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return [...options]
        .sort((a, b) => a.label.localeCompare(b.label))
        .slice(0, 100);
    }

    return [...options]
      .map((o) => ({
        option: o,
        rank: score(o, search),
      }))
      .filter((x) => x.rank < 100)
      .sort((a, b) => {
        if (a.rank !== b.rank) return a.rank - b.rank;
        return a.option.label.localeCompare(b.option.label);
      })
      .map((x) => x.option)
      .slice(0, 50);
  }, [options, search]);

  function select(option: TimezoneOption) {
    onChange(option.value);
    setSearch(option.label);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setOpen(true);
        setActive((i) =>
          Math.min(filtered.length - 1, i + 1)
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;

      case "Enter":
        if (!open) {
          setOpen(true);
          return;
        }

        e.preventDefault();

        if (filtered[active]) {
          select(filtered[active]);
        }

        break;

      case "Escape":
        setOpen(false);
        break;
    }
  }
    return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
    >
      <input
        ref={inputRef}
        type="text"
        value={
          open
              ? search
              : selected
                  ? `${selected.city}, ${selected.country}`
                  : ""
        }
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => {
        setOpen(true);
        setSearch(
            selected
                ? `${selected.city}, ${selected.country}`
                : ""
        );
        }}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onKeyDown={onKeyDown}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-white outline-none focus:border-white/30"
      />

      {open && (
        <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 shadow-xl scrollbar-thin">
          {filtered.length === 0 && (
            <div className="px-3 py-2 text-sm text-zinc-400">
              No timezone found
            </div>
          )}

          {filtered.map((option, index) => {
            const city = option.city;
            const country = option.country;

            return (
              <button
                key={option.value}
                type="button"
                onMouseEnter={() => setActive(index)}
                onMouseDown={(e) => {
                    e.preventDefault();
                    select(option);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left transition ${
                  active === index
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-white">
                    <Highlight text={city} query={search} />
                  </div>

                  <div className="text-xs text-zinc-400">
                    <Highlight text={country} query={search} />
                    {" • "}
                    {option.abbreviation}
                    {" • UTC"}
                    {option.offset}
                  </div>

                  <div className="truncate text-[11px] text-zinc-500">
                    {option.value}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}