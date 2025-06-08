"use client";

import * as React from "react";
import { RadioGroup, RadioItem } from "./index";

export function BasicRadio() {
  return (
    <RadioGroup defaultValue="option1">
      <RadioItem value="option1" label="Option 1" />
      <RadioItem value="option2" label="Option 2" />
      <RadioItem value="option3" label="Option 3" />
    </RadioGroup>
  );
}

export function RadioWithDescription() {
  return (
    <RadioGroup
      defaultValue="comfortable"
      label="Select your comfort level"
      description="Choose the option that best fits your needs"
    >
      <RadioItem
        value="comfortable"
        label="Comfortable"
        description="A relaxed and easy-going approach"
      />
      <RadioItem
        value="compact"
        label="Compact"
        description="Minimal space with essential features"
      />
      <RadioItem
        value="spacious"
        label="Spacious"
        description="Plenty of room with all amenities"
      />
    </RadioGroup>
  );
}

export function RadioSizes() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Small</h4>
        <RadioGroup defaultValue="small1">
          <RadioItem value="small1" label="Small option 1" size="sm" />
          <RadioItem value="small2" label="Small option 2" size="sm" />
        </RadioGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Default</h4>
        <RadioGroup defaultValue="default1">
          <RadioItem value="default1" label="Default option 1" />
          <RadioItem value="default2" label="Default option 2" />
        </RadioGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Large</h4>
        <RadioGroup defaultValue="large1">
          <RadioItem value="large1" label="Large option 1" size="lg" />
          <RadioItem value="large2" label="Large option 2" size="lg" />
        </RadioGroup>
      </div>
    </div>
  );
}

export function HorizontalRadio() {
  return (
    <RadioGroup
      defaultValue="yes"
      orientation="horizontal"
      label="Do you agree?"
    >
      <RadioItem value="yes" label="Yes" />
      <RadioItem value="no" label="No" />
      <RadioItem value="maybe" label="Maybe" />
    </RadioGroup>
  );
}

export function DisabledRadio() {
  return (
    <RadioGroup defaultValue="option1" disabled>
      <RadioItem value="option1" label="Disabled option 1" />
      <RadioItem value="option2" label="Disabled option 2" />
      <RadioItem value="option3" label="Disabled option 3" />
    </RadioGroup>
  );
}

export function RadioWithError() {
  return (
    <RadioGroup label="Select a plan" error="Please select a plan to continue">
      <RadioItem value="free" label="Free Plan" description="Basic features" />
      <RadioItem value="pro" label="Pro Plan" description="Advanced features" />
      <RadioItem
        value="enterprise"
        label="Enterprise Plan"
        description="All features"
      />
    </RadioGroup>
  );
}

export function ControlledRadio() {
  const [value, setValue] = React.useState("option2");

  return (
    <div className="space-y-4">
      <RadioGroup
        value={value}
        onValueChange={setValue}
        label="Controlled Radio Group"
        description={`Currently selected: ${value}`}
      >
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </RadioGroup>

      <div className="flex gap-2">
        <button
          onClick={() => setValue("option1")}
          className="px-3 py-1 text-xs bg-gray-100 rounded"
        >
          Select Option 1
        </button>
        <button
          onClick={() => setValue("option2")}
          className="px-3 py-1 text-xs bg-gray-100 rounded"
        >
          Select Option 2
        </button>
        <button
          onClick={() => setValue("option3")}
          className="px-3 py-1 text-xs bg-gray-100 rounded"
        >
          Select Option 3
        </button>
      </div>
    </div>
  );
}

export function PaymentMethodRadio() {
  return (
    <RadioGroup
      defaultValue="card"
      label="Payment Method"
      description="Select your preferred payment method"
    >
      <RadioItem
        value="card"
        label="Credit Card"
        description="Pay with Visa, Mastercard, or American Express"
      />
      <RadioItem
        value="paypal"
        label="PayPal"
        description="Pay with your PayPal account"
      />
      <RadioItem
        value="bank"
        label="Bank Transfer"
        description="Direct transfer from your bank account"
      />
      <RadioItem
        value="crypto"
        label="Cryptocurrency"
        description="Pay with Bitcoin, Ethereum, or other crypto"
      />
    </RadioGroup>
  );
}
