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
        className="absolute top-4 right-4 z-9999999999 p-2 rounded-full hover:bg-[hsl(var(--hu-accent))] transition-colors"
        aria-label="Refresh preview"
      >
        <RefreshCw className="w-4 h-4 text-primary/70" />
      </button>
      <div
        key={key}
        className={cn(
          "border border-[hsl(var(--hu-border))] min-h-[30rem] rounded-xl p-4 flex items-center justify-center not-prose overflow-hidden relative bg-[var(--hu-background)]",
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
