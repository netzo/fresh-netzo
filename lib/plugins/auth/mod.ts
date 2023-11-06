import type { Plugin } from "$fresh/server.ts";
import type { OAuth2ClientConfig } from "deno_kv_oauth/mod.ts";
import { deepMerge } from "std/collections/deep_merge.ts";
import { type User } from "netzo/plugins/auth/utils/db.ts";
import { kvOAuth } from "./plugins/kv-oauth.ts";
import { session } from "./plugins/session.ts";
import { errorHandling } from "./plugins/error-handling.ts";

export * from "deno_kv_oauth/mod.ts";

const kv = await Deno.openKv();

export type AuthOptions = {
  email: {}; // TODO: EmailClientConfig;
  oauth2: OAuth2ClientConfig;
  title?: string;
  description?: string;
  color?: string;
  backgroundColor?: string;
  logo?: string;
  caption?: {
    text: string;
    url: string;
  };
};

export type AuthState = {
  sessionId?: string;
  sessionUser?: User;
  options: AuthOptions;
};

/**
 * A fresh plugin that registers middleware and handlers to
 * handle Authentication with multiple OAuth2 providers and
 * a configurable sign-in page.
 *
 * - `GET /auth` for the authentication page
 * - `GET /oauth/signin` for the sign-in page
 * - `GET /oauth/callback` for the callback page
 * - `GET /oauth/signout` for the sign-out page
 */
export const auth = (options: AuthOptions): Plugin[] => {
  return [
    {
      name: "auth",
      middlewares: [
        {
          path: "/",
          middleware: {
            handler: async (_req, ctx) => {
              const { value: config } = await kv.get(["auth", "config"]);
              options = config ? deepMerge(options, config) : options;
              ctx.state.auth = { options };
              return await ctx.next();
            },
          },
        },
      ],
    } as Plugin,
    kvOAuth(options),
    session(),
    errorHandling(),
  ];
};
