"use client";

import { TimeSelection } from "./time-selection";
import { useState } from "react";

export default function TimeSelectionBlock() {
  const [selectedTime, setSelectedTime] = useState({
    start: "",
    end: "",
    duration: 0,
  });

  const handleApply = (
    startTime: string,
    endTime: string,
    duration: number,
  ) => {
    setSelectedTime({ start: startTime, end: endTime, duration });
    // In a real app, you might save this to a backend or local state
  };

  const formatTime = (time: string): string => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hour12 =
      parseInt(hour) === 0
        ? 12
        : parseInt(hour) > 12
          ? parseInt(hour) - 12
          : parseInt(hour);
    const ampm = parseInt(hour) < 12 ? "AM" : "PM";
    return `${hour12}:${minute} ${ampm}`;
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`;
    } else {
      const days = Math.floor(minutes / 1440);
      const remainingHours = Math.floor((minutes % 1440) / 60);
      return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <TimeSelection
        title="Schedule Time"
        startTime="09:00"
        endTime="17:00"
        onApply={handleApply}
        onCancel={() => console.log("Cancelled")}
        showDuration={true}
        allowQuickSelect={true}
      />

      {selectedTime.start && selectedTime.end && (
        <div className="p-4 bg-accent rounded-ele border border-border">
          <h4 className="font-medium mb-2">Selected Time Range:</h4>
          <p className="text-sm text-muted-foreground">
            From {formatTime(selectedTime.start)} to{" "}
            {formatTime(selectedTime.end)}
          </p>
          <p className="text-sm text-muted-foreground">
            Duration: {formatDuration(selectedTime.duration)}
          </p>
        </div>
      )}
    </div>
  );
}
