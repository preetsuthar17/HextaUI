"use client";

import React from "react";
import { Toggle } from "./index";
import { Heart, Star, Bookmark, ThumbsUp } from "lucide-react";

export function ToggleWithIcons() {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isStarred, setIsStarred] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isThumbsUp, setIsThumbsUp] = React.useState(false);

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Interactive Toggles</h4>
        <p className="text-xs text-muted-foreground">
          Toggle buttons with state management and different variants
        </p>
        <div className="flex gap-3 flex-wrap">
          <Toggle
            variant="outline"
            pressed={isLiked}
            onPressedChange={setIsLiked}
            leftIcon={<Heart className={isLiked ? "fill-current" : ""} />}
            aria-label="Toggle like"
          >
            {isLiked ? "Liked" : "Like"}
          </Toggle>

          <Toggle
            variant="ghost"
            pressed={isStarred}
            onPressedChange={setIsStarred}
            leftIcon={<Star className={isStarred ? "fill-current" : ""} />}
            aria-label="Toggle star"
          >
            {isStarred ? "Starred" : "Star"}
          </Toggle>

          <Toggle
            variant="secondary"
            pressed={isBookmarked}
            onPressedChange={setIsBookmarked}
            leftIcon={
              <Bookmark className={isBookmarked ? "fill-current" : ""} />
            }
            aria-label="Toggle bookmark"
          >
            {isBookmarked ? "Saved" : "Save"}
          </Toggle>

          <Toggle
            variant="default"
            size="icon"
            pressed={isThumbsUp}
            onPressedChange={setIsThumbsUp}
            aria-label="Toggle thumbs up"
          >
            <ThumbsUp className={isThumbsUp ? "fill-current" : ""} />
          </Toggle>
        </div>
      </div>
    </div>
  );
}
