import { IClientOptionsHTTP, IClientHTTP } from "./http/types.ts";
import { IClientOptionsOpenapi, IClientOpenapi } from "./openapi/types.ts";

export type IClientOptions = IClientOptionsHTTP | IClientOptionsOpenapi;

export type IClient = IClientHTTP | IClientOpenapi;

export interface INetzoOptions {
  apiKey: string;
  baseURL?: string;
}

export interface INetzo {
  baseURL: string;
  // createClientAPI: (options: IClientOptions) => Promise<IClient>;
  createClientRequest: (options: IClientOptions) => Promise<IClient>;
  createClientWorker: (options: IClientOptions) => Promise<IClient>;
  // utils:
  getApiKey: () => string;
  createClient: (options: IClientOptionsHTTP) => IClientHTTP; // (raw) http client
}

export interface IItemClient {
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