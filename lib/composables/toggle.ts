import { computed, effect, signal } from "../deps/@preact/signals.ts";

const value = signal<boolean>(false);

export function useToggle(init?: boolean) {
  if (init !== undefined) value.value = init;
  return {
    value,
    toggle: () => value.value = !value.value,
  };
}
