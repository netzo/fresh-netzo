import { signal } from "../../deps/@preact/signals.ts";
import { Switch } from "../ui/switch.tsx";
import { Label } from "../ui/label.tsx";
import { type Theme, useTheme } from "../../hooks/theme.ts";

export default () => {
  const { isDark } = useTheme();
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme"
        checked={isDark.value}
        onCheckedChange={() => isDark.value = !isDark.value}
      />
      <Label htmlFor="theme">Dark</Label>
    </div>
  );
};
