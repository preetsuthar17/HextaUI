"use client";

import { Terminal } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert";

export function AlertDemo() {
  return (
    <Alert className="mx-auto w-full max-w-md" role="alert" tabIndex={-1}>
      <Terminal aria-hidden="true" className="size-5 text-muted-foreground" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  );
}
