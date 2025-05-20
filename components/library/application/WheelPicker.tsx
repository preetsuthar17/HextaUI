import "@ncdai/react-wheel-picker/style.css";

import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";

import { cn } from "@/lib/utils";

type WheelPickerOption = WheelPickerPrimitive.WheelPickerOption;
type WheelPickerClassNames = WheelPickerPrimitive.WheelPickerClassNames;

function WheelPickerWrapper({
  className,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) {
  return (
    <WheelPickerPrimitive.WheelPickerWrapper
      className={cn(
        "max-w-56 rounded-lg border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
      {...props}
    />
  );
}

function WheelPicker({
  classNames,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPicker>) {
  return (
    <WheelPickerPrimitive.WheelPicker
      classNames={{
        optionItem: "text-zinc-400 dark:text-zinc-600",
        highlightWrapper:
          "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50",
        ...classNames,
      }}
      {...props}
    />
  );
}

export { WheelPicker, WheelPickerWrapper };
export type { WheelPickerClassNames, WheelPickerOption };
