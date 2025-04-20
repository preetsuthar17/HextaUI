"use client";

import React from "react";
import { motion } from "motion/react";

export interface GradientTracingProps {
  width: number;
  height: number;
  path?: string;
  baseColor?: string;
  gradientColors?: [string, string, string];
  animationDuration?: number;
  strokeWidth?: number;
}

export const GradientTracing: React.FC<GradientTracingProps> = ({
  width,
  height,
  path,
  baseColor = "black",
  gradientColors = ["#2EB9DF", "#2EB9DF", "#9E00FF"],
  animationDuration = 2,
  strokeWidth = 2,
}) => {
  const [gradientId, setGradientId] = React.useState("");

  React.useEffect(() => {
    setGradientId(`pulse-${Math.random().toString(36).substring(2, 11)}`);
  }, []);

  const defaultPath = `M0 ${height / 2} L${width} ${height / 2}`;
  const pathToUse = path || defaultPath;

  return (
    <div className="relative" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        <path
          d={pathToUse}
          stroke={baseColor}
          strokeOpacity="0.2"
          fill="none"
        />
        <path
          d={pathToUse}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <defs>
          <motion.linearGradient
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
};
