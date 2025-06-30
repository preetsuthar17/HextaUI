"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const timeSelectionVariants = cva("relative w-full max-w-md mx-auto", {
  variants: {
    variant: {
      default: "",
      compact: "max-w-sm",
      expanded: "max-w-lg",
    },
    size: {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface TimeOption {
  value: string;
  label: string;
}

interface QuickDuration {
  value: number; // in minutes
  label: string;
  unit: "minutes" | "hours" | "days";
}

const timeOptions: TimeOption[] = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const ampm = hour < 12 ? "AM" : "PM";
  const value = `${hour.toString().padStart(2, "0")}:${minute}`;
  const label = `${hour12}:${minute} ${ampm}`;
  return { value, label };
});

const quickDurations: QuickDuration[] = [
  { value: 30, label: "30m", unit: "minutes" },
  { value: 60, label: "1h", unit: "hours" },
  { value: 120, label: "2h", unit: "hours" },
  { value: 240, label: "4h", unit: "hours" },
  { value: 480, label: "8h", unit: "hours" },
  { value: 1440, label: "1 day", unit: "days" },
  { value: 2880, label: "2 days", unit: "days" },
  { value: 10080, label: "1 week", unit: "days" },
];

export interface TimeSelectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timeSelectionVariants> {
  startTime?: string;
  endTime?: string;
  onTimeChange?: (startTime: string, endTime: string, duration: number) => void;
  onCancel?: () => void;
  onApply?: (startTime: string, endTime: string, duration: number) => void;
  showDuration?: boolean;
  allowQuickSelect?: boolean;
  title?: string;
}

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

const calculateDuration = (startTime: string, endTime: string): number => {
  if (!startTime || !endTime) return 0;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMinute;
  let endMinutes = endHour * 60 + endMinute;

  // Handle overnight duration
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60; // Add 24 hours
  }

  return endMinutes - startMinutes;
};

const addMinutesToTime = (time: string, minutes: number): string => {
  if (!time) return "";

  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + minute + minutes;

  const newHour = Math.floor(totalMinutes / 60) % 24;
  const newMinute = totalMinutes % 60;

  return `${newHour.toString().padStart(2, "0")}:${newMinute
    .toString()
    .padStart(2, "0")}`;
};

const TimeSelection = React.forwardRef<HTMLDivElement, TimeSelectionProps>(
  (
    {
      className,
      variant,
      size,
      startTime = "",
      endTime = "",
      onTimeChange,
      onCancel,
      onApply,
      showDuration = true,
      allowQuickSelect = true,
      title = "Select Time Range",
      ...props
    },
    ref,
  ) => {
    const [internalStartTime, setInternalStartTime] = React.useState(startTime);
    const [internalEndTime, setInternalEndTime] = React.useState(endTime);
    const [selectedQuickDuration, setSelectedQuickDuration] = React.useState<
      number | null
    >(null);

    const duration = React.useMemo(
      () => calculateDuration(internalStartTime, internalEndTime),
      [internalStartTime, internalEndTime],
    );

    const handleStartTimeChange = (time: string) => {
      setInternalStartTime(time);
      setSelectedQuickDuration(null);

      // Auto-adjust end time if it's before start time
      if (internalEndTime && calculateDuration(time, internalEndTime) <= 0) {
        const newEndTime = addMinutesToTime(time, 60); // Add 1 hour
        setInternalEndTime(newEndTime);
        onTimeChange?.(time, newEndTime, 60);
      } else {
        onTimeChange?.(
          time,
          internalEndTime,
          calculateDuration(time, internalEndTime),
        );
      }
    };

    const handleEndTimeChange = (time: string) => {
      setInternalEndTime(time);
      setSelectedQuickDuration(null);
      onTimeChange?.(
        internalStartTime,
        time,
        calculateDuration(internalStartTime, time),
      );
    };

    const handleQuickDurationSelect = (durationMinutes: number) => {
      setSelectedQuickDuration(durationMinutes);

      if (internalStartTime) {
        const newEndTime = addMinutesToTime(internalStartTime, durationMinutes);
        setInternalEndTime(newEndTime);
        onTimeChange?.(internalStartTime, newEndTime, durationMinutes);
      } else {
        // Set default start time if none selected
        const defaultStart = "09:00";
        const newEndTime = addMinutesToTime(defaultStart, durationMinutes);
        setInternalStartTime(defaultStart);
        setInternalEndTime(newEndTime);
        onTimeChange?.(defaultStart, newEndTime, durationMinutes);
      }
    };

    const handleCancel = () => {
      setInternalStartTime(startTime);
      setInternalEndTime(endTime);
      setSelectedQuickDuration(null);
      onCancel?.();
    };

    const handleApply = () => {
      onApply?.(internalStartTime, internalEndTime, duration);
    };

    return (
      <div
        ref={ref}
        className={cn(timeSelectionVariants({ variant, size }), className)}
        {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 ">
              <Clock className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col">
            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <Label htmlFor="start-time" className="text-sm font-medium">
                  Start Time
                </Label>
                <Select
                  value={internalStartTime}
                  onValueChange={handleStartTimeChange}
                >
                  <SelectTrigger
                    id="start-time"
                    icon={Clock}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="end-time" className="text-sm font-medium">
                  End Time
                </Label>
                <Select
                  value={internalEndTime}
                  onValueChange={handleEndTimeChange}
                >
                  <SelectTrigger id="end-time" icon={Clock} className="w-full">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Duration Selection */}
            {allowQuickSelect && (
              <div className="flex flex-col gap-4">
                <Label className="text-sm font-medium">Quick Duration</Label>
                <div className="flex flex-wrap gap-2">
                  {quickDurations.map((quickDuration) => (
                    <Toggle
                      key={quickDuration.value}
                      variant="outline"
                      size="sm"
                      pressed={selectedQuickDuration === quickDuration.value}
                      onPressedChange={(pressed) => {
                        if (pressed) {
                          handleQuickDurationSelect(quickDuration.value);
                        } else {
                          setSelectedQuickDuration(null);
                        }
                      }}
                    >
                      {quickDuration.label}
                    </Toggle>
                  ))}
                </div>
              </div>
            )}

            {/* Duration Display */}
            {showDuration && internalStartTime && internalEndTime && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 bg-accent rounded-ele border border-border flex flex-col gap-2 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {formatDuration(duration)}
                    </span>
                  </div>

                  {duration > 0 && (
                    <div className="text-xs text-muted-foreground">
                      From{" "}
                      {
                        timeOptions.find((t) => t.value === internalStartTime)
                          ?.label
                      }{" "}
                      to{" "}
                      {
                        timeOptions.find((t) => t.value === internalEndTime)
                          ?.label
                      }
                      {duration >= 1440 && " (next day)"}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
                leftIcon={<X className="h-4 w-4" />}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1"
                disabled={
                  !internalStartTime || !internalEndTime || duration <= 0
                }
              >
                Apply
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
);

TimeSelection.displayName = "TimeSelection";

export {
  TimeSelection,
  timeSelectionVariants,
  formatDuration,
  calculateDuration,
};
