"use client";
import { useRef, useState, useEffect } from "react";

export const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "#6300ff30",
  lightThemeSpotlightColor,
  darkThemeSpotlightColor,
}: {
  children: any;
  className?: string;
  spotlightColor?: string;
  lightThemeSpotlightColor?: string;
  darkThemeSpotlightColor?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const detectTheme = () => {
      if (!lightThemeSpotlightColor && !darkThemeSpotlightColor) return;

      const isDarkClass =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");

      const computedStyle = getComputedStyle(document.documentElement);
      const bgColor =
        computedStyle.getPropertyValue("--background") ||
        computedStyle.backgroundColor;

      const isDarkMedia = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      const isDark =
        isDarkClass ||
        bgColor.includes("0 0% 3.9%") ||
        (!isDarkClass && isDarkMedia);

      setCurrentTheme(isDark ? "dark" : "light");
    };

    detectTheme();

    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", detectTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", detectTheme);
    };
  }, [lightThemeSpotlightColor, darkThemeSpotlightColor]);

  const getSpotlightColor = () => {
    if (currentTheme === "light" && lightThemeSpotlightColor) {
      return lightThemeSpotlightColor;
    }
    if (currentTheme === "dark" && darkThemeSpotlightColor) {
      return darkThemeSpotlightColor;
    }
    return spotlightColor;
  };
  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };
  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };
  const handleMouseEnter = () => {
    setOpacity(0.6);
  };
  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-[var(--)] border border-border bg-card overflow-hidden p-8 ${className}`}
    >
      {" "}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${
            position.y
          }px, ${getSpotlightColor()}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};
