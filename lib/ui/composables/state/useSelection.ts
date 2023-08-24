import { computed, signal } from "../deps.ts";

export const useSelection = <T>(items: T[] = []) => {
  const selected = signal<T[]>([]);
  const selectedAll = signal(false);
  const selectedCount = computed(() => selected.value.length);
  const selectedAllCount = computed(() => {
    const count = items.length;
    return selectedCount.value === count ? count : 0;
  });

  return { selected, selectedAll, selectedCount, selectedAllCount };
};
