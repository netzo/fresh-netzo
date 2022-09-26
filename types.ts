import * as lib from "./lib/mod.ts";

export interface INetzoOptions {
  apiKey: string;
  baseURL?: string;
}

export interface INetzo {
  baseURL: string;
  // createClientAPI: (options: INetzoClientOptions) => Promise<INetzoClient>;
  createClientRequest: (options: INetzoClientOptions) => Promise<INetzoClient>;
  createClientWorker: (options: INetzoClientOptions) => Promise<INetzoClient>;
  // utils:
  getApiKey: () => string;
  createClient: (options: INetzoClientOptions) => INetzoClient; // (raw) http client
}

export interface INetzoClientOptions {
  baseURL: string;
}

export interface INetzoClient {
  getId: () => string;
  [k: string]: any;
}

export interface IItemClient {
  _id: string
  _type: 'query'
  type: 'http' | string
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'TRACE' | 'OPTIONS'
  url: string
  authorization: {
    type: string
    [k: string]: any
  }
  headers: Record<string, string>
  body: string
  eventHandlers: Record<string, Function>
  settings: Record<string, any>
}