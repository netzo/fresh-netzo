import { computed, effect, signal } from "../deps/@preact/signals.ts";

const open = signal<boolean>(false);

export function useNav() {
  return {
    open,
    toggle: () => open.value = !open.value,
  };
}
