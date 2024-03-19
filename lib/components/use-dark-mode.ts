import { IS_BROWSER } from "$fresh/runtime.ts";
import { effect, signal } from "@preact/signals";

export const darkMode = signal<boolean>(getDarkMode());

export function useDarkMode(value?: boolean) {
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
