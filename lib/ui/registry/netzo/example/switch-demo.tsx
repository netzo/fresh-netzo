import { Label } from "netzo/ui/registry/netzo/ui/label.tsx";
import { Switch } from "netzo/ui/registry/netzo/ui/switch.tsx";

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
