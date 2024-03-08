import { auth } from "../create-api/auth/mod.ts";
import { createApi } from "../create-api/mod.ts";

export type Microsoft365Options = {
  baseURL: string;
  clientId: string;
  clientSecret: string;
  accessTokenUrl?: string;
  scope?: string;
};

/**
 * Factory function for the Microsoft365 API
 *
 * Authentication is done using the OAuth 2.0 Client Credentials flow via
 * Microsoft Azure Active Directory (AAD). The token is then uses to access
 * resources in Microsoft 365 provided the client application was granted access.
 *
 * @see https://netzo.io/docs/modules/integrations/apis/microsoft365
 *
 * @param {string} baseURL - the base URL to use for the API
 * @param {string} clientId - the client ID to use for authentication
 * @param {string} clientSecret - the client secret to use for authentication
 * @param {string} accessTokenUrl - the access token URL to use for authentication (default: "https://login.microsoftonline.com/common/oauth2/v2.0/token", otherwise "https://login.microsoftonline.com/<tenant>/oauth2/v2.0/token")
 * @param {string} scope - the scope to use for authentication (default: `${baseURL}/.default`)
 * @returns {object} - an API client instance
 */
export const microsoft365 = ({
  baseURL = Deno.env.get("MICROSOFT365_BASE_URL")!,
  clientId = Deno.env.get("MICROSOFT365_CLIENT_ID")!,
  clientSecret = Deno.env.get("MICROSOFT365_CLIENT_SECRET")!,
  accessTokenUrl = Deno.env.get("MICROSOFT365_ACCESS_TOKEN_URL") ??
    "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  scope,
}: Microsoft365Options) => {
  const api = createApi({
    baseURL,
    headers: {
      "content-type": "application/json",
    },
    ignoreResponseError: true,
    async onRequest(ctx) {
      ctx.options.headers = {
        ...ctx.options.headers,
        Host: "login.microsoftonline.com",
        "content-type": "application/json",
      };
      await auth({
        type: "oauth2",
        grantType: "client_credentials",
        headerPrefix: "Bearer",
        accessTokenUrl,
        clientId,
        clientSecret,
        scope: scope ?? `${baseURL}/.default`,
      }, ctx);
    },
  });

  return api;
};
