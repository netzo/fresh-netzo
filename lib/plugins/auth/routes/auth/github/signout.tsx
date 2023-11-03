import type { Handlers } from "$fresh/server.ts";
import type { NetzoState } from "netzo/config/mod.ts";
import { deleteUserBySession } from "../../../utils/db.ts";
import { signOut } from "deno_kv_oauth/mod.ts";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, NetzoState> = {
  async GET(req, ctx) {
    if (ctx.state.auth.sessionId) {
      await deleteUserBySession(ctx.state.auth.sessionId);
    }

    return await signOut(req);
  },
};
