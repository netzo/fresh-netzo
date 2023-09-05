// deno-lint-ignore-file no-explicit-any
import _get from "lodash.get";

export function filterObjectsByKeyValues(
  data: Record<string, any>[],
  filters: Record<string, any>,
) {
  let filteredData = data;

  if (Object.keys(filters).length > 0) {
    for (const key in filters) {
      if (filters[key]) {
        const value = filters[key];

        if (key.includes(".")) {
          filteredData = filteredData.filter((item) =>
            _get(item, key, '').toLowerCase().includes(value.toLowerCase())
          );
        } else {
          filteredData = filteredData.filter((item) =>
            _get(item, key, '').toLowerCase().includes(value.toLowerCase())
          );
        }
      }
    }
  }

  return filteredData;
}