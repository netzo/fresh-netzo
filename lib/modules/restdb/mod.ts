import { type ZodSchema } from "zod/mod.ts";
import { generateRoutes } from "./adapters/fresh.ts";
import type { Plugin } from "$fresh/server.ts";

export interface RestdbServiceOptions {
  name: string; // automatically converted to kebab-case
  idField?: string;
  methods?: Array<"find" | "get" | "create" | "update" | "patch" | "delete">;
  schema: ZodSchema;
}

export interface RestdbOptions {
  prefix: string;
  idField?: RestdbServiceOptions["idField"];
  methods?: RestdbServiceOptions["methods"];
  services: RestdbServiceOptions[];
}

export const restdb = (options: RestdbOptions): Plugin => {
  options.prefix ??= "db";
  return {
    name: "restdb",
    routes: generateRoutes(options),
  };
};
