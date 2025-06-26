"use client";

import { Loader } from "./index";

export function LoaderExamples() {
  return (
    <div className="space-y-8">
      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Loader size="xs" />
            <span className="text-xs text-muted-foreground">Extra Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size="sm" />
            <span className="text-xs text-muted-foreground">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size="md" />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size="lg" />
            <span className="text-xs text-muted-foreground">Large</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader size="xl" />
            <span className="text-xs text-muted-foreground">Extra Large</span>
          </div>
        </div>
      </div>

      {/* Color Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Loader variant="default" />
            <span className="text-xs text-muted-foreground">Default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader variant="primary" />
            <span className="text-xs text-muted-foreground">Primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader variant="secondary" />
            <span className="text-xs text-muted-foreground">Secondary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader variant="muted" />
            <span className="text-xs text-muted-foreground">Muted</span>
          </div>
        </div>
      </div>

      {/* With Text */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Text</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Loader size="sm" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
          <div className="flex items-center gap-3">
            <Loader variant="primary" />
            <span className="text-sm">Processing your request</span>
          </div>
          <div className="flex items-center gap-3">
            <Loader size="sm" variant="muted" />
            <span className="text-sm text-muted-foreground">
              Uploading files
            </span>
          </div>
        </div>
      </div>

      {/* Button Integration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Integration</h3>
        <div className="space-y-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-ele hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled
          >
            <Loader size="sm" className="text-current" />
            <span>Loading...</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-ele hover:bg-secondary/90 transition-colors disabled:opacity-50"
            disabled
          >
            <Loader size="sm" className="text-current" />
            <span>Processing</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-ele hover:bg-accent transition-colors disabled:opacity-50"
            disabled
          >
            <Loader size="sm" />
            <span>Uploading</span>
          </button>
        </div>
      </div>

      {/* Content Loading */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Content Loading</h3>
        <div className="border border-border rounded-2xl p-8">
          <div className="flex items-center justify-center h-32">
            <div className="text-center space-y-4">
              <Loader size="xl" variant="primary" />
              <p className="text-sm text-muted-foreground">
                Loading content...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
