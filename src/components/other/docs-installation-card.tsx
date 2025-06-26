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
        className="flex items-center justify-center flex-col gap-2 not-prose text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out p-6 cursor-pointer bg-card rounded-ele"
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
