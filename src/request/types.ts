import { ClientMethodHandler as InvokeFn } from "../client/types.ts";
import { Authorization } from "../utils/auth/types.ts";

export interface IRequest {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  baseURL?: string; // ignored if undefined or if url is absolute
  url?: string;
  authorization?: Authorization;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string;
  variables?: Record<string, string>;
  [key: string | symbol]: unknown; // required for `deepMerge` to work
}

export interface RequestClient extends IRequest {
  invoke: InvokeFn;
}

export type { InvokeFn };
