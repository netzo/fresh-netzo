import type { FetchOptions } from "https://esm.sh/v94/ohmyfetch@0.4.18/dist/index";

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

export interface IClientOptions extends Omit<FetchOptions<"json">, "method"> { }