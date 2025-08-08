"use client";

import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { Button } from "./ui/button";

interface PreviewContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PreviewContainer = ({
  children,
  className,
}: PreviewContainerProps) => {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const [key, setKey] = useState(0);
  const [rotation, setRotation] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
    setRotation((prev) => prev + 360);
  };

  const handleDirection = () =>
    setDirection((prev) => (prev === "ltr" ? "rtl" : "ltr"));

  return (
    <DirectionProvider dir={direction}>
      <div className="relative overflow-hidden">
        <button
          onClick={handleRefresh}
          className="absolute top-4 right-4 z-2 p-2 rounded-full hover:bg-accent transition-colors"
          aria-label="Refresh preview"
        >
          <RefreshCw
            className="w-4 h-4 text-primary/70 transition-transform duration-300"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </button>
        <Button
          variant={"secondary"}
          onClick={handleDirection}
          className="absolute top-4 right-4 z-2 py-0 px-3"
        >
          {direction}
        </Button>
        <div
          key={key}
          className={cn(
            "border border-border min-h-[30rem] rounded-ele p-4 flex items-center justify-center not-prose relative bg-[var(--hu-background)]",
            className,
          )}
        >
          <div
            className="relative z-0 w-full h-full flex items-center justify-center"
            dir={direction}
          >
            {children}
          </div>
        </div>
      </div>
    </DirectionProvider>
  );
};
