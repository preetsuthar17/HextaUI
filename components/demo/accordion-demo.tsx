"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion
      className="mx-auto w-full max-w-md"
      collapsible
      defaultValue="item-1"
      type="single"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Shadcn UI?</AccordionTrigger>
        <AccordionContent>
          Shadcn UI is a set of beautiful, accessible React components built
          with Radix UI and Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes, all components use Radix UI primitives which follow WAI-ARIA
          guidelines, supporting keyboard navigation, focus management, and
          screen readers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I customize the styles?</AccordionTrigger>
        <AccordionContent>
          Absolutely! Components are built with utility classes and are fully
          customizable with Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
