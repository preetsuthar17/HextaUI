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
  List,
  ListOrdered,
  Quote,
} from "lucide-react";

export function ToggleGroupExample() {
  const [textFormat, setTextFormat] = React.useState<string[]>([]);
  const [alignment, setAlignment] = React.useState<string>("left");
  const [listType, setListType] = React.useState<string>("");

  const handleTextFormatToggle = (format: string) => {
    setTextFormat((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format],
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* Text Formatting Group */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Text Formatting Group</h4>
        <p className="text-xs text-muted-foreground">
          Multiple toggles can be active at once
        </p>{" "}
        <div className="flex gap-1 p-1 bg-background rounded-ele w-fit border">
          <Toggle
            variant="ghost"
            size="icon"
            pressed={textFormat.includes("bold")}
            onPressedChange={() => handleTextFormatToggle("bold")}
            aria-label="Toggle bold"
            className={
              textFormat.includes("bold")
                ? "bg-accent text-accent-foreground"
                : ""
            }
          >
            <Bold />
          </Toggle>{" "}
          <Toggle
            variant="ghost"
            size="icon"
            pressed={textFormat.includes("italic")}
            onPressedChange={() => handleTextFormatToggle("italic")}
            aria-label="Toggle italic"
            className={
              textFormat.includes("italic")
                ? "bg-accent text-accent-foreground"
                : ""
            }
          >
            <Italic />
          </Toggle>
          <Toggle
            variant="ghost"
            size="icon"
            pressed={textFormat.includes("underline")}
            onPressedChange={() => handleTextFormatToggle("underline")}
            aria-label="Toggle underline"
            className={
              textFormat.includes("underline")
                ? "bg-accent text-accent-foreground"
                : ""
            }
          >
            <Underline />
          </Toggle>
        </div>
        <div className="text-xs text-muted-foreground">
          Active formats:{" "}
          {textFormat.length > 0 ? textFormat.join(", ") : "none"}
        </div>
      </div>{" "}
      {/* Alignment Group */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Text Alignment Group</h4>
        <p className="text-xs text-muted-foreground">
          Only one alignment can be active at a time
        </p>{" "}
        <div className="flex gap-1 p-1 bg-background rounded-ele w-fit border">
          <Toggle
            variant="ghost"
            size="icon"
            pressed={alignment === "left"}
            onPressedChange={() => setAlignment("left")}
            aria-label="Align left"
            className={
              alignment === "left" ? "bg-accent text-accent-foreground" : ""
            }
          >
            <AlignLeft />
          </Toggle>
          <Toggle
            variant="ghost"
            size="icon"
            pressed={alignment === "center"}
            onPressedChange={() => setAlignment("center")}
            aria-label="Align center"
            className={
              alignment === "center" ? "bg-accent text-accent-foreground" : ""
            }
          >
            <AlignCenter />
          </Toggle>
          <Toggle
            variant="ghost"
            size="icon"
            pressed={alignment === "right"}
            onPressedChange={() => setAlignment("right")}
            aria-label="Align right"
            className={
              alignment === "right" ? "bg-accent text-accent-foreground" : ""
            }
          >
            <AlignRight />
          </Toggle>
        </div>
        <div className="text-xs text-muted-foreground">
          Current alignment: {alignment}
        </div>
      </div>{" "}
      {/* List Type Group */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">List Type Group</h4>
        <p className="text-xs text-muted-foreground">
          Toggle between different list types or none
        </p>{" "}
        <div className="flex gap-1 p-1 bg-background rounded-ele w-fit border">
          <Toggle
            variant="ghost"
            size="icon"
            pressed={listType === "bullet"}
            onPressedChange={() =>
              setListType(listType === "bullet" ? "" : "bullet")
            }
            aria-label="Bullet list"
            className={
              listType === "bullet" ? "bg-accent text-accent-foreground" : ""
            }
          >
            <List />
          </Toggle>
          <Toggle
            variant="ghost"
            size="icon"
            pressed={listType === "numbered"}
            onPressedChange={() =>
              setListType(listType === "numbered" ? "" : "numbered")
            }
            aria-label="Numbered list"
            className={
              listType === "numbered" ? "bg-accent text-accent-foreground" : ""
            }
          >
            <ListOrdered />
          </Toggle>
          <Toggle
            variant="ghost"
            size="icon"
            pressed={listType === "quote"}
            onPressedChange={() =>
              setListType(listType === "quote" ? "" : "quote")
            }
            aria-label="Quote"
            className={
              listType === "quote" ? "bg-accent text-accent-foreground" : ""
            }
          >
            <Quote />
          </Toggle>
        </div>
        <div className="text-xs text-muted-foreground">
          Current list type: {listType || "none"}
        </div>
      </div>
      {/* Combined Toolbar */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Rich Text Toolbar</h4>
        <p className="text-xs text-muted-foreground">
          Complete text editor toolbar with grouped toggles
        </p>
        <div className="flex gap-2 p-2 bg-background rounded-ele w-fit border">
          {" "}
          {/* Text formatting group */}
          <div className="flex gap-1">
            <Toggle
              variant="ghost"
              size="icon"
              pressed={textFormat.includes("bold")}
              onPressedChange={() => handleTextFormatToggle("bold")}
              aria-label="Toggle bold"
            >
              <Bold />
            </Toggle>
            <Toggle
              variant="ghost"
              size="icon"
              pressed={textFormat.includes("italic")}
              onPressedChange={() => handleTextFormatToggle("italic")}
              aria-label="Toggle italic"
            >
              <Italic />
            </Toggle>
            <Toggle
              variant="ghost"
              size="icon"
              pressed={textFormat.includes("underline")}
              onPressedChange={() => handleTextFormatToggle("underline")}
              aria-label="Toggle underline"
            >
              <Underline />
            </Toggle>
          </div>
          {/* Separator */}
          <div className="w-px h-6 bg-border" /> {/* Alignment group */}
          <div className="flex gap-1">
            <Toggle
              variant="ghost"
              size="icon"
              pressed={alignment === "left"}
              onPressedChange={() => setAlignment("left")}
              aria-label="Align left"
            >
              <AlignLeft />
            </Toggle>
            <Toggle
              variant="ghost"
              size="icon"
              pressed={alignment === "center"}
              onPressedChange={() => setAlignment("center")}
              aria-label="Align center"
            >
              <AlignCenter />
            </Toggle>
            <Toggle
              variant="ghost"
              size="icon"
              pressed={alignment === "right"}
              onPressedChange={() => setAlignment("right")}
              aria-label="Align right"
            >
              <AlignRight />
            </Toggle>
          </div>
          {/* Separator */}
          <div className="w-px h-6 bg-border" /> {/* List type group */}
          <div className="flex gap-1">
            <Toggle
              variant="ghost"
              size="icon"
              pressed={listType === "bullet"}
              onPressedChange={() =>
                setListType(listType === "bullet" ? "" : "bullet")
              }
              aria-label="Bullet list"
            >
              <List />
            </Toggle>
            <Toggle
              variant="ghost"
              size="icon"
              pressed={listType === "numbered"}
              onPressedChange={() =>
                setListType(listType === "numbered" ? "" : "numbered")
              }
              aria-label="Numbered list"
            >
              <ListOrdered />
            </Toggle>
            <Toggle
              variant="ghost"
              size="icon"
              pressed={listType === "quote"}
              onPressedChange={() =>
                setListType(listType === "quote" ? "" : "quote")
              }
              aria-label="Quote"
            >
              <Quote />
            </Toggle>
          </div>
        </div>
      </div>
    </div>
  );
}
