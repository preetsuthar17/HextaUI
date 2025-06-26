"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import {
  Star,
  Shield,
  Zap,
  Heart,
  Settings,
  User,
  FileText,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and includes full
          keyboard navigation support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the design system, but
          you can customize them to fit your needs.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses smooth CSS animations for expanding and collapsing that
          enhance the user experience.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionMultiple() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
          <AccordionContent>
            Yes. You can configure the accordion to allow multiple items to be
            open at the same time by setting type="multiple".
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            When type is set to "multiple", users can expand multiple accordion
            items simultaneously, making it easier to compare content.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What about accessibility?</AccordionTrigger>
          <AccordionContent>
            The component maintains full accessibility even with multiple items
            open, including proper ARIA attributes and keyboard navigation.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function AccordionVariants() {
  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-semibold mb-3">Default</h3>
        <Accordion
          type="single"
          collapsible
          variant="default"
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Default variant</AccordionTrigger>
            <AccordionContent>
              This is the default accordion variant with borders and background.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Ghost</h3>
        <Accordion type="single" collapsible variant="ghost" className="w-full">
          <AccordionItem value="item-1" variant="ghost">
            <AccordionTrigger variant="ghost">Ghost variant</AccordionTrigger>
            <AccordionContent variant="ghost">
              This is the ghost accordion variant with minimal styling.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" variant="ghost">
            <AccordionTrigger variant="ghost">Another item</AccordionTrigger>
            <AccordionContent variant="ghost">
              Ghost variant works great for simple, clean layouts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Outline</h3>
        <Accordion
          type="single"
          collapsible
          variant="outline"
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger variant="outline">
              Outline variant
            </AccordionTrigger>
            <AccordionContent variant="outline">
              This is the outline accordion variant with border styling.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export function AccordionSizes() {
  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-semibold mb-3">Small</h3>
        <Accordion type="single" collapsible size="sm" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger size="sm">Small accordion</AccordionTrigger>
            <AccordionContent size="sm">
              This is a small-sized accordion with compact spacing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Default</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Default accordion</AccordionTrigger>
            <AccordionContent>
              This is the default-sized accordion with standard spacing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Large</h3>
        <Accordion type="single" collapsible size="lg" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger size="lg">Large accordion</AccordionTrigger>
            <AccordionContent size="lg">
              This is a large-sized accordion with generous spacing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export function AccordionWithIcons() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="features">
          <AccordionTrigger icon={<Star className="h-4 w-4" />}>
            Features
          </AccordionTrigger>
          <AccordionContent>
            Our platform includes advanced features like real-time
            collaboration, version control, and automated deployments to
            streamline your workflow.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="security">
          <AccordionTrigger icon={<Shield className="h-4 w-4" />}>
            Security
          </AccordionTrigger>
          <AccordionContent>
            We implement enterprise-grade security with end-to-end encryption,
            two-factor authentication, and regular security audits.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="performance">
          <AccordionTrigger icon={<Zap className="h-4 w-4" />}>
            Performance
          </AccordionTrigger>
          <AccordionContent>
            Built for speed with optimized caching, CDN distribution, and
            performance monitoring to ensure fast load times globally.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger icon={<Heart className="h-4 w-4" />}>
            Support
          </AccordionTrigger>
          <AccordionContent>
            24/7 customer support with dedicated account managers, comprehensive
            documentation, and community forums.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function AccordionCustomStyling() {
  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-semibold mb-3">Rounded</h3>
        <Accordion
          type="single"
          collapsible
          className="w-full rounded-ele overflow-hidden"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Rounded accordion</AccordionTrigger>
            <AccordionContent>
              This accordion has custom rounded corners applied.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">No Chevron</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger hideChevron>
              Accordion without chevron
            </AccordionTrigger>
            <AccordionContent>
              This accordion item has the chevron icon hidden.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Custom Icon</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger
              icon={<ChevronRight className="h-4 w-4" />}
              hideChevron
            >
              Custom expand icon
            </AccordionTrigger>
            <AccordionContent>
              This accordion uses a custom icon instead of the default chevron.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export function AccordionFAQ() {
  const faqs = [
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy! Simply sign up for an account, choose your plan, and follow our step-by-step onboarding guide. You'll be up and running in minutes.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger icon={<HelpCircle className="h-4 w-4" />}>
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function AccordionNested() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="account">
          <AccordionTrigger icon={<User className="h-4 w-4" />}>
            Account Settings
          </AccordionTrigger>
          <AccordionContent>
            <Accordion
              type="single"
              collapsible
              variant="ghost"
              className="mt-2 w-full"
            >
              <AccordionItem value="profile" variant="ghost">
                <AccordionTrigger variant="ghost" size="sm">
                  Profile Information
                </AccordionTrigger>
                <AccordionContent variant="ghost" size="sm">
                  Manage your personal information, profile picture, and bio.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="privacy" variant="ghost">
                <AccordionTrigger variant="ghost" size="sm">
                  Privacy Settings
                </AccordionTrigger>
                <AccordionContent variant="ghost" size="sm">
                  Control who can see your profile and contact you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="preferences">
          <AccordionTrigger icon={<Settings className="h-4 w-4" />}>
            Preferences
          </AccordionTrigger>
          <AccordionContent>
            <Accordion
              type="single"
              collapsible
              variant="ghost"
              className="mt-2 w-full"
            >
              <AccordionItem value="notifications" variant="ghost">
                <AccordionTrigger variant="ghost" size="sm">
                  Notifications
                </AccordionTrigger>
                <AccordionContent variant="ghost" size="sm">
                  Configure email and push notification preferences.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="theme" variant="ghost">
                <AccordionTrigger variant="ghost" size="sm">
                  Theme & Appearance
                </AccordionTrigger>
                <AccordionContent variant="ghost" size="sm">
                  Choose between light, dark, or system theme preferences.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
