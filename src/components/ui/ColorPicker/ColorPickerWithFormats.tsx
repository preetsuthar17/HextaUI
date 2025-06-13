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
import { parseColor, Color } from "react-aria-components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import {
  type ColorFormat,
  formatLabels,
  formatColorValue,
  parseColorFromFormat,
  getFormatPlaceholder,
} from "../../../lib/color-utils";

interface ColorPickerWithFormatsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  showEyeDropper?: boolean;
  showFormatSelector?: boolean;
  defaultFormat?: ColorFormat;
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
  "#00ffff",
];

function ColorPickerWithFormats({
  value,
  defaultValue = "#000000",
  onChange,
  presets = defaultPresets,
  showEyeDropper = true,
  showFormatSelector = true,
  defaultFormat = "hex",
  className,
  size = "default",
}: ColorPickerWithFormatsProps) {
  const [colorValue, setColorValue] = React.useState(
    value ? parseColor(value) : parseColor(defaultValue),
  );
  const [currentFormat, setCurrentFormat] =
    React.useState<ColorFormat>(defaultFormat);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (value) {
      const parsed = parseColor(value);
      setColorValue(parsed);
      setInputValue(formatColorValue(parsed, currentFormat));
    }
  }, [value, currentFormat]);

  React.useEffect(() => {
    setInputValue(formatColorValue(colorValue, currentFormat));
  }, [colorValue, currentFormat]);

  const handleColorChange = React.useCallback(
    (color: Color) => {
      setColorValue(color);
      const formattedValue = formatColorValue(color, currentFormat);
      setInputValue(formattedValue);
      onChange?.(color.toString("hex"));
    },
    [onChange, currentFormat],
  );

  const handleInputChange = React.useCallback(
    (value: string) => {
      setInputValue(value);
      const parsed = parseColorFromFormat(value, currentFormat);
      if (parsed) {
        setColorValue(parsed);
        onChange?.(parsed.toString("hex"));
      }
    },
    [currentFormat, onChange],
  );

  const handleFormatChange = React.useCallback(
    (format: ColorFormat) => {
      setCurrentFormat(format);
      setInputValue(formatColorValue(colorValue, format));
    },
    [colorValue],
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

        <div className="space-y-2">
          {showFormatSelector && (
            <div className="flex items-center gap-2">
              <ColorLabel className="min-w-0 shrink-0">Format</ColorLabel>
              <Select
                value={currentFormat}
                onValueChange={(value) =>
                  handleFormatChange(value as ColorFormat)
                }
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(formatLabels).map(([format, label]) => (
                    <SelectItem key={format} value={format}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}{" "}
          <ColorField>
            <ColorLabel>{formatLabels[currentFormat]} Value</ColorLabel>
            <ColorGroup className="flex gap-2">
              <ColorInput
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={getFormatPlaceholder(currentFormat)}
              />
              {showEyeDropper && <EyeDropperButton />}
            </ColorGroup>
            <ColorError />
          </ColorField>
        </div>

        {presets.length > 0 && (
          <div className="space-y-2">
            <ColorLabel>Presets</ColorLabel>
            <ColorSwatchPicker>
              {presets.map((preset, index) => (
                <ColorSwatchPickerItem key={index} color={parseColor(preset)}>
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

export {
  ColorPickerWithFormats,
  type ColorPickerWithFormatsProps,
  type ColorFormat,
};
