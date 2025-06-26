"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../input-otp";

export function InputOTPExamples() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">
          Basic OTP Input
        </h3>
        <div className="flex flex-col items-center gap-3">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm text-muted-foreground">
            Enter your one-time password.
          </div>
        </div>
      </div>{" "}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">
          With Separator
        </h3>
        <div className="flex justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>{" "}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Variants</h3>
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="flex flex-col gap-2">
            <div className="text-xs text-muted-foreground">Default</div>
            <InputOTP maxLength={4} variant="default">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex flex-col gap-2 items-center text-center">
            <div className="text-xs text-muted-foreground">Destructive</div>
            <InputOTP maxLength={4} variant="destructive">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <div className="text-xs text-destructive">
              Invalid verification code. Please try again.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InputOTPCompleteExample() {
  const [value, setValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (value: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsComplete(true);
    setIsLoading(false);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setIsComplete(false);
    if (newValue.length === 6) {
      handleComplete(newValue);
    }
  };
  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto text-center items-center">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Verify your email</h3>
        <p className="text-sm text-muted-foreground">
          We've sent a verification code to your email address.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={handleChange}
          disabled={isLoading || isComplete}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {isLoading && (
          <div className="text-sm text-muted-foreground">Verifying...</div>
        )}

        {isComplete && (
          <div className="text-sm text-primary font-medium">
            ✓ Verification successful!
          </div>
        )}

        {!isComplete && !isLoading && value.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {value.length}/6 characters entered
          </div>
        )}
      </div>{" "}
      <div className="flex flex-col gap-2">
        <button
          className="text-sm text-primary hover:underline"
          onClick={() => {
            setValue("");
            setIsComplete(false);
            setIsLoading(false);
          }}
        >
          Resend code
        </button>
        <div className="text-xs text-muted-foreground">
          Didn't receive the code? Check your spam folder.
        </div>
      </div>
    </div>
  );
}

export function InputOTPPatternExample() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-foreground">Numeric Only</h3>
        <InputOTP
          maxLength={6}
          pattern={"[0-9]*"}
          value={value}
          onChange={setValue}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSeparator />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-xs text-muted-foreground">
          Only numbers are allowed
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-foreground">Alphanumeric</h3>
        <InputOTP maxLength={6} pattern={"[A-Za-z0-9]*"}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSeparator />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-xs text-muted-foreground">
          Letters and numbers are allowed
        </div>
      </div>
    </div>
  );
}

export function InputOTPAnimatedExample() {
  const [values, setValues] = useState<string[]>(["", "", ""]);
  const [currentInput, setCurrentInput] = useState(0);

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value.length === 4 && index < 2) {
      setCurrentInput(index + 1);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h3 className="text-lg font-semibold">Enter your backup codes</h3>
        <p className="text-sm text-muted-foreground">
          Enter any of your 8-digit backup codes
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center text-center">
        {values.map((value, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="text-xs font-medium text-muted-foreground">
              Code {index + 1}
            </div>
            <InputOTP
              maxLength={4}
              value={value}
              onChange={(newValue) => handleValueChange(index, newValue)}
              pattern={"[0-9]*"}
              animated={true}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} animated={true} />
                <InputOTPSlot index={1} animated={true} />
                <InputOTPSlot index={2} animated={true} />
                <InputOTPSlot index={3} animated={true} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors disabled:opacity-50"
          disabled={!values.some((v) => v.length === 4)}
        >
          Verify backup code
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">
          Responsive Design
        </h3>
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground text-center">
            Automatically adjusts size for mobile devices
          </p>
          <div className="flex justify-center">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Try resizing your browser to see the responsive behavior
          </div>
        </div>
      </div>
    </div>
  );
}
