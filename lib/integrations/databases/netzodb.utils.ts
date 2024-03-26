import { deepParseJson } from "npm:deep-parse-json@2.0.0";
import { unflatten } from "npm:flat@6.0.1";
import mingo from "npm:mingo@6.4.13";
import { monotonicFactory } from "../../deps/ulid.ts";

export const ulid = monotonicFactory();

/**
 * Filters an array of objects in-memory using MongoDB-like queries.
 *
 * @example basic querying
 * GET /api/accounts?contactIds=01HS1HVHBT0XKD8X6BYJ956NR6
 * @example advanced querying ($in, $nin, $exists, $regex, $gt, $lt, $gte, $lte)
 * GET /api/accounts?contactIds.$in=["01HS1HVHBT0XKD8X6BYJ956NR6"]
 * @example sorting (ascending)
 * GET /api/accounts?$sort.name=1
 * @example sorting (descending)
 * GET /api/accounts?$sort.name=-1
 *
 * @param {Array} data - The array of objects to filter.
 * @param {Object} flatQuery - The query object with flat keys.
 * @returns {Array} The filtered array of objects.
 */
export function filterObjectsByKeyValues<T = unknown>(
  data: T[],
  flatQuery: Record<string, any> = {},
) {
  if (!Object.keys(flatQuery).length) return data;

  // 1) flatQuery: { "contactIds.$in": '["01HS1HVHBT0XKD8X6BYJ956NR6"]' }
  const nestedQuery = unflatten(flatQuery) as Record<string, unknown>;
  // 2) nestedQuery: { "contactIds.$in": '["01HS1HVHBT0XKD8X6BYJ956NR6"]' }
  const parsedQuery = deepParseJson(nestedQuery) as Record<string, any>;
  // 3) parsedQuery: { contactIds: { "$in": [ "01HS1HVHBT0XKD8X6BYJ956NR6" ] } }

  // 4) separate pipeline operators ($skip, $limit, $sort) from query operators
  // ($sort requires having nested keys so we do this last after parsing query)
  const { $skip, $limit, $sort = {}, ...query } = parsedQuery;
  console.log({ $skip, $limit, $sort, query });

  // parse pipeline operators accordingly and apply them to the cursor
  const cursor = mingo.find(data, query)
    .sort(Object.fromEntries(Object.entries($sort).map(([key, value]) => [
      key,
      Number(value),
    ]))) // e.g. ?$sort.name=1 (ascending) or ?$sort.name=-1 (descending)
    .skip(Number($skip)) // e.g. ?$skip=10
    .limit(Number($limit)); // e.g. ?$limit=10

  return cursor.all();
}
