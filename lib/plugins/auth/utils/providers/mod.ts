import { FreshContext } from "fresh";
import {
  createAuth0OAuthConfig,
  createGitHubOAuthConfig,
  createGitLabOAuthConfig,
  createGoogleOAuthConfig,
  createOktaOAuthConfig,
  createSlackOAuthConfig,
  handleCallback,
  signIn,
  signOut,
} from "../../../../deps/deno_kv_oauth/mod.ts";
import type { AuthProvider, AuthUserFromProvider } from "../types.ts";
import { getUserAuth0 } from "./auth0.ts";
import { EmailAuthConfig, getUserEmail, handleCallbackEmail, signInEmail } from "./email.ts";
import { getUserGithub } from "./github.ts";
import { getUserGitlab } from "./gitlab.ts";
import { getUserGoogle } from "./google.ts";
import { getUserNetzo, handleCallbackNetzo, NetzoAuthConfig, signInNetzo } from "./netzo.ts";
import { getUserNetzolabs } from "./netzolabs.ts";
import { getUserOkta } from "./okta.ts";
import { getUserSlack } from "./slack.ts";

export const getAuthConfig = (provider: AuthProvider, ctx: FreshContext) => {
  const redirectUri = `${ctx.url.origin}/auth/${provider}/callback`;

  switch (provider) {
    case "netzo": {
      return {
        projectId: Deno.env.get("NETZO_PROJECT_ID")!,
        apiKey: Deno.env.get("NETZO_API_KEY")!,
      } satisfies NetzoAuthConfig; // MUST be set if using Netzo Auth Provider
    }
    case "email": {
      return {} satisfies EmailAuthConfig;
    }
    case "google": {
      return createGoogleOAuthConfig({
        redirectUri,
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      });
    }
    case "github": {
      return createGitHubOAuthConfig({ redirectUri, scope: "user:email" });
    }
    case "gitlab": {
      return createGitLabOAuthConfig({ redirectUri, scope: "profile" });
    }
    case "slack": {
      return createSlackOAuthConfig({
        redirectUri,
        scope: "users.profile:read",
      });
    }
    case "auth0": {
      return createAuth0OAuthConfig({
        redirectUri,
        scope: "openid email profile",
      });
    }
    case "okta": {
      return createOktaOAuthConfig({
        redirectUri,
        scope: "openid email profile",
      });
    }
    // case "aws-cognito":
    // case "azure-ad":
    // case "azure-adb2c":
    // case "clerk":
    // case "discord":
    // case "dropbox":
    // case "facebook":
    case "netzolabs": {
      return {
        clientId: Deno.env.get("NETZOLABS_CLIENT_ID")!,
        clientSecret: Deno.env.get("NETZOLABS_CLIENT_SECRET")!,
        authorizationEndpointUri: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenUri: "https://oauth2.googleapis.com/token",
        redirectUri,
        defaults: {
          scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
          ],
        },
      }; // MUST be set if using Netzo Auth Provider
    }
    default:
      throw new Error(`Provider ${provider} not supported`);
  }
};

export const getFunctionsByProvider = (provider: AuthProvider) => {
  switch (provider) {
    case "netzo":
      return [signInNetzo, handleCallbackNetzo, signOut] as const;
    case "email":
      return [signInEmail, handleCallbackEmail, signOut] as const;
    default:
      return [signIn, handleCallback, signOut] as const;
  }
};

export const getUserByProvider = async (
  provider: AuthProvider,
  accessToken: string,
): Promise<AuthUserFromProvider> => {
  switch (provider) {
    case "netzo":
      return await getUserNetzo(accessToken);
    case "email":
      return await getUserEmail(accessToken);
    case "google":
      return await getUserGoogle(accessToken);
    case "github":
      return await getUserGithub(accessToken);
    case "gitlab":
      return await getUserGitlab(accessToken);
    case "slack":
      return await getUserSlack(accessToken);
    case "auth0":
      return await getUserAuth0(accessToken);
    case "okta":
      return await getUserOkta(accessToken);
    case "netzolabs":
      return await getUserNetzolabs(accessToken);
    default:
      throw new Error(`Provider ${provider} not supported`);
  }
};
