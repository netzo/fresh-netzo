import { Client } from "../../types.ts";
import { ClientMethodHandler as InvokeFnHTTP } from "../http/types.ts";

export interface Service {
  client: Client;
  requests: ServiceRequests;
  item: ItemService;
}

type InvokeFn = InvokeFnHTTP;

export interface ServiceRequest {
  invoke: InvokeFn;
  item: ItemServiceRequest;
}

export type ServiceRequests = {
  [index: number]: ServiceRequest;
} & {
  [name: string]: InvokeFn;
};

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
  type: "http";
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
  _id: string;
  _type: "request";
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
  eventHandlers: {
    successMessage: string;
    successHandler: string;
    errorMessage: string;
    errorHandler: string;
  };
  settings: {
    requestRefreshTime: number;
    runOnPageLoad: boolean;
    timeout: number;
    cache: boolean;
  };
  [k: string]: unknown;
}

interface AuthorizationNone {
  type: "none";
}

interface AuthorizationBasic {
  type: "basic";
  username: string;
  password: string;
}

interface AuthorizationBearer {
  type: "bearer";
  token: string;
}

interface AuthorizationApiKey {
  type: "apiKey";
  in: "query" | "header"; // | "cookie";
  key: string;
  value: string;
}

interface AuthorizationOAuth2 {
  type: "oauth2";
  clientId: string;
  clientSecret: string;
  authorizationUri: string;
  accessTokenUri: string;
  redirectUri: string;
  scopes: string[];
}

export type Authorization =
  | AuthorizationNone
  | AuthorizationBasic
  | AuthorizationBearer
  | AuthorizationApiKey
  | AuthorizationOAuth2;
