"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { PixelBlast } from "@/components/pixel-blast";

async function fetchGitHubStars(): Promise<number | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/preetsuthar17/hextaui"
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

const DEFAULT_STAR_COUNT = 310;

export function Hero() {
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    fetchGitHubStars().then(setStarCount);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <PixelBlast />
      <div className="flex flex-col gap-6">
        <h1 className="flex flex-wrap items-center justify-center gap-2">
          Extended Components for
          <span className="inline-flex items-center gap-2 px-1">
            <Image
              alt="shadcn/ui"
              className="size-10 translate-y-0.2 rounded-full align-middle"
              height={36}
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              style={{ display: "inline-block" }}
              width={36}
            />
            <span>shadcn/ui</span>
          </span>
        </h1>
        <p className="text-muted-foreground">
          Ready-to-use foundation components/blocks built on top of shadcn/ui.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonGroup aria-label="View components">
            <Button asChild className="h-11" variant="default">
              <Link href="/components/accordion">View Components</Link>
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="GitHub repository">
            <Button asChild className="h-11" variant="outline">
              <Link
                href="https://github.com/preetsuthar17/hextaui"
                target="_blank"
              >
                GitHub
              </Link>
            </Button>
            <Button asChild className="h-11" variant="outline">
              <Link
                href="https://github.com/preetsuthar17/hextaui"
                target="_blank"
              >
                <Star aria-hidden="true" className="size-4" />
                <span>
                  {(starCount !== null
                    ? starCount
                    : DEFAULT_STAR_COUNT
                  ).toLocaleString()}
                </span>
              </Link>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
}
