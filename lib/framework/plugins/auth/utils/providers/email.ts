import type { User as UserNetzo } from "../../../../../deps/@netzo/api/mod.ts";
import { createHttpError } from "../../../../../deps/std/http/http_errors.ts";
import type { AuthUserFromProvider } from "../db.ts";

export const createEmailOAuthConfig = () => {
  return {
    projectId: Deno.env.get("NETZO_PROJECT_ID")!,
    apiKey: Deno.env.get("NETZO_API_KEY")!,
  };
};

export function isEmailSetup() {
  try {
    createEmailOAuthConfig();
    return true;
  } catch {
    return false;
  }
}

export async function getUserEmail(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const resp = await fetch("https://api.email.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) {
    const { message } = await resp.json();
    throw createHttpError(resp.status, message);
  }
  const userEmail: UserEmail = await resp.json();
  return {
    provider: "email",
    authId: userEmail._id,
    name: userEmail.name as string,
    email: userEmail.email as string,
    avatar: userEmail.avatar,
  };
}
