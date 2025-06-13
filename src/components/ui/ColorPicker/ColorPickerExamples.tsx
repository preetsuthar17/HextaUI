"use client";

import * as React from "react";
import { parseColor } from "react-aria-components";
import {
  ColorPicker,
  ColorLabel,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorSwatch,
} from "../color-picker";
import { ColorPickerWithPresets } from "./ColorPickerWithPresets";
import { ColorPickerWithFormats } from "./ColorPickerWithFormats";

export function BasicExample() {
  return (
    <ColorPickerWithPresets
      defaultValue="#3b82f6"
      onChange={(color) => console.log("Selected color:", color)}
    />
  );
}

export function CustomPresetsExample() {
  return (
    <ColorPickerWithPresets
      defaultValue="#8b5cf6"
      presets={[
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#06b6d4",
        "#3b82f6",
        "#8b5cf6",
        "#e11d48",
      ]}
    />
  );
}

export function ControlledExample() {
  const [color, setColor] = React.useState("#14b8a6");

  return (
    <div className="space-y-4">
      <ColorPickerWithPresets value={color} onChange={setColor} />
      <p className="text-sm text-muted-foreground">Current color: {color}</p>
    </div>
  );
}

export function SwatchesOnlyExample() {
  return (
    <ColorPicker defaultValue={parseColor("#ef4444")}>
      <div className="space-y-3">
        <ColorLabel>Choose a color</ColorLabel>
        <ColorSwatchPicker>
          {[
            "#ef4444",
            "#f97316",
            "#eab308",
            "#22c55e",
            "#06b6d4",
            "#3b82f6",
            "#8b5cf6",
            "#e11d48",
          ].map((color) => (
            <ColorSwatchPickerItem key={color} color={parseColor(color)}>
              <ColorSwatch />
            </ColorSwatchPickerItem>
          ))}
        </ColorSwatchPicker>
      </div>
    </ColorPicker>
  );
}

export function ColorPickerWithFormatsExample() {
  const [color, setColor] = React.useState("#3b82f6");

  return (
    <div className="space-y-4">
      <ColorPickerWithFormats
        value={color}
        onChange={setColor}
        defaultFormat="hex"
        showFormatSelector={true}
        showEyeDropper={true}
      />
      <p className="text-sm text-muted-foreground">Current color: {color}</p>
    </div>
  );
}
