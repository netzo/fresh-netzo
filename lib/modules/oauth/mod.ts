import type { NetzoModule } from "../../config.ts";
import { createHandler } from "./fresh.ts";

export interface OauthOptions extends NetzoModule {
  visibility: "private" | "protected" | "public";
  tokens: string[]; // only for "protected" visibility
}

export default (options: OauthOptions): NetzoModule => {
  return {
    name: "oauth",
    middlewares: [
      { path: "/", middleware: { handler: createHandler(options) } },
    ],
  };
};
