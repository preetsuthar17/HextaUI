"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";
import { Settings, Sun, Moon, Monitor } from "lucide-react";

interface DashboardSettings {
  refreshInterval: number;
  autoRefresh: boolean;
  notifications: boolean;
  darkMode: boolean;
  layout: "compact" | "default" | "spacious";
  theme: "light" | "dark" | "system";
}

interface SettingsModalProps {
  showSettings: boolean;
  settings: DashboardSettings;
  handleSettingsChange: (key: keyof DashboardSettings, value: any) => void;
}

export function SettingsModal({
  showSettings,
  settings,
  handleSettingsChange,
}: SettingsModalProps) {
  if (!showSettings) return null;

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary" className="w-full sm:w-auto sm:ml-auto">
          <Settings className="h-4 w-4 mr-2" />
          Dashboard Settings
        </Button>
      </ModalTrigger>
      <ModalContent className="max-w-lg">
        <ModalHeader>
          <ModalTitle>Dashboard Settings</ModalTitle>
          <ModalDescription>
            Customize your dashboard experience and preferences.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-6 py-4">
          {/* General Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">General</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium">Auto-refresh</label>
                <p className="text-xs text-muted-foreground">
                  Automatically refresh dashboard data
                </p>
              </div>
              <Switch
                checked={settings.autoRefresh}
                onCheckedChange={(checked) =>
                  handleSettingsChange("autoRefresh", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium">Notifications</label>
                <p className="text-xs text-muted-foreground">
                  Show system notifications
                </p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) =>
                  handleSettingsChange("notifications", checked)
                }
              />
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Appearance</h4>

            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <Select
                value={settings.theme}
                onValueChange={(value) => handleSettingsChange("theme", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light" icon={Sun}>
                    Light
                  </SelectItem>
                  <SelectItem value="dark" icon={Moon}>
                    Dark
                  </SelectItem>
                  <SelectItem value="system" icon={Monitor}>
                    System
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Layout</label>
              <Select
                value={settings.layout}
                onValueChange={(value) => handleSettingsChange("layout", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Data Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Data</h4>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Refresh Interval (seconds)
              </label>
              <Select
                value={settings.refreshInterval.toString()}
                onValueChange={(value) =>
                  handleSettingsChange("refreshInterval", parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
