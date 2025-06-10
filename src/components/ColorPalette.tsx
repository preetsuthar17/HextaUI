"use client";

import React from "react";

interface ColorPaletteProps {
  colors: Array<{ name: string; value: string }>;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      {colors.map((color) => (
        <div
          key={color.name}
          className="flex flex-col gap-2 items-start  bg-[hsl(var(--hu-accent))]/10 p-4 
          rounded-[var(--radius)]  border border-[hsl(var(--hu-border))] "
        >
          <div
            className="w-full h-32 border border-[hsl(var(--hu-border))] rounded-[var(--radius)]"
            style={{ backgroundColor: color.value }}
          ></div>
          <div>
            <strong className="block">{color.name}</strong>
            <span className="text-gray-600 text-sm">{color.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
