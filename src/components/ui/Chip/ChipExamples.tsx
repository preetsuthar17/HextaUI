"use client";

import { Chip } from "./index";
import { ChipWithIcon } from "./index";

export function DismissibleChipExamples() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Chip dismissible onDismiss={() => alert("Chip dismissed!")}>
        Remove me
      </Chip>
      <ChipWithIcon
        iconName="Tag"
        variant="secondary"
        dismissible
        onDismiss={() => alert("Tag removed!")}
      >
        JavaScript
      </ChipWithIcon>
      <ChipWithIcon
        iconName="User"
        variant="outline"
        dismissible
        onDismiss={() => alert("User removed!")}
      >
        John Doe
      </ChipWithIcon>
      <Chip variant="destructive" dismissible size="sm">
        Error
      </Chip>
    </div>
  );
}

export function InteractiveChipExamples() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Chip className="cursor-pointer" onClick={() => alert("Chip clicked!")}>
        Clickable
      </Chip>
      <ChipWithIcon
        iconName="Heart"
        variant="outline"
        className="cursor-pointer hover:bg-red-50 hover:border-red-300 hover:text-red-600"
        onClick={() => alert("Like clicked!")}
      >
        Like
      </ChipWithIcon>
      <Chip variant="secondary" className="cursor-pointer" tabIndex={0}>
        Focusable
      </Chip>
      <ChipWithIcon
        iconName="Plus"
        variant="ghost"
        className="cursor-pointer"
        onClick={() => alert("Add clicked!")}
      >
        Add Filter
      </ChipWithIcon>
    </div>
  );
}

export function FilterTagExamples() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Technologies</h4>
        <div className="flex gap-2 flex-wrap">
          <ChipWithIcon
            iconName="Tag"
            variant="outline"
            dismissible
            onDismiss={() => console.log("React removed")}
          >
            React
          </ChipWithIcon>
          <ChipWithIcon
            iconName="Tag"
            variant="outline"
            dismissible
            onDismiss={() => console.log("TypeScript removed")}
          >
            TypeScript
          </ChipWithIcon>
          <ChipWithIcon
            iconName="Tag"
            variant="outline"
            dismissible
            onDismiss={() => console.log("Next.js removed")}
          >
            Next.js
          </ChipWithIcon>
          <ChipWithIcon
            iconName="Tag"
            variant="outline"
            dismissible
            onDismiss={() => console.log("Tailwind removed")}
          >
            Tailwind
          </ChipWithIcon>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Team Members</h4>
        <div className="flex gap-2 flex-wrap">
          <ChipWithIcon
            iconName="User"
            variant="secondary"
            size="sm"
            dismissible
            onDismiss={() => console.log("Alice removed")}
          >
            Alice
          </ChipWithIcon>
          <ChipWithIcon
            iconName="User"
            variant="secondary"
            size="sm"
            dismissible
            onDismiss={() => console.log("Bob removed")}
          >
            Bob
          </ChipWithIcon>
          <ChipWithIcon
            iconName="User"
            variant="secondary"
            size="sm"
            dismissible
            onDismiss={() => console.log("Charlie removed")}
          >
            Charlie
          </ChipWithIcon>
        </div>
      </div>
    </div>
  );
}

export function RealWorldChipExamples() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Product Tags</h4>
        <div className="flex gap-2 flex-wrap">
          <ChipWithIcon iconName="Award" variant="default" size="sm">
            New
          </ChipWithIcon>
          <ChipWithIcon iconName="Star" variant="secondary" size="sm">
            Bestseller
          </ChipWithIcon>
          <ChipWithIcon iconName="Tag" variant="outline" size="sm">
            Sale
          </ChipWithIcon>
          <Chip variant="destructive" size="sm">
            Limited
          </Chip>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Selected Filters</h4>
        <div className="flex gap-2 flex-wrap">
          <Chip
            variant="outline"
            dismissible
            onDismiss={() => console.log("Price filter removed")}
          >
            Price: $50-100
          </Chip>
          <Chip
            variant="outline"
            dismissible
            onDismiss={() => console.log("Brand filter removed")}
          >
            Brand: Nike
          </Chip>
          <Chip
            variant="outline"
            dismissible
            onDismiss={() => console.log("Color filter removed")}
          >
            Color: Blue
          </Chip>
          <Chip
            variant="outline"
            dismissible
            onDismiss={() => console.log("Size filter removed")}
          >
            Size: Medium
          </Chip>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Event Attendees</h4>
        <div className="flex gap-2 flex-wrap">
          <ChipWithIcon
            iconName="User"
            variant="secondary"
            size="sm"
            dismissible
            onDismiss={() => console.log("Sarah removed")}
          >
            Sarah Wilson
          </ChipWithIcon>
          <ChipWithIcon
            iconName="User"
            variant="secondary"
            size="sm"
            dismissible
            onDismiss={() => console.log("Mike removed")}
          >
            Mike Johnson
          </ChipWithIcon>
          <ChipWithIcon
            iconName="User"
            variant="secondary"
            size="sm"
            dismissible
            onDismiss={() => console.log("Anna removed")}
          >
            Anna Davis
          </ChipWithIcon>
          <Chip
            variant="ghost"
            size="sm"
            className="cursor-pointer"
            onClick={() => alert("Show more attendees")}
          >
            +5 more
          </Chip>
        </div>
      </div>
    </div>
  );
}
