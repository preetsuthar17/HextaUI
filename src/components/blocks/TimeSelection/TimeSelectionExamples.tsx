"use client";

import { TimeSelection } from "./time-selection";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BasicTimeSelectionExample() {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [duration, setDuration] = useState(480);

  const handleTimeChange = (start: string, end: string, dur: number) => {
    setStartTime(start);
    setEndTime(end);
    setDuration(dur);
  };

  const handleApply = (start: string, end: string, dur: number) => {
    console.log("Applied:", { start, end, duration: dur });
    alert(
      `Time range applied: ${start} - ${end} (${Math.floor(dur / 60)}h ${
        dur % 60
      }m)`,
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card variant={"default"} className="space-y-3">
        <CardContent>
          <TimeSelection
            startTime={startTime}
            endTime={endTime}
            onTimeChange={handleTimeChange}
            onApply={handleApply}
            onCancel={() => console.log("Cancelled")}
          />
        </CardContent>
      </Card>

      <Card variant={"default"}>
        <CardHeader>
          <CardTitle>Current Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-4">
            <Badge variant="outline">Start: {startTime}</Badge>
            <Badge variant="outline">End: {endTime}</Badge>
            <Badge variant="secondary">
              Duration: {Math.floor(duration / 60)}h {duration % 60}m
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DisabledQuickSelectExample() {
  return (
    <div className="w-full max-w-md mx-auto">
      <TimeSelection
        title="Precise Time Selection"
        allowQuickSelect={false}
        showDuration={true}
        onApply={(start, end, duration) => {
          console.log("Precise time set:", { start, end, duration });
        }}
      />
    </div>
  );
}
