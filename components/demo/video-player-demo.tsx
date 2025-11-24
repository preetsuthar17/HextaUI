"use client";

import { VideoPlayer } from "@/registry/new-york/ui/video-player";

export function VideoPlayerDemo() {
  return (
    <div className="h-full w-full">
      <VideoPlayer
        className="h-full w-full"
        poster="https://peach.blender.org/wp-content/uploads/bbb-splash.png"
        size="full"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </div>
  );
}

export default VideoPlayerDemo;
