"use client";

import { VideoPlayer } from "./VideoPlayer";
import * as React from "react";

export const VideoPlayerDemo = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://peach.blender.org/wp-content/uploads/bbb-splash.png"
        size="default"
      />
    </div>
  );
};

export const VideoPlayerSizes = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Small</p>
        <VideoPlayer
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          size="sm"
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default</p>
        <VideoPlayer
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          size="default"
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large</p>
        <VideoPlayer
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          size="lg"
        />
      </div>
    </div>
  );
};

export const VideoPlayerWithPoster = () => {
  return (
    <VideoPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      poster="https://peach.blender.org/wp-content/uploads/bbb-splash.png"
      size="default"
    />
  );
};

export const VideoPlayerAutoHide = () => {
  return (
    <VideoPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      autoHide={true}
      size="default"
    />
  );
};

export const VideoPlayerNoControls = () => {
  return (
    <VideoPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      showControls={false}
      size="default"
    />
  );
};

export const VideoPlayerFullWidth = () => {
  return (
    <VideoPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      size="full"
      className="aspect-video"
    />
  );
};
