import generateFreshHandlers from "./adapters/fresh.ts";
import type { Plugin } from "$fresh/server.ts";

// netzoDB({
//   prefix: 'db',
//   idField: "id",
//   methods: ["find", "get", "create", "update", "patch", "delete"],
//   services: {
//     users: {
//       idField: "_id",
//       methods: ["find", "get"], // allow reading only
//       schema: userSchema
//     },
//     companies: {
//       schema: companySchema
//     },
//     // ...more services
//   },
// }),

export interface NetzoDBServiceOptions {
  idField?: string;
  methods?: Array<"find" | "get" | "create" | "update" | "patch" | "delete">;
  schema: z.Schema
}

export interface NetzoDBOptions extends NetzoDBServiceOptions {
  prefix: string;
  services?: Record<string, NetzoDBServiceOptions>
}

export const netzoDB = (options: NetzoDBOptions): Plugin => {
  return {
    name: "netzoDB",
    routes: [{
      path: options.prefix,
      handler: generateFreshHandlers({ prefix: options.prefix }),
    }],
  };
};

