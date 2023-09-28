import type { Plugin } from "$fresh/server.ts";
import { createHandler } from "./adapters/fresh.ts";

export type OauthOptions = {
  visibility: "private";
} | {
  visibility: "protected";
  tokens: string[];
} | {
  visibility: "public";
};

export const oauth = (options: OauthOptions): Plugin => {
  return {
    name: "oauth",
    middlewares: [
      { path: "/", middleware: { handler: createHandler(options) } },
    ],
  };
};
