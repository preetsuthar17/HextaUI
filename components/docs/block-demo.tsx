"use client";

import type { ComponentType } from "react";
import { useState } from "react";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentSection } from "@/components/docs/component-section";
import { Button } from "@/components/ui/button";
import { getBlockExampleProps } from "@/lib/blocks-registry";

interface BlockDemoProps {
  Component: ComponentType<any>;
  blockId: string;
}

export function BlockDemo({ Component, blockId }: BlockDemoProps) {
  const exampleProps = getBlockExampleProps(blockId);

  const [open, setOpen] = useState(
    blockId === "billing-invoice-details" ? false : undefined
  );
  const propsWithState = {
    ...exampleProps,
    ...(blockId === "billing-invoice-details" && {
      open: open ?? false,
      onOpenChange: (newOpen: boolean) => {
        setOpen(newOpen);
        exampleProps.onOpenChange?.(newOpen);
      },
    }),
    ...(blockId === "billing-payment-schedule" && {
      payments: Array.isArray(exampleProps?.payments)
        ? exampleProps.payments
        : exampleProps?.payments
          ? [exampleProps.payments]
          : [],
    }),
  };

  return (
    <ComponentSection id="demo">
      <ComponentPreview
        className="flex flex-col gap-3"
        codeKind="demo"
        filename={`${blockId}-demo.tsx`}
      >
        {blockId === "billing-invoice-details" ? (
          <div className="flex flex-col gap-4">
            <Button onClick={() => setOpen(true)}>View Invoice Details</Button>
            <Component {...propsWithState} />
          </div>
        ) : (
          <Component {...propsWithState} />
        )}
      </ComponentPreview>
    </ComponentSection>
  );
}
