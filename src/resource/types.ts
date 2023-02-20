import { ClientBuilder } from "../clients/http/types.ts";
import { Authorization } from "../utils/auth/types.ts";

export interface IRequest {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  baseURL?: string; // ignored if undefined or if url is absolute
  url?: string;
  authorization?: Authorization;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string;
  [key: string | symbol]: unknown; // required for `deepMerge` to work
}

export interface IResource {
  _id: string;
  _type: "resource";
  workspaceId: string;
  access: { level: "private" | "public" };
  type: "http";
  item: {
    uid: string;
    version: string;
    _type: "item";
  };
  name: string;
  description: string;
  labels: string[];
  stars: number;
  display: { imageUrl: string };
  base: IRequest;
  updatedAt: string;
  createdAt: string;
}

// export type { ClientBuilder as ResourceClient };
export interface ResourceClient {
  client: ClientBuilder;
  item: IResource;
}
