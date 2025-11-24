"use client";

import { AtSign, User } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";

export function DialogDemo() {
  const [formValues, setFormValues] = React.useState({
    name: "Pedro Duarte",
    username: "peduarte",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Add custom submit logic here
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant="outline">
          <User className="size-5" />
          Edit Account
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 shadow-xl sm:max-w-md">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <DialogHeader className="border-b bg-accent/50 px-6 py-5">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <User className="size-5 text-accent-foreground/80" />
              Update Profile
            </DialogTitle>
            <DialogDescription>
              Update your information below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 p-6">
            <div className="flex items-center gap-4">
              <Label className="w-28 text-right" htmlFor="name-1">
                Full Name
              </Label>
              <div className="flex flex-1 items-center gap-2">
                <Input
                  autoComplete="name"
                  className="flex-1"
                  id="name-1"
                  name="name"
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  required
                  value={formValues.name}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-28 text-right" htmlFor="username-1">
                Username
              </Label>
              <div className="flex flex-1 items-center gap-2">
                <span className="inline-flex size-9 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                  <AtSign className="size-4" />
                </span>
                <Input
                  autoComplete="username"
                  className="flex-1"
                  id="username-1"
                  name="username"
                  onChange={handleChange}
                  placeholder="username"
                  required
                  value={formValues.username}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-center justify-end gap-2 border-t bg-muted/40 px-6 py-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="default">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
