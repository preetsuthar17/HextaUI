"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./button";

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  showCurrentTimeButton?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  disabled,
  error,
  className,
  showCurrentTimeButton = true,
}) => {
  const getDefaultTime = React.useCallback(() => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return {
      hour: String(h).padStart(2, "0"),
      minute: String(m).padStart(2, "0"),
      amPm: ap,
    };
  }, []);

  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");
  const [amPm, setAmPm] = React.useState<string>("AM");

  const handleSetCurrentTime = React.useCallback(() => {
    const def = getDefaultTime();
    setHour(def.hour);
    setMinute(def.minute);
    setAmPm(def.amPm);
    if (onChange) {
      const newValue = `${def.hour}:${def.minute} ${def.amPm}`;
      onChange(newValue);
    }
  }, [getDefaultTime, onChange]);

  React.useEffect(() => {
    if (!value) {
      const def = getDefaultTime();
      setHour(def.hour);
      setMinute(def.minute);
      setAmPm(def.amPm);
      if (onChange) {
        const newValue = `${def.hour}:${def.minute} ${def.amPm}`;
        onChange(newValue);
      }
    } else if (
      typeof value === "string" &&
      value.match(/^\d{1,2}:\d{2} (AM|PM)$/)
    ) {
      const [hm, ap] = value.split(" ");
      const [h, m] = hm.split(":");
      setHour(h);
      setMinute(m);
      setAmPm(ap);
    }
  }, []);

  const handleChange = React.useCallback(
    (h: string, m: string, ap: string) => {
      setHour(h);
      setMinute(m);
      setAmPm(ap);
      if (h && m && ap && onChange) {
        const newValue = `${h}:${m} ${ap}`;
        if (newValue !== value) {
          onChange(newValue);
        }
      }
    },
    [onChange, value],
  );

  return (
    <div
      className={
        className ??
        "flex w-full flex-col items-center gap-2" +
          (error ? "rounded border border-red-500 p-2" : "")
      }
    >
      <div className="flex w-full items-left gap-2 justify-center">
        <div className="w-16">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(val, minute, amPm),
              [minute, amPm, handleChange],
            )}
            value={hour}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) =>
                String(i + 1).padStart(2, "0"),
              ).map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span>:</span>
        <div className="w-16">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(hour, val, amPm),
              [hour, amPm, handleChange],
            )}
            value={minute}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) =>
                String(i).padStart(2, "0"),
              ).map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-16">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(hour, minute, val),
              [hour, minute, handleChange],
            )}
            value={amPm}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {showCurrentTimeButton && (
        <Button
          variant={"outline"}
          size={"sm"}
          disabled={disabled}
          onClick={handleSetCurrentTime}
        >
          Set Current Time
        </Button>
      )}
    </div>
  );
};

// Example Components for Documentation
export function BasicTimePickerExample() {
  const [time, setTime] = React.useState<string>();

  return <TimePicker value={time} onChange={setTime} />;
}

export function TimePickerWithoutButtonExample() {
  const [time, setTime] = React.useState<string>();

  return (
    <TimePicker value={time} onChange={setTime} showCurrentTimeButton={false} />
  );
}

export function DisabledTimePickerExample() {
  const [time, setTime] = React.useState<string>("02:30 PM");

  return <TimePicker value={time} onChange={setTime} disabled />;
}

export function ErrorTimePickerExample() {
  const [time, setTime] = React.useState<string>();

  return <TimePicker value={time} onChange={setTime} error />;
}

export function CustomStyledTimePickerExample() {
  const [time, setTime] = React.useState<string>();

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-primary/50 p-4"
    />
  );
}

export function AppointmentTimePickerExample() {
  const [appointmentTime, setAppointmentTime] = React.useState<string>();

  const handleTimeChange = (time: string) => {
    setAppointmentTime(time);
    console.log("Appointment scheduled for:", time);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center text-center">
      <label className="text-sm font-medium">Select Appointment Time</label>
      <TimePicker value={appointmentTime} onChange={handleTimeChange} />
      {appointmentTime && (
        <p className="text-sm text-muted-foreground">
          Selected: {appointmentTime}
        </p>
      )}
    </div>
  );
}

export function FormTimePickerExample() {
  const [formData, setFormData] = React.useState({
    startTime: undefined as string | undefined,
    endTime: undefined as string | undefined,
  });

  return (
    <div className="flex flex-col gap-4 max-w-sm  items-center justify-center text-center">
      <div>
        <label className="text-sm font-medium">Start Time</label>
        <TimePicker
          value={formData.startTime}
          onChange={(time) =>
            setFormData((prev) => ({ ...prev, startTime: time }))
          }
        />
      </div>
      <div>
        <label className="text-sm font-medium">End Time</label>
        <TimePicker
          value={formData.endTime}
          onChange={(time) =>
            setFormData((prev) => ({ ...prev, endTime: time }))
          }
        />
      </div>
      {formData.startTime && formData.endTime && (
        <div className="rounded-md bg-muted p-3 text-sm">
          <p>Meeting scheduled:</p>
          <p>
            {formData.startTime} - {formData.endTime}
          </p>
        </div>
      )}
    </div>
  );
}
