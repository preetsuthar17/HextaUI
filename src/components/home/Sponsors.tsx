"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, Users } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Sponsor {
  name: string;
  url: string;
  logo: string;
  alt?: string;
  goal?: string;
}

const SponsorAvatar = ({ sponsor }: { sponsor: Sponsor }) => (
  <a
    href={sponsor.url}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-all duration-200 hover:scale-110 hover:z-10"
  >
    <Avatar tooltip={sponsor.name} size="md">
      <AvatarImage
        src={sponsor.logo}
        alt={sponsor.alt ?? sponsor.name ?? "Sponsor"}
      />
      <AvatarFallback>
        {sponsor.name?.slice(0, 2).toUpperCase() ?? "SP"}
      </AvatarFallback>
    </Avatar>
  </a>
);

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchSponsors() {
      setIsLoading(true);
      setHasError(false);
      try {
        const res = await fetch("/api/sponsors");
        if (!res.ok) throw new Error("Failed to fetch sponsors");
        const data = await res.json();
        setSponsors(data.sponsors || []);
      } catch {
        setHasError(true);
        setSponsors([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSponsors();
  }, []);

  if (hasError) {
    return (
      <section className="flex flex-col items-center justify-center gap-16 py-24 px-8 text-center w-full border-t">
        <div className="flex items-center justify-center gap-6 flex-col">
          <Badge variant="secondary" className="px-4 py-2">
            <Users className="w-3 h-3" />
            Sponsors
          </Badge>
          <h2 className="text-4xl font-medium">Our Sponsors</h2>
          <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
            Unable to load sponsors. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-16 py-28 px-8 text-center w-full border-t">
      <div className="flex items-center justify-center gap-6 flex-col">
        <Badge variant="secondary" className="px-4 py-2">
          Sponsors
        </Badge>
        <h2 className="text-4xl font-medium">Our Sponsors</h2>
        <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
          Thanks to our amazing sponsors for supporting HextaUI.
        </p>
      </div>
      {isLoading ? (
        <div className="-space-x-6 flex gap-4 flex-wrap items-center justify-center max-w-5xl w-full">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-12 w-12 bg-muted rounded-full"></div>
            </div>
          ))}
        </div>
      ) : sponsors.length === 0 ? (
        <Button size="xl" variant="secondary" asChild className="px-8 py-6">
          <a
            href="https://github.com/sponsors/preetsuthar17"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center"
          >
            Be the first one to sponsor! 🥳
          </a>
        </Button>
      ) : (
        <div className="-space-x-6 flex gap-4 flex-wrap items-center justify-center max-w-5xl w-full">
          {sponsors.map((sponsor) => (
            <SponsorAvatar key={sponsor.url} sponsor={sponsor} />
          ))}
        </div>
      )}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Heart className="h-4 w-4 text-red-500" />
          <span>Thank you for supporting HextaUI!</span>
        </div>
        <Button asChild variant="outline" className="group">
          <a
            href="https://github.com/sponsors/preetsuthar17"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <FaGithub className="h-4 w-4" />
            Become a sponsor
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Want to support?{" "}
        <a
          href="https://github.com/sponsors/preetsuthar17"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          Sponsor us on GitHub
        </a>
        .
      </p>
    </section>
  );
};

export default Sponsors;
