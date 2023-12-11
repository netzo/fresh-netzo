import { createHttpError } from "../../../../../deps/std/http/http_errors.ts";
import { createOktaOAuthConfig } from "../../../../../deps/deno_kv_oauth/mod.ts";
import type { PartialUserFromProvider } from "../db.ts";

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
): Promise<PartialUserFromProvider> {
  const resp = await fetch("https://api.okta.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) {
    const { message } = await resp.json();
    throw createHttpError(resp.status, message);
  }
  const userOkta: UserOkta = await resp.json();
  return {
    authId: userOkta.sub,
    name: userOkta.name,
    email: userOkta.email,
    avatar: userOkta.picture,
    provider: "okta",
  };
}
