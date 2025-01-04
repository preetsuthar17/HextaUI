import { cn } from "@/lib/utils";

interface PreviewContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PreviewContainer = ({
  children,
  className,
}: PreviewContainerProps) => {
  return (
    <div
      className={cn(
        "bg-[hsl(var(--primary)/0.02)] border border-primary/10 min-h-[15rem] rounded-xl p-4 flex items-center justify-center not-prose",
        className
      )}
    >
      {children}
    </div>
  );
};
