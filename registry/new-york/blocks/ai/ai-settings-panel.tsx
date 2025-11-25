"use client";

import { Loader2, RotateCcw, Save, Settings, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/new-york/ui/alert-dialog";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Separator } from "@/registry/new-york/ui/separator";
import { Slider } from "@/registry/new-york/ui/slider";
import { Textarea } from "@/registry/new-york/ui/textarea";

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

function getTemperatureLabel(temperature: number): string {
  if (temperature === 0) return "Deterministic";
  if (temperature < 0.5) return "Focused";
  if (temperature < 1.0) return "Balanced";
  return "Creative";
}

interface SettingsHeaderProps {
  hasChanges: boolean;
  isSaving: boolean;
  onReset?: () => void;
  onSave?: () => void;
}

function SettingsHeader({
  hasChanges,
  isSaving,
  onReset,
  onSave,
}: SettingsHeaderProps) {
  return (
    <CardHeader>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <CardTitle className="wrap-break-word">AI Settings</CardTitle>
          <CardDescription className="wrap-break-word">
            Configure AI model parameters and behavior
          </CardDescription>
        </div>
        <div className="flex flex-col gap-2 sm:shrink-0 sm:flex-row">
          {onReset && (
            <Button
              aria-label="Reset settings to defaults"
              className="min-h-[44px] w-full min-w-[44px] sm:min-h-[32px] sm:w-auto sm:min-w-[32px]"
              onClick={onReset}
              type="button"
              variant="outline"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              <span className="whitespace-nowrap">Reset</span>
            </Button>
          )}
          {onSave && (
            <Button
              aria-busy={isSaving}
              aria-label={isSaving ? "Saving settings" : "Save settings"}
              className="min-h-[44px] w-full min-w-[44px] sm:min-h-[32px] sm:w-auto sm:min-w-[32px]"
              data-loading={isSaving}
              disabled={!hasChanges || isSaving}
              onClick={onSave}
              type="button"
            >
              {isSaving ? (
                <>
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                  <span className="whitespace-nowrap">Saving…</span>
                </>
              ) : (
                <>
                  <Save aria-hidden="true" className="size-4" />
                  <span className="whitespace-nowrap">Save</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
  );
}

interface PresetItemProps {
  preset: AISettingsPreset;
  onLoad: (presetId: string) => void;
  onDelete?: (presetId: string) => Promise<void>;
  isFocused: boolean;
  presetRef: (node: HTMLButtonElement | null) => void;
}

function PresetItem({
  preset,
  onLoad,
  onDelete,
  isFocused,
  presetRef,
}: PresetItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!onDelete) return;
      setShowDeleteDialog(true);
    },
    [onDelete]
  );

  const confirmDelete = useCallback(async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(preset.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete preset:", error);
    } finally {
      setIsDeleting(false);
    }
  }, [onDelete, preset.id]);

  return (
    <div role="listitem">
      <Badge
        aria-label={`Load preset ${preset.name}`}
        className={cn(
          "min-h-[44px] w-fit min-w-[44px] cursor-pointer gap-2 px-0.5 pl-3.5 sm:min-h-[32px] sm:min-w-[32px]",
          isFocused && "ring-2 ring-ring ring-offset-2"
        )}
        onClick={() => onLoad(preset.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onLoad(preset.id);
          }
        }}
        ref={presetRef}
        role="button"
        tabIndex={0}
        variant="outline"
      >
        <span>{preset.name}</span>
        {onDelete && (
          <Button
            aria-label={`Delete preset ${preset.name}`}
            className="min-h-[44px] min-w-[44px] rounded-full sm:min-h-[32px] sm:min-w-[32px]"
            onClick={handleDelete}
            size="icon-sm"
            type="button"
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </Button>
        )}
      </Badge>
      <AlertDialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete preset?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{preset.name}&quot;? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20"
              disabled={isDeleting}
              onClick={confirmDelete}
            >
              {isDeleting ? (
                <>
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface PresetSelectorProps {
  presets: AISettingsPreset[];
  onLoadPreset: (presetId: string) => void;
  onDeletePreset?: (presetId: string) => Promise<void>;
}

function PresetSelector({
  presets,
  onLoadPreset,
  onDeletePreset,
}: PresetSelectorProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const presetRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setPresetRef = useCallback(
    (index: number) => (node: HTMLButtonElement | null) => {
      presetRefs.current[index] = node;
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLButtonElement
      ) {
        return;
      }

      if (presets.length === 0) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const nextIndex =
            focusedIndex === null
              ? 0
              : focusedIndex < presets.length - 1
                ? focusedIndex + 1
                : 0;
          setFocusedIndex(nextIndex);
          presetRefs.current[nextIndex]?.focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prevIndex =
            focusedIndex === null
              ? presets.length - 1
              : focusedIndex > 0
                ? focusedIndex - 1
                : presets.length - 1;
          setFocusedIndex(prevIndex);
          presetRefs.current[prevIndex]?.focus();
          break;
        }
        case "Home": {
          e.preventDefault();
          setFocusedIndex(0);
          presetRefs.current[0]?.focus();
          break;
        }
        case "End": {
          e.preventDefault();
          const lastIndex = presets.length - 1;
          setFocusedIndex(lastIndex);
          presetRefs.current[lastIndex]?.focus();
          break;
        }
        case "Escape": {
          if (focusedIndex !== null) {
            e.preventDefault();
            setFocusedIndex(null);
            presetRefs.current[focusedIndex]?.blur();
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presets.length, focusedIndex]);

  if (presets.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel id="presets-label">Presets</FieldLabel>
      <div
        aria-labelledby="presets-label"
        className="flex flex-wrap gap-2"
        role="list"
      >
        {presets.map((preset, index) => (
          <PresetItem
            isFocused={focusedIndex === index}
            key={index}
            onDelete={onDeletePreset}
            onLoad={onLoadPreset}
            preset={preset}
            presetRef={setPresetRef(index)}
          />
        ))}
      </div>
    </div>
  );
}

interface TemperatureFieldProps {
  value: number;
  onChange: (value: number) => void;
}

function TemperatureField({ value, onChange }: TemperatureFieldProps) {
  const label = useMemo(() => getTemperatureLabel(value), [value]);

  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="temperature">
          Temperature: {value.toFixed(1)}
        </FieldLabel>
        <Badge
          aria-label={`Temperature mode: ${label}`}
          className="text-xs"
          variant="secondary"
        >
          {label}
        </Badge>
      </div>
      <FieldContent>
        <Slider
          aria-label="Temperature"
          id="temperature"
          max={2}
          min={0}
          onValueChange={(values) => onChange(values[0])}
          step={0.1}
          value={[value]}
        />
        <FieldDescription>
          Controls randomness. Lower values make responses more focused and
          deterministic.
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}

interface MaxTokensFieldProps {
  value: number;
  onChange: (value: number) => void;
}

function MaxTokensField({ value, onChange }: MaxTokensFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="max-tokens">Max Tokens</FieldLabel>
      <FieldContent>
        <InputGroup>
          <InputGroupInput
            aria-label="Maximum tokens"
            id="max-tokens"
            max={32_000}
            min={1}
            onChange={(e) => {
              const numValue = Number.parseInt(e.target.value) || 2000;
              onChange(numValue);
            }}
            type="number"
            value={value}
          />
        </InputGroup>
        <FieldDescription>
          Maximum number of tokens in the response
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}

interface SystemPromptFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function SystemPromptField({ value, onChange }: SystemPromptFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="system-prompt">System Prompt</FieldLabel>
      <FieldContent>
        <Textarea
          aria-label="System prompt"
          id="system-prompt"
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter system prompt to guide AI behavior…"
          rows={4}
          value={value}
        />
        <FieldDescription>
          Instructions that guide the AI&apos;s behavior and responses
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}

interface ModelSelectFieldProps {
  value: string;
  availableModels: string[];
  onChange: (value: string) => void;
}

function ModelSelectField({
  value,
  availableModels,
  onChange,
}: ModelSelectFieldProps) {
  if (availableModels.length === 0) {
    return null;
  }

  return (
    <Field>
      <FieldLabel htmlFor="model">Model</FieldLabel>
      <FieldContent>
        <div className="[&_button]:min-h-[44px] [&_button]:sm:min-h-[32px]">
          <Select
            onValueChange={onChange}
            value={value || availableModels[0] || ""}
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
        </div>
      </FieldContent>
    </Field>
  );
}

interface AdvancedSettingsSectionProps {
  settings: AISettings;
  onSettingChange: <K extends keyof AISettings>(
    key: K,
    value: AISettings[K]
  ) => void;
}

function AdvancedSettingsSection({
  settings,
  onSettingChange,
}: AdvancedSettingsSectionProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4">
      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="top-p">
            Top P: {settings.topP?.toFixed(2) || "1.00"}
          </FieldLabel>
        </div>
        <FieldContent>
          <Slider
            aria-label="Top P"
            id="top-p"
            max={1}
            min={0}
            onValueChange={(values) => onSettingChange("topP", values[0])}
            step={0.01}
            value={[settings.topP || 1.0]}
          />
          <FieldDescription>
            Nucleus sampling: considers tokens with top-p probability mass
          </FieldDescription>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="top-k">Top K: {settings.topK || "40"}</FieldLabel>
        <FieldContent>
          <Slider
            aria-label="Top K"
            id="top-k"
            max={100}
            min={1}
            onValueChange={(values) => onSettingChange("topK", values[0])}
            step={1}
            value={[settings.topK || 40]}
          />
          <FieldDescription>
            Limits sampling to top K most likely tokens
          </FieldDescription>
        </FieldContent>
      </Field>

      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="frequency-penalty">
            Frequency Penalty: {settings.frequencyPenalty?.toFixed(1) || "0.0"}
          </FieldLabel>
        </div>
        <FieldContent>
          <Slider
            aria-label="Frequency penalty"
            id="frequency-penalty"
            max={2}
            min={-2}
            onValueChange={(values) =>
              onSettingChange("frequencyPenalty", values[0])
            }
            step={0.1}
            value={[settings.frequencyPenalty || 0.0]}
          />
          <FieldDescription>
            Reduces likelihood of repeating tokens (positive) or increases it
            (negative)
          </FieldDescription>
        </FieldContent>
      </Field>

      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="presence-penalty">
            Presence Penalty: {settings.presencePenalty?.toFixed(1) || "0.0"}
          </FieldLabel>
        </div>
        <FieldContent>
          <Slider
            aria-label="Presence penalty"
            id="presence-penalty"
            max={2}
            min={-2}
            onValueChange={(values) =>
              onSettingChange("presencePenalty", values[0])
            }
            step={0.1}
            value={[settings.presencePenalty || 0.0]}
          />
          <FieldDescription>
            Reduces likelihood of talking about new topics (positive) or
            increases it (negative)
          </FieldDescription>
        </FieldContent>
      </Field>
    </div>
  );
}

interface AdvancedSettingsToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

function AdvancedSettingsToggle({
  isOpen,
  onToggle,
}: AdvancedSettingsToggleProps) {
  return (
    <Button
      aria-expanded={isOpen}
      aria-label={isOpen ? "Hide advanced settings" : "Show advanced settings"}
      className="min-h-[44px] w-full min-w-[44px] sm:min-h-[32px] sm:w-auto sm:min-w-[32px]"
      onClick={onToggle}
      type="button"
      variant="ghost"
    >
      <Settings aria-hidden="true" className="size-4" />
      {isOpen ? "Hide" : "Show"} Advanced Settings
    </Button>
  );
}

export default function AISettingsPanel({
  settings = defaultSettings,
  presets = [],
  onSettingsChange,
  onSave,
  onReset,
  onLoadPreset,
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

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const updateSetting = useCallback(
    <K extends keyof AISettings>(key: K, value: AISettings[K]) => {
      const newSettings = { ...localSettings, [key]: value };
      setLocalSettings(newSettings);
      onSettingsChange?.(newSettings);
    },
    [localSettings, onSettingsChange]
  );

  const handleSave = useCallback(async () => {
    if (!onSave) return;

    setIsSaving(true);
    try {
      await onSave(localSettings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  }, [onSave, localSettings]);

  const handleReset = useCallback(() => {
    setLocalSettings(defaultSettings);
    onReset?.();
    onSettingsChange?.(defaultSettings);
  }, [onReset, onSettingsChange]);

  const toggleAdvancedSettings = useCallback(() => {
    setShowAdvancedSettings((prev) => !prev);
  }, []);

  const hasChanges = useMemo(
    () => JSON.stringify(localSettings) !== JSON.stringify(settings),
    [localSettings, settings]
  );

  const handleLoadPreset = useCallback(
    (presetId: string) => {
      const preset = presets.find((p) => p.id === presetId);
      if (preset) {
        setLocalSettings(preset.settings);
        onLoadPreset?.(presetId);
        onSettingsChange?.(preset.settings);
      }
    },
    [presets, onLoadPreset, onSettingsChange]
  );

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <SettingsHeader
        hasChanges={hasChanges}
        isSaving={isSaving}
        onReset={onReset ? handleReset : undefined}
        onSave={onSave ? handleSave : undefined}
      />
      <CardContent>
        <div className="flex flex-col gap-6">
          {presets.length > 0 && onLoadPreset && (
            <>
              <PresetSelector
                onDeletePreset={onDeletePreset}
                onLoadPreset={handleLoadPreset}
                presets={presets}
              />
              <Separator />
            </>
          )}

          <div className="flex flex-col gap-4">
            <ModelSelectField
              availableModels={availableModels}
              onChange={(value) => updateSetting("model", value)}
              value={localSettings.model ?? availableModels[0] ?? ""}
            />

            <TemperatureField
              onChange={(value) => updateSetting("temperature", value)}
              value={localSettings.temperature || 0.7}
            />

            <MaxTokensField
              onChange={(value) => updateSetting("maxTokens", value)}
              value={localSettings.maxTokens || 2000}
            />

            <SystemPromptField
              onChange={(value) => updateSetting("systemPrompt", value)}
              value={localSettings.systemPrompt || ""}
            />
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <AdvancedSettingsToggle
              isOpen={showAdvancedSettings}
              onToggle={toggleAdvancedSettings}
            />

            {showAdvancedSettings && (
              <AdvancedSettingsSection
                onSettingChange={updateSetting}
                settings={localSettings}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
