// deno-lint-ignore-file no-explicit-any
import _get from "https://esm.sh/lodash.get@4.4.2";

export function filterObjectsByKeyValues<T = Record<string, any>>(
  data: T[],
  filters: Record<string, any>,
) {
  let filteredData = data;

  if (Object.keys(filters).length > 0) {
    for (const key in filters) {
      if (filters[key]) {
        const value = filters[key];

        if (key.includes(".")) {
          filteredData = filteredData.filter((item) =>
            _get(item, key, "").toLowerCase().includes(value.toLowerCase())
          );
        } else {
          filteredData = filteredData.filter((item) =>
            _get(item, key, "").toLowerCase().includes(value.toLowerCase())
          );
        }
      }
    }
  }

  return filteredData;
}
