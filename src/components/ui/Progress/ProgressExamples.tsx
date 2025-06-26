"use client";

import { useState, useEffect } from "react";
import { Progress } from "./index";

export function ProgressExamples() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Basic Progress
        </h3>
        <Progress value={progress} label="Loading..." className="w-full" />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          With Value Display
        </h3>
        <Progress
          value={progress}
          label="Download Progress"
          showValue
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Different Sizes
        </h3>
        <div className="space-y-4">
          <Progress
            value={progress}
            label="Small Progress"
            size="sm"
            className="w-full"
          />
          <Progress
            value={progress}
            label="Default Progress"
            size="default"
            className="w-full"
          />
          <Progress
            value={progress}
            label="Large Progress"
            size="lg"
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Variants</h3>
        <div className="space-y-4">
          <Progress
            value={progress}
            label="Default Variant"
            variant="default"
            className="w-full"
          />
          <Progress
            value={progress}
            label="Primary Variant"
            variant="primary"
            className="w-full"
          />
          <Progress
            value={progress}
            label="Secondary Variant"
            variant="secondary"
            className="w-full"
          />
          <Progress
            value={progress}
            label="Destructive Variant"
            variant="destructive"
            className="w-full"
          />
          <Progress
            value={progress}
            label="Outline Variant"
            variant="outline"
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Circular Progress
        </h3>
        <div className="flex gap-6 items-center">
          <div className="text-center space-y-2">
            <Progress
              value={progress}
              label="Small"
              type="circular"
              size="sm"
            />
          </div>
          <div className="text-center space-y-2">
            <Progress
              value={progress}
              label="Default"
              type="circular"
              size="default"
              showValue
            />
          </div>
          <div className="text-center space-y-2">
            <Progress
              value={progress}
              label="Large"
              type="circular"
              size="lg"
              variant="destructive"
              showValue
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnimatedProgressExample() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 10;
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Progress
          value={progress}
          label="File Upload"
          showValue
          animated
          className="w-full"
        />
      </div>
      <div className="space-y-3">
        <div className="flex justify-center">
          <Progress
            value={progress}
            label="Processing"
            type="circular"
            showValue
            animated
          />
        </div>
      </div>
    </div>
  );
}

export function ProgressWithSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Planning", "Development", "Testing", "Deployment"];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6 w-full max-w-lg">
      <div className="space-y-4">
        <div className="flex justify-between text-sm font-medium">
          {steps.map((step, index) => (
            <span
              key={step}
              className={`transition-colors ${
                index <= currentStep ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
        <Progress
          value={progress}
          label={`${steps[currentStep]} - Step ${currentStep + 1} of ${
            steps.length
          }`}
          showValue
          className="w-full"
        />{" "}
        <div className="text-center text-xs text-muted-foreground">
          {steps[currentStep]}
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-md transition-opacity disabled:opacity-50 hover:bg-secondary/80"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md transition-opacity disabled:opacity-50 hover:bg-primary/80"
        >
          Next
        </button>
      </div>
    </div>
  );
}
