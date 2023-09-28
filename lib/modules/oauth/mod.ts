import type { NetzoModule } from "../../config.ts";
import { createHandler } from "./fresh.ts";

export type OauthOptions = {
  visibility: "private";
} | {
  visibility: "protected";
  tokens: string[];
} | {
  visibility: "public";
} & NetzoModule;

export const oauth = (options: OauthOptions): NetzoModule => {
  return {
    name: "oauth",
    middlewares: [
      { path: "/", middleware: { handler: createHandler(options) } },
    ],
  };
};
