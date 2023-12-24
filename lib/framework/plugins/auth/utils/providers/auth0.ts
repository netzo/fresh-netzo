import { createHttpError } from "../../../../../deps/std/http/http_errors.ts";
import { createAuth0OAuthConfig } from "../../../../../deps/deno_kv_oauth/mod.ts";
import type { AuthUserFromProvider } from "../db.ts";

export { createAuth0OAuthConfig };

export function isAuth0Setup(
  options: Parameters<typeof createAuth0OAuthConfig>[0],
) {
  try {
    createAuth0OAuthConfig(options);
    return true;
  } catch {
    return false;
  }
}

export type UserAuth0 = {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
};

export async function getUserAuth0(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const resp = await fetch("https://api.auth0.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) {
    const { message } = await resp.json();
    throw createHttpError(resp.status, message);
  }
  const userAuth0: UserAuth0 = await resp.json();
  return {
    provider: "auth0",
    authId: userAuth0.sub,
    name: userAuth0.name,
    email: userAuth0.email,
    avatar: userAuth0.picture,
  };
}
