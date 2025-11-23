"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  var _carbonads: {
    refresh: () => void;
  };
}

const CarbonAds = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.querySelector("#carbonads");
    if (prev && prev.parentElement) {
      prev.parentElement.removeChild(prev);
    }

    const script = document.createElement("script");
    script.src =
      "//cdn.carbonads.com/carbon.js?serve=CW7IE2JM&placement=hextauicom&format=cover";
    script.id = "_carbonads_js";
    script.async = true;

    const container = containerRef.current;
    if (container) {
      container.appendChild(script);
    }

    return () => {};
  }, [pathname]);

  return (
    <div
      className="carbon-container"
      id="carbon-container"
      ref={containerRef}
      style={{ minHeight: 130, minWidth: 225, position: "relative" }}
    />
  );
};

export default CarbonAds;
