"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/new-york/ui/alert-dialog";
import { Button } from "@/registry/new-york/ui/button";

export function AlertDialogDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-10">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            aria-label="Open delete confirmation dialog"
            variant="outline"
          >
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent
          aria-describedby="alert-dialog-description"
          aria-labelledby="alert-dialog-title"
          aria-modal="true"
          role="alertdialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              aria-label="Confirm account deletion"
              className="bg-destructive hover:bg-destructive/90"
            >
              Yes, delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
