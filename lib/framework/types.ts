import { type FreshConfig } from "../deps/$fresh/server.ts";
import type { OAuth2ClientConfig } from "../deps/oauth2_client/src/oauth2_client.ts";
import type { ShadcnThemeColor, ThemeCSSVarsVariant } from "./plugins/ui/plugins/preset-shadcn/types.ts";

export type NetzoConfig = FreshConfig & {
  auth?: {
    enabled?: boolean;
    level?: "internal" | "external";
    title?: string;
    description?: string;
    caption?: string;
    providers?: {
      netzo?: { enabled?: boolean };
      email?: { enabled?: boolean };
      google?: OAuth2ClientConfig;
      github?: OAuth2ClientConfig;
      gitlab?: OAuth2ClientConfig;
      auth0?: OAuth2ClientConfig;
      okta?: OAuth2ClientConfig;
    };
  };
  ui?: {
    head?: {
      enabled?: boolean;
      title?: string;
      description?: string;
      favicon?: string;
      image?: string;
    };
    nav?: {
      enabled?: boolean;
      title?: string;
      image?: string;
      items?: Array<
        | { text: string } // header
        | { icon?: string; text: string; href?: string; target?: string } // link
        | {} // divider
      >;
    };
    header?: {
      enabled?: boolean;
      title?: string;
      description?: string;
      image?: string;
    };
    footer?: {
      enabled?: boolean;
      innerHTML?: string;
    };
    theme?: {
      enabled?: boolean;
      color?: ShadcnThemeColor | ThemeCSSVarsVariant | {
        base?: ShadcnThemeColor;
        color?: Partial<ThemeCSSVarsVariant>;
      };
      radius?: number;
    };
  };
};

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
  roles?: Record<string, 'owner' | 'admin' | 'developer' | 'user'>; // populated in external resolver
  createdAt: string;
  updatedAt: string;
};

export const projectSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    workspaceId: Type.String(),
    uid: Type.String({ pattern: PROJECT_UID_REGEX }), // note Type.Regex() is deprecated
    name: Type.String(),
    description: Type.String(),
    labels: Type.Array(Type.String()),
    avatar: Type.String(),
    markdown: Type.String(),
    userIds: Type.Array(Type.String()),
    denoProductionDeploymentId: Type.String(),
    denoLatestDeploymentId: Type.String(),
    apiKeyId: Type.String(),
    databaseId: Type.String(),
    env: Type.Object({
      development: ProjectEnvSchema(),
      // preview: ProjectEnvSchema(), // TODO: once preview envs land in DD (see https://github.com/netzo/app/issues/396 lands)
      production: ProjectEnvSchema(),
    }),
    envVars: Type.Optional(Type.Object({
      development: Type.Record(Type.String(), Type.String()),
      // preview: Type.Record(Type.String(), Type.String()),
      production: Type.Record(Type.String(), Type.String()),
    })), // populated in resolver
    denoId: Type.String(),
    deno: Type.Optional(DenoProjectSchema()), // populated in resolver
    denoDatabase: Type.Optional(DenoDatabaseSchema()), // populated in resolver
    denoAnalytics: Type.Optional(DenoProjectAnalyticsSchema()), // populated in resolver
    config: Type.Partial(ProjectConfigSchema()), // populated in resolver
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
    // deletedAt: Type.Union([Type.Literal(''), Type.String({ format: 'date-time' })]),
  },
  { $id: 'Project', additionalProperties: false },
)

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
  databaseId: string;
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

export type Notification = {
  _id: string;
  workspaceId: string;
  readBy: string[]; // userId[]
  data: {
    type: "notice" | "info" | "success" | "warning" | "error" | string; // allow custom types
    title: string; // accepts HTML (will be sanitized)
    body: string; // accepts HTML (will be sanitized)
  };
  env: "production" | "development"; // set to Deno.env.get('NETZO_ENV')
  projectId: string; // set to Deno.env.get('NETZO_PROJECT_ID')
  createdAt: string;
  updatedAt: string;
};