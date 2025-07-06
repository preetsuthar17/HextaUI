"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  var _carbonads: {
    refresh: () => void;
  };
}

const CarbonAds = ({ format }: { format: string }) => {
  const pathname = usePathname();
  useEffect(() => {
    const isCarbonExist = document.querySelector("#carbonads");

    if (!!isCarbonExist) {
      // Check if _carbonads is available before calling refresh
      if (typeof _carbonads !== "undefined" && _carbonads.refresh) {
        _carbonads.refresh();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = `//cdn.carbonads.com/carbon.js?serve=CW7IE2JM&placement=hextauicom&format=${format}`;
    script.id = "_carbonads_js";
    script.async = true;

    const container = document.querySelector("#carbon-container");
    if (container) {
      container.appendChild(script);
    }
  }, [pathname]);

  return <div id="carbon-container" className="my-10"></div>;
};

export default CarbonAds;
