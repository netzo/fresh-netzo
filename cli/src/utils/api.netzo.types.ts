// NOTE: hard--coded types for @netzo/api since theywere not being properly
// tree-shaken by esm.sh and were also being downloaded each time CLI was run.

export interface Project {
  _id: string;
  _type: "project";
  workspaceId: string;
  visibility: "private" | "public";
  userIds: string[];
  uid: string;
  name: string;
  description: string;
  labels: string[];
  display?: Partial<{
    avatar: string;
    color: string;
  }>;
  request?: Partial<{
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    baseURL: string;
    url: string;
    authorization: Record<string, unknown>;
    query: Record<string, unknown>;
    headers: Record<string, unknown>;
    body: string;
  }>;
  configuration?: Partial<Configuration>;
  fs: Record<string, ProjectFSFile>;
  deploymentId: string;
  deployment?: unknown;
  deploymentIdLatest: string;
  deploymentLatest?: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface Deployment {
  _id: string;
  _type: "deployment";
  workspaceId: string;
  projectId: string;
  configuration?: Partial<Configuration>;
  fs: Record<string, ProjectFSFile>;
  fsManifest: { entries: Record<string, FSManifestEntry> };
  createdAt: string;
  updatedAt: string;
}

interface Configuration {
  entrypoint: string;
  importMap: string;
  envVars: Record<string, unknown>;
  envVarsDev: Record<string, unknown>;
  permissions: {
    net: boolean | string[];
  };
}

interface ProjectFSFile {
  contents?: string;
  url?: string;
}

type FSManifestEntry = {
  kind: "directory";
} | {
  kind: "file";
  size: number;
  hash: string;
} | {
  kind: "symlink";
  target: string;
};
