"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __PERFORMANCE_OBSERVER__?: PerformanceObserver;
  }
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development and if PerformanceObserver is supported
    if (
      process.env.NODE_ENV !== "development" ||
      typeof window === "undefined" ||
      !window.PerformanceObserver
    ) {
      return;
    }

    // Avoid creating multiple observers
    if (window.__PERFORMANCE_OBSERVER__) {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      for (const entry of entries) {
        if (entry.entryType === "measure" && entry.name.includes("React")) {
          console.log(
            `[Performance] ${entry.name}: ${entry.duration.toFixed(2)}ms`,
          );
        }

        // Monitor paint times
        if (entry.entryType === "paint") {
          console.log(
            `[Performance] ${entry.name}: ${entry.startTime.toFixed(2)}ms`,
          );
        }

        // Monitor layout shifts
        if (entry.entryType === "layout-shift" && (entry as any).value > 0.1) {
          console.warn(
            `[Performance] Layout shift detected: ${(entry as any).value}`,
          );
        }
      }
    });

    try {
      observer.observe({ entryTypes: ["measure", "paint", "layout-shift"] });
      window.__PERFORMANCE_OBSERVER__ = observer;
    } catch (error) {
      console.warn(
        "[Performance] Could not observe performance metrics:",
        error,
      );
    }

    return () => {
      observer.disconnect();
      delete window.__PERFORMANCE_OBSERVER__;
    };
  }, []);

  return null;
}
