"use client";

import { useEffect, useRef, useState } from "react";
import { useSpotlightPosition } from "./SpotlightMask";

interface MatrixBackgroundProps {
  className?: string;
  textColor?: string;
  fontSize?: number;
  cellSize?: number;
  animationSpeed?: number;
}

interface MatrixCell {
  id: string;
  x: number;
  y: number;
  char: string;
  originalChar: string;
  isAnimating: boolean;
  animationFrame: number;
}

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split(
    ""
  );
const ADDITIONAL_CHARS = "0123456789!@#$%^&*()".split("");
const ALL_CHARS = [...MATRIX_CHARS, ...ADDITIONAL_CHARS];

export const MatrixBackground = ({
  className = "",
  textColor = "text-green-400",
  fontSize = 16,
  cellSize = 20,
  animationSpeed = 100,
}: MatrixBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<MatrixCell[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const spotlightContext = useSpotlightPosition();

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;

      if (newWidth === dimensions.width && newHeight === dimensions.height)
        return;

      setDimensions({ width: newWidth, height: newHeight });

      const cols = Math.floor(newWidth / cellSize);
      const rows = Math.floor(newHeight / cellSize);

      const newCells: MatrixCell[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const char = ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
          newCells.push({
            id: `${row}-${col}`,
            x: col * cellSize,
            y: row * cellSize,
            char,
            originalChar: char,
            isAnimating: false,
            animationFrame: 0,
          });
        }
      }

      setCells(newCells);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [cellSize, dimensions.width, dimensions.height]);
  useEffect(() => {
    if (!spotlightContext?.isHovered) {
      setCells((prev) =>
        prev.map((cell) => ({
          ...cell,
          char: cell.originalChar,
          isAnimating: false,
          animationFrame: 0,
        }))
      );
      return;
    }

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current > animationSpeed) {
        setCells((prev) =>
          prev.map((cell) => {
            const distance = Math.sqrt(
              Math.pow(cell.x + cellSize / 2 - spotlightContext.position.x, 2) +
                Math.pow(cell.y + cellSize / 2 - spotlightContext.position.y, 2)
            );

            const isInMask = distance <= spotlightContext.maskSize;

            if (
              isInMask &&
              spotlightContext.isHovered &&
              spotlightContext.isMoving
            ) {
              const newAnimationFrame = cell.animationFrame + 1;
              const shouldChange = newAnimationFrame % 1 === 0; // Change every frame

              return {
                ...cell,
                char: shouldChange
                  ? ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)]
                  : cell.char,
                isAnimating: true,
                animationFrame: newAnimationFrame,
              };
            } else if (isInMask && spotlightContext.isHovered) {
              return {
                ...cell,
                animationFrame: 0,
              };
            } else {
              return {
                ...cell,
                char: cell.originalChar,
                isAnimating: false,
                animationFrame: 0,
              };
            }
          })
        );

        lastUpdateRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spotlightContext, animationSpeed, cellSize]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 font-mono leading-none select-none">
        {cells.map((cell) => (
          <span
            key={cell.id}
            className={`absolute ${textColor} ${
              cell.isAnimating ? "opacity-100" : "opacity-70"
            } transition-opacity duration-100`}
            style={{
              left: cell.x,
              top: cell.y,
              fontSize: `${fontSize}px`,
              lineHeight: `${cellSize}px`,
              width: cellSize,
              height: cellSize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cell.char}
          </span>
        ))}
      </div>
    </div>
  );
};
