import type { PluginRoute } from "../../../../../deps/$fresh/src/server/types.ts";
import {
  createAuth0OAuthConfig,
  createGitHubOAuthConfig,
  createGitLabOAuthConfig,
  createGoogleOAuthConfig,
  createOktaOAuthConfig,
  handleCallback,
  signIn,
  signOut,
} from "../../../../../deps/deno_kv_oauth/mod.ts";
import type { AuthOptions, OAuth2ClientConfig } from "../../mod.ts";
import {
  createUser,
  getUser,
  updateUser,
  updateUserSession,
  type User,
} from "./../../utils/db.ts";
import { getUserGithub } from "../../utils/providers/github.ts";

export type OAuthProvider =
  | "google"
  | "github"
  | "gitlab"
  | "auth2"
  | "okta"
  | "oauth2";

const assertEnvVar = (name: string, value: string) => {
  value ||= Deno.env.get(name);
  if (!value) throw new Error(`Missing environment variable ${name}`);
  Deno.env.set(name, value);
};

const getOAuthConfig = (
  provider: OAuthProvider,
  options: AuthOptions["providers"][OAuthProvider],
) => {
  switch (provider) {
    case "google": {
      assertEnvVar("GOOGLE_CLIENT_ID", options.clientId);
      assertEnvVar("GOOGLE_CLIENT_SECRET", options.clientSecret);
      return createGoogleOAuthConfig(options);
    }
    case "github": {
      assertEnvVar("GITHUB_CLIENT_ID", options.clientId);
      assertEnvVar("GITHUB_CLIENT_SECRET", options.clientSecret);
      return createGitHubOAuthConfig();
    }
    case "gitlab": {
      assertEnvVar("GITLAB_CLIENT_ID", options.clientId);
      assertEnvVar("GITLAB_CLIENT_SECRET", options.clientSecret);
      return createGitLabOAuthConfig(options);
    }
    case "auth2": {
      assertEnvVar("CUSTOM_CLIENT_ID", options.clientId);
      assertEnvVar("CUSTOM_CLIENT_SECRET", options.clientSecret);
      return createAuth0OAuthConfig(options);
    }
    case "okta": {
      assertEnvVar("OKTA_CLIENT_ID", options.clientId);
      assertEnvVar("OKTA_CLIENT_SECRET", options.clientSecret);
      return createOktaOAuthConfig(options);
    }
    case "oauth2": {
      assertEnvVar("CUSTOM_CLIENT_ID", options.clientId);
      assertEnvVar("CUSTOM_CLIENT_SECRET", options.clientSecret);
      return options satisfies OAuth2ClientConfig;
    }
    default:
      throw new Error(`Provider ${provider} not supported`);
  }
};

export const getRoutesByProvider = (
  provider: OAuthProvider,
  options: AuthOptions["providers"][OAuthProvider],
): PluginRoute[] => [
  {
    path: `/auth/${provider}/signin`,
    handler: async (req, _ctx) => {
      const oAuthConfig = getOAuthConfig(provider, options);
      const response = await signIn(req, oAuthConfig);
      return response;
    },
  },
  {
    path: `/auth/${provider}/callback`,
    handler: async (req, _ctx) => {
      const oAuthConfig = getOAuthConfig(provider, options);
      const { response, tokens, sessionId } = await handleCallback(
        req,
        oAuthConfig,
      );
      const userGithub = await getUserGithub(tokens.accessToken);
      const userCurrent = await getUser(userGithub.login);

      const user = {
        login: userGithub.login,
        sessionId,
        name: userGithub.name,
        email: userGithub.email,
        avatar: userGithub.avatar_url,
        role: "admin",
        provider,
      } as unknown as User;

      if (userCurrent === null) {
        await createUser(user);
      } else {
        await updateUser({ ...user, ...userCurrent });
        await updateUserSession({ ...user, ...userCurrent }, sessionId);
      }

      return response;
    },
  },
  {
    path: `/auth/signout`,
    handler: async (req, _ctx) => {
      const response = await signOut(req);
      return response;
    },
  },
];
