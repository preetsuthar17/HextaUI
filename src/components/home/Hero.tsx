"use client";

import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FaGithub, FaReact } from "react-icons/fa";
import {
  SiRadixui,
  SiTypescript,
  SiLucide,
  SiTailwindcss,
} from "react-icons/si";

const Hero = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/preetsuthar17/HextaUI",
        );
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error("Failed to fetch stars:", error);
      }
    };

    fetchStars();
  }, []);

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-8 px-10 h-[40rem] text-center py-24">
        <div className="flex items-center justify-center gap-4 flex-col">
          <Badge icon={Sparkles} className="rounded-full" variant={"secondary"}>
            Introducing HextaUI Blocks
          </Badge>
        </div>
        <div className="flex items-center justify-center gap-4 flex-col">
          <h1 className="text-6xl max-sm:text-4xl font-medium tracking-tight ">
            Build stunning websites effortlessly
          </h1>
          <p className="max-sm:text-sm">
            Modern, responsive, and customizable UI components for Next.js.
            Copy, adapt, and personalize them.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button asChild className="shadow-md grow  h-12" size={"lg"}>
            <Link
              href="/docs/ui/getting-started/introduction"
              className="font-normal"
            >
              Get Started <span className="opacity-70">- It's free</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className=" grow h-12" size={"lg"}>
            <Link
              href="https://github.com/preetsuthar17/HextaUI"
              className="font-normal flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                <FaGithub />
                Github
              </span>
              <span className="opacity-70">-</span>
              <span>
                {stars && <span className="opacity-70">{stars || 0}</span>}
              </span>
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-3 text-sm text-[hsl(var(--hu-muted-foreground))]">
          Built with{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaReact />
              </TooltipTrigger>
              <TooltipContent size={"sm"}>
                <p>React</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <SiRadixui />
              </TooltipTrigger>
              <TooltipContent size={"sm"}>
                <p>RadixUI</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <SiTailwindcss />
              </TooltipTrigger>
              <TooltipContent size={"sm"}>
                <p>Tailwind CSS</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <SiTypescript />
              </TooltipTrigger>
              <TooltipContent size={"sm"}>
                <p>TypeScript</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <SiLucide />
              </TooltipTrigger>
              <TooltipContent size={"sm"}>
                <p>Lucide</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>
    </>
  );
};

export default Hero;
