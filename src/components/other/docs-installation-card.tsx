"use client";

import Link from "next/link";

interface DocsInstallationCardProps {
  logo: React.ReactNode;
  title: string;
  url: string;
  goal: string;
}

export const DocsInstallationCard = ({
  logo,
  title,
  url,
  goal,
}: DocsInstallationCardProps) => {
  return (
    <>
      <Link
        className="flex items-center justify-center flex-col gap-2 not-prose text-[hsl(var(--hu-muted-foreground))] hover:text-[hsl(var(--hu-foreground))] transition-colors duration-200 ease-in-out p-6 cursor-pointer bg-[hsl(var(--hu-card))] rounded-[var(--radius)]"
        href={url}
        onClick={() => {
          window?.datafast({ goal });
        }}
      >
        {logo}
        <span className="font-semibold text-xl">{title}</span>
      </Link>
    </>
  );
};
