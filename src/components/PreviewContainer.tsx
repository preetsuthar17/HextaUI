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
  const [rotation, setRotation] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
    setRotation((prev) => prev + 360);
  };

  return (
    <div className="relative overflow-hidden">
      <button
        onClick={handleRefresh}
        className="absolute top-4 right-4 z-2 p-2 rounded-full hover:bg-[hsl(var(--hu-accent))] transition-colors"
        aria-label="Refresh preview"
      >
        <RefreshCw
          className="w-4 h-4 text-primary/70 transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </button>
      <div
        key={key}
        className={cn(
          "border border-[hsl(var(--hu-border))] min-h-[30rem] rounded-[var(--radius)] p-4 flex items-center justify-center not-prose relative bg-[var(--hu-background)]",
          className,
        )}
      >
        <div className="relative z-0 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};
