import type { Handlers } from "$fresh/server.ts";
import type { NetzoState } from "netzo/config/mod.ts";
import {
  redirect,
  setRedirectUrlCookie,
} from "netzo/plugins/auth/utils/redirect.ts";
import { signIn } from "deno_kv_oauth/mod.ts";
import { oauth2Client } from "netzo/plugins/auth/utils/oauth2_client.ts";

// deno-lint-ignore no-explicit-any
export const handler: Handlers<any, NetzoState> = {
  /**
   * Redirects the client to the authenticated redirect path if already login.
   * If not logged in, it continues to rendering the login page.
   */
  async GET(req, ctx) {
    if (ctx.state.auth.sessionId !== undefined) return redirect("/");

    const resp = await signIn(req, oauth2Client);
    setRedirectUrlCookie(req, resp);
    return resp;
  },
};
