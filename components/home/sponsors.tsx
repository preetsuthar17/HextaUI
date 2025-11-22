"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Sponsor {
  name: string;
  logo: string;
  url: string;
  tier?: "platinum" | "gold" | "silver" | "bronze";
}

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

export const Sponsors = memo(function Sponsors() {
  const sortedSponsors = useMemo(
    () =>
      [...sponsors].sort(
        (a, b) =>
          (tierOrder[a.tier || "bronze"] ?? 5) -
          (tierOrder[b.tier || "bronze"] ?? 5)
      ),
    []
  );

  if (!sponsors.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-2xl tracking-tight">Sponsors</h2>
      <TooltipProvider>
        <div className="flex flex-wrap gap-2">
          {sortedSponsors.map((sponsor) => {
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
            return (
              <Tooltip key={sponsor.name}>
                <TooltipTrigger asChild>
                  <Link
                    aria-label={`${sponsor.name} – ${tier[0].toUpperCase() + tier.slice(1)} Sponsor`}
                    className={cn(
                      "flex aspect-square items-center justify-center overflow-hidden rounded-full bg-card p-0 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      styles.size,
                      styles.border,
                      styles.shadow
                    )}
                    href={sponsor.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt={sponsor.name}
                      className="size-full object-contain opacity-70 transition-opacity hover:opacity-100"
                      height={48}
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
