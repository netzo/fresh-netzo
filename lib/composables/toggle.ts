import { signal } from "../deps/@preact/signals.ts";

export function useToggle(init?: boolean) {
  const value = signal<boolean>(false);

  if (init !== undefined) value.value = init;
  return {
    value,
    toggle: () => value.value = !value.value,
  };
}
