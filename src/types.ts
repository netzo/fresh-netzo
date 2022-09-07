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
  http: (options: IClientOptionsHTTP) => Promise<IClientHTTP>;
  openapi: (options: IClientOptionsOpenapi) => Promise<IClientOpenapi>;
  createClient: (options: IClientOptions) => IClient;
  // utils:
  getApiKey: () => string;
}
