"use client";

import { CreditCard, Loader2, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Separator } from "@/registry/new-york/ui/separator";

export interface PaymentFormData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  holderName: string;
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  saveForFuture?: boolean;
  setAsDefault?: boolean;
}

export interface BillingPaymentFormProps {
  onSubmit?: (data: PaymentFormData) => void;
  onCancel?: () => void;
  defaultValues?: Partial<PaymentFormData>;
  className?: string;
  isLoading?: boolean;
  errors?: {
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
    holderName?: string;
    billingAddress?: Record<string, string>;
    general?: string;
  };
  showBillingAddress?: boolean;
  showSaveOption?: boolean;
  showSetDefault?: boolean;
  currency?: string;
}

function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\s+/g, "");
  const chunks = cleaned.match(/.{1,4}/g) || [];
  return chunks.join(" ").slice(0, 19);
}

function detectCardType(
  cardNumber: string
): "visa" | "mastercard" | "amex" | "discover" | "other" {
  const cleaned = cardNumber.replace(/\s+/g, "");
  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "amex";
  if (/^6(?:011|5)/.test(cleaned)) return "discover";
  return "other";
}

function getCardIcon(type: string): string {
  switch (type) {
    case "visa":
      return "💳";
    case "mastercard":
      return "💳";
    case "amex":
      return "💳";
    case "discover":
      return "💳";
    default:
      return "💳";
  }
}

export default function BillingPaymentForm({
  onSubmit,
  onCancel,
  defaultValues,
  className,
  isLoading = false,
  errors,
  showBillingAddress = false,
  showSaveOption = true,
  showSetDefault = false,
}: BillingPaymentFormProps) {
  const [cardNumber, setCardNumber] = useState(defaultValues?.cardNumber || "");
  const [expiryMonth, setExpiryMonth] = useState(
    defaultValues?.expiryMonth || ""
  );
  const [expiryYear, setExpiryYear] = useState(defaultValues?.expiryYear || "");
  const [cvv, setCvv] = useState(defaultValues?.cvv || "");
  const [holderName, setHolderName] = useState(defaultValues?.holderName || "");
  const [showBilling, setShowBilling] = useState(showBillingAddress);
  const [billingAddress, setBillingAddress] = useState(
    defaultValues?.billingAddress || {
      line1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    }
  );
  const [saveForFuture, setSaveForFuture] = useState(
    defaultValues?.saveForFuture ?? true
  );
  const [setAsDefault, setSetAsDefault] = useState(
    defaultValues?.setAsDefault ?? false
  );

  const cardType = detectCardType(cardNumber);
  const cardIcon = getCardIcon(cardType);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "month" | "year"
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    if (type === "month") {
      const month = Math.min(12, Math.max(1, Number.parseInt(value) || 0));
      setExpiryMonth(month.toString().padStart(2, "0").slice(0, 2));
    } else {
      setExpiryYear(value.slice(0, 2));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const maxLength = cardType === "amex" ? 4 : 3;
    setCvv(value.slice(0, maxLength));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      cardNumber: cardNumber.replace(/\s+/g, ""),
      expiryMonth,
      expiryYear,
      cvv,
      holderName,
      billingAddress: showBilling ? billingAddress : undefined,
      saveForFuture,
      setAsDefault,
    });
  };

  const generalError = errors?.general;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Payment method
          </CardTitle>
          <CardDescription>
            Add a new payment method to your account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {generalError && (
            <div
              aria-live="polite"
              className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
              role="alert"
            >
              {generalError}
            </div>
          )}

          <Field data-invalid={!!errors?.cardNumber}>
            <FieldLabel htmlFor="card-number">
              Card number
              <span aria-label="required" className="text-destructive">
                *
              </span>
            </FieldLabel>
            <FieldContent>
              <InputGroup
                aria-describedby={
                  errors?.cardNumber ? "card-number-error" : undefined
                }
                aria-invalid={!!errors?.cardNumber}
              >
                <InputGroupAddon>
                  <span aria-hidden="true" className="text-lg">
                    {cardIcon}
                  </span>
                </InputGroupAddon>
                <InputGroupInput
                  aria-describedby={
                    errors?.cardNumber ? "card-number-error" : undefined
                  }
                  aria-invalid={!!errors?.cardNumber}
                  id="card-number"
                  inputMode="numeric"
                  maxLength={19}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  type="text"
                  value={cardNumber}
                />
              </InputGroup>
            </FieldContent>
            {errors?.cardNumber && (
              <FieldError id="card-number-error">
                {errors.cardNumber}
              </FieldError>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field data-invalid={!!errors?.expiry}>
              <FieldLabel>
                Expiry date
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="sr-only" htmlFor="expiry-month">
                      Expiry month
                    </label>
                    <InputGroup
                      aria-describedby={
                        errors?.expiry ? "expiry-error" : undefined
                      }
                      aria-invalid={!!errors?.expiry}
                    >
                      <InputGroupInput
                        aria-describedby={
                          errors?.expiry ? "expiry-error" : undefined
                        }
                        aria-invalid={!!errors?.expiry}
                        aria-label="Expiry month"
                        id="expiry-month"
                        inputMode="numeric"
                        maxLength={2}
                        onChange={(e) => handleExpiryChange(e, "month")}
                        placeholder="MM"
                        type="text"
                        value={expiryMonth}
                      />
                    </InputGroup>
                  </div>
                  <div className="flex-1">
                    <label className="sr-only" htmlFor="expiry-year">
                      Expiry year
                    </label>
                    <InputGroup
                      aria-describedby={
                        errors?.expiry ? "expiry-error" : undefined
                      }
                      aria-invalid={!!errors?.expiry}
                    >
                      <InputGroupInput
                        aria-describedby={
                          errors?.expiry ? "expiry-error" : undefined
                        }
                        aria-invalid={!!errors?.expiry}
                        aria-label="Expiry year"
                        id="expiry-year"
                        inputMode="numeric"
                        maxLength={2}
                        onChange={(e) => handleExpiryChange(e, "year")}
                        placeholder="YY"
                        type="text"
                        value={expiryYear}
                      />
                    </InputGroup>
                  </div>
                </div>
              </FieldContent>
              {errors?.expiry && (
                <FieldError id="expiry-error">{errors.expiry}</FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors?.cvv}>
              <FieldLabel htmlFor="cvv">
                CVV
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <InputGroup
                  aria-describedby={errors?.cvv ? "cvv-error" : undefined}
                  aria-invalid={!!errors?.cvv}
                >
                  <InputGroupInput
                    aria-describedby={errors?.cvv ? "cvv-error" : undefined}
                    aria-invalid={!!errors?.cvv}
                    id="cvv"
                    inputMode="numeric"
                    maxLength={cardType === "amex" ? 4 : 3}
                    onChange={handleCvvChange}
                    placeholder={cardType === "amex" ? "1234" : "123"}
                    type="text"
                    value={cvv}
                  />
                </InputGroup>
              </FieldContent>
              {errors?.cvv && (
                <FieldError id="cvv-error">{errors.cvv}</FieldError>
              )}
            </Field>
          </div>

          <Field data-invalid={!!errors?.holderName}>
            <FieldLabel htmlFor="holder-name">
              Cardholder name
              <span aria-label="required" className="text-destructive">
                *
              </span>
            </FieldLabel>
            <FieldContent>
              <InputGroup
                aria-describedby={
                  errors?.holderName ? "holder-name-error" : undefined
                }
                aria-invalid={!!errors?.holderName}
              >
                <InputGroupInput
                  aria-describedby={
                    errors?.holderName ? "holder-name-error" : undefined
                  }
                  aria-invalid={!!errors?.holderName}
                  id="holder-name"
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="John Doe"
                  type="text"
                  value={holderName}
                />
              </InputGroup>
            </FieldContent>
            {errors?.holderName && (
              <FieldError id="holder-name-error">
                {errors.holderName}
              </FieldError>
            )}
          </Field>

          {showBillingAddress && (
            <>
              <Separator />
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Billing address</h3>
                  <Button
                    onClick={() => setShowBilling(!showBilling)}
                    type="button"
                    variant="ghost"
                  >
                    {showBilling ? "Hide" : "Show"}
                  </Button>
                </div>
                {showBilling && (
                  <div className="flex flex-col gap-4">
                    <Field>
                      <FieldLabel htmlFor="billing-line1">
                        Street address
                      </FieldLabel>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            id="billing-line1"
                            onChange={(e) =>
                              setBillingAddress({
                                ...billingAddress,
                                line1: e.target.value,
                              })
                            }
                            placeholder="123 Main St"
                            type="text"
                            value={billingAddress.line1}
                          />
                        </InputGroup>
                      </FieldContent>
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="billing-city">City</FieldLabel>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              id="billing-city"
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  city: e.target.value,
                                })
                              }
                              placeholder="New York"
                              type="text"
                              value={billingAddress.city}
                            />
                          </InputGroup>
                        </FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="billing-state">State</FieldLabel>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              id="billing-state"
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  state: e.target.value,
                                })
                              }
                              placeholder="NY"
                              type="text"
                              value={billingAddress.state}
                            />
                          </InputGroup>
                        </FieldContent>
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="billing-zip">ZIP code</FieldLabel>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              id="billing-zip"
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  zip: e.target.value,
                                })
                              }
                              placeholder="10001"
                              type="text"
                              value={billingAddress.zip}
                            />
                          </InputGroup>
                        </FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="billing-country">
                          Country
                        </FieldLabel>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              id="billing-country"
                              onChange={(e) =>
                                setBillingAddress({
                                  ...billingAddress,
                                  country: e.target.value,
                                })
                              }
                              placeholder="United States"
                              type="text"
                              value={billingAddress.country}
                            />
                          </InputGroup>
                        </FieldContent>
                      </Field>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Shield className="size-3.5" />
              <span>Your payment information is encrypted and secure</span>
            </div>
            {showSaveOption && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={saveForFuture}
                  id="save-for-future"
                  onCheckedChange={(checked) =>
                    setSaveForFuture(checked === true)
                  }
                />
                <label className="text-sm" htmlFor="save-for-future">
                  Save this card for future payments
                </label>
              </div>
            )}
            {showSetDefault && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={setAsDefault}
                  id="set-as-default"
                  onCheckedChange={(checked) =>
                    setSetAsDefault(checked === true)
                  }
                />
                <label className="text-sm" htmlFor="set-as-default">
                  Set as default payment method
                </label>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {onCancel && (
              <Button
                className="w-full sm:w-auto"
                onClick={onCancel}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            )}
            <Button
              aria-busy={isLoading}
              className="w-full sm:w-auto"
              data-loading={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  Add payment method
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
