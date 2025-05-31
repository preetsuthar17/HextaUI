import Link from "next/link";

import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";
import Image from "next/image";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Showcase",
  description:
    "Modern, responsive, customizable UI components for Next.js. Copy, adapt, and personalize them.",
  ogImage: "/banner.png",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://hextaui.com/showcase",
});

const ShowcaseWebsites = [
  {
    id: 1,
    title: "Maxim Bortnikov",
    description:
      "Maxim Bortnikov's personal website showcasing his portfolio and projects.",
    url: "https://maxim-bortnikov.netlify.app/",
  },
];

const ShowcasePage = () => {
  return (
    <>
      <main className="flex flex-1 flex-col justify-center text-center mt-20 gap-5 mb-20 z-0">
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
                <span className="text-primary">Showcase</span>
              </span>
            </h1>
            <p className="text-primary/70 text-lg">
              A list of awesome websites built using HextaUI.
            </p>
            <div className="flex items-start flex-wrap gap-4 flex-col w-full">
              <div className="flex items-center flex-wrap gap-2 w-full">
                <div className="max-[400px]:w-full">
                  <Link
                    href="https://github.com/preetsuthar17/HextaUI/discussions/1"
                    target="_blank"
                    className="px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 z-9999 "
                  >
                    Suggest your website
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden">
          {ShowcaseWebsites.length > 0 ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ShowcaseWebsites.map((website, index) => (
                  <Link
                    href={website.url}
                    target="_blank"
                    key={index}
                    className="group block"
                  >
                    <div className="border border-primary/10  overflow-hidden bg-background hover:border-primary/20 transition-all duration-300 h-full">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={`/showcase/${website.id}.png`}
                          alt={website.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                          {website.title}
                        </h3>
                        <p className="text-primary/70 text-sm line-clamp-2 leading-relaxed">
                          {website.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-primary/50 truncate font-medium">
                            {new URL(website.url).hostname}
                          </span>
                          <div className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              className="w-full h-full"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 p-12 text-center">
              <p className="text-primary/70">No website found!</p>
              <Link
                href="https://github.com/preetsuthar17/HextaUI/discussions/1"
                target="_blank"
                className="px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 shadow-inner shadow-black/10"
              >
                Suggest your website
              </Link>
            </div>
          )}
        </section>

        <p className="text-gray-500 text-center">
          You can check out all showcase websites{" "}
          <Link
            href="https://github.com/preetsuthar17/HextaUI/discussions/1"
            target="_blank"
            className="text-primary underline"
          >
            Here
          </Link>
        </p>
      </main>
    </>
  );
};

export default ShowcasePage;
