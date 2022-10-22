import { ClientBuilder } from "./fetch/types.ts";
import { ServiceClient } from "./service/types.ts";

export type NetzoSDK = (options: NetzoOptions) => NetzoSDKInstance;

export interface NetzoOptions {
  apiKey: string;
  baseURL?: string;
}

export interface NetzoSDKInstance {
  api: ClientBuilder;
  baseURL: string;
  getApiKey: () => string;
  service: (_id: string) => Promise<ServiceClient>;
  createFetch: (options: NetzoOptions) => ClientBuilder;
}
