"use client";

import * as React from "react";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { Label } from "../label";

export function BasicTextarea() {
  return (
    <div className="flex items-center space-x-2">
      <Textarea placeholder="Type your message here..." />
    </div>
  );
}

export function TextareaWithLabel() {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-2">
      <Label
        htmlFor="message"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Your message
      </Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export function TextareaVariants() {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium mb-2 block">Default</Label>
        <Textarea placeholder="Default textarea" />
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Destructive</Label>
        <Textarea variant="destructive" placeholder="Error state textarea" />
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Ghost</Label>
        <Textarea variant="ghost" placeholder="Ghost variant textarea" />
      </div>
    </div>
  );
}

export function TextareaSizes() {
  return (
    <div className="space-y-4">
      <div className="flex items-start flex-col max-w-sm gap-4">
        <span className="text-sm font-medium mt-2">Small</span>
        <Textarea size="sm" placeholder="Small textarea" />
      </div>
      <div className="flex items-start flex-col max-w-sm gap-4">
        <span className="text-sm font-medium mt-2">Default</span>
        <Textarea size="default" placeholder="Default textarea" />
      </div>
      <div className="flex items-start flex-col max-w-sm gap-4">
        <span className="text-sm font-medium mt-2">Large</span>
        <Textarea size="lg" placeholder="Large textarea" />
      </div>{" "}
      <div className="flex items-start flex-col max-w-sm gap-4">
        <span className="text-sm font-medium mt-2">XL</span>
        <Textarea size="xl" placeholder="Extra large textarea" />
      </div>
      <div className="flex items-start flex-col max-w-sm gap-4">
        <span className="text-sm font-medium mt-2">Fixed</span>
        <Textarea
          size="fixed"
          placeholder="Fixed height textarea (no resize)"
        />
      </div>
    </div>
  );
}

export function ClearableTextarea() {
  const [value, setValue] = React.useState("This text can be cleared");

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Clearable textarea</Label>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clearable
        onClear={() => setValue("")}
        placeholder="Type something..."
      />
    </div>
  );
}

export function DisabledTextarea() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Disabled textarea</label>
      <Textarea
        disabled
        defaultValue="This textarea is disabled"
        placeholder="This is disabled"
      />
    </div>
  );
}

export function TextareaWithError() {
  const [value, setValue] = React.useState("This field has an error");

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Textarea with error</Label>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={true}
        placeholder="Enter valid text..."
      />
      <p className="text-xs text-destructive">
        This field is required and must be at least 10 characters.
      </p>
    </div>
  );
}

export function FormExample() {
  const [formData, setFormData] = React.useState({
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Subject</Label>
        <Textarea
          value={formData.subject}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, subject: e.target.value }))
          }
          placeholder="Enter subject..."
          size="sm"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Message</Label>
        <Textarea
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Type your message..."
          clearable
          onClear={() => setFormData((prev) => ({ ...prev, message: "" }))}
        />
      </div>

      <Button
        type="submit"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-ele hover:bg-primary/90 transition-colors"
      >
        Send Message
      </Button>
    </form>
  );
}
