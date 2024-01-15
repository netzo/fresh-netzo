import { createHttpError } from "../../../../../deps/std/http/http_errors.ts";
import type { AuthUserFromProvider } from "../db.ts";

type UserEmail = {
  _id: string;
  name: unknown;
  email: unknown;
  avatar: string;
};

export type EmailClientConfig = Record<string | number | symbol, never>; // (empty object)

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

export async function signInEmail(
  _req: Request,
  _authConfig: ReturnType<typeof createEmailOAuthConfig>,
) {
  const response = await new Response("Not implemented");
  return response;
}

export async function handleCallbackEmail(
  _req: Request,
  _authConfig: ReturnType<typeof createEmailOAuthConfig>,
) {
  const response = await new Response("Not implemented");
  return response;
}

export async function getUserEmail(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const response = await fetch("https://api.email.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw createHttpError(response.status, message);
  }
  const userEmail: UserEmail = await response.json();
  return {
    provider: "email",
    authId: userEmail._id,
    name: userEmail.name as string,
    email: userEmail.email as string,
    avatar: userEmail.avatar,
  };
}
