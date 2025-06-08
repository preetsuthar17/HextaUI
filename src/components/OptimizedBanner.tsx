"use client";

import { Banner } from "fumadocs-ui/components/banner";
import { memo } from "react";

interface OptimizedBannerProps {
  variant?: "rainbow" | "normal";
  children: React.ReactNode;
}

const OptimizedBanner = memo(function OptimizedBanner({
  variant = "rainbow",
  children,
}: OptimizedBannerProps) {
  return (
    <div
      data-banner
      data-variant={variant}
      style={{
        // Force banner onto its own composite layer to prevent repaints of other elements
        transform: "translateZ(0)",
        // Prevent unnecessary layer promotions during animations
        willChange: "auto",
        // Optimize for potential 3D transforms
        backfaceVisibility: "hidden",
        // Contain paint and layout to prevent expensive cascading updates
        contain: "layout style paint",
      }}
    >
      <Banner variant={variant}>{children}</Banner>
    </div>
  );
});

export default OptimizedBanner;
