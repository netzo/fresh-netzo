import { ClientBuilder } from "../client/types.ts";
import { Authorization } from "../utils/auth/types.ts";

export interface IService {
  _id: string;
  _type: "service";
  workspaceId: string;
  access: { level: "private" | "public" };
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
  base: IRequestBase;
  updatedAt: string;
  createdAt: string;
}

export interface IRequestBase {
  baseURL?: string; // ignored if undefined or if url is absolute
  authorization?: Authorization;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string;
  variables?: Record<string, string>;
}

export interface ServiceClient {
  client: ClientBuilder;
  item: IService;
}
