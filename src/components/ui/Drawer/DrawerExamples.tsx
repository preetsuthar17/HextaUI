"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerCloseButton,
} from "../drawer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "../input";

export function DrawerBasic() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Basic Drawer</DrawerTitle>
            <DrawerDescription>
              This is a basic drawer component.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <p className="text-sm text-muted-foreground">
              This is the content of the drawer. You can put any content here.
            </p>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerSides() {
  return (
    <div className="flex flex-wrap gap-3">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Bottom
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Bottom Drawer</DrawerTitle>
              <DrawerDescription>Slides up from the bottom</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <p className="text-sm">Content for bottom drawer</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer direction="top">
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Top
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Top Drawer</DrawerTitle>
              <DrawerDescription>Slides down from the top</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <p className="text-sm">Content for top drawer</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Left
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full">
            <DrawerHeader>
              <DrawerTitle>Left Drawer</DrawerTitle>
              <DrawerDescription>Slides in from the left</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <p className="text-sm">Content for left drawer</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Right
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full">
            <DrawerHeader>
              <DrawerTitle>Right Drawer</DrawerTitle>
              <DrawerDescription>Slides in from the right</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <p className="text-sm">Content for right drawer</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export function DrawerWithCloseButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open with Close Button</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerCloseButton />
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Drawer with Close Button</DrawerTitle>
            <DrawerDescription>
              This drawer has a close button in the top-right corner.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <p className="text-sm text-muted-foreground">
              You can close this drawer by clicking the X button or the Cancel
              button below.
            </p>
          </div>
          <DrawerFooter>
            <Button>Confirm</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerForm() {
  const [email, setEmail] = React.useState("");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Subscribe</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Subscribe to Newsletter</DrawerTitle>
            <DrawerDescription>
              Get the latest updates and news delivered to your inbox.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-border rounded-ele bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" size="sm">
                Pro tip
              </Badge>
              <span className="text-xs text-muted-foreground">
                You can unsubscribe at any time
              </span>
            </div>
          </div>
          <DrawerFooter>
            <Button disabled={!email}>Subscribe</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerWithContent() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Product Details</DrawerTitle>
            <DrawerDescription>
              Complete information about this product
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-0 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Price</span>
                <Badge>$29.99</Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <span className="text-sm font-medium">Features</span>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• High-quality materials</li>
                  <li>• 30-day money back guarantee</li>
                  <li>• Free shipping worldwide</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>
              <Separator />
              <div className="space-y-2">
                <span className="text-sm font-medium">Description</span>
                <p className="text-sm text-muted-foreground">
                  This is a premium product designed with attention to detail
                  and built to last. Perfect for everyday use with a modern
                  aesthetic.
                </p>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Add to Cart</Button>
            <DrawerClose asChild>
              <Button variant="outline">Continue Shopping</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
