import * as lib from './lib/mod.ts'

export type Netzo = (options: INetzoOptions) => INetzo

export interface INetzoOptions {
  apiKey: string
  baseURL?: string
}

export interface INetzo {
  baseURL: string
  // utils:
  getApiKey: () => string
}

export interface INetzoClientOptions {
  baseURL: string
}
