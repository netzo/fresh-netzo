import { type ZodSchema } from "zod/mod.ts";
import { generateRoutes } from "./adapters/fresh.ts";
import type { Plugin } from "$fresh/server.ts";

export interface NetzoDBServiceOptions {
  name: string; // automatically converted to kebab-case
  idField?: string;
  methods?: Array<"find" | "get" | "create" | "update" | "patch" | "delete">;
  schema: ZodSchema;
}

export interface NetzoDBOptions extends NetzoDBServiceOptions {
  prefix: string;
  services: NetzoDBServiceOptions[];
}

export const netzoDB = (options: NetzoDBOptions): Plugin => {
  options.prefix ??= "db";
  return {
    name: "netzoDB",
    routes: generateRoutes(options),
  };
};
