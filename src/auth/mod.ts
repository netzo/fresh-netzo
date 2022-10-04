import { OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.1/mod.ts";

export interface ClientOptionsAuth {
  clientId: string; // "<your client id>",
  clientSecret: string; // "<your client secret>",
  authorizationEndpointUri: string; // "https://github.com/login/oauth/authorize",
  tokenUri: string; // "https://github.com/login/oauth/access_token",
  redirectUri: string; // "http://localhost:8000/oauth2/callback",
  defaults: Record<string, unknown>; // { scope: "read:user" },
}

export interface ClientAuth {
  [k: string]: unknown; // TODO
}

/**
 * Minimal, type-safe auth0 client
 */
export async function auth(
  defaultOptions: ClientOptionsAuth,
): Promise<ClientAuth> {
  const {
    clientId,
    clientSecret,
    authorizationEndpointUri,
    tokenUri,
    redirectUri,
    defaults,
  } = defaultOptions;
  const oauth2Client = new OAuth2Client({
    clientId,
    clientSecret,
    authorizationEndpointUri,
    tokenUri,
    redirectUri,
    defaults,
  });

  const authorizationUri = oauth2Client.code.getAuthorizationUri();

  console.log({ authorizationUri });

  // Exchange the authorization code for an access token
  const tokens = await oauth2Client.code.getToken(authorizationUri);

  // Use the access token to make an authenticated API request
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
  const response = await userResponse.json();

  console.log({ response });

  return {
    authorizationEndpointUri,
    ...response,
  };
}
