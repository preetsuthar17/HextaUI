import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, XCircle } from "lucide-react";

const Pricing = () => {
  // Features for Pro plan
  const proFeatures = [
    "All open-source components",
    "Pro blocks & templates",
    "Early access to new features",
    "Priority support",
    "Commercial license",
    "Lifetime access, no recurring fees",
  ];

  // Features for Free plan
  const freeFeatures = [
    "All open-source components",
    "Access to foundation components",
    "MIT License",
    "Community support",
    "Basic documentation",
    "Free forever",
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-16 py-28 px-8 w-full border-t">
      <div className="flex items-center justify-center gap-6 flex-col text-center">
        <Badge variant="secondary" className="px-4 py-2">
          Pricing
        </Badge>
        <h2 className="text-4xl font-medium">Simple, transparent pricing</h2>
        <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
          Choose the plan that fits your needs. No hidden fees.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full justify-between">
        {/* Free Plan Card */}
        <div className="max-w-lg mx-auto lg:mx-0 w-full">
          <div className="p-8 text-left border border-border rounded-ele bg-background/80  flex flex-col h-full justify-between">
            {/* Plan Name */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                HextaUI Free
              </h3>
              <p className="text-muted-foreground text-sm">
                Perfect for personal projects and trying out HextaUI
              </p>
            </div>
            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-foreground">$0</span>
              </div>
              <p className="text-sm text-muted-foreground">
                MIT License • Community support
              </p>
            </div>
            {/* Features */}
            <div className="mb-8 space-y-3">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            {/* CTA Button */}
            <div className="flex w-full justify-center">
              <Button asChild size="lg" className="w-full" variant="secondary">
                <a href="/docs/ui/getting-started/introduction">Get Started</a>
              </Button>
            </div>
            {/* Trust indicators */}
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>Open source</span>
              <span>•</span>
              <span>Forever free</span>
            </div>
          </div>
        </div>
        {/* Pro Plan Card */}
        <div className="max-w-lg mx-auto lg:mx-0 w-full">
          <div className="p-8 text-left border border-border rounded-card bg-background/80  flex flex-col h-full justify-between">
            {/* Plan Name */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                HextaUI Pro
              </h3>
              <p className="text-muted-foreground text-sm">
                Everything you need to build beautiful interfaces
              </p>
            </div>
            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-foreground">$49</span>
                <span className="text-muted-foreground">one-time</span>
              </div>
              <p className="text-sm text-muted-foreground">
                No recurring fees • Lifetime access
              </p>
            </div>
            {/* Features */}
            <div className="mb-8 space-y-3">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            {/* CTA Button */}
            <div className="flex w-full justify-center">
              <Button asChild size="lg" className="w-full">
                <a
                  href="https://pro.hextaui.com/#pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get HextaUI Pro
                </a>
              </Button>
            </div>
            {/* Trust indicators */}
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>Instant access</span>
              <span>•</span>
              <span>Secure payment</span>
            </div>
          
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground max-w-md text-center mt-8">
        Need a custom license or have questions?{" "}
        <a
          href="https://discord.gg/hG4dkbMcZf"
          className="underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact us
        </a>
        .
      </p>
    </section>
  );
};

export default Pricing;
