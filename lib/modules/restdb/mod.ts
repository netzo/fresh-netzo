import { type ZodSchema } from "zod/mod.ts";
import { generateRoutes } from "./fresh.ts";
import type { NetzoModule } from "../../config.ts";

export interface RestdbServiceOptions extends NetzoModule {
  name: string; // automatically converted to kebab-case
  idField?: string;
  methods?: Array<"find" | "get" | "create" | "update" | "patch" | "delete">;
  schema: ZodSchema;
}

export interface RestdbOptions extends NetzoModule {
  prefix: string;
  idField?: RestdbServiceOptions["idField"];
  methods?: RestdbServiceOptions["methods"];
  services: RestdbServiceOptions[];
}

export default (options: RestdbOptions): NetzoModule => {
  options.prefix ??= "db";
  return {
    name: "restdb",
    routes: generateRoutes(options),
  };
};
