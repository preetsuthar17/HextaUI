"use client";

import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

interface PreviewContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PreviewContainer = ({
  children,
  className,
}: PreviewContainerProps) => {
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="relative">
      <button
        onClick={handleRefresh}
        className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-primary/10 transition-colors"
        aria-label="Refresh preview"
      >
        <RefreshCw className="w-4 h-4 text-primary/70" />
      </button>
      <div
        key={key}
        className={cn(
          "dark:bg-background border border-primary/10 min-h-[15rem] rounded-xl p-4 flex items-center justify-center not-prose overflow-hidden relative",
          className
        )}
      >
        {/* Dot pattern background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--dot-color, rgba(0,0,0,0.07)) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
            borderRadius: "inherit",
            // Set the dot color variable based on theme
            "--dot-color": "rgba(0,0,0,0.07)",
          } as React.CSSProperties}
        />
        <div
          className="absolute inset-0 pointer-events-none z-0 dark:block hidden"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--dot-color-dark, rgba(255,255,255,0.09)) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
            borderRadius: "inherit",
            "--dot-color-dark": "rgba(255,255,255,0.09)",
          } as React.CSSProperties}
        />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};
