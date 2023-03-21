import { ClientBuilder } from './resource/http/types.ts'
import { ResourceClient } from './resource/types.ts'

export * from './resource/types.ts'
export * from './resource/http/types.ts'

export type NetzoSDK = (apiKey: string) => NetzoSDKInstance

export interface NetzoSDKInstance {
  api: ClientBuilder
  getApiKey: () => string
  getResource: (id: string) => Promise<ResourceClient>
}
