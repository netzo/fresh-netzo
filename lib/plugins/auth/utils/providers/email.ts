import type { AuthUserFromProvider } from "../types.ts";

type UserEmail = {
  _id: string;
  name: unknown;
  email: unknown;
  avatar: string;
};

export type EmailClientConfig = Record<string | number | symbol, never>; // (empty object)

export const createEmailClientConfig = () => {
  return {};
};

export function isEmailSetup() {
  try {
    createEmailClientConfig();
    return true;
  } catch {
    return false;
  }
}

export async function signInEmail(
  _req: Request,
  _authConfig: ReturnType<typeof createEmailClientConfig>,
) {
  const response = await new Response("Not implemented");
  return response;
}

export async function handleCallbackEmail(
  _req: Request,
  _authConfig: ReturnType<typeof createEmailClientConfig>,
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
