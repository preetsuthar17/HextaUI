"use client";

import * as React from "react";
import { DatePicker, DateRangePicker } from "../datepicker";
import { Badge } from "../badge";

// Basic DatePicker Example
export function BasicDatePickerExample() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="w-full max-w-xs mx-auto">
      <DatePicker value={date} onChange={setDate} placeholder="Select a date" />
    </div>
  );
}

// Basic DateRangePicker Example
export function BasicDateRangePickerExample() {
  const [range, setRange] = React.useState<{ from: Date; to?: Date }>();

  return (
    <div className="w-full max-w-xs mx-auto">
      <DateRangePicker
        value={range}
        onChange={setRange}
        placeholder="Select date range"
      />
    </div>
  );
}

// DatePicker Variants Example
export function DatePickerVariantsExample() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="space-y-4 w-full max-w-xs">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Default variant"
          variant="default"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Outline</label>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Outline variant"
          variant="outline"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Ghost</label>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Ghost variant"
          variant="ghost"
        />
      </div>
    </div>
  );
}

// DatePicker Sizes Example
export function DatePickerSizesExample() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="space-y-4 w-full max-w-xs">
      <div>
        <label className="text-sm font-medium mb-2 block">Small</label>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Small size"
          size="sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Default size"
          size="default"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Large</label>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Large size"
          size="lg"
        />
      </div>
    </div>
  );
}

// DatePicker with Restrictions
export function DatePickerWithRestrictionsExample() {
  const [date, setDate] = React.useState<Date>();

  const disableWeekends = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <div className="space-y-4 w-full max-w-xs">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Future dates only
        </label>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Select future date"
          minDate={new Date()}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Next 30 days only
        </label>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Next 30 days"
          minDate={new Date()}
          maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Weekdays only</label>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Weekdays only"
          disabledDates={disableWeekends}
        />
      </div>
    </div>
  );
}

// DatePicker without Icon
export function DatePickerWithoutIconExample() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="w-full max-w-xs">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="No calendar icon"
        showIcon={false}
      />
    </div>
  );
}

// DatePicker Custom Format
export function DatePickerCustomFormatExample() {
  const [date, setDate] = React.useState<Date>();

  const customFormat = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-xs">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Custom date format"
        formatDate={customFormat}
      />
    </div>
  );
}

// DateRangePicker Variants
export function DateRangePickerVariantsExample() {
  const [range, setRange] = React.useState<{ from: Date; to?: Date }>();

  return (
    <div className="space-y-4 w-full max-w-xs">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder="Default variant"
          variant="default"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Outline</label>
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder="Outline variant"
          variant="outline"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Ghost</label>
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder="Ghost variant"
          variant="ghost"
        />
      </div>
    </div>
  );
}

// Form Integration Example
export function DatePickerFormExample() {
  const [formData, setFormData] = React.useState({
    birthDate: undefined as Date | undefined,
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    vacationRange: undefined as { from: Date; to?: Date } | undefined,
  });

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

  const calculateDays = () => {
    if (formData.vacationRange?.from && formData.vacationRange?.to) {
      const diffTime = Math.abs(
        formData.vacationRange.to.getTime() -
          formData.vacationRange.from.getTime(),
      );
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  };

  return (
    <div className="space-y-6 w-full max-w-xs">
      <div>
        <label className="text-sm font-medium mb-2 block">Birth Date</label>
        <DatePicker
          value={formData.birthDate}
          onChange={(date) =>
            setFormData((prev) => ({ ...prev, birthDate: date }))
          }
          placeholder="Select birth date"
          maxDate={new Date()}
        />
        {formData.birthDate && (
          <p className="text-xs text-muted-foreground mt-1">
            Age: {calculateAge(formData.birthDate)} years old
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          Project Timeline
        </label>
        <div className="space-y-2">
          <DatePicker
            value={formData.startDate}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, startDate: date }))
            }
            placeholder="Start date"
            minDate={new Date()}
          />
          <DatePicker
            value={formData.endDate}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, endDate: date }))
            }
            placeholder="End date"
            minDate={formData.startDate || new Date()}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          Vacation Period
        </label>
        <DateRangePicker
          value={formData.vacationRange}
          onChange={(range) =>
            setFormData((prev) => ({ ...prev, vacationRange: range }))
          }
          placeholder="Select vacation dates"
          minDate={new Date()}
        />
        {formData.vacationRange?.from && formData.vacationRange?.to && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Total days: {calculateDays()}
            </p>
          </div>
        )}
      </div>

      {(formData.birthDate || formData.startDate || formData.vacationRange) && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          <h4 className="text-sm font-medium mb-2">Form Summary</h4>
          <div className="space-y-1 text-xs">
            {formData.birthDate && (
              <p>Birth Date: {formData.birthDate.toLocaleDateString()}</p>
            )}
            {formData.startDate && (
              <p>Project Start: {formData.startDate.toLocaleDateString()}</p>
            )}
            {formData.endDate && (
              <p>Project End: {formData.endDate.toLocaleDateString()}</p>
            )}
            {formData.vacationRange?.from && (
              <p>
                Vacation: {formData.vacationRange.from.toLocaleDateString()}
                {formData.vacationRange.to &&
                  ` - ${formData.vacationRange.to.toLocaleDateString()}`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Booking System Example
export function BookingDatePickerExample() {
  const [checkIn, setCheckIn] = React.useState<Date>();
  const [checkOut, setCheckOut] = React.useState<Date>();
  const [guests, setGuests] = React.useState(1);

  // Mock booked dates
  const bookedDates = [
    new Date(2025, 5, 15),
    new Date(2025, 5, 16),
    new Date(2025, 5, 20),
    new Date(2025, 5, 25),
  ];

  const isDateBooked = (date: Date) => {
    return bookedDates.some(
      (bookedDate) => date.toDateString() === bookedDate.toDateString(),
    );
  };

  const disableUnavailableDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isDateBooked(date);
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  return (
    <div className="space-y-4 w-full max-w-xs">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hotel Booking</h3>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Check-in Date
            </label>
            <DatePicker
              value={checkIn}
              onChange={setCheckIn}
              placeholder="Select check-in date"
              disabledDates={disableUnavailableDates}
              minDate={new Date()}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Check-out Date
            </label>
            <DatePicker
              value={checkOut}
              onChange={setCheckOut}
              placeholder="Select check-out date"
              disabledDates={disableUnavailableDates}
              minDate={
                checkIn
                  ? new Date(checkIn.getTime() + 24 * 60 * 60 * 1000)
                  : new Date()
              }
            />
          </div>
        </div>

        {checkIn && checkOut && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
            <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              Booking Summary
            </h4>
            <div className="text-xs space-y-1">
              <p>Check-in: {checkIn.toLocaleDateString()}</p>
              <p>Check-out: {checkOut.toLocaleDateString()}</p>
              <p>Nights: {calculateNights()}</p>
              <p>Guests: {guests}</p>
            </div>
          </div>
        )}

        <div className="mt-3">
          <p className="text-xs text-muted-foreground">
            <Badge variant="secondary" className="mr-1">
              Note:
            </Badge>
            Grayed out dates are unavailable
          </p>
        </div>
      </div>
    </div>
  );
}

// Disabled State Example
export function DatePickerDisabledExample() {
  return (
    <div className="space-y-4 w-full max-w-xs">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Disabled DatePicker
        </label>
        <DatePicker disabled placeholder="This is disabled" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Disabled DateRangePicker
        </label>
        <DateRangePicker disabled placeholder="This is disabled" />
      </div>
    </div>
  );
}
