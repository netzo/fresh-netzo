import { createHttpError } from "../../../../../deps/std/http/http_errors.ts";
import { createOktaOAuthConfig } from "../../../../../deps/deno_kv_oauth/mod.ts";
import type { AuthUserFromProvider } from "../db.ts";

export { createOktaOAuthConfig };

export function isOktaSetup(
  options: Parameters<typeof createOktaOAuthConfig>[0],
) {
  try {
    createOktaOAuthConfig(options);
    return true;
  } catch {
    return false;
  }
}

export type UserOkta = {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
};

export async function getUserOkta(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const response = await fetch("https://api.okta.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw createHttpError(response.status, message);
  }
  const userOkta: UserOkta = await response.json();
  return {
    provider: "okta",
    authId: userOkta.sub,
    name: userOkta.name,
    email: userOkta.email,
    avatar: userOkta.picture,
  };
}
