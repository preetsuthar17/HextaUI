import Link from "next/link";

import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Sponsors",
  description:
    "Modern, responsive, customizable UI components for Next.js. Copy, adapt, and personalize them.",
  ogImage: "/banner.png",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://hextaui.com/sponsors",
});

export default function SponsorPage() {
  return (
    <>
      <main className="flex flex-1 flex-col justify-center text-center mt-20 gap-5 mb-20  z-0">
        {" "}
        <section className="border border-primary/10 min-h-[20rem] max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden flex items-center">
          {/* gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-primary/10 opacity-80 to-transparent z-[-1]"></div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-homecards rounded-full z-[-1] blur-[30px]"></div>
          {/* gradient */}

          {/* background bars */}
          <div className="flex items-center justify-between w-full h-fit absolute overflow-hidden bottom-0 skew-x-[-45deg] left-[10rem]">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="flex w-[2px] h-[40rem] bg-linear-to-t from-primary/10 to-transparent"
              ></div>
            ))}
          </div>
          {/* background bars */}

          <div className="flex flex-col justify-center gap-4 p-[2rem] max-sm:px-[1rem] z-9999">
            <h1 className="text-5xl font-bold tracking-tight text-pretty  flex flex-wrap gap-1 max-sm:text-4xl">
              <span className="flex flex-wrap gap-2">
                <span className="text-primary">Support HextaUI</span>
              </span>
            </h1>
            <p className="text-primary/70 text-lg">
              Your sponsorship supports HextaUI and our open-source projects.
              Thank you!
            </p>
            <div className="flex items-start flex-wrap gap-4 flex-col w-full">
              <div className="flex items-center flex-wrap gap-2 w-full">
                <div className="max-[400px]:w-full">
                  <Link
                    href="https://github.com/preetsuthar17/HextaUI/discussions/1"
                    target="_blank"
                    className="px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 z-9999 "
                  >
                    Sponsor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border border-primary/10 min-h-[20rem] max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden flex items-start justify-center">
          <p className="text-[clamp(1rem,16.3dvw,25rem)] font-bold tracking-tighter absolute bottom-[-5rem] opacity-4 ">
            HextaUI
          </p>
          <div className="flex flex-col justify-start gap-4 p-[2rem] max-sm:px-[1rem] z-9999">
            <div className="flex items-center justify-start flex-wrap gap-4 flex-col w-full">
              <div className="flex items-center justify-start flex-wrap gap-2 w-full flex-col">
                <p>Be the first one to sponsor HextaUI 🧡</p>
                <div className="max-[400px]:w-full">
                  <Link
                    href="https://github.com/preetsuthar17/HextaUI/discussions/1"
                    target="_blank"
                    className="px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 z-9999 "
                  >
                    Sponsor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
