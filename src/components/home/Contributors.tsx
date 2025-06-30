"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, Users } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

const ContributorAvatar = ({ contributor }: { contributor: Contributor }) => {
  return (
    <a
      href={contributor.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-all duration-200 hover:scale-110 hover:z-99"
    >
      <Avatar tooltip={contributor.login} size="md">
        <AvatarImage
          src={contributor.avatar_url}
          alt={`@${contributor.login}`}
        />
        <AvatarFallback>
          {contributor.login.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </a>
  );
};

const Contributors = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.github.com/repos/preetsuthar17/HextaUI/contributors?per_page=12",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contributors");
        }

        const data = await response.json();
        // Filter out bots and sort by contributions
        const filteredContributors = data
          .filter((contributor: Contributor) => contributor.type === "User")
          .sort(
            (a: Contributor, b: Contributor) =>
              b.contributions - a.contributions,
          );

        setContributors(filteredContributors);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load contributors",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center gap-16 py-24 px-8 text-center w-full border-t">
        <div className="flex items-center justify-center gap-6 flex-col">
          <Badge variant="secondary" className="px-4 py-2">
            <Users className="w-3 h-3" />
            Contributors
          </Badge>
          <h2 className="text-4xl font-medium">Our amazing contributors</h2>
          <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
            Unable to load contributors. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-16 py-28 px-8 text-center w-full border-t">
      <div className="flex items-center justify-center gap-6 flex-col">
        <Badge variant="secondary" className="px-4 py-2">
          Contributors
        </Badge>
        <h2 className="text-4xl font-medium">Our amazing contributors</h2>
        <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
          Thanks to these wonderful people who have contributed to HextaUI.
        </p>
      </div>{" "}
      {loading ? (
        <div className="-space-x-6 flex gap-4 flex-wrap items-center justify-center max-w-5xl w-full">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-12 w-12 bg-muted rounded-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="-space-x-6 flex gap-4 flex-wrap items-center justify-center max-w-5xl w-full">
          {contributors.map((contributor) => (
            <ContributorAvatar key={contributor.id} contributor={contributor} />
          ))}
        </div>
      )}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Heart className="h-4 w-4 text-red-500" />
          <span>Thank you for your contributions!</span>
        </div>

        <Button asChild variant="outline" className="group">
          <a
            href="https://github.com/preetsuthar17/HextaUI/contributors"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <FaGithub className="h-4 w-4" />
            View all contributors
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Want to contribute? Check out our{" "}
        <a
          href="https://github.com/preetsuthar17/HextaUI"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          GitHub repository
        </a>{" "}
        to get started.
      </p>
    </section>
  );
};

export default Contributors;
