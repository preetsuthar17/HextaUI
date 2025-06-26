"use client";

import { FileUpload } from "../file-upload";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function FileUploadBasic() {
  return (
    <div className="w-full max-w-2xl">
      <FileUpload
        maxFiles={5}
        maxSize={5 * 1024 * 1024}
        onFilesChange={(files) => console.log("Files changed:", files)}
      />
    </div>
  );
}

export function FileUploadVariants() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <FileUpload variant="default" size="sm" maxFiles={3} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Dashed</h4>
        <FileUpload variant="dashed" size="sm" maxFiles={3} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Ghost</h4>
        <FileUpload variant="ghost" size="sm" maxFiles={3} />
      </div>
    </div>
  );
}

export function FileUploadWithCustomAccept() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Images Only</h4>
        <FileUpload accept="image/*" size="sm" maxFiles={3}>
          <Badge variant="secondary" size="sm">
            Images only
          </Badge>
        </FileUpload>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Documents Only</h4>
        <FileUpload accept=".pdf,.doc,.docx,.txt" size="sm" maxFiles={3}>
          <Badge variant="outline" size="sm">
            Documents only
          </Badge>
        </FileUpload>
      </div>
    </div>
  );
}

export function FileUploadControlled() {
  const [files, setFiles] = useState<any[]>([]);

  const handleUpload = async (uploadFiles: File[]) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Files uploaded:", uploadFiles);
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <FileUpload
        onFilesChange={setFiles}
        onUpload={handleUpload}
        maxFiles={5}
        size="default"
      />
      {files.length > 0 && (
        <div className="text-sm text-muted-foreground">
          {files.length} file(s) selected
        </div>
      )}
    </div>
  );
}

export function FileUploadDisabled() {
  return (
    <div className="w-full max-w-lg">
      <FileUpload disabled size="sm" maxFiles={3}>
        <Badge variant="ghost" size="sm">
          Upload disabled
        </Badge>
      </FileUpload>
    </div>
  );
}

export function FileUploadItemVariants() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Default Items</h4>
        <FileUpload itemVariant="default" size="sm" maxFiles={2} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Ghost Items</h4>
        <FileUpload itemVariant="ghost" size="sm" maxFiles={2} />
      </div>
    </div>
  );
}

export function FileUploadSizes() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <FileUpload size="sm" maxFiles={2} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <FileUpload size="default" maxFiles={2} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <FileUpload size="lg" maxFiles={2} />
      </div>
    </div>
  );
}

export function FileUploadWithScrollArea() {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <div className="w-full max-w-2xl space-y-4">
      <FileUpload
        maxFiles={20}
        maxSize={5 * 1024 * 1024}
        onFilesChange={setFiles}
        size="default"
      />
      <div className="text-xs text-muted-foreground">
        Upload multiple files to see the scroll area in action (scrollable after
        3 files)
      </div>
    </div>
  );
}
