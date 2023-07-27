import { effect, signal } from "../deps.ts";

export const useSearch = <T>(items: T[] = [], keys: string[]) => {
  if (!keys) keys = Object.keys(items[0] as object);

  const search = signal("");
  const filteredItems = signal<T[]>(items);
  effect(() => {
    if (!search.value) return;
    const query = search.value.toLowerCase();
    // iterate over each item, and over each key of each item
    // and test if the value of the key includes the query
    filteredItems.value = items.filter((item) =>
      keys.some((key) => {
        const value = get(item, key);
        return value && value.toString().toLowerCase().includes(query);
      })
    );
  });

  return { search, filteredItems };
};

function get(data, path, defaultValue) {
  const value = path
    .split(/[.[\]]/)
    .filter(Boolean)
    .reduce(
      (
        value,
        key,
      ) => (value != null && value[key] !== undefined ? value[key] : undefined),
      data,
    );

  return value !== undefined ? value : defaultValue;
}
