"use client";

import Link from "next/link";
import Image from "next/image";

import { FaGithub } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="border border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden py-20">
      {/* gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-primary/10 opacity-80 to-transparent z-[-1]"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-background rounded-full z-[-1] blur-[30px]"></div>
      {/* gradient */}

      {/* background bars */}
      <div className="flex items-center justify-between w-full h-fit absolute overflow-hidden bottom-0 skew-x-[-45deg] left-[10rem] z-[-1]">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="flex w-[2px] h-[30rem] bg-linear-to-t from-primary/5 to-transparent"
          ></div>
        ))}
      </div>
      {/* background bars */}

      <div className="flex flex-col items-center justify-center gap-8 p-16 max-sm:p-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight">
          Ready to build something amazing?
        </h2>
        <p className="text-primary/70 text-lg max-w-2xl">
          Join thousands of developers who are already using HextaUI to create
          stunning websites with less effort. Start building today!
        </p>
        <div className="flex items-center flex-wrap justify-center gap-4">
          <Link
            href="/docs/get-started"
            className="px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 "
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/preetsuthar17/HextaUI"
            target="_blank"
            className="px-6 bg-linear-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 "
          >
            <FaGithub /> Star on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
