import {
  createAuth0OAuthConfig,
  createGitHubOAuthConfig,
  createGitLabOAuthConfig,
  createGoogleOAuthConfig,
  createOktaOAuthConfig,
} from "../../../../../deps/deno_kv_oauth/mod.ts";
import { Project } from "../../../../../deps/@netzo/api/mod.ts";
import { type PartialUserFromProvider } from "../db.ts";
import { getUserGoogle, isGoogleSetup } from "./google.ts";
import { getUserGithub, isGitHubSetup } from "./github.ts";
import { getUserGitlab, isGitlabSetup } from "./gitlab.ts";
import { getUserAuth0, isAuth0Setup } from "./auth0.ts";
import { getUserOkta, isOktaSetup } from "./okta.ts";

export type OAuthProvider =
  | "google"
  | "github"
  | "gitlab"
  | "auth0"
  | "okta";

const setFromOptionsIfNotInEnv = (name: string, value: string) => {
  if (!value) value = Deno.env.get(name)!;
  Deno.env.set(name, value);
};

export const getOAuthConfig = (
  provider: OAuthProvider,
  options: Project["providers"][OAuthProvider],
) => {
  const getError = (provider: OAuthProvider) =>
    new Error(
      `[auth] Missing or invalid configuration for "${provider}" provider`,
    );

  options.redirectUri = `/auth/${provider}/callback`;

  switch (provider) {
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

export const getUserByProvider = async (
  provider: OAuthProvider,
  accessToken: string,
): Promise<PartialUserFromProvider> => {
  switch (provider) {
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
