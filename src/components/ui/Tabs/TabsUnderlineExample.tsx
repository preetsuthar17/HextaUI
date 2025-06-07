"use client";

import React from "react";
import { Tabs, TabsContent } from "./index";
import { Home, Settings, User, Bell } from "lucide-react";

export function TabsUnderlineExample() {
  const [activeTab, setActiveTab] = React.useState("home");

  const tabItems = [
    { id: "home", label: "Home", icon: <Home /> },
    { id: "notifications", label: "Notifications", icon: <Bell /> },
    { id: "profile", label: "Profile", icon: <User /> },
    { id: "settings", label: "Settings", icon: <Settings /> },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Underline Variant</h4>
        <p className="text-xs text-muted-foreground">
          Tabs with underline indicator instead of background fill
        </p>
        <div className="w-full">
          <Tabs
            variant="underline"
            items={tabItems}
            value={activeTab}
            onValueChange={setActiveTab}
          />

          <TabsContent value="home" activeValue={activeTab}>
            <div className="p-4 bg-accent/5 rounded-md mt-4">
              <h3 className="font-semibold">Home Content</h3>
              <p className="text-sm text-muted-foreground mt-2">
                This is the home tab content with underline variant.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="notifications" activeValue={activeTab}>
            <div className="p-4 bg-accent/5 rounded-md mt-4">
              <h3 className="font-semibold">Notifications Content</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your notifications will be displayed here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="profile" activeValue={activeTab}>
            <div className="p-4 bg-accent/5 rounded-md mt-4">
              <h3 className="font-semibold">Profile Content</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your user profile and settings.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="settings" activeValue={activeTab}>
            <div className="p-4 bg-accent/5 rounded-md mt-4">
              <h3 className="font-semibold">Settings Content</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Application settings and preferences.
              </p>
            </div>
          </TabsContent>
        </div>
      </div>
    </div>
  );
}
