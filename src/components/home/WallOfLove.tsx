"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { ClientTweetCard } from "./Tweet/ClientTweetCard";
import { useEffect, useState } from "react";

const tweets = [
  "1920730864687763482",
  "1923850294204522637",
  "1875895384226373680",
  "1782653978683072684",
  "1787091751997440143",
  "1782680701067776207",
  "1786800646433423488",
  "1877006457331224849",
  "1787135072392364394",
  "1787163815987007863",
  "1785345519033684406",
  "1877385160850583852",
  "1877552363809948079",
  "1785958241970913372",
  "1788483420617588972",
  "1791555321871122586",
  "1793606675745878490",
  "1794994587213451321",
  "1787088566025122186",
  "1934623769710248082",
  "1934692332819108113",
  "1934668017389969728",
];

const useWindowSize = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const WallOfLove = () => {
  const width = useWindowSize();
  const getColumnCount = () => {
    if (width < 768) return 1; // mobile
    if (width < 1024) return 2; // tablet
    return 3; // desktop
  };

  const columnCount = getColumnCount();
  const TWEETS_PER_COLUMN = Math.ceil(tweets.length / columnCount);

  return (
    <section className="flex flex-col items-center justify-center gap-16 py-28 px-8 text-center w-full border-t">
      <div className="flex items-center justify-center gap-6 flex-col">
        <Badge variant="secondary" className="px-4 py-2">
          <Heart className="w-3 h-3 text-red-500" />
          Wall of Love
        </Badge>
        <h2 className="text-4xl font-medium">Loved by developers worldwide</h2>
        <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
          See what developers and designers are saying about HextaUI.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden [--gap:1rem] h-[90rem] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,transparent_100%)] [--duration:500s]">
        {Array.from({ length: columnCount }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col overflow-hidden group">
            <div className="flex flex-col animate-marqueeY group-hover:[animation-play-state:paused]">
              {Array(8)
                .fill(0)
                .map((_, repeatIndex) => (
                  <div key={repeatIndex} className="flex flex-col ">
                    {tweets
                      .slice(
                        colIndex * TWEETS_PER_COLUMN,
                        (colIndex + 1) * TWEETS_PER_COLUMN,
                      )
                      .map((tweetId) => (
                        <ClientTweetCard
                          key={`${tweetId}-${repeatIndex}`}
                          id={tweetId}
                        />
                      ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Join thousands of developers who trust HextaUI for their projects.
      </p>
    </section>
  );
};

export default WallOfLove;
