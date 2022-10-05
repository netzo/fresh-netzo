import {
  ClientBuilder,
  ClientMethodHandler as InvokeFn,
} from "../fetch/types.ts";
import { Authorization } from "../utils/auth/types.ts";

export interface ItemService {
  _id: string;
  _type: "service";
  workspaceId: string;
  access: { level: "private" | "public" };
  name: string;
  description: string;
  labels: string[];
  stars: number;
  display: { imageUrl: string };
  type: "http" | "graphql" | "worker" | "openapi";
  client: {
    baseURL: string;
    headers: Record<string, string>;
    authorization: Authorization;
    variables: Record<string, unknown>;
    hooks: {
      beforeFetch: string;
      afterFetch: string;
      onFetchError: string;
    };
  };
  requests: ItemServiceRequest[];
  options: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  [k: string]: unknown;
}

export interface ItemServiceRequest {
  _type: "request";
  type: "http" | "graphql" | "worker" | "openapi";
  name: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  baseURL: string;
  authorization: Authorization;
  headers: Record<string, string>;
  body: string;
  variables: Record<string, unknown>;
  hooks: {
    beforeFetch: string;
    afterFetch: string;
    onFetchError: string;
  };
  [k: string]: unknown;
}

// clients:

export interface Service {
  client: ClientBuilder;
  requests: ServiceRequestMap;
  item: ItemService;
}

export interface ServiceRequest {
  invoke: InvokeFn;
  item: ItemServiceRequest;
}

export type ServiceRequestMap = {
  [index: number]: ServiceRequest;
} & {
  [name: string]: InvokeFn;
};
