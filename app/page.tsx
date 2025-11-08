"use client";

import { Hero } from "@/components/hero";
import AIPreview from "@/components/previews/ai-preview";
import AuthPreview from "@/components/previews/auth-preview";
import BillingPreview from "@/components/previews/billing-preview";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="mx-auto flex w-[95%] flex-col gap-16 px-4 py-12">
      <div>
        <Hero />
      </div>
      <p className="text-center text-muted-foreground">
        We&apos;re working on new components and blocks. code coming soon!
      </p>
      <Tabs className="flex w-full flex-col gap-12" defaultValue="auth">
        <TabsList>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="auth">
          <AuthPreview />
        </TabsContent>
        <TabsContent value="ai">
          <AIPreview />
        </TabsContent>
        <TabsContent value="billing">
          <BillingPreview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
