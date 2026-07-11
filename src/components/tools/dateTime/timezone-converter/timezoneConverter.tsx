'use client';

import TimezoneConverterClient from "@/components/tools/dateTime/timezone-converter/timezoneClient";
// import { Suspense } from "react";
// import ToolLoader from "@/components/tools/ToolLoader";

export default function TimezoneConverter(props: any) {
  return (
    // <Suspense fallback={<ToolLoader />}>
      <TimezoneConverterClient />
    // </Suspense>
  )
}