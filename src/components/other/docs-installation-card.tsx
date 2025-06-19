import Link from "next/link";

interface DocsInstallationCardProps {
  logo: React.ReactNode;
  title: string;
  url: string;
}

export const DocsInstallationCard = ({
  logo,
  title,
  url,
}: DocsInstallationCardProps) => {
  return (
    <>
      <Link
        className="flex items-center justify-center flex-col gap-2 not-prose text-[hsl(var(--hu-muted-foreground))] hover:text-[hsl(var(--hu-foreground))] transition-colors duration-200 ease-in-out p-6 cursor-pointer bg-[hsl(var(--hu-card))] rounded-[var(--radius)]"
        href={url}
      >
        {logo}
        <span className="font-semibold text-xl">{title}</span>
      </Link>
    </>
  );
};
