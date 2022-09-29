import { Client } from "../../types.ts";

export interface Service {
  client: Client;
  requests: ServiceRequest[];
  item: ItemService;
  save: (data: ItemService) => Promise<ItemService>;
}

export interface ServiceRequest {
  invoke: () => Promise<any>;
  item: ItemServiceRequest;
  save: (data: ItemServiceRequest) => Promise<ItemServiceRequest>;
}

export interface ItemService {
  _id: string;
  _type: 'service';
  workspaceId: string;
  access: { level: 'private' | 'public' };
  name: string;
  description: string;
  labels: string[];
  stars: number;
  display: { imageUrl: string };
  type: 'http' | 'sse' | 'websocket';
  client: Record<string, unknown>;
  requests: ItemServiceRequest;
  options: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  [k: string]: unknown;
}

export interface ItemServiceRequest {
  _id: string;
  _type: "request",
  name: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  authorization: { type: 'none' | 'basic' | 'bearer' | string };
  headers: Record<string, string>;
  body: string
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
  },
  settings: {
    requestRefreshTime: number;
    runOnPageLoad: boolean;
    timeout: number;
    cache: boolean;
  }
  [k: string]: unknown;
}