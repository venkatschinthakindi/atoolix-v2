"use client";

import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

export default function FlowDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextValue: string) => void;
}) {
  const [valueLoc, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
    });

  return (
    <Datepicker
      asSingle={true}
      useRange={false}
      value={valueLoc}
      onChange={(newValue) => setValue(newValue)}
      inputClassName="w-full cursor-pointer rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none transition focus:border-blue-400/40"
      containerClassName="w-full"
      toggleClassName="text-white/60 hover:text-white"
      placeholder="Select date"
    />
  );
}