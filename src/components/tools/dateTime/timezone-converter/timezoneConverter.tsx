import TimezoneConverterClient from "./timezoneClient";
import { Suspense } from "react";

export default function TimezoneConverter(props: any) {
  return (
    <Suspense fallback={null}>
      <TimezoneConverterClient />
    </Suspense>
  )
}