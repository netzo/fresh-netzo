// NOTE: avoid importing from "./types.ts" which
// bloats bundle with entire @netzo/api package

export type User = {
  _id: string;
  auth0Id?: string;
  profile?: {
    sub: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
  };
  email: string; // normalized profile.email for UI
  name: string;
  avatar: string;
  roles?: Record<string, "owner" | "admin" | "developer" | "user">; // populated in external resolver
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  _id: string;
  workspaceId: string;
  uid: string;
  name: string;
  description: string;
  labels: string[];
  avatar: string;
  markdown: string;
  userIds: string[];
  denoProductionDeploymentId: string;
  denoLatestDeploymentId: string;
  apiKeyId: string;
  env: {
    development: Record<string, string | { _id: string }>;
    // preview: Record<string, string | { _id: string }>; // TODO: once preview envs land in DD (see
    production: Record<string, string | { _id: string }>;
  };
  envVars?: {
    development: Record<string, string>;
    // preview: Record<string, string>;
    production: Record<string, string>;
  };
  [k: string]: unknown;
};
