"use client";

import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { Label } from "@/registry/new-york/ui/label";

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <Checkbox id="terms" />
        <Label className="pl-2" htmlFor="terms">
          Accept terms and conditions
        </Label>
      </div>

      <div className="flex items-center opacity-50">
        <Checkbox className="cursor-not-allowed" disabled id="newsletter" />
        <Label className="pl-2" htmlFor="newsletter">
          Subscribe to newsletter (disabled)
        </Label>
      </div>

      <Label className="flex items-start rounded-lg border p-3 hover:bg-accent/50 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
        <Checkbox
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          defaultChecked
          id="toggle-2"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="font-medium text-sm leading-none">
            Enable notifications
          </p>
          <p className="text-muted-foreground text-sm">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label>
    </div>
  );
}
