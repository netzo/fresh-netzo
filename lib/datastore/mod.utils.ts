import mingo from "npm:mingo@6.4.13";
import { monotonicFactory } from "../deps/ulid.ts";

export const ulid = monotonicFactory();

/**
 * Query an array of objects in-memory using MongoDB-like queries.
 *
 * @example basic querying
 * GET /datastore/accounts?contactIds=01HS1HVHBT0XKD8X6BYJ956NR6
 * @example advanced querying ($in, $nin, $exists, $regex, $gt, $lt, $gte, $lte)
 * GET /datastore/accounts?contactIds.$in=["01HS1HVHBT0XKD8X6BYJ956NR6"]
 * @example sorting (ascending)
 * GET /datastore/accounts?$sort.name=1
 * @example sorting (descending)
 * GET /datastore/accounts?$sort.name=-1
 *
 * @param {Array} data - The array of objects to query.
 * @param {Object} flatQuery - The query object with flat keys.
 * @returns {Array} The resulting array of objects that match the query.
 */
export function queryData<T = unknown>(
  data: T[],
  query: Record<string, any> = {},
) {
  if (!Object.keys(query).length) return data;

  // separate pipeline operators ($skip, $limit, $sort) from query operators
  const { $skip, $limit, $sort = {}, ...criteria } = query;

  // parse pipeline operators accordingly and apply them to the cursor
  const cursor = mingo.find(data, criteria)
    .sort(Object.fromEntries(
      Object.entries($sort).map(([key, value]) => [
        key,
        Number(value),
      ]),
    )) // e.g. ?$sort.name=1 (ascending) or ?$sort.name=-1 (descending)
    .skip(Number($skip)) // e.g. ?$skip=10
    .limit(Number($limit)); // e.g. ?$limit=10

  return cursor.all();
}
