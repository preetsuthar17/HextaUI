"use client";

import * as React from "react";
import { Switch } from "../switch";

export function BasicSwitch() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">Airplane Mode</label>
    </div>
  );
}

export function SwitchWithLabel() {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <Switch
      id="notifications"
      label="Push Notifications"
      description="Receive notifications on your device"
      checked={isChecked}
      onCheckedChange={setIsChecked}
    />
  );
}

export function SwitchVariants() {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Switch defaultChecked />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Secondary</label>
        <Switch variant="secondary" defaultChecked />
      </div>
    </div>
  );
}

export function SwitchSizes() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-16">Small</span>
        <Switch size="sm" defaultChecked />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-16">Default</span>
        <Switch defaultChecked />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-16">Large</span>
        <Switch size="lg" defaultChecked />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-16">Extra Large</span>
        <Switch size="xl" defaultChecked />
      </div>
    </div>
  );
}

export function DisabledSwitch() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <label htmlFor="disabled-off" className="text-sm">
          Disabled (Off)
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <label htmlFor="disabled-on" className="text-sm">
          Disabled (On)
        </label>
      </div>
    </div>
  );
}

export function ControlledSwitch() {
  const [notifications, setNotifications] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-4">Settings</h4>
        <div className="space-y-4">
          <Switch
            label="Enable Notifications"
            description="Get notified about important updates"
            checked={notifications}
            onCheckedChange={setNotifications}
          />{" "}
          <Switch
            label="Dark Mode"
            description="Use dark theme across the application"
            variant="secondary"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
          <Switch
            label="Auto Save"
            description="Automatically save your work"
            variant="secondary"
            checked={autoSave}
            onCheckedChange={setAutoSave}
          />
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>Notifications: {notifications ? "Enabled" : "Disabled"}</p>
        <p>Dark Mode: {darkMode ? "Enabled" : "Disabled"}</p>
        <p>Auto Save: {autoSave ? "Enabled" : "Disabled"}</p>
      </div>
    </div>
  );
}

export function SwitchWithError() {
  const [agreed, setAgreed] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="space-y-4">
      <Switch
        label="I agree to the terms and conditions"
        description="Please read and accept our terms before proceeding"
        checked={agreed}
        onCheckedChange={setAgreed}
        error={submitted && !agreed ? "You must agree to the terms" : undefined}
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Submit
      </button>
    </div>
  );
}

export function AnimatedSwitch() {
  const [isAnimated, setIsAnimated] = React.useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="animation-toggle"
          checked={isAnimated}
          onCheckedChange={setIsAnimated}
        />
        <label htmlFor="animation-toggle" className="text-sm">
          Enable animations
        </label>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Example switches:</p>
        <div className="flex items-center gap-4">
          <Switch defaultChecked animated={isAnimated} label="Animated" />
          <Switch defaultChecked animated={false} label="Not animated" />
        </div>
      </div>
    </div>
  );
}
