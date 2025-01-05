"use client";

import Link from "next/link";
import Image from "next/image";

import { FaGithub, FaStar } from "react-icons/fa";

import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const headingText = "Build stunning websites with less effort";
  const [stars, setStars] = useState<number | null>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/preetsuthar17/HextaUI",
        );
        const data = await response.json();
        setStars(data.stargazers_count);
        animate(count, data.stargazers_count, {
          duration: 2,
          ease: "easeOut",
        });
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    };

    fetchStars();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <>
      <section className="border border-primary/10 min-h-screen max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden">
        {/* gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/10 opacity-80 to-transparent z-[-1]"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] bg-homecards rounded-full z-[-1] blur-[30px]"></div>
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
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="text-5xl font-bold tracking-tight text-pretty"
          >
            {headingText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterAnimation}
                transition={{ duration: 0.3 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-primary/70 text-lg"
          >
            <span className="text-primary">Modern</span>,{" "}
            <span className="text-primary">responsive</span>, and{" "}
            <span className="text-primary">customizable UI</span> components
            designed for Next.js. Copy, adapt, and make them uniquely yours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center flex-wrap gap-2"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/docs/get-started"
                className="px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 "
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://github.com/preetsuthar17/HextaUI"
                target="_blank"
                className="px-6 bg-gradient-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 hover group"
              >
                <FaGithub /> Star on GitHub{" "}
                <span>
                  <FaStar className="group-hover:fill-yellow-300" />
                </span>{" "}
                <motion.span>{rounded}</motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="relative overflow-hidden w-[1200px] max-sm:w-[1000px] h-full p-8 mb-8 mt-8 rounded-xl">
          <motion.div
            initial={{ x: "100%", y: "100%" }}
            animate={{ x: "10%", y: 0 }}
            transition={{
              type: "spring",
              duration: 1,
              bounce: 0.2,
            }}
          >
            <Image
              src="/hero-image.webp"
              alt="Hero Image"
              width={1920}
              height={1080}
              quality={100}
              layout="responsive"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAABJRU5ErkJggg=="
              className="rounded-xl shadow-xl scale-[1.1]"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
