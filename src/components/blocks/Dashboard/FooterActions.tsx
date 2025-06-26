"use client";

import { Button } from "@/components/ui/button";
import { Plus, Download, Share2, Maximize2 } from "lucide-react";
import { SettingsModal } from "./SettingsModal";

interface DashboardSettings {
  refreshInterval: number;
  autoRefresh: boolean;
  notifications: boolean;
  darkMode: boolean;
  layout: "compact" | "default" | "spacious";
  theme: "light" | "dark" | "system";
}

interface FooterActionsProps {
  enableExport: boolean;
  handleExport: () => void;
  showSettings: boolean;
  settings: DashboardSettings;
  handleSettingsChange: (key: keyof DashboardSettings, value: any) => void;
}

export function FooterActions({
  enableExport,
  handleExport,
  showSettings,
  settings,
  handleSettingsChange,
}: FooterActionsProps) {
  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-border sm:flex-row sm:items-center">
      <Button className="w-full sm:w-auto group">
        <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
        Add New Item
      </Button>

      {enableExport && (
        <Button
          variant="secondary"
          className="w-full sm:w-auto"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      )}

      {/* Settings Modal */}
      <SettingsModal
        showSettings={showSettings}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
      />

      {/* Additional Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
          <Share2 className="h-4 w-4" />
          <span className="ml-2 sm:hidden">Share</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
          <Maximize2 className="h-4 w-4" />
          <span className="ml-2 sm:hidden">Fullscreen</span>
        </Button>
      </div>
    </div>
  );
}
