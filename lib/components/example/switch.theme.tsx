import { IS_BROWSER } from "../../deps/$fresh/runtime.ts";
import { effect, signal } from "../../deps/@preact/signals.ts";
import { Switch } from "../ui/switch.tsx";
import { Label } from "../ui/label.tsx";

export type Theme = "light" | "dark";

export function useTheme(value?: Theme) {
  const theme = signal<Theme>(value ?? getTheme());
  const isLight = signal<boolean>(theme.value === "light");
  const isDark = signal<boolean>(theme.value === "dark");

  effect(() => setTheme(theme.value));
  effect(() => setTheme(isLight.value ? "light" : "dark"));
  effect(() => setTheme(isDark.value ? "dark" : "light"));

  setTheme(theme.value);

  function getTheme(): Theme {
    if (IS_BROWSER) {
      const localStorageTheme = localStorage.getItem("theme") as Theme;
      const systemSettingDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      if (localStorageTheme !== null) return localStorageTheme!;
      if (systemSettingDark.matches) return "dark";
    }
    return "light";
  }

  function setTheme(value: Theme) {
    isLight.value = value === "light";
    isDark.value = value === "dark";
    if (IS_BROWSER) {
      const html = document.querySelector("html") as HTMLElement;
      if (value === "dark") html.classList.add("dark");
      else html.classList.remove("dark");
      localStorage.setItem("theme", value);
    }
  }

  return { theme, isLight, isDark };
}

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
