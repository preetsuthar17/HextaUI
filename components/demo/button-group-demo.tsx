"use client";

import {
  DownloadIcon,
  MoreVerticalIcon,
  PencilIcon,
  SaveIcon,
  Share2Icon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ButtonGroupDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 py-10">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <ButtonGroup aria-label="User management actions">
            <Button aria-label="View user" variant="outline">
              View
            </Button>
            <Button aria-label="Edit user" variant="outline">
              <PencilIcon aria-hidden="true" className="size-4" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="More user actions"
                  size="icon"
                  variant="outline"
                >
                  <MoreVerticalIcon aria-hidden="true" className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Share2Icon aria-hidden="true" className="size-4" />
                  <span>Share Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SaveIcon aria-hidden="true" className="size-4" />
                  <span>Export Data</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon aria-hidden="true" className="size-4" />
                  <span>Delete User</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <ButtonGroup aria-label="File actions">
            <Button aria-label="Upload file" variant="outline">
              <UploadIcon aria-hidden="true" className="size-4" />
              Upload
            </Button>
            <Button aria-label="Download file" variant="outline">
              <DownloadIcon aria-hidden="true" className="size-4" />
              Download
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
