import { monotonicFactory } from "../../deps/ulid.ts";
import { _get } from "../../deps/lodash.get.ts";
// import { z } from "../deps/zod/mod.ts";
// import { jsonSchemaToZod } from "../deps/json-schema-to-zod.ts";

export const ERRORS = {
  missingProperty: (name: string) => `Missing "${name}" property in options.`,
  invalidProperty: (name: string) => `Invalid "${name}" property in options.`,
};

// ulid:

export const ulid = monotonicFactory();

export const isUlid = (str: string) => {
  // from https://regex101.com/library/ik6xZx
  const ULID = /[0-7][0-9A-HJKMNP-TV-Z]{25}/gm;
  return ULID.test(str);
};

// services:

export type Methods = typeof METHODS[number];

export const METHODS = [
  "find",
  "get",
  "create",
  "update",
  "patch",
  "remove",
] as const;

export const RESPONSES = {
  missingApiKey: () => new Response("Missing API key", { status: 401 }),
  invalidApiKey: () => new Response("Invalid API key", { status: 401 }),
  notAllowed: () => new Response("Method not allowed", { status: 405 }),
  invalidRequest: () => new Response("Invalid request", { status: 400 }),
};

export function parseSearchParams(
  searchParams: URLSearchParams,
): { query: Record<string, string>; params: Record<string, string> } {
  return Object.entries(Object.fromEntries(searchParams)).reduce(
    (acc, [key, value]) => (
      key.startsWith("$")
        ? { ...acc, params: { ...acc.params, [key]: value } }
        : { ...acc, query: { ...acc.query, [key]: value } }
    ),
    { query: {}, params: {} },
  );
}

export async function parseRequestBody(req: Request) {
  const contentType = req.headers.get("content-type"); // case insensitive
  if (contentType?.includes("application/json")) {
    return req.json();
  } else if (
    contentType?.includes("application/x-www-form-urlencoded") ||
    contentType?.includes("multipart/form-data")
  ) {
    const formData = await req.formData();
    return Object.fromEntries([...formData.entries()]);
  } else if (contentType?.includes("text/plain")) {
    return JSON.parse(await req.text());
  } else {
    try {
      return req.json();
    } catch (_jsonError) {
      try {
        return Object.fromEntries((await req.formData()).entries());
      } catch (_formDataError) {
        try {
          return Object.fromEntries(req.searchParams);
        } catch (_formDataError) {
          return JSON.parse(await req.text());
        }
      }
    }
  }
}

export function filterObjectsByKeyValues<T = any>(
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

// zod:

// /**
//  * Creates a Zod schema from a JSON schema (string or object).
//  *
//  * @example const accountJsonSchema = {
//  * type": "object",
//  *   "properties": {
//  *     "id": { "type": "string" },
//  *     "name": { "type": "string" },
//  *   },
//  *   "required": ["id", "name"]
//  * }
//  * export const accountSchemaString = jsonSchemaToZod(accountJsonSchema);
//  * export const accountSchema = createZodSchema(accountSchemaString);
//  * export type Account = z.infer<typeof accountSchema>;
//  *
//  * @param schema {string | object} - The JSON schema to convert to a Zod schema.
//  * @returns A Zod schema.
//  */
// export const createZod = (schema: string | object) => {
//   const string = typeof schema === "string" ? schema : jsonSchemaToZod(schema);
//   return (new Function("z", `return ${string};`))(z);
// };

// /**
//  * Creates a Zod schema from a Netzo collection.
//  *
//  * @example const accountSchema = createZodForCollection(["accounts"]);
//  * export type Account = z.infer<typeof accountSchema>;
//  *
//  * @param collectionPrefix {string[]} - The prefix of the collection to create a Zod schema for.
//  * @returns A Zod schema.
//  */
// export const createZodForCollection = async (collectionPrefix: string[]) => {
//   const kv = await Deno.openKv();
//   const prefix = ["$collections", ...collectionPrefix];
//   const entry = await kv.get(["$collections", ...prefix]);
//   if (!entry.value) {
//     throw new Error(`Collection "${JSON.stringify(prefix)}" not found.`);
//   }
//   return createZod(entry.value.schema);
// };
