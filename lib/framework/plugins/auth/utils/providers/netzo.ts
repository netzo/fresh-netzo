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
  const response = await fetch("https://api.netzo.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw createHttpError(response.status, message);
  }
  const userNetzo: UserNetzo = await response.json();
  return {
    provider: "netzo",
    authId: userNetzo._id,
    name: userNetzo.name as string,
    email: userNetzo.email as string,
    avatar: userNetzo.avatar,
  };
}

export async function signInNetzo(
  req: Request,
  authConfig: ReturnType<typeof createNetzoOAuthConfig>,
) {
  const {
    projectId = Deno.env.get("NETZO_PROJECT_ID")!,
    apiKey = Deno.env.get("NETZO_API_KEY")!,
    apiUrl = Deno.env.get("NETZO_API_URL")!,
  } = authConfig;
  const response = await fetch(`${apiUrl}/projects/${projectId}`, {
    headers: { "x-api-key": apiKey },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw createHttpError(response.status, message);
  }
  const url = new URL(req.url);
  const auth0Url = `${apiUrl}/oauth/auth0`;
  const redirect = `${url.origin}/auth/netzo/callback`;
  const redirectUrl = `${auth0Url}?redirect=${redirect}`;
  console.log({ auth0Url, redirect, redirectUrl });
  return Response.redirect(redirectUrl);
}

export function handleCallbackNetzo(
  req: Request,
  _authConfig: ReturnType<typeof createNetzoOAuthConfig>,
) {
  // NOTE: query params are returned after the fragment (#) by netzo API
  // so we apply a simple algorithm to extract the access token from the URL
  const url = new URL(req.url);
  const fragment = url.hash.substring(1); // remove the '#' from the fragment
  const params = new URLSearchParams(fragment); // parse fragment to extract access_token
  const accessToken = params.get("access_token");

  console.log({ req, accessToken }); // This will log the access token
  const response = new Response("Not implemented yet");
  return { response, tokens: [], sessionId: "" };
}

export async function signOutNetzo(req: Request) {
  const response = new Response("Not implemented yet");
  return response;
}
