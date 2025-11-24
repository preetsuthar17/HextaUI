import { Label } from "@/registry/new-york/ui/label";
import { Switch } from "@/registry/new-york/ui/switch";

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
