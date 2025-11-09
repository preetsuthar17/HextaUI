"use client";

import { Loader2, RotateCcw, Save, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface AISettings {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  systemPrompt?: string;
  model?: string;
}

export interface AISettingsPreset {
  id: string;
  name: string;
  description?: string;
  settings: AISettings;
}

export interface AISettingsPanelProps {
  settings?: AISettings;
  presets?: AISettingsPreset[];
  onSettingsChange?: (settings: AISettings) => void;
  onSave?: (settings: AISettings) => Promise<void>;
  onReset?: () => void;
  onLoadPreset?: (presetId: string) => void;
  onSavePreset?: (name: string, settings: AISettings) => Promise<void>;
  onDeletePreset?: (presetId: string) => Promise<void>;
  className?: string;
  showAdvanced?: boolean;
  availableModels?: string[];
}

const defaultSettings: AISettings = {
  temperature: 0.7,
  maxTokens: 2000,
  topP: 1.0,
  topK: 40,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
  systemPrompt: "",
  model: "gpt-4",
};

export default function AISettingsPanel({
  settings = defaultSettings,
  presets = [],
  onSettingsChange,
  onSave,
  onReset,
  onLoadPreset,
  onSavePreset,
  onDeletePreset,
  className,
  showAdvanced = false,
  availableModels = [
    "gpt-4",
    "gpt-3.5-turbo",
    "claude-3-opus",
    "claude-3-sonnet",
  ],
}: AISettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState<AISettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] =
    useState(showAdvanced);

  const updateSetting = <K extends keyof AISettings>(
    key: K,
    value: AISettings[K]
  ) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const handleSave = async () => {
    if (!onSave) return;

    setIsSaving(true);
    try {
      await onSave(localSettings);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setLocalSettings(defaultSettings);
    onReset?.();
    onSettingsChange?.(defaultSettings);
  };

  const hasChanges = JSON.stringify(localSettings) !== JSON.stringify(settings);

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">AI Settings</CardTitle>
            <CardDescription className="wrap-break-word">
              Configure AI model parameters and behavior
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:shrink-0 sm:flex-row">
            {onReset && (
              <Button
                className="w-full sm:w-auto"
                onClick={handleReset}
                type="button"
                variant="outline"
              >
                <RotateCcw className="size-4" />
                <span className="whitespace-nowrap">Reset</span>
              </Button>
            )}
            {onSave && (
              <Button
                aria-busy={isSaving}
                className="w-full sm:w-auto"
                data-loading={isSaving}
                disabled={!hasChanges}
                onClick={handleSave}
                type="button"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span className="whitespace-nowrap">Save</span>
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    <span className="whitespace-nowrap">Save</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {presets.length > 0 && onLoadPreset && (
            <div className="flex flex-col gap-2">
              <FieldLabel>Presets</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset, index) => (
                  <Badge
                    className="w-fit cursor-pointer gap-2 px-0.5 pl-3.5"
                    key={index}
                    onClick={() => onLoadPreset(preset.id)}
                    variant="outline"
                  >
                    <span>{preset.name}</span>
                    {onDeletePreset && (
                      <Button
                        aria-label={`Delete preset ${preset.name}`}
                        className="rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePreset(preset.id);
                        }}
                        size="icon-sm"
                        type="button"
                      >
                        <Trash2 className="shrin size-2" />
                      </Button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {presets.length > 0 && <Separator />}

          <div className="flex flex-col gap-4">
            {availableModels.length > 0 && (
              <Field>
                <FieldLabel htmlFor="model">Model</FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value) => updateSetting("model", value)}
                    value={localSettings.model || availableModels[0]}
                  >
                    <SelectTrigger id="model">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>
            )}

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="temperature">
                  Temperature: {localSettings.temperature?.toFixed(1) || "0.7"}
                </FieldLabel>
                <Badge className="text-xs" variant="secondary">
                  {localSettings.temperature === 0
                    ? "Deterministic"
                    : localSettings.temperature &&
                        localSettings.temperature < 0.5
                      ? "Focused"
                      : localSettings.temperature &&
                          localSettings.temperature < 1.0
                        ? "Balanced"
                        : "Creative"}
                </Badge>
              </div>
              <FieldContent>
                <Slider
                  id="temperature"
                  max={2}
                  min={0}
                  onValueChange={(value) =>
                    updateSetting("temperature", value[0])
                  }
                  step={0.1}
                  value={[localSettings.temperature || 0.7]}
                />
                <FieldDescription>
                  Controls randomness. Lower values make responses more focused
                  and deterministic.
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="max-tokens">Max Tokens</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="max-tokens"
                    max={32_000}
                    min={1}
                    onChange={(e) =>
                      updateSetting(
                        "maxTokens",
                        Number.parseInt(e.target.value) || 2000
                      )
                    }
                    type="number"
                    value={localSettings.maxTokens || 2000}
                  />
                </InputGroup>
                <FieldDescription>
                  Maximum number of tokens in the response
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="system-prompt">System Prompt</FieldLabel>
              <FieldContent>
                <Textarea
                  id="system-prompt"
                  onChange={(e) =>
                    updateSetting("systemPrompt", e.target.value)
                  }
                  placeholder="Enter system prompt to guide AI behavior..."
                  rows={4}
                  value={localSettings.systemPrompt || ""}
                />
                <FieldDescription>
                  Instructions that guide the AI&apos;s behavior and responses
                </FieldDescription>
              </FieldContent>
            </Field>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <Button
              className="w-full sm:w-auto"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              type="button"
              variant="ghost"
            >
              <Settings className="size-4" />
              {showAdvancedSettings ? "Hide" : "Show"} Advanced Settings
            </Button>

            {showAdvancedSettings && (
              <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4">
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="top-p">
                      Top P: {localSettings.topP?.toFixed(2) || "1.00"}
                    </FieldLabel>
                  </div>
                  <FieldContent>
                    <Slider
                      id="top-p"
                      max={1}
                      min={0}
                      onValueChange={(value) => updateSetting("topP", value[0])}
                      step={0.01}
                      value={[localSettings.topP || 1.0]}
                    />
                    <FieldDescription>
                      Nucleus sampling: considers tokens with top-p probability
                      mass
                    </FieldDescription>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="top-k">
                    Top K: {localSettings.topK || "40"}
                  </FieldLabel>
                  <FieldContent>
                    <Slider
                      id="top-k"
                      max={100}
                      min={1}
                      onValueChange={(value) => updateSetting("topK", value[0])}
                      step={1}
                      value={[localSettings.topK || 40]}
                    />
                    <FieldDescription>
                      Limits sampling to top K most likely tokens
                    </FieldDescription>
                  </FieldContent>
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="frequency-penalty">
                      Frequency Penalty:{" "}
                      {localSettings.frequencyPenalty?.toFixed(1) || "0.0"}
                    </FieldLabel>
                  </div>
                  <FieldContent>
                    <Slider
                      id="frequency-penalty"
                      max={2}
                      min={-2}
                      onValueChange={(value) =>
                        updateSetting("frequencyPenalty", value[0])
                      }
                      step={0.1}
                      value={[localSettings.frequencyPenalty || 0.0]}
                    />
                    <FieldDescription>
                      Reduces likelihood of repeating tokens (positive) or
                      increases it (negative)
                    </FieldDescription>
                  </FieldContent>
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="presence-penalty">
                      Presence Penalty:{" "}
                      {localSettings.presencePenalty?.toFixed(1) || "0.0"}
                    </FieldLabel>
                  </div>
                  <FieldContent>
                    <Slider
                      id="presence-penalty"
                      max={2}
                      min={-2}
                      onValueChange={(value) =>
                        updateSetting("presencePenalty", value[0])
                      }
                      step={0.1}
                      value={[localSettings.presencePenalty || 0.0]}
                    />
                    <FieldDescription>
                      Reduces likelihood of talking about new topics (positive)
                      or increases it (negative)
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
