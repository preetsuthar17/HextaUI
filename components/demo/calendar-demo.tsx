"use client";

import * as React from "react";

import { Calendar } from "@/registry/new-york/ui/calendar";

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      captionLayout="dropdown"
      className="rounded-lg border shadow-xs"
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}
