import type { User as UserNetzo } from "../../../../../deps/@netzo/api/mod.ts";
import { createHttpError } from "../../../../../deps/std/http/http_errors.ts";
import type { AuthUserFromProvider } from "../db.ts";

export const createNetzoOAuthConfig = () => {
  return {
    projectId: Deno.env.get("NETZO_PROJECT_ID")!,
    apiKey: Deno.env.get("NETZO_API_KEY")!,
  };
};

export function isNetzoSetup() {
  try {
    createNetzoOAuthConfig();
    return true;
  } catch {
    return false;
  }
}

export async function getUserNetzo(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const resp = await fetch("https://api.netzo.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) {
    const { message } = await resp.json();
    throw createHttpError(resp.status, message);
  }
  const userNetzo: UserNetzo = await resp.json();
  return {
    provider: "netzo",
    authId: userNetzo._id,
    name: userNetzo.name as string,
    email: userNetzo.email as string,
    avatar: userNetzo.avatar,
  };
}
