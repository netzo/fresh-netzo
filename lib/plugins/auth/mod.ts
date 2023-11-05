import type { Plugin } from "$fresh/server.ts";
import type { OAuth2ClientConfig } from "deno_kv_oauth/mod.ts";
import type { MetaProps } from "netzo/plugins/auth/components/Meta.tsx";
import { type User } from "netzo/plugins/auth/utils/db.ts";
import { kvOAuth } from "./plugins/kv-oauth.ts";
import { session } from "./plugins/session.ts";
import { errorHandling } from "./plugins/error-handling.ts";
import { welcome } from "./plugins/welcome.ts";

export * from "deno_kv_oauth/mod.ts";

export type AuthOptions = {
  // email: EmailClientConfig;
  oauth2: OAuth2ClientConfig;
};

export type AuthState = MetaProps & {
  sessionId?: string;
  sessionUser?: User;
  options: AuthOptions;
  config: {
    branding: {
      color: string;
      logo: string;
    };
  }
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
    welcome(),
    kvOAuth(options),
    session(),
    errorHandling(),
  ];
};
