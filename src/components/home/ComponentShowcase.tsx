import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Heart, Star, Play, Pause } from "lucide-react";

const ComponentShowcase = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-16 py-28 px-8 text-center w-full border-t">
        <div className="flex items-center justify-center gap-6 flex-col">
          <Badge variant="secondary" className="px-4 py-2">
            Components
          </Badge>
          <h2 className="text-4xl font-medium">
            100+ ready to use components & blocks
          </h2>
          <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
            Copy and paste components built with Radix UI, Tailwind CSS, and
            TypeScript.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Buttons */}
          <Card className="p-6 space-y-4">
            <h3 className="font-medium text-left">Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Primary</Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Button variant="ghost" size="sm">
                Ghost
              </Button>
              <Button variant="destructive" size="sm">
                Destructive
              </Button>
            </div>
          </Card>

          {/* Form Controls */}
          <Card className="p-6 space-y-4">
            <h3 className="font-medium text-left">Form Controls</h3>
            <div className="space-y-3">
              <Input placeholder="Enter your email" className="text-sm" />
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm">
                  Accept terms
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <label htmlFor="notifications" className="text-sm">
                  Notifications
                </label>
              </div>
            </div>
          </Card>

          {/* Progress & Sliders */}
          <Card className="p-6 space-y-4">
            <h3 className="font-medium text-left">Progress & Sliders</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Progress: 65%
                </div>
                <Progress value={65} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Slider</div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* Badges & Toggles */}
          <Card className="p-6 space-y-4">
            <h3 className="font-medium text-left">Badges & Toggles</h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
              <div className="flex gap-2">
                <Toggle aria-label="Like">
                  <Heart className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Star">
                  <Star className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Play">
                  <Play className="h-4 w-4" />
                </Toggle>
              </div>
            </div>
          </Card>

          {/* Avatar & Skeleton */}
          <Card className="p-6 space-y-4">
            <h3 className="font-medium text-left">Avatar & Loading</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <img
                    src="https://github.com/preetsuthar17.png"
                    alt="Avatar"
                  />
                </Avatar>
                <Avatar className="h-8 w-8">
                  <div className="bg-black h-full w-full flex items-center justify-center text-white text-xs font-medium">
                    HX
                  </div>
                </Avatar>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </Card>

          {/* Layout Elements */}
          <Card className="p-6 space-y-4">
            <h3 className="font-medium text-left">Layout</h3>
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="text-sm font-medium">Card Content</div>
                <div className="text-xs text-muted-foreground mt-1">
                  This is a card component
                </div>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                Separator above
              </div>
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-center">
          <Button asChild variant="outline" className="group">
            <a
              href="/docs/ui/foundation/components"
              className="flex items-center gap-2"
            >
              View all components
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          All components are accessible, customizable, and production-ready.
        </p>
      </section>
    </>
  );
};

export default ComponentShowcase;
