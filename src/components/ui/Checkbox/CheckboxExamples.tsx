"use client";

import React, { useState } from "react";
import { Checkbox } from "./index";
import { Button } from "../button";

export function CheckboxBasic() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Accept terms and conditions"
        checked={checked}
        onCheckedChange={(checked) => setChecked(!!checked)}
      />
      <Checkbox label="Subscribe to newsletter" />
      <Checkbox label="Enable notifications" disabled />
      <Checkbox label="Remember me" checked disabled />
    </div>
  );
}

export function CheckboxVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Small size" size="sm" />
      <Checkbox label="Default size" size="default" />
      <Checkbox label="Large size" size="lg" />
    </div>
  );
}

export function CheckboxSizes() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="default" label="Default checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  );
}

export function CheckboxWithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Marketing emails"
        description="Receive emails about new products, features, and more."
      />
      <Checkbox
        label="Security emails"
        description="Receive emails about your account security."
        checked
      />
      <Checkbox
        label="Social emails"
        description="Receive emails for friend requests, follows, and more."
        disabled
      />
    </div>
  );
}

export function CheckboxIndeterminate() {
  const [items, setItems] = useState([
    { id: 1, label: "Item 1", checked: false },
    { id: 2, label: "Item 2", checked: true },
    { id: 3, label: "Item 3", checked: false },
  ]);

  const checkedItems = items.filter((item) => item.checked);
  const isIndeterminate =
    checkedItems.length > 0 && checkedItems.length < items.length;
  const isAllChecked = checkedItems.length === items.length;

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === "indeterminate") return;
    setItems(items.map((item) => ({ ...item, checked })));
  };

  const handleItemChange = (id: number, checked: boolean) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, checked } : item)),
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Select all"
        checked={isIndeterminate ? "indeterminate" : isAllChecked}
        onCheckedChange={handleSelectAll}
      />
      <div className="ml-6 flex flex-col gap-2">
        {items.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={item.checked}
            onCheckedChange={(checked) => handleItemChange(item.id, !!checked)}
          />
        ))}
      </div>
    </div>
  );
}

export function CheckboxWithError() {
  const [agreed, setAgreed] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const handleSubmit = () => {
    setAttempted(true);
    if (agreed) {
      alert("Form submitted!");
      setAttempted(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="I agree to the terms and conditions"
        checked={agreed}
        onCheckedChange={(checked) => setAgreed(!!checked)}
        error={attempted && !agreed ? "You must agree to the terms" : undefined}
      />
      <Button
        onClick={handleSubmit}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
      >
        Submit
      </Button>
    </div>
  );
}

export function CheckboxGroup() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skills = [
    { id: "react", label: "React" },
    { id: "vue", label: "Vue.js" },
    { id: "angular", label: "Angular" },
    { id: "svelte", label: "Svelte" },
    { id: "nextjs", label: "Next.js" },
  ];

  const handleSkillChange = (skillId: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skillId]);
    } else {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium">Select your skills:</h3>
      <div className="flex flex-col gap-2">
        {skills.map((skill) => (
          <Checkbox
            key={skill.id}
            label={skill.label}
            checked={selectedSkills.includes(skill.id)}
            onCheckedChange={(checked) =>
              handleSkillChange(skill.id, !!checked)
            }
          />
        ))}
      </div>
      {selectedSkills.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Selected: {selectedSkills.join(", ")}
        </p>
      )}
    </div>
  );
}
