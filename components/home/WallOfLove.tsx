"use client";

import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { Tweet } from "react-tweet";
import { useEffect, useState } from "react";

const tweets = [
  "1920730864687763482",
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
  "1877370115185897503",
  "1877366311241548273",
  "1877366719775129689",
  "1877552363809948079",
  "1785958241970913372",
  "1788483420617588972",
  "1791555321871122586",
  "1793606675745878490",
  "1794994587213451321",
  "1787088566025122186",
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
    <section className="border border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden py-20 bg-homecards">
      <div className="flex flex-col gap-8 p-8 max-sm:p-4">
        <div className="text-center">
          <div className="flex items-center justify-center flex-col gap-4 mb-20 px-2">
            <div>
              <h2 className="text-4xl font-bold mb-4 flex items-center gap-4 justify-center flex-wrap">
                <FaTwitter className="text-primary text-3xl fill-[#01a3f2]" />
                Wall of Love
              </h2>
              <p className="text-primary/70 text-lg mb-8">
                Join other developers who love HextaUI
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden [--gap:1rem] h-[90rem] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,transparent_100%)] [--duration:500s]">
            {Array.from({ length: columnCount }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col overflow-hidden group"
              >
                <div className="flex flex-col animate-marqueeY group-hover:[animation-play-state:paused]">
                  {Array(8)
                    .fill(0)
                    .map((_, repeatIndex) => (
                      <div key={repeatIndex} className="flex flex-col">
                        {tweets
                          .slice(
                            colIndex * TWEETS_PER_COLUMN,
                            (colIndex + 1) * TWEETS_PER_COLUMN
                          )
                          .map((tweetId) => (
                            <Tweet
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

          <div className="flex items-center justify-center text-center mt-8">
            <div className="text-center text-primary/70">
              <Link
                className="px-6 bg-linear-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10"
                href="https://twitter.com/intent/tweet?text=I%20love%20HextaUI%20%F0%9F%92%96%0A%0Ahttps%3A%2F%2Fhextaui.com&url="
              >
                Share your experience
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WallOfLove;
