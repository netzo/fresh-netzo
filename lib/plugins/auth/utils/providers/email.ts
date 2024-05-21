import { handleCallback, signIn } from "../../../../deps/deno_kv_oauth/mod.ts";
import type { AuthUserFromProvider } from "../types.ts";

type UserEmail = {
  _id: string;
  name: unknown;
  email: unknown;
  avatar: string;
};

export type EmailAuthConfig = Record<string | number | symbol, never>; // (empty object)

export async function signInEmail(
  _req: Request,
  _authConfig: EmailAuthConfig,
): ReturnType<typeof signIn> {
  const response = await new Response("Not implemented");
  return response;
}

export async function handleCallbackEmail(
  _req: Request,
  _authConfig: EmailAuthConfig,
): ReturnType<typeof handleCallback> {
  const response = await new Response("Not implemented");
  return {
    response,
    sessionId: `x-x-x-x-x`,
    tokens: {
      accessToken: "",
      tokenType: "",
      expiresIn: 0,
      refreshToken: "",
      scope: [],
    },
  };
}

export async function getUserEmail(
  accessToken: string,
): Promise<AuthUserFromProvider> {
  const response = await fetch("https://api.email.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(`${response.status}: ${message}`);
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
