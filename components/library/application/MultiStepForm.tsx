"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";

//
// ——— FORM STEPS ———
//

interface StepProps {
  updateFormData: (data: any) => void;
  formData: any;
}

const PersonalInfoStep: React.FC<StepProps> = ({
  updateFormData,
  formData,
}) => {
  const [errors, setErrors] = useState({ name: "", email: "" });

  const validateField = (name: string, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : `${name} is required`,
    }));
    updateFormData({ [name]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name || ""}
          onChange={(e) => validateField("name", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.name ? "border-red-500" : "border-input"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email || ""}
          onChange={(e) => validateField("email", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.email ? "border-red-500" : "border-input"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
    </div>
  );
};

const AddressStep: React.FC<StepProps> = ({ updateFormData, formData }) => {
  const [errors, setErrors] = useState({ street: "", city: "" });

  const validateField = (name: string, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : `${name} is required`,
    }));
    updateFormData({ [name]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Address</h2>

      <div>
        <label htmlFor="street" className="block text-sm font-medium mb-1">
          Street
        </label>
        <input
          id="street"
          type="text"
          value={formData.street || ""}
          onChange={(e) => validateField("street", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.street ? "border-red-500" : "border-input"
          }`}
        />
        {errors.street && (
          <p className="text-red-500 text-sm mt-1">{errors.street}</p>
        )}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium mb-1">
          City
        </label>
        <input
          id="city"
          type="text"
          value={formData.city || ""}
          onChange={(e) => validateField("city", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.city ? "border-red-500" : "border-input"
          }`}
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
      </div>
    </div>
  );
};

const ConfirmationStep: React.FC<StepProps> = ({ formData }) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
    <p className="mb-2">Please confirm your information:</p>
    <div className="bg-muted p-4 rounded-md space-y-2">
      <p>Name — {formData.name}</p>
      <p>Email — {formData.email}</p>
      <p>Street — {formData.street}</p>
      <p>City — {formData.city}</p>
    </div>
  </div>
);

//
// ——— MULTI-STEP FORM ———
//

export interface StepProp {
  title: string;
  component: React.ReactElement<StepProps>;
}

export interface MultiStepFormProps {
  steps: StepProp[];
  onComplete: (data: any) => void;
  className?: string;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onComplete,
  className = "",
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [direction, setDirection] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const isStepValid = useCallback(() => {
    const title = steps[currentStep].title;
    if (title === "Personal Info") {
      return formData.name?.trim() && formData.email?.trim();
    }
    if (title === "Address") {
      return formData.street?.trim() && formData.city?.trim();
    }
    return true;
  }, [currentStep, formData, steps]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1 && isStepValid()) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    } else if (currentStep === steps.length - 1 && isStepValid()) {
      setIsCompleted(true);
      onComplete(formData);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [currentStep, steps.length, onComplete, formData, isStepValid]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const updateFormData = useCallback((data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  }, []);

  if (isCompleted) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <h2 className="text-2xl font-bold text-primary">
          Thank you for submitting!
        </h2>
      </div>
    );
  }

  return (
    <div
      className={`bg-background rounded-lg border border-primary/10 p-4 ${className} overflow-hidden`}
    >
      {/* Progress */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-between gap-4 items-center">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`flex items-center ${
                  idx <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                    idx < currentStep
                      ? "bg-primary text-background"
                      : idx === currentStep
                        ? "border-primary"
                        : "border-muted-foreground"
                  }`}
                >
                  {idx < currentStep ? "✓" : idx + 1}
                </div>
                <span className="ml-2 text-sm font-medium">{step.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`hidden sm:block flex-1 h-1 mx-2 rounded-full ${
                    idx < currentStep ? "bg-primary" : "bg-primary/50"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
          transition={{ duration: 0.3 }}
        >
          {React.cloneElement(steps[currentStep].component, {
            updateFormData,
            formData,
          })}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center px-3 py-2 bg-secondary text-secondary-foreground rounded-md disabled:opacity-50"
        >
          <ChevronLeft className="mr-2" size={16} />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="flex items-center px-3 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
        >
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
          <ChevronRight className="ml-2" size={16} />
        </button>
      </div>
    </div>
  );
};

// Example Usage

export const MultiStepFormExample: React.FC = () => {
  const [formData, setFormData] = useState<any>({});

  const updateFormData = (data: any) =>
    setFormData((prev: any) => ({ ...prev, ...data }));

  const steps = [
    {
      title: "Personal Info",
      component: (
        <PersonalInfoStep updateFormData={updateFormData} formData={formData} />
      ),
    },
    {
      title: "Address",
      component: (
        <AddressStep updateFormData={updateFormData} formData={formData} />
      ),
    },
    {
      title: "Confirmation",
      component: (
        <ConfirmationStep updateFormData={updateFormData} formData={formData} />
      ),
    },
  ];

  const handleComplete = (data: any) => {
    console.log("Form submitted:", data);
    // send data to server...
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <MultiStepForm steps={steps} onComplete={handleComplete} />
    </div>
  );
};
