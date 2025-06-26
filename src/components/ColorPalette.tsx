"use client";

import React from "react";

interface ColorPaletteProps {
  colors: Array<{ name: string; value: string; usage: string }>;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      {colors.map((color) => (
        <div
          key={color.name}
          className="flex flex-col gap-2 items-start  bg-accent/10 p-4
          rounded-ele  border border-border "
        >
          <div
            className="w-full h-32 border border-border rounded-ele"
            style={{ backgroundColor: color.value }}
          ></div>
          <div>
            <strong className="block">{color.name}</strong>
            <span className="text-gray-600 text-sm">{color.usage}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
