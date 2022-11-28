import { ClientBuilder } from "./client/types.ts";
import { IRequest, RequestClient } from "./request/types.ts";
import { IService, ServiceClient } from "./service/types.ts";

export type NetzoSDK = (options: NetzoOptions) => NetzoSDKInstance;

export interface NetzoOptions {
  apiKey: string;
  baseURL?: string;
}

export interface NetzoSDKInstance {
  api: ClientBuilder;
  baseURL: string;
  getApiKey: () => string;
  request: (request: IRequest) => RequestClient;
  service: (ref: string | IService) => Promise<ServiceClient>;
  createClient: (options: NetzoOptions) => ClientBuilder;
}
