"use client";

import Image from "next/image";
import Link from "next/link";
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
    size: "w-[72px] h-[72px]",
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

export function Sponsors() {
  if (!sponsors.length) return null;

  const sortedSponsors = [...sponsors].sort(
    (a, b) =>
      (tierOrder[a.tier || "bronze"] ?? 5) -
      (tierOrder[b.tier || "bronze"] ?? 5)
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-2xl tracking-tight">Sponsors</h2>
      <div className="flex flex-wrap gap-2">
        {sortedSponsors.map((sponsor) => {
          const tier = sponsor.tier || "bronze";
          const styles = tierStyles[tier];
          return (
            <Link
              className={cn(
                "flex aspect-square items-center justify-center bg-card p-0 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                styles.size,
                styles.border,
                styles.shadow
              )}
              href={sponsor.url}
              key={sponsor.name}
              rel="noopener noreferrer"
              target="_blank"
              title={`${sponsor.name} - ${tier[0].toUpperCase() + tier.slice(1)} Sponsor`}
            >
              <Image
                alt={sponsor.name}
                className="size-full object-contain opacity-70 transition-opacity hover:opacity-100"
                height={48}
                src={sponsor.logo}
                width={48}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
