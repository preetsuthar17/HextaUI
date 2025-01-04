import Link from "next/link";
import Image from "next/image";

import { FaGithub } from "react-icons/fa";

import { FaPaintBrush } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

const Hero = () => {
  return (
    <>
      <section className="border border-primary/10 min-h-screen max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden">
        {/* gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/10 opacity-80 to-transparent z-[-1]"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-background rounded-full z-[-1] blur-[30px]"></div>
        {/* gradient */}

        {/* background bars */}
        <div className="flex items-center justify-between w-full h-fit absolute overflow-hidden bottom-0 skew-x-[-45deg] left-[10rem]">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="flex w-[2px] h-[40rem] bg-gradient-to-t from-primary/10 to-transparent"
            ></div>
          ))}
        </div>
        {/* background bars */}

        <div className="flex flex-col justify-center gap-8 p-[2rem] max-sm:px-[1rem]">
          <h1 className="text-5xl font-bold tracking-tight text-pretty">
            Build stunning websites with less effort
          </h1>
          <p className="text-primary/70 text-lg">
            <span className="text-primary">Modern</span>,{" "}
            <span className="text-primary">responsive</span>, and{" "}
            <span className="text-primary">customizable UI</span> components
            designed for Next.js. Copy, adapt, and make them uniquely yours.
          </p>
          <div className="flex items-center flex-wrap gap-2">
            <Link
              href="/docs"
              className="px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/20"
            >
              Get Started
            </Link>
            <Link
              href="/components"
              className="px-6 bg-gradient-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/20"
            >
              <FaGithub /> Star on GitHub
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden w-[1200px] max-sm:w-[1000px] h-full p-8 mb-8 mt-8 rounded-xl">
          <Image
            src="https://i.imgur.com/bDLGgyE.png"
            alt="Hero Image"
            width={1920}
            height={1080}
            quality={100}
            layout="responsive"
            className="translate-x-[10%] rounded-xl shadow-xl scale-[1.1]"
          />
        </div>
      </section>
    </>
  );
};

const Features = () => {
  return (
    <>
      <section className="border border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden flex max-md:flex-col">
        <div className="grow p-[2rem] flex flex-col gap-4 max-sm:px-[1rem]  max-md:border-b border-r">
          <h2 className="text-xl flex items-baseline gap-3 font-medium text-pretty">
            <FaPaintBrush size={18}/> Customization
          </h2>
          <p className="text-primary/80 text-pretty">
            Customize any components with your own style seamlessly!
          </p>
        </div>
        <div className="grow p-[2rem] flex flex-col gap-4 max-sm:px-[1rem]  max-md:border-b border-r">
          <h2 className="text-xl flex items-baseline gap-3 font-medium text-nowrap max-sm:text-wrap">
            <FaStar size={18}/>  Stunning Components
          </h2>
          <p className="text-primary/80 text-pretty">
            Modern, responsive, and customizable UI components designed for
            Next.js.
          </p>
        </div>
        <div className="grow p-[2rem] flex flex-col gap-4 max-sm:px-[1rem]   ">
          <h2 className="text-xl flex items-baseline gap-3 font-medium text-nowrap max-sm:text-wrap">
          <FaCode size={18}/>  Your Project, Your Code
          </h2>
          <p className="text-primary/80 text-pretty">
            Copy, adapt, and make them uniquely yours. Build stunning websites
            with less effort.
          </p>
        </div>
      </section>
    </>
  );
};

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center my-20">
      <Hero />
      <Features />
    </main>
  );
}
