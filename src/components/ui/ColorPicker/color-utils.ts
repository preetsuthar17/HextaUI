"use client";
/**
 * Enhanced color format utilities for the ColorPicker component
 * Provides conversion between different color formats including OKLCH and LAB
 */

import { Color, parseColor } from "react-aria-components";

export type ColorFormat = "hex" | "rgb" | "hsl" | "hsv" | "oklch" | "lab";

export const formatLabels: Record<ColorFormat, string> = {
  hex: "HEX",
  rgb: "RGB",
  hsl: "HSL",
  hsv: "HSV",
  oklch: "OKLCH",
  lab: "LAB",
};

/**
 * Converts RGB values (0-1) to XYZ color space
 */
function rgbToXyz(r: number, g: number, b: number): [number, number, number] {
  // Convert sRGB to linear RGB
  const toLinear = (c: number) => {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rLinear = toLinear(r);
  const gLinear = toLinear(g);
  const bLinear = toLinear(b);

  // Convert to XYZ using sRGB matrix
  const x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375;
  const y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.072175;
  const z = rLinear * 0.0193339 + gLinear * 0.119192 + bLinear * 0.9503041;

  return [x, y, z];
}

/**
 * Converts XYZ to LAB color space
 */
function xyzToLab(x: number, y: number, z: number): [number, number, number] {
  // Reference white point D65
  const xn = 0.95047;
  const yn = 1.0;
  const zn = 1.08883;

  const fx = x / xn;
  const fy = y / yn;
  const fz = z / zn;

  const transform = (t: number) => {
    return t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116;
  };

  const fxT = transform(fx);
  const fyT = transform(fy);
  const fzT = transform(fz);

  const L = 116 * fyT - 16;
  const a = 500 * (fxT - fyT);
  const b = 200 * (fyT - fzT);

  return [L, a, b];
}

/**
 * Converts XYZ to OKLCH color space (simplified conversion)
 */
function xyzToOklch(x: number, y: number, z: number): [number, number, number] {
  // Simplified conversion to OKLCH
  // In practice, you'd want to use a proper color library like colorjs.io

  // Convert to OKLab first (simplified)
  const l = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
  const m = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
  const s = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z);

  const okL = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const okA = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const okB = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  // Convert to LCH
  const L_oklch = okL;
  const C = Math.sqrt(okA * okA + okB * okB);
  const H = (Math.atan2(okB, okA) * 180) / Math.PI;

  return [L_oklch, C, H < 0 ? H + 360 : H];
}

/**
 * Formats a color value according to the specified format
 */
export function formatColorValue(color: Color, format: ColorFormat): string {
  switch (format) {
    case "hex":
      return color.toString("hex");
    case "rgb": {
      const rgb = color.toFormat("rgb");
      const r = Math.round(rgb.getChannelValue("red"));
      const g = Math.round(rgb.getChannelValue("green"));
      const b = Math.round(rgb.getChannelValue("blue"));
      const alpha = rgb.getChannelValue("alpha");

      if (alpha < 1) {
        return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
      }
      return `rgb(${r}, ${g}, ${b})`;
    }
    case "hsl": {
      const hsl = color.toFormat("hsl");
      const h = Math.round(hsl.getChannelValue("hue"));
      const s = Math.round(hsl.getChannelValue("saturation"));
      const l = Math.round(hsl.getChannelValue("lightness"));
      const alpha = hsl.getChannelValue("alpha");

      if (alpha < 1) {
        return `hsla(${h}, ${s}%, ${l}%, ${alpha.toFixed(2)})`;
      }
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
    case "hsv": {
      const hsv = color.toFormat("hsb"); // HSB is HSV in react-aria-components
      const h = Math.round(hsv.getChannelValue("hue"));
      const s = Math.round(hsv.getChannelValue("saturation"));
      const v = Math.round(hsv.getChannelValue("brightness"));
      const alpha = hsv.getChannelValue("alpha");

      if (alpha < 1) {
        return `hsva(${h}, ${s}%, ${v}%, ${alpha.toFixed(2)})`;
      }
      return `hsv(${h}, ${s}%, ${v}%)`;
    }
    case "oklch": {
      const rgb = color.toFormat("rgb");
      const r = rgb.getChannelValue("red") / 255;
      const g = rgb.getChannelValue("green") / 255;
      const b = rgb.getChannelValue("blue") / 255;
      const alpha = rgb.getChannelValue("alpha");

      const [x, y, z] = rgbToXyz(r, g, b);
      const [L, C, H] = xyzToOklch(x, y, z);

      if (alpha < 1) {
        return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(
          1,
        )} / ${alpha.toFixed(2)})`;
      }
      return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;
    }
    case "lab": {
      const rgb = color.toFormat("rgb");
      const r = rgb.getChannelValue("red") / 255;
      const g = rgb.getChannelValue("green") / 255;
      const b = rgb.getChannelValue("blue") / 255;
      const alpha = rgb.getChannelValue("alpha");

      const [x, y, z] = rgbToXyz(r, g, b);
      const [L, a, b_lab] = xyzToLab(x, y, z);

      if (alpha < 1) {
        return `lab(${L.toFixed(1)}% ${a.toFixed(1)} ${b_lab.toFixed(
          1,
        )} / ${alpha.toFixed(2)})`;
      }
      return `lab(${L.toFixed(1)}% ${a.toFixed(1)} ${b_lab.toFixed(1)})`;
    }
    default:
      return color.toString("hex");
  }
}

/**
 * Parses a color string in the specified format
 */
export function parseColorFromFormat(
  value: string,
  format: ColorFormat,
): Color | null {
  try {
    // For formats that react-aria-components supports directly
    if (format === "hex" || format === "rgb" || format === "hsl") {
      return parseColor(value);
    }

    if (format === "hsv") {
      // Try to parse HSV/HSB format
      const hsvMatch = value.match(/hsva?\(([^)]+)\)/);
      if (hsvMatch) {
        const parts = hsvMatch[1].split(",").map((p) => p.trim());
        const h = parseFloat(parts[0]) || 0;
        const s = parseFloat(parts[1]) || 0;
        const v = parseFloat(parts[2]) || 0;
        const a = parts[3] ? parseFloat(parts[3]) : 1;

        // Convert HSV to HSL for react-aria-components
        const hslL = (v * (2 - s / 100)) / 2;
        const hslS = (v * s) / (100 - Math.abs(2 * hslL - 100));

        return parseColor(`hsla(${h}, ${hslS || 0}%, ${hslL}%, ${a})`);
      }
    }

    if (format === "oklch") {
      // Parse OKLCH and convert to HSL as approximation
      const oklchMatch = value.match(/oklch\(([^)]+)\)/);
      if (oklchMatch) {
        const parts = oklchMatch[1].split(/[\s\/]+/);
        const L = parseFloat(parts[0]) || 50;
        const C = parseFloat(parts[1]) || 0;
        const H = parseFloat(parts[2]) || 0;
        const alpha = parts[3] ? parseFloat(parts[3]) : 1;

        // Simplified conversion back to HSL
        return parseColor(
          `hsla(${H}, ${Math.min(C * 100, 100)}%, ${L}%, ${alpha})`,
        );
      }
    }

    if (format === "lab") {
      // Parse LAB and convert to HSL as approximation
      const labMatch = value.match(/lab\(([^)]+)\)/);
      if (labMatch) {
        const parts = labMatch[1].split(/[\s\/]+/);
        const L = parseFloat(parts[0]) || 50;
        const a = parseFloat(parts[1]) || 0;
        const b = parseFloat(parts[2]) || 0;
        const alpha = parts[3] ? parseFloat(parts[3]) : 1;

        // Simplified conversion back to HSL
        const chroma = Math.sqrt(a * a + b * b);
        const hue = (Math.atan2(b, a) * 180) / Math.PI;

        return parseColor(
          `hsla(${hue < 0 ? hue + 360 : hue}, ${Math.min(
            chroma,
            100,
          )}%, ${L}%, ${alpha})`,
        );
      }
    }

    // Fallback: try to parse as any supported format
    return parseColor(value);
  } catch {
    return null;
  }
}

/**
 * Validates if a color string is valid for the given format
 */
export function isValidColorFormat(
  value: string,
  format: ColorFormat,
): boolean {
  const parsed = parseColorFromFormat(value, format);
  return parsed !== null;
}

/**
 * Gets format-specific input placeholder text
 */
export function getFormatPlaceholder(format: ColorFormat): string {
  switch (format) {
    case "hex":
      return "#3b82f6";
    case "rgb":
      return "rgb(59, 130, 246)";
    case "hsl":
      return "hsl(220, 91%, 64%)";
    case "hsv":
      return "hsv(220, 76%, 96%)";
    case "oklch":
      return "oklch(65% 0.15 230)";
    case "lab":
      return "lab(55% -10 40)";
    default:
      return "";
  }
}
