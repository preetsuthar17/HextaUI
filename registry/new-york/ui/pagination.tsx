import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { type Button, buttonVariants } from "@/registry/new-york/ui/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      data-slot="pagination"
      role="navigation"
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      data-slot="pagination-content"
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  function PaginationLink(
    { className, isActive, size = "icon", ...props },
    ref
  ) {
    return (
      <a
        aria-current={isActive ? "page" : undefined}
        aria-disabled={(props as any).disabled ? true : undefined}
        className={cn(
          buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
          "touch-manipulation tabular-nums",
          className
        )}
        data-active={isActive}
        data-slot="pagination-link"
        ref={ref}
        {...props}
      />
    );
  }
);

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      rel={(props as any).rel ?? "prev"}
      {...props}
      size={props.size ?? "default"}
    >
      <ChevronLeftIcon aria-hidden="true" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      rel={(props as any).rel ?? "next"}
      {...props}
      size={props.size ?? "default"}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon aria-hidden="true" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex size-9 items-center justify-center", className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
