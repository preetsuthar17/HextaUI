"use client";

import React from "react";
import { Toggle } from "./index";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

export function ToggleExamples() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Text Formatting</h4>
        <p className="text-xs text-muted-foreground">
          Toggle buttons for text formatting options
        </p>
        <div className="flex gap-2">
          <Toggle leftIcon={<Bold />} aria-label="Toggle bold">
            Bold
          </Toggle>
          <Toggle leftIcon={<Italic />} aria-label="Toggle italic">
            Italic
          </Toggle>
          <Toggle leftIcon={<Underline />} aria-label="Toggle underline">
            Underline
          </Toggle>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Text Alignment</h4>
        <p className="text-xs text-muted-foreground">
          Toggle buttons for text alignment with icons only
        </p>
        <div className="flex gap-2">
          <Toggle variant="outline" size="icon" aria-label="Align left">
            <AlignLeft />
          </Toggle>
          <Toggle variant="outline" size="icon" aria-label="Align center">
            <AlignCenter />
          </Toggle>
          <Toggle variant="outline" size="icon" aria-label="Align right">
            <AlignRight />
          </Toggle>
        </div>
      </div>
    </div>
  );
}
