import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
      </div>
      <Button asChild size="lg">
        <Link href="/">
          <Home className="size-4" aria-hidden="true" />
          Go Home
        </Link>
      </Button>
    </div>
  );
}

