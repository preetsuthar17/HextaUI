"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import ReactDOM from "react-dom";

const datePickerVariants = cva(
  "inline-flex h-9 w-full items-center justify-between rounded-ele border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border border-border bg-input",
  {
    variants: {
      variant: {
        default: "  ",
        outline: "border-2  ",
        ghost: "border-transparent hover:border-border",
      },
      size: {
        sm: "h-7 sm:h-8 px-2 text-xs",
        default: "h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm",
        lg: "h-12 sm:h-10 px-3 sm:px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface DatePickerProps extends VariantProps<typeof datePickerVariants> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  showIcon?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: (date: Date) => boolean;
  locale?: string;
  formatDate?: (date: Date) => string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
  showIcon = true,
  minDate,
  maxDate,
  disabledDates,
  locale = "en-US",
  formatDate,
  variant,
  size,
  ...props
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedDate, setFocusedDate] = React.useState(value || new Date());
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = React.useState<
    Element | DocumentFragment | null
  >(null);

  React.useEffect(() => {
    // Set portal container on client side only
    if (typeof document !== "undefined") {
      setPortalContainer(
        document.getElementById("portal-root") || document.body,
      );
    }
  }, []);

  const defaultFormatDate = (date: Date) => {
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateFn = formatDate || defaultFormatDate;

  const handleSelect = (date: Date) => {
    onChange?.(date);
    setIsOpen(false);
  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggleOpen();
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && typeof document !== "undefined") {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeof document === "undefined") return;

      const target = event.target as Node;
      const isClickInsideContainer =
        containerRef.current && containerRef.current.contains(target);

      // Check if click is inside any calendar popup using the data attribute
      const calendarElement = document.querySelector(
        '[data-datepicker-calendar="true"]',
      );
      const isClickInsideCalendar = calendarElement?.contains(target);

      if (!isClickInsideContainer && !isClickInsideCalendar) {
        setIsOpen(false);
      }
    };

    if (isOpen && typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const portalRoot = document.getElementById("portal-root");
      if (!portalRoot) {
        const newPortalRoot = document.createElement("div");
        newPortalRoot.id = "portal-root";
        newPortalRoot.style.position = "relative";
        newPortalRoot.style.zIndex = "9999";
        document.body.appendChild(newPortalRoot);
      }
    }
  }, []);

  const [calendarPosition, setCalendarPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });

  React.useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: rect.bottom + 8, // 8px margin
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const calendarComponent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="z-[9999] rounded-ele border border-border bg-background "
          data-datepicker-calendar="true"
          style={{
            position: "fixed",
            top: calendarPosition.top,
            left: calendarPosition.left,
            width: calendarPosition.width,
          }}
        >
          <Calendar
            selected={value}
            onSelect={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabledDates}
            locale={locale}
            alwaysOnTop={true}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative" ref={containerRef} {...props}>
      <Button
        type="button"
        onClick={handleToggleOpen}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(datePickerVariants({ variant, size }), className)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Choose date"
      >
        <span className="flex items-center gap-2">
          {showIcon && <CalendarIcon className="h-4 w-4 opacity-50" />}
          <span className={cn(!value && "text-muted-foreground")}>
            {value ? formatDateFn(value) : placeholder}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      {portalContainer &&
        ReactDOM.createPortal(calendarComponent, portalContainer)}
    </div>
  );
}

// Date Range Picker Component
interface DateRangePickerProps
  extends Omit<DatePickerProps, "value" | "onChange"> {
  value?: { from: Date; to?: Date };
  onChange?: (range: { from: Date; to?: Date } | undefined) => void;
  placeholder?: string;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  className,
  disabled = false,
  showIcon = true,
  minDate,
  maxDate,
  disabledDates,
  locale = "en-US",
  formatDate,
  variant,
  size,
  ...props
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [calendarPosition, setCalendarPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const defaultFormatDate = (date: Date) => {
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateFn = formatDate || defaultFormatDate;

  const handleSelect = (range: { from: Date; to?: Date }) => {
    onChange?.(range);
    if (range.from && range.to) {
      setIsOpen(false);
    }
  };

  const formatRange = (range: { from: Date; to?: Date }) => {
    if (!range.from) return "";
    if (!range.to) return formatDateFn(range.from);
    return `${formatDateFn(range.from)} - ${formatDateFn(range.to)}`;
  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggleOpen();
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Body scroll lock effect
  React.useEffect(() => {
    if (isOpen && typeof document !== "undefined") {
      // Store original overflow
      const originalOverflow = document.body.style.overflow;
      // Disable scrolling
      document.body.style.overflow = "hidden";

      return () => {
        // Restore original overflow when component unmounts or closes
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeof document === "undefined") return;

      const target = event.target as Node;
      const isClickInsideContainer =
        containerRef.current && containerRef.current.contains(target);

      // Check if click is inside any calendar popup using the data attribute
      const calendarElement = document.querySelector(
        '[data-datepicker-calendar="true"]',
      );
      const isClickInsideCalendar = calendarElement?.contains(target);

      if (!isClickInsideContainer && !isClickInsideCalendar) {
        setIsOpen(false);
      }
    };

    if (isOpen && typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const portalRoot = document.getElementById("portal-root");
      if (!portalRoot) {
        const newPortalRoot = document.createElement("div");
        newPortalRoot.id = "portal-root";
        newPortalRoot.style.position = "relative";
        newPortalRoot.style.zIndex = "9999";
        document.body.appendChild(newPortalRoot);
      }
    }
  }, []);

  React.useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: rect.bottom + 8, // 8px margin
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef} {...props}>
      <button
        type="button"
        onClick={handleToggleOpen}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(datePickerVariants({ variant, size }), className)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Choose date range"
      >
        <span className="flex items-center gap-2">
          {showIcon && <CalendarIcon className="h-4 w-4 opacity-50" />}
          <span className={cn(!value && "text-muted-foreground")}>
            {value ? formatRange(value) : placeholder}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="z-[9999] rounded-ele border border-border bg-background "
                data-datepicker-calendar="true"
                style={{
                  position: "fixed",
                  top: calendarPosition.top,
                  left: calendarPosition.left,
                  width: calendarPosition.width,
                }}
              >
                <Calendar
                  mode="range"
                  selectedRange={value}
                  onSelectRange={handleSelect}
                  minDate={minDate}
                  maxDate={maxDate}
                  disabled={disabledDates}
                  locale={locale}
                  alwaysOnTop={true}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.getElementById("portal-root") || document.body,
        )}
    </div>
  );
}

export { datePickerVariants, type DatePickerProps, type DateRangePickerProps };
