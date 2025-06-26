"use client";

import React from "react";
import { FileUpload, FileWithPreview } from "../file-upload";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FileUploadDemo() {
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);

  const handleUpload = async (uploadFiles: File[]) => {
    console.log("Uploading files:", uploadFiles);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Upload completed");
  };
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle>File Upload Component Demo</CardTitle>
          <CardDescription>
            A redesigned file upload component with modern UI, drag & drop
            support, and progress tracking.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Basic Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Upload</h3>
            <div className="max-w-2xl">
              <FileUpload
                maxFiles={5}
                maxSize={5 * 1024 * 1024}
                onFilesChange={setFiles}
                onUpload={handleUpload}
              />
            </div>
          </div>

          {/* Variants Showcase */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Variants</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium mb-3">Default</p>
                <FileUpload variant="default" size="sm" maxFiles={2} />
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Dashed</p>
                <FileUpload variant="dashed" size="sm" maxFiles={2} />
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Ghost</p>
                <FileUpload variant="ghost" size="sm" maxFiles={2} />
              </div>
            </div>
          </div>

          {/* Sizes Showcase */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sizes</h3>
            <div className="max-w-2xl space-y-6">
              <div>
                <p className="text-sm font-medium mb-3">Small</p>
                <FileUpload size="sm" maxFiles={1} />
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Default</p>
                <FileUpload size="default" maxFiles={1} />
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Large</p>
                <FileUpload size="lg" maxFiles={1} />
              </div>
            </div>
          </div>

          {/* Specialized Uploads */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Specialized Uploads</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-3">Image Upload</h4>
                <FileUpload
                  accept="image/*"
                  maxFiles={3}
                  maxSize={2 * 1024 * 1024}
                  variant="ghost"
                  size="sm"
                >
                  <Badge variant="outline" size="sm">
                    Images only • Max 2MB
                  </Badge>
                </FileUpload>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Document Upload</h4>
                <FileUpload
                  accept=".pdf,.doc,.docx,.txt"
                  maxFiles={3}
                  maxSize={10 * 1024 * 1024}
                  variant="dashed"
                  size="sm"
                  itemVariant="ghost"
                >
                  <Badge variant="secondary" size="sm">
                    Documents • Max 10MB
                  </Badge>
                </FileUpload>
              </div>
            </div>
          </div>

          {/* Status Display */}
          {files.length > 0 && (
            <div className="p-4 bg-accent rounded-lg max-w-2xl">
              <p className="text-sm font-medium">
                Status: {files.length} file(s) selected
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
