"use client";

import * as React from "react";
import {
  ColorArea as AriaColorArea,
  ColorAreaProps as AriaColorAreaProps,
  ColorField as AriaColorField,
  ColorFieldProps as AriaColorFieldProps,
  ColorPicker as AriaColorPicker,
  ColorPickerProps as AriaColorPickerProps,
  ColorSlider as AriaColorSlider,
  ColorSliderProps as AriaColorSliderProps,
  ColorSwatch as AriaColorSwatch,
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  ColorSwatchPickerItemProps as AriaColorSwatchPickerItemProps,
  ColorSwatchPickerProps as AriaColorSwatchPickerProps,
  ColorSwatchProps as AriaColorSwatchProps,
  ColorThumb as AriaColorThumb,
  ColorThumbProps as AriaColorThumbProps,
  SliderTrack as AriaSliderTrack,
  SliderTrackProps as AriaSliderTrackProps,
  ColorPickerStateContext,
  composeRenderProps,
  parseColor,
  FieldError,
  Label,
  Input,
  Group,
} from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Pipette } from "lucide-react";

const colorPickerVariants = cva(
  "flex flex-col gap-2 rounded-card border border-border bg-background p-4 ",
  {
    variants: {
      size: {
        sm: "max-w-xs",
        default: "max-w-sm",
        lg: "max-w-md",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface ColorPickerProps
  extends AriaColorPickerProps,
    VariantProps<typeof colorPickerVariants> {
  className?: string;
}

function ColorPicker({
  className,
  size,
  children,
  ...props
}: ColorPickerProps) {
  return (
    <div className={cn(colorPickerVariants({ size }), className)}>
      <AriaColorPicker {...props}>{children}</AriaColorPicker>
    </div>
  );
}

function ColorField({ className, ...props }: AriaColorFieldProps) {
  return (
    <AriaColorField
      className={composeRenderProps(className, (className) =>
        cn("flex flex-col gap-2", className),
      )}
      {...props}
    />
  );
}

function ColorInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      className={composeRenderProps(className, (className) =>
        cn(
          "flex h-9 w-full rounded-ele border border-border bg-background px-3 py-1 text-sm text-foreground  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ),
      )}
      {...props}
    />
  );
}

function ColorLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn(
        "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

function ColorArea({ className, ...props }: AriaColorAreaProps) {
  return (
    <AriaColorArea
      className={composeRenderProps(className, (className) =>
        cn(
          "h-[200px] w-full rounded-card border border-border bg-gradient-to-br from-white to-black",
          className,
        ),
      )}
      {...props}
    />
  );
}

function ColorSlider({ className, ...props }: AriaColorSliderProps) {
  return (
    <AriaColorSlider
      className={composeRenderProps(className, (className) =>
        cn(
          "flex h-8 w-full flex-col gap-2 items-center justify-center",
          className,
        ),
      )}
      {...props}
    />
  );
}

function SliderTrack({ className, style, ...props }: AriaSliderTrackProps) {
  return (
    <AriaSliderTrack
      className={composeRenderProps(className, (className) =>
        cn("relative h-3 w-full rounded-full border border-border", className),
      )}
      style={({ defaultStyle }) => ({
        ...style,
        background: `${defaultStyle.background},
          repeating-conic-gradient(
            #ccc 0 90deg,
            #fff 0 180deg) 
          0% 0%/8px 8px`,
      })}
      {...props}
    />
  );
}

function ColorThumb({ className, ...props }: AriaColorThumbProps) {
  return (
    <AriaColorThumb
      className={composeRenderProps(className, (className) =>
        cn(
          "z-10 h-4 w-4 rounded-full border-2 border-white  ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
          className,
        ),
      )}
      {...props}
    />
  );
}

function ColorSwatchPicker({
  className,
  ...props
}: AriaColorSwatchPickerProps) {
  return (
    <AriaColorSwatchPicker
      className={composeRenderProps(className, (className) =>
        cn("flex flex-wrap gap-2", className),
      )}
      {...props}
    />
  );
}

function ColorSwatchPickerItem({
  className,
  ...props
}: AriaColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem
      className={composeRenderProps(className, (className) =>
        cn(
          "group/swatch-item cursor-pointer rounded-ele p-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          className,
        ),
      )}
      {...props}
    />
  );
}

function ColorSwatch({ className, style, ...props }: AriaColorSwatchProps) {
  return (
    <AriaColorSwatch
      className={composeRenderProps(className, (className) =>
        cn(
          "h-8 w-8 rounded-ele border border-border group-data-[selected]/swatch-item:ring-2 group-data-[selected]/swatch-item:ring-ring group-data-[selected]/swatch-item:ring-offset-2",
          className,
        ),
      )}
      style={({ defaultStyle }) => ({
        ...style,
        background: `${defaultStyle.background},
        repeating-conic-gradient(
          #ccc 0 90deg,
          #fff 0 180deg) 
        0% 0%/8px 8px`,
      })}
      {...props}
    />
  );
}

const EyeDropperButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const state = React.useContext(ColorPickerStateContext);

  if (!state || typeof window === "undefined" || !("EyeDropper" in window)) {
    return null;
  }

  const handleEyeDropper = async () => {
    try {
      // @ts-ignore - EyeDropper API is not yet in TypeScript DOM types
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      state.setColor(parseColor(result.sRGBHex));
    } catch (error) {
      // User cancelled or error occurred
      console.warn("EyeDropper operation cancelled or failed:", error);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-ele border border-border bg-background text-foreground  hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={handleEyeDropper}
      aria-label="Pick color from screen"
      {...props}
    >
      <Pipette className="h-4 w-4" />
    </button>
  );
});
EyeDropperButton.displayName = "EyeDropperButton";

function ColorError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      className={composeRenderProps(className, (className) =>
        cn("text-sm font-medium text-destructive", className),
      )}
      {...props}
    />
  );
}

export {
  ColorPicker,
  ColorField,
  ColorInput,
  ColorLabel,
  ColorArea,
  ColorSlider,
  SliderTrack,
  ColorThumb,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorSwatch,
  EyeDropperButton,
  ColorError,
  Group as ColorGroup,
};
