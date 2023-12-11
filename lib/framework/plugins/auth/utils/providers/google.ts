import { createHttpError } from "../../../../../deps/std/http/http_errors.ts";
import { createGoogleOAuthConfig } from "../../../../../deps/deno_kv_oauth/mod.ts";
import type { PartialUserFromProvider } from "../db.ts";

export function isGoogleSetup(
  options: Parameters<typeof createGoogleOAuthConfig>[0],
) {
  try {
    createGoogleOAuthConfig(options);
    return true;
  } catch {
    return false;
  }
}

export type UserGoogle = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  hd: string;
};

export async function getUserGoogle(
  accessToken: string,
): Promise<PartialUserFromProvider> {
  const resp = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) {
    const { message } = await resp.json();
    throw createHttpError(resp.status, message);
  }
  const userGoogle: UserGoogle = await resp.json();
  return {
    authId: userGoogle.sub,
    name: userGoogle.name,
    email: userGoogle.email,
    avatar: userGoogle.picture,
    provider: "google",
  };
}
