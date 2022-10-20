import {
  ClientBuilder,
  ClientMethodHandler as InvokeFn,
} from "../fetch/types.ts";
import { Authorization } from "../utils/auth/types.ts";

// items:

export interface ServiceItem {
  _id: string;
  _type: "service";
  workspaceId: string;
  access: { level: "private" | "public" };
  name: string;
  description: string;
  labels: string[];
  stars: number;
  display: { imageUrl: string };
  init: ServiceClientInit;
  requests: ServiceRequestItem[];
  createdAt: string;
  updatedAt: string;
  [k: string]: unknown;
}

export interface ServiceRequestItem extends ServiceRequestClientInit {
  _type: "request";
  name: string;
  [k: string | symbol]: unknown;
}

// client-inits:

export interface ServiceClientInit {
  baseURL: string;
  authorization: Authorization;
  headers: Record<string, string>;
  variables: Record<string, unknown>;
  hooks: {
    beforeFetch: string;
    afterFetch: string;
    onFetchError: string;
  };
  description: string;
  [k: string | symbol]: unknown;
}

export interface ServiceRequestClientInit extends ServiceClientInit {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  body?: string;
}

// clients:

export interface ServiceClient {
  client: ClientBuilder;
  requests: {
    [index: number]: ServiceRequestClient;
  } & {
    [name: string]: InvokeFn;
  };
  item: ServiceItem;
}

export interface ServiceRequestClient {
  request: Request;
  invoke: InvokeFn;
  item: ServiceRequestItem;
}
