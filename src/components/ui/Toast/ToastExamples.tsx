"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "../../../hooks/use-toast";

export function ToastBasic() {
  return (
    <Button
      onClick={() => {
        toast("Hello World!", {
          description: "This is a basic toast notification.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}

export function ToastVariants() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() => {
          toast("Default toast", {
            description: "This is a default toast notification.",
          });
        }}
      >
        Default
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          toast.error("Error occurred", {
            description: "Something went wrong while processing your request.",
          });
        }}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          toast.success("Success!", {
            description: "Your action was completed successfully.",
          });
        }}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.warning("Warning", {
            description: "Please review your input before proceeding.",
          });
        }}
      >
        Warning
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          toast.info("Information", {
            description: "Here's some helpful information for you.",
          });
        }}
      >
        Info
      </Button>
    </div>
  );
}

export function ToastWithAction() {
  return (
    <Button
      onClick={() => {
        toast("Event scheduled", {
          description: "Your meeting is scheduled for tomorrow at 10 AM.",
          action: {
            label: "View",
            onClick: () => {
              toast("Viewing event details");
            },
          },
        });
      }}
    >
      Schedule Event
    </Button>
  );
}

export function ToastWithCancel() {
  return (
    <Button
      onClick={() => {
        toast("File will be deleted", {
          description: "This action cannot be undone.",
          cancel: {
            label: "Cancel",
            onClick: () => {
              toast("Deletion cancelled");
            },
          },
          action: {
            label: "Delete",
            onClick: () => {
              toast.success("File deleted successfully");
            },
          },
        });
      }}
    >
      Delete File
    </Button>
  );
}

export function ToastLoading() {
  return (
    <Button
      onClick={() => {
        const loadingToast = toast.loading("Uploading file...", {
          description: "Please wait while we process your file.",
        });

        // Simulate async operation
        setTimeout(() => {
          toast.dismiss(loadingToast);
          toast.success("Upload complete!", {
            description: "Your file has been uploaded successfully.",
          });
        }, 2000);
      }}
    >
      Upload File
    </Button>
  );
}

export function ToastPromise() {
  const mockApiCall = () => {
    return new Promise<{ message: string }>((resolve, reject) => {
      const success = Math.random() > 0.5;
      setTimeout(() => {
        if (success) {
          resolve({ message: "Data saved successfully" });
        } else {
          reject(new Error("Failed to save data"));
        }
      }, 2000);
    });
  };

  return (
    <Button
      onClick={() => {
        toast.promise(mockApiCall(), {
          loading: "Saving data...",
          success: (data) => data.message,
          error: "Failed to save data",
        });
      }}
    >
      Save Data
    </Button>
  );
}

export function ToastCustomDuration() {
  return (
    <div className="flex gap-3">
      <Button
        size="sm"
        onClick={() => {
          toast("Quick message", {
            description: "This will disappear in 1 second.",
            duration: 1000,
          });
        }}
      >
        1 Second
      </Button>
      <Button
        size="sm"
        onClick={() => {
          toast("Persistent message", {
            description: "This message stays for 10 seconds.",
            duration: 10000,
          });
        }}
      >
        10 Seconds
      </Button>
      <Button
        size="sm"
        onClick={() => {
          toast("Infinite message", {
            description: "This message won't auto-dismiss.",
            duration: Infinity,
          });
        }}
      >
        Infinite
      </Button>
    </div>
  );
}
