import { z } from "../../deps/zod/mod.ts";
import { jsonSchemaToZod } from "../../deps/json-schema-to-zod.ts";

/**
 * Creates a Zod schema from a JSON schema (string or object).
 *
 * @example const accountJsonSchema = {
 * type": "object",
 *   "properties": {
 *     "id": { "type": "string" },
 *     "name": { "type": "string" },
 *   },
 *   "required": ["id", "name"]
 * }
 * export const accountSchemaString = jsonSchemaToZod(accountJsonSchema);
 * export const accountSchema = createZodSchema(accountSchemaString);
 * export type Account = z.infer<typeof accountSchema>;
 *
 * @param schema {string | object} - The JSON schema to convert to a Zod schema.
 * @returns A Zod schema.
 */
export const createZod = (schema: string | object) => {
  const string = typeof schema === "string" ? schema : jsonSchemaToZod(schema);
  return (new Function("z", `return ${string};`))(z);
};

/**
 * Creates a Zod schema from a Netzo collection.
 *
 * @example const accountSchema = createZodForCollection(["accounts"]);
 * export type Account = z.infer<typeof accountSchema>;
 *
 * @param collectionPrefix {string[]} - The prefix of the collection to create a Zod schema for.
 * @returns A Zod schema.
 */
export const createZodForCollection = async (collectionPrefix: string[]) => {
  const prefix = ["$collections", ...collectionPrefix];
  const entry = await kv.get(["$collections", ...prefix]);
  if (!entry.value) {
    throw new Error(`Collection "${JSON.stringify(prefix)}" not found.`);
  }
  return createZod(entry.value.schema);
};
