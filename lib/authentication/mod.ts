import type { NetzoModule } from "../../config.ts";
import { createHandler } from "./fresh.ts";
export * from "deno_kv_oauth/mod.ts";

export interface AuthenticationOptions extends NetzoModule {
  visibility: "private" | "protected" | "public";
  tokens: string[]; // only for "protected" visibility
}

export default (options: AuthenticationOptions): NetzoModule => {
  return {
    name: "auth",
    middlewares: [
      { path: "/", middleware: { handler: createHandler(options) } },
    ],
  };
};
