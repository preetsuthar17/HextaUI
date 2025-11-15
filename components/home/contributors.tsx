"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";

interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

async function fetchContributors(): Promise<Contributor[]> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/preetsuthar17/HextaUI/contributors",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );
    if (!response.ok) return [];
    const data = await response.json();
    // Filter out bots
    return data.filter(
      (contributor: Contributor) => contributor.type !== "Bot"
    );
  } catch {
    return [];
  }
}

export const Contributors = memo(function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContributors().then((data) => {
      setContributors(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg tracking-tight">Contributors</h2>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {[...Array(8)].map((_, i) => (
            <div
              className="flex aspect-square items-center justify-center border bg-card p-4"
              key={i}
            >
              <div className="size-12 animate-pulse bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (contributors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-2xl tracking-tight">Contributors</h2>
      <div className="flex flex-wrap gap-2">
        {contributors.map((contributor) => (
          <Link
            aria-label={`${contributor.login} on GitHub`}
            className="flex aspect-square size-18 items-center justify-center overflow-hidden rounded-full border bg-card p-0 shadow-lg shadow-primary/20 transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
            href={contributor.html_url}
            key={contributor.id}
            rel="noopener noreferrer"
            target="_blank"
            title={`${contributor.login} (${contributor.contributions} contributions)`}
          >
            <Image
              alt={`${contributor.login} avatar`}
              className="size-full"
              height={48}
              src={contributor.avatar_url}
              width={48}
            />
          </Link>
        ))}
      </div>
    </div>
  );
});
