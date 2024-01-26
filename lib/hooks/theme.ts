import { computed, effect, signal } from "../deps/@preact/signals.ts";
import { IS_BROWSER } from "../deps/$fresh/runtime.ts";

export type Theme = "light" | "dark";

export function useTheme(value?: Theme) {
  const theme = signal<Theme>(getTheme());
  const isLight = computed<boolean>(() => theme.value === "light");
  const isDark = computed<boolean>(() => theme.value === "dark");

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
    if (IS_BROWSER) {
      const html = document.querySelector("html") as HTMLElement;
      if (value === "dark") html.classList.add("dark");
      else html.classList.remove("dark");
      localStorage.setItem("theme", value);
    }
  }

  setTheme(value ?? getTheme());

  effect(() => setTheme(theme.value));

  return { theme, isLight, isDark };
}
