import type { Plugin } from "$fresh/server.ts";
import { createHandler } from "./adapters/fresh.ts";

export type NetzoAuthOptions = {
  visibility: "private";
} | {
  visibility: "protected";
  tokens: string[];
} | {
  visibility: "public";
};

export const netzoAuth = (options: NetzoAuthOptions): Plugin => {
  return {
    name: "netzoAuth",
    middlewares: [
      { path: "/", middleware: { handler: createHandler(options) } },
    ],
  };
};
