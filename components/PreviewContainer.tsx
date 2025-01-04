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
        "bg-[#131315] border border-primary/10 min-h-[30rem] rounded-xl p-4 flex items-center justify-center not-prose overflow-hidden relative",
        className
      )}
    >
      {children}
    </div>
  );
};
