"use client";

import Link from "next/link";
import { Hero } from "@/components/hero";
import AIPreview from "@/components/previews/ai-preview";
import AuthPreview from "@/components/previews/auth-preview";
import BillingPreview from "@/components/previews/billing-preview";
import SettingsPreview from "@/components/previews/settings-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="mx-auto flex w-[95%] flex-col gap-16 px-4 py-12">
      <div>
        <Hero />
      </div>

      <Tabs className="flex w-full flex-col gap-12" defaultValue="auth">
        <div className="flex items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="auth">Authentication</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <Link className="underline underline-offset-4" href="/blocks">
            Check out all blocks
          </Link>
        </div>

        <TabsContent value="auth">
          <AuthPreview />
        </TabsContent>
        <TabsContent value="ai">
          <AIPreview />
        </TabsContent>
        <TabsContent value="billing">
          <BillingPreview />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsPreview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
