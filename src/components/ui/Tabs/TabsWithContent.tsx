"use client";

import React, { useState } from "react";
import { Tabs, TabsContent } from "./index";
import { Home, Settings, Search } from "lucide-react";

export function TabsWithContent() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full max-w-md">
      <Tabs
        items={[
          { id: "overview", label: "Overview", icon: <Home /> },
          { id: "analytics", label: "Analytics", icon: <Search /> },
          { id: "settings", label: "Settings", icon: <Settings /> },
        ]}
        value={activeTab}
        onValueChange={setActiveTab}
      />

      <div className="mt-4 p-4 border border-border rounded-ele bg-background">
        <TabsContent value="overview" activeValue={activeTab}>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Overview</h3>
            <p className="text-sm text-muted-foreground">
              Welcome to your dashboard overview. Here you can see a summary of
              your most important metrics and recent activity.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" activeValue={activeTab}>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Detailed analytics and insights about your performance, user
              engagement, and growth metrics.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="settings" activeValue={activeTab}>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure your preferences, manage your account, and customize
              your experience.
            </p>
          </div>
        </TabsContent>
      </div>
    </div>
  );
}
