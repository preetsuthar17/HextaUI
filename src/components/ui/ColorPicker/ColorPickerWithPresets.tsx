"use client";

import * as React from "react";
import {
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
  ColorGroup,
} from "../color-picker";
import { parseColor } from "react-aria-components";

interface ColorPickerWithPresetsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  showEyeDropper?: boolean;
  showInput?: boolean;
  className?: string;
  size?: "sm" | "default" | "lg";
}

const defaultPresets = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
];

function ColorPickerWithPresets({
  value,
  defaultValue = "#000000",
  onChange,
  presets = defaultPresets,
  showEyeDropper = true,
  showInput = true,
  className,
  size = "default",
}: ColorPickerWithPresetsProps) {
  const [colorValue, setColorValue] = React.useState(
    value ? parseColor(value) : parseColor(defaultValue),
  );

  React.useEffect(() => {
    if (value) {
      setColorValue(parseColor(value));
    }
  }, [value]);

  const handleColorChange = React.useCallback(
    (color: any) => {
      setColorValue(color);
      onChange?.(color.toString("hex"));
    },
    [onChange],
  );

  return (
    <ColorPicker
      value={colorValue}
      onChange={handleColorChange}
      size={size}
      className={className}
    >
      <div className="space-y-4">
        <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness">
          <ColorThumb />
        </ColorArea>

        <ColorSlider colorSpace="hsb" channel="hue">
          <SliderTrack>
            <ColorThumb />
          </SliderTrack>
        </ColorSlider>

        <ColorSlider colorSpace="hsb" channel="alpha">
          <SliderTrack>
            <ColorThumb />
          </SliderTrack>
        </ColorSlider>

        {showInput && (
          <ColorField>
            <ColorLabel>Hex Color</ColorLabel>
            <ColorGroup className="flex gap-2">
              <ColorInput />
              {showEyeDropper && <EyeDropperButton />}
            </ColorGroup>
            <ColorError />
          </ColorField>
        )}

        {presets.length > 0 && (
          <div className="space-y-2">
            <ColorLabel>Presets</ColorLabel>
            <ColorSwatchPicker>
              {presets.map((preset) => (
                <ColorSwatchPickerItem key={preset} color={parseColor(preset)}>
                  <ColorSwatch />
                </ColorSwatchPickerItem>
              ))}
            </ColorSwatchPicker>
          </div>
        )}
      </div>
    </ColorPicker>
  );
}

export { ColorPickerWithPresets };
