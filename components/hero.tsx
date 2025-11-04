import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <header className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="flex flex-col gap-6">
        <h1 className="flex flex-wrap items-center justify-center gap-2">
          Extended Components for
          <span className="inline-flex items-center gap-1 px-2">
            <Image
              alt="shadcn/ui"
              className="size-9 rounded-full align-middle"
              height={36}
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              style={{ display: "inline-block" }}
              width={36}
            />
            <span>shadcn/ui</span>
          </span>
        </h1>
        <p className="text-muted-foreground">
          Ready-to-use foundation components built on top of shadcn/ui.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="default" className="h-11">
            <Link href="/components/accordion">View Components</Link>
          </Button>
          <Button asChild variant="secondary" className="h-11">
            <Link href="https://github.com/preetsuthar17/hextaui">
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

