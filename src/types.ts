import { ClientBuilder } from "./client/types.ts";
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
  service: (ref: string | IService) => Promise<ServiceClient>;
  createClient: (options: NetzoOptions) => ClientBuilder;
}
