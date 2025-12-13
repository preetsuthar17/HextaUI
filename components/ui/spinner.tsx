import { IconLoader } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function Spinner({ className }: React.ComponentProps<"svg">) {
  return (
    <IconLoader
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      role="status"
      stroke={1}
    />
  );
}

export { Spinner };
