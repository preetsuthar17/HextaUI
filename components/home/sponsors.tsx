"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

interface Sponsor {
  name: string;
  logo: string;
  url: string;
  tier?: "platinum" | "gold" | "silver" | "bronze";
}

// Sponsor avatar placeholder (SVG, minimal)
const SponsorPlaceholder = ({ className }: { className?: string }) => (
  <span
    aria-label="Loading sponsor"
    className={cn(
      "flex items-center justify-center rounded-full bg-muted",
      className
    )}
    role="img"
  >
    <svg
      aria-hidden="true"
      className="size-3/4 opacity-60"
      focusable="false"
      height={48}
      viewBox="0 0 48 48"
      width={48}
    >
      <circle
        className="text-muted-foreground"
        cx="24"
        cy="24"
        fill="currentColor"
        r="20"
      />
      <ellipse cx="24" cy="36" fill="#fff" opacity="0.2" rx="14" ry="7" />
      <circle cx="24" cy="20" fill="#fff" opacity="0.25" r="8" />
    </svg>
  </span>
);

const tierStyles = {
  platinum: {
    size: "size-20",
    border: "border-2 border-primary",
    shadow: "shadow-lg shadow-primary/20",
  },
  gold: {
    size: "size-[72px]",
    border: "border-2 border-yellow-500/50",
    shadow: "shadow-md shadow-yellow-500/10",
  },
  silver: {
    size: "size-16",
    border: "border border-gray-400/50",
    shadow: "shadow-sm",
  },
  bronze: {
    size: "size-14",
    border: "border border-orange-600/50",
    shadow: "",
  },
};

const sponsors: Sponsor[] = [
  {
    name: "itsemirhanengin",
    logo: "https://github.com/itsemirhanengin.png",
    url: "https://github.com/itsemirhanengin",
    tier: "silver",
  },
  {
    name: "AyanavaKarmakar",
    logo: "https://github.com/AyanavaKarmakar.png",
    url: "https://github.com/AyanavaKarmakar",
    tier: "bronze",
  },
  {
    name: "hiretimsf",
    logo: "https://github.com/hiretimsf.png",
    url: "https://github.com/hiretimsf",
    tier: "silver",
  },
  {
    name: "shadcnblocks",
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/images/logo/shadcnblocks-logo.svg",
    url: "https://shadcnblocks.com",
    tier: "platinum",
  },
  {
    name: "ticketping-com",
    logo: "https://github.com/ticketping-com.png",
    url: "https://github.com/ticketping-com",
    tier: "platinum",
  },
  {
    name: "impoiler",
    logo: "https://github.com/impoiler.png",
    url: "https://github.com/impoiler",
    tier: "silver",
  },
  {
    name: "notnotDudu",
    logo: "https://github.com/notnotDudu.png",
    url: "https://github.com/notnotDudu",
    tier: "silver",
  },
];

const tierOrder: Record<string, number> = {
  platinum: 1,
  gold: 2,
  silver: 3,
  bronze: 4,
};

const PLACEHOLDER_COUNT = 6;

export const Sponsors = memo(function Sponsors() {
  // "loading" state - simulate fetch
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async load (replace with real fetch if needed)
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  const sortedSponsors = useMemo(
    () =>
      [...sponsors].sort(
        (a, b) =>
          (tierOrder[a.tier || "bronze"] ?? 5) -
          (tierOrder[b.tier || "bronze"] ?? 5)
      ),
    []
  );

  if (!(sponsors.length || loading)) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-2xl tracking-tight">Sponsors</h2>
      <TooltipProvider>
        <div className="flex flex-wrap gap-2">
          {loading
            ? Array.from({ length: PLACEHOLDER_COUNT }).map((_, idx) => {
                // Simulate basis for platinum/gold/silver for variety
                let tier: keyof typeof tierStyles = "silver";
                if (idx === 0) tier = "platinum";
                else if (idx < 3) tier = "silver";
                else if (idx === 3) tier = "bronze";
                const styles = tierStyles[tier];
                return (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative animate-pulse",
                      "flex aspect-square items-center justify-center overflow-hidden rounded-full bg-white p-0",
                      styles.size,
                      styles.border,
                      styles.shadow
                    )}
                    key={idx}
                  >
                    <SponsorPlaceholder className="size-full" />
                    <span className="sr-only">Loading sponsor…</span>
                  </span>
                );
              })
            : sortedSponsors.map((sponsor) => {
                const tier = sponsor.tier || "bronze";
                const styles = tierStyles[tier];
                const tooltipContent = (
                  <span className="font-semibold">
                    {sponsor.name}
                    <br />
                    <span className="font-normal">
                      {tier[0].toUpperCase() + tier.slice(1)} Sponsor
                    </span>
                  </span>
                );
                const extraProps =
                  sponsor.name === "shadcnblocks"
                    ? {
                        "data-s-event": "Sponsor link: shadcnblocks.com",
                        "data-s-event-props":
                          "location=sponsors;label=shadcnblocks.com",
                      }
                    : {};

                return (
                  <Tooltip key={sponsor.name}>
                    <TooltipTrigger asChild>
                      <Link
                        aria-label={`${sponsor.name} – ${tier[0].toUpperCase() + tier.slice(1)} Sponsor`}
                        className={cn(
                          "flex aspect-square items-center justify-center overflow-hidden rounded-full bg-white p-0 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          styles.size,
                          styles.border,
                          styles.shadow
                        )}
                        href={sponsor.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        {...extraProps}
                      >
                        <Image
                          alt={sponsor.name}
                          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23f3f3f3'/%3E%3C/svg%3E"
                          className="size-full bg-white object-contain transition-opacity"
                          height={48}
                          placeholder="blur"
                          src={sponsor.logo}
                          width={48}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-center" side="top">
                      {tooltipContent}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
        </div>
      </TooltipProvider>
    </div>
  );
});
