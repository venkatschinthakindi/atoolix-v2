"use client";

import { Combobox } from "@headlessui/react";

type UnitOption = {
  abbr: string;
  name: string;
};

type Props = {
  value: string | null;
  onChange: (val: string) => void;
  setQuery: (val: string) => void;
  options: UnitOption[];
  placeholder: string;
};

export function UnitCombobox({
  value,
  onChange,
  setQuery,
  options,
  placeholder,
}: Props) {
  return (
    <Combobox value={value} onChange={(val) => onChange(val as string)}>
      <div className="relative flex-1">
        <Combobox.Input
          className="w-full px-3 py-2 rounded-md bg-black/40 text-white"
          displayValue={(u: string) => u}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
        />

        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 text-white shadow-lg z-10">
          {options.map((u) => (
            <Combobox.Option
              key={u.abbr}
              value={u.abbr}
              className="cursor-pointer px-3 py-2 hover:bg-blue-600"
            >
              {u.abbr} — {u.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}