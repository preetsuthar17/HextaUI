"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const calendarVariants = cva(
  "inline-block space-y-4 rounded-ele border border-border bg-background relative w-full max-w-sm mx-auto shadow-sm/2",
  {
    variants: {
      size: {
        sm: "p-2 sm:p-3 text-sm",
        default: "p-3 sm:p-4",
        lg: "p-4 sm:p-5 text-base",
      },
      alwaysOnTop: {
        true: "z-9999",
        false: "z-10",
      },
    },
    defaultVariants: {
      size: "default",
      alwaysOnTop: true,
    },
  },
);

const dayVariants = cva(
  "inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-ele text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring font-semibold",
        today:
          "bg-accent text-accent-foreground font-semibold hover:bg-accent/80 focus-visible:ring-ring",
        outside:
          "text-muted-foreground opacity-50 hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
        "range-start":
          "bg-primary text-primary-foreground rounded-r-none hover:bg-primary/90 focus-visible:ring-ring",
        "range-end":
          "bg-primary text-primary-foreground rounded-l-none hover:bg-primary/90 focus-visible:ring-ring",
        "range-middle":
          "bg-primary/20 text-foreground rounded-none hover:bg-primary/30 focus-visible:ring-ring",
      },
      size: {
        sm: "h-6 w-6 sm:h-7 sm:w-7 text-xs",
        default: "h-8 w-8 sm:h-9 sm:w-9 text-sm",
        lg: "h-9 w-9 sm:h-10 sm:w-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface CalendarProps extends VariantProps<typeof calendarVariants> {
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  locale?: string;
  className?: string;
  showOutsideDays?: boolean;
  minDate?: Date;
  maxDate?: Date;
  mode?: "single" | "multiple" | "range";
  selectedDates?: Date[];
  selectedRange?: { from: Date; to?: Date };
  onSelectMultiple?: (dates: Date[]) => void;
  onSelectRange?: (range: { from: Date; to?: Date }) => void;
  showMonthYearPickers?: boolean;
  alwaysOnTop?: boolean;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar({
  selected,
  onSelect,
  disabled,
  locale = "en-US",
  className,
  size,
  showOutsideDays = true,
  minDate,
  maxDate,
  mode = "single",
  selectedDates = [],
  selectedRange,
  onSelectMultiple,
  onSelectRange,
  showMonthYearPickers = false,
  alwaysOnTop = true,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(selected || new Date());
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [direction, setDirection] = React.useState<"left" | "right">("right");
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate year range for year picker (current year ± 50 years)
  const yearRange = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  // Get first day of the month and calculate calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Calculate previous month days to show
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const prevMonthDays = Array.from(
    { length: firstDayOfWeek },
    (_, i) => prevMonthLastDay - firstDayOfWeek + i + 1,
  );

  // Calculate next month days to show
  const totalCells = 42; // 6 rows × 7 days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const remainingCells =
    totalCells - prevMonthDays.length - currentMonthDays.length;
  const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => i + 1);
  const navigateMonth = (direction: "prev" | "next") => {
    setIsAnimating(true);
    setDirection(direction === "prev" ? "left" : "right");

    setTimeout(() => {
      const newDate = new Date(currentDate);
      if (direction === "prev") {
        newDate.setMonth(currentMonth - 1);
      } else {
        newDate.setMonth(currentMonth + 1);
      }
      setCurrentDate(newDate);
      setIsAnimating(false);
    }, 150);
  };

  const handleMonthChange = (month: string) => {
    const monthIndex = parseInt(month, 10);
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const yearValue = parseInt(year, 10);
    const newDate = new Date(currentDate);
    newDate.setFullYear(yearValue);
    setCurrentDate(newDate);
  };

  const isDateDisabled = (date: Date) => {
    if (disabled?.(date)) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };
  const isDateSelected = (date: Date) => {
    if (mode === "single") {
      return selected && isSameDay(date, selected);
    }
    if (mode === "multiple") {
      return selectedDates.some((d) => isSameDay(d, date));
    }
    if (mode === "range" && selectedRange) {
      if (!selectedRange.to) {
        // Only from date is selected
        return isSameDay(date, selectedRange.from);
      }
      const dateTime = date.getTime();
      const fromTime = selectedRange.from.getTime();
      const toTime = selectedRange.to.getTime();
      return dateTime >= fromTime && dateTime <= toTime;
    }
    return false;
  };

  const isDateInRange = (date: Date) => {
    if (mode === "range" && selectedRange) {
      if (!selectedRange.to) return isSameDay(date, selectedRange.from);
      const dateTime = date.getTime();
      const fromTime = selectedRange.from.getTime();
      const toTime = selectedRange.to.getTime();
      return dateTime > fromTime && dateTime < toTime;
    }
    return false;
  };

  const isRangeStart = (date: Date) => {
    if (mode === "range" && selectedRange) {
      return isSameDay(date, selectedRange.from);
    }
    return false;
  };

  const isRangeEnd = (date: Date) => {
    if (mode === "range" && selectedRange && selectedRange.to) {
      return isSameDay(date, selectedRange.to);
    }
    return false;
  };

  const isToday = (date: Date) => isSameDay(date, today);

  const handleDateClick = (day: number, monthOffset: number = 0) => {
    const clickedDate = new Date(currentYear, currentMonth + monthOffset, day);

    if (isDateDisabled(clickedDate)) return;

    if (mode === "single") {
      onSelect?.(clickedDate);
    } else if (mode === "multiple") {
      const newDates = selectedDates.some((d) => isSameDay(d, clickedDate))
        ? selectedDates.filter((d) => !isSameDay(d, clickedDate))
        : [...selectedDates, clickedDate];
      onSelectMultiple?.(newDates);
    } else if (mode === "range") {
      if (!selectedRange || (selectedRange.from && selectedRange.to)) {
        // Start new range selection - only set the 'from' date
        onSelectRange?.({ from: clickedDate });
      } else if (selectedRange.from && !selectedRange.to) {
        // Complete the range selection
        const from =
          selectedRange.from <= clickedDate ? selectedRange.from : clickedDate;
        const to =
          selectedRange.from <= clickedDate ? clickedDate : selectedRange.from;
        onSelectRange?.({ from, to });
      }
    }
  };
  const getDayVariant = (
    day: number,
    monthOffset: number = 0,
  ):
    | "default"
    | "selected"
    | "today"
    | "outside"
    | "disabled"
    | "range-start"
    | "range-end"
    | "range-middle" => {
    const date = new Date(currentYear, currentMonth + monthOffset, day);

    if (isDateDisabled(date)) return "disabled";
    if (mode === "range" && selectedRange) {
      if (isRangeStart(date)) return "range-start";
      if (isRangeEnd(date)) return "range-end";
      if (isDateInRange(date)) return "range-middle";
    }
    if (isDateSelected(date)) return "selected";
    if (isToday(date)) return "today";
    if (monthOffset !== 0) return "outside";
    return "default";
  };

  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      zIndex: 0,
      x: direction === "right" ? -300 : 300,
      opacity: 0,
    }),
  };
  return (
    <div
      className={cn(calendarVariants({ size, alwaysOnTop }), className)}
      {...props}
    >
      {" "}
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth("prev")}
          className="inline-flex items-center justify-center rounded-ele p-1 sm:p-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isAnimating}
        >
          <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" />
        </button>

        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1 justify-center">
          {showMonthYearPickers ? (
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
              <Select
                value={currentMonth.toString()}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger
                  className="w-[100px] sm:w-[120px] h-7 sm:h-8 text-xs sm:text-sm"
                  size="sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      <span className="hidden sm:inline">{month}</span>
                      <span className="sm:hidden">{month.slice(0, 3)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={currentYear.toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger
                  className="w-[70px] sm:w-[80px] h-7 sm:h-8 text-xs sm:text-sm"
                  size="sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearRange.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <motion.h2
              key={`${currentMonth}-${currentYear}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base sm:text-lg font-semibold text-foreground text-center px-2"
            >
              <span className="hidden sm:inline">
                {MONTHS[currentMonth]} {currentYear}
              </span>
              <span className="sm:hidden">
                {MONTHS[currentMonth].slice(0, 3)} {currentYear}
              </span>
            </motion.h2>
          )}
        </div>

        <button
          onClick={() => navigateMonth("next")}
          className="inline-flex items-center justify-center rounded-ele p-1 sm:p-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={isAnimating}
        >
          <ChevronRight className="h-4 w-4 rtl:-scale-x-100" />
        </button>
      </div>
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center h-7 sm:h-8 text-xs text-muted-foreground"
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.slice(0, 1)}</span>
          </div>
        ))}
      </div>
      {/* Calendar grid */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${currentMonth}-${currentYear}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 500, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="grid grid-cols-7 gap-0.5 sm:gap-1"
          >
            {/* Previous month days */}
            {showOutsideDays &&
              prevMonthDays.map((day) => (
                <button
                  key={`prev-${day}`}
                  onClick={() => handleDateClick(day, -1)}
                  className={cn(
                    dayVariants({ variant: getDayVariant(day, -1), size }),
                  )}
                  disabled={isDateDisabled(
                    new Date(currentYear, currentMonth - 1, day),
                  )}
                >
                  {day}
                </button>
              ))}

            {/* Current month days */}
            {currentMonthDays.map((day) => (
              <button
                key={`current-${day}`}
                onClick={() => handleDateClick(day)}
                className={cn(
                  dayVariants({ variant: getDayVariant(day), size }),
                )}
                disabled={isDateDisabled(
                  new Date(currentYear, currentMonth, day),
                )}
              >
                {day}
              </button>
            ))}

            {/* Next month days */}
            {showOutsideDays &&
              nextMonthDays.map((day) => (
                <button
                  key={`next-${day}`}
                  onClick={() => handleDateClick(day, 1)}
                  className={cn(
                    dayVariants({ variant: getDayVariant(day, 1), size }),
                  )}
                  disabled={isDateDisabled(
                    new Date(currentYear, currentMonth + 1, day),
                  )}
                >
                  {day}
                </button>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper function to check if two dates are the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export { Calendar, calendarVariants, dayVariants, type CalendarProps };
