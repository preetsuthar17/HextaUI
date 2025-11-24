"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/new-york/ui/button";
import { Calendar } from "@/registry/new-york/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-[250px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          data-empty={!date}
          variant="outline"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" onSelect={setDate} selected={date} />
      </PopoverContent>
    </Popover>
  );
}
