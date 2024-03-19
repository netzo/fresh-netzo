import { _get } from "../../deps/lodash.get.ts";
import { monotonicFactory } from "../../deps/ulid.ts";

export const ulid = monotonicFactory();

export function filterObjectsByKeyValues<T = unknown>(
  data: T[],
  filters: Record<string, any> = {},
) {
  // filter item out if any of the filters fail, otherwise keep it
  return !Object.keys(filters).length ? data : data.filter((item) => {
    return !Object.entries(filters).some(([key, value]) => {
      const itemValue = _get(item, key, "").toString();
      return itemValue?.toLowerCase() !== value?.toLowerCase(); // case insensitive
    });
  });
}
