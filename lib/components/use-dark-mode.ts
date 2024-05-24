import { effect, signal } from "@preact/signals";
import { IS_BROWSER } from "fresh/runtime.ts";

// NOTE: initializes to false instead of getDarkMode() as default
export const darkMode = signal<boolean>(false);

export function useDarkMode(value = false) {
  setDarkMode(value ?? getDarkMode());

  effect(() => setDarkMode(darkMode.value));

  return darkMode;
}

function getDarkMode(): boolean {
  if (IS_BROWSER) {
    const localStorageTheme = localStorage.getItem("netzo:darkMode");
    const systemSettingDark = globalThis.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    if (localStorageTheme !== null) return localStorageTheme === "true";
    if (systemSettingDark.matches) return true;
  }
  return false;
}

function setDarkMode(value: boolean) {
  if (IS_BROWSER) {
    const html = document.querySelector("html") as HTMLElement;
    if (value === true) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("netzo:darkMode", value ? "true" : "false");
  }
}
