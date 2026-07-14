'use client';

import MeetingTimeFinderClient from "@/components/tools/dateTime/meeting-time-finder/meetingTimeFinderClient";

// import { Suspense } from "react";
// import ToolLoader from "@/components/tools/ToolLoader";

export default function MeetingTimeFinder(props: any) {
  return (
    // <Suspense fallback={<ToolLoader />}>
      <MeetingTimeFinderClient />
    // </Suspense>
  )
}