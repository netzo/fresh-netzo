// deno-lint-ignore-file no-explicit-any

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
          const [parentKey, nestedKey] = key.split(".");
          filteredData = filteredData.filter((item) =>
            item[parentKey][nestedKey].toLowerCase().includes(
              value.toLowerCase(),
            )
          );
        } else {
          filteredData = filteredData.filter((item) =>
            item[key].toLowerCase().includes(value.toLowerCase())
          );
        }
      }
    }
  }

  return filteredData;
}
