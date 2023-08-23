import { Switch } from "netzo/ui/components/ui/switch.tsx";
import { Label } from "netzo/ui/components/ui/label.tsx";
import { useTheme } from "netzo/composables/browser/useTheme.ts";

export default function SwitchThemeDemo() {
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
}
