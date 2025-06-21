"use client";

import * as React from "react";
import { TagInput } from "@/components/ui/tag-input";

export function BasicTagInputExample() {
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <TagInput
      tags={tags}
      onTagsChange={setTags}
      placeholder="Type and press Enter..."
    />
  );
}

export function PrefilledTagInputExample() {
  const [tags, setTags] = React.useState<string[]>([
    "JavaScript",
    "React",
    "TypeScript",
  ]);

  return (
    <TagInput
      tags={tags}
      onTagsChange={setTags}
      placeholder="Add more tags..."
    />
  );
}

export function VariantsExample() {
  const [defaultTags, setDefaultTags] = React.useState<string[]>([
    "React",
    "Next.js",
  ]);
  const [errorTags, setErrorTags] = React.useState<string[]>([
    "Invalid",
    "Tags",
  ]);

  return (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <TagInput
          tags={defaultTags}
          onTagsChange={setDefaultTags}
          variant="default"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Error State</label>
        <TagInput tags={errorTags} onTagsChange={setErrorTags} error />
      </div>
    </div>
  );
}

export function SizesExample() {
  const [smallTags, setSmallTags] = React.useState<string[]>(["Small", "Tags"]);
  const [defaultSizeTags, setDefaultSizeTags] = React.useState<string[]>([
    "Default",
    "Size",
  ]);
  const [largeTags, setLargeTags] = React.useState<string[]>(["Large", "Tags"]);
  const [xlTags, setXlTags] = React.useState<string[]>(["XL", "Tags"]);

  return (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="text-sm font-medium mb-2 block">Small</label>
        <TagInput tags={smallTags} onTagsChange={setSmallTags} size="sm" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <TagInput
          tags={defaultSizeTags}
          onTagsChange={setDefaultSizeTags}
          size="default"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Large</label>
        <TagInput tags={largeTags} onTagsChange={setLargeTags} size="lg" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Extra Large</label>
        <TagInput tags={xlTags} onTagsChange={setXlTags} size="xl" />
      </div>
    </div>
  );
}

export function TagVariantsExample() {
  const [defaultVariantTags, setDefaultVariantTags] = React.useState<string[]>([
    "Primary",
    "Important",
  ]);
  const [secondaryTags, setSecondaryTags] = React.useState<string[]>([
    "Secondary",
    "Normal",
  ]);
  const [outlineTags, setOutlineTags] = React.useState<string[]>([
    "Outline",
    "Minimal",
  ]);
  const [destructiveTags, setDestructiveTags] = React.useState<string[]>([
    "Error",
    "Warning",
  ]);

  return (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="text-sm font-medium mb-2 block">Default Tags</label>
        <TagInput
          tags={defaultVariantTags}
          onTagsChange={setDefaultVariantTags}
          tagVariant="default"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Secondary Tags</label>
        <TagInput
          tags={secondaryTags}
          onTagsChange={setSecondaryTags}
          tagVariant="secondary"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Outline Tags</label>
        <TagInput
          tags={outlineTags}
          onTagsChange={setOutlineTags}
          tagVariant="outline"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Destructive Tags
        </label>
        <TagInput
          tags={destructiveTags}
          onTagsChange={setDestructiveTags}
          tagVariant="destructive"
        />
      </div>
    </div>
  );
}

export function MaxTagsExample() {
  const [tags, setTags] = React.useState<string[]>(["React", "Next.js"]);

  return (
    <div className="w-full max-w-md">
      <label className="text-sm font-medium mb-2 block">Max 3 tags</label>
      <TagInput
        tags={tags}
        onTagsChange={setTags}
        maxTags={3}
        placeholder="Add up to 3 tags..."
      />
    </div>
  );
}

export function ClearAllExample() {
  const [tags, setTags] = React.useState<string[]>([
    "Next.js",
    "TypeScript",
    "Tailwind",
  ]);

  return (
    <TagInput
      tags={tags}
      onTagsChange={setTags}
      clearAllButton
      onClearAll={() => console.log("All tags cleared!")}
    />
  );
}

export function CustomSeparatorExample() {
  const [commaTags, setCommaTags] = React.useState<string[]>([]);
  const [regexTags, setRegexTags] = React.useState<string[]>([]);

  return (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Comma separated
        </label>
        <TagInput
          tags={commaTags}
          onTagsChange={setCommaTags}
          separator=","
          placeholder="Type tags separated by commas..."
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Space or comma</label>
        <TagInput
          tags={regexTags}
          onTagsChange={setRegexTags}
          separator={/[\s,]+/}
          placeholder="Type tags separated by space or comma..."
        />
      </div>
    </div>
  );
}

export function DisabledExample() {
  const [tags, setTags] = React.useState<string[]>(["React", "Next.js"]);

  return (
    <TagInput
      tags={tags}
      onTagsChange={setTags}
      disabled
      placeholder="This input is disabled"
    />
  );
}

export function EventHandlersExample() {
  const [tags, setTags] = React.useState<string[]>(["React", "Next.js"]);

  return (
    <TagInput
      tags={tags}
      onTagsChange={setTags}
      onTagAdd={(tag) => console.log("Added:", tag)}
      onTagRemove={(tag) => console.log("Removed:", tag)}
      placeholder="Check console for events..."
    />
  );
}
