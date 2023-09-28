import { Label } from "netzo/components/ui/label.tsx";
import { Switch } from "netzo/components/ui/switch.tsx";

export default () => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
};
