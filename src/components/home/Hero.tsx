"use client";

import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowBigRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

import { VideoPlayer } from "../ui/VideoPlayer";

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
import CarbonAds from "../other/carbon";

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
      <section className="relative flex flex-col items-center justify-center gap-12 px-10 text-center py-16 pt-24">
        <div className="flex items-center justify-center gap-4 flex-col">
          <Badge
            icon={Sparkles}
            className="rounded-full cursor-pointer"
            variant={"secondary"}
            onClick={() => {
              window.open("https://pro.hextaui.com", "_blank");
            }}
          >
            Introducing pre-built blocks
          </Badge>
        </div>
        <div className="flex items-center justify-center gap-4 flex-col">
          <h1 className="text-6xl max-sm:text-4xl font-medium tracking-tighter">
            Build stunning websites effortlessly
          </h1>
          <p className="max-sm:text-sm">
            Modern, responsive, and customizable UI components. Copy, adapt, and
            personalize them.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button asChild className=" grow  h-12" size={"lg"}>
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
                GitHub
              </span>
              <span className="opacity-70">-</span>
              <span>
                <span className="opacity-70">{stars ? stars : "000"}</span>
              </span>
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
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
        <div className="border rounded-[var(--radius))] overflow-hidden w-full ">
          <VideoPlayer
            src="https://5xfmztgsig.ufs.sh/f/ZzCwT4wrsqrVAxvzLGNbFLIwa6jGOv4xSYBbUiV8flqz3KPy"
            poster="https://5xfmztgsig.ufs.sh/f/ZzCwT4wrsqrV9FceSLIpSmnpVdxc0kOoYPTae1HtKsCWgXhl"
            size={"full"}
            className="w-full h-auto rounded-[var(--radius))]"
          />
        </div>
        <CarbonAds format="cover" />
      </section>
    </>
  );
};

export default Hero;
