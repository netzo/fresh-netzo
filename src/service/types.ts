import { ClientBuilder } from "../client/types.ts";
import { Authorization } from "../utils/auth/types.ts";

export interface IService {
  _id: string;
  _type: "service";
  workspaceId: string;
  access: { level: "private" | "public" };
  name: string;
  description: string;
  labels: string[];
  stars: number;
  display: { imageUrl: string };
  base: IRequestBase;
  [key: string | symbol]: unknown; // required by deepMerge
}

export interface IRequestBase {
  baseURL?: string; // ignored if undefined or if url is absolute
  params?: Record<string, string>;
  authorization?: Authorization;
  headers?: Record<string, string>;
  body?: string;
  variables?: Record<string, string>;
  hooks?: string;
  [key: string | symbol]: unknown; // required by deepMerge
}

export interface ServiceClient {
  client: ClientBuilder;
  item: IService;
}
