import type { AuthConfig } from "../../mod.ts";
import {
  handleCallback,
  signIn,
  signOut,
} from "../../../../../deps/deno_kv_oauth/mod.ts";
import {
  createNetzoOAuthConfig,
  getUserNetzo,
  handleCallback as handleCallbackNetzo,
  isNetzoSetup,
  signIn as signInNetzo,
} from "./netzo.ts";
import {
  createEmailClientConfig,
  getUserEmail,
  handleCallbackEmail,
  isEmailSetup,
  signInEmail,
} from "./email.ts";
import { type AuthUserFromProvider } from "../db.ts";
import {
  createGoogleOAuthConfig,
  getUserGoogle,
  isGoogleSetup,
} from "./google.ts";
import {
  createGitHubOAuthConfig,
  getUserGithub,
  isGitHubSetup,
} from "./github.ts";
import {
  createGitLabOAuthConfig,
  getUserGitlab,
  isGitlabSetup,
} from "./gitlab.ts";
import { createAuth0OAuthConfig, getUserAuth0, isAuth0Setup } from "./auth0.ts";
import { createOktaOAuthConfig, getUserOkta, isOktaSetup } from "./okta.ts";

export type AuthProvider = keyof AuthConfig["providers"];

const setFromOptionsIfNotInEnv = (name: string, value: string) => {
  if (!value) value = Deno.env.get(name)!;
  Deno.env.set(name, value);
};

export const getAuthConfig = (
  provider: AuthProvider,
  options: AuthConfig["providers"][AuthProvider],
) => {
  const getError = (provider: AuthProvider) =>
    new Error(
      `[auth] Missing or invalid configuration for "${provider}" provider`,
    );

  options.redirectUri = `/auth/${provider}/callback`;

  switch (provider) {
    case "netzo": {
      if (!isNetzoSetup()) throw getError(provider);
      return createNetzoOAuthConfig();
    }
    case "email": {
      if (!isEmailSetup()) throw getError(provider);
      return createEmailClientConfig();
    }
    case "google": {
      setFromOptionsIfNotInEnv("GOOGLE_CLIENT_ID", options.clientId);
      setFromOptionsIfNotInEnv("GOOGLE_CLIENT_SECRET", options.clientSecret);
      if (!isGoogleSetup(options)) throw getError(provider);
      return createGoogleOAuthConfig(options);
    }
    case "github": {
      setFromOptionsIfNotInEnv("GITHUB_CLIENT_ID", options.clientId);
      setFromOptionsIfNotInEnv("GITHUB_CLIENT_SECRET", options.clientSecret);
      if (!isGitHubSetup()) throw getError(provider);
      return createGitHubOAuthConfig();
    }
    case "gitlab": {
      setFromOptionsIfNotInEnv("GITLAB_CLIENT_ID", options.clientId);
      setFromOptionsIfNotInEnv("GITLAB_CLIENT_SECRET", options.clientSecret);
      if (!isGitlabSetup(options)) throw getError(provider);
      return createGitLabOAuthConfig(options);
    }
    case "auth0": {
      setFromOptionsIfNotInEnv("CUSTOM_CLIENT_ID", options.clientId);
      setFromOptionsIfNotInEnv("CUSTOM_CLIENT_SECRET", options.clientSecret);
      if (!isAuth0Setup(options)) throw getError(provider);
      return createAuth0OAuthConfig(options);
    }
    case "okta": {
      setFromOptionsIfNotInEnv("OKTA_CLIENT_ID", options.clientId);
      setFromOptionsIfNotInEnv("OKTA_CLIENT_SECRET", options.clientSecret);
      if (!isOktaSetup(options)) throw getError(provider);
      return createOktaOAuthConfig(options);
    }
    default:
      throw new Error(`Provider ${provider} not supported`);
  }
};

export const getFunctionsByProvider = (provider: AuthProvider) => {
  switch (provider) {
    case "netzo":
      return [signInNetzo, handleCallbackNetzo, signOut];
    case "email":
      return [signInEmail, handleCallbackEmail, signOut];
    default:
      return [signIn, handleCallback, signOut];
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
    case "auth0":
      return await getUserAuth0(accessToken);
    case "okta":
      return await getUserOkta(accessToken);
    default:
      throw new Error(`Provider ${provider} not supported`);
  }
};
