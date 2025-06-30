"use client";

import * as React from "react";
import { Calendar } from "./index";

// Example components for documentation
export function BasicCalendarExample() {
  const [date, setDate] = React.useState<Date>();

  return <Calendar selected={date} onSelect={setDate} />;
}

export function CalendarDisabledDatesExample() {
  const [date, setDate] = React.useState<Date>();

  const disableWeekends = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6; // Disable weekends
  };

  return (
    <Calendar selected={date} onSelect={setDate} disabled={disableWeekends} />
  );
}

export function CalendarWithLimitsExample() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Calendar
      selected={date}
      onSelect={setDate}
      minDate={new Date()}
      maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
    />
  );
}

export function CalendarRangeExample() {
  const [range, setRange] = React.useState<{ from: Date; to?: Date }>();

  return (
    <Calendar mode="range" selectedRange={range} onSelectRange={setRange} />
  );
}

export function CalendarMultipleExample() {
  const [dates, setDates] = React.useState<Date[]>([]);

  return (
    <Calendar
      mode="multiple"
      selectedDates={dates}
      onSelectMultiple={setDates}
    />
  );
}

export function CalendarWithSelectorsExample() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Calendar selected={date} onSelect={setDate} showMonthYearPickers={true} />
  );
}

// Calendar with different sizes
export function CalendarSizesExample() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Small Calendar</h4>
        <Calendar selected={date} onSelect={setDate} size="sm" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Default Calendar</h4>
        <Calendar selected={date} onSelect={setDate} size="default" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large Calendar</h4>
        <Calendar selected={date} onSelect={setDate} size="lg" />
      </div>
    </div>
  );
}

// Booking system calendar with blocked dates
export function BookingCalendarExample() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  // Mock booked dates (in a real app, this would come from your API)
  const bookedDates = [
    new Date(2025, 5, 15), // June 15, 2025
    new Date(2025, 5, 16), // June 16, 2025
    new Date(2025, 5, 20), // June 20, 2025
    new Date(2025, 5, 25), // June 25, 2025
  ];

  const isDateBooked = (date: Date) => {
    return bookedDates.some(
      (bookedDate) => date.toDateString() === bookedDate.toDateString(),
    );
  };

  const disableBookedDates = (date: Date) => {
    // Disable past dates and booked dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isDateBooked(date);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Hotel Booking Calendar</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Select an available date for your reservation. Grayed out dates are
          unavailable.
        </p>
      </div>
      <Calendar
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={disableBookedDates}
        minDate={new Date()}
        size={"sm"}
        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6))}
      />
      {selectedDate && (
        <p className="text-sm text-green-600">
          ✓ Selected: {selectedDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

// Vacation planner with range selection
export function VacationPlannerExample() {
  const [vacationRange, setVacationRange] = React.useState<{
    from: Date;
    to?: Date;
  }>();

  const calculateDays = () => {
    if (vacationRange?.from && vacationRange?.to) {
      const diffTime = Math.abs(
        vacationRange.to.getTime() - vacationRange.from.getTime(),
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Plan Your Vacation</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Select your vacation start and end dates
        </p>
      </div>
      <Calendar
        mode="range"
        selectedRange={vacationRange}
        onSelectRange={setVacationRange}
        minDate={new Date()}
        showMonthYearPickers={true}
      />
      {vacationRange?.from && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm">
            <strong>Vacation Start:</strong>{" "}
            {vacationRange.from.toLocaleDateString()}
          </p>
          {vacationRange.to && (
            <>
              <p className="text-sm">
                <strong>Vacation End:</strong>{" "}
                {vacationRange.to.toLocaleDateString()}
              </p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Total Days: {calculateDays()}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Task scheduler with multiple dates
export function TaskSchedulerExample() {
  const [taskDates, setTaskDates] = React.useState<Date[]>([]);

  const handleDateToggle = (dates: Date[]) => {
    setTaskDates(dates);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Schedule Tasks</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Select multiple dates for recurring tasks
        </p>
      </div>
      <Calendar
        mode="multiple"
        selectedDates={taskDates}
        onSelectMultiple={handleDateToggle}
        minDate={new Date()}
      />
      {taskDates.length > 0 && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm font-medium mb-2">Scheduled Task Dates:</p>
          <div className="space-y-1">
            {taskDates.map((date, index) => (
              <p
                key={index}
                className="text-xs text-green-700 dark:text-green-300"
              >
                •{" "}
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            ))}
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
            Total: {taskDates.length} date{taskDates.length !== 1 ? "s" : ""}{" "}
            selected
          </p>
        </div>
      )}
    </div>
  );
}

// Event calendar with custom disabled logic
export function EventCalendarExample() {
  const [eventDate, setEventDate] = React.useState<Date>();

  // Mock events data
  const events = [
    { date: new Date(2025, 5, 12), title: "Team Meeting" },
    { date: new Date(2025, 5, 18), title: "Product Launch" },
    { date: new Date(2025, 5, 24), title: "Conference" },
  ];

  const hasEvent = (date: Date) => {
    return events.some(
      (event) => date.toDateString() === event.date.toDateString(),
    );
  };

  const disableEventDays = (date: Date) => {
    // Only allow selection of dates that have events
    return !hasEvent(date);
  };

  const getEventForDate = (date: Date) => {
    return events.find(
      (event) => date.toDateString() === event.date.toDateString(),
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Event Calendar</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Only dates with events are selectable
        </p>
      </div>
      <Calendar
        selected={eventDate}
        onSelect={setEventDate}
        disabled={disableEventDays}
      />
      <div className="space-y-2">
        <p className="text-sm font-medium">Upcoming Events:</p>
        {events.map((event, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded"
          >
            <span className="text-sm">{event.title}</span>
            <span className="text-xs text-muted-foreground">
              {event.date.toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
      {eventDate && (
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm">
            <strong>Selected Event:</strong> {getEventForDate(eventDate)?.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {eventDate.toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}

// Age restriction calendar (18+ only)
export function AgeRestrictedCalendarExample() {
  const [birthDate, setBirthDate] = React.useState<Date>();

  const isUnder18 = (date: Date) => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
    return date > eighteenYearsAgo;
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Age Verification (18+)</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Select your birth date. Must be 18 or older.
        </p>
      </div>
      <Calendar
        selected={birthDate}
        onSelect={setBirthDate}
        disabled={isUnder18}
        maxDate={new Date()}
        showMonthYearPickers={true}
      />
      {birthDate && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm">
            <strong>Birth Date:</strong> {birthDate.toLocaleDateString()}
          </p>
          <p className="text-sm">
            <strong>Age:</strong> {calculateAge(birthDate)} years old
          </p>
          <p
            className={`text-sm font-medium ${
              calculateAge(birthDate) >= 18 ? "text-green-600" : "text-red-600"
            }`}
          >
            {calculateAge(birthDate) >= 18
              ? "✓ Eligible"
              : "✗ Must be 18 or older"}
          </p>
        </div>
      )}
    </div>
  );
}

// Responsive calendar example
export function ResponsiveCalendarExample() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Responsive Calendar</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Calendar adapts to different screen sizes with optimized dropdowns and
          layout
        </p>
      </div>
      <Calendar
        selected={date}
        onSelect={setDate}
        showMonthYearPickers={true}
        className="w-full"
      />
      {date && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm">
            <strong>Selected:</strong> {date.toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}

// Mobile-optimized calendar
export function MobileCalendarExample() {
  const [range, setRange] = React.useState<{ from: Date; to?: Date }>();

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">
          Mobile-Optimized Range Selection
        </h4>
        <p className="text-xs text-muted-foreground mb-4">
          Optimized for touch interactions with larger touch targets
        </p>
      </div>
      <Calendar
        mode="range"
        selectedRange={range}
        onSelectRange={setRange}
        showMonthYearPickers={true}
        size="default"
        className="w-full"
      />
      {range?.from && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm">
            <strong>Start:</strong> {range.from.toLocaleDateString()}
          </p>
          {range.to && (
            <p className="text-sm">
              <strong>End:</strong> {range.to.toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
