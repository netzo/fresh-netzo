import { type ZodSchema } from "zod/mod.ts";
import { generateRoutes } from "./fresh.ts";
import type { NetzoModule } from "../../config.ts";

export interface DatabaseServiceOptions extends NetzoModule {
  name: string; // automatically converted to kebab-case
  idField?: string;
  methods?: Array<"find" | "get" | "create" | "update" | "patch" | "delete">;
  schema: ZodSchema;
}

export interface DatabaseOptions extends NetzoModule {
  prefix: string;
  idField?: DatabaseServiceOptions["idField"];
  methods?: DatabaseServiceOptions["methods"];
  services: DatabaseServiceOptions[];
}

export default (options: DatabaseOptions): NetzoModule => {
  options.prefix ??= "db";
  return {
    name: "database",
    routes: generateRoutes(options),
  };
};
