import { ClientBuilder } from './clients/http/types.ts'
import { IResource, ResourceClient } from './resource/types.ts'

export type NetzoSDK = (options: NetzoOptions) => NetzoSDKInstance

export interface NetzoOptions {
  apiKey: string
  baseURL?: string
}

export interface NetzoSDKInstance {
  api: ClientBuilder
  baseURL: string
  getApiKey: () => string
  resource: (ref: string | IResource) => Promise<ResourceClient>
}
