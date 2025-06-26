"use client";

import * as React from "react";
import { Slider } from "../slider";
import { Button } from "../button";

export function BasicSlider() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
}

export function SliderWithLabel() {
  const [value, setValue] = React.useState([25]);

  return (
    <div className="w-full max-w-md space-y-4">
      <Slider
        value={value}
        onValueChange={setValue}
        label="Volume"
        description="Adjust the volume level"
        showValue
        max={100}
        step={1}
      />
    </div>
  );
}

export function SliderVariants() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Slider defaultValue={[30]} max={100} step={1} />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Destructive</label>
        <Slider defaultValue={[70]} max={100} step={1} variant="destructive" />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Ghost</label>
        <Slider defaultValue={[50]} max={100} step={1} variant="ghost" />
      </div>
    </div>
  );
}

export function SliderSizes() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Small</label>
        <Slider defaultValue={[25]} max={100} step={1} size="sm" />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Slider defaultValue={[50]} max={100} step={1} size="default" />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Large</label>
        <Slider defaultValue={[75]} max={100} step={1} size="lg" />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Extra Large</label>
        <Slider defaultValue={[90]} max={100} step={1} size="xl" />
      </div>
    </div>
  );
}

export function SliderWithMinMax() {
  const [value, setValue] = React.useState([50]);

  return (
    <div className="w-full max-w-md space-y-4">
      <Slider
        value={value}
        onValueChange={setValue}
        label="Temperature"
        description="Set the desired temperature"
        showValue
        showMinMax
        min={0}
        max={100}
        step={5}
        formatValue={(val) => `${val}°C`}
      />
    </div>
  );
}

export function RangeSlider() {
  const [value, setValue] = React.useState([20, 80]);

  return (
    <div className="w-full max-w-md space-y-4">
      <Slider
        value={value}
        onValueChange={setValue}
        label="Price Range"
        description="Select your budget range"
        showValue
        showMinMax
        min={0}
        max={1000}
        step={10}
        formatValue={(val) => `$${val}`}
      />
    </div>
  );
}

export function SteppedSlider() {
  const [value, setValue] = React.useState([3]);

  const formatRating = (val: number) => {
    const ratings = ["Poor", "Fair", "Good", "Great", "Excellent"];
    return ratings[val - 1] || "Unknown";
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <Slider
        value={value}
        onValueChange={setValue}
        label="Rating"
        description="Rate your experience"
        showValue
        min={1}
        max={5}
        step={1}
        formatValue={formatRating}
      />
    </div>
  );
}

export function DisabledSlider() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Slider
        defaultValue={[60]}
        max={100}
        step={1}
        disabled
        label="Disabled Slider"
        description="This slider is disabled"
        showValue
      />
    </div>
  );
}

export function SliderWithError() {
  const [value, setValue] = React.useState([95]);

  return (
    <div className="w-full max-w-md space-y-4">
      <Slider
        value={value}
        onValueChange={setValue}
        label="CPU Usage"
        description="Current CPU usage percentage"
        showValue
        showMinMax
        max={100}
        step={1}
        error={value[0] > 90 ? "CPU usage is critically high!" : undefined}
        formatValue={(val) => `${val}%`}
      />
    </div>
  );
}

export function FormExample() {
  const [settings, setSettings] = React.useState({
    volume: [75],
    brightness: [50],
    contrast: [60],
    priceRange: [100, 500],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings:", settings);
    alert("Settings saved!");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <h3 className="text-lg font-semibold">Display Settings</h3>

      <Slider
        value={settings.volume}
        onValueChange={(value) => setSettings((s) => ({ ...s, volume: value }))}
        label="Volume"
        description="Adjust system volume"
        showValue
        showMinMax
        max={100}
        step={1}
        formatValue={(val) => `${val}%`}
      />

      <Slider
        value={settings.brightness}
        onValueChange={(value) =>
          setSettings((s) => ({ ...s, brightness: value }))
        }
        label="Brightness"
        description="Screen brightness level"
        showValue
        max={100}
        step={5}
        formatValue={(val) => `${val}%`}
      />

      <Slider
        value={settings.contrast}
        onValueChange={(value) =>
          setSettings((s) => ({ ...s, contrast: value }))
        }
        label="Contrast"
        description="Screen contrast level"
        showValue
        max={100}
        step={5}
        formatValue={(val) => `${val}%`}
      />

      <Slider
        value={settings.priceRange}
        onValueChange={(value) =>
          setSettings((s) => ({ ...s, priceRange: value }))
        }
        label="Price Range"
        description="Budget range for purchases"
        showValue
        showMinMax
        min={0}
        max={1000}
        step={25}
        formatValue={(val) => `$${val}`}
      />

      <Button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-ele hover:bg-primary/90 transition-colors"
      >
        Save Settings
      </Button>
    </form>
  );
}
